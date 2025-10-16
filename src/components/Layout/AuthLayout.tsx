// src/components/layouts/AuthLayout.tsx
import React, { useEffect, Suspense, lazy } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import CompactTerminalCloudIcon from '../icons/CompactTerminalCloudIcon';

// Lazy load ParticleLogo for code splitting
const ParticleLogo = lazy(() => import('@/components/auth/ParticleLogo'));

const AuthLayout: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine if particle animation should be shown (only on login page)
  const shouldShowParticles = location.pathname === '/auth/login';

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      // Get the intended destination from location state, or default to dashboard
      const from = (location.state as any)?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, location.state]);

  // Show loading while auth is being determined
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Don't render auth pages if user is already authenticated
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className={`min-h-screen grid ${shouldShowParticles ? 'lg:grid-cols-2' : 'lg:grid-cols-1'} bg-gray-50 dark:bg-gray-900`}>
      {/* LEFT COLUMN - Animated Particle Logo (Desktop only, Login page only) */}
      {shouldShowParticles && (
        <div className="hidden lg:block bg-gradient-to-br from-blue-600 via-indigo-700 to-indigo-900 dark:from-blue-950 dark:via-indigo-950 dark:to-black relative overflow-hidden">
          <Suspense>
            <ParticleLogo />
          </Suspense>
        </div>
      )}

      {/* RIGHT COLUMN - Auth Form Content */}
      <div className={`flex flex-col justify-center py-12 px-6 sm:px-12 lg:px-16 ${!shouldShowParticles ? 'lg:col-span-1 max-w-7xl mx-auto w-full' : ''}`}>
        {/* Background gradient (only visible when no particles) */}
        {!shouldShowParticles && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 -z-10"></div>
        )}

        {/* Mobile Logo (shown on mobile or when particles are hidden) */}
        <div className={`${shouldShowParticles ? 'lg:hidden' : ''} mb-8 flex justify-center`}>
          <div className="flex items-center space-x-2">
            <CompactTerminalCloudIcon />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              Caesar
            </div>
          </div>
        </div>

        {/* Main Auth Card */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white dark:bg-gray-800 py-8 px-6 sm:px-10 shadow-xl rounded-xl border border-gray-200 dark:border-gray-700">
            {/* Auth form content will be rendered here */}
            <Outlet />
          </div>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <div className="text-xs text-gray-500 dark:text-gray-400 space-x-4">
              <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                Privacy Policy
              </a>
              <span>•</span>
              <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                Terms of Service
              </a>
              <span>•</span>
              <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>

        {/* Feature highlights (only show when particles are NOT displayed) */}
        {!shouldShowParticles && (
          <div className="mt-12 w-full max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="text-gray-600 dark:text-gray-400">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm">Secure & Reliable</p>
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="text-sm">Team Collaboration</p>
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-sm">Fast Execution</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthLayout;