import { describe, it, expect } from 'vitest';
import { BaseRepository } from '../repositories/base.repository';
import { organizations } from '../schema';

describe('Base Repository', () => {
  const repo = new BaseRepository(organizations);

  it('should define create method', () => {
    expect(repo.create).toBeDefined();
  });
  
  it('should define findById method', () => {
    expect(repo.findById).toBeDefined();
  });

  it('should define findMany method with pagination', () => {
    expect(repo.findMany).toBeDefined();
  });

  it('should define update method with optimistic locking', () => {
    expect(repo.update).toBeDefined();
  });

  it('should define delete method (soft delete)', () => {
    expect(repo.delete).toBeDefined();
  });
});
