import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '@/api/api';
import { RemoteAppDetailDto, RemoteAppUpdateDto } from '@/api/types';
import { IconEntityType } from '@/api/enums';
import Button from '@/components/common/Button';
import Modal, { ConfirmationModal } from '@/components/common/Modal';
import IconDisplay from '@/components/icons/IconDisplay';
import IconUploader from '@/components/icons/IconUploader';

const mimeTypeToFormat = (mimeType: string): string => {
  const formatMap: Record<string, string> = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
    'image/gif': 'gif',
    'image/svg+xml': 'svg',
    'image/webp': 'webp',
    'image/x-icon': 'ico',
    'image/vnd.microsoft.icon': 'ico'
  };
  return formatMap[mimeType] || mimeType.split('/')[1] || 'png';
};

const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  return date.toLocaleDateString();
};

const RemoteAppDetailPage: React.FC = () => {
  const { appId } = useParams<{ appId: string }>();
  const navigate = useNavigate();

  // Core state
  const [app, setApp] = useState<RemoteAppDetailDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Editing states
  const [isEditingName, setIsEditingName] = useState(false);
  const [editingName, setEditingName] = useState('');
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editingDescription, setEditingDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Icon management state
  const [iconData, setIconData] = useState<string | null>(null);
  const [iconId, setIconId] = useState<string | null>(null);
  const [showIconModal, setShowIconModal] = useState(false);
  const [isUploadingIcon, setIsUploadingIcon] = useState(false);
  const [iconError, setIconError] = useState<string | null>(null);

  // Modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (appId) {
      loadAppDetails();
      loadAppIcon();
    }
  }, [appId]);

  const loadAppDetails = async () => {
    if (!appId) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await api.remoteAppsClient.remoteApps_GetById(appId);

      if (response.success && response.data) {
        const appData = RemoteAppDetailDto.fromJS(response.data);
        setApp(appData);
        setEditingName(appData.name || '');
        setEditingDescription(appData.description || '');
      } else {
        setError(response.message || 'Failed to load remote app details');
      }
    } catch (error) {
      console.error('Failed to load remote app details:', error);
      setError('Failed to load remote app details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadAppIcon = async () => {
    if (!appId) return;
    
    try {
      const response = await api.iconsClient.icons_GetIconByEntity(
        IconEntityType.RemoteApp,
        appId
      );

      if (response.success && response.data?.iconData) {
        setIconData(response.data.iconData);
        setIconId(response.data.id || null);
      } else {
        setIconData(null);
        setIconId(null);
      }
    } catch (error) {
      console.error('Failed to load remote app icon:', error);
      setIconData(null);
      setIconId(null);
    }
  };

  const handleSaveName = async () => {
    if (!app || !appId || editingName.trim() === app.name) {
      setIsEditingName(false);
      return;
    }

    try {
      setIsSaving(true);
      
      const updateDto = new RemoteAppUpdateDto({
        name: editingName.trim(),
        description: app.description,
        url: app.url,
        isPublic: app.isPublic
      });

      const response = await api.remoteAppsClient.remoteApps_Update(appId, updateDto);

      if (response.success && response.data) {
        setApp(prev => prev ? RemoteAppDetailDto.fromJS({ ...prev, name: editingName.trim() }) : null);
        setIsEditingName(false);
      } else {
        setError(response.message || 'Failed to update app name');
      }
    } catch (error) {
      console.error('Failed to update app name:', error);
      setError('Failed to update app name. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveDescription = async () => {
    if (!app || !appId || editingDescription === (app.description || '')) {
      setIsEditingDescription(false);
      return;
    }

    try {
      setIsSaving(true);
      
      const updateDto = new RemoteAppUpdateDto({
        name: app.name,
        description: editingDescription.trim() || undefined,
        url: app.url,
        isPublic: app.isPublic
      });

      const response = await api.remoteAppsClient.remoteApps_Update(appId, updateDto);

      if (response.success && response.data) {
        setApp(prev => prev ? RemoteAppDetailDto.fromJS({ ...prev, description: editingDescription.trim() || undefined }) : null);
        setIsEditingDescription(false);
      } else {
        setError(response.message || 'Failed to update app description');
      }
    } catch (error) {
      console.error('Failed to update app description:', error);
      setError('Failed to update app description. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEditingName = () => {
    setEditingName(app?.name || '');
    setIsEditingName(false);
  };

  const handleCancelEditingDescription = () => {
    setEditingDescription(app?.description || '');
    setIsEditingDescription(false);
  };

  const handleIconUpload = async (file: File, dataUrl: string) => {
    if (!appId) return;

    try {
      setIsUploadingIcon(true);
      setIconError(null);

      const base64 = dataUrl.split(',')[1];
      
      let response;
      if (iconData && iconId) {
        // Update existing icon
        const iconUpdateDto = {
          name: file.name,
          iconData: base64,
          format: mimeTypeToFormat(file.type),
          description: `Icon for remote app ${app?.name || appId}`
        };
        response = await api.iconsClient.icons_UpdateIcon(iconId, iconUpdateDto);
      } else {
        // Create new icon
        const iconCreateDto = {
          name: file.name,
          iconData: base64,
          format: mimeTypeToFormat(file.type),
          entityType: IconEntityType.RemoteApp,
          entityId: appId,
          description: `Icon for remote app ${app?.name || appId}`
        };
        response = await api.iconsClient.icons_CreateIcon(iconCreateDto);
      }

      if (response.success) {
        if (response.data?.iconData) {
          setIconData(response.data.iconData);
          setIconId(response.data.id || null);
        } else {
          await loadAppIcon();
        }
        setShowIconModal(false);
        setIconError(null);
      } else {
        throw new Error(response.message || 'Failed to upload icon');
      }
    } catch (error) {
      console.error('Failed to upload icon:', error);
      setIconError(error instanceof Error ? error.message : 'Failed to upload icon');
    } finally {
      setIsUploadingIcon(false);
    }
  };

  const handleUploadError = (error: string) => {
    setIconError(error);
  };

  const handleDeleteApp = async () => {
    if (!appId) return;

    try {
      setIsDeleting(true);
      const response = await api.remoteAppsClient.remoteApps_Delete(appId);

      if (response.success) {
        navigate('/remoteapps');
      } else {
        setError(response.message || 'Failed to delete remote app');
      }
    } catch (error) {
      console.error('Failed to delete remote app:', error);
      setError('Failed to delete remote app. Please try again.');
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const handleOpenApp = () => {
    if (app?.url) {
      window.open(app.url, '_blank', 'noopener,noreferrer');
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            <div className="flex-1">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            </div>
            <div className="space-y-6">
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!app) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Remote app not found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            The remote app you're looking for doesn't exist or you don't have permission to access it.
          </p>
          <div className="mt-6">
            <Button
              variant="primary"
              onClick={() => navigate('/remoteapps')}
            >
              Back to Remote Apps
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
        
        {/* Content */}
        <div className="relative px-6 py-12">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
              <button 
                onClick={() => navigate('/remoteapps')}
                className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors flex items-center space-x-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Remote Apps</span>
              </button>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-900 dark:text-gray-100 font-medium">{app.name}</span>
            </nav>

            {/* Hero Content */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              {/* Left side - App info */}
              <div className="flex items-start space-x-6">
                {/* App Icon */}
                <div 
                  className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105" 
                  onClick={() => setShowIconModal(true)}
                >
                  <div className="relative">
                    <div className="w-24 h-24 rounded-2xl bg-white dark:bg-gray-800 shadow-xl ring-1 ring-gray-200 dark:ring-gray-700 flex items-center justify-center overflow-hidden">
                      <IconDisplay
                        iconData={iconData}
                        size="xl"
                        entityType="remoteapp"
                      />
                    </div>
                    {/* Hover edit overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </div>
                  </div>
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
                </div>

                {/* App Details */}
                <div className="flex-1 min-w-0">
                  {/* Name */}
                  {isEditingName ? (
                    <div className="flex items-center space-x-3 mb-3">
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSaveName();
                          if (e.key === 'Escape') handleCancelEditingName();
                        }}
                        onBlur={handleSaveName}
                        autoFocus
                        disabled={isSaving}
                        className="text-4xl font-bold bg-transparent border-b-2 border-blue-500 focus:outline-none text-gray-900 dark:text-white min-w-[300px] pb-1"
                        placeholder="Remote app name"
                      />
                      <button
                        onClick={handleSaveName}
                        disabled={isSaving}
                        className="p-2 text-green-600 hover:text-green-700 bg-green-50 dark:bg-green-900/20 rounded-lg transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                      <button
                        onClick={handleCancelEditingName}
                        disabled={isSaving}
                        className="p-2 text-red-600 hover:text-red-700 bg-red-50 dark:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3 group mb-3">
                      <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                        {app.name}
                      </h1>
                      <button
                        onClick={() => setIsEditingName(true)}
                        className="p-2 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                    </div>
                  )}

                  {/* URL */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="flex items-center space-x-2 px-3 py-1.5 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg border border-gray-200/50 dark:border-gray-700/50">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      <a
                        href={app.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium truncate max-w-xs"
                      >
                        {app.url}
                      </a>
                    </div>
                    <button
                      onClick={handleOpenApp}
                      className="p-2 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200"
                      title="Open in new tab"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </button>
                  </div>

                  {/* Status Badges */}
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm border ${
                      app.status === 'active' 
                        ? 'text-emerald-700 bg-emerald-100/80 dark:text-emerald-300 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800'
                        : app.status === 'inactive'
                        ? 'text-red-700 bg-red-100/80 dark:text-red-300 dark:bg-red-900/30 border-red-200 dark:border-red-800'
                        : 'text-amber-700 bg-amber-100/80 dark:text-amber-300 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800'
                    }`}>
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        app.status === 'active' ? 'bg-emerald-500' : app.status === 'inactive' ? 'bg-red-500' : 'bg-amber-500'
                      }`}></div>
                      {app.status}
                    </span>
                    {app.isPublic && (
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium text-blue-700 bg-blue-100/80 dark:text-blue-300 dark:bg-blue-900/30 backdrop-blur-sm border border-blue-200 dark:border-blue-800">
                        <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Public
                      </span>
                    )}
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium text-gray-600 bg-gray-100/80 dark:text-gray-400 dark:bg-gray-800/30 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
                      <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Remote App
                    </span>
                  </div>
                </div>
              </div>

              {/* Right side - Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 lg:flex-col lg:items-end">
                
                
                <div className="flex gap-2">
                  <Button
                  variant="primary"
                  onClick={handleOpenApp}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  leftIcon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  }
                >
                  Launch App
                </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/remoteapps/${appId}/edit`)}
                    className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 hover:bg-white dark:hover:bg-gray-800"
                    leftIcon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    }
                  >
                    Edit
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => setShowDeleteModal(true)}
                    className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-red-200/50 dark:border-red-700/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                    leftIcon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    }
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mx-auto max-w-7xl px-6 mb-6">
          <div className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description Card */}
            <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    About this App
                  </h3>
                  <button
                    onClick={() => setIsEditingDescription(true)}
                    className="p-2 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100/50 dark:bg-gray-700/50 rounded-lg transition-all duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                </div>

                {isEditingDescription ? (
                  <div className="space-y-4">
                    <textarea
                      value={editingDescription}
                      onChange={(e) => setEditingDescription(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.ctrlKey) handleSaveDescription();
                        if (e.key === 'Escape') handleCancelEditingDescription();
                      }}
                      rows={4}
                      autoFocus
                      disabled={isSaving}
                      className="block w-full rounded-xl border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 resize-none text-lg leading-relaxed"
                      placeholder="Describe what this application does and how it helps your team..."
                    />
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="primary"
                        onClick={handleSaveDescription}
                        disabled={isSaving}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        {isSaving ? 'Saving...' : 'Save Description'}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleCancelEditingDescription}
                        disabled={isSaving}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                      {app.description || (
                        <span className="italic text-gray-500 dark:text-gray-400">
                          No description provided. Click the edit button to add one.
                        </span>
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* App Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Creator Card */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Creator</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">App developer</p>
                  </div>
                </div>
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  {app.creatorName || app.creator || 'Unknown'}
                </p>
              </div>

              {/* Created Date Card */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Created</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Registration date</p>
                  </div>
                </div>
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  {app.createdAt ? formatRelativeTime(new Date(app.createdAt)) : 'Unknown'}
                </p>
              </div>

              {/* Status Card */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    app.status === 'active' 
                      ? 'bg-gradient-to-r from-emerald-500 to-green-500'
                      : app.status === 'inactive'
                      ? 'bg-gradient-to-r from-red-500 to-rose-500'
                      : 'bg-gradient-to-r from-amber-500 to-orange-500'
                  }`}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Status</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Current state</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
                  app.status === 'active' 
                    ? 'text-emerald-700 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-900/30'
                    : app.status === 'inactive'
                    ? 'text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900/30'
                    : 'text-amber-700 bg-amber-100 dark:text-amber-300 dark:bg-amber-900/30'
                }`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    app.status === 'active' ? 'bg-emerald-500' : app.status === 'inactive' ? 'bg-red-500' : 'bg-amber-500'
                  }`}></div>
                  {app.status}
                </span>
              </div>

              {/* Visibility Card */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    app.isPublic
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500'
                      : 'bg-gradient-to-r from-gray-500 to-slate-500'
                  }`}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={app.isPublic 
                        ? "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        : "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      } />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Visibility</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Access level</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
                  app.isPublic
                    ? 'text-blue-700 bg-blue-100 dark:text-blue-300 dark:bg-blue-900/30'
                    : 'text-gray-700 bg-gray-100 dark:text-gray-300 dark:bg-gray-800/30'
                }`}>
                  <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={app.isPublic 
                      ? "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      : "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    } />
                  </svg>
                  {app.isPublic ? 'Public' : 'Private'}
                </span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Launch Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-200/50 dark:border-gray-700/50 overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  Quick Actions
                </h3>
                
                <div className="space-y-3">
                  <Button
                    variant="primary"
                    onClick={handleOpenApp}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                    size="lg"
                    leftIcon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    }
                  >
                    Launch Application
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/remoteapps/${appId}/edit`)}
                    className="w-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800"
                    leftIcon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    }
                  >
                    Edit Settings
                  </Button>
                </div>
              </div>
            </div>

            {/* App Info Summary */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  App Summary
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Type</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Remote Application</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
                    <span className={`text-sm font-medium ${
                      app.status === 'active' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {app.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Access</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {app.isPublic ? 'Public' : 'Private'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Created</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {app.createdAt ? formatRelativeTime(new Date(app.createdAt)) : 'Unknown'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Icon Management Modal */}
      <Modal
        isOpen={showIconModal}
        onClose={() => {
          setShowIconModal(false);
          setIconError(null);
        }}
        title="Manage App Icon"
      >
        <div className="space-y-6">
          {/* Current Icon Display */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <IconDisplay
                iconData={iconData}
                size="xl"
                entityType="remoteapp"
              />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {iconData ? 'Current app icon' : 'No custom icon set'}
            </p>
          </div>

          {/* Error Display */}
          {iconError && (
            <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-3">
              <p className="text-sm text-red-800 dark:text-red-200">{iconError}</p>
            </div>
          )}

          {/* Icon Uploader */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              {iconData ? 'Replace Icon' : 'Upload Icon'}
            </h3>
            <IconUploader
              onIconSelect={handleIconUpload}
              onError={handleUploadError}
              isLoading={isUploadingIcon}
              maxSizeKB={512}
              acceptedTypes={['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml']}
            />
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteApp}
        title="Delete Remote App"
        message={`Are you sure you want to delete "${app.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        loading={isDeleting}
      />
    </div>
  );
};

export default RemoteAppDetailPage;