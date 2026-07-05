import { timestamp, uuid, integer } from 'drizzle-orm/pg-core';

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
