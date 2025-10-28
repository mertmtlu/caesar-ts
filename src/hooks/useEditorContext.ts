import { useState, useEffect, useCallback, useRef } from 'react';
import * as monaco from 'monaco-editor';
import { OpenFileContext } from '../api/types';

interface EditorFileState {
  path: string;
  savedContent: string;
  isFocused: boolean;
}

interface UseEditorContextResult {
  openFileContexts: OpenFileContext[];
  refreshContext: () => void;
  updateSavedContent: (path: string, content: string) => void;
  setFocusedFile: (path: string) => void;
}

interface ExternalFile {
  path: string;
  content: string;
  isModified?: boolean;
  originalContent?: string;
}

/**
 * Hook to track all open files in Monaco editor and build OpenFileContext array
 * for AI Assistant integration
 */
export const useEditorContext = (
  editorInstance: monaco.editor.IStandaloneCodeEditor | null,
  externalFiles?: ExternalFile[]
): UseEditorContextResult => {
  const [fileStates, setFileStates] = useState<Map<string, EditorFileState>>(new Map());
  const [openFileContexts, setOpenFileContexts] = useState<OpenFileContext[]>([]);
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Build OpenFileContext array from external files or Monaco models
   */
  const buildOpenFileContexts = useCallback(() => {
    if (!editorInstance) {
      setOpenFileContexts([]);
      return;
    }

    const contexts: OpenFileContext[] = [];

    // Get cursor position and selection from editor
    const position = editorInstance.getPosition();
    const selection = editorInstance.getSelection();
    const currentModel = editorInstance.getModel();
    const currentUri = currentModel?.uri.toString();

    // Determine active file path
    let activeFilePath: string | null = null;
    if (currentUri) {
      activeFilePath = currentUri;
      if (activeFilePath.startsWith('file://')) {
        activeFilePath = activeFilePath.substring(7);
      }
      if (activeFilePath.startsWith('inmemory://')) {
        activeFilePath = activeFilePath.substring(11);
      }
    }

    // If external files are provided, use them
    if (externalFiles && externalFiles.length > 0) {
      for (const file of externalFiles) {
        const isFocused = file.path === activeFilePath;
        const hasUnsavedChanges = file.isModified ?? false;

        const context = new OpenFileContext({
          filePath: file.path,
          content: file.content,
          hasUnsavedChanges,
          isFocused,
          cursorLine: isFocused && position ? position.lineNumber : undefined,
          cursorColumn: isFocused && position ? position.column : undefined,
          selectedRange: isFocused && selection && !selection.isEmpty()
            ? `${selection.startLineNumber}:${selection.startColumn}-${selection.endLineNumber}:${selection.endColumn}`
            : undefined,
        });

        contexts.push(context);
      }
    } else {
      // Fallback to Monaco models if no external files provided
      const models = monaco.editor.getModels();

      for (const model of models) {
        const uri = model.uri.toString();

        // Skip internal Monaco models (those starting with inmemory://)
        if (uri.startsWith('inmemory://')) {
          continue;
        }

        // Extract file path from URI (remove file:// or inmemory:// prefix)
        let filePath = uri;
        if (filePath.startsWith('file://')) {
          filePath = filePath.substring(7);
        }

        const currentContent = model.getValue();
        const fileState = fileStates.get(filePath);
        const savedContent = fileState?.savedContent || currentContent;
        const isFocused = uri === currentUri;
        const hasUnsavedChanges = currentContent !== savedContent;

        const context = new OpenFileContext({
          filePath,
          content: currentContent,
          hasUnsavedChanges,
          isFocused,
          cursorLine: isFocused && position ? position.lineNumber : undefined,
          cursorColumn: isFocused && position ? position.column : undefined,
          selectedRange: isFocused && selection && !selection.isEmpty()
            ? `${selection.startLineNumber}:${selection.startColumn}-${selection.endLineNumber}:${selection.endColumn}`
            : undefined,
        });

        contexts.push(context);
      }
    }

    setOpenFileContexts(contexts);
  }, [editorInstance, fileStates, externalFiles]);

  /**
   * Initialize file states from existing Monaco models
   */
  const initializeFileStates = useCallback(() => {
    if (!editorInstance) return;

    const models = monaco.editor.getModels();
    const newStates = new Map<string, EditorFileState>();

    for (const model of models) {
      const uri = model.uri.toString();

      // Skip internal Monaco models
      if (uri.startsWith('inmemory://')) {
        continue;
      }

      let filePath = uri;
      if (filePath.startsWith('file://')) {
        filePath = filePath.substring(7);
      }

      // Check if we already have this file state
      const existingState = fileStates.get(filePath);

      newStates.set(filePath, {
        path: filePath,
        savedContent: existingState?.savedContent || model.getValue(),
        isFocused: false,
      });
    }

    setFileStates(newStates);
  }, [editorInstance, fileStates]);

  /**
   * Update the saved content for a file (call this after saving)
   */
  const updateSavedContent = useCallback((path: string, content: string) => {
    setFileStates(prev => {
      const updated = new Map(prev);
      const existing = updated.get(path);

      if (existing) {
        updated.set(path, {
          ...existing,
          savedContent: content,
        });
      } else {
        updated.set(path, {
          path,
          savedContent: content,
          isFocused: false,
        });
      }

      return updated;
    });
  }, []);

  /**
   * Set which file is currently focused
   */
  const setFocusedFile = useCallback((path: string) => {
    setFileStates(prev => {
      const updated = new Map(prev);

      // Unfocus all files
      for (const [key, state] of updated.entries()) {
        updated.set(key, { ...state, isFocused: false });
      }

      // Focus the specified file
      const targetFile = updated.get(path);
      if (targetFile) {
        updated.set(path, { ...targetFile, isFocused: true });
      }

      return updated;
    });
  }, []);

  /**
   * Manual refresh function
   */
  const refreshContext = useCallback(() => {
    initializeFileStates();
    buildOpenFileContexts();
  }, [initializeFileStates, buildOpenFileContexts]);

  // Initialize on mount and when editor changes
  useEffect(() => {
    if (editorInstance) {
      initializeFileStates();
    }
  }, [editorInstance]);

  // Subscribe to model content changes
  useEffect(() => {
    if (!editorInstance) return;

    const models = monaco.editor.getModels();
    const disposables: monaco.IDisposable[] = [];

    for (const model of models) {
      const disposable = model.onDidChangeContent(() => {
        buildOpenFileContexts();
      });
      disposables.push(disposable);
    }

    // Also listen for cursor position changes
    const cursorDisposable = editorInstance.onDidChangeCursorPosition(() => {
      buildOpenFileContexts();
    });
    disposables.push(cursorDisposable);

    // Listen for selection changes
    const selectionDisposable = editorInstance.onDidChangeCursorSelection(() => {
      buildOpenFileContexts();
    });
    disposables.push(selectionDisposable);

    return () => {
      disposables.forEach(d => d.dispose());
    };
  }, [editorInstance, buildOpenFileContexts]);

  // Periodic refresh to catch model additions/removals
  useEffect(() => {
    refreshIntervalRef.current = setInterval(() => {
      refreshContext();
    }, 2000); // Refresh every 2 seconds

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, [refreshContext]);

  // Build contexts when file states change
  useEffect(() => {
    buildOpenFileContexts();
  }, [fileStates, buildOpenFileContexts]);

  return {
    openFileContexts,
    refreshContext,
    updateSavedContent,
    setFocusedFile,
  };
};
