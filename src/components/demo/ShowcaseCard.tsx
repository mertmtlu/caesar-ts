import { Play, Calendar, User, Zap } from 'lucide-react';
import { DemoShowcaseItemDto } from '@/api/types';

interface ShowcaseCardProps {
  item: DemoShowcaseItemDto;
  onVideoClick: (videoPath: string) => void;
  onExecuteClick: (appId: string, itemName: string) => void;
}

export function ShowcaseCard({ item, onVideoClick, onExecuteClick }: ShowcaseCardProps) {
  const handleClick = () => {
    if (item.hasPublicUiComponent && item.appId) {
      // Open execution form modal
      onExecuteClick(item.appId, item.name || 'Untitled');
    } else if (item.videoPath) {
      // Open video modal
      onVideoClick(item.videoPath);
    }
  };

  const formatDate = (date?: Date) => {
    if (!date) return 'Unknown date';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Determine icon and label based on item type
  const isInteractive = item.hasPublicUiComponent && item.appId;
  const Icon = isInteractive ? Zap : Play;
  const iconColor = isInteractive
    ? 'text-green-600 dark:text-green-400'
    : 'text-blue-600 dark:text-blue-400';
  const iconBgColor = isInteractive
    ? 'bg-green-100 dark:bg-green-900/30 group-hover:bg-green-200 dark:group-hover:bg-green-900/50'
    : 'bg-blue-100 dark:bg-blue-900/30 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50';
  const ariaLabel = isInteractive
    ? `Execute: ${item.name}`
    : `Play video: ${item.name}`;

  return (
    <div
      onClick={handleClick}
      className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-200 dark:border-gray-700"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={ariaLabel}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {item.name || 'Untitled'}
          </h3>
          <div className={`flex-shrink-0 ml-3 p-2 rounded-full transition-colors ${iconBgColor}`}>
            <Icon size={20} className={iconColor} />
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 min-h-[3rem]">
          {item.description || 'No description available'}
        </p>

        <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
          {item.creatorFullName && (
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>{item.creatorFullName}</span>
            </div>
          )}
          {item.createdAt && (
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{formatDate(item.createdAt)}</span>
            </div>
          )}
          <div className="flex items-center gap-2 mt-2">
            {item.appType && (
              <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-medium">
                {item.appType}
              </span>
            )}
            {isInteractive && (
              <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-medium">
                Interactive
              </span>
            )}
          </div>
        </div>
      </div>

      <div
        className={`absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
          isInteractive
            ? 'bg-gradient-to-r from-green-500 to-emerald-500'
            : 'bg-gradient-to-r from-blue-500 to-purple-500'
        }`}
      />
    </div>
  );
}
