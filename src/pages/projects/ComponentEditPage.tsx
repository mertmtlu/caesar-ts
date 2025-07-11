import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '@/api/api';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { UiComponentUpdateDto } from '@/api';

// Interfaces
interface ProjectInfo {
  id: string;
  name: string;
  currentVersion?: string;
}

interface ComponentDetail {
  id: string;
  name: string;
  description?: string;
  type: string;
  status: string;
  creator: string;
  creatorName?: string;
  createdAt: Date;
  updatedAt?: Date;
  programId: string;
  programName?: string;
  versionId: string;
  versionNumber?: number;
  usageCount?: number;
  tags?: string[];
  schema?: any;
}

interface ComponentForm {
  name: string;
  description: string;
  type: string;
  status: string;
  tags: string;
}

const ComponentEditPage: React.FC = () => {
  const { projectId, componentId } = useParams<{ projectId: string; componentId: string }>();
  const navigate = useNavigate();

  // State management
  const [project, setProject] = useState<ProjectInfo | null>(null);
  const [component, setComponent] = useState<ComponentDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  // Form state
  const [form, setForm] = useState<ComponentForm>({
    name: '',
    description: '',
    type: 'input_form',
    status: 'draft',
    tags: ''
  });


  useEffect(() => {
    if (projectId && componentId) {
      loadProjectInfo();
      loadComponentDetail();
    }
  }, [projectId, componentId]);

  useEffect(() => {
    if (component) {
      const newForm = {
        name: component.name,
        description: component.description || '',
        type: component.type,
        status: component.status,
        tags: component.tags?.join(', ') || ''
      };
      setForm(newForm);
    }
  }, [component]);

  const loadProjectInfo = async () => {
    if (!projectId) return;

    try {
      const response = await api.programs.programs_GetById(projectId);
      
      if (response.success && response.data) {
        setProject({
          id: response.data.id || '',
          name: response.data.name || 'Unknown Project',
          currentVersion: response.data.currentVersion
        });
      }
    } catch (error) {
      console.error('Failed to load project:', error);
    }
  };

  const loadComponentDetail = async () => {
    if (!componentId) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await api.uiComponents.uiComponents_GetById(componentId);

      if (response.success && response.data) {
        const data = response.data;
        
        setComponent({
          id: data.id || '',
          name: data.name || 'Untitled Component',
          description: data.description,
          type: data.type || 'input_form',
          status: data.status || 'draft',
          creator: data.creator || '',
          creatorName: data.creatorName,
          createdAt: data.createdAt || new Date(),
          updatedAt: data.createdAt, // Use createdAt as fallback for updatedAt
          programId: data.programId || projectId || '',
          programName: undefined, // Not available in API
          versionId: data.versionId || '',
          versionNumber: undefined, // Not available in API
          usageCount: 0, // Not available in API
          tags: data.tags || [],
          schema: data.configuration
        });
      } else {
        setError(response.message || 'Failed to load component details');
      }
    } catch (error) {
      console.error('Failed to load component details:', error);
      setError('Failed to load component details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  const handleInputChange = (field: keyof ComponentForm, value: string) => {
    setForm(prev => {
      const newForm = { ...prev, [field]: value };
      
      // Check if there are changes
      if (component) {
        const originalForm = {
          name: component.name,
          description: component.description || '',
          type: component.type,
          status: component.status,
          tags: component.tags?.join(', ') || ''
        };
        
        const hasChanges = Object.keys(newForm).some(key => 
          newForm[key as keyof ComponentForm] !== originalForm[key as keyof ComponentForm]
        );
        setHasChanges(hasChanges);
      }
      
      return newForm;
    });
  };

  const handleSave = async () => {
    if (!component || !form.name.trim()) {
      setError('Component name is required.');
      return;
    }

    try {
      setIsSaving(true);
      setError(null);

      // Parse tags
      const tags = form.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      const updateDto = new UiComponentUpdateDto({
        name: form.name.trim(),
        description: form.description.trim() || undefined,
        type: form.type,
        tags: tags.length > 0 ? tags : undefined
      });

      const response = await api.uiComponents.uiComponents_Update(component.id, updateDto);

      if (response.success) {
        setHasChanges(false);
        navigate(`/projects/${projectId}/components/${component.id}`);
      } else {
        setError(response.message || 'Failed to update component');
      }
    } catch (error) {
      console.error('Failed to update component:', error);
      setError('Failed to update component. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (hasChanges) {
      const confirmed = window.confirm('You have unsaved changes. Are you sure you want to leave?');
      if (!confirmed) return;
    }
    navigate(`/projects/${projectId}/components/${componentId}`);
  };

  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
      case 'draft':
        return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
      case 'deprecated':
        return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
      default:
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (error && !component) {
    return (
      <div className="p-6">
        <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Error</h3>
              <p className="mt-1 text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
            <div className="ml-auto pl-3">
              <button
                onClick={() => navigate(`/projects/${projectId}/components`)}
                className="text-sm text-red-800 dark:text-red-200 hover:text-red-600 dark:hover:text-red-300"
              >
                Back to Components
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!component) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Component not found</h3>
          <p className="mt-1 text-gray-500 dark:text-gray-400">The component you're looking for doesn't exist.</p>
          <div className="mt-4">
            <Button variant="primary" onClick={() => navigate(`/projects/${projectId}/components`)}>
              Back to Components
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <button onClick={() => navigate('/projects')} className="hover:text-gray-700 dark:hover:text-gray-200">
            Projects
          </button>
          <span>/</span>
          <button onClick={() => navigate(`/projects/${projectId}`)} className="hover:text-gray-700 dark:hover:text-gray-200">
            {project?.name || 'Project'}
          </button>
          <span>/</span>
          <button onClick={() => navigate(`/projects/${projectId}/components`)} className="hover:text-gray-700 dark:hover:text-gray-200">
            Components
          </button>
          <span>/</span>
          <button onClick={() => navigate(`/projects/${projectId}/components/${componentId}`)} className="hover:text-gray-700 dark:hover:text-gray-200">
            {component.name}
          </button>
          <span>/</span>
          <span className="text-gray-900 dark:text-white">Edit</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Edit Component
            </h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              Modify the properties and settings for {component.name}
            </p>
          </div>
          
          <div className="mt-4 sm:mt-0 flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={() => navigate(`/projects/${projectId}/components/${componentId}/designer`)}
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              }
            >
              Visual Designer
            </Button>
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
              loading={isSaving}
              disabled={!hasChanges || !form.name.trim()}
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              }
            >
              Save Changes
            </Button>
          </div>
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
                onClick={() => setError(null)}
                className="text-red-800 dark:text-red-200 hover:text-red-600 dark:hover:text-red-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Form */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Component Properties</h2>
        
        <div className="space-y-6">
          {/* Component Name */}
          <Input
            label="Component Name"
            placeholder="Enter component name"
            value={form.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a1.414 1.414 0 01-2.828 0l-7-7A1.414 1.414 0 013 12V7a4 4 0 014-4z" />
              </svg>
            }
          />

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              placeholder="Enter component description (optional)"
              value={form.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Type and Status Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Component Type
              </label>
              <select
                id="type"
                value={form.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
                className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="input_form">Input Form</option>
                <option value="visualization">Visualization</option>
                <option value="composite">Composite</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select
                id="status"
                value={form.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="deprecated">Deprecated</option>
              </select>
              <div className="mt-1">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(form.status)}`}>
                  {form.status}
                </span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <Input
            label="Tags"
            placeholder="Enter tags separated by commas (e.g., ui, form, input)"
            value={form.tags}
            onChange={(e) => handleInputChange('tags', e.target.value)}
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a1.414 1.414 0 01-2.828 0l-7-7A1.414 1.414 0 013 12V7a4 4 0 014-4z" />
              </svg>
            }
            helperText="Separate multiple tags with commas"
          />

          {/* Preview Tags */}
          {form.tags && (
            <div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Tag Preview:</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {form.tags.split(',').map((tag, index) => {
                  const trimmedTag = tag.trim();
                  if (!trimmedTag) return null;
                  return (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                    >
                      {trimmedTag}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Component Info (Read-only) */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Component Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-500 dark:text-gray-400">Creator:</span>
            <p className="text-gray-900 dark:text-white">{component.creatorName || component.creator}</p>
          </div>
          <div>
            <span className="font-medium text-gray-500 dark:text-gray-400">Created:</span>
            <p className="text-gray-900 dark:text-white">
              {new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              }).format(component.createdAt)}
            </p>
          </div>
          <div>
            <span className="font-medium text-gray-500 dark:text-gray-400">Usage Count:</span>
            <p className="text-gray-900 dark:text-white">{component.usageCount}</p>
          </div>
          {component.versionNumber && (
            <div>
              <span className="font-medium text-gray-500 dark:text-gray-400">Version:</span>
              <p className="text-gray-900 dark:text-white">v{component.versionNumber}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComponentEditPage;