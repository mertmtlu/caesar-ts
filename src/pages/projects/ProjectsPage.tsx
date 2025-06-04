// src/pages/projects/ProjectsPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '@/api/api';
import { SortDirection } from '@/api/enums';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { ProgramSearchDto } from '@/api';

// Interfaces
interface ProjectListItem {
  id: string;
  name: string;
  description?: string;
  language: string;
  type: string;
  creator: string;
  createdAt: Date;
  status: string;
  currentVersion?: string;
  deploymentStatus?: string;
  hasVersions: boolean; // We'll determine this
  versionCount: number;
}

// Sort options
interface SortOption {
  label: string;
  field: string;
  direction: SortDirection;
}

const SORT_OPTIONS: SortOption[] = [
  { label: 'Recently Created', field: 'CreatedDate', direction: SortDirection._1 },
  { label: 'Oldest First', field: 'CreatedDate', direction: SortDirection._0 },
  { label: 'Recently Updated', field: 'UpdatedDate', direction: SortDirection._1 },
  { label: 'Name A-Z', field: 'Name', direction: SortDirection._0 },
  { label: 'Name Z-A', field: 'Name', direction: SortDirection._1 },
];

const getSortOptionKey = (field: string, direction: SortDirection): string => {
  return `${field}-${direction}`;
};

const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  
  // State management
  const [projects, setProjects] = useState<ProjectListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  
  // Filtering and search
  const [searchTerm, setSearchTerm] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortField, setSortField] = useState('CreatedDate');
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection._1);
  
  // Available filter options
  const [availableLanguages, setAvailableLanguages] = useState<string[]>([]);
  const [availableStatuses] = useState(['draft', 'active', 'archived', 'deprecated']);

  useEffect(() => {
    loadProjects();
  }, [currentPage, pageSize, sortField, sortDirection, languageFilter, statusFilter]);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchTerm || currentPage !== 1) {
        setCurrentPage(1);
        searchProjects();
      } else {
        loadProjects();
      }
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm]);

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
        const projectItems = await Promise.all(
          (response.data.items || []).map(async (project) => {
            // Check if project has versions
            let hasVersions = false;
            let versionCount = 0;
            
            try {
              const versionsResponse = await api.versions.versions_GetByProgram(
                project.id || '', 
                1, 
                1, 
                'CreatedDate', 
                SortDirection._1
              );
              
              if (versionsResponse.success && versionsResponse.data) {
                versionCount = versionsResponse.data.totalCount || 0;
                hasVersions = versionCount > 0;
              }
            } catch (error) {
              console.warn(`Failed to check versions for project ${project.id}:`, error);
            }

            return {
              id: project.id || '',
              name: project.name || 'Untitled Project',
              description: project.description,
              language: project.language || 'Unknown',
              type: project.type || 'Unknown',
              creator: project.creator || 'Unknown',
              createdAt: project.createdAt || new Date(),
              status: project.status || 'draft',
              currentVersion: project.currentVersion,
              deploymentStatus: project.deploymentStatus,
              hasVersions,
              versionCount
            };
          })
        );

        setProjects(projectItems);
        setTotalCount(response.data.totalCount || 0);
        setTotalPages(response.data.totalPages || 0);

        // Extract unique languages for filter
        const languages = [...new Set(projectItems.map(p => p.language))].filter(Boolean);
        setAvailableLanguages(languages);
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

      const searchDto = new ProgramSearchDto({
        name: searchTerm || undefined,
        language: languageFilter || undefined,
        status: statusFilter || undefined
      });

      const response = await api.programs.programs_Search(
        currentPage,
        pageSize,
        sortField,
        sortDirection,
        searchDto
      );

      if (response.success && response.data) {
        const projectItems = await Promise.all(
          (response.data.items || []).map(async (project) => {
            let hasVersions = false;
            let versionCount = 0;
            
            try {
              const versionsResponse = await api.versions.versions_GetByProgram(
                project.id || '', 
                1, 
                1, 
                'CreatedDate', 
                SortDirection._1
              );
              
              if (versionsResponse.success && versionsResponse.data) {
                versionCount = versionsResponse.data.totalCount || 0;
                hasVersions = versionCount > 0;
              }
            } catch (error) {
              console.warn(`Failed to check versions for project ${project.id}:`, error);
            }

            return {
              id: project.id || '',
              name: project.name || 'Untitled Project',
              description: project.description,
              language: project.language || 'Unknown',
              type: project.type || 'Unknown',
              creator: project.creator || 'Unknown',
              createdAt: project.createdAt || new Date(),
              status: project.status || 'draft',
              currentVersion: project.currentVersion,
              deploymentStatus: project.deploymentStatus,
              hasVersions,
              versionCount
            };
          })
        );

        setProjects(projectItems);
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
    if (statusLower === 'deprecated') {
      return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
    }
    return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30';
  };

  const getLanguageIcon = (language: string): React.ReactNode => {
    const lang = language.toLowerCase();
    const iconClass = "w-5 h-5";
    
    if (lang.includes('javascript') || lang.includes('js')) {
      return <div className={`${iconClass} bg-yellow-400 rounded`}></div>;
    }
    if (lang.includes('python')) {
      return <div className={`${iconClass} bg-blue-500 rounded`}></div>;
    }
    if (lang.includes('java')) {
      return <div className={`${iconClass} bg-red-500 rounded`}></div>;
    }
    if (lang.includes('c#') || lang.includes('csharp')) {
      return <div className={`${iconClass} bg-purple-500 rounded`}></div>;
    }
    
    return (
      <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    );
  };

  const formatRelativeTime = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffMinutes > 0) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  if (isLoading && projects.length === 0) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
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
            Manage your programming projects and code repositories
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
              Language
            </label>
            <select
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
              className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Languages</option>
              {availableLanguages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Statuses</option>
              {availableStatuses.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
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
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a1.414 1.414 0 01-2.828 0l-7-7A1.414 1.414 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <span>{project.versionCount} version{project.versionCount !== 1 ? 's' : ''}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex space-x-2">
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
            {searchTerm || languageFilter || statusFilter ? 'Try adjusting your search criteria.' : 'Get started by creating your first project.'}
          </p>
          {!searchTerm && !languageFilter && !statusFilter && (
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
    </div>
  );
};

export default ProjectsPage;