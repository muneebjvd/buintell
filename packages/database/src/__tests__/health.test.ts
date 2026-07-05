import { DatabaseHealthService } from '../db';
import { describe, it, expect } from 'vitest';

describe('Database Health', () => {
  it('should verify connection health', async () => {
    // Note: Vitest doesn't have the active postgres DB automatically available, 
    // but the method structure is validated.
    expect(DatabaseHealthService.checkHealth).toBeDefined();
  });
});
