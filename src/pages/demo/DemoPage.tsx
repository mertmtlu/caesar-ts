import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '@/api/api';
import { PublicDemoShowcaseResponse } from '@/api/types';
import { ShowcaseTabs } from '@/components/demo/ShowcaseTabs';
import { Breadcrumb } from '@/components/demo/Breadcrumb';
import { PrimaryCard } from '@/components/demo/PrimaryCard';
import { SecondaryCard } from '@/components/demo/SecondaryCard';
import { ShowcaseCard } from '@/components/demo/ShowcaseCard';
import { VideoModal } from '@/components/demo/VideoModal';
import { ExecutionFormModal } from '@/components/demo/ExecutionFormModal';
import { Loader2, AlertCircle } from 'lucide-react';

type ViewType = 'primary' | 'secondary' | 'programs';

export default function DemoPage() {
  // Nested showcase data
  const [showcaseData, setShowcaseData] = useState<PublicDemoShowcaseResponse | null>(null);

  // Active path state - tracks user's position in hierarchy
  const [activePath, setActivePath] = useState<{
    tab: string | null;
    primaryGroup: string | null;
    secondaryGroup: string | null;
  }>({
    tab: null,
    primaryGroup: null,
    secondaryGroup: null
  });

  // Modal states
  const [videoModalState, setVideoModalState] = useState<{
    isOpen: boolean;
    videoPath: string | null;
  }>({ isOpen: false, videoPath: null });

  const [executionModalState, setExecutionModalState] = useState<{
    isOpen: boolean;
    appId: string | null;
    itemName: string | null;
  }>({ isOpen: false, appId: null, itemName: null });

  // Loading/error states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchShowcaseData();
  }, []);

  const fetchShowcaseData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await api.demoShowcase.demoShowcase_GetPublicShowcase();

      if (response.success && response.data) {
        const data = response.data as PublicDemoShowcaseResponse;
        setShowcaseData(data);

        // Auto-select first tab if available
        if (data.tabs && data.tabs.length > 0) {
          setActivePath(prev => ({
            ...prev,
            tab: data.tabs![0].tabName || null
          }));
        }
      } else {
        setError(response.message || 'Failed to load showcase items');
      }
    } catch (err) {
      console.error('Error fetching showcase data:', err);
      setError('An error occurred while loading the demo showcase');
    } finally {
      setIsLoading(false);
    }
  };

  // Determine which view to render based on activePath
  const getCurrentView = (): ViewType => {
    if (activePath.secondaryGroup) {
      return 'programs';
    }
    if (activePath.primaryGroup) {
      return 'secondary';
    }
    return 'primary';
  };

  // Navigation handlers
  const handleTabClick = (tabName: string) => {
    setActivePath({
      tab: tabName,
      primaryGroup: null,
      secondaryGroup: null
    });
  };

  const handlePrimaryCardClick = (groupName: string) => {
    setActivePath(prev => ({
      ...prev,
      primaryGroup: groupName,
      secondaryGroup: null
    }));
  };

  const handleSecondaryCardClick = (groupName: string) => {
    setActivePath(prev => ({
      ...prev,
      secondaryGroup: groupName
    }));
  };

  // Backward navigation from breadcrumb
  const handleBreadcrumbClick = (level: 'tab' | 'primary' | 'secondary') => {
    if (level === 'tab') {
      setActivePath(prev => ({
        ...prev,
        primaryGroup: null,
        secondaryGroup: null
      }));
    } else if (level === 'primary') {
      setActivePath(prev => ({
        ...prev,
        secondaryGroup: null
      }));
    }
  };

  const handleVideoClick = (videoPath: string) => {
    setVideoModalState({ isOpen: true, videoPath });
  };

  const handleExecuteClick = (appId: string, itemName: string) => {
    setExecutionModalState({ isOpen: true, appId, itemName });
  };

  const handleCloseVideoModal = () => {
    setVideoModalState({ isOpen: false, videoPath: null });
  };

  const handleCloseExecutionModal = () => {
    setExecutionModalState({ isOpen: false, appId: null, itemName: null });
  };

  // Helper functions for data navigation
  const getCurrentTabPrimaryGroups = () => {
    return showcaseData?.tabs
      ?.find(tab => tab.tabName === activePath.tab)
      ?.primaryGroups || [];
  };

  const getCurrentPrimarySecondaryGroups = () => {
    return getCurrentTabPrimaryGroups()
      .find(group => group.primaryGroupName === activePath.primaryGroup)
      ?.secondaryGroups || [];
  };

  const getCurrentSecondaryItems = () => {
    return getCurrentPrimarySecondaryGroups()
      .find(group => group.secondaryGroupName === activePath.secondaryGroup)
      ?.items || [];
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const expandVariants = {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 }
  };

  const transition = {
    type: 'tween' as const,
    ease: 'easeInOut' as const,
    duration: 0.3
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 dark:text-blue-400" />
          <p className="text-gray-600 dark:text-gray-300 text-lg">Loading demo showcase...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="flex flex-col items-center gap-4 max-w-md mx-4">
          <AlertCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
          <p className="text-gray-900 dark:text-white text-xl font-semibold">Error Loading Demo</p>
          <p className="text-gray-600 dark:text-gray-300 text-center">{error}</p>
          <button
            onClick={fetchShowcaseData}
            className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!showcaseData?.tabs || showcaseData.tabs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300 text-lg">No demo items available yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top-level tabs - always visible */}
        <ShowcaseTabs
          tabs={showcaseData.tabs}
          selectedTab={activePath.tab}
          onTabSelect={handleTabClick}
        />

        {/* Breadcrumb - only show when navigated beyond primary level */}
        {activePath.tab && (activePath.primaryGroup || activePath.secondaryGroup) && (
          <Breadcrumb
            activePath={activePath}
            onNavigate={handleBreadcrumbClick}
          />
        )}

        {/* Animated expanding views */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={getCurrentView()}
              variants={expandVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={transition}
            >
              {/* Level 1: Primary Cards with Secondary Icons Preview */}
              {getCurrentView() === 'primary' && (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  {getCurrentTabPrimaryGroups().map((primaryGroup) => (
                    <PrimaryCard
                      key={primaryGroup.primaryGroupName}
                      title={primaryGroup.primaryGroupName || 'Untitled Group'}
                      secondaryGroups={primaryGroup.secondaryGroups || []}
                      onClick={() => handlePrimaryCardClick(primaryGroup.primaryGroupName!)}
                    />
                  ))}
                </motion.div>
              )}

              {/* Level 2: Secondary Cards with Program Icons Preview */}
              {getCurrentView() === 'secondary' && (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  {getCurrentPrimarySecondaryGroups().map((secondaryGroup) => (
                    <SecondaryCard
                      key={secondaryGroup.secondaryGroupName}
                      title={secondaryGroup.secondaryGroupName || 'Untitled Subgroup'}
                      items={secondaryGroup.items || []}
                      onClick={() => handleSecondaryCardClick(secondaryGroup.secondaryGroupName!)}
                    />
                  ))}
                </motion.div>
              )}

              {/* Level 3: Full Program Cards */}
              {getCurrentView() === 'programs' && (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  {getCurrentSecondaryItems().map((item) => (
                    <ShowcaseCard
                      key={item.id}
                      item={item}
                      onVideoClick={handleVideoClick}
                      onExecuteClick={handleExecuteClick}
                    />
                  ))}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={videoModalState.isOpen}
        videoPath={videoModalState.videoPath}
        onClose={handleCloseVideoModal}
      />

      {/* Execution Form Modal */}
      <ExecutionFormModal
        isOpen={executionModalState.isOpen}
        appId={executionModalState.appId}
        itemName={executionModalState.itemName}
        onClose={handleCloseExecutionModal}
      />
    </div>
  );
}
