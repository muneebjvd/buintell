
export type ErrorCode = 
  | 'NOT_FOUND' 
  | 'CONFLICT' 
  | 'VALIDATION' 
  | 'DUPLICATE' 
  | 'FOREIGN_KEY'
  | 'TRANSACTION_ERROR'
  | 'TIMEOUT'
  | 'PERMISSION_DENIED';

export class DatabaseException extends Error {
  constructor(message: string, public code: ErrorCode, public originalError?: any) {
    super(message);
    this.name = 'DatabaseException';
  }
}
