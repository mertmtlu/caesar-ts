import { SecondaryGroupDto } from '@/api/types';
import { FolderOpen } from 'lucide-react';

interface SecondaryGroupListProps {
  groups: SecondaryGroupDto[];
  selectedGroup: string | null;
  onGroupSelect: (groupName: string) => void;
}

export function SecondaryGroupList({ groups, selectedGroup, onGroupSelect }: SecondaryGroupListProps) {
  if (!groups || groups.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">No sub-categories available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {groups.map((group) => {
        const isSelected = selectedGroup === group.secondaryGroupName;

        return (
          <button
            key={group.secondaryGroupName}
            onClick={() => group.secondaryGroupName && onGroupSelect(group.secondaryGroupName)}
            className={`
              relative p-6 rounded-lg border-2 transition-all duration-200 text-left
              ${
                isSelected
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 shadow-lg'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-md'
              }
            `}
          >
            <div className="flex items-center space-x-3">
              <div
                className={`
                p-2 rounded-lg
                ${
                  isSelected
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }
              `}
              >
                <FolderOpen size={20} />
              </div>
              <h3
                className={`
                font-semibold text-lg
                ${
                  isSelected
                    ? 'text-purple-700 dark:text-purple-300'
                    : 'text-gray-900 dark:text-white'
                }
              `}
              >
                {group.secondaryGroupName}
              </h3>
            </div>
            {group.items && group.items.length > 0 && (
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {group.items.length} demo{group.items.length === 1 ? '' : 's'}
              </p>
            )}
          </button>
        );
      })}
    </div>
  );
}
