import { describe, it, expect } from 'vitest';
import { validateUUID, validateEmail } from '../validation';

describe('Validation Utilities', () => {
  it('should validate valid UUIDs', () => {
    expect(validateUUID('123e4567-e89b-12d3-a456-426614174000')).toBe(true);
  });
  
  it('should invalidate invalid UUIDs', () => {
    expect(validateUUID('invalid-uuid')).toBe(false);
  });
  
  it('should validate valid emails', () => {
    expect(validateEmail('test@example.com')).toBe(true);
  });
  
  it('should invalidate invalid emails', () => {
    expect(validateEmail('invalid-email')).toBe(false);
  });
});
