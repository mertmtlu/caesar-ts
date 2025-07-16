// src/components/designer/PropertyPanel.tsx
import React, { useState, useEffect } from 'react';
import { UIElement, ValidationRule, validateElementName } from '@/types/componentDesigner';
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
    
    // Regenerate cells if rows or columns changed
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
      
      // Update header labels if columns changed
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
          {selectedElement.type.replace('_', ' ').toLowerCase()}
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
            {selectedElement.type === 'table' && (
              <div className="space-y-4">
                <h4 className="text-md font-medium text-gray-900 dark:text-white">
                  Table Configuration
                </h4>
                
                {/* Table Dimensions */}
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Rows"
                    type="number"
                    value={formData.tableConfig?.rows || 3}
                    onChange={(e) => updateTableConfig('rows', parseInt(e.target.value))}
                    min={1}
                    max={20}
                    helperText="Number of rows"
                  />
                  <Input
                    label="Columns"
                    type="number"
                    value={formData.tableConfig?.columns || 3}
                    onChange={(e) => updateTableConfig('columns', parseInt(e.target.value))}
                    min={1}
                    max={26}
                    helperText="Number of columns"
                  />
                </div>

                {/* Table Options */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.tableConfig?.showHeaders || false}
                      onChange={(e) => updateTableConfig('showHeaders', e.target.checked)}
                      className="rounded border-gray-300 dark:border-gray-600"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Show Column Headers
                    </span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.tableConfig?.editableCells || false}
                      onChange={(e) => updateTableConfig('editableCells', e.target.checked)}
                      className="rounded border-gray-300 dark:border-gray-600"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Editable Cells
                    </span>
                  </label>
                </div>

                {/* Cell Names Configuration */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Cell Names
                  </label>
                  <div className="max-h-32 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded p-2 space-y-1">
                    {formData.tableConfig?.cells?.map((cell, index) => (
                      <div key={cell.cellId} className="flex items-center space-x-2 text-xs">
                        <span className="w-8 text-gray-500">{cell.cellId}</span>
                        <input
                          type="text"
                          value={cell.customName || ''}
                          placeholder={`Custom name for ${cell.cellId}`}
                          onChange={(e) => updateCellName(cell.cellId, e.target.value)}
                          className="flex-1 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-2 py-1"
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Custom names will be used in Python generation (e.g., "compressive_strength")
                  </p>
                </div>
              </div>
            )}

            {/* Size */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Width"
                type="number"
                value={formData.size?.width || 0}
                onChange={(e) => handleInputChange('size.width', parseInt(e.target.value))}
                errorMessage={errors.width}
                min={50}
                helperText="Width in pixels"
              />
              <Input
                label="Height"
                type="number"
                value={formData.size?.height || 0}
                onChange={(e) => handleInputChange('size.height', parseInt(e.target.value))}
                errorMessage={errors.height}
                min={30}
                helperText="Height in pixels"
              />
            </div>

            {/* Position */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="X Position"
                type="number"
                value={formData.position?.x || 0}
                onChange={(e) => handleInputChange('position.x', parseInt(e.target.value))}
                min={0}
                helperText="X coordinate"
              />
              <Input
                label="Y Position"
                type="number"
                value={formData.position?.y || 0}
                onChange={(e) => handleInputChange('position.y', parseInt(e.target.value))}
                min={0}
                helperText="Y coordinate"
              />
            </div>

            {/* Help Text */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Help Text
              </label>
              <textarea
                value={formData.helpText || ''}
                onChange={(e) => handleInputChange('helpText', e.target.value)}
                rows={2}
                className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                placeholder="Optional help text for users..."
              />
            </div>

            {/* Required */}
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.required || false}
                  onChange={(e) => handleInputChange('required', e.target.checked)}
                  className="rounded border-gray-300 dark:border-gray-600"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Required Field
                </span>
              </label>
            </div>

            {/* Disabled */}
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.disabled || false}
                  onChange={(e) => handleInputChange('disabled', e.target.checked)}
                  className="rounded border-gray-300 dark:border-gray-600"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Disabled
                </span>
              </label>
            </div>
          </>
        )}

        {activeTab === 'validation' && (
          <>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-md font-medium text-gray-900 dark:text-white">
                  Validation Rules
                </h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addValidationRule}
                  leftIcon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  }
                >
                  Add Rule
                </Button>
              </div>

              {(formData.validation || []).map((rule, index) => (
                <div key={index} className="p-3 border border-gray-200 dark:border-gray-600 rounded-md">
                  <div className="flex items-center justify-between mb-3">
                    <select
                      value={rule.type}
                      onChange={(e) => updateValidationRule(index, { ...rule, type: e.target.value as any })}
                      className="rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                    >
                      <option value="required">Required</option>
                      <option value="minLength">Min Length</option>
                      <option value="maxLength">Max Length</option>
                      <option value="pattern">Pattern</option>
                      <option value="custom">Custom</option>
                    </select>
                    <button
                      onClick={() => removeValidationRule(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                  {['minLength', 'maxLength', 'pattern'].includes(rule.type) && (
                    <input
                      type={rule.type === 'pattern' ? 'text' : 'number'}
                      value={rule.value || ''}
                      onChange={(e) => updateValidationRule(index, { ...rule, value: e.target.value })}
                      placeholder={rule.type === 'pattern' ? 'Regular expression' : 'Value'}
                      className="w-full mb-2 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                    />
                  )}

                  <input
                    type="text"
                    value={rule.message}
                    onChange={(e) => updateValidationRule(index, { ...rule, message: e.target.value })}
                    placeholder="Error message"
                    className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                  />
                </div>
              ))}

              {(formData.validation || []).length === 0 && (
                <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                  <p className="text-sm">No validation rules defined</p>
                  <p className="text-xs mt-1">Add rules to validate user input</p>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'styling' && (
          <>
            <div className="space-y-4">
              <h4 className="text-md font-medium text-gray-900 dark:text-white">
                Element Styling
              </h4>
              
              {/* Background Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Background Color
                </label>
                <input
                  type="color"
                  value={formData.styling?.backgroundColor || '#ffffff'}
                  onChange={(e) => handleInputChange('styling.backgroundColor', e.target.value)}
                  className="w-full h-10 rounded-md border border-gray-300 dark:border-gray-600"
                />
              </div>

              {/* Text Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Text Color
                </label>
                <input
                  type="color"
                  value={formData.styling?.textColor || '#000000'}
                  onChange={(e) => handleInputChange('styling.textColor', e.target.value)}
                  className="w-full h-10 rounded-md border border-gray-300 dark:border-gray-600"
                />
              </div>

              {/* Border Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Border Color
                </label>
                <input
                  type="color"
                  value={formData.styling?.borderColor || '#d1d5db'}
                  onChange={(e) => handleInputChange('styling.borderColor', e.target.value)}
                  className="w-full h-10 rounded-md border border-gray-300 dark:border-gray-600"
                />
              </div>

              {/* Border Radius */}
              <Input
                label="Border Radius"
                type="number"
                value={formData.styling?.borderRadius || 0}
                onChange={(e) => handleInputChange('styling.borderRadius', parseInt(e.target.value))}
                min={0}
                helperText="Border radius in pixels"
              />

              {/* Font Size */}
              <Input
                label="Font Size"
                type="number"
                value={formData.styling?.fontSize || 14}
                onChange={(e) => handleInputChange('styling.fontSize', parseInt(e.target.value))}
                min={8}
                max={72}
                helperText="Font size in pixels"
              />

              {/* Font Weight */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Font Weight
                </label>
                <select
                  value={formData.styling?.fontWeight || 'normal'}
                  onChange={(e) => handleInputChange('styling.fontWeight', e.target.value)}
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                >
                  <option value="lighter">Lighter</option>
                  <option value="normal">Normal</option>
                  <option value="bold">Bold</option>
                </select>
              </div>

              {/* Padding */}
              <Input
                label="Padding"
                type="number"
                value={formData.styling?.padding || 0}
                onChange={(e) => handleInputChange('styling.padding', parseInt(e.target.value))}
                min={0}
                helperText="Inner padding in pixels"
              />

              {/* Margin */}
              <Input
                label="Margin"
                type="number"
                value={formData.styling?.margin || 0}
                onChange={(e) => handleInputChange('styling.margin', parseInt(e.target.value))}
                min={0}
                helperText="Outer margin in pixels"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PropertyPanel;