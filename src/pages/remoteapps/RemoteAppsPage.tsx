// src/pages/remoteapps/RemoteAppsPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/api/api';
import { SortDirection, IconEntityType } from '@/api/enums';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { ConfirmationModal } from '@/components/common/Modal';
import IconDisplay from '@/components/icons/IconDisplay';
// import GroupAccessBadge from '@/components/common/GroupAccessBadge'; // Placeholder for future use

// Interfaces
interface RemoteAppListItem {
  id: string;
  name: string;
  description?: string;
  url: string;
  status: string;
  isPublic: boolean;
  creator: string;
  createdAt: Date;
  iconData?: string | null;
}

interface RemoteAppToDelete {
  id: string;
  name: string;
}

// Sort options configuration
interface SortOption {
  label: string;
  field: string;
  direction: SortDirection;
}

const SORT_OPTIONS: SortOption[] = [
  { label: 'Newest First', field: 'CreatedDate', direction: SortDirection._1 },
  { label: 'Oldest First', field: 'CreatedDate', direction: SortDirection._0 },
  { label: 'Name A-Z', field: 'Name', direction: SortDirection._0 },
  { label: 'Name Z-A', field: 'Name', direction: SortDirection._1 },
];

const RemoteAppsPage: React.FC = () => {
  const navigate = useNavigate();
  
  // State management
  const [remoteApps, setRemoteApps] = useState<RemoteAppListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  
  // Filtering and search
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [visibilityFilter, setVisibilityFilter] = useState<'all' | 'public' | 'private'>('all');
  const [sortField, setSortField] = useState('CreatedDate');
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection._1);
  
  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [appToDelete, setAppToDelete] = useState<RemoteAppToDelete | null>(null);
  
  
  // Icons state
  const [icons, setIcons] = useState<Map<string, string>>(new Map());

  // Load remote apps
  useEffect(() => {
    loadRemoteApps();
  }, [currentPage, pageSize, sortField, sortDirection, statusFilter, visibilityFilter]);

  // Load remote apps with search when search term changes
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      loadRemoteApps();
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm]);

  const loadRemoteApps = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await api.remoteAppsClient.remoteApps_GetByCurrentUser(
        currentPage,
        pageSize,
        sortField,
        sortDirection
      );

      if (response.success && response.data) {
        let appItems = response.data.items?.map(app => ({
          id: app.id || '',
          name: app.name || 'Untitled App',
          description: app.description,
          url: app.url || '',
          status: app.status || 'active',
          isPublic: app.isPublic || false,
          creator: app.creator || '',
          createdAt: app.createdAt || new Date()
        })) || [];

        // Apply client-side filtering
        if (searchTerm) {
          appItems = appItems.filter(app =>
            app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.description?.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        if (statusFilter) {
          appItems = appItems.filter(app =>
            app.status.toLowerCase().includes(statusFilter.toLowerCase())
          );
        }

        if (visibilityFilter !== 'all') {
          appItems = appItems.filter(app =>
            visibilityFilter === 'public' ? app.isPublic : !app.isPublic
          );
        }

        setRemoteApps(appItems);
        setTotalCount(response.data.totalCount || appItems.length);
        setTotalPages(response.data.totalPages || Math.ceil(appItems.length / pageSize));
        
        // Load icons for all apps
        await loadAppIcons(appItems);
      } else {
        setError(response.message || 'Failed to load remote apps');
      }
    } catch (error) {
      console.error('Failed to load remote apps:', error);
      setError('Failed to load remote apps. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadAppIcons = async (appItems: RemoteAppListItem[]) => {
    if (appItems.length === 0) return;
    
    try {
      // Create batch request with entity IDs
      const entityIds = appItems.map(app => app.id);
      
      const iconBatchRequest = {
        entityType: IconEntityType._2,
        entityIds: entityIds
      };

      const iconsResponse = await api.iconsClient.icons_GetIconsByEntityIds(iconBatchRequest);
      
      if (iconsResponse.success && iconsResponse.data) {
        const newIcons = new Map<string, string>();
        iconsResponse.data.forEach(icon => {
          if (icon.entityId && icon.iconData) {
            // Ensure we're storing a string, not an object
            const iconDataString = typeof icon.iconData === 'string' ? icon.iconData : String(icon.iconData);
            newIcons.set(icon.entityId, iconDataString);
          }
        });
        setIcons(newIcons);
      }
    } catch (error) {
      console.error('Failed to load app icons:', error);
      // Don't show error to user for icons, just log it
    }
  };

  const handleDeleteApp = (appId: string, appName: string) => {
    setAppToDelete({ id: appId, name: appName });
    setShowDeleteModal(true);
  };


  const confirmDeleteApp = async () => {
    if (!appToDelete) return;
    
    try {
      setIsDeleting(true);
      const response = await api.remoteAppsClient.remoteApps_Delete(appToDelete.id);
      
      if (response.success) {
        // Remove from apps list
        setRemoteApps(prev => prev.filter(app => app.id !== appToDelete.id));
        setTotalCount(prev => prev - 1);
        
        // Close modal and reset state
        setShowDeleteModal(false);
        setAppToDelete(null);
        
        // If this was the last item on the current page and we're not on page 1, go to previous page
        if (remoteApps.length === 1 && currentPage > 1) {
          setCurrentPage(prev => prev - 1);
        } else {
          // Reload the current page to get fresh data
          loadRemoteApps();
        }
      } else {
        setError(response.message || 'Failed to delete remote app');
      }
    } catch (error) {
      console.error('Failed to delete remote app:', error);
      setError('Failed to delete remote app. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleOpenApp = async (app: RemoteAppListItem) => {
    try {
      // Use the SSO-aware launch method which returns the redirect URL
      const response = await api.remoteAppsClient.remoteApps_Launch(app.id);
      
      if (response.success && response.data?.redirectUrl) {
        // Open the redirect URL returned by the API
        window.open(response.data.redirectUrl, '_blank', 'noopener,noreferrer');
      } else {
        throw new Error(response.message || 'No redirect URL provided');
      }
    } catch (error) {
      console.error('Failed to launch remote app:', error);
      // Fallback to direct URL opening if the API call fails
      if (app.url) {
        window.open(app.url, '_blank', 'noopener,noreferrer');
      }
    }
  };

  const getStatusColor = (status: string): string => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'active') {
      return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
    }
    if (statusLower === 'inactive') {
      return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
    }
    if (statusLower === 'maintenance') {
      return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
    }
    return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800';
  };

  const formatRelativeTime = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    if (diffMinutes > 0) return `${diffMinutes}m ago`;
    return 'Just now';
  };

  const getSortOptionKey = (field: string, direction: SortDirection): string => {
    return `${field}-${direction}`;
  };

  if (isLoading && remoteApps.length === 0) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Remote Apps
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Manage your remote applications and their access
          </p>
        </div>
        
        <div className="mt-4 sm:mt-0">
          <Button
            variant="primary"
            onClick={() => navigate('/remoteapps/create')}
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            }
          >
            New Remote App
          </Button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
            </div>
            <div className="ml-auto pl-3">
              <button
                onClick={loadRemoteApps}
                className="text-sm text-red-800 dark:text-red-200 hover:text-red-600 dark:hover:text-red-300"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            label="Search apps"
            placeholder="Search by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status Filter
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Visibility Filter
            </label>
            <select
              value={visibilityFilter}
              onChange={(e) => setVisibilityFilter(e.target.value as 'all' | 'public' | 'private')}
              className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="all">All Apps</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sort By
            </label>
            <select
              value={getSortOptionKey(sortField, sortDirection)}
              onChange={(e) => {
                const [field, direction] = e.target.value.split('-');
                setSortField(field);
                setSortDirection(parseInt(direction) as SortDirection);
              }}
              className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={getSortOptionKey(option.field, option.direction)} value={getSortOptionKey(option.field, option.direction)}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Apps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {remoteApps.map((app) => (
          <div
            key={app.id}
            className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="flex-shrink-0">
                    <IconDisplay
                      iconData={icons.get(app.id)}
                      size="lg"
                      entityType="remoteapp"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                      {app.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-2">
                      <span>{app.isPublic ? 'Public' : 'Private'}</span>
                      <span>•</span>
                      <span className="truncate" title={app.url}>{app.url}</span>
                    </p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                  {app.status}
                </span>
              </div>

              {app.description ? (
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {app.description}
                </p>
              ) : (
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  No description available.
                </p>
              )}

              <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>{formatRelativeTime(app.createdAt)}</span>
                <div className="flex items-center space-x-1">
                  {app.isPublic ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                    </svg>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 space-y-2">
                {/* Primary Actions Row */}
                <div className="flex space-x-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleOpenApp(app)}
                    className="flex-1"
                    leftIcon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    }
                  >
                    Open App
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/remoteapps/${app.id}`)}
                    leftIcon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    }
                  >
                    Details
                  </Button>
                </div>

                {/* Secondary Actions Row */}
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/remoteapps/${app.id}/edit`)}
                    className="flex-1"
                    leftIcon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    }
                  >
                    Edit
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    Duplicate
                  </Button>
                  
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteApp(app.id, app.name);
                    }}
                    leftIcon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    }
                    title={`Delete ${app.name}`}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {remoteApps.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 0L9 21m0-18l3 3m-3-3l3 3" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No remote apps found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {searchTerm || statusFilter || visibilityFilter !== 'all' ? 'Try adjusting your search criteria.' : 'Get started by creating your first remote app.'}
          </p>
          {!searchTerm && !statusFilter && visibilityFilter === 'all' && (
            <div className="mt-6">
              <Button
                variant="primary"
                onClick={() => navigate('/remoteapps/create')}
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                }
              >
                Create Your First Remote App
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <div className="flex-1 flex justify-between sm:hidden">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Showing <span className="font-medium">{((currentPage - 1) * pageSize) + 1}</span> to{' '}
                <span className="font-medium">{Math.min(currentPage * pageSize, totalCount)}</span> of{' '}
                <span className="font-medium">{totalCount}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  const page = i + Math.max(1, currentPage - 2);
                  if (page > totalPages) return null;
                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? "primary" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  );
                })}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setAppToDelete(null);
        }}
        onConfirm={confirmDeleteApp}
        title="Delete Remote App"
        message={
          appToDelete 
            ? `Are you sure you want to delete "${appToDelete.name}"? This action cannot be undone.`
            : 'Are you sure you want to delete this remote app?'
        }
        confirmText="Delete App"
        cancelText="Cancel"
        variant="danger"
        loading={isDeleting}
      />
    </div>
  );
};

export default RemoteAppsPage;