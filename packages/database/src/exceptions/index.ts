
export class DatabaseException extends Error {
  constructor(message: string, public code: 'NOT_FOUND' | 'CONFLICT' | 'VALIDATION' | 'DUPLICATE') {
    super(message);
    this.name = 'DatabaseException';
  }
}
