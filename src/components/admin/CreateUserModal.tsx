import React, { useState, useEffect } from 'react';
import { api } from '@/api/api';
import { UserRegisterDto } from '@/api/types';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Modal from '@/components/common/Modal';

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserCreated: () => void;
}

interface CreateUserForm {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  role: string;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({
  isOpen,
  onClose,
  onUserCreated
}) => {
  const [form, setForm] = useState<CreateUserForm>({
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    role: ''
  });
  
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableRoles, setAvailableRoles] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      loadAvailableRoles();
      resetForm();
    }
  }, [isOpen]);

  const loadAvailableRoles = async () => {
    try {
      const response = await api.users.users_GetAvailableRoles();
      if (response.success && response.data) {
        setAvailableRoles(response.data);
      }
    } catch (error) {
      console.error('Failed to load available roles:', error);
    }
  };

  const resetForm = () => {
    setForm({
      email: '',
      username: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      role: ''
    });
    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    // Email validation
    if (!form.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Username validation
    if (!form.username) {
      newErrors.username = 'Username is required';
    } else if (form.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters long';
    } else if (!/^[a-zA-Z0-9_]+$/.test(form.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    // Password validation
    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(form.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    // Confirm password validation
    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Role validation
    if (!form.role) {
      newErrors.role = 'A role must be selected';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      
      const registerDto = new UserRegisterDto({
        email: form.email,
        username: form.username,
        password: form.password,
        confirmPassword: form.confirmPassword,
        firstName: form.firstName || undefined,
        lastName: form.lastName || undefined
      });

      const response = await api.users.users_Create(registerDto);

      if (response.success && response.data) {
        // If user was created successfully and role is selected, update role
        if (form.role) {
          try {
            await api.users.users_UpdateRoles(response.data.id!, {
              role: form.role
            } as any);
          } catch (roleError) {
            console.error('Failed to assign role:', roleError);
            // Don't fail the entire creation if role assignment fails
          }
        }

        onUserCreated();
        onClose();
        resetForm();
      } else {
        // Handle API errors
        if (response.message?.includes('email')) {
          setErrors({ email: 'This email address is already in use' });
        } else if (response.message?.includes('username')) {
          setErrors({ username: 'This username is already taken' });
        } else {
          setErrors({ general: response.message || 'Failed to create user' });
        }
      }
    } catch (error) {
      console.error('Failed to create user:', error);
      setErrors({ general: 'Failed to create user. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof CreateUserForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleRoleChange = (role: string) => {
    setForm(prev => ({
      ...prev,
      role: role
    }));
    
    // Clear role error when user selects a role
    if (errors.role) {
      setErrors(prev => ({ ...prev, role: '' }));
    }
  };

  const getRoleColor = (role: string): string => {
    const roleLower = role.toLowerCase();
    if (roleLower === 'admin') {
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
    }
    if (roleLower === 'externaldev') {
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
    }
    if (roleLower === 'internaldev') {
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    }
    if (roleLower === 'externaluser') {
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    }
    if (roleLower === 'internaluser') {
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
    }
    return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New User"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Error */}
        {errors.general && (
          <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800 dark:text-red-200">{errors.general}</p>
              </div>
            </div>
          </div>
        )}

        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email*"
            type="email"
            value={form.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            errorMessage={errors.email}
            placeholder="user@example.com"
            required
          />
          
          <Input
            label="Username*"
            value={form.username}
            onChange={(e) => handleInputChange('username', e.target.value)}
            errorMessage={errors.username}
            placeholder="username"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            value={form.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            placeholder="John"
          />
          
          <Input
            label="Last Name"
            value={form.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            placeholder="Doe"
          />
        </div>

        {/* Password Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Password*"
            type="password"
            value={form.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            errorMessage={errors.password}
            placeholder="Enter password"
            required
          />
          
          <Input
            label="Confirm Password*"
            type="password"
            value={form.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            errorMessage={errors.confirmPassword}
            placeholder="Confirm password"
            required
          />
        </div>

        {/* Password Requirements */}
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <p className="font-medium mb-1">Password requirements:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>At least 8 characters long</li>
            <li>Contains at least one uppercase letter</li>
            <li>Contains at least one lowercase letter</li>
            <li>Contains at least one number</li>
          </ul>
        </div>

        {/* Role Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Role* {errors.role && <span className="text-red-500">({errors.role})</span>}
          </label>
          <select
            value={form.role}
            onChange={(e) => handleRoleChange(e.target.value)}
            className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select a role</option>
            {availableRoles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          
          {/* Selected Role Preview */}
          {form.role && (
            <div className="mt-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Selected role:
              </p>
              <div className="flex flex-wrap gap-2">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(form.role)}`}
                >
                  {form.role}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            {isSubmitting ? 'Creating User...' : 'Create User'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateUserModal;