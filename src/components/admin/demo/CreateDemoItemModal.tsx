import React, { useState, useEffect } from 'react';
import { api } from '@/api/api';
import { AppType } from '@/api/enums';
import { DemoShowcaseCreateDto, AppOptionDto } from '@/api/types';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Modal from '@/components/common/Modal';

interface CreateDemoItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDemoItemCreated: () => void;
}

interface DemoItemForm {
  selectedAppType: 'Program' | 'Workflow' | 'RemoteApp' | '';
  selectedAppId: string;
  tab: string;
  primaryGroup: string;
  secondaryGroup: string;
  tertiaryGroup: string;
  videoFile: File | null;
  uploadedVideoPath: string;
}

const CreateDemoItemModal: React.FC<CreateDemoItemModalProps> = ({
  isOpen,
  onClose,
  onDemoItemCreated
}) => {
  const [form, setForm] = useState<DemoItemForm>({
    selectedAppType: '',
    selectedAppId: '',
    tab: '',
    primaryGroup: '',
    secondaryGroup: '',
    tertiaryGroup: '',
    videoFile: null,
    uploadedVideoPath: ''
  });

  const [availableApps, setAvailableApps] = useState<{
    programs: AppOptionDto[];
    workflows: AppOptionDto[];
    remoteApps: AppOptionDto[];
  }>({
    programs: [],
    workflows: [],
    remoteApps: []
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [isLoadingApps, setIsLoadingApps] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadAvailableApps();
      resetForm();
    }
  }, [isOpen]);

  const loadAvailableApps = async () => {
    try {
      setIsLoadingApps(true);
      const response = await api.demoShowcase.demoShowcase_GetAvailableApps();

      if (response.success && response.data) {
        setAvailableApps({
          programs: (response.data.programs || []) as AppOptionDto[],
          workflows: (response.data.workflows || []) as AppOptionDto[],
          remoteApps: (response.data.remoteApps || []) as AppOptionDto[]
        });
      }
    } catch (error) {
      console.error('Failed to load available apps:', error);
      setErrors({ general: 'Failed to load available apps' });
    } finally {
      setIsLoadingApps(false);
    }
  };

  const resetForm = () => {
    setForm({
      selectedAppType: '',
      selectedAppId: '',
      tab: '',
      primaryGroup: '',
      secondaryGroup: '',
      tertiaryGroup: '',
      videoFile: null,
      uploadedVideoPath: ''
    });
    setErrors({});
  };

  const handleVideoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
    if (!validTypes.includes(file.type)) {
      setErrors({ video: 'Please select a valid video file (MP4, WebM, or MOV)' });
      return;
    }

    // Validate file size (e.g., max 100MB)
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      setErrors({ video: 'Video file is too large. Maximum size is 100MB.' });
      return;
    }

    setForm(prev => ({ ...prev, videoFile: file }));
    setErrors(prev => ({ ...prev, video: '' }));

    // Auto-upload video when selected
    await handleVideoUpload(file);
  };

  const handleVideoUpload = async (file: File) => {
    setIsUploadingVideo(true);
    setErrors(prev => ({ ...prev, video: '' }));

    try {
      const formData = new FormData();
      formData.append('file', file, file.name);

      // Use a direct fetch call to ensure multipart/form-data is used
      const response = await fetch(`${api.baseApiUrl}/api/DemoShowcase/upload-video`, {
        method: 'POST',
        headers: {
          // The 'Authorization' header is crucial
          'Authorization': `Bearer ${api.getCurrentToken()}`,
          // NOTE: Do NOT set 'Content-Type'. The browser will set it correctly
          // to 'multipart/form-data' with the proper boundary when using FormData.
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success && result.data?.videoPath) {
        setForm(prev => ({
          ...prev,
          uploadedVideoPath: result.data.videoPath,
        }));
      } else {
        const errorMessage = result.message || 'Failed to upload video.';
        setErrors({ video: errorMessage });
      }
    } catch (error) {
      console.error('Video upload failed:', error);
      setErrors({ video: 'An unexpected error occurred during video upload.' });
    } finally {
      setIsUploadingVideo(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!form.tab) {
      newErrors.tab = 'Please enter a tab name';
    }

    if (!form.primaryGroup) {
      newErrors.primaryGroup = 'Please enter a primary group';
    }

    if (!form.secondaryGroup) {
      newErrors.secondaryGroup = 'Please enter a secondary group';
    }

    if (!form.selectedAppType) {
      newErrors.appType = 'Please select an app type';
    }

    if (!form.selectedAppId) {
      newErrors.appId = 'Please select an app';
    }

    if (!form.uploadedVideoPath) {
      newErrors.video = 'Please upload a video';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);

      // Map app type to enum
      let appTypeEnum: AppType;
      switch (form.selectedAppType) {
        case 'Program':
          appTypeEnum = AppType._0;
          break;
        case 'Workflow':
          appTypeEnum = AppType._1;
          break;
        case 'RemoteApp':
          appTypeEnum = AppType._2;
          break;
        default:
          throw new Error('Invalid app type');
      }

      const createDto = new DemoShowcaseCreateDto({
        associatedAppId: form.selectedAppId,
        appType: appTypeEnum,
        tab: form.tab,
        primaryGroup: form.primaryGroup,
        secondaryGroup: form.secondaryGroup,
        tertiaryGroup: form.tertiaryGroup || undefined, // Optional field
        videoPath: form.uploadedVideoPath
      });

      const response = await api.demoShowcase.demoShowcase_Create(createDto);

      if (response.success) {
        onDemoItemCreated();
        onClose();
        resetForm();
      } else {
        setErrors({ general: response.message || 'Failed to create demo item' });
      }
    } catch (error) {
      console.error('Failed to create demo item:', error);
      setErrors({ general: 'Failed to create demo item. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getAvailableAppsForType = (): AppOptionDto[] => {
    switch (form.selectedAppType) {
      case 'Program':
        return availableApps.programs;
      case 'Workflow':
        return availableApps.workflows;
      case 'RemoteApp':
        return availableApps.remoteApps;
      default:
        return [];
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Demo Showcase Item" size="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Error */}
        {errors.general && (
          <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800 dark:text-red-200">{errors.general}</p>
              </div>
            </div>
          </div>
        )}

        {/* Grouping Inputs */}
        <div className="grid grid-cols-1 gap-4">
          <Input
            label="Tab*"
            value={form.tab}
            onChange={(e) => {
              setForm(prev => ({ ...prev, tab: e.target.value }));
              setErrors(prev => ({ ...prev, tab: '' }));
            }}
            errorMessage={errors.tab}
            placeholder="Enter tab name (e.g., Analysis, Reporting)"
            required
          />
          <Input
            label="Primary Group*"
            value={form.primaryGroup}
            onChange={(e) => {
              setForm(prev => ({ ...prev, primaryGroup: e.target.value }));
              setErrors(prev => ({ ...prev, primaryGroup: '' }));
            }}
            errorMessage={errors.primaryGroup}
            placeholder="Enter primary group (e.g., Soil Analysis, Data Processing)"
            required
          />
          <Input
            label="Secondary Group*"
            value={form.secondaryGroup}
            onChange={(e) => {
              setForm(prev => ({ ...prev, secondaryGroup: e.target.value }));
              setErrors(prev => ({ ...prev, secondaryGroup: '' }));
            }}
            errorMessage={errors.secondaryGroup}
            placeholder="Enter secondary group (e.g., Basic Tests, Advanced Reports)"
            required
          />
          <Input
            label="Tertiary Group (Optional)"
            value={form.tertiaryGroup}
            onChange={(e) => {
              setForm(prev => ({ ...prev, tertiaryGroup: e.target.value }));
              setErrors(prev => ({ ...prev, tertiaryGroup: '' }));
            }}
            errorMessage={errors.tertiaryGroup}
            placeholder="Enter tertiary group (optional, e.g., Sub-category)"
          />
        </div>

        {/* App Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            App Type* {errors.appType && <span className="text-red-500">({errors.appType})</span>}
          </label>
          <select
            value={form.selectedAppType}
            onChange={(e) => {
              setForm(prev => ({
                ...prev,
                selectedAppType: e.target.value as any,
                selectedAppId: '' // Reset app selection when type changes
              }));
              setErrors(prev => ({ ...prev, appType: '', appId: '' }));
            }}
            className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            disabled={isLoadingApps}
          >
            <option value="">Select app type</option>
            <option value="Program">Program</option>
            <option value="Workflow">Workflow</option>
            <option value="RemoteApp">Remote App</option>
          </select>
        </div>

        {/* App Selection */}
        {form.selectedAppType && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select {form.selectedAppType}* {errors.appId && <span className="text-red-500">({errors.appId})</span>}
            </label>
            <select
              value={form.selectedAppId}
              onChange={(e) => {
                setForm(prev => ({ ...prev, selectedAppId: e.target.value }));
                setErrors(prev => ({ ...prev, appId: '' }));
              }}
              className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              disabled={isLoadingApps}
            >
              <option value="">Select an app</option>
              {getAvailableAppsForType().map((app) => (
                <option key={app.id} value={app.id}>
                  {app.name}
                </option>
              ))}
            </select>
            {getAvailableAppsForType().length === 0 && !isLoadingApps && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                No {form.selectedAppType.toLowerCase()}s available
              </p>
            )}
          </div>
        )}

        {/* Video Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Video Upload* {errors.video && <span className="text-red-500">({errors.video})</span>}
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              {form.videoFile ? (
                <div className="flex flex-col items-center">
                  <svg
                    className="mx-auto h-12 w-12 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    <span className="font-medium">{form.videoFile.name}</span>
                    <span className="block text-xs mt-1">
                      {(form.videoFile.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                  </div>
                  {isUploadingVideo && (
                    <div className="mt-2 text-sm text-blue-600 dark:text-blue-400">Uploading...</div>
                  )}
                  {form.uploadedVideoPath && (
                    <div className="mt-2 text-sm text-green-600 dark:text-green-400">
                      ✓ Upload successful
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setForm(prev => ({ ...prev, videoFile: null, uploadedVideoPath: '' }));
                      const input = document.getElementById('video-upload') as HTMLInputElement;
                      if (input) input.value = '';
                    }}
                    className="mt-2 text-sm text-red-600 hover:text-red-500 dark:text-red-400"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600 dark:text-gray-400">
                    <label
                      htmlFor="video-upload"
                      className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Upload a video</span>
                      <input
                        id="video-upload"
                        name="video-upload"
                        type="file"
                        className="sr-only"
                        accept="video/mp4,video/webm,video/quicktime"
                        onChange={handleVideoFileChange}
                        disabled={isUploadingVideo}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">MP4, WebM, or MOV up to 100MB</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting || isUploadingVideo}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting || isUploadingVideo || !form.uploadedVideoPath}
            loading={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Demo Item'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateDemoItemModal;
