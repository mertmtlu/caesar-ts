import React from 'react';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbProps {
  activePath: {
    tab: string | null;
    primaryGroup: string | null;
    secondaryGroup: string | null;
  };
  onNavigate: (level: 'tab' | 'primary' | 'secondary') => void;
}

export function Breadcrumb({ activePath, onNavigate }: BreadcrumbProps) {
  const segments = [];

  if (activePath.tab) {
    segments.push({
      label: activePath.tab,
      level: 'tab' as const,
      isActive: !activePath.primaryGroup
    });
  }

  if (activePath.primaryGroup) {
    segments.push({
      label: activePath.primaryGroup,
      level: 'primary' as const,
      isActive: !activePath.secondaryGroup
    });
  }

  if (activePath.secondaryGroup) {
    segments.push({
      label: activePath.secondaryGroup,
      level: 'secondary' as const,
      isActive: true
    });
  }

  if (segments.length === 0) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6" aria-label="Breadcrumb">
      {segments.map((segment, index) => (
        <React.Fragment key={segment.level}>
          {index > 0 && (
            <ChevronRight className="w-4 h-4 text-gray-400" />
          )}
          <button
            onClick={() => onNavigate(segment.level)}
            disabled={segment.isActive}
            className={`
              transition-colors
              ${segment.isActive
                ? 'text-gray-900 dark:text-white font-semibold cursor-default'
                : 'text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline'
              }
            `}
          >
            {segment.label}
          </button>
        </React.Fragment>
      ))}
    </nav>
  );
}
