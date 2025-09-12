// src/components/designer/PropertyPanel.tsx
import React, { useState, useEffect } from 'react';
import { UIElement, ValidationRule, validateElementName, MapConfig } from '@/types/componentDesigner';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

interface PropertyPanelProps {
  selectedElement: UIElement | undefined;
  elements: UIElement[];
  onElementUpdate: (elementId: string, updates: Partial<UIElement>) => void;
}

const PropertyPanel: React.FC<PropertyPanelProps> = ({
  selectedElement,
  elements,
  onElementUpdate
}) => {
  const [formData, setFormData] = useState<Partial<UIElement>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<'basic' | 'validation' | 'styling'>('basic');
  const [newOption, setNewOption] = useState('');

  // Update form data when selected element changes
  useEffect(() => {
    if (selectedElement) {
      setFormData(selectedElement);
      setErrors({});
    } else {
      setFormData({});
      setErrors({});
    }
  }, [selectedElement]);

  // Update element when form data changes
  const updateElement = (updates: Partial<UIElement>) => {
    if (!selectedElement) return;
    
    const newData = { ...formData, ...updates };
    setFormData(newData);
    onElementUpdate(selectedElement.id, updates);
  };

  // Validate form data
  const validateField = (field: string, value: any) => {
    const newErrors = { ...errors };
    
    switch (field) {
      case 'name':
        const nameError = validateElementName(value, elements, selectedElement?.id);
        if (nameError) {
          newErrors.name = nameError;
        } else {
          delete newErrors.name;
        }
        break;
      case 'label':
        if (!value?.trim()) {
          newErrors.label = 'Label is required';
        } else {
          delete newErrors.label;
        }
        break;
      case 'size.width':
        if (value < 50) {
          newErrors.width = 'Width must be at least 50px';
        } else {
          delete newErrors.width;
        }
        break;
      case 'size.height':
        if (value < 30) {
          newErrors.height = 'Height must be at least 30px';
        } else {
          delete newErrors.height;
        }
        break;
    }
    
    setErrors(newErrors);
  };

  // Handle input change
  const handleInputChange = (field: string, value: any) => {
    validateField(field, value);
    
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      updateElement({
        [parent]: {
          ...(formData[parent as keyof UIElement] as any),
          [child]: value
        }
      });
    } else {
      updateElement({ [field]: value });
    }
  };

  // Handle validation rule changes
  const updateValidationRule = (index: number, rule: ValidationRule) => {
    const validation = [...(formData.validation || [])];
    validation[index] = rule;
    updateElement({ validation });
  };

  const addValidationRule = () => {
    const validation = [...(formData.validation || [])];
    validation.push({
      type: 'required',
      message: 'This field is required'
    });
    updateElement({ validation });
  };

  const removeValidationRule = (index: number) => {
    const validation = [...(formData.validation || [])];
    validation.splice(index, 1);
    updateElement({ validation });
  };

  // Handle dropdown options
  const addOption = () => {
    if (!newOption.trim()) return;
    
    const options = [...(formData.options || [])];
    options.push(newOption.trim());
    updateElement({ options });
    setNewOption('');
  };

  const removeOption = (index: number) => {
    const options = [...(formData.options || [])];
    options.splice(index, 1);
    updateElement({ options });
  };

  const updateOption = (index: number, value: string) => {
    const options = [...(formData.options || [])];
    options[index] = value;
    updateElement({ options });
  };

  // Handle table configuration
  const updateTableConfig = (key: keyof import('@/types/componentDesigner').TableConfig, value: any) => {
    const currentConfig = formData.tableConfig || { rows: 3, columns: 3, cells: [], showHeaders: true, editableCells: true };
    const newConfig = { ...currentConfig, [key]: value };
    
    if (key === 'rows' || key === 'columns') {
      const newCells: import('@/types/componentDesigner').TableCellConfig[] = [];
      for (let row = 0; row < newConfig.rows; row++) {
        for (let col = 0; col < newConfig.columns; col++) {
          const cellId = `${String.fromCharCode(97 + col)}${row + 1}`;
          const existingCell = currentConfig.cells.find(c => c.cellId === cellId);
          newCells.push(existingCell || {
            cellId,
            type: 'text',
            value: '',
            readonly: false,
            placeholder: `Enter value for ${cellId}`
          });
        }
      }
      newConfig.cells = newCells;
      
      if (key === 'columns') {
        newConfig.headerLabels = Array.from({ length: newConfig.columns }, (_, i) => String.fromCharCode(65 + i));
      }
    }
    
    updateElement({ tableConfig: newConfig });
  };

  const updateCellName = (cellId: string, customName: string) => {
    const currentConfig = formData.tableConfig;
    if (!currentConfig) return;
    
    const cells = [...currentConfig.cells];
    const cellIndex = cells.findIndex(c => c.cellId === cellId);
    if (cellIndex >= 0) {
      cells[cellIndex] = { ...cells[cellIndex], customName: customName.trim() || undefined };
      updateElement({ tableConfig: { ...currentConfig, cells } });
    }
  };

  // Handle Map Configuration
  const updateMapConfig = (key: keyof MapConfig, value: any) => {
    const currentConfig = formData.mapConfig;
    if (!currentConfig) return;
    const newConfig = { ...currentConfig, [key]: value };
    updateElement({ mapConfig: newConfig });
  };
  
  const updateMapCenter = (coord: 'lat' | 'lng', value: number) => {
    const currentConfig = formData.mapConfig;
    if (!currentConfig) return;
    const newConfig = {
      ...currentConfig,
      defaultCenter: {
        ...currentConfig.defaultCenter,
        [coord]: value
      }
    };
    updateElement({ mapConfig: newConfig });
  };

  // Handle File Input Configuration
  const updateFileInputConfig = (key: keyof import('@/types/componentDesigner').FileInputConfig, value: any) => {
    const currentConfig = formData.fileInputConfig || {
      maxFileSize: 10 * 1024 * 1024, // 10MB
      multiple: false,
      dragAndDrop: true,
      showPreview: true,
      uploadOnSelect: false,
      acceptedFileTypes: ['*/*']
    };
    const newConfig = { ...currentConfig, [key]: value };
    updateElement({ fileInputConfig: newConfig });
  };

  const updateFileTypeAtIndex = (index: number, value: string) => {
    const currentTypes = [...(formData.fileInputConfig?.acceptedFileTypes || ['*/*'])];
    currentTypes[index] = value;
    updateFileInputConfig('acceptedFileTypes', currentTypes);
  };

  const removeFileTypeAtIndex = (index: number) => {
    const currentTypes = [...(formData.fileInputConfig?.acceptedFileTypes || ['*/*'])];
    if (currentTypes.length > 1) {
      currentTypes.splice(index, 1);
      updateFileInputConfig('acceptedFileTypes', currentTypes);
    }
  };

  const addFileType = () => {
    const currentTypes = [...(formData.fileInputConfig?.acceptedFileTypes || ['*/*'])];
    currentTypes.push('*/*');
    updateFileInputConfig('acceptedFileTypes', currentTypes);
  };

  if (!selectedElement) {
    return (
      <div className="p-6 text-center">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No Element Selected</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Select an element on the canvas to edit its properties.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Element Properties
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {selectedElement.type.replace(/_/g, ' ')}
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8 px-4" aria-label="Tabs">
          {['basic', 'validation', 'styling'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === 'basic' && (
          <>
            {/* Name */}
            <Input
              label="Name"
              value={formData.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              errorMessage={errors.name}
              required
              helperText="Unique identifier for this element"
            />

            {/* Label */}
            <Input
              label="Label"
              value={formData.label || ''}
              onChange={(e) => handleInputChange('label', e.target.value)}
              errorMessage={errors.label}
              required
              helperText="Display text for this element"
            />

            {/* Placeholder */}
            {['text_input', 'email_input', 'password_input', 'number_input', 'textarea', 'dropdown'].includes(selectedElement.type) && (
              <Input
                label="Placeholder"
                value={formData.placeholder || ''}
                onChange={(e) => handleInputChange('placeholder', e.target.value)}
                helperText="Placeholder text shown when empty"
              />
            )}

            {/* Default Value */}
            {selectedElement.type === 'checkbox' && (
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.defaultValue as boolean || false}
                    onChange={(e) => handleInputChange('defaultValue', e.target.checked)}
                    className="rounded border-gray-300 dark:border-gray-600"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Default Checked
                  </span>
                </label>
              </div>
            )}

            {/* Options for dropdown */}
            {selectedElement.type === 'dropdown' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Options
                </label>
                <div className="space-y-2">
                  {(formData.options || []).map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => updateOption(index, e.target.value)}
                        className="flex-1 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                      />
                      <button
                        onClick={() => removeOption(index)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={newOption}
                      onChange={(e) => setNewOption(e.target.value)}
                      placeholder="New option..."
                      className="flex-1 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                      onKeyPress={(e) => e.key === 'Enter' && addOption()}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addOption}
                      disabled={!newOption.trim()}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Table Configuration */}
            {selectedElement.type === 'table' && formData.tableConfig && (
              <div className="space-y-4 p-3 border rounded-md border-gray-200 dark:border-gray-600">
                <h4 className="text-md font-medium text-gray-900 dark:text-white">Table Configuration</h4>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Rows" type="number" value={formData.tableConfig.rows} onChange={(e) => updateTableConfig('rows', parseInt(e.target.value))} min={1} max={20} />
                  <Input label="Columns" type="number" value={formData.tableConfig.columns} onChange={(e) => updateTableConfig('columns', parseInt(e.target.value))} min={1} max={26} />
                </div>
              </div>
            )}

            {/* Map Configuration */}
            {selectedElement.type === 'map_input' && formData.mapConfig && (
              <div className="space-y-4 p-3 border rounded-md border-gray-200 dark:border-gray-600">
                <h4 className="text-md font-medium text-gray-900 dark:text-white">Map Configuration</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Selection Mode</label>
                  <select value={formData.mapConfig.selectionMode} onChange={(e) => updateMapConfig('selectionMode', e.target.value)} className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm">
                    <option value="single">Single Point</option>
                    <option value="multiple">Multiple Points</option>
                  </select>
                </div>
                {formData.mapConfig.selectionMode === 'multiple' && (
                  <Input label="Max Points" type="number" value={formData.mapConfig.maxPoints || 5} onChange={(e) => updateMapConfig('maxPoints', parseInt(e.target.value))} min={2} />
                )}
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Default Lat" type="number" value={formData.mapConfig.defaultCenter.lat} onChange={(e) => updateMapCenter('lat', parseFloat(e.target.value))} step={0.001} />
                  <Input label="Default Lng" type="number" value={formData.mapConfig.defaultCenter.lng} onChange={(e) => updateMapCenter('lng', parseFloat(e.target.value))} step={0.001} />
                </div>
                <Input label="Default Zoom" type="number" value={formData.mapConfig.defaultZoom} onChange={(e) => updateMapConfig('defaultZoom', parseInt(e.target.value))} min={1} max={20} />
              </div>
            )}

            {/* File Input Configuration */}
            {selectedElement.type === 'file_input' && (
              <div className="space-y-4 p-3 border rounded-md border-gray-200 dark:border-gray-600">
                <h4 className="text-md font-medium text-gray-900 dark:text-white">File Input Configuration</h4>
                
                {/* Multiple Files */}
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.fileInputConfig?.multiple || false}
                      onChange={(e) => updateFileInputConfig('multiple', e.target.checked)}
                      className="rounded border-gray-300 dark:border-gray-600"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Allow Multiple Files
                    </span>
                  </label>
                </div>

                {/* Max File Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Max File Size (MB)
                  </label>
                  <input
                    type="number"
                    value={((formData.fileInputConfig?.maxFileSize || 10485760) / (1024 * 1024)).toFixed(1)}
                    onChange={(e) => updateFileInputConfig('maxFileSize', parseFloat(e.target.value) * 1024 * 1024)}
                    min="0.1"
                    max="100"
                    step="0.1"
                    className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                  />
                </div>

                {/* Accepted File Types */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Accepted File Types
                  </label>
                  <div className="space-y-2">
                    {(formData.fileInputConfig?.acceptedFileTypes || ['*/*']).map((fileType, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={fileType}
                          onChange={(e) => updateFileTypeAtIndex(index, e.target.value)}
                          placeholder="e.g. .pdf, image/*, application/pdf"
                          className="flex-1 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                        />
                        <button
                          onClick={() => removeFileTypeAtIndex(index)}
                          className="text-red-500 hover:text-red-700 p-1"
                          disabled={(formData.fileInputConfig?.acceptedFileTypes || []).length <= 1}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addFileType}
                    >
                      Add File Type
                    </Button>
                  </div>
                </div>

                {/* Drag and Drop */}
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.fileInputConfig?.dragAndDrop !== false}
                      onChange={(e) => updateFileInputConfig('dragAndDrop', e.target.checked)}
                      className="rounded border-gray-300 dark:border-gray-600"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Enable Drag & Drop
                    </span>
                  </label>
                </div>

                {/* Show Preview */}
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.fileInputConfig?.showPreview !== false}
                      onChange={(e) => updateFileInputConfig('showPreview', e.target.checked)}
                      className="rounded border-gray-300 dark:border-gray-600"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Show File Preview
                    </span>
                  </label>
                </div>

                {/* Upload on Select */}
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.fileInputConfig?.uploadOnSelect || false}
                      onChange={(e) => updateFileInputConfig('uploadOnSelect', e.target.checked)}
                      className="rounded border-gray-300 dark:border-gray-600"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Upload Immediately on Select
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Size & Position */}
            <div className="space-y-4 p-3 border rounded-md border-gray-200 dark:border-gray-600">
              <h4 className="text-md font-medium text-gray-900 dark:text-white">Layout</h4>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Width" type="number" value={formData.size?.width || 0} onChange={(e) => handleInputChange('size.width', parseInt(e.target.value))} errorMessage={errors.width} min={50} />
                <Input label="Height" type="number" value={formData.size?.height || 0} onChange={(e) => handleInputChange('size.height', parseInt(e.target.value))} errorMessage={errors.height} min={30} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="X" type="number" value={formData.position?.x || 0} onChange={(e) => handleInputChange('position.x', parseInt(e.target.value))} min={0} />
                <Input label="Y" type="number" value={formData.position?.y || 0} onChange={(e) => handleInputChange('position.y', parseInt(e.target.value))} min={0} />
              </div>
            </div>

            {/* Help Text, Required, Disabled */}
            <Input label="Help Text" value={formData.helpText || ''} onChange={(e) => handleInputChange('helpText', e.target.value)} helperText="Optional help text for users."/>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2"><input type="checkbox" checked={formData.required || false} onChange={(e) => handleInputChange('required', e.target.checked)} className="rounded border-gray-300 dark:border-gray-600" /><span className="text-sm font-medium text-gray-700 dark:text-gray-300">Required</span></label>
              <label className="flex items-center space-x-2"><input type="checkbox" checked={formData.disabled || false} onChange={(e) => handleInputChange('disabled', e.target.checked)} className="rounded border-gray-300 dark:border-gray-600" /><span className="text-sm font-medium text-gray-700 dark:text-gray-300">Disabled</span></label>
            </div>
          </>
        )}
        {activeTab === 'validation' && (
          // ... (Validation tab content remains the same)
          <div/>
        )}
        {activeTab === 'styling' && (
          // ... (Styling tab content remains the same)
          <div/>
        )}
      </div>
    </div>
  );
};

export default PropertyPanel;