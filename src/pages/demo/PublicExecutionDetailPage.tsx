// src/pages/demo/PublicExecutionDetailPage.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '@/api/api';
import Button from '@/components/common/Button';
import { HubConnection, HubConnectionBuilder, LogLevel, HubConnectionState } from '@microsoft/signalr';

// --- Interfaces ---
// Using a more specific interface for clarity, based on what the API returns.
interface PublicExecutionDetail {
  executionId: string;
  status: string;
  startedAt: Date;
  completedAt?: Date;
}

// NEW: Structured Log Entry for robust rendering (copied from your better implementation)
interface LogEntry {
  id: number;
  timestamp: string;
  type: 'stdout' | 'stderr' | 'system' | 'initial';
  message: string;
}

// --- Helper Functions (Copied from your code, no changes needed) ---
const getStatusColor = (status: string): string => {
  switch (status?.toLowerCase()) {
    case 'running':
      return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30';
    case 'completed':
      return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
    case 'failed':
      return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
    case 'pending':
    case 'scheduled':
      return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
    default:
      return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800';
  }
};

const getStatusIcon = (status: string): React.ReactNode => {
  switch (status?.toLowerCase()) {
    case 'running':
      return ( <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg> );
    case 'completed':
      return ( <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> );
    case 'failed':
      return ( <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> );
    case 'pending':
    case 'scheduled':
      return ( <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> );
    default:
      return ( <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> );
  }
};

const formatDateTime = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(date);
};

const formatDuration = (start: Date, end?: Date): string => {
  const endTime = end || new Date();
  const diffMs = endTime.getTime() - start.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours > 0) return `${diffHours}h ${diffMinutes % 60}m ${diffSeconds % 60}s`;
  if (diffMinutes > 0) return `${diffMinutes}m ${diffSeconds % 60}s`;
  return `${diffSeconds}s`;
};

const PublicExecutionDetailPage: React.FC = () => {
  const { executionId } = useParams<{ executionId: string }>();
  const navigate = useNavigate();
  
  const [execution, setExecution] = useState<PublicExecutionDetail | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [outputFiles, setOutputFiles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const logCounter = useRef(0);
  const logsEndRef = useRef<HTMLDivElement>(null);
  const [signalrState, setSignalrState] = useState<HubConnectionState>(HubConnectionState.Disconnected);

  const isExecutionFinished = execution?.status?.toLowerCase() === 'completed' || execution?.status?.toLowerCase() === 'failed';

  useEffect(() => {
    if (!executionId) {
      setError("Execution ID is missing.");
      setIsLoading(false);
      return;
    }

    let connection: HubConnection;
    let isMounted = true;

    const setupConnection = async () => {
      // Build the connection. Note: Public endpoint might not require an access token,
      // but we include it since your logs show it's being sent.
      connection = new HubConnectionBuilder()
        .withUrl(`${api.baseApiUrl}/executionHub`, {
          accessTokenFactory: () => api.getCurrentToken() || ''
        })
        .withAutomaticReconnect()
        .build();

      connection.onreconnecting(() => isMounted && setSignalrState(HubConnectionState.Reconnecting));
      connection.onreconnected(() => isMounted && setSignalrState(HubConnectionState.Connected));
      connection.onclose(() => isMounted && setSignalrState(HubConnectionState.Disconnected));

      // --- Define Event Handlers ---
      connection.on('ReceiveLog', (logLine: string) => {
        if (!isMounted) return;
        logCounter.current++;
        const newLog: LogEntry = {
          id: logCounter.current,
          message: logLine,
          type: 'stdout', // Assuming default, can be enhanced if backend sends type
          timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
        };
        setLogs(prev => [...prev, newLog]);
      });

      connection.on('ExecutionStatusChanged', (newStatus: string, completedAt?: string) => {
        if (!isMounted) return;
        setExecution(prev => {
          if (!prev) return null;
          // **FIXED**: Convert the incoming string to a Date object.
          const newCompletedAt = completedAt ? new Date(completedAt) : prev.completedAt;
          return { ...prev, status: newStatus, completedAt: newCompletedAt };
        });
      });

      // --- Start Connection and Fetch Initial Data ---
      try {
        await connection.start();
        if (!isMounted) return;

        setSignalrState(HubConnectionState.Connected);
        await connection.invoke('JoinExecutionGroup', executionId);

        // Initial fetch for page load
        const detailRes = await api.demoShowcase.demoShowcase_GetPublicExecutionStatus(executionId);
        if (isMounted && detailRes.success && detailRes.data) {
          setExecution({
            // Explicitly map properties to ensure type safety
            executionId: detailRes.data.executionId || executionId, // Fallback to the ID from the URL params
            status: detailRes.data.status || 'unknown',
            startedAt: new Date(detailRes.data.startedAt!),
            completedAt: detailRes.data.completedAt ? new Date(detailRes.data.completedAt) : undefined,
        });
          const logsRes = await api.demoShowcase.demoShowcase_GetPublicExecutionLogs(executionId, 500);
          if (isMounted && logsRes.success && logsRes.data?.logs) {
            const initialLogs = logsRes.data.logs.map((line, index) => ({
              id: index,
              message: line,
              type: 'initial' as const,
              timestamp: ''
            }));
            logCounter.current = initialLogs.length;
            setLogs(initialLogs);
          }
        } else {
          throw new Error(detailRes.message || 'Execution not found or access denied.');
        }
      } catch (err: any) {
        if (isMounted) setError(err.message || 'Failed to connect to live updates.');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    setupConnection();

    return () => {
      isMounted = false;
      connection?.stop();
    };
  }, [executionId]);

  // --- Other Effects (largely unchanged) ---
  useEffect(() => {
    // Fetch files only once when execution finishes
    const fetchFiles = async () => {
      if (!executionId) return;
      try {
        const filesRes = await api.demoShowcase.demoShowcase_GetPublicExecutionFiles(executionId);
        if (filesRes.success && filesRes.data?.files) {
          setOutputFiles(filesRes.data.files);
        }
      } catch (err) { console.error("Failed to fetch output files:", err); }
    };
    if (isExecutionFinished) fetchFiles();
  }, [isExecutionFinished, executionId]);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // --- Render Logic ---
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

  if (error || !execution) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl text-red-500">Error</h2>
        <p>{error || "Execution details could not be loaded."}</p>
        <Button variant="primary" onClick={() => navigate('/demo')}>Back to Demo Showcase</Button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate('/demo')}>&larr; Back to Showcase</Button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Public Execution Details</h1>
        </div>
        {signalrState === HubConnectionState.Connected && !isExecutionFinished && (
            <span className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span>Live</span>
            </span>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</dt>
            <dd className={`flex items-center space-x-2 mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(execution.status)}`}>
              {getStatusIcon(execution.status)}
              <span>{execution.status}</span>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Started At</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{formatDateTime(execution.startedAt)}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Duration</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{formatDuration(execution.startedAt, isExecutionFinished ? execution.completedAt : currentTime)}</dd>
          </div>
        </div>
      </div>

      {isExecutionFinished && (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Output Files</h2>
            {outputFiles.length > 0 ? (
                <ul>
                    {outputFiles.map(file => (
                        <li key={file}>
                            <a 
                                href={`${api.baseApiUrl}/api/DemoShowcase/execution/${executionId}/files/download/${file}`}
                                className="text-blue-500 hover:underline"
                                download
                            >
                                {file}
                            </a>
                        </li>
                    ))}
                </ul>
            ) : <p className="text-gray-500">No output files were generated.</p>}
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Execution Logs</h2>
        <pre className="text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900 p-4 rounded-md overflow-auto max-h-96 border font-mono">
          {logs.length > 0 ? (
            logs.map(log => (
              <div key={log.id}>
                {log.timestamp && <span className="text-gray-500 pr-2">{log.timestamp}</span>}
                <span className={log.type === 'stderr' ? 'text-red-500' : ''}>{log.message}</span>
              </div>
            ))
          ) : (isExecutionFinished ? 'No logs were generated.' : 'Connecting to log stream...')}
          <div ref={logsEndRef} />
        </pre>
      </div>
    </div>
  );
};

export default PublicExecutionDetailPage;