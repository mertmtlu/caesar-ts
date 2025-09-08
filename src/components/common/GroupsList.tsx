import React from 'react';
import { GroupListDto } from '@/api';

interface GroupsListProps {
  groups: GroupListDto[];
  onRemoveGroup?: (groupId: string) => void;
  showMemberCount?: boolean;
  showDescription?: boolean;
  emptyMessage?: string;
  className?: string;
  itemClassName?: string;
  readonly?: boolean;
}

const GroupsList: React.FC<GroupsListProps> = ({
  groups = [],
  onRemoveGroup,
  showMemberCount = true,
  showDescription = false,
  emptyMessage = "No groups assigned",
  className = "",
  itemClassName = "",
  readonly = false,
}) => {
  if (groups.length === 0) {
    return (
      <div className={`text-center py-4 text-gray-500 dark:text-gray-400 ${className}`}>
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {groups.map((group) => (
        <div
          key={group.id}
          className={`flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${itemClassName}`}
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center">
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {group.name}
                </h4>
                
                {showDescription && group.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                    {group.description}
                  </p>
                )}
                
                <div className="flex items-center space-x-4 mt-1">
                  {showMemberCount && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {group.memberCount || 0} member{(group.memberCount || 0) !== 1 ? 's' : ''}
                    </span>
                  )}
                  
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      group.isActive
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                    }`}
                  >
                    {group.isActive ? 'Active' : 'Inactive'}
                  </span>
                  
                  {group.createdAt && (
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      Created {new Date(group.createdAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {!readonly && onRemoveGroup && (
            <button
              onClick={() => onRemoveGroup(group.id!)}
              className="ml-4 p-1 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
              title="Remove group access"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default GroupsList;