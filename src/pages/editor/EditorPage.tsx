// src/pages/editor/EditorPage.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '@/api/api';
import { SortDirection } from '@/api/enums';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Modal, { ConfirmationModal } from '@/components/common/Modal';
import * as monaco from 'monaco-editor';
import { VersionFileCreateDto, VersionFileUpdateDto, VersionCommitDto, VersionFileChangeDto, VersionUpdateDto } from '@/api';

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
  isBinary?: boolean;
  isEditorInitialized?: boolean;
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
  const searchParams = new URLSearchParams(window.location.search);
  const mode = searchParams.get('mode') || 'edit'; // 'view' or 'edit'

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
  
  // Context Menu State
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [contextMenuTarget, setContextMenuTarget] = useState<string | null>(null);
  
  // Modals
  const [showNewFileModal, setShowNewFileModal] = useState(false);
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUnsavedChangesModal, setShowUnsavedChangesModal] = useState(false);
  const [showCommitModal, setShowCommitModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [newFolderName, setNewFolderName] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [itemToRename, setItemToRename] = useState<string | null>(null);
  const [fileToDelete, setFileToDelete] = useState<string | null>(null);
  
  // Upload state
  const [uploadingFiles, setUploadingFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  
  // Commit state
  const [commitMessage, setCommitMessage] = useState('');
  const [isCommitting, setIsCommitting] = useState(false);
  
  // Mode state
  const isViewMode = mode === 'view';
  const isEditingExistingVersion = mode === 'edit' && versionId;
  
  // Refs
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const resizeRef = useRef<HTMLDivElement>(null);
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const editorChangeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  // Handle context menu clicks outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowContextMenu(false);
    };

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowContextMenu(false);
      }
    };

    if (showContextMenu) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [showContextMenu]);


  // Update file tree when open files change (for newly created files/folders)
  useEffect(() => {
    if (openFiles.length > 0) {
      const newFiles = openFiles.filter(file => file.isNew && file.isModified);
      if (newFiles.length > 0) {
        // Merge new files with existing tree instead of rebuilding from scratch
        setFileTree(prev => mergeNewFilesIntoTree(prev, newFiles));
      }
    }
  }, [openFiles.length]); // Only trigger when the number of files changes

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

    // Check if file is already open (including new unsaved files)
    const existingFile = openFiles.find(f => f.path === filePath);
    if (existingFile) {
      setActiveFile(filePath);
      return;
    }

    // Debug: Log the attempted file path and current open files
    console.log('Attempting to open:', filePath);

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
          originalContent: content,
          isEditorInitialized: false
        };

        setOpenFiles(prev => [...prev, newFile]);
        setActiveFile(filePath);
      } else {
        // If file doesn't exist on server, it might be a new unsaved file that's not in openFiles yet
        // This shouldn't happen if our logic is correct, but let's handle it gracefully
        console.warn(`File ${filePath} not found on server and not in openFiles`);
        setError(`File ${filePath} not found. It may be a new file that hasn't been saved yet.`);
      }
    } catch (error) {
      console.error('Failed to open file:', error);
      // If it's a 404 error, the file doesn't exist on server - check if it's supposed to be a new file
      if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
        setError(`File ${filePath} not found. It may be a new file that hasn't been saved yet.`);
      } else {
        setError(`Failed to open file: ${filePath}`);
      }
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
      
      let content: string;
      let contentType: string;
      
      if (file.isBinary) {
        // For binary files, the content is already in base64 format with data URL
        const dataUrlMatch = file.content.match(/^data:([^;]+);base64,(.+)$/);
        if (dataUrlMatch) {
          content = dataUrlMatch[2]; // Extract just the base64 part
          contentType = dataUrlMatch[1]; // Extract the MIME type
        } else {
          // Fallback - maybe it's already base64 without data URL prefix
          content = file.content;
          contentType = 'application/octet-stream';
        }
        
        // Validate that content is valid base64
        try {
          atob(content);
        } catch (e) {
          throw new Error('Invalid base64 content for binary file');
        }
        
        // Check content length - some servers have limits
        if (content.length > 10 * 1024 * 1024) { // 10MB base64 limit
          throw new Error('File too large for upload (base64 content exceeds 10MB)');
        }
      } else {
        // For text files, encode as base64
        try {
          content = btoa(file.content);
          contentType = file.language === 'json' ? 'application/json' : 
                       file.language === 'html' ? 'text/html' :
                       file.language === 'css' ? 'text/css' :
                       file.language === 'javascript' ? 'text/javascript' :
                       'text/plain';
        } catch (e) {
          throw new Error('Failed to encode text file content as base64');
        }
      }
      
      // Validate and clean the file path
      const cleanPath = filePath.replace(/\\/g, '/').replace(/\/+/g, '/').replace(/^\//, '');
      
      // Validate required fields
      if (!cleanPath || !cleanPath.trim()) {
        throw new Error('File path is required and cannot be empty');
      }
      if (!content) {
        throw new Error('File content is required');
      }

      if (file.isNew) {
        // Create new file with proper content type
        const fileDto = new VersionFileCreateDto({
          path: cleanPath,
          content: content,
          contentType: contentType
        });
        
        // Use bulk upload endpoint (confirmed working)
        await api.files.files_BulkUploadFiles(project.id, version.id, [fileDto]);
      } else {
        // Update existing file
        const updateDto = new VersionFileUpdateDto({
          content: content,
          contentType: contentType
        });
        
        await api.files.files_UpdateVersionFile(project.id, version.id, filePath, updateDto);
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
      
    } catch (error: any) {
      console.error('Failed to save file:', error);
      
      // Extract more detailed error information
      let errorMessage = `Failed to save file: ${filePath}`;
      if (error?.message) {
        errorMessage += ` - ${error.message}`;
      }
      if (error?.details) {
        errorMessage += ` (${error.details})`;
      }
      
      setError(errorMessage);
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

  const commitChanges = async () => {
    if (!project || !commitMessage.trim()) {
      setError('Please enter a commit message.');
      return;
    }

    try {
      setIsCommitting(true);
      setError(null);

      // Get all modified files
      const modifiedFiles = openFiles.filter(f => f.isModified);
      const newFiles = openFiles.filter(f => f.isNew);

      // Helper function to prepare file content for commit
      const prepareFileForCommit = (file: any) => {
        let content: string;
        let contentType: string;
        
        if (file.isBinary) {
          // For binary files, extract base64 content and MIME type
          const dataUrlMatch = file.content.match(/^data:([^;]+);base64,(.+)$/);
          if (dataUrlMatch) {
            content = dataUrlMatch[2];
            contentType = dataUrlMatch[1];
          } else {
            content = file.content;
            contentType = 'application/octet-stream';
          }
          
          // Validate base64 content
          try {
            atob(content);
          } catch (e) {
            throw new Error(`Invalid base64 content for binary file: ${file.path}`);
          }
        } else {
          // For text files, encode as base64
          try {
            content = btoa(file.content);
            contentType = file.language === 'json' ? 'application/json' : 
                         file.language === 'html' ? 'text/html' :
                         file.language === 'css' ? 'text/css' :
                         file.language === 'javascript' ? 'text/javascript' :
                         'text/plain';
          } catch (e) {
            throw new Error(`Failed to encode text file content as base64: ${file.path}`);
          }
        }
        
        // Clean the file path
        const cleanPath = file.path.replace(/\\/g, '/').replace(/\/+/g, '/').replace(/^\//, '');
        
        return { content, contentType, path: cleanPath };
      };

      // Prepare changes for commit
      const changes: VersionFileChangeDto[] = [
        ...modifiedFiles.map(file => {
          const { content, contentType, path } = prepareFileForCommit(file);
          return new VersionFileChangeDto({
            path: path,
            action: 'modify',
            content: content,
            contentType: contentType
          });
        }),
        ...newFiles.map(file => {
          const { content, contentType, path } = prepareFileForCommit(file);
          return new VersionFileChangeDto({
            path: path,
            action: 'add',
            content: content,
            contentType: contentType
          });
        })
      ];

      // Create commit DTO
      const commitDto = new VersionCommitDto({
        commitMessage: commitMessage.trim(),
        changes: changes
      });

      // Commit the changes to create a new version
      const response = await api.versions.versions_CommitChanges(project.id, commitDto);

      if (response.success && response.data) {
        // Navigate to the new version
        navigate(`/editor/${project.id}/${response.data.id}?mode=edit`, { replace: true });
        setShowCommitModal(false);
        setCommitMessage('');
        
        // Mark all files as saved
        setOpenFiles(prev => prev.map(f => ({
          ...f,
          isModified: false,
          isNew: false,
          originalContent: f.content
        })));
      } else {
        setError(response.message || 'Failed to commit changes');
      }
    } catch (error) {
      console.error('Failed to commit changes:', error);
      setError('Failed to commit changes. Please try again.');
    } finally {
      setIsCommitting(false);
    }
  };

  const updateCommitMessage = async () => {
    if (!version || !commitMessage.trim()) {
      setError('Please enter a commit message.');
      return;
    }

    try {
      setIsCommitting(true);
      setError(null);

      const updateDto = new VersionUpdateDto({
        commitMessage: commitMessage.trim()
      });

      const response = await api.versions.versions_Update(version.id, updateDto);

      if (response.success && response.data) {
        // Update local version state
        setVersion(prev => prev ? { ...prev, commitMessage: commitMessage.trim() } : null);
        setShowCommitModal(false);
        setCommitMessage('');
      } else {
        setError(response.message || 'Failed to update commit message');
      }
    } catch (error) {
      console.error('Failed to update commit message:', error);
      setError('Failed to update commit message. Please try again.');
    } finally {
      setIsCommitting(false);
    }
  };

  const handleFileUpload = async (files: FileList | File[]) => {
    if (!project || !version) {
      setError('Project or version information is missing. Please try refreshing the page.');
      return;
    }

    const fileArray = Array.from(files);
    
    // Check for very large files and warn user
    const maxSize = 50 * 1024 * 1024; // 50MB limit
    const largeFiles = fileArray.filter(file => file.size > maxSize);
    
    if (largeFiles.length > 0) {
      const fileNames = largeFiles.map(f => f.name).join(', ');
      setError(`Files too large (>50MB): ${fileNames}. Please upload smaller files.`);
      return;
    }
    
    setUploadingFiles(fileArray);

    try {
      setIsUploading(true);
      setError(null);

      // Prepare all files for bulk upload
      const filesToUpload: VersionFileCreateDto[] = [];
      const editorFiles: EditorFile[] = [];

      for (const file of fileArray) {
        // Validate file name
        if (!file.name || !file.name.trim()) {
          setError(`Invalid file name: File ${fileArray.indexOf(file) + 1} has no name`);
          continue;
        }

        // Determine file path based on selected directory
        const filePath = selectedTreeItem && selectedTreeItem !== '/' 
          ? `${selectedTreeItem}/${file.name}`
          : file.name;

        // Clean and validate file path
        const cleanPath = filePath.replace(/\\/g, '/').replace(/\/+/g, '/').replace(/^\//, '');
        if (!cleanPath || cleanPath.includes('..') || cleanPath.startsWith('/')) {
          setError(`Invalid file path: ${filePath}`);
          continue;
        }

        // Read file content
        const { content, isBinary } = await readFileContent(file);
        const language = detectLanguage(cleanPath, project.language);

        // Prepare content for upload
        let uploadContent: string;
        let contentType: string;
        
        if (isBinary) {
          const dataUrlMatch = content.match(/^data:([^;]+);base64,(.+)$/);
          if (dataUrlMatch) {
            uploadContent = dataUrlMatch[2];
            contentType = dataUrlMatch[1];
          } else {
            uploadContent = content;
            contentType = 'application/octet-stream';
          }
        } else {
          uploadContent = btoa(content);
          contentType = language === 'json' ? 'application/json' : 
                       language === 'html' ? 'text/html' :
                       language === 'css' ? 'text/css' :
                       language === 'javascript' ? 'text/javascript' :
                       'text/plain';
        }

        // Add to upload batch
        filesToUpload.push(new VersionFileCreateDto({
          path: cleanPath,
          content: uploadContent,
          contentType: contentType
        }));

        // Create editor file
        const newFile: EditorFile = {
          path: cleanPath,
          content,
          language,
          isModified: true,
          isNew: true,
          originalContent: '',
          isBinary,
          isEditorInitialized: false
        };

        editorFiles.push(newFile);
      }

      // Bulk upload all files at once
      if (filesToUpload.length > 0) {
        await api.files.files_BulkUploadFiles(project.id, version.id, filesToUpload);

        // Add all files to editor
        setOpenFiles(prev => {
          const filtered = prev.filter(f => !editorFiles.some(nf => nf.path === f.path));
          return [...filtered, ...editorFiles];
        });

        // Set first file as active
        if (editorFiles.length > 0) {
          setActiveFile(editorFiles[0].path);
        }
      }
      
      setShowUploadModal(false);
      setUploadingFiles([]);
    } catch (error) {
      console.error('Failed to upload files:', error);
      setError('Failed to upload files. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const readFileContent = (file: File): Promise<{ content: string; isBinary: boolean }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      // Check if file should be read as text
      const isTextFile = file.type.startsWith('text/') || 
                        file.type === 'application/json' || 
                        file.type === 'application/javascript' ||
                        file.type === 'application/typescript' ||
                        file.type === 'application/xml' ||
                        file.type === '' || 
                        file.name.match(/\.(js|jsx|ts|tsx|html|css|scss|sass|less|json|md|txt|xml|yml|yaml|svg|csv|log|ini|conf|cfg|env|gitignore|dockerfile|makefile|py|java|cpp|c|h|php|rb|go|rs|swift|kt|scala|sh|bat|ps1)$/i);
      
      reader.onload = (e) => {
        const result = e.target?.result;
        
        if (isTextFile && typeof result === 'string') {
          resolve({ content: result, isBinary: false });
        } else if (!isTextFile && result instanceof ArrayBuffer) {
          // For binary files, use proper base64 encoding
          try {
            const base64String = arrayBufferToBase64(result);
            resolve({ content: `data:${file.type || 'application/octet-stream'};base64,${base64String}`, isBinary: true });
          } catch (error) {
            reject(new Error('Failed to convert binary file to base64'));
          }
        } else {
          reject(new Error('Unexpected file format'));
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
      
      if (isTextFile) {
        reader.readAsText(file);
      } else {
        reader.readAsArrayBuffer(file);
      }
    });
  };

  const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const chunkSize = 0x8000; // 32KB chunks to avoid call stack overflow
    
    for (let i = 0; i < bytes.length; i += chunkSize) {
      const chunk = bytes.subarray(i, i + chunkSize);
      binary += String.fromCharCode.apply(null, Array.from(chunk));
    }
    
    return btoa(binary);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files);
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

    // Determine the parent directory for the new file
    let parentPath = '';
    if (selectedTreeItem && selectedTreeItem !== '/') {
        const selectedItem = findItemInTree(fileTree, selectedTreeItem);
        if (selectedItem && !selectedItem.isDirectory) {
            // If selected item is a file, create file at the same level (parent directory)
            const pathParts = selectedTreeItem.split('/');
            pathParts.pop(); // Remove the file name
            parentPath = pathParts.join('/');
        } else {
            // If selected item is a directory, create file inside it
            parentPath = selectedTreeItem;
        }
    }

    const filePath = parentPath 
        ? `${parentPath}/${newFileName.trim()}`
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
        
        // Get default content based on file type
        const getDefaultContent = (filePath: string, language: string): string => {
            const extension = filePath.split('.').pop()?.toLowerCase();
            
            if (extension === 'py') {
                return `from UIComponent import ui

if __name__ == "__main__":
    # Your main logic here
    description = {
        "30 MPa": ("High-strength concrete", "suitable for heavy structural elements."),
        "25 MPa": ("Standard concrete", "used in general-purpose construction."),
        "20 MPa": ("Low-strength concrete", "typically used for non-structural work."),
    }

    match ui.dropdown:
        case strength if strength in description:
            strength_label, usage = description[strength]
            print(f"Element: {ui.text_input}")
            print(f"Selected: {strength_label} ({strength})")
            print(f"Usage: {usage}")
        case _:
            print("Invalid concrete strength selected.")
`;
            }
            
            return '';
        };
        
        const defaultContent = getDefaultContent(filePath, language);
        
        const newFile: EditorFile = {
        path: filePath,
        content: defaultContent,
        language,
        isModified: true,
        isNew: true,
        originalContent: '',
        isEditorInitialized: false
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

  const updateFileTreeFromOpenFiles = () => {
    // Update file tree based on current open files
    const tempFileData = openFiles.map(file => ({ path: file.path, content: file.content }));
    setFileTree(buildFileTree(tempFileData));
  };

  const createNewFolder = async () => {
    // Add validation with proper error messages
    if (!newFolderName.trim()) {
        setError('Please enter a folder name.');
        return;
    }

    if (!project || !version) {
        setError('Project or version information is missing. Please try refreshing the page.');
        return;
    }

    // Determine the parent directory for the new folder
    let parentPath = '';
    if (selectedTreeItem && selectedTreeItem !== '/') {
        const selectedItem = findItemInTree(fileTree, selectedTreeItem);
        if (selectedItem && !selectedItem.isDirectory) {
            // If selected item is a file, create folder at the same level (parent directory)
            const pathParts = selectedTreeItem.split('/');
            pathParts.pop(); // Remove the file name
            parentPath = pathParts.join('/');
        } else {
            // If selected item is a directory, create folder inside it
            parentPath = selectedTreeItem;
        }
    }

    const folderPath = parentPath 
        ? `${parentPath}/${newFolderName.trim()}`
        : newFolderName.trim();

    // Check if folder already exists in file tree
    const existsInFileTree = fileTree.some(item => findFileInTree(item, folderPath));

    if (existsInFileTree) {
        setError('A folder with this name already exists.');
        return;
    }

    try {
        // Create a placeholder file in the folder to ensure it gets created
        // This is a common pattern since most file systems need at least one file in a folder
        const placeholderPath = `${folderPath}/.gitkeep`;
        const placeholderContent = '# This file keeps the folder in version control';
        
        const placeholderFile: EditorFile = {
            path: placeholderPath,
            content: placeholderContent,
            language: 'text',
            isModified: true,
            isNew: true,
            originalContent: '',
            isEditorInitialized: false
        };

        setOpenFiles(prev => [...prev, placeholderFile]);
        
        // Expand the parent folder if it exists
        if (parentPath) {
            setExpandedFolders(prev => new Set([...prev, parentPath]));
        }
        
        // Also expand the newly created folder
        setExpandedFolders(prev => new Set([...prev, folderPath]));
        
        // Close modal and reset form
        setShowNewFolderModal(false);
        setNewFolderName('');
        setError(null);
        
    } catch (error) {
        console.error('Error creating new folder:', error);
        setError('Failed to create new folder. Please try again.');
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

  const handleContextMenu = (e: React.MouseEvent, itemPath: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    setContextMenuTarget(itemPath);
    setSelectedTreeItem(itemPath);
    setShowContextMenu(true);
  };

  const handleContextMenuAction = (action: string) => {
    switch (action) {
      case 'newFile':
        setSelectedTreeItem(contextMenuTarget || '/');
        setShowNewFileModal(true);
        break;
      case 'newFolder':
        setSelectedTreeItem(contextMenuTarget || '/');
        setShowNewFolderModal(true);
        break;
      case 'rename':
        if (contextMenuTarget) {
          const targetItem = findItemInTree(fileTree, contextMenuTarget);
          setItemToRename(contextMenuTarget);
          setNewItemName(targetItem?.name || '');
          setShowRenameModal(true);
        }
        break;
      case 'delete':
        if (contextMenuTarget) {
          setFileToDelete(contextMenuTarget);
          setShowDeleteModal(true);
        }
        break;
    }
    
    setShowContextMenu(false);
  };

  const handleEmptySpaceContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    setContextMenuTarget(null); // null indicates root level
    setSelectedTreeItem('/');
    setShowContextMenu(true);
  };

  const renameItem = async () => {
    if (!itemToRename || !newItemName.trim() || !project || !version) return;

    try {
      const oldPath = itemToRename;
      const pathParts = oldPath.split('/');
      pathParts[pathParts.length - 1] = newItemName.trim();
      const newPath = pathParts.join('/');

      if (oldPath === newPath) {
        setShowRenameModal(false);
        setItemToRename(null);
        setNewItemName('');
        return;
      }

      // Check if new name already exists
      const existsInTree = fileTree.some(item => findFileInTree(item, newPath));
      if (existsInTree) {
        setError('An item with this name already exists.');
        return;
      }

      // For now, we'll handle renaming by creating a new file and deleting the old one
      // This is a simplified approach since the API doesn't have a direct rename endpoint
      const fileInOpenFiles = openFiles.find(f => f.path === oldPath);
      
      if (fileInOpenFiles) {
        // File is open - create new file with new name and same content
        const newFile: EditorFile = {
          ...fileInOpenFiles,
          path: newPath,
          isNew: true,
          isModified: true
        };
        
        setOpenFiles(prev => [
          ...prev.filter(f => f.path !== oldPath),
          newFile
        ]);
        
        // Set as active file
        setActiveFile(newPath);
      } else {
        // File is not open - we need to load it first, then create new one
        try {
          const response = await api.files.files_GetVersionFile(project.id, version.id, oldPath);
          if (response.success && response.data) {
            const content = response.data.content ? atob(response.data.content) : '';
            const language = detectLanguage(newPath, project.language);
            
            const newFile: EditorFile = {
              path: newPath,
              content,
              language,
              isModified: true,
              isNew: true,
              originalContent: content,
              isEditorInitialized: false
            };

            setOpenFiles(prev => [...prev, newFile]);
          }
        } catch (error) {
          console.error('Failed to load file for rename:', error);
          setError('Failed to rename file. Please try again.');
          return;
        }
      }

      // Mark old file for deletion if it's not a new file
      if (!fileInOpenFiles?.isNew) {
        // We'll delete the old file when changes are saved/committed
        // For now, just remove it from open files if it was open
        setOpenFiles(prev => prev.filter(f => f.path !== oldPath));
      }

      setShowRenameModal(false);
      setItemToRename(null);
      setNewItemName('');
      setError(null);
      
    } catch (error) {
      console.error('Failed to rename item:', error);
      setError('Failed to rename item. Please try again.');
    }
  };

  const findFileInTree = (item: FileTreeItem, path: string): boolean => {
    if (item.path === path) return true;
    if (item.children) {
      return item.children.some(child => findFileInTree(child, path));
    }
    return false;
  };

  const findItemInTree = (items: FileTreeItem[], path: string): FileTreeItem | null => {
    for (const item of items) {
      if (item.path === path) return item;
      if (item.children) {
        const found = findItemInTree(item.children, path);
        if (found) return found;
      }
    }
    return null;
  };

  const mergeNewFilesIntoTree = (existingTree: FileTreeItem[], newFiles: EditorFile[]): FileTreeItem[] => {
    const tree = [...existingTree];
    
    for (const file of newFiles) {
      const pathParts = file.path.split('/');
      const fileName = pathParts[pathParts.length - 1];
      
      // Create the file item
      const fileItem: FileTreeItem = {
        path: file.path,
        name: fileName,
        isDirectory: false
      };
      
      if (pathParts.length === 1) {
        // Root level file - add if not already exists
        if (!tree.some(item => item.path === file.path)) {
          tree.push(fileItem);
        }
      } else {
        // Nested file - ensure all parent directories exist
        let currentLevel = tree;
        let currentPath = '';
        
        for (let i = 0; i < pathParts.length - 1; i++) {
          currentPath += (i > 0 ? '/' : '') + pathParts[i];
          
          let dir = currentLevel.find(item => item.path === currentPath);
          if (!dir) {
            // Create missing directory
            dir = {
              path: currentPath,
              name: pathParts[i],
              isDirectory: true,
              children: []
            };
            currentLevel.push(dir);
          }
          
          if (!dir.children) dir.children = [];
          currentLevel = dir.children;
        }
        
        // Add the file if not already exists
        if (!currentLevel.some(item => item.path === file.path)) {
          currentLevel.push(fileItem);
        }
      }
    }
    
    // Sort the tree recursively
    const sortTree = (items: FileTreeItem[]): FileTreeItem[] => {
      return items.sort((a, b) => {
        if (a.isDirectory && !b.isDirectory) return -1;
        if (!a.isDirectory && b.isDirectory) return 1;
        return a.name.localeCompare(b.name);
      }).map(item => ({
        ...item,
        children: item.children ? sortTree(item.children) : undefined
      }));
    };
    
    return sortTree(tree);
  };

  const handleEditorChange = (value: string | undefined, filePath: string) => {
    if (value === undefined) return;

    // Clear any existing timeout to debounce rapid changes during initialization
    if (editorChangeTimeoutRef.current) {
      clearTimeout(editorChangeTimeoutRef.current);
    }

    // Debounce the change detection to avoid false positives during editor initialization
    editorChangeTimeoutRef.current = setTimeout(() => {
      setOpenFiles(prev => prev.map(file => {
        if (file.path === filePath) {
          // Normalize content for comparison (trim whitespace and normalize line endings)
          const normalizedValue = value.replace(/\r\n/g, '\n').trim();
          const normalizedOriginal = file.originalContent.replace(/\r\n/g, '\n').trim();
          
          // Only mark as modified if editor is initialized and content actually differs
          const isActuallyModified = !!file.isEditorInitialized && normalizedValue !== normalizedOriginal;
          
          return {
            ...file,
            content: value,
            isModified: isActuallyModified,
            isEditorInitialized: true
          };
        }
        return file;
      }));
    }, 100); // 100ms debounce
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
            e.stopPropagation();
            handleContextMenu(e, item.path);
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
            {isViewMode ? (
              // View mode - only show edit version button
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate(`/editor/${project?.id}/${version?.id}?mode=edit`)}
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                }
              >
                Edit Version
              </Button>
            ) : (
              // Edit mode
              <>
                {/* Save button for existing versions */}
                {isEditingExistingVersion && openFiles.some(f => f.isModified) && (
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

                {/* Commit Changes button for editing existing versions */}
                {isEditingExistingVersion && openFiles.some(f => f.isModified || f.isNew) && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      setCommitMessage('');
                      setShowCommitModal(true);
                    }}
                    leftIcon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    }
                  >
                    Commit Changes
                  </Button>
                )}

                {/* Edit Commit Message button for non-approved versions */}
                {version && version.status === 'pending' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setCommitMessage(version.commitMessage || '');
                      setShowCommitModal(true);
                    }}
                    leftIcon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    }
                  >
                    Edit Commit Message
                  </Button>
                )}
                
                {!isViewMode && (
                  <>
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
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowUploadModal(true)}
                      leftIcon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      }
                    >
                      Upload Files
                    </Button>
                  </>
                )}
              </>
            )}
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
          <div 
            className="flex-1 overflow-y-auto"
            onContextMenu={handleEmptySpaceContextMenu}
          >
            {fileTree.length > 0 ? (
              <div 
                className="py-2 min-h-full"
                onContextMenu={handleEmptySpaceContextMenu}
              >
                {renderFileTree(fileTree)}
              </div>
            ) : (
              <div 
                className="p-4 text-center text-gray-500 dark:text-gray-400 h-full"
                onContextMenu={handleEmptySpaceContextMenu}
              >
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
                    onClick={() => {
                      setActiveFile(file.path);
                      
                      // Focus the editor after a short delay to ensure it's rendered
                      setTimeout(() => {
                        if (editorRef.current) {
                          editorRef.current.focus();
                        }
                      }, 100);
                    }}
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
              activeFileData.isBinary ? (
                <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                  <div className="text-center max-w-md">
                    <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Binary File</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      This is a binary file (like an image, document, or executable) and cannot be edited in the text editor.
                    </p>
                    <div className="text-sm text-gray-400 dark:text-gray-500 space-y-1">
                      <p><span className="font-medium">File:</span> {activeFileData.path}</p>
                      <p><span className="font-medium">Size:</span> {activeFileData.content.length > 100 ? `${Math.round(activeFileData.content.length / 1024)} KB` : `${activeFileData.content.length} bytes`}</p>
                    </div>
                    {activeFileData.content.startsWith('data:image/') && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Preview:</p>
                        <img 
                          src={activeFileData.content} 
                          alt={activeFileData.path}
                          className="max-w-full max-h-64 mx-auto rounded border border-gray-200 dark:border-gray-700"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <MonacoEditor
                  key={activeFileData.path} // Force re-render when switching files
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
                    readOnly: isViewMode,
                    tabSize: 2,
                    insertSpaces: true
                  }}
                  onMount={(editor: monaco.editor.IStandaloneCodeEditor) => {
                    editorRef.current = editor;
                    
                    
                    // Mark editor as initialized after a short delay to avoid initial change events
                    setTimeout(() => {
                      setOpenFiles(prev => prev.map(file => 
                        file.path === activeFileData?.path 
                          ? { ...file, isEditorInitialized: true }
                          : file
                      ));
                    }, 200);
                    
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
              )
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

      {/* New Folder Modal */}
      <Modal
        isOpen={showNewFolderModal}
        onClose={() => {
          setShowNewFolderModal(false);
          setNewFolderName('');
          setError(null); // Clear errors when closing
        }}
        title="Create New Folder"
        footer={
          <>
            <Button 
              variant="outline" 
              onClick={() => {
                setShowNewFolderModal(false);
                setNewFolderName('');
                setError(null);
              }}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={createNewFolder}
              disabled={!newFolderName.trim()} // Disable if no folder name
            >
              Create
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Folder Name"
            placeholder="e.g., components, utils, assets"
            value={newFolderName}
            onChange={(e) => {
              setNewFolderName(e.target.value);
              // Clear error when user starts typing
              if (error && error.includes('folder name')) {
                setError(null);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && newFolderName.trim()) {
                createNewFolder();
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
          
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Note: A .gitkeep file will be created in the folder to ensure it's tracked in version control.
          </div>
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

      {/* Commit Changes Modal */}
      <Modal
        isOpen={showCommitModal}
        onClose={() => {
          setShowCommitModal(false);
          setCommitMessage('');
        }}
        title={isEditingExistingVersion && !openFiles.some(f => f.isModified || f.isNew) ? "Edit Commit Message" : "Commit Changes"}
        size="md"
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => {
                setShowCommitModal(false);
                setCommitMessage('');
              }}
              disabled={isCommitting}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={isEditingExistingVersion && !openFiles.some(f => f.isModified || f.isNew) ? updateCommitMessage : commitChanges}
              loading={isCommitting}
              disabled={!commitMessage.trim()}
            >
              {isEditingExistingVersion && !openFiles.some(f => f.isModified || f.isNew) ? "Update Message" : "Commit Changes"}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Commit Message"
            placeholder="Describe the changes you made..."
            value={commitMessage}
            onChange={(e) => setCommitMessage(e.target.value)}
            required
            autoFocus
          />
          
          {openFiles.some(f => f.isModified || f.isNew) && (
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <div className="font-medium mb-2">Files to be committed:</div>
              <ul className="space-y-1">
                {openFiles.filter(f => f.isModified || f.isNew).map(file => (
                  <li key={file.path} className="font-mono text-xs">
                    <span className={`inline-block w-4 ${file.isNew ? 'text-green-600' : 'text-blue-600'}`}>
                      {file.isNew ? '+' : 'M'}
                    </span>
                    {file.path}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Modal>

      {/* Upload Files Modal */}
      <Modal
        isOpen={showUploadModal}
        onClose={() => {
          setShowUploadModal(false);
          setUploadingFiles([]);
          setDragActive(false);
        }}
        title="Upload Files"
        size="md"
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => {
                setShowUploadModal(false);
                setUploadingFiles([]);
                setDragActive(false);
              }}
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.multiple = true;
                input.onchange = (e) => {
                  const files = (e.target as HTMLInputElement).files;
                  if (files) {
                    handleFileUpload(files);
                  }
                };
                input.click();
              }}
              loading={isUploading}
              disabled={isUploading}
            >
              Select Files
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          {/* Drag and Drop Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <svg className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Drop files here or click to select
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Supports all file types. Multiple files can be uploaded at once.
            </p>
            {selectedTreeItem && selectedTreeItem !== '/' && (
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                Files will be uploaded to: <span className="font-mono">{selectedTreeItem}/</span>
              </p>
            )}
          </div>

          {/* Upload Progress */}
          {uploadingFiles.length > 0 && (
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Uploading {uploadingFiles.length} file(s)...
              </div>
              {uploadingFiles.map((file, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <div className="flex-1 truncate">
                    <span className="font-mono text-xs">{file.name}</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-2">
                      ({(file.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                  {isUploading && (
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* File Type Support Info */}
          <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
            <div className="font-medium">File upload limits:</div>
            <div>• Maximum file size: 50MB per file</div>
            <div>• All file types supported</div>
            <div>• Text files: .js, .jsx, .ts, .tsx, .html, .css, .scss, .json, .md, .txt, .xml, .yml, .yaml</div>
            <div>• Binary files: Images, documents, and other formats (will be base64 encoded)</div>
          </div>
        </div>
      </Modal>

      {/* Rename Modal */}
      <Modal
        isOpen={showRenameModal}
        onClose={() => {
          setShowRenameModal(false);
          setItemToRename(null);
          setNewItemName('');
          setError(null);
        }}
        title="Rename Item"
        footer={
          <>
            <Button 
              variant="outline" 
              onClick={() => {
                setShowRenameModal(false);
                setItemToRename(null);
                setNewItemName('');
                setError(null);
              }}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={renameItem}
              disabled={!newItemName.trim()}
            >
              Rename
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="New Name"
            placeholder="Enter new name..."
            value={newItemName}
            onChange={(e) => {
              setNewItemName(e.target.value);
              if (error && error.includes('name already exists')) {
                setError(null);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && newItemName.trim()) {
                renameItem();
              }
            }}
            autoFocus
          />
        </div>
      </Modal>

      {/* Context Menu */}
      {showContextMenu && (
        <div
          className="fixed z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg py-1 min-w-48"
          style={{
            left: `${contextMenuPosition.x}px`,
            top: `${contextMenuPosition.y}px`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* For empty space or directories - show New File and New Folder */}
          {(!contextMenuTarget || (contextMenuTarget && findItemInTree(fileTree, contextMenuTarget)?.isDirectory)) && (
            <>
              <button
                className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                onClick={() => handleContextMenuAction('newFile')}
              >
                <svg className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                New File
              </button>
              <button
                className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                onClick={() => handleContextMenuAction('newFolder')}
              >
                <svg className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                New Folder
              </button>
              {contextMenuTarget && <div className="border-t border-gray-200 dark:border-gray-600 my-1"></div>}
            </>
          )}
          
          {/* For specific items - show Rename and Delete */}
          {contextMenuTarget && (
            <>
              <button
                className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                onClick={() => handleContextMenuAction('rename')}
              >
                <svg className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Rename
              </button>
              
              {!isViewMode && (
                <button
                  className="w-full px-3 py-2 text-left text-sm hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 flex items-center"
                  onClick={() => handleContextMenuAction('delete')}
                >
                  <svg className="w-4 h-4 mr-2 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default EditorPage;