import React, { useState, useEffect } from 'react';
import Modal from '@/components/common/Modal';
import DynamicUIRenderer from './DynamicUIRenderer';
import { useUIWorkflowStore, UIInteractionSession } from '@/stores/uiWorkflowStore';
import { api } from '@/api/api';

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
  
  const { updateSession, addNotification } = useUIWorkflowStore();

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
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (formData: Record<string, any>) => {
    if (!session) return;

    try {
      setIsSubmitting(true);
      setError(null);

      // Convert form data to the format expected by the API
      const submissionData = Object.entries(formData).map(([key, value]) => ({
        name: key,
        value: value
      }));

      const response = await api.uiWorkflowClient.uIWorkflow_SubmitUIInteraction(
        session.sessionId,
        submissionData as any
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

  const handleSkip = async () => {
    if (!session) return;

    try {
      setIsSubmitting(true);
      setError(null);

      const response = await api.uiWorkflowClient.uIWorkflow_CancelUIInteraction(session.sessionId, { reason: 'User skipped interaction' } as any);

      if (response.success) {
        updateSession(session.sessionId, {
          status: 'Completed',
          completedAt: new Date()
        });

        addNotification({
          type: 'info',
          title: 'Input Skipped',
          message: 'The UI interaction was skipped. The workflow will continue.',
          autoHide: true,
          duration: 3000
        });

        onClose();
      } else {
        setError(response.message || 'Failed to skip input. Please try again.');
      }
    } catch (error) {
      console.error('Failed to skip UI interaction:', error);
      setError('Failed to skip input. Please try again.');
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

      const response = await api.uiWorkflowClient.uIWorkflow_CancelUIInteraction(
        session.sessionId,
        { reason: 'User cancelled interaction' } as any
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
      className="max-w-4xl"
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-900 dark:text-white">Workflow:</span>
              <p className="text-gray-600 dark:text-gray-400">{session.workflowId}</p>
            </div>
            <div>
              <span className="font-medium text-gray-900 dark:text-white">Execution:</span>
              <p className="text-gray-600 dark:text-gray-400">{session.executionId}</p>
            </div>
            <div>
              <span className="font-medium text-gray-900 dark:text-white">Node:</span>
              <p className="text-gray-600 dark:text-gray-400">{session.nodeId}</p>
            </div>
          </div>
        </div>

        {/* Dynamic UI Form */}
        <DynamicUIRenderer
          uiComponent={session.uiComponent}
          contextData={session.contextData}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          onSkip={session.uiComponent?.configuration?.allowSkip ? handleSkip : undefined}
          isSubmitting={isSubmitting}
        />
      </div>
    </Modal>
  );
};

export default UIInteractionModal;