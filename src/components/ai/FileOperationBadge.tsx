import React from 'react';
import { FilePlus, FileEdit, FileX } from 'lucide-react';
import { FileOperationDto } from '../../api/types';
import { FileOperationType } from '../../api/enums';

/**
 * Convert string operation type to enum
 * Handles both string ("CREATE") and numeric (0) formats from backend
 */
const normalizeOperationType = (operationType: any): FileOperationType => {
  if (typeof operationType === 'number') {
    return operationType;
  }

  // Handle string values
  const stringType = String(operationType).toUpperCase();
  switch (stringType) {
    case 'CREATE':
      return FileOperationType._0;
    case 'UPDATE':
      return FileOperationType._1;
    case 'DELETE':
      return FileOperationType._2;
    default:
      console.warn(`Unknown operation type: ${operationType}, defaulting to UPDATE`);
      return FileOperationType._1;
  }
};

interface FileOperationBadgeProps {
  operation: FileOperationDto;
  onClick?: () => void;
}

export const FileOperationBadge: React.FC<FileOperationBadgeProps> = ({ operation, onClick }) => {
  const getOperationDetails = () => {
    const normalizedType = normalizeOperationType(operation.operationType);

    switch (normalizedType) {
      case FileOperationType._0: // CREATE
        return {
          icon: FilePlus,
          label: 'CREATE',
          bgColor: 'bg-green-100 dark:bg-green-900/30',
          textColor: 'text-green-700 dark:text-green-300',
          borderColor: 'border-green-300 dark:border-green-700',
        };
      case FileOperationType._1: // UPDATE
        return {
          icon: FileEdit,
          label: 'UPDATE',
          bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
          textColor: 'text-yellow-700 dark:text-yellow-300',
          borderColor: 'border-yellow-300 dark:border-yellow-700',
        };
      case FileOperationType._2: // DELETE
        return {
          icon: FileX,
          label: 'DELETE',
          bgColor: 'bg-red-100 dark:bg-red-900/30',
          textColor: 'text-red-700 dark:text-red-300',
          borderColor: 'border-red-300 dark:border-red-700',
        };
      default:
        return {
          icon: FileEdit,
          label: 'UNKNOWN',
          bgColor: 'bg-gray-100 dark:bg-gray-900/30',
          textColor: 'text-gray-700 dark:text-gray-300',
          borderColor: 'border-gray-300 dark:border-gray-700',
        };
    }
  };

  const details = getOperationDetails();
  const Icon = details.icon;

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${details.bgColor} ${details.textColor} ${details.borderColor} ${onClick ? 'cursor-pointer hover:opacity-80' : ''}`}
      title={operation.description}
    >
      <Icon className="h-3.5 w-3.5" />
      <span className="font-semibold">{details.label}</span>
      <span className="truncate max-w-[200px]">{operation.filePath}</span>
    </div>
  );
};

interface FileOperationsSummaryProps {
  operations: FileOperationDto[];
}

export const FileOperationsSummary: React.FC<FileOperationsSummaryProps> = ({ operations }) => {
  if (!operations || operations.length === 0) return null;

  const counts = operations.reduce((acc, op) => {
    const type = normalizeOperationType(op.operationType);
    if (type === FileOperationType._0) acc.create++;
    else if (type === FileOperationType._1) acc.update++;
    else if (type === FileOperationType._2) acc.delete++;
    return acc;
  }, { create: 0, update: 0, delete: 0 });

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {counts.create > 0 && (
        <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-300 dark:border-green-700">
          <FilePlus className="h-3 w-3" />
          {counts.create} Created
        </div>
      )}
      {counts.update > 0 && (
        <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border border-yellow-300 dark:border-yellow-700">
          <FileEdit className="h-3 w-3" />
          {counts.update} Updated
        </div>
      )}
      {counts.delete > 0 && (
        <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-700">
          <FileX className="h-3 w-3" />
          {counts.delete} Deleted
        </div>
      )}
    </div>
  );
};
