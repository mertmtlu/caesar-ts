// src/pages/auth/ForgotPasswordPage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '@/api/api';
import { UserPasswordResetRequestDto } from '@/api';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

interface ForgotPasswordFormData {
  email: string;
}

interface ForgotPasswordError {
  field?: string;
  message: string;
}

const ForgotPasswordPage: React.FC = () => {
  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    email: ''
  });
  const [errors, setErrors] = useState<ForgotPasswordError[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const validateForm = (): ForgotPasswordError[] => {
    const newErrors: ForgotPasswordError[] = [];

    if (!formData.email.trim()) {
      newErrors.push({
        field: 'email',
        message: 'Email address is required'
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

    return newErrors;
  };

  const getFieldError = (fieldName: string): string | undefined => {
    return errors.find(error => error.field === fieldName)?.message;
  };

  const getGeneralErrors = (): string[] => {
    return errors.filter(error => !error.field).map(error => error.message);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    setFormData(prev => ({
      ...prev,
      email: value
    }));

    // Clear email-specific errors when user starts typing
    if (errors.some(error => error.field === 'email')) {
      setErrors(prev => prev.filter(error => error.field !== 'email'));
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
      // Create password reset request DTO
      const resetRequestDto = new UserPasswordResetRequestDto({
        email: formData.email.trim()
      });

      // Call forgot password API
      const response = await api.auth.auth_ForgotPassword(resetRequestDto);

      if (response.success) {
        // Show success message regardless of whether email exists (security best practice)
        setSubmittedEmail(formData.email.trim());
        setShowSuccessMessage(true);
        setFormData({ email: '' });
      } else {
        // Handle API errors
        const errorMessages = response.errors && response.errors.length > 0 
          ? response.errors 
          : [response.message || 'Failed to send password reset email. Please try again.'];
        
        setErrors(errorMessages.map(msg => ({ message: msg })));
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      
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

  const handleBackToForm = () => {
    setShowSuccessMessage(false);
    setSubmittedEmail('');
    setErrors([]);
  };

  const generalErrors = getGeneralErrors();

  // Success message display
  if (showSuccessMessage) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30">
            <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
            Check your email
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            If an account with <strong>{submittedEmail}</strong> exists, we've sent you a password reset link.
          </p>
        </div>

        <div className="rounded-md bg-blue-50 dark:bg-blue-900/20 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                What's next?
              </h3>
              <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                <ul className="list-disc list-inside space-y-1">
                  <li>Check your email inbox (and spam folder)</li>
                  <li>Click the reset link in the email</li>
                  <li>Follow the instructions to create a new password</li>
                  <li>The link will expire in 24 hours for security</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Button
            variant="primary"
            fullWidth
            onClick={handleBackToForm}
          >
            Send another reset email
          </Button>
          
          <div className="text-center">
            <Link
              to="/auth/login"
              className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              Back to sign in
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
          <p>Didn't receive an email? Check your spam folder or contact support if the issue persists.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
          Forgot your password?
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          No worries! Enter your email address and we'll send you a link to reset your password.
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

      {/* Reset Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <Input
            id="email"
            label="Email Address"
            type="email"
            autoComplete="email"
            required
            fullWidth
            value={formData.email}
            onChange={handleInputChange}
            errorMessage={getFieldError('email')}
            disabled={isLoading}
            helperText="Enter the email address associated with your account"
            leftIcon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            }
          />
        </div>

        <div>
          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={isLoading}
            disabled={isLoading || !formData.email.trim()}
            size="lg"
          >
            {isLoading ? 'Sending reset link...' : 'Send reset link'}
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
              Security Information
            </h3>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              <ul className="list-disc list-inside space-y-1">
                <li>Password reset links expire after 24 hours</li>
                <li>We'll only send emails to verified account addresses</li>
                <li>For security, we won't confirm if an email exists in our system</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Need help?{' '}
          <a
            href="#"
            className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              // You can implement a help modal or redirect to support
              alert('Contact support at support@yourcompany.com');
            }}
          >
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;