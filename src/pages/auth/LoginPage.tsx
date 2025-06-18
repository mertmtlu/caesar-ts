// src/pages/auth/LoginPage.tsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/api/api';
import { UserLoginDto } from '@/api';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

interface LoginFormData {
  usernameOrEmail: string;
  password: string;
  rememberMe: boolean;
}

interface LoginError {
  field?: string;
  message: string;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    usernameOrEmail: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState<LoginError[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the intended destination from location state
  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const validateForm = (): LoginError[] => {
    const newErrors: LoginError[] = [];

    if (!formData.usernameOrEmail.trim()) {
      newErrors.push({
        field: 'usernameOrEmail',
        message: 'Email or username is required'
      });
    }

    if (!formData.password) {
      newErrors.push({
        field: 'password',
        message: 'Password is required'
      });
    } else if (formData.password.length < 6) {
      newErrors.push({
        field: 'password',
        message: 'Password must be at least 6 characters long'
      });
    }

    return newErrors;
  };

  const getFieldError = (fieldName: string): string | undefined => {
    return errors.find(error => error.field === fieldName)?.message;
  };

  const getGeneralErrors = (): string[] => {
    return errors.filter(error => !error.field).map(error => error.message);
  };

  const handleInputChange = (field: keyof LoginFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = field === 'rememberMe' ? e.target.checked : e.target.value;
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear field-specific errors when user starts typing
    if (errors.some(error => error.field === field)) {
      setErrors(prev => prev.filter(error => error.field !== field));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors([]);
    
    // Validate form
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      // Create login DTO
      const loginDto = new UserLoginDto({
        usernameOrEmail: formData.usernameOrEmail.trim(),
        password: formData.password,
        rememberMe: formData.rememberMe
      });

      // Call login API
      const response = await api.auth.auth_Login(loginDto);

      if (response.success && response.data) {
        const { accessToken, refreshToken, user } = response.data;

        if (accessToken && refreshToken && user) {
          // Update auth context
          login(accessToken, refreshToken, user);
          
          // Navigate to intended destination
          navigate(from, { replace: true });
        } else {
          setErrors([{
            message: 'Login response is missing required data. Please try again.'
          }]);
        }
      } else {
        // Handle API errors
        const errorMessages = response.errors && response.errors.length > 0 
          ? response.errors 
          : [response.message || 'Login failed. Please check your credentials.'];
        
        setErrors(errorMessages.map(msg => ({ message: msg })));
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle SwaggerException (API errors) vs network errors
      if (error && typeof error === 'object' && 'status' in error) {
        const apiError = error as any;
        if (apiError.status === 401) {
          setErrors([{
            message: 'Invalid credentials. Please check your email/username and password.'
          }]);
        } else if (apiError.status === 403) {
          setErrors([{
            message: 'Access denied. Your account may be disabled or locked.'
          }]);
        } else if (apiError.status >= 500) {
          setErrors([{
            message: 'Server error. Please try again later.'
          }]);
        } else {
          setErrors([{
            message: apiError.message || 'Login failed. Please try again.'
          }]);
        }
      } else if (error instanceof Error) {
        setErrors([{
          message: 'Network error. Please check your connection and try again.'
        }]);
      } else {
        setErrors([{
          message: 'An unexpected error occurred. Please try again.'
        }]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const generalErrors = getGeneralErrors();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Or{' '}
          <Link
            to="/auth/register"
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            create a new account
          </Link>
        </p>
      </div>

      {/* General Error Messages */}
      {generalErrors.length > 0 && (
        <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                {generalErrors.length === 1 ? 'Login Error' : 'Login Errors'}
              </h3>
              <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                <ul className="list-disc list-inside space-y-1">
                  {generalErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Login Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <Input
            id="usernameOrEmail"
            label="Email or Username"
            type="text"
            autoComplete="username"
            required
            fullWidth
            value={formData.usernameOrEmail}
            onChange={handleInputChange('usernameOrEmail')}
            errorMessage={getFieldError('usernameOrEmail')}
            disabled={isLoading}
            leftIcon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
          />
        </div>

        <div>
          <Input
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            required
            fullWidth
            value={formData.password}
            onChange={handleInputChange('password')}
            errorMessage={getFieldError('password')}
            disabled={isLoading}
            showPasswordToggle
            leftIcon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleInputChange('rememberMe')}
              disabled={isLoading}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-800 dark:focus:ring-blue-500"
            />
            <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-900 dark:text-gray-300">
              Remember me
            </label>
          </div>

          <div className="text-sm leading-6">
            <Link
              to="/auth/forgot-password"
              className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <div>
          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={isLoading}
            disabled={isLoading}
            size="lg"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </div>
      </form>

      {/* Additional Options */}
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600" />
          </div>
          <div className="relative flex justify-center text-sm font-medium leading-6">
            <span className="bg-white dark:bg-gray-800 px-6 text-gray-900 dark:text-gray-300">
              Need help?
            </span>
          </div>
        </div>

        <div className="mt-6 flex justify-center space-x-6 text-sm">
          <a
            href="#"
            className="text-gray-600 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              // You can implement a help modal or redirect to documentation
              alert('Contact support at support@yourcompany.com');
            }}
          >
            Contact Support
          </a>
          <span className="text-gray-300 dark:text-gray-600">|</span>
          <a
            href="#"
            className="text-gray-600 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              // You can implement a documentation modal or redirect
              alert('Documentation coming soon!');
            }}
          >
            Documentation
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;