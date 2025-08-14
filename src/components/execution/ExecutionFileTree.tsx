// src/components/execution/ExecutionFileTree.tsx
import React, { useState, useCallback } from 'react';
import { api } from '@/api/api';
import type { IExecutionFileDto } from '@/api/typeInterfaces';

interface ExecutionFileTreeProps {
  executionId: string;
  files: IExecutionFileDto[];
  onError?: (error: string) => void;
}

interface FileTreeItemProps {
  file: IExecutionFileDto;
  executionId: string;
  level: number;
  onDownload: (file: IExecutionFileDto) => void;
  onError?: (error: string) => void;
}

const FileTreeItem: React.FC<FileTreeItemProps> = ({ 
  file, 
  executionId, 
  level, 
  onDownload,
  onError 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = useCallback(async () => {
    if (file.isDirectory) return;
    
    setIsDownloading(true);
    try {
      await onDownload(file);
    } catch (error) {
      console.error('Download failed:', error);
      onError?.('Failed to download file');
    } finally {
      setIsDownloading(false);
    }
  }, [file, onDownload, onError]);

  const formatFileSize = (bytes: number | undefined): string => {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getFileIcon = () => {
    if (file.isDirectory) {
      return isExpanded ? (
        <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
        </svg>
      ) : (
        <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
        </svg>
      );
    }

    // File type icons based on extension
    const extension = file.name?.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'txt':
      case 'log':
        return (
          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
        );
      case 'json':
      case 'xml':
        return (
          <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
        );
      case 'csv':
        return (
          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  return (
    <div className="select-none">
      <div 
        className={`flex items-center space-x-2 py-1 px-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded cursor-pointer group ${
          file.isDirectory ? 'font-medium' : ''
        }`}
        style={{ paddingLeft: `${level * 20 + 8}px` }}
        onClick={() => {
          if (file.isDirectory) {
            setIsExpanded(!isExpanded);
          } else {
            handleDownload();
          }
        }}
      >
        {file.isDirectory && (
          <svg 
            className={`w-3 h-3 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        )}
        
        {getFileIcon()}
        
        <span className="flex-1 text-sm text-gray-900 dark:text-white truncate">
          {file.name || 'Unknown'}
        </span>
        
        {!file.isDirectory && (
          <>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatFileSize(file.size)}
            </span>
            
            {isDownloading ? (
              <svg className="w-4 h-4 animate-spin text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            )}
          </>
        )}
      </div>
      
      {file.isDirectory && isExpanded && file.children && (
        <div>
          {file.children.map((child, index) => (
            <FileTreeItem
              key={`${child.path}-${index}`}
              file={child}
              executionId={executionId}
              level={level + 1}
              onDownload={onDownload}
              onError={onError}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ExecutionFileTree: React.FC<ExecutionFileTreeProps> = ({ 
  executionId, 
  files, 
  onError 
}) => {
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);

  const handleDownloadFile = useCallback(async (file: IExecutionFileDto) => {
    try {
      // This will be called when API layer is updated
      const response = await api.executions.executions_DownloadExecutionFile(executionId, file.path || '');
      
      if (response.success && response.data?.content) {
        // Create blob from base64 content
        const byteCharacters = atob(response.data.content);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: response.data.contentType || 'application/octet-stream' });
        
        // Create download link
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = file.name || 'download';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        throw new Error(response.message || 'Download failed');
      }
    } catch (error) {
      console.error('Download error:', error);
      throw error;
    }
  }, [executionId]);

  const handleDownloadAll = useCallback(async () => {
    setIsDownloadingAll(true);
    try {
      // This will be called when API layer is updated
      await api.executions.executions_DownloadAllExecutionFiles(executionId, false, 'optimal');
      
      // The backend should handle the file download directly
      // Create a temporary link to trigger the download
      const link = document.createElement('a');
      link.href = `/api/Executions/${executionId}/files/download-all`;
      link.download = `execution-${executionId}-output-files.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download all failed:', error);
      onError?.('Failed to download all files');
    } finally {
      setIsDownloadingAll(false);
    }
  }, [executionId, onError]);

  const getTotalFileCount = (files: IExecutionFileDto[]): number => {
    return files.reduce((count, file) => {
      if (file.isDirectory) {
        return count + (file.children ? getTotalFileCount(file.children) : 0);
      }
      return count + 1;
    }, 0);
  };

  const getTotalSize = (files: IExecutionFileDto[]): number => {
    return files.reduce((size, file) => {
      if (file.isDirectory) {
        return size + (file.children ? getTotalSize(file.children) : 0);
      }
      return size + (file.size || 0);
    }, 0);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const fileCount = getTotalFileCount(files);
  const totalSize = getTotalSize(files);

  if (!files || files.length === 0) {
    return (
      <div className="text-center py-8">
        <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          No output files available
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header with download actions */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {fileCount} files • {formatFileSize(totalSize)}
        </div>
      </div>

      {/* File tree */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 max-h-96 overflow-auto">
        <div className="p-2">
          {files.map((file, index) => (
            <FileTreeItem
              key={`${file.path}-${index}`}
              file={file}
              executionId={executionId}
              level={0}
              onDownload={handleDownloadFile}
              onError={onError}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExecutionFileTree;