// src/router/index.tsx
import React, { Suspense } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';

// Context Provider
import { AuthProvider } from '@/contexts/AuthContext';

// Layout components (keep these as regular imports for faster initial load)
// import RootLayout from '@/components/layout/RootLayout';
// import AuthLayout from '@/components/layout/AuthLayout';

// Protected Route wrappers (keep these as regular imports)
import ProtectedRoute from '@/components/auth/ProtectedRoute';
// import AdminRoute from '@/components/auth/AdminRoute';

// Loading component for Suspense fallback
import LoadingSpinner from '@/components/common/LoadingSpinner';

// Lazy load page components for code splitting
const LoginPage = React.lazy(() => import('@/pages/auth/LoginPage'));
const RegisterPage = React.lazy(() => import('@/pages/auth/RegisterPage'));
const DashboardPage = React.lazy(() => import('@/pages/dashboard/DashboardPage'));
const ProjectsPage = React.lazy(() => import('@/pages/projects/ProjectsPage'));
const CreateProjectPage = React.lazy(() => import('@/pages/projects/CreateProjectPage'));
// const ProjectDetailPage = React.lazy(() => import('@/pages/projects/ProjectDetailPage'));
const EditProjectPage = React.lazy(() => import('@/pages/projects/EditProjectPage'));
// const EditorPage = React.lazy(() => import('@/pages/editor/EditorPage'));
// const ExecutionsPage = React.lazy(() => import('@/pages/executions/ExecutionsPage'));
// const ExecutionDetailPage = React.lazy(() => import('@/pages/executions/ExecutionDetailPage'));
// const SettingsPage = React.lazy(() => import('@/pages/settings/SettingsPage'));
// const AdminPage = React.lazy(() => import('@/pages/admin/AdminPage'));

// Wrapper component for Suspense
const SuspenseWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Suspense fallback={<LoadingSpinner />}>
    {children}
  </Suspense>
);

// Root wrapper with AuthProvider
const AppWrapper: React.FC = () => (
  <AuthProvider>
    <Outlet />
  </AuthProvider>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppWrapper />,
    children: [
      {
        path: '/',
        // element: <RootLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/dashboard" replace />,
          },
          // Dashboard - Protected
          {
            path: 'dashboard',
            element: (
              <ProtectedRoute>
                <SuspenseWrapper>
                  <DashboardPage />
                </SuspenseWrapper>
              </ProtectedRoute>
            ),
          },
          // Projects - Protected
          {
            path: 'projects',
            children: [
              {
                index: true,
                element: (
                  <ProtectedRoute>
                    <SuspenseWrapper>
                      <ProjectsPage />
                    </SuspenseWrapper>
                  </ProtectedRoute>
                ),
              },
              {
                path: 'new',
                element: (
                  <ProtectedRoute>
                    <SuspenseWrapper>
                      <CreateProjectPage />
                    </SuspenseWrapper>
                  </ProtectedRoute>
                ),
              },
              // {
              //   path: ':projectId',
              //   element: (
              //     <ProtectedRoute>
              //       <SuspenseWrapper>
              //         <ProjectDetailPage />
              //       </SuspenseWrapper>
              //     </ProtectedRoute>
              //   ),
              // },
              {
                path: ':projectId/edit',
                element: (
                  <ProtectedRoute>
                    <SuspenseWrapper>
                      <EditProjectPage />
                    </SuspenseWrapper>
                  </ProtectedRoute>
                ),
              },
              // {
              //   path: ':projectId/editor',
              //   element: (
              //     <ProtectedRoute>
              //       <SuspenseWrapper>
              //         <EditorPage />
              //       </SuspenseWrapper>
              //     </ProtectedRoute>
              //   ),
              // },
            ],
          },
          // Executions - Protected
          {
            path: 'executions',
            children: [
              // {
              //   index: true,
              //   element: (
              //     <ProtectedRoute>
              //       <SuspenseWrapper>
              //         <ExecutionsPage />
              //       </SuspenseWrapper>
              //     </ProtectedRoute>
              //   ),
              // },
              // {
              //   path: ':executionId',
              //   element: (
              //     <ProtectedRoute>
              //       <SuspenseWrapper>
              //         <ExecutionDetailPage />
              //       </SuspenseWrapper>
              //     </ProtectedRoute>
              //   ),
              // },
            ],
          },
          // Settings - Protected
          // {
          //   path: 'settings',
          //   element: (
          //     <ProtectedRoute>
          //       <SuspenseWrapper>
          //         <SettingsPage />
          //       </SuspenseWrapper>
          //     </ProtectedRoute>
          //   ),
          // },
          // Admin - Protected & Admin Only
          // {
          //   path: 'admin',
          //   element: (
          //     <AdminRoute>
          //       <SuspenseWrapper>
          //         <AdminPage />
          //       </SuspenseWrapper>
          //     </AdminRoute>
          //   ),
          // },
        ],
      },
      // Authentication routes - separate layout
      {
        path: '/auth',
        // element: <AuthLayout />,
        children: [
          {
            path: 'login',
            element: (
              <SuspenseWrapper>
                <LoginPage />
              </SuspenseWrapper>
            ),
          },
          {
            path: 'register',
            element: (
              <SuspenseWrapper>
                <RegisterPage />
              </SuspenseWrapper>
            ),
          },
          {
            path: '',
            element: <Navigate to="/auth/login" replace />,
          },
        ],
      },
      // Catch-all route
      {
        path: '*',
        element: <Navigate to="/dashboard" replace />,
      },
    ],
  },
]);

export default router;