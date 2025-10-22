import { useCallback } from 'react';
import * as monaco from 'monaco-editor';
import { FileOperationDto } from '../api/types';
import { FileOperationType } from '../api/enums';

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

/**
 * Custom hook for applying file operations to Monaco Editor
 * Handles CREATE, UPDATE, and DELETE operations on editor models
 */
export const useFileOperations = (
  editorInstance: monaco.editor.IStandaloneCodeEditor | null
) => {
  /**
   * Detect programming language from file extension
   */
  const detectLanguage = useCallback((filePath: string): string => {
    const ext = filePath.split('.').pop()?.toLowerCase();
    const languageMap: Record<string, string> = {
      'ts': 'typescript',
      'tsx': 'typescript',
      'js': 'javascript',
      'jsx': 'javascript',
      'py': 'python',
      'json': 'json',
      'md': 'markdown',
      'html': 'html',
      'css': 'css',
      'scss': 'scss',
      'less': 'less',
      'xml': 'xml',
      'yaml': 'yaml',
      'yml': 'yaml',
      'sql': 'sql',
      'sh': 'shell',
      'bash': 'shell',
      'c': 'c',
      'cpp': 'cpp',
      'cs': 'csharp',
      'java': 'java',
      'go': 'go',
      'rs': 'rust',
      'php': 'php',
      'rb': 'ruby',
      'swift': 'swift',
      'kt': 'kotlin',
      'r': 'r',
      'dart': 'dart',
      'lua': 'lua',
    };
    return languageMap[ext || ''] || 'plaintext';
  }, []);

  /**
   * Apply file operations to the Monaco editor
   */
  const applyFileOperations = useCallback(
    async (operations: FileOperationDto[]) => {
      if (!editorInstance) {
        console.error('Editor instance not available');
        return;
      }

      for (const op of operations) {
        const uri = monaco.Uri.file(op.filePath);
        const normalizedType = normalizeOperationType(op.operationType);

        try {
          switch (normalizedType) {
            case FileOperationType._0: // CREATE
              {
                // Check if model already exists
                let model = monaco.editor.getModel(uri);

                if (!model && op.content !== undefined) {
                  // Create new model (new tab)
                  const language = detectLanguage(op.filePath);
                  model = monaco.editor.createModel(op.content, language, uri);
                  console.log(`Created new file: ${op.filePath}`);
                }

                // Switch to this file and focus line if specified
                if (model) {
                  editorInstance.setModel(model);
                  if (op.focusLine && op.focusLine > 0) {
                    editorInstance.revealLineInCenter(op.focusLine);
                    editorInstance.setPosition({
                      lineNumber: op.focusLine,
                      column: 1
                    });
                  }
                }
              }
              break;

            case FileOperationType._1: // UPDATE
              {
                let model = monaco.editor.getModel(uri);

                if (!model && op.content !== undefined) {
                  // Model doesn't exist, create it
                  const language = detectLanguage(op.filePath);
                  model = monaco.editor.createModel(op.content, language, uri);
                  console.log(`Created file (via update): ${op.filePath}`);
                } else if (model && op.content !== undefined) {
                  // Update existing model
                  model.setValue(op.content);
                  console.log(`Updated file: ${op.filePath}`);
                }

                // Switch to this file and focus line if specified
                if (model) {
                  editorInstance.setModel(model);
                  if (op.focusLine && op.focusLine > 0) {
                    editorInstance.revealLineInCenter(op.focusLine);
                    editorInstance.setPosition({
                      lineNumber: op.focusLine,
                      column: 1
                    });
                  }
                }
              }
              break;

            case FileOperationType._2: // DELETE
              {
                const modelToDelete = monaco.editor.getModel(uri);

                if (modelToDelete) {
                  // If this is the active model, switch to another tab first
                  if (editorInstance.getModel() === modelToDelete) {
                    const allModels = monaco.editor.getModels();
                    const otherModel = allModels.find(m => m !== modelToDelete);

                    if (otherModel) {
                      editorInstance.setModel(otherModel);
                    } else {
                      // No other models, create an empty one
                      editorInstance.setModel(null);
                    }
                  }

                  // Dispose the model
                  modelToDelete.dispose();
                  console.log(`Deleted file: ${op.filePath}`);
                }
              }
              break;

            default:
              console.warn(`Unknown operation type: ${op.operationType}`);
          }
        } catch (error) {
          console.error(`Error applying operation to ${op.filePath}:`, error);
        }
      }
    },
    [editorInstance, detectLanguage]
  );

  return { applyFileOperations };
};
