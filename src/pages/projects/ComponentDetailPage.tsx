import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '@/api/api';
import Button from '@/components/common/Button';
import { ConfirmationModal } from '@/components/common/Modal';
import PreviewPanel from '@/components/designer/PreviewPanel';
import { UIElement, LayoutConfig } from '@/types/componentDesigner';

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
  elements?: UIElement[];
  layout?: LayoutConfig;
}

const ComponentDetailPage: React.FC = () => {
  const { projectId, componentId } = useParams<{ projectId: string; componentId: string }>();
  const navigate = useNavigate();

  // State management
  const [project, setProject] = useState<ProjectInfo | null>(null);
  const [component, setComponent] = useState<ComponentDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (projectId && componentId) {
      loadProjectInfo();
      loadComponentDetail();
    }
  }, [projectId, componentId]);

  // Parse component configuration into UIElements and LayoutConfig
  const parseComponentConfiguration = (configuration: any): { elements: UIElement[], layout: LayoutConfig } => {
    if (!configuration) {
      return { 
        elements: [], 
        layout: { type: 'absolute', spacing: 10, padding: 20 }
      };
    }

    try {
      let elements: UIElement[] = [];
      let layout: LayoutConfig = {
        type: 'absolute',
        spacing: 10,
        padding: 20
      };

      // Extract elements from configuration
      if (configuration.elements && Array.isArray(configuration.elements)) {
        elements = configuration.elements;
      }

      // Extract layout from configuration
      if (configuration.layout) {
        layout = { ...layout, ...configuration.layout };
      }

      return { elements, layout };
    } catch (error) {
      console.error('Failed to parse component configuration:', error);
      return { 
        elements: [], 
        layout: { type: 'absolute', spacing: 10, padding: 20 }
      };
    }
  };

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
        const { elements, layout } = parseComponentConfiguration(data.configuration);
        
        setComponent({
          id: data.id || '',
          name: data.name || 'Untitled Component',
          description: data.description,
          type: data.type || 'unknown',
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
          schema: data.configuration, // Store configuration as schema for backward compatibility
          elements,
          layout
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

  const handleDeleteComponent = async () => {
    if (!component) return;

    try {
      setIsDeleting(true);
      
      const response = await api.uiComponents.uiComponents_Delete(component.id);
      
      if (response.success) {
        navigate(`/projects/${projectId}/components`);
      } else {
        setError(response.message || 'Failed to delete component');
      }
    } catch (error) {
      console.error('Failed to delete component:', error);
      setError('Failed to delete component. Please try again.');
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
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

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'input_form':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'visualization':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z M4 5a2 2 0 012-2v6a2 2 0 01-2 2 2 2 0 01-2-2V5z M16 7a2 2 0 11-4 0 2 2 0 014 0z M8 15a2 2 0 01-2-2V9a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2H8z" />
          </svg>
        );
      case 'composite':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5z M5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5z M11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5z M11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7z M4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1z M2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
          </svg>
        );
    }
  };

  const formatDateTime = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatRelativeTime = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    if (diffMinutes > 0) return `${diffMinutes}m ago`;
    return 'Just now';
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
          <span className="text-gray-900 dark:text-white">{component.name}</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
              {getTypeIcon(component.type)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {component.name}
              </h1>
              <div className="mt-1 flex items-center space-x-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(component.status)}`}>
                  {component.status}
                </span>
                <span className="text-gray-600 dark:text-gray-400">•</span>
                <span className="text-gray-600 dark:text-gray-400">
                  {component.type.replace('_', ' ')}
                </span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 sm:mt-0 flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={() => navigate(`/projects/${projectId}/components/${component.id}/edit`)}
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              }
            >
              Edit Component
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowDeleteModal(true)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
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

      {/* Component Details */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Basic Info */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Component Information</h2>
              <div className="space-y-3">
                {component.description && (
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Description:</span>
                    <p className="text-sm text-gray-900 dark:text-white mt-1">{component.description}</p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Type:</span>
                    <p className="text-sm text-gray-900 dark:text-white">{component.type.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Status:</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(component.status)}`}>
                      {component.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Creator:</span>
                    <p className="text-sm text-gray-900 dark:text-white">{component.creatorName || component.creator}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Created:</span>
                    <p className="text-sm text-gray-900 dark:text-white">{formatDateTime(component.createdAt)}</p>
                  </div>
                  {component.updatedAt && (
                    <div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Updated:</span>
                      <p className="text-sm text-gray-900 dark:text-white">{formatDateTime(component.updatedAt)}</p>
                    </div>
                  )}
                  {component.versionNumber && (
                    <div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Version:</span>
                      <p className="text-sm text-gray-900 dark:text-white">v{component.versionNumber}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Tags */}
            {component.tags && component.tags.length > 0 && (
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Tags:</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {component.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Stats */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Usage Statistics</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Usage Count:</span>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{component.usageCount}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Updated:</span>
                <p className="text-sm text-gray-900 dark:text-white">
                  {component.updatedAt ? formatRelativeTime(component.updatedAt) : formatRelativeTime(component.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Component Preview */}
      {component.elements && component.elements.length > 0 ? (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Component Preview</h2>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <PreviewPanel 
              elements={component.elements} 
              layout={component.layout || { type: 'absolute', spacing: 10, padding: 20 }}
            />
          </div>
        </div>
      ) : component.schema ? (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Component Configuration</h2>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 overflow-auto">
            <pre className="text-sm text-gray-800 dark:text-gray-200">
              {JSON.stringify(component.schema, null, 2)}
            </pre>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            This component has a configuration but no parseable elements. It may be using an older format.
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Component Preview</h2>
          <div className="text-center py-8">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No Component Design</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              This component doesn't have any visual elements defined yet.
            </p>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteComponent}
        title={`Delete ${component.name}`}
        message={`Are you sure you want to delete "${component.name}"? This action cannot be undone.`}
        confirmText="Delete Component"
        cancelText="Cancel"
        loading={isDeleting}
        variant="danger"
      />
    </div>
  );
};

export default ComponentDetailPage;