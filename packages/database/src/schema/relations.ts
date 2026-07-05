import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { baseEntity } from './base';
import { users } from './user';
import { roles } from './role';
import { permissions } from './permission';
import { teams } from './team';

export const userRoles = pgTable('user_roles', {
  ...baseEntity,
  userId: uuid('user_id').notNull().references(() => users.id),
  roleId: uuid('role_id').notNull().references(() => roles.id),
});

export const rolePermissions = pgTable('role_permissions', {
  ...baseEntity,
  roleId: uuid('role_id').notNull().references(() => roles.id),
  permissionId: uuid('permission_id').notNull().references(() => permissions.id),
});

export const teamMembers = pgTable('team_members', {
  ...baseEntity,
  teamId: uuid('team_id').notNull().references(() => teams.id),
  userId: uuid('user_id').notNull().references(() => users.id),
});
