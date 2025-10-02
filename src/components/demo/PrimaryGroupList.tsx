import { PrimaryGroupDto } from '@/api/types';
import { Folder } from 'lucide-react';

interface PrimaryGroupListProps {
  groups: PrimaryGroupDto[];
  selectedGroup: string | null;
  onGroupSelect: (groupName: string) => void;
}

export function PrimaryGroupList({ groups, selectedGroup, onGroupSelect }: PrimaryGroupListProps) {
  if (!groups || groups.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">No categories available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {groups.map((group) => {
        const isSelected = selectedGroup === group.primaryGroupName;

        return (
          <button
            key={group.primaryGroupName}
            onClick={() => group.primaryGroupName && onGroupSelect(group.primaryGroupName)}
            className={`
              relative p-6 rounded-lg border-2 transition-all duration-200 text-left
              ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md'
              }
            `}
          >
            <div className="flex items-center space-x-3">
              <div
                className={`
                p-2 rounded-lg
                ${
                  isSelected
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }
              `}
              >
                <Folder size={20} />
              </div>
              <h3
                className={`
                font-semibold text-lg
                ${
                  isSelected
                    ? 'text-blue-700 dark:text-blue-300'
                    : 'text-gray-900 dark:text-white'
                }
              `}
              >
                {group.primaryGroupName}
              </h3>
            </div>
            {group.secondaryGroups && group.secondaryGroups.length > 0 && (
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {group.secondaryGroups.length} sub-{group.secondaryGroups.length === 1 ? 'category' : 'categories'}
              </p>
            )}
          </button>
        );
      })}
    </div>
  );
}
