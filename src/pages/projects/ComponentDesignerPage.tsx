// src/pages/projects/ComponentDesignerPage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '@/api/api';
import Button from '@/components/common/Button';
import { 
  DesignerState, 
  UIElement, 
  ComponentSchema, 
  generateComponentSchema 
} from '@/types/componentDesigner';
import { useUndoRedo } from '@/hooks/useUndoRedo';
import { useKeyboardShortcuts, designerShortcuts } from '@/hooks/useKeyboardShortcuts';
import { 
  AddElementCommand, 
  DeleteElementCommand, 
  UpdateElementCommand,
  MoveElementCommand,
  DuplicateElementCommand 
} from '@/commands/designerCommands';

// Component imports (to be created)
import ElementToolbox from '@/components/designer/ElementToolbox';
import DesignCanvas from '@/components/designer/DesignCanvas';
import PropertyPanel from '@/components/designer/PropertyPanel';
import PreviewPanel from '@/components/designer/PreviewPanel';
import { UiComponentCreateDto, UiComponentUpdateDto } from '@/api';

// Interfaces
interface ProjectInfo {
  id: string;
  name: string;
  currentVersion?: string;
}

interface SaveComponentForm {
  name: string;
  description: string;
  type: 'input_form' | 'visualization' | 'composite';
}

const ComponentDesignerPage: React.FC = () => {
  const { projectId, componentId } = useParams<{ projectId: string; componentId?: string }>();
  const navigate = useNavigate();
  const isEditMode = !!componentId;

  // State management
  const [project, setProject] = useState<ProjectInfo | null>(null);
  const [existingComponent, setExistingComponent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSaveModal, setShowSaveModal] = useState(false);
  
  // Designer state
  const [designerState, setDesignerState] = useState<DesignerState>({
    elements: [],
    selectedElementId: null,
    canvasSize: { width: 800, height: 600 },
    zoom: 1,
    gridSize: 20,
    showGrid: true,
    layout: {
      type: 'absolute',
      spacing: 10,
      padding: 20
    },
    isDragging: false
  });

  // UI state
  const [activePanel, setActivePanel] = useState<'properties' | 'preview'>('properties');
  const [showPreview, setShowPreview] = useState(false);

  // Save form state
  const [saveForm, setSaveForm] = useState<SaveComponentForm>({
    name: '',
    description: '',
    type: 'input_form'
  });

  // Undo/Redo system
  const {
    executeCommand,
    undo,
    redo,
    state: undoRedoState,
    getUndoDescription,
    getRedoDescription
  } = useUndoRedo(50);

  // Multi-select state
  const [selectedElementIds, setSelectedElementIds] = useState<string[]>([]);
  const [clipboard, setClipboard] = useState<UIElement[]>([]);

  useEffect(() => {
    if (projectId) {
      loadProjectInfo();
      if (isEditMode && componentId) {
        loadExistingComponent();
      } else {
        setIsLoading(false);
      }
    }
  }, [projectId, componentId, isEditMode]);

  const loadProjectInfo = async () => {
    if (!projectId) return;

    try {
      setError(null);

      const response = await api.programs.programs_GetById(projectId);
      
      if (response.success && response.data) {
        setProject({
          id: response.data.id || '',
          name: response.data.name || 'Unknown Project',
          currentVersion: response.data.currentVersion
        });
      } else {
        setError(response.message || 'Failed to load project details');
      }
    } catch (error) {
      console.error('Failed to load project:', error);
      setError('Failed to load project details. Please try again.');
    }
  };

  const loadExistingComponent = async () => {
    if (!componentId) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await api.uiComponents.uiComponents_GetById(componentId);

      if (response.success && response.data) {
        const data = response.data;
        setExistingComponent(data);

        // Update save form with existing component data
        setSaveForm({
          name: data.name || '',
          description: data.description || '',
          type: (data.type as 'input_form' | 'visualization' | 'composite') || 'input_form'
        });

        // Load designer state from configuration
        if (data.configuration) {
          try {
            const config = typeof data.configuration === 'string' 
              ? JSON.parse(data.configuration) 
              : data.configuration;

            if (config.elements && Array.isArray(config.elements)) {
              setDesignerState(prev => ({
                ...prev,
                elements: config.elements,
                layout: config.layout || prev.layout
              }));
            }
          } catch (parseError) {
            console.error('Failed to parse component configuration:', parseError);
          }
        }
      } else {
        setError(response.message || 'Failed to load component details');
      }
    } catch (error) {
      console.error('Failed to load component:', error);
      setError('Failed to load component. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateDesignerState = useCallback((updater: (state: DesignerState) => DesignerState) => {
    setDesignerState(updater);
  }, []);

  const getDesignerState = useCallback(() => designerState, [designerState]);

  // Command-based operations
  const addElement = useCallback((element: UIElement) => {
    const command = new AddElementCommand(element, updateDesignerState);
    executeCommand(command);
  }, [executeCommand, updateDesignerState]);

  const updateElement = useCallback((elementId: string, updates: Partial<UIElement>) => {
    const oldElement = designerState.elements.find(el => el.id === elementId);
    if (!oldElement) return;
    
    const newElement = { ...oldElement, ...updates };
    const command = new UpdateElementCommand(elementId, oldElement, newElement, updateDesignerState);
    executeCommand(command);
  }, [designerState.elements, executeCommand, updateDesignerState]);

  const deleteElement = useCallback((elementId: string) => {
    const command = new DeleteElementCommand(elementId, updateDesignerState, getDesignerState);
    executeCommand(command);
  }, [executeCommand, updateDesignerState, getDesignerState]);

  const duplicateElement = useCallback((elementId: string) => {
    const originalElement = designerState.elements.find(el => el.id === elementId);
    if (!originalElement) return;

    const duplicatedElement: UIElement = {
      ...originalElement,
      id: `element_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: `${originalElement.name}_copy`,
      position: {
        x: originalElement.position.x + 20,
        y: originalElement.position.y + 20
      }
    };

    const command = new DuplicateElementCommand(originalElement, duplicatedElement, updateDesignerState);
    executeCommand(command);
  }, [designerState.elements, executeCommand, updateDesignerState]);

  const selectElement = useCallback((elementId: string | null) => {
    updateDesignerState(state => ({ ...state, selectedElementId: elementId }));
    setSelectedElementIds(elementId ? [elementId] : []);
  }, [updateDesignerState]);

  // Copy/Paste functionality
  const copySelectedElements = useCallback(() => {
    const selectedElements = designerState.elements.filter(el => 
      selectedElementIds.includes(el.id)
    );
    setClipboard(selectedElements);
  }, [designerState.elements, selectedElementIds]);

  const pasteElements = useCallback(() => {
    if (clipboard.length === 0) return;

    clipboard.forEach((element, index) => {
      const pastedElement: UIElement = {
        ...element,
        id: `element_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: `${element.name}_paste`,
        position: {
          x: element.position.x + 20 + (index * 10),
          y: element.position.y + 20 + (index * 10)
        }
      };
      
      const command = new AddElementCommand(pastedElement, updateDesignerState);
      executeCommand(command);
    });
  }, [clipboard, executeCommand, updateDesignerState]);

  // Keyboard movement
  const moveSelectedElement = useCallback((direction: 'up' | 'down' | 'left' | 'right', distance: number = 10) => {
    if (!designerState.selectedElementId) return;

    const element = designerState.elements.find(el => el.id === designerState.selectedElementId);
    if (!element) return;

    let newPosition = { ...element.position };
    
    switch (direction) {
      case 'up':
        newPosition.y -= distance;
        break;
      case 'down':
        newPosition.y += distance;
        break;
      case 'left':
        newPosition.x -= distance;
        break;
      case 'right':
        newPosition.x += distance;
        break;
    }

    const command = new MoveElementCommand(
      designerState.selectedElementId,
      element.position,
      newPosition,
      updateDesignerState
    );
    executeCommand(command);
  }, [designerState.selectedElementId, designerState.elements, executeCommand, updateDesignerState]);

  const generateSchema = (): ComponentSchema => {
    return generateComponentSchema(
      designerState.elements,
      designerState.layout,
      {
        name: saveForm.name,
        description: saveForm.description,
        type: saveForm.type
      }
    );
  };

  const handleSave = async () => {
    if (!validateSaveForm()) return;

    try {
      setIsSaving(true);
      setError(null);

      const schema = generateSchema();
      const configString = JSON.stringify(schema);

      if (isEditMode && existingComponent) {
        // Update existing component
        const updateData = new UiComponentUpdateDto({
          name: saveForm.name,
          description: saveForm.description,
          type: saveForm.type,
          configuration: configString
        });

        const response = await api.uiComponents.uiComponents_Update(
          existingComponent.id,
          updateData
        );

        if (response.success) {
          navigate(`/projects/${projectId}/components/${existingComponent.id}`);
        } else {
          setError(response.message || 'Failed to update component');
        }
      } else {
        // Create new component
        const componentData = new UiComponentCreateDto({
          name: saveForm.name,
          description: saveForm.description,
          type: saveForm.type,
          configuration: configString
        });

        const response = await api.uiComponents.uiComponents_Create(
          projectId!,
          project?.currentVersion || '',
          componentData
        );

        if (response.success) {
          navigate(`/projects/${projectId}/components`);
        } else {
          setError(response.message || 'Failed to save component');
        }
      }
    } catch (error) {
      console.error('Failed to save component:', error);
      setError('Failed to save component. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const validateSaveForm = (): boolean => {
    if (!saveForm.name.trim()) {
      setError('Component name is required');
      return false;
    }
    
    if (!saveForm.description.trim()) {
      setError('Component description is required');
      return false;
    }

    if (designerState.elements.length === 0) {
      setError('Component must have at least one element');
      return false;
    }

    return true;
  };

  const handleClearCanvas = () => {
    if (window.confirm('Are you sure you want to clear all elements? This action cannot be undone.')) {
      updateDesignerState(state => ({
        ...state,
        elements: [],
        selectedElementId: null
      }));
    }
  };

  // Keyboard shortcuts
  useKeyboardShortcuts([
    designerShortcuts.undo(undo),
    designerShortcuts.redo(redo),
    designerShortcuts.copy(copySelectedElements),
    designerShortcuts.paste(pasteElements),
    designerShortcuts.duplicate(() => {
      if (designerState.selectedElementId) {
        duplicateElement(designerState.selectedElementId);
      }
    }),
    designerShortcuts.delete(() => {
      if (designerState.selectedElementId) {
        deleteElement(designerState.selectedElementId);
      }
    }),
    designerShortcuts.deleteAlt(() => {
      if (designerState.selectedElementId) {
        deleteElement(designerState.selectedElementId);
      }
    }),
    designerShortcuts.deselect(() => selectElement(null)),
    designerShortcuts.save(handleSave),
    designerShortcuts.moveUp(() => moveSelectedElement('up')),
    designerShortcuts.moveDown(() => moveSelectedElement('down')),
    designerShortcuts.moveLeft(() => moveSelectedElement('left')),
    designerShortcuts.moveRight(() => moveSelectedElement('right')),
    designerShortcuts.moveUpFine(() => moveSelectedElement('up', 1)),
    designerShortcuts.moveDownFine(() => moveSelectedElement('down', 1)),
    designerShortcuts.moveLeftFine(() => moveSelectedElement('left', 1)),
    designerShortcuts.moveRightFine(() => moveSelectedElement('right', 1)),
  ]);

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Project not found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            The project you're looking for doesn't exist or you don't have access to it.
          </p>
          <div className="mt-6">
            <Button variant="outline" onClick={() => navigate('/projects')}>
              Back to Projects
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <button onClick={() => navigate('/projects')} className="hover:text-gray-700 dark:hover:text-gray-200">
                Projects
              </button>
              <span>/</span>
              <button onClick={() => navigate(`/projects/${projectId}`)} className="hover:text-gray-700 dark:hover:text-gray-200">
                {project.name}
              </button>
              <span>/</span>
              <span className="text-gray-900 dark:text-white">Component Designer</span>
            </nav>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Undo/Redo Toolbar */}
            <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-md overflow-hidden">
              <button
                onClick={undo}
                disabled={!undoRedoState.canUndo}
                title={undoRedoState.canUndo ? `Undo: ${getUndoDescription()}` : 'Nothing to undo'}
                className="px-3 py-2 text-sm bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed border-r border-gray-200 dark:border-gray-600 flex items-center space-x-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
                <span className="hidden sm:inline">Undo</span>
              </button>
              
              <button
                onClick={redo}
                disabled={!undoRedoState.canRedo}
                title={undoRedoState.canRedo ? `Redo: ${getRedoDescription()}` : 'Nothing to redo'}
                className="px-3 py-2 text-sm bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10H11a8 8 0 00-8 8v2m18-10l-6-6m6 6l-6 6" />
                </svg>
                <span className="hidden sm:inline">Redo</span>
              </button>
            </div>

            {/* History Status */}
            {undoRedoState.historySize > 0 && (
              <span className="text-xs text-gray-500 dark:text-gray-400 hidden md:inline">
                {undoRedoState.currentIndex + 1}/{undoRedoState.historySize}
              </span>
            )}

            <Button
              variant="outline"
              onClick={() => setShowPreview(!showPreview)}
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              }
            >
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </Button>
            
            <Button
              variant="outline"
              onClick={handleClearCanvas}
              disabled={designerState.elements.length === 0}
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              }
            >
              Clear
            </Button>

            <Button
              variant="primary"
              onClick={() => setShowSaveModal(true)}
              disabled={designerState.elements.length === 0}
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
              }
            >
              Save Component
            </Button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 rounded-md bg-red-50 dark:bg-red-900/20 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
              </div>
              <div className="ml-auto pl-3">
                <button
                  onClick={() => setError(null)}
                  className="text-sm text-red-800 dark:text-red-200 hover:text-red-600 dark:hover:text-red-300"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Element Toolbox */}
        <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
          <ElementToolbox
            onElementSelect={addElement}
          />
        </div>

        {/* Center - Design Canvas */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <DesignCanvas
            elements={designerState.elements}
            selectedElementId={designerState.selectedElementId}
            canvasSize={designerState.canvasSize}
            gridSize={designerState.gridSize}
            showGrid={designerState.showGrid}
            zoom={designerState.zoom}
            onElementAdd={addElement}
            onElementUpdate={updateElement}
            onElementDelete={deleteElement}
            onElementSelect={selectElement}
            onCanvasUpdate={(updates) => updateDesignerState(state => ({ ...state, ...updates }))}
          />
        </div>

        {/* Right Sidebar - Properties/Preview Panel */}
        <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col">
          {/* Panel Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-4" aria-label="Tabs">
              <button
                onClick={() => setActivePanel('properties')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activePanel === 'properties'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                Properties
              </button>
              <button
                onClick={() => setActivePanel('preview')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activePanel === 'preview'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                Preview
              </button>
            </nav>
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-y-auto">
            {activePanel === 'properties' ? (
              <PropertyPanel
                selectedElement={designerState.elements.find(el => el.id === designerState.selectedElementId)}
                elements={designerState.elements}
                onElementUpdate={updateElement}
              />
            ) : (
              <PreviewPanel
                elements={designerState.elements}
                layout={designerState.layout}
              />
            )}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white dark:bg-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Component Preview
              </h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              <PreviewPanel
                elements={designerState.elements}
                layout={designerState.layout}
              />
            </div>
          </div>
        </div>
      )}

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Save Component
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Component Name
                  </label>
                  <input
                    type="text"
                    value={saveForm.name}
                    onChange={(e) => setSaveForm(prev => ({ ...prev, name: e.target.value }))}
                    className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Enter component name..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={saveForm.description}
                    onChange={(e) => setSaveForm(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Enter component description..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Component Type
                  </label>
                  <select
                    value={saveForm.type}
                    onChange={(e) => setSaveForm(prev => ({ ...prev, type: e.target.value as any }))}
                    className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="input_form">Input Form</option>
                    <option value="visualization">Visualization</option>
                    <option value="composite">Composite</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowSaveModal(false)}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSave}
                  loading={isSaving}
                  disabled={isSaving}
                >
                  Save Component
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComponentDesignerPage;