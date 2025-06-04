// src/pages/projects/ProjectsPage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/api/api';
import { SortDirection } from '@/api/enums';
import { ProgramSearchDto } from '@/api';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import Modal, { ConfirmationModal } from '@/components/common/Modal';

// Types
interface Project {
  id: string;
  name: string;
  description?: string;
  type: string;
  language: string;
  uiType: string;
  creator: string;
  createdAt: Date;
  status: string;
  currentVersion?: string;
  deploymentType?: string;
  deploymentStatus?: string;
}

interface ProjectFilters {
  search: string;
  language: string;
  type: string;
  status: string;
  creator: string;
}

interface PaginationInfo {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  // State management
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortField, setSortField] = useState('createdDate');
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection._1); // Descending
  
  // Filters
  const [filters, setFilters] = useState<ProjectFilters>({
    search: searchParams.get('search') || '',
    language: searchParams.get('language') || '',
    type: searchParams.get('type') || '',
    status: searchParams.get('status') || '',
    creator: searchParams.get('creator') || ''
  });

  // Pagination
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: parseInt(searchParams.get('page') || '1'),
    pageSize: parseInt(searchParams.get('pageSize') || '12'),
    totalPages: 0,
    totalCount: 0,
    hasNextPage: false,
    hasPreviousPage: false
  });

  // Modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Available filter options (these could come from API)
  const languageOptions = ['All', 'JavaScript', 'Python', 'Java', 'C#', 'TypeScript', 'Go', 'Rust'];
  const typeOptions = ['All', 'Web', 'API', 'Console', 'Mobile', 'Desktop'];
  const statusOptions = ['All', 'Draft', 'Active', 'Archived', 'Deprecated'];

  // Load projects
  const loadProjects = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      let response;

      // Check if we have active filters (excluding empty/default values)
      const hasActiveFilters = filters.search || 
        (filters.language && filters.language !== 'All') ||
        (filters.type && filters.type !== 'All') ||
        (filters.status && filters.status !== 'All') ||
        (filters.creator && filters.creator !== 'All');

      if (hasActiveFilters) {
        // Use search endpoint with filters
        const searchDto = new ProgramSearchDto({
          name: filters.search || undefined,
          language: filters.language && filters.language !== 'All' ? filters.language : undefined,
          type: filters.type && filters.type !== 'All' ? filters.type : undefined,
          status: filters.status && filters.status !== 'All' ? filters.status : undefined,
          creator: filters.creator && filters.creator !== 'All' ? filters.creator : undefined
        });

        response = await api.programs.programs_Search(
          pagination.currentPage,
          pagination.pageSize,
          sortField,
          sortDirection,
          searchDto
        );
      } else {
        // Use regular get all endpoint
        response = await api.programs.programs_GetUserAccessiblePrograms(
          pagination.currentPage,
          pagination.pageSize,
          sortField,
          sortDirection
        );
      }

      if (response.success && response.data?.items) {
        const projectData = response.data.items.map(item => ({
          id: item.id || '',
          name: item.name || 'Untitled Project',
          description: item.description,
          type: item.type || 'Unknown',
          language: item.language || 'Unknown',
          uiType: item.uiType || 'Unknown',
          creator: item.creator || 'Unknown',
          createdAt: item.createdAt || new Date(),
          status: item.status || 'Unknown',
          currentVersion: item.currentVersion,
          deploymentType: item.deploymentType?.toString(),
          deploymentStatus: item.deploymentStatus
        }));

        setProjects(projectData);
        setPagination(prev => ({
          ...prev,
          totalPages: response.data?.totalPages || 0,
          totalCount: response.data?.totalCount || 0,
          hasNextPage: response.data?.hasNextPage || false,
          hasPreviousPage: response.data?.hasPreviousPage || false
        }));
      } else {
        setError(response.message || 'Failed to load projects');
      }
    } catch (error) {
      console.error('Failed to load projects:', error);
      setError('Failed to load projects. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [filters, pagination.currentPage, pagination.pageSize, sortField, sortDirection]);

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (filters.search) params.set('search', filters.search);
    if (filters.language && filters.language !== 'All') params.set('language', filters.language);
    if (filters.type && filters.type !== 'All') params.set('type', filters.type);
    if (filters.status && filters.status !== 'All') params.set('status', filters.status);
    if (filters.creator && filters.creator !== 'All') params.set('creator', filters.creator);
    if (pagination.currentPage > 1) params.set('page', pagination.currentPage.toString());
    if (pagination.pageSize !== 12) params.set('pageSize', pagination.pageSize.toString());

    setSearchParams(params);
  }, [filters, pagination.currentPage, pagination.pageSize, setSearchParams]);

  // Load projects when dependencies change
  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  // Filter handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
    setPagination(prev => ({ ...prev, currentPage: 1 })); // Reset to first page
  };

  const handleFilterChange = (key: keyof ProjectFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, currentPage: 1 })); // Reset to first page
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      language: '',
      type: '',
      status: '',
      creator: ''
    });
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  // Sorting handlers
  const handleSort = (field: string) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(prev => prev === SortDirection._0 ? SortDirection._1 : SortDirection._0);
    } else {
      // New field, default to descending
      setSortField(field);
      setSortDirection(SortDirection._1);
    }
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  // Pagination handlers
  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  const handlePageSizeChange = (pageSize: number) => {
    setPagination(prev => ({ ...prev, pageSize, currentPage: 1 }));
  };

  // Project actions
  const handleDeleteProject = async () => {
    if (!projectToDelete) return;

    setIsDeleting(true);
    try {
      const response = await api.programs.programs_Delete(projectToDelete.id);
      
      if (response.success) {
        // Remove from local state
        setProjects(prev => prev.filter(p => p.id !== projectToDelete.id));
        setShowDeleteModal(false);
        setProjectToDelete(null);
        
        // Show success message (you can implement toast notifications)
        if ((window as any).addToast) {
          (window as any).addToast({
            type: 'success',
            title: 'Project deleted successfully'
          });
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

  const confirmDeleteProject = (project: Project) => {
    setProjectToDelete(project);
    setShowDeleteModal(true);
  };

  // Utility functions
  const getLanguageIcon = (language: string): React.ReactNode => {
    const lang = language.toLowerCase();
    const iconClass = "w-4 h-4";
    
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

  const getStatusColor = (status: string): string => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'active') return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
    if (statusLower === 'draft') return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
    if (statusLower === 'archived') return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800';
    if (statusLower === 'deprecated') return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
    return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800';
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  // Render functions
  const renderProjectCard = (project: Project) => (
    <div
      key={project.id}
      className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => navigate(`/projects/${project.id}`)}
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
          
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
              {project.status}
            </span>
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // You can implement a dropdown menu here
                }}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {project.description || 'No description provided'}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Created {formatDate(project.createdAt)}</span>
          <span>by {project.creator}</span>
        </div>

        <div className="mt-4 flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/editor/${project.id}`);
            }}
            leftIcon={
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            }
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              confirmDeleteProject(project);
            }}
            leftIcon={
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            }
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );

  const renderProjectRow = (project: Project) => (
    <tr
      key={project.id}
      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer"
      onClick={() => navigate(`/projects/${project.id}`)}
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 mr-3">
            {getLanguageIcon(project.language)}
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {project.name}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {project.description}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
        {project.language}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
        {project.type}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
          {project.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
        {formatDate(project.createdAt)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
        {project.creator}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center space-x-2">
          <Button
            size="xs"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/editor/${project.id}`);
            }}
          >
            Edit
          </Button>
          <Button
            size="xs"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              confirmDeleteProject(project);
            }}
          >
            Delete
          </Button>
        </div>
      </td>
    </tr>
  );

  const renderPagination = () => (
    <div className="flex items-center justify-between">
      <div className="flex-1 flex justify-between sm:hidden">
        <Button
          variant="outline"
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={!pagination.hasPreviousPage}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={!pagination.hasNextPage}
        >
          Next
        </Button>
      </div>
      
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Showing{' '}
            <span className="font-medium">
              {((pagination.currentPage - 1) * pagination.pageSize) + 1}
            </span>{' '}
            to{' '}
            <span className="font-medium">
              {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalCount)}
            </span>{' '}
            of{' '}
            <span className="font-medium">{pagination.totalCount}</span>{' '}
            results
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={pagination.pageSize}
            onChange={(e) => handlePageSizeChange(parseInt(e.target.value))}
            className="text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value={6}>6 per page</option>
            <option value={12}>12 per page</option>
            <option value={24}>24 per page</option>
            <option value={48}>48 per page</option>
          </select>
          
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={!pagination.hasPreviousPage}
            >
              Previous
            </Button>
            
            {/* Page numbers */}
            {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
              const pageNumber = i + 1;
              const isActive = pageNumber === pagination.currentPage;
              
              return (
                <Button
                  key={pageNumber}
                  size="sm"
                  variant={isActive ? "primary" : "outline"}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </Button>
              );
            })}
            
            <Button
              size="sm"
              variant="outline"
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={!pagination.hasNextPage}
            >
              Next
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Projects
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Manage and browse your programming projects
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
            Create Project
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <Input
              placeholder="Search projects..."
              value={filters.search}
              onChange={handleSearchChange}
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
            />
          </div>
          
          <select
            value={filters.language}
            onChange={(e) => handleFilterChange('language', e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
          >
            {languageOptions.map(lang => (
              <option key={lang} value={lang === 'All' ? '' : lang}>{lang}</option>
            ))}
          </select>
          
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
          >
            {typeOptions.map(type => (
              <option key={type} value={type === 'All' ? '' : type}>{type}</option>
            ))}
          </select>
          
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
          >
            {statusOptions.map(status => (
              <option key={status} value={status === 'All' ? '' : status}>{status}</option>
            ))}
          </select>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              size="sm"
              variant="ghost"
              onClick={clearFilters}
            >
              Clear filters
            </Button>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Sort by:</span>
              <select
                value={sortField}
                onChange={(e) => handleSort(e.target.value)}
                className="text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-2 py-1"
              >
                <option value="name">Name</option>
                <option value="createdDate">Created Date</option>
                <option value="status">Status</option>
                <option value="language">Language</option>
              </select>
              
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSortDirection(prev => prev === SortDirection._0 ? SortDirection._1 : SortDirection._0)}
              >
                {sortDirection === SortDirection._0 ? '↑' : '↓'}
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant={viewMode === 'grid' ? 'primary' : 'ghost'}
              onClick={() => setViewMode('grid')}
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              }
            >
              Grid
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'list' ? 'primary' : 'ghost'}
              onClick={() => setViewMode('list')}
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              }
            >
              List
            </Button>
          </div>
        </div>
      </div>

      {/* Error message */}
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

      {/* Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-200 dark:bg-gray-700 h-48 rounded-lg"></div>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No projects found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {Object.values(filters).some(v => v) ? 'Try adjusting your filters or search terms.' : 'Get started by creating your first project.'}
          </p>
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
              Create Project
            </Button>
          </div>
        </div>
      ) : (
        <>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(renderProjectCard)}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('name')}
                    >
                      Project
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('language')}
                    >
                      Language
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('type')}
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('status')}
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('createdDate')}
                    >
                      Created
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Creator
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {projects.map(renderProjectRow)}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="mt-6">
              {renderPagination()}
            </div>
          )}
        </>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteProject}
        title="Delete Project"
        message={`Are you sure you want to delete "${projectToDelete?.name}"? This action cannot be undone and will permanently delete all associated files and data.`}
        confirmText="Delete Project"
        cancelText="Cancel"
        variant="danger"
        loading={isDeleting}
      />
    </div>
  );
};

export default ProjectsPage;