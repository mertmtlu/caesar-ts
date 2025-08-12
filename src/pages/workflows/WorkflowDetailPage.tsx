import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '@/api/api';
import { WorkflowDetailDto, WorkflowStatisticsDto, WorkflowPermissionDto, WorkflowExecutionRequest, WorkflowNameDescriptionUpdateDto } from '@/api/types';
import { WorkflowStatus } from '@/api/enums';
import Button from '@/components/common/Button';
import WorkflowPermissionsModal from '@/components/workflow/WorkflowPermissionsModal';
import WorkflowExportModal from '@/components/workflow/WorkflowExportModal';

const WorkflowDetailPage: React.FC = () => {
  const { workflowId } = useParams<{ workflowId: string }>();
  const navigate = useNavigate();
  
  const [workflow, setWorkflow] = useState<WorkflowDetailDto | null>(null);
  const [statistics, setStatistics] = useState<WorkflowStatisticsDto | null>(null);
  const [executionHistory, setExecutionHistory] = useState<any[]>([]);
  const [activeExecutions, setActiveExecutions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'analytics'>('overview');
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  
  // Editing states
  const [isEditingName, setIsEditingName] = useState(false);
  const [editingName, setEditingName] = useState('');
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editingDescription, setEditingDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (workflowId) {
      loadWorkflowDetails();
    }
  }, [workflowId]);

  const loadWorkflowDetails = async () => {
    if (!workflowId) return;

    try {
      setIsLoading(true);
      setError(null);

      const [workflowResponse, statsResponse, historyResponse, activeResponse] = await Promise.all([
        api.workflows.workflows_GetById(workflowId),
        api.workflows.workflows_GetStatistics(workflowId),
        api.workflows.workflows_GetExecutionHistory(workflowId, 50),
        api.workflows.workflows_GetActiveExecutions()
      ]);

      if (workflowResponse.success && workflowResponse.data) {
        setWorkflow(WorkflowDetailDto.fromJS(workflowResponse.data));
      } else {
        setError(workflowResponse.message || 'Failed to load workflow details');
      }

      if (statsResponse.success && statsResponse.data) {
        setStatistics(WorkflowStatisticsDto.fromJS(statsResponse.data));
      }

      if (historyResponse.success && historyResponse.data) {
        setExecutionHistory(historyResponse.data || []);
      }

      if (activeResponse.success && activeResponse.data) {
        const filteredActive = (activeResponse.data || []).filter((exec: any) => exec.workflowId === workflowId);
        setActiveExecutions(filteredActive);
      }
    } catch (error) {
      console.error('Failed to load workflow details:', error);
      setError('Failed to load workflow details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExecuteWorkflow = async () => {
    if (!workflowId) return;

    try {
      const workflow = new WorkflowExecutionRequest({
        workflowId: workflowId
      });

      const response = await api.workflows.workflows_Execute(workflowId, workflow);
      if (response.success && response.data) {
        navigate(`/workflows/${workflowId}/execution/${response.data.id}`);
      } else {
        setError(response.message || 'Failed to execute workflow');
      }
    } catch (error: unknown) {
      console.error('Failed to execute workflow:', error);
      setError((error as Error).message || 'Failed to execute workflow');
    }
  };

  const handlePermissionsUpdated = (permissions: WorkflowPermissionDto) => {
    if (workflow) {
      setWorkflow(new WorkflowDetailDto({ ...workflow, permissions }));
    }
  };

  // Update workflow name and description
  const handleUpdateWorkflowMetadata = async (name?: string, description?: string) => {
    if (!workflowId || !workflow) return;

    try {
      setIsSaving(true);
      setError(null);
      
      const response = await api.workflows.workflows_UpdateNameDescription(workflowId, new WorkflowNameDescriptionUpdateDto({
        name: name,
        description: description,
      }));
      
      if (response.success && response.data) {
        const updatedWorkflow = WorkflowDetailDto.fromJS(response.data);
        setWorkflow(updatedWorkflow);
      } else {
        setError(response.message || 'Failed to update workflow');
      }
    } catch (error) {
      console.error('Failed to update workflow:', error);
      setError('Failed to update workflow. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Name editing handlers
  const handleStartEditingName = () => {
    setEditingName(workflow?.name || '');
    setIsEditingName(true);
  };

  const handleSaveName = async () => {
    const trimmedName = editingName.trim();
    if (!trimmedName) {
      setIsEditingName(false);
      return;
    }
    
    if (trimmedName !== workflow?.name) {
      await handleUpdateWorkflowMetadata(trimmedName);
    }
    setIsEditingName(false);
  };

  const handleCancelEditingName = () => {
    setEditingName('');
    setIsEditingName(false);
  };

  // Description editing handlers
  const handleStartEditingDescription = () => {
    setEditingDescription(workflow?.description || '');
    setIsEditingDescription(true);
  };

  const handleSaveDescription = async () => {
    if (editingDescription !== workflow?.description) {
      await handleUpdateWorkflowMetadata(undefined, editingDescription);
    }
    setIsEditingDescription(false);
  };

  const handleCancelEditingDescription = () => {
    setEditingDescription('');
    setIsEditingDescription(false);
  };

  const getStatusColor = (status: WorkflowStatus): string => {
    switch (status) {
      case WorkflowStatus._1: // Published
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
      case WorkflowStatus._0: // Draft
        return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
      case WorkflowStatus._2: // Archived
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800';
      default:
        return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30';
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
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
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

  if (error && !workflow) {
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
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Error loading workflow</h3>
              <p className="mt-1 text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
            <div className="ml-auto pl-3">
              <Button variant="outline" size="sm" onClick={() => navigate('/workflows')}>
                Back to Workflows
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!workflow) {
    return null;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/workflows')}
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            }
          >
            Back
          </Button>
          <div>
            {isEditingName ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveName();
                    if (e.key === 'Escape') handleCancelEditingName();
                  }}
                  onBlur={handleSaveName}
                  autoFocus
                  disabled={isSaving}
                  className="text-2xl font-bold bg-transparent border-b-2 border-blue-500 focus:outline-none text-gray-900 dark:text-white min-w-[300px]"
                  placeholder="Workflow name"
                />
                <button
                  onClick={handleSaveName}
                  disabled={isSaving}
                  className="p-1 text-green-600 hover:text-green-700 disabled:opacity-50"
                  title="Save name"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </button>
                <button
                  onClick={handleCancelEditingName}
                  disabled={isSaving}
                  className="p-1 text-red-600 hover:text-red-700 disabled:opacity-50"
                  title="Cancel editing"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 group">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {workflow.name}
                </h1>
                <button
                  onClick={handleStartEditingName}
                  className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-opacity"
                  title="Edit workflow name"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              </div>
            )}
            <div className="flex items-center space-x-4 mt-1">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                by {workflow.creator} • v{workflow.version}
              </span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(workflow.status!)}`}>
                {workflow.status}
              </span>
              {workflow.isTemplate && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                  Template
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/workflows/${workflowId}/designer`)}
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            }
          >
            Edit Designer
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setShowPermissionsModal(true)}
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            }
          >
            Share
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setShowExportModal(true)}
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
          >
            Export
          </Button>
          
          <Button
            variant="primary"
            onClick={handleExecuteWorkflow}
            disabled={workflow.status !== WorkflowStatus._1}
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h6m2 5H7a2 2 0 01-2-2V8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2z" />
              </svg>
            }
          >
            Execute
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
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Executions Alert */}
          {activeExecutions.length > 0 && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    Active Execution{activeExecutions.length > 1 ? 's' : ''}
                  </h3>
                  <div className="mt-1 text-sm text-blue-700 dark:text-blue-300">
                    {activeExecutions.length} execution{activeExecutions.length > 1 ? 's' : ''} currently running
                    <button
                      onClick={() => navigate(`/workflows/${workflowId}/execution/${activeExecutions[0].id}`)}
                      className="ml-2 font-medium underline hover:no-underline"
                    >
                      View latest
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'overview'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'history'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  Execution History ({executionHistory.length})
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'analytics'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  Analytics
                </button>
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Description</h3>
                    {isEditingDescription ? (
                      <div className="space-y-2">
                        <textarea
                          value={editingDescription}
                          onChange={(e) => setEditingDescription(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.metaKey) handleSaveDescription();
                            if (e.key === 'Escape') handleCancelEditingDescription();
                          }}
                          autoFocus
                          disabled={isSaving}
                          className="w-full p-3 text-gray-600 dark:text-gray-400 bg-transparent border-2 border-blue-500 rounded-md focus:outline-none resize-none"
                          placeholder="Workflow description"
                          rows={3}
                        />
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={handleSaveDescription}
                            disabled={isSaving}
                            className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEditingDescription}
                            disabled={isSaving}
                            className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
                          >
                            Cancel
                          </button>
                          <span className="text-xs text-gray-500">Press Cmd+Enter to save</span>
                        </div>
                      </div>
                    ) : (
                      <div className="group relative">
                        <p className="text-gray-600 dark:text-gray-400 min-h-[1.5rem]">
                          {workflow.description || 'No description provided'}
                        </p>
                        <button
                          onClick={handleStartEditingDescription}
                          className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-opacity"
                          title="Edit description"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Workflow Structure */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Workflow Structure</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {workflow.nodes?.length || 0}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Nodes</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                          {workflow.edges?.length || 0}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Connections</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {executionHistory.filter(e => e.status === 2).length}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Successful</div>
                      </div>
                    </div>
                  </div>

                  {/* Nodes List */}
                  {workflow.nodes && workflow.nodes.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Nodes</h3>
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {workflow.nodes.map((node, index) => (
                          <div
                            key={node.id || index}
                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center text-white text-sm font-medium">
                                {index + 1}
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                  {node.name || `Node ${index + 1}`}
                                </h4>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                  {node.programName || 'Unknown Program'}
                                </p>
                              </div>
                            </div>
                            {node.isDisabled && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                                Disabled
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'history' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Executions</h3>
                  {executionHistory.length === 0 ? (
                    <div className="text-center py-12">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <h4 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No executions yet</h4>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        This workflow hasn't been executed yet.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {executionHistory.map((execution, index) => (
                        <div
                          key={execution.id || index}
                          className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                          onClick={() => navigate(`/workflows/${workflowId}/execution/${execution.id}`)}
                        >
                          <div className="flex items-center space-x-4">
                            <div className={`w-3 h-3 rounded-full ${
                              execution.status === 2 ? 'bg-green-500' :
                              execution.status === 3 ? 'bg-red-500' :
                              execution.status === 4 ? 'bg-gray-500' :
                              execution.status === 1 ? 'bg-blue-500' :
                              'bg-yellow-500'
                            }`}></div>
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {execution.executionName || `Execution ${executionHistory.length - index}`}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {execution.startedAt ? new Date(execution.startedAt).toLocaleString() : 'Unknown time'} • {execution.executedByUserName || 'Unknown user'}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              execution.status === 2 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                              execution.status === 3 ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                              execution.status === 4 ? 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400' :
                              execution.status === 1 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                              'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                            }`}>
                              {execution.status === 2 ? 'Completed' :
                               execution.status === 3 ? 'Failed' :
                               execution.status === 4 ? 'Cancelled' :
                               execution.status === 1 ? 'Running' : 'Pending'}
                            </span>
                            {execution.duration && (
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {(execution.duration / 1000).toFixed(1)}s
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Performance Analytics</h3>
                  
                  {statistics ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {statistics.successRate ? `${(statistics.successRate).toFixed(1)}%` : '0%'}
                        </div>
                        <div className="text-sm text-green-600 dark:text-green-400">Success Rate</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {statistics.totalExecutions || 0}
                        </div>
                        <div className="text-sm text-blue-600 dark:text-blue-400">Total Runs</div>
                      </div>
                      <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                          {statistics.failedExecutions || 0}
                        </div>
                        <div className="text-sm text-red-600 dark:text-red-400">Failed Runs</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                          {statistics.averageExecutionTime ? statistics.averageExecutionTime : 'N/A'}
                        </div>
                        <div className="text-sm text-purple-600 dark:text-purple-400">Avg. Runtime</div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 dark:text-gray-400">No analytics data available</p>
                    </div>
                  )}

                  {executionHistory.length > 0 && (
                    <div>
                      <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">Recent Activity Trend</h4>
                      <div className="space-y-2">
                        {executionHistory.slice(0, 10).map((execution, index) => {
                          const date = execution.startedAt ? new Date(execution.startedAt) : null;
                          const duration = execution.duration || 0;
                          const maxDuration = Math.max(...executionHistory.slice(0, 10).map(e => e.duration || 0));
                          const widthPercent = maxDuration > 0 ? (duration / maxDuration) * 100 : 0;
                          
                          return (
                            <div key={execution.id || index} className="flex items-center space-x-3">
                              <div className="w-16 text-xs text-gray-500 dark:text-gray-400">
                                {date ? date.toLocaleDateString() : 'Unknown'}
                              </div>
                              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${
                                    execution.status === 2 ? 'bg-green-500' :
                                    execution.status === 3 ? 'bg-red-500' :
                                    'bg-blue-500'
                                  }`}
                                  style={{ width: `${widthPercent}%` }}
                                ></div>
                              </div>
                              <div className="w-12 text-xs text-gray-500 dark:text-gray-400">
                                {(duration / 1000).toFixed(1)}s
                              </div>
                            </div>
                          );
                        })}
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
          {/* Basic Info */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Information</h2>
            <div className="space-y-3">
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Created</dt>
                <dd className="text-sm text-gray-900 dark:text-white">
                  {workflow.createdAt ? new Date(workflow.createdAt).toLocaleDateString() : 'Unknown'}
                </dd>
              </div>
              {workflow.updatedAt && (
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Updated</dt>
                  <dd className="text-sm text-gray-900 dark:text-white">
                    {new Date(workflow.updatedAt).toLocaleDateString()}
                  </dd>
                </div>
              )}
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Executions</dt>
                <dd className="text-sm text-gray-900 dark:text-white">
                  {workflow.executionCount || 0} total
                </dd>
              </div>
              {workflow.averageExecutionTime && (
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg. Runtime</dt>
                  <dd className="text-sm text-gray-900 dark:text-white">
                    {workflow.averageExecutionTime}
                  </dd>
                </div>
              )}
            </div>
          </div>

          {/* Statistics */}
          {statistics && (
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Statistics</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Success Rate</span>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    {statistics.successRate ? `${(statistics.successRate).toFixed(1)}%` : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Runs</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {statistics.totalExecutions || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Failed Runs</span>
                  <span className="text-sm font-medium text-red-600 dark:text-red-400">
                    {statistics.failedExecutions || 0}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Tags */}
          {workflow.tags && workflow.tags.length > 0 && (
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {workflow.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => navigate(`/workflows/${workflowId}/designer`)}
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                }
              >
                Edit Workflow
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => {
                  // TODO: Implement clone workflow
                  console.log('Clone workflow');
                }}
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                }
              >
                Clone Workflow
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => {
                  // TODO: Implement export workflow
                  console.log('Export workflow');
                }}
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                }
              >
                Export Workflow
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Permissions Modal */}
      {workflow && (
        <WorkflowPermissionsModal
          isOpen={showPermissionsModal}
          onClose={() => setShowPermissionsModal(false)}
          workflowId={workflowId!}
          workflowName={workflow.name || 'Untitled Workflow'}
          onPermissionsUpdated={handlePermissionsUpdated}
        />
      )}
      
      {/* Export Modal */}
      {workflow && (
        <WorkflowExportModal
          isOpen={showExportModal}
          onClose={() => setShowExportModal(false)}
          workflowId={workflowId!}
          workflowName={workflow.name || 'Untitled Workflow'}
        />
      )}
    </div>
  );
};

export default WorkflowDetailPage;