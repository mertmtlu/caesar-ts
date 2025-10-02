import { motion } from 'framer-motion';
import { Folder, ChevronRight } from 'lucide-react';
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
      className="group relative rounded-2xl overflow-hidden cursor-pointer
                 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900
                 border border-gray-200/50 dark:border-gray-700/50
                 shadow-lg hover:shadow-2xl
                 transition-all duration-300"
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl
                      transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500" />

      <div className="relative p-6">
        {/* Card Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600
                            shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50
                            transform group-hover:scale-110 transition-all duration-300">
                <Folder className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1
                             group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {title}
                </h3>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {secondaryGroups.length} {secondaryGroups.length === 1 ? 'category' : 'categories'}
                </p>
              </div>
            </div>
          </div>

          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500
                                   transform group-hover:translate-x-1 transition-all duration-300" />
        </div>

        {/* Secondary Groups Preview Grid */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Quick Preview
          </p>
          <div className="grid grid-cols-3 gap-2">
            {visibleGroups.map((group, index) => (
              <motion.div
                key={group.secondaryGroupName}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="flex flex-col items-center justify-center p-3 rounded-xl
                         bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm
                         border border-gray-200/50 dark:border-gray-700/50
                         hover:bg-blue-50 dark:hover:bg-blue-900/20
                         hover:border-blue-300 dark:hover:border-blue-600
                         transition-all duration-200"
              >
                <Folder className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-1.5" />
                <span className="text-xs text-gray-700 dark:text-gray-300 text-center truncate w-full font-medium">
                  {group.secondaryGroupName}
                </span>
              </motion.div>
            ))}

            {/* Show "+X more" badge */}
            {remainingCount > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: visibleGroups.length * 0.05 }}
                className="flex flex-col items-center justify-center p-3 rounded-xl
                         bg-gradient-to-br from-blue-500 to-purple-600
                         shadow-lg shadow-blue-500/30"
              >
                <span className="text-lg font-bold text-white">
                  +{remainingCount}
                </span>
                <span className="text-xs text-blue-100 font-medium">more</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Hover Indicator */}
        <div className="mt-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
            <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
              Click to explore →
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
