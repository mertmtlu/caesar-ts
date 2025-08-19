// src/types/componentDesigner.ts

export type ElementType = 
  | 'text_input' 
  | 'checkbox' 
  | 'button' 
  | 'label' 
  | 'dropdown' 
  | 'textarea' 
  | 'number_input' 
  | 'date_picker'
  | 'email_input'
  | 'password_input'
  | 'file_input'
  | 'table';

export type ValidationRuleType = 'required' | 'minLength' | 'maxLength' | 'pattern' | 'custom' | 'fileSize' | 'fileType' | 'fileCount';

export interface ValidationRule {
  type: ValidationRuleType;
  value?: string | number;
  message: string;
}

export interface ElementStyle {
  width?: number;
  height?: number;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderRadius?: number;
  fontSize?: number;
  fontWeight?: 'normal' | 'bold' | 'lighter';
  margin?: number;
  padding?: number;
}

export type TableCellType = 'text' | 'number' | 'dropdown' | 'date';

export interface TableCellConfig {
  cellId: string; // e.g., "a1", "b1", "a2", "b2"
  customName?: string; // e.g., "compressive_strength"
  value?: string | number;
  type: TableCellType;
  validation?: ValidationRule[];
  options?: string[]; // For dropdown cells
  placeholder?: string;
  readonly?: boolean;
}

export interface TableConfig {
  rows: number;
  columns: number;
  cells: TableCellConfig[];
  showHeaders: boolean;
  editableCells: boolean;
  headerLabels?: string[]; // Custom column headers
}

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface FileInputConfig {
  acceptedFileTypes?: string[]; // e.g., ['.pdf', '.jpg', '.png'] or ['image/*', 'application/pdf']
  maxFileSize?: number; // in bytes
  multiple?: boolean;
  dragAndDrop?: boolean;
  showPreview?: boolean;
  uploadOnSelect?: boolean; // Whether to upload immediately on file selection
}

export interface UIElement {
  id: string;
  type: ElementType;
  label: string;
  name: string;
  placeholder?: string;
  required: boolean;
  disabled?: boolean;
  validation?: ValidationRule[];
  styling?: ElementStyle;
  position: Position;
  size: Size;
  options?: string[]; // For dropdown, radio buttons, etc.
  defaultValue?: string | boolean | number;
  helpText?: string;
  // Table-specific properties
  tableConfig?: TableConfig;
  // File input-specific properties
  fileInputConfig?: FileInputConfig;
}

export interface LayoutConfig {
  type: 'grid' | 'flex' | 'absolute';
  columns?: number;
  rows?: number;
  spacing?: number;
  padding?: number;
}

export interface ComponentSchema {
  name: string;
  description: string;
  type: 'input_form' | 'visualization' | 'composite';
  elements: UIElement[];
  layout: LayoutConfig;
  validation: {
    rules: ValidationRule[];
    submitButton: boolean;
    resetButton: boolean;
  };
  styling: {
    theme: string;
    customCSS?: string;
    backgroundColor?: string;
    textColor?: string;
  };
  metadata: {
    version: string;
    createdAt: Date;
    updatedAt: Date;
    author: string;
  };
}

export interface DesignerState {
  elements: UIElement[];
  selectedElementId: string | null;
  canvasSize: Size;
  zoom: number;
  gridSize: number;
  showGrid: boolean;
  layout: LayoutConfig;
  isDragging: boolean;
  draggedElement?: UIElement;
}

export interface ElementTemplate {
  id: string;
  name: string;
  type: ElementType;
  icon: string;
  description: string;
  defaultProps: Partial<UIElement>;
}

// Table utility functions (moved before ELEMENT_TEMPLATES)
export const generateCellId = (row: number, col: number): string => {
  const columnLetter = String.fromCharCode(65 + (col % 26)); // A, B, C, etc.
  return `${columnLetter.toLowerCase()}${row + 1}`; // a1, b1, a2, b2, etc.
};

export const createDefaultTableConfig = (rows: number = 3, columns: number = 3): TableConfig => {
  const cells: TableCellConfig[] = [];
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      cells.push({
        cellId: generateCellId(row, col),
        type: 'text',
        value: '',
        readonly: false,
        placeholder: `Enter value for ${generateCellId(row, col)}`
      });
    }
  }

  return {
    rows,
    columns,
    cells,
    showHeaders: true,
    editableCells: true,
    headerLabels: Array.from({ length: columns }, (_, i) => String.fromCharCode(65 + i))
  };
};

// Predefined element templates
export const ELEMENT_TEMPLATES: ElementTemplate[] = [
  {
    id: 'text_input',
    name: 'Text Input',
    type: 'text_input',
    icon: '📝',
    description: 'Single line text input field',
    defaultProps: {
      label: 'Text Input',
      name: 'text_input',
      placeholder: 'Enter text...',
      required: false,
      size: { width: 200, height: 40 }
    }
  },
  {
    id: 'checkbox',
    name: 'Checkbox',
    type: 'checkbox',
    icon: '☑️',
    description: 'Boolean checkbox input',
    defaultProps: {
      label: 'Checkbox',
      name: 'checkbox',
      required: false,
      defaultValue: false,
      size: { width: 150, height: 30 }
    }
  },
  {
    id: 'button',
    name: 'Button',
    type: 'button',
    icon: '🔘',
    description: 'Action button',
    defaultProps: {
      label: 'Button',
      name: 'button',
      required: false,
      size: { width: 100, height: 40 }
    }
  },
  {
    id: 'dropdown',
    name: 'Dropdown',
    type: 'dropdown',
    icon: '📋',
    description: 'Dropdown selection list',
    defaultProps: {
      label: 'Dropdown',
      name: 'dropdown',
      placeholder: 'Select an option...',
      required: false,
      options: ['Option 1', 'Option 2', 'Option 3'],
      size: { width: 200, height: 40 }
    }
  },
  {
    id: 'textarea',
    name: 'Text Area',
    type: 'textarea',
    icon: '📄',
    description: 'Multi-line text input',
    defaultProps: {
      label: 'Text Area',
      name: 'textarea',
      placeholder: 'Enter multiple lines...',
      required: false,
      size: { width: 300, height: 100 }
    }
  },
  {
    id: 'number_input',
    name: 'Number Input',
    type: 'number_input',
    icon: '🔢',
    description: 'Numeric input field',
    defaultProps: {
      label: 'Number Input',
      name: 'number_input',
      placeholder: 'Enter number...',
      required: false,
      size: { width: 150, height: 40 }
    }
  },
  {
    id: 'date_picker',
    name: 'Date Picker',
    type: 'date_picker',
    icon: '📅',
    description: 'Date selection input',
    defaultProps: {
      label: 'Date Picker',
      name: 'date_picker',
      required: false,
      size: { width: 200, height: 40 }
    }
  },
  {
    id: 'email_input',
    name: 'Email Input',
    type: 'email_input',
    icon: '📧',
    description: 'Email address input',
    defaultProps: {
      label: 'Email Input',
      name: 'email_input',
      placeholder: 'Enter email address...',
      required: false,
      size: { width: 250, height: 40 }
    }
  },
  {
    id: 'file_input',
    name: 'File Input',
    type: 'file_input',
    icon: '📁',
    description: 'File upload input with drag and drop support',
    defaultProps: {
      label: 'File Upload',
      name: 'file_input',
      placeholder: 'Select or drop files here...',
      required: false,
      size: { width: 300, height: 80 },
      fileInputConfig: {
        maxFileSize: 10 * 1024 * 1024, // 10MB
        multiple: false,
        dragAndDrop: true,
        showPreview: true,
        uploadOnSelect: false,
        acceptedFileTypes: ['*/*'] // Accept all file types by default
      }
    }
  },
  {
    id: 'table',
    name: 'Table',
    type: 'table',
    icon: '📊',
    description: 'Data table with customizable cells',
    defaultProps: {
      label: 'Data Table',
      name: 'data_table',
      required: false,
      size: { width: 400, height: 200 },
      tableConfig: createDefaultTableConfig(3, 3)
    }
  }
];

export interface DragItem {
  type: 'element';
  elementType: ElementType;
  template: ElementTemplate;
}

export interface DropResult {
  position: Position;
  canvasId: string;
}

// Utility functions
export const generateElementId = (): string => {
  return `element_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const createElement = (
  template: ElementTemplate, 
  position: Position
): UIElement => {
  return {
    id: generateElementId(),
    type: template.type,
    position,
    ...template.defaultProps
  } as UIElement;
};

export const validateElementName = (name: string, elements: UIElement[], currentId?: string): string | null => {
  if (!name.trim()) {
    return 'Element name is required';
  }
  
  if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name)) {
    return 'Element name must start with a letter or underscore and contain only letters, numbers, and underscores';
  }
  
  const duplicate = elements.find(el => el.name === name && el.id !== currentId);
  if (duplicate) {
    return 'Element name must be unique';
  }
  
  return null;
};

export const generateComponentSchema = (
  elements: UIElement[],
  layout: LayoutConfig,
  metadata: { name: string; description: string; type: 'input_form' | 'visualization' | 'composite' }
): ComponentSchema => {
  return {
    ...metadata,
    elements,
    layout,
    validation: {
      rules: [],
      submitButton: true,
      resetButton: false
    },
    styling: {
      theme: 'default',
      backgroundColor: '#ffffff',
      textColor: '#000000'
    },
    metadata: {
      version: '1.0.0',
      createdAt: new Date(),
      updatedAt: new Date(),
      author: 'current_user' // This should be replaced with actual user info
    }
  };
};