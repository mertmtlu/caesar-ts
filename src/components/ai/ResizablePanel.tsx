import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GripVertical } from 'lucide-react';

interface ResizablePanelProps {
  children: React.ReactNode;
  defaultWidth?: number;
  minWidth?: number;
  maxWidth?: number;
  storageKey?: string;
}

export const ResizablePanel: React.FC<ResizablePanelProps> = ({
  children,
  defaultWidth = 384,
  minWidth = 300,
  maxWidth = 800,
  storageKey = 'ai-panel-width',
}) => {
  const [width, setWidth] = useState<number>(() => {
    // Load width from localStorage if available
    const savedWidth = localStorage.getItem(storageKey);
    if (savedWidth) {
      const parsed = parseInt(savedWidth, 10);
      if (!isNaN(parsed) && parsed >= minWidth && parsed <= maxWidth) {
        return parsed;
      }
    }
    return defaultWidth;
  });

  const [isResizing, setIsResizing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing || !panelRef.current) return;

      const panelRect = panelRef.current.getBoundingClientRect();
      const newWidth = panelRect.right - e.clientX;

      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setWidth(newWidth);
      }
    },
    [isResizing, minWidth, maxWidth]
  );

  const handleMouseUp = useCallback(() => {
    if (isResizing) {
      setIsResizing(false);
      // Save width to localStorage
      localStorage.setItem(storageKey, width.toString());
    }
  }, [isResizing, width, storageKey]);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      // Prevent text selection while resizing
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'ew-resize';

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
      };
    }
  }, [isResizing, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={panelRef}
      className="relative flex h-full"
      style={{ width: `${width}px` }}
    >
      {/* Resize Handle */}
      <div
        onMouseDown={handleMouseDown}
        className={`
          absolute left-0 top-0 bottom-0 w-1 cursor-ew-resize z-10
          hover:bg-blue-500 transition-colors
          ${isResizing ? 'bg-blue-500' : 'bg-transparent'}
        `}
      >
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-gray-300 dark:bg-gray-600 rounded p-0.5 opacity-0 hover:opacity-100 transition-opacity">
          <GripVertical className="h-4 w-4 text-gray-600 dark:text-gray-300" />
        </div>
      </div>

      {/* Panel Content */}
      <div className="flex-1 pl-1">
        {children}
      </div>
    </div>
  );
};
