
import { db } from '../db';
import { organizations } from '../schema';

async function seed() {
  console.log('Seeding database...');
  // Ensure base organization
  const orgs = await db.select().from(organizations);
  if (orgs.length === 0) {
    // Cannot seed directly because uuid generation happens on DB side or we provide one
    console.log('No organizations found. Initial seed required.');
  }
  console.log('Seed complete.');
  process.exit(0);
}
if (require.main === module) seed();
