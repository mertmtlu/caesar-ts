import React, { useState } from 'react';
import { api } from '@/api/api';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';

interface WorkflowExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  workflowId: string;
  workflowName: string;
}

interface ExportOption {
  format: string;
  name: string;
  description: string;
  icon: string;
  fileExtension: string;
}

const EXPORT_OPTIONS: ExportOption[] = [
  {
    format: 'json',
    name: 'JSON Format',
    description: 'Standard JSON format with full workflow definition',
    icon: '📄',
    fileExtension: 'json'
  },
  {
    format: 'xml',
    name: 'XML Format',
    description: 'XML format for enterprise integration',
    icon: '📋',
    fileExtension: 'xml'
  },
  {
    format: 'yaml',
    name: 'YAML Format',
    description: 'Human-readable YAML format',
    icon: '📝',
    fileExtension: 'yaml'
  }
];

const WorkflowExportModal: React.FC<WorkflowExportModalProps> = ({
  isOpen,
  onClose,
  workflowId,
  workflowName,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<string>('json');
  const [includePermissions, setIncludePermissions] = useState(true);
  const [includeExecutionHistory, setIncludeExecutionHistory] = useState(false);
  const [includeStatistics, setIncludeStatistics] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getSelectedOption = (): ExportOption => {
    return EXPORT_OPTIONS.find(opt => opt.format === selectedFormat) || EXPORT_OPTIONS[0];
  };

  const generateFileName = (): string => {
    const selectedOption = getSelectedOption();
    const sanitizedName = workflowName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const timestamp = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    return `workflow_${sanitizedName}_${timestamp}.${selectedOption.fileExtension}`;
  };

  const createWorkflowExportData = async (): Promise<any> => {
    try {
      // Get workflow details
      const workflowResponse = await api.workflows.workflows_GetById(workflowId);
      if (!workflowResponse.success || !workflowResponse.data) {
        throw new Error('Failed to load workflow data');
      }

      const exportData: any = {
        metadata: {
          name: workflowName,
          exportedAt: new Date().toISOString(),
          exportedBy: 'Current User', // TODO: Get actual user info
          format: selectedFormat,
          version: '1.0'
        },
        workflow: workflowResponse.data
      };

      // Include permissions if requested
      if (includePermissions) {
        try {
          const permissionsResponse = await api.workflows.workflows_GetPermissions(workflowId);
          if (permissionsResponse.success && permissionsResponse.data) {
            exportData.permissions = permissionsResponse.data;
          }
        } catch (error) {
          console.warn('Failed to load permissions for export:', error);
        }
      }

      // Include statistics if requested
      if (includeStatistics) {
        try {
          const statsResponse = await api.workflows.workflows_GetStatistics(workflowId);
          if (statsResponse.success && statsResponse.data) {
            exportData.statistics = statsResponse.data;
          }
        } catch (error) {
          console.warn('Failed to load statistics for export:', error);
        }
      }

      // Include execution history if requested
      if (includeExecutionHistory) {
        try {
          const historyResponse = await api.workflows.workflows_GetExecutionHistory(workflowId, 100);
          if (historyResponse.success && historyResponse.data) {
            exportData.executionHistory = historyResponse.data;
          }
        } catch (error) {
          console.warn('Failed to load execution history for export:', error);
        }
      }

      return exportData;
    } catch (error) {
      console.error('Failed to create export data:', error);
      throw error;
    }
  };

  const convertToFormat = (data: any, format: string): string => {
    switch (format) {
      case 'json':
        return JSON.stringify(data, null, 2);
      
      case 'xml':
        // Simple XML conversion - in production, you'd use a proper XML library
        return `<?xml version="1.0" encoding="UTF-8"?>\n<workflow>\n${convertObjectToXml(data, 1)}</workflow>`;
      
      case 'yaml':
        // Simple YAML conversion - in production, you'd use a YAML library
        return convertObjectToYaml(data, 0);
      
      default:
        return JSON.stringify(data, null, 2);
    }
  };

  const convertObjectToXml = (obj: any, indent: number = 0): string => {
    const spaces = '  '.repeat(indent);
    let xml = '';
    
    for (const [key, value] of Object.entries(obj)) {
      if (value === null || value === undefined) continue;
      
      if (typeof value === 'object' && !Array.isArray(value)) {
        xml += `${spaces}<${key}>\n${convertObjectToXml(value, indent + 1)}${spaces}</${key}>\n`;
      } else if (Array.isArray(value)) {
        xml += `${spaces}<${key}>\n`;
        value.forEach(item => {
          if (typeof item === 'object') {
            xml += `${spaces}  <item>\n${convertObjectToXml(item, indent + 2)}${spaces}  </item>\n`;
          } else {
            xml += `${spaces}  <item>${String(item)}</item>\n`;
          }
        });
        xml += `${spaces}</${key}>\n`;
      } else {
        xml += `${spaces}<${key}>${String(value)}</${key}>\n`;
      }
    }
    
    return xml;
  };

  const convertObjectToYaml = (obj: any, indent: number = 0): string => {
    const spaces = '  '.repeat(indent);
    let yaml = '';
    
    for (const [key, value] of Object.entries(obj)) {
      if (value === null || value === undefined) {
        yaml += `${spaces}${key}: null\n`;
      } else if (typeof value === 'object' && !Array.isArray(value)) {
        yaml += `${spaces}${key}:\n${convertObjectToYaml(value, indent + 1)}`;
      } else if (Array.isArray(value)) {
        yaml += `${spaces}${key}:\n`;
        value.forEach(item => {
          if (typeof item === 'object') {
            yaml += `${spaces}  -\n${convertObjectToYaml(item, indent + 2)}`;
          } else {
            yaml += `${spaces}  - ${String(item)}\n`;
          }
        });
      } else {
        yaml += `${spaces}${key}: ${String(value)}\n`;
      }
    }
    
    return yaml;
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  };

  const handleExport = async () => {
    try {
      setIsExporting(true);
      setError(null);

      // Create export data
      const exportData = await createWorkflowExportData();

      // Convert to selected format
      const content = convertToFormat(exportData, selectedFormat);

      // Determine MIME type
      const mimeType = selectedFormat === 'json' ? 'application/json' : 
                      selectedFormat === 'xml' ? 'application/xml' : 
                      'text/plain';

      // Download file
      const filename = generateFileName();
      downloadFile(content, filename, mimeType);

      onClose();
    } catch (error) {
      console.error('Export failed:', error);
      setError('Failed to export workflow. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };


  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Export "${workflowName}"`}
      size="lg"
      footer={
        <div className="flex items-center justify-between w-full">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleExport}
            disabled={isExporting}
            loading={isExporting}
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
          >
            Export Workflow
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

        {/* Format Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Export Format
          </label>
          <div className="grid grid-cols-1 gap-3">
            {EXPORT_OPTIONS.map((option) => (
              <label key={option.format} className="relative">
                <input
                  type="radio"
                  name="exportFormat"
                  value={option.format}
                  checked={selectedFormat === option.format}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="sr-only peer"
                />
                <div className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-900/20 hover:border-gray-300 dark:hover:border-gray-600">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{option.icon}</span>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{option.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{option.description}</div>
                    </div>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Export Options */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Include in Export
          </label>
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                id="include-permissions"
                type="checkbox"
                checked={includePermissions}
                onChange={(e) => setIncludePermissions(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="include-permissions" className="ml-2 block text-sm text-gray-900 dark:text-gray-100">
                Permissions and access control
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="include-statistics"
                type="checkbox"
                checked={includeStatistics}
                onChange={(e) => setIncludeStatistics(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="include-statistics" className="ml-2 block text-sm text-gray-900 dark:text-gray-100">
                Workflow statistics and metrics
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="include-execution-history"
                type="checkbox"
                checked={includeExecutionHistory}
                onChange={(e) => setIncludeExecutionHistory(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="include-execution-history" className="ml-2 block text-sm text-gray-900 dark:text-gray-100">
                Recent execution history (last 100 runs)
              </label>
            </div>
          </div>
        </div>

        {/* Export Preview */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Export Preview</h3>
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <p><strong>Format:</strong> {getSelectedOption().name}</p>
            <p><strong>Filename:</strong> {generateFileName()}</p>
            <p><strong>Includes:</strong> Workflow definition{includePermissions ? ', permissions' : ''}{includeStatistics ? ', statistics' : ''}{includeExecutionHistory ? ', execution history' : ''}</p>
          </div>
        </div>

        {/* Export Information */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                Export Information
              </h3>
              <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                <ul className="list-disc list-inside space-y-1">
                  <li>The exported file will contain the complete workflow definition</li>
                  <li>You can import this file into another Caesar instance</li>
                  <li>Sensitive information like API keys will not be exported</li>
                  <li>Export includes workflow structure, nodes, connections, and metadata</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default WorkflowExportModal;