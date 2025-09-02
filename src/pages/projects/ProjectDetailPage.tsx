// src/pages/projects/ProjectDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '@/api/api';
import { SortDirection } from '@/api/enums';
import Button from '@/components/common/Button';
import Modal, { ConfirmationModal } from '@/components/common/Modal';
import { VersionCreateDto, VersionFileCreateDto, VersionReviewSubmissionDto, ProgramUpdateDto } from '@/api';
import ProgramUserAssignmentModal from '@/components/admin/ProgramUserAssignmentModal';
import IconDisplay from '@/components/icons/IconDisplay';
import IconUploader from '@/components/icons/IconUploader';
import { IconEntityType } from '@/api/enums';

const mimeTypeToFormat = (mimeType: string): string => {
  const formatMap: Record<string, string> = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
    'image/gif': 'gif',
    'image/svg+xml': 'svg',
    'image/webp': 'webp',
    'image/x-icon': 'ico',
    'image/vnd.microsoft.icon': 'ico'
  };
  return formatMap[mimeType] || mimeType.split('/')[1] || 'png';
};

// Interfaces
interface ProjectDetail {
  id: string;
  name: string;
  description?: string;
  language: string;
  type: string;
  creator: string;
  createdAt: Date;
  status: string;
  currentVersion?: string;
  mainFile?: string;
  uiType: string;
  isPublic: boolean;
  deploymentInfo?: any;
  permissions?: any[];
  stats?: {
    totalExecutions?: number;
    successfulExecutions?: number;
    failedExecutions?: number;
    lastExecution?: Date;
    totalVersions?: number;
    lastUpdate?: Date;
  };
}

interface VersionDetail {
  id: string;
  versionNumber: number;
  commitMessage?: string;
  createdBy: string;
  createdAt: Date;
  status: string;
  reviewer?: string;
  reviewedAt?: Date;
  reviewComments?: string;
  fileCount: number;
  isCurrent: boolean;
}


interface ReviewForm {
  comments: string;
  action: 'approved' | 'rejected' | '';
}

const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  // State management
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [versions, setVersions] = useState<VersionDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingVersions, setIsLoadingVersions] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Modals
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [versionToDelete, setVersionToDelete] = useState<string | null>(null);
  const [versionToReview, setVersionToReview] = useState<VersionDetail | null>(null);
  const [isDeletingVersion, setIsDeletingVersion] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [showAccessControlModal, setShowAccessControlModal] = useState(false);
  

  // Review form
  const [reviewForm, setReviewForm] = useState<ReviewForm>({
    comments: '',
    action: ''
  });

  // Pagination for versions
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20);
  const [totalVersions, setTotalVersions] = useState(0);
  
  // Icon management state
  const [iconData, setIconData] = useState<string | null>(null);
  const [iconId, setIconId] = useState<string | null>(null);
  const [showIconModal, setShowIconModal] = useState(false);
  const [isUploadingIcon, setIsUploadingIcon] = useState(false);
  const [iconError, setIconError] = useState<string | null>(null);

  // Visibility management state
  const [isUpdatingVisibility, setIsUpdatingVisibility] = useState(false);


  useEffect(() => {
    if (projectId) {
      loadProjectDetails();
      loadVersions();
      loadProjectIcon();
    }
  }, [projectId, currentPage]);

  const loadProjectDetails = async () => {
    if (!projectId) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await api.programs.programs_GetById(projectId);
      
      if (response.success && response.data) {
        const data = response.data;
        setProject({
          id: data.id || '',
          name: data.name || 'Untitled Project',
          description: data.description,
          language: data.language || 'javascript',
          type: data.type || 'web',
          creator: data.creator || 'Unknown',
          createdAt: data.createdAt || new Date(),
          status: data.status || 'draft',
          currentVersion: data.currentVersion,
          mainFile: data.mainFile,
          uiType: data.uiType || 'standard',
          isPublic: data.isPublic || false,
          deploymentInfo: data.deploymentInfo,
          permissions: data.permissions,
          stats: data.stats
        });
      } else {
        setError(response.message || 'Failed to load project details');
      }
    } catch (error) {
      console.error('Failed to load project details:', error);
      setError('Failed to load project details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadVersions = async () => {
    if (!projectId) return;

    try {
      setIsLoadingVersions(true);

      const response = await api.versions.versions_GetByProgram(
        projectId,
        currentPage,
        pageSize,
        'CreatedDate',
        SortDirection._1 // Descending - newest first
      );

      if (response.success && response.data) {
        const versionData = response.data.items?.map(version => ({
          id: version.id || '',
          versionNumber: version.versionNumber || 1,
          commitMessage: version.commitMessage,
          createdBy: version.createdByName || 'Unknown',
          createdAt: version.createdAt || new Date(),
          status: version.status || 'pending',
          reviewer: version.reviewerName,
          reviewedAt: version.reviewedAt,
          reviewComments: version.commitMessage, // Fixed from commitMessage
          fileCount: version.fileCount || 0,
          isCurrent: version.isCurrent || false
        })) || [];

        setVersions(versionData);
        setTotalVersions(response.data.totalCount || 0);
      }
    } catch (error) {
      console.error('Failed to load versions:', error);
      setError('Failed to load version history.');
    } finally {
      setIsLoadingVersions(false);
    }
  };

  const createNewVersion = async () => {
    if (!projectId || !project) {
      setError('Project information is missing. Please try refreshing the page.');
      return;
    }

    try {
      setError(null);

      // Prepare files for the version if this is the first version
      let files: VersionFileCreateDto[] = [];
      
      if (versions.length === 0) {
        // Create sample files based on project language
        // files = createSampleFiles(project.language, project.type);
      }

      // Create version using create endpoint with empty commit message
      const createDto = new VersionCreateDto({
        programId: projectId,
        commitMessage: 'Initial version',
        files: files
      });

      const response = await api.versions.versions_Create(createDto);

      if (response.success && response.data) {
        // Navigate directly to editor with the new version
        navigate(`/editor/${projectId}/${response.data.id}`, {
          state: { mode: 'edit' }
        });
      } else {
        setError(response.message || 'Failed to create version');
      }
    } catch (error) {
      console.error('Failed to create version:', error);
      setError('Failed to create version. Please try again.');
    }
  };

  const createSampleFiles = (language: string, type: string): VersionFileCreateDto[] => {
    const files: VersionFileCreateDto[] = [];
    
    const lang = language.toLowerCase();
    
    if (lang.includes('javascript') || lang.includes('js')) {
      if (type === 'web') {
        files.push(
          new VersionFileCreateDto({
            path: 'index.html',
            content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${project?.name || 'My Project'}</title>
</head>
<body>
    <h1>Welcome to ${project?.name || 'My Project'}</h1>
    <p>This is your project homepage.</p>
    <script src="script.js"></script>
</body>
</html>`,
            contentType: 'text/html'
          }),
          new VersionFileCreateDto({
            path: 'script.js',
            content: `// ${project?.name || 'My Project'}
console.log('Hello, World!');

// Add your JavaScript code here
function main() {
    console.log('Project started successfully!');
}

main();`,
            contentType: 'text/javascript'
          }),
          new VersionFileCreateDto({
            path: 'style.css',
            content: `/* ${project?.name || 'My Project'} Styles */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f5f5f5;
}

h1 {
    color: #333;
    text-align: center;
}

p {
    color: #666;
    text-align: center;
}`,
            contentType: 'text/css'
          })
        );
      } else {
        files.push(
          new VersionFileCreateDto({
            path: 'index.js',
            content: `// ${project?.name || 'My Project'}
console.log('Hello, World!');

// Add your code here
function main() {
    console.log('Project started successfully!');
}

main();`,
            contentType: 'text/javascript'
          }),
          new VersionFileCreateDto({
            path: 'package.json',
            content: `{
  "name": "${project?.name?.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'my-project'}",
  "version": "1.0.0",
  "description": "${project?.description || 'My Node.js project'}",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}`,
            contentType: 'application/json'
          })
        );
      }
    } else if (lang.includes('python')) {
      files.push(
        new VersionFileCreateDto({
          path: 'main.py',
          content: `# ${project?.name || 'My Project'}
"""
${project?.description || 'A Python project'}
"""

def main():
    print("Hello, World!")
    print("Project started successfully!")

if __name__ == "__main__":
    main()`,
          contentType: 'text/x-python'
        }),
        new VersionFileCreateDto({
          path: 'requirements.txt',
          content: `# Add your Python dependencies here
# Example:
# requests>=2.25.1
# numpy>=1.21.0`,
          contentType: 'text/plain'
        })
      );
    } else if (lang.includes('java')) {
      files.push(
        new VersionFileCreateDto({
          path: 'Main.java',
          content: `// ${project?.name || 'My Project'}
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        System.out.println("Project started successfully!");
    }
}`,
          contentType: 'text/x-java-source'
        })
      );
    } else {
      // Generic files for other languages
      files.push(
        new VersionFileCreateDto({
          path: 'README.md',
          content: `# ${project?.name || 'My Project'}

${project?.description || 'A programming project'}

## Getting Started

Add your project documentation here.`,
          contentType: 'text/markdown'
        })
      );
    }

    // Always add README if not already added
    if (!files.some(f => f.path === 'README.md')) {
      files.push(
        new VersionFileCreateDto({
          path: 'README.md',
          content: `# ${project?.name || 'My Project'}

${project?.description || 'A programming project'}

## Getting Started

Add your project documentation here.`,
          contentType: 'text/markdown'
        })
      );
    }

    return files;
  };

  const deleteVersion = async () => {
    if (!versionToDelete) return;

    try {
      setIsDeletingVersion(true);
      
      const response = await api.versions.versions_Delete(versionToDelete);
      
      if (response.success) {
        await loadVersions();
        setShowDeleteModal(false);
        setVersionToDelete(null);
      } else {
        setError(response.message || 'Failed to delete version');
      }
    } catch (error) {
      console.error('Failed to delete version:', error);
      setError('Failed to delete version. Please try again.');
    } finally {
      setIsDeletingVersion(false);
    }
  };

  const submitReview = async () => {
    if (!versionToReview || !reviewForm.action) {
      setError('Please select an action (approve or reject).');
      return;
    }

    try {
      setIsSubmittingReview(true);
      setError(null);

      // Assuming the API has a review endpoint
      const response = await api.versions.versions_SubmitReview(versionToReview.id, new VersionReviewSubmissionDto({
        status: reviewForm.action,
        comments: reviewForm.comments.trim() || "No comments provided"
      }));

      if (response.success) {
        await loadVersions();
        setShowReviewModal(false);
        setVersionToReview(null);
        setReviewForm({ comments: '', action: '' });
      } else {
        setError(response.message || 'Failed to submit review');
      }
    } catch (error) {
      console.error('Failed to submit review:', error);
      setError('Failed to submit review. Please try again.');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const openReviewModal = (version: VersionDetail) => {
    setVersionToReview(version);
    setReviewForm({ comments: '', action: '' });
    setShowReviewModal(true);
  };

  const getStatusColor = (status: string): string => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'approved') {
      return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
    }
    if (statusLower === 'pending') {
      return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
    }
    if (statusLower === 'rejected') {
      return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
    }
    if (statusLower === 'draft') {
      return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800';
    }
    return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30';
  };

  const getStatusIcon = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'approved') {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
    }
    if (statusLower === 'rejected') {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      );
    }
    if (statusLower === 'pending') {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    }
    return null;
  };

  const canReview = (version: VersionDetail): boolean => {
    return version.status.toLowerCase() === 'pending' && !version.reviewer;
  };

  const formatDateTime = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatRelativeTime = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return 'Recently';
  };

  const loadProjectIcon = async () => {
    if (!projectId) return;
    
    try {
      const response = await api.iconsClient.icons_GetIconByEntity(
        IconEntityType.Program,
        projectId
      );

      if (response.success && response.data?.iconData) {
        // Ensure we're storing a string, not an object
        const iconDataString = typeof response.data.iconData === 'string' ? response.data.iconData : String(response.data.iconData);
        setIconData(iconDataString);
        setIconId(response.data.id || null);
      } else {
        setIconData(null);
        setIconId(null);
      }
    } catch (error) {
      console.error('Failed to load project icon:', error);
      setIconData(null);
    }
  };

  const handleIconUpload = async (file: File, dataUrl: string) => {
    if (!projectId) return;

    try {
      setIsUploadingIcon(true);
      setIconError(null);

      const base64 = dataUrl.split(',')[1];
      
      const iconCreateDto = {
        name: file.name,
        iconData: base64,
        format: mimeTypeToFormat(file.type),
        entityType: IconEntityType.Program,
        entityId: projectId,
        description: `Icon for project ${project?.name || projectId}`
      };

      let response;
      if (iconData && iconId) {
        const iconUpdateDto = {
          name: file.name,
          iconData: base64,
          format: mimeTypeToFormat(file.type),
          description: `Icon for project ${project?.name || projectId}`
        };
        response = await api.iconsClient.icons_UpdateIcon(iconId, iconUpdateDto);
      } else {
        response = await api.iconsClient.icons_CreateIcon(iconCreateDto);
      }

      if (response.success) {
        // If iconData is returned, use it; otherwise reload the icon
        if (response.data?.iconData) {
          setIconData(response.data.iconData);
          setIconId(response.data.id || null);
        } else {
          // Reload the icon from the server
          await loadProjectIcon();
        }
        
        setShowIconModal(false);
        setIconError(null); // Clear any previous errors
      } else {
        throw new Error(response.message || 'Failed to upload icon');
      }
    } catch (error) {
      console.error('Failed to upload icon:', error);
      setIconError(error instanceof Error ? error.message : 'Failed to upload icon');
    } finally {
      setIsUploadingIcon(false);
    }
  };

  const handleIconDelete = async () => {
    if (!projectId || !iconData) return;

    try {
      setIsUploadingIcon(true);
      setIconError(null);

      const response = await api.iconsClient.icons_DeleteIconByEntity(
        IconEntityType.Program,
        projectId
      );

      if (response.success) {
        setIconData(null);
        setShowIconModal(false);
      } else {
        throw new Error(response.message || 'Failed to delete icon');
      }
    } catch (error) {
      console.error('Failed to delete icon:', error);
      setIconError(error instanceof Error ? error.message : 'Failed to delete icon');
    } finally {
      setIsUploadingIcon(false);
    }
  };

  const handleUploadError = (error: string) => {
    setIconError(error);
  };

  const toggleVisibility = async () => {
    if (!project || !projectId) return;

    try {
      setIsUpdatingVisibility(true);
      setError(null);

      const updateDto = new ProgramUpdateDto({
        name: project.name,
        description: project.description,
        language: project.language,
        type: project.type,
        uiType: project.uiType,
        isPublic: !project.isPublic,
        mainFile: project.mainFile
      });

      const response = await api.programs.programs_Update(projectId, updateDto);

      if (response.success) {
        // Update local state
        setProject(prev => prev ? { ...prev, isPublic: !prev.isPublic } : null);
      } else {
        setError(response.message || 'Failed to update project visibility');
      }
    } catch (error) {
      console.error('Failed to update visibility:', error);
      setError('Failed to update project visibility. Please try again.');
    } finally {
      setIsUpdatingVisibility(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (error && !project) {
    return (
      <div className="p-6">
        <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Error</h3>
              <p className="mt-1 text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
            <div className="ml-auto pl-3">
              <button
                onClick={() => navigate('/projects')}
                className="text-sm text-red-800 dark:text-red-200 hover:text-red-600 dark:hover:text-red-300"
              >
                Back to Projects
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Project not found</h3>
          <p className="mt-1 text-gray-500 dark:text-gray-400">The project you're looking for doesn't exist.</p>
          <div className="mt-4">
            <Button variant="primary" onClick={() => navigate('/projects')}>
              Back to Projects
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/projects')}
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            }
          >
            Back to Projects
          </Button>
          <div className="flex items-center space-x-3">
            {/* Project Icon with hover edit */}
            <div 
              className="relative group cursor-pointer" 
              onClick={() => setShowIconModal(true)}
            >
              <IconDisplay
                iconData={iconData}
                size="xl"
                entityType="program"
              />
              {/* Hover edit overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
            </div>
            
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {project.name}
              </h1>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                {project.language} • {project.type} • Created {formatRelativeTime(project.createdAt)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          {versions.length === 0 && (
            <Button
              variant="primary"
              onClick={createNewVersion}
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              }
            >
              Create First Version
            </Button>
          )}
          
          <Button
            variant="outline"
            onClick={() => setShowAccessControlModal(true)}
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            }
          >
            Manage Access
          </Button>
          
          <Button
            variant="outline"
            onClick={() => navigate(`/projects/${project.id}/components`)}
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            }
          >
            Manage Components
          </Button>
          
          {/* <Button
            variant="outline"
            onClick={() => navigate(`/projects/${project.id}/components/designer`)}
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            }
          >
            Design Component
          </Button> */}
        </div>
      </div>

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
            <div className="ml-auto pl-3">
              <button
                onClick={() => setError(null)}
                className="text-red-800 dark:text-red-200 hover:text-red-600 dark:hover:text-red-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Project Info */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Basic Info */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Project Information</h2>
              <div className="space-y-3">
                {project.description && (
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Description:</span>
                    <p className="text-sm text-gray-900 dark:text-white mt-1">{project.description}</p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Language:</span>
                    <p className="text-sm text-gray-900 dark:text-white">{project.language}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Type:</span>
                    <p className="text-sm text-gray-900 dark:text-white">{project.type}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Status:</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Creator:</span>
                    <p className="text-sm text-gray-900 dark:text-white">{project.creator}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Statistics</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Versions:</span>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{totalVersions}</p>
              </div>
              {project.stats && (
                <>
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Executions:</span>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{project.stats.totalExecutions || 0}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Success Rate:</span>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {project.stats.totalExecutions ? 
                        Math.round(((project.stats.successfulExecutions || 0) / project.stats.totalExecutions) * 100) + '%' : 
                        'N/A'
                      }
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Project Visibility Section */}
      <div className="border border-gray-200 dark:border-gray-600 rounded-xl p-6 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-800 dark:to-gray-800/80 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-3">
              <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                project.isPublic 
                  ? 'bg-emerald-100 dark:bg-emerald-900/30' 
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}>
                {project.isPublic ? (
                  <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Project Visibility
                  </h2>
                  <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    project.isPublic 
                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-800' 
                      : 'bg-gray-100 text-gray-700 border border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600'
                  }`}>
                    {project.isPublic ? 'Public & Discoverable' : 'Private & Restricted'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                  {project.isPublic 
                    ? 'Anyone with access to the platform can discover and view this project'
                    : 'Only you and users you explicitly grant permissions can access this project'
                  }
                </p>
              </div>
            </div>
            
            {/* Benefits/Features list */}
            <div className="mt-5 pl-15">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                {project.isPublic ? 'Public Project Benefits' : 'Private Project Benefits'}
              </h3>
              <ul className={`text-sm space-y-2 ${
                project.isPublic 
                  ? 'text-emerald-600 dark:text-emerald-400' 
                  : 'text-gray-600 dark:text-gray-400'
              }`}>
                {project.isPublic ? (
                  <>
                    <li className="flex items-center space-x-3">
                      <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Appears in public project listings and search results</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Accessible to all authenticated platform users</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Enables broader collaboration and feedback opportunities</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Increased visibility for showcasing your work</span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-center space-x-3">
                      <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      <span>Hidden from public project listings and search</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      <span>Access controlled exclusively through permissions</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      <span>Enhanced security and privacy protection</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      <span>Perfect for internal or sensitive projects</span>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
          
          {/* Toggle Switch */}
          <div className="flex flex-col items-end space-y-4 ml-8">
            <button
              type="button"
              onClick={toggleVisibility}
              disabled={isUpdatingVisibility}
              className={`group relative inline-flex h-8 w-14 items-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 ${
                project.isPublic 
                  ? 'bg-emerald-500 focus:ring-emerald-500 shadow-emerald-200/50 dark:shadow-emerald-900/30' 
                  : 'bg-gray-300 focus:ring-gray-400 shadow-gray-200/50 dark:bg-gray-600 dark:shadow-gray-800/30'
              } shadow-lg`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-200 ring-0 ${
                  project.isPublic ? 'translate-x-7' : 'translate-x-1'
                } ${isUpdatingVisibility ? 'animate-pulse' : ''}`}
              />
            </button>
            
            {/* Action button */}
            <div className="text-right space-y-1">
              <button
                onClick={toggleVisibility}
                disabled={isUpdatingVisibility}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border disabled:opacity-50 disabled:cursor-not-allowed ${
                  project.isPublic 
                    ? 'text-gray-700 bg-white border-gray-200 hover:bg-gray-50 dark:text-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700' 
                    : 'text-emerald-700 bg-emerald-50 border-emerald-200 hover:bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-900/30 dark:border-emerald-700 dark:hover:bg-emerald-900/50'
                }`}
              >
                {isUpdatingVisibility ? (
                  <span className="inline-flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </span>
                ) : (
                  project.isPublic ? 'Make Private' : 'Make Public'
                )}
              </button>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Changes take effect immediately
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Versions Section */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Version History ({totalVersions})
            </h2>
            {versions.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={createNewVersion}
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                }
              >
                New Version
              </Button>
            )}
          </div>
        </div>

        <div className="p-6">
          {isLoadingVersions ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
          ) : versions.length > 0 ? (
            <div className="space-y-4">
              {versions.map((version) => (
                <div
                  key={version.id}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                        version.isCurrent ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        v{version.versionNumber}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          Version {version.versionNumber}
                          {version.isCurrent && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-400">
                              Current
                            </span>
                          )}
                        </h3>
                        <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(version.status)}`}>
                          {getStatusIcon(version.status)}
                          <span>{version.status}</span>
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {version.commitMessage || 'No commit message'}
                      </p>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {version.createdBy} • {formatDateTime(version.createdAt)} • {version.fileCount} file{version.fileCount !== 1 ? 's' : ''}
                      </div>
                      
                      {/* Review Information */}
                      {version.reviewer && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center space-x-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span>
                            Reviewed by {version.reviewer}
                            {version.reviewedAt && ` on ${formatDateTime(version.reviewedAt)}`}
                          </span>
                        </div>
                      )}
                      
                      
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/editor/${project.id}/${version.id}`, {
                        state: { mode: 'view' }
                      })}
                      leftIcon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      }
                    >
                      View
                    </Button>
                    
                    {canReview(version) && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/editor/${project.id}/${version.id}`, {
                        state: { mode: 'edit' }
                      })}
                      leftIcon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      }
                    >
                      Edit
                    </Button>
                    )}
                    
                    {canReview(version) && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openReviewModal(version)}
                        leftIcon={
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        }
                      >
                        Review
                      </Button>
                    )}
                    
                    {!version.isCurrent && version.status !== 'approved' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setVersionToDelete(version.id);
                          setShowDeleteModal(true);
                        }}
                        leftIcon={
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        }
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a1.414 1.414 0 01-2.828 0l-7-7A1.414 1.414 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No versions yet</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Create your first version to start coding.
              </p>
              <div className="mt-6">
                <Button
                  variant="primary"
                  onClick={createNewVersion}
                  leftIcon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  }
                >
                  Create First Version
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>


      {/* Review Modal */}
      <Modal
        isOpen={showReviewModal}
        onClose={() => {
          setShowReviewModal(false);
          setVersionToReview(null);
          setReviewForm({ comments: '', action: '' });
        }}
        title={`Review Version ${versionToReview?.versionNumber}`}
        size="md"
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => {
                setShowReviewModal(false);
                setVersionToReview(null);
                setReviewForm({ comments: '', action: '' });
              }}
              disabled={isSubmittingReview}
            >
              Cancel
            </Button>
            <Button
              variant={reviewForm.action === 'rejected' ? 'danger' : 'primary'}
              onClick={submitReview}
              loading={isSubmittingReview}
              disabled={!reviewForm.action}
            >
              {reviewForm.action === 'approved' ? 'Approve Version' : 
               reviewForm.action === 'rejected' ? 'Reject Version' : 
               'Submit Review'}
            </Button>
          </>
        }
      >
        <div className="space-y-6">
          {versionToReview && (
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Version Details</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <p><span className="font-medium">Commit:</span> {versionToReview.commitMessage || 'No commit message'}</p>
                <p><span className="font-medium">Created by:</span> {versionToReview.createdBy}</p>
                <p><span className="font-medium">Created:</span> {formatDateTime(versionToReview.createdAt)}</p>
                <p><span className="font-medium">Files:</span> {versionToReview.fileCount}</p>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Review Decision
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="review-action"
                    value="approved"
                    checked={reviewForm.action === 'approved'}
                    onChange={(e) => setReviewForm(prev => ({ ...prev, action: e.target.value as 'approved' | 'rejected' }))}
                    className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 flex items-center">
                    <svg className="w-4 h-4 text-green-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Approve this version
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="review-action"
                    value="reject"
                    checked={reviewForm.action === 'rejected'}
                    onChange={(e) => setReviewForm(prev => ({ ...prev, action: e.target.value as 'approved' | 'rejected' }))}
                    className="h-4 w-4 text-red-600 border-gray-300 focus:ring-red-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 flex items-center">
                    <svg className="w-4 h-4 text-red-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Reject this version
                  </span>
                </label>
              </div>
            </div>
            
            <div>
              <label htmlFor="review-comments" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Comments {reviewForm.action === 'rejected' && <span className="text-red-500">*</span>}
              </label>
              <textarea
                id="review-comments"
                rows={4}
                placeholder={
                  reviewForm.action === 'approved' 
                    ? "Optional: Add any comments about this version..." 
                    : reviewForm.action === 'rejected'
                    ? "Please explain why this version should be rejected..."
                    : "Add your review comments here..."
                }
                value={reviewForm.comments}
                onChange={(e) => setReviewForm(prev => ({ ...prev, comments: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
              {reviewForm.action === 'rejected' && !reviewForm.comments.trim() && (
                <p className="mt-1 text-sm text-red-600">Comments are required when rejecting a version.</p>
              )}
            </div>
          </div>
        </div>
      </Modal>

      {/* Delete Version Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={deleteVersion}
        title="Delete Version"
        message="Are you sure you want to delete this version? This action cannot be undone and all files in this version will be permanently lost."
        confirmText="Delete Version"
        variant="danger"
        loading={isDeletingVersion}
      />

      {/* Program User Assignment Modal */}
      <ProgramUserAssignmentModal
        isOpen={showAccessControlModal}
        onClose={() => setShowAccessControlModal(false)}
        programId={projectId || null}
        onPermissionsUpdated={loadProjectDetails}
      />

      {/* Icon Management Modal */}
      <Modal
        isOpen={showIconModal}
        onClose={() => {
          setShowIconModal(false);
          setIconError(null);
        }}
        title="Manage Project Icon"
        size="md"
      >
        <div className="space-y-6">
          {/* Current Icon Display */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <IconDisplay
                iconData={iconData}
                size="xl"
                entityType="program"
              />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {iconData ? 'Current project icon' : 'No custom icon set'}
            </p>
          </div>

          {/* Error Display */}
          {iconError && (
            <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-3">
              <p className="text-sm text-red-800 dark:text-red-200">{iconError}</p>
            </div>
          )}

          {/* Icon Uploader */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              {iconData ? 'Replace Icon' : 'Upload Icon'}
            </h3>
            <IconUploader
              onIconSelect={handleIconUpload}
              onError={handleUploadError}
              isLoading={isUploadingIcon}
              maxSizeKB={512}
              acceptedTypes={['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml']}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            {iconData && (
              <Button
                variant="danger"
                size="sm"
                onClick={handleIconDelete}
                disabled={isUploadingIcon}
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                }
              >
                Remove Icon
              </Button>
            )}
            <div className="flex space-x-3 ml-auto">
              <Button
                variant="outline"
                onClick={() => {
                  setShowIconModal(false);
                  setIconError(null);
                }}
                disabled={isUploadingIcon}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectDetailPage;