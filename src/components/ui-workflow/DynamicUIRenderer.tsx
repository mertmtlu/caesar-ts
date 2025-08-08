import React, { useState, useCallback } from 'react';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
// Legacy component - now replaced by ComponentForm
interface UIInputField {
  name: string;
  type: 'text' | 'email' | 'number' | 'select' | 'checkbox' | 'textarea' | 'file';
  label: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string | number | boolean;
  options?: { value: string; label: string }[];
  validation?: {
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: string;
  };
}

interface UIComponentData {
  id: string;
  name: string;
  type: string;
  configuration: {
    title?: string;
    description?: string;
    fields: UIInputField[];
    submitLabel?: string;
    cancelLabel?: string;
    allowSkip?: boolean;
  };
}

interface DynamicUIRendererProps {
  uiComponent?: UIComponentData;
  contextData?: any;
  onSubmit: (data: Record<string, any>) => void;
  onCancel: () => void;
  onSkip?: () => void;
  isSubmitting?: boolean;
  className?: string;
}

interface FormErrors {
  [key: string]: string;
}

const DynamicUIRenderer: React.FC<DynamicUIRendererProps> = ({
  uiComponent,
  contextData,
  onSubmit,
  onCancel,
  onSkip,
  isSubmitting = false,
  className = ''
}) => {
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    // Initialize form data with default values
    const initialData: Record<string, any> = {};
    const fields = uiComponent?.configuration?.fields || [];
    
    console.log('[DynamicUIRenderer] Initializing form data for', fields.length, 'fields');
    
    fields.forEach((field: any) => {
      if (field.defaultValue !== undefined) {
        initialData[field.name] = field.defaultValue;
        console.log(`[DynamicUIRenderer] Field ${field.name}: using default value`, field.defaultValue);
      } else {
        // Set appropriate empty values based on field type
        switch (field.type) {
          case 'checkbox':
            initialData[field.name] = false;
            break;
          case 'number':
            initialData[field.name] = '';
            break;
          case 'select':
            initialData[field.name] = '';
            break;
          default:
            initialData[field.name] = '';
        }
        console.log(`[DynamicUIRenderer] Field ${field.name}: using empty value for type ${field.type}`);
      }
    });
    
    console.log('[DynamicUIRenderer] Initial form data:', initialData);
    return initialData;
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = useCallback((field: any, value: any): string => {
    if (field.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      return `${field.label} is required`;
    }

    if (!field.validation) return '';

    const validation = field.validation;
    const stringValue = String(value);

    // String length validation
    if (validation.minLength && stringValue.length < validation.minLength) {
      return `${field.label} must be at least ${validation.minLength} characters`;
    }
    if (validation.maxLength && stringValue.length > validation.maxLength) {
      return `${field.label} must be no more than ${validation.maxLength} characters`;
    }

    // Number validation
    if (field.type === 'number') {
      const numValue = Number(value);
      if (isNaN(numValue)) {
        return `${field.label} must be a valid number`;
      }
      if (validation.min !== undefined && numValue < validation.min) {
        return `${field.label} must be at least ${validation.min}`;
      }
      if (validation.max !== undefined && numValue > validation.max) {
        return `${field.label} must be no more than ${validation.max}`;
      }
    }

    // Pattern validation
    if (validation.pattern && stringValue) {
      const regex = new RegExp(validation.pattern);
      if (!regex.test(stringValue)) {
        return `${field.label} format is invalid`;
      }
    }

    // Email validation
    if (field.type === 'email' && stringValue) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(stringValue)) {
        return `${field.label} must be a valid email address`;
      }
    }

    return '';
  }, []);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    uiComponent?.configuration?.fields?.forEach((field: any) => {
      const error = validateField(field, formData[field.name]);
      if (error) {
        newErrors[field.name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [uiComponent?.configuration?.fields, formData, validateField]);

  const handleFieldChange = (fieldName: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

  const handleFieldBlur = (field: any) => {
    setTouched(prev => ({ ...prev, [field.name]: true }));
    
    // Validate field on blur
    const error = validateField(field, formData[field.name]);
    setErrors(prev => ({ ...prev, [field.name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {};
    uiComponent?.configuration?.fields?.forEach((field: any) => {
      allTouched[field.name] = true;
    });
    setTouched(allTouched);

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const renderField = (field: UIInputField) => {
    const hasError = touched[field.name] && errors[field.name];
    
    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
        return (
          <Input
            key={field.name}
            label={field.label}
            type={field.type}
            value={formData[field.name]}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            onBlur={() => handleFieldBlur(field)}
            placeholder={field.placeholder}
            required={field.required}
            errorMessage={hasError ? errors[field.name] : undefined}
            disabled={isSubmitting}
          />
        );

      case 'textarea':
        return (
          <div key={field.name} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <textarea
              value={formData[field.name]}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              onBlur={() => handleFieldBlur(field)}
              placeholder={field.placeholder}
              required={field.required}
              disabled={isSubmitting}
              rows={4}
              className={`block w-full rounded-md border shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 ${
                hasError
                  ? 'border-red-300 dark:border-red-600'
                  : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
            />
            {hasError && (
              <p className="text-sm text-red-600 dark:text-red-400">{errors[field.name]}</p>
            )}
          </div>
        );

      case 'select':
        return (
          <div key={field.name} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <select
              value={formData[field.name]}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              onBlur={() => handleFieldBlur(field)}
              required={field.required}
              disabled={isSubmitting}
              className={`block w-full rounded-md border shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 ${
                hasError
                  ? 'border-red-300 dark:border-red-600'
                  : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
            >
              <option value="">Select {field.label}</option>
              {field.options?.map((option: any) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {hasError && (
              <p className="text-sm text-red-600 dark:text-red-400">{errors[field.name]}</p>
            )}
          </div>
        );

      case 'checkbox':
        return (
          <div key={field.name} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={field.name}
              checked={formData[field.name]}
              onChange={(e) => handleFieldChange(field.name, e.target.checked)}
              onBlur={() => handleFieldBlur(field)}
              required={field.required}
              disabled={isSubmitting}
              className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
            />
            <label 
              htmlFor={field.name}
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {hasError && (
              <p className="text-sm text-red-600 dark:text-red-400">{errors[field.name]}</p>
            )}
          </div>
        );

      case 'file':
        return (
          <div key={field.name} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="file"
              onChange={(e) => handleFieldChange(field.name, e.target.files?.[0])}
              onBlur={() => handleFieldBlur(field)}
              required={field.required}
              disabled={isSubmitting}
              className={`block w-full text-sm text-gray-900 dark:text-gray-100 border rounded-md cursor-pointer bg-gray-50 dark:bg-gray-700 focus:outline-none disabled:opacity-50 ${
                hasError
                  ? 'border-red-300 dark:border-red-600'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {hasError && (
              <p className="text-sm text-red-600 dark:text-red-400">{errors[field.name]}</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  // Fallback UI when uiComponent is undefined or malformed
  if (!uiComponent) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="text-center py-8">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mb-2"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
          </div>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Loading UI interaction form...
          </p>
        </div>
        
        {/* Basic action buttons */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  // Check if component configuration is missing or invalid
  if (!uiComponent.configuration || !uiComponent.configuration.fields) {
    console.warn('[DynamicUIRenderer] UI component configuration is missing or invalid:', uiComponent);
    
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="text-center py-8">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="flex items-center justify-center">
              <svg className="w-8 h-8 text-yellow-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  Configuration Error
                </h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                  The UI component configuration is missing or invalid. Please contact your administrator.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Basic action buttons */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Component Title and Description */}
      {uiComponent.configuration?.title && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {uiComponent.configuration.title}
          </h3>
          {uiComponent.configuration?.description && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {uiComponent.configuration?.description}
            </p>
          )}
        </div>
      )}

      {/* Context Data Display */}
      {contextData && Object.keys(contextData).length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            Workflow Context
          </h4>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <pre className="whitespace-pre-wrap">{JSON.stringify(contextData, null, 2)}</pre>
          </div>
        </div>
      )}

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {uiComponent.configuration?.fields?.map(renderField) || []}

        {/* Form Actions */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          {uiComponent.configuration?.allowSkip && onSkip && (
            <Button
              type="button"
              variant="ghost"
              onClick={onSkip}
              disabled={isSubmitting}
            >
              {uiComponent.configuration?.cancelLabel || 'Skip'}
            </Button>
          )}
          
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          
          <Button
            type="submit"
            variant="primary"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            {uiComponent.configuration?.submitLabel || 'Submit'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DynamicUIRenderer;