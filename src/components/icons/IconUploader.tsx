import React, { useState, useRef } from 'react';
import Button from '@/components/common/Button';

interface IconUploaderProps {
  onIconSelect: (file: File, dataUrl: string) => void;
  onError?: (error: string) => void;
  isLoading?: boolean;
  maxSizeKB?: number;
  acceptedTypes?: string[];
  className?: string;
}

const IconUploader: React.FC<IconUploaderProps> = ({
  onIconSelect,
  onError,
  isLoading = false,
  maxSizeKB = 1024, // 1MB default
  acceptedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/svg+xml'],
  className = ''
}) => {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (!acceptedTypes.includes(file.type)) {
      return `File type not supported. Please use: ${acceptedTypes.map(type => type.split('/')[1]).join(', ')}`;
    }

    if (file.size > maxSizeKB * 1024) {
      return `File size must be less than ${maxSizeKB}KB`;
    }

    return null;
  };

  const processFile = (file: File) => {
    const error = validateFile(file);
    if (error) {
      onError?.(error);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      onIconSelect(file, dataUrl);
    };
    reader.onerror = () => {
      onError?.('Failed to read file');
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes.join(',')}
        onChange={handleFileChange}
        className="hidden"
        disabled={isLoading}
      />
      
      <div
        className={`
          border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${dragOver 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          }
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={!isLoading ? openFileDialog : undefined}
      >
        <div className="flex flex-col items-center space-y-2">
          <svg
            className={`w-12 h-12 ${dragOver ? 'text-blue-500' : 'text-gray-400'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p className="font-medium">
              {isLoading ? 'Uploading...' : 'Click to upload or drag and drop'}
            </p>
            <p className="text-xs mt-1">
              {acceptedTypes.map(type => type.split('/')[1]).join(', ')} up to {maxSizeKB}KB
            </p>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            disabled={isLoading}
            onClick={(e) => {
              e.stopPropagation();
              openFileDialog();
            }}
          >
            {isLoading ? 'Uploading...' : 'Choose File'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IconUploader;