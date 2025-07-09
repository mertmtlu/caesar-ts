// src/components/designer/ElementToolbox.tsx
import React, { useState } from 'react';
import { 
  ELEMENT_TEMPLATES, 
  ElementTemplate, 
  UIElement, 
  createElement,
  Position 
} from '@/types/componentDesigner';

interface ElementToolboxProps {
  onElementSelect: (element: UIElement) => void;
  selectedElementId: string | null;
}

const ElementToolbox: React.FC<ElementToolboxProps> = ({
  onElementSelect,
  selectedElementId
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [draggedTemplate, setDraggedTemplate] = useState<ElementTemplate | null>(null);

  const filteredTemplates = ELEMENT_TEMPLATES.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleElementClick = (template: ElementTemplate) => {
    // Create element at default position (center of canvas)
    const defaultPosition: Position = { x: 100, y: 100 };
    const element = createElement(template, defaultPosition);
    onElementSelect(element);
  };

  const handleDragStart = (e: React.DragEvent, template: ElementTemplate) => {
    setDraggedTemplate(template);
    e.dataTransfer.setData('application/json', JSON.stringify({
      type: 'element',
      elementType: template.type,
      template
    }));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragEnd = () => {
    setDraggedTemplate(null);
  };

  const getElementIcon = (template: ElementTemplate) => {
    const iconClasses = "w-8 h-8 text-gray-600 dark:text-gray-400";
    
    switch (template.type) {
      case 'text_input':
      case 'email_input':
      case 'password_input':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2z" />
          </svg>
        );
      case 'checkbox':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'button':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
        );
      case 'dropdown':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        );
      case 'textarea':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2z" />
          </svg>
        );
      case 'number_input':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
          </svg>
        );
      case 'date_picker':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'label':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a1.414 1.414 0 01-2.828 0l-7-7A1.414 1.414 0 013 12V7a4 4 0 014-4z" />
          </svg>
        );
      default:
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        );
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
          UI Elements
        </h3>
        
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search elements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg 
            className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Elements List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              draggable
              onDragStart={(e) => handleDragStart(e, template)}
              onDragEnd={handleDragEnd}
              onClick={() => handleElementClick(template)}
              className={`group relative p-3 rounded-lg border-2 border-dashed cursor-pointer transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 ${
                draggedTemplate?.id === template.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  {getElementIcon(template)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {template.name}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {template.description}
                  </p>
                </div>
              </div>

              {/* Drag indicator */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-8">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No elements found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Try adjusting your search terms.
            </p>
          </div>
        )}
      </div>

      {/* Help Text */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
          <p>💡 <strong>Tip:</strong> Drag elements to canvas or click to add them</p>
          <p>🎯 Double-click canvas to auto-place selected element</p>
        </div>
      </div>
    </div>
  );
};

export default ElementToolbox;