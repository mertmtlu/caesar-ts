// src/pages/projects/ProjectsPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/api/api';
import { SortDirection } from '@/api/enums';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { ConfirmationModal } from '@/components/common/Modal';
import { ProgramSearchDto } from '@/api';

// Interfaces
interface ProjectListItem {
  id: string;
  name: string;
  description?: string;
  language: string;
  type: string;
  createdAt: Date;
  status: string;
  versionCount: number;
  hasVersions: boolean;
  currentVersion?: string;
  componentCount?: number;
  hasComponents?: boolean;
  newestComponentType?: string;
}

interface ProjectToDelete {
  id: string;
  name: string;
}

// Sort options configuration
interface SortOption {
  label: string;
  field: string;
  direction: SortDirection;
}

const SORT_OPTIONS: SortOption[] = [
  { label: 'Newest First', field: 'CreatedDate', direction: SortDirection._1 },
  { label: 'Oldest First', field: 'CreatedDate', direction: SortDirection._0 },
  { label: 'Name A-Z', field: 'Name', direction: SortDirection._0 },
  { label: 'Name Z-A', field: 'Name', direction: SortDirection._1 },
  { label: 'Recently Updated', field: 'UpdatedDate', direction: SortDirection._1 },
];

const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  
  // State management
  const [projects, setProjects] = useState<ProjectListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  
  // Filtering and search
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');
  const [sortField, setSortField] = useState('CreatedDate');
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection._1);
  
  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<ProjectToDelete | null>(null);

  // Load projects
  useEffect(() => {
    loadProjects();
  }, [currentPage, pageSize, sortField, sortDirection, statusFilter, languageFilter]);

  // Load projects with search when search term changes
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchTerm) {
        searchProjects();
      } else {
        loadProjects();
      }
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm]);

  const loadComponentInfo = async (projectId: string) => {
    try {
      const response = await api.uiComponents.uiComponents_GetByProgram(
        projectId,
        1, // pageNumber
        1, // pageSize - only need count and newest
        'CreatedDate', // sort by creation date
        SortDirection._1 // descending to get newest first
      );

      if (response.success && response.data) {
        const totalCount = response.data.totalCount || 0;
        const newestComponent = response.data.items?.[0];
        
        return {
          componentCount: totalCount,
          hasComponents: totalCount > 0,
          newestComponentType: newestComponent?.type || undefined
        };
      }
      
      return {
        componentCount: 0,
        hasComponents: false,
        newestComponentType: undefined
      };
    } catch (error) {
      console.error(`Failed to load component info for project ${projectId}:`, error);
      return {
        componentCount: 0,
        hasComponents: false,
        newestComponentType: undefined
      };
    }
  };

  const loadProjects = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await api.programs.programs_GetUserAccessiblePrograms(
        currentPage,
        pageSize,
        sortField,
        sortDirection
      );

      if (response.success && response.data) {
        const projectItems = response.data.items?.map(project => ({
          id: project.id || '',
          name: project.name || 'Untitled Project',
          description: project.description,
          language: project.language || 'Unknown',
          type: project.type || 'Unknown',
          createdAt: project.createdAt || new Date(),
          status: project.status || 'unknown',
          versionCount: 0, // Will be populated by version check
          hasVersions: false, // Will be populated by version check
          currentVersion: project.currentVersion,
          componentCount: 0, // Will be populated by component check
          hasComponents: false, // Will be populated by component check
          newestComponentType: undefined // Will be populated by component check
        })) || [];

        // Check versions and components for each project
        const projectsWithVersionsAndComponents = await Promise.all(
          projectItems.map(async (project) => {
            try {
              // Load versions and components in parallel
              const [versionsResponse, componentInfo] = await Promise.all([
                api.versions.versions_GetByProgram(project.id, 1, 1, 'CreatedDate', SortDirection._1),
                loadComponentInfo(project.id)
              ]);
              
              const versionCount = versionsResponse.data?.totalCount || 0;
              
              return {
                ...project,
                versionCount,
                hasVersions: versionCount > 0,
                ...componentInfo
              };
            } catch {
              return { 
                ...project, 
                versionCount: 0, 
                hasVersions: false,
                componentCount: 0,
                hasComponents: false,
                newestComponentType: undefined
              };
            }
          })
        );

        setProjects(projectsWithVersionsAndComponents);
        setTotalCount(response.data.totalCount || 0);
        setTotalPages(response.data.totalPages || 0);
      } else {
        setError(response.message || 'Failed to load projects');
      }
    } catch (error) {
      console.error('Failed to load projects:', error);
      setError('Failed to load projects. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const searchProjects = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await api.programs.programs_Search(
        currentPage,
        pageSize,
        sortField,
        sortDirection,
        new ProgramSearchDto({
          name: searchTerm,
          language: languageFilter || undefined,
          status: statusFilter || undefined
        })
      );

      if (response.success && response.data) {
        const projectItems = response.data.items?.map(project => ({
          id: project.id || '',
          name: project.name || 'Untitled Project',
          description: project.description,
          language: project.language || 'Unknown',
          type: project.type || 'Unknown',
          createdAt: project.createdAt || new Date(),
          status: project.status || 'unknown',
          versionCount: 0, // Will be populated by version check
          hasVersions: false, // Will be populated by version check
          currentVersion: project.currentVersion,
          componentCount: 0, // Will be populated by component check
          hasComponents: false, // Will be populated by component check
          newestComponentType: undefined // Will be populated by component check
        })) || [];

        // Check versions and components for search results
        const projectsWithVersionsAndComponents = await Promise.all(
          projectItems.map(async (project) => {
            try {
              // Load versions and components in parallel
              const [versionsResponse, componentInfo] = await Promise.all([
                api.versions.versions_GetByProgram(project.id, 1, 1, 'CreatedDate', SortDirection._1),
                loadComponentInfo(project.id)
              ]);
              
              const versionCount = versionsResponse.data?.totalCount || 0;
              
              return {
                ...project,
                versionCount,
                hasVersions: versionCount > 0,
                ...componentInfo
              };
            } catch {
              return { 
                ...project, 
                versionCount: 0, 
                hasVersions: false,
                componentCount: 0,
                hasComponents: false,
                newestComponentType: undefined
              };
            }
          })
        );

        setProjects(projectsWithVersionsAndComponents);
        setTotalCount(response.data.totalCount || 0);
        setTotalPages(response.data.totalPages || 0);
      }
    } catch (error) {
      console.error('Failed to search projects:', error);
      setError('Failed to search projects. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProject = (projectId: string, projectName: string) => {
    setProjectToDelete({ id: projectId, name: projectName });
    setShowDeleteModal(true);
  };

  const confirmDeleteProject = async () => {
    if (!projectToDelete) return;
    
    try {
      setIsDeleting(true);
      api.files.files_DeleteProgramFiles(projectToDelete.id);
      const response = await api.programs.programs_Delete(projectToDelete.id);
      
      if (response.success) {
        // Remove from projects list
        setProjects(prev => prev.filter(p => p.id !== projectToDelete.id));
        setTotalCount(prev => prev - 1);

        
        // Close modal and reset state
        setShowDeleteModal(false);
        setProjectToDelete(null);
        
        // If this was the last item on the current page and we're not on page 1, go to previous page
        if (projects.length === 1 && currentPage > 1) {
          setCurrentPage(prev => prev - 1);
        } else {
          // Reload the current page to get fresh data
          loadProjects();
        }
      } else {
        setError(response.message || 'Failed to delete project');
      }
    } catch (error) {
      console.error('Failed to delete project:', error);
      setError('Failed to delete project. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleExecuteProject = async (projectId: string) => {
    try {
      // Navigate to executions page with quick execution for this project
      navigate(`/executions?execute=${projectId}`);
    } catch (error) {
      console.error('Failed to execute project:', error);
      setError('Failed to execute project. Please try again.');
    }
  };

  const getStatusColor = (status: string): string => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'active') {
      return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
    }
    if (statusLower === 'draft') {
      return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
    }
    if (statusLower === 'archived') {
      return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800';
    }
    return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30';
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

  const getLanguageIcon = (language: string): React.ReactNode => {
    const lang = language.toLowerCase();
    const iconClass = "w-6 h-6 rounded";
    
    if (lang.includes('javascript') || lang.includes('js')) {
      return <div className={`${iconClass} bg-yellow-400 flex items-center justify-center text-black font-bold text-xs`}>JS</div>;
    }
    if (lang.includes('python')) {
      return <div className={`${iconClass} bg-blue-500 flex items-center justify-center text-white font-bold text-xs`}>PY</div>;
    }
    if (lang.includes('java')) {
      return <div className={`${iconClass} bg-red-500 flex items-center justify-center text-white font-bold text-xs`}>JA</div>;
    }
    if (lang.includes('c#') || lang.includes('csharp')) {
      return <div className={`${iconClass} bg-purple-500 flex items-center justify-center text-white font-bold text-xs`}>C#</div>;
    }
    
    return (
      <div className={`${iconClass} bg-gray-400 flex items-center justify-center`}>
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      </div>
    );
  };

  const getSortOptionKey = (field: string, direction: SortDirection): string => {
    return `${field}-${direction}`;
  };

  if (isLoading && projects.length === 0) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Projects
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Manage and collaborate on your programming projects
          </p>
        </div>
        
        <div className="mt-4 sm:mt-0">
          <Button
            variant="primary"
            onClick={() => navigate('/projects/create')}
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            }
          >
            New Project
          </Button>
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
                onClick={loadProjects}
                className="text-sm text-red-800 dark:text-red-200 hover:text-red-600 dark:hover:text-red-300"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            label="Search projects"
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
              Status Filter
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Language Filter
            </label>
            <select
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
              className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Languages</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="csharp">C#</option>
              <option value="go">Go</option>
              <option value="rust">Rust</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sort By
            </label>
            <select
              value={getSortOptionKey(sortField, sortDirection)}
              onChange={(e) => {
                const [field, direction] = e.target.value.split('-');
                setSortField(field);
                setSortDirection(parseInt(direction) as SortDirection);
              }}
              className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={getSortOptionKey(option.field, option.direction)} value={getSortOptionKey(option.field, option.direction)}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="flex-shrink-0">
                    {getLanguageIcon(project.language)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                      {project.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {project.language} • {project.type}
                    </p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>

              {project.description && (
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {project.description}
                </p>
              )}

              <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>{formatRelativeTime(project.createdAt)}</span>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a1.414 1.414 0 01-2.828 0l-7-7A1.414 1.414 0 0 1 3 12V7a4 4 0 014-4z" 
                      />  
                    </svg>
                    <span>{project.versionCount} version{project.versionCount !== 1 ? 's' : ''}</span>
                  </div>
                  {project.hasComponents && (
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      <span>{project.componentCount} component{project.componentCount !== 1 ? 's' : ''}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Component Type Badge */}
              {project.hasComponents && project.newestComponentType && (
                <div className="mt-3 flex items-center">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      {project.newestComponentType === 'input_form' && (
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      )}
                      {project.newestComponentType === 'visualization' && (
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z M4 5a2 2 0 012-2v6a2 2 0 01-2 2 2 2 0 01-2-2V5z M16 7a2 2 0 11-4 0 2 2 0 014 0z M8 15a2 2 0 01-2-2V9a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2H8z" />
                      )}
                      {project.newestComponentType === 'composite' && (
                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5z M5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5z M11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5z M11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      )}
                      {!['input_form', 'visualization', 'composite'].includes(project.newestComponentType) && (
                        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7z M4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1z M2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                      )}
                    </svg>
                    {project.newestComponentType.replace('_', ' ')}
                  </span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-4 space-y-2">
                {/* Primary Actions Row */}
                <div className="flex space-x-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate(`/projects/${project.id}`)}
                    className="flex-1"
                  >
                    View Details
                  </Button>
                  
                  {project.hasVersions ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/editor/${project.id}`)}
                      leftIcon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      }
                    >
                      Code
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled
                      title="Create a version first to enable code editing"
                      leftIcon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                      }
                    >
                      No Code
                    </Button>
                  )}
                </div>

                {/* Secondary Actions Row */}
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExecuteProject(project.id)}
                    className="flex-1"
                    leftIcon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h6m2 5H7a2 2 0 01-2-2V8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2z" />
                      </svg>
                    }
                    disabled={!project.hasVersions}
                    title={!project.hasVersions ? "No versions available to execute" : "Execute project"}
                  >
                    Execute
                  </Button>
                  
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteProject(project.id, project.name);
                    }}
                    leftIcon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    }
                    title={`Delete ${project.name}`}
                  >
                    Delete
                  </Button>
                </div>
              </div>

              {!project.hasVersions && (
                <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded text-xs text-yellow-700 dark:text-yellow-400">
                  This project has no versions yet. Create a version to start coding.
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {projects.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No projects found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {searchTerm || statusFilter || languageFilter ? 'Try adjusting your search criteria.' : 'Get started by creating your first project.'}
          </p>
          {!searchTerm && !statusFilter && !languageFilter && (
            <div className="mt-6">
              <Button
                variant="primary"
                onClick={() => navigate('/projects/create')}
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                }
              >
                Create Your First Project
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <div className="flex-1 flex justify-between sm:hidden">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Showing <span className="font-medium">{((currentPage - 1) * pageSize) + 1}</span> to{' '}
                <span className="font-medium">{Math.min(currentPage * pageSize, totalCount)}</span> of{' '}
                <span className="font-medium">{totalCount}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  const page = i + Math.max(1, currentPage - 2);
                  if (page > totalPages) return null;
                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? "primary" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  );
                })}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setProjectToDelete(null);
        }}
        onConfirm={confirmDeleteProject}
        title="Delete Project"
        message={
          projectToDelete 
            ? `Are you sure you want to delete "${projectToDelete.name}"? This action cannot be undone and will permanently delete all project files, versions, and execution history.`
            : 'Are you sure you want to delete this project?'
        }
        confirmText="Delete Project"
        cancelText="Cancel"
        variant="danger"
        loading={isDeleting}
      />
    </div>
  );
};

export default ProjectsPage;