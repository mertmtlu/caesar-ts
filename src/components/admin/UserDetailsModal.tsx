import React, { useState, useEffect } from 'react';
import { api } from '@/api/api';
import { UserDetailDto, UserRoleUpdateDto, UserUpdateDto } from '@/api/types';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Modal from '@/components/common/Modal';
import UserProgramAssignmentModal from './UserProgramAssignmentModal';

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string | null;
  onUserUpdated: () => void;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  isOpen,
  onClose,
  userId,
  onUserUpdated
}) => {
  const [user, setUser] = useState<UserDetailDto | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setSaving] = useState(false);
  
  // Available roles
  const [availableRoles, setAvailableRoles] = useState<string[]>([]);
  
  // Edit form data
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  
  // Role management
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  
  // Program assignment modal
  const [isProgramModalOpen, setIsProgramModalOpen] = useState(false);

  useEffect(() => {
    if (isOpen && userId) {
      loadUserDetails();
      loadAvailableRoles();
    }
  }, [isOpen, userId]);

  useEffect(() => {
    if (user) {
      setEditForm({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || ''
      });
      setSelectedRoles([...(user.roles || [])]);
    }
  }, [user]);

  const loadUserDetails = async () => {
    if (!userId) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await api.users.users_GetById(userId);
      
      if (response.success && response.data) {
        setUser(response.data as UserDetailDto);
      } else {
        setError(response.message || 'Failed to load user details');
      }
    } catch (error) {
      console.error('Failed to load user details:', error);
      setError('Failed to load user details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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


  const handleSaveProfile = async () => {
    if (!user) return;
    
    try {
      setSaving(true);
      setError(null);
      
      const updateDto = new UserUpdateDto({
        firstName: editForm.firstName,
        lastName: editForm.lastName,
        email: editForm.email
      });
      
      const response = await api.users.users_Update(user.id!, updateDto);
      
      if (response.success) {
        await loadUserDetails();
        setIsEditing(false);
        onUserUpdated();
      } else {
        setError(response.message || 'Failed to update user');
      }
    } catch (error) {
      console.error('Failed to update user:', error);
      setError('Failed to update user. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveRoles = async () => {
    if (!user) return;
    
    try {
      setSaving(true);
      setError(null);
      
      const roleUpdateDto = new UserRoleUpdateDto({
        roles: selectedRoles
      });
      
      const response = await api.users.users_UpdateRoles(user.id!, roleUpdateDto);
      
      if (response.success) {
        await loadUserDetails();
        onUserUpdated();
      } else {
        setError(response.message || 'Failed to update user roles');
      }
    } catch (error) {
      console.error('Failed to update user roles:', error);
      setError('Failed to update user roles. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleActivateUser = async () => {
    if (!user) return;
    
    try {
      setSaving(true);
      setError(null);
      
      const response = user.isActive 
        ? await api.users.users_Deactivate(user.id!)
        : await api.users.users_Activate(user.id!);
      
      if (response.success) {
        await loadUserDetails();
        onUserUpdated();
      } else {
        setError(response.message || 'Failed to update user status');
      }
    } catch (error) {
      console.error('Failed to update user status:', error);
      setError('Failed to update user status. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleRevokeTokens = async () => {
    if (!user) return;
    
    try {
      setSaving(true);
      setError(null);
      
      const response = await api.users.users_RevokeAllTokens(user.id!);
      
      if (response.success) {
        // Show success message or notification
        console.log('All tokens revoked successfully');
      } else {
        setError(response.message || 'Failed to revoke tokens');
      }
    } catch (error) {
      console.error('Failed to revoke tokens:', error);
      setError('Failed to revoke tokens. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (date?: Date): string => {
    if (!date) return 'Never';
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  const getRoleColor = (role: string): string => {
    const roleLower = role.toLowerCase();
    if (roleLower === 'admin') {
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
    }
    if (roleLower === 'user') {
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    }
    if (roleLower === 'manager') {
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
    }
    return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="User Details"
      size="xl"
    >
      <div className="space-y-6">
        {error && (
          <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
              </div>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        ) : user ? (
          <>
            {/* Enhanced User Header */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 -m-6 p-6 mb-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                      <span className="text-2xl font-medium text-white">
                        {user.fullName?.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </span>
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white dark:border-gray-800 ${
                      user.isActive ? 'bg-green-400' : 'bg-red-400'
                    }`}></div>
                  </div>
                  <div>
                    <div className="flex items-center space-x-3">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {user.fullName}
                      </h3>
                      {user.roles?.includes('admin') && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          Administrator
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      @{user.username}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {user.email}
                    </p>
                    <div className="mt-2 flex items-center space-x-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.isActive 
                          ? 'text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/30'
                          : 'text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          user.isActive ? 'bg-green-400' : 'bg-red-400'
                        }`}></div>
                        {user.isActive ? 'Active Account' : 'Inactive Account'}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Member since {formatDate(user.createdDate)}
                      </span>
                    </div>
                  </div>
                </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  disabled={isSaving}
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </Button>
                <Button
                  variant={user.isActive ? "ghost" : "outline"}
                  size="sm"
                  onClick={handleActivateUser}
                  disabled={isSaving}
                >
                  {user.isActive ? 'Deactivate' : 'Activate'}
                </Button>
              </div>
            </div>

            {/* Enhanced User Information */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Basic Information */}
              <div className="space-y-4 bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <h4 className="text-md font-medium text-gray-900 dark:text-white">
                    Basic Information
                  </h4>
                </div>
                
                {isEditing ? (
                  <div className="space-y-4">
                    <Input
                      label="First Name"
                      value={editForm.firstName}
                      onChange={(e) => setEditForm(prev => ({ ...prev, firstName: e.target.value }))}
                    />
                    <Input
                      label="Last Name"
                      value={editForm.lastName}
                      onChange={(e) => setEditForm(prev => ({ ...prev, lastName: e.target.value }))}
                    />
                    <Input
                      label="Email"
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                    />
                    <div className="flex space-x-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={handleSaveProfile}
                        disabled={isSaving}
                      >
                        Save Changes
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(false)}
                        disabled={isSaving}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</dt>
                      <dd className="text-sm text-gray-900 dark:text-white">{user.email}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Username</dt>
                      <dd className="text-sm text-gray-900 dark:text-white">{user.username}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">First Name</dt>
                      <dd className="text-sm text-gray-900 dark:text-white">{user.firstName || 'Not set'}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Name</dt>
                      <dd className="text-sm text-gray-900 dark:text-white">{user.lastName || 'Not set'}</dd>
                    </div>
                  </div>
                )}
              </div>

              {/* Activity Information */}
              <div className="space-y-4 bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h4 className="text-md font-medium text-gray-900 dark:text-white">
                    Activity Information
                  </h4>
                </div>
                <div className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Created Date</dt>
                    <dd className="text-sm text-gray-900 dark:text-white">{formatDate(user.createdDate)}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Login</dt>
                    <dd className="text-sm text-gray-900 dark:text-white">{formatDate(user.lastLoginDate)}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Modified</dt>
                    <dd className="text-sm text-gray-900 dark:text-white">{formatDate(user.modifiedDate)}</dd>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Security Section */}
            <div className="space-y-4 bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <h4 className="text-md font-medium text-gray-900 dark:text-white">
                  Roles & Permissions
                </h4>
              </div>
              
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {user.roles?.map(role => (
                    <span
                      key={role}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(role)}`}
                    >
                      {role}
                    </span>
                  ))}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Update Roles
                  </label>
                  <div className="space-y-2">
                    {availableRoles.map(role => (
                      <label key={role} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedRoles.includes(role)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedRoles(prev => [...prev, role]);
                            } else {
                              setSelectedRoles(prev => prev.filter(r => r !== role));
                            }
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-900 dark:text-white">{role}</span>
                      </label>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSaveRoles}
                    disabled={isSaving}
                    className="mt-2"
                  >
                    Update Roles
                  </Button>
                </div>
              </div>
            </div>

            </div>

            {/* Enhanced Additional Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Permissions */}
              {user.permissions && user.permissions.length > 0 && (
                <div className="space-y-4 bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                    <h4 className="text-md font-medium text-gray-900 dark:text-white">
                      Direct Permissions
                    </h4>
                  </div>
                  <div className="max-h-32 overflow-y-auto">
                    <div className="grid grid-cols-1 gap-2">
                      {user.permissions.map(permission => (
                        <span
                          key={permission}
                          className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400"
                        >
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {permission}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Client Assignments */}
              {user.assignedClients && user.assignedClients.length > 0 && (
                <div className="space-y-4 bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <h4 className="text-md font-medium text-gray-900 dark:text-white">
                      Assigned Clients
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {user.assignedClients.map(client => (
                      <div key={client.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-600 rounded-md border border-gray-200 dark:border-gray-600">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{client.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Program Assignments */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <h4 className="text-md font-medium text-gray-900 dark:text-white">
                      Program Access Management
                    </h4>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setIsProgramModalOpen(true)}
                    disabled={isSaving}
                    leftIcon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    }
                  >
                    Manage Programs
                  </Button>
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Configure which programs this user has access to and set their permission levels for each program.
                </p>
              </div>
            </div>

            {/* Enhanced Security Actions */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-4">
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <h4 className="text-md font-medium text-gray-900 dark:text-white">
                    Security Actions
                  </h4>
                </div>
                <p className="text-sm text-red-700 dark:text-red-300 mb-4">
                  These actions will immediately affect the user's access and sessions.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={handleRevokeTokens}
                    disabled={isSaving}
                    leftIcon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    }
                  >
                    Revoke All Sessions
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => console.log('Reset password functionality')}
                    disabled={isSaving}
                    leftIcon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                      </svg>
                    }
                  >
                    Force Password Reset
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">User not found</p>
          </div>
        )}
      </div>

      {/* User Program Assignment Modal */}
      <UserProgramAssignmentModal
        isOpen={isProgramModalOpen}
        onClose={() => setIsProgramModalOpen(false)}
        userId={userId}
        userName={user?.fullName}
        onPermissionsUpdated={() => {
          loadUserDetails();
          onUserUpdated();
        }}
      />
    </Modal>
  );
};

export default UserDetailsModal;