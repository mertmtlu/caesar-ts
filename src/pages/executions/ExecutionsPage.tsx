// src/pages/executions/ExecutionsPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/api/api';
import { SortDirection } from '@/api/enums';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Modal from '@/components/common/Modal';
import { ExecutionSearchDto, ProgramExecutionRequestDto } from '@/api';

// Interfaces
interface ExecutionListItem {
  id: string;
  programId: string;
  programName: string;
  versionNumber?: number;
  userName: string;
  executionType: string;
  startedAt: Date;
  completedAt?: Date;
  status: string;
  duration?: number;
  hasError: boolean;
}

interface ProgramOption {
  id: string;
  name: string;
  language: string;
  currentVersion?: string;
  status: string;
}

interface QuickExecutionForm {
  programId: string;
  parameters: string;
  environment: Record<string, string>;
  saveResults: boolean;
  timeoutMinutes: number;
}

// Sort field mapping configuration - easily modifiable
interface SortOption {
  label: string;
  field: string;
  direction: SortDirection;
}

const SORT_OPTIONS: SortOption[] = [
  { label: 'Newest First', field: 'CreatedDate', direction: SortDirection._1 },
  { label: 'Oldest First', field: 'CreatedDate', direction: SortDirection._0 },
  { label: 'Recently Updated', field: 'UpdatedDate', direction: SortDirection._1 },
  { label: 'Name A-Z', field: 'Name', direction: SortDirection._0 },
  { label: 'Name Z-A', field: 'Name', direction: SortDirection._1 },
  { label: 'ID Ascending', field: 'Id', direction: SortDirection._0 },
  { label: 'ID Descending', field: 'Id', direction: SortDirection._1 },
];

// Helper function to get sort option key
const getSortOptionKey = (field: string, direction: SortDirection): string => {
  return `${field}-${direction}`;
};

// Helper function to find sort option
const findSortOption = (field: string, direction: SortDirection): SortOption | undefined => {
  return SORT_OPTIONS.find(option => option.field === field && option.direction === direction);
};

const ExecutionsPage: React.FC = () => {
  const navigate = useNavigate();
  
  // State management
  const [executions, setExecutions] = useState<ExecutionListItem[]>([]);
  const [programs, setPrograms] = useState<ProgramOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingPrograms, setIsLoadingPrograms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  
  // Filtering and search
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortField, setSortField] = useState('CreatedDate');
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection._1); // Descending
  
  // Quick execution modal
  const [showQuickExecution, setShowQuickExecution] = useState(false);
  const [quickExecutionForm, setQuickExecutionForm] = useState<QuickExecutionForm>({
    programId: '',
    parameters: '{}',
    environment: {},
    saveResults: true,
    timeoutMinutes: 30
  });
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionSuccess, setExecutionSuccess] = useState<string | null>(null);

  // Load executions
  useEffect(() => {
    loadExecutions();
  }, [currentPage, pageSize, sortField, sortDirection, statusFilter]);

  // Load executions with search when search term changes
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchTerm) {
        searchExecutions();
      } else {
        loadExecutions();
      }
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm]);

  const loadExecutions = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await api.executions.executions_GetAll(
        currentPage,
        pageSize,
        sortField,
        sortDirection
      );

      if (response.success && response.data) {
        const executionItems = response.data.items?.map(execution => ({
          id: execution.id || '',
          programId: execution.programId || '',
          programName: execution.programName || 'Unknown Program',
          versionNumber: execution.versionNumber,
          userName: execution.userName || 'Unknown User',
          executionType: execution.executionType || 'Standard',
          startedAt: execution.startedAt || new Date(),
          completedAt: execution.completedAt,
          status: execution.status || 'Unknown',
          duration: execution.duration,
          hasError: execution.hasError || false
        })) || [];

        setExecutions(executionItems);
        setTotalCount(response.data.totalCount || 0);
        setTotalPages(response.data.totalPages || 0);
      } else {
        
        setError(response.message || 'Failed to load executions');
      }
    } catch (error) {
      console.error('Failed to load executions:', error);
      setError('Failed to load executions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const searchExecutions = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await api.executions.executions_Search(
        currentPage,
        pageSize,
        sortField,
        sortDirection,
        new ExecutionSearchDto({
          // Use programName search if available, otherwise search in general
          programId: undefined,
          status: statusFilter || undefined,
          executionType: undefined,
          startedFrom: undefined,
          startedTo: undefined
        })
      );

      if (response.success && response.data) {
        const executionItems = response.data.items?.map(execution => ({
          id: execution.id || '',
          programId: execution.programId || '',
          programName: execution.programName || 'Unknown Program',
          versionNumber: execution.versionNumber,
          userName: execution.userName || 'Unknown User',
          executionType: execution.executionType || 'Standard',
          startedAt: execution.startedAt || new Date(),
          completedAt: execution.completedAt,
          status: execution.status || 'Unknown',
          duration: execution.duration,
          hasError: execution.hasError || false
        })) || [];

        setExecutions(executionItems);
        setTotalCount(response.data.totalCount || 0);
        setTotalPages(response.data.totalPages || 0);
      }
    } catch (error) {
      console.error('Failed to search executions:', error);
      setError('Failed to search executions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadPrograms = async () => {
    try {
      setIsLoadingPrograms(true);
      
      const response = await api.programs.programs_GetUserAccessiblePrograms(
        1,
        50, // Get first 50 programs
        'name',
        SortDirection._0 // Ascending
      );

      if (response.success && response.data?.items) {
        const programOptions = response.data.items
          // .filter(program => program.status === 'active') // Only show active programs
          .map(program => ({
            id: program.id || '',
            name: program.name || 'Untitled Program',
            language: program.language || 'Unknown',
            currentVersion: program.currentVersion,
            status: program.status || 'unknown'
          }));

        setPrograms(programOptions);
      }
    } catch (error) {
      console.error('Failed to load programs:', error);
    } finally {
      setIsLoadingPrograms(false);
    }
  };

  const handleQuickExecution = async () => {
    if (!quickExecutionForm.programId) {
      return;
    }

    try {
      setIsExecuting(true);
      let parameters: any = {};
      if (quickExecutionForm.parameters.trim()) {
        try {
          parameters = JSON.parse(quickExecutionForm.parameters);
        } catch (e) {
          throw new Error('Invalid JSON in parameters field');
        }
      }
      
      const response = await api.executions.executions_ExecuteProgram(
        quickExecutionForm.programId,
        new ProgramExecutionRequestDto({
          parameters,
          environment: quickExecutionForm.environment,
          saveResults: quickExecutionForm.saveResults,
          timeoutMinutes: quickExecutionForm.timeoutMinutes
        })
      );

      if (response.success && response.data) {
        setExecutionSuccess(`Execution started successfully! ID: ${response.data.id}`);
        setShowQuickExecution(false);
        
        // Reset form
        setQuickExecutionForm({
          programId: '',
          parameters: '{}',
          environment: {},
          saveResults: true,
          timeoutMinutes: 30
        });
        
        // Reload executions to show the new one
        loadExecutions();
        
        // Navigate to execution detail after a short delay
        setTimeout(() => {
          if (response.data?.id) {
            navigate(`/executions/${response.data.id}`);
          }
        }, 1000);
      } else {
        throw new Error(response.message || 'Failed to start execution');
      }
    } catch (error) {
      console.error('Execution failed:', error);
      setError(error instanceof Error ? error.message : 'Failed to start execution');
    } finally {
      setIsExecuting(false);
      setShowQuickExecution(false);
    }
  };

  const openQuickExecution = () => {
    setShowQuickExecution(true);
    loadPrograms();
  };

  const getStatusColor = (status: string): string => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('running') || statusLower.includes('executing')) {
      return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30';
    }
    if (statusLower.includes('completed') || statusLower.includes('success')) {
      return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
    }
    if (statusLower.includes('failed') || statusLower.includes('error')) {
      return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
    }
    if (statusLower.includes('pending') || statusLower.includes('queued')) {
      return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
    }
    return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800';
  };

  const formatDuration = (duration?: number): string => {
    if (!duration) return '-';
    const seconds = Math.floor(duration / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  };

  const formatRelativeTime = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    if (diffMinutes > 0) return `${diffMinutes}m ago`;
    return 'Just now';
  };

  const addEnvironmentVar = () => {
    setQuickExecutionForm(prev => ({
      ...prev,
      environment: { ...prev.environment, '': '' }
    }));
  };

  const updateEnvironmentVar = (oldKey: string, newKey: string, value: string) => {
    setQuickExecutionForm(prev => {
      const newEnv = { ...prev.environment };
      if (oldKey !== newKey && oldKey in newEnv) {
        delete newEnv[oldKey];
      }
      if (newKey.trim()) {
        newEnv[newKey] = value;
      }
      return { ...prev, environment: newEnv };
    });
  };

  const removeEnvironmentVar = (key: string) => {
    setQuickExecutionForm(prev => {
      const newEnv = { ...prev.environment };
      delete newEnv[key];
      return { ...prev, environment: newEnv };
    });
  };

  if (isLoading && executions.length === 0) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
          ))}
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
            Executions
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Monitor and manage program executions
          </p>
        </div>
        
        <div className="mt-4 sm:mt-0">
          <Button
            variant="primary"
            onClick={openQuickExecution}
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h6m2 5H7a2 2 0 01-2-2V8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2z" />
              </svg>
            }
          >
            Quick Execute
          </Button>
        </div>
      </div>

      {/* Success Message */}
      {executionSuccess && (
        <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-800 dark:text-green-200">{executionSuccess}</p>
            </div>
            <div className="ml-auto pl-3">
              <button
                onClick={() => setExecutionSuccess(null)}
                className="text-green-800 dark:text-green-200 hover:text-green-600 dark:hover:text-green-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

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
                onClick={loadExecutions}
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
            label="Search executions"
            placeholder="Search by program name..."
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
              <option value="running">Running</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
              <option value="pending">Pending</option>
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

      {/* Executions Table */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Program
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Started
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {executions.map((execution) => (
                <tr
                  key={execution.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                  onClick={() => navigate(`/executions/${execution.id}`)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {execution.programName}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {execution.executionType}
                        {execution.versionNumber && ` • v${execution.versionNumber}`}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {execution.userName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(execution.status)}`}>
                        {execution.status}
                      </span>
                      {execution.hasError && (
                        <svg className="ml-2 w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {formatRelativeTime(execution.startedAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {formatDuration(execution.duration)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/executions/${execution.id}`);
                      }}
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {executions.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h6m2 5H7a2 2 0 01-2-2V8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No executions found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {searchTerm || statusFilter ? 'Try adjusting your search criteria.' : 'Get started by executing a program.'}
            </p>
            {!searchTerm && !statusFilter && (
              <div className="mt-6">
                <Button
                  variant="primary"
                  onClick={openQuickExecution}
                  leftIcon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h6m2 5H7a2 2 0 01-2-2V8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2z" />
                    </svg>
                  }
                >
                  Execute Program
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

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

      {/* Quick Execution Modal */}
      <Modal
        isOpen={showQuickExecution}
        onClose={() => setShowQuickExecution(false)}
        title="Quick Execute Program"
        size="lg"
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => setShowQuickExecution(false)}
              disabled={isExecuting}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleQuickExecution}
              loading={isExecuting}
              disabled={!quickExecutionForm.programId}
            >
              Execute
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          {/* Program Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Program *
            </label>
            {isLoadingPrograms ? (
              <div className="animate-pulse h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ) : (
              <select
                value={quickExecutionForm.programId}
                onChange={(e) => setQuickExecutionForm(prev => ({ ...prev, programId: e.target.value }))}
                className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Choose a program...</option>
                {programs.map((program) => (
                  <option key={program.id} value={program.id}>
                    {program.name} ({program.language})
                    {program.currentVersion && ` - v${program.currentVersion}`}
                  </option>
                ))}
              </select>
            )}
            {programs.length === 0 && !isLoadingPrograms && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                No active programs available. Create a program first.
              </p>
            )}
          </div>

          {/* Parameters */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Parameters (JSON)
            </label>
            <textarea
              value={quickExecutionForm.parameters}
              onChange={(e) => setQuickExecutionForm(prev => ({ ...prev, parameters: e.target.value }))}
              placeholder='{"key": "value"}'
              rows={3}
              className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Enter execution parameters as valid JSON
            </p>
          </div>

          {/* Environment Variables */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Environment Variables
              </label>
              <Button
                variant="outline"
                size="xs"
                onClick={addEnvironmentVar}
              >
                Add Variable
              </Button>
            </div>
            {Object.entries(quickExecutionForm.environment).map(([key, value], index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Variable name"
                  value={key}
                  onChange={(e) => updateEnvironmentVar(key, e.target.value, value)}
                  className="flex-1 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={value}
                  onChange={(e) => updateEnvironmentVar(key, key, e.target.value)}
                  className="flex-1 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeEnvironmentVar(key)}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </Button>
              </div>
            ))}
          </div>

          {/* Settings */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Timeout (minutes)
              </label>
              <input
                type="number"
                min="1"
                max="120"
                value={quickExecutionForm.timeoutMinutes}
                onChange={(e) => setQuickExecutionForm(prev => ({ ...prev, timeoutMinutes: parseInt(e.target.value) || 30 }))}
                className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-end">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={quickExecutionForm.saveResults}
                  onChange={(e) => setQuickExecutionForm(prev => ({ ...prev, saveResults: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Save results</span>
              </label>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ExecutionsPage;