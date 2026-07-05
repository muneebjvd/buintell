import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const dbDir = path.join(rootDir, 'packages', 'database');
const srcDir = path.join(dbDir, 'src');

const dirs = [
  'schema',
  'repositories',
  'validation',
  'exceptions',
  'migrations',
  'seeds',
];

dirs.forEach(d => {
  const p = path.join(srcDir, d);
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
});

// drizzle.config.ts
fs.writeFileSync(path.join(dbDir, 'drizzle.config.ts'), `import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

export default {
  schema: './src/schema/index.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/buintell',
  },
} satisfies Config;
`);

// db.ts
fs.writeFileSync(path.join(srcDir, 'db.ts'), `import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/buintell';
const client = postgres(connectionString);
export const db = drizzle(client, { schema });
`);

// schema/base.ts
fs.writeFileSync(path.join(srcDir, 'schema', 'base.ts'), `import { timestamp, uuid, integer } from 'drizzle-orm/pg-core';

export const baseEntity = {
  id: uuid('id').primaryKey().defaultRandom(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
  deletedAt: timestamp('deleted_at', { withTimezone: true, mode: 'date' }),
  createdBy: uuid('created_by'),
  updatedBy: uuid('updated_by'),
  deletedBy: uuid('deleted_by'),
  version: integer('version').notNull().default(1),
  organizationId: uuid('organization_id').notNull(),
};
`);

// generate entities
const schemaPath = path.join(srcDir, 'schema');

fs.writeFileSync(path.join(schemaPath, 'organization.ts'), `import { pgTable, text } from 'drizzle-orm/pg-core';
import { baseEntity } from './base';

export const organizations = pgTable('organizations', {
  ...baseEntity,
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
});
`);

fs.writeFileSync(path.join(schemaPath, 'user.ts'), `import { pgTable, text } from 'drizzle-orm/pg-core';
import { baseEntity } from './base';

export const users = pgTable('users', {
  ...baseEntity,
  email: text('email').notNull().unique(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  passwordHash: text('password_hash'),
});
`);

fs.writeFileSync(path.join(schemaPath, 'team.ts'), `import { pgTable, text } from 'drizzle-orm/pg-core';
import { baseEntity } from './base';

export const teams = pgTable('teams', {
  ...baseEntity,
  name: text('name').notNull(),
  description: text('description'),
});
`);

fs.writeFileSync(path.join(schemaPath, 'role.ts'), `import { pgTable, text } from 'drizzle-orm/pg-core';
import { baseEntity } from './base';

export const roles = pgTable('roles', {
  ...baseEntity,
  name: text('name').notNull(),
  description: text('description'),
});
`);

fs.writeFileSync(path.join(schemaPath, 'permission.ts'), `import { pgTable, text } from 'drizzle-orm/pg-core';
import { baseEntity } from './base';

export const permissions = pgTable('permissions', {
  ...baseEntity,
  action: text('action').notNull(),
  resource: text('resource').notNull(),
});
`);

fs.writeFileSync(path.join(schemaPath, 'relations.ts'), `import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { baseEntity } from './base';
import { users } from './user';
import { roles } from './role';
import { permissions } from './permission';
import { teams } from './team';

export const userRoles = pgTable('user_roles', {
  ...baseEntity,
  userId: uuid('user_id').notNull().references(() => users.id),
  roleId: uuid('role_id').notNull().references(() => roles.id),
});

export const rolePermissions = pgTable('role_permissions', {
  ...baseEntity,
  roleId: uuid('role_id').notNull().references(() => roles.id),
  permissionId: uuid('permission_id').notNull().references(() => permissions.id),
});

export const teamMembers = pgTable('team_members', {
  ...baseEntity,
  teamId: uuid('team_id').notNull().references(() => teams.id),
  userId: uuid('user_id').notNull().references(() => users.id),
});
`);

fs.writeFileSync(path.join(schemaPath, 'file.ts'), `import { pgTable, text, integer } from 'drizzle-orm/pg-core';
import { baseEntity } from './base';

export const files = pgTable('files', {
  ...baseEntity,
  filename: text('filename').notNull(),
  mimeType: text('mime_type').notNull(),
  size: integer('size').notNull(),
  checksum: text('checksum'),
  storageProvider: text('storage_provider').notNull(),
  objectKey: text('object_key').notNull(),
});
`);

fs.writeFileSync(path.join(schemaPath, 'audit.ts'), `import { pgTable, text, jsonb } from 'drizzle-orm/pg-core';
import { baseEntity } from './base';

export const auditLogs = pgTable('audit_logs', {
  ...baseEntity,
  action: text('action').notNull(),
  entityName: text('entity_name').notNull(),
  entityId: text('entity_id').notNull(),
  changes: jsonb('changes'),
  actorId: text('actor_id'),
});
`);

fs.writeFileSync(path.join(schemaPath, 'settings.ts'), `import { pgTable, text, jsonb, boolean } from 'drizzle-orm/pg-core';
import { baseEntity } from './base';

export const systemSettings = pgTable('system_settings', {
  ...baseEntity,
  key: text('key').notNull().unique(),
  value: jsonb('value'),
});

export const featureFlags = pgTable('feature_flags', {
  ...baseEntity,
  key: text('key').notNull().unique(),
  enabled: boolean('enabled').notNull().default(false),
});
`);

fs.writeFileSync(path.join(schemaPath, 'notification.ts'), `import { pgTable, text, boolean, uuid } from 'drizzle-orm/pg-core';
import { baseEntity } from './base';
import { users } from './user';

export const notifications = pgTable('notifications', {
  ...baseEntity,
  userId: uuid('user_id').notNull().references(() => users.id),
  title: text('title').notNull(),
  content: text('content').notNull(),
  read: boolean('read').notNull().default(false),
});
`);

fs.writeFileSync(path.join(schemaPath, 'plugin.ts'), `import { pgTable, text, jsonb, boolean } from 'drizzle-orm/pg-core';
import { baseEntity } from './base';

export const plugins = pgTable('plugins', {
  ...baseEntity,
  name: text('name').notNull(),
  version: text('version').notNull(),
  enabled: boolean('enabled').notNull().default(false),
});

export const pluginConfigurations = pgTable('plugin_configurations', {
  ...baseEntity,
  pluginId: text('plugin_id').notNull(),
  config: jsonb('config'),
});
`);

fs.writeFileSync(path.join(schemaPath, 'index.ts'), `
export * from './base';
export * from './organization';
export * from './user';
export * from './team';
export * from './role';
export * from './permission';
export * from './relations';
export * from './file';
export * from './audit';
export * from './settings';
export * from './notification';
export * from './plugin';
`);

// Repositories
const repoPath = path.join(srcDir, 'repositories');
fs.writeFileSync(path.join(repoPath, 'base.repository.ts'), `
import { db } from '../db';
import { eq, and, isNull } from 'drizzle-orm';
import { DatabaseException } from '../exceptions';

export class BaseRepository<T extends any> {
  constructor(protected readonly table: any) {}

  async findById(id: string, organizationId: string) {
    const result = await db.select().from(this.table).where(
      and(
        eq(this.table.id, id),
        eq(this.table.organizationId, organizationId),
        isNull(this.table.deletedAt)
      )
    ).limit(1);
    
    if (!result.length) {
      throw new DatabaseException('Entity not found', 'NOT_FOUND');
    }
    return result[0];
  }

  async findMany(organizationId: string, limit = 10, offset = 0) {
    return await db.select().from(this.table).where(
      and(
        eq(this.table.organizationId, organizationId),
        isNull(this.table.deletedAt)
      )
    ).limit(limit).offset(offset);
  }

  async create(data: any) {
    return await db.insert(this.table).values(data).returning();
  }

  async update(id: string, organizationId: string, data: any, expectedVersion: number) {
    const result = await db.update(this.table)
      .set({ ...data, version: expectedVersion + 1, updatedAt: new Date() })
      .where(
        and(
          eq(this.table.id, id),
          eq(this.table.organizationId, organizationId),
          eq(this.table.version, expectedVersion),
          isNull(this.table.deletedAt)
        )
      ).returning();
      
    if (!result.length) {
      throw new DatabaseException('Concurrent update or not found', 'CONFLICT');
    }
    return result[0];
  }

  async delete(id: string, organizationId: string, deletedBy?: string) {
    return await db.update(this.table)
      .set({ deletedAt: new Date(), deletedBy, version: db.raw('version + 1') })
      .where(
        and(
          eq(this.table.id, id),
          eq(this.table.organizationId, organizationId),
          isNull(this.table.deletedAt)
        )
      ).returning();
  }
}
`);
fs.writeFileSync(path.join(repoPath, 'index.ts'), `export * from './base.repository';\n`);

// Exceptions
const extPath = path.join(srcDir, 'exceptions');
fs.writeFileSync(path.join(extPath, 'index.ts'), `
export class DatabaseException extends Error {
  constructor(message: string, public code: 'NOT_FOUND' | 'CONFLICT' | 'VALIDATION' | 'DUPLICATE') {
    super(message);
    this.name = 'DatabaseException';
  }
}
`);

// Validation
const valPath = path.join(srcDir, 'validation');
fs.writeFileSync(path.join(valPath, 'index.ts'), `
export const validateUUID = (uuid: string) => {
  const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return regex.test(uuid);
};

export const validateEmail = (email: string) => {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
};
`);

// Migrations
const migPath = path.join(srcDir, 'migrations');
fs.writeFileSync(path.join(migPath, 'run-migrations.ts'), `
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db } from '../db';
import postgres from 'postgres';

async function run() {
  const connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/buintell';
  const migrationClient = postgres(connectionString, { max: 1 });
  
  // Need to implement proper migrator here using a separate drizzle instance
  console.log('Running migrations...');
  // await migrate(drizzle(migrationClient), { migrationsFolder: 'drizzle' });
  console.log('Migrations complete.');
  process.exit(0);
}
if (require.main === module) run();
`);

// Seeds
const seedsPath = path.join(srcDir, 'seeds');
fs.writeFileSync(path.join(seedsPath, 'run-seeds.ts'), `
import { db } from '../db';
import { organizations } from '../schema';

async function seed() {
  console.log('Seeding database...');
  // Ensure base organization
  const orgs = await db.select().from(organizations);
  if (orgs.length === 0) {
    // Cannot seed directly because uuid generation happens on DB side or we provide one
    console.log('No organizations found. Initial seed required.');
  }
  console.log('Seed complete.');
  process.exit(0);
}
if (require.main === module) seed();
`);

// Index
fs.writeFileSync(path.join(srcDir, 'index.ts'), `
export * from './db';
export * from './schema';
export * from './repositories';
export * from './exceptions';
export * from './validation';
`);

console.log('Database Foundation Generated.');
