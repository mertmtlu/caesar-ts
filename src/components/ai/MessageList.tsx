import React, { useEffect, useRef } from 'react';
import { User, Bot, Loader2, AlertCircle, Shield, Zap } from 'lucide-react';
import ReactMarkdown, { Components } from 'react-markdown';
import { Message } from '../../stores/aiStore';
import { FileOperationsSummary, FileOperationBadge } from './FileOperationBadge';
import { useAIStore } from '../../stores/aiStore';

interface MessageListProps {
  messages: Message[];
  isThinking: boolean;
  error?: string | null;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, isThinking, error }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { preferences, stagedOperations } = useAIStore();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  // Custom Markdown components (standard Markdown only, NO GFM)
  const markdownComponents: Components = {
    // Inline code and code blocks
    code: (props) => {
      const { children, className } = props;
      const isInline = !className || !className.includes('language-');

      if (isInline) {
        return (
          <code className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-sm font-mono text-gray-900 dark:text-gray-100">
            {children}
          </code>
        );
      }
      // Code blocks
      return (
        <pre className="bg-gray-900 dark:bg-gray-950 p-3 rounded overflow-x-auto my-2">
          <code className="text-sm text-gray-100 font-mono">{children}</code>
        </pre>
      );
    },
    // Links
    a: ({ children, href }) => (
      <a
        href={href}
        className="text-blue-600 dark:text-blue-400 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    // Paragraphs
    p: ({ children }) => (
      <p className="my-2 leading-relaxed">{children}</p>
    ),
    // Unordered lists
    ul: ({ children }) => (
      <ul className="list-disc list-inside my-2 space-y-1">{children}</ul>
    ),
    // Ordered lists
    ol: ({ children }) => (
      <ol className="list-decimal list-inside my-2 space-y-1">{children}</ol>
    ),
    // List items
    li: ({ children }) => (
      <li className="leading-relaxed">{children}</li>
    ),
    // Headers
    h1: ({ children }) => (
      <h1 className="text-lg font-bold my-3">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-base font-bold my-2">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-sm font-bold my-2">{children}</h3>
    ),
    // Blockquotes
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-3 my-2 italic text-gray-700 dark:text-gray-300">
        {children}
      </blockquote>
    ),
    // Strong (bold)
    strong: ({ children }) => (
      <strong className="font-bold">{children}</strong>
    ),
    // Emphasis (italic)
    em: ({ children }) => (
      <em className="italic">{children}</em>
    ),
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 && !isThinking && !error && (
        <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400">
          <Bot className="h-12 w-12 mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">AI Assistant</h3>
          <p className="text-sm max-w-sm">
            Ask me anything about your project. I can help you understand code, suggest improvements, or make changes.
          </p>
        </div>
      )}

      {error && (
        <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-red-800 dark:text-red-200">Error</p>
            <p className="text-sm text-red-700 dark:text-red-300 mt-1">{error}</p>
          </div>
        </div>
      )}

      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
        >
          <div
            className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
              message.role === 'user'
                ? 'bg-blue-600 dark:bg-blue-500'
                : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            {message.role === 'user' ? (
              <User className="h-5 w-5 text-white" />
            ) : (
              <Bot className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            )}
          </div>

          <div
            className={`flex-1 max-w-[85%] ${
              message.role === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            <div
              className={`rounded-lg px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-blue-600 dark:bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
              }`}
            >
              {message.role === 'user' ? (
                // User messages: plain text
                <div className="text-sm whitespace-pre-wrap break-words">
                  {message.content}
                </div>
              ) : (
                // Assistant messages: Markdown rendering (standard Markdown only, NO GFM)
                <div className="text-sm prose prose-sm dark:prose-invert max-w-none prose-p:my-2 prose-headings:my-3 prose-ul:my-2 prose-ol:my-2 prose-li:my-0.5">
                  <ReactMarkdown components={markdownComponents}>
                    {message.content}
                  </ReactMarkdown>
                </div>
              )}

              {message.warnings && message.warnings.length > 0 && (
                <div className="mt-3 pt-3 border-t border-yellow-200 dark:border-yellow-800">
                  <p className="text-xs font-semibold text-yellow-800 dark:text-yellow-300 mb-1">
                    Warnings:
                  </p>
                  <ul className="text-xs text-yellow-700 dark:text-yellow-400 space-y-1">
                    {message.warnings.map((warning, idx) => (
                      <li key={idx}>• {warning}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {message.fileOperations && message.fileOperations.length > 0 && (
              <div className="mt-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <FileOperationsSummary operations={message.fileOperations} />

                  {/* Show indicator badge for how operations were handled */}
                  {preferences.autoApplyFileOperations ? (
                    <div className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700 rounded text-xs font-medium text-amber-800 dark:text-amber-300">
                      <Zap className="h-3 w-3" />
                      <span>Auto-Applied</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 rounded text-xs font-medium text-blue-800 dark:text-blue-300">
                      <Shield className="h-3 w-3" />
                      <span>
                        {stagedOperations.length > 0 ? 'Review Required' : 'Reviewed'}
                      </span>
                    </div>
                  )}
                </div>

                <details className="mt-2 text-xs">
                  <summary className="cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
                    View file changes ({message.fileOperations.length})
                  </summary>
                  <div className="mt-2 space-y-1">
                    {message.fileOperations.map((op, idx) => (
                      <FileOperationBadge key={idx} operation={op} />
                    ))}
                  </div>
                </details>
              </div>
            )}

            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {message.timestamp.toLocaleTimeString()}
            </div>
          </div>
        </div>
      ))}

      {isThinking && (
        <div className="flex gap-3">
          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <Bot className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          </div>
          <div className="flex-1">
            <div className="rounded-lg px-4 py-3 bg-gray-100 dark:bg-gray-800">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>AI is thinking...</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};
