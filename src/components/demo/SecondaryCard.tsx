import { motion } from 'framer-motion';
import { Play, Zap, ChevronRight, Layers } from 'lucide-react';
import { DemoShowcaseItemDto } from '@/api/types';

interface SecondaryCardProps {
  title: string;
  items: DemoShowcaseItemDto[];
  onClick: () => void;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function SecondaryCard({ title, items, onClick }: SecondaryCardProps) {
  const visibleItems = items.slice(0, 6);
  const remainingCount = items.length - 6;

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
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl
                      transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500" />

      <div className="relative p-6">
        {/* Card Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600
                            shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50
                            transform group-hover:scale-110 transition-all duration-300">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1
                             group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {title}
                </h3>
              </div>
            </div>
          </div>

          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-500
                                   transform group-hover:translate-x-1 transition-all duration-300" />
        </div>

        {/* Program Items Preview Grid */}
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {visibleItems.map((item, index) => {
              const isInteractive = item.hasPublicUiComponent && item.appId;
              const Icon = isInteractive ? Zap : Play;
              const iconColor = isInteractive
                ? 'text-green-600 dark:text-green-400'
                : 'text-blue-600 dark:text-blue-400';
              const bgGradient = isInteractive
                ? 'from-green-500/10 to-emerald-500/10'
                : 'from-blue-500/10 to-cyan-500/10';
              const hoverBg = isInteractive
                ? 'hover:bg-green-50 dark:hover:bg-green-900/20'
                : 'hover:bg-blue-50 dark:hover:bg-blue-900/20';
              const hoverBorder = isInteractive
                ? 'hover:border-green-300 dark:hover:border-green-600'
                : 'hover:border-blue-300 dark:hover:border-blue-600';

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl
                           bg-gradient-to-br ${bgGradient}
                           border border-gray-200/50 dark:border-gray-700/50
                           ${hoverBg} ${hoverBorder}
                           transition-all duration-200`}
                >
                  <div className="relative mb-1.5">
                    <Icon className={`w-5 h-5 ${iconColor}`} />
                    {isInteractive && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    )}
                  </div>
                  <span className="text-xs text-gray-700 dark:text-gray-300 text-center truncate w-full font-medium">
                    {item.name || 'Untitled'}
                  </span>
                </motion.div>
              );
            })}

            {/* Show "+X more" badge */}
            {remainingCount > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: visibleItems.length * 0.05 }}
                className="flex flex-col items-center justify-center p-3 rounded-xl
                         bg-gradient-to-br from-purple-500 to-pink-600
                         shadow-lg shadow-purple-500/30"
              >
                <span className="text-lg font-bold text-white">
                  +{remainingCount}
                </span>
                <span className="text-xs text-purple-100 font-medium">more</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Hover Indicator */}
        <div className="mt-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20">
            <p className="text-xs font-semibold text-purple-600 dark:text-purple-400">
              Click to view all →
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
