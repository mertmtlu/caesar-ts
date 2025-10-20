// src/pages/remoteapps/CreateRemoteAppPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/api/api';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { RemoteAppCreateDto } from '@/api';
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

const CreateRemoteAppPage: React.FC = () => {
  const navigate = useNavigate();
  
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
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconDataUrl, setIconDataUrl] = useState<string | null>(null);
  const [iconError, setIconError] = useState<string | null>(null);


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
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const createDto = new RemoteAppCreateDto({
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        url: formData.url.trim(),
        isPublic: formData.isPublic,
        ssoUrl: formData.ssoUrl.trim() || undefined,
        defaultUsername: formData.defaultUsername.trim() || undefined,
        defaultPassword: formData.defaultPassword.trim() || undefined,
      });

      const response = await api.remoteAppsClient.remoteApps_Create(createDto);

      if (response.success && response.data) {
        // Upload icon if provided
        if (iconFile && iconDataUrl && response.data.id) {
          try {
            const base64 = iconDataUrl.split(',')[1];
            const iconCreateDto = {
              name: iconFile.name,
              iconData: base64,
              format: mimeTypeToFormat(iconFile.type),
              entityType: IconEntityType.RemoteApp,
              entityId: response.data.id,
              description: `Icon for remote app ${response.data.id}`
            };
            await api.iconsClient.icons_CreateIcon(iconCreateDto);
          } catch (iconError) {
            console.error('Failed to upload icon:', iconError);
            // Don't fail the whole creation for icon upload failure
          }
        }
        
        // Redirect to the remote apps list page
        navigate('/remoteapps');
      } else {
        setError(response.message || 'Failed to create remote app');
      }
    } catch (error) {
      console.error('Failed to create remote app:', error);
      setError('Failed to create remote app. Please try again.');
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

  const handleIconUpload = (file: File, dataUrl: string) => {
    setIconFile(file);
    setIconDataUrl(dataUrl);
    setIconError(null);
  };

  const handleIconError = (error: string) => {
    setIconError(error);
    setIconFile(null);
    setIconDataUrl(null);
  };

  const clearIcon = () => {
    setIconFile(null);
    setIconDataUrl(null);
    setIconError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header */}
        <div className="mb-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <button 
              onClick={() => navigate('/remoteapps')}
              className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              Remote Apps
            </button>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 dark:text-gray-100">Create New App</span>
          </nav>

          {/* Main Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Create Remote App
              </h1>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                Connect external applications to your workspace
              </p>
            </div>
            
            <Button
              variant="ghost"
              onClick={() => navigate('/remoteapps')}
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              }
            >
              Back to Apps
            </Button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form Column */}
          <div className="lg:col-span-2 space-y-8">

            {/* Error Message */}
            {error && (
              <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4">
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
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Basic Information</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Essential details about your remote app</p>
                </div>
                
                <div className="p-6 space-y-6">
                  {/* App Name */}
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
                      className="w-full"
                      autoFocus
                    />
                  </div>

                  {/* App URL */}
                  <div>
                    <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Application URL *
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
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      The web address where your application is hosted
                    </p>
                  </div>

                  {/* Description */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description <span className="text-gray-500">(optional)</span>
                    </label>
                    <textarea
                      id="description"
                      rows={3}
                      placeholder="Describe what this application does and how it helps your team..."
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 resize-none"
                      maxLength={500}
                    />
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {formData.description.length}/500 characters
                    </p>
                  </div>
                </div>
              </div>


              {/* SSO Configuration Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">SSO Configuration</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Optional single sign-on settings for automatic authentication</p>
                      </div>
                      <SsoInfoButton />
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowSsoConfig(!showSsoConfig)}
                      className="flex items-center space-x-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    >
                      <span>{showSsoConfig ? 'Hide' : 'Show'} SSO Config</span>
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
                </div>
                
                {showSsoConfig && (
                  <div className="p-6 space-y-6">
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
                        className="w-full"
                        leftIcon={
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        }
                      />
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
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
                        className="w-full"
                        maxLength={100}
                        leftIcon={
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        }
                      />
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
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
                        className="w-full"
                        maxLength={100}
                        leftIcon={
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        }
                      />
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {formData.defaultPassword.length}/100 characters
                      </p>
                    </div>

                    {/* SSO Info */}
                    <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3 min-w-0 flex-1">
                          <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200">SSO Configuration</h4>
                          <p className="text-sm text-blue-700 dark:text-blue-300 mt-1 break-words">
                            When SSO is configured, users will be automatically redirected to the SSO URL with the provided credentials.
                          </p>
                          <div className="mt-2 p-2 bg-blue-100/50 dark:bg-blue-800/30 rounded text-xs text-blue-600 dark:text-blue-400 font-mono break-all">
                            <span className="text-blue-500 dark:text-blue-300">Format:</span> {formData.ssoUrl || 'SSO_URL'}?username={formData.defaultUsername || 'USERNAME'}&amp;password={formData.defaultPassword || 'PASSWORD'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Visibility Settings Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Privacy & Access</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Control who can access and use this app</p>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => handleInputChange('isPublic', false)}
                      className={`relative p-4 border rounded-xl transition-all duration-200 text-left hover:shadow-md ${
                        !formData.isPublic
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-500 ring-opacity-20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            !formData.isPublic ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-100 dark:bg-gray-700'
                          }`}>
                            <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">Private</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Only you and assigned team members can access this app
                          </p>
                        </div>
                      </div>
                      {!formData.isPublic && (
                        <div className="absolute -top-1 -right-1">
                          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleInputChange('isPublic', true)}
                      className={`relative p-4 border rounded-xl transition-all duration-200 text-left hover:shadow-md ${
                        formData.isPublic
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-500 ring-opacity-20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            formData.isPublic ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-100 dark:bg-gray-700'
                          }`}>
                            <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">Public</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Anyone with access to the system can use this app
                          </p>
                        </div>
                      </div>
                      {formData.isPublic && (
                        <div className="absolute -top-1 -right-1">
                          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end space-x-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/remoteapps')}
                  disabled={isSubmitting}
                  size="lg"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  size="lg"
                  leftIcon={
                    isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    )
                  }
                >
                  {isSubmitting ? 'Creating App...' : 'Create Remote App'}
                </Button>
              </div>
            </form>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            {/* Icon Upload Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">App Icon</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Upload a custom icon for your app</p>
              </div>
              
              <div className="p-6">
                {/* Icon Preview */}
                <div className="text-center mb-6">
                  <div className="inline-block">
                    <IconDisplay
                      iconData={iconDataUrl}
                      size="xl"
                      entityType="remoteapp"
                    />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    {iconFile ? iconFile.name : 'No icon uploaded'}
                  </p>
                </div>

                {/* Icon Error */}
                {iconError && (
                  <div className="mb-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3">
                    <p className="text-sm text-red-800 dark:text-red-200">{iconError}</p>
                  </div>
                )}

                {/* Icon Uploader */}
                <div className="space-y-4">
                  <IconUploader
                    onIconSelect={handleIconUpload}
                    onError={handleIconError}
                    isLoading={false}
                    maxSizeKB={512}
                    acceptedTypes={['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml']}
                  />
                  
                  {iconFile && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={clearIcon}
                      className="w-full"
                      leftIcon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      }
                    >
                      Remove Icon
                    </Button>
                  )}
                  
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Supported formats: PNG, JPG, SVG. Max size: 512KB.
                  </p>
                </div>
              </div>
            </div>

            {/* App Preview Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Preview</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">How your app will appear</p>
              </div>
              
              <div className="p-6">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900/50">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <IconDisplay
                        iconData={iconDataUrl}
                        size="md"
                        entityType="remoteapp"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {formData.name || 'App Name'}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {formData.url || 'App URL'}
                      </p>
                      {formData.isPublic && (
                        <div className="mt-1">
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            🌐 Public
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {formData.description && (
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-3 line-clamp-2">
                      {formData.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRemoteAppPage;