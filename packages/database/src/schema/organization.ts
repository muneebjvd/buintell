import { pgTable, text } from 'drizzle-orm/pg-core';
import { baseEntity } from './base';

export const organizations = pgTable('organizations', {
  ...baseEntity,
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
});
