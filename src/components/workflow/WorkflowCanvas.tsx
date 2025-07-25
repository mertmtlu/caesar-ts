// src/components/workflow/WorkflowCanvas.tsx
import React, { useRef, useState, useCallback, useEffect } from 'react';
import { 
  Position, 
  CanvasState, 
  WorkflowDesignerNode, 
  WorkflowDesignerEdge, 
  SelectionState, 
  NodeTemplate,
  ConnectionPoint,
  CANVAS_DEFAULTS,
  COLORS,
  getBoundsFromNodes,
  createNodeFromTemplate
} from '@/types/workflowDesigner';
import { WorkflowEdgeType } from '@/api/enums';
import WorkflowNode from './WorkflowNode';
import WorkflowEdge, { EdgeMarkerDefinitions } from './WorkflowEdge';

interface WorkflowCanvasProps {
  nodes: Map<string, WorkflowDesignerNode>;
  edges: Map<string, WorkflowDesignerEdge>;
  canvasState: CanvasState;
  selection: SelectionState;
  isFullscreen?: boolean;
  
  // Event handlers
  onCanvasUpdate: (updates: Partial<CanvasState>) => void;
  onNodeAdd: (node: WorkflowDesignerNode) => void;
  onNodeUpdate: (nodeId: string, updates: Partial<WorkflowDesignerNode>) => void;
  onNodeSelect: (nodeId: string, addToSelection?: boolean) => void;
  onNodeDelete?: (nodeId: string) => void;
  onEdgeAdd: (edge: WorkflowDesignerEdge) => void;
  onEdgeSelect: (edgeId: string, addToSelection?: boolean) => void;
  onEdgeDelete?: (edgeId: string) => void;
  onSelectionChange: (selection: SelectionState) => void;
  onFullscreenToggle?: () => void;
}

const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({
  nodes,
  edges,
  canvasState,
  selection,
  isFullscreen = false,
  onCanvasUpdate,
  onNodeAdd,
  onNodeUpdate,
  onNodeSelect,
  onNodeDelete,
  onEdgeAdd,
  onEdgeSelect,
  onEdgeDelete,
  onSelectionChange,
  onFullscreenToggle,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Prevent page scrolling when zooming
  useEffect(() => {
    const handleWheelNative = (e: WheelEvent) => {
      if (canvasRef.current?.contains(e.target as Node)) {
        e.preventDefault();
        e.stopPropagation();
        
        // Manually trigger the React wheel handler
        const rect = canvasRef.current?.getBoundingClientRect();
        if (rect) {
          const mousePos = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          };
          const worldPos = {
            x: (mousePos.x - canvasState.pan.x) / canvasState.zoom,
            y: (mousePos.y - canvasState.pan.y) / canvasState.zoom,
          };
          
          const zoomDelta = e.deltaY > 0 ? -CANVAS_DEFAULTS.ZOOM_STEP : CANVAS_DEFAULTS.ZOOM_STEP;
          const newZoom = Math.max(
            CANVAS_DEFAULTS.ZOOM_MIN,
            Math.min(CANVAS_DEFAULTS.ZOOM_MAX, canvasState.zoom + zoomDelta)
          );
          
          if (newZoom !== canvasState.zoom) {
            const newScreenPos = {
              x: worldPos.x * newZoom + canvasState.pan.x,
              y: worldPos.y * newZoom + canvasState.pan.y,
            };
            const panDelta = {
              x: mousePos.x - newScreenPos.x,
              y: mousePos.y - newScreenPos.y,
            };
            
            onCanvasUpdate({
              zoom: newZoom,
              pan: {
                x: canvasState.pan.x + panDelta.x,
                y: canvasState.pan.y + panDelta.y,
              },
            });
          }
        }
      }
    };
    
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('wheel', handleWheelNative, { passive: false });
      return () => canvas.removeEventListener('wheel', handleWheelNative);
    }
  }, [canvasState.zoom, canvasState.pan, onCanvasUpdate]);
  
  // Interaction state
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });
  const [dragMode, setDragMode] = useState<'pan' | 'select' | 'node' | 'edge' | null>(null);
  const [draggedNodes, setDraggedNodes] = useState<string[]>([]);
  const [dragOffsets, setDragOffsets] = useState<Map<string, Position>>(new Map());
  const [selectionBox, setSelectionBox] = useState<{
    start: Position;
    end: Position;
  } | null>(null);
  // Drag preview state for visual feedback without state updates
  const [dragPreview, setDragPreview] = useState<{
    previewNodes: Array<{ node: WorkflowDesignerNode; previewPosition: Position }>;
    isDragging: boolean;
  }>({ previewNodes: [], isDragging: false });
  // const [lastMousePos, setLastMousePos] = useState<Position>({ x: 0, y: 0 }); // Currently unused
  
  // Connection state
  const [connectionPreview, setConnectionPreview] = useState<{
    sourcePoint: ConnectionPoint;
    targetPosition: Position;
  } | null>(null);
  const [hoveredConnectionPoint, setHoveredConnectionPoint] = useState<ConnectionPoint | null>(null);
  
  // Context menu state
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
    nodeId?: string;
    edgeId?: string;
  }>({
    visible: false,
    x: 0,
    y: 0,
  });
  
  // Convert screen coordinates to world coordinates
  const screenToWorld = useCallback((screenPos: Position): Position => {
    return {
      x: (screenPos.x - canvasState.pan.x) / canvasState.zoom,
      y: (screenPos.y - canvasState.pan.y) / canvasState.zoom,
    };
  }, [canvasState.pan, canvasState.zoom]);
  
  // Convert world coordinates to screen coordinates
  const worldToScreen = useCallback((worldPos: Position): Position => {
    return {
      x: worldPos.x * canvasState.zoom + canvasState.pan.x,
      y: worldPos.y * canvasState.zoom + canvasState.pan.y,
    };
  }, [canvasState.pan, canvasState.zoom]);
  
  // Get mouse position relative to canvas
  const getMousePosition = useCallback((e: React.MouseEvent): Position => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);
  
  // Handle mouse wheel for zoom
  const handleWheel = useCallback((e: React.WheelEvent) => {
    // Always prevent default scroll behavior
    e.preventDefault();
    e.stopPropagation();
    
    const mousePos = getMousePosition(e);
    const worldPos = screenToWorld(mousePos);
    
    const zoomDelta = e.deltaY > 0 ? -CANVAS_DEFAULTS.ZOOM_STEP : CANVAS_DEFAULTS.ZOOM_STEP;
    const newZoom = Math.max(
      CANVAS_DEFAULTS.ZOOM_MIN,
      Math.min(CANVAS_DEFAULTS.ZOOM_MAX, canvasState.zoom + zoomDelta)
    );
    
    // Only update if zoom actually changed
    if (newZoom !== canvasState.zoom) {
      // Zoom towards mouse position
      const newScreenPos = worldToScreen(worldPos);
      const panDelta = {
        x: mousePos.x - newScreenPos.x,
        y: mousePos.y - newScreenPos.y,
      };
      
      onCanvasUpdate({
        zoom: newZoom,
        pan: {
          x: canvasState.pan.x + panDelta.x,
          y: canvasState.pan.y + panDelta.y,
        },
      });
    }
  }, [canvasState.zoom, canvasState.pan, getMousePosition, screenToWorld, worldToScreen, onCanvasUpdate]);
  
  // Handle right-click context menu
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const mousePos = getMousePosition(e);
    const worldPos = screenToWorld(mousePos);
    
    // Check if right-clicking on a node
    const clickedNode = Array.from(nodes.values()).find(node => {
      const nodeRect = {
        x: node.position.x,
        y: node.position.y,
        width: node.size.width,
        height: node.size.height,
      };
      
      return (
        worldPos.x >= nodeRect.x &&
        worldPos.x <= nodeRect.x + nodeRect.width &&
        worldPos.y >= nodeRect.y &&
        worldPos.y <= nodeRect.y + nodeRect.height
      );
    });
    
    // Check if right-clicking on an edge
    let clickedEdge = null;
    if (!clickedNode) {
      // Simple edge hit testing - could be improved with more sophisticated geometry
      clickedEdge = Array.from(edges.values()).find(edge => {
        const sourceNode = nodes.get(edge.sourceNodeId || '');
        const targetNode = nodes.get(edge.targetNodeId || '');
        if (!sourceNode || !targetNode) return false;
        
        // Simplified edge hit detection - check if click is near edge path
        const sourcePos = { x: sourceNode.position.x + sourceNode.size.width, y: sourceNode.position.y + sourceNode.size.height / 2 };
        const targetPos = { x: targetNode.position.x, y: targetNode.position.y + targetNode.size.height / 2 };
        
        // Distance from point to line segment (simplified)
        const distance = Math.abs((targetPos.y - sourcePos.y) * worldPos.x - (targetPos.x - sourcePos.x) * worldPos.y + targetPos.x * sourcePos.y - targetPos.y * sourcePos.x) / 
                        Math.sqrt(Math.pow(targetPos.y - sourcePos.y, 2) + Math.pow(targetPos.x - sourcePos.x, 2));
        
        return distance < 10; // 10px tolerance
      });
    }
    
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      nodeId: clickedNode?.id,
      edgeId: clickedEdge?.id,
    });
  }, [getMousePosition, screenToWorld, nodes, edges]);

  // Handle mouse down for various interactions
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // Hide context menu on any click
    setContextMenu(prev => ({ ...prev, visible: false }));
    
    const mousePos = getMousePosition(e);
    const worldPos = screenToWorld(mousePos);
    
    setDragStart(mousePos);
    setIsDragging(true);
    
    // Check if clicking on a node
    const clickedNode = Array.from(nodes.values()).find(node => {
      const nodeRect = {
        x: node.position.x,
        y: node.position.y,
        width: node.size.width,
        height: node.size.height,
      };
      
      return (
        worldPos.x >= nodeRect.x &&
        worldPos.x <= nodeRect.x + nodeRect.width &&
        worldPos.y >= nodeRect.y &&
        worldPos.y <= nodeRect.y + nodeRect.height
      );
    });
    
    if (clickedNode) {
      // Node interaction
      setDragMode('node');
      
      if (e.ctrlKey || e.metaKey) {
        // Add to selection
        onNodeSelect(clickedNode.id, true);
      } else if (!selection.nodes.includes(clickedNode.id)) {
        // Select single node
        onNodeSelect(clickedNode.id, false);
      }
      
      // Prepare for dragging
      const selectedNodes = selection.nodes.includes(clickedNode.id) 
        ? selection.nodes 
        : [clickedNode.id];
      
      setDraggedNodes(selectedNodes);
      
      // Calculate drag offsets
      const offsets = new Map<string, Position>();
      selectedNodes.forEach(nodeId => {
        const node = nodes.get(nodeId);
        if (node) {
          offsets.set(nodeId, {
            x: worldPos.x - node.position.x,
            y: worldPos.y - node.position.y,
          });
        }
      });
      setDragOffsets(offsets);
    } else {
      // Canvas interaction
      if (e.shiftKey) {
        // Selection mode
        setDragMode('select');
        setSelectionBox({
          start: worldPos,
          end: worldPos,
        });
      } else {
        // Pan mode
        setDragMode('pan');
        if (!e.ctrlKey && !e.metaKey) {
          // Clear selection if not holding modifier
          onSelectionChange({
            nodes: [],
            edges: [],
            bounds: null,
            isDragging: false,
            dragOffset: { x: 0, y: 0 },
          });
        }
      }
    }
  }, [getMousePosition, screenToWorld, nodes, selection, onNodeSelect, onSelectionChange]);
  
  // Handle mouse move for dragging
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    // Handle connection preview
    if (connectionPreview && !isDragging) {
      const mousePos = getMousePosition(e);
      const worldPos = screenToWorld(mousePos);
      
      setConnectionPreview(prev => prev ? {
        ...prev,
        targetPosition: worldPos
      } : null);
      return;
    }
    
    if (!isDragging || !dragMode) return;
    
    const mousePos = getMousePosition(e);
    const worldPos = screenToWorld(mousePos);
    
    switch (dragMode) {
      case 'pan':
        const panDelta = {
          x: mousePos.x - dragStart.x,
          y: mousePos.y - dragStart.y,
        };
        onCanvasUpdate({
          pan: {
            x: canvasState.pan.x + panDelta.x,
            y: canvasState.pan.y + panDelta.y,
          },
        });
        setDragStart(mousePos);
        break;
        
      case 'select':
        if (selectionBox) {
          setSelectionBox({
            start: selectionBox.start,
            end: worldPos,
          });
        }
        break;
        
      case 'node':
        // Update preview nodes for visual feedback without state updates
        const previewNodes = draggedNodes.map(nodeId => {
          const node = nodes.get(nodeId);
          const offset = dragOffsets.get(nodeId);
          if (!node || !offset) return null;
          
          let previewPosition = {
            x: worldPos.x - offset.x,
            y: worldPos.y - offset.y,
          };
          
          // Snap to grid if enabled
          if (canvasState.showGrid) {
            previewPosition.x = Math.round(previewPosition.x / canvasState.gridSize) * canvasState.gridSize;
            previewPosition.y = Math.round(previewPosition.y / canvasState.gridSize) * canvasState.gridSize;
          }
          
          return { node, previewPosition };
        }).filter((item): item is { node: WorkflowDesignerNode; previewPosition: Position } => item !== null);
        
        setDragPreview({ previewNodes, isDragging: true });
        break;
    }
  }, [
    isDragging,
    dragMode,
    dragStart,
    selectionBox,
    draggedNodes,
    dragOffsets,
    canvasState.pan,
    canvasState.showGrid,
    canvasState.gridSize,
    connectionPreview,
    getMousePosition,
    screenToWorld,
    onCanvasUpdate,
    onNodeUpdate,
    nodes,
    setConnectionPreview,
    dragPreview,
  ]);
  
  // Handle mouse up
  const handleMouseUp = useCallback(() => {
    // Clear connection preview
    if (connectionPreview) {
      setConnectionPreview(null);
      // Reset cursor when ending connection mode
      document.body.style.cursor = 'default';
    }
    
    if (dragMode === 'select' && selectionBox) {
      // Complete selection
      const selectedNodes = Array.from(nodes.values()).filter(node => {
        const nodeRect = {
          x: node.position.x,
          y: node.position.y,
          width: node.size.width,
          height: node.size.height,
        };
        
        const selectionRect = {
          x: Math.min(selectionBox.start.x, selectionBox.end.x),
          y: Math.min(selectionBox.start.y, selectionBox.end.y),
          width: Math.abs(selectionBox.end.x - selectionBox.start.x),
          height: Math.abs(selectionBox.end.y - selectionBox.start.y),
        };
        
        return (
          nodeRect.x < selectionRect.x + selectionRect.width &&
          nodeRect.x + nodeRect.width > selectionRect.x &&
          nodeRect.y < selectionRect.y + selectionRect.height &&
          nodeRect.y + nodeRect.height > selectionRect.y
        );
      });
      
      onSelectionChange({
        nodes: selectedNodes.map(node => node.id),
        edges: [],
        bounds: selectedNodes.length > 0 ? getBoundsFromNodes(selectedNodes) : null,
        isDragging: false,
        dragOffset: { x: 0, y: 0 },
      });
    }
    
    // Update actual node positions when node dragging completes
    if (dragMode === 'node' && dragPreview.previewNodes.length > 0) {
      dragPreview.previewNodes.forEach(({ node, previewPosition }) => {
        onNodeUpdate(node.id, { position: previewPosition });
      });
    }
    
    // Reset drag state
    setIsDragging(false);
    setDragMode(null);
    setDraggedNodes([]);
    setDragOffsets(new Map());
    setSelectionBox(null);
    setDragPreview({ previewNodes: [], isDragging: false }); // Clear drag preview
  }, [dragMode, selectionBox, nodes, onSelectionChange, connectionPreview, dragPreview, onNodeUpdate]);

  // Context menu handlers
  const handleDeleteFromContext = useCallback(() => {
    if (contextMenu.nodeId && onNodeDelete) {
      onNodeDelete(contextMenu.nodeId);
    } else if (contextMenu.edgeId && onEdgeDelete) {
      onEdgeDelete(contextMenu.edgeId);
    }
    setContextMenu(prev => ({ ...prev, visible: false }));
  }, [contextMenu, onNodeDelete, onEdgeDelete]);

  const handleCloseContextMenu = useCallback(() => {
    setContextMenu(prev => ({ ...prev, visible: false }));
  }, []);
  
  // Handle connection start
  const handleConnectionStart = useCallback((point: ConnectionPoint) => {
    // Calculate the actual world position of the connection point
    const worldPosition = {
      x: point.position.x,
      y: point.position.y
    };
    
    setConnectionPreview({
      sourcePoint: { ...point, position: worldPosition },
      targetPosition: worldPosition
    });
  }, [nodes]);
  
  // Handle connection hover
  const handleConnectionHover = useCallback((point: ConnectionPoint | null) => {
    setHoveredConnectionPoint(point);
    
    // If we're in connection mode and hovering over a point, validate if connection is possible
    if (connectionPreview && point) {
      const sourcePoint = connectionPreview.sourcePoint;
      
      // Check if this would be a valid connection
      const isValidTarget = 
        sourcePoint.nodeId !== point.nodeId && // Not same node
        sourcePoint.type !== point.type && // Different types
        sourcePoint.type === 'output' && point.type === 'input' && // Output to input
        !Array.from(edges.values()).some(edge => 
          edge.sourceNodeId === sourcePoint.nodeId &&
          edge.targetNodeId === point.nodeId &&
          edge.sourceOutputName === sourcePoint.label &&
          edge.targetInputName === point.label
        ) && // No duplicate connection
        !Array.from(edges.values()).some(edge => 
          edge.targetNodeId === point.nodeId &&
          edge.targetInputName === point.label
        ); // Input not already connected
      
      // Update cursor based on validity
      if (!isValidTarget) {
        document.body.style.cursor = 'not-allowed';
      } else {
        document.body.style.cursor = 'crosshair';
      }
    } else if (!connectionPreview) {
      // Reset cursor when not in connection mode
      document.body.style.cursor = 'default';
    }
  }, [connectionPreview, edges]);
  
  // Handle connection end
  const handleConnectionEnd = useCallback((targetPoint: ConnectionPoint) => {
    if (connectionPreview) {
      console.log('Connecting:', connectionPreview.sourcePoint, 'to', targetPoint);
      
      // Validation checks
      const sourcePoint = connectionPreview.sourcePoint;
      
      // 1. Prevent self-connections (same node)
      if (sourcePoint.nodeId === targetPoint.nodeId) {
        console.warn('Cannot connect node to itself');
        setConnectionPreview(null);
        return;
      }
      
      // 2. Prevent connecting input to input or output to output
      if (sourcePoint.type === targetPoint.type) {
        console.warn('Cannot connect', sourcePoint.type, 'to', targetPoint.type);
        setConnectionPreview(null);
        return;
      }
      
      // 3. Ensure we're connecting output to input (not input to output)
      if (sourcePoint.type === 'input' || targetPoint.type === 'output') {
        console.warn('Connections must go from output to input');
        setConnectionPreview(null);
        return;
      }
      
      // 4. Check for duplicate connections
      const existingConnection = Array.from(edges.values()).find(edge => 
        edge.sourceNodeId === sourcePoint.nodeId &&
        edge.targetNodeId === targetPoint.nodeId &&
        edge.sourceOutputName === sourcePoint.label &&
        edge.targetInputName === targetPoint.label
      );
      
      if (existingConnection) {
        console.warn('Connection already exists between these points');
        setConnectionPreview(null);
        return;
      }
      
      // 5. Check if target input already has a connection (inputs can only have one connection)
      const existingInputConnection = Array.from(edges.values()).find(edge => 
        edge.targetNodeId === targetPoint.nodeId &&
        edge.targetInputName === targetPoint.label
      );
      
      if (existingInputConnection) {
        console.warn('Input already has a connection');
        setConnectionPreview(null);
        return;
      }
      
      // All validations passed - create new edge
      const newEdge: WorkflowDesignerEdge = {
        id: `edge-${Date.now()}`,
        sourceNodeId: sourcePoint.nodeId,
        targetNodeId: targetPoint.nodeId,
        sourceOutputName: sourcePoint.label,
        targetInputName: targetPoint.label,
        edgeType: WorkflowEdgeType._0, // Standard
        path: `M ${sourcePoint.position.x} ${sourcePoint.position.y} L ${targetPoint.position.x} ${targetPoint.position.y}`,
        isSelected: false,
        isHighlighted: false,
        validationErrors: [],
        sourcePosition: sourcePoint.position,
        targetPosition: targetPoint.position,
        strokeWidth: 2,
        strokeColor: '#6b7280',
        isDashed: false,
        createdAt: new Date(),
      };
      
      // Add the edge using the onEdgeAdd callback if available
      if (onEdgeAdd) {
        onEdgeAdd(newEdge);
      }
      
      console.log('Edge created:', newEdge);
    }
    
    // Clear connection preview
    setConnectionPreview(null);
  }, [connectionPreview, onEdgeAdd, edges]);
  
  // Handle mouse move for connection preview - removed as it's now handled inline
  
  // Handle drop from toolbox
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      
      if (data.type === 'node_template') {
        const template = data.template as NodeTemplate;
        const mousePos = getMousePosition(e as any);
        const worldPos = screenToWorld(mousePos);
        
        // Snap to grid if enabled
        if (canvasState.showGrid) {
          worldPos.x = Math.round(worldPos.x / canvasState.gridSize) * canvasState.gridSize;
          worldPos.y = Math.round(worldPos.y / canvasState.gridSize) * canvasState.gridSize;
        }
        
        const newNode = createNodeFromTemplate(template, worldPos);
        onNodeAdd(newNode);
      }
    } catch (error) {
      console.error('Error handling drop:', error);
    }
  }, [getMousePosition, screenToWorld, canvasState.showGrid, canvasState.gridSize, onNodeAdd]);
  
  // Handle drag over
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }, []);
  
  // Zoom controls
  const zoomIn = useCallback(() => {
    const newZoom = Math.min(CANVAS_DEFAULTS.ZOOM_MAX, canvasState.zoom + CANVAS_DEFAULTS.ZOOM_STEP);
    onCanvasUpdate({ zoom: newZoom });
  }, [canvasState.zoom, onCanvasUpdate]);
  
  const zoomOut = useCallback(() => {
    const newZoom = Math.max(CANVAS_DEFAULTS.ZOOM_MIN, canvasState.zoom - CANVAS_DEFAULTS.ZOOM_STEP);
    onCanvasUpdate({ zoom: newZoom });
  }, [canvasState.zoom, onCanvasUpdate]);
  
  const zoomToFit = useCallback(() => {
    const nodeArray = Array.from(nodes.values());
    if (nodeArray.length === 0) return;
    
    const bounds = getBoundsFromNodes(nodeArray);
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    if (!canvasRect) return;
    
    const padding = CANVAS_DEFAULTS.CANVAS_PADDING;
    const zoomX = (canvasRect.width - padding * 2) / bounds.width;
    const zoomY = (canvasRect.height - padding * 2) / bounds.height;
    const newZoom = Math.min(zoomX, zoomY, CANVAS_DEFAULTS.ZOOM_MAX);
    
    const centerX = bounds.x + bounds.width / 2;
    const centerY = bounds.y + bounds.height / 2;
    const newPan = {
      x: canvasRect.width / 2 - centerX * newZoom,
      y: canvasRect.height / 2 - centerY * newZoom,
    };
    
    onCanvasUpdate({
      zoom: newZoom,
      pan: newPan,
    });
  }, [nodes, onCanvasUpdate]);
  
  // Grid pattern
  const gridPattern = canvasState.showGrid ? (
    <defs>
      <pattern
        id="smallGrid"
        width={canvasState.gridSize}
        height={canvasState.gridSize}
        patternUnits="userSpaceOnUse"
      >
        <path
          d={`M ${canvasState.gridSize} 0 L 0 0 0 ${canvasState.gridSize}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={0.5}
          opacity={0.3}
          className="text-gray-300 dark:text-gray-600"
        />
      </pattern>
      <pattern
        id="grid"
        width={canvasState.gridSize * 5}
        height={canvasState.gridSize * 5}
        patternUnits="userSpaceOnUse"
      >
        <rect width="100%" height="100%" fill="url(#smallGrid)" />
        <path
          d={`M ${canvasState.gridSize * 5} 0 L 0 0 0 ${canvasState.gridSize * 5}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          opacity={0.4}
          className="text-gray-400 dark:text-gray-500"
        />
      </pattern>
    </defs>
  ) : null;
  
  const containerClasses = isFullscreen 
    ? "h-screen w-screen flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900"
    : "flex-1 flex flex-col overflow-hidden";

  return (
    <div className={containerClasses}>
      {/* Canvas Controls */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {nodes.size} Nodes
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {edges.size} Connections
            </span>
          </div>
          {selection.nodes.length > 0 && (
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-orange-600 dark:text-orange-400 font-medium">
                {selection.nodes.length} Selected
              </span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Grid toggle */}
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={canvasState.showGrid}
              onChange={(e) => onCanvasUpdate({ showGrid: e.target.checked })}
              className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">Grid</span>
          </label>
          
          {/* Zoom controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={zoomOut}
              className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              title="Zoom Out"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            
            <span className="text-sm text-gray-700 dark:text-gray-300 min-w-[3rem] text-center">
              {Math.round(canvasState.zoom * 100)}%
            </span>
            
            <button
              onClick={zoomIn}
              className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              title="Zoom In"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
            
            <button
              onClick={zoomToFit}
              className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              title="Zoom to Fit"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>
            
            {/* Fullscreen toggle */}
            {onFullscreenToggle && (
              <button
                onClick={onFullscreenToggle}
                className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              >
                {isFullscreen ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Canvas */}
      <div className="flex-1 overflow-hidden relative">
        <div
          ref={canvasRef}
          className={`absolute inset-0 overflow-hidden bg-gray-50 dark:bg-gray-900 ${
            connectionPreview ? 'cursor-crosshair' : isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onWheel={handleWheel}
          onContextMenu={handleContextMenu}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          style={{ touchAction: 'none' }}
        >
          {/* SVG for edges and overlays */}
          <svg
            ref={svgRef}
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: 1, pointerEvents: 'none' }}
            onWheel={handleWheel}
          >
            {gridPattern}
            <g transform={`translate(${canvasState.pan.x}, ${canvasState.pan.y}) scale(${canvasState.zoom})`}>
              {canvasState.showGrid && (
                <rect
                  width={10000 / canvasState.zoom}
                  height={10000 / canvasState.zoom}
                  x={-5000 / canvasState.zoom}
                  y={-5000 / canvasState.zoom}
                  fill="url(#grid)"
                  style={{ pointerEvents: 'none' }}
                />
              )}
            
              {/* Edges */}
              {Array.from(edges.values()).map(edge => {
                const sourceNode = nodes.get(edge.sourceNodeId || '');
                const targetNode = nodes.get(edge.targetNodeId || '');
                
                if (!sourceNode || !targetNode) return null;
                
                // Calculate bump positions for connections with horizontal segments
                const getBumpPosition = (node: any, isOutput: boolean, connectionName?: string) => {
                  const bumpSize = 25; // Updated to match the new bump size
                  const headerHeight = 40;
                  const spacing = 8;
                  const startY = headerHeight + 10;
                  const horizontalOffset = 20; // 20px horizontal segment
                  
                  const connectionPoints = node.connectionPoints || [];
                  const relevantPoints = connectionPoints.filter((p: any) => 
                    isOutput ? p.type === 'output' : p.type === 'input'
                  );
                  
                  // Find the specific connection point or use first one
                  let pointIndex = 0;
                  if (connectionName) {
                    const foundIndex = relevantPoints.findIndex((p: any) => p.label === connectionName);
                    if (foundIndex >= 0) pointIndex = foundIndex;
                  }
                  
                  const yPosition = startY + (pointIndex * (bumpSize + spacing));
                  
                  if (isOutput) {
                    return {
                      x: node.position.x + node.size.width - bumpSize / 2 + 10 + horizontalOffset,
                      y: node.position.y + yPosition
                    };
                  } else {
                    return {
                      x: node.position.x - bumpSize / 2 + 6 - horizontalOffset,
                      y: node.position.y + yPosition
                    };
                  }
                };
                
                const sourcePos = getBumpPosition(sourceNode, true, edge.sourceOutputName);
                const targetPos = getBumpPosition(targetNode, false, edge.targetInputName);
                
                return (
                  <WorkflowEdge
                    key={edge.id}
                    edge={edge}
                    sourcePosition={sourcePos}
                    targetPosition={targetPos}
                    isSelected={selection.edges.includes(edge.id)}
                    onEdgeSelect={onEdgeSelect}
                    onEdgeDelete={onEdgeDelete ? () => onEdgeDelete(edge.id) : () => {}}
                    onEdgeHover={() => {}} // TODO: Implement edge hover
                  />
                );
              })}
            
              {/* Connection preview */}
              {connectionPreview && (
                <path
                  d={`M ${connectionPreview.sourcePoint.position.x} ${connectionPreview.sourcePoint.position.y} L ${connectionPreview.targetPosition.x} ${connectionPreview.targetPosition.y}`}
                  fill="none"
                  stroke={COLORS.EDGE_HIGHLIGHTED}
                  strokeWidth={2 / canvasState.zoom}
                  strokeDasharray="5,5"
                  opacity={0.7}
                />
              )}
            </g>
            
            {/* Arrow marker definitions */}
            <EdgeMarkerDefinitions />
            
            {/* Selection box */}
            {selectionBox && (
              <rect
                x={Math.min(selectionBox.start.x, selectionBox.end.x) * canvasState.zoom + canvasState.pan.x}
                y={Math.min(selectionBox.start.y, selectionBox.end.y) * canvasState.zoom + canvasState.pan.y}
                width={Math.abs(selectionBox.end.x - selectionBox.start.x) * canvasState.zoom}
                height={Math.abs(selectionBox.end.y - selectionBox.start.y) * canvasState.zoom}
                fill={COLORS.SELECTION_BOX}
                fillOpacity={0.1}
                stroke={COLORS.SELECTION_BOX}
                strokeWidth={1}
                strokeDasharray="3,3"
              />
            )}
          </svg>
          
          {/* Nodes */}
          <div
            className="absolute inset-0"
            style={{
              transform: `translate(${canvasState.pan.x}px, ${canvasState.pan.y}px) scale(${canvasState.zoom})`,
              transformOrigin: '0 0',
              zIndex: 2,
            }}
          >
            {Array.from(nodes.values()).map(node => {
              const isBeingDragged = dragPreview.isDragging && draggedNodes.includes(node.id);
              
              return (
                <div
                  key={node.id}
                  className={isBeingDragged ? 'opacity-50' : ''}
                >
                  <WorkflowNode
                    node={node}
                    isSelected={selection.nodes.includes(node.id)}
                    isHighlighted={hoveredConnectionPoint?.nodeId === node.id}
                    scale={canvasState.zoom}
                    onNodeSelect={onNodeSelect}
                    onConnectionStart={handleConnectionStart}
                    onConnectionEnd={handleConnectionEnd}
                    onConnectionHover={handleConnectionHover}
                    showConnectionPoints={!isBeingDragged}
                  />
                </div>
              );
            })}
          </div>
          
          {/* Drag Preview Layer - Ghost nodes showing future positions */}
          {dragPreview.isDragging && dragPreview.previewNodes.length > 0 && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                transform: `translate(${canvasState.pan.x}px, ${canvasState.pan.y}px) scale(${canvasState.zoom})`,
                transformOrigin: '0 0',
                zIndex: 3, // Above normal nodes
              }}
            >
              {dragPreview.previewNodes.map(({ node, previewPosition }) => (
                <div
                  key={`preview-${node.id}`}
                  className="absolute opacity-70"
                  style={{
                    left: previewPosition.x,
                    top: previewPosition.y,
                    width: node.size.width,
                    height: node.size.height,
                  }}
                >
                  <div className="w-full h-full border-2 border-blue-400 border-dashed bg-blue-50 dark:bg-blue-900/30 rounded-lg shadow-lg">
                    <div className="p-3">
                      <div className="text-sm font-medium text-blue-700 dark:text-blue-300 truncate">
                        {node.name}
                      </div>
                      <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        x: {Math.round(previewPosition.x)}, y: {Math.round(previewPosition.y)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Empty state */}
          {nodes.size === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center text-gray-500 dark:text-gray-400">
                <svg className="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="text-lg font-medium mb-2">No workflow nodes yet</h3>
                <p className="text-sm mb-4">Drag programs from the toolbox to create your workflow</p>
                <div className="text-xs space-y-1">
                  <p>• Use the mouse wheel to zoom in/out</p>
                  <p>• Drag the canvas to pan around</p>
                  <p>• Toggle the grid for better alignment</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Context Menu */}
      {contextMenu.visible && (
        <>
          {/* Backdrop to close menu */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={handleCloseContextMenu}
          />
          
          {/* Context menu */}
          <div
            className="fixed z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg py-1 min-w-[120px]"
            style={{
              left: contextMenu.x,
              top: contextMenu.y,
            }}
          >
            {(contextMenu.nodeId || contextMenu.edgeId) && (
              <button
                className="w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                onClick={handleDeleteFromContext}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>Delete {contextMenu.nodeId ? 'Node' : 'Connection'}</span>
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default WorkflowCanvas;