import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { DatabaseException } from './exceptions';

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/buintell';

export const sql = postgres(connectionString, {
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
});

export const db = drizzle(sql, { schema });

export class DatabaseHealthService {
  static async checkHealth() {
    try {
      const start = Date.now();
      await sql`SELECT 1`;
      const latency = Date.now() - start;
      return { status: 'healthy', latency, poolActive: true };
    } catch (e) {
      return { status: 'unhealthy', error: e instanceof Error ? e.message : 'Unknown error' };
    }
  }

  static async shutdown() {
    console.log('Closing database connections...');
    await sql.end({ timeout: 5 });
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  await DatabaseHealthService.shutdown();
  process.exit(0);
});
process.on('SIGTERM', async () => {
  await DatabaseHealthService.shutdown();
  process.exit(0);
});
