import { db, sql } from '../db';
import { organizations } from '../schema';
import { BaseRepository } from '../repositories/base.repository';

async function runBenchmarks() {
  console.log('--- Database Benchmarks ---');
  const repo = new BaseRepository(organizations);
  const orgId = '123e4567-e89b-12d3-a456-426614174000'; // dummy uuid
  
  // Clean
  await db.delete(organizations);
  
  // Bulk Insert
  console.time('Bulk Insert 1000 Organizations');
  const orgsToInsert = Array.from({ length: 1000 }).map((_, i) => ({
    name: `Org ${i}`,
    slug: `org-${i}-${Date.now()}`,
    organizationId: orgId
  }));
  await repo.batchCreate(orgsToInsert);
  console.timeEnd('Bulk Insert 1000 Organizations');
  
  // Read
  console.time('Read 1000 Organizations (Pagination)');
  await repo.findMany(orgId, { limit: 1000 });
  console.timeEnd('Read 1000 Organizations (Pagination)');
  
  console.log('Benchmarks completed.');
  await sql.end();
  process.exit(0);
}

if (require.main === module) runBenchmarks();
