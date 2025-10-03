import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '@/api/api';
import { PublicDemoShowcaseResponse, DemoShowcaseItemDto } from '@/api/types';
import { IconEntityType } from '@/api/enums';
import { ShowcaseTabs } from '@/components/demo/ShowcaseTabs';
import { PrimaryCard } from '@/components/demo/PrimaryCard';
import { SecondaryCard } from '@/components/demo/SecondaryCard';
import { ShowcaseCard } from '@/components/demo/ShowcaseCard';
import { VideoModal } from '@/components/demo/VideoModal';
import { ExecutionFormModal } from '@/components/demo/ExecutionFormModal';
import { Loader2, AlertCircle, Search, X, Inbox } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type ViewType = 'primary' | 'secondary' | 'programs';

// SSO-aware redirect function for remote apps
const secureSsoRedirect = (redirectUrl: string) => {
  try {
    const url = new URL(redirectUrl);
    console.log('Parsed redirect URL:', url);
    const username = url.searchParams.get('username');
    const password = url.searchParams.get('password');
    
    // Remove query parameters to get the base URL
    const formActionUrl = `${url.origin}${url.pathname}`;

    if (!username || !password) {
      // Fallback for URLs without credentials
      window.open(redirectUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    // 1. Create the form element
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = formActionUrl;
    form.target = '_blank'; // Open in a new tab

    // 2. Create hidden input fields for credentials
    const userInput = document.createElement('input');
    userInput.type = 'hidden';
    userInput.name = 'username';
    userInput.value = username;

    const passInput = document.createElement('input');
    passInput.type = 'hidden';
    passInput.name = 'password';
    passInput.value = password;

    // 3. Append inputs to the form
    form.appendChild(userInput);
    form.appendChild(passInput);

    // 4. Append the form to the body and submit
    document.body.appendChild(form);
    form.submit();

    // 5. Clean up by removing the form
    document.body.removeChild(form);

  } catch (error) {
    console.error('SSO redirect failed, falling back to direct URL:', error);
    // Fallback to the original behavior if parsing fails
    window.open(redirectUrl, '_blank', 'noopener,noreferrer');
  }
};

export default function DemoPage() {
  const navigate = useNavigate();

  // Nested showcase data
  const [showcaseData, setShowcaseData] = useState<PublicDemoShowcaseResponse | null>(null);

  // Icons state
  const [itemIcons, setItemIcons] = useState<Map<string, string>>(new Map());

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
    itemName?: string | null;
    creatorName?: string | null;
  }>({ isOpen: false, videoPath: null, itemName: null, creatorName: null });

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

  const loadItemIcons = async (data: PublicDemoShowcaseResponse) => {
    try {
      // Collect all items from all tabs, primary groups, secondary groups, and tertiary groups
      const allItems: DemoShowcaseItemDto[] = [];

      data.tabs?.forEach(tab => {
        tab.primaryGroups?.forEach(primaryGroup => {
          primaryGroup.secondaryGroups?.forEach(secondaryGroup => {
            // Add direct items
            if (secondaryGroup.items) {
              allItems.push(...secondaryGroup.items);
            }
            // Add items from tertiary groups
            secondaryGroup.tertiaryGroups?.forEach(tertiaryGroup => {
              if (tertiaryGroup.items) {
                allItems.push(...tertiaryGroup.items);
              }
            });
          });
        });
      });

      if (allItems.length === 0) return;

      // Group items by app type for batch requests
      const programIds = allItems.filter(item => item.appType === '0' && item.appId).map(item => item.appId!);
      const workflowIds = allItems.filter(item => item.appType === '1' && item.appId).map(item => item.appId!);
      const remoteAppIds = allItems.filter(item => item.appType === '2' && item.appId).map(item => item.appId!);

      const newIcons = new Map<string, string>();

      // Load Program icons
      if (programIds.length > 0) {
        const programIconRequest = {
          entityType: IconEntityType.Program,
          entityIds: programIds
        };
        const programIconsResponse = await api.iconsClient.icons_GetIconsByEntityIds(programIconRequest);
        if (programIconsResponse.success && programIconsResponse.data) {
          programIconsResponse.data.forEach(icon => {
            if (icon.entityId && icon.iconData) {
              newIcons.set(icon.entityId, icon.iconData);
            }
          });
        }
      }

      // Load Workflow icons
      if (workflowIds.length > 0) {
        const workflowIconRequest = {
          entityType: IconEntityType.Workflow,
          entityIds: workflowIds
        };
        const workflowIconsResponse = await api.iconsClient.icons_GetIconsByEntityIds(workflowIconRequest);
        if (workflowIconsResponse.success && workflowIconsResponse.data) {
          workflowIconsResponse.data.forEach(icon => {
            if (icon.entityId && icon.iconData) {
              newIcons.set(icon.entityId, icon.iconData);
            }
          });
        }
      }

      // Load RemoteApp icons
      if (remoteAppIds.length > 0) {
        const remoteAppIconRequest = {
          entityType: IconEntityType.RemoteApp,
          entityIds: remoteAppIds
        };
        const remoteAppIconsResponse = await api.iconsClient.icons_GetIconsByEntityIds(remoteAppIconRequest);
        if (remoteAppIconsResponse.success && remoteAppIconsResponse.data) {
          remoteAppIconsResponse.data.forEach(icon => {
            if (icon.entityId && icon.iconData) {
              newIcons.set(icon.entityId, icon.iconData);
            }
          });
        }
      }

      setItemIcons(newIcons);
    } catch (error) {
      console.error('Failed to load item icons:', error);
      // Don't show error to user for icons, just log it
    }
  };

  const fetchShowcaseData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await api.demoShowcase.demoShowcase_GetPublicShowcase();

      if (response.success && response.data) {
        const data = response.data as PublicDemoShowcaseResponse;
        setShowcaseData(data);

        // Load icons for all items
        loadItemIcons(data);

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

  const handleExecutionSuccess = (executionId: string) => {
    handleCloseExecutionModal(); // Close the modal first
    navigate(`/demo/execution/${executionId}`);
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

  const handleBack = () => {
    if (activePath.secondaryGroup) {
      setActivePath(prev => ({ ...prev, secondaryGroup: null }));
    } else if (activePath.primaryGroup) {
      setActivePath(prev => ({ ...prev, primaryGroup: null }));
    }
  };

  const handleVideoClick = (videoPath: string, itemName?: string, creatorName?: string) => {
    setVideoModalState({ isOpen: true, videoPath, itemName, creatorName });
  };

  const handleRemoteAppLaunch = async (appId: string) => {
    try {
      const response = await api.demoShowcase.demoShowcase_LaunchRemoteApp(appId);

      console.log('Remote app launch response:', response);

      if (response.success && response.data?.redirectUrl) {
        console.log('Redirecting to SSO URL:', response.data.redirectUrl);
        secureSsoRedirect(response.data.redirectUrl);
      } else {
        setError(response.message || 'Failed to launch remote app');
      }
    } catch (error) {
      console.error('Failed to launch remote app:', error);
      setError('Failed to launch remote app. Please try again.');
    }
  };

  const handleExecuteClick = (appId: string, appType: string, itemName: string) => {
    // Check if it's a Remote App (AppType._2 = 2)
    if (appType === '2' || appType === 'RemoteApp') {
      handleRemoteAppLaunch(appId);
    } else {
      // Existing program execution logic
      setExecutionModalState({ isOpen: true, appId, itemName });
    }
  };

  const handleCloseVideoModal = () => {
    setVideoModalState({ isOpen: false, videoPath: null, itemName: null, creatorName: null });
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
      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">Çoklu Afet Risk Platformu</h1>

        {/* Top-level tabs - always visible */}
        <ShowcaseTabs
          tabs={showcaseData.tabs}
          selectedTab={activePath.tab}
          selectedPrimaryGroup={activePath.primaryGroup}
          selectedSecondaryGroup={activePath.secondaryGroup}
          onTabSelect={handleTabClick}
          onPrimaryCardClick={handlePrimaryCardClick}
          onSecondaryCardClick={handleSecondaryCardClick}
          onBack={handleBack}
          onVideoClick={handleVideoClick}
          onExecuteClick={handleExecuteClick}
          itemIcons={itemIcons}
        />

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-md bg-red-50 dark:bg-red-900/20 p-4"
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
              </div>
              <div className="ml-auto pl-3">
                <button
                  onClick={() => setError(null)}
                  className="text-sm text-red-800 dark:text-red-200 hover:text-red-600 dark:hover:text-red-300"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={videoModalState.isOpen}
        videoPath={videoModalState.videoPath}
        itemName={videoModalState.itemName}
        creatorName={videoModalState.creatorName}
        onClose={handleCloseVideoModal}
      />

      {/* Execution Form Modal */}
      <ExecutionFormModal
        isOpen={executionModalState.isOpen}
        appId={executionModalState.appId}
        itemName={executionModalState.itemName}
        onClose={handleCloseExecutionModal}
        onExecutionSuccess={handleExecutionSuccess}
      />
    </div>
  );
}
