import { motion } from 'framer-motion';
import { Play, Calendar, User, Zap, Sparkles, Video } from 'lucide-react';
import { DemoShowcaseItemDto } from '@/api/types';

interface ShowcaseCardProps {
  item: DemoShowcaseItemDto;
  onVideoClick: (videoPath: string, itemName?: string, creatorName?: string) => void;
  onExecuteClick: (appId: string, appType: string, itemName: string) => void;
  itemIcons?: Map<string, string>;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function ShowcaseCard({ item, onVideoClick, onExecuteClick, itemIcons }: ShowcaseCardProps) {
  const formatDate = (date?: Date) => {
    if (!date) return 'Unknown date';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleExecuteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.appId) {
      onExecuteClick(item.appId, item.appType || '0', item.name || 'Untitled');
    }
  };

  const handleVideoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.videoPath) {
      onVideoClick(item.videoPath, item.name, item.creatorFullName);
    }
  };

  // Determine icon and style based on item type
  const hasExecution = !!item.appId;
  const hasVideo = !!item.videoPath;
  const Icon = hasExecution ? Zap : Play;
  const gradientFrom = 'from-blue-500';
  const gradientTo = 'to-purple-500';
  const hoverGlow = 'group-hover:shadow-blue-500/20';
  const decorativeColor = 'bg-blue-500/10';

  // Get custom icon if available
  const iconData = item.appId && itemIcons ? itemIcons.get(item.appId) : undefined;

  return (
    <motion.div
      variants={itemVariants}
      className={`group relative rounded-2xl overflow-hidden
                 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900
                 border border-gray-200/50 dark:border-gray-700/50
                 shadow-lg hover:shadow-2xl ${hoverGlow}
                 transition-all duration-300`}
      whileHover={{ scale: 1.02, y: -4 }}
    >
      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientFrom}/5 ${gradientTo}/5
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      {/* Decorative Element */}
      <div className={`absolute top-0 right-0 w-32 h-32 ${decorativeColor} rounded-full blur-3xl
                      transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500`} />

      <div className="relative p-6">
        {/* Header with Icon */}
        <div className="flex items-start gap-4 mb-4">
          {iconData ? (
            <div className="flex-shrink-0 rounded-xl shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300 overflow-hidden">
              <img
                src={iconData}
                alt={item.name || 'App icon'}
                className="w-16 h-16 object-cover"
              />
            </div>
          ) : (
            <div className={`flex-shrink-0 p-3 rounded-xl bg-gradient-to-br ${gradientFrom} ${gradientTo}
                           shadow-lg group-hover:shadow-xl
                           transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
              {item.name || 'Untitled'}
            </h3>

            {/* Type Badge */}
            {item.appType && (
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold
                                text-white`}>
                  <Sparkles className="w-3 h-3" />
                  {item.appType}
                </span>
                {hasExecution && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold
                                 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    Executable
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 min-h-[2.5rem] text-sm leading-relaxed">
          {item.description || 'No description available'}
        </p>

        {/* Metadata */}
        <div className="space-y-2">
          {item.creatorFullName && (
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700/50">
                <User className="w-3.5 h-3.5" />
              </div>
              <span className="font-medium">{item.creatorFullName}</span>
            </div>
          )}

          {item.createdAt && (
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700/50">
                <Calendar className="w-3.5 h-3.5" />
              </div>
              <span>{formatDate(item.createdAt)}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex gap-2">
          {hasExecution && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExecuteClick}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg
                bg-green-600 text-white
                font-semibold text-sm
                hover:bg-green-700
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-400
                transition-colors duration-200"
            >
              <Play className="w-4 h-4" fill="currentColor" />
              Execute
            </motion.button>
          )}
          {hasVideo && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleVideoClick}
              className={`${hasExecution ? 'flex-1' : 'w-full'} flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg
                       bg-blue-600 text-white
                       font-semibold text-sm
                       hover:bg-blue-700
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400
                       transition-colors duration-200`}
            >
              <Video className="w-4 h-4" />
              Watch Demo
            </motion.button>
          )}
          {!hasExecution && !hasVideo && (
            <div className="w-full flex items-center justify-center px-4 py-2.5 rounded-lg
                          bg-gray-100 dark:bg-gray-700/50
                          text-gray-500 dark:text-gray-400 text-sm">
              No actions available
            </div>
          )}
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div className={`absolute bottom-0 left-0 right-0 h-1
                      bg-gradient-to-r ${gradientFrom} ${gradientTo}
                      transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
    </motion.div>
  );
}
