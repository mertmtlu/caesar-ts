// src/components/auth/RoleBasedRoute.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface RoleBasedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
  fallbackPath?: string;
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ 
  children, 
  allowedRoles,
  fallbackPath = '/apps' // Default fallback to Apps page which all roles can access
}) => {
  const { isAuthenticated, isLoading, user, hasRole } = useAuth();
  const location = useLocation();

  // Show loading spinner while authentication status is being determined
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <Navigate 
        to="/auth/login" 
        state={{ from: location }} 
        replace 
      />
    );
  }

  // Check if user account is active
  if (user && user.isActive === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md w-full mx-auto p-6">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-yellow-100 dark:bg-yellow-900 rounded-full mb-4">
              <svg className="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Account Inactive
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Your account has been deactivated. Please contact an administrator for assistance.
            </p>
            <button
              onClick={() => {
                window.location.href = '/auth/login';
              }}
              className="w-full bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-md transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Check if user has any of the allowed roles
  const hasAllowedRole = allowedRoles.some(role => hasRole(role));

  if (!hasAllowedRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md w-full mx-auto p-6">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-100 dark:bg-red-900 rounded-full mb-4">
              <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Access Restricted
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              You don't have permission to access this page with your current role.
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Your role:</strong> {user?.role || 'No role assigned'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Required roles:</strong> {allowedRoles.join(', ')}
              </p>
            </div>
            <div className="space-y-2">
              <button
                onClick={() => window.history.back()}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Go Back
              </button>
              <button
                onClick={() => window.location.href = fallbackPath}
                className="w-full bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-md transition-colors"
              >
                Go to Apps
              </button>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                If you believe you should have access to this page, please contact your administrator.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // User has required role, render children
  return <>{children}</>;
};

export default RoleBasedRoute;