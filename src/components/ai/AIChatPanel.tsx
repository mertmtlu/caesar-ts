import React from 'react';
import * as monaco from 'monaco-editor';
import { X, Trash2 } from 'lucide-react';
import { useAIStore } from '../../stores/aiStore';
import { useFileOperations } from '../../hooks/useFileOperations';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';

interface AIChatPanelProps {
  editorInstance: monaco.editor.IStandaloneCodeEditor | null;
  programId: string;
  versionId?: string;
  onClose?: () => void;
}

export const AIChatPanel: React.FC<AIChatPanelProps> = ({
  editorInstance,
  programId,
  versionId,
  onClose
}) => {
  const {
    conversationHistory,
    isThinking,
    error,
    sendMessage,
    clearConversation,
    setCurrentProgram
  } = useAIStore();

  const { applyFileOperations } = useFileOperations(editorInstance);

  // Set current program when component mounts or when programId changes
  React.useEffect(() => {
    if (programId) {
      setCurrentProgram(programId, versionId);
    }
  }, [programId, versionId, setCurrentProgram]);

  const handleSend = async (message: string) => {
    try {
      // sendMessage returns FileOperationDto[] | undefined
      const fileOperations = await sendMessage(message);

      // Apply operations to Monaco
      if (fileOperations && fileOperations.length > 0) {
        await applyFileOperations(fileOperations);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Error is already handled in the store
    }
  };

  const handleClearConversation = () => {
    if (conversationHistory.length > 0) {
      if (confirm('Are you sure you want to clear the conversation history?')) {
        clearConversation();
      }
    }
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

      {/* Messages */}
      <MessageList messages={conversationHistory} isThinking={isThinking} error={error} />

      {/* Input */}
      <ChatInput onSend={handleSend} disabled={isThinking} />
    </div>
  );
};
