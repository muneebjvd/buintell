import { BaseRepository } from '../repositories/base.repository';
import { organizations } from '../schema';
import { describe, it, expect, vi } from 'vitest';

describe('Repository Hooks', () => {
  it('should support beforeCreate hook', () => {
    const beforeCreate = vi.fn((data) => Promise.resolve(data));
    const repo = new BaseRepository(organizations, { beforeCreate });
    expect(repo['hooks']?.beforeCreate).toBeDefined();
  });
});
