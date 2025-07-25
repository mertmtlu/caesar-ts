// src/components/workflow/WorkflowNode.tsx
import React, { useState, useRef, useCallback } from 'react';
import { 
  WorkflowDesignerNode, 
  ConnectionPoint, 
  Position,
  COLORS,
  CANVAS_DEFAULTS 
} from '@/types/workflowDesigner';
import { WorkflowNodeType } from '@/api/enums';

interface WorkflowNodeProps {
  node: WorkflowDesignerNode;
  isSelected: boolean;
  isHighlighted: boolean;
  scale: number;
  
  // Event handlers
  onNodeSelect: (nodeId: string, addToSelection?: boolean) => void;
  onConnectionStart: (point: ConnectionPoint) => void;
  onConnectionEnd: (point: ConnectionPoint) => void;
  onConnectionHover: (point: ConnectionPoint | null) => void;
  
  // Optional props
  showConnectionPoints?: boolean;
}

const WorkflowNode: React.FC<WorkflowNodeProps> = ({
  node,
  isSelected,
  isHighlighted,
  scale,
  onNodeSelect,
  onConnectionStart,
  onConnectionEnd,
  onConnectionHover,
  showConnectionPoints = true,
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging] = useState(false);
  // const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 }); // Currently unused
  const [hoveredConnectionPoint, setHoveredConnectionPoint] = useState<string | null>(null);
  
  // Get node type specific styling
  const getNodeTypeStyles = () => {
    switch (node.nodeType) {
      case WorkflowNodeType._0: // Standard
        return {
          borderColor: COLORS.NODE_BORDER,
          backgroundColor: COLORS.NODE_BACKGROUND,
          iconColor: 'text-blue-500',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        };
      case WorkflowNodeType._1: // Start
        return {
          borderColor: 'border-green-500',
          backgroundColor: 'bg-green-50',
          iconColor: 'text-green-500',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        };
      case WorkflowNodeType._2: // End
        return {
          borderColor: 'border-red-500',
          backgroundColor: 'bg-red-50',
          iconColor: 'text-red-500',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        };
      case WorkflowNodeType._3: // Condition
        return {
          borderColor: 'border-yellow-500',
          backgroundColor: 'bg-yellow-50',
          iconColor: 'text-yellow-500',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        };
      default:
        return {
          borderColor: COLORS.NODE_BORDER,
          backgroundColor: COLORS.NODE_BACKGROUND,
          iconColor: 'text-gray-500',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          ),
        };
    }
  };
  
  const nodeStyles = getNodeTypeStyles();
  
  // Handle node selection
  const handleNodeClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onNodeSelect(node.id, e.ctrlKey || e.metaKey);
  }, [node.id, onNodeSelect]);
  
  // Handle node double-click for editing
  const handleNodeDoubleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    // Could open node configuration modal here
  }, []);
  
  // Handle connection point interactions
  const handleConnectionPointMouseDown = useCallback((e: React.MouseEvent, point: ConnectionPoint) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('Connection point clicked:', point);
    
    // Calculate the actual position for the connection point
    const position = getConnectionPointPosition(point);
    const worldPosition = {
      x: node.position.x + position.x,
      y: node.position.y + position.y
    };
    
    const updatedPoint = {
      ...point,
      position: worldPosition
    };
    
    onConnectionStart(updatedPoint);
  }, [onConnectionStart, node.position]);
  
  const handleConnectionPointMouseEnter = useCallback((point: ConnectionPoint) => {
    setHoveredConnectionPoint(point.id);
    onConnectionHover(point);
  }, [onConnectionHover]);
  
  const handleConnectionPointMouseUp = useCallback((e: React.MouseEvent, point: ConnectionPoint) => {
    e.stopPropagation();
    e.preventDefault();
    
    // Calculate the actual position for the connection point
    const position = getConnectionPointPosition(point);
    const worldPosition = {
      x: node.position.x + position.x,
      y: node.position.y + position.y
    };
    
    const updatedPoint = {
      ...point,
      position: worldPosition
    };
    
    onConnectionEnd(updatedPoint);
  }, [onConnectionEnd, node.position]);
  
  const handleConnectionPointMouseLeave = useCallback(() => {
    setHoveredConnectionPoint(null);
    onConnectionHover(null);
  }, [onConnectionHover]);
  
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
      // TODO: Implement node deletion
    }
  }, []);
  
  // Calculate connection point positions for bump-style connectors
  const getConnectionPointPosition = (point: ConnectionPoint): Position => {
    const bumpSize = 16; // Size of the bump
    const headerHeight = 40; // Adjusted header height
    const spacing = 8; // Space between connection points
    const startY = headerHeight + 10; // Start position after header
    
    // Calculate Y position based on connection point index
    const connectionPoints = node.connectionPoints || [];
    const inputPoints = connectionPoints.filter(p => p.type === 'input');
    const outputPoints = connectionPoints.filter(p => p.type === 'output');
    
    let yPosition = startY;
    if (point.type === 'input') {
      const inputIndex = inputPoints.findIndex(p => p.id === point.id);
      yPosition = startY + (inputIndex * (bumpSize + spacing));
    } else {
      const outputIndex = outputPoints.findIndex(p => p.id === point.id);
      yPosition = startY + (outputIndex * (bumpSize + spacing));
    }
    
    if (point.type === 'input') {
      return {
        x: -bumpSize / 2 + 6, // Half the bump extends from left edge
        y: yPosition,
      };
    } else {
      return {
        x: node.size.width - bumpSize / 2 + 10, // Half the bump extends from right edge
        y: yPosition,
      };
    }
  };
  
  // Render connection point with bump-style design
  const renderConnectionPoint = (point: ConnectionPoint) => {
    const position = getConnectionPointPosition(point);
    const isHovered = hoveredConnectionPoint === point.id;
    const isActive = point.isConnected || isHovered;
    const bumpSize = 25;
    
    return (
      <div
        key={point.id}
        className={`absolute cursor-crosshair z-50 transition-all duration-200 ${
          isActive ? 'opacity-100 scale-110' : 'opacity-80 hover:opacity-100 hover:scale-105'
        }`}
        style={{
          left: position.x,
          top: position.y,
          width:  3, // Slightly larger click area
          height: bumpSize + 4,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'auto',
          zIndex: 1000,
        }}
        onMouseDown={(e) => handleConnectionPointMouseDown(e, point)}
        onMouseUp={(e) => handleConnectionPointMouseUp(e, point)}
        onMouseEnter={() => handleConnectionPointMouseEnter(point)}
        onMouseLeave={handleConnectionPointMouseLeave}
        title={`${point.type}: ${point.label} (${point.dataType})`}
      >
        {/* Bump Shape */}
        <div className="relative w-full h-full flex items-center justify-center">
          <div
            className={`relative transition-all duration-200 border cursor-crosshair flex items-center justify-center ${
              isActive 
                ? 'bg-blue-500 border-blue-400 shadow-lg shadow-blue-500/50' 
                : point.isConnected
                ? 'bg-gray-600 border-gray-500 shadow-md'
                : 'bg-gray-400 border-gray-300 hover:bg-gray-500 hover:border-gray-400 shadow-sm'
            }`}
            style={{
              width: `${bumpSize}px`,
              height: `${bumpSize - 4}px`,
              borderRadius: point.type === 'input' 
                ? '8px 2px 2px 8px' // Rounded on the left (protruding left)
                : '2px 8px 8px 2px', // Rounded on the right (protruding right)
              transform: isActive ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            {/* Arrow symbol inside bump */}
            <div 
              className={`text-white font-bold text-xs select-none ${
                isActive ? 'text-white' : 'text-gray-100'
              }`}
              style={{ 
                fontSize: '10px',
                lineHeight: '1',
                fontFamily: 'monospace',
                transform: 'scaleX(0.8)' // Make arrow slightly narrower
              }}
            >
{'>'}
            </div>
            
            {/* Connection indicator dot */}
            {point.isConnected && (
              <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-green-400 rounded-full border border-white shadow-sm" />
            )}
            
            {/* Glow effect when active */}
            {isActive && (
              <div 
                className="absolute inset-0 rounded-full bg-blue-400 opacity-30 animate-pulse"
                style={{ transform: 'scale(1.3)' }}
              />
            )}
          </div>
        </div>
        
        {/* Tooltip */}
        {isHovered && (
          <div
            className={`absolute text-xs bg-gray-900 text-white px-2 py-1.5 rounded-md shadow-lg whitespace-nowrap z-20 pointer-events-none border border-gray-700 ${
              point.type === 'input' ? 'left-6' : 'right-6'
            }`}
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          >
            <div className="flex items-center space-x-1.5">
              {/* Mini bump icon in tooltip */}
              <div 
                className="w-3 h-2.5 bg-gray-500 border border-gray-400 flex items-center justify-center"
                style={{
                  borderRadius: point.type === 'input' 
                    ? '4px 1px 1px 4px' // Match input bump shape
                    : '1px 4px 4px 1px'  // Match output bump shape
                }}
              >
                <span className="text-white text-xs font-mono" style={{ fontSize: '8px' }}>
    {'>'}
                </span>
              </div>
              <div>
                <div className="font-medium text-white">{point.label}</div>
                <div className="text-gray-300 text-xs">{point.dataType}</div>
                {point.required && <span className="text-red-400">*</span>}
              </div>
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {point.type === 'input' ? 'Input connection' : 'Output connection'}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div
      ref={nodeRef}
      className={`absolute select-none group transition-all duration-200 ${
        isDragging ? 'opacity-75 z-50' : 'z-10'
      } ${isSelected ? 'z-20' : ''}`}
      style={{
        left: node.position.x,
        top: node.position.y,
        width: node.size.width,
        height: node.size.height,
        transform: isDragging ? 'scale(1.02)' : 'scale(1)',
        pointerEvents: 'auto',
        maxWidth: node.size.width,
        maxHeight: node.size.height,
      }}
      onClick={handleNodeClick}
      onDoubleClick={handleNodeDoubleClick}
      onContextMenu={handleContextMenu}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Node content */}
      <div
        className={`w-full h-full rounded-lg border-2 shadow-sm transition-all duration-200 bg-white dark:bg-gray-800 overflow-hidden ${
          isSelected
            ? 'border-blue-500 shadow-xl ring-2 ring-blue-500 ring-opacity-20 bg-blue-50 dark:bg-blue-900/20'
            : isHighlighted
            ? 'border-green-500 shadow-lg bg-green-50 dark:bg-green-900/20'
            : node.validationErrors.length > 0
            ? 'border-red-500 shadow-lg bg-red-50 dark:bg-red-900/20'
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
        } ${
          isHovered || showConnectionPoints
            ? 'shadow-lg'
            : 'shadow-sm'
        }`}
        style={{ maxWidth: '100%', maxHeight: '100%' }}
      >
        {/* Node header */}
        <div className="flex items-center justify-between p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
          <div className="flex items-center space-x-2 min-w-0 flex-1">
            <div className={`flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center ${
              isSelected ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400' : 'bg-white dark:bg-gray-600 text-gray-600 dark:text-gray-300'
            } shadow-sm`}>
              {nodeStyles.icon}
            </div>
            <div className="min-w-0 flex-1 overflow-hidden" style={{ maxWidth: 'calc(100% - 2rem)' }}>
              <div className="text-xs font-semibold text-gray-900 dark:text-gray-100 leading-tight" 
                   title={node.name}
                   style={{
                     overflow: 'hidden',
                     textOverflow: 'ellipsis',
                     whiteSpace: 'nowrap',
                     maxWidth: '100%'
                   }}>
                {node.name}
              </div>
              {node.programInfo && (
                <div className="text-xs text-gray-500 dark:text-gray-400 leading-tight" 
                     title={`${node.programInfo.language} • ${node.programInfo.type}`}
                     style={{
                       overflow: 'hidden',
                       textOverflow: 'ellipsis',
                       whiteSpace: 'nowrap',
                       maxWidth: '100%'
                     }}>
                  {node.programInfo.language} • {node.programInfo.type}
                </div>
              )}
            </div>
          </div>
          
          {/* Node status indicators */}
          <div className="flex items-center space-x-1 flex-shrink-0">
            {node.validationErrors.length > 0 && (
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" title="Validation errors" />
            )}
            {node.isDisabled && (
              <div className="w-2 h-2 bg-gray-400 rounded-full" title="Disabled" />
            )}
          </div>
        </div>
        
        {/* Node body */}
        <div className="p-2 flex-1 overflow-hidden flex flex-col">
          {/* Description - flexible space */}
          <div className="flex-1 overflow-hidden">
            {node.description && (
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-tight" 
                 title={node.description}
                 style={{
                   display: '-webkit-box',
                   WebkitLineClamp: 1,
                   WebkitBoxOrient: 'vertical',
                   overflow: 'hidden',
                   wordBreak: 'break-word',
                   maxWidth: '100%',
                   hyphens: 'auto'
                 }}>
                {node.description}
              </p>
            )}
          </div>
          
          {/* Program info - always visible at bottom */}
          {node.programInfo && (
            <div className="flex items-center space-x-1 mt-auto pt-1 flex-shrink-0 overflow-hidden" style={{ maxWidth: '100%' }}>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300"
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '48%'
                    }}>
                {node.programInfo.language}
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300"
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '48%'
                    }}>
                {node.programInfo.type}
              </span>
            </div>
          )}
          
          {/* Validation errors */}
          {node.validationErrors.length > 0 && (
            <div className="mt-2 p-1.5 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-700 rounded text-xs text-red-700 dark:text-red-300 overflow-hidden">
              {node.validationErrors.slice(0, 1).map((error, index) => (
                <div key={index} className="truncate" title={error}>{error}</div>
              ))}
              {node.validationErrors.length > 1 && (
                <div className="text-xs opacity-75">+{node.validationErrors.length - 1} more</div>
              )}
            </div>
          )}
        </div>
        
        {/* Connection points */}
        {showConnectionPoints && (isHovered || isSelected || scale < 0.8 || true) && (
          <div className="absolute inset-0">
            {node.connectionPoints.map(renderConnectionPoint)}
          </div>
        )}
      </div>
      
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute -inset-1 border-2 border-blue-500 rounded-lg pointer-events-none" />
      )}
      
      {/* Resize handles (if selected) */}
      {isSelected && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 border border-white rounded-sm pointer-events-auto cursor-se-resize" />
        </div>
      )}
      
      {/* Node label (when zoomed out) */}
      {scale < 0.5 && (
        <div className="absolute -top-6 left-0 text-xs bg-gray-800 text-white px-2 py-1 rounded shadow-lg whitespace-nowrap">
          {node.name}
        </div>
      )}
    </div>
  );
};

export default WorkflowNode;