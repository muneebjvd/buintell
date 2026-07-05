import { db } from './db';
import { DatabaseException } from './exceptions';

export class TransactionService {
  static async execute<T>(
    operation: (tx: any) => Promise<T>,
    options?: { retries?: number }
  ): Promise<T> {
    let attempts = 0;
    const maxRetries = options?.retries || 0;

    while (attempts <= maxRetries) {
      try {
        return await db.transaction(async (tx) => {
          return await operation(tx);
        });
      } catch (e: any) {
        attempts++;
        if (attempts > maxRetries || !this.isTransientError(e)) {
          throw new DatabaseException(
            e.message || 'Transaction failed',
            'TRANSACTION_ERROR',
            e
          );
        }
      }
    }
    throw new DatabaseException('Transaction failed after retries', 'TRANSACTION_ERROR');
  }

  private static isTransientError(error: any) {
    // 40001 serialization_failure, 40P01 deadlock_detected
    return error.code === '40001' || error.code === '40P01';
  }
}
