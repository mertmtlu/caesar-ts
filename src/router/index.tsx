// src/router/index.tsx
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';

// Layout Components (to be created)
import RootLayout from '@/components/Layout/RootLayout';
import AuthLayout from '@/components/Layout/AuthLayout';
import DashboardLayout from '@/components/Layout/DashboardLayout';

// Auth Pages (to be created)
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '@/pages/auth/ResetPasswordPage';

// Dashboard Pages (to be created)
import DashboardHome from '@/pages/dashboard/DashboardHome';

// Project Pages (to be created)
import ProjectsPage from '@/pages/projects/ProjectsPage';
import CreateProjectPage from '@/pages/projects/CreateProjectPage';
import ProjectDetailPage from '@/pages/projects/ProjectDetailPage';
import ComponentsPage from '@/pages/projects/ComponentsPage';
import CreateComponentPage from '@/pages/projects/CreateComponentPage';
import ComponentDesignerPage from '@/pages/projects/ComponentDesignerPage';
import ComponentDetailPage from '@/pages/projects/ComponentDetailPage';
import ComponentEditPage from '@/pages/projects/ComponentEditPage';

// Editor Pages (to be created)
import EditorPage from '@/pages/editor/EditorPage';

// Execution Pages
import ExecutionsPage from '@/pages/executions/ExecutionsPage';
import ExecutionDetailPage from '@/pages/executions/ExecutionDetailPage';

// Workflow Pages
import WorkflowsPage from '@/pages/workflows/WorkflowsPage';
import WorkflowDetailPage from '@/pages/workflows/WorkflowDetailPage';
import WorkflowDesignerPage from '@/pages/workflows/WorkflowDesignerPage';
import WorkflowExecutionPage from '@/pages/workflows/WorkflowExecutionPage';

// // Settings Pages (to be created)
// import SettingsPage from '@/pages/settings/SettingsPage';
// import ProfilePage from '@/pages/settings/ProfilePage';

// RemoteApps Pages
import RemoteAppsPage from '@/pages/remoteapps/RemoteAppsPage';
import CreateRemoteAppPage from '@/pages/remoteapps/CreateRemoteAppPage';
import EditRemoteAppPage from '@/pages/remoteapps/EditRemoteAppPage';

// Admin Pages
import UsersPage from '@/pages/admin/UsersPage';
import ProgramPermissionsPage from '@/pages/admin/ProgramPermissionsPage';
// import AdminDashboard from '@/pages/admin/AdminDashboard';
// import SystemMonitoringPage from '@/pages/admin/SystemMonitoringPage';

// Protected Route Component (to be created)
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AdminRoute from '@/components/auth/AdminRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <RootLayout />
      </AuthProvider>
    ),
    children: [
      // Redirect root to dashboard
      {
        index: true,
        element: <Navigate to="/dashboard" replace />
      },
      
      // Authentication routes
      {
        path: 'auth',
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            element: <LoginPage />
          },
          {
            path: 'register',
            element: <RegisterPage />
          },
          {
            path: 'forgot-password',
            element: <ForgotPasswordPage />
          },
          {
            path: 'reset-password',
            element: <ResetPasswordPage />
          }
        ]
      },

      // Protected application routes
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <DashboardHome />
          }
        ]
      },

      // Projects routes
      {
        path: 'projects',
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <ProjectsPage />
          },
          {
            path: 'create',
            element: <CreateProjectPage />
          },
          {
            path: ':projectId',
            element: <ProjectDetailPage />
          },
          {
            path: ':projectId/components',
            element: <ComponentsPage />
          },
          {
            path: ':projectId/components/create',
            element: <CreateComponentPage />
          },
          {
            path: ':projectId/components/designer',
            element: <ComponentDesignerPage />
          },
          {
            path: ':projectId/components/:componentId',
            element: <ComponentDetailPage />
          },
          {
            path: ':projectId/components/:componentId/edit',
            element: <ComponentEditPage />
          },
          {
            path: ':projectId/components/:componentId/designer',
            element: <ComponentDesignerPage />
          }
        ]
      },

      // Code Editor routes
      {
        path: 'editor',
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: ':projectId/:versionId?',
            element: <EditorPage />
          }
        ]
      },

      // Execution routes
      {
        path: 'apps',
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <ExecutionsPage />
          },
          {
            path: ':executionId',
            element: <ExecutionDetailPage />
          }
        ]
      },

      // Workflow routes
      {
        path: 'workflows',
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <WorkflowsPage />
          },
          {
            path: 'designer',
            element: <WorkflowDesignerPage />
          },
          {
            path: ':workflowId',
            element: <WorkflowDetailPage />
          },
          {
            path: ':workflowId/designer',
            element: <WorkflowDesignerPage />
          },
          {
            path: ':workflowId/execution/:executionId',
            element: <WorkflowExecutionPage />
          }
        ]
      },

      // // Settings routes
      // {
      //   path: 'settings',
      //   element: (
      //     <ProtectedRoute>
      //       <DashboardLayout />
      //     </ProtectedRoute>
      //   ),
      //   children: [
      //     {
      //       index: true,
      //       element: <SettingsPage />
      //     },
      //     {
      //       path: 'profile',
      //       element: <ProfilePage />
      //     }
      //   ]
      // },

      // Remote Apps routes
      {
        path: 'remoteapps',
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <RemoteAppsPage />
          },
          {
            path: 'create',
            element: <CreateRemoteAppPage />
          },
          {
            path: ':appId/edit',
            element: <EditRemoteAppPage />
          }
        ]
      },

      // Admin routes (protected by admin role)
      {
        path: 'admin',
        element: (
          <AdminRoute>
            <DashboardLayout />
          </AdminRoute>
        ),
        children: [
          // {
          //   index: true,
          //   element: <AdminDashboard />
          // },
          {
            path: 'users',
            element: <UsersPage />
          },
          {
            path: 'programs',
            element: <ProgramPermissionsPage />
          },
          // {
          //   path: 'monitoring',
          //   element: <SystemMonitoringPage />
          // }
        ]
      },

      // Catch-all route
      {
        path: '*',
        element: <Navigate to="/dashboard" replace />
      }
    ]
  }
]);