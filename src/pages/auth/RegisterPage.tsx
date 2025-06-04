// src/pages/auth/RegisterPage.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/api/api';
import { UserRegisterDto } from '@/api';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  subscribeNewsletter: boolean;
}

interface RegisterError {
  field?: string;
  message: string;
}

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    subscribeNewsletter: false
  });
  const [errors, setErrors] = useState<RegisterError[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = (): RegisterError[] => {
    const newErrors: RegisterError[] = [];

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.push({
        field: 'firstName',
        message: 'First name is required'
      });
    } else if (formData.firstName.trim().length < 2) {
      newErrors.push({
        field: 'firstName',
        message: 'First name must be at least 2 characters long'
      });
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.push({
        field: 'lastName',
        message: 'Last name is required'
      });
    } else if (formData.lastName.trim().length < 2) {
      newErrors.push({
        field: 'lastName',
        message: 'Last name must be at least 2 characters long'
      });
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.push({
        field: 'email',
        message: 'Email is required'
      });
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.push({
          field: 'email',
          message: 'Please enter a valid email address'
        });
      }
    }

    // Username validation
    if (!formData.username.trim()) {
      newErrors.push({
        field: 'username',
        message: 'Username is required'
      });
    } else {
      const username = formData.username.trim();
      if (username.length < 3) {
        newErrors.push({
          field: 'username',
          message: 'Username must be at least 3 characters long'
        });
      } else if (username.length > 30) {
        newErrors.push({
          field: 'username',
          message: 'Username must be less than 30 characters'
        });
      } else if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
        newErrors.push({
          field: 'username',
          message: 'Username can only contain letters, numbers, underscores, and hyphens'
        });
      }
    }

    // Password validation
    if (!formData.password) {
      newErrors.push({
        field: 'password',
        message: 'Password is required'
      });
    } else {
      if (formData.password.length < 8) {
        newErrors.push({
          field: 'password',
          message: 'Password must be at least 8 characters long'
        });
      }
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        newErrors.push({
          field: 'password',
          message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        });
      }
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.push({
        field: 'confirmPassword',
        message: 'Please confirm your password'
      });
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.push({
        field: 'confirmPassword',
        message: 'Passwords do not match'
      });
    }

    // Terms acceptance validation
    if (!formData.acceptTerms) {
      newErrors.push({
        field: 'acceptTerms',
        message: 'You must accept the terms and conditions to continue'
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

  const handleInputChange = (field: keyof RegisterFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = ['acceptTerms', 'subscribeNewsletter'].includes(field) 
      ? e.target.checked 
      : e.target.value;
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear field-specific errors when user starts typing
    if (errors.some(error => error.field === field)) {
      setErrors(prev => prev.filter(error => error.field !== field));
    }
  };

  const getPasswordStrength = (password: string): { strength: number; label: string; color: string } => {
    let strength = 0;
    const checks = [
      password.length >= 8,
      /[a-z]/.test(password),
      /[A-Z]/.test(password),
      /\d/.test(password),
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    ];
    
    strength = checks.filter(Boolean).length;
    
    if (strength <= 2) return { strength: strength * 20, label: 'Weak', color: 'bg-red-500' };
    if (strength <= 3) return { strength: strength * 20, label: 'Fair', color: 'bg-yellow-500' };
    if (strength <= 4) return { strength: strength * 20, label: 'Good', color: 'bg-blue-500' };
    return { strength: 100, label: 'Strong', color: 'bg-green-500' };
  };

  const passwordStrength = formData.password ? getPasswordStrength(formData.password) : null;

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
      // Create register DTO
      const registerDto = new UserRegisterDto({
        email: formData.email.trim(),
        username: formData.username.trim(),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim()
      });

      // Call register API
      const response = await api.auth.auth_Register(registerDto);

      if (response.success && response.data) {
        const { accessToken, refreshToken, user } = response.data;

        if (accessToken && refreshToken && user) {
          // Show success message briefly
          setShowSuccessMessage(true);
          
          // Auto-login the user after successful registration
          setTimeout(() => {
            login(accessToken, refreshToken, user);
            navigate('/dashboard', { replace: true });
          }, 1500);
        } else {
          setErrors([{
            message: 'Registration response is missing required data. Please try again.'
          }]);
        }
      } else {
        // Handle API errors
        const errorMessages = response.errors && response.errors.length > 0 
          ? response.errors 
          : [response.message || 'Registration failed. Please try again.'];
        
        setErrors(errorMessages.map(msg => ({ message: msg })));
      }
    } catch (error) {
      console.error('Registration error:', error);
      
      // Handle different types of errors
      if (error instanceof Error) {
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

  // Success message display
  if (showSuccessMessage) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30">
            <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
            Registration Successful!
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Welcome to CodeSpace! You're being signed in automatically...
          </p>
          <div className="mt-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link
            to="/auth/login"
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            Sign in here
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
                {generalErrors.length === 1 ? 'Registration Error' : 'Registration Errors'}
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

      {/* Registration Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Name Fields */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            id="firstName"
            label="First Name"
            type="text"
            autoComplete="given-name"
            required
            fullWidth
            value={formData.firstName}
            onChange={handleInputChange('firstName')}
            errorMessage={getFieldError('firstName')}
            disabled={isLoading}
            leftIcon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
          />

          <Input
            id="lastName"
            label="Last Name"
            type="text"
            autoComplete="family-name"
            required
            fullWidth
            value={formData.lastName}
            onChange={handleInputChange('lastName')}
            errorMessage={getFieldError('lastName')}
            disabled={isLoading}
            leftIcon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
          />
        </div>

        {/* Email */}
        <Input
          id="email"
          label="Email Address"
          type="email"
          autoComplete="email"
          required
          fullWidth
          value={formData.email}
          onChange={handleInputChange('email')}
          errorMessage={getFieldError('email')}
          disabled={isLoading}
          leftIcon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
          }
        />

        {/* Username */}
        <Input
          id="username"
          label="Username"
          type="text"
          autoComplete="username"
          required
          fullWidth
          value={formData.username}
          onChange={handleInputChange('username')}
          errorMessage={getFieldError('username')}
          disabled={isLoading}
          helperText="3-30 characters, letters, numbers, underscores, and hyphens only"
          leftIcon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          }
        />

        {/* Password */}
        <div>
          <Input
            id="password"
            label="Password"
            type="password"
            autoComplete="new-password"
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
          
          {/* Password Strength Indicator */}
          {passwordStrength && (
            <div className="mt-2">
              <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                <span>Password strength:</span>
                <span className={`font-medium ${
                  passwordStrength.label === 'Weak' ? 'text-red-600 dark:text-red-400' :
                  passwordStrength.label === 'Fair' ? 'text-yellow-600 dark:text-yellow-400' :
                  passwordStrength.label === 'Good' ? 'text-blue-600 dark:text-blue-400' :
                  'text-green-600 dark:text-green-400'
                }`}>
                  {passwordStrength.label}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                  style={{ width: `${passwordStrength.strength}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <Input
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          autoComplete="new-password"
          required
          fullWidth
          value={formData.confirmPassword}
          onChange={handleInputChange('confirmPassword')}
          errorMessage={getFieldError('confirmPassword')}
          disabled={isLoading}
          showPasswordToggle
          leftIcon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />

        {/* Terms and Newsletter */}
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="acceptTerms"
                name="acceptTerms"
                type="checkbox"
                checked={formData.acceptTerms}
                onChange={handleInputChange('acceptTerms')}
                disabled={isLoading}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-800 dark:focus:ring-blue-500"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="acceptTerms" className="text-gray-900 dark:text-gray-300">
                I agree to the{' '}
                <a href="#" className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                  Terms and Conditions
                </a>
                {' '}and{' '}
                <a href="#" className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                  Privacy Policy
                </a>
                <span className="text-red-500 ml-1">*</span>
              </label>
              {getFieldError('acceptTerms') && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {getFieldError('acceptTerms')}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="subscribeNewsletter"
                name="subscribeNewsletter"
                type="checkbox"
                checked={formData.subscribeNewsletter}
                onChange={handleInputChange('subscribeNewsletter')}
                disabled={isLoading}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-800 dark:focus:ring-blue-500"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="subscribeNewsletter" className="text-gray-900 dark:text-gray-300">
                Subscribe to our newsletter for updates and tips
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={isLoading}
            disabled={isLoading}
            size="lg"
          >
            {isLoading ? 'Creating account...' : 'Create account'}
          </Button>
        </div>
      </form>

      {/* Footer Help */}
      <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
        By creating an account, you'll be able to collaborate on projects, 
        execute code, and deploy applications on our platform.
      </div>
    </div>
  );
};

export default RegisterPage;