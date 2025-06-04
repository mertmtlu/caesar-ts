// src/pages/editor/EditorPage.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '@/api/api';
import { SortDirection } from '@/api/enums';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Modal, { ConfirmationModal } from '@/components/common/Modal';
import * as monaco from 'monaco-editor';
import { VersionFileCreateDto, VersionFileUpdateDto } from '@/api';

// Monaco Editor (lazy loaded)
let MonacoEditor: React.ComponentType<{
  height: string;
  language: string;
  value: string;
  onChange: (value: string | undefined) => void;
  theme: string;
  options: monaco.editor.IStandaloneEditorConstructionOptions;
  onMount: (editor: monaco.editor.IStandaloneCodeEditor) => void;
}> | null = null;

// Interfaces
interface EditorFile {
  path: string;
  content: string;
  language: string;
  isModified: boolean;
  isNew: boolean;
  originalContent: string;
}

interface FileTreeItem {
  path: string;
  name: string;
  isDirectory: boolean;
  children?: FileTreeItem[];
  size?: number;
  lastModified?: Date;
}

interface ProjectInfo {
  id: string;
  name: string;
  language: string;
  currentVersion?: string;
  type: string;
}

interface VersionInfo {
  id: string;
  versionNumber: number;
  commitMessage?: string;
  createdAt: Date;
  status: string;
}

const EditorPage: React.FC = () => {
  const { projectId, versionId } = useParams<{ projectId?: string; versionId?: string }>();
  const navigate = useNavigate();

  // State management
  const [project, setProject] = useState<ProjectInfo | null>(null);
  const [version, setVersion] = useState<VersionInfo | null>(null);
  const [versions, setVersions] = useState<VersionInfo[]>([]);
  const [fileTree, setFileTree] = useState<FileTreeItem[]>([]);
  const [openFiles, setOpenFiles] = useState<EditorFile[]>([]);
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isMonacoLoaded, setIsMonacoLoaded] = useState(false);
  
  // UI State
  const [sidebarWidth, setSidebarWidth] = useState(300);
  const [isResizing, setIsResizing] = useState(false);
  const [selectedTreeItem, setSelectedTreeItem] = useState<string | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  
  // Modals
  const [showNewFileModal, setShowNewFileModal] = useState(false);
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUnsavedChangesModal, setShowUnsavedChangesModal] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [newFolderName, setNewFolderName] = useState('');
  const [fileToDelete, setFileToDelete] = useState<string | null>(null);
  
  // Refs
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const resizeRef = useRef<HTMLDivElement>(null);
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Load Monaco Editor dynamically
  useEffect(() => {
    const loadMonaco = async () => {
      try {
        // Import Monaco Editor dynamically
        const monaco = await import('@monaco-editor/react');
        MonacoEditor = monaco.default;
        setIsMonacoLoaded(true);
      } catch (error) {
        console.error('Failed to load Monaco Editor:', error);
        setError('Failed to load code editor. Please refresh the page.');
      }
    };

    loadMonaco();
  }, []);

  // Load project and version data
  useEffect(() => {
    if (projectId) {
      loadProjectData();
    }
  }, [projectId, versionId]);

  // Auto-save functionality
  useEffect(() => {
    const hasUnsavedChanges = openFiles.some(file => file.isModified);
    
    if (hasUnsavedChanges && autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }
    
    if (hasUnsavedChanges) {
      autoSaveTimerRef.current = setTimeout(() => {
        saveAllFiles();
      }, 30000); // Auto-save after 30 seconds of inactivity
    }

    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
    };
  }, [openFiles]);

  // Handle beforeunload for unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const hasUnsavedChanges = openFiles.some(file => file.isModified);
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [openFiles]);

  const loadProjectData = async () => {
    if (!projectId) return;

    try {
      setIsLoading(true);
      setError(null);

      // Load project details
      const projectResponse = await api.programs.programs_GetById(projectId);
      if (projectResponse.success && projectResponse.data) {
        setProject({
          id: projectResponse.data.id || '',
          name: projectResponse.data.name || 'Untitled Project',
          language: projectResponse.data.language || 'javascript',
          currentVersion: projectResponse.data.currentVersion,
          type: projectResponse.data.type || 'web'
        });
      } else {
        setError('Project not found or access denied.');
        return;
      }

      // Load versions
      const versionsResponse = await api.versions.versions_GetByProgram(projectId, 1, 50, 'CreatedDate', SortDirection._1);
      if (versionsResponse.success && versionsResponse.data?.items) {
        const versionList = versionsResponse.data.items.map(v => ({
          id: v.id || '',
          versionNumber: v.versionNumber || 1,
          commitMessage: v.commitMessage,
          createdAt: v.createdAt || new Date(),
          status: v.status || 'pending'
        }));
        setVersions(versionList);

        // Check if we have any versions
        if (versionList.length === 0) {
          setError('This project has no versions yet. Please create a version first.');
          return;
        }

        // Set current version
        const currentVersion = versionId 
          ? versionList.find(v => v.id === versionId)
          : versionList[0]; // Use latest version

        if (currentVersion) {
          setVersion(currentVersion);
          await loadFiles(projectId, currentVersion.id);
        } else if (versionId) {
          setError('The requested version was not found.');
        }
      } else {
        setError('Failed to load project versions.');
      }
    } catch (error) {
      console.error('Failed to load project data:', error);
      setError('Failed to load project data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadFiles = async (programId: string, versionId: string) => {
    try {
      const filesResponse = await api.files.files_ListVersionFiles(programId, versionId);
      if (filesResponse.success && filesResponse.data) {
        const tree = buildFileTree(filesResponse.data);
        setFileTree(tree);
      }
    } catch (error) {
      console.error('Failed to load files:', error);
      setError('Failed to load project files.');
    }
  };

  const buildFileTree = (files: any[]): FileTreeItem[] => {
    const tree: FileTreeItem[] = [];
    const pathMap = new Map<string, FileTreeItem>();

    // Sort files to ensure directories come first
    const sortedFiles = files.sort((a, b) => {
      const aIsDir = a.path?.includes('/') || false;
      const bIsDir = b.path?.includes('/') || false;
      if (aIsDir && !bIsDir) return -1;
      if (!aIsDir && bIsDir) return 1;
      return (a.path || '').localeCompare(b.path || '');
    });

    for (const file of sortedFiles) {
      const path = file.path || '';
      const parts = path.split('/');
      const fileName = parts[parts.length - 1];
      
      const item: FileTreeItem = {
        path,
        name: fileName,
        isDirectory: false,
        size: file.size,
        lastModified: file.lastModified ? new Date(file.lastModified) : undefined
      };

      if (parts.length === 1) {
        // Root level file
        tree.push(item);
        pathMap.set(path, item);
      } else {
        // Nested file - create directories as needed
        let currentPath = '';
        let currentLevel = tree;

        for (let i = 0; i < parts.length - 1; i++) {
          currentPath += (i > 0 ? '/' : '') + parts[i];
          
          let dir = pathMap.get(currentPath);
          if (!dir) {
            dir = {
              path: currentPath,
              name: parts[i],
              isDirectory: true,
              children: []
            };
            currentLevel.push(dir);
            pathMap.set(currentPath, dir);
          }
          
          if (!dir.children) dir.children = [];
          currentLevel = dir.children;
        }

        currentLevel.push(item);
        pathMap.set(path, item);
      }
    }

    return tree;
  };

  const openFile = async (filePath: string) => {
    if (!project || !version) return;

    // Check if file is already open
    const existingFile = openFiles.find(f => f.path === filePath);
    if (existingFile) {
      setActiveFile(filePath);
      return;
    }

    try {
      const response = await api.files.files_GetVersionFile(project.id, version.id, filePath);
      if (response.success && response.data) {
        // The content is base64-encoded, so decode it
        const content = response.data.content ? atob(response.data.content) : '';
        const language = detectLanguage(filePath, project.language);
        
        const newFile: EditorFile = {
          path: filePath,
          content,
          language,
          isModified: false,
          isNew: false,
          originalContent: content
        };

        setOpenFiles(prev => [...prev, newFile]);
        setActiveFile(filePath);
      }
    } catch (error) {
      console.error('Failed to open file:', error);
      setError(`Failed to open file: ${filePath}`);
    }
  };

  const detectLanguage = (filePath: string, projectLanguage: string): string => {
    const extension = filePath.split('.').pop()?.toLowerCase();
    
    const languageMap: Record<string, string> = {
      'js': 'javascript',
      'jsx': 'javascript',
      'ts': 'typescript',
      'tsx': 'typescript',
      'py': 'python',
      'java': 'java',
      'cs': 'csharp',
      'cpp': 'cpp',
      'c': 'c',
      'html': 'html',
      'css': 'css',
      'scss': 'scss',
      'json': 'json',
      'xml': 'xml',
      'yaml': 'yaml',
      'yml': 'yaml',
      'md': 'markdown',
      'sql': 'sql',
      'php': 'php',
      'go': 'go',
      'rs': 'rust',
      'rb': 'ruby',
      'sh': 'shell',
      'dockerfile': 'dockerfile'
    };

    return languageMap[extension || ''] || projectLanguage || 'plaintext';
  };

  const closeFile = (filePath: string) => {
    const file = openFiles.find(f => f.path === filePath);
    if (file?.isModified) {
      // Show unsaved changes modal
      setShowUnsavedChangesModal(true);
      return;
    }

    setOpenFiles(prev => prev.filter(f => f.path !== filePath));
    
    if (activeFile === filePath) {
      const remainingFiles = openFiles.filter(f => f.path !== filePath);
      setActiveFile(remainingFiles.length > 0 ? remainingFiles[remainingFiles.length - 1].path : null);
    }
  };

  const saveFile = async (filePath: string) => {
    if (!project || !version) return;

    const file = openFiles.find(f => f.path === filePath);
    if (!file) return;

    try {
      setIsSaving(true);
      
      if (file.isNew) {
        // Create new file
        await api.files.files_StoreVersionFiles(project.id, version.id, [new VersionFileCreateDto({
          path: filePath,
          content: btoa(file.content),
          contentType: 'text/plain'
        })]);
      } else {
        // Update existing file
        await api.files.files_UpdateVersionFile(project.id, version.id, filePath, new VersionFileUpdateDto({
          content: btoa(file.content),
          contentType: 'text/plain'
        }));
      }

      // Update file state
      setOpenFiles(prev => prev.map(f => f.path === filePath ? {
        ...f,
        isModified: false,
        isNew: false,
        originalContent: f.content
      } : f));

      // Reload file tree
      await loadFiles(project.id, version.id);
      
    } catch (error) {
      console.error('Failed to save file:', error);
      setError(`Failed to save file: ${filePath}`);
    } finally {
      setIsSaving(false);
    }
  };

  const saveAllFiles = async () => {
    const modifiedFiles = openFiles.filter(f => f.isModified);
    for (const file of modifiedFiles) {
      await saveFile(file.path);
    }
  };

 const createNewFile = async () => {
    // Add validation with proper error messages
    if (!newFileName.trim()) {
        setError('Please enter a file name.');
        return;
    }

    if (!project || !version) {
        setError('Project or version information is missing. Please try refreshing the page.');
        return;
    }

    const filePath = selectedTreeItem && selectedTreeItem !== '/' 
        ? `${selectedTreeItem}/${newFileName.trim()}`
        : newFileName.trim();

    // Check if file already exists
    const existsInOpenFiles = openFiles.some(f => f.path === filePath);
    const existsInFileTree = fileTree.some(item => findFileInTree(item, filePath));

    if (existsInOpenFiles || existsInFileTree) {
        setError('A file with this name already exists.');
        return;
    }

    try {
        const language = detectLanguage(filePath, project.language);
        
        const newFile: EditorFile = {
        path: filePath,
        content: '',
        language,
        isModified: true,
        isNew: true,
        originalContent: ''
        };

        setOpenFiles(prev => [...prev, newFile]);
        setActiveFile(filePath);
        
        // Close modal and reset form - moved to end to ensure they always happen on success
        setShowNewFileModal(false);
        setNewFileName('');
        setError(null); // Clear any previous errors
        
    } catch (error) {
        console.error('Error creating new file:', error);
        setError('Failed to create new file. Please try again.');
    }
  };

  const deleteFile = async () => {
    if (!fileToDelete || !project || !version) return;

    try {
      await api.files.files_DeleteVersionFile(project.id, version.id, fileToDelete);
      
      // Remove from open files
      setOpenFiles(prev => prev.filter(f => f.path !== fileToDelete));
      
      // Update active file if deleted
      if (activeFile === fileToDelete) {
        const remainingFiles = openFiles.filter(f => f.path !== fileToDelete);
        setActiveFile(remainingFiles.length > 0 ? remainingFiles[0].path : null);
      }

      // Reload file tree
      await loadFiles(project.id, version.id);
      
      setShowDeleteModal(false);
      setFileToDelete(null);
    } catch (error) {
      console.error('Failed to delete file:', error);
      setError(`Failed to delete file: ${fileToDelete}`);
    }
  };

  const findFileInTree = (item: FileTreeItem, path: string): boolean => {
    if (item.path === path) return true;
    if (item.children) {
      return item.children.some(child => findFileInTree(child, path));
    }
    return false;
  };

  const handleEditorChange = (value: string | undefined, filePath: string) => {
    if (value === undefined) return;

    setOpenFiles(prev => prev.map(file => 
      file.path === filePath 
        ? { ...file, content: value, isModified: value !== file.originalContent }
        : file
    ));
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

  const renderFileTree = (items: FileTreeItem[], level = 0): React.ReactNode => {
    return items.map((item) => (
      <div key={item.path}>
        <div
          className={`flex items-center px-2 py-1 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
            selectedTreeItem === item.path ? 'bg-blue-100 dark:bg-blue-900' : ''
          }`}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
          onClick={() => {
            setSelectedTreeItem(item.path);
            if (item.isDirectory) {
              toggleFolder(item.path);
            } else {
              openFile(item.path);
            }
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            setSelectedTreeItem(item.path);
            // Context menu could be added here
          }}
        >
          {item.isDirectory ? (
            <>
              <svg 
                className={`w-4 h-4 mr-1 text-gray-500 transition-transform ${
                  expandedFolders.has(item.path) ? 'rotate-90' : ''
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
              </svg>
            </>
          ) : (
            <>
              <div className="w-4 mr-1" />
              <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </>
          )}
          <span className="truncate text-gray-900 dark:text-gray-100">
            {item.name}
          </span>
          {openFiles.some(f => f.path === item.path && f.isModified) && (
            <span className="ml-1 text-blue-500">●</span>
          )}
        </div>
        {item.isDirectory && item.children && expandedFolders.has(item.path) && (
          <div>
            {renderFileTree(item.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  const activeFileData = activeFile ? openFiles.find(f => f.path === activeFile) : null;

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading editor...</p>
        </div>
      </div>
    );
  }

  if (error && !project) {
    return (
      <div className="h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Failed to load editor</h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400">{error}</p>
          <div className="mt-4 space-x-3">
            <Button variant="primary" onClick={() => navigate('/projects')}>
              Back to Projects
            </Button>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="flex-none bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(`/projects/${projectId}`)}
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              }
            >
              Back to Project
            </Button>
            <div className="text-sm">
              <span className="font-medium text-gray-900 dark:text-white">{project?.name}</span>
              {version && (
                <span className="text-gray-500 dark:text-gray-400 ml-2">
                  • Version {version.versionNumber}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {openFiles.some(f => f.isModified) && (
              <Button
                variant="primary"
                size="sm"
                onClick={saveAllFiles}
                loading={isSaving}
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                }
              >
                Save All
              </Button>
            )}
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowNewFileModal(true)}
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              }
            >
              New File
            </Button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex-none bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800 px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-4 h-4 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span className="text-sm text-red-800 dark:text-red-200">{error}</span>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-500 hover:text-red-700 dark:hover:text-red-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Main Editor Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - File Explorer */}
        <div 
          className="bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col"
          style={{ width: `${sidebarWidth}px` }}
        >
          {/* Sidebar Header */}
          <div className="flex-none p-3 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900 dark:text-white">Explorer</span>
              <div className="flex space-x-1">
                <button
                  onClick={() => setShowNewFileModal(true)}
                  className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  title="New File"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setShowNewFolderModal(true)}
                  className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  title="New Folder"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* File Tree */}
          <div className="flex-1 overflow-y-auto">
            {fileTree.length > 0 ? (
              <div className="py-2">
                {renderFileTree(fileTree)}
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                <svg className="mx-auto h-8 w-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <p className="text-sm">No files found</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => setShowNewFileModal(true)}
                >
                  Create File
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Resize Handle */}
        <div
          ref={resizeRef}
          className="w-1 bg-gray-200 dark:bg-gray-700 cursor-col-resize hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          onMouseDown={(e) => {
            setIsResizing(true);
            const startX = e.clientX;
            const startWidth = sidebarWidth;

            const handleMouseMove = (e: MouseEvent) => {
              const newWidth = Math.max(200, Math.min(600, startWidth + (e.clientX - startX)));
              setSidebarWidth(newWidth);
            };

            const handleMouseUp = () => {
              setIsResizing(false);
              document.removeEventListener('mousemove', handleMouseMove);
              document.removeEventListener('mouseup', handleMouseUp);
            };

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
          }}
        />

        {/* Editor Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* File Tabs */}
          {openFiles.length > 0 && (
            <div className="flex-none bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <div className="flex overflow-x-auto">
                {openFiles.map((file) => (
                  <div
                    key={file.path}
                    className={`flex items-center px-3 py-2 text-sm border-r border-gray-200 dark:border-gray-700 cursor-pointer min-w-0 ${
                      activeFile === file.path
                        ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                        : 'bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setActiveFile(file.path)}
                  >
                    <span className="truncate max-w-32">{file.path.split('/').pop()}</span>
                    {file.isModified && <span className="ml-1 text-blue-500">●</span>}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        closeFile(file.path);
                      }}
                      className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Monaco Editor */}
          <div className="flex-1 overflow-hidden">
            {isMonacoLoaded && MonacoEditor && activeFileData ? (
              <MonacoEditor
                height="100%"
                language={activeFileData.language}
                value={activeFileData.content}
                onChange={(value: string | undefined) => handleEditorChange(value, activeFileData.path)}
                theme="vs-dark"
                options={{
                  minimap: { enabled: true },
                  fontSize: 14,
                  wordWrap: 'on',
                  automaticLayout: true,
                  scrollBeyondLastLine: false,
                  renderWhitespace: 'selection',
                  tabSize: 2,
                  insertSpaces: true
                }}
                onMount={(editor: monaco.editor.IStandaloneCodeEditor) => {
                  editorRef.current = editor;
                  
                  // Add keyboard shortcuts
                  if (typeof monaco !== 'undefined') {
                    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
                      if (activeFileData) {
                        saveFile(activeFileData.path);
                      }
                    });
                  }
                }}
              />
            ) : (
              <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                  {!isMonacoLoaded ? (
                    <>
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-gray-500 dark:text-gray-400">Loading editor...</p>
                    </>
                  ) : (
                    <>
                      <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      <p className="text-gray-500 dark:text-gray-400">Select a file to start editing</p>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New File Modal */}
      <Modal
        isOpen={showNewFileModal}
        onClose={() => {
          setShowNewFileModal(false);
          setNewFileName('');
          setError(null); // Clear errors when closing
        }}
        title="Create New File"
        footer={
          <>
            <Button 
              variant="outline" 
              onClick={() => {
                setShowNewFileModal(false);
                setNewFileName('');
                setError(null);
              }}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={createNewFile}
              disabled={!newFileName.trim()} // Disable if no filename
            >
              Create
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="File Name"
            placeholder="e.g., index.js, main.py, README.md"
            value={newFileName}
            onChange={(e) => {
              setNewFileName(e.target.value);
              // Clear error when user starts typing
              if (error && error.includes('file name')) {
                setError(null);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && newFileName.trim()) {
                createNewFile();
              }
            }}
            autoFocus
          />
          
          {/* Show current directory context */}
          {selectedTreeItem && selectedTreeItem !== '/' && (
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Creating in: <span className="font-mono">{selectedTreeItem}/</span>
            </div>
          )}
        </div>
      </Modal>
      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={deleteFile}
        title="Delete File"
        message={`Are you sure you want to delete "${fileToDelete}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
      />

      {/* Unsaved Changes Modal */}
      <ConfirmationModal
        isOpen={showUnsavedChangesModal}
        onClose={() => setShowUnsavedChangesModal(false)}
        onConfirm={() => {
          // Force close without saving
          const filePath = activeFile;
          if (filePath) {
            setOpenFiles(prev => prev.filter(f => f.path !== filePath));
            const remainingFiles = openFiles.filter(f => f.path !== filePath);
            setActiveFile(remainingFiles.length > 0 ? remainingFiles[remainingFiles.length - 1].path : null);
          }
          setShowUnsavedChangesModal(false);
        }}
        title="Unsaved Changes"
        message="You have unsaved changes. Are you sure you want to close this file?"
        confirmText="Close Without Saving"
        variant="warning"
      />
    </div>
  );
};

export default EditorPage;