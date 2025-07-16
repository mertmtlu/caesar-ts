// src/components/designer/PreviewPanel.tsx
import React, { useState } from 'react';
import { UIElement, LayoutConfig, ValidationRule } from '@/types/componentDesigner';
import Button from '@/components/common/Button';

interface PreviewPanelProps {
  elements: UIElement[];
  layout: LayoutConfig;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ elements, layout }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showJSON, setShowJSON] = useState(false);

  // Handle form input changes
  const handleInputChange = (elementName: string, value: any) => {
    setFormData(prev => ({ ...prev, [elementName]: value }));
    
    // Clear error for this field
    if (errors[elementName]) {
      setErrors(prev => ({ ...prev, [elementName]: '' }));
    }
  };

  // Validate form data
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    elements.forEach(element => {
      const value = formData[element.name];
      
      // Check required fields
      if (element.required && (!value || (typeof value === 'string' && !value.trim()))) {
        newErrors[element.name] = `${element.label} is required`;
        return;
      }
      
      // Check validation rules
      if (element.validation && value) {
        element.validation.forEach(rule => {
          if (validateRule(rule, value)) {
            newErrors[element.name] = rule.message;
          }
        });
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate individual rule
  const validateRule = (rule: ValidationRule, value: any): boolean => {
    switch (rule.type) {
      case 'required':
        return !value || (typeof value === 'string' && !value.trim());
      case 'minLength':
        return typeof value === 'string' && value.length < (rule.value as number);
      case 'maxLength':
        return typeof value === 'string' && value.length > (rule.value as number);
      case 'pattern':
        if (typeof value !== 'string' || !rule.value) {
          return false;
        }
        return !new RegExp(rule.value as string).test(value);
      default:
        return false;
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      alert('Form submitted successfully! Check console for data.');
    }
  };

  // Handle form reset
  const handleReset = () => {
    setFormData({});
    setErrors({});
  };

  // Render individual element
  const renderElement = (element: UIElement) => {
    const value = formData[element.name] || element.defaultValue || '';
    const error = errors[element.name];
    const hasError = !!error;

    // Apply custom styling
    const customStyle: React.CSSProperties = {
      backgroundColor: element.styling?.backgroundColor,
      color: element.styling?.textColor,
      borderColor: element.styling?.borderColor,
      borderRadius: element.styling?.borderRadius,
      fontSize: element.styling?.fontSize,
      fontWeight: element.styling?.fontWeight,
      padding: element.styling?.padding,
      margin: element.styling?.margin,
    };

    // For absolute layout, add positioning styles
    const positioningStyle: React.CSSProperties = layout.type === 'absolute' ? {
      position: 'absolute',
      left: element.position.x,
      top: element.position.y,
      width: element.size.width,
      height: element.size.height,
      ...customStyle
    } : customStyle;

    const inputClasses = layout.type === 'absolute' 
      ? `rounded-md border ${
          hasError 
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
            : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
        } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm`
      : `w-full rounded-md border ${
          hasError 
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
            : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
        } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm`;

    // For absolute layout, render elements with absolute positioning
    if (layout.type === 'absolute') {
      switch (element.type) {
        case 'text_input':
          return (
            <div key={element.id} style={positioningStyle}>
              <input
                type="text"
                value={value}
                onChange={(e) => handleInputChange(element.name, e.target.value)}
                placeholder={element.placeholder || element.label}
                disabled={element.disabled}
                className={inputClasses}
                style={{ width: '100%', height: '100%' }}
              />
              {hasError && (
                <div className="absolute -bottom-5 left-0 text-xs text-red-600">
                  {error}
                </div>
              )}
            </div>
          );
        
        case 'email_input':
          return (
            <div key={element.id} style={positioningStyle}>
              <input
                type="email"
                value={value}
                onChange={(e) => handleInputChange(element.name, e.target.value)}
                placeholder={element.placeholder || element.label}
                disabled={element.disabled}
                className={inputClasses}
                style={{ width: '100%', height: '100%' }}
              />
              {hasError && (
                <div className="absolute -bottom-5 left-0 text-xs text-red-600">
                  {error}
                </div>
              )}
            </div>
          );
        
        case 'password_input':
          return (
            <div key={element.id} style={positioningStyle}>
              <input
                type="password"
                value={value}
                onChange={(e) => handleInputChange(element.name, e.target.value)}
                placeholder={element.placeholder || element.label}
                disabled={element.disabled}
                className={inputClasses}
                style={{ width: '100%', height: '100%' }}
              />
              {hasError && (
                <div className="absolute -bottom-5 left-0 text-xs text-red-600">
                  {error}
                </div>
              )}
            </div>
          );
        
        case 'number_input':
          return (
            <div key={element.id} style={positioningStyle}>
              <input
                type="number"
                value={value}
                onChange={(e) => handleInputChange(element.name, e.target.value)}
                placeholder={element.placeholder || element.label}
                disabled={element.disabled}
                className={inputClasses}
                style={{ width: '100%', height: '100%' }}
              />
              {hasError && (
                <div className="absolute -bottom-5 left-0 text-xs text-red-600">
                  {error}
                </div>
              )}
            </div>
          );
        
        case 'textarea':
          return (
            <div key={element.id} style={positioningStyle}>
              <textarea
                value={value}
                onChange={(e) => handleInputChange(element.name, e.target.value)}
                placeholder={element.placeholder || element.label}
                disabled={element.disabled}
                className={inputClasses}
                style={{ width: '100%', height: '100%', resize: 'none' }}
              />
              {hasError && (
                <div className="absolute -bottom-5 left-0 text-xs text-red-600">
                  {error}
                </div>
              )}
            </div>
          );
        
        case 'checkbox':
          return (
            <div key={element.id} style={positioningStyle}>
              <label className="flex items-center space-x-2 h-full">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => handleInputChange(element.name, e.target.checked)}
                  disabled={element.disabled}
                  className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {element.label}
                  {element.required && <span className="text-red-500 ml-1">*</span>}
                </span>
              </label>
              {hasError && (
                <div className="absolute -bottom-5 left-0 text-xs text-red-600">
                  {error}
                </div>
              )}
            </div>
          );
        
        case 'dropdown':
          return (
            <div key={element.id} style={positioningStyle}>
              <select
                value={value}
                onChange={(e) => handleInputChange(element.name, e.target.value)}
                disabled={element.disabled}
                className={inputClasses}
                style={{ width: '100%', height: '100%' }}
              >
                <option value="">{element.placeholder || element.label || 'Select an option...'}</option>
                {element.options?.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {hasError && (
                <div className="absolute -bottom-5 left-0 text-xs text-red-600">
                  {error}
                </div>
              )}
            </div>
          );
        
        case 'date_picker':
          return (
            <div key={element.id} style={positioningStyle}>
              <input
                type="date"
                value={value}
                onChange={(e) => handleInputChange(element.name, e.target.value)}
                disabled={element.disabled}
                className={inputClasses}
                style={{ width: '100%', height: '100%' }}
              />
              {hasError && (
                <div className="absolute -bottom-5 left-0 text-xs text-red-600">
                  {error}
                </div>
              )}
            </div>
          );
        
        case 'button':
          return (
            <div key={element.id} style={positioningStyle}>
              <Button
                type={element.name === 'submit' ? 'submit' : 'button'}
                variant="primary"
                disabled={element.disabled}
                style={{ width: '100%', height: '100%' }}
                onClick={() => {
                  if (element.name === 'submit') {
                    handleSubmit(new Event('submit') as any);
                  } else if (element.name === 'reset') {
                    handleReset();
                  }
                }}
              >
                {element.label}
              </Button>
            </div>
          );
        
        case 'label':
          return (
            <div key={element.id} style={positioningStyle}>
              <label className="flex items-center h-full text-sm font-medium text-gray-700 dark:text-gray-300">
                {element.label}
              </label>
            </div>
          );
        
        case 'table':
          return (
            <div key={element.id} style={positioningStyle}>
              <div className="w-full h-full overflow-auto border border-gray-300 dark:border-gray-600 rounded-md">
                <table className="w-full h-full border-collapse text-xs">
                  <thead>
                    {element.tableConfig?.showHeaders && (
                      <tr>
                        {element.tableConfig.headerLabels?.map((header, index) => (
                          <th key={index} className="border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 px-2 py-1 text-left font-medium">
                            {header}
                          </th>
                        ))}
                      </tr>
                    )}
                  </thead>
                  <tbody>
                    {Array.from({ length: element.tableConfig?.rows || 3 }, (_, rowIndex) => (
                      <tr key={rowIndex}>
                        {Array.from({ length: element.tableConfig?.columns || 3 }, (_, colIndex) => {
                          const cellConfig = element.tableConfig?.cells?.find(
                            cell => cell.cellId === `${String.fromCharCode(97 + colIndex)}${rowIndex + 1}`
                          );
                          const cellKey = `${element.name}_${cellConfig?.cellId || `${String.fromCharCode(97 + colIndex)}${rowIndex + 1}`}`;
                          const cellValue = formData[cellKey] || '';
                          
                          return (
                            <td key={colIndex} className="border border-gray-300 dark:border-gray-600 p-1">
                              {element.tableConfig?.editableCells ? (
                                <input
                                  type={cellConfig?.type === 'number' ? 'number' : 'text'}
                                  value={cellValue}
                                  onChange={(e) => handleInputChange(cellKey, e.target.value)}
                                  placeholder={cellConfig?.placeholder || `${cellConfig?.cellId}`}
                                  className="w-full text-xs border-none bg-transparent outline-none"
                                  disabled={cellConfig?.readonly}
                                />
                              ) : (
                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                  {cellValue || cellConfig?.cellId}
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {hasError && (
                <div className="absolute -bottom-5 left-0 text-xs text-red-600">
                  {error}
                </div>
              )}
            </div>
          );
        
        default:
          return (
            <div key={element.id} style={positioningStyle}>
              <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-700 rounded-md">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Unknown element type: {element.type}
                </p>
              </div>
            </div>
          );
      }
    }

    // Regular layout rendering (non-absolute)
    switch (element.type) {
      case 'text_input':
        return (
          <div key={element.id} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) => handleInputChange(element.name, e.target.value)}
              placeholder={element.placeholder}
              disabled={element.disabled}
              className={inputClasses}
              style={customStyle}
            />
            {hasError && <p className="text-sm text-red-600">{error}</p>}
            {element.helpText && (
              <p className="text-sm text-gray-500 dark:text-gray-400">{element.helpText}</p>
            )}
          </div>
        );

      case 'email_input':
        return (
          <div key={element.id} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="email"
              value={value}
              onChange={(e) => handleInputChange(element.name, e.target.value)}
              placeholder={element.placeholder}
              disabled={element.disabled}
              className={inputClasses}
              style={customStyle}
            />
            {hasError && <p className="text-sm text-red-600">{error}</p>}
            {element.helpText && (
              <p className="text-sm text-gray-500 dark:text-gray-400">{element.helpText}</p>
            )}
          </div>
        );

      case 'password_input':
        return (
          <div key={element.id} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="password"
              value={value}
              onChange={(e) => handleInputChange(element.name, e.target.value)}
              placeholder={element.placeholder}
              disabled={element.disabled}
              className={inputClasses}
              style={customStyle}
            />
            {hasError && <p className="text-sm text-red-600">{error}</p>}
            {element.helpText && (
              <p className="text-sm text-gray-500 dark:text-gray-400">{element.helpText}</p>
            )}
          </div>
        );

      case 'number_input':
        return (
          <div key={element.id} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => handleInputChange(element.name, e.target.value)}
              placeholder={element.placeholder}
              disabled={element.disabled}
              className={inputClasses}
              style={customStyle}
            />
            {hasError && <p className="text-sm text-red-600">{error}</p>}
            {element.helpText && (
              <p className="text-sm text-gray-500 dark:text-gray-400">{element.helpText}</p>
            )}
          </div>
        );

      case 'textarea':
        return (
          <div key={element.id} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <textarea
              value={value}
              onChange={(e) => handleInputChange(element.name, e.target.value)}
              placeholder={element.placeholder}
              disabled={element.disabled}
              rows={3}
              className={inputClasses}
              style={customStyle}
            />
            {hasError && <p className="text-sm text-red-600">{error}</p>}
            {element.helpText && (
              <p className="text-sm text-gray-500 dark:text-gray-400">{element.helpText}</p>
            )}
          </div>
        );

      case 'checkbox':
        return (
          <div key={element.id} className="space-y-1">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => handleInputChange(element.name, e.target.checked)}
                disabled={element.disabled}
                className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {element.label}
                {element.required && <span className="text-red-500 ml-1">*</span>}
              </span>
            </label>
            {hasError && <p className="text-sm text-red-600">{error}</p>}
            {element.helpText && (
              <p className="text-sm text-gray-500 dark:text-gray-400">{element.helpText}</p>
            )}
          </div>
        );

      case 'dropdown':
        return (
          <div key={element.id} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <select
              value={value}
              onChange={(e) => handleInputChange(element.name, e.target.value)}
              disabled={element.disabled}
              className={inputClasses}
              style={customStyle}
            >
              <option value="">{element.placeholder || 'Select an option...'}</option>
              {element.options?.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {hasError && <p className="text-sm text-red-600">{error}</p>}
            {element.helpText && (
              <p className="text-sm text-gray-500 dark:text-gray-400">{element.helpText}</p>
            )}
          </div>
        );

      case 'date_picker':
        return (
          <div key={element.id} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="date"
              value={value}
              onChange={(e) => handleInputChange(element.name, e.target.value)}
              disabled={element.disabled}
              className={inputClasses}
              style={customStyle}
            />
            {hasError && <p className="text-sm text-red-600">{error}</p>}
            {element.helpText && (
              <p className="text-sm text-gray-500 dark:text-gray-400">{element.helpText}</p>
            )}
          </div>
        );

      case 'button':
        return (
          <div key={element.id} className="space-y-1">
            <Button
              type={element.name === 'submit' ? 'submit' : 'button'}
              variant="primary"
              disabled={element.disabled}
              style={customStyle}
              onClick={() => {
                if (element.name === 'submit') {
                  handleSubmit(new Event('submit') as any);
                } else if (element.name === 'reset') {
                  handleReset();
                }
              }}
            >
              {element.label}
            </Button>
            {element.helpText && (
              <p className="text-sm text-gray-500 dark:text-gray-400">{element.helpText}</p>
            )}
          </div>
        );

      case 'label':
        return (
          <div key={element.id} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" style={customStyle}>
              {element.label}
            </label>
            {element.helpText && (
              <p className="text-sm text-gray-500 dark:text-gray-400">{element.helpText}</p>
            )}
          </div>
        );

      case 'table':
        return (
          <div key={element.id} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="border border-gray-300 dark:border-gray-600 rounded-md overflow-auto" style={customStyle}>
              <table className="w-full border-collapse text-sm">
                <thead>
                  {element.tableConfig?.showHeaders && (
                    <tr>
                      {element.tableConfig.headerLabels?.map((header, index) => (
                        <th key={index} className="border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 px-3 py-2 text-left font-medium">
                          {header}
                        </th>
                      ))}
                    </tr>
                  )}
                </thead>
                <tbody>
                  {Array.from({ length: element.tableConfig?.rows || 3 }, (_, rowIndex) => (
                    <tr key={rowIndex}>
                      {Array.from({ length: element.tableConfig?.columns || 3 }, (_, colIndex) => {
                        const cellConfig = element.tableConfig?.cells?.find(
                          cell => cell.cellId === `${String.fromCharCode(97 + colIndex)}${rowIndex + 1}`
                        );
                        const cellKey = `${element.name}_${cellConfig?.cellId || `${String.fromCharCode(97 + colIndex)}${rowIndex + 1}`}`;
                        const cellValue = formData[cellKey] || '';
                        
                        return (
                          <td key={colIndex} className="border border-gray-300 dark:border-gray-600 p-2">
                            {element.tableConfig?.editableCells ? (
                              <input
                                type={cellConfig?.type === 'number' ? 'number' : 'text'}
                                value={cellValue}
                                onChange={(e) => handleInputChange(cellKey, e.target.value)}
                                placeholder={cellConfig?.placeholder || `${cellConfig?.cellId}`}
                                className="w-full text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                disabled={cellConfig?.readonly}
                              />
                            ) : (
                              <div className="text-sm text-gray-600 dark:text-gray-400 px-2 py-1">
                                {cellValue || cellConfig?.cellId}
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {hasError && <p className="text-sm text-red-600">{error}</p>}
            {element.helpText && (
              <p className="text-sm text-gray-500 dark:text-gray-400">{element.helpText}</p>
            )}
          </div>
        );

      default:
        return (
          <div key={element.id} className="p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Unknown element type: {element.type}
            </p>
          </div>
        );
    }
  };

  // Get layout styles - use absolute positioning to match designer canvas
  const getLayoutStyles = () => {
    // For absolute layout, use relative positioning container to match designer canvas
    if (layout.type === 'absolute') {
      return {
        position: 'relative' as const,
        width: '800px', // Match canvas width
        height: '600px', // Match canvas height
        padding: layout.padding || 16,
        margin: '0 auto',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      };
    }
    
    // Fallback for other layout types
    switch (layout.type) {
      case 'grid':
        return {
          display: 'grid',
          gridTemplateColumns: `repeat(${layout.columns || 1}, 1fr)`,
          gap: layout.spacing || 16,
          padding: layout.padding || 16
        };
      case 'flex':
        return {
          display: 'flex',
          flexDirection: 'column' as const,
          gap: layout.spacing || 16,
          padding: layout.padding || 16
        };
      default:
        return {
          padding: layout.padding || 16
        };
    }
  };

  if (elements.length === 0) {
    return (
      <div className="p-6 text-center">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No Preview Available</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Add elements to the canvas to see the preview.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Component Preview
          </h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowJSON(!showJSON)}
            >
              {showJSON ? 'Hide JSON' : 'Show JSON'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {showJSON ? (
          <div className="p-4">
            <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-3 rounded-md overflow-x-auto">
              {JSON.stringify({ elements, layout, formData }, null, 2)}
            </pre>
          </div>
        ) : (
          <div className="p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div 
                className={layout.type === 'absolute' 
                  ? 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                  : ''
                }
                style={getLayoutStyles()}
              >
                {layout.type === 'absolute' 
                  ? elements.map(renderElement)
                  : elements
                      .filter(element => element.type !== 'button')
                      .map(renderElement)
                }
              </div>
              
              {/* Action buttons - only show for non-absolute layouts */}
              {layout.type !== 'absolute' && (
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex space-x-2">
                    {elements
                      .filter(element => element.type === 'button')
                      .map(renderElement)}
                  </div>
                  
                  {/* Default submit button if no button elements */}
                  {elements.filter(element => element.type === 'button').length === 0 && (
                    <div className="flex space-x-2">
                      <Button
                        type="submit"
                        variant="primary"
                      >
                        Submit
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleReset}
                      >
                        Reset
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </form>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Elements: {elements.length}</span>
          <span>Layout: {layout.type}</span>
          <span>Errors: {Object.keys(errors).length}</span>
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;