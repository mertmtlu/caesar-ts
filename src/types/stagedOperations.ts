import { FileOperationDto } from '../api/types';

/**
 * Represents a pending file operation that needs user approval
 */
export interface PendingFileOperation {
  /** Unique ID for tracking this staged operation */
  id: string;

  /** The original file operation from AI */
  operation: FileOperationDto;

  /** Whether this operation is approved by the user */
  isApproved: boolean;

  /** Original content before the change (for UPDATE/DELETE) */
  originalContent?: string;

  /** New content after the change (for CREATE/UPDATE) */
  newContent?: string;

  /** Timestamp when operation was staged */
  stagedAt: Date;
}

/**
 * Result of applying a set of operations
 */
export interface OperationApplicationResult {
  /** Number of operations successfully applied */
  appliedCount: number;

  /** Number of operations that failed */
  failedCount: number;

  /** Error messages for failed operations */
  errors: Array<{ operationId: string; error: string }>;
}
