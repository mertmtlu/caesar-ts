// src/pages/executions/ExecutionDetailPage.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '@/api/api';
import Button from '@/components/common/Button';
import Modal, { ConfirmationModal } from '@/components/common/Modal';
import { ProgramExecutionRequestDto } from '@/api';

// Interfaces
interface ExecutionDetail {
  id: string;
  programId: string;
  versionId?: string;
  programName: string;
  versionNumber?: number;
  userId: string;
  userName: string;
  executionType: string;
  startedAt: Date;
  completedAt?: Date;
  status: string;
  parameters?: any;
  results?: ExecutionResult;
  resourceUsage?: ResourceUsage;
  outputFiles?: OutputFile[];
  recentLogs?: string[];
  environment?: ExecutionEnvironment;
  webAppUrl?: string;
  webAppStatus?: WebAppStatus;
}

interface ExecutionResult {
  exitCode?: number;
  output?: string;
  outputFiles?: string[];
  error?: string;
  webAppUrl?: string;
  completedAt?: Date;
}

interface ResourceUsage {
  cpuTime?: number;
  memoryUsed?: number;
  diskUsed?: number;
  cpuPercentage?: number;
  memoryPercentage?: number;
  diskPercentage?: number;
  lastUpdated?: Date;
}

interface OutputFile {
  fileName?: string;
  path?: string;
  size?: number;
  contentType?: string;
  createdAt?: Date;
  downloadUrl?: string;
}

interface ExecutionEnvironment {
  environment?: Record<string, string>;
  resourceLimits?: any;
  configuration?: Record<string, any>;
}

interface WebAppStatus {
  status?: string;
  url?: string;
  isHealthy?: boolean;
  lastHealthCheck?: Date;
  responseTime?: number;
  errorMessage?: string;
}

const ExecutionDetailPage: React.FC = () => {
  const { executionId } = useParams<{ executionId: string }>();
  const navigate = useNavigate();
  
  // State management
  const [execution, setExecution] = useState<ExecutionDetail | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [showConfirmStop, setShowConfirmStop] = useState(false);
  const [showConfirmRestart, setShowConfirmRestart] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'logs' | 'files' | 'environment'>('overview');
  
  // Refs
  const logsEndRef = useRef<HTMLDivElement>(null);
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load execution details
  useEffect(() => {
    if (executionId) {
      loadExecutionDetails();
      startAutoRefresh();
    }

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, [executionId]);

  // Auto-scroll logs to bottom
  useEffect(() => {
    if (selectedTab === 'logs' && logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, selectedTab]);

  const loadExecutionDetails = async () => {
    if (!executionId) return;

    try {
      setIsLoading(true);
      setError(null);

      // Load execution details
      const detailResponse = await api.executions.executions_GetById(executionId);
      
      if (detailResponse.success && detailResponse.data) {
        const executionData = detailResponse.data;

        console.log('Execution data loaded:', executionData);
        
        setExecution({
          id: executionData.id || '',
          programId: executionData.programId || '',
          versionId: executionData.versionId,
          programName: executionData.programName || 'Unknown Program',
          versionNumber: executionData.versionNumber,
          userId: executionData.userId || '',
          userName: executionData.userName || 'Unknown User',
          executionType: executionData.executionType || 'Standard',
          startedAt: executionData.startedAt || new Date(),
          completedAt: executionData.completedAt,
          status: executionData.status || 'Unknown',
          parameters: executionData.parameters,
          results: executionData.results,
          resourceUsage: executionData.resourceUsage,
          outputFiles: executionData.outputFiles,
          recentLogs: executionData.recentLogs,
          environment: executionData.environment,
          webAppUrl: executionData.webAppUrl,
          webAppStatus: executionData.webAppStatus
        });

        // Load logs if execution is running or recently completed
        if (shouldLoadLogs(executionData.status)) {
          loadLogs();
        }
      } else {
        setError(detailResponse.message || 'Failed to load execution details');
      }
    } catch (error) {
      console.error('Failed to load execution details:', error);
      setError('Failed to load execution details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadLogs = async () => {
    if (!executionId) return;

    try {
      const logsResponse = await api.executions.executions_GetExecutionLogs(executionId, 100);
      
      if (logsResponse.success && logsResponse.data) {
        setLogs(logsResponse.data);
      }
    } catch (error) {
      console.error('Failed to load logs:', error);
    }
  };

  const startAutoRefresh = () => {
    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
    }

    if (autoRefresh) {
      refreshIntervalRef.current = setInterval(() => {
        loadExecutionDetails();
      }, 5000); // Refresh every 5 seconds
    }
  };

  const shouldLoadLogs = (status?: string): boolean => {
    if (!status) return false;
    const statusLower = status.toLowerCase();
    return statusLower.includes('running') || statusLower.includes('executing') || statusLower.includes('pending');
  };

  const isExecutionRunning = (): boolean => {
    if (!execution?.status) return false;
    const statusLower = execution.status.toLowerCase();
    return statusLower.includes('running') || statusLower.includes('executing') || statusLower.includes('pending');
  };

  const handleStopExecution = async () => {
    if (!executionId) return;

    try {
      setIsActionLoading(true);
      const response = await api.executions.executions_StopExecution(executionId);
      
      if (response.success) {
        await loadExecutionDetails();
        setShowConfirmStop(false);
      } else {
        setError(response.message || 'Failed to stop execution');
      }
    } catch (error) {
      console.error('Failed to stop execution:', error);
      setError('Failed to stop execution. Please try again.');
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleRestartExecution = async () => {
    if (!execution) return;

    try {
      setIsActionLoading(true);
      
      // Execute the same program with the same parameters
      const response = await api.executions.executions_ExecuteProgram(
        execution.programId,
        new ProgramExecutionRequestDto({
          parameters: execution.parameters,
          environment: execution.environment?.environment,
          saveResults: true,
          timeoutMinutes: 30
        })
      );
      
      if (response.success && response.data?.id) {
        setShowConfirmRestart(false);
        navigate(`/executions/${response.data.id}`);
      } else {
        setError(response.message || 'Failed to restart execution');
      }
    } catch (error) {
      console.error('Failed to restart execution:', error);
      setError('Failed to restart execution. Please try again.');
    } finally {
      setIsActionLoading(false);
    }
  };

  const downloadOutputFile = async (file: OutputFile) => {
    if (!executionId || !file.fileName) return;

    try {
      const response = await api.executions.executions_GetExecutionOutputFile(executionId, file.fileName);
      
      if (response.success && response.data?.content) {
        // Create download link
        const blob = new Blob([response.data.content], { type: file.contentType || 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = file.fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Failed to download file:', error);
      setError('Failed to download file. Please try again.');
    }
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

  const formatDuration = (): string => {
    if (!execution?.startedAt) return '-';
    
    const endTime = execution.completedAt || new Date();
    const diffMs = endTime.getTime() - execution.startedAt.getTime();
    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  };

  const formatBytes = (bytes?: number): string => {
    if (!bytes || bytes === 0) return '0 B';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
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

  const toggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh);
    if (!autoRefresh) {
      startAutoRefresh();
    } else if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
    }
  };

  if (isLoading && !execution) {
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

  if (error && !execution) {
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
                onClick={() => navigate('/executions')}
                className="text-sm text-red-800 dark:text-red-200 hover:text-red-600 dark:hover:text-red-300"
              >
                Back to Executions
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!execution) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Execution not found</h3>
          <p className="mt-1 text-gray-500 dark:text-gray-400">The execution you're looking for doesn't exist.</p>
          <div className="mt-4">
            <Button variant="primary" onClick={() => navigate('/executions')}>
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
            onClick={() => navigate('/executions')}
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
              {execution.programName} • {execution.executionType}
            </p>
          </div>
        </div>
        
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleAutoRefresh}
            leftIcon={
              autoRefresh ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h6m2 5H7a2 2 0 01-2-2V8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2z" />
                </svg>
              )
            }
          >
            {autoRefresh ? 'Auto-refresh On' : 'Auto-refresh Off'}
          </Button>
          
          {isExecutionRunning() && (
            <Button
              variant="danger"
              size="sm"
              onClick={() => setShowConfirmStop(true)}
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10h6v4H9z" />
                </svg>
              }
            >
              Stop
            </Button>
          )}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowConfirmRestart(true)}
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            }
          >
            Restart
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

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-md flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                  Status
                </dt>
                <dd className="mt-1">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(execution.status)}`}>
                    {execution.status}
                  </span>
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-md flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                  Duration
                </dt>
                <dd className="text-lg font-medium text-gray-900 dark:text-white">
                  {formatDuration()}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-md flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                  User
                </dt>
                <dd className="text-lg font-medium text-gray-900 dark:text-white truncate">
                  {execution.userName}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-md flex items-center justify-center">
                <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                  Program
                </dt>
                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                  <Link
                    to={`/projects/${execution.programId}`}
                    className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 truncate block"
                  >
                    {execution.programName}
                  </Link>
                  {execution.versionNumber && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Version {execution.versionNumber}
                    </div>
                  )}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
              { id: 'logs', label: 'Logs', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
              { id: 'files', label: 'Output Files', icon: 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z' },
              { id: 'environment', label: 'Environment', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`${
                  selectedTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                </svg>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {selectedTab === 'overview' && (
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Execution Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">ID:</span>
                      <span className="text-sm font-mono text-gray-900 dark:text-white">{execution.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Type:</span>
                      <span className="text-sm text-gray-900 dark:text-white">{execution.executionType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Started:</span>
                      <span className="text-sm text-gray-900 dark:text-white">{formatDateTime(execution.startedAt)}</span>
                    </div>
                    {execution.completedAt && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Completed:</span>
                        <span className="text-sm text-gray-900 dark:text-white">{formatDateTime(execution.completedAt)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Resource Usage */}
                {execution.resourceUsage && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Resource Usage</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">CPU:</span>
                        <span className="text-sm text-gray-900 dark:text-white">
                          {execution.resourceUsage.cpuPercentage ? `${execution.resourceUsage.cpuPercentage.toFixed(1)}%` : '-'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Memory:</span>
                        <span className="text-sm text-gray-900 dark:text-white">
                          {formatBytes(execution.resourceUsage.memoryUsed)}
                          {execution.resourceUsage.memoryPercentage && ` (${execution.resourceUsage.memoryPercentage.toFixed(1)}%)`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Disk:</span>
                        <span className="text-sm text-gray-900 dark:text-white">
                          {formatBytes(execution.resourceUsage.diskUsed)}
                          {execution.resourceUsage.diskPercentage && ` (${execution.resourceUsage.diskPercentage.toFixed(1)}%)`}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Parameters */}
              {execution.parameters && Object.keys(execution.parameters).length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Parameters</h3>
                  <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg text-sm overflow-auto">
                    {JSON.stringify(execution.parameters, null, 2)}
                  </pre>
                </div>
              )}

              {/* Results */}
              {execution.results && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Results</h3>
                  <div className="space-y-4">
                    {execution.results.exitCode !== undefined && (
                      <div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Exit Code: </span>
                        <span className={`text-sm font-mono ${execution.results.exitCode === 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {execution.results.exitCode}
                        </span>
                      </div>
                    )}
                    {execution.results.output && (
                      <div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-2">Output:</span>
                        <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg text-sm overflow-auto max-h-64">
                          {execution.results.output}
                        </pre>
                      </div>
                    )}
                    {execution.results.error && (
                      <div>
                        <span className="text-sm font-medium text-red-500 block mb-2">Error:</span>
                        <pre className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-sm text-red-700 dark:text-red-300 overflow-auto max-h-64">
                          {execution.results.error}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Logs Tab */}
          {selectedTab === 'logs' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Execution Logs</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={loadLogs}
                  leftIcon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  }
                >
                  Refresh
                </Button>
              </div>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-auto max-h-96">
                {logs.length > 0 ? (
                  <div className="space-y-1">
                    {logs.map((line, index) => (
                      <div key={index} className="whitespace-pre-wrap break-words">
                        {line}
                      </div>
                    ))}
                    <div ref={logsEndRef} />
                  </div>
                ) : (
                  <div className="text-gray-500">No logs available</div>
                )}
              </div>
            </div>
          )}

          {/* Files Tab */}
          {selectedTab === 'files' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Output Files</h3>
              {execution.outputFiles && execution.outputFiles.length > 0 ? (
                <div className="space-y-2">
                  {execution.outputFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    >
                      <div className="flex items-center space-x-3">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {file.fileName || 'Unknown File'}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {formatBytes(file.size)} • {file.contentType || 'Unknown'} • {file.createdAt ? formatDateTime(file.createdAt) : 'Unknown date'}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadOutputFile(file)}
                        disabled={!file.fileName}
                        leftIcon={
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        }
                      >
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No output files</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    This execution hasn't produced any output files yet.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Environment Tab */}
          {selectedTab === 'environment' && (
            <div className="space-y-6">
              {/* Environment Variables */}
              {execution.environment?.environment && Object.keys(execution.environment.environment).length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Environment Variables</h3>
                  <div className="space-y-2">
                    {Object.entries(execution.environment.environment).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{key}</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400 font-mono">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Resource Limits */}
              {execution.environment?.resourceLimits && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Resource Limits</h3>
                  <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg text-sm overflow-auto">
                    {JSON.stringify(execution.environment.resourceLimits, null, 2)}
                  </pre>
                </div>
              )}

              {/* Configuration */}
              {execution.environment?.configuration && Object.keys(execution.environment.configuration).length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Configuration</h3>
                  <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg text-sm overflow-auto">
                    {JSON.stringify(execution.environment.configuration, null, 2)}
                  </pre>
                </div>
              )}

              {/* Web App Status (if applicable) */}
              {execution.webAppStatus && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Web Application</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Status:</span>
                      <span className={`text-sm font-medium ${execution.webAppStatus.isHealthy ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {execution.webAppStatus.status || 'Unknown'}
                      </span>
                    </div>
                    {execution.webAppStatus.url && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">URL:</span>
                        <a
                          href={execution.webAppStatus.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          {execution.webAppStatus.url}
                        </a>
                      </div>
                    )}
                    {execution.webAppStatus.responseTime && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Response Time:</span>
                        <span className="text-sm text-gray-900 dark:text-white">{execution.webAppStatus.responseTime}ms</span>
                      </div>
                    )}
                    {execution.webAppStatus.lastHealthCheck && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Last Health Check:</span>
                        <span className="text-sm text-gray-900 dark:text-white">{formatDateTime(execution.webAppStatus.lastHealthCheck)}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modals */}
      <ConfirmationModal
        isOpen={showConfirmStop}
        onClose={() => setShowConfirmStop(false)}
        onConfirm={handleStopExecution}
        title="Stop Execution"
        message="Are you sure you want to stop this execution? This action cannot be undone."
        confirmText="Stop Execution"
        variant="danger"
        loading={isActionLoading}
      />

      <ConfirmationModal
        isOpen={showConfirmRestart}
        onClose={() => setShowConfirmRestart(false)}
        onConfirm={handleRestartExecution}
        title="Restart Execution"
        message="This will start a new execution with the same parameters. Are you sure you want to continue?"
        confirmText="Restart"
        variant="info"
        loading={isActionLoading}
      />
    </div>
  );
};

export default ExecutionDetailPage;