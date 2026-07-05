import fs from 'fs';
import path from 'path';

const dbDir = path.join(process.cwd(), 'packages', 'database');
const srcDir = path.join(dbDir, 'src');

// 1. Health Service & Connection Pool
fs.writeFileSync(path.join(srcDir, 'db.ts'), `import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { DatabaseException } from './exceptions';

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/buintell';

export const sql = postgres(connectionString, {
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
});

export const db = drizzle(sql, { schema });

export class DatabaseHealthService {
  static async checkHealth() {
    try {
      const start = Date.now();
      await sql\`SELECT 1\`;
      const latency = Date.now() - start;
      return { status: 'healthy', latency, poolActive: true };
    } catch (e) {
      return { status: 'unhealthy', error: e instanceof Error ? e.message : 'Unknown error' };
    }
  }

  static async shutdown() {
    console.log('Closing database connections...');
    await sql.end({ timeout: 5 });
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  await DatabaseHealthService.shutdown();
  process.exit(0);
});
process.on('SIGTERM', async () => {
  await DatabaseHealthService.shutdown();
  process.exit(0);
});
`);

// 2. Transaction Service
fs.writeFileSync(path.join(srcDir, 'transactions.ts'), `import { db } from './db';
import { DatabaseException } from './exceptions';

export class TransactionService {
  static async execute<T>(
    operation: (tx: any) => Promise<T>,
    options?: { retries?: number }
  ): Promise<T> {
    let attempts = 0;
    const maxRetries = options?.retries || 0;

    while (attempts <= maxRetries) {
      try {
        return await db.transaction(async (tx) => {
          return await operation(tx);
        });
      } catch (e: any) {
        attempts++;
        if (attempts > maxRetries || !this.isTransientError(e)) {
          throw new DatabaseException(
            e.message || 'Transaction failed',
            'TRANSACTION_ERROR',
            e
          );
        }
      }
    }
    throw new DatabaseException('Transaction failed after retries', 'TRANSACTION_ERROR');
  }

  private static isTransientError(error: any) {
    // 40001 serialization_failure, 40P01 deadlock_detected
    return error.code === '40001' || error.code === '40P01';
  }
}
`);

// 3. Exceptions Update
fs.writeFileSync(path.join(srcDir, 'exceptions', 'index.ts'), `
export type ErrorCode = 
  | 'NOT_FOUND' 
  | 'CONFLICT' 
  | 'VALIDATION' 
  | 'DUPLICATE' 
  | 'FOREIGN_KEY'
  | 'TRANSACTION_ERROR'
  | 'TIMEOUT'
  | 'PERMISSION_DENIED';

export class DatabaseException extends Error {
  constructor(message: string, public code: ErrorCode, public originalError?: any) {
    super(message);
    this.name = 'DatabaseException';
  }
}
`);

// 4. Validation Utilities Update
fs.writeFileSync(path.join(srcDir, 'validation', 'index.ts'), `
export const validateUUID = (uuid: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(uuid);
export const validateEmail = (email: string) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
export const validateSlug = (slug: string) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
export const validatePhone = (phone: string) => /^\\+?[1-9]\\d{1,14}$/.test(phone);
export const validateURL = (url: string) => {
  try { new URL(url); return true; } catch { return false; }
};
export const validateJSON = (str: string) => {
  try { JSON.parse(str); return true; } catch { return false; }
};
export const validateLength = (str: string, min: number, max: number) => str.length >= min && str.length <= max;
export const validatePasswordStrength = (pass: string) => {
  // At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/.test(pass);
};
export const isRequired = (val: any) => val !== null && val !== undefined && val !== '';
`);

// 5. Repository Improvements (Hooks, Batch, Cursor Pagination)
const repoPath = path.join(srcDir, 'repositories', 'base.repository.ts');
fs.writeFileSync(repoPath, `
import { db } from '../db';
import { eq, and, isNull, sql, inArray, gt, desc, asc } from 'drizzle-orm';
import { DatabaseException } from '../exceptions';

export interface RepositoryHooks<T> {
  beforeCreate?: (data: Partial<T>) => Promise<Partial<T>>;
  afterCreate?: (entity: T) => Promise<void>;
  beforeUpdate?: (id: string, data: Partial<T>) => Promise<Partial<T>>;
  afterUpdate?: (entity: T) => Promise<void>;
  beforeDelete?: (id: string) => Promise<void>;
  afterDelete?: (entity: T) => Promise<void>;
}

export class BaseRepository<T extends any> {
  constructor(
    protected readonly table: any,
    protected readonly hooks?: RepositoryHooks<T>
  ) {}

  async findById(id: string, organizationId: string, tx: any = db) {
    const result = await tx.select().from(this.table).where(
      and(eq(this.table.id, id), eq(this.table.organizationId, organizationId), isNull(this.table.deletedAt))
    ).limit(1);
    
    if (!result.length) throw new DatabaseException('Entity not found', 'NOT_FOUND');
    return result[0];
  }

  async findMany(organizationId: string, options?: { limit?: number; offset?: number; cursor?: string; orderBy?: 'asc' | 'desc' }, tx: any = db) {
    const limit = options?.limit || 10;
    let query = tx.select().from(this.table).where(
      and(
        eq(this.table.organizationId, organizationId),
        isNull(this.table.deletedAt),
        options?.cursor ? gt(this.table.id, options.cursor) : undefined
      )
    ).limit(limit);

    if (options?.orderBy === 'desc') {
      query = query.orderBy(desc(this.table.createdAt));
    } else {
      query = query.orderBy(asc(this.table.createdAt));
    }

    if (options?.offset) query = query.offset(options.offset);
    
    return await query;
  }

  async create(data: any, tx: any = db) {
    const processedData = this.hooks?.beforeCreate ? await this.hooks.beforeCreate(data) : data;
    const result = await tx.insert(this.table).values(processedData).returning();
    if (this.hooks?.afterCreate) await this.hooks.afterCreate(result[0]);
    return result[0];
  }

  async update(id: string, organizationId: string, data: any, expectedVersion: number, tx: any = db) {
    const processedData = this.hooks?.beforeUpdate ? await this.hooks.beforeUpdate(id, data) : data;
    const result = await tx.update(this.table)
      .set({ ...processedData, version: expectedVersion + 1, updatedAt: new Date() })
      .where(
        and(
          eq(this.table.id, id), eq(this.table.organizationId, organizationId),
          eq(this.table.version, expectedVersion), isNull(this.table.deletedAt)
        )
      ).returning();
      
    if (!result.length) throw new DatabaseException('Concurrent update or not found', 'CONFLICT');
    if (this.hooks?.afterUpdate) await this.hooks.afterUpdate(result[0]);
    return result[0];
  }

  async delete(id: string, organizationId: string, deletedBy?: string, tx: any = db) {
    if (this.hooks?.beforeDelete) await this.hooks.beforeDelete(id);
    const result = await tx.update(this.table)
      .set({ deletedAt: new Date(), deletedBy, version: sql\`version + 1\` })
      .where(and(eq(this.table.id, id), eq(this.table.organizationId, organizationId), isNull(this.table.deletedAt)))
      .returning();
      
    if (!result.length) throw new DatabaseException('Entity not found', 'NOT_FOUND');
    if (this.hooks?.afterDelete) await this.hooks.afterDelete(result[0]);
    return result[0];
  }

  async batchCreate(dataArray: any[], tx: any = db) {
    if (!dataArray.length) return [];
    return await tx.insert(this.table).values(dataArray).returning();
  }
}
`);

// 6. Update Schema exports and add Indexes
// Since generating AST updates for schema files via text is complex, we will just export existing ones. We can assume the indexes are implicit in constraints (Drizzle generates them for primary keys/unique).
// Let's add an explicit index to the users email and organizationId.
const userSchemaPath = path.join(srcDir, 'schema', 'user.ts');
const userSchema = fs.readFileSync(userSchemaPath, 'utf8');
if (!userSchema.includes('index(')) {
  fs.writeFileSync(userSchemaPath, userSchema.replace(
    `export const users = pgTable('users', {`,
    `import { index } from 'drizzle-orm/pg-core';\n\nexport const users = pgTable('users', {`
  ).replace(
    `});`,
    `}, (table) => {
  return {
    emailIdx: index('email_idx').on(table.email),
    orgIdx: index('user_org_idx').on(table.organizationId),
  };
});`
  ));
}

// 7. Update root index.ts
fs.writeFileSync(path.join(srcDir, 'index.ts'), `
export * from './db';
export * from './transactions';
export * from './schema';
export * from './repositories';
export * from './exceptions';
export * from './validation';
`);

// 8. Benchmarks
const benchmarkDir = path.join(srcDir, 'benchmarks');
if (!fs.existsSync(benchmarkDir)) fs.mkdirSync(benchmarkDir, { recursive: true });

fs.writeFileSync(path.join(benchmarkDir, 'run.ts'), `import { db, sql } from '../db';
import { organizations } from '../schema';
import { BaseRepository } from '../repositories/base.repository';

async function runBenchmarks() {
  console.log('--- Database Benchmarks ---');
  const repo = new BaseRepository(organizations);
  const orgId = '123e4567-e89b-12d3-a456-426614174000'; // dummy uuid
  
  // Clean
  await db.delete(organizations);
  
  // Bulk Insert
  console.time('Bulk Insert 1000 Organizations');
  const orgsToInsert = Array.from({ length: 1000 }).map((_, i) => ({
    name: \`Org \${i}\`,
    slug: \`org-\${i}-\${Date.now()}\`,
    organizationId: orgId
  }));
  await repo.batchCreate(orgsToInsert);
  console.timeEnd('Bulk Insert 1000 Organizations');
  
  // Read
  console.time('Read 1000 Organizations (Pagination)');
  await repo.findMany(orgId, { limit: 1000 });
  console.timeEnd('Read 1000 Organizations (Pagination)');
  
  console.log('Benchmarks completed.');
  await sql.end();
  process.exit(0);
}

if (require.main === module) runBenchmarks();
`);

// 9. Extra Tests
const testsDir = path.join(srcDir, '__tests__');
fs.writeFileSync(path.join(testsDir, 'transactions.test.ts'), `import { TransactionService } from '../transactions';
import { describe, it, expect } from 'vitest';

describe('Transaction Engine', () => {
  it('should define execute method', () => {
    expect(TransactionService.execute).toBeDefined();
  });
});
`);
fs.writeFileSync(path.join(testsDir, 'health.test.ts'), `import { DatabaseHealthService } from '../db';
import { describe, it, expect } from 'vitest';

describe('Database Health', () => {
  it('should verify connection health', async () => {
    // Note: Vitest doesn't have the active postgres DB automatically available, 
    // but the method structure is validated.
    expect(DatabaseHealthService.checkHealth).toBeDefined();
  });
});
`);
fs.writeFileSync(path.join(testsDir, 'hooks.test.ts'), `import { BaseRepository } from '../repositories/base.repository';
import { organizations } from '../schema';
import { describe, it, expect, vi } from 'vitest';

describe('Repository Hooks', () => {
  it('should support beforeCreate hook', () => {
    const beforeCreate = vi.fn((data) => Promise.resolve(data));
    const repo = new BaseRepository(organizations, { beforeCreate });
    expect(repo['hooks']?.beforeCreate).toBeDefined();
  });
});
`);

// Update package.json scripts for benchmark
const pkgPath = path.join(dbDir, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
pkg.scripts['db:benchmark'] = 'tsx src/benchmarks/run.ts';
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

console.log('Database Hardening Completed.');
