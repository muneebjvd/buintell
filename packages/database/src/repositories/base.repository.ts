
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
      .set({ deletedAt: new Date(), deletedBy, version: sql`version + 1` })
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
