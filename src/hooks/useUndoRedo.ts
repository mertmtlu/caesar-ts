// src/hooks/useUndoRedo.ts
import { useState, useCallback, useRef } from 'react';

export interface Command {
  execute(): void;
  undo(): void;
  description: string;
}

export interface UndoRedoState {
  canUndo: boolean;
  canRedo: boolean;
  historySize: number;
  currentIndex: number;
}

export function useUndoRedo(maxHistorySize: number = 50) {
  const [history, setHistory] = useState<Command[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const isExecutingRef = useRef(false);

  const executeCommand = useCallback((command: Command) => {
    if (isExecutingRef.current) return;
    
    isExecutingRef.current = true;
    command.execute();
    isExecutingRef.current = false;

    setHistory(prev => {
      // Remove any commands after current index (when adding new command after undo)
      const newHistory = prev.slice(0, currentIndex + 1);
      newHistory.push(command);
      
      // Limit history size
      if (newHistory.length > maxHistorySize) {
        newHistory.shift();
        setCurrentIndex(prev => Math.max(0, prev));
        return newHistory;
      }
      
      setCurrentIndex(newHistory.length - 1);
      return newHistory;
    });
  }, [currentIndex, maxHistorySize]);

  const undo = useCallback(() => {
    if (currentIndex < 0 || currentIndex >= history.length) return;
    
    isExecutingRef.current = true;
    const command = history[currentIndex];
    command.undo();
    isExecutingRef.current = false;
    
    setCurrentIndex(prev => prev - 1);
  }, [currentIndex, history]);

  const redo = useCallback(() => {
    if (currentIndex + 1 >= history.length) return;
    
    const nextIndex = currentIndex + 1;
    isExecutingRef.current = true;
    const command = history[nextIndex];
    command.execute();
    isExecutingRef.current = false;
    
    setCurrentIndex(nextIndex);
  }, [currentIndex, history]);

  const clear = useCallback(() => {
    setHistory([]);
    setCurrentIndex(-1);
  }, []);

  const canUndo = currentIndex >= 0;
  const canRedo = currentIndex < history.length - 1;

  const state: UndoRedoState = {
    canUndo,
    canRedo,
    historySize: history.length,
    currentIndex
  };

  // Get the description of the command that would be undone/redone
  const getUndoDescription = useCallback(() => {
    if (!canUndo) return null;
    return history[currentIndex]?.description || 'Unknown action';
  }, [canUndo, currentIndex, history]);

  const getRedoDescription = useCallback(() => {
    if (!canRedo) return null;
    return history[currentIndex + 1]?.description || 'Unknown action';
  }, [canRedo, currentIndex, history]);

  return {
    executeCommand,
    undo,
    redo,
    clear,
    state,
    getUndoDescription,
    getRedoDescription,
    isExecuting: isExecutingRef.current
  };
}

// Utility function to create commands for common operations
export const createCommand = (
  description: string,
  executeAction: () => void,
  undoAction: () => void
): Command => ({
  description,
  execute: executeAction,
  undo: undoAction
});