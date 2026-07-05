import { describe, it, expect } from 'vitest';
import { users, roles, userRoles } from '../schema';

describe('Entity Relations', () => {
  it('should export relationships properly', () => {
    expect(users).toBeDefined();
    expect(roles).toBeDefined();
    expect(userRoles).toBeDefined();
  });
});
