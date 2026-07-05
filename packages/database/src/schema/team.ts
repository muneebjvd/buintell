import { pgTable, text } from 'drizzle-orm/pg-core';
import { baseEntity } from './base';

export const teams = pgTable('teams', {
  ...baseEntity,
  name: text('name').notNull(),
  description: text('description'),
});
