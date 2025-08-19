// src/pages/remoteapps/EditRemoteAppPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '@/api/api';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { RemoteAppUpdateDto, RemoteAppDetailDto } from '@/api';

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

  // Load app data
  useEffect(() => {
    if (appId) {
      loadApp();
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
    <div className="p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(`/remoteapps/${appId}`)}
          leftIcon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          }
        >
          Back to App Details
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Edit Remote App
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Update your remote application settings
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mx-6 mt-4 rounded-md bg-red-50 dark:bg-red-900/20 p-4">
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

          {/* Status Display */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Current Status
            </label>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              app.status === 'active' 
                ? 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30'
                : app.status === 'inactive'
                ? 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30'
                : 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30'
            }`}>
              {app.status}
            </span>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Status can be changed in the app management section
            </p>
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
    </div>
  );
};

export default EditRemoteAppPage;