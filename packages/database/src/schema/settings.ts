import { pgTable, text, jsonb, boolean } from 'drizzle-orm/pg-core';
import { baseEntity } from './base';

export const systemSettings = pgTable('system_settings', {
  ...baseEntity,
  key: text('key').notNull().unique(),
  value: jsonb('value'),
});

export const featureFlags = pgTable('feature_flags', {
  ...baseEntity,
  key: text('key').notNull().unique(),
  enabled: boolean('enabled').notNull().default(false),
});
