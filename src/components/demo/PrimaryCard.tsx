import { motion } from 'framer-motion';
import { Folder } from 'lucide-react';
import { SecondaryGroupDto } from '@/api/types';

interface PrimaryCardProps {
  title: string;
  secondaryGroups: SecondaryGroupDto[];
  onClick: () => void;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function PrimaryCard({ title, secondaryGroups, onClick }: PrimaryCardProps) {
  const visibleGroups = secondaryGroups.slice(0, 6);
  const remainingCount = secondaryGroups.length - 6;

  return (
    <motion.div
      variants={itemVariants}
      onClick={onClick}
      className="relative rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6 cursor-pointer
                 transition-all duration-200 bg-white dark:bg-gray-800
                 hover:border-blue-500 hover:shadow-xl hover:scale-105"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Card Header */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
          {title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {secondaryGroups.length} {secondaryGroups.length === 1 ? 'category' : 'categories'}
        </p>
      </div>

      {/* Secondary Groups Preview (Small Icons) */}
      <div className="grid grid-cols-3 gap-3">
        {visibleGroups.map((group) => (
          <div
            key={group.secondaryGroupName}
            className="flex flex-col items-center justify-center p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50
                       transition-colors hover:bg-blue-50 dark:hover:bg-blue-900/20"
          >
            <Folder className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-1" />
            <span className="text-xs text-gray-600 dark:text-gray-300 text-center truncate w-full">
              {group.secondaryGroupName}
            </span>
          </div>
        ))}

        {/* Show "+X more" if there are remaining items */}
        {remainingCount > 0 && (
          <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
            <span className="text-lg font-semibold text-gray-600 dark:text-gray-300">
              +{remainingCount}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">more</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
