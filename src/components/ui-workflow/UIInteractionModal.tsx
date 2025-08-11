import React, { useState, useEffect } from 'react';
import Modal from '@/components/common/Modal';
import ComponentForm from '@/components/common/ComponentForm';
import { useUIWorkflowStore, UIInteractionSession } from '@/stores/uiWorkflowStore';
import { api } from '@/api/api';
import { UIInteractionSubmissionRequest, CancelUIInteractionRequest } from '@/api/types';
import { UIElement, ComponentSchema } from '@/types/componentDesigner';

interface UIInteractionModalProps {
  session?: UIInteractionSession;
  isOpen: boolean;
  onClose: () => void;
}

const UIInteractionModal: React.FC<UIInteractionModalProps> = ({
  session,
  isOpen,
  onClose
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [uiElements, setUIElements] = useState<UIElement[]>([]);
  const [isLoadingComponent, setIsLoadingComponent] = useState(false);
  const [workflowName, setWorkflowName] = useState<string | null>(null);
  const [nodeName, setNodeName] = useState<string | null>(null);
  const [isLoadingContext, setIsLoadingContext] = useState(false);
  
  const { updateSession, addNotification } = useUIWorkflowStore();

  // Fetch workflow and node names when session changes
  useEffect(() => {
    const fetchContextInfo = async () => {
      if (!session) {
        setWorkflowName(null);
        setNodeName(null);
        return;
      }

      try {
        setIsLoadingContext(true);
        
        // Get workflow details to fetch workflow name and node names
        const workflowResponse = await api.workflows.workflows_GetById(session.workflowId);
        if (workflowResponse.success && workflowResponse.data) {
          setWorkflowName(workflowResponse.data.name || null);
          
          // Find the specific node name from the workflow nodes
          const targetNode = workflowResponse.data.nodes?.find(node => node.id === session.nodeId);
          setNodeName(targetNode?.name || null);
        }
      } catch (error) {
        console.error('Failed to fetch workflow context:', error);
        setWorkflowName(null);
        setNodeName(null);
      } finally {
        setIsLoadingContext(false);
      }
    };

    fetchContextInfo();
  }, [session?.workflowId, session?.nodeId]);

  // Fetch UI component when session changes
  useEffect(() => {
    const fetchUIComponent = async () => {
      if (!session) {
        setUIElements([]);
        return;
      }

      // If session has uiComponentId, fetch from API
      if (session.uiComponentId) {
        try {
          setIsLoadingComponent(true);
          setError(null);

          const response = await api.uiComponents.uiComponents_GetById(session.uiComponentId);
          
          if (response.success && response.data) {
            const componentData = response.data;
            
            // Parse the configuration if it's a JSON string
            let schema: ComponentSchema;
            if (componentData.configuration) {
              try {
                if (typeof componentData.configuration === 'string') {
                  schema = JSON.parse(componentData.configuration);
                } else {
                  schema = componentData.configuration as ComponentSchema;
                }
                
                // Use the elements from the component schema
                setUIElements(schema.elements || []);
              } catch (parseError) {
                console.error('Failed to parse UI component configuration:', parseError);
                setError('Failed to parse UI component configuration');
                setUIElements([]);
              }
            } else {
              setUIElements([]);
            }
          } else {
            throw new Error(response.message || 'Failed to fetch UI component');
          }
        } catch (error) {
          console.error('Failed to fetch UI component:', error);
          setError('Failed to load UI component');
          setUIElements([]);
        } finally {
          setIsLoadingComponent(false);
        }
      } else {
        // Fallback: no uiComponentId provided, no UI elements to show
        setUIElements([]);
      }
    };

    fetchUIComponent();
  }, [session?.uiComponentId]);

  // Calculate time remaining until session timeout
  useEffect(() => {
    if (!session || !isOpen) return;

    const updateTimeRemaining = () => {
      const now = new Date().getTime();
      const timeout = new Date(session.timeoutAt).getTime();
      const remaining = Math.max(0, Math.floor((timeout - now) / 1000));
      setTimeRemaining(remaining);

      if (remaining <= 0) {
        addNotification({
          type: 'warning',
          title: 'Session Timeout',
          message: 'The UI interaction session has timed out.',
          autoHide: false
        });
        onClose();
      }
    };

    updateTimeRemaining();
    const interval = setInterval(updateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [session, isOpen, addNotification, onClose]);

  const formatTimeRemaining = (seconds: number): string => {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const remainingSeconds = seconds % 60;

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m ${remainingSeconds}s`;
    } else {
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
  };

  const handleSubmit = async (formData: Record<string, any>) => {
    if (!session) return;

    try {
      setIsSubmitting(true);
      setError(null);

      // Create submission request using the proper API type
      const submissionRequest = new UIInteractionSubmissionRequest({
        responseData: formData,
        action: 'submit',
        comments: undefined
      });

      const response = await api.uiWorkflowClient.uIWorkflow_SubmitUIInteraction(
        session.sessionId,
        submissionRequest
      );

      if (response.success) {
        // Update session status
        updateSession(session.sessionId, {
          status: 'Completed',
          completedAt: new Date()
        });

        addNotification({
          type: 'success',
          title: 'Input Submitted',
          message: 'Your input has been submitted successfully. The workflow will continue.',
          autoHide: true,
          duration: 3000
        });

        onClose();
      } else {
        setError(response.message || 'Failed to submit input. Please try again.');
      }
    } catch (error) {
      console.error('Failed to submit UI interaction:', error);
      setError('Failed to submit input. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = async () => {
    if (!session) {
      onClose();
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const cancelRequest = new CancelUIInteractionRequest({
        reason: 'User cancelled interaction'
      });

      const response = await api.uiWorkflowClient.uIWorkflow_CancelUIInteraction(
        session.sessionId,
        cancelRequest
      );

      if (response.success) {
        updateSession(session.sessionId, {
          status: 'Cancelled',
          completedAt: new Date()
        });

        addNotification({
          type: 'info',
          title: 'Input Cancelled',
          message: 'The UI interaction was cancelled.',
          autoHide: true,
          duration: 3000
        });
      } else {
        // Even if API call fails, we should still close the modal
        console.error('Failed to cancel UI interaction:', response.message);
      }
    } catch (error) {
      console.error('Failed to cancel UI interaction:', error);
    } finally {
      setIsSubmitting(false);
      onClose();
    }
  };

  if (!session) {
    return null;
  }

  const isTimeoutWarning = timeRemaining <= 300; // 5 minutes
  const isTimeoutCritical = timeRemaining <= 60; // 1 minute

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="User Input Required"
      size="lg"
      className="max-w-3xl"
    >
      <div className="space-y-6">
        {/* Session Info Header */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  Workflow Execution Paused
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  The workflow is waiting for your input to continue execution.
                </p>
              </div>
            </div>
            
            {/* Timeout Indicator */}
            <div className={`text-right ${
              isTimeoutCritical 
                ? 'text-red-600 dark:text-red-400' 
                : isTimeoutWarning 
                  ? 'text-yellow-600 dark:text-yellow-400' 
                  : 'text-gray-600 dark:text-gray-400'
            }`}>
              <div className="text-xs font-medium">Time Remaining</div>
              <div className={`text-lg font-mono ${
                isTimeoutCritical ? 'animate-pulse' : ''
              }`}>
                {formatTimeRemaining(timeRemaining)}
              </div>
            </div>
          </div>
          
          {/* Timeout Warning */}
          {isTimeoutWarning && (
            <div className={`mt-3 p-2 rounded ${
              isTimeoutCritical 
                ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200' 
                : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200'
            }`}>
              <div className="text-xs font-medium">
                {isTimeoutCritical 
                  ? '⚠️ Session will timeout soon! Please submit your input.' 
                  : '⏰ Session will timeout in a few minutes.'}
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
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

        {/* Workflow Context Info */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          {isLoadingContext ? (
            <div className="flex justify-center items-center py-4">
              <svg className="w-4 h-4 animate-spin text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Loading context...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-900 dark:text-white">Workflow:</span>
                <p className="text-gray-600 dark:text-gray-400">
                  {workflowName || 'Unknown Workflow'}
                </p>
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">Node:</span>
                <p className="text-gray-600 dark:text-gray-400">
                  {nodeName || 'Unknown Node'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Loading indicator */}
        {isLoadingComponent && (
          <div className="flex justify-center items-center py-8">
            <svg className="w-6 h-6 animate-spin text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="ml-2 text-gray-600 dark:text-gray-400">Loading UI component...</span>
          </div>
        )}

        {/* Component Form */}
        {!isLoadingComponent && (
          <>
            {uiElements.length > 0 ? (
              <ComponentForm
                elements={uiElements}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                isSubmitting={isSubmitting}
                title="Please provide the required input"
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
              />
            ) : (
              <div className="text-center py-8">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No UI Component Available</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  This workflow step does not have a UI component configured.
                </p>
                <div className="mt-4 flex justify-center space-x-3">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Modal>
  );
};

export default UIInteractionModal;