import React from 'react';
import { ChevronRight, ArrowLeft } from 'lucide-react';

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

  const handleBack = () => {
    if (activePath.secondaryGroup) {
      onNavigate('primary');
    } else if (activePath.primaryGroup) {
      onNavigate('tab');
    }
  };

  return (
    <nav className="flex items-center gap-3 mb-6" aria-label="Breadcrumb">
      {/* Back button */}
      {(activePath.primaryGroup || activePath.secondaryGroup) && (
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-3 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium text-base">Back</span>
        </button>
      )}

      {segments.map((segment, index) => (
        <React.Fragment key={segment.level}>
          {index > 0 && (
            <ChevronRight className="w-5 h-5 text-gray-400" />
          )}

          {segment.isActive ? (
            <span className="text-gray-900 dark:text-white font-semibold text-base">
              {segment.label}
            </span>
          ) : (
            <button
              onClick={() => onNavigate(segment.level)}
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-base font-medium"
            >
              {segment.label}
            </button>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
