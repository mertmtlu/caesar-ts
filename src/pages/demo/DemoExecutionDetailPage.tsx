// src/pages/demo/DemoExecutionDetailPage.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HubConnectionState } from '@microsoft/signalr';
import { api } from '@/api/api';
import Button from '@/components/common/Button';
import ExecutionFileTree from '@/components/execution/ExecutionFileTree';
import type { IExecutionFileDto } from '@/api/typeInterfaces';
// Note: streamSaver import removed as direct download is used instead
import {
  createExecutionSignalRService,
  ExecutionOutputEvent,
  ExecutionErrorEvent,
  ExecutionStatusChangedEventArgs,
  ExecutionCompletedEventArgs
} from '@/services/executionSignalrService';

// Initialize SignalR service
const signalRService = createExecutionSignalRService(
  api.baseApiUrl,
  () => api.getCurrentToken()
);

// Log entry interface
interface LogEntry {
  id: number;
  timestamp: string;
  type: 'stdout' | 'stderr' | 'system' | 'initial';
  message: string;
}

// Execution detail interface
interface ExecutionDetail {
  id: string;
  programId?: string;
  programName?: string;
  status: string;
  startedAt: Date;
  completedAt?: Date;
  userId: string;
  executionType: string;
  parameters?: Record<string, any>;
  results?: {
    exitCode?: number;
    output?: string;
    errorOutput?: string;
  };
}

// Utility functions
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
    default:
      return null;
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

const DemoExecutionDetailPage: React.FC = () => {
  const { executionId } = useParams<{ executionId: string }>();
  const navigate = useNavigate();

  const [execution, setExecution] = useState<ExecutionDetail | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [outputFiles, setOutputFiles] = useState<IExecutionFileDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filesHaveBeenFetched, setFilesHaveBeenFetched] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [signalrState, setSignalrState] = useState<HubConnectionState>(HubConnectionState.Disconnected);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  const logCounter = useRef(0);
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Load execution details
  useEffect(() => {
    if (executionId) {
      setFilesHaveBeenFetched(false);
      loadExecutionDetail();
    }
  }, [executionId]);

  // Timer for running executions
  useEffect(() => {
    if (!execution || execution.status.toLowerCase() !== 'running') return;

    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [execution?.status]);

  // SignalR setup for running executions
  useEffect(() => {
    if (!executionId || !execution) return;

    const isRunning = execution.status.toLowerCase() === 'running';

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
          timestamp: ''
        };
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
        results: {
          exitCode: event.exitCode,
          output: prev.results?.output,
          errorOutput: event.errorMessage || prev.results?.errorOutput,
        },
      } : null);

      if (event.success) {
        loadOutputFiles();
      }

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
        console.error("SignalR connection failed:", e);
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
  }, [execution?.status, executionId]);

  // Auto-scroll to bottom of logs
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const loadExecutionDetail = async () => {
    if (!executionId) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await api.executions.executions_GetById(executionId);

      if (response.success && response.data) {
        const data = response.data;
        setExecution({
          id: data.id!,
          programId: data.programId,
          programName: data.programName,
          status: data.status || 'pending',
          startedAt: data.startedAt ? new Date(data.startedAt) : new Date(),
          completedAt: data.completedAt ? new Date(data.completedAt) : undefined,
          userId: data.userId || '',
          executionType: data.executionType || 'program',
          parameters: data.parameters,
          results: data.results
        });

        // Load output files if completed
        if (data.status?.toLowerCase() === 'completed' && !filesHaveBeenFetched) {
          loadOutputFiles();
        }
      } else {
        setError(response.message || 'Failed to load execution details');
      }
    } catch (error) {
      console.error('Failed to load execution:', error);
      setError('Failed to load execution details');
    } finally {
      setIsLoading(false);
    }
  };

  const loadLogs = async (_append: boolean = false) => {
    if (!executionId) return;

    try {
      // Note: API method for getting logs may need to be implemented
      // For now, we'll just show that logs are loaded via SignalR
      console.log('Logs loaded via SignalR for execution:', executionId);
    } catch (error) {
      console.error('Failed to load logs:', error);
    }
  };

  const loadOutputFiles = async () => {
    if (!executionId || filesHaveBeenFetched) return;

    try {
      setIsLoadingFiles(true);
      // TODO: Implement when API method is available
      // const response = await api.executions.executions_GetOutputFiles(executionId);
      // if (response.success && response.data) {
      //   setOutputFiles(response.data);
      //   setFilesHaveBeenFetched(true);
      // }
      console.log('Loading output files for execution:', executionId);
      setFilesHaveBeenFetched(true);
    } catch (error) {
      console.error('Failed to load output files:', error);
    } finally {
      setIsLoadingFiles(false);
    }
  };

  const handleDownloadFile = async (file: IExecutionFileDto) => {
    if (!executionId || !file.path) return;

    try {
      setIsDownloading(true);
      // TODO: Implement when API method is available
      // const response = await api.executions.executions_DownloadFile(executionId, file.path);
      console.log('Downloading file:', file.path, 'from execution:', executionId);
      setError('File download feature pending API implementation');
    } catch (error) {
      console.error('Failed to download file:', error);
      setError('Failed to download file');
    } finally {
      setIsDownloading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading execution...</p>
        </div>
      </div>
    );
  }

  if (error && !execution) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
          <h3 className="text-lg font-medium text-red-800 dark:text-red-200 mb-2">Error</h3>
          <p className="text-red-700 dark:text-red-300 mb-4">{error}</p>
          <Button variant="outline" onClick={() => navigate('/demo')}>
            Back to Apps
          </Button>
        </div>
      </div>
    );
  }

  if (!execution) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Execution not found</h3>
          <Button variant="primary" onClick={() => navigate('/demo')}>
            Back to Apps
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/demo')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              title="Back to apps"
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {execution.programName || 'Execution'}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                ID: {execution.id}
              </p>
            </div>
          </div>

          {/* Status Badge */}
          <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${getStatusColor(execution.status)}`}>
            {getStatusIcon(execution.status)}
            <span className="font-medium capitalize">{execution.status}</span>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
            <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        {/* Execution Info */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Execution Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Started</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {formatDateTime(execution.startedAt)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {formatDuration(execution.startedAt, execution.completedAt || currentTime)}
              </p>
            </div>
            {execution.results?.exitCode !== undefined && (
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Exit Code</p>
                <p className={`text-sm font-medium ${execution.results.exitCode === 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {execution.results.exitCode}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Logs Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Output Logs</h2>
            {signalrState === HubConnectionState.Connected && (
              <span className="flex items-center text-xs text-green-600 dark:text-green-400">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-2 animate-pulse"></span>
                Live
              </span>
            )}
          </div>
          <div className="bg-gray-900 p-6 font-mono text-sm text-gray-100 h-96 overflow-y-auto">
            {logs.length === 0 ? (
              <p className="text-gray-500">No output yet...</p>
            ) : (
              logs.map(log => (
                <div key={log.id} className="mb-1">
                  <span className="text-gray-500 mr-2">{log.timestamp}</span>
                  <span className={log.type === 'stderr' ? 'text-red-400' : 'text-gray-100'}>
                    {log.message}
                  </span>
                </div>
              ))
            )}
            <div ref={logsEndRef} />
          </div>
        </div>

        {/* Output Files */}
        {execution.status.toLowerCase() === 'completed' && outputFiles.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Output Files</h2>
            {isLoadingFiles ? (
              <p className="text-sm text-gray-600 dark:text-gray-400">Loading files...</p>
            ) : (
              <ExecutionFileTree
                executionId={executionId || ''}
                files={outputFiles}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DemoExecutionDetailPage;
