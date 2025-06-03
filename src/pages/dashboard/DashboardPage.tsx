// src/pages/dashboard/DashboardPage.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FolderIcon, 
  PlayIcon, 
  PlusIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { api } from '@/api/api';

interface DashboardStats {
  totalProjects: number;
  totalExecutions: number;
  recentExecutions: number;
  successfulExecutions: number;
}

const DashboardPage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Load user profile
      const userResponse = await api.users.users_GetCurrentUserProfile();
      if (userResponse.success && userResponse.data) {
        setUser(userResponse.data);
      }

      // Load basic stats (placeholder for now)
      // In a real implementation, you'd call specific API endpoints
      setStats({
        totalProjects: 0,
        totalExecutions: 0,
        recentExecutions: 0,
        successfulExecutions: 0
      });

    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner size="lg" text="Loading dashboard..." />;
  }

  const quickActions = [
    {
      name: 'Create Project',
      href: '/projects/new',
      icon: PlusIcon,
      description: 'Start a new programming project',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      name: 'Browse Projects',
      href: '/projects',
      icon: FolderIcon,
      description: 'View all your projects',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      name: 'Recent Executions',
      href: '/executions',
      icon: PlayIcon,
      description: 'Check execution history',
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  const statCards = [
    {
      name: 'Total Projects',
      value: stats?.totalProjects ?? 0,
      icon: FolderIcon,
      color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400'
    },
    {
      name: 'Total Executions',
      value: stats?.totalExecutions ?? 0,
      icon: PlayIcon,
      color: 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400'
    },
    {
      name: 'Recent Activity',
      value: stats?.recentExecutions ?? 0,
      icon: ClockIcon,
      color: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400'
    },
    {
      name: 'Success Rate',
      value: (stats?.totalExecutions ?? 0) > 0 && stats?.successfulExecutions !== undefined
        ? `${Math.round((stats.successfulExecutions / stats.totalExecutions) * 100)}%`
        : '0%',
      icon: CheckCircleIcon,
      color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/20 dark:text-purple-400'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome back{user?.fullName ? `, ${user.fullName}` : ''}!
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Ready to build something amazing? Here's what's happening with your projects.
            </p>
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <ClockIcon className="h-4 w-4" />
              <span>Last login: {user?.lastLoginDate ? new Date(user.lastLoginDate).toLocaleDateString() : 'Welcome!'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              to={action.href}
              className="relative group bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center">
                <div className={`flex-shrink-0 p-3 rounded-lg ${action.color} text-white transition-colors duration-200`}>
                  <action.icon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {action.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {action.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats Overview */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Overview
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => (
            <div
              key={stat.name}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center">
                <div className={`flex-shrink-0 p-2 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Getting Started Section */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <ExclamationTriangleIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-blue-900 dark:text-blue-100">
              Getting Started
            </h3>
            <p className="mt-2 text-blue-800 dark:text-blue-200">
              This is your Caesar programming platform dashboard. You can create projects, run code, 
              collaborate with team members, and manage your development workflow.
            </p>
            <div className="mt-4">
              <Link
                to="/projects"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 dark:bg-blue-800 dark:text-blue-100 dark:hover:bg-blue-700 transition-colors duration-200"
              >
                Get Started
                <PlusIcon className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;