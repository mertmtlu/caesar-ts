import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/api/api';
import { SortDirection, WorkflowStatus } from '@/api/enums';
import { WorkflowExecutionRequest, WorkflowPermissionDto } from '@/api/types';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { ConfirmationModal } from '@/components/common/Modal';
import WorkflowPermissionsModal from '@/components/workflow/WorkflowPermissionsModal';
import WorkflowImportModal from '@/components/workflow/WorkflowImportModal';
import WorkflowExportModal from '@/components/workflow/WorkflowExportModal';

interface WorkflowListItem {
  id: string;
  name: string;
  description?: string;
  creator: string;
  createdAt: Date;
  updatedAt?: Date;
  status: WorkflowStatus;
  version: number;
  nodeCount: number;
  edgeCount: number;
  executionCount: number;
  lastExecutionId?: string;
  averageExecutionTime?: string;
  isTemplate: boolean;
}

interface WorkflowToDelete {
  id: string;
  name: string;
}

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
  { label: 'Recently Updated', field: 'UpdatedAt', direction: SortDirection._1 },
];

const WorkflowsPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [workflows, setWorkflows] = useState<WorkflowListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortField, setSortField] = useState('CreatedDate');
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection._1);
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [workflowToDelete, setWorkflowToDelete] = useState<WorkflowToDelete | null>(null);
  
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowListItem | null>(null);
  
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [workflowToExport, setWorkflowToExport] = useState<WorkflowListItem | null>(null);

  useEffect(() => {
    loadWorkflows();
  }, [currentPage, pageSize, sortField, sortDirection, statusFilter]);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchTerm) {
        searchWorkflows();
      } else {
        loadWorkflows();
      }
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm]);

  const loadWorkflows = async () => {
    try {
      setIsLoading(true);
      setError(null);

      let response;
      if (statusFilter) {
        response = await api.workflows.workflows_GetByStatus(
          parseInt(statusFilter) as WorkflowStatus,
          currentPage,
          pageSize,
          sortField,
          sortDirection
        );
      } else {
        response = await api.workflows.workflows_GetAll(
          currentPage,
          pageSize,
          sortField,
          sortDirection
        );
      }

      console.log('Workflows response:', response);

      if (response.success && response.data) {
        const workflowItems = response.data.items?.map(workflow => ({
          id: workflow.id || '',
          name: workflow.name || 'Untitled Workflow',
          description: workflow.description,
          creator: workflow.creator || 'Unknown',
          createdAt: workflow.createdAt || new Date(),
          updatedAt: workflow.updatedAt,
          status: workflow.status || WorkflowStatus._0,
          version: workflow.version || 1,
          nodeCount: workflow.nodeCount || 0,
          edgeCount: workflow.edgeCount || 0,
          executionCount: workflow.executionCount || 0,
          lastExecutionId: undefined, // Not available in list DTO
          averageExecutionTime: workflow.averageExecutionTime,
          isTemplate: workflow.isTemplate || false
        })) || [];

        setWorkflows(workflowItems);
        setTotalCount(response.data.totalCount || 0);
        setTotalPages(response.data.totalPages || 0);
      } else {
        setError(response.message || 'Failed to load workflows');
      }
    } catch (error) {
      console.error('Failed to load workflows:', error);
      setError('Failed to load workflows. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const searchWorkflows = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await api.workflows.workflows_Search(
        searchTerm,
        currentPage,
        pageSize,
        sortField,
        sortDirection
      );

      if (response.success && response.data) {
        const workflowItems = response.data.items?.map(workflow => ({
          id: workflow.id || '',
          name: workflow.name || 'Untitled Workflow',
          description: workflow.description,
          creator: workflow.creator || 'Unknown',
          createdAt: workflow.createdAt || new Date(),
          updatedAt: workflow.updatedAt,
          status: workflow.status || WorkflowStatus._0,
          version: workflow.version || 1,
          nodeCount: workflow.nodeCount || 0,
          edgeCount: workflow.edgeCount || 0,
          executionCount: workflow.executionCount || 0,
          lastExecutionId: undefined, // Not available in list DTO
          averageExecutionTime: workflow.averageExecutionTime,
          isTemplate: workflow.isTemplate || false
        })) || [];

        setWorkflows(workflowItems);
        setTotalCount(response.data.totalCount || 0);
        setTotalPages(response.data.totalPages || 0);
      }
    } catch (error) {
      console.error('Failed to search workflows:', error);
      setError('Failed to search workflows. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteWorkflow = (workflowId: string, workflowName: string) => {
    setWorkflowToDelete({ id: workflowId, name: workflowName });
    setShowDeleteModal(true);
  };

  const confirmDeleteWorkflow = async () => {
    if (!workflowToDelete) return;
    
    try {
      setIsDeleting(true);
      const response = await api.workflows.workflows_Delete(workflowToDelete.id);
      
      if (response.success) {
        setWorkflows(prev => prev.filter(w => w.id !== workflowToDelete.id));
        setTotalCount(prev => prev - 1);
        setShowDeleteModal(false);
        setWorkflowToDelete(null);
        
        if (workflows.length === 1 && currentPage > 1) {
          setCurrentPage(prev => prev - 1);
        } else {
          loadWorkflows();
        }
      } else {
        setError(response.message || 'Failed to delete workflow');
      }
    } catch (error) {
      console.error('Failed to delete workflow:', error);
      setError('Failed to delete workflow. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleExecuteWorkflow = async (workflowId: string) => {
    try {
      const currentUser = localStorage.getItem('currentUser');
      let userId = "userId";
      if (currentUser) {
        try {
          const userObj = JSON.parse(currentUser);
          userId = userObj.id || userId;
        } catch (e) {
          console.error('Failed to parse currentUser from localStorage:', e);
        }
      }
    
      const workflow = new WorkflowExecutionRequest({
        workflowId: workflowId,
        userId: userId
      });

      const response = await api.workflows.workflows_Execute(workflowId, workflow);

      console.log('Execute workflow response:', response.data);
      if (response.success && response.data) {
        navigate(`/workflows/${workflowId}/execution/${response.data._ID}`);
      } else {
        setError(response.message || 'Failed to execute workflow');
      }
    } catch (error) {
      console.error('Failed to execute workflow:', error);
      setError('Failed to execute workflow. Please try again.');
    }
  };

  const handleShareWorkflow = (workflow: WorkflowListItem) => {
    setSelectedWorkflow(workflow);
    setShowPermissionsModal(true);
  };

  const handlePermissionsUpdated = (permissions: WorkflowPermissionDto) => {
    // Optionally refresh the workflows list or update local state
    console.log('Permissions updated:', permissions);
  };

  const handleImportSuccess = (importedWorkflow: any) => {
    // Refresh the workflows list to show the newly imported workflow
    loadWorkflows();
    // Optionally navigate to the imported workflow
    navigate(`/workflows/${importedWorkflow.id}`);
  };

  const handleExportWorkflow = (workflow: WorkflowListItem) => {
    setWorkflowToExport(workflow);
    setShowExportModal(true);
  };

  const getStatusColor = (status: WorkflowStatus): string => {
    switch (status) {
      case WorkflowStatus._1: // Published
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
      case WorkflowStatus._0: // Draft
        return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
      case WorkflowStatus._2: // Archived
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800';
      default:
        return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30';
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

  const getSortOptionKey = (field: string, direction: SortDirection): string => {
    return `${field}-${direction}`;
  };

  if (isLoading && workflows.length === 0) {
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
            Workflows
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Design and manage workflow orchestrations
          </p>
        </div>
        
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <Button
            variant="outline"
            onClick={() => navigate('/workflows/designer')}
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            }
          >
            Browse Templates
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setShowImportModal(true)}
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 7l3 3m0 0l3-3m-3 3V4" />
              </svg>
            }
          >
            Import
          </Button>
          
          <Button
            variant="primary"
            onClick={() => navigate('/workflows/designer')}
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            }
          >
            New Workflow
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
                onClick={loadWorkflows}
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Search workflows"
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
              <option value={WorkflowStatus._1}>Published</option>
              <option value={WorkflowStatus._0}>Draft</option>
              <option value={WorkflowStatus._2}>Archived</option>
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

      {/* Workflows Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workflows.map((workflow) => (
          <div
            key={workflow.id}
            className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 rounded bg-purple-500 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5z M5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5z M11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5z M11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                      {workflow.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      by {workflow.creator} • v{workflow.version}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {workflow.isTemplate && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      Template
                    </span>
                  )}
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(workflow.status)}`}>
                    {workflow.status}
                  </span>
                </div>
              </div>

              {workflow.description && (
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {workflow.description}
                </p>
              )}

              <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>{formatRelativeTime(workflow.createdAt)}</span>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <span>{workflow.nodeCount} nodes</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>{workflow.executionCount} runs</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 space-y-2">
                <div className="flex space-x-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate(`/workflows/${workflow.id}`)}
                    className="flex-1"
                  >
                    View Details
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/workflows/${workflow.id}/designer`)}
                    leftIcon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    }
                  >
                    Edit
                  </Button>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExecuteWorkflow(workflow.id)}
                    className="flex-1"
                    leftIcon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h6m2 5H7a2 2 0 01-2-2V8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2z" />
                      </svg>
                    }
                    disabled={workflow.status !== WorkflowStatus._1}
                    title={workflow.status !== WorkflowStatus._1 ? "Only published workflows can be executed" : "Execute workflow"}
                  >
                    Execute
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShareWorkflow(workflow);
                    }}
                    leftIcon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                    }
                    title={`Share ${workflow.name}`}
                  >
                    Share
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleExportWorkflow(workflow);
                    }}
                    leftIcon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    }
                    title={`Export ${workflow.name}`}
                  >
                    Export
                  </Button>
                  
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteWorkflow(workflow.id, workflow.name);
                    }}
                    leftIcon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    }
                    title={`Delete ${workflow.name}`}
                  >
                    Delete
                  </Button>
                </div>
              </div>

              {workflow.status === WorkflowStatus._0 && (
                <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded text-xs text-yellow-700 dark:text-yellow-400">
                  This workflow is in draft status. Publish it to enable execution.
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {workflows.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No workflows found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {searchTerm || statusFilter ? 'Try adjusting your search criteria.' : 'Get started by creating your first workflow.'}
          </p>
          {!searchTerm && !statusFilter && (
            <div className="mt-6">
              <Button
                variant="primary"
                onClick={() => navigate('/workflows/designer')}
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                }
              >
                Create Your First Workflow
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
          setWorkflowToDelete(null);
        }}
        onConfirm={confirmDeleteWorkflow}
        title="Delete Workflow"
        message={
          workflowToDelete 
            ? `Are you sure you want to delete "${workflowToDelete.name}"? This action cannot be undone and will permanently delete the workflow and all its execution history.`
            : 'Are you sure you want to delete this workflow?'
        }
        confirmText="Delete Workflow"
        cancelText="Cancel"
        variant="danger"
        loading={isDeleting}
      />
      
      {/* Permissions Modal */}
      {selectedWorkflow && (
        <WorkflowPermissionsModal
          isOpen={showPermissionsModal}
          onClose={() => {
            setShowPermissionsModal(false);
            setSelectedWorkflow(null);
          }}
          workflowId={selectedWorkflow.id}
          workflowName={selectedWorkflow.name}
          onPermissionsUpdated={handlePermissionsUpdated}
        />
      )}
      
      {/* Import Modal */}
      <WorkflowImportModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onImportSuccess={handleImportSuccess}
      />
      
      {/* Export Modal */}
      {workflowToExport && (
        <WorkflowExportModal
          isOpen={showExportModal}
          onClose={() => {
            setShowExportModal(false);
            setWorkflowToExport(null);
          }}
          workflowId={workflowToExport.id}
          workflowName={workflowToExport.name}
        />
      )}
    </div>
  );
};

export default WorkflowsPage;