import React, { useState, useEffect } from 'react';
import { api } from '@/api/api';
import { GroupListDto } from '@/api';

interface GroupSelectorProps {
  selectedGroupIds?: string[];
  onSelectionChange: (groupIds: string[]) => void;
  multiple?: boolean;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  excludeGroupIds?: string[];
}

const GroupSelector: React.FC<GroupSelectorProps> = ({
  selectedGroupIds = [],
  onSelectionChange,
  multiple = true,
  placeholder = "Select groups...",
  disabled = false,
  className = "",
  excludeGroupIds = [],
}) => {
  const [groups, setGroups] = useState<GroupListDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Load active groups only
      const response = await api.groupsClient.groups_GetActive();
      setGroups((response || []).map(group => new GroupListDto(group)));
    } catch (error: any) {
      setError(error?.message || 'Failed to load groups');
      console.error('Error loading groups:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGroupToggle = (groupId: string) => {
    if (multiple) {
      const newSelection = selectedGroupIds.includes(groupId)
        ? selectedGroupIds.filter(id => id !== groupId)
        : [...selectedGroupIds, groupId];
      onSelectionChange(newSelection);
    } else {
      // Single selection mode
      const newSelection = selectedGroupIds.includes(groupId) ? [] : [groupId];
      onSelectionChange(newSelection);
      setIsOpen(false);
    }
  };

  const availableGroups = groups.filter(group => !excludeGroupIds.includes(group.id!));
  const selectedGroups = availableGroups.filter(group => selectedGroupIds.includes(group.id!));

  const getDisplayText = () => {
    if (selectedGroups.length === 0) return placeholder;
    if (selectedGroups.length === 1) return selectedGroups[0].name;
    return `${selectedGroups.length} groups selected`;
  };

  if (error) {
    return (
      <div className={`text-red-600 dark:text-red-400 text-sm ${className}`}>
        Error loading groups
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled || isLoading}
        className={`
          w-full px-3 py-2 text-left border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          ${disabled ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed' : 'bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'}
          ${isOpen ? 'ring-2 ring-blue-500 border-transparent' : ''}
        `}
      >
        <div className="flex items-center justify-between">
          <span className={selectedGroups.length === 0 ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}>
            {isLoading ? 'Loading groups...' : getDisplayText()}
          </span>
          <svg
            className={`w-5 h-5 text-gray-400 dark:text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isOpen && !disabled && !isLoading && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute z-20 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg">
            <div className="max-h-60 overflow-auto py-1">
              {availableGroups.length === 0 ? (
                <div className="px-3 py-2 text-gray-500 dark:text-white text-sm">
                  {groups.length === 0 ? 'No active groups available' : 'No additional groups available'}
                </div>
              ) : (
                availableGroups.map((group) => (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => handleGroupToggle(group.id!)}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 focus:bg-gray-100 focus:outline-none"
                  >
                    <div className="flex items-center">
                      {multiple && (
                        <input
                          type="checkbox"
                          checked={selectedGroupIds.includes(group.id!)}
                          onChange={() => {}} // Handled by parent onClick
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-3 dark:bg-gray-600 dark:border-gray-500"
                          tabIndex={-1}
                        />
                      )}
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{group.name}</div>
                        {group.description && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {group.description}
                          </div>
                        )}
                        <div className="text-xs text-gray-400 dark:text-gray-500">
                          {group.memberCount || 0} members
                        </div>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GroupSelector;