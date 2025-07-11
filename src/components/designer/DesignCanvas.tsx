// src/components/designer/DesignCanvas.tsx
import React, { useRef, useState, useEffect } from 'react';
import { 
  UIElement, 
  Position, 
  Size, 
  DesignerState, 
  createElement,
  ELEMENT_TEMPLATES 
} from '@/types/componentDesigner';

interface DesignCanvasProps {
  elements: UIElement[];
  selectedElementId: string | null;
  canvasSize: Size;
  gridSize: number;
  showGrid: boolean;
  zoom: number;
  onElementAdd: (element: UIElement) => void;
  onElementUpdate: (elementId: string, updates: Partial<UIElement>) => void;
  onElementDelete: (elementId: string) => void;
  onElementSelect: (elementId: string | null) => void;
  onMultiSelect?: (elementIds: string[]) => void;
  onCanvasUpdate: (updates: Partial<DesignerState>) => void;
}

const DesignCanvas: React.FC<DesignCanvasProps> = ({
  elements,
  selectedElementId,
  canvasSize,
  gridSize,
  showGrid,
  zoom,
  onElementAdd,
  onElementUpdate,
  onElementDelete,
  onElementSelect,
  onMultiSelect,
  onCanvasUpdate
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const [draggedElementId, setDraggedElementId] = useState<string | null>(null);
  const [tempDragPosition, setTempDragPosition] = useState<Position | null>(null);
  const [alignmentLines, setAlignmentLines] = useState<{
    vertical: number[];
    horizontal: number[];
  }>({ vertical: [], horizontal: [] });
  const [dragPreviewPosition, setDragPreviewPosition] = useState<Position | null>(null);
  
  // Multi-select functionality
  const [selectedElementIds, setSelectedElementIds] = useState<string[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionBox, setSelectionBox] = useState<{
    start: Position;
    end: Position;
  } | null>(null);
  
  // Resize functionality
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState<string | null>(null);
  const [resizeStartPos, setResizeStartPos] = useState<Position>({ x: 0, y: 0 });
  const [resizeStartSize, setResizeStartSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [resizeStartElementPos, setResizeStartElementPos] = useState<Position>({ x: 0, y: 0 });
  const [tempResizeState, setTempResizeState] = useState<{ size: { width: number; height: number }; position: Position } | null>(null);

  // Keep multi-select in sync with single select
  useEffect(() => {
    if (selectedElementId) {
      setSelectedElementIds([selectedElementId]);
    } else {
      setSelectedElementIds([]);
    }
  }, [selectedElementId]);

  // Snap and alignment utilities
  const SNAP_THRESHOLD = 8; // pixels

  const findSnapPoints = (draggedElement: UIElement, currentPosition: Position) => {
    const snapPoints = { 
      vertical: [] as number[], 
      horizontal: [] as number[] 
    };

    // Get other elements (excluding the dragged one)
    const otherElements = elements.filter(el => el.id !== draggedElement.id);

    // Canvas edges
    snapPoints.vertical.push(0, canvasSize.width);
    snapPoints.horizontal.push(0, canvasSize.height);

    // Grid snap points
    if (showGrid) {
      for (let x = 0; x <= canvasSize.width; x += gridSize) {
        snapPoints.vertical.push(x);
      }
      for (let y = 0; y <= canvasSize.height; y += gridSize) {
        snapPoints.horizontal.push(y);
      }
    }

    // Element alignment points
    otherElements.forEach(element => {
      const { position, size } = element;
      
      // Vertical alignment lines (x positions)
      snapPoints.vertical.push(
        position.x, // left edge
        position.x + size.width / 2, // center
        position.x + size.width // right edge
      );
      
      // Horizontal alignment lines (y positions)
      snapPoints.horizontal.push(
        position.y, // top edge
        position.y + size.height / 2, // center
        position.y + size.height // bottom edge
      );
    });

    // Check for snapping
    let snappedPosition = { ...currentPosition };
    const activeAlignmentLines = { 
      vertical: [] as number[], 
      horizontal: [] as number[] 
    };

    // Snap to vertical lines
    const draggedLeft = currentPosition.x;
    const draggedCenter = currentPosition.x + draggedElement.size.width / 2;
    const draggedRight = currentPosition.x + draggedElement.size.width;

    snapPoints.vertical.forEach(snapX => {
      if (Math.abs(draggedLeft - snapX) <= SNAP_THRESHOLD) {
        snappedPosition.x = snapX;
        activeAlignmentLines.vertical.push(snapX);
      } else if (Math.abs(draggedCenter - snapX) <= SNAP_THRESHOLD) {
        snappedPosition.x = snapX - draggedElement.size.width / 2;
        activeAlignmentLines.vertical.push(snapX);
      } else if (Math.abs(draggedRight - snapX) <= SNAP_THRESHOLD) {
        snappedPosition.x = snapX - draggedElement.size.width;
        activeAlignmentLines.vertical.push(snapX);
      }
    });

    // Snap to horizontal lines
    const draggedTop = currentPosition.y;
    const draggedMiddle = currentPosition.y + draggedElement.size.height / 2;
    const draggedBottom = currentPosition.y + draggedElement.size.height;

    snapPoints.horizontal.forEach(snapY => {
      if (Math.abs(draggedTop - snapY) <= SNAP_THRESHOLD) {
        snappedPosition.y = snapY;
        activeAlignmentLines.horizontal.push(snapY);
      } else if (Math.abs(draggedMiddle - snapY) <= SNAP_THRESHOLD) {
        snappedPosition.y = snapY - draggedElement.size.height / 2;
        activeAlignmentLines.horizontal.push(snapY);
      } else if (Math.abs(draggedBottom - snapY) <= SNAP_THRESHOLD) {
        snappedPosition.y = snapY - draggedElement.size.height;
        activeAlignmentLines.horizontal.push(snapY);
      }
    });

    return { snappedPosition, alignmentLines: activeAlignmentLines };
  };

  // Handle canvas mouse down for selection box
  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    // Check if click is on canvas background or grid (not on UI elements)
    const target = e.target as HTMLElement;
    const isCanvasBackground = target === canvasRef.current || 
                              target.hasAttribute('data-canvas-background') ||
                              target.closest('[data-canvas-background]');
    
    if (isCanvasBackground) {
      e.preventDefault();
      e.stopPropagation();
      
      if (!e.ctrlKey && !e.metaKey) {
        onElementSelect(null);
        setSelectedElementIds([]);
      }
      
      // Start selection box
      const rect = canvasRef.current!.getBoundingClientRect();
      const startPos: Position = {
        x: (e.clientX - rect.left) / zoom,
        y: (e.clientY - rect.top) / zoom
      };
      
      setIsSelecting(true);
      setSelectionBox({ start: startPos, end: startPos });
    }
  };

  // Handle canvas click to deselect elements
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current && !isSelecting) {
      onElementSelect(null);
    }
  };

  // Handle canvas double-click to add element at cursor position
  const handleCanvasDoubleClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const position: Position = {
        x: (e.clientX - rect.left) / zoom,
        y: (e.clientY - rect.top) / zoom
      };

      // Add a default text input element
      const textTemplate = ELEMENT_TEMPLATES.find(t => t.type === 'text_input');
      if (textTemplate) {
        const element = createElement(textTemplate, position);
        onElementAdd(element);
      }
    }
  };

  // Handle drop from toolbox
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setDragPreviewPosition(null);

    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      
      if (data.type === 'element') {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (rect) {
          let position: Position = {
            x: (e.clientX - rect.left) / zoom,
            y: (e.clientY - rect.top) / zoom
          };

          // Create a temporary element for snap calculation
          const tempElement = createElement(data.template, position);
          
          // Apply snapping for new elements
          const { snappedPosition } = findSnapPoints(tempElement, position);
          position = snappedPosition;

          const element = createElement(data.template, position);
          onElementAdd(element);
        }
      }
    } catch (error) {
      console.error('Error handling drop:', error);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';

    // Show preview position for toolbox drag
    if (e.dataTransfer.types.includes('application/json')) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        const position: Position = {
          x: (e.clientX - rect.left) / zoom,
          y: (e.clientY - rect.top) / zoom
        };
        setDragPreviewPosition(position);
      }
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    if (!canvasRef.current?.contains(e.relatedTarget as Node)) {
      setIsDragging(false);
    }
  };

  // Handle element mouse down for dragging
  const handleElementMouseDown = (e: React.MouseEvent, elementId: string) => {
    e.preventDefault();
    e.stopPropagation();

    const element = elements.find(el => el.id === elementId);
    if (!element) return;

    // Handle multi-select with Ctrl/Cmd key
    if (e.ctrlKey || e.metaKey) {
      const newSelectedIds = selectedElementIds.includes(elementId)
        ? selectedElementIds.filter(id => id !== elementId)
        : [...selectedElementIds, elementId];
      
      setSelectedElementIds(newSelectedIds);
      if (onMultiSelect) {
        onMultiSelect(newSelectedIds);
      }
      
      // Update main selection to last clicked element
      if (newSelectedIds.length > 0) {
        onElementSelect(newSelectedIds[newSelectedIds.length - 1]);
      } else {
        onElementSelect(null);
      }
      return; // Don't start dragging on multi-select
    } else {
      // Single select
      onElementSelect(elementId);
      setDraggedElementId(elementId);
      
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        const offset: Position = {
          x: (e.clientX - rect.left) / zoom - element.position.x,
          y: (e.clientY - rect.top) / zoom - element.position.y
        };
        setDragOffset(offset);
      }
    }
  };

  // Handle resize handle mouse down
  const handleResizeMouseDown = (e: React.MouseEvent, elementId: string, handle: string) => {
    e.preventDefault();
    e.stopPropagation();

    const element = elements.find(el => el.id === elementId);
    if (!element) return;

    setIsResizing(true);
    setResizeHandle(handle);
    setResizeStartSize(element.size);
    setResizeStartElementPos(element.position);
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setResizeStartPos({
        x: (e.clientX - rect.left) / zoom,
        y: (e.clientY - rect.top) / zoom
      });
    }
  };

  // Handle mouse move for element dragging and resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return;
      
      const rect = canvasRef.current.getBoundingClientRect();
      const currentPos: Position = {
        x: (e.clientX - rect.left) / zoom,
        y: (e.clientY - rect.top) / zoom
      };

      // Handle element dragging
      if (draggedElementId) {
        const draggedElement = elements.find(el => el.id === draggedElementId);
        if (!draggedElement) return;

        let newPosition: Position = {
          x: currentPos.x - dragOffset.x,
          y: currentPos.y - dragOffset.y
        };

        // Apply smart snapping
        const { snappedPosition, alignmentLines: activeLines } = findSnapPoints(draggedElement, newPosition);
        newPosition = snappedPosition;

        // Keep element within canvas bounds
        newPosition.x = Math.max(0, Math.min(newPosition.x, canvasSize.width - draggedElement.size.width));
        newPosition.y = Math.max(0, Math.min(newPosition.y, canvasSize.height - draggedElement.size.height));

        // Update temporary position for immediate visual feedback
        setTempDragPosition(newPosition);
        setAlignmentLines(activeLines);
      }

      // Handle element resizing
      if (isResizing && selectedElementId && resizeHandle) {
        const element = elements.find(el => el.id === selectedElementId);
        if (!element) return;

        // Apply zoom factor to delta calculations for more responsive resizing
        const deltaX = (currentPos.x - resizeStartPos.x);
        const deltaY = (currentPos.y - resizeStartPos.y);
        
        let newSize = { ...resizeStartSize };
        let newPosition = { ...resizeStartElementPos };

        switch (resizeHandle) {
          case 'nw':
            newSize.width = Math.max(50, resizeStartSize.width - deltaX);
            newSize.height = Math.max(30, resizeStartSize.height - deltaY);
            // When resizing from NW, position moves by the amount the size decreased
            newPosition.x = resizeStartElementPos.x + (resizeStartSize.width - newSize.width);
            newPosition.y = resizeStartElementPos.y + (resizeStartSize.height - newSize.height);
            break;
          case 'ne':
            newSize.width = Math.max(50, resizeStartSize.width + deltaX);
            newSize.height = Math.max(30, resizeStartSize.height - deltaY);
            // Position X stays the same, Y moves up
            newPosition.x = resizeStartElementPos.x;
            newPosition.y = resizeStartElementPos.y + (resizeStartSize.height - newSize.height);
            break;
          case 'sw':
            newSize.width = Math.max(50, resizeStartSize.width - deltaX);
            newSize.height = Math.max(30, resizeStartSize.height + deltaY);
            // Position X moves left, Y stays the same
            newPosition.x = resizeStartElementPos.x + (resizeStartSize.width - newSize.width);
            newPosition.y = resizeStartElementPos.y;
            break;
          case 'se':
            newSize.width = Math.max(50, resizeStartSize.width + deltaX);
            newSize.height = Math.max(30, resizeStartSize.height + deltaY);
            // Position stays the same for SE resize
            newPosition.x = resizeStartElementPos.x;
            newPosition.y = resizeStartElementPos.y;
            break;
          case 'n':
            newSize.height = Math.max(30, resizeStartSize.height - deltaY);
            newPosition.x = resizeStartElementPos.x;
            newPosition.y = resizeStartElementPos.y + (resizeStartSize.height - newSize.height);
            break;
          case 's':
            newSize.height = Math.max(30, resizeStartSize.height + deltaY);
            newPosition.x = resizeStartElementPos.x;
            newPosition.y = resizeStartElementPos.y;
            break;
          case 'w':
            newSize.width = Math.max(50, resizeStartSize.width - deltaX);
            newPosition.x = resizeStartElementPos.x + (resizeStartSize.width - newSize.width);
            newPosition.y = resizeStartElementPos.y;
            break;
          case 'e':
            newSize.width = Math.max(50, resizeStartSize.width + deltaX);
            newPosition.x = resizeStartElementPos.x;
            newPosition.y = resizeStartElementPos.y;
            break;
        }

        // Keep within canvas bounds
        newPosition.x = Math.max(0, Math.min(newPosition.x, canvasSize.width - newSize.width));
        newPosition.y = Math.max(0, Math.min(newPosition.y, canvasSize.height - newSize.height));

        // Store temporary resize state for immediate visual feedback
        setTempResizeState({ size: newSize, position: newPosition });
      }
    };

    const handleMouseUp = () => {
      // Update the actual element position when drag ends
      if (draggedElementId && tempDragPosition) {
        onElementUpdate(draggedElementId, { position: tempDragPosition });
      }
      
      // Update the actual element size and position when resize ends
      if (isResizing && selectedElementId && tempResizeState) {
        onElementUpdate(selectedElementId, { 
          size: tempResizeState.size, 
          position: tempResizeState.position 
        });
      }
      
      // Reset dragging state
      setDraggedElementId(null);
      setDragOffset({ x: 0, y: 0 });
      setTempDragPosition(null);
      setAlignmentLines({ vertical: [], horizontal: [] });
      
      // Reset resizing state
      setIsResizing(false);
      setResizeHandle(null);
      setTempResizeState(null);
    };

    if (draggedElementId || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggedElementId, dragOffset, zoom, showGrid, gridSize, canvasSize, onElementUpdate, tempDragPosition, isResizing, selectedElementId, resizeHandle, resizeStartPos, resizeStartSize, resizeStartElementPos, tempResizeState]);

  // Handle selection box mouse events
  useEffect(() => {
    const handleSelectionMouseMove = (e: MouseEvent) => {
      if (!isSelecting || !selectionBox || !canvasRef.current) return;
      
      const rect = canvasRef.current.getBoundingClientRect();
      const currentPos: Position = {
        x: (e.clientX - rect.left) / zoom,
        y: (e.clientY - rect.top) / zoom
      };
      
      setSelectionBox(prev => prev ? { ...prev, end: currentPos } : null);
    };

    const handleSelectionMouseUp = () => {
      if (!isSelecting || !selectionBox) {
        setIsSelecting(false);
        setSelectionBox(null);
        return;
      }

      // Find elements within selection box
      const { start, end } = selectionBox;
      const minX = Math.min(start.x, end.x);
      const maxX = Math.max(start.x, end.x);
      const minY = Math.min(start.y, end.y);
      const maxY = Math.max(start.y, end.y);

      // Only process selection if the box has minimum size (avoid accidental single clicks)
      const boxWidth = maxX - minX;
      const boxHeight = maxY - minY;
      const minSelectionSize = 5; // pixels

      if (boxWidth > minSelectionSize || boxHeight > minSelectionSize) {
      const selectedIds = elements
        .filter(element => {
          const { position, size } = element;
          const elementMinX = position.x;
          const elementMaxX = position.x + size.width;
          const elementMinY = position.y;
          const elementMaxY = position.y + size.height;
          
          // Check for intersection (not containment)
          return (
            elementMinX < maxX &&
            elementMaxX > minX &&
            elementMinY < maxY &&
            elementMaxY > minY
          );
        })
        .map(element => element.id);

      if (selectedIds.length > 0) {
        setSelectedElementIds(selectedIds);
        if (selectedIds.length > 1) {
          if (onMultiSelect) {
            onMultiSelect(selectedIds);
          } 
        }
        else {
          onElementSelect(selectedIds[0]); // Select first element as primary
        }
      }
      setSelectionBox(null);
      return;
    }
    
      setIsSelecting(false);
      setSelectionBox(null);
    };

    if (isSelecting) {
      document.addEventListener('mousemove', handleSelectionMouseMove);
      document.addEventListener('mouseup', handleSelectionMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleSelectionMouseMove);
      document.removeEventListener('mouseup', handleSelectionMouseUp);
    };
  }, [isSelecting, selectionBox, zoom, elements, onMultiSelect, onElementSelect]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't handle keyboard events if user is editing text in an input/textarea
      const activeElement = document.activeElement;
      if (activeElement && (
        activeElement.tagName === 'INPUT' || 
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.getAttribute('contenteditable') === 'true'
      )) {
        return;
      }

      if (selectedElementId) {
        switch (e.key) {
          case 'Delete':
          case 'Backspace':
            e.preventDefault();
            onElementDelete(selectedElementId);
            break;
          case 'Escape':
            e.preventDefault();
            onElementSelect(null);
            break;
          case 'ArrowUp':
            if (e.shiftKey) {
              e.preventDefault();
              const element = elements.find(el => el.id === selectedElementId);
              if (element) {
                const newY = element.position.y - (e.ctrlKey ? 1 : gridSize);
                onElementUpdate(selectedElementId, { 
                  position: { ...element.position, y: Math.max(0, newY) } 
                });
              }
            }
            break;
          case 'ArrowDown':
            if (e.shiftKey) {
              e.preventDefault();
              const element = elements.find(el => el.id === selectedElementId);
              if (element) {
                const newY = element.position.y + (e.ctrlKey ? 1 : gridSize);
                onElementUpdate(selectedElementId, { 
                  position: { ...element.position, y: Math.min(canvasSize.height - 50, newY) } 
                });
              }
            }
            break;
          case 'ArrowLeft':
            if (e.shiftKey) {
              e.preventDefault();
              const element = elements.find(el => el.id === selectedElementId);
              if (element) {
                const newX = element.position.x - (e.ctrlKey ? 1 : gridSize);
                onElementUpdate(selectedElementId, { 
                  position: { ...element.position, x: Math.max(0, newX) } 
                });
              }
            }
            break;
          case 'ArrowRight':
            if (e.shiftKey) {
              e.preventDefault();
              const element = elements.find(el => el.id === selectedElementId);
              if (element) {
                const newX = element.position.x + (e.ctrlKey ? 1 : gridSize);
                onElementUpdate(selectedElementId, { 
                  position: { ...element.position, x: Math.min(canvasSize.width - 100, newX) } 
                });
              }
            }
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedElementId, elements, gridSize, canvasSize, onElementUpdate, onElementDelete, onElementSelect]);

  // Render element preview
  const renderElement = (element: UIElement) => {
    const isSelected = element.id === selectedElementId;
    const isMultiSelected = selectedElementIds.includes(element.id);
    const isDragged = element.id === draggedElementId;
    const isBeingResized = isResizing && element.id === selectedElementId;
    
    // Use temporary states for immediate visual feedback
    const position = isDragged && tempDragPosition 
      ? tempDragPosition 
      : isBeingResized && tempResizeState 
      ? tempResizeState.position 
      : element.position;
      
    const size = isBeingResized && tempResizeState 
      ? tempResizeState.size 
      : element.size;

    return (
      <div
        key={element.id}
        className={`absolute select-none group ${
          isDragged ? 'opacity-75 shadow-2xl transition-none z-[1001]' : 'transition-all duration-200 hover:shadow-md'
        } ${isSelected ? 'z-[1000]' : 'z-10'}`}
        style={{
          left: position.x * zoom,
          top: position.y * zoom,
          width: size.width * zoom,
          height: size.height * zoom,
          transform: `scale(${zoom})`,
          transformOrigin: 'top left'
        }}
      >
        {/* Element Content */}
        <div 
          className={`w-full h-full rounded transition-all duration-200 cursor-move ${
            isSelected 
              ? 'border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg' 
              : isMultiSelected
              ? 'border-2 border-purple-400 bg-purple-50 dark:bg-purple-900/20 shadow-md'
              : isDragged
              ? 'border-2 border-blue-400 bg-blue-25 dark:bg-blue-900/10'
              : 'border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 group-hover:border-gray-400 dark:group-hover:border-gray-500'
          }`}
          onMouseDown={(e) => handleElementMouseDown(e, element.id)}
        >
          {renderElementContent(element)}
        </div>

        {/* Selection Outline */}
        {(isSelected || isMultiSelected) && (
          <div className={`absolute -inset-1 border-2 rounded pointer-events-none ${
            isSelected ? 'border-blue-500' : 'border-purple-400'
          }`}>
            {/* Corner resize handles - only show for primary selection */}
            {isSelected && (
              <>
                <div 
                  className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-blue-500 border border-white rounded-sm cursor-nw-resize shadow-sm pointer-events-auto"
                  onMouseDown={(e) => handleResizeMouseDown(e, element.id, 'nw')}
                ></div>
                <div 
                  className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-blue-500 border border-white rounded-sm cursor-ne-resize shadow-sm pointer-events-auto"
                  onMouseDown={(e) => handleResizeMouseDown(e, element.id, 'ne')}
                ></div>
                <div 
                  className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-blue-500 border border-white rounded-sm cursor-sw-resize shadow-sm pointer-events-auto"
                  onMouseDown={(e) => handleResizeMouseDown(e, element.id, 'sw')}
                ></div>
                <div 
                  className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-blue-500 border border-white rounded-sm cursor-se-resize shadow-sm pointer-events-auto"
                  onMouseDown={(e) => handleResizeMouseDown(e, element.id, 'se')}
                ></div>
                
                {/* Edge handles */}
                <div 
                  className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-500 border border-white rounded-sm cursor-n-resize shadow-sm pointer-events-auto"
                  onMouseDown={(e) => handleResizeMouseDown(e, element.id, 'n')}
                ></div>
                <div 
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-500 border border-white rounded-sm cursor-s-resize shadow-sm pointer-events-auto"
                  onMouseDown={(e) => handleResizeMouseDown(e, element.id, 's')}
                ></div>
                <div 
                  className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 border border-white rounded-sm cursor-w-resize shadow-sm pointer-events-auto"
                  onMouseDown={(e) => handleResizeMouseDown(e, element.id, 'w')}
                ></div>
                <div 
                  className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 border border-white rounded-sm cursor-e-resize shadow-sm pointer-events-auto"
                  onMouseDown={(e) => handleResizeMouseDown(e, element.id, 'e')}
                ></div>
              </>
            )}
            
            {/* Multi-select indicator */}
            {isMultiSelected && !isSelected && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full border border-white shadow-sm"></div>
            )}
          </div>
        )}

        {/* Element Label */}
        {isSelected && (
          <div className="absolute -top-7 left-0 px-2 py-1 text-xs bg-blue-500 text-white rounded shadow-lg whitespace-nowrap border border-blue-600 font-medium">
            {element.name}
            <div className="text-blue-200 text-[10px] mt-0.5">
              {element.position.x}, {element.position.y}
            </div>
          </div>
        )}

        {/* Hover preview label */}
        {!isSelected && !isDragged && (
          <div className="absolute -top-6 left-0 px-2 py-1 text-xs bg-gray-800 text-white rounded shadow-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            {element.type.replace('_', ' ')}
          </div>
        )}

        {/* Snap indicators */}
        {isDragged && (
          <>
            {/* Center snap indicators */}
            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-red-500 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-75"></div>
            {/* Edge snap indicators */}
            <div className="absolute top-0 left-1/2 w-1 h-1 bg-red-500 rounded-full -translate-x-1/2 opacity-75"></div>
            <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-red-500 rounded-full -translate-x-1/2 opacity-75"></div>
            <div className="absolute top-1/2 left-0 w-1 h-1 bg-red-500 rounded-full -translate-y-1/2 opacity-75"></div>
            <div className="absolute top-1/2 right-0 w-1 h-1 bg-red-500 rounded-full -translate-y-1/2 opacity-75"></div>
          </>
        )}
      </div>
    );
  };

  // Render element content based on type
  const renderElementContent = (element: UIElement) => {
    const contentClasses = "w-full h-full px-2 py-1 text-sm text-gray-700 dark:text-gray-300 border-none bg-transparent outline-none";
    
    switch (element.type) {
      case 'text_input':
      case 'email_input':
      case 'password_input':
        return (
          <input
            type={element.type === 'text_input' ? 'text' : element.type.replace('_input', '')}
            placeholder={element.placeholder || element.label}
            className={contentClasses}
            disabled
          />
        );
      case 'number_input':
        return (
          <input
            type="number"
            placeholder={element.placeholder || element.label}
            className={contentClasses}
            disabled
          />
        );
      case 'textarea':
        return (
          <textarea
            placeholder={element.placeholder || element.label}
            className={`${contentClasses} resize-none`}
            disabled
          />
        );
      case 'checkbox':
        return (
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" disabled />
            <span className="text-sm">{element.label}</span>
          </label>
        );
      case 'button':
        return (
          <button
            className="w-full h-full bg-blue-500 text-white rounded text-sm font-medium hover:bg-blue-600 disabled:opacity-50"
            disabled
          >
            {element.label}
          </button>
        );
      case 'dropdown':
        return (
          <select className={contentClasses} disabled>
            <option>{element.placeholder || 'Select...'}</option>
            {element.options?.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'date_picker':
        return (
          <input
            type="date"
            className={contentClasses}
            disabled
          />
        );
      case 'label':
        return (
          <div className="flex items-center h-full">
            <span className="text-sm font-medium">{element.label}</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-full text-gray-500">
            <span className="text-xs">Unknown</span>
          </div>
        );
    }
  };

  // Grid background with dark mode support
  const gridPattern = showGrid ? {
    backgroundImage: `
      linear-gradient(to right, rgb(229 231 235 / 0.5) 1px, transparent 1px),
      linear-gradient(to bottom, rgb(229 231 235 / 0.5) 1px, transparent 1px)
    `,
    backgroundSize: `${gridSize * zoom}px ${gridSize * zoom}px`
  } : {};

  // Dark mode grid pattern
  const darkGridPattern = showGrid ? {
    backgroundImage: `
      linear-gradient(to right, rgb(75 85 99 / 0.5) 1px, transparent 1px),
      linear-gradient(to bottom, rgb(75 85 99 / 0.5) 1px, transparent 1px)
    `,
    backgroundSize: `${gridSize * zoom}px ${gridSize * zoom}px`
  } : {};

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Canvas Controls */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Elements: {elements.length}
          </span>
          {selectedElementIds.length > 1 ? (
            <span className="text-sm text-purple-600 dark:text-purple-400">
              Selected: {selectedElementIds.length} elements
            </span>
          ) : selectedElementId && (
            <span className="text-sm text-blue-600 dark:text-blue-400">
              Selected: {elements.find(el => el.id === selectedElementId)?.name}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showGrid}
              onChange={(e) => onCanvasUpdate({ showGrid: e.target.checked })}
              className="rounded border-gray-300 dark:border-gray-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Show Grid</span>
          </label>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">Zoom:</span>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={zoom}
              onChange={(e) => onCanvasUpdate({ zoom: parseFloat(e.target.value) })}
              className="w-20"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300 w-12">
              {Math.round(zoom * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-900">
        <div
          ref={canvasRef}
          data-canvas-background="true"
          className={`relative bg-white dark:bg-gray-800 cursor-crosshair ${
            isDragging ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
          }`}
          style={{
            width: canvasSize.width * zoom,
            height: canvasSize.height * zoom,
            minWidth: '100%',
            minHeight: '100%'
          }}
          onClick={handleCanvasClick}
          onMouseDown={handleCanvasMouseDown}
          onDoubleClick={handleCanvasDoubleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        >
          {/* Light mode grid */}
          {showGrid && (
            <div 
              data-canvas-background="true"
              className="absolute inset-0 dark:hidden pointer-events-none"
              style={gridPattern}
            />
          )}
          {/* Dark mode grid */}
          {showGrid && (
            <div 
              data-canvas-background="true"
              className="absolute inset-0 hidden dark:block pointer-events-none"
              style={darkGridPattern}
            />
          )}
          {elements.map(renderElement)}
          
          {/* Alignment Lines with Enhanced Styling */}
          {alignmentLines.vertical.map((x, index) => (
            <div key={`v-${index}`} className="absolute pointer-events-none" style={{ zIndex: 999 }}>
              <div
                className="absolute bg-blue-500 opacity-90 shadow-sm"
                style={{
                  left: x * zoom - 0.5,
                  top: 0,
                  width: 1,
                  height: canvasSize.height * zoom
                }}
              />
              {/* Snap indicator */}
              <div
                className="absolute w-2 h-2 bg-blue-500 border border-white rounded-full shadow-lg -translate-x-1/2"
                style={{
                  left: x * zoom,
                  top: (canvasSize.height / 2) * zoom,
                  transform: 'translateX(-50%) translateY(-50%)'
                }}
              />
            </div>
          ))}
          {alignmentLines.horizontal.map((y, index) => (
            <div key={`h-${index}`} className="absolute pointer-events-none" style={{ zIndex: 999 }}>
              <div
                className="absolute bg-blue-500 opacity-90 shadow-sm"
                style={{
                  left: 0,
                  top: y * zoom - 0.5,
                  width: canvasSize.width * zoom,
                  height: 1
                }}
              />
              {/* Snap indicator */}
              <div
                className="absolute w-2 h-2 bg-blue-500 border border-white rounded-full shadow-lg -translate-y-1/2"
                style={{
                  left: (canvasSize.width / 2) * zoom,
                  top: y * zoom,
                  transform: 'translateX(-50%) translateY(-50%)'
                }}
              />
            </div>
          ))}

          {/* Drag Preview for Toolbox Items */}
          {isDragging && dragPreviewPosition && (
            <div
              className="absolute border-2 border-blue-500 border-dashed bg-blue-100 dark:bg-blue-900/30 opacity-75 pointer-events-none rounded shadow-lg"
              style={{
                left: dragPreviewPosition.x * zoom,
                top: dragPreviewPosition.y * zoom,
                width: 200 * zoom, // Default preview size
                height: 40 * zoom,
                zIndex: 998
              }}
            >
              <div className="flex items-center justify-center h-full text-blue-600 dark:text-blue-400 text-sm font-medium">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Drop here
              </div>
              {/* Preview coordinates */}
              <div className="absolute -top-6 left-0 px-2 py-1 text-xs bg-blue-600 text-white rounded shadow-sm whitespace-nowrap">
                {Math.round(dragPreviewPosition.x)}, {Math.round(dragPreviewPosition.y)}
              </div>
            </div>
          )}

          {/* Selection Box */}
          {isSelecting && selectionBox && (() => {
            const boxWidth = Math.abs(selectionBox.end.x - selectionBox.start.x);
            const boxHeight = Math.abs(selectionBox.end.y - selectionBox.start.y);
            const minSelectionSize = 5;
            
            // Only show selection box if it has minimum size
            if (boxWidth > minSelectionSize || boxHeight > minSelectionSize) {
              return (
                <div
                  className="absolute border-2 border-blue-400 bg-blue-100 dark:bg-blue-900/20 opacity-50 pointer-events-none"
                  style={{
                    left: Math.min(selectionBox.start.x, selectionBox.end.x) * zoom,
                    top: Math.min(selectionBox.start.y, selectionBox.end.y) * zoom,
                    width: boxWidth * zoom,
                    height: boxHeight * zoom,
                    zIndex: 997
                  }}
                />
              );
            }
            return null;
          })()}
          
          {/* Drop indicator */}
          {isDragging && !dragPreviewPosition && (
            <div className="absolute inset-0 bg-blue-500 bg-opacity-10 border-2 border-blue-500 border-dashed rounded-lg flex items-center justify-center">
              <div className="text-blue-600 dark:text-blue-400 text-lg font-medium">
                Drop element here
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Canvas Info */}
      <div className="p-2 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Canvas: {canvasSize.width} × {canvasSize.height}px</span>
          <span>Grid: {gridSize}px</span>
          <span>Zoom: {Math.round(zoom * 100)}%</span>
        </div>
      </div>
    </div>
  );
};

export default DesignCanvas;