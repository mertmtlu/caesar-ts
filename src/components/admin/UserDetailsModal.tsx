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
      size="lg"
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
            {/* User Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                  <span className="text-xl font-medium text-gray-700 dark:text-gray-300">
                    {user.fullName?.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {user.fullName}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    @{user.username}
                  </p>
                  <div className="mt-1 flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.isActive 
                        ? 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30'
                        : 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30'
                    }`}>
                      {user.isActive ? 'Active' : 'Inactive'}
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

            {/* User Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h4 className="text-md font-medium text-gray-900 dark:text-white">
                  Basic Information
                </h4>
                
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
              <div className="space-y-4">
                <h4 className="text-md font-medium text-gray-900 dark:text-white">
                  Activity Information
                </h4>
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

            {/* Roles Management */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-md font-medium text-gray-900 dark:text-white">
                  Roles
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

            {/* Permissions */}
            {user.permissions && user.permissions.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-md font-medium text-gray-900 dark:text-white">
                  Direct Permissions
                </h4>
                <div className="max-h-32 overflow-y-auto">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {user.permissions.map(permission => (
                      <span
                        key={permission}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      >
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Client Assignments */}
            {user.assignedClients && user.assignedClients.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-md font-medium text-gray-900 dark:text-white">
                  Assigned Clients
                </h4>
                <div className="space-y-2">
                  {user.assignedClients.map(client => (
                    <div key={client.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                      <span className="text-sm text-gray-900 dark:text-white">{client.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Program Assignments */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-md font-medium text-gray-900 dark:text-white">
                  Program Access
                </h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsProgramModalOpen(true)}
                  disabled={isSaving}
                >
                  Manage Programs
                </Button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Manage which programs this user has access to and their permission levels.
              </p>
            </div>

            {/* Security Actions */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
                Security Actions
              </h4>
              <div className="flex space-x-3">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleRevokeTokens}
                  disabled={isSaving}
                >
                  Revoke All Tokens
                </Button>
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