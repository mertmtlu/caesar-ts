import React from 'react';
import { Lightbulb } from 'lucide-react';

interface SuggestedPromptsProps {
  prompts: string[];
  onSelectPrompt: (prompt: string) => void;
  disabled?: boolean;
}

export const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({
  prompts,
  onSelectPrompt,
  disabled = false,
}) => {
  if (!prompts || prompts.length === 0) {
    return null;
  }

  return (
    <div className="px-4 py-3 bg-blue-50 dark:bg-blue-900/10 border-t border-blue-100 dark:border-blue-900/30">
      <div className="flex items-start gap-2 mb-2">
        <Lightbulb className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
        <span className="text-xs font-semibold text-blue-800 dark:text-blue-300">
          Suggested Follow-ups
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {prompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => !disabled && onSelectPrompt(prompt)}
            disabled={disabled}
            className={`
              text-xs px-3 py-1.5 rounded-full text-left
              transition-all duration-200
              ${disabled
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed'
                : 'bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:shadow-sm cursor-pointer'
              }
            `}
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};
