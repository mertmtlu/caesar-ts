import React, { useState } from 'react';
import { Settings, ChevronDown, ChevronUp } from 'lucide-react';
import { useAIStore } from '../../stores/aiStore';

export const AIPreferencesPanel: React.FC = () => {
  const { preferences, updatePreferences } = useAIStore();
  const [isExpanded, setIsExpanded] = useState(false);

  const contextModeInfo = {
    aggressive: { label: 'Fast', tokens: '~15K', files: '~20-25', description: 'Faster responses, minimal context' },
    balanced: { label: 'Balanced', tokens: '~40K', files: '~50-60', description: 'Best balance of quality and speed' },
    comprehensive: { label: 'Thorough', tokens: '~70K', files: '~80-100', description: 'Maximum context, slower' },
    unlimited: { label: 'Complete', tokens: '~90K', files: '~100+', description: 'Entire project, slowest' },
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
      {/* Header Toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <Settings className="h-4 w-4" />
          <span>AI Preferences</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        )}
      </button>

      {/* Expanded Settings Panel */}
      {isExpanded && (
        <div className="px-4 py-3 space-y-4 text-sm">
          {/* Context Mode */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Context Mode
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(contextModeInfo) as Array<keyof typeof contextModeInfo>).map((mode) => {
                const info = contextModeInfo[mode];
                const isSelected = preferences.contextMode === mode;

                return (
                  <button
                    key={mode}
                    onClick={() => updatePreferences({ contextMode: mode })}
                    className={`
                      p-2 rounded-lg border text-left transition-all
                      ${isSelected
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                      }
                    `}
                  >
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      {info.label}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                      {info.tokens} • {info.files} files
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {contextModeInfo[preferences.contextMode].description}
            </p>
          </div>

          {/* Verbosity */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Response Style
            </label>
            <div className="flex gap-2">
              {(['concise', 'normal', 'detailed'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => updatePreferences({ verbosity: level })}
                  className={`
                    flex-1 py-1.5 px-3 rounded-md text-xs font-medium transition-all
                    ${preferences.verbosity === level
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }
                  `}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Max File Operations */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Max File Operations: {preferences.maxFileOperations}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={preferences.maxFileOperations}
              onChange={(e) => updatePreferences({ maxFileOperations: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>1</span>
              <span>10</span>
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-2">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-xs text-gray-700 dark:text-gray-300">
                Explain Reasoning
              </span>
              <button
                onClick={() => updatePreferences({ explainReasoning: !preferences.explainReasoning })}
                className={`
                  relative inline-flex h-5 w-9 items-center rounded-full transition-colors
                  ${preferences.explainReasoning ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}
                `}
              >
                <span
                  className={`
                    inline-block h-3 w-3 transform rounded-full bg-white transition-transform
                    ${preferences.explainReasoning ? 'translate-x-5' : 'translate-x-1'}
                  `}
                />
              </button>
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-xs text-gray-700 dark:text-gray-300">
                Suggest Best Practices
              </span>
              <button
                onClick={() => updatePreferences({ suggestBestPractices: !preferences.suggestBestPractices })}
                className={`
                  relative inline-flex h-5 w-9 items-center rounded-full transition-colors
                  ${preferences.suggestBestPractices ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}
                `}
              >
                <span
                  className={`
                    inline-block h-3 w-3 transform rounded-full bg-white transition-transform
                    ${preferences.suggestBestPractices ? 'translate-x-5' : 'translate-x-1'}
                  `}
                />
              </button>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
