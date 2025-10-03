import { TabGroupDto, DemoShowcaseItemDto } from '@/api/types';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown, Video, Zap } from 'lucide-react';
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
  onExecuteClick
}: ShowcaseTabsProps) {
  // Track which secondary groups are open (all open by default)
  const [openSecondaryGroups, setOpenSecondaryGroups] = useState<Set<string>>(new Set());
  // Track selected primary group within each tab
  const [selectedPrimaryGroupLocal, setSelectedPrimaryGroupLocal] = useState<Record<string, string>>({});

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

  const handlePrimaryGroupSelect = (tabName: string, primaryGroupName: string) => {
    setSelectedPrimaryGroupLocal(prev => ({
      ...prev,
      [tabName]: primaryGroupName
    }));
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

            {/* Expanded View - Column Layout with Dropdowns */}
            {isSelected && (
              <div className="h-full overflow-y-auto p-6">
                <div className="flex gap-6 justify-center">
                  {primaryGroups.map((primaryGroup) => (
                    <div
                      key={primaryGroup.primaryGroupName}
                      className="flex-1 max-w"
                    >
                      {/* Primary Group Header */}
                      <div className="mb-4 p-4 rounded-lg text-white">
                        <h2 className="font-bold text-xl text-center">
                          {primaryGroup.primaryGroupName}
                        </h2>
                      </div>

                      {/* Secondary Groups as Dropdowns */}
                      <div className="space-y-3">
                        {primaryGroup.secondaryGroups?.map((secondaryGroup) => {
                          const groupKey = `${primaryGroup.primaryGroupName}-${secondaryGroup.secondaryGroupName}`;
                          const isOpen = !openSecondaryGroups.has(groupKey); // Open by default (inverse logic)

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
                                  {secondaryGroup.items?.length || 0} items
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
                                    <div className="p-3 pt-0 space-y-2 border-t border-gray-200 dark:border-gray-700">
                                      {secondaryGroup.items?.map((item: DemoShowcaseItemDto) => {
                                        const hasVideo = !!item.videoPath;
                                        const hasExecution = !!item.appId;

                                        return (
                                          <div
                                            key={item.id}
                                            className="p-3 rounded-lg border border-gray-200 dark:border-gray-700
                                                     bg-gray-50 dark:bg-gray-800/50 hover:border-blue-400 dark:hover:border-blue-500
                                                     hover:shadow-md transition-all"
                                          >
                                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                                              {item.name || 'Untitled'}
                                            </h4>
                                            <p className="text-xs text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                                              {item.description || 'No description available'}
                                            </p>

                                            <div className="flex gap-2">
                                              {hasExecution && (
                                                <button
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    item.appId && onExecuteClick(item.appId, item.appType || '0', item.name || 'Untitled');
                                                  }}
                                                  className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-md
                                                           bg-green-600 hover:bg-green-700 text-white font-medium text-xs transition-colors"
                                                >
                                                  <Zap size={14} />
                                                  Execute
                                                </button>
                                              )}
                                              {hasVideo && (
                                                <button
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    item.videoPath && onVideoClick(item.videoPath);
                                                  }}
                                                  className={`${hasExecution ? 'flex-1' : 'w-full'} flex items-center justify-center gap-1 px-2 py-1.5 rounded-md
                                                           bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs transition-colors`}
                                                >
                                                  <Video size={14} />
                                                  Watch
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
