// src/components/designer/DesignCanvas.tsx
import React, { useRef, useState, useEffect } from 'react';
import { 
  UIElement, 
  Position, 
  Size, 
  DesignerState, 
  createElement,
  ElementTemplate,
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
  onCanvasUpdate
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const [draggedElementId, setDraggedElementId] = useState<string | null>(null);
  const [tempDragPosition, setTempDragPosition] = useState<Position | null>(null);

  // Handle canvas click to deselect elements
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
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

    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      
      if (data.type === 'element') {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (rect) {
          const position: Position = {
            x: (e.clientX - rect.left) / zoom,
            y: (e.clientY - rect.top) / zoom
          };

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
  };

  // Handle mouse move for element dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!draggedElementId || !canvasRef.current) return;
      
      const rect = canvasRef.current.getBoundingClientRect();
      const newPosition: Position = {
        x: (e.clientX - rect.left) / zoom - dragOffset.x,
        y: (e.clientY - rect.top) / zoom - dragOffset.y
      };

      // Snap to grid if enabled
      if (showGrid) {
        newPosition.x = Math.round(newPosition.x / gridSize) * gridSize;
        newPosition.y = Math.round(newPosition.y / gridSize) * gridSize;
      }

      // Keep element within canvas bounds
      newPosition.x = Math.max(0, Math.min(newPosition.x, canvasSize.width - 100));
      newPosition.y = Math.max(0, Math.min(newPosition.y, canvasSize.height - 50));

      // Update temporary position for immediate visual feedback
      setTempDragPosition(newPosition);
    };

    const handleMouseUp = () => {
      // Update the actual element position when drag ends
      if (draggedElementId && tempDragPosition) {
        onElementUpdate(draggedElementId, { position: tempDragPosition });
      }
      
      setDraggedElementId(null);
      setDragOffset({ x: 0, y: 0 });
      setTempDragPosition(null);
    };

    if (draggedElementId) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggedElementId, dragOffset, zoom, showGrid, gridSize, canvasSize, onElementUpdate, tempDragPosition]);

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
    const isDragged = element.id === draggedElementId;
    
    // Use temporary position if element is being dragged, otherwise use actual position
    const position = isDragged && tempDragPosition ? tempDragPosition : element.position;

    return (
      <div
        key={element.id}
        className={`absolute cursor-move select-none ${
          isDragged ? 'opacity-75 shadow-lg transition-none' : 'transition-all duration-200'
        }`}
        style={{
          left: position.x * zoom,
          top: position.y * zoom,
          width: element.size.width * zoom,
          height: element.size.height * zoom,
          zIndex: isSelected ? 1000 : 1,
          transform: `scale(${zoom})`,
          transformOrigin: 'top left'
        }}
        onMouseDown={(e) => handleElementMouseDown(e, element.id)}
      >
        {/* Element Content */}
        <div className={`w-full h-full rounded border-2 transition-all duration-200 ${
          isSelected 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
        }`}>
          {renderElementContent(element)}
        </div>

        {/* Selection Handles */}
        {isSelected && (
          <>
            {/* Corner handles for resizing */}
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-500 rounded-sm cursor-nw-resize"></div>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-sm cursor-ne-resize"></div>
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-500 rounded-sm cursor-sw-resize"></div>
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-500 rounded-sm cursor-se-resize"></div>
            
            {/* Label */}
            <div className="absolute -top-6 left-0 px-2 py-1 text-xs bg-blue-500 text-white rounded shadow-sm whitespace-nowrap">
              {element.name}
            </div>
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
          {selectedElementId && (
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
          onDoubleClick={handleCanvasDoubleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        >
          {/* Light mode grid */}
          {showGrid && (
            <div 
              className="absolute inset-0 dark:hidden pointer-events-none"
              style={gridPattern}
            />
          )}
          {/* Dark mode grid */}
          {showGrid && (
            <div 
              className="absolute inset-0 hidden dark:block pointer-events-none"
              style={darkGridPattern}
            />
          )}
          {elements.map(renderElement)}
          
          {/* Drop indicator */}
          {isDragging && (
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