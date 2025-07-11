// src/hooks/useKeyboardShortcuts.ts
import { useEffect, useCallback } from 'react';

export interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  metaKey?: boolean;
  action: () => void;
  description: string;
  preventDefault?: boolean;
}

export function useKeyboardShortcuts(
  shortcuts: KeyboardShortcut[],
  enabled: boolean = true
) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled) return;

    // Don't trigger shortcuts when user is typing in input fields
    const target = event.target as HTMLElement;
    if (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.contentEditable === 'true'
    ) {
      return;
    }

    const matchingShortcut = shortcuts.find(shortcut => {
      return (
        event.key.toLowerCase() === shortcut.key.toLowerCase() &&
        !!event.ctrlKey === !!shortcut.ctrlKey &&
        !!event.altKey === !!shortcut.altKey &&
        !!event.shiftKey === !!shortcut.shiftKey &&
        !!event.metaKey === !!shortcut.metaKey
      );
    });

    if (matchingShortcut) {
      if (matchingShortcut.preventDefault !== false) {
        event.preventDefault();
        event.stopPropagation();
      }
      matchingShortcut.action();
    }
  }, [shortcuts, enabled]);

  useEffect(() => {
    if (!enabled) return;

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, enabled]);

  return {
    shortcuts
  };
}

// Predefined shortcut combinations for common actions
export const createShortcut = (
  key: string,
  action: () => void,
  description: string,
  modifiers: {
    ctrl?: boolean;
    alt?: boolean;
    shift?: boolean;
    meta?: boolean;
  } = {}
): KeyboardShortcut => ({
  key,
  ctrlKey: modifiers.ctrl,
  altKey: modifiers.alt,
  shiftKey: modifiers.shift,
  metaKey: modifiers.meta,
  action,
  description
});

// Common shortcuts factory
export const designerShortcuts = {
  undo: (action: () => void) => 
    createShortcut('z', action, 'Undo', { ctrl: true }),
  
  redo: (action: () => void) => 
    createShortcut('y', action, 'Redo', { ctrl: true }),
  
  copy: (action: () => void) => 
    createShortcut('c', action, 'Copy', { ctrl: true }),
  
  paste: (action: () => void) => 
    createShortcut('v', action, 'Paste', { ctrl: true }),
  
  duplicate: (action: () => void) => 
    createShortcut('d', action, 'Duplicate', { ctrl: true }),
  
  delete: (action: () => void) => 
    createShortcut('Delete', action, 'Delete'),
  
  deleteAlt: (action: () => void) => 
    createShortcut('Backspace', action, 'Delete'),
  
  selectAll: (action: () => void) => 
    createShortcut('a', action, 'Select All', { ctrl: true }),
  
  deselect: (action: () => void) => 
    createShortcut('Escape', action, 'Deselect'),
  
  save: (action: () => void) => 
    createShortcut('s', action, 'Save', { ctrl: true }),

  // Arrow key movements
  moveUp: (action: () => void) => 
    createShortcut('ArrowUp', action, 'Move Up'),
  
  moveDown: (action: () => void) => 
    createShortcut('ArrowDown', action, 'Move Down'),
  
  moveLeft: (action: () => void) => 
    createShortcut('ArrowLeft', action, 'Move Left'),
  
  moveRight: (action: () => void) => 
    createShortcut('ArrowRight', action, 'Move Right'),

  // Fine movement (with Shift)
  moveUpFine: (action: () => void) => 
    createShortcut('ArrowUp', action, 'Move Up (Fine)', { shift: true }),
  
  moveDownFine: (action: () => void) => 
    createShortcut('ArrowDown', action, 'Move Down (Fine)', { shift: true }),
  
  moveLeftFine: (action: () => void) => 
    createShortcut('ArrowLeft', action, 'Move Left (Fine)', { shift: true }),
  
  moveRightFine: (action: () => void) => 
    createShortcut('ArrowRight', action, 'Move Right (Fine)', { shift: true }),
};