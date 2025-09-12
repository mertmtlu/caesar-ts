import React, { useState, useEffect } from 'react';
import { api } from '@/api/api';
import { ProgramUserPermissionDto, ProgramDto, UserListDto, UserSearchDto } from '@/api/types';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Modal from '@/components/common/Modal';

interface ProgramUserAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  programId: string | null;
  onPermissionsUpdated: () => void;
}

const ProgramUserAssignmentModal: React.FC<ProgramUserAssignmentModalProps> = ({
  isOpen,
  onClose,
  programId,
  onPermissionsUpdated
}) => {
  const [program, setProgram] = useState<ProgramDto | null>(null);
  const [users, setUsers] = useState<UserListDto[]>([]);
  const [currentPermissions, setCurrentPermissions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [selectedAccessLevel, setSelectedAccessLevel] = useState<string>('Read');

  const accessLevels = ['Read', 'Write', 'Execute', 'Admin'];

  useEffect(() => {
    if (isOpen && programId) {
      loadProgramData();
      loadUsers();
      loadCurrentPermissions();
    }
  }, [isOpen, programId]);

  const loadProgramData = async () => {
    if (!programId) return;
    
    try {
      const response = await api.programs.programs_GetById(programId);
      if (response.success && response.data) {
        setProgram(response.data as ProgramDto);
      }
    } catch (error) {
      console.error('Failed to load program:', error);
    }
  };

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const searchDto = new UserSearchDto({
        email: searchTerm,
        username: searchTerm,
        firstName: searchTerm,
        lastName: searchTerm
      });
      const response = await api.users.users_Search(1, 100, 'CreatedDate', undefined, searchDto);
      if (response.success && response.data) {
        setUsers((response.data.items || []).map(item => UserListDto.fromJS(item)));
      }
    } catch (error) {
      console.error('Failed to load users:', error);
      setError('Failed to load users. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadCurrentPermissions = async () => {
    if (!programId) return;
    
    try {
      const response = await api.programs.programs_GetProgramPermissions(programId);
      if (response.success && response.data) {
        setCurrentPermissions(response.data);
      }
    } catch (error) {
      console.error('Failed to load permissions:', error);
    }
  };

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadUsers();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleUserSelection = (userId: string, checked: boolean) => {
    const newSelection = new Set(selectedUsers);
    if (checked) {
      newSelection.add(userId);
    } else {
      newSelection.delete(userId);
    }
    setSelectedUsers(newSelection);
  };

  const handleSelectAll = () => {
    const filteredUsers = getFilteredUsers();
    const allSelected = filteredUsers.every(user => selectedUsers.has(user.id!));
    
    if (allSelected) {
      setSelectedUsers(new Set());
    } else {
      const newSelection = new Set(selectedUsers);
      filteredUsers.forEach(user => newSelection.add(user.id!));
      setSelectedUsers(newSelection);
    }
  };

  const getFilteredUsers = () => {
    return users.filter(user => {
    
      // Apply search filter
      const matchesSearch = user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username?.toLowerCase().includes(searchTerm.toLowerCase());

      // Filter out users who already have permissions
      const hasPermission = currentPermissions.some(p => p.type.toLowerCase() === 'user' && p.id === user.id);

      return matchesSearch && !hasPermission;
    });
  };

  const handleAssignUsers = async () => {
    if (!programId || selectedUsers.size === 0) return;

    try {
      setSaving(true);
      setError(null);

      const promises = Array.from(selectedUsers).map(userId => {
        const permissionDto = new ProgramUserPermissionDto({
          userId,
          accessLevel: selectedAccessLevel
        });
        return api.programs.programs_AddUserPermission(programId, permissionDto);
      });

      const results = await Promise.all(promises);
      const failed = results.filter(r => !r.success);

      if (failed.length > 0) {
        setError(`Failed to assign ${failed.length} users. Please try again.`);
      } else {
        setSelectedUsers(new Set());
        await loadCurrentPermissions();
        onPermissionsUpdated();
      }
    } catch (error) {
      console.error('Failed to assign users:', error);
      setError('Failed to assign users. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleRemovePermission = async (userId: string) => {
    if (!programId) return;

    try {
      setSaving(true);
      setError(null);

      const response = await api.programs.programs_RemoveUserPermission(programId, userId);
      
      if (response.success) {
        await loadCurrentPermissions();
        onPermissionsUpdated();
      } else {
        setError(response.message || 'Failed to remove user permission');
      }
    } catch (error) {
      console.error('Failed to remove permission:', error);
      setError('Failed to remove user permission. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdatePermission = async (userId: string, newAccessLevel: string) => {
    if (!programId) return;

    try {
      setSaving(true);
      setError(null);

      const permissionDto = new ProgramUserPermissionDto({
        userId,
        accessLevel: newAccessLevel
      });

      const response = await api.programs.programs_UpdateUserPermission(programId, userId, permissionDto);
      
      if (response.success) {
        await loadCurrentPermissions();
        onPermissionsUpdated();
      } else {
        setError(response.message || 'Failed to update user permission');
      }
    } catch (error) {
      console.error('Failed to update permission:', error);
      setError('Failed to update user permission. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  const filteredUsers = getFilteredUsers();
  const userPermissions = currentPermissions.filter(p => p.type.toLowerCase() === 'user');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Program Access Management"
      size="xl"
    >
      <div className="space-y-6">
        {/* Program Header */}
        {program && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{program.name}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">{program.description || 'No description available'}</p>
                <div className="flex items-center space-x-4 mt-1">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Status: {program.status}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Version: {program.currentVersion || 'No version'}</span>
                </div>
              </div>
            </div>
          </div>
        )}
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

        <div className="grid grid-cols-1 gap-6">
          {/* Current Permissions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Current User Permissions
                </h3>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                {userPermissions.length} users
              </span>
            </div>
            
            <div className="max-h-80 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg">
              {userPermissions.length === 0 ? (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No users assigned to this program
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {userPermissions.map((permission) => (
                    <div key={permission.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {permission.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            User ID: {permission.id}
                          </p>
                        </div>
                        <div className="flex items-center space-x-3 ml-4">
                          <select
                            value={permission.accessLevel}
                            onChange={(e) => handleUpdatePermission(permission.id!, e.target.value)}
                            disabled={isSaving}
                            className="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            {accessLevels.map(level => (
                              <option key={level} value={level}>{level}</option>
                            ))}
                          </select>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleRemovePermission(permission.id!)}
                            disabled={isSaving}
                            className="whitespace-nowrap"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Add Users */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Add Users to Program
              </h3>
            </div>

            {/* Enhanced Access Level Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Default Permission Level
              </label>
              <div className="grid grid-cols-2 gap-3">
                {accessLevels.map(level => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setSelectedAccessLevel(level)}
                    className={`p-4 rounded-lg border-2 transition-all hover:shadow-sm ${
                      selectedAccessLevel === level
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 shadow-sm'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-sm font-semibold">{level}</div>
                      <div className="text-xs mt-1 opacity-75 leading-relaxed">
                        {level === 'Read' && 'View only'}
                        {level === 'Write' && 'Edit content'}
                        {level === 'Execute' && 'Run programs'}
                        {level === 'Admin' && 'Full control'}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* User Search */}
            <Input
              label="Search Users"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search by name, email, or username..."
            />

            {/* Enhanced Bulk Selection Controls */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex items-center space-x-4">
                  <Button
                    variant={filteredUsers.length > 0 && filteredUsers.every(user => selectedUsers.has(user.id!)) ? "primary" : "outline"}
                    size="sm"
                    onClick={handleSelectAll}
                    disabled={filteredUsers.length === 0}
                    leftIcon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    }
                  >
                    {filteredUsers.length > 0 && filteredUsers.every(user => selectedUsers.has(user.id!)) 
                      ? 'Deselect All' 
                      : 'Select All'
                    }
                  </Button>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                    <span>{filteredUsers.length} users available</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${
                      selectedUsers.size > 0 ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                    }`}></div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {selectedUsers.size} selected
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* User List */}
            <div className="max-h-72 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg">
              {isLoading ? (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  Loading users...
                </div>
              ) : filteredUsers.length === 0 ? (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No users found
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredUsers.map((user) => {
                    const isSelected = selectedUsers.has(user.id!);
                    
                    return (
                      <div 
                        key={user.id} 
                        className={`relative rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                          isSelected 
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-sm' 
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                        }`}
                        onClick={() => handleUserSelection(user.id!, !isSelected)}
                      >
                        <div className="p-4">
                          <div className="flex items-center space-x-3">
                            {/* User Avatar */}
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                              isSelected 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                            }`}>
                              {isSelected ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              ) : (
                                user.fullName?.charAt(0)?.toUpperCase() || user.username?.charAt(0)?.toUpperCase() || '?'
                              )}
                            </div>
                            
                            {/* User Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <div className="min-w-0 flex-1">
                                  <p className={`text-sm font-medium truncate ${
                                    isSelected 
                                      ? 'text-blue-900 dark:text-blue-100' 
                                      : 'text-gray-900 dark:text-white'
                                  }`}>
                                    {user.fullName}
                                  </p>
                                  <p className={`text-xs truncate ${
                                    isSelected 
                                      ? 'text-blue-700 dark:text-blue-300' 
                                      : 'text-gray-500 dark:text-gray-400'
                                  }`}>
                                    {user.email}
                                  </p>
                                  <p className={`text-xs ${
                                    isSelected 
                                      ? 'text-blue-600 dark:text-blue-400' 
                                      : 'text-gray-400 dark:text-gray-500'
                                  }`}>
                                    @{user.username}
                                  </p>
                                </div>
                                
                                {/* Status Badge */}
                                <div className="ml-3 flex items-center space-x-2">
                                  {isSelected && (
                                    <span className="text-xs px-2.5 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-full font-medium">
                                      Selected
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Selection Indicator */}
                        {isSelected && (
                          <div className="absolute top-2 right-2">
                            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Enhanced Action Buttons */}
            <div className="bg-gray-50 dark:bg-gray-700/30 p-5 rounded-lg">
              <div className="flex flex-col lg:flex-row gap-4">
                <Button
                  variant="primary"
                  onClick={handleAssignUsers}
                  disabled={selectedUsers.size === 0 || isSaving}
                  loading={isSaving}
                  leftIcon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  }
                  className="flex-1 lg:flex-initial lg:min-w-0"
                >
                  {isSaving 
                    ? 'Assigning...' 
                    : selectedUsers.size > 0
                      ? `Assign ${selectedUsers.size} User${selectedUsers.size !== 1 ? 's' : ''} (${selectedAccessLevel})`
                      : 'Select users to assign'
                  }
                </Button>
                <Button
                  variant="outline"
                  onClick={onClose}
                  disabled={isSaving}
                  className="flex-1 lg:flex-initial"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProgramUserAssignmentModal;