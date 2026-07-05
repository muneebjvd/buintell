import { pgTable, text, integer } from 'drizzle-orm/pg-core';
import { baseEntity } from './base';

export const files = pgTable('files', {
  ...baseEntity,
  filename: text('filename').notNull(),
  mimeType: text('mime_type').notNull(),
  size: integer('size').notNull(),
  checksum: text('checksum'),
  storageProvider: text('storage_provider').notNull(),
  objectKey: text('object_key').notNull(),
});
