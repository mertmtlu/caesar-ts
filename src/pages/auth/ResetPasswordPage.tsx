// src/pages/auth/ResetPasswordPage.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '@/api/api';
import { UserPasswordResetDto } from '@/api';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

interface ResetPasswordFormData {
  newPassword: string;
  confirmNewPassword: string;
}

interface ResetPasswordError {
  field?: string;
  message: string;
}

const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [resetToken, setResetToken] = useState<string | null>(null);
  const [isValidatingToken, setIsValidatingToken] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);
  
  const [formData, setFormData] = useState<ResetPasswordFormData>({
    newPassword: '',
    confirmNewPassword: ''
  });
  const [errors, setErrors] = useState<ResetPasswordError[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Extract token from URL parameters
  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      setErrors([{
        message: 'No reset token provided. Please use the link from your email.'
      }]);
      setIsValidatingToken(false);
      return;
    }

    setResetToken(token);
    setIsTokenValid(true);
    setIsValidatingToken(false);
  }, [searchParams]);

  const validateForm = (): ResetPasswordError[] => {
    const newErrors: ResetPasswordError[] = [];

    // New password validation
    if (!formData.newPassword) {
      newErrors.push({
        field: 'newPassword',
        message: 'New password is required'
      });
    } else {
      if (formData.newPassword.length < 8) {
        newErrors.push({
          field: 'newPassword',
          message: 'Password must be at least 8 characters long'
        });
      }
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.newPassword)) {
        newErrors.push({
          field: 'newPassword',
          message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        });
      }
    }

    // Confirm password validation
    if (!formData.confirmNewPassword) {
      newErrors.push({
        field: 'confirmNewPassword',
        message: 'Please confirm your new password'
      });
    } else if (formData.newPassword !== formData.confirmNewPassword) {
      newErrors.push({
        field: 'confirmNewPassword',
        message: 'Passwords do not match'
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

  const handleInputChange = (field: keyof ResetPasswordFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    
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

  const passwordStrength = formData.newPassword ? getPasswordStrength(formData.newPassword) : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resetToken) {
      setErrors([{
        message: 'Reset token is missing. Please use the link from your email.'
      }]);
      return;
    }

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
      // Create password reset DTO
      const resetDto = new UserPasswordResetDto({
        resetToken: resetToken,
        newPassword: formData.newPassword,
        confirmNewPassword: formData.confirmNewPassword
      });

      // Call reset password API
      const response = await api.auth.auth_ResetPassword(resetDto);

      if (response.success && response.data) {
        // Show success message
        setShowSuccessMessage(true);
        
        // Redirect to login after a delay
        setTimeout(() => {
          navigate('/auth/login', { 
            state: { 
              message: 'Your password has been reset successfully. Please sign in with your new password.' 
            }
          });
        }, 3000);
      } else {
        // Handle API errors
        const errorMessages = response.errors && response.errors.length > 0 
          ? response.errors 
          : [response.message || 'Failed to reset password. Please try again.'];
        
        setErrors(errorMessages.map(msg => ({ message: msg })));
      }
    } catch (error) {
      console.error('Reset password error:', error);
      
      // Handle different types of errors
      if (error instanceof Error) {
        if (error.message.includes('400') || error.message.includes('invalid')) {
          setErrors([{
            message: 'The reset link is invalid or has expired. Please request a new password reset.'
          }]);
        } else {
          setErrors([{
            message: 'Network error. Please check your connection and try again.'
          }]);
        }
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

  // Loading state while validating token
  if (isValidatingToken) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Validating reset link...</p>
        </div>
      </div>
    );
  }

  // Invalid token state
  if (!isTokenValid) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30">
            <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
            Invalid Reset Link
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            This password reset link is invalid or has expired.
          </p>
        </div>

        {generalErrors.length > 0 && (
          <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
            <div className="text-sm text-red-700 dark:text-red-300">
              {generalErrors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-3">
          <Link to="/auth/forgot-password">
            <Button variant="primary" fullWidth>
              Request new reset link
            </Button>
          </Link>
          
          <div className="text-center">
            <Link
              to="/auth/login"
              className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
            Password Reset Successful!
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Your password has been updated successfully. Redirecting you to sign in...
          </p>
          <div className="mt-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/auth/login"
            className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            Sign in now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
          Reset your password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Please enter your new password below
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
                {generalErrors.length === 1 ? 'Error' : 'Errors'}
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

      {/* Reset Password Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* New Password */}
        <div>
          <Input
            id="newPassword"
            label="New Password"
            type="password"
            autoComplete="new-password"
            required
            fullWidth
            value={formData.newPassword}
            onChange={handleInputChange('newPassword')}
            errorMessage={getFieldError('newPassword')}
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

        {/* Confirm New Password */}
        <div>
          <Input
            id="confirmNewPassword"
            label="Confirm New Password"
            type="password"
            autoComplete="new-password"
            required
            fullWidth
            value={formData.confirmNewPassword}
            onChange={handleInputChange('confirmNewPassword')}
            errorMessage={getFieldError('confirmNewPassword')}
            disabled={isLoading}
            showPasswordToggle
            leftIcon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
        </div>

        {/* Submit Button */}
        <div>
          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={isLoading}
            disabled={isLoading || !formData.newPassword || !formData.confirmNewPassword}
            size="lg"
          >
            {isLoading ? 'Resetting password...' : 'Reset password'}
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
              Remember your password?
            </span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/auth/login"
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            Back to sign in
          </Link>
        </div>
      </div>

      {/* Security Information */}
      <div className="mt-6 rounded-md bg-gray-50 dark:bg-gray-800/50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">
              Password Requirements
            </h3>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              <ul className="list-disc list-inside space-y-1">
                <li>At least 8 characters long</li>
                <li>Contains at least one uppercase letter</li>
                <li>Contains at least one lowercase letter</li>
                <li>Contains at least one number</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;