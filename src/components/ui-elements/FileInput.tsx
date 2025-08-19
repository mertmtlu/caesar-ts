import React, { useState, useCallback, useRef } from 'react';
import { FileInputConfig } from '@/types/componentDesigner';
import { api } from '@/api/api';

export interface FileData {
  file: File;
  id: string;
  name: string;
  size: number;
  type: string;
  uploading?: boolean;
  uploaded?: boolean;
  error?: string;
  attachmentId?: string;
  storagePath?: string;
  checksum?: string;
  filename?: string;
  base64Content?: string;
}

interface FileInputProps {
  config: FileInputConfig;
  value?: FileData | FileData[];
  onChange: (files: FileData | FileData[] | null) => void;
  onError?: (error: string) => void;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  helpText?: string;
}

const FileInput: React.FC<FileInputProps> = ({
  config,
  value,
  onChange,
  onError,
  disabled = false,
  className = '',
  placeholder = 'Select or drop files here...',
  label,
  required = false,
  hasError = false,
  errorMessage,
  helpText
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = useCallback((file: File): string | null => {
    const errors: string[] = [];

    // Check file size
    if (config.maxFileSize && file.size > config.maxFileSize) {
      const maxSizeMB = (config.maxFileSize / (1024 * 1024)).toFixed(1);
      errors.push(`File size must be less than ${maxSizeMB}MB`);
    }

    // Check file type
    if (config.acceptedFileTypes && config.acceptedFileTypes.length > 0 && !config.acceptedFileTypes.includes('*/*')) {
      const isValidType = config.acceptedFileTypes.some(acceptedType => {
        if (acceptedType.includes('*')) {
          const baseMimeType = acceptedType.split('/')[0];
          return file.type.startsWith(baseMimeType + '/');
        } else if (acceptedType.startsWith('.')) {
          return file.name.toLowerCase().endsWith(acceptedType.toLowerCase());
        } else {
          return file.type === acceptedType;
        }
      });

      if (!isValidType) {
        errors.push(`File type ${file.type || 'unknown'} is not allowed`);
      }
    }

    return errors.length > 0 ? errors.join(', ') : null;
  }, [config.maxFileSize, config.acceptedFileTypes]);

  const uploadFile = useCallback(async (fileData: FileData): Promise<FileData> => {
    try {
      // Convert file to base64 once for all operations
      const fileContent = await fileToBase64(fileData.file);
      console.log('Base64 content:', fileContent); // Add this line

      // Step 1: Validate file before upload
      const validationResponse = await api.files.files_ValidateFile({
        fileName: fileData.file.name,
        content: fileContent,
        contentType: fileData.file.type
      });

      if (!validationResponse.success || !validationResponse.data?.isValid) {
        const errors = validationResponse.data?.errors || ['File validation failed'];
        const warnings = validationResponse.data?.warnings || [];
        const allMessages = [...errors, ...warnings];
        throw new Error(allMessages.join(', '));
      }

      // Step 2: Calculate file hash for integrity
      const hashResponse = await api.files.files_CalculateFileHash(fileContent);

      const fileHash = hashResponse.success && hashResponse.data ? hashResponse.data : undefined;

      // Step 3: Store file with base64 content and filename
      const uploadedFile: FileData = {
        ...fileData,
        uploading: false,
        uploaded: true,
        filename: fileData.file.name,
        base64Content: fileContent,
        // Add hash for security verification
        ...(fileHash && { checksum: fileHash })
      };

      return uploadedFile;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      return {
        ...fileData,
        uploading: false,
        uploaded: false,
        error: errorMessage
      };
    }
  }, []);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64Content = result.split(',')[1]; // Remove data URL prefix
        // Ensure UTF-8 encoding by creating a proper base64 string
        const utf8EncodedContent = btoa(unescape(encodeURIComponent(atob(base64Content))));
        resolve(utf8EncodedContent);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const createFileData = useCallback((file: File): FileData => {
    return {
      file,
      id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: file.name,
      size: file.size,
      type: file.type,
      uploading: false,
      uploaded: false
    };
  }, []);

  const handleFiles = useCallback(async (files: FileList) => {
    const fileArray = Array.from(files);
    const errors: string[] = [];

    // Validate each file
    const validatedFiles: FileData[] = [];
    for (const file of fileArray) {
      const validationError = validateFile(file);
      if (validationError) {
        errors.push(`${file.name}: ${validationError}`);
      } else {
        validatedFiles.push(createFileData(file));
      }
    }

    if (errors.length > 0) {
      setValidationErrors(errors);
      onError?.(errors.join('\n'));
      return;
    }

    setValidationErrors([]);

    // Handle multiple vs single files
    if (!config.multiple && validatedFiles.length > 1) {
      setValidationErrors(['Only one file can be selected']);
      onError?.('Only one file can be selected');
      return;
    }

    // Always process files to include base64 content
    const processPromises = validatedFiles.map(async (fileData) => {
      const fileContent = await fileToBase64(fileData.file);
      return {
        ...fileData,
        filename: fileData.file.name,
        base64Content: fileContent
      };
    });

    const processedFiles = await Promise.all(processPromises);
    
    if (config.multiple) {
      onChange(processedFiles);
    } else {
      onChange(processedFiles[0] || null);
    }
  }, [config.multiple, config.uploadOnSelect, validateFile, createFileData, uploadFile, onChange, onError]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled && config.dragAndDrop) {
      setDragActive(true);
    }
  }, [disabled, config.dragAndDrop]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);

    if (!disabled && config.dragAndDrop && e.dataTransfer?.files) {
      handleFiles(e.dataTransfer.files);
    }
  }, [disabled, config.dragAndDrop, handleFiles]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  }, [handleFiles]);

  const handleClick = useCallback(() => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [disabled]);

  const removeFile = useCallback((fileId: string) => {
    if (config.multiple && Array.isArray(value)) {
      const updatedFiles = value.filter(f => f.id !== fileId);
      onChange(updatedFiles.length > 0 ? updatedFiles : null);
    } else {
      onChange(null);
    }
  }, [config.multiple, value, onChange]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const acceptAttribute = config.acceptedFileTypes?.join(',') || '';
  const currentFiles: FileData[] = config.multiple 
    ? (Array.isArray(value) ? value : []) 
    : (value && !Array.isArray(value) ? [value] : []);

  const baseClasses = [
    'relative border-2 border-dashed rounded-lg transition-colors duration-200 cursor-pointer',
    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    disabled ? 'opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-800' : 'hover:bg-gray-50 dark:hover:bg-gray-700',
    dragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 
    hasError || validationErrors.length > 0 ? 'border-red-300 dark:border-red-600' : 
    'border-gray-300 dark:border-gray-600',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div
        className={baseClasses}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        tabIndex={disabled ? -1 : 0}
        role="button"
        aria-label={`File upload area. ${placeholder}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={config.multiple}
          accept={acceptAttribute}
          onChange={handleFileInputChange}
          className="sr-only"
          disabled={disabled}
        />

        <div className="p-6 text-center">
          <div className="text-4xl mb-2">📁</div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {placeholder}
          </p>
          {config.dragAndDrop && (
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Click to browse or drag and drop files
            </p>
          )}
          {config.maxFileSize && (
            <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">
              Max file size: {formatFileSize(config.maxFileSize)}
            </p>
          )}
        </div>
      </div>

      {/* File Preview */}
      {config.showPreview && currentFiles.length > 0 && (
        <div className="space-y-2">
          {currentFiles.map((fileData) => (
            <div key={fileData.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="flex-shrink-0">
                  {fileData.uploaded ? '✅' : fileData.uploading ? '⏳' : fileData.error ? '❌' : '📄'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {fileData.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatFileSize(fileData.size)} • {fileData.type || 'Unknown type'}
                  </p>
                  {fileData.error && (
                    <p className="text-xs text-red-600 dark:text-red-400">{fileData.error}</p>
                  )}
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(fileData.id);
                }}
                className="ml-3 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                disabled={disabled}
                aria-label={`Remove ${fileData.name}`}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Error Messages */}
      {(hasError && errorMessage) && (
        <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
      )}
      
      {validationErrors.length > 0 && (
        <div className="space-y-1">
          {validationErrors.map((error, index) => (
            <p key={index} className="text-sm text-red-600 dark:text-red-400">{error}</p>
          ))}
        </div>
      )}

      {/* Help Text */}
      {helpText && (
        <p className="text-sm text-gray-500 dark:text-gray-400">{helpText}</p>
      )}
    </div>
  );
};

export default FileInput;