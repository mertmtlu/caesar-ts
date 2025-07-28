import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '@/api/api';
import { WorkflowExecutionResponseDto, WorkflowExecutionLogResponseDto, WorkflowDetailDto } from '@/api/types';
import { WorkflowExecutionStatus } from '@/api/enums';
import Button from '@/components/common/Button';

const WorkflowExecutionPage: React.FC = () => {
  const { workflowId, executionId } = useParams<{ workflowId: string; executionId: string }>();
  const navigate = useNavigate();
  
  const [execution, setExecution] = useState<WorkflowExecutionResponseDto | null>(null);
  const [logs, setLogs] = useState<WorkflowExecutionLogResponseDto[]>([]);
  const [nodeOutputs, setNodeOutputs] = useState<Record<string, any>>({});
  const [selectedNodeOutput, setSelectedNodeOutput] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'logs' | 'outputs' | 'statistics'>('logs');
  const [, setWorkflowDetails] = useState<WorkflowDetailDto | null>(null);
  const [nodeNameMap, setNodeNameMap] = useState<Record<string, string>>({});
  const [outputTab, setOutputTab] = useState<'stdout' | 'stderr' | 'files'>('stdout');
  const [workflowDetailsCache] = useState<Map<string, WorkflowDetailDto>>(new Map());

  useEffect(() => {
    if (executionId) {
      loadExecution();
      const interval = setInterval(loadExecution, 2000); // Poll every 2 seconds
      return () => clearInterval(interval);
    }
  }, [executionId]);

  useEffect(() => {
    if (workflowId) {
      loadWorkflowDetails();
    }
  }, [workflowId]);

  const loadWorkflowDetails = async () => {
    if (!workflowId) return;

    // Check cache first
    const cachedDetails = workflowDetailsCache.get(workflowId);
    if (cachedDetails) {
      setWorkflowDetails(cachedDetails);
      createNodeNameMap(cachedDetails);
      return;
    }

    try {
      const response = await api.workflows.workflows_GetById(workflowId);
      if (response.success && response.data) {
        const details = WorkflowDetailDto.fromJS(response.data);
        
        // Cache the details
        workflowDetailsCache.set(workflowId, details);
        
        setWorkflowDetails(details);
        createNodeNameMap(details);
      }
    } catch (error) {
      console.error('Failed to load workflow details:', error);
      // Don't set error state as this is not critical for the execution page
    }
  };

  const createNodeNameMap = (details: WorkflowDetailDto) => {
    // Create node ID to name mapping
    const nameMap: Record<string, string> = {};
    if (details.nodes) {
      details.nodes.forEach(node => {
        if (node.id) {
          // Use node name if available, otherwise use program name, otherwise fall back to ID
          nameMap[node.id] = node.name || node.programName || node.id;
        }
      });
    }
    setNodeNameMap(nameMap);
  };

  const loadExecution = async () => {
    if (!executionId) return;

    try {
      setError(null);

      console.log('Loading execution:', executionId);

      const [executionResponse, logsResponse, outputsResponse] = await Promise.all([
        api.workflows.workflows_GetExecutionStatus(executionId),
        api.workflows.workflows_GetExecutionLogs(executionId, 0, 100),
        api.workflows.workflows_GetExecutionOutputs(executionId)
      ]);

      if (executionResponse.success && executionResponse.data) {
        setExecution(WorkflowExecutionResponseDto.fromJS(executionResponse.data));
      } else {
        setError(executionResponse.message || 'Failed to load execution details');
      }

      if (logsResponse.success && logsResponse.data) {
        const logs = Array.isArray(logsResponse.data) ? logsResponse.data.map(log => WorkflowExecutionLogResponseDto.fromJS(log)) : [];
        setLogs(logs);
      }

      if (outputsResponse.success && outputsResponse.data) {
        setNodeOutputs(outputsResponse.data || {});
      }
    } catch (error) {
      console.error('Failed to load execution:', error);
      setError('Failed to load execution details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getNodeDisplayName = (nodeId: string): string => {
    return nodeNameMap[nodeId] || nodeId;
  };

  const getNodeOutputData = (nodeId: string) => {
    const output = nodeOutputs[nodeId];
    if (!output || !output.data) {
      return { stdout: '', stderr: '', outputFiles: [] };
    }
    
    return {
      stdout: output.data.stdout || '',
      stderr: output.data.stderr || '',
      outputFiles: output.data.outputFiles || []
    };
  };

  const downloadFile = async (file: any) => {
    try {
      // Extract file path - assuming file could be a string path or an object with fileName/path
      const filePath = typeof file === 'string' ? file : (file.path || file.fileName || file);
      const fileName = typeof file === 'string' 
        ? filePath.split('/').pop() || 'download' 
        : (file.fileName || file.path?.split('/').pop() || 'download');
      
      // Create a blob URL for the file download
      const response = await fetch(`/api/files/download?path=${encodeURIComponent(filePath)}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to download file: ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      // Create download link and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Failed to download file:', error);
      alert(`Failed to download file: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handlePauseExecution = async () => {
    if (!executionId) return;

    try {
      const response = await api.workflows.workflows_PauseExecution(executionId);
      if (response.success) {
        loadExecution();
      } else {
        setError(response.message || 'Failed to pause execution');
      }
    } catch (error) {
      console.error('Failed to pause execution:', error);
      setError('Failed to pause execution. Please try again.');
    }
  };

  const handleResumeExecution = async () => {
    if (!executionId) return;

    try {
      const response = await api.workflows.workflows_ResumeExecution(executionId);
      if (response.success) {
        loadExecution();
      } else {
        setError(response.message || 'Failed to resume execution');
      }
    } catch (error) {
      console.error('Failed to resume execution:', error);
      setError('Failed to resume execution. Please try again.');
    }
  };

  const handleCancelExecution = async () => {
    if (!executionId) return;

    try {
      const response = await api.workflows.workflows_CancelExecution(executionId);
      if (response.success) {
        loadExecution();
      } else {
        setError(response.message || 'Failed to cancel execution');
      }
    } catch (error) {
      console.error('Failed to cancel execution:', error);
      setError('Failed to cancel execution. Please try again.');
    }
  };

  const getStatusColor = (status: WorkflowExecutionStatus): string => {
    switch (status) {
      case WorkflowExecutionStatus._1: // Running
        return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30';
      case WorkflowExecutionStatus._2: // Completed
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
      case WorkflowExecutionStatus._3: // Failed
        return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
      case WorkflowExecutionStatus._4: // Cancelled
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800';
      case WorkflowExecutionStatus._5: // Paused
        return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
      default:
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800';
    }
  };

  const getLogLevelColor = (level: string): string => {
    switch (level?.toLowerCase()) {
      case 'error':
        return 'text-red-600 dark:text-red-400';
      case 'warning':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'info':
        return 'text-blue-600 dark:text-blue-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="space-y-4">
              <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
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
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Error loading execution</h3>
              <p className="mt-1 text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
            <div className="ml-auto pl-3">
              <Button variant="outline" size="sm" onClick={() => navigate(`/workflows/${workflowId}`)}>
                Back to Workflow
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!execution) {
    return null;
  }

  const progress = (execution.progress as any)?.percentage || 0;
  const isRunning = execution.status === WorkflowExecutionStatus._1;
  const isPaused = execution.status === WorkflowExecutionStatus._5;
  const isCompleted = execution.status === WorkflowExecutionStatus._2;
  const isFailed = execution.status === WorkflowExecutionStatus._3;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/workflows/${workflowId}`)}
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
              Workflow Execution
            </h1>
            <div className="flex items-center space-x-4 mt-1">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {execution.executionName || `Execution ${executionId?.slice(-8)}`}
              </span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(execution.status!)}`}>
                {execution.status}
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 sm:mt-0 flex space-x-2">
          {isRunning && (
            <Button
              variant="outline"
              onClick={handlePauseExecution}
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            >
              Pause
            </Button>
          )}
          
          {isPaused && (
            <Button
              variant="primary"
              onClick={handleResumeExecution}
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h6m2 5H7a2 2 0 01-2-2V8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2z" />
                </svg>
              }
            >
              Resume
            </Button>
          )}
          
          {(isRunning || isPaused) && (
            <Button
              variant="danger"
              onClick={handleCancelExecution}
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              }
            >
              Cancel
            </Button>
          )}
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
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Execution Progress</h2>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <span>Overall Progress</span>
                  <span>{progress.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isFailed ? 'bg-red-500' : isCompleted ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {execution.nodeStatuses && Object.keys(execution.nodeStatuses).length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Node Status</h3>
                  <div className="space-y-1">
                    {Object.entries(execution.nodeStatuses).map(([nodeId, status]) => (
                      <div key={nodeId} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <span className="text-sm text-gray-900 dark:text-white">
                          {getNodeDisplayName(nodeId)}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          status === 2 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                          status === 1 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                          status === 3 ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                        }`}>
                          {status === 2 ? 'Completed' : status === 1 ? 'Running' : status === 3 ? 'Failed' : 'Pending'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Execution Details Tabs */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('logs')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'logs'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  Execution Logs
                </button>
                <button
                  onClick={() => setActiveTab('outputs')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'outputs'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  Node Outputs ({Object.keys(nodeOutputs).length})
                </button>
                <button
                  onClick={() => setActiveTab('statistics')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'statistics'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  Statistics
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'logs' && (
                <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm h-96 overflow-y-auto">
                  {logs.length === 0 ? (
                    <div className="text-gray-500">No logs available</div>
                  ) : (
                    logs.map((log, index) => (
                      <div key={index} className="mb-1">
                        <span className="text-gray-500">
                          [{log.timestamp ? new Date(log.timestamp).toLocaleTimeString() : 'Unknown'}]
                        </span>
                        <span className={`ml-2 ${getLogLevelColor(log.level?.toString() || 'info')}`}>
                          {log.level?.toString()?.toUpperCase() || 'INFO'}
                        </span>
                        <span className="ml-2 text-green-400">
                          {log.message || 'No message'}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'outputs' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-96">
                  {/* Node List */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Select Node</h3>
                    <div className="border border-gray-200 dark:border-gray-600 rounded-lg h-80 overflow-y-auto">
                      {Object.keys(nodeOutputs).length === 0 ? (
                        <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                          No node outputs available
                        </div>
                      ) : (
                        Object.keys(nodeOutputs).map((nodeId) => (
                          <button
                            key={nodeId}
                            onClick={() => setSelectedNodeOutput(nodeId)}
                            className={`w-full text-left p-3 border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                              selectedNodeOutput === nodeId ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700' : ''
                            }`}
                          >
                            <div className="font-medium text-sm text-gray-900 dark:text-white">
                              {getNodeDisplayName(nodeId)}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Click to view output
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Output Content */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Output {selectedNodeOutput ? `for ${getNodeDisplayName(selectedNodeOutput)}` : ''}
                    </h3>
                    
                    {selectedNodeOutput && nodeOutputs[selectedNodeOutput] ? (
                      <div className="border border-gray-200 dark:border-gray-600 rounded-lg">
                        {/* Output Tabs */}
                        <div className="border-b border-gray-200 dark:border-gray-600">
                          <nav className="-mb-px flex space-x-4 px-4" aria-label="Output tabs">
                            <button
                              onClick={() => setOutputTab('stdout')}
                              className={`py-2 px-1 border-b-2 font-medium text-xs ${
                                outputTab === 'stdout'
                                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                              }`}
                            >
                              Standard Output
                            </button>
                            <button
                              onClick={() => setOutputTab('stderr')}
                              className={`py-2 px-1 border-b-2 font-medium text-xs ${
                                outputTab === 'stderr'
                                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                              }`}
                            >
                              Standard Error
                            </button>
                            <button
                              onClick={() => setOutputTab('files')}
                              className={`py-2 px-1 border-b-2 font-medium text-xs ${
                                outputTab === 'files'
                                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                              }`}
                            >
                              Output Files ({getNodeOutputData(selectedNodeOutput).outputFiles.length})
                            </button>
                          </nav>
                        </div>
                        
                        {/* Output Tab Content */}
                        <div className="h-64 overflow-y-auto">
                          {outputTab === 'stdout' && (
                            <div className="p-4">
                              {getNodeOutputData(selectedNodeOutput).stdout ? (
                                <pre className="text-sm text-gray-900 dark:text-gray-100 whitespace-pre-wrap font-mono">
                                  {getNodeOutputData(selectedNodeOutput).stdout}
                                </pre>
                              ) : (
                                <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                                  No standard output available
                                </div>
                              )}
                            </div>
                          )}
                          
                          {outputTab === 'stderr' && (
                            <div className="p-4">
                              {getNodeOutputData(selectedNodeOutput).stderr ? (
                                <pre className="text-sm text-red-600 dark:text-red-400 whitespace-pre-wrap font-mono">
                                  {getNodeOutputData(selectedNodeOutput).stderr}
                                </pre>
                              ) : (
                                <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                                  No error output available
                                </div>
                              )}
                            </div>
                          )}
                          
                          {outputTab === 'files' && (
                            <div className="p-4">
                              {getNodeOutputData(selectedNodeOutput).outputFiles.length > 0 ? (
                                <div className="space-y-2">
                                  {getNodeOutputData(selectedNodeOutput).outputFiles.map((file: any, fileIndex: number) => (
                                    <div key={fileIndex} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                                      <div className="flex items-center space-x-3">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <div>
                                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                                            {file.fileName}
                                          </div>
                                        </div>
                                      </div>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => downloadFile(file)}
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
                                <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                                  No output files available
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="border border-gray-200 dark:border-gray-600 rounded-lg h-80 flex items-center justify-center">
                        <div className="text-center text-gray-500 dark:text-gray-400">
                          {selectedNodeOutput ? 'No output data available' : 'Select a node to view its output'}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'statistics' && (
                <div className="space-y-4 h-96 overflow-y-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Total Nodes</h4>
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {execution?.nodeStatuses ? Object.keys(execution.nodeStatuses).length : 0}
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Completed Nodes</h4>
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {execution?.nodeStatuses ? Object.values(execution.nodeStatuses).filter(status => status === 2).length : 0}
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Failed Nodes</h4>
                      <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                        {execution?.nodeStatuses ? Object.values(execution.nodeStatuses).filter(status => status === 3).length : 0}
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Log Entries</h4>
                      <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                        {logs.length}
                      </div>
                    </div>
                  </div>
                  
                  {execution?.nodeStatuses && Object.keys(execution.nodeStatuses).length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Node Execution Timeline</h4>
                      <div className="space-y-2">
                        {Object.entries(execution.nodeStatuses).map(([nodeId, status]) => (
                          <div key={nodeId} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
                            <div className="flex items-center space-x-3">
                              <div className={`w-3 h-3 rounded-full ${
                                status === 2 ? 'bg-green-500' :
                                status === 1 ? 'bg-blue-500' :
                                status === 3 ? 'bg-red-500' :
                                'bg-gray-400'
                              }`}></div>
                              <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {getNodeDisplayName(nodeId)}
                              </span>
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {status === 2 ? 'Completed' : status === 1 ? 'Running' : status === 3 ? 'Failed' : 'Pending'}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Execution Info */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Execution Details</h2>
            <div className="space-y-3">
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Started</dt>
                <dd className="text-sm text-gray-900 dark:text-white">
                  {execution.startedAt ? new Date(execution.startedAt).toLocaleString() : 'Unknown'}
                </dd>
              </div>
              {execution.completedAt && (
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Completed</dt>
                  <dd className="text-sm text-gray-900 dark:text-white">
                    {new Date(execution.completedAt).toLocaleString()}
                  </dd>
                </div>
              )}
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Executed By</dt>
                <dd className="text-sm text-gray-900 dark:text-white">
                  {execution.executedByUsername || execution.executedBy || 'Unknown'}
                </dd>
              </div>
              {execution.workflowVersion && (
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Workflow Version</dt>
                  <dd className="text-sm text-gray-900 dark:text-white">
                    v{execution.workflowVersion}
                  </dd>
                </div>
              )}
            </div>
          </div>

          {/* Error Details */}
          {execution.errorMessage && (
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Error Details</h2>
              <div className="space-y-2">
                <div className="text-sm text-red-600 dark:text-red-400 font-medium">
                  {execution.errorMessage}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default WorkflowExecutionPage;