import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HubConnectionState } from '@microsoft/signalr';
import { api } from '@/api/api';
import Button from '@/components/common/Button';
import ExecutionFileTree from '@/components/execution/ExecutionFileTree';
import type { IExecutionFileDto } from '@/api/typeInterfaces';
import streamSaver from 'streamsaver';
import {
  createExecutionSignalRService,
  ExecutionOutputEvent,
  ExecutionErrorEvent,
  ExecutionStatusChangedEventArgs,
  ExecutionCompletedEventArgs
} from '@/services/executionSignalrService';

// Configure StreamSaver with local mitm and service worker
if (typeof window !== 'undefined') {
  streamSaver.mitm = `${window.location.origin}/mitm.html`;
}

// Initialize SignalR service singleton
const signalRService = createExecutionSignalRService(
  api.baseApiUrl,
  () => api.getCurrentToken()
);

// --- NEW: Structured Log Entry for Robust Rendering ---
interface LogEntry {
  id: number;
  timestamp: string;
  type: 'stdout' | 'stderr' | 'system' | 'initial';
  message: string;
}

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
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [outputFiles, setOutputFiles] = useState<IExecutionFileDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filesHaveBeenFetched, setFilesHaveBeenFetched] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [signalrState, setSignalrState] = useState<HubConnectionState>(HubConnectionState.Disconnected);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  const logCounter = useRef(0);
  const logsEndRef = useRef<HTMLDivElement>(null);

  // --- Initial Data Loading Effect ---
  useEffect(() => {
    if (executionId) {
      setFilesHaveBeenFetched(false);
      loadExecutionDetail();
    }
  }, [executionId]);

  // --- Timer Effect for Running Executions ---
  useEffect(() => {
    if (!execution || execution.status.toLowerCase() !== 'running') return;

    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [execution?.status]);

  // --- REFACTORED: Conditional SignalR Effect (only for running executions) ---
  useEffect(() => {
    if (!executionId || !execution) return;

    const isRunning = execution.status.toLowerCase() === 'running';

    // If not running, load static logs instead
    if (!isRunning) {
      loadLogs(false);
      return;
    }

    let isMounted = true;

    const formatLog = (type: LogEntry['type'], message: string, timestamp: string): LogEntry => {
        logCounter.current += 1;
        const date = timestamp ? new Date(timestamp) : new Date();
        return {
            id: logCounter.current,
            type,
            message,
            timestamp: date.toLocaleTimeString('en-US', { hour12: false }),
        };
    };

    const handleInitialLogs = (initialLogLines: string[]) => {
      if (!isMounted) return;
      const formattedLogs = initialLogLines.map(line => {
          logCounter.current += 1;
          return {
              id: logCounter.current,
              type: 'initial' as const,
              message: line,
              timestamp: '' // Cached logs don't have a real-time timestamp
          }
      });
      setLogs(formattedLogs);
    };

    const handleExecutionOutput = (event: ExecutionOutputEvent) => {
        if (!isMounted || event.executionId !== executionId) return;
        const newLog = formatLog('stdout', event.output, event.timestamp);
        setLogs(prevLogs => [...prevLogs, newLog]);
    };

    const handleExecutionError = (event: ExecutionErrorEvent) => {
        if (!isMounted || event.executionId !== executionId) return;
        const newLog = formatLog('stderr', event.error, event.timestamp);
        setLogs(prevLogs => [...prevLogs, newLog]);
    };

    const handleStatusChanged = (event: ExecutionStatusChangedEventArgs) => {
        if (!isMounted || event.executionId !== executionId) return;
        setExecution(prev => prev ? { ...prev, status: event.newStatus } : null);

        // If status changed to non-running, reload execution details to get results
        const isNowRunning = event.newStatus.toLowerCase() === 'running';
        if (!isNowRunning) {
          loadExecutionDetail();
        }
    };

    const handleCompleted = (event: ExecutionCompletedEventArgs) => {
      if (!isMounted || event.executionId !== executionId) return;
      setExecution(prev => prev ? {
        ...prev,
        status: event.status,
        completedAt: new Date(event.completedAt),
        result: {
          exitCode: event.exitCode,
          output: prev.result?.output,
          errorOutput: event.errorMessage || prev.result?.errorOutput,
        },
      } : null);

      if (event.success) {
        loadOutputFiles();
      }

      // Reload full execution details to get complete result data
      loadExecutionDetail();
    };

    const setupSignalR = async () => {
      const unsubscribeConnection = signalRService.onConnectionStateChanged(setSignalrState);

      try {
        await signalRService.connect();
        if (!isMounted) return;

        const unsubscribeInitial = signalRService.onInitialLogs(handleInitialLogs);
        const unsubscribeOutput = signalRService.onExecutionOutput(handleExecutionOutput);
        const unsubscribeError = signalRService.onExecutionError(handleExecutionError);
        const unsubscribeStatus = signalRService.onExecutionStatusChanged(handleStatusChanged);
        const unsubscribeCompleted = signalRService.onExecutionCompleted(handleCompleted);

        // --- MODIFIED: Just join the group. Server will send initial logs. ---
        await signalRService.joinExecutionGroup(executionId);

        return () => {
          isMounted = false;
          unsubscribeConnection();
          unsubscribeInitial();
          unsubscribeOutput();
          unsubscribeError();
          unsubscribeStatus();
          unsubscribeCompleted();
          if (signalRService.connectionState === HubConnectionState.Connected) {
            signalRService.leaveExecutionGroup(executionId);
          }
        };
      } catch (e) {
        console.error("SignalR connection failed: ", e);
        return () => {
          unsubscribeConnection();
        };
      }
    };

    const cleanupPromise = setupSignalR();

    return () => {
      isMounted = false;
      cleanupPromise.then(cleanupFunc => {
        if (cleanupFunc) {
          cleanupFunc();
        }
      });
      signalRService.disconnect();
    };
  }, [executionId, execution?.status]);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  useEffect(() => {
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
          startedAt: new Date(response.data.startedAt!),
          completedAt: response.data.completedAt ? new Date(response.data.completedAt) : undefined,
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

  const loadLogs = async (showLoading: boolean = true) => {
    if (!executionId) return;
    
    try {
      if (showLoading) setIsLoadingLogs(true);
      
      const response = await api.executions.executions_GetExecutionLogs(executionId, 200);
      
      if (response.success && response.data) {
        const formattedLogs = (response.data || []).map(line => {
            logCounter.current += 1;
            return { id: logCounter.current, type: 'initial' as const, message: line, timestamp: '' };
        });
        setLogs(formattedLogs);
      }
    } catch (error) {
      console.error('Failed to load logs:', error);
    } finally {
      if (showLoading) setIsLoadingLogs(false);
    }
  };

  const loadOutputFiles = async () => {
    if (!executionId) return;
    
    try {
      setIsLoadingFiles(true);
      setFilesHaveBeenFetched(true);
      setError(null);

      const response = await api.executions.executions_ListExecutionFiles(executionId);

      if (response.success && response.data?.files) {
        setOutputFiles(response.data.files);
      } else {
        setOutputFiles([]);
      }
    } catch (error) {
      console.error('Failed to load output files:', error);
      setOutputFiles([]);
    } finally {
      setIsLoadingFiles(false);
    }
  };

  const handleDownloadAllFiles = async () => {
    if (!executionId) return;

    setIsDownloading(true);
    setError(null);
    try {
      const downloadUrl = `${api.baseApiUrl}/api/Executions/${executionId}/files/download-all`;
      const token = api.getCurrentToken();
      const fileName = `execution_${executionId}_files.zip`;

      const response = await fetch(downloadUrl, {
        headers: { 'Authorization': token ? `Bearer ${token}` : '' }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(`Failed to download files: ${errorData.message || response.statusText}`);
      }

      if (!response.body) {
        throw new Error("Streaming downloads are not supported or the response body is missing.");
      }

      // Try File System Access API first (Chrome/Edge, no popup needed!)
      // @ts-ignore - File System Access API may not be in types yet
      if ('showSaveFilePicker' in window) {
        try {
          // @ts-ignore
          const fileHandle = await window.showSaveFilePicker({
            suggestedName: fileName,
            types: [{
              description: 'ZIP Archive',
              accept: { 'application/zip': ['.zip'] }
            }]
          });

          const writable = await fileHandle.createWritable();
          await response.body.pipeTo(writable);
          return; // Success!
        } catch (err: any) {
          // User cancelled or error - fall through to StreamSaver
          if (err.name !== 'AbortError') {
            console.warn('File System Access API failed:', err);
          } else {
            // User cancelled, abort download
            setIsDownloading(false);
            return;
          }
        }
      }

      // Fallback to StreamSaver (will use iframe on HTTPS, popup on HTTP)
      const fileStream = streamSaver.createWriteStream(fileName);
      await response.body.pipeTo(fileStream);
    } catch (error) {
      console.error('Download Failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      setError(`Failed to download files. ${errorMessage}`);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleStopExecution = async () => {
    if (!executionId || !execution) return;
    
    try {
      const response = await api.executions.executions_StopExecution(executionId);
      if (response.success) {
        loadExecutionDetail();
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
                {formatDuration(execution.startedAt, execution.status.toLowerCase() === 'running' ? currentTime : execution.completedAt)}
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

      {/* Execution Result - Only show when NOT running */}
      {execution.status.toLowerCase() !== 'running' && execution.result && (
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
          <div className="flex items-center space-x-2">
            {outputFiles.length > 0 && (
              <Button
                variant="outline"
                onClick={handleDownloadAllFiles}
                disabled={isDownloading}
                leftIcon={
                  isDownloading ? (
                    <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  )
                }
              >
                {isDownloading ? 'Downloading...' : 'Download All'}
              </Button>
            )}
            {isLoadingFiles && (
              <svg className="w-4 h-4 animate-spin text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            )}
          </div>
        </div>
        
        <div className="p-6">
          <ExecutionFileTree
            executionId={executionId!}
            files={outputFiles}
            onError={(error) => setError(error)}
          />
        </div>
      </div>

      {/* Execution Logs - Only show when running */}
      {execution.status.toLowerCase() === 'running' && (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Execution Logs</h2>
            {execution.status.toLowerCase() === 'running' && signalrState === HubConnectionState.Connected && (
              <span className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span>Live Stream</span>
              </span>
            )}
            {execution.status.toLowerCase() !== 'running' && (
              <span className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Static Logs</span>
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
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
              {logs.map(log => (
                <div key={log.id}>
                  <span className="text-gray-500">{log.timestamp} </span>
                  <span className={log.type === 'stderr' ? 'text-red-500' : 'text-gray-800 dark:text-gray-200'}>
                    {log.message}
                  </span>
                </div>
              ))}
              <div ref={logsEndRef} />
            </pre>
          ) : (
            <div className="text-center py-8">
              <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {execution.status.toLowerCase() === 'running'
                  ? (signalrState === HubConnectionState.Connected ? 'Waiting for logs...' : 'Connecting to log stream...')
                  : 'No logs available'}
              </p>
            </div>
          )}
        </div>
      </div>
      )}
    </div>
  );
};

export default ExecutionDetailPage;