// src/pages/projects/ProjectDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '@/api/api';
import { SortDirection } from '@/api/enums';
import Button from '@/components/common/Button';
import Modal, { ConfirmationModal } from '@/components/common/Modal';
import Input from '@/components/common/Input';
import { VersionCommitDto, VersionFileCreateDto } from '@/api';

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

interface CreateVersionForm {
  commitMessage: string;
  createSampleFiles: boolean;
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
  const [showCreateVersionModal, setShowCreateVersionModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [versionToDelete, setVersionToDelete] = useState<string | null>(null);
  const [isCreatingVersion, setIsCreatingVersion] = useState(false);
  const [isDeletingVersion, setIsDeletingVersion] = useState(false);
  
  // Create version form
  const [createVersionForm, setCreateVersionForm] = useState<CreateVersionForm>({
    commitMessage: '',
    createSampleFiles: true
  });

  // Pagination for versions
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20);
  const [totalVersions, setTotalVersions] = useState(0);

  useEffect(() => {
    if (projectId) {
      loadProjectDetails();
      loadVersions();
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
          reviewComments: version.commitMessage,
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

  const createVersion = async () => {
    if (!projectId || !createVersionForm.commitMessage.trim()) {
      setError('Please enter a commit message.');
      return;
    }

    try {
      setIsCreatingVersion(true);
      setError(null);

      // Prepare files for the version if this is the first version
      let files: VersionFileCreateDto[] = [];
      
      if (versions.length === 0 && createVersionForm.createSampleFiles && project) {
        // Create sample files based on project language
        files = createSampleFiles(project.language, project.type);
      }

      // Create version with commit
      const commitDto = new VersionCommitDto({
        commitMessage: createVersionForm.commitMessage.trim(),
        changes: files.map(file => ({
          path: file.path || '',
          action: 'add',
          content: file.content,
          contentType: file.contentType
        }))
      });

      const response = await api.versions.versions_CommitChanges(projectId, commitDto);

      if (response.success && response.data) {
        // Success - reload versions and close modal
        await loadVersions();
        setShowCreateVersionModal(false);
        setCreateVersionForm({
          commitMessage: '',
          createSampleFiles: true
        });

        // Navigate to editor with the new version
        navigate(`/editor/${projectId}/${response.data.id}`);
      } else {
        setError(response.message || 'Failed to create version');
      }
    } catch (error) {
      console.error('Failed to create version:', error);
      setError('Failed to create version. Please try again.');
    } finally {
      setIsCreatingVersion(false);
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
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {project.name}
            </h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              {project.language} • {project.type} • Created {formatRelativeTime(project.createdAt)}
            </p>
          </div>
        </div>
        
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          {versions.length > 0 ? (
            <Button
              variant="primary"
              onClick={() => navigate(`/editor/${project.id}`)}
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              }
            >
              Open in Editor
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={() => setShowCreateVersionModal(true)}
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              }
            >
              Create First Version
            </Button>
          )}
          
          {versions.length > 0 && (
            <Button
              variant="outline"
              onClick={() => setShowCreateVersionModal(true)}
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a1.414 1.414 0 01-2.828 0l-7-7A1.414 1.414 0 013 12V7a4 4 0 014-4z" />
                </svg>
              }
            >
              New Version
            </Button>
          )}
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
                onClick={() => setShowCreateVersionModal(true)}
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
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(version.status)}`}>
                          {version.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {version.commitMessage || 'No commit message'}
                      </p>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {version.createdBy} • {formatDateTime(version.createdAt)} • {version.fileCount} file{version.fileCount !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/editor/${project.id}/${version.id}`)}
                      leftIcon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      }
                    >
                      Edit
                    </Button>
                    
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
                  onClick={() => setShowCreateVersionModal(true)}
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

      {/* Create Version Modal */}
      <Modal
        isOpen={showCreateVersionModal}
        onClose={() => {
          setShowCreateVersionModal(false);
          setCreateVersionForm({ commitMessage: '', createSampleFiles: true });
        }}
        title={versions.length === 0 ? "Create First Version" : "Create New Version"}
        size="md"
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => {
                setShowCreateVersionModal(false);
                setCreateVersionForm({ commitMessage: '', createSampleFiles: true });
              }}
              disabled={isCreatingVersion}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={createVersion}
              loading={isCreatingVersion}
              disabled={!createVersionForm.commitMessage.trim()}
            >
              Create Version
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Commit Message"
            placeholder="Describe what's in this version..."
            value={createVersionForm.commitMessage}
            onChange={(e) => setCreateVersionForm(prev => ({ ...prev, commitMessage: e.target.value }))}
            required
            autoFocus
          />
          
          {versions.length === 0 && (
            <div className="flex items-center">
              <input
                id="create-sample-files"
                type="checkbox"
                checked={createVersionForm.createSampleFiles}
                onChange={(e) => setCreateVersionForm(prev => ({ ...prev, createSampleFiles: e.target.checked }))}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="create-sample-files" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Create sample files to get started
              </label>
            </div>
          )}
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {versions.length === 0 ? 
              'This will be the first version of your project. You can start coding immediately after creation.' :
              'Create a new version to save your progress and make changes.'
            }
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
    </div>
  );
};

export default ProjectDetailPage;