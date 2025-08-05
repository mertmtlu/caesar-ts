import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '@/api/api';
import { WorkflowExecutionResponseDto, WorkflowExecutionLogResponseDto, WorkflowDetailDto } from '@/api/types';
import { WorkflowExecutionStatus, SortDirection } from '@/api/enums';
import Button from '@/components/common/Button';
import { UIInteractionModal, UIWorkflowNotifications } from '@/components/ui-workflow';
import { useUIWorkflowStore, useUIWorkflowModal, useCurrentWorkflowPendingSessions } from '@/stores/uiWorkflowStore';
import { createSignalRService, getSignalRService } from '@/services/signalRService';
import { useAuth } from '@/contexts/AuthContext';

const WorkflowExecutionPage: React.FC = () => {
  const { workflowId, executionId } = useParams<{ workflowId: string; executionId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [execution, setExecution] = useState<WorkflowExecutionResponseDto | null>(null);
  const [logs, setLogs] = useState<WorkflowExecutionLogResponseDto[]>([]);
  const [nodeOutputs, setNodeOutputs] = useState<Record<string, any>>({});
  const [selectedNodeOutput, setSelectedNodeOutput] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'logs' | 'outputs' | 'statistics' | 'ui-interactions'>('logs');
  const [, setWorkflowDetails] = useState<WorkflowDetailDto | null>(null);
  const [nodeNameMap, setNodeNameMap] = useState<Record<string, string>>({});
  const [outputTab, setOutputTab] = useState<'stdout' | 'stderr' | 'files'>('stdout');
  const [workflowDetailsCache] = useState<Map<string, WorkflowDetailDto>>(new Map());

  // Helper function to load component configuration from executions page
  const loadComponentConfiguration = async (programId: string, _versionId: string): Promise<any[] | null> => {
    try {
      // First, get the component list to find the component ID
      const listResponse = await api.uiComponents.uiComponents_GetByProgram(
        programId,
        1,
        10,
        'CreatedDate',
        SortDirection._1 // Get newest first
      );

      if (listResponse.success && listResponse.data?.items && listResponse.data.items.length > 0) {
        // Find the first active component, or fall back to the newest
        const activeComponent = listResponse.data.items.find(c => c.status === 'active');
        const component = activeComponent || listResponse.data.items[0];
        
        // Try to get the component by ID to get full details
        try {
          if (!component.id) {
            console.error('Component ID is missing');
            return null;
          }
          
          const detailResponse = await api.uiComponents.uiComponents_GetById(component.id);
          
          if (detailResponse.success && detailResponse.data) {
            const fullComponent = detailResponse.data;
            if (fullComponent.configuration) {
              try {
                let schema: any;
                
                // Check if configuration is already an object or a JSON string
                if (typeof fullComponent.configuration === 'string') {
                  schema = JSON.parse(fullComponent.configuration);
                } else {
                  schema = fullComponent.configuration;
                }
                return schema.elements || [];
              } catch (error) {
                console.error('Failed to process component configuration:', error);
                console.error('Configuration data:', fullComponent.configuration);
                return null;
              }
            }
          }
        } catch (detailError) {
          console.error('Failed to fetch component details:', detailError);
        }
        
        return null;
      }
      return null;
    } catch (error) {
      console.error('Failed to load component configuration:', error);
      return null;
    }
  };

  // Helper function to convert UIElement[] to UIInputField[]
  const convertUIElementsToFields = (elements: any[]): any[] => {
    return elements.map(element => {
      // Convert ElementType to our field type
      let fieldType = 'text';
      switch (element.type) {
        case 'text_input':
          fieldType = 'text';
          break;
        case 'email_input':
          fieldType = 'email';
          break;
        case 'number_input':
          fieldType = 'number';
          break;
        case 'textarea':
          fieldType = 'textarea';
          break;
        case 'dropdown':
          fieldType = 'select';
          break;
        case 'checkbox':
          fieldType = 'checkbox';
          break;
        default:
          fieldType = 'text';
      }

      // Convert validation rules
      let validation: any = {};
      if (element.validation) {
        element.validation.forEach((rule: any) => {
          switch (rule.type) {
            case 'minLength':
              validation.minLength = rule.value;
              break;
            case 'maxLength':
              validation.maxLength = rule.value;
              break;
            case 'pattern':
              validation.pattern = rule.value;
              break;
          }
        });
      }

      // Convert options for dropdown
      let options = undefined;
      if (element.options && Array.isArray(element.options)) {
        options = element.options.map((opt: string) => ({ value: opt, label: opt }));
      }

      return {
        name: element.name,
        type: fieldType,
        label: element.label,
        required: element.required || false,
        placeholder: element.placeholder,
        defaultValue: element.defaultValue,
        options: options,
        validation: Object.keys(validation).length > 0 ? validation : undefined
      };
    });
  };

  // Function to enrich pending sessions with UI components from workflow nodes and programs
  const enrichPendingSessionsWithUIComponents = async (sessions: any[]): Promise<any[]> => {
    if (!workflowId || sessions.length === 0) return sessions;

    try {
      // Get workflow details if not cached
      let workflowDetails = workflowDetailsCache.get(workflowId);
      if (!workflowDetails) {
        const response = await api.workflows.workflows_GetById(workflowId);
        if (response.success && response.data) {
          workflowDetails = WorkflowDetailDto.fromJS(response.data);
          workflowDetailsCache.set(workflowId, workflowDetails);
        }
      }

      if (!workflowDetails?.nodes) return sessions;

      // Create a map of nodeId -> workflow node
      const nodeMap = new Map();
      workflowDetails.nodes.forEach(node => {
        if (node.id) {
          nodeMap.set(node.id, node);
        }
      });

      // Enrich each session
      const enrichedSessions = await Promise.all(
        sessions.map(async (session) => {
          // If session already has uiComponent, return as is
          if (session.uiComponent) return session;

          const workflowNode = nodeMap.get(session.nodeId);
          if (!workflowNode?.programId) return session;

          try {
            // Fetch program details to get UI components
            const programResponse = await api.programs.programs_GetById(workflowNode.programId);
            if (programResponse.success && programResponse.data) {
              const program = programResponse.data;
              
              // Look for UI components in the program
              const uiComponents = (program as any).uiComponents || [];
              if (uiComponents.length > 0) {
                // Find the first active component, or fall back to the newest
                const activeComponent = uiComponents.find((c: any) => c.status === 'active');
                const component = activeComponent || uiComponents[0];
                
                // Get the component configuration to extract UIElements
                const componentElements = await loadComponentConfiguration(workflowNode.programId, program.currentVersion || '');
                
                // Convert UIElement[] to UIInputField[]
                const fields = componentElements ? convertUIElementsToFields(componentElements) : [];
                
                return {
                  ...session,
                  uiComponent: {
                    id: component.id || 'unknown',
                    name: component.name || program.name || 'UI Interaction',
                    type: component.type || 'form',
                    configuration: {
                      title: component.name || program.name || 'UI Interaction',
                      description: 'Please provide the required input to continue workflow execution.',
                      fields: fields,
                      submitLabel: 'Submit',
                      cancelLabel: 'Cancel',
                      allowSkip: false
                    }
                  }
                };
              }
            }
          } catch (error) {
            console.error(`Failed to fetch program details for node ${session.nodeId}:`, error);
          }

          // If no UI components found, create a default one
          return {
            ...session,
            uiComponent: {
              id: 'default',
              name: workflowNode.name || workflowNode.programName || 'UI Interaction',
              type: 'form',
              configuration: {
                title: workflowNode.name || workflowNode.programName || 'UI Interaction',
                description: 'Please provide the required input to continue workflow execution.',
                fields: [],
                submitLabel: 'Submit',
                cancelLabel: 'Cancel',
                allowSkip: false
              }
            }
          };
        })
      );

      return enrichedSessions;
    } catch (error) {
      console.error('Failed to enrich pending sessions:', error);
      return sessions;
    }
  };

  // UI Workflow integration
  const {
    setCurrentWorkflow,
    setConnectionState,
    addSession,
    updateSession,
    addNotification
  } = useUIWorkflowStore();
  
  const { isOpen: isModalOpen, activeSession, openModal, closeModal } = useUIWorkflowModal();
  const basePendingSessions = useCurrentWorkflowPendingSessions();
  const [enrichedPendingSessions, setEnrichedPendingSessions] = useState<any[]>([]);

  // Enrich pending sessions when they change
  useEffect(() => {
    const enrichSessions = async () => {
      if (basePendingSessions.length > 0) {
        const enriched = await enrichPendingSessionsWithUIComponents(basePendingSessions);
        setEnrichedPendingSessions(enriched);
      } else {
        setEnrichedPendingSessions([]);
      }
    };
    
    enrichSessions();
  }, [basePendingSessions]);

  // Use enriched sessions throughout the component
  const pendingSessions = enrichedPendingSessions;
  
  // Initialize SignalR connection and UI workflow state
  useEffect(() => {
    if (workflowId && executionId) {
      setCurrentWorkflow(workflowId, executionId);
      initializeSignalR();
    }

    return () => {
      // Cleanup on unmount
      const signalRService = getSignalRService();
      if (signalRService && workflowId) {
        signalRService.leaveWorkflowGroup(workflowId);
      }
      setCurrentWorkflow(null, null);
    };
  }, [workflowId, executionId]);

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

  // SignalR initialization and event handling
  const initializeSignalR = useCallback(async () => {
    if (!workflowId || !user) return;

    try {
      const baseUrl = api.getBaseUrl();
      const getToken = () => localStorage.getItem('accessToken');
      
      const signalRService = createSignalRService(baseUrl, getToken);
      
      // Set up event listeners
      const unsubscribeUIAvailable = signalRService.onUIInteractionAvailable((data) => {
        
        // Create session from SignalR event
        const session = {
          sessionId: data.sessionId,
          workflowId: data.workflowId,
          executionId: data.executionId,
          nodeId: data.nodeId,
          status: 'Pending' as const,
          uiComponent: data.uiComponent as any,
          contextData: data.contextData,
          timeoutAt: new Date(data.timeoutAt),
          createdAt: new Date()
        };
        
        addSession(session);
        
        // Show notification
        addNotification({
          type: 'info',
          title: 'User Input Required',
          message: `Workflow execution is paused waiting for input at node: ${nodeNameMap[data.nodeId] || data.nodeId}`,
          autoHide: false
        });
        
        // Auto-open modal for immediate attention
        openModal(data.sessionId);
      });
      
      const unsubscribeStatusChanged = signalRService.onUIInteractionStatusChanged((data) => {
        updateSession(data.sessionId, {
          status: data.status as any,
          completedAt: data.completedAt ? new Date(data.completedAt) : undefined
        });
        
        // Refresh execution data when UI interaction completes
        if (data.status === 'Completed' || data.status === 'Cancelled') {
          // Trigger a refresh by calling the load function
          if (executionId) {
            api.workflows.workflows_GetExecutionStatus(executionId).then((response) => {
              if (response.success && response.data) {
                setExecution(WorkflowExecutionResponseDto.fromJS(response.data));
              }
            });
          }
        }
      });
      
      const unsubscribeConnectionState = signalRService.onConnectionStateChanged((state) => {
        setConnectionState(state);
      });
      
      // Connect and join workflow group
      const connected = await signalRService.connect();
      if (connected) {
        await signalRService.joinWorkflowGroup(workflowId);
        
        // Load existing UI interactions for this workflow
        if (workflowId && executionId) {
          try {
            const response = await api.uiWorkflowClient.uIWorkflow_GetWorkflowUIInteractions(workflowId, executionId);
            if (response.success && response.data) {
              response.data['sessions']?.forEach((sessionData: any) => {
                const session = {
                  sessionId: sessionData.sessionId,
                  workflowId: sessionData.workflowId,
                  executionId: sessionData.executionId,
                  nodeId: sessionData.nodeId,
                  status: sessionData.status,
                  uiComponent: sessionData.uiComponent,
                  contextData: sessionData.contextData,
                  timeoutAt: new Date(sessionData.timeoutAt),
                  createdAt: new Date(sessionData.createdAt),
                  completedAt: sessionData.completedAt ? new Date(sessionData.completedAt) : undefined
                };

                addSession(session);
              })
            }
          } catch (error) {
            console.error('Failed to load existing UI interactions:', error);
            // Don't show error to user as this is not critical for the page functionality
          }
        }
      }
      
      // Store cleanup functions
      return () => {
        unsubscribeUIAvailable();
        unsubscribeStatusChanged();
        unsubscribeConnectionState();
      };
      
    } catch (error) {
      console.error('Failed to initialize SignalR:', error);
      addNotification({
        type: 'error',
        title: 'Connection Error',
        message: 'Failed to establish real-time connection for UI interactions.',
        autoHide: true
      });
    }
  }, [workflowId, executionId, user, nodeNameMap, addSession, updateSession, addNotification, openModal, setConnectionState]);

  

  const loadExecution = async () => {
    if (!executionId) return;

    try {
      setError(null);

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
    if (!executionId) return;
    
    try {
      // Extract file path - assuming file could be a string path or an object with fileName/path
      const filePath = typeof file === 'string' ? file : (file.path || file.fileName || file);
      const fileName = typeof file === 'string' 
        ? filePath.split('/').pop() || 'download' 
        : (file.fileName || file.path?.split('/').pop() || 'download');
      
      // Use the new workflow-specific download API endpoint
      const response = await api.workflows.workflows_DownloadExecutionFile(executionId, filePath);
      
      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to download file');
      }
      
      // Get the file content from the response
      const fileData = response.data;
      
      if (fileData.content) {
        // Convert base64 to blob if the content is base64 encoded
        const byteCharacters = atob(fileData.content);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray]);
        
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
      } else {
        throw new Error('No file content received from server');
      }
      
    } catch (error) {
      console.error('Failed to download file:', error);
      alert(`Failed to download file: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const downloadAllFiles = async () => {
    if (!executionId) return;
    
    try {
      // Use the new workflow-specific download all files API endpoint
      await api.workflows.workflows_DownloadAllExecutionFiles(executionId);
      
      // The API endpoint handles the file download directly, 
      // so we don't need to handle the response here
      
    } catch (error) {
      console.error('Failed to download all files:', error);
      alert(`Failed to download all files: ${error instanceof Error ? error.message : 'Unknown error'}`);
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

  const progress = execution.progress?.percentComplete || 0;
  
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
                
                {/* Additional Progress Details */}
                {execution.progress && (
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {execution.progress.totalNodes && (
                      <span>
                        {execution.progress.completedNodes || 0}/{execution.progress.totalNodes} nodes completed
                      </span>
                    )}
                    {execution.progress.currentPhase && (
                      <span>Phase: {execution.progress.currentPhase}</span>
                    )}
                  </div>
                )}
              </div>

              {execution.nodeStatuses && Object.keys(execution.nodeStatuses).length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Node Status</h3>
                  <div className="space-y-1">
                    {Object.entries(execution.nodeStatuses).map(([nodeId, status]) => {
                      const nodeHasPendingUIInteraction = pendingSessions.some(session => session.nodeId === nodeId);
                      return (
                        <div key={nodeId} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-900 dark:text-white">
                              {getNodeDisplayName(nodeId)}
                            </span>
                            {nodeHasPendingUIInteraction && (
                              <div className="flex items-center space-x-1">
                                <svg className="w-4 h-4 text-yellow-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                                <span className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">
                                  Input Required
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            {nodeHasPendingUIInteraction && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const session = pendingSessions.find(s => s.nodeId === nodeId);
                                  if (session) openModal(session.sessionId);
                                }}
                                className="text-xs px-2 py-1 h-6"
                              >
                                Provide Input
                              </Button>
                            )}
                            <span className={`text-xs px-2 py-1 rounded ${
                              nodeHasPendingUIInteraction 
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                : status === 2 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                : status === 1 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                                : status === 3 ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                            }`}>
                              {nodeHasPendingUIInteraction 
                                ? 'Awaiting Input' 
                                : status === 2 ? 'Completed' 
                                : status === 1 ? 'Running' 
                                : status === 3 ? 'Failed' 
                                : 'Pending'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
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
                <button
                  onClick={() => setActiveTab('ui-interactions')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'ui-interactions'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  UI Interactions ({pendingSessions.length})
                  {pendingSessions.length > 0 && (
                    <span className="ml-1 inline-flex items-center justify-center w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  )}
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
                <div className="space-y-4">
                  {/* Download All Files Button */}
                  {Object.keys(nodeOutputs).length > 0 && (
                    <div className="flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={downloadAllFiles}
                        leftIcon={
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        }
                      >
                        Download All Files
                      </Button>
                    </div>
                  )}
                  
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

              {activeTab === 'ui-interactions' && (
                <div className="space-y-4 h-96 overflow-y-auto">
                  {pendingSessions.length > 0 && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <svg className="w-5 h-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                            User Input Required
                          </h4>
                          <p className="text-sm text-yellow-700 dark:text-yellow-300">
                            {pendingSessions.length} workflow node{pendingSessions.length === 1 ? '' : 's'} waiting for user input.
                          </p>
                        </div>
                        <div className="ml-auto">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => pendingSessions.length > 0 && openModal(pendingSessions[0].sessionId)}
                            className="border-yellow-300 text-yellow-800 hover:bg-yellow-100 dark:border-yellow-600 dark:text-yellow-200 dark:hover:bg-yellow-900/30"
                          >
                            Provide Input
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    {pendingSessions.length === 0 ? (
                      <div className="text-center py-8">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No UI Interactions</h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          This workflow execution doesn't have any UI interaction requirements.
                        </p>
                      </div>
                    ) : (
                      pendingSessions.map((session) => (
                        <div key={session.sessionId} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                  {session.uiComponent?.name || 'UI Interaction'}
                                </h4>
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                                  {session.status}
                                </span>
                              </div>
                              
                              <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                <p><span className="font-medium">Node:</span> {getNodeDisplayName(session.nodeId)}</p>
                                <p><span className="font-medium">Type:</span> {session.uiComponent?.type || 'Unknown'}</p>
                                {session.uiComponent.configuration?.description && (
                                  <p className="mt-1">{session.uiComponent.configuration.description}</p>
                                )}
                              </div>
                              
                              <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Timeout: {new Date(session.timeoutAt).toLocaleString()}</span>
                              </div>
                            </div>
                            
                            <div className="ml-4 flex-shrink-0 space-y-2">
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={() => openModal(session.sessionId)}
                              >
                                Provide Input
                              </Button>
                              {session.uiComponent?.configuration?.allowSkip && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    // Handle skip directly
                                    // api.uiWorkflowClient.uIWorkflow_SkipUIInteraction(session.sessionId);
                                  }}
                                  className="block w-full"
                                >
                                  Skip
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
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
      
      {/* UI Interaction Modal */}
      <UIInteractionModal
        session={activeSession || undefined}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
      
      {/* UI Workflow Notifications */}
      <UIWorkflowNotifications />
    </div>
  );
};

export default WorkflowExecutionPage;