// src/components/designer/PreviewPanel.tsx
import React, { useState } from 'react';
import { UIElement, LayoutConfig, ValidationRule } from '@/types/componentDesigner';
import Button from '@/components/common/Button';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// --- CHANGE: Import image assets directly using ES Modules ---
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for default marker icon issue with modern bundlers.
// This ensures the marker icons are loaded correctly.
delete (L.Icon.Default.prototype as any)._getIconUrl;

// --- CHANGE: Use imported variables instead of require ---
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});


type Point = { lat: number; lng: number };

// A new component to handle map interactions logic
const InteractiveMap: React.FC<{
  element: UIElement;
  value: Point[];
  onChange: (newValue: Point[]) => void;
}> = ({ element, value, onChange }) => {
  const { mapConfig } = element;
  if (!mapConfig) return <div>Map configuration is missing.</div>;
  
  const center: [number, number] = [mapConfig.defaultCenter.lat, mapConfig.defaultCenter.lng];

  const MapEventsHandler = () => {
    useMapEvents({
      click(e) {
        if (element.disabled) return;
        const newPoint = { lat: e.latlng.lat, lng: e.latlng.lng };
        let newPoints = [];

        if (mapConfig.selectionMode === 'single') {
          newPoints = [newPoint];
        } else {
          newPoints = [...(value || []), newPoint]; // Ensure value is an array
          if (mapConfig.maxPoints && newPoints.length > mapConfig.maxPoints) {
            newPoints.shift(); // Remove the oldest point to enforce max
          }
        }
        onChange(newPoints);
      },
    });
    return null;
  };

  return (
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
      <MapEventsHandler />
      {(value || []).map((point, index) => (
        <Marker key={index} position={[point.lat, point.lng]} />
      ))}
    </MapContainer>
  );
};

interface PreviewPanelProps {
  elements: UIElement[];
  layout: LayoutConfig;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ elements, layout }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showJSON, setShowJSON] = useState(false);

  const handleInputChange = (elementName: string, value: any) => {
    setFormData(prev => ({ ...prev, [elementName]: value }));
    if (errors[elementName]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[elementName];
        return newErrors;
      });
    }
  };

  const validateRule = (rule: ValidationRule, value: any): boolean => {
    switch (rule.type) {
      case 'required':
        return !value || (typeof value === 'string' && !value.trim()) || (Array.isArray(value) && value.length === 0);
      case 'minLength':
        return typeof value === 'string' && value.length < (rule.value as number);
      case 'maxLength':
        return typeof value === 'string' && value.length > (rule.value as number);
      case 'pattern':
        if (typeof value !== 'string' || !rule.value) return false;
        return !new RegExp(rule.value as string).test(value);
      default:
        return false;
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    elements.forEach(element => {
      const value = formData[element.name];
      if (element.required && (!value || (Array.isArray(value) && value.length === 0) || (typeof value === 'string' && !value.trim()))) {
        newErrors[element.name] = `${element.label} is required.`;
        return;
      }
      if (element.validation && value) {
        for (const rule of element.validation) {
          if (validateRule(rule, value)) {
            newErrors[element.name] = rule.message;
            break; 
          }
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form Submitted Data:', formData);
      alert('Form submitted successfully! Check console for data.');
    }
  };

  const handleReset = () => {
    setFormData({});
    setErrors({});
  };

  const renderElement = (element: UIElement) => {
    const value = formData[element.name] || element.defaultValue || '';
    const error = errors[element.name];
    const hasError = !!error;

    const commonWrapper = (key: string, className: string, children: React.ReactNode, positioningStyle: React.CSSProperties) => (
        <div key={key} className={className} style={positioningStyle}>
            {children}
            {hasError && <p className={`text-xs text-red-600 ${layout.type === 'absolute' ? 'absolute -bottom-5 left-0' : 'mt-1'}`}>{error}</p>}
            {element.helpText && layout.type !== 'absolute' && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{element.helpText}</p>}
        </div>
    );
    
    // For simplicity, I am only showing the map_input case.
    // You should merge this with your existing `renderElement` function.
    if (element.type === 'map_input') {
      const positioningStyle = layout.type === 'absolute' ? { position: 'absolute' as const, left: element.position.x, top: element.position.y, width: element.size.width, height: element.size.height } : {};
      
      return commonWrapper(element.id, "relative flex flex-col", (
        <>
          {layout.type !== 'absolute' && (
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
          <div className={`w-full h-full flex flex-col border rounded-md overflow-hidden ${hasError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}>
            <div className="flex-1">
              <InteractiveMap
                element={element}
                value={formData[element.name] || []}
                onChange={(newValue) => handleInputChange(element.name, newValue)}
              />
            </div>
            <div className="p-2 text-xs bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 max-h-20 overflow-y-auto">
              {(formData[element.name] || []).length > 0 ? (
                (formData[element.name] || []).map((p: Point, i: number) => (
                  <div key={i}>
                    Point {i + 1}: {p.lat.toFixed(4)}, {p.lng.toFixed(4)}
                  </div>
                ))
              ) : (
                'Click on the map to select points.'
              )}
            </div>
          </div>
        </>
      ), positioningStyle);
    }

    // You should have your other element rendering logic (text_input, etc.) here.
    // For this example, I'll just return a placeholder.
    const positioningStyle = layout.type === 'absolute' ? { position: 'absolute' as const, left: element.position.x, top: element.position.y, width: element.size.width, height: element.size.height } : {};
    return (
        <div key={element.id} style={positioningStyle} className="p-2 bg-gray-100 dark:bg-gray-700 rounded-md">
            <p className="text-sm text-gray-500 dark:text-gray-400">
                Preview for {element.type}
            </p>
        </div>
    );
  };

  const getLayoutStyles = (): React.CSSProperties => {
    if (layout.type === 'absolute') {
      return { position: 'relative', width: '800px', height: '600px', margin: '0 auto' };
    }
    return { display: 'grid', gridTemplateColumns: `repeat(${layout.columns || 1}, 1fr)`, gap: layout.spacing || 16, padding: layout.padding || 16 };
  };

  if (elements.length === 0) {
    return (
      <div className="p-6 text-center">
        <h3 className="mt-2 text-sm font-medium">No Preview Available</h3>
        <p className="mt-1 text-sm text-gray-500">Add elements to the canvas to see the preview.</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Component Preview</h3>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => setShowJSON(!showJSON)}>{showJSON ? 'Hide JSON' : 'Show JSON'}</Button>
            <Button variant="outline" size="sm" onClick={handleReset}>Reset</Button>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {showJSON ? (
          <div className="p-4">
            <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded-md overflow-x-auto">
              {JSON.stringify({ elements, layout, formData }, (key, value) => 
                (typeof value === 'object' && value !== null && value.lat && value.lng) 
                ? { lat: Number(value.lat.toFixed(5)), lng: Number(value.lng.toFixed(5)) } 
                : value, 2)}
            </pre>
          </div>
        ) : (
          <div className="p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div style={getLayoutStyles()} className={layout.type === 'absolute' ? 'bg-white dark:bg-gray-900 border rounded-lg shadow-sm' : ''}>
                {elements.map(renderElement)}
              </div>
              {layout.type !== 'absolute' && (
                <div className="flex items-center justify-end space-x-2 pt-4 border-t">
                  <Button type="submit" variant="primary">Submit</Button>
                  <Button type="button" variant="outline" onClick={handleReset}>Reset</Button>
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;