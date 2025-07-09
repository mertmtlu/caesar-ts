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
        return typeof value === 'string' && rule.value && !new RegExp(rule.value as string).test(value);
      default:
        return false;
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Form submitted:', formData);
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

    const inputClasses = `w-full rounded-md border ${
      hasError 
        ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
        : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
    } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm`;

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

  // Get layout styles
  const getLayoutStyles = () => {
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
              <div style={getLayoutStyles()}>
                {elements
                  .filter(element => element.type !== 'button')
                  .map(renderElement)}
              </div>
              
              {/* Action buttons */}
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