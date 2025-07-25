import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '@/api/api';
import { NodePositionDto, WorkflowDetailDto, WorkflowEdgeBulkUpdateDto, WorkflowEdgeUpdateDto, WorkflowNodeBulkUpdateDto, WorkflowNodeUpdateDto, WorkflowUpdateDto } from '@/api/types';
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
  
  // Editing states
  const [isEditingName, setIsEditingName] = useState(false);
  const [editingName, setEditingName] = useState('');
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editingDescription, setEditingDescription] = useState('');

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
        
        // Convert nodes from backend format to designer format
        if (workflow.nodes) {
          workflow.nodes.forEach(node => {
            const designerNode: WorkflowDesignerNode = {
              id: node.id || 'unknown',
              name: node.name || 'Untitled Node',
              description: node.description,
              programId: node.programId || 'unknown',
              programName: node.programName,
              versionId: node.versionId,
              nodeType: node.nodeType,
              isDisabled: node.isDisabled || false,
              createdAt: node.createdAt,
              updatedAt: node.updatedAt,
              position: node.position?.toJSON() || { x: 0, y: 0 },
              size: { width: 200, height: 100 },
              isSelected: false,
              isHighlighted: false,
              isDragging: false,
              connectionPoints: [
                {
                  id: `${node.id}-input`,
                  nodeId: node.id || 'unknown',
                  type: 'input',
                  dataType: 'any',
                  position: { x: 0, y: 50 },
                  isConnected: false,
                  label: 'Input',
                  required: true,
                },
                {
                  id: `${node.id}-output`,
                  nodeId: node.id || 'unknown',
                  type: 'output',
                  dataType: 'any',
                  position: { x: 200, y: 50 },
                  isConnected: false,
                  label: 'Output',
                  required: false,
                },
              ],
              validationErrors: [],
            };
            nodes.set(node.id || 'unknown', designerNode);
          });
        }
        
        // Convert edges from backend format to designer format
        if (workflow.edges) {
          workflow.edges.forEach(edge => {
            const sourceNode = nodes.get(edge.sourceNodeId || '');
            const targetNode = nodes.get(edge.targetNodeId || '');
            
            if (sourceNode && targetNode) {
              const designerEdge: WorkflowDesignerEdge = {
                id: edge.id || 'unknown',
                sourceNodeId: edge.sourceNodeId,
                targetNodeId: edge.targetNodeId,
                sourceOutputName: edge.sourceOutputName,
                targetInputName: edge.targetInputName,
                edgeType: edge.edgeType,
                isDisabled: edge.isDisabled || false,
                createdAt: edge.createdAt,
                updatedAt: edge.updatedAt,
                path: '',
                isSelected: false,
                isHighlighted: false,
                validationErrors: [],
                sourcePosition: { 
                  x: sourceNode.position.x + sourceNode.size.width, 
                  y: sourceNode.position.y + sourceNode.size.height / 2 
                },
                targetPosition: { 
                  x: targetNode.position.x, 
                  y: targetNode.position.y + targetNode.size.height / 2 
                },
                strokeWidth: 2,
                strokeColor: '#6b7280',
                isDashed: false,
              };
              edges.set(edge.id || 'unknown', designerEdge);
            }
          });
        }
        
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

  const handleUpdateWorkflowMetadata = async (name?: string, description?: string) => {
    if (!workflowId || !designerState.workflow) return;

    try {
      setDesignerState(prev => ({ ...prev, isSaving: true, error: null }));
      
      const response = await api.workflows.workflows_Update(workflowId, new WorkflowUpdateDto({
        name: name ?? designerState.workflow.name,
        description: description ?? designerState.workflow.description,
        nodes: Array.from(designerState.nodes.values()).map(node => new WorkflowNodeBulkUpdateDto({
          id: node.id,
          name: node.name,
          description: node.description,
          programId: node.programId,
          nodeType: node.nodeType,
          position: new NodePositionDto(node.position),
          isDisabled: node.isDisabled,
        })),
        edges: Array.from(designerState.edges.values())
          .filter(edge => edge.sourceNodeId && edge.targetNodeId)
          .map(edge => new WorkflowEdgeBulkUpdateDto({
            id: edge.id,
            sourceNodeId: edge.sourceNodeId!,
            targetNodeId: edge.targetNodeId!,
            sourceOutputName: edge.sourceOutputName,
            targetInputName: edge.targetInputName,
            edgeType: edge.edgeType,
            isDisabled: edge.isDisabled,
          })),
        status: designerState.workflow.status,
        settings: designerState.workflow.settings,
        permissions: designerState.workflow.permissions,
        tags: designerState.workflow.tags,
        metadata: designerState.workflow.metadata,
        isTemplate: designerState.workflow.isTemplate,
      }));
      
      if (response.success && response.data) {
        const updatedWorkflow = WorkflowDetailDto.fromJS(response.data);
        setDesignerState(prev => ({ ...prev, workflow: updatedWorkflow, error: null }));
      } else {
        setDesignerState(prev => ({ 
          ...prev, 
          error: response.message || 'Failed to update workflow'
        }));
      }
    } catch (error) {
      console.error('Failed to update workflow:', error);
      setDesignerState(prev => ({ 
        ...prev, 
        error: 'Failed to update workflow. Please try again.'
      }));
    } finally {
      setDesignerState(prev => ({ ...prev, isSaving: false }));
    }
  };

  const handleSave = async () => {
    try {
      setDesignerState(prev => ({ ...prev, isSaving: true, error: null }));
      
      if (workflowId && designerState.workflow) {
        // Update existing workflow
        const response = await api.workflows.workflows_Update(workflowId, new WorkflowUpdateDto({
          name: designerState.workflow.name,
          description: designerState.workflow.description,
          nodes: Array.from(designerState.nodes.values()).map(node => new WorkflowNodeBulkUpdateDto({
            id: node.id,
            name: node.name,
            description: node.description,
            programId: node.programId,
            nodeType: node.nodeType,
            position: new NodePositionDto(node.position),
            isDisabled: node.isDisabled,
          })),
          edges: Array.from(designerState.edges.values())
            .filter(edge => edge.sourceNodeId && edge.targetNodeId)
            .map(edge => new WorkflowEdgeBulkUpdateDto({
              id: edge.id,
              sourceNodeId: edge.sourceNodeId!,
              targetNodeId: edge.targetNodeId!,
              sourceOutputName: edge.sourceOutputName,
              targetInputName: edge.targetInputName,
              edgeType: edge.edgeType,
              isDisabled: edge.isDisabled,
            })),
        }));
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
          name: editingName || 'New Workflow',
          description: editingDescription || 'Created in designer',
          nodes: Array.from(designerState.nodes.values()).map(node => ({
            id: node.id,
            name: node.name,
            description: node.description,
            programId: node.programId,
            nodeType: node.nodeType,
            position: node.position,
            isDisabled: node.isDisabled,
          })),
          edges: Array.from(designerState.edges.values())
            .filter(edge => edge.sourceNodeId && edge.targetNodeId)
            .map(edge => ({
              id: edge.id,
              sourceNodeId: edge.sourceNodeId!,
              targetNodeId: edge.targetNodeId!,
              sourceOutputName: edge.sourceOutputName,
              targetInputName: edge.targetInputName,
              edgeType: edge.edgeType,
              isDisabled: edge.isDisabled,
            })),
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

  const handleNodeDelete = useCallback((nodeId: string) => {
    setDesignerState(prev => {
      const newNodes = new Map(prev.nodes);
      const newEdges = new Map(prev.edges);
      
      newNodes.delete(nodeId);
      // Remove the node
      
      // Remove all edges connected to this node
      const edgesToDelete = Array.from(newEdges.values()).filter(
        edge => edge.sourceNodeId === nodeId || edge.targetNodeId === nodeId
      );
      edgesToDelete.forEach(edge => newEdges.delete(edge.id));
      
      // Update selection to remove deleted node
      const newSelection = {
        ...prev.selection,
        nodes: prev.selection.nodes.filter(id => id !== nodeId),
        edges: prev.selection.edges.filter(id => !edgesToDelete.some(edge => edge.id === id))
      };
      
      return { ...prev, nodes: newNodes, edges: newEdges, selection: newSelection };
    });
  }, []);

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

  const handleEdgeDelete = useCallback((edgeId: string) => {
    setDesignerState(prev => {
      const newEdges = new Map(prev.edges);
      newEdges.delete(edgeId);
      
      // Update selection to remove deleted edge
      const newSelection = {
        ...prev.selection,
        edges: prev.selection.edges.filter(id => id !== edgeId)
      };
      
      return { ...prev, edges: newEdges, selection: newSelection };
    });
  }, []);

  const handleSelectionChange = useCallback((selection: typeof designerState.selection) => {
    setDesignerState(prev => ({ ...prev, selection }));
  }, []);

  // Delete selected items
  const handleDeleteSelected = useCallback(() => {
    // Delete selected nodes (and their connected edges)
    designerState.selection.nodes.forEach(nodeId => {
      handleNodeDelete(nodeId);
    });
    
    // Delete selected edges
    designerState.selection.edges.forEach(edgeId => {
      handleEdgeDelete(edgeId);
    });
  }, [designerState.selection, handleNodeDelete, handleEdgeDelete]);

  // Workflow validation
  const handleValidateWorkflow = async () => {
    if (!workflowId) {
      setDesignerState(prev => ({
        ...prev,
        error: 'Please save the workflow first before validating'
      }));
      return;
    }

    try {
      const response = await api.workflows.workflows_Validate(workflowId);
      if (response.success && response.data) {
        const validationResult = response.data;
        setDesignerState(prev => ({
          ...prev,
          validationResults: {
            isValid: validationResult.isValid || false,
            errors: (validationResult.errors || []).map((err: unknown) => typeof err === 'string' ? err : (err as { message?: string }).message ?? JSON.stringify(err)),
            warnings: (validationResult.warnings || []).map((warn: unknown) => typeof warn === 'string' ? warn : (warn as { message?: string }).message ?? JSON.stringify(warn)),
          },
          error: validationResult.isValid ? null : 'Workflow validation failed'
        }));
      } else {
        setDesignerState(prev => ({
          ...prev,
          error: response.message || 'Failed to validate workflow'
        }));
      }
    } catch (error) {
      console.error('Failed to validate workflow:', error);
      setDesignerState(prev => ({
        ...prev,
        error: 'Failed to validate workflow. Please try again.'
      }));
    }
  };

  // Get execution plan
  const handleGetExecutionPlan = async () => {
    if (!workflowId) {
      setDesignerState(prev => ({
        ...prev,
        error: 'Please save the workflow first before viewing execution plan'
      }));
      return;
    }

    try {
      const response = await api.workflows.workflows_GetExecutionPlan(workflowId);
      if (response.success && response.data) {
        // TODO: Show execution plan in a modal or side panel
        console.log('Execution plan:', response.data);
      } else {
        setDesignerState(prev => ({
          ...prev,
          error: response.message || 'Failed to get execution plan'
        }));
      }
    } catch (error) {
      console.error('Failed to get execution plan:', error);
      setDesignerState(prev => ({
        ...prev,
        error: 'Failed to get execution plan. Please try again.'
      }));
    }
  };

  // Fullscreen handlers
  const handleFullscreenToggle = useCallback(() => {
    setIsFullscreen(prev => !prev);
  }, []);

  // Name editing handlers
  const handleStartEditingName = () => {
    setEditingName(designerState.workflow?.name || '');
    setIsEditingName(true);
  };

  const handleSaveName = async () => {
    if (editingName.trim() && editingName !== designerState.workflow?.name) {
      await handleUpdateWorkflowMetadata(editingName.trim());
    }
    setIsEditingName(false);
  };

  const handleCancelEditingName = () => {
    setEditingName('');
    setIsEditingName(false);
  };

  // Description editing handlers
  const handleStartEditingDescription = () => {
    setEditingDescription(designerState.workflow?.description || '');
    setIsEditingDescription(true);
  };

  const handleSaveDescription = async () => {
    if (editingDescription !== designerState.workflow?.description) {
      await handleUpdateWorkflowMetadata(undefined, editingDescription);
    }
    setIsEditingDescription(false);
  };

  const handleCancelEditingDescription = () => {
    setEditingDescription('');
    setIsEditingDescription(false);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if we're not in an input field
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        if (designerState.selection.nodes.length > 0 || designerState.selection.edges.length > 0) {
          handleDeleteSelected();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [designerState.selection, handleDeleteSelected]);

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
          onNodeDelete={handleNodeDelete}
          onEdgeAdd={handleEdgeAdd}
          onEdgeSelect={handleEdgeSelect}
          onEdgeDelete={handleEdgeDelete}
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
            <div className="space-y-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Select a node to view its properties
              </div>
              
              {/* Workflow Validation Results */}
              {(designerState.validationResults.errors.length > 0 || designerState.validationResults.warnings.length > 0) && (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Validation Results</h3>
                  
                  {designerState.validationResults.errors.length > 0 && (
                    <div className="mb-3">
                      <h4 className="text-xs font-medium text-red-700 dark:text-red-400 mb-2">Errors</h4>
                      <div className="space-y-2">
                        {designerState.validationResults.errors.map((error, index) => (
                          <div key={index} className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-2 rounded">
                            {error}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {designerState.validationResults.warnings.length > 0 && (
                    <div>
                      <h4 className="text-xs font-medium text-yellow-700 dark:text-yellow-400 mb-2">Warnings</h4>
                      <div className="space-y-2">
                        {designerState.validationResults.warnings.map((warning, index) => (
                          <div key={index} className="text-xs text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded">
                            {warning}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {designerState.validationResults.isValid && (
                    <div className="text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-2 rounded">
                      ✓ Workflow validation passed
                    </div>
                  )}
                </div>
              )}
              
              {/* Workflow Statistics */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Workflow Statistics</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                    <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{designerState.nodes.size}</div>
                    <div className="text-xs text-blue-600 dark:text-blue-400">Nodes</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
                    <div className="text-xl font-bold text-purple-600 dark:text-purple-400">{designerState.edges.size}</div>
                    <div className="text-xs text-purple-600 dark:text-purple-400">Connections</div>
                  </div>
                </div>
              </div>
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
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
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
                      className="text-xl font-semibold bg-transparent border-b-2 border-blue-500 focus:outline-none text-gray-900 dark:text-white min-w-[200px]"
                      placeholder="Workflow name"
                    />
                    <button
                      onClick={handleSaveName}
                      className="p-1 text-green-600 hover:text-green-700"
                      title="Save name"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                    <button
                      onClick={handleCancelEditingName}
                      className="p-1 text-red-600 hover:text-red-700"
                      title="Cancel editing"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 group">
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {designerState.workflow?.name || 'New Workflow'} - Designer
                    </h1>
                    {designerState.workflow && (
                      <button
                        onClick={handleStartEditingName}
                        className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-opacity"
                        title="Edit workflow name"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-4">
                {isEditingDescription ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={editingDescription}
                      onChange={(e) => setEditingDescription(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveDescription();
                        if (e.key === 'Escape') handleCancelEditingDescription();
                      }}
                      onBlur={handleSaveDescription}
                      autoFocus
                      className="text-sm bg-transparent border-b border-blue-400 focus:outline-none text-gray-600 dark:text-gray-400 min-w-[300px]"
                      placeholder="Workflow description"
                    />
                    <button
                      onClick={handleSaveDescription}
                      className="p-1 text-green-600 hover:text-green-700"
                      title="Save description"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                    <button
                      onClick={handleCancelEditingDescription}
                      className="p-1 text-red-600 hover:text-red-700"
                      title="Cancel editing"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 group">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {designerState.workflow?.description || 'No description'}
                      {designerState.workflow && (
                        <span className="ml-2">
                          v{designerState.workflow.version} • {designerState.workflow.status}
                        </span>
                      )}
                    </p>
                    {designerState.workflow && (
                      <button
                        onClick={handleStartEditingDescription}
                        className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-opacity"
                        title="Edit workflow description"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleValidateWorkflow}
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            >
              Validate
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleGetExecutionPlan}
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              }
            >
              Preview Plan
            </Button>
            
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
          onNodeDelete={handleNodeDelete}
          onEdgeAdd={handleEdgeAdd}
          onEdgeSelect={handleEdgeSelect}
          onEdgeDelete={handleEdgeDelete}
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