// src/components/common/ComponentForm.tsx
import React, { useState } from 'react';
import { UIElement, ValidationRule } from '@/types/componentDesigner';
import Button from '@/components/common/Button';
import FileInput from '@/components/ui-elements/FileInput';
import { FileDataDto } from '@/api/types';

// --- MAP SUPPORT ---
import InteractiveMap from '@/components/ui-elements/InteractiveMap';


interface ComponentFormProps {
  elements: UIElement[];
  onSubmit: (formData: Record<string, any>) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
  title?: string;
  className?: string;
}

const ComponentForm: React.FC<ComponentFormProps> = ({ 
  elements, 
  onSubmit, 
  onCancel, 
  isSubmitting = false,
  title = 'Program Parameters',
  className = ''
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle form input changes
  const handleInputChange = (elementName: string, value: any) => {
    // Debug logging for file inputs
    if (elementName.includes('file') || (value && typeof value === 'object' && value.base64Content)) {
      console.log('File input changed:', elementName, {
        filename: value?.filename || value?.name,
        hasContent: !!value?.base64Content,
        contentLength: value?.base64Content?.length
      });
    }
    
    setFormData(prev => ({ ...prev, [elementName]: value }));
    
    // Clear error for this field
    if (errors[elementName]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[elementName];
        return newErrors;
      });
    }
  };

  // Validate form data
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    elements.forEach(element => {
      if (element.type === 'table') {
        // For table elements, validate individual cells
        let hasTableValue = false;
        element.tableConfig?.cells?.forEach(cellConfig => {
          const cellKey = `${element.name}_${cellConfig.cellId}`;
          const cellValue = formData[cellKey];
          
          if (cellValue && cellValue.trim()) {
            hasTableValue = true;
          }
          
          // Check cell validation rules
          if (cellConfig.validation && cellValue) {
            cellConfig.validation.forEach(rule => {
              if (validateRule(rule, cellValue)) {
                newErrors[cellKey] = rule.message;
              }
            });
          }
        });
        
        // Check if table is required and has no values
        if (element.required && !hasTableValue) {
          newErrors[element.name] = `${element.label} is required`;
        }
      } else {
        const value = formData[element.name];
        
        // Check required fields
        if (element.required) {
            let isMissing = false;
            if (element.type === 'file_input') {
                const hasFiles = value && ((Array.isArray(value) && value.length > 0) || (!Array.isArray(value) && value));
                if (!hasFiles) isMissing = true;
            } else if (element.type === 'map_input') { // ADDED: Validation for map
                if (!value || !Array.isArray(value) || value.length === 0) {
                    isMissing = true;
                }
            } else if (!value || (typeof value === 'string' && !value.trim())) {
                isMissing = true;
            }

            if (isMissing) {
                newErrors[element.name] = `${element.label} is required`;
                return;
            }
        }
        
        // Check validation rules
        if (element.validation && value) {
          element.validation.forEach(rule => {
            if (validateRule(rule, value)) {
              newErrors[element.name] = rule.message;
            }
          });
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate individual rule
  const validateRule = (rule: ValidationRule, value: any): boolean => {
    switch (rule.type) {
      case 'required':
        // ADDED: Check for map input array
        if(Array.isArray(value)) return value.length === 0;
        return !value || (typeof value === 'string' && !value.trim());
      case 'minLength':
        return typeof value === 'string' && value.length < (rule.value as number);
      case 'maxLength':
        return typeof value === 'string' && value.length > (rule.value as number);
      case 'pattern':
        return typeof value === 'string' && !!rule.value && !new RegExp(rule.value as string).test(value);
      case 'fileSize':
        if (Array.isArray(value)) {
          return value.some((fileData: FileDataDto) => (fileData.size || 0) > (rule.value as number));
        } else if (value) {
          return ((value as FileDataDto).size || 0) > (rule.value as number);
        }
        return false;
      case 'fileType':
        const allowedTypes = (rule.value as string).split(',');
        if (Array.isArray(value)) {
          return value.some((fileData: FileDataDto) => !allowedTypes.includes(fileData.type || ''));
        } else if (value) {
          return !allowedTypes.includes((value as FileDataDto).type || '');
        }
        return false;
      case 'fileCount':
        if (Array.isArray(value)) {
          return value.length > (rule.value as number);
        }
        return false;
      default:
        return false;
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const parameters: Record<string, any> = {};
      elements.forEach(element => {
        if (element.type !== 'button' && element.type !== 'label') {
          if (element.type === 'table') {
            const tableData: Record<string, any> = {};
            element.tableConfig?.cells?.forEach(cellConfig => {
              const cellKey = `${element.name}_${cellConfig.cellId}`;
              const cellValue = formData[cellKey] || '';
              const propertyName = cellConfig.customName || cellConfig.cellId;
              tableData[propertyName] = cellValue;
            });
            parameters[element.name] = tableData;
          } else if (element.type === 'file_input') {
            const fileValue = formData[element.name];
            console.log('Processing file input for execution:', element.name, fileValue);
            if (fileValue) {
              if (Array.isArray(fileValue)) {
                parameters[element.name] = fileValue.map((fileData: FileDataDto) => ({
                  filename: fileData.name,
                  content: fileData.base64Content,
                  fileSize: fileData.size,
                  contentType: fileData.type
                }));
              } else {
                const fileData = fileValue as FileDataDto;
                parameters[element.name] = {
                  filename: fileData.name,
                  content: fileData.base64Content,
                  fileSize: fileData.size,
                  contentType: fileData.type
                };
              }
              console.log('File parameters for execution:', parameters[element.name]);
            } else {
              parameters[element.name] = element.fileInputConfig?.multiple ? [] : null;
            }
          } else if (element.type === 'map_input') { // ADDED: Submission logic for map
            const mapData = formData[element.name] || [];
            // Transform NamedPoint[] to {"name": {lat, lng}} format
            const transformedData: Record<string, {lat: number, lng: number}> = {};
            mapData.forEach((point: any) => {
              if (point && point.name && point.lat !== undefined && point.lng !== undefined) {
                transformedData[point.name] = { lat: point.lat, lng: point.lng };
              }
            });
            parameters[element.name] = transformedData;
          } else {
            parameters[element.name] = formData[element.name] || element.defaultValue || '';
          }
        }
      });
      
      onSubmit(parameters);
    }
  };

  // Render individual element
  const renderElement = (element: UIElement) => {
    const value = formData[element.name] || element.defaultValue || (element.type === 'map_input' ? [] : '');
    const error = errors[element.name];
    const hasError = !!error;

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
            {element.helpText && <p className="text-sm text-gray-500 dark:text-gray-400">{element.helpText}</p>}
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
            {element.helpText && <p className="text-sm text-gray-500 dark:text-gray-400">{element.helpText}</p>}
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
            {element.helpText && <p className="text-sm text-gray-500 dark:text-gray-400">{element.helpText}</p>}
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
            {element.helpText && <p className="text-sm text-gray-500 dark:text-gray-400">{element.helpText}</p>}
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
            {element.helpText && <p className="text-sm text-gray-500 dark:text-gray-400">{element.helpText}</p>}
          </div>
        );

      case 'checkbox':
        return (
          <div key={element.id} className="space-y-1">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={Boolean(value)}
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
            {element.helpText && <p className="text-sm text-gray-500 dark:text-gray-400">{element.helpText}</p>}
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
            {element.helpText && <p className="text-sm text-gray-500 dark:text-gray-400">{element.helpText}</p>}
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
            {element.helpText && <p className="text-sm text-gray-500 dark:text-gray-400">{element.helpText}</p>}
          </div>
        );

      case 'label':
        return (
          <div key={element.id} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" style={customStyle}>
              {element.label}
            </label>
            {element.helpText && <p className="text-sm text-gray-500 dark:text-gray-400">{element.helpText}</p>}
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
                        const cellError = errors[cellKey];
                        const hasCellError = !!cellError;
                        
                        return (
                          <td key={colIndex} className="border border-gray-300 dark:border-gray-600 p-2">
                            <div className="space-y-1">
                              {element.tableConfig?.editableCells ? (
                                <input
                                  type={cellConfig?.type === 'number' ? 'number' : 'text'}
                                  value={cellValue}
                                  onChange={(e) => handleInputChange(cellKey, e.target.value)}
                                  placeholder={cellConfig?.placeholder || `${cellConfig?.cellId}`}
                                  className={`w-full text-sm rounded px-2 py-1 ${
                                    hasCellError 
                                      ? 'border border-red-500 bg-red-50 dark:bg-red-900/20' 
                                      : 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                                  } text-gray-900 dark:text-gray-100`}
                                  disabled={cellConfig?.readonly || element.disabled}
                                />
                              ) : (
                                <div className="text-sm text-gray-600 dark:text-gray-400 px-2 py-1">
                                  {cellValue || cellConfig?.cellId}
                                </div>
                              )}
                              {hasCellError && <div className="text-xs text-red-600">{cellError}</div>}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {hasError && <p className="text-sm text-red-600">{error}</p>}
            {element.helpText && <p className="text-sm text-gray-500 dark:text-gray-400">{element.helpText}</p>}
          </div>
        );

      case 'file_input':
        return (
          <FileInput
            key={element.id}
            config={element.fileInputConfig || {}}
            value={value}
            onChange={(files) => handleInputChange(element.name, files)}
            disabled={element.disabled}
            label={element.label}
            placeholder={element.placeholder}
            required={element.required}
            hasError={hasError}
            errorMessage={error}
            helpText={element.helpText}
            className="w-full"
          />
        );

      case 'map_input':
        return (
          <div key={element.id} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className={`w-full h-96 border rounded-md overflow-hidden ${hasError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}>
              <InteractiveMap
                element={element}
                value={value || []}
                onChange={(newValue) => handleInputChange(element.name, newValue)}
              />
            </div>
            {hasError && <p className="text-sm text-red-600 mt-1">{error}</p>}
            {element.helpText && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{element.helpText}</p>}
          </div>
        );

      default:
        return null;
    }
  };

  const formElements = elements.filter(element => 
    element.type !== 'button' && element.type !== 'label'
  );

  const labelElements = elements.filter(element => element.type === 'label');

  return (
    <div className={`bg-white dark:bg-gray-800 ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {title && (
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {title}
            </h3>
          </div>
        )}

        {labelElements.map(renderElement)}
        <div className="space-y-4">
          {formElements.map(renderElement)}
        </div>

        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            variant="primary"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            Execute Program
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ComponentForm;