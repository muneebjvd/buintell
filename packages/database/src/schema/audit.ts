import { pgTable, text, jsonb } from 'drizzle-orm/pg-core';
import { baseEntity } from './base';

export const auditLogs = pgTable('audit_logs', {
  ...baseEntity,
  action: text('action').notNull(),
  entityName: text('entity_name').notNull(),
  entityId: text('entity_id').notNull(),
  changes: jsonb('changes'),
  actorId: text('actor_id'),
});
