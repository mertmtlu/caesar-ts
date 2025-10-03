import { TabGroupDto, DemoShowcaseItemDto } from '@/api/types';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown, Play, Camera } from 'lucide-react';
import { useState } from 'react';

interface ShowcaseTabsProps {
  tabs: TabGroupDto[];
  selectedTab: string | null;
  selectedPrimaryGroup: string | null;
  selectedSecondaryGroup: string | null;
  onTabSelect: (tabName: string) => void;
  onPrimaryCardClick: (groupName: string) => void;
  onSecondaryCardClick: (groupName: string) => void;
  onBack: () => void;
  onVideoClick: (videoPath: string) => void;
  onExecuteClick: (appId: string, appType: string, itemName: string) => void;
  itemIcons: Map<string, string>;
}

export function ShowcaseTabs({
  tabs,
  selectedTab,
  selectedPrimaryGroup,
  selectedSecondaryGroup,
  onTabSelect,
  onPrimaryCardClick,
  onSecondaryCardClick,
  onBack,
  onVideoClick,
  onExecuteClick,
  itemIcons
}: ShowcaseTabsProps) {
  // Track which secondary groups are open (all open by default)
  const [openSecondaryGroups, setOpenSecondaryGroups] = useState<Set<string>>(new Set());

  if (!tabs || tabs.length === 0) {
    return null;
  }

  const toggleSecondaryGroup = (groupName: string) => {
    setOpenSecondaryGroups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(groupName)) {
        newSet.delete(groupName);
      } else {
        newSet.add(groupName);
      }
      return newSet;
    });
  };

  return (
    <div className="flex gap-4 h-[90vh]">
      {tabs.map((tab) => {
        const isSelected = selectedTab === tab.tabName;
        const primaryGroups = tab.primaryGroups || [];

        return (
          <motion.div
            key={tab.tabName}
            layout
            initial={false}
            animate={{
              flex: isSelected ? '1 1 0%' : '0 0 80px',
            }}
            transition={{
              duration: 0.1,
              ease: [0.1, 0, 0.2, 1]
            }}
            className={`
              relative overflow-hidden rounded-xl border-2 transition-all cursor-pointer
              ${
                isSelected
                  ? 'border-blue-500 bg-white dark:bg-gray-800 shadow-xl'
                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 hover:border-gray-300 dark:hover:border-gray-600'
              }
            `}
            onClick={() => !isSelected && tab.tabName && onTabSelect(tab.tabName)}
          >
            {/* Collapsed View - Show only tab name vertically */}
            {!isSelected && (
              <div className="h-full flex flex-col items-center justify-center p-4 gap-3">
                <span
                  className="font-bold text-lg text-gray-700 dark:text-gray-300 whitespace-nowrap"
                  style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                >
                  {tab.tabName}
                </span>
                <ChevronRight className="text-gray-400" size={20} />
              </div>
            )}

            {/* Expanded View - Column Layout for Primary Groups */}
            {isSelected && (
              <div className="h-full overflow-y-auto p-6">
                <div className="flex gap-6 justify-evenly">
                  {primaryGroups.map((primaryGroup) => (
                    <div
                      key={primaryGroup.primaryGroupName}
                      className="flex-1"
                    >
                      {/* Primary Group Header */}
                      <div className="mb-4">
                        <h2 className="font-bold text-xl text-center text-gray-900 dark:text-white mb-2">
                          {primaryGroup.primaryGroupName}
                        </h2>
                        <div className="border-b-2 border-gray-300 dark:border-gray-600"></div>
                      </div>

                      {/* Secondary Groups as Dropdowns */}
                      <div className="space-y-3">
                        {primaryGroup.secondaryGroups?.map((secondaryGroup) => {
                      const groupKey = `${tab.tabName}-${secondaryGroup.secondaryGroupName}`;
                      const isOpen = !openSecondaryGroups.has(groupKey); // Open by default (inverse logic)

                      // Calculate total items (direct items + items in tertiary groups)
                      const directItems = secondaryGroup.items || [];
                      const tertiaryGroups = secondaryGroup.tertiaryGroups || [];
                      const totalItems = directItems.length + tertiaryGroups.reduce((sum, tg) => sum + (tg.items?.length || 0), 0);

                      return (
                        <div
                          key={secondaryGroup.secondaryGroupName}
                          className="border-2 border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden
                                   bg-white dark:bg-gray-900/50"
                        >
                          {/* Dropdown Header */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSecondaryGroup(groupKey);
                            }}
                            className="w-full p-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <motion.div
                                animate={{ rotate: isOpen ? 0 : -90 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronDown className="text-purple-500" size={20} />
                              </motion.div>
                              <h3 className="font-semibold text-gray-900 dark:text-white">
                                {secondaryGroup.secondaryGroupName}
                              </h3>
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {totalItems} items
                            </span>
                          </button>

                          {/* Dropdown Content */}
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="p-3 pt-0 border-t border-gray-200 dark:border-gray-700 space-y-3">
                                  {/* Direct Items (no tertiary group) */}
                                  {directItems.length > 0 && (
                                    <div className="grid grid-cols-2 gap-3">
                                      {directItems.map((item: DemoShowcaseItemDto) => {
                                        const hasVideo = !!item.videoPath;
                                        const hasExecution = !!item.appId;

                                        const iconData = item.appId ? itemIcons.get(item.appId) : undefined;

                                        return (
                                          <div
                                            key={item.id}
                                            className="p-3 rounded-lg border border-gray-200 dark:border-gray-700
                                                     bg-transparent hover:border-blue-400 dark:hover:border-blue-500
                                                     hover:shadow-md transition-all flex gap-3"
                                          >
                                            <div className="flex-1 flex gap-2">
                                              {iconData && (
                                                <img
                                                  src={iconData}
                                                  alt={item.name || 'App icon'}
                                                  className="w-10 h-10 rounded object-cover flex-shrink-0"
                                                />
                                              )}
                                              <div className="flex-1 min-w-0">
                                                <h4 className="font-semibold text-gray-900 dark:text-white mb-1 truncate">
                                                  {item.name || 'Untitled'}
                                                </h4>
                                                <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                                                  {item.description || 'No description available'}
                                                </p>
                                              </div>
                                            </div>

                                            <div className="flex gap-2 justify-center">
                                              {hasExecution && (
                                                <button
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    item.appId && onExecuteClick(item.appId, item.appType || '0', item.name || 'Untitled');
                                                  }}
                                                  className="w-8 h-8 rounded-full flex items-center justify-center
                                                           bg-green-600 hover:bg-green-700 text-white
                                                           dark:bg-green-500 dark:hover:bg-green-600
                                                           shadow-md hover:shadow-lg transition-all"
                                                  title="Execute"
                                                >
                                                  <Play size={14} fill="currentColor" />
                                                </button>
                                              )}
                                              {hasVideo && (
                                                <button
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    item.videoPath && onVideoClick(item.videoPath);
                                                  }}
                                                  className="w-8 h-8 rounded-full flex items-center justify-center
                                                           bg-blue-600 hover:bg-blue-700 text-white
                                                           dark:bg-blue-500 dark:hover:bg-blue-600
                                                           shadow-md hover:shadow-lg transition-all"
                                                  title="Watch Video"
                                                >
                                                  <Camera size={14} />
                                                </button>
                                              )}
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}

                                  {/* Tertiary Groups */}
                                  {tertiaryGroups.map((tertiaryGroup) => {
                                    const tertiaryKey = `${groupKey}-${tertiaryGroup.tertiaryGroupName}`;
                                    const isTertiaryOpen = !openSecondaryGroups.has(tertiaryKey); // Open by default

                                    return (
                                      <div
                                        key={tertiaryGroup.tertiaryGroupName}
                                        className="border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden bg-gray-50 dark:bg-gray-800/30"
                                      >
                                        {/* Tertiary Dropdown Header */}
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            toggleSecondaryGroup(tertiaryKey);
                                          }}
                                          className="w-full p-2 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                                        >
                                          <div className="flex items-center gap-2">
                                            <motion.div
                                              animate={{ rotate: isTertiaryOpen ? 0 : -90 }}
                                              transition={{ duration: 0.2 }}
                                            >
                                              <ChevronDown className="text-blue-500" size={16} />
                                            </motion.div>
                                            <h4 className="font-medium text-sm text-gray-800 dark:text-gray-200">
                                              {tertiaryGroup.tertiaryGroupName}
                                            </h4>
                                          </div>
                                          <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {tertiaryGroup.items?.length || 0} items
                                          </span>
                                        </button>

                                        {/* Tertiary Dropdown Content */}
                                        <AnimatePresence>
                                          {isTertiaryOpen && (
                                            <motion.div
                                              initial={{ height: 0, opacity: 0 }}
                                              animate={{ height: 'auto', opacity: 1 }}
                                              exit={{ height: 0, opacity: 0 }}
                                              transition={{ duration: 0.2 }}
                                              className="overflow-hidden"
                                            >
                                              <div className="p-2 pt-0 grid grid-cols-2 gap-2 border-t border-gray-300 dark:border-gray-600">
                                                {tertiaryGroup.items?.map((item: DemoShowcaseItemDto) => {
                                                  const hasVideo = !!item.videoPath;
                                                  const hasExecution = !!item.appId;
                                                  const iconData = item.appId ? itemIcons.get(item.appId) : undefined;

                                                  return (
                                                    <div
                                                      key={item.id}
                                                      className="p-3 rounded-lg border border-gray-200 dark:border-gray-700
                                                               bg-white dark:bg-gray-900/50 hover:border-blue-400 dark:hover:border-blue-500
                                                               hover:shadow-md transition-all flex gap-3"
                                                    >
                                                      <div className="flex-1 flex gap-2">
                                                        {iconData && (
                                                          <img
                                                            src={iconData}
                                                            alt={item.name || 'App icon'}
                                                            className="w-10 h-10 rounded object-cover flex-shrink-0"
                                                          />
                                                        )}
                                                        <div className="flex-1 min-w-0">
                                                          <h4 className="font-semibold text-gray-900 dark:text-white mb-1 truncate">
                                                            {item.name || 'Untitled'}
                                                          </h4>
                                                          <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                                                            {item.description || 'No description available'}
                                                          </p>
                                                        </div>
                                                      </div>

                                                      <div className="flex gap-2 justify-center">
                                                        {hasExecution && (
                                                          <button
                                                            onClick={(e) => {
                                                              e.stopPropagation();
                                                              item.appId && onExecuteClick(item.appId, item.appType || '0', item.name || 'Untitled');
                                                            }}
                                                            className="w-8 h-8 rounded-full flex items-center justify-center
                                                                     bg-green-600 hover:bg-green-700 text-white
                                                                     dark:bg-green-500 dark:hover:bg-green-600
                                                                     shadow-md hover:shadow-lg transition-all"
                                                            title="Execute"
                                                          >
                                                            <Play size={14} fill="currentColor" />
                                                          </button>
                                                        )}
                                                        {hasVideo && (
                                                          <button
                                                            onClick={(e) => {
                                                              e.stopPropagation();
                                                              item.videoPath && onVideoClick(item.videoPath);
                                                            }}
                                                            className="w-8 h-8 rounded-full flex items-center justify-center
                                                                     bg-blue-600 hover:bg-blue-700 text-white
                                                                     dark:bg-blue-500 dark:hover:bg-blue-600
                                                                     shadow-md hover:shadow-lg transition-all"
                                                            title="Watch Video"
                                                          >
                                                            <Camera size={14} />
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
                                    );
                                  })}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
