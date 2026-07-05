
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
