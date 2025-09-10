// src/components/layouts/RootLayout.tsx
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { initializeTheme } from '@/stores/themeStore';
import MaintenanceMode from '@/components/maintenance/MaintenanceMode';

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Application Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="max-w-md w-full mx-auto p-6">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 dark:bg-red-900 rounded-full mb-4">
                <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-2">
                Something went wrong
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                The application encountered an unexpected error. Please refresh the page to try again.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Refresh Page
              </button>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-4">
                  <summary className="text-sm text-gray-500 cursor-pointer">Error Details</summary>
                  <pre className="mt-2 text-xs text-red-600 bg-red-50 dark:bg-red-900/20 p-2 rounded overflow-auto">
                    {this.state.error.toString()}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading Component
const GlobalLoading: React.FC = () => (
  <div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600 dark:text-gray-400">Loading...</p>
    </div>
  </div>
);

// Toast/Notification System (basic implementation)
interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
}

const ToastContainer: React.FC<{ toasts: Toast[] }> = ({ toasts }) => {
  if (toasts.length === 0) return null;

  const getToastStyles = (type: Toast['type']) => {
    const baseStyles = "p-4 rounded-lg shadow-lg border max-w-sm";
    switch (type) {
      case 'success':
        return `${baseStyles} bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400`;
      case 'error':
        return `${baseStyles} bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400`;
      case 'warning':
        return `${baseStyles} bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-400`;
      case 'info':
        return `${baseStyles} bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400`;
      default:
        return baseStyles;
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div key={toast.id} className={getToastStyles(toast.type)}>
          <div className="font-medium">{toast.title}</div>
          {toast.message && (
            <div className="text-sm mt-1 opacity-90">{toast.message}</div>
          )}
        </div>
      ))}
    </div>
  );
};

// Main RootLayout Component
const RootLayout: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [adminBypassed, setAdminBypassed] = useState(false);

  // Initialize application
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize theme system first
        initializeTheme();
        
        // Check maintenance mode
        const maintenanceMode = import.meta.env.VITE_MAINTENANCE_MODE === 'true';
        setIsMaintenanceMode(maintenanceMode);
        
        // Add any other global initialization logic here
        // For example: feature flags, analytics, etc.
        
        // Simulate initialization delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
      } catch (error) {
        console.error('App initialization failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  // Auto-remove toasts after 5 seconds
  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        setToasts(prev => prev.slice(1));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toasts]);

  // Global toast function that can be used throughout the app
  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { ...toast, id }]);
  };

  // Make toast function available globally (optional - could use context instead)
  useEffect(() => {
    (window as any).addToast = addToast;
    return () => {
      delete (window as any).addToast;
    };
  }, []);

  if (isLoading) {
    return <GlobalLoading />;
  }

  // Show maintenance mode if enabled and admin hasn't bypassed
  if (isMaintenanceMode && !adminBypassed) {
    return (
      <MaintenanceMode
        message={import.meta.env.VITE_MAINTENANCE_MESSAGE}
        onAdminBypass={() => setAdminBypassed(true)}
      />
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        {/* Main content area */}
        <Outlet />
        
        {/* Global notifications */}
        <ToastContainer toasts={toasts} />
      </div>
    </ErrorBoundary>
  );
};

export default RootLayout;