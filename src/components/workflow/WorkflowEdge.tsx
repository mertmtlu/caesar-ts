// src/components/workflow/WorkflowEdge.tsx
import React, { useCallback, useState } from 'react';
import { 
  WorkflowDesignerEdge, 
  Position, 
  ConnectionPoint,
  COLORS,
  CANVAS_DEFAULTS,
  calculateEdgePath 
} from '@/types/workflowDesigner';
import { WorkflowEdgeType } from '@/api/enums';

interface WorkflowEdgeProps {
  edge: WorkflowDesignerEdge;
  sourcePosition: Position;
  targetPosition: Position;
  isSelected: boolean;
  // isHighlighted: boolean; // Currently unused
  
  // Event handlers
  onEdgeSelect: (edgeId: string, addToSelection?: boolean) => void;
  onEdgeDelete: (edgeId: string) => void;
  onEdgeHover: (edgeId: string | null) => void;
  
  // Connection points for validation
  sourcePoint?: ConnectionPoint;
  targetPoint?: ConnectionPoint;
}

const WorkflowEdge: React.FC<WorkflowEdgeProps> = ({
  edge,
  sourcePosition,
  targetPosition,
  isSelected,
  // isHighlighted,
  onEdgeSelect,
  onEdgeDelete,
  onEdgeHover,
  sourcePoint,
  targetPoint,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Get edge type specific styling
  const getEdgeTypeStyles = () => {
    const hasErrors = edge.validationErrors.length > 0;
    
    switch (edge.edgeType) {
      case WorkflowEdgeType._0: // Standard
        return {
          strokeColor: hasErrors ? COLORS.EDGE_ERROR : (isSelected ? COLORS.EDGE_SELECTED : COLORS.EDGE_DEFAULT),
          strokeWidth: isSelected ? CANVAS_DEFAULTS.SELECTION_STROKE_WIDTH : CANVAS_DEFAULTS.EDGE_STROKE_WIDTH,
          strokeDasharray: edge.isDashed ? '5,5' : undefined,
          markerEnd: 'url(#arrowhead-standard)',
        };
      case WorkflowEdgeType._1: // Conditional
        return {
          strokeColor: hasErrors ? COLORS.EDGE_ERROR : (isSelected ? COLORS.EDGE_SELECTED : '#f59e0b'),
          strokeWidth: isSelected ? CANVAS_DEFAULTS.SELECTION_STROKE_WIDTH : CANVAS_DEFAULTS.EDGE_STROKE_WIDTH,
          strokeDasharray: '8,4',
          markerEnd: 'url(#arrowhead-conditional)',
        };
      case WorkflowEdgeType._2: // Success
        return {
          strokeColor: hasErrors ? COLORS.EDGE_ERROR : (isSelected ? COLORS.EDGE_SELECTED : '#10b981'),
          strokeWidth: isSelected ? CANVAS_DEFAULTS.SELECTION_STROKE_WIDTH : CANVAS_DEFAULTS.EDGE_STROKE_WIDTH,
          strokeDasharray: undefined,
          markerEnd: 'url(#arrowhead-success)',
        };
      case WorkflowEdgeType._3: // Error
        return {
          strokeColor: hasErrors ? COLORS.EDGE_ERROR : (isSelected ? COLORS.EDGE_SELECTED : '#ef4444'),
          strokeWidth: isSelected ? CANVAS_DEFAULTS.SELECTION_STROKE_WIDTH : CANVAS_DEFAULTS.EDGE_STROKE_WIDTH,
          strokeDasharray: undefined,
          markerEnd: 'url(#arrowhead-error)',
        };
      case WorkflowEdgeType._4: // Data
        return {
          strokeColor: hasErrors ? COLORS.EDGE_ERROR : (isSelected ? COLORS.EDGE_SELECTED : '#8b5cf6'),
          strokeWidth: isSelected ? CANVAS_DEFAULTS.SELECTION_STROKE_WIDTH : CANVAS_DEFAULTS.EDGE_STROKE_WIDTH + 1,
          strokeDasharray: undefined,
          markerEnd: 'url(#arrowhead-data)',
        };
      default:
        return {
          strokeColor: hasErrors ? COLORS.EDGE_ERROR : (isSelected ? COLORS.EDGE_SELECTED : COLORS.EDGE_DEFAULT),
          strokeWidth: isSelected ? CANVAS_DEFAULTS.SELECTION_STROKE_WIDTH : CANVAS_DEFAULTS.EDGE_STROKE_WIDTH,
          strokeDasharray: edge.isDashed ? '5,5' : undefined,
          markerEnd: 'url(#arrowhead-standard)',
        };
    }
  };
  
  const edgeStyles = getEdgeTypeStyles();
  
  // Calculate the path for the edge
  const calculatePath = useCallback(() => {
    return calculateEdgePath(sourcePosition, targetPosition);
  }, [sourcePosition, targetPosition]);
  
  // Handle edge selection
  const handleEdgeClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onEdgeSelect(edge.id, e.ctrlKey || e.metaKey);
  }, [edge.id, onEdgeSelect]);
  
  // Handle edge hover
  const handleEdgeMouseEnter = useCallback(() => {
    setIsHovered(true);
    onEdgeHover(edge.id);
  }, [edge.id, onEdgeHover]);
  
  const handleEdgeMouseLeave = useCallback(() => {
    setIsHovered(false);
    onEdgeHover(null);
  }, [onEdgeHover]);
  
  // Handle context menu
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Could show context menu here
  }, []);
  
  // Handle keyboard events
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Delete' || e.key === 'Backspace') {
      e.preventDefault();
      onEdgeDelete(edge.id);
    }
  }, [edge.id, onEdgeDelete]);
  
  // Calculate midpoint for labels
  const getMidpoint = useCallback(() => {
    return {
      x: (sourcePosition.x + targetPosition.x) / 2,
      y: (sourcePosition.y + targetPosition.y) / 2,
    };
  }, [sourcePosition, targetPosition]);
  
  // Get edge type label
  const getEdgeTypeLabel = () => {
    switch (edge.edgeType) {
      case WorkflowEdgeType._1: return 'Conditional';
      case WorkflowEdgeType._2: return 'Success';
      case WorkflowEdgeType._3: return 'Error';
      case WorkflowEdgeType._4: return 'Data';
      default: return 'Standard';
    }
  };
  
  const path = calculatePath();
  const midpoint = getMidpoint();
  
  return (
    <g>
      {/* Edge path */}
      <path
        d={path}
        fill="none"
        stroke={edgeStyles.strokeColor}
        strokeWidth={edgeStyles.strokeWidth}
        strokeDasharray={edgeStyles.strokeDasharray}
        markerEnd={edgeStyles.markerEnd}
        className={`cursor-pointer transition-all duration-200 ${
          isHovered || isSelected ? 'opacity-100' : 'opacity-80'
        }`}
        onClick={handleEdgeClick}
        onMouseEnter={handleEdgeMouseEnter}
        onMouseLeave={handleEdgeMouseLeave}
        onContextMenu={handleContextMenu}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      />
      
      {/* Invisible wider path for easier selection */}
      <path
        d={path}
        fill="none"
        stroke="transparent"
        strokeWidth={Math.max(edgeStyles.strokeWidth * 3, 12)}
        className="cursor-pointer"
        onClick={handleEdgeClick}
        onMouseEnter={handleEdgeMouseEnter}
        onMouseLeave={handleEdgeMouseLeave}
        onContextMenu={handleContextMenu}
      />
      
      {/* Edge label */}
      {(isHovered || isSelected) && (
        <g>
          {/* Label background */}
          <rect
            x={midpoint.x - 30}
            y={midpoint.y - 10}
            width={60}
            height={20}
            rx={10}
            fill="white"
            stroke={edgeStyles.strokeColor}
            strokeWidth={1}
            className="drop-shadow-sm"
          />
          
          {/* Label text */}
          <text
            x={midpoint.x}
            y={midpoint.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-xs font-medium fill-gray-700 pointer-events-none"
          >
            {getEdgeTypeLabel()}
          </text>
        </g>
      )}
      
      {/* Validation error indicator */}
      {edge.validationErrors.length > 0 && (
        <g>
          <circle
            cx={midpoint.x + 25}
            cy={midpoint.y - 15}
            r={6}
            fill="#ef4444"
            stroke="white"
            strokeWidth={2}
          />
          <text
            x={midpoint.x + 25}
            y={midpoint.y - 15}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-xs font-bold fill-white pointer-events-none"
          >
            !
          </text>
        </g>
      )}
      
      {/* Connection type indicators */}
      {sourcePoint && targetPoint && (isHovered || isSelected) && (
        <g>
          {/* Source type indicator */}
          <circle
            cx={sourcePosition.x}
            cy={sourcePosition.y}
            r={4}
            fill={sourcePoint.dataType === targetPoint.dataType ? '#10b981' : '#f59e0b'}
            stroke="white"
            strokeWidth={1}
          />
          
          {/* Target type indicator */}
          <circle
            cx={targetPosition.x}
            cy={targetPosition.y}
            r={4}
            fill={sourcePoint.dataType === targetPoint.dataType ? '#10b981' : '#f59e0b'}
            stroke="white"
            strokeWidth={1}
          />
        </g>
      )}
      
      {/* Tooltip for validation errors */}
      {isHovered && edge.validationErrors.length > 0 && (
        <g>
          <rect
            x={midpoint.x - 100}
            y={midpoint.y + 20}
            width={200}
            height={Math.min(edge.validationErrors.length * 16 + 8, 80)}
            rx={4}
            fill="rgba(239, 68, 68, 0.95)"
            stroke="#dc2626"
            strokeWidth={1}
            className="drop-shadow-lg"
          />
          {edge.validationErrors.slice(0, 4).map((error, index) => (
            <text
              key={index}
              x={midpoint.x}
              y={midpoint.y + 32 + index * 16}
              textAnchor="middle"
              className="text-xs fill-white"
            >
              {error.length > 30 ? error.substring(0, 30) + '...' : error}
            </text>
          ))}
          {edge.validationErrors.length > 4 && (
            <text
              x={midpoint.x}
              y={midpoint.y + 32 + 4 * 16}
              textAnchor="middle"
              className="text-xs fill-white opacity-75"
            >
              +{edge.validationErrors.length - 4} more...
            </text>
          )}
        </g>
      )}
    </g>
  );
};

// Arrow marker definitions component
export const EdgeMarkerDefinitions: React.FC = () => (
  <defs>
    {/* Standard arrow */}
    <marker
      id="arrowhead-standard"
      markerWidth="10"
      markerHeight="7"
      refX="9"
      refY="3.5"
      orient="auto"
    >
      <polygon
        points="0 0, 10 3.5, 0 7"
        fill={COLORS.EDGE_DEFAULT}
      />
    </marker>
    
    {/* Conditional arrow */}
    <marker
      id="arrowhead-conditional"
      markerWidth="10"
      markerHeight="7"
      refX="9"
      refY="3.5"
      orient="auto"
    >
      <polygon
        points="0 0, 10 3.5, 0 7"
        fill="#f59e0b"
      />
    </marker>
    
    {/* Success arrow */}
    <marker
      id="arrowhead-success"
      markerWidth="10"
      markerHeight="7"
      refX="9"
      refY="3.5"
      orient="auto"
    >
      <polygon
        points="0 0, 10 3.5, 0 7"
        fill="#10b981"
      />
    </marker>
    
    {/* Error arrow */}
    <marker
      id="arrowhead-error"
      markerWidth="10"
      markerHeight="7"
      refX="9"
      refY="3.5"
      orient="auto"
    >
      <polygon
        points="0 0, 10 3.5, 0 7"
        fill="#ef4444"
      />
    </marker>
    
    {/* Data arrow */}
    <marker
      id="arrowhead-data"
      markerWidth="10"
      markerHeight="7"
      refX="9"
      refY="3.5"
      orient="auto"
    >
      <polygon
        points="0 0, 10 3.5, 0 7"
        fill="#8b5cf6"
      />
    </marker>
  </defs>
);

export default WorkflowEdge;