// src/pages/projects/ProjectDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/api/api';
import { SortDirection } from '@/api/enums';
import Button from '@/components/common/Button';
import Modal, { ConfirmationModal } from '@/components/common/Modal';
import { ProgramCreateDto } from '@/api';

// Types
interface ProjectDetail {
  id: string;
  name: string;
  description?: string;
  type: string;
  language: string;
  mainFile?: string;
  uiType: string;
  uiConfiguration?: any;
  creator: string;
  createdAt: Date;
  status: string;
  currentVersion?: string;
  metadata?: any;
  deploymentInfo?: any;
  permissions?: any[];
  files?: any[];
  deploymentStatus?: any;
  stats?: any;
}

interface VersionSummary {
  id: string;
  versionNumber: number;
  commitMessage?: string;
  createdBy: string;
  createdByName?: string;
  createdAt: Date;
  status: string;
  isCurrent: boolean;
  fileCount: number;
}

interface ExecutionSummary {
  id: string;
  versionId?: string;
  versionNumber?: number;
  userId?: string;
  userName?: string;
  executionType?: string;
  startedAt: Date;
  completedAt?: Date;
  status: string;
  duration?: number;
  hasError: boolean;
}

const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  // State management
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [versions, setVersions] = useState<VersionSummary[]>([]);
  const [executions, setExecutions] = useState<ExecutionSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'versions' | 'executions' | 'settings'>('overview');

  // Modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCloneModal, setShowCloneModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCloning, setIsCloning] = useState(false);
  const [cloneName, setCloneName] = useState('');

  // Load project data
  useEffect(() => {
    if (projectId) {
      loadProjectData();
    }
  }, [projectId]);

  const loadProjectData = async () => {
    if (!projectId) return;

    try {
      setIsLoading(true);
      setError(null);

      // Load project details, versions, and recent executions in parallel
      const [projectResponse, versionsResponse, executionsResponse] = await Promise.all([
        api.programs.programs_GetById(projectId).catch(() => null),
        api.versions.versions_GetByProgram(projectId, 1, 10, 'versionNumber', SortDirection._1).catch(() => null),
        api.executions.executions_GetByProgram(projectId, 1, 5, 'startedAt', SortDirection._1).catch(() => null)
      ]);

      // Process project data
      if (projectResponse?.success && projectResponse.data) {
        const projectData = projectResponse.data;
        setProject({
          id: projectData.id || '',
          name: projectData.name || 'Untitled Project',
          description: projectData.description,
          type: projectData.type || 'Unknown',
          language: projectData.language || 'Unknown',
          mainFile: projectData.mainFile,
          uiType: projectData.uiType || 'Unknown',
          uiConfiguration: projectData.uiConfiguration,
          creator: projectData.creator || 'Unknown',
          createdAt: projectData.createdAt || new Date(),
          status: projectData.status || 'Unknown',
          currentVersion: projectData.currentVersion,
          metadata: projectData.metadata,
          deploymentInfo: projectData.deploymentInfo,
          permissions: projectData.permissions,
          files: projectData.files,
          deploymentStatus: projectData.deploymentStatus,
          stats: projectData.stats
        });
      } else {
        setError('Project not found or you don\'t have permission to view it.');
        return;
      }

      // Process versions data
      if (versionsResponse?.success && versionsResponse.data?.items) {
        const versionsData = versionsResponse.data.items.map((version): VersionSummary => ({
          id: version.id || '',
          versionNumber: version.versionNumber || 0,
          commitMessage: version.commitMessage,
          createdBy: version.createdBy || '',
          createdByName: version.createdByName,
          createdAt: version.createdAt || new Date(),
          status: version.status || 'Unknown',
          isCurrent: version.isCurrent || false,
          fileCount: version.fileCount || 0
        }));
        setVersions(versionsData);
      }

      // Process executions data
      if (executionsResponse?.success && executionsResponse.data?.items) {
        const executionsData = executionsResponse.data.items.map((execution): ExecutionSummary => ({
          id: execution.id || '',
          versionId: execution.versionId,
          versionNumber: execution.versionNumber,
          userId: execution.userId,
          userName: execution.userName,
          executionType: execution.executionType,
          startedAt: execution.startedAt || new Date(),
          completedAt: execution.completedAt,
          status: execution.status || 'Unknown',
          duration: execution.duration,
          hasError: execution.hasError || false
        }));
        setExecutions(executionsData);
      }

    } catch (error) {
      console.error('Failed to load project data:', error);
      setError('Failed to load project data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Action handlers
  const handleDeleteProject = async () => {
    if (!project) return;

    setIsDeleting(true);
    try {
      const response = await api.programs.programs_Delete(project.id);
      
      if (response.success) {
        setShowDeleteModal(false);
        navigate('/projects');
        
        if ((window as any).addToast) {
          (window as any).addToast({
            type: 'success',
            title: 'Project deleted successfully'
          });
        }
      } else {
        setError(response.message || 'Failed to delete project');
      }
    } catch (error) {
      console.error('Failed to delete project:', error);
      setError('Failed to delete project. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCloneProject = async () => {
    if (!project || !cloneName.trim()) return;

    setIsCloning(true);
    try {
      // For cloning, we would create a new project with similar settings
      // This is a simplified implementation - in practice, you might have a dedicated clone API
      const cloneData = new ProgramCreateDto({
        name: cloneName.trim(),
        description: `Cloned from ${project.name}`,
        type: project.type,
        language: project.language,
        mainFile: project.mainFile,
        uiType: project.uiType,
        uiConfiguration: project.uiConfiguration,
        metadata: { ...project.metadata, clonedFrom: project.id }
      });

      const response = await api.programs.programs_Create(cloneData);
      
      if (response.success && response.data?.id) {
        setShowCloneModal(false);
        setCloneName('');
        navigate(`/projects/${response.data.id}`);
        
        if ((window as any).addToast) {
          (window as any).addToast({
            type: 'success',
            title: 'Project cloned successfully'
          });
        }
      } else {
        setError(response.message || 'Failed to clone project');
      }
    } catch (error) {
      console.error('Failed to clone project:', error);
      setError('Failed to clone project. Please try again.');
    } finally {
      setIsCloning(false);
    }
  };

  // Utility functions
  const getLanguageIcon = (language: string): React.ReactNode => {
    const lang = language.toLowerCase();
    const iconClass = "w-6 h-6";
    
    if (lang.includes('javascript') || lang.includes('js')) {
      return <div className={`${iconClass} bg-yellow-400 rounded-md`}></div>;
    }
    if (lang.includes('python')) {
      return <div className={`${iconClass} bg-blue-500 rounded-md`}></div>;
    }
    if (lang.includes('java')) {
      return <div className={`${iconClass} bg-red-500 rounded-md`}></div>;
    }
    if (lang.includes('c#') || lang.includes('csharp')) {
      return <div className={`${iconClass} bg-purple-500 rounded-md`}></div>;
    }
    
    return (
      <div className={`${iconClass} bg-gray-400 rounded-md flex items-center justify-center`}>
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      </div>
    );
  };

  const getStatusColor = (status: string): string => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'active') return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
    if (statusLower === 'draft') return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
    if (statusLower === 'archived') return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800';
    if (statusLower === 'deprecated') return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
    return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800';
  };

  const getExecutionStatusColor = (status: string): string => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('completed') || statusLower.includes('success')) {
      return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
    }
    if (statusLower.includes('running') || statusLower.includes('pending')) {
      return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30';
    }
    if (statusLower.includes('failed') || statusLower.includes('error')) {
      return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
    }
    return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800';
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatDuration = (ms?: number): string => {
    if (!ms) return 'N/A';
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  };

  const canUserEditProject = (): boolean => {
    if (!user || !project) return false;
    
    // User is admin, creator, or has edit permissions
    return isAdmin || 
           project.creator === user.id || 
           project.creator === user.username ||
           project.permissions?.some(p => p.accessLevel === 'edit' || p.accessLevel === 'admin') || 
           false;
  };

  const canUserDeleteProject = (): boolean => {
    if (!user || !project) return false;
    
    // Only admin or creator can delete
    return isAdmin || 
           project.creator === user.id || 
           project.creator === user.username;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-8">
            <svg className="mx-auto h-12 w-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-red-800 dark:text-red-200">
              Unable to Load Project
            </h3>
            <p className="mt-2 text-red-600 dark:text-red-400">
              {error}
            </p>
            <div className="mt-6 space-x-3">
              <Button variant="outline" onClick={loadProjectData}>
                Try Again
              </Button>
              <Button variant="primary" onClick={() => navigate('/projects')}>
                Back to Projects
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            {getLanguageIcon(project.language)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white truncate">
                {project.name}
              </h1>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </div>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              {project.description || 'No description provided'}
            </p>
            <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <span>{project.language} • {project.type}</span>
              <span>Created by {project.creator}</span>
              <span>{formatDate(project.createdAt)}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 lg:mt-0 flex flex-wrap gap-3">
          <Button
            variant="primary"
            onClick={() => navigate(`/editor/${project.id}`)}
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            }
          >
            Open Editor
          </Button>
          
          {canUserEditProject() && (
            <>
              <Button
                variant="outline"
                onClick={() => setShowCloneModal(true)}
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                }
              >
                Clone
              </Button>
              
              {canUserDeleteProject() && (
                <Button
                  variant="danger"
                  onClick={() => setShowDeleteModal(true)}
                  leftIcon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  }
                >
                  Delete
                </Button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', name: 'Overview', icon: '📊' },
            { id: 'versions', name: 'Versions', icon: '📝', count: versions.length },
            { id: 'executions', name: 'Executions', icon: '⚡', count: executions.length },
            { id: 'settings', name: 'Settings', icon: '⚙️' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
              {tab.count !== undefined && (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  activeTab === tab.id 
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Project Details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Project Details
                </h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="font-medium text-gray-500 dark:text-gray-400">Language</dt>
                    <dd className="mt-1 text-gray-900 dark:text-white">{project.language}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-500 dark:text-gray-400">Type</dt>
                    <dd className="mt-1 text-gray-900 dark:text-white">{project.type}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-500 dark:text-gray-400">Framework</dt>
                    <dd className="mt-1 text-gray-900 dark:text-white">{project.uiType}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-500 dark:text-gray-400">Main File</dt>
                    <dd className="mt-1 text-gray-900 dark:text-white">{project.mainFile || 'Not set'}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-500 dark:text-gray-400">Current Version</dt>
                    <dd className="mt-1 text-gray-900 dark:text-white">
                      {project.currentVersion || 'No version yet'}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-500 dark:text-gray-400">Status</dt>
                    <dd className="mt-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Recent Executions */}
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Recent Executions
                  </h3>
                  <Link
                    to={`/executions?project=${project.id}`}
                    className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    View all
                  </Link>
                </div>
                
                {executions.length > 0 ? (
                  <div className="space-y-3">
                    {executions.slice(0, 5).map((execution) => (
                      <div
                        key={execution.id}
                        className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                        onClick={() => navigate(`/executions/${execution.id}`)}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getExecutionStatusColor(execution.status)}`}>
                              {execution.status}
                            </span>
                            {execution.versionNumber && (
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                v{execution.versionNumber}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {formatDate(execution.startedAt)} • Duration: {formatDuration(execution.duration)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">No executions yet</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => navigate(`/editor/${project.id}`)}
                    leftIcon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    }
                  >
                    Open in Editor
                  </Button>
                  
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => navigate(`/executions?project=${project.id}`)}
                    leftIcon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    }
                  >
                    Run Execution
                  </Button>
                  
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => setActiveTab('versions')}
                    leftIcon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    }
                  >
                    View Versions
                  </Button>
                </div>
              </div>

              {/* Project Stats */}
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Statistics
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Versions</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{versions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Executions</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{executions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Success Rate</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {executions.length > 0 
                        ? `${Math.round((executions.filter(e => e.status.toLowerCase().includes('success') || e.status.toLowerCase().includes('completed')).length / executions.length) * 100)}%`
                        : 'N/A'
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Versions Tab */}
        {activeTab === 'versions' && (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Version History
                </h3>
                <Button
                  variant="primary"
                  onClick={() => navigate(`/editor/${project.id}`)}
                  leftIcon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  }
                >
                  Create Version
                </Button>
              </div>
            </div>
            
            <div className="p-6">
              {versions.length > 0 ? (
                <div className="space-y-4">
                  {versions.map((version) => (
                    <div
                      key={version.id}
                      className={`p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                        version.isCurrent 
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg font-mono font-medium text-gray-900 dark:text-white">
                            v{version.versionNumber}
                          </span>
                          {version.isCurrent && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              Current
                            </span>
                          )}
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(version.status)}`}>
                            {version.status}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => navigate(`/editor/${project.id}/${version.id}`)}
                          >
                            View
                          </Button>
                          {!version.isCurrent && canUserEditProject() && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                // Set as current version
                                // This would call an API to update the current version
                              }}
                            >
                              Set Current
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-2">
                        <p className="text-sm text-gray-900 dark:text-white">
                          {version.commitMessage || 'No commit message'}
                        </p>
                        <div className="mt-1 flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                          <span>by {version.createdByName || version.createdBy}</span>
                          <span>{formatDate(version.createdAt)}</span>
                          <span>{version.fileCount} files</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No versions yet</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Create your first version by adding files to the project.
                  </p>
                  <div className="mt-6">
                    <Button
                      variant="primary"
                      onClick={() => navigate(`/editor/${project.id}`)}
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
        )}

        {/* Executions Tab */}
        {activeTab === 'executions' && (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Execution History
                </h3>
                <Button
                  variant="primary"
                  onClick={() => navigate(`/executions?project=${project.id}`)}
                  leftIcon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  }
                >
                  Run Execution
                </Button>
              </div>
            </div>
            
            <div className="p-6">
              {executions.length > 0 ? (
                <div className="space-y-4">
                  {executions.map((execution) => (
                    <div
                      key={execution.id}
                      className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/executions/${execution.id}`)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getExecutionStatusColor(execution.status)}`}>
                            {execution.status}
                          </span>
                          {execution.versionNumber && (
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              v{execution.versionNumber}
                            </span>
                          )}
                          <span className="text-sm text-gray-900 dark:text-white">
                            {execution.executionType || 'Execution'}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <span>Duration: {formatDuration(execution.duration)}</span>
                          <span>{formatDate(execution.startedAt)}</span>
                        </div>
                      </div>
                      
                      {execution.userName && (
                        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                          Run by {execution.userName}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No executions yet</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Run your first execution to see the results here.
                  </p>
                  <div className="mt-6">
                    <Button
                      variant="primary"
                      onClick={() => navigate(`/executions?project=${project.id}`)}
                      leftIcon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      }
                    >
                      Run First Execution
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
              Project Settings
            </h3>
            
            {canUserEditProject() ? (
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">General</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Project configuration and metadata settings.
                  </p>
                  <div className="mt-4">
                    <Button variant="outline">
                      Edit Project Details
                    </Button>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Permissions</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Manage who can view and edit this project.
                  </p>
                  <div className="mt-4">
                    <Button variant="outline">
                      Manage Permissions
                    </Button>
                  </div>
                </div>
                
                {canUserDeleteProject() && (
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h4 className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">Danger Zone</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      Irreversible and destructive actions.
                    </p>
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        onClick={() => setShowCloneModal(true)}
                        leftIcon={
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        }
                      >
                        Clone Project
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => setShowDeleteModal(true)}
                        leftIcon={
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        }
                      >
                        Delete Project
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  You don't have permission to modify project settings.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteProject}
        title="Delete Project"
        message={`Are you sure you want to delete "${project.name}"? This action cannot be undone and will permanently delete all project data, versions, and execution history.`}
        confirmText="Delete Project"
        cancelText="Cancel"
        variant="danger"
        loading={isDeleting}
      />

      {/* Clone Modal */}
      <Modal
        isOpen={showCloneModal}
        onClose={() => setShowCloneModal(false)}
        title="Clone Project"
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => setShowCloneModal(false)}
              disabled={isCloning}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleCloneProject}
              loading={isCloning}
              disabled={isCloning || !cloneName.trim()}
            >
              {isCloning ? 'Cloning...' : 'Clone Project'}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Create a copy of "{project.name}" with all its configuration and structure.
          </p>
          <div>
            <label htmlFor="cloneName" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              New Project Name
            </label>
            <input
              type="text"
              id="cloneName"
              value={cloneName}
              onChange={(e) => setCloneName(e.target.value)}
              placeholder="Enter name for cloned project"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm dark:bg-gray-700 dark:text-gray-100 dark:ring-gray-600 dark:focus:ring-blue-500"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectDetailPage;