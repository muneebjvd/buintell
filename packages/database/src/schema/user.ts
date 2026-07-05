import { pgTable, text } from 'drizzle-orm/pg-core';
import { baseEntity } from './base';

export const users = pgTable('users', {
  ...baseEntity,
  email: text('email').notNull().unique(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  passwordHash: text('password_hash'),
});
