import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '@/api/api';
import { WorkflowDetailDto } from '@/api/types';
import { WorkflowStatus } from '@/api/enums';
import Button from '@/components/common/Button';
import WorkflowCanvas from '@/components/workflow/WorkflowCanvas';
import WorkflowNodeToolbox from '@/components/workflow/WorkflowNodeToolbox';
import { 
  WorkflowDesignerState, 
  WorkflowDesignerNode, 
  WorkflowDesignerEdge,
  createDefaultCanvasState,
  createDefaultSelectionState,
  createNodeFromTemplate
} from '@/types/workflowDesigner';

const WorkflowDesignerPage: React.FC = () => {
  const { workflowId } = useParams<{ workflowId: string }>();
  const navigate = useNavigate();
  
  // Core workflow designer state
  const [designerState, setDesignerState] = useState<WorkflowDesignerState>({
    workflow: null,
    nodes: new Map(),
    edges: new Map(),
    canvas: createDefaultCanvasState(),
    selection: createDefaultSelectionState(),
    isLoading: true,
    isSaving: false,
    error: null,
    draggedNode: null,
    draggedEdge: null,
    connectionPreview: null,
    validationResults: {
      isValid: true,
      errors: [],
      warnings: [],
    },
  });
  
  // Fullscreen state
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const initializeDesigner = async () => {
      if (workflowId) {
        await loadWorkflow();
      } else {
        // New workflow - start with empty canvas
        setDesignerState(prev => ({
          ...prev,
          workflow: null,
          nodes: new Map(),
          edges: new Map(),
          isLoading: false,
        }));
      }
    };
    
    initializeDesigner();
  }, [workflowId]);

  const loadWorkflow = async () => {
    if (!workflowId) return;

    try {
      setDesignerState(prev => ({ ...prev, isLoading: true, error: null }));

      const response = await api.workflows.workflows_GetById(workflowId);
      if (response.success && response.data) {
        const workflow = WorkflowDetailDto.fromJS(response.data);
        
        // Convert workflow nodes and edges to designer format
        const nodes = new Map<string, WorkflowDesignerNode>();
        const edges = new Map<string, WorkflowDesignerEdge>();
        
        // TODO: Convert actual workflow data to designer format
        // This would involve mapping WorkflowNodeDto to WorkflowDesignerNode
        
        setDesignerState(prev => ({
          ...prev,
          workflow,
          nodes,
          edges,
          isLoading: false,
        }));
      } else {
        setDesignerState(prev => ({ 
          ...prev, 
          error: response.message || 'Failed to load workflow',
          isLoading: false,
        }));
      }
    } catch (error) {
      console.error('Failed to load workflow:', error);
      setDesignerState(prev => ({ 
        ...prev, 
        error: 'Failed to load workflow. Please try again.',
        isLoading: false,
      }));
    }
  };

  const handleSave = async () => {
    try {
      setDesignerState(prev => ({ ...prev, isSaving: true, error: null }));
      
      if (workflowId && designerState.workflow) {
        // Update existing workflow
        const response = await api.workflows.workflows_Update(workflowId, {
          name: designerState.workflow.name,
          description: designerState.workflow.description,
          // TODO: Convert designer nodes/edges back to API format
        });
        if (response.success) {
          setDesignerState(prev => ({ ...prev, error: null }));
        } else {
          setDesignerState(prev => ({ 
            ...prev, 
            error: response.message || 'Failed to save workflow'
          }));
        }
      } else {
        // Create new workflow
        const response = await api.workflows.workflows_Create({
          name: 'New Workflow',
          description: 'Created in designer',
          // TODO: Convert designer nodes/edges to API format
        });
        if (response.success && response.data) {
          const newWorkflow = WorkflowDetailDto.fromJS(response.data);
          setDesignerState(prev => ({ ...prev, workflow: newWorkflow }));
          navigate(`/workflows/${response.data.id}/designer`);
        } else {
          setDesignerState(prev => ({ 
            ...prev, 
            error: response.message || 'Failed to create workflow'
          }));
        }
      }
    } catch (error) {
      console.error('Failed to save workflow:', error);
      setDesignerState(prev => ({ 
        ...prev, 
        error: 'Failed to save workflow. Please try again.'
      }));
    } finally {
      setDesignerState(prev => ({ ...prev, isSaving: false }));
    }
  };

  const handlePublish = async () => {
    if (!workflowId) return;

    try {
      const response = await api.workflows.workflows_UpdateStatus(workflowId, WorkflowStatus._1);
      if (response.success) {
        if (designerState.workflow) {
          const updatedWorkflow = WorkflowDetailDto.fromJS({ ...designerState.workflow, status: WorkflowStatus._1 });
          setDesignerState(prev => ({ ...prev, workflow: updatedWorkflow }));
        }
      } else {
        setDesignerState(prev => ({ 
          ...prev, 
          error: response.message || 'Failed to publish workflow'
        }));
      }
    } catch (error) {
      console.error('Failed to publish workflow:', error);
      setDesignerState(prev => ({ 
        ...prev, 
        error: 'Failed to publish workflow. Please try again.'
      }));
    }
  };

  // Canvas event handlers
  const handleCanvasUpdate = useCallback((updates: Partial<typeof designerState.canvas>) => {
    setDesignerState(prev => ({
      ...prev,
      canvas: { ...prev.canvas, ...updates },
    }));
  }, []);

  const handleNodeAdd = useCallback((node: WorkflowDesignerNode) => {
    setDesignerState(prev => {
      const newNodes = new Map(prev.nodes);
      newNodes.set(node.id, node);
      return { ...prev, nodes: newNodes };
    });
  }, []);

  const handleNodeUpdate = useCallback((nodeId: string, updates: Partial<WorkflowDesignerNode>) => {
    setDesignerState(prev => {
      const newNodes = new Map(prev.nodes);
      const existingNode = newNodes.get(nodeId);
      if (existingNode) {
        newNodes.set(nodeId, { ...existingNode, ...updates });
      }
      return { ...prev, nodes: newNodes };
    });
  }, []);

  const handleNodeSelect = useCallback((nodeId: string, addToSelection = false) => {
    setDesignerState(prev => {
      const newSelection = addToSelection 
        ? { ...prev.selection, nodes: [...prev.selection.nodes, nodeId] }
        : { ...prev.selection, nodes: [nodeId] };
      return { ...prev, selection: newSelection };
    });
  }, []);

  // const handleNodeDelete = useCallback((nodeId: string) => {
  //   setDesignerState(prev => {
  //     const newNodes = new Map(prev.nodes);
  //     newNodes.delete(nodeId);
  //     return { ...prev, nodes: newNodes };
  //   });
  // }, []);

  const handleEdgeAdd = useCallback((edge: WorkflowDesignerEdge) => {
    setDesignerState(prev => {
      const newEdges = new Map(prev.edges);
      newEdges.set(edge.id, edge);
      return { ...prev, edges: newEdges };
    });
  }, []);

  // const handleEdgeUpdate = useCallback((edgeId: string, updates: Partial<WorkflowDesignerEdge>) => {
  //   setDesignerState(prev => {
  //     const newEdges = new Map(prev.edges);
  //     const existingEdge = newEdges.get(edgeId);
  //     if (existingEdge) {
  //       newEdges.set(edgeId, { ...existingEdge, ...updates });
  //     }
  //     return { ...prev, edges: newEdges };
  //   });
  // }, []);

  const handleEdgeSelect = useCallback((edgeId: string, addToSelection = false) => {
    setDesignerState(prev => {
      const newSelection = addToSelection 
        ? { ...prev.selection, edges: [...prev.selection.edges, edgeId] }
        : { ...prev.selection, edges: [edgeId] };
      return { ...prev, selection: newSelection };
    });
  }, []);

  // const handleEdgeDelete = useCallback((edgeId: string) => {
  //   setDesignerState(prev => {
  //     const newEdges = new Map(prev.edges);
  //     newEdges.delete(edgeId);
  //     return { ...prev, edges: newEdges };
  //   });
  // }, []);

  const handleSelectionChange = useCallback((selection: typeof designerState.selection) => {
    setDesignerState(prev => ({ ...prev, selection }));
  }, []);

  // Fullscreen handlers
  const handleFullscreenToggle = useCallback(() => {
    setIsFullscreen(prev => !prev);
  }, []);

  if (designerState.isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-gray-50 dark:bg-gray-900 flex">
        {/* Sidebar - Node Library */}
        <div className="w-[28rem] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <WorkflowNodeToolbox 
            onNodeAdd={(template, position) => {
              const newNode = createNodeFromTemplate(template, position);
              handleNodeAdd(newNode);
            }}
          />
        </div>

        {/* Main Canvas */}
        <WorkflowCanvas
          nodes={designerState.nodes}
          edges={designerState.edges}
          canvasState={designerState.canvas}
          selection={designerState.selection}
          isFullscreen={isFullscreen}
          onCanvasUpdate={handleCanvasUpdate}
          onNodeAdd={handleNodeAdd}
          onNodeUpdate={handleNodeUpdate}
          onNodeSelect={handleNodeSelect}
          onEdgeAdd={handleEdgeAdd}
          onEdgeSelect={handleEdgeSelect}
          onSelectionChange={handleSelectionChange}
          onFullscreenToggle={handleFullscreenToggle}
        />

        {/* Properties Panel */}
        <div className="w-[28rem] bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 p-4">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Properties</h2>
          
          {designerState.selection.nodes.length > 0 ? (
            <div className="space-y-4">
              {designerState.selection.nodes.map(nodeId => {
                const node = designerState.nodes.get(nodeId);
                if (!node) return null;
                
                return (
                  <div key={nodeId}>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      {node.name}
                    </h3>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {node.description || 'No description'}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-500 space-y-1">
                      <div>Language: {node.programInfo?.language}</div>
                      <div>Type: {node.programInfo?.type}</div>
                      <div>Status: {node.programInfo?.status}</div>
                      <div>Position: x:{Math.round(node.position.x)}, y:{Math.round(node.position.y)}</div>
                    </div>
                  </div>
                );
              })}
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Node Configuration</div>
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  Node configuration options will be available here
                </div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Select a node to view its properties
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(workflowId ? `/workflows/${workflowId}` : '/workflows')}
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              }
            >
              Back
            </Button>
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                {designerState.workflow?.name || 'New Workflow'} - Designer
              </h1>
              {designerState.workflow && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  v{designerState.workflow.version} • {designerState.workflow.status}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
              disabled={designerState.isSaving}
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              }
            >
              {designerState.isSaving ? 'Saving...' : 'Save'}
            </Button>
            
            {designerState.workflow && designerState.workflow.status === WorkflowStatus._0 && (
              <Button
                variant="primary"
                size="sm"
                onClick={handlePublish}
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                }
              >
                Publish
              </Button>
            )}
          </div>
        </div>
        
        {designerState.error && (
          <div className="mt-4 rounded-md bg-red-50 dark:bg-red-900/20 p-3">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800 dark:text-red-200">{designerState.error}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Designer Content */}
      <div className="flex-1 flex">
        {/* Sidebar - Node Library */}
        <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <WorkflowNodeToolbox 
            onNodeAdd={(template, position) => {
              const newNode = createNodeFromTemplate(template, position);
              handleNodeAdd(newNode);
            }}
          />
        </div>

        {/* Main Canvas */}
        <WorkflowCanvas
          nodes={designerState.nodes}
          edges={designerState.edges}
          canvasState={designerState.canvas}
          selection={designerState.selection}
          isFullscreen={isFullscreen}
          onCanvasUpdate={handleCanvasUpdate}
          onNodeAdd={handleNodeAdd}
          onNodeUpdate={handleNodeUpdate}
          onNodeSelect={handleNodeSelect}
          onEdgeAdd={handleEdgeAdd}
          onEdgeSelect={handleEdgeSelect}
          onSelectionChange={handleSelectionChange}
          onFullscreenToggle={handleFullscreenToggle}
        />

        {/* Properties Panel */}
        <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 p-4">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Properties</h2>
          
          {designerState.selection.nodes.length > 0 ? (
            <div className="space-y-4">
              {designerState.selection.nodes.map(nodeId => {
                const node = designerState.nodes.get(nodeId);
                if (!node) return null;
                
                return (
                  <div key={nodeId}>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      {node.name}
                    </h3>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {node.description || 'No description'}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-500 space-y-1">
                      <div>Language: {node.programInfo?.language}</div>
                      <div>Type: {node.programInfo?.type}</div>
                      <div>Status: {node.programInfo?.status}</div>
                      <div>Position: x:{Math.round(node.position.x)}, y:{Math.round(node.position.y)}</div>
                    </div>
                  </div>
                );
              })}
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Node Configuration</div>
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  Node configuration options will be available here
                </div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Select a node to view its properties
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-2">
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <div>
            <span>
              {designerState.nodes.size} nodes, {designerState.edges.size} connections
            </span>
          </div>
          <div>
            Ready
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowDesignerPage;