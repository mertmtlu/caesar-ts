import React, { useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';
import { FileOperationType } from '../../api/enums';

interface DiffViewerProps {
  /** Original content (before changes) */
  originalContent: string;

  /** Modified content (after changes) */
  modifiedContent: string;

  /** File path for language detection */
  filePath: string;

  /** Type of operation for special handling */
  operationType: FileOperationType;

  /** Height of the diff editor */
  height?: string;
}

/**
 * Monaco-based diff viewer component
 * Shows side-by-side or inline diff between two file versions
 */
export const DiffViewer: React.FC<DiffViewerProps> = ({
  originalContent,
  modifiedContent,
  filePath,
  operationType,
  height = '300px',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<monaco.editor.IStandaloneDiffEditor | null>(null);

  /**
   * Detect programming language from file extension
   */
  const detectLanguage = (path: string): string => {
    const ext = path.split('.').pop()?.toLowerCase();
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
    };
    return languageMap[ext || ''] || 'plaintext';
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const language = detectLanguage(filePath);

    // Create models for diff editor
    const originalModel = monaco.editor.createModel(
      originalContent,
      language
    );

    const modifiedModel = monaco.editor.createModel(
      modifiedContent,
      language
    );

    // Create diff editor
    const diffEditor = monaco.editor.createDiffEditor(containerRef.current, {
      automaticLayout: true,
      readOnly: true,
      renderSideBySide: true, // Side-by-side diff view
      enableSplitViewResizing: false,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      fontSize: 13,
      lineNumbers: 'on',
      renderLineHighlight: 'all',
      theme: document.documentElement.classList.contains('dark') ? 'vs-dark' : 'vs',
    });

    // Set the original and modified models
    diffEditor.setModel({
      original: originalModel,
      modified: modifiedModel,
    });

    editorRef.current = diffEditor;

    // Cleanup
    return () => {
      diffEditor.dispose();
      originalModel.dispose();
      modifiedModel.dispose();
    };
  }, [originalContent, modifiedContent, filePath]);

  // Handle theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark');
      monaco.editor.setTheme(isDark ? 'vs-dark' : 'vs');
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // Get label based on operation type
  const getOperationLabel = () => {
    switch (operationType) {
      case FileOperationType._0: // CREATE
        return 'New File';
      case FileOperationType._1: // UPDATE
        return 'Modified File';
      case FileOperationType._2: // DELETE
        return 'Deleted File';
      default:
        return 'Changes';
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-600">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
            {getOperationLabel()}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {filePath}
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700"></span>
            Original
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700"></span>
            Modified
          </span>
        </div>
      </div>
      <div ref={containerRef} style={{ height, width: '100%' }} />
    </div>
  );
};
