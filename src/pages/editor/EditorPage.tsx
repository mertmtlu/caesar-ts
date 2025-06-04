// src/pages/editor/EditorPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeftIcon,
  FolderIcon,
  DocumentTextIcon,
  PlayIcon,
  PlusIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  CodeBracketIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
import { api } from '@/api/api';
import { useAuth } from '@/contexts/AuthContext';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import type { IProgramDetailDto } from '@/api/typeInterfaces';

const EditorPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { user } = useAuth();
  
  const [project, setProject] = useState<IProgramDetailDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['root']));

  useEffect(() => {
    if (projectId) {
      loadProject();
    }
  }, [projectId]);

  const loadProject = async () => {
    if (!projectId) return;
    
    try {
      setLoading(true);
      setError('');
      
      const response = await api.programs.programs_GetById(projectId);
      
      if (response.success && response.data) {
        setProject(response.data);
        
        // Auto-select main file if available
        if (response.data.mainFile) {
          setSelectedFile(response.data.mainFile);
        } else if (response.data.files && response.data.files.length > 0) {
          setSelectedFile(response.data.files[0].path || null);
        }
      } else {
        setError(response.message || 'Failed to load project');
      }
    } catch (error: any) {
      console.error('Error loading project:', error);
      setError(error.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const toggleFolder = (folderPath: string) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(folderPath)) {
        newSet.delete(folderPath);
      } else {
        newSet.add(folderPath);
      }
      return newSet;
    });
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    // You can expand this with more file type icons
    switch (extension) {
      case 'js':
      case 'jsx':
      case 'ts':
      case 'tsx':
        return <CodeBracketIcon className="h-4 w-4 text-yellow-500" />;
      case 'json':
        return <DocumentTextIcon className="h-4 w-4 text-green-500" />;
      case 'md':
        return <DocumentTextIcon className="h-4 w-4 text-blue-500" />;
      case 'css':
      case 'scss':
      case 'sass':
        return <DocumentTextIcon className="h-4 w-4 text-purple-500" />;
      case 'html':
        return <DocumentTextIcon className="h-4 w-4 text-orange-500" />;
      default:
        return <DocumentTextIcon className="h-4 w-4 text-gray-500" />;
    }
  };

  const mockFileStructure = [
    { path: 'src/', type: 'folder', children: [
      { path: 'src/index.js', type: 'file' },
      { path: 'src/App.js', type: 'file' },
      { path: 'src/components/', type: 'folder', children: [
        { path: 'src/components/Header.js', type: 'file' },
        { path: 'src/components/Footer.js', type: 'file' }
      ]},
      { path: 'src/utils/', type: 'folder', children: [
        { path: 'src/utils/helpers.js', type: 'file' }
      ]}
    ]},
    { path: 'public/', type: 'folder', children: [
      { path: 'public/index.html', type: 'file' }
    ]},
    { path: 'package.json', type: 'file' },
    { path: 'README.md', type: 'file' }
  ];

  const renderFileTree = (items: any[], level = 0) => {
    return items.map((item, index) => {
      const isExpanded = expandedFolders.has(item.path);
      const isSelected = selectedFile === item.path;
      
      return (
        <div key={item.path}>
          <div
            className={`flex items-center py-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded text-sm ${
              isSelected ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'
            }`}
            style={{ paddingLeft: `${level * 16 + 8}px` }}
            onClick={() => {
              if (item.type === 'folder') {
                toggleFolder(item.path);
              } else {
                setSelectedFile(item.path);
              }
            }}
          >
            {item.type === 'folder' ? (
              <>
                {isExpanded ? (
                  <ChevronDownIcon className="h-4 w-4 mr-1 text-gray-400" />
                ) : (
                  <ChevronRightIcon className="h-4 w-4 mr-1 text-gray-400" />
                )}
                <FolderIcon className="h-4 w-4 mr-2 text-blue-500" />
              </>
            ) : (
              <>
                <div className="w-4 mr-1" /> {/* Spacer for alignment */}
                {getFileIcon(item.path)}
                <span className="ml-2" />
              </>
            )}
            <span className="truncate">{item.path.split('/').pop()}</span>
          </div>
          
          {item.type === 'folder' && isExpanded && item.children && (
            <div>
              {renderFileTree(item.children, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading editor..." />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 dark:text-red-400 mb-4">{error}</div>
        <Link
          to="/projects"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-500"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back to Projects
        </Link>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 dark:text-gray-400 mb-4">Project not found</div>
        <Link
          to="/projects"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-500"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Editor Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <Link
            to={`/projects/${projectId}`}
            className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Back to Project
          </Link>
          
          <div className="flex items-center space-x-2">
            <CodeBracketIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span className="font-medium text-gray-900 dark:text-white">
              {project.name}
            </span>
            {selectedFile && (
              <>
                <span className="text-gray-400">/</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedFile}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <PlayIcon className="h-4 w-4 mr-1" />
            Run
          </button>
          
          <button
            type="button"
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <Cog6ToothIcon className="h-4 w-4 mr-1" />
            Settings
          </button>
        </div>
      </div>

      {/* Editor Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* File Explorer Sidebar */}
        <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
          <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Explorer</h3>
            <button
              type="button"
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2">
            {project.files && project.files.length > 0 ? (
              <div className="space-y-1">
                {project.files.map((file, index) => (
                  <div
                    key={index}
                    className={`flex items-center py-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded text-sm ${
                      selectedFile === file.path 
                        ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' 
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                    onClick={() => setSelectedFile(file.path || null)}
                  >
                    {getFileIcon(file.path || '')}
                    <span className="ml-2 truncate">{file.path}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-1">
                {renderFileTree(mockFileStructure)}
              </div>
            )}
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col">
          {selectedFile ? (
            <>
              {/* File Tabs */}
              <div className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <div className="flex items-center space-x-2 px-3 py-1 bg-white dark:bg-gray-800 rounded text-sm">
                  {getFileIcon(selectedFile)}
                  <span className="ml-1 text-gray-900 dark:text-white">
                    {selectedFile.split('/').pop()}
                  </span>
                </div>
              </div>

              {/* Code Editor Area */}
              <div className="flex-1 bg-white dark:bg-gray-800">
                <div className="h-full p-4">
                  <div className="h-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <CodeBracketIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                        Code Editor Coming Soon
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        The Monaco code editor will be implemented in Phase 3.
                      </p>
                      <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                        Selected file: {selectedFile}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-white dark:bg-gray-800">
              <div className="text-center">
                <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                  No file selected
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Select a file from the explorer to start editing.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar (Optional) */}
        <div className="w-64 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700">
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Project Info</h3>
          </div>
          
          <div className="p-3 space-y-4">
            <div>
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Language
              </div>
              <div className="mt-1 text-sm text-gray-900 dark:text-white">
                {project.language || 'Not specified'}
              </div>
            </div>
            
            <div>
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Type
              </div>
              <div className="mt-1 text-sm text-gray-900 dark:text-white">
                {project.type || 'Not specified'}
              </div>
            </div>
            
            <div>
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Framework
              </div>
              <div className="mt-1 text-sm text-gray-900 dark:text-white">
                {project.uiType || 'Not specified'}
              </div>
            </div>
            
            {project.mainFile && (
              <div>
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Main File
                </div>
                <div className="mt-1 text-sm text-gray-900 dark:text-white">
                  {project.mainFile}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;