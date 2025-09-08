import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { UIElement } from '@/types/componentDesigner';

// Fix for default marker icon issue with modern bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export type Point = { lat: number; lng: number };
export type NamedPoint = { id: string; name: string; lat: number; lng: number };
export type PointsData = NamedPoint[];

interface InteractiveMapProps {
  element: UIElement;
  value: PointsData;
  onChange: (newValue: PointsData) => void;
  className?: string;
  style?: React.CSSProperties;
}

interface CoordinateDisplayProps {
  points: PointsData;
  onRemovePoint: (index: number) => void;
  onClearAll: () => void;
  onUpdatePointName: (index: number, name: string) => void;
  maxPoints?: number;
  selectionMode: 'single' | 'multiple';
}

interface MapEventsHandlerProps {
  element: UIElement;
  value: PointsData;
  onChange: (newValue: PointsData) => void;
}

const MapEventsHandler: React.FC<MapEventsHandlerProps> = ({ element, value, onChange }) => {
  const { mapConfig } = element;
  
  useMapEvents({
    click(e) {
      if (element.disabled || !mapConfig) return;
      
      // Check if max points reached for multiple mode
      if (mapConfig.selectionMode === 'multiple' && 
          mapConfig.maxPoints && 
          value.length >= mapConfig.maxPoints) {
        return; // Don't add more points
      }
      
      // Generate unique ID for the point
      const timestamp = Date.now();
      const pointNumber = (value?.length || 0) + 1;
      
      const newPoint: NamedPoint = {
        id: `point_${timestamp}`,
        name: `Point ${pointNumber}`,
        lat: e.latlng.lat,
        lng: e.latlng.lng
      };
      
      let newPoints: NamedPoint[] = [];

      if (mapConfig.selectionMode === 'single') {
        newPoints = [newPoint];
      } else {
        newPoints = [...(value || []), newPoint];
      }
      onChange(newPoints);
    },
  });
  
  return null;
};

const CoordinateDisplay: React.FC<CoordinateDisplayProps> = ({ 
  points, 
  onRemovePoint, 
  onClearAll, 
  onUpdatePointName,
  maxPoints, 
  selectionMode 
}) => {
  if (!points || points.length === 0) {
    return (
      <div className="p-3 text-center text-gray-500 dark:text-gray-400">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm">
            Click on the map to {selectionMode === 'single' ? 'select a location' : 'add points'}
          </span>
        </div>
        {selectionMode === 'multiple' && maxPoints && (
          <div className="text-xs text-gray-400">
            Maximum {maxPoints} point{maxPoints !== 1 ? 's' : ''} allowed
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-3 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {selectionMode === 'single' ? 'Selected Location' : `Points (${points.length}${maxPoints ? `/${maxPoints}` : ''})`}
          </span>
          {selectionMode === 'multiple' && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              Multiple
            </span>
          )}
        </div>
        {points.length > 1 && (
          <button
            onClick={onClearAll}
            className="text-xs text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center space-x-1 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded px-2 py-1"
            title="Clear all points"
            aria-label={`Clear all ${points.length} selected points`}
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>Clear All</span>
          </button>
        )}
      </div>
      
      <div className="space-y-1.5 max-h-64 overflow-y-auto">
        {points.map((point, index) => (
          <div key={point.id} className="bg-gray-100 dark:bg-gray-800 rounded p-2 space-y-2">
            {/* Point Name Input */}
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
              <input
                type="text"
                value={point.name}
                onChange={(e) => onUpdatePointName(index, e.target.value)}
                className="flex-1 text-sm font-medium bg-transparent border-none outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400"
                placeholder="Point name..."
                onBlur={(e) => {
                  if (!e.target.value.trim()) {
                    onUpdatePointName(index, `Point ${index + 1}`);
                  }
                }}
              />
              <button
                onClick={() => onRemovePoint(index)}
                className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 p-0.5 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded"
                title={`Remove ${point.name}`}
                aria-label={`Remove point ${point.name}`}
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Coordinates */}
            <div className="text-xs font-mono text-gray-600 dark:text-gray-400 ml-4">
              {point.lat.toFixed(4)}, {point.lng.toFixed(4)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const InteractiveMap: React.FC<InteractiveMapProps> = ({ 
  element, 
  value, 
  onChange, 
  className = '',
  style = { height: '100%', width: '100%', borderRadius: 'inherit' }
}) => {
  const { mapConfig } = element;
  const [showSelectionHint, setShowSelectionHint] = useState(false);
  
  if (!mapConfig) {
    return (
      <div className={`flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-700 rounded-md ${className}`}>
        <span className="text-gray-500 dark:text-gray-400">Map configuration is missing</span>
      </div>
    );
  }
  
  const center: [number, number] = [mapConfig.defaultCenter.lat, mapConfig.defaultCenter.lng];

  const handleRemovePoint = (index: number) => {
    const newPoints = value.filter((_, i) => i !== index);
    onChange(newPoints);
  };

  const handleClearAll = () => {
    onChange([]);
  };

  const handleUpdatePointName = (index: number, newName: string) => {
    const newPoints = value.map((point, i) => 
      i === index ? { ...point, name: newName } : point
    );
    onChange(newPoints);
  };

  const isMaxPointsReached = mapConfig.selectionMode === 'multiple' && 
                             mapConfig.maxPoints && 
                             value.length >= mapConfig.maxPoints;

  return (
    <div className={`flex ${className}`} style={style}>
      <div 
        className="flex-1 relative"
        onMouseEnter={() => setShowSelectionHint(true)}
        onMouseLeave={() => setShowSelectionHint(false)}
      >
        <MapContainer
          center={center}
          zoom={mapConfig.defaultZoom}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%', borderRadius: 'inherit' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapEventsHandler element={element} value={value} onChange={onChange} />
          {(value || []).map((point, index) => (
            <Marker key={point.id} position={[point.lat, point.lng]}>
              <Popup>
                <div className="text-center min-w-[150px]">
                  <div className="font-medium mb-2">{point.name}</div>
                  <div className="text-sm font-mono text-gray-600 mb-2">
                    {point.lat.toFixed(4)}, {point.lng.toFixed(4)}
                  </div>
                  <button
                    onClick={() => handleRemovePoint(index)}
                    className="text-xs text-red-600 hover:text-red-700 flex items-center space-x-1 mx-auto"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span>Remove {point.name}</span>
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        
        {/* Selection hint overlay */}
        {showSelectionHint && isMaxPointsReached && (
          <div className="absolute top-2 left-2 right-2 z-[1000] bg-yellow-100 dark:bg-yellow-900/80 text-yellow-800 dark:text-yellow-200 px-3 py-2 rounded-md text-sm flex items-center space-x-2">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span>Maximum {mapConfig.maxPoints} points reached. Remove a point to add more.</span>
          </div>
        )}
      </div>
      
      <div className="w-80 border-l border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900" role="region" aria-label="Selected coordinates">
        <CoordinateDisplay
          points={value || []}
          onRemovePoint={handleRemovePoint}
          onClearAll={handleClearAll}
          onUpdatePointName={handleUpdatePointName}
          maxPoints={mapConfig.maxPoints}
          selectionMode={mapConfig.selectionMode}
        />
      </div>
    </div>
  );
};

export default InteractiveMap;