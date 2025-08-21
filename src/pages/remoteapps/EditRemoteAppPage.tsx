// src/pages/remoteapps/EditRemoteAppPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '@/api/api';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Modal from '@/components/common/Modal';
import { RemoteAppUpdateDto, RemoteAppDetailDto } from '@/api';
import IconDisplay from '@/components/icons/IconDisplay';
import IconUploader from '@/components/icons/IconUploader';
import { IconEntityType } from '@/api/enums';

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

const EditRemoteAppPage: React.FC = () => {
  const navigate = useNavigate();
  const { appId } = useParams<{ appId: string }>();
  
  // App data state
  const [app, setApp] = useState<RemoteAppDetailDto | null>(null);
  const [isLoadingApp, setIsLoadingApp] = useState(true);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    url: '',
    isPublic: false,
  });
  
  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  // Icon state
  const [iconData, setIconData] = useState<string | null>(null);
  const [iconId, setIconId] = useState<string | null>(null);
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconDataUrl, setIconDataUrl] = useState<string | null>(null);
  const [isLoadingIcon, setIsLoadingIcon] = useState(false);
  const [isUploadingIcon, setIsUploadingIcon] = useState(false);
  const [iconError, setIconError] = useState<string | null>(null);
  const [showIconModal, setShowIconModal] = useState(false);

  // Load app data
  useEffect(() => {
    if (appId) {
      loadApp();
      loadIcon();
    }
  }, [appId]);

  const loadApp = async () => {
    if (!appId) return;

    try {
      setIsLoadingApp(true);
      setError(null);

      const response = await api.remoteAppsClient.remoteApps_GetById(appId);

      if (response.success && response.data) {
        const appData = RemoteAppDetailDto.fromJS(response.data);
        setApp(appData);
        setFormData({
          name: appData.name || '',
          description: appData.description || '',
          url: appData.url || '',
          isPublic: appData.isPublic || false,
        });
      } else {
        setError(response.message || 'Failed to load remote app');
      }
    } catch (error) {
      console.error('Failed to load remote app:', error);
      setError('Failed to load remote app. Please try again.');
    } finally {
      setIsLoadingApp(false);
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.url.trim()) {
      errors.url = 'URL is required';
    } else {
      // Basic URL validation
      try {
        new URL(formData.url);
      } catch {
        errors.url = 'Please enter a valid URL';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!appId || !validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const updateDto = new RemoteAppUpdateDto({
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        url: formData.url.trim(),
        isPublic: formData.isPublic,
        assignedUserIds: [] // For now, we'll handle user assignments elsewhere
      });

      const response = await api.remoteAppsClient.remoteApps_Update(appId, updateDto);

      if (response.success && response.data) {
        // Redirect to the remote app's detail page
        navigate(`/remoteapps/${appId}`);
      } else {
        setError(response.message || 'Failed to update remote app');
      }
    } catch (error) {
      console.error('Failed to update remote app:', error);
      setError('Failed to update remote app. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const loadIcon = async () => {
    if (!appId) return;
    
    try {
      setIsLoadingIcon(true);
      setIconError(null);
      
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
      console.error('Failed to load icon:', error);
      // Don't show error to user for 404 - it just means no icon exists
      // Only show errors for actual problems (network issues, etc.)
      setIconData(null);
      setIconError(null); // Don't show UI error for missing icons
    } finally {
      setIsLoadingIcon(false);
    }
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
          description: `Icon for remote app ${appId}`
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
          description: `Icon for remote app ${appId}`
        };
        response = await api.iconsClient.icons_CreateIcon(iconCreateDto);
      }

      if (response.success) {
        // If iconData is returned, use it; otherwise reload the icon
        if (response.data?.iconData) {
          setIconData(response.data.iconData);
          setIconId(response.data.id || null);
        } else {
          // Reload the icon from the server
          await loadIcon();
        }
        setIconFile(null);
        setIconDataUrl(null);
        setIconError(null); // Clear any previous errors
        setShowIconModal(false); // Close modal on success
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

  const handleIconDelete = async () => {
    if (!iconData || !appId) return;

    try {
      setIsLoadingIcon(true);
      setIconError(null);

      const response = await api.iconsClient.icons_DeleteIconByEntity(
        IconEntityType.RemoteApp,
        appId
      );

      if (response.success) {
        setIconData(null);
        setIconId(null);
        setShowIconModal(false);
      } else {
        throw new Error(response.message || 'Failed to delete icon');
      }
    } catch (error) {
      console.error('Failed to delete icon:', error);
      setIconError(error instanceof Error ? error.message : 'Failed to delete icon');
    } finally {
      setIsLoadingIcon(false);
    }
  };

  const handleIconError = (error: string) => {
    setIconError(error);
  };

  if (isLoadingApp) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="p-6 space-y-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
              <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
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
        <div className="relative px-6 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
              <button 
                onClick={() => navigate('/remoteapps')}
                className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors flex items-center space-x-1"
              >
                <span>Remote Apps</span>
              </button>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <button 
                onClick={() => navigate(`/remoteapps/${appId}`)}
                className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                <span>{app.name}</span>
              </button>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-900 dark:text-gray-100 font-medium">Edit</span>
            </nav>

            {/* Hero Content */}
            <div className="flex items-start space-x-6">
              {/* App Icon */}
              <div 
                className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105" 
                onClick={() => setShowIconModal(true)}
              >
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-white dark:bg-gray-800 shadow-xl ring-1 ring-gray-200 dark:ring-gray-700 flex items-center justify-center overflow-hidden">
                    <IconDisplay
                      iconData={iconData}
                      size="xl"
                      entityType="remoteapp"
                    />
                  </div>
                  {/* Hover edit overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                </div>
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
              </div>

              {/* App Details */}
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
                  Edit {app.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
                  Update your remote application settings and configuration
                </p>
                
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
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mx-auto max-w-4xl px-6 mb-6">
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
      <div className="max-w-4xl mx-auto px-6 pb-12">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50">

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Name *
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Enter app name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              errorMessage={validationErrors.name}
              className="w-full"
            />
          </div>

          {/* URL Field */}
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              URL *
            </label>
            <Input
              id="url"
              type="url"
              placeholder="https://example.com"
              value={formData.url}
              onChange={(e) => handleInputChange('url', e.target.value)}
              errorMessage={validationErrors.url}
              className="w-full"
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              }
            />
          </div>

          {/* Description Field */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              placeholder="Enter app description (optional)"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Visibility Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Visibility
            </label>
            <div className="space-y-3">
              <div className="flex items-start">
                <input
                  id="private"
                  name="visibility"
                  type="radio"
                  checked={!formData.isPublic}
                  onChange={() => handleInputChange('isPublic', false)}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <div className="ml-3">
                  <label htmlFor="private" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Private
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Only you and assigned users can access this app
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <input
                  id="public"
                  name="visibility"
                  type="radio"
                  checked={formData.isPublic}
                  onChange={() => handleInputChange('isPublic', true)}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <div className="ml-3">
                  <label htmlFor="public" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Public
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Anyone with access to the system can use this app
                  </p>
                </div>
              </div>
            </div>
          </div>


          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-600">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(`/remoteapps/${appId}`)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              leftIcon={
                isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )
              }
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
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
              onError={handleIconError}
              isLoading={isUploadingIcon}
              maxSizeKB={512}
              acceptedTypes={['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml']}
            />
          </div>

          {/* Delete Icon Button */}
          {iconData && (
            <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
              <Button
                variant="danger"
                size="sm"
                onClick={handleIconDelete}
                disabled={isLoadingIcon || isUploadingIcon}
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                }
              >
                {isLoadingIcon ? 'Deleting...' : 'Delete Icon'}
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  </div>
  );
};

export default EditRemoteAppPage;