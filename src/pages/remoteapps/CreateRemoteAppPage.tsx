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
  });
  
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
        assignedUserIds: [] // For now, empty array
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
    <div className="p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/remoteapps')}
          leftIcon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          }
        >
          Back to Remote Apps
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Create New Remote App
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Add a new remote application to your workspace
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

          {/* Icon Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              App Icon
            </label>
            
            {iconError && (
              <div className="mb-3 rounded-md bg-red-50 dark:bg-red-900/20 p-3">
                <p className="text-sm text-red-800 dark:text-red-200">{iconError}</p>
              </div>
            )}
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <IconDisplay
                  iconData={iconDataUrl}
                  size="lg"
                  entityType="remoteapp"
                />
              </div>
              
              <div className="flex-1 space-y-2">
                <IconUploader
                  onIconSelect={handleIconUpload}
                  onError={handleIconError}
                  isLoading={false}
                  maxSizeKB={512}
                  acceptedTypes={['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml']}
                />
                
                {iconFile && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {iconFile.name}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={clearIcon}
                    >
                      Remove
                    </Button>
                  </div>
                )}
                
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Upload a custom icon for your remote app (optional)
                </p>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-600">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/remoteapps')}
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                )
              }
            >
              {isSubmitting ? 'Creating...' : 'Create Remote App'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRemoteAppPage;