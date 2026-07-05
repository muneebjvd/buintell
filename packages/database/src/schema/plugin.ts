import { pgTable, text, jsonb, boolean } from 'drizzle-orm/pg-core';
import { baseEntity } from './base';

export const plugins = pgTable('plugins', {
  ...baseEntity,
  name: text('name').notNull(),
  version: text('version').notNull(),
  enabled: boolean('enabled').notNull().default(false),
});

export const pluginConfigurations = pgTable('plugin_configurations', {
  ...baseEntity,
  pluginId: text('plugin_id').notNull(),
  config: jsonb('config'),
});
