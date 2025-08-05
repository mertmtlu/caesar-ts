// src/types/workflowDesigner.ts
import { 
  WorkflowDetailDto, 
  ProgramListDto
} from '@/api/types';
import { WorkflowNodeType, WorkflowEdgeType } from '@/api/enums';

// Core workflow designer types
export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Bounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

// Canvas state management
export interface CanvasState {
  zoom: number;
  pan: Position;
  gridSize: number;
  showGrid: boolean;
  canvasSize: Size;
  isDragging: boolean;
  isSelecting: boolean;
  selectedNodeIds: string[];
  selectedEdgeIds: string[];
  dragPreview: Position | null;
}

// Node connection points
export interface ConnectionPoint {
  id: string;
  nodeId: string;
  type: 'input' | 'output';
  dataType: string;
  position: Position;
  isConnected: boolean;
  label?: string;
  required?: boolean;
}

// Enhanced workflow node for designer
export interface WorkflowDesignerNode {
  // Core properties from WorkflowNodeDto
  id: string;
  name: string;
  description?: string;
  programId: string;
  programName?: string;
  versionId?: string;
  nodeType?: WorkflowNodeType;
  isDisabled?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  
  // UI-specific properties
  position: Position;
  size: Size;
  isSelected: boolean;
  isHighlighted: boolean;
  isDragging: boolean;
  connectionPoints: ConnectionPoint[];
  validationErrors: string[];
  
  // Program metadata
  programInfo?: ProgramListDto;
  hasUiComponents?: boolean;
}

// Enhanced workflow edge for designer
export interface WorkflowDesignerEdge {
  // Core properties from WorkflowEdgeDto
  id: string;
  sourceNodeId?: string;
  targetNodeId?: string;
  sourceOutputName?: string;
  targetInputName?: string;
  edgeType?: WorkflowEdgeType;
  isDisabled?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  
  // UI-specific properties
  path: string; // SVG path for rendering
  isSelected: boolean;
  isHighlighted: boolean;
  validationErrors: string[];
  
  // Connection points
  sourcePosition: Position;
  targetPosition: Position;
  
  // Visual properties
  strokeWidth: number;
  strokeColor: string;
  isDashed: boolean;
}

// Selection state
export interface SelectionState {
  nodes: string[];
  edges: string[];
  bounds: Bounds | null;
  isDragging: boolean;
  dragOffset: Position;
}

// Workflow designer state
export interface WorkflowDesignerState {
  // Core data
  workflow: WorkflowDetailDto | null;
  nodes: Map<string, WorkflowDesignerNode>;
  edges: Map<string, WorkflowDesignerEdge>;
  
  // Canvas state
  canvas: CanvasState;
  
  // Selection state
  selection: SelectionState;
  
  // UI state
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  
  // Interaction state
  draggedNode: string | null;
  draggedEdge: string | null;
  connectionPreview: {
    sourcePoint: ConnectionPoint;
    targetPosition: Position;
  } | null;
  
  // Validation state
  validationResults: {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  };
}

// Node template (from program)
export interface NodeTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  programId: string;
  programInfo: ProgramListDto;
  defaultSize: Size;
  inputPorts: ConnectionPointTemplate[];
  outputPorts: ConnectionPointTemplate[];
  configurationSchema: any; // JSON schema for configuration
}

export interface ConnectionPointTemplate {
  id: string;
  name: string;
  type: 'input' | 'output';
  dataType: string;
  required: boolean;
  description?: string;
  defaultValue?: any;
}

// Drag and drop types
export interface DragData {
  type: 'node_template' | 'node' | 'edge';
  data: any;
  sourcePosition: Position;
}

// Canvas actions
export interface CanvasActions {
  // Pan and zoom
  setPan: (pan: Position) => void;
  setZoom: (zoom: number) => void;
  zoomToFit: () => void;
  zoomToSelection: () => void;
  
  // Selection
  selectNode: (nodeId: string, addToSelection?: boolean) => void;
  selectEdge: (edgeId: string, addToSelection?: boolean) => void;
  selectAll: () => void;
  clearSelection: () => void;
  
  // Node operations
  addNode: (template: NodeTemplate, position: Position) => void;
  updateNode: (nodeId: string, updates: Partial<WorkflowDesignerNode>) => void;
  deleteNode: (nodeId: string) => void;
  duplicateNode: (nodeId: string) => void;
  
  // Edge operations
  addEdge: (sourcePoint: ConnectionPoint, targetPoint: ConnectionPoint) => void;
  updateEdge: (edgeId: string, updates: Partial<WorkflowDesignerEdge>) => void;
  deleteEdge: (edgeId: string) => void;
  
  // Layout operations
  alignNodes: (alignment: 'left' | 'right' | 'center' | 'top' | 'bottom' | 'middle') => void;
  distributeNodes: (direction: 'horizontal' | 'vertical') => void;
  autoLayout: () => void;
  
  // Validation
  validateWorkflow: () => void;
  validateNode: (nodeId: string) => void;
  validateEdge: (edgeId: string) => void;
}

// Workflow operations
export interface WorkflowOperations {
  // Persistence
  saveWorkflow: () => Promise<void>;
  loadWorkflow: (workflowId: string) => Promise<void>;
  createWorkflow: (name: string, description?: string) => Promise<void>;
  publishWorkflow: () => Promise<void>;
  
  // Import/Export
  exportWorkflow: () => Promise<string>;
  importWorkflow: (data: string) => Promise<void>;
  
  // Templates
  saveAsTemplate: (name: string, description?: string) => Promise<void>;
  loadTemplate: (templateId: string) => Promise<void>;
  
  // Execution
  executeWorkflow: (inputs?: any) => Promise<string>;
  validateBeforeExecution: () => Promise<boolean>;
}

// Constants
export const CANVAS_DEFAULTS = {
  ZOOM_MIN: 0.1,
  ZOOM_MAX: 3.0,
  ZOOM_STEP: 0.1,
  GRID_SIZE: 20,
  NODE_MIN_SIZE: { width: 120, height: 60 },
  NODE_DEFAULT_SIZE: { width: 200, height: 100 },
  EDGE_STROKE_WIDTH: 2,
  SELECTION_STROKE_WIDTH: 3,
  SNAP_THRESHOLD: 10,
  CONNECTION_POINT_SIZE: 8,
  CANVAS_PADDING: 100,
};

export const COLORS = {
  NODE_BACKGROUND: '#ffffff',
  NODE_BORDER: '#e5e7eb',
  NODE_SELECTED: '#3b82f6',
  NODE_HIGHLIGHTED: '#10b981',
  NODE_ERROR: '#ef4444',
  EDGE_DEFAULT: '#6b7280',
  EDGE_SELECTED: '#3b82f6',
  EDGE_HIGHLIGHTED: '#10b981',
  EDGE_ERROR: '#ef4444',
  CANVAS_BACKGROUND: '#f9fafb',
  GRID_LINE: '#e5e7eb',
  SELECTION_BOX: '#3b82f6',
  CONNECTION_POINT: '#6b7280',
  CONNECTION_POINT_ACTIVE: '#3b82f6',
};

// Utility functions
export const createDefaultCanvasState = (): CanvasState => ({
  zoom: 1,
  pan: { x: 0, y: 0 },
  gridSize: CANVAS_DEFAULTS.GRID_SIZE,
  showGrid: true,
  canvasSize: { width: 2000, height: 1500 },
  isDragging: false,
  isSelecting: false,
  selectedNodeIds: [],
  selectedEdgeIds: [],
  dragPreview: null,
});

export const createDefaultSelectionState = (): SelectionState => ({
  nodes: [],
  edges: [],
  bounds: null,
  isDragging: false,
  dragOffset: { x: 0, y: 0 },
});

export const createNodeFromTemplate = (
  template: NodeTemplate,
  position: Position,
  id?: string
): WorkflowDesignerNode => ({
  id: id || `node-${Date.now()}`,
  name: template.name,
  description: template.description,
  programId: template.programId,
  programName: template.programInfo.name,
  nodeType: WorkflowNodeType.Program, // Default to program node
  position,
  size: template.defaultSize,
  isSelected: false,
  isHighlighted: false,
  isDragging: false,
  connectionPoints: [
    ...template.inputPorts.map((port, index) => ({
      id: `${id || `node-${Date.now()}`}-input-${index}`,
      nodeId: id || `node-${Date.now()}`,
      type: 'input' as const,
      dataType: port.dataType,
      position: { x: 0, y: (index + 1) * 20 },
      isConnected: false,
      label: port.name,
      required: port.required,
    })),
    ...template.outputPorts.map((port, index) => ({
      id: `${id || `node-${Date.now()}`}-output-${index}`,
      nodeId: id || `node-${Date.now()}`,
      type: 'output' as const,
      dataType: port.dataType,
      position: { x: template.defaultSize.width, y: (index + 1) * 20 },
      isConnected: false,
      label: port.name,
      required: port.required,
    })),
  ],
  validationErrors: [],
  programInfo: template.programInfo,
  createdAt: new Date(),
});

export const calculateEdgePath = (
  sourcePos: Position,
  targetPos: Position
): string => {
  // sourcePos and targetPos are already the extended positions (20px from bumps)
  // We need to draw: bump -> horizontal segment -> curve -> horizontal segment -> bump
  
  const horizontalLength = 20; // Length of horizontal segments
  
  // Actual bump positions (20px back from the extended positions)
  const sourceBumpX = sourcePos.x - horizontalLength;
  const targetBumpX = targetPos.x + horizontalLength;
  
  // Control points for smooth curve
  const dx = targetPos.x - sourcePos.x;
  const curveOffset = Math.min(Math.abs(dx) * 0.5, 100);
  
  // Create path: bump -> horizontal -> curve -> horizontal -> bump
  return [
    `M ${sourceBumpX} ${sourcePos.y}`,           // Start at source bump
    `L ${sourcePos.x} ${sourcePos.y}`,           // Horizontal line to extended position
    `C ${sourcePos.x + curveOffset} ${sourcePos.y}`, // Curve control point 1
    `${targetPos.x - curveOffset} ${targetPos.y}`,   // Curve control point 2  
    `${targetPos.x} ${targetPos.y}`,             // End curve at extended position
    `L ${targetBumpX} ${targetPos.y}`            // Horizontal line to target bump
  ].join(' ');
};

export const getBoundsFromNodes = (nodes: WorkflowDesignerNode[]): Bounds => {
  if (nodes.length === 0) {
    return { x: 0, y: 0, width: 0, height: 0 };
  }
  
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  
  nodes.forEach(node => {
    minX = Math.min(minX, node.position.x);
    minY = Math.min(minY, node.position.y);
    maxX = Math.max(maxX, node.position.x + node.size.width);
    maxY = Math.max(maxY, node.position.y + node.size.height);
  });
  
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  };
};