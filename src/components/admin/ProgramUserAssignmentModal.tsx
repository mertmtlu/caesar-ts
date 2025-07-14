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
    return users.filter(user => 
      user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getUserCurrentPermission = (userId: string) => {
    return currentPermissions.find(p => p.type === 'User' && p.id === userId);
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
  const userPermissions = currentPermissions.filter(p => p.type === 'User');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Manage User Access - ${program?.name || 'Program'}`}
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Permissions */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Current User Permissions ({userPermissions.length})
            </h3>
            
            <div className="max-h-96 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg">
              {userPermissions.length === 0 ? (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No users assigned to this program
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {userPermissions.map((permission) => (
                    <div key={permission.id} className="p-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {permission.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          ID: {permission.id}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <select
                          value={permission.accessLevel}
                          onChange={(e) => handleUpdatePermission(permission.id!, e.target.value)}
                          disabled={isSaving}
                          className="text-xs border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Add Users */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Add Users to Program
            </h3>

            {/* Access Level Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Permission Level
              </label>
              <select
                value={selectedAccessLevel}
                onChange={(e) => setSelectedAccessLevel(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {accessLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            {/* User Search */}
            <Input
              label="Search Users"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search by name, email, or username..."
            />

            {/* Bulk Selection Controls */}
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSelectAll}
                disabled={filteredUsers.length === 0}
              >
                {filteredUsers.length > 0 && filteredUsers.every(user => selectedUsers.has(user.id!)) 
                  ? 'Deselect All' 
                  : 'Select All'
                }
              </Button>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {selectedUsers.size} selected
              </span>
            </div>

            {/* User List */}
            <div className="max-h-64 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg">
              {isLoading ? (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  Loading users...
                </div>
              ) : filteredUsers.length === 0 ? (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No users found
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredUsers.map((user) => {
                    const hasPermission = getUserCurrentPermission(user.id!);
                    return (
                      <div key={user.id} className="p-3">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedUsers.has(user.id!)}
                            onChange={(e) => handleUserSelection(user.id!, e.target.checked)}
                            disabled={!!hasPermission}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <div className="ml-3 flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {user.fullName}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {user.email} • @{user.username}
                                </p>
                              </div>
                              {hasPermission && (
                                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded">
                                  Already has {hasPermission.accessLevel} access
                                </span>
                              )}
                            </div>
                          </div>
                        </label>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button
                variant="primary"
                onClick={handleAssignUsers}
                disabled={selectedUsers.size === 0 || isSaving}
              >
                Assign {selectedUsers.size} User{selectedUsers.size !== 1 ? 's' : ''}
              </Button>
              <Button
                variant="outline"
                onClick={onClose}
                disabled={isSaving}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProgramUserAssignmentModal;