import React from 'react';
import { ChevronRight, Home, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

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

  // Don't show tab in breadcrumb since it's already visible in the tabs component
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

  // Determine what the back button should do
  const handleBack = () => {
    if (activePath.secondaryGroup) {
      onNavigate('primary');
    } else if (activePath.primaryGroup) {
      onNavigate('tab');
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 mb-8"
      aria-label="Breadcrumb"
    >
      {/* Back button */}
      <motion.button
        whileHover={{ scale: 1.05, x: -2 }}
        onClick={handleBack}
        className="flex items-center gap-2 px-4 py-2 rounded-lg
                   text-white font-medium text-sm"
        title="Go back"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </motion.button>

      {/* Divider */}
      {/* <div className="h-8 w-px bg-gray-300 dark:bg-gray-700" /> */}

      {/* Home button to return to tab level */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onNavigate('tab')}
        className="flex items-center gap-2 px-3 py-2 rounded-lg
                   bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm
                   border border-gray-200 dark:border-gray-700
                   text-gray-700 dark:text-gray-300
                   hover:bg-blue-50 dark:hover:bg-blue-900/20
                   hover:border-blue-300 dark:hover:border-blue-700
                   hover:text-blue-600 dark:hover:text-blue-400
                   transition-all duration-200 shadow-sm hover:shadow-md"
        title="Back to categories"
      >
        <Home className="w-4 h-4" />
        <span className="text-sm font-medium">Categories</span>
      </motion.button>

      {/* Separator */}
      <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-600" />

      {/* Breadcrumb segments */}
      {segments.map((segment, index) => (
        <React.Fragment key={segment.level}>
          {index > 0 && (
            <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-600" />
          )}

          {segment.isActive ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-4 py-2 rounded-lg
                       text-white font-semibold text-sm
                       shadow-md border border-blue-400/20
                       bg-blue-600/80 dark:bg-blue-800/80 backdrop-blur-sm"
            >
              {segment.label}
            </motion.div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate(segment.level)}
              className="px-4 py-2 rounded-lg text-sm font-medium
                       bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm
                       border border-gray-200 dark:border-gray-700
                       text-blue-600 dark:text-blue-400
                       hover:bg-blue-50 dark:hover:bg-blue-900/20
                       hover:border-blue-300 dark:hover:border-blue-700
                       hover:shadow-md
                       transition-all duration-200 shadow-sm"
            >
              {segment.label}
            </motion.button>
          )}
        </React.Fragment>
      ))}
    </motion.nav>
  );
}
