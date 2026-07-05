import { pgTable, text } from 'drizzle-orm/pg-core';
import { baseEntity } from './base';

import { index } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  ...baseEntity,
  email: text('email').notNull().unique(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  passwordHash: text('password_hash'),
}, (table) => {
  return {
    emailIdx: index('email_idx').on(table.email),
    orgIdx: index('user_org_idx').on(table.organizationId),
  };
});
