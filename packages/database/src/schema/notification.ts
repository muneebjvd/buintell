import { pgTable, text, boolean, uuid } from 'drizzle-orm/pg-core';
import { baseEntity } from './base';
import { users } from './user';

export const notifications = pgTable('notifications', {
  ...baseEntity,
  userId: uuid('user_id').notNull().references(() => users.id),
  title: text('title').notNull(),
  content: text('content').notNull(),
  read: boolean('read').notNull().default(false),
});
