// src/components/layout/AuthLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { CodeBracketIcon } from '@heroicons/react/24/outline';

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo/Brand */}
        <div className="flex justify-center">
          <div className="flex items-center space-x-2">
            <CodeBracketIcon className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              Caesar
            </span>
          </div>
        </div>
        
        {/* Platform Description */}
        <h2 className="mt-6 text-center text-xl text-gray-600 dark:text-gray-300">
          Collaborative Programming Platform
        </h2>
      </div>

      {/* Auth Form Container */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-gray-200 dark:border-gray-700">
          <Outlet />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          &copy; 2024 Caesar Platform. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;