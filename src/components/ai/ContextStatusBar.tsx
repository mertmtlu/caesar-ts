import React from 'react';
import { FileText, AlertCircle, Brain, Edit3 } from 'lucide-react';
import { OpenFileContext } from '../../api/types';
import { AIPreferencesState } from '../../stores/aiStore';

interface ContextStatusBarProps {
  openFileContexts: OpenFileContext[];
  preferences: AIPreferencesState;
}

export const ContextStatusBar: React.FC<ContextStatusBarProps> = ({
  openFileContexts,
  preferences,
}) => {
  const totalFiles = openFileContexts.length;
  const unsavedFiles = openFileContexts.filter(f => f.hasUnsavedChanges).length;
  const focusedFile = openFileContexts.find(f => f.isFocused);

  const contextModeColors = {
    aggressive: 'text-orange-600 dark:text-orange-400',
    balanced: 'text-green-600 dark:text-green-400',
    comprehensive: 'text-blue-600 dark:text-blue-400',
    unlimited: 'text-purple-600 dark:text-purple-400',
  };

  const contextModeLabels = {
    aggressive: 'Fast',
    balanced: 'Balanced',
    comprehensive: 'Thorough',
    unlimited: 'Complete',
  };

  return (
    <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between text-xs">
        {/* Left side - File stats */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5" title="Open files">
            <FileText className="h-3.5 w-3.5 text-gray-600 dark:text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300">
              {totalFiles} {totalFiles === 1 ? 'file' : 'files'}
            </span>
          </div>

          {unsavedFiles > 0 && (
            <div className="flex items-center gap-1.5" title="Files with unsaved changes">
              <Edit3 className="h-3.5 w-3.5 text-orange-600 dark:text-orange-400" />
              <span className="text-orange-700 dark:text-orange-300 font-medium">
                {unsavedFiles} unsaved
              </span>
            </div>
          )}

          {focusedFile && (
            <div className="flex items-center gap-1.5" title="Currently focused file">
              <AlertCircle className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
              <span className="text-gray-700 dark:text-gray-300 truncate max-w-[150px]">
                {focusedFile.filePath?.split('/').pop() || 'Unknown'}
              </span>
            </div>
          )}
        </div>

        {/* Right side - Context mode */}
        <div className="flex items-center gap-1.5" title={`Context mode: ${preferences.contextMode}`}>
          <Brain className={`h-3.5 w-3.5 ${contextModeColors[preferences.contextMode]}`} />
          <span className={`font-medium ${contextModeColors[preferences.contextMode]}`}>
            {contextModeLabels[preferences.contextMode]}
          </span>
        </div>
      </div>

      {/* Optional: Show focused file cursor position */}
      {focusedFile && focusedFile.cursorLine && (
        <div className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
          Line {focusedFile.cursorLine}, Column {focusedFile.cursorColumn}
          {focusedFile.selectedRange && (
            <span className="ml-2">• Selection: {focusedFile.selectedRange}</span>
          )}
        </div>
      )}
    </div>
  );
};
