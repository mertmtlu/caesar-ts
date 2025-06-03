// src/components/auth/AdminRoute.tsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { api } from '@/api/api';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      setIsLoading(true);
      
      // First check if user is authenticated
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }

      // Get current user permissions
      const response = await api.users.users_GetCurrentUserPermissions();
      
      if (response.success && response.data) {
        // Check if user has admin permissions
        const hasAdminAccess = response.data.includes('admin') || 
                              response.data.includes('Admin') ||
                              response.data.some(permission => 
                                permission.toLowerCase().includes('admin')
                              );
        
        setIsAdmin(hasAdminAccess);
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('Admin access check failed:', error);
      setIsAdmin(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading while checking admin access
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <LoadingSpinner 
          size="lg" 
          text="Verifying admin access..." 
          className="min-h-screen"
        />
      </div>
    );
  }

  // If not admin, redirect to dashboard
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  // Wrap in ProtectedRoute to ensure authentication as well
  return (
    <ProtectedRoute>
      {children}
    </ProtectedRoute>
  );
};

export default AdminRoute;