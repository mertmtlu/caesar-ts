import React from 'react';
import * as monaco from 'monaco-editor';
import { X, Trash2 } from 'lucide-react';
import { useAIStore } from '../../stores/aiStore';
import { useFileOperations, FileOperationCallbacks } from '../../hooks/useFileOperations';
import { useEditorContext } from '../../hooks/useEditorContext';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { AIPreferencesPanel } from './AIPreferencesPanel';
import { SuggestedPrompts } from './SuggestedPrompts';
import { ContextStatusBar } from './ContextStatusBar';
import { FileOperationReviewPanel } from './FileOperationReviewPanel';
import { api } from '../../api/api';

interface EditorFile {
  path: string;
  content: string;
  isModified: boolean;
  originalContent: string;
}

interface AIChatPanelProps {
  editorInstance: monaco.editor.IStandaloneCodeEditor | null;
  programId: string;
  versionId?: string;
  onClose?: () => void;
  fileOperationCallbacks?: FileOperationCallbacks;
  openFiles?: EditorFile[];
}

export const AIChatPanel: React.FC<AIChatPanelProps> = ({
  editorInstance,
  programId,
  versionId,
  onClose,
  fileOperationCallbacks,
  openFiles
}) => {
  const {
    conversationHistory,
    isThinking,
    error,
    sendMessage,
    clearConversation,
    setCurrentProgram,
    preferences,
    suggestedFollowUps,
    stagedOperations,
    stageOperations,
    clearStagedOperations,
    getApprovedOperations,
  } = useAIStore();

  const { applyFileOperations, applyApprovedOperations } = useFileOperations(editorInstance, fileOperationCallbacks);
  const { openFileContexts } = useEditorContext(editorInstance, openFiles);

  // Set current program when component mounts or when programId changes
  React.useEffect(() => {
    if (programId) {
      setCurrentProgram(programId, versionId);
    }
  }, [programId, versionId, setCurrentProgram]);

  const handleSend = async (message: string) => {
    try {
      // sendMessage returns FileOperationDto[]
      const fileOperations = await sendMessage(message, openFileContexts);

      // Check if we have operations and decide flow based on preferences
      if (fileOperations && fileOperations.length > 0) {
        if (preferences.autoApplyFileOperations) {
          // AUTO-APPLY MODE (Dangerous): Apply immediately
          console.log('[AIChatPanel] Auto-apply mode: Applying operations immediately');
          await applyFileOperations(fileOperations);
        } else {
          // SAFE MODE (Default): Stage operations for review
          console.log('[AIChatPanel] Safe mode: Staging operations for review');

          // Capture original file contents for diff view
          // Include both currently open files AND files from backend
          const contentsMap = new Map<string, string>();

          // Add currently open files
          if (openFiles) {
            openFiles.forEach(file => {
              contentsMap.set(file.path, file.originalContent || file.content);
            });
          }

          // Fetch original content for files that aren't open
          for (const op of fileOperations) {
            if (!contentsMap.has(op.filePath) && programId && versionId) {
              try {
                const response = await api.files.files_GetVersionFile(programId, versionId, op.filePath);
                if (response.success && response.data && response.data.content) {
                  // Decode base64 content (UTF-8 safe)
                  const base64ToUtf8 = (str: string): string => {
                    return decodeURIComponent(Array.prototype.map.call(atob(str), (c: string) => {
                      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    }).join(''));
                  };
                  const originalContent = base64ToUtf8(response.data.content);
                  contentsMap.set(op.filePath, originalContent);
                  console.log(`[AIChatPanel] Fetched original content for ${op.filePath}`);
                } else {
                  // File doesn't exist yet (CREATE operation) - empty original
                  contentsMap.set(op.filePath, '');
                }
              } catch (error) {
                console.warn(`[AIChatPanel] Could not fetch original content for ${op.filePath}:`, error);
                // Default to empty for CREATE operations or if fetch fails
                contentsMap.set(op.filePath, '');
              }
            }
          }

          stageOperations(fileOperations, contentsMap);
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Error is already handled in the store
    }
  };

  const handleSelectPrompt = (prompt: string) => {
    // Send the suggested prompt as a message
    handleSend(prompt);
  };

  const handleClearConversation = () => {
    if (conversationHistory.length > 0) {
      if (confirm('Are you sure you want to clear the conversation history?')) {
        clearConversation();
        clearStagedOperations(); // Also clear any staged operations
      }
    }
  };

  const handleApplyOperations = async () => {
    const approved = getApprovedOperations();
    if (approved.length === 0) {
      return;
    }

    try {
      // Apply approved operations (this updates editor state, marks as modified)
      const operations = approved.map(po => po.operation);
      await applyApprovedOperations(operations);

      // Clear staged operations after applying
      clearStagedOperations();
    } catch (error) {
      console.error('[AIChatPanel] Error applying operations:', error);
    }
  };

  const handleRejectOperations = () => {
    clearStagedOperations();
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 bg-green-500 rounded-full" />
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            AI Assistant
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {conversationHistory.length > 0 && (
            <button
              onClick={handleClearConversation}
              className="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors"
              title="Clear conversation"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors"
              title="Close AI Assistant"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* AI Preferences Panel */}
      <AIPreferencesPanel />

      {/* Context Status Bar */}
      <ContextStatusBar
        openFileContexts={openFileContexts}
        preferences={preferences}
      />

      {/* Messages */}
      <MessageList messages={conversationHistory} isThinking={isThinking} error={error} />

      {/* File Operation Review Panel (only shown in safe mode when operations are staged) */}
      {!preferences.autoApplyFileOperations && stagedOperations.length > 0 && (
        <FileOperationReviewPanel
          onApply={handleApplyOperations}
          onReject={handleRejectOperations}
        />
      )}

      {/* Suggested Follow-ups */}
      <SuggestedPrompts
        prompts={suggestedFollowUps}
        onSelectPrompt={handleSelectPrompt}
        disabled={isThinking}
      />

      {/* Input */}
      <ChatInput onSend={handleSend} disabled={isThinking} />
    </div>
  );
};
