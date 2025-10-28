import React, { useState } from 'react';
import { CheckCircle2, XCircle, ChevronDown, ChevronRight, Check, X, AlertTriangle } from 'lucide-react';
import { useAIStore } from '../../stores/aiStore';
import { DiffViewer } from './DiffViewer';
import { FileOperationType } from '../../api/enums';

interface FileOperationReviewPanelProps {
  /** Callback when user applies approved operations */
  onApply: () => void;

  /** Callback when user rejects all operations */
  onReject: () => void;
}

/**
 * Git-style review panel for file operations
 * Shows line-by-line diffs with approve/reject controls
 */
export const FileOperationReviewPanel: React.FC<FileOperationReviewPanelProps> = ({
  onApply,
  onReject,
}) => {
  const {
    stagedOperations,
    toggleOperationApproval,
    approveAllOperations,
    rejectAllOperations,
  } = useAIStore();

  const [expandedOperations, setExpandedOperations] = useState<Set<string>>(new Set());

  // Toggle expanded state for an operation
  const toggleExpanded = (operationId: string) => {
    setExpandedOperations(prev => {
      const next = new Set(prev);
      if (next.has(operationId)) {
        next.delete(operationId);
      } else {
        next.add(operationId);
      }
      return next;
    });
  };

  // Get operation type label
  const getOperationTypeLabel = (type: FileOperationType): string => {
    switch (type) {
      case FileOperationType._0:
        return 'CREATE';
      case FileOperationType._1:
        return 'UPDATE';
      case FileOperationType._2:
        return 'DELETE';
      default:
        return 'UNKNOWN';
    }
  };

  // Get operation type color classes
  const getOperationTypeColor = (type: FileOperationType): string => {
    switch (type) {
      case FileOperationType._0:
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-300 dark:border-green-700';
      case FileOperationType._1:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700';
      case FileOperationType._2:
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-300 dark:border-red-700';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  // Normalize operation type
  const normalizeOperationType = (operationType: any): FileOperationType => {
    if (typeof operationType === 'number') {
      return operationType;
    }
    const stringType = String(operationType).toUpperCase();
    switch (stringType) {
      case 'CREATE':
        return FileOperationType._0;
      case 'UPDATE':
        return FileOperationType._1;
      case 'DELETE':
        return FileOperationType._2;
      default:
        return FileOperationType._1;
    }
  };

  const approvedCount = stagedOperations.filter(op => op.isApproved).length;
  const totalCount = stagedOperations.length;

  if (totalCount === 0) {
    return null;
  }

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="px-4 py-3 bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Review File Operations
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {approvedCount} of {totalCount} operations approved
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                approveAllOperations();
              }}
              className="px-3 py-1.5 text-xs font-medium text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-md hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
            >
              <Check className="h-3 w-3 inline mr-1" />
              Approve All
            </button>
            <button
              onClick={() => {
                rejectAllOperations();
                onReject();
              }}
              className="px-3 py-1.5 text-xs font-medium text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-md hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
            >
              <X className="h-3 w-3 inline mr-1" />
              Reject All
            </button>
          </div>
        </div>
      </div>

      {/* Operations List */}
      <div className="max-h-[500px] overflow-y-auto">
        {stagedOperations.map((pendingOp) => {
          const isExpanded = expandedOperations.has(pendingOp.id);
          const opType = normalizeOperationType(pendingOp.operation.operationType);
          const typeLabel = getOperationTypeLabel(opType);
          const typeColor = getOperationTypeColor(opType);

          return (
            <div
              key={pendingOp.id}
              className="border-b border-gray-200 dark:border-gray-700"
            >
              {/* Operation Header */}
              <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                {/* Checkbox */}
                <button
                  onClick={() => toggleOperationApproval(pendingOp.id)}
                  className="flex-shrink-0"
                >
                  {pendingOp.isApproved ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <XCircle className="h-5 w-5 text-gray-400 dark:text-gray-600" />
                  )}
                </button>

                {/* Expand/Collapse */}
                <button
                  onClick={() => toggleExpanded(pendingOp.id)}
                  className="flex-shrink-0 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>

                {/* Operation Type Badge */}
                <span
                  className={`px-2 py-1 text-xs font-mono font-semibold rounded border ${typeColor}`}
                >
                  {typeLabel}
                </span>

                {/* File Path */}
                <span className="flex-1 text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                  {pendingOp.operation.filePath}
                </span>

                {/* Description */}
                {pendingOp.operation.description && (
                  <span className="hidden md:block text-xs text-gray-500 dark:text-gray-400 max-w-xs truncate">
                    {pendingOp.operation.description}
                  </span>
                )}
              </div>

              {/* Diff View (Expanded) */}
              {isExpanded && (
                <div className="px-4 pb-4">
                  <DiffViewer
                    originalContent={pendingOp.originalContent || ''}
                    modifiedContent={pendingOp.newContent || ''}
                    filePath={pendingOp.operation.filePath}
                    operationType={opType}
                    height="400px"
                  />
                  {pendingOp.operation.description && (
                    <div className="mt-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded text-xs text-blue-800 dark:text-blue-300">
                      <strong>Description:</strong> {pendingOp.operation.description}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Actions */}
      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="text-xs text-gray-600 dark:text-gray-400">
          Click on an operation to view the diff. Check/uncheck to approve/reject.
        </div>

        <button
          onClick={onApply}
          disabled={approvedCount === 0}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            approvedCount > 0
              ? 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
          }`}
        >
          Apply {approvedCount > 0 ? `${approvedCount} ` : ''}Selected
        </button>
      </div>
    </div>
  );
};
