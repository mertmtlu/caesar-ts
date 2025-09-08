import React from 'react';
import { GroupListDto } from '@/api';

interface GroupAccessBadgeProps {
  groups: GroupListDto[] | string[];
  maxVisible?: number;
  size?: 'small' | 'medium';
  showTooltip?: boolean;
  className?: string;
}

const GroupAccessBadge: React.FC<GroupAccessBadgeProps> = ({
  groups = [],
  maxVisible = 3,
  size = 'small',
  showTooltip = true,
  className = "",
}) => {
  if (!groups || groups.length === 0) {
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600 ${className}`}>
        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
        </svg>
        Private
      </span>
    );
  }

  const visibleGroups = groups.slice(0, maxVisible);
  const hiddenCount = Math.max(0, groups.length - maxVisible);

  const getGroupName = (group: GroupListDto | string): string => {
    return typeof group === 'string' ? group : (group.name || 'Unknown');
  };

  const sizeClasses = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-1 text-sm',
  };

  const allGroupNames = groups.map(getGroupName).join(', ');

  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
      </svg>
      
      <div className="flex flex-wrap gap-1">
        {visibleGroups.map((group, index) => (
          <span
            key={typeof group === 'string' ? group : group.id || index}
            className={`inline-flex items-center rounded-full bg-green-100 text-green-800 font-medium ${sizeClasses[size]}`}
            title={showTooltip ? getGroupName(group) : undefined}
          >
            {getGroupName(group)}
          </span>
        ))}
        
        {hiddenCount > 0 && (
          <span
            className={`inline-flex items-center rounded-full bg-gray-100 text-gray-600 font-medium ${sizeClasses[size]}`}
            title={showTooltip ? `Additional groups: ${groups.slice(maxVisible).map(getGroupName).join(', ')}` : undefined}
          >
            +{hiddenCount} more
          </span>
        )}
      </div>
      
      {showTooltip && (
        <span className="sr-only">
          Shared with groups: {allGroupNames}
        </span>
      )}
    </div>
  );
};

export default GroupAccessBadge;