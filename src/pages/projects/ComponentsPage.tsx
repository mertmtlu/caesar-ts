// src/pages/projects/ComponentsPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '@/api/api';
import { SortDirection } from '@/api/enums';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { ConfirmationModal } from '@/components/common/Modal';

// Interfaces
interface ProjectInfo {
  id: string;
  name: string;
  currentVersion?: string;
}

interface ComponentItem {
  id: string;
  name: string;
  description?: string;
  type: string;
  status: string;
  creator: string;
  creatorName?: string;
  createdAt: Date;
  programId: string;
  programName?: string;
  versionId: string;
  versionNumber?: number;
  usageCount?: number;
  tags?: string[];
}

const ComponentsPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  // State management
  const [project, setProject] = useState<ProjectInfo | null>(null);
  const [components, setComponents] = useState<ComponentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  // Delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [componentToDelete, setComponentToDelete] = useState<ComponentItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20);
  const [totalComponents, setTotalComponents] = useState(0);

  useEffect(() => {
    if (projectId) {
      loadProjectInfo();
      loadComponents();
    }
  }, [projectId, currentPage, searchTerm, typeFilter, statusFilter]);

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

  const loadComponents = async () => {
    if (!projectId) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await api.uiComponents.uiComponents_GetByProgram(
        projectId,
        currentPage,
        pageSize,
        'CreatedDate',
        SortDirection._1 // Descending - newest first
      );

      if (response.success && response.data) {
        const componentItems: ComponentItem[] = response.data.items?.map(component => ({
          id: component.id || '',
          name: component.name || 'Untitled Component',
          description: component.description,
          type: component.type || 'unknown',
          status: component.status || 'draft',
          creator: component.creator || '',
          creatorName: component.creatorName,
          createdAt: component.createdAt || new Date(),
          programId: component.programId || projectId,
          programName: component.programName,
          versionId: component.versionId || '',
          versionNumber: component.versionNumber,
          usageCount: component.usageCount || 0,
          tags: component.tags || []
        })) || [];

        setComponents(componentItems);
        setTotalComponents(response.data.totalCount || 0);
      } else {
        setError(response.message || 'Failed to load components');
      }
    } catch (error) {
      console.error('Failed to load components:', error);
      setError('Failed to load components. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteComponent = async (component: ComponentItem) => {
    setComponentToDelete(component);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!componentToDelete) return;

    try {
      setIsDeleting(true);
      
      const response = await api.uiComponents.uiComponents_Delete(componentToDelete.id);
      
      if (response.success) {
        setShowDeleteModal(false);
        setComponentToDelete(null);
        loadComponents(); // Reload the list
      } else {
        setError(response.message || 'Failed to delete component');
      }
    } catch (error) {
      console.error('Failed to delete component:', error);
      setError('Failed to delete component. Please try again.');
    } finally {
      setIsDeleting(false);
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
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'visualization':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z M4 5a2 2 0 012-2v6a2 2 0 01-2 2 2 2 0 01-2-2V5z M16 7a2 2 0 11-4 0 2 2 0 014 0z M8 15a2 2 0 01-2-2V9a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2H8z" />
          </svg>
        );
      case 'composite':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5z M5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5z M11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5z M11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7z M4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1z M2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
          </svg>
        );
    }
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

  const filteredComponents = components.filter(component => {
    const matchesSearch = !searchTerm || 
      component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = !typeFilter || component.type === typeFilter;
    const matchesStatus = !statusFilter || component.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  if (isLoading && components.length === 0) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
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
          <span className="text-gray-900 dark:text-white">Components</span>
        </nav>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Components
            </h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              Manage UI components for {project?.name}
            </p>
          </div>
          
          <div className="mt-4 sm:mt-0">
            <Button
              variant="primary"
              onClick={() => navigate(`/projects/${projectId}/components/create`)}
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              }
            >
              Create Component
            </Button>
          </div>
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
            <div className="ml-auto pl-3">
              <button
                onClick={() => setError(null)}
                className="text-sm text-red-800 dark:text-red-200 hover:text-red-600 dark:hover:text-red-300"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Search components"
            placeholder="Search by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Type Filter
            </label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Types</option>
              <option value="input_form">Input Form</option>
              <option value="visualization">Visualization</option>
              <option value="composite">Composite</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status Filter
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="deprecated">Deprecated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Components List */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700">
        {filteredComponents.length > 0 ? (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredComponents.map((component) => (
              <div key={component.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      {getTypeIcon(component.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                          {component.name}
                        </h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(component.status)}`}>
                          {component.status}
                        </span>
                      </div>
                      {component.description && (
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {component.description}
                        </p>
                      )}
                      <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a1.414 1.414 0 01-2.828 0l-7-7A1.414 1.414 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                          {component.type.replace('_', ' ')}
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {formatRelativeTime(component.createdAt)}
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                          {component.usageCount} uses
                        </span>
                      </div>
                      {component.tags && component.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {component.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/projects/${projectId}/components/${component.id}`)}
                    >
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/projects/${projectId}/components/${component.id}/edit`)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteComponent(component)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No components found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {searchTerm || typeFilter || statusFilter ? 'Try adjusting your search criteria.' : 'Create your first component to get started.'}
            </p>
            {!searchTerm && !typeFilter && !statusFilter && (
              <div className="mt-6">
                <Button
                  variant="primary"
                  onClick={() => navigate(`/projects/${projectId}/components/create`)}
                  leftIcon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  }
                >
                  Create Your First Component
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title={`Delete ${componentToDelete?.name}`}
        message={
          componentToDelete 
            ? `Are you sure you want to delete "${componentToDelete.name}"? This action cannot be undone.`
            : 'Are you sure you want to delete this component?'
        }
        confirmText="Delete Component"
        cancelText="Cancel"
        loading={isDeleting}
        variant="danger"
      />
    </div>
  );
};

export default ComponentsPage;