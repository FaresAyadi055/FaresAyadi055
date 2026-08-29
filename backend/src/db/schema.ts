
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const analytics = sqliteTable('analytics', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  path: text('path').notNull(),
  timestamp: integer('timestamp').notNull(),
  ipAddress: text('ip_address'),
});

export const chatSessions = sqliteTable('chat_sessions', {
  id: text('id').primaryKey(), // Using UUID
  createdAt: integer('created_at').notNull(),
  metadata: text('metadata'),
});

export const chatMessages = sqliteTable('chat_messages', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  sessionId: text('session_id').references(() => chatSessions.id).notNull(),
  role: text('role').notNull(), // 'user' or 'assistant'
  content: text('content').notNull(),
  timestamp: integer('timestamp').notNull(),
});
