import { useState, useCallback } from 'react';
import { UIElement } from '@/types/componentDesigner';

export type Point = { lat: number; lng: number };

interface UseMapSelectionProps {
  element: UIElement;
  initialValue?: Point[];
  onChange?: (value: Point[]) => void;
}

interface UseMapSelectionReturn {
  value: Point[];
  handlePointsChange: (newPoints: Point[]) => void;
  formatCoordinateDisplay: () => string[];
  hasPoints: boolean;
  pointCount: number;
  clearPoints: () => void;
  isMaxPointsReached: boolean;
}

export const useMapSelection = ({
  element,
  initialValue = [],
  onChange
}: UseMapSelectionProps): UseMapSelectionReturn => {
  const [value, setValue] = useState<Point[]>(initialValue);
  
  const handlePointsChange = useCallback((newPoints: Point[]) => {
    setValue(newPoints);
    onChange?.(newPoints);
  }, [onChange]);

  const formatCoordinateDisplay = useCallback((): string[] => {
    return value.map((point, index) => 
      `Point ${index + 1}: ${point.lat.toFixed(4)}, ${point.lng.toFixed(4)}`
    );
  }, [value]);

  const clearPoints = useCallback(() => {
    handlePointsChange([]);
  }, [handlePointsChange]);

  const hasPoints = value.length > 0;
  const pointCount = value.length;
  
  const isMaxPointsReached = Boolean(
    element.mapConfig?.selectionMode === 'multiple' && 
    element.mapConfig?.maxPoints && 
    value.length >= element.mapConfig.maxPoints
  );

  return {
    value,
    handlePointsChange,
    formatCoordinateDisplay,
    hasPoints,
    pointCount,
    clearPoints,
    isMaxPointsReached
  };
};