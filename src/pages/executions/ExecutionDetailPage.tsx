// src/pages/apps/ExecutionDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '@/api/api';
import Button from '@/components/common/Button';
import ExecutionFileTree from '@/components/execution/ExecutionFileTree';
import type { IExecutionFileDto } from '@/api/typeInterfaces';

// Interfaces
interface ExecutionDetail {
  id: string;
  programId: string;
  programName: string;
  status: string;
  startedAt: Date;
  completedAt?: Date;
  userId: string;
  executionType: string;
  parameters?: Record<string, any>;
  environmentVariables?: Record<string, string>;
  resourceUsage?: {
    maxMemoryUsedMb?: number;
    maxCpuPercent?: number;
    executionTimeMinutes?: number;
  };
  result?: {
    exitCode?: number;
    output?: string;
    errorOutput?: string;
  };
}

const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'running':
      return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30';
    case 'completed':
      return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
    case 'failed':
      return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
    case 'pending':
      return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
    default:
      return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800';
  }
};

const getStatusIcon = (status: string): React.ReactNode => {
  switch (status.toLowerCase()) {
    case 'running':
      return (
        <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      );
    case 'completed':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'failed':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'pending':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    default:
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
    minute: '2-digit',
    second: '2-digit'
  }).format(date);
};

const formatDuration = (start: Date, end?: Date): string => {
  const endTime = end || new Date();
  const diffMs = endTime.getTime() - start.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);

  if (diffHours > 0) {
    return `${diffHours}h ${diffMinutes % 60}m ${diffSeconds % 60}s`;
  }
  if (diffMinutes > 0) {
    return `${diffMinutes}m ${diffSeconds % 60}s`;
  }
  return `${diffSeconds}s`;
};

const ExecutionDetailPage: React.FC = () => {
  const { executionId } = useParams<{ executionId: string }>();
  const navigate = useNavigate();
  
  const [execution, setExecution] = useState<ExecutionDetail | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [outputFiles, setOutputFiles] = useState<IExecutionFileDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [filesHaveBeenFetched, setFilesHaveBeenFetched] = useState(false);

  useEffect(() => {
    if (executionId) {
      setFilesHaveBeenFetched(false); // Reset file fetch status for new execution
      loadExecutionDetail();
      loadLogs();
    }
  }, [executionId]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (autoRefresh && execution?.status.toLowerCase() === 'running') {
      interval = setInterval(() => {
        refreshExecutionStatus();
        loadLogs(false); // Don't show loading indicators during auto-refresh
      }, 2000); // Refresh every 2 seconds for running executions
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh, execution?.status]);

  // Load output files once after execution is complete
  useEffect(() => {
    // Check if execution is in a final state and files haven't been fetched yet
    if (execution?.status && !filesHaveBeenFetched) {
      const status = execution.status.toLowerCase();
      if (status === 'completed' || status === 'failed') {
        loadOutputFiles();
        setFilesHaveBeenFetched(true);
      }
    }
  }, [execution, filesHaveBeenFetched]);

  const loadExecutionDetail = async () => {
    if (!executionId) return;
    
    try {
      setIsLoading(true);
      setError(null);

      const response = await api.executions.executions_GetById(executionId);

      if (response.success && response.data) {
        const executionData: ExecutionDetail = {
          id: response.data.id || '',
          programId: response.data.programId || '',
          programName: response.data.programName || 'Unknown Program',
          status: response.data.status || 'unknown',
          startedAt: response.data.startedAt || new Date(),
          completedAt: response.data.completedAt,
          userId: response.data.userId || '',
          executionType: response.data.executionType || 'standard',
          parameters: response.data.parameters,
          environmentVariables: response.data.environment?.environment,
          resourceUsage: {
            maxMemoryUsedMb: response.data.resourceUsage?.memoryUsed,
            maxCpuPercent: response.data.resourceUsage?.cpuPercentage,
            executionTimeMinutes: response.data.resourceUsage?.cpuTime ? response.data.resourceUsage.cpuTime / 60 : undefined
          },
          result: {
            exitCode: response.data.results?.exitCode,
            output: response.data.results?.output,
            errorOutput: response.data.results?.error
          }
        };

        setExecution(executionData);
        
        // Enable auto-refresh for running executions
        if (executionData.status.toLowerCase() === 'running') {
          setAutoRefresh(true);
        }
      } else {
        setError(response.message || 'Failed to load execution details');
      }
    } catch (error) {
      console.error('Failed to load execution detail:', error);
      setError('Failed to load execution details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshExecutionStatus = async () => {
    if (!executionId || !execution) return;
    
    try {
      const response = await api.executions.executions_GetById(executionId);

      if (response.success && response.data) {
        const data = response.data;
        // Only update the fields that might change during execution
        setExecution(prev => prev ? {
          ...prev,
          status: data.status || 'unknown',
          completedAt: data.completedAt,
          resourceUsage: {
            maxMemoryUsedMb: data.resourceUsage?.memoryUsed,
            maxCpuPercent: data.resourceUsage?.cpuPercentage,
            executionTimeMinutes: data.resourceUsage?.cpuTime ? data.resourceUsage.cpuTime / 60 : undefined
          },
          result: {
            exitCode: data.results?.exitCode,
            output: data.results?.output,
            errorOutput: data.results?.error
          }
        } : null);
        
        // Disable auto-refresh if execution is no longer running
        if (data.status?.toLowerCase() !== 'running') {
          setAutoRefresh(false);
        }
      }
    } catch (error) {
      console.error('Failed to refresh execution status:', error);
      // Don't set error for refresh failures to avoid disrupting the UI
    }
  };

  const loadLogs = async (showLoading: boolean = true) => {
    if (!executionId) return;
    
    try {
      if (showLoading) {
        setIsLoadingLogs(true);
      }
      
      const response = await api.executions.executions_GetExecutionLogs(executionId, 100);
      
      if (response.success && response.data) {
        // Only update logs if they've actually changed to prevent unnecessary re-renders
        setLogs(prevLogs => {
          const newLogs = response.data || [];
          if (JSON.stringify(prevLogs) !== JSON.stringify(newLogs)) {
            return newLogs;
          }
          return prevLogs;
        });
      }
    } catch (error) {
      console.error('Failed to load logs:', error);
    } finally {
      if (showLoading) {
        setIsLoadingLogs(false);
      }
    }
  };

  const loadOutputFiles = async () => {
    if (!executionId) return;
    
    try {
      setIsLoadingFiles(true);
      setError(null);

      // This will be called when API layer is updated
      const response = await api.executions.executions_ListExecutionFiles(executionId);

      if (response.success && response.data?.files) {
        // Files are already in the correct format (IExecutionFileDto[])
        setOutputFiles(response.data.files);
      } else {
        // Don't set error for missing files, just keep empty array
        setOutputFiles([]);
      }
    } catch (error) {
      console.error('Failed to load output files:', error);
      // Don't set error for files since it's not critical
      setOutputFiles([]);
    } finally {
      setIsLoadingFiles(false);
    }
  };

  const handleStopExecution = async () => {
    if (!executionId || !execution) return;
    
    try {
      const response = await api.executions.executions_StopExecution(executionId);
      
      if (response.success) {
        loadExecutionDetail(); // Refresh execution status
      } else {
        setError(response.message || 'Failed to stop execution');
      }
    } catch (error) {
      console.error('Failed to stop execution:', error);
      setError('Failed to stop execution. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (!execution) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Execution not found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            The execution you're looking for doesn't exist or you don't have permission to view it.
          </p>
          <div className="mt-6">
            <Button variant="primary" onClick={() => navigate('/apps')}>
              Back to Executions
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/apps')}
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            }
          >
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Execution Details
            </h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              {execution.programName}
            </p>
          </div>
        </div>
        
        <div className="mt-4 sm:mt-0 flex space-x-2">
          {execution.status.toLowerCase() === 'running' && (
            <Button
              variant="danger"
              onClick={handleStopExecution}
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10h6v4H9z" />
                </svg>
              }
            >
              Stop Execution
            </Button>
          )}
          
          <Button
            variant="outline"
            onClick={() => {
              loadLogs(true);
              if (filesHaveBeenFetched) {
                loadOutputFiles();
              }
            }}
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            }
          >
            Refresh
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
                onClick={() => setError(null)}
                className="text-sm text-red-800 dark:text-red-200 hover:text-red-600 dark:hover:text-red-300"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Execution Overview */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Execution Overview</h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</dt>
              <dd className="mt-1 flex items-center space-x-2">
                <div className={`flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(execution.status)}`}>
                  {getStatusIcon(execution.status)}
                  <span>{execution.status}</span>
                </div>
              </dd>
            </div>
            
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Started At</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                {formatDateTime(execution.startedAt)}
              </dd>
            </div>
            
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Duration</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                {formatDuration(execution.startedAt, execution.completedAt)}
              </dd>
            </div>
            
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Type</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                {execution.executionType}
              </dd>
            </div>
          </div>
        </div>
      </div>

      {/* Resource Usage */}
      {execution.resourceUsage && (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Resource Usage</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {execution.resourceUsage.maxMemoryUsedMb && (
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Max Memory</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                    {execution.resourceUsage.maxMemoryUsedMb} MB
                  </dd>
                </div>
              )}
              
              {execution.resourceUsage.maxCpuPercent && (
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Max CPU</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                    {execution.resourceUsage.maxCpuPercent}%
                  </dd>
                </div>
              )}
              
              {execution.resourceUsage.executionTimeMinutes && (
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Execution Time</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                    {execution.resourceUsage.executionTimeMinutes} minutes
                  </dd>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Execution Result */}
      {execution.result && (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Execution Result</h2>
          </div>
          
          <div className="p-6 space-y-4">
            {execution.result.exitCode !== undefined && (
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Exit Code</dt>
                <dd className={`mt-1 text-sm font-mono ${execution.result.exitCode === 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {execution.result.exitCode}
                </dd>
              </div>
            )}
            
            {execution.result.output && (
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Output</dt>
                <dd className="mt-1">
                  <pre className="text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900 p-4 rounded-md overflow-auto max-h-64 border">
                    {execution.result.output}
                  </pre>
                </dd>
              </div>
            )}
            
            {execution.result.errorOutput && (
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Error Output</dt>
                <dd className="mt-1">
                  <pre className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-4 rounded-md overflow-auto max-h-64 border border-red-200 dark:border-red-800">
                    {execution.result.errorOutput}
                  </pre>
                </dd>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Output Files */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Output Files</h2>
          {isLoadingFiles && (
            <svg className="w-4 h-4 animate-spin text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          )}
        </div>
        
        <div className="p-6">
          <ExecutionFileTree
            executionId={executionId!}
            files={outputFiles}
            onError={(error) => setError(error)}
          />
        </div>
      </div>

      {/* Execution Logs */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Execution Logs</h2>
          <div className="flex items-center space-x-2">
            <label className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
              />
              <span>Auto-refresh</span>
            </label>
            {isLoadingLogs && (
              <svg className="w-4 h-4 animate-spin text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            )}
          </div>
        </div>
        
        <div className="p-6">
          {logs.length > 0 ? (
            <pre className="text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900 p-4 rounded-md overflow-auto max-h-96 border font-mono">
              {logs.join('\n')}
            </pre>
          ) : (
            <div className="text-center py-8">
              <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                No logs available yet
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExecutionDetailPage;