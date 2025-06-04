// src/pages/projects/ProjectDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeftIcon,
  PencilIcon,
  TrashIcon,
  PlayIcon,
  CodeBracketIcon,
  FolderIcon,
  CalendarIcon,
  UserIcon,
  TagIcon,
  GlobeAltIcon,
  ChartBarIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
import { api } from '@/api/api';
import { useAuth } from '@/contexts/AuthContext';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import type { IProgramDetailDto, IProgramFileDto } from '@/api/typeInterfaces';

const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  
  const [project, setProject] = useState<IProgramDetailDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleDelete = async () => {
    if (!projectId) return;
    
    try {
      setIsDeleting(true);
      
      const response = await api.programs.programs_Delete(projectId);
      
      if (response.success) {
        navigate('/projects');
      } else {
        setError(response.message || 'Failed to delete project');
      }
    } catch (error: any) {
      console.error('Error deleting project:', error);
      setError(error.message || 'An unexpected error occurred');
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const canModifyProject = () => {
    if (isAdmin) return true;
    if (!user || !project) return false;
    return project.creator === user.id;
  };

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'archived':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
    }
  };

  const getLanguageColor = (language?: string) => {
    const colors: Record<string, string> = {
      javascript: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
      typescript: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
      python: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
      java: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
      csharp: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300',
      go: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-300'
    };
    return colors[language?.toLowerCase() || ''] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
  };

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading project..." />;
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
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Navigation */}
      <div className="flex items-center space-x-4">
        <Link
          to="/projects"
          className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back to Projects
        </Link>
      </div>

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <CodeBracketIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {project.name}
                </h1>
                <div className="flex items-center space-x-4 mt-1">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                  {project.language && (
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getLanguageColor(project.language)}`}>
                      {project.language}
                    </span>
                  )}
                  {project.type && (
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300">
                      {project.type}
                    </span>
                  )}
                </div>
              </div>
            </div>
            {project.description && (
              <p className="mt-3 text-gray-600 dark:text-gray-400">
                {project.description}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <Link
              to={`/projects/${projectId}/editor`}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <CodeBracketIcon className="h-4 w-4 mr-2" />
              Open Editor
            </Link>
            
            {canModifyProject() && (
              <>
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Edit
                </button>
                
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  type="button"
                  className="inline-flex items-center px-3 py-2 border border-red-300 dark:border-red-600 text-sm font-medium rounded-md text-red-700 dark:text-red-300 bg-white dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-red-900/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <TrashIcon className="h-4 w-4 mr-2" />
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project Info */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Project Information
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <TagIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Type</div>
                  <div className="text-sm text-gray-900 dark:text-white">
                    {project.type || 'Not specified'}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <CodeBracketIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Language</div>
                  <div className="text-sm text-gray-900 dark:text-white">
                    {project.language || 'Not specified'}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <GlobeAltIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">UI Type</div>
                  <div className="text-sm text-gray-900 dark:text-white">
                    {project.uiType || 'Not specified'}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <FolderIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Main File</div>
                  <div className="text-sm text-gray-900 dark:text-white">
                    {project.mainFile || 'Not specified'}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <UserIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Creator</div>
                  <div className="text-sm text-gray-900 dark:text-white">
                    {project.creator || 'Unknown'}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <CalendarIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Created</div>
                  <div className="text-sm text-gray-900 dark:text-white">
                    {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'Unknown'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Files */}
          {project.files && project.files.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Project Files
                </h2>
                <Link
                  to={`/projects/${projectId}/editor`}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500"
                >
                  View all files
                </Link>
              </div>
              
              <div className="space-y-2">
                {project.files.slice(0, 5).map((file: IProgramFileDto, index: number) => (
                  <div key={index} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div className="flex items-center space-x-3">
                      <FolderIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900 dark:text-white">
                        {file.path}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                      {file.size && <span>{(file.size / 1024).toFixed(1)} KB</span>}
                      {file.lastModified && (
                        <span>{new Date(file.lastModified).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h3>
            
            <div className="space-y-3">
              <Link
                to={`/projects/${projectId}/editor`}
                className="w-full inline-flex items-center justify-center px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <CodeBracketIcon className="h-4 w-4 mr-2" />
                Open Editor
              </Link>
              
              <button
                type="button"
                className="w-full inline-flex items-center justify-center px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <PlayIcon className="h-4 w-4 mr-2" />
                Run Project
              </button>
              
              <Link
                to={`/executions?projectId=${projectId}`}
                className="w-full inline-flex items-center justify-center px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <ChartBarIcon className="h-4 w-4 mr-2" />
                View Executions
              </Link>
            </div>
          </div>

          {/* Project Stats */}
          {project.stats && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Project Statistics
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Total Executions</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {project.stats.totalExecutions || 0}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Successful</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {project.stats.successfulExecutions || 0}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Failed</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {project.stats.failedExecutions || 0}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Total Versions</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {project.stats.totalVersions || 0}
                  </span>
                </div>
                
                {project.stats.lastExecution && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Last Execution</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {new Date(project.stats.lastExecution).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Deployment Status */}
          {project.deploymentStatus && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Deployment Status
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Status</span>
                  <span className={`text-sm font-medium px-2 py-1 rounded-full ${getStatusColor(project.deploymentStatus.status)}`}>
                    {project.deploymentStatus.status || 'Not deployed'}
                  </span>
                </div>
                
                {project.deploymentStatus.applicationUrl && (
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 block mb-1">URL</span>
                    <a
                      href={project.deploymentStatus.applicationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 break-all"
                    >
                      {project.deploymentStatus.applicationUrl}
                    </a>
                  </div>
                )}
                
                {project.deploymentStatus.lastDeployed && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Last Deployed</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {new Date(project.deploymentStatus.lastDeployed).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
            <div className="mt-3 text-center">
              <TrashIcon className="mx-auto h-16 w-16 text-red-600" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-4">
                Delete Project
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete "{project.name}"? This action cannot be undone.
                  All project files, versions, and execution history will be permanently removed.
                </p>
              </div>
              <div className="flex items-center justify-center space-x-4 px-4 py-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 disabled:opacity-50"
                >
                  {isDeleting ? (
                    <>
                      <LoadingSpinner size="sm" text="" />
                      <span className="ml-2">Deleting...</span>
                    </>
                  ) : (
                    'Delete'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailPage;