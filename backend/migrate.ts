
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { migrate } from 'drizzle-orm/libsql/migrator';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const db = drizzle(client);

async function runMigration() {
  await migrate(db, { migrationsFolder: './drizzle' });
  console.log('Migration completed');
}

runMigration().catch(console.error);
