import React, { useState, useCallback } from 'react';
import { api } from '@/api/api';
import { WorkflowImportDto, WorkflowDetailDto } from '@/api/types';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

interface WorkflowImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess?: (workflow: WorkflowDetailDto) => void;
}

const WorkflowImportModal: React.FC<WorkflowImportModalProps> = ({
  isOpen,
  onClose,
  onImportSuccess,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [workflowName, setWorkflowName] = useState('');
  const [workflowDescription, setWorkflowDescription] = useState('');
  const [importPermissions, setImportPermissions] = useState(false);
  const [tags, setTags] = useState('');
  const [format, setFormat] = useState('json');
  const [isImporting, setIsImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const resetForm = () => {
    setSelectedFile(null);
    setWorkflowName('');
    setWorkflowDescription('');
    setImportPermissions(false);
    setTags('');
    setFormat('json');
    setError(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleFileSelect = useCallback((file: File) => {
    if (file) {
      setSelectedFile(file);
      setError(null);
      
      // Auto-generate workflow name from filename if not set
      if (!workflowName) {
        const nameFromFile = file.name.replace(/\.[^/.]+$/, '');
        setWorkflowName(nameFromFile);
      }
    }
  }, [workflowName]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const validateFile = (file: File): string | null => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return 'File size must be less than 10MB';
    }

    const allowedTypes = ['application/json', 'text/plain', 'application/xml', 'text/xml'];
    if (!allowedTypes.includes(file.type) && !file.name.toLowerCase().endsWith('.json')) {
      return 'Please select a valid workflow file (JSON, XML, or text file)';
    }

    return null;
  };

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        resolve(content);
      };
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      reader.readAsText(file);
    });
  };

  const handleImport = async () => {
    if (!selectedFile || !workflowName.trim()) {
      setError('Please select a file and provide a workflow name');
      return;
    }

    const fileValidationError = validateFile(selectedFile);
    if (fileValidationError) {
      setError(fileValidationError);
      return;
    }

    try {
      setIsImporting(true);
      setError(null);

      // Read file content
      const workflowData = await readFileContent(selectedFile);

      // Parse and validate JSON if format is JSON
      if (format === 'json') {
        try {
          JSON.parse(workflowData);
        } catch (e) {
          setError('Invalid JSON format in the selected file');
          return;
        }
      }

      // Prepare import DTO
      const importDto = new WorkflowImportDto({
        workflowData,
        format,
        name: workflowName.trim(),
        description: workflowDescription.trim() || undefined,
        importPermissions,
        tags: tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0) : undefined,
      });

      // Import workflow
      const response = await api.workflows.workflows_Import(importDto);
      
      if (response.success && response.data) {
        const importedWorkflow = WorkflowDetailDto.fromJS(response.data);
        if (onImportSuccess) {
          onImportSuccess(importedWorkflow);
        }
        handleClose();
      } else {
        setError(response.message || 'Failed to import workflow');
      }
    } catch (error) {
      console.error('Failed to import workflow:', error);
      setError('Failed to import workflow. Please check the file format and try again.');
    } finally {
      setIsImporting(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Import Workflow"
      size="lg"
      footer={
        <div className="flex items-center justify-between w-full">
          <Button variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleImport}
            disabled={!selectedFile || !workflowName.trim() || isImporting}
            loading={isImporting}
          >
            Import Workflow
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Error Message */}
        {error && (
          <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* File Upload Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select Workflow File
          </label>
          
          {!selectedFile ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
              }`}
            >
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              
              <div className="mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  JSON, XML, or text files up to 10MB
                </p>
              </div>
              
              <input
                type="file"
                accept=".json,.xml,.txt,application/json,application/xml,text/xml,text/plain"
                onChange={handleFileInputChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          ) : (
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <svg className="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedFile.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{formatFileSize(selectedFile.size)}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedFile(null)}
              >
                Remove
              </Button>
            </div>
          )}
        </div>

        {/* Workflow Details */}
        <div className="space-y-4">
          <Input
            label="Workflow Name"
            placeholder="Enter workflow name..."
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              placeholder="Enter workflow description..."
              value={workflowDescription}
              onChange={(e) => setWorkflowDescription(e.target.value)}
              rows={3}
              className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <Input
              label="Tags"
              placeholder="tag1, tag2, tag3"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Separate multiple tags with commas
            </p>
          </div>
        </div>

        {/* Import Options */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              File Format
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="json">JSON</option>
              <option value="xml">XML</option>
              <option value="text">Text</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              id="import-permissions"
              type="checkbox"
              checked={importPermissions}
              onChange={(e) => setImportPermissions(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="import-permissions" className="ml-2 block text-sm text-gray-900 dark:text-gray-100">
              Import permissions from file
            </label>
          </div>
        </div>

        {/* Import Information */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                Import Information
              </h3>
              <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                <ul className="list-disc list-inside space-y-1">
                  <li>Supported formats: JSON, XML, and plain text</li>
                  <li>Maximum file size: 10MB</li>
                  <li>The imported workflow will be created as a new workflow</li>
                  <li>You can choose whether to import permissions from the file</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default WorkflowImportModal;