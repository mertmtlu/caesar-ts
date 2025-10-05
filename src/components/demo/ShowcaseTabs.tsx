import { TabGroupDto, DemoShowcaseItemDto } from '@/api/types';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Play, Camera } from 'lucide-react';
import { useState } from 'react';

interface ShowcaseTabsProps {
  tabs: TabGroupDto[];
  onVideoClick: (videoPath: string, itemName?: string, creatorName?: string) => void;
  onExecuteClick: (appId: string, appType: string, itemName: string) => void;
  itemIcons: Map<string, string>;
}

export function ShowcaseTabs({
  tabs,
  onVideoClick,
  onExecuteClick,
  itemIcons
}: ShowcaseTabsProps) {
  // Track which groups are open (collapsed by default - inverse logic)
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());

  if (!tabs || tabs.length === 0) {
    return null;
  }

  const toggleGroup = (groupKey: string) => {
    setCollapsedGroups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(groupKey)) {
        newSet.delete(groupKey);
      } else {
        newSet.add(groupKey);
      }
      return newSet;
    });
  };

  return (
    <div className="w-full space-y-8">
      {/* Tabs Section */}
      <div className="flex gap-8 justify-evenly items-start">
        {tabs.map((tab) => (
          <div key={tab.tabName} className="flex-1 flex flex-col items-center">
            {/* Arrow from divider to tab */}
            <svg className="w-8 h-12 mb-2" viewBox="0 0 32 48">
              <line x1="16" y1="0" x2="16" y2="40" stroke="currentColor" strokeWidth="2" className="text-gray-400" />
              <polygon points="16,48 12,40 20,40" fill="currentColor" className="text-gray-400" />
            </svg>

            {/* Tab */}
            <div className="w-full bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl px-6 py-4 shadow-lg text-center">
              <h2 className="text-xl font-bold">{tab.tabName}</h2>
            </div>

            {/* Primary Groups for this tab */}
            {tab.primaryGroups && tab.primaryGroups.length > 0 && (
              <div className="w-full mt-8 space-y-8">
                <div className="flex gap-8 justify-evenly">
                  {tab.primaryGroups.map((primaryGroup) => (
                    <div key={primaryGroup.primaryGroupName} className="flex-1 flex flex-col items-center">
                      {/* Arrow from tab to primary group */}
                      <svg className="w-8 h-12 mb-2" viewBox="0 0 32 48">
                        <line x1="16" y1="0" x2="16" y2="40" stroke="currentColor" strokeWidth="2" className="text-gray-400" />
                        <polygon points="16,48 12,40 20,40" fill="currentColor" className="text-gray-400" />
                      </svg>

                      {/* Primary Group */}
                      <div className="w-full bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl px-6 py-4 shadow-lg text-center">
                        <h3 className="text-lg font-bold">{primaryGroup.primaryGroupName}</h3>
                      </div>

                      {/* Secondary Groups */}
                      {primaryGroup.secondaryGroups && primaryGroup.secondaryGroups.length > 0 && (
                        <div className="w-full mt-8 pl-16 space-y-4 relative" style={{ overflow: 'hidden' }}>
                          {primaryGroup.secondaryGroups.map((secondaryGroup, index) => {
                            const isFirstItem = index === 0;
                            const isLastItem = index === primaryGroup.secondaryGroups!.length - 1;
                            const secondaryKey = `${tab.tabName}-${primaryGroup.primaryGroupName}-${secondaryGroup.secondaryGroupName}`;
                            const isSecondaryOpen = collapsedGroups.has(secondaryKey);

                            // Calculate total items
                            const directItems = secondaryGroup.items || [];
                            const tertiaryGroups = secondaryGroup.tertiaryGroups || [];
                            const totalItems = directItems.length + tertiaryGroups.reduce((sum, tg) => sum + (tg.items?.length || 0), 0);

                            return (
                              <div key={secondaryGroup.secondaryGroupName} className="relative">
                                {/* Vertical line: from horizontal arrow position going up */}
                                <div className="absolute bg-gray-400" style={{
                                  left: '-64px',
                                  width: '2px',
                                  top: '-10000px',
                                  height: '10024px'
                                }}>
                                </div>

                                {/* Horizontal arrow to secondary group - aligned with dropdown header */}
                                <div className="absolute" style={{ left: '-64px', top: '24px' }}>
                                  <svg width="64" height="2" style={{ overflow: 'visible' }}>
                                    <line x1="0" y1="0" x2="56" y2="0" stroke="currentColor" strokeWidth="2" className="text-gray-400" />
                                    <polygon points="64,0 56,-4 56,4" fill="currentColor" className="text-gray-400" />
                                  </svg>
                                </div>

                                {/* Secondary Group Dropdown */}
                                <div className="border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-md max-w-md">
                                  {/* Dropdown Header */}
                                  <button
                                    onClick={() => toggleGroup(secondaryKey)}
                                    className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                  >
                                    <div className="flex items-center gap-3">
                                      <motion.div
                                        animate={{ rotate: isSecondaryOpen ? 0 : -90 }}
                                        transition={{ duration: 0.2 }}
                                      >
                                        <ChevronDown className="text-purple-500" size={24} />
                                      </motion.div>
                                      <h4 className="font-bold text-lg text-gray-900 dark:text-white">
                                        {secondaryGroup.secondaryGroupName}
                                      </h4>
                                    </div>
                                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                      {totalItems} items
                                    </span>
                                  </button>

                                  {/* Dropdown Content */}
                                  <AnimatePresence>
                                    {isSecondaryOpen && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden"
                                      >
                                        <div className="p-4 pt-0 border-t border-gray-200 dark:border-gray-700 space-y-3">
                                          {/* Direct Items */}
                                          {directItems.length > 0 && (
                                            <div className="space-y-2">
                                              {directItems.map((item: DemoShowcaseItemDto) => {
                                                const hasVideo = !!item.videoPath;
                                                const hasExecution = !!item.appId;
                                                const iconData = item.appId ? itemIcons.get(item.appId) : undefined;

                                                return (
                                                  <div
                                                    key={item.id}
                                                    className="p-3 rounded-lg border border-gray-200 dark:border-gray-700
                                                             bg-gray-50 dark:bg-gray-900/50 hover:border-blue-400 dark:hover:border-blue-500
                                                             hover:shadow-md transition-all flex items-center gap-3"
                                                  >
                                                    {iconData && (
                                                      <img
                                                        src={iconData}
                                                        alt={item.name || 'App icon'}
                                                        className="w-12 h-12 rounded object-cover flex-shrink-0"
                                                      />
                                                    )}
                                                    <div className="flex-1 min-w-0">
                                                      <h5 className="font-semibold text-gray-900 dark:text-white mb-1">
                                                        {item.name || 'Untitled'}
                                                      </h5>
                                                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-1">
                                                        {item.description || 'No description available'}
                                                      </p>
                                                    </div>
                                                    <div className="flex gap-2">
                                                      {hasExecution && (
                                                        <button
                                                          onClick={(e) => {
                                                            e.stopPropagation();
                                                            item.appId && onExecuteClick(item.appId, item.appType || '0', item.name || 'Untitled');
                                                          }}
                                                          className="w-10 h-10 rounded-full flex items-center justify-center
                                                                   bg-green-600 hover:bg-green-700 text-white
                                                                   shadow-md hover:shadow-lg transition-all"
                                                          title="Run"
                                                        >
                                                          <Play size={16} fill="currentColor" />
                                                        </button>
                                                      )}
                                                      {hasVideo && (
                                                        <button
                                                          onClick={(e) => {
                                                            e.stopPropagation();
                                                            item.videoPath && onVideoClick(item.videoPath, item.name, item.creatorFullName);
                                                          }}
                                                          className="w-10 h-10 rounded-full flex items-center justify-center
                                                                   bg-blue-600 hover:bg-blue-700 text-white
                                                                   shadow-md hover:shadow-lg transition-all"
                                                          title="Watch"
                                                        >
                                                          <Camera size={16} />
                                                        </button>
                                                      )}
                                                    </div>
                                                  </div>
                                                );
                                              })}
                                            </div>
                                          )}

                                          {/* Tertiary Groups */}
                                          {tertiaryGroups.length > 0 && (
                                            <div className="pl-12 space-y-3 relative" style={{ overflow: 'hidden' }}>
                                              {tertiaryGroups.map((tertiaryGroup, tertiaryIndex) => {
                                                const isFirstTertiary = tertiaryIndex === 0;
                                                const isLastTertiary = tertiaryIndex === tertiaryGroups.length - 1;
                                                const tertiaryKey = `${secondaryKey}-${tertiaryGroup.tertiaryGroupName}`;
                                                const isTertiaryOpen = collapsedGroups.has(tertiaryKey);

                                                return (
                                                  <div key={tertiaryGroup.tertiaryGroupName} className="relative">
                                                    {/* Vertical line: from horizontal arrow position going up */}
                                                    <div className="absolute bg-gray-400" style={{
                                                      left: '-48px',
                                                      width: '2px',
                                                      top: '-10000px',
                                                      height: '10016px'
                                                    }}>
                                                    </div>

                                                    {/* Horizontal arrow to tertiary group - aligned with dropdown header */}
                                                    <div className="absolute" style={{ left: '-48px', top: '16px' }}>
                                                      <svg width="48" height="2" style={{ overflow: 'visible' }}>
                                                        <line x1="0" y1="0" x2="40" y2="0" stroke="currentColor" strokeWidth="2" className="text-gray-400" />
                                                        <polygon points="48,0 40,-4 40,4" fill="currentColor" className="text-gray-400" />
                                                      </svg>
                                                    </div>

                                                  {/* Tertiary Dropdown */}
                                                  <div className="border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800/50 max-w-sm">
                                                  <button
                                                    onClick={() => toggleGroup(tertiaryKey)}
                                                    className="w-full p-3 flex items-center justify-between hover:bg-gray-200 dark:hover:bg-gray-700/50 transition-colors"
                                                  >
                                                    <div className="flex items-center gap-2">
                                                      <motion.div
                                                        animate={{ rotate: isTertiaryOpen ? 0 : -90 }}
                                                        transition={{ duration: 0.2 }}
                                                      >
                                                        <ChevronDown className="text-blue-500" size={20} />
                                                      </motion.div>
                                                      <h5 className="font-semibold text-gray-800 dark:text-gray-200">
                                                        {tertiaryGroup.tertiaryGroupName}
                                                      </h5>
                                                    </div>
                                                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                                      {tertiaryGroup.items?.length || 0} items
                                                    </span>
                                                  </button>

                                                  <AnimatePresence>
                                                    {isTertiaryOpen && (
                                                      <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="overflow-hidden"
                                                      >
                                                        <div className="p-3 pt-0 border-t border-gray-300 dark:border-gray-600 space-y-2">
                                                          {tertiaryGroup.items?.map((item: DemoShowcaseItemDto) => {
                                                            const hasVideo = !!item.videoPath;
                                                            const hasExecution = !!item.appId;
                                                            const iconData = item.appId ? itemIcons.get(item.appId) : undefined;

                                                            return (
                                                              <div
                                                                key={item.id}
                                                                className="p-3 rounded-lg border border-gray-200 dark:border-gray-700
                                                                         bg-white dark:bg-gray-900/50 hover:border-blue-400 dark:hover:border-blue-500
                                                                         hover:shadow-md transition-all flex items-center gap-3"
                                                              >
                                                                {iconData && (
                                                                  <img
                                                                    src={iconData}
                                                                    alt={item.name || 'App icon'}
                                                                    className="w-12 h-12 rounded object-cover flex-shrink-0"
                                                                  />
                                                                )}
                                                                <div className="flex-1 min-w-0">
                                                                  <h5 className="font-semibold text-gray-900 dark:text-white mb-1">
                                                                    {item.name || 'Untitled'}
                                                                  </h5>
                                                                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-1">
                                                                    {item.description || 'No description available'}
                                                                  </p>
                                                                </div>
                                                                <div className="flex gap-2">
                                                                  {hasExecution && (
                                                                    <button
                                                                      onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        item.appId && onExecuteClick(item.appId, item.appType || '0', item.name || 'Untitled');
                                                                      }}
                                                                      className="w-10 h-10 rounded-full flex items-center justify-center
                                                                               bg-green-600 hover:bg-green-700 text-white
                                                                               shadow-md hover:shadow-lg transition-all"
                                                                      title="Run"
                                                                    >
                                                                      <Play size={16} fill="currentColor" />
                                                                    </button>
                                                                  )}
                                                                  {hasVideo && (
                                                                    <button
                                                                      onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        item.videoPath && onVideoClick(item.videoPath, item.name, item.creatorFullName);
                                                                      }}
                                                                      className="w-10 h-10 rounded-full flex items-center justify-center
                                                                               bg-blue-600 hover:bg-blue-700 text-white
                                                                               shadow-md hover:shadow-lg transition-all"
                                                                      title="Watch"
                                                                    >
                                                                      <Camera size={16} />
                                                                    </button>
                                                                  )}
                                                                </div>
                                                              </div>
                                                            );
                                                          })}
                                                        </div>
                                                      </motion.div>
                                                    )}
                                                  </AnimatePresence>
                                                </div>
                                              </div>
                                            );
                                          })}
                                            </div>
                                          )}
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
