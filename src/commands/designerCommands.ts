// src/commands/designerCommands.ts
import { Command } from '@/hooks/useUndoRedo';
import { UIElement, DesignerState } from '@/types/componentDesigner';

// Base command class for designer operations
abstract class DesignerCommand implements Command {
  abstract description: string;
  abstract execute(): void;
  abstract undo(): void;
}

// Add Element Command
export class AddElementCommand extends DesignerCommand {
  description: string;
  
  constructor(
    private element: UIElement,
    private updateState: (updater: (state: DesignerState) => DesignerState) => void
  ) {
    super();
    this.description = `Add ${element.type.replace('_', ' ')}`;
  }

  execute(): void {
    this.updateState(state => ({
      ...state,
      elements: [...state.elements, this.element],
      selectedElementId: this.element.id
    }));
  }

  undo(): void {
    this.updateState(state => ({
      ...state,
      elements: state.elements.filter(el => el.id !== this.element.id),
      selectedElementId: state.selectedElementId === this.element.id ? null : state.selectedElementId
    }));
  }
}

// Delete Element Command
export class DeleteElementCommand extends DesignerCommand {
  description: string;
  private elementIndex: number = -1;
  private wasSelected: boolean = false;
  private deletedElement: UIElement | null = null;

  constructor(
    private elementId: string,
    private updateState: (updater: (state: DesignerState) => DesignerState) => void,
    private getState: () => DesignerState
  ) {
    super();
    const element = this.getState().elements.find(el => el.id === elementId);
    this.description = `Delete ${element?.type.replace('_', ' ') || 'element'}`;
  }

  execute(): void {
    const state = this.getState();
    const elementIndex = state.elements.findIndex(el => el.id === this.elementId);
    
    if (elementIndex === -1) return;
    
    this.elementIndex = elementIndex;
    this.deletedElement = state.elements[elementIndex];
    this.wasSelected = state.selectedElementId === this.elementId;
    
    this.updateState(currentState => ({
      ...currentState,
      elements: currentState.elements.filter(el => el.id !== this.elementId),
      selectedElementId: this.wasSelected ? null : currentState.selectedElementId
    }));
  }

  undo(): void {
    if (this.elementIndex === -1 || !this.deletedElement) return;
    
    this.updateState(currentState => {
      const newElements = [...currentState.elements];
      newElements.splice(this.elementIndex, 0, this.deletedElement!);
      
      return {
        ...currentState,
        elements: newElements,
        selectedElementId: this.wasSelected ? this.elementId : currentState.selectedElementId
      };
    });
  }
}

// Update Element Command
export class UpdateElementCommand extends DesignerCommand {
  description: string;

  constructor(
    private elementId: string,
    private oldElement: UIElement,
    private newElement: UIElement,
    private updateState: (updater: (state: DesignerState) => DesignerState) => void
  ) {
    super();
    this.description = `Update ${oldElement.type.replace('_', ' ')}`;
  }

  execute(): void {
    this.updateState(state => ({
      ...state,
      elements: state.elements.map(el => 
        el.id === this.elementId ? this.newElement : el
      )
    }));
  }

  undo(): void {
    this.updateState(state => ({
      ...state,
      elements: state.elements.map(el => 
        el.id === this.elementId ? this.oldElement : el
      )
    }));
  }
}

// Move Element Command
export class MoveElementCommand extends DesignerCommand {
  description = 'Move element';

  constructor(
    private elementId: string,
    private oldPosition: { x: number; y: number },
    private newPosition: { x: number; y: number },
    private updateState: (updater: (state: DesignerState) => DesignerState) => void
  ) {
    super();
  }

  execute(): void {
    this.updateState(state => ({
      ...state,
      elements: state.elements.map(el => 
        el.id === this.elementId 
          ? { ...el, position: this.newPosition }
          : el
      )
    }));
  }

  undo(): void {
    this.updateState(state => ({
      ...state,
      elements: state.elements.map(el => 
        el.id === this.elementId 
          ? { ...el, position: this.oldPosition }
          : el
      )
    }));
  }
}

// Resize Element Command
export class ResizeElementCommand extends DesignerCommand {
  description = 'Resize element';

  constructor(
    private elementId: string,
    private oldSize: { width: number; height: number },
    private newSize: { width: number; height: number },
    private updateState: (updater: (state: DesignerState) => DesignerState) => void
  ) {
    super();
  }

  execute(): void {
    this.updateState(state => ({
      ...state,
      elements: state.elements.map(el => 
        el.id === this.elementId 
          ? { ...el, size: this.newSize }
          : el
      )
    }));
  }

  undo(): void {
    this.updateState(state => ({
      ...state,
      elements: state.elements.map(el => 
        el.id === this.elementId 
          ? { ...el, size: this.oldSize }
          : el
      )
    }));
  }
}

// Duplicate Element Command
export class DuplicateElementCommand extends DesignerCommand {
  description: string;

  constructor(
    private originalElement: UIElement,
    private duplicatedElement: UIElement,
    private updateState: (updater: (state: DesignerState) => DesignerState) => void
  ) {
    super();
    this.description = `Duplicate ${originalElement.type.replace('_', ' ')}`;
  }

  execute(): void {
    this.updateState(state => ({
      ...state,
      elements: [...state.elements, this.duplicatedElement],
      selectedElementId: this.duplicatedElement.id
    }));
  }

  undo(): void {
    this.updateState(state => ({
      ...state,
      elements: state.elements.filter(el => el.id !== this.duplicatedElement.id),
      selectedElementId: state.selectedElementId === this.duplicatedElement.id 
        ? this.originalElement.id 
        : state.selectedElementId
    }));
  }
}