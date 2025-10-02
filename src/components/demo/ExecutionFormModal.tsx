import { useState, useEffect } from 'react';
import { api } from '@/api/api';
import { ExecutionRequestDto } from '@/api/types';
import Modal from '@/components/common/Modal';
import ComponentForm from '@/components/common/ComponentForm';
import { Loader2, AlertCircle, CheckCircle, Zap } from 'lucide-react';

interface ExecutionFormModalProps {
  isOpen: boolean;
  appId: string | null;
  itemName: string | null;
  onClose: () => void;
}

export function ExecutionFormModal({ isOpen, appId, itemName, onClose }: ExecutionFormModalProps) {
  // UI Schema state
  const [uiSchema, setUiSchema] = useState<any | null>(null);
  const [isLoadingSchema, setIsLoadingSchema] = useState(false);

  // Execution state
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState<any | null>(null);
  const [executionError, setExecutionError] = useState<string | null>(null);

  // Fetch UI schema when modal opens
  useEffect(() => {
    if (isOpen && appId) {
      fetchUiSchema();
    } else {
      // Reset state when modal closes
      resetState();
    }
  }, [isOpen, appId]);

  const resetState = () => {
    setUiSchema(null);
    setExecutionResult(null);
    setExecutionError(null);
  };

  const fetchUiSchema = async () => {
    setIsLoadingSchema(true);

    try {
      const response = await api.demoShowcase.demoShowcase_GetPublicUiComponent(appId!);

      if (response.success && response.data) {
        let schema = null;

        // Try to get schema from configuration field (which is a JSON string)
        if (response.data.configuration) {
          try {
            schema = JSON.parse(response.data.configuration);
          } catch (parseError) {
            console.error('Error parsing configuration:', parseError);
          }
        }

        // Fallback to schema field if configuration is not available
        if (!schema && response.data.schema) {
          try {
            schema = typeof response.data.schema === 'string'
              ? JSON.parse(response.data.schema)
              : response.data.schema;
          } catch (parseError) {
            console.error('Error parsing schema:', parseError);
          }
        }

        setUiSchema(schema);
      } else {
        setUiSchema(null);
      }
    } catch (error) {
      console.error('Error loading UI schema:', error);
      setUiSchema(null);
    } finally {
      setIsLoadingSchema(false);
    }
  };

  const handleExecute = async (formData: Record<string, any>) => {
    setIsExecuting(true);
    setExecutionError(null);
    setExecutionResult(null);

    try {
      // Create execution request
      const requestDto = new ExecutionRequestDto({
        inputs: formData
      });

      const response = await api.demoShowcase.demoShowcase_ExecutePublicApp(appId!, requestDto);

      if (response.success && response.data) {
        setExecutionResult(response.data);
      } else {
        setExecutionError(response.message || 'Execution failed');
      }
    } catch (error) {
      console.error('Error executing app:', error);
      setExecutionError('Error executing app. Please try again.');
    } finally {
      setIsExecuting(false);
    }
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={itemName || 'Execute Demo'}
      size="md"
      className="!max-w-[70vw]"
    >
      <div className="space-y-6">
        {/* Loading State */}
        {isLoadingSchema && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600 dark:text-blue-400 mb-4" />
            <p className="text-gray-600 dark:text-gray-300">Loading form...</p>
          </div>
        )}

        {/* Dynamic Form - Show if UI schema exists */}
        {!isLoadingSchema && uiSchema && uiSchema.elements && uiSchema.elements.length > 0 && !executionResult && (
          <div>
            <ComponentForm
              elements={uiSchema.elements || []}
              onSubmit={handleExecute}
              onCancel={handleClose}
              isSubmitting={isExecuting}
              title="Input Parameters"
            />
          </div>
        )}

        {/* No Form - Direct execution button */}
        {!isLoadingSchema && (!uiSchema || !uiSchema.elements || uiSchema.elements.length === 0) && !executionResult && (
          <div className="space-y-4">
            <div className="rounded-md bg-blue-50 dark:bg-blue-900/20 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-blue-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    This app doesn't require any input parameters. Click Execute to run it directly.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={handleClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                onClick={() => handleExecute({})}
                disabled={isExecuting}
                className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-emerald-500 border border-transparent rounded-md hover:from-green-600 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isExecuting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Executing...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    Execute
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Execution Error */}
        {executionError && (
          <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Execution Failed</h3>
                <p className="mt-2 text-sm text-red-700 dark:text-red-300">{executionError}</p>
              </div>
            </div>
          </div>
        )}

        {/* Execution Success */}
        {executionResult && (
          <div className="space-y-4">
            <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800 dark:text-green-200">Execution Successful</h3>
                  {executionResult.executionId && (
                    <p className="mt-1 text-sm text-green-700 dark:text-green-300">
                      Execution ID: {executionResult.executionId}
                    </p>
                  )}
                  {executionResult.status && (
                    <p className="mt-1 text-sm text-green-700 dark:text-green-300">
                      Status: {executionResult.status}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Display Result */}
            {executionResult.result && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Result:</h4>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 overflow-auto max-h-96">
                  <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                    {typeof executionResult.result === 'string'
                      ? executionResult.result
                      : JSON.stringify(executionResult.result, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => {
                  setExecutionResult(null);
                  setExecutionError(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Execute Again
              </button>
              <button
                onClick={handleClose}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
