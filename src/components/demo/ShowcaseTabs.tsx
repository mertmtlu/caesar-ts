import { TabGroupDto, DemoShowcaseItemDto } from '@/api/types';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Video, Zap } from 'lucide-react';

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
  if (!tabs || tabs.length === 0) {
    return null;
  }

  const getCurrentView = () => {
    if (selectedSecondaryGroup) return 'programs';
    if (selectedPrimaryGroup) return 'secondary';
    return 'primary';
  };

  return (
    <div className="flex gap-4 h-[90vh]">
      {tabs.map((tab) => {
        const isSelected = selectedTab === tab.tabName;
        const primaryGroups = tab.primaryGroups || [];
        const currentView = getCurrentView();

        // Get current secondary groups if primary is selected
        const secondaryGroups = primaryGroups
          .find(pg => pg.primaryGroupName === selectedPrimaryGroup)
          ?.secondaryGroups || [];

        // Get current programs if secondary is selected
        const programs = secondaryGroups
          .find(sg => sg.secondaryGroupName === selectedSecondaryGroup)
          ?.items || [];

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

            {/* Expanded View */}
            {isSelected && (
              <div className="h-full overflow-y-auto p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentView}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Back Button */}
                    {(selectedPrimaryGroup || selectedSecondaryGroup) && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onBack();
                        }}
                        className="mb-4 flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                      >
                        <ChevronLeft size={20} />
                        <span className="font-medium">Back</span>
                      </button>
                    )}

                    {/* Tab Header */}
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {selectedSecondaryGroup || selectedPrimaryGroup || tab.tabName}
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {currentView === 'primary' && `${primaryGroups.length} ${primaryGroups.length === 1 ? 'category' : 'categories'}`}
                        {currentView === 'secondary' && `${secondaryGroups.length} ${secondaryGroups.length === 1 ? 'subcategory' : 'subcategories'}`}
                        {currentView === 'programs' && `${programs.length} ${programs.length === 1 ? 'item' : 'items'}`}
                      </p>
                    </div>

                    {/* Primary Groups View */}
                    {currentView === 'primary' && (
                      <div className="grid grid-cols-1 gap-4">
                        {primaryGroups.map((primaryGroup) => {
                          const secondaryCount = primaryGroup.secondaryGroups?.length || 0;
                          const totalItems = primaryGroup.secondaryGroups?.reduce(
                            (acc, sg) => acc + (sg.items?.length || 0),
                            0
                          ) || 0;

                          return (
                            <motion.button
                              key={primaryGroup.primaryGroupName}
                              onClick={(e) => {
                                e.stopPropagation();
                                primaryGroup.primaryGroupName && onPrimaryCardClick(primaryGroup.primaryGroupName);
                              }}
                              whileHover={{ scale: 1.02, x: 4 }}
                              whileTap={{ scale: 0.98 }}
                              className="p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700
                                       bg-white dark:bg-gray-900/50 hover:border-blue-400 dark:hover:border-blue-500
                                       hover:shadow-md transition-all text-left group"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1
                                               group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {primaryGroup.primaryGroupName}
                                  </h3>
                                  <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
                                    <span>{secondaryCount} subcategories</span>
                                    <span>•</span>
                                    <span>{totalItems} items</span>
                                  </div>
                                </div>
                                <ChevronRight
                                  className="text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0 mt-1"
                                  size={20}
                                />
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    )}

                    {/* Secondary Groups View */}
                    {currentView === 'secondary' && (
                      <div className="grid grid-cols-1 gap-4">
                        {secondaryGroups.map((secondaryGroup) => {
                          const itemCount = secondaryGroup.items?.length || 0;

                          return (
                            <motion.button
                              key={secondaryGroup.secondaryGroupName}
                              onClick={(e) => {
                                e.stopPropagation();
                                secondaryGroup.secondaryGroupName && onSecondaryCardClick(secondaryGroup.secondaryGroupName);
                              }}
                              whileHover={{ scale: 1.02, x: 4 }}
                              whileTap={{ scale: 0.98 }}
                              className="p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700
                                       bg-white dark:bg-gray-900/50 hover:border-purple-400 dark:hover:border-purple-500
                                       hover:shadow-md transition-all text-left group"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1
                                               group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                    {secondaryGroup.secondaryGroupName}
                                  </h3>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {itemCount} {itemCount === 1 ? 'item' : 'items'}
                                  </p>
                                </div>
                                <ChevronRight
                                  className="text-gray-400 group-hover:text-purple-500 transition-colors flex-shrink-0 mt-1"
                                  size={20}
                                />
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    )}

                    {/* Programs View */}
                    {currentView === 'programs' && (
                      <div className="grid grid-cols-1 gap-4">
                        {programs.map((item: DemoShowcaseItemDto) => {
                          const hasVideo = !!item.videoPath;
                          const hasExecution = !!item.appId;

                          return (
                            <motion.div
                              key={item.id}
                              whileHover={{ scale: 1.01 }}
                              className="p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700
                                       bg-white dark:bg-gray-900/50 hover:border-blue-400 dark:hover:border-blue-500
                                       hover:shadow-lg transition-all"
                            >
                              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                                {item.name || 'Untitled'}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                                {item.description || 'No description available'}
                              </p>

                              <div className="flex gap-2">
                                {hasExecution && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      item.appId && onExecuteClick(item.appId, item.appType || '0', item.name || 'Untitled');
                                    }}
                                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg
                                             bg-green-600 hover:bg-green-700 text-white font-medium text-sm transition-colors"
                                  >
                                    <Zap size={16} />
                                    Execute
                                  </button>
                                )}
                                {hasVideo && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      item.videoPath && onVideoClick(item.videoPath);
                                    }}
                                    className={`${hasExecution ? 'flex-1' : 'w-full'} flex items-center justify-center gap-2 px-3 py-2 rounded-lg
                                             bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors`}
                                  >
                                    <Video size={16} />
                                    Watch
                                  </button>
                                )}
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
