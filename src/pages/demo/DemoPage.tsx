import { useState, useEffect, useMemo } from 'react';
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
import { Loader2, AlertCircle, Search, X, Inbox } from 'lucide-react';

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

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

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
    setSearchQuery(''); // Clear search when changing tabs
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

  // Helper functions for data navigation with search filtering
  const getCurrentTabPrimaryGroups = useMemo(() => {
    const groups = showcaseData?.tabs
      ?.find(tab => tab.tabName === activePath.tab)
      ?.primaryGroups || [];

    if (!searchQuery) return groups;

    return groups.filter(group =>
      group.primaryGroupName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.secondaryGroups?.some(sg =>
        sg.secondaryGroupName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sg.items?.some(item =>
          item.name?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    );
  }, [showcaseData, activePath.tab, searchQuery]);

  const getCurrentPrimarySecondaryGroups = useMemo(() => {
    const groups = showcaseData?.tabs
      ?.find(tab => tab.tabName === activePath.tab)
      ?.primaryGroups
      ?.find(group => group.primaryGroupName === activePath.primaryGroup)
      ?.secondaryGroups || [];

    if (!searchQuery) return groups;

    return groups.filter(group =>
      group.secondaryGroupName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.items?.some(item =>
        item.name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [showcaseData, activePath.tab, activePath.primaryGroup, searchQuery]);

  const getCurrentSecondaryItems = useMemo(() => {
    const items = showcaseData?.tabs
      ?.find(tab => tab.tabName === activePath.tab)
      ?.primaryGroups
      ?.find(group => group.primaryGroupName === activePath.primaryGroup)
      ?.secondaryGroups
      ?.find(group => group.secondaryGroupName === activePath.secondaryGroup)
      ?.items || [];

    if (!searchQuery) return items;

    return items.filter(item =>
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [showcaseData, activePath.tab, activePath.primaryGroup, activePath.secondaryGroup, searchQuery]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const expandVariants = {
    initial: { scale: 0.95, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30
      }
    },
    exit: {
      scale: 0.95,
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-50 dark:bg-gray-900">
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950" />
          <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-400/40 dark:bg-purple-600/30 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl animate-blob" />
          <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-400/40 dark:bg-blue-600/30 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-400/40 dark:bg-pink-600/30 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl animate-blob animation-delay-4000" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="relative">
            <Loader2 className="w-16 h-16 animate-spin text-blue-600 dark:text-blue-400" />
            <div className="absolute inset-0 w-16 h-16 animate-ping text-blue-600/20 dark:text-blue-400/20">
              <Loader2 className="w-16 h-16" />
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">Loading demo showcase...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-50 dark:bg-gray-900">
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950" />
          <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-400/40 dark:bg-purple-600/30 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl animate-blob" />
          <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-400/40 dark:bg-blue-600/30 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-400/40 dark:bg-pink-600/30 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl animate-blob animation-delay-4000" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-6 max-w-md mx-4"
        >
          <div className="p-4 rounded-2xl bg-red-100 dark:bg-red-900/20">
            <AlertCircle className="w-16 h-16 text-red-600 dark:text-red-400" />
          </div>
          <div className="text-center">
            <p className="text-gray-900 dark:text-white text-2xl font-bold mb-2">Error Loading Demo</p>
            <p className="text-gray-600 dark:text-gray-300">{error}</p>
          </div>
          <motion.button
            onClick={fetchShowcaseData}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700
                     text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (!showcaseData?.tabs || showcaseData.tabs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-50 dark:bg-gray-900">
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950" />
          <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-400/40 dark:bg-purple-600/30 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl animate-blob" />
          <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-400/40 dark:bg-blue-600/30 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-400/40 dark:bg-pink-600/30 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl animate-blob animation-delay-4000" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-4"
        >
          <div className="inline-block p-6 rounded-2xl bg-gray-100 dark:bg-gray-800 mb-6">
            <Inbox className="w-20 h-20 text-gray-400 dark:text-gray-600" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-xl font-medium">No demo items available yet</p>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Check back later for exciting demos!</p>
        </motion.div>
      </div>
    );
  }

  const currentData = getCurrentView() === 'primary'
    ? getCurrentTabPrimaryGroups
    : getCurrentView() === 'secondary'
    ? getCurrentPrimarySecondaryGroups
    : getCurrentSecondaryItems;

  const hasResults = currentData.length > 0;

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-10">
        {/* Gradient Base */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950" />

        {/* Animated Orbs */}
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-400/40 dark:bg-purple-600/30 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl animate-blob" />
        <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-400/40 dark:bg-blue-600/30 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-400/40 dark:bg-pink-600/30 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl animate-blob animation-delay-4000" />

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Ceasar
          </h1>
        </motion.div>

        

        {/* Stats Section - only show on main view */}
        {!activePath.primaryGroup && !activePath.secondaryGroup && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-xl">
                  <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {showcaseData.tabs?.reduce((acc, tab) => acc + (tab.primaryGroups?.length || 0), 0) || 0}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Categories</p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500/10 rounded-xl">
                  <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {showcaseData.tabs?.reduce((acc, tab) =>
                      acc + (tab.primaryGroups?.reduce((acc2, pg) =>
                        acc2 + (pg.secondaryGroups?.length || 0), 0) || 0), 0) || 0}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Subcategories</p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-pink-500/10 rounded-xl">
                  <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                  </svg>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {showcaseData.tabs?.reduce((acc, tab) =>
                      acc + (tab.primaryGroups?.reduce((acc2, pg) =>
                        acc2 + (pg.secondaryGroups?.reduce((acc3, sg) =>
                          acc3 + (sg.items?.length || 0), 0) || 0), 0) || 0), 0) || 0}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Demo Items</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Top-level tabs - always visible */}
        <ShowcaseTabs
          tabs={showcaseData.tabs}
          selectedTab={activePath.tab}
          onTabSelect={handleTabClick}
        />

        {/* Breadcrumb - only show when navigated beyond primary level */}
        {activePath.tab && (activePath.primaryGroup || activePath.secondaryGroup) && (
          <div className="mt-8">
            <Breadcrumb
              activePath={activePath}
              onNavigate={handleBreadcrumbClick}
            />
          </div>
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
            >
              {/* No Results */}
              {!hasResults && searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-20"
                >
                  <div className="p-6 rounded-2xl bg-gray-100 dark:bg-gray-800 mb-6">
                    <Search className="w-16 h-16 text-gray-400 dark:text-gray-600" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-xl font-medium">No results found</p>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">Try a different search term</p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  >
                    Clear Search
                  </button>
                </motion.div>
              )}

              {/* Level 1: Primary Cards with Secondary Icons Preview */}
              {hasResults && getCurrentView() === 'primary' && (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  {getCurrentTabPrimaryGroups.map((primaryGroup) => (
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
              {hasResults && getCurrentView() === 'secondary' && (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  {getCurrentPrimarySecondaryGroups.map((secondaryGroup) => (
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
              {hasResults && getCurrentView() === 'programs' && (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  {getCurrentSecondaryItems.map((item) => (
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

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 pt-12 pb-8 border-t border-gray-200 dark:border-gray-700"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">About Demo Showcase</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Discover a comprehensive collection of interactive demonstrations showcasing the full range of capabilities and features available on our platform.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/auth/login" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Sign In
                  </a>
                </li>
                <li>
                  <a href="/dashboard" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="/projects" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Projects
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Get Started</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Ready to explore? Browse through our categories or use the search bar to find specific demos.
              </p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all shadow-md hover:shadow-lg text-sm font-medium"
              >
                Back to Top
              </button>
            </div>
          </div>

          <div className="text-center pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} Caesar Platform. All rights reserved.
            </p>
          </div>
        </motion.footer>
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
