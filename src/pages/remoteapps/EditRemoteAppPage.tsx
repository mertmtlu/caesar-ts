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
import SsoInfoButton from '@/components/sso/SsoIntegrationGuide';

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
    ssoUrl: '',
    defaultUsername: '',
    defaultPassword: '',
  });
  
  // SSO configuration state
  const [showSsoConfig, setShowSsoConfig] = useState(false);
  
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
          ssoUrl: appData.ssoUrl || '',
          defaultUsername: appData.defaultUsername || '',
          defaultPassword: appData.defaultPassword || '',
        });
        
        // Show SSO config if any SSO data exists
        setShowSsoConfig(Boolean(appData.ssoUrl || appData.defaultUsername || appData.defaultPassword));
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

    // SSO URL validation (optional)
    if (formData.ssoUrl && formData.ssoUrl.trim()) {
      try {
        new URL(formData.ssoUrl);
      } catch {
        errors.ssoUrl = 'Please enter a valid SSO URL';
      }
    }

    // Username validation (max 100 chars)
    if (formData.defaultUsername && formData.defaultUsername.length > 100) {
      errors.defaultUsername = 'Username must be 100 characters or less';
    }

    // Password validation (max 100 chars)
    if (formData.defaultPassword && formData.defaultPassword.length > 100) {
      errors.defaultPassword = 'Password must be 100 characters or less';
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
        ssoUrl: formData.ssoUrl.trim() || undefined,
        defaultUsername: formData.defaultUsername.trim() || undefined,
        defaultPassword: formData.defaultPassword.trim() || undefined,
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

          <form onSubmit={handleSubmit} className="p-8">
            <div className="space-y-8">
              {/* Basic Information Card */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-blue-200/50 dark:border-gray-700/50">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  Basic Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      App Name *
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter a descriptive name for your app"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      errorMessage={validationErrors.name}
                      className="w-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm"
                      leftIcon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                      }
                    />
                  </div>

                  {/* URL Field */}
                  <div>
                    <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Application URL *
                    </label>
                    <Input
                      id="url"
                      type="url"
                      placeholder="https://your-app-domain.com"
                      value={formData.url}
                      onChange={(e) => handleInputChange('url', e.target.value)}
                      errorMessage={validationErrors.url}
                      className="w-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm"
                      leftIcon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                      }
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      The complete URL where users can access your application
                    </p>
                  </div>
                </div>

                {/* Description Field - Full Width */}
                <div className="mt-6">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    placeholder="Describe what this application does and how it helps your team..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="block w-full rounded-xl border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 resize-none"
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Optional: Help users understand the purpose of this application
                  </p>
                </div>
              </div>

              {/* Visibility Settings Card */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-green-200/50 dark:border-gray-700/50">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  Access Control
                </h3>
                
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Choose who can access this remote application
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Private Option */}
                    <label className={`relative flex items-start p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      !formData.isPublic 
                        ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20' 
                        : 'border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}>
                      <input
                        id="private"
                        name="visibility"
                        type="radio"
                        checked={!formData.isPublic}
                        onChange={() => handleInputChange('isPublic', false)}
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 mt-0.5"
                      />
                      <div className="ml-3 flex-1">
                        <div className="flex items-center space-x-2">
                          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">Private</span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Only you and specifically assigned users can access this application. Provides maximum control over access.
                        </p>
                      </div>
                    </label>

                    {/* Public Option */}
                    <label className={`relative flex items-start p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.isPublic 
                        ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20' 
                        : 'border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}>
                      <input
                        id="public"
                        name="visibility"
                        type="radio"
                        checked={formData.isPublic}
                        onChange={() => handleInputChange('isPublic', true)}
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 mt-0.5"
                      />
                      <div className="ml-3 flex-1">
                        <div className="flex items-center space-x-2">
                          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">Public</span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Anyone with access to the system can discover and use this application. Great for team-wide tools.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

                {/* SSO Configuration Card */}
                <div className="bg-gradient-to-br from-orange-50 to-amber-100 dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-orange-200/50 dark:border-gray-700/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">SSO Configuration</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Optional single sign-on settings</p>
                      </div>
                      <SsoInfoButton className="ml-2" />
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowSsoConfig(!showSsoConfig)}
                      className="flex items-center space-x-2 text-sm text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors"
                    >
                      <span>{showSsoConfig ? 'Hide' : 'Show'}</span>
                      <svg 
                        className={`w-4 h-4 transition-transform duration-200 ${showSsoConfig ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                  
                  {showSsoConfig && (
                    <div className="space-y-6">
                      {/* SSO URL */}
                      <div>
                        <label htmlFor="ssoUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          SSO URL <span className="text-gray-500">(optional)</span>
                        </label>
                        <Input
                          id="ssoUrl"
                          type="url"
                          placeholder="https://example.com/sso"
                          value={formData.ssoUrl}
                          onChange={(e) => handleInputChange('ssoUrl', e.target.value)}
                          errorMessage={validationErrors.ssoUrl}
                          className="w-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm"
                          leftIcon={
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                          }
                        />
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          The SSO endpoint URL for automatic authentication
                        </p>
                      </div>

                      {/* Default Username */}
                      <div>
                        <label htmlFor="defaultUsername" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Default Username <span className="text-gray-500">(optional)</span>
                        </label>
                        <Input
                          id="defaultUsername"
                          type="text"
                          placeholder="Enter default username for SSO"
                          value={formData.defaultUsername}
                          onChange={(e) => handleInputChange('defaultUsername', e.target.value)}
                          errorMessage={validationErrors.defaultUsername}
                          className="w-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm"
                          maxLength={100}
                          leftIcon={
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          }
                        />
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          {formData.defaultUsername.length}/100 characters
                        </p>
                      </div>

                      {/* Default Password */}
                      <div>
                        <label htmlFor="defaultPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Default Password <span className="text-gray-500">(optional)</span>
                        </label>
                        <Input
                          id="defaultPassword"
                          type="password"
                          placeholder="Enter default password for SSO"
                          value={formData.defaultPassword}
                          onChange={(e) => handleInputChange('defaultPassword', e.target.value)}
                          errorMessage={validationErrors.defaultPassword}
                          className="w-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm"
                          maxLength={100}
                          leftIcon={
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          }
                        />
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          {formData.defaultPassword.length}/100 characters
                        </p>
                      </div>

                      {/* SSO Info */}
                      <div className="rounded-lg bg-orange-100/50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 p-4">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="ml-3 min-w-0 flex-1">
                            <h4 className="text-sm font-medium text-orange-800 dark:text-orange-200">SSO Configuration</h4>
                            <p className="text-sm text-orange-700 dark:text-orange-300 mt-1 break-words">
                              When SSO is configured, users will be automatically redirected to the SSO URL with the provided credentials.
                            </p>
                            <div className="mt-2 p-2 bg-orange-100/50 dark:bg-orange-800/30 rounded text-xs text-orange-600 dark:text-orange-400 font-mono break-all">
                              <span className="text-orange-500 dark:text-orange-300">Format:</span> {formData.ssoUrl || 'SSO_URL'}?username={formData.defaultUsername || 'USERNAME'}&amp;password={formData.defaultPassword || 'PASSWORD'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 mt-8 border-t border-gray-200/50 dark:border-gray-700/50">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate(`/remoteapps/${appId}`)}
                disabled={isSubmitting}
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                }
              >
                Cancel Changes
              </Button>
              
              <div className="flex flex-wrap gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => window.open(formData.url || app.url, '_blank')}
                  disabled={!formData.url && !app.url}
                  className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm"
                  leftIcon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  }
                >
                  Test URL
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    if (app) {
                      setFormData({
                        name: app.name || '',
                        description: app.description || '',
                        url: app.url || '',
                        isPublic: app.isPublic || false,
                        ssoUrl: app.ssoUrl || '',
                        defaultUsername: app.defaultUsername || '',
                        defaultPassword: app.defaultPassword || '',
                      });
                      setShowSsoConfig(Boolean(app.ssoUrl || app.defaultUsername || app.defaultPassword));
                      setValidationErrors({});
                    }
                  }}
                  disabled={isSubmitting}
                >
                  Reset Form
                </Button>
                
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
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
                  {isSubmitting ? 'Saving Changes...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          </form>
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
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center overflow-hidden shadow-lg ring-1 ring-gray-200 dark:ring-gray-600">
                  <IconDisplay
                    iconData={iconData}
                    size="xl"
                    entityType="remoteapp"
                  />
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {iconData ? 'Current app icon' : 'No custom icon set'}
            </p>
          </div>

          {/* Error Display */}
          {iconError && (
            <div className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4">
              <div className="flex">
                <svg className="h-5 w-5 text-red-400 mr-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-red-800 dark:text-red-200">{iconError}</p>
              </div>
            </div>
          )}

          {/* Icon Uploader */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mr-2">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              {iconData ? 'Replace Icon' : 'Upload New Icon'}
            </h3>
            <IconUploader
              onIconSelect={handleIconUpload}
              onError={handleIconError}
              isLoading={isUploadingIcon}
              maxSizeKB={512}
              acceptedTypes={['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml']}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Upload PNG, JPG, or SVG files up to 512KB. Square images work best.
            </p>
          </div>

          {/* Delete Icon Button */}
          {iconData && (
            <div className="pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
              <Button
                variant="danger"
                size="sm"
                onClick={handleIconDelete}
                disabled={isLoadingIcon || isUploadingIcon}
                className="hover:shadow-lg transition-shadow"
                leftIcon={
                  isLoadingIcon ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  )
                }
              >
                {isLoadingIcon ? 'Deleting...' : 'Remove Icon'}
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default EditRemoteAppPage;