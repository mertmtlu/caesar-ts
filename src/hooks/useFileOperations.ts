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
 * Editor file state management callbacks
 */
export interface FileOperationCallbacks {
  onCreateFile?: (path: string, content: string) => void;
  onUpdateFile?: (path: string, content: string) => void;
  onDeleteFile?: (path: string) => Promise<void>; // Now async - calls backend API
  onSetActiveFile?: (path: string) => void;
}

/**
 * Custom hook for applying file operations to Monaco Editor
 * Handles CREATE, UPDATE, and DELETE operations on editor models
 * Integrates with EditorPage state management via callbacks
 *
 * Now supports two modes:
 * 1. Direct application (auto-apply mode) - calls callbacks immediately
 * 2. Staged application (safe mode) - applies to editor state only
 */
export const useFileOperations = (
  editorInstance: monaco.editor.IStandaloneCodeEditor | null,
  callbacks?: FileOperationCallbacks
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
   * Apply file operations to the Monaco editor AND EditorPage state
   */
  const applyFileOperations = useCallback(
    async (operations: FileOperationDto[]) => {
      // Editor instance is optional - operations can work on state only
      if (!editorInstance) {
        console.warn('[FileOps] Editor instance not available, will only update state');
      }

      for (const op of operations) {
        const uri = monaco.Uri.file(op.filePath);
        const normalizedType = normalizeOperationType(op.operationType);

        try {
          switch (normalizedType) {
            case FileOperationType._0: // CREATE
              {
                console.log(`[FileOps] CREATE: ${op.filePath}`);

                // Notify EditorPage to add file to openFiles state FIRST
                if (callbacks?.onCreateFile && op.content !== undefined) {
                  callbacks.onCreateFile(op.filePath, op.content);
                  console.log(`[FileOps] Notified EditorPage of file creation: ${op.filePath}`);
                }

                // Only work with Monaco if editor instance is available
                if (editorInstance) {
                  // Check if model already exists
                  let model = monaco.editor.getModel(uri);

                  if (!model && op.content !== undefined) {
                    // Create new Monaco model
                    const language = detectLanguage(op.filePath);
                    model = monaco.editor.createModel(op.content, language, uri);
                    console.log(`[FileOps] Created Monaco model for: ${op.filePath}`);
                  }

                  // Switch to this file
                  if (model) {
                    editorInstance.setModel(model);

                    // Focus specific line if requested
                    if (op.focusLine && op.focusLine > 0) {
                      editorInstance.revealLineInCenter(op.focusLine);
                      editorInstance.setPosition({
                        lineNumber: op.focusLine,
                        column: 1
                      });
                    }
                  }
                }

                // Set as active file in EditorPage
                if (callbacks?.onSetActiveFile) {
                  callbacks.onSetActiveFile(op.filePath);
                  console.log(`[FileOps] Set active file: ${op.filePath}`);
                }
              }
              break;

            case FileOperationType._1: // UPDATE
              {
                console.log(`[FileOps] UPDATE: ${op.filePath}`);

                // Always notify EditorPage callback first - it knows if file exists in state
                if (callbacks?.onUpdateFile && op.content !== undefined) {
                  callbacks.onUpdateFile(op.filePath, op.content);
                  console.log(`[FileOps] Notified EditorPage of file update: ${op.filePath}`);
                }

                // Handle Monaco model separately - only if editor is available
                if (editorInstance && op.content !== undefined) {
                  const model = monaco.editor.getModel(uri);

                  if (model) {
                    // Monaco model exists - update it
                    try {
                      model.setValue(op.content);
                      console.log(`[FileOps] Updated existing Monaco model: ${op.filePath}`);

                      // Switch to this file
                      editorInstance.setModel(model);

                      // Focus specific line if requested
                      if (op.focusLine && op.focusLine > 0) {
                        editorInstance.revealLineInCenter(op.focusLine);
                        editorInstance.setPosition({
                          lineNumber: op.focusLine,
                          column: 1
                        });
                      }
                    } catch (error) {
                      console.warn(`[FileOps] Error updating Monaco model:`, error);
                    }
                  } else {
                    // No Monaco model - create one if needed
                    console.log(`[FileOps] No Monaco model found, file will be opened when user clicks tab`);
                  }
                } else {
                  console.log(`[FileOps] No editor instance, state-only update: ${op.filePath}`);
                }

                // Set as active file in EditorPage
                if (callbacks?.onSetActiveFile) {
                  callbacks.onSetActiveFile(op.filePath);
                  console.log(`[FileOps] Set active file: ${op.filePath}`);
                }
              }
              break;

            case FileOperationType._2: // DELETE
              {
                console.log(`[FileOps] DELETE: ${op.filePath}`);

                // Notify EditorPage to delete from backend and state
                if (callbacks?.onDeleteFile) {
                  await callbacks.onDeleteFile(op.filePath);
                  console.log(`[FileOps] EditorPage completed file deletion: ${op.filePath}`);
                }

                // Handle Monaco model disposal if editor is available
                if (editorInstance) {
                  const modelToDelete = monaco.editor.getModel(uri);

                  if (modelToDelete) {
                    // If this is the active model, switch to another tab first
                    if (editorInstance.getModel() === modelToDelete) {
                      const allModels = monaco.editor.getModels();
                      const otherModel = allModels.find(m => m !== modelToDelete);

                      if (otherModel) {
                        editorInstance.setModel(otherModel);
                        console.log(`[FileOps] Switched to another model before delete`);
                      } else {
                        // No other models, clear editor
                        editorInstance.setModel(null);
                        console.log(`[FileOps] Cleared editor (no models left)`);
                      }
                    }

                    // Dispose the Monaco model
                    modelToDelete.dispose();
                    console.log(`[FileOps] Disposed Monaco model: ${op.filePath}`);
                  } else {
                    console.log(`[FileOps] No Monaco model found to dispose: ${op.filePath}`);
                  }
                }
              }
              break;

            default:
              console.warn(`[FileOps] Unknown operation type: ${op.operationType}`);
          }
        } catch (error) {
          console.error(`[FileOps] Error applying operation to ${op.filePath}:`, error);
        }
      }
    },
    [editorInstance, detectLanguage, callbacks]
  );

  /**
   * Apply approved operations from staging (safe mode)
   * This applies operations to editor state WITHOUT calling backend APIs
   * Backend writes happen when user clicks "Save"
   */
  const applyApprovedOperations = useCallback(
    async (operations: FileOperationDto[]) => {
      if (!editorInstance) {
        console.warn('[FileOps] Editor instance not available');
        return;
      }

      for (const op of operations) {
        const uri = monaco.Uri.file(op.filePath);
        const normalizedType = normalizeOperationType(op.operationType);

        try {
          switch (normalizedType) {
            case FileOperationType._0: // CREATE
              {
                console.log(`[FileOps] STAGED CREATE: ${op.filePath}`);

                // Notify EditorPage to add to state (marks as isNew and isModified)
                if (callbacks?.onCreateFile && op.content !== undefined) {
                  callbacks.onCreateFile(op.filePath, op.content);
                }

                // Create Monaco model
                let model = monaco.editor.getModel(uri);
                if (!model && op.content !== undefined) {
                  const language = detectLanguage(op.filePath);
                  model = monaco.editor.createModel(op.content, language, uri);
                }

                // Switch to file
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

                // Set active
                if (callbacks?.onSetActiveFile) {
                  callbacks.onSetActiveFile(op.filePath);
                }
              }
              break;

            case FileOperationType._1: // UPDATE
              {
                console.log(`[FileOps] STAGED UPDATE: ${op.filePath}`);

                // Update state (marks as isModified, NO backend call)
                if (callbacks?.onUpdateFile && op.content !== undefined) {
                  callbacks.onUpdateFile(op.filePath, op.content);
                }

                // Update Monaco model
                if (op.content !== undefined) {
                  const model = monaco.editor.getModel(uri);
                  if (model) {
                    model.setValue(op.content);
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

                // Set active
                if (callbacks?.onSetActiveFile) {
                  callbacks.onSetActiveFile(op.filePath);
                }
              }
              break;

            case FileOperationType._2: // DELETE
              {
                console.log(`[FileOps] STAGED DELETE: ${op.filePath}`);

                // For DELETE in staging mode, we mark for deletion but don't actually delete
                // The actual deletion happens when user clicks "Save"
                // For now, just close the tab
                if (callbacks?.onDeleteFile) {
                  await callbacks.onDeleteFile(op.filePath);
                }

                const modelToDelete = monaco.editor.getModel(uri);
                if (modelToDelete) {
                  if (editorInstance.getModel() === modelToDelete) {
                    const allModels = monaco.editor.getModels();
                    const otherModel = allModels.find(m => m !== modelToDelete);
                    editorInstance.setModel(otherModel || null);
                  }
                  modelToDelete.dispose();
                }
              }
              break;
          }
        } catch (error) {
          console.error(`[FileOps] Error applying staged operation to ${op.filePath}:`, error);
        }
      }
    },
    [editorInstance, detectLanguage, callbacks]
  );

  return { applyFileOperations, applyApprovedOperations };
};
