import { pgTable, text } from 'drizzle-orm/pg-core';
import { baseEntity } from './base';

export const roles = pgTable('roles', {
  ...baseEntity,
  name: text('name').notNull(),
  description: text('description'),
});
