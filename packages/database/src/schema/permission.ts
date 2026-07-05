import { pgTable, text } from 'drizzle-orm/pg-core';
import { baseEntity } from './base';

export const permissions = pgTable('permissions', {
  ...baseEntity,
  action: text('action').notNull(),
  resource: text('resource').notNull(),
});
