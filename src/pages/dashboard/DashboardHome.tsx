// src/pages/dashboard/DashboardHome.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/api/api';
import { SortDirection } from '@/api/enums';
import Button from '@/components/common/Button';

// Interface for dashboard data
interface DashboardStats {
  totalProjects: number;
  totalExecutions: number;
  runningExecutions: number;
  successfulExecutions: number;
  recentProjectsCount: number;
}

interface ProjectSummary {
  id: string;
  name: string;
  description?: string;
  language: string;
  type: string;
  createdAt: Date;
  currentVersion?: string;
  status: string;
}

interface ExecutionSummary {
  id: string;
  programId: string;
  programName: string;
  status: string;
  startedAt: Date;
  completedAt?: Date;
  duration?: number;
}

const DashboardHome: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // State management
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    totalExecutions: 0,
    runningExecutions: 0,
    successfulExecutions: 0,
    recentProjectsCount: 0
  });
  const [recentProjects, setRecentProjects] = useState<ProjectSummary[]>([]);
  const [recentExecutions, setRecentExecutions] = useState<ExecutionSummary[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Load dashboard data
  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Load data in parallel
      const [projectsResponse, recentExecutionsResponse, executionStatsResponse] = await Promise.all([
        // Get recent projects (first 6)
        api.programs.programs_GetUserAccessiblePrograms(1, 6, 'createdDate', SortDirection._1).catch(() => null),
        // Get recent executions (first 5)
        api.executions.executions_GetRecentExecutions(5).catch(() => null),
        // Get execution stats
        api.executions.executions_GetExecutionStats(undefined, undefined, undefined, undefined, undefined, undefined).catch(() => null)
      ]);

      // Process projects data
      if (projectsResponse?.success && projectsResponse.data?.items) {
        const projects = projectsResponse.data.items.map(project => ({
          id: project.id || '',
          name: project.name || 'Untitled Project',
          description: project.description,
          language: project.language || 'Unknown',
          type: project.type || 'Unknown',
          createdAt: project.createdAt || new Date(),
          currentVersion: project.currentVersion,
          status: project.status || 'Unknown'
        }));
        
        setRecentProjects(projects);
        
        // Update stats with project count
        setStats(prev => ({
          ...prev,
          totalProjects: projectsResponse.data?.totalCount || 0,
          recentProjectsCount: projects.length
        }));
      }

      // Process recent executions
      if (recentExecutionsResponse?.success && recentExecutionsResponse.data) {
        const executions = recentExecutionsResponse.data.map((execution) => ({
          id: execution.id || '',
          programId: execution.programId || '',
          programName: execution.programName || 'Unknown Project',
          status: execution.status || 'Unknown',
          startedAt: execution.startedAt || new Date(),
          completedAt: execution.completedAt,
          duration: execution.duration
        }));
        
        setRecentExecutions(executions);
      }

      // Process execution stats
      if (executionStatsResponse?.success && executionStatsResponse.data) {
        setStats(prev => ({
          ...prev,
          totalExecutions: executionStatsResponse.data?.totalExecutions || 0,
          runningExecutions: executionStatsResponse.data?.runningExecutions || 0,
          successfulExecutions: executionStatsResponse.data?.successfulExecutions || 0
        }));
      }

    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      setError('Failed to load dashboard data. Please refresh the page.');
    } finally {
      setIsLoading(false);
    }
  };

  const getTimeOfDayGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const formatRelativeTime = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffMinutes > 0) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  const getStatusColor = (status: string): string => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('running') || statusLower.includes('active')) {
      return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30';
    }
    if (statusLower.includes('completed') || statusLower.includes('success')) {
      return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
    }
    if (statusLower.includes('failed') || statusLower.includes('error')) {
      return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
    }
    return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800';
  };

  const getLanguageIcon = (language: string): React.ReactNode => {
    const lang = language.toLowerCase();
    const iconClass = "w-5 h-5";
    
    if (lang.includes('javascript') || lang.includes('js')) {
      return <div className={`${iconClass} bg-yellow-400 rounded`}></div>;
    }
    if (lang.includes('python')) {
      return <div className={`${iconClass} bg-blue-500 rounded`}></div>;
    }
    if (lang.includes('java')) {
      return <div className={`${iconClass} bg-red-500 rounded`}></div>;
    }
    if (lang.includes('c#') || lang.includes('csharp')) {
      return <div className={`${iconClass} bg-purple-500 rounded`}></div>;
    }
    
    return (
      <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    );
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {getTimeOfDayGreeting()}, {user?.firstName || user?.username || 'there'}!
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Welcome back to your collaborative programming workspace
          </p>
        </div>
        
        <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={() => navigate('/projects')}
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            }
          >
            Browse Projects
          </Button>
          <Button
            variant="primary"
            onClick={() => navigate('/projects/create')}
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            }
          >
            Create Project
          </Button>
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
                onClick={loadDashboardData}
                className="text-sm text-red-800 dark:text-red-200 hover:text-red-600 dark:hover:text-red-300"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-md flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Total Projects
                  </dt>
                  <dd className="text-lg font-medium text-gray-900 dark:text-white">
                    {stats.totalProjects}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-md flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Successful Executions
                  </dt>
                  <dd className="text-lg font-medium text-gray-900 dark:text-white">
                    {stats.successfulExecutions}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-md flex items-center justify-center">
                  <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Running Now
                  </dt>
                  <dd className="text-lg font-medium text-gray-900 dark:text-white">
                    {stats.runningExecutions}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-md flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2h4a1 1 0 110 2h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4z" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Total Executions
                  </dt>
                  <dd className="text-lg font-medium text-gray-900 dark:text-white">
                    {stats.totalExecutions}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Projects */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Recent Projects
              </h3>
              <Link
                to="/projects"
                className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="p-6">
            {recentProjects.length > 0 ? (
              <div className="space-y-4">
                {recentProjects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                    onClick={() => navigate(`/projects/${project.id}`)}
                  >
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div className="flex-shrink-0">
                        {getLanguageIcon(project.language)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {project.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {project.language} • {formatRelativeTime(project.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No projects yet</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Get started by creating your first project.
                </p>
                <div className="mt-6">
                  <Button
                    variant="primary"
                    onClick={() => navigate('/projects/create')}
                    leftIcon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    }
                  >
                    Create Project
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recent Executions */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Recent Executions
              </h3>
              <Link
                to="/apps"
                className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="p-6">
            {recentExecutions.length > 0 ? (
              <div className="space-y-4">
                {recentExecutions.map((execution) => (
                  <div
                    key={execution.id}
                    className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                    onClick={() => navigate(`/apps/${execution.id}`)}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {execution.programName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatRelativeTime(execution.startedAt)}
                        {execution.duration && ` • ${Math.round(execution.duration / 1000)}s`}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(execution.status)}`}>
                        {execution.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No executions yet</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Create a project and run your first execution.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Ready to code?
            </h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Start a new project, browse existing ones, or check out the latest executions.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-3">
            <Button
              variant="primary"
              onClick={() => navigate('/projects/create')}
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              }
            >
              New Project
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;