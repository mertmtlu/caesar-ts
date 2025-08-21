import React, { useState, useEffect } from 'react';
import { api } from '@/api/api';
import { IconEntityType } from '@/api/enums';
import Button from '@/components/common/Button';
import IconDisplay from './IconDisplay';
import IconUploader from './IconUploader';

interface IconManagerProps {
  entityId: string;
  entityType: 'program' | 'workflow' | 'remoteapp';
  onIconChange?: (iconData: string | null) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showUploader?: boolean;
}

const entityTypeMapping = {
  program: IconEntityType.Program,
  workflow: IconEntityType.Workflow,
  remoteapp: IconEntityType.RemoteApp
};

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

const IconManager: React.FC<IconManagerProps> = ({
  entityId,
  entityType,
  onIconChange,
  className = '',
  size = 'lg',
  showUploader = true
}) => {
  const [iconData, setIconData] = useState<string | null>(null);
  const [iconId, setIconId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    loadIcon();
  }, [entityId, entityType]);

  const loadIcon = async () => {
    if (!entityId) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await api.iconsClient.icons_GetIconByEntity(
        entityTypeMapping[entityType],
        entityId
      );

      if (response.success && response.data?.iconData) {
        setIconData(response.data.iconData);
        setIconId(response.data.id || null);
        onIconChange?.(response.data.iconData);
      } else {
        setIconData(null);
        setIconId(null);
        onIconChange?.(null);
      }
    } catch (error) {
      console.error('Failed to load icon:', error);
      // Don't show error to user for 404 - it just means no icon exists
      setError(null); // Don't show UI error for missing icons
      setIconData(null);
      onIconChange?.(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIconUpload = async (file: File, dataUrl: string) => {
    try {
      setIsUploading(true);
      setError(null);

      // Convert file to base64
      const base64 = dataUrl.split(',')[1];
      
      const iconCreateDto = {
        name: file.name,
        iconData: base64,
        format: mimeTypeToFormat(file.type),
        entityType: entityTypeMapping[entityType],
        entityId: entityId,
        description: `Icon for ${entityType} ${entityId}`
      };

      let response;
      if (iconData && iconId) {
        // Update existing icon
        const iconUpdateDto = {
          name: file.name,
          iconData: base64,
          format: mimeTypeToFormat(file.type),
          description: `Icon for ${entityType} ${entityId}`
        };
        response = await api.iconsClient.icons_UpdateIcon(iconId, iconUpdateDto);
      } else {
        // Create new icon
        response = await api.iconsClient.icons_CreateIcon(iconCreateDto);
      }

      if (response.success) {
        // If iconData is returned, use it; otherwise reload the icon
        if (response.data?.iconData) {
          setIconData(response.data.iconData);
          setIconId(response.data.id || null);
          onIconChange?.(response.data.iconData);
        } else {
          // Reload the icon from the server
          await loadIcon();
        }
        setShowUpload(false);
        setError(null); // Clear any previous errors
      } else {
        throw new Error(response.message || 'Failed to upload icon');
      }
    } catch (error) {
      console.error('Failed to upload icon:', error);
      setError(error instanceof Error ? error.message : 'Failed to upload icon');
    } finally {
      setIsUploading(false);
    }
  };

  const handleIconDelete = async () => {
    if (!iconData || !entityId) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await api.iconsClient.icons_DeleteIconByEntity(
        entityTypeMapping[entityType],
        entityId
      );

      if (response.success) {
        setIconData(null);
        onIconChange?.(null);
      } else {
        throw new Error(response.message || 'Failed to delete icon');
      }
    } catch (error) {
      console.error('Failed to delete icon:', error);
      setError(error instanceof Error ? error.message : 'Failed to delete icon');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadError = (error: string) => {
    setError(error);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {error && (
        <div className="p-3 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          {isLoading ? (
            <div className={`${size === 'xl' ? 'w-12 h-12' : size === 'lg' ? 'w-10 h-10' : size === 'md' ? 'w-8 h-8' : 'w-6 h-6'} bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg`} />
          ) : (
            <IconDisplay
              iconData={iconData}
              size={size}
              entityType={entityType}
            />
          )}
        </div>

        {showUploader && (
          <div className="flex-1 space-y-2">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowUpload(!showUpload)}
                disabled={isLoading}
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                }
              >
                {iconData ? 'Change Icon' : 'Upload Icon'}
              </Button>

              {iconData && (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleIconDelete}
                  disabled={isLoading}
                  leftIcon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  }
                >
                  Delete
                </Button>
              )}
            </div>

            {showUpload && (
              <IconUploader
                onIconSelect={handleIconUpload}
                onError={handleUploadError}
                isLoading={isUploading}
                maxSizeKB={512} // 512KB limit for icons
                acceptedTypes={['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml']}
              />
            )}
          </div>
        )}
      </div>

      {iconData && !showUploader && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Custom icon loaded
        </p>
      )}
    </div>
  );
};

export default IconManager;