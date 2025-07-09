// src/pages/projects/CreateComponentPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '@/api/api';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { UiComponentCreateDto } from '@/api';

// Interfaces
interface ProjectInfo {
  id: string;
  name: string;
  currentVersion?: string;
}

interface ComponentForm {
  name: string;
  description: string;
  type: string;
  tags: string;
}

const CreateComponentPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  // State management
  const [project, setProject] = useState<ProjectInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [form, setForm] = useState<ComponentForm>({
    name: '',
    description: '',
    type: 'input_form',
    tags: ''
  });

  const [formErrors, setFormErrors] = useState<Partial<ComponentForm>>({});

  useEffect(() => {
    if (projectId) {
      loadProjectInfo();
    }
  }, [projectId]);

  const loadProjectInfo = async () => {
    if (!projectId) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await api.programs.programs_GetById(projectId);
      
      if (response.success && response.data) {
        setProject({
          id: response.data.id || '',
          name: response.data.name || 'Unknown Project',
          currentVersion: response.data.currentVersion
        });
      } else {
        setError(response.message || 'Failed to load project details');
      }
    } catch (error) {
      console.error('Failed to load project:', error);
      setError('Failed to load project details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<ComponentForm> = {};

    if (!form.name.trim()) {
      errors.name = 'Component name is required';
    } else if (form.name.length < 3) {
      errors.name = 'Component name must be at least 3 characters';
    }

    if (!form.description.trim()) {
      errors.description = 'Description is required';
    }

    if (!form.type) {
      errors.type = 'Component type is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !projectId || !project?.currentVersion) {
      return;
    }

    try {
      setIsCreating(true);
      setError(null);

      const componentData = new UiComponentCreateDto({
        name: form.name.trim(),
        description: form.description.trim(),
        type: form.type,
        tags: form.tags ? form.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : undefined
      });

      const response = await api.uiComponents.uiComponents_Create(
        projectId,
        project.currentVersion,
        componentData
      );

      if (response.success) {
        // Navigate back to project components page
        navigate(`/projects/${projectId}/components`);
      } else {
        setError(response.message || 'Failed to create component');
      }
    } catch (error) {
      console.error('Failed to create component:', error);
      setError('Failed to create component. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleInputChange = (field: keyof ComponentForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Project not found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            The project you're looking for doesn't exist or you don't have access to it.
          </p>
          <div className="mt-6">
            <Button variant="outline" onClick={() => navigate('/projects')}>
              Back to Projects
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <button onClick={() => navigate('/projects')} className="hover:text-gray-700 dark:hover:text-gray-200">
            Projects
          </button>
          <span>/</span>
          <button onClick={() => navigate(`/projects/${projectId}`)} className="hover:text-gray-700 dark:hover:text-gray-200">
            {project.name}
          </button>
          <span>/</span>
          <span className="text-gray-900 dark:text-white">Create Component</span>
        </nav>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Create New Component
            </h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              Create a new UI component for {project.name}
            </p>
          </div>
          
          <Button
            variant="outline"
            onClick={() => navigate(`/projects/${projectId}/components/designer`)}
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            }
          >
            Use Visual Designer
          </Button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4 mb-6">
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

      {/* Component Form */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Component Name */}
          <Input
            label="Component Name"
            placeholder="Enter component name..."
            value={form.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            error={formErrors.name}
            required
          />

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe what this component does..."
              rows={3}
              className={`block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                formErrors.description ? 'border-red-500' : ''
              }`}
            />
            {formErrors.description && (
              <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>
            )}
          </div>

          {/* Component Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Component Type
            </label>
            <select
              value={form.type}
              onChange={(e) => handleInputChange('type', e.target.value)}
              className={`block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                formErrors.type ? 'border-red-500' : ''
              }`}
            >
              <option value="input_form">Input Form</option>
              <option value="visualization">Visualization</option>
              <option value="composite">Composite</option>
              <option value="other">Other</option>
            </select>
            {formErrors.type && (
              <p className="mt-1 text-sm text-red-600">{formErrors.type}</p>
            )}
          </div>

          {/* Tags */}
          <Input
            label="Tags (optional)"
            placeholder="Enter tags separated by commas..."
            value={form.tags}
            onChange={(e) => handleInputChange('tags', e.target.value)}
            error={formErrors.tags}
            helpText="Separate multiple tags with commas"
          />

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-600">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(`/projects/${projectId}`)}
              disabled={isCreating}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={isCreating}
              disabled={isCreating}
            >
              Create Component
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateComponentPage;