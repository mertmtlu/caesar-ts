// src/components/Layout/DemoLayout.tsx
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

/**
 * DemoLayout - Chrome-less layout component for product demos
 *
 * Features:
 * - No sidebar navigation
 * - No top header bar
 * - Minimal exit button
 * - Full-width content area
 * - Clean background optimized for demo videos
 */
const DemoLayout: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleExit = () => {
    // Navigate back to main app
    navigate('/apps');
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Subtle floating controls - top right */}
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
        {/* User indicator */}
        <div className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
            <span className="text-xs font-medium text-white">
              {user?.firstName?.[0] || user?.username?.[0] || 'U'}
            </span>
          </div>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {user?.firstName || user?.username}
          </span>
        </div>

        {/* Exit Demo button */}
        <button
          onClick={handleExit}
          className="px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 text-sm font-medium flex items-center space-x-2"
          title="Exit demo mode"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span className="hidden sm:inline">Exit Demo</span>
        </button>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200"
          title="Logout"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>

      {/* Main content area - full width, no chrome */}
      <main className="w-full min-h-screen">
        <Outlet />
      </main>

      {/* Optional: Subtle branding watermark for videos */}
      <div className="fixed bottom-4 left-4 text-xs text-gray-400 dark:text-gray-600 font-medium opacity-50">
        Caesar Platform Demo
      </div>
    </div>
  );
};

export default DemoLayout;
