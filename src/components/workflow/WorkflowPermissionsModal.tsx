import React, { useState, useEffect, useMemo } from 'react';
import { api } from '@/api/api';
import { WorkflowPermissionDto, WorkflowPermissionUpdateDto, UserListDto } from '@/api/types';
import { WorkflowPermissionType } from '@/api/enums';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

interface WorkflowPermissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  workflowId: string;
  workflowName: string;
  onPermissionsUpdated?: (permissions: WorkflowPermissionDto) => void;
}

interface PermissionLevel {
  type: WorkflowPermissionType;
  name: string;
  description: string;
  color: string;
  icon: string;
}

const PERMISSION_LEVELS: PermissionLevel[] = [
  {
    type: WorkflowPermissionType._0,
    name: 'View',
    description: 'Can view workflow details and execution history',
    color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    icon: '👁️'
  },
  {
    type: WorkflowPermissionType._1,
    name: 'Edit',
    description: 'Can modify workflow design and settings',
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    icon: '✏️'
  },
  {
    type: WorkflowPermissionType._2,
    name: 'Execute',
    description: 'Can run workflow executions',
    color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    icon: '▶️'
  },
  {
    type: WorkflowPermissionType._3,
    name: 'Admin',
    description: 'Full access including permissions management',
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    icon: '👑'
  }
];

const WorkflowPermissionsModal: React.FC<WorkflowPermissionsModalProps> = ({
  isOpen,
  onClose,
  workflowId,
  workflowName,
  onPermissionsUpdated,
}) => {
  const [permissions, setPermissions] = useState<WorkflowPermissionDto | null>(null);
  const [users, setUsers] = useState<UserListDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [isPublic, setIsPublic] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [selectedPermissionLevel, setSelectedPermissionLevel] = useState<WorkflowPermissionType>(WorkflowPermissionType._0);
  const [activeTab, setActiveTab] = useState<'current' | 'add'>('current');

  // Load permissions and users when modal opens
  useEffect(() => {
    if (isOpen) {
      loadPermissions();
      loadUsers();
    }
  }, [isOpen, workflowId]);

  // Update form state when permissions are loaded
  useEffect(() => {
    if (permissions) {
      setIsPublic(permissions.isPublic || false);
    }
  }, [permissions]);

  const loadPermissions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await api.workflows.workflows_GetPermissions(workflowId);
      if (response.success && response.data) {
        setPermissions(WorkflowPermissionDto.fromJS(response.data));
      } else {
        setError(response.message || 'Failed to load workflow permissions');
      }
    } catch (error) {
      console.error('Failed to load workflow permissions:', error);
      setError('Failed to load workflow permissions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      const response = await api.users.users_GetAll(1, 100, 'name', 0);
      if (response.success && response.data?.items) {
        setUsers(response.data.items.map(user => UserListDto.fromJS(user)));
      }
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  };

  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users;
    return users.filter(user => 
      user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const availableUsers = useMemo(() => {
    const currentUserIds = new Set(permissions?.permissions?.map(p => p.userId) || []);
    return filteredUsers.filter(user => !currentUserIds.has(user.id || ''));
  }, [filteredUsers, permissions]);

  const getPermissionLabel = (permissionType: WorkflowPermissionType): string => {
    const level = PERMISSION_LEVELS.find(l => l.type === permissionType);
    return level?.name || 'Unknown';
  };

  const getPermissionIcon = (permissionType: WorkflowPermissionType): string => {
    const level = PERMISSION_LEVELS.find(l => l.type === permissionType);
    return level?.icon || '❓';
  };

  const handleSavePermissions = async () => {
    try {
      setIsSaving(true);
      setError(null);

      const updateDto = new WorkflowPermissionUpdateDto({
        isPublic,
        permissions: permissions?.permissions || [],
      });

      const response = await api.workflows.workflows_UpdatePermissions(workflowId, updateDto);
      if (response.success && response.data) {
        const updatedPermissions = WorkflowPermissionDto.fromJS(response.data);
        setPermissions(updatedPermissions);
        if (onPermissionsUpdated) {
          onPermissionsUpdated(updatedPermissions);
        }
        onClose();
      } else {
        setError(response.message || 'Failed to update workflow permissions');
      }
    } catch (error) {
      console.error('Failed to update workflow permissions:', error);
      setError('Failed to update workflow permissions. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddUsers = () => {
    if (selectedUsers.size === 0) return;

    const newPermissions = Array.from(selectedUsers).map(userId => ({
      userId,
      permissions: [selectedPermissionLevel],
    }));

    const updatedPermissions = [...(permissions?.permissions || []), ...newPermissions];
    
    setPermissions(prev => prev ? 
      new WorkflowPermissionDto({
        ...prev,
        permissions: updatedPermissions
      }) : 
      new WorkflowPermissionDto({
        isPublic,
        permissions: updatedPermissions
      })
    );

    setSelectedUsers(new Set());
    setActiveTab('current');
  };

  const handleUpdateUserPermission = (userId: string, newPermissions: WorkflowPermissionType[]) => {
    setPermissions(prev => prev ? 
      new WorkflowPermissionDto({
        ...prev,
        permissions: prev.permissions?.map(p => 
          p.userId === userId ? { ...p, permissions: newPermissions } : p
        ) || []
      }) : null);
  };

  const handleRemoveUser = (userId: string) => {
    setPermissions(prev => prev ? 
      new WorkflowPermissionDto({
        ...prev,
        permissions: prev.permissions?.filter(p => p.userId !== userId) || []
      }) : null);
  };

  const getUserName = (userId: string): string => {
    const user = users.find(u => u.id === userId);
    return user?.fullName || user?.username || user?.email || 'Unknown User';
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Manage Permissions - ${workflowName}`}
      size="lg"
      footer={
        <div className="flex items-center justify-between w-full">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSavePermissions}
            disabled={isSaving}
            loading={isSaving}
          >
            Save Changes
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Error Message */}
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

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Content */}
        {!isLoading && permissions && (
          <>
            {/* Public Access Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Public Access</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Allow anyone in your organization to view this workflow
                  </div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('current')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'current'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  Current Access ({permissions.permissions?.length || 0})
                </button>
                <button
                  onClick={() => setActiveTab('add')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'add'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  Add Users
                </button>
              </nav>
            </div>

            {/* Current Permissions */}
            {activeTab === 'current' && (
              <div className="space-y-4">
                {permissions.permissions && permissions.permissions.length > 0 ? (
                  permissions.permissions.map((userPerm, index) => {
                    const userName = getUserName(userPerm.userId!);
                    const userPermissions = userPerm.permissions || [];
                    
                    return (
                      <div key={`${userPerm.userId}-${index}`} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                {userName.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{userName}</div>
                            <div className="flex items-center space-x-2 mt-1">
                              {userPermissions.map((perm, i) => (
                                <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                                  {getPermissionIcon(perm)} {getPermissionLabel(perm)}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <select
                            value={userPermissions[0] || WorkflowPermissionType._0}
                            onChange={(e) => handleUpdateUserPermission(userPerm.userId!, [parseInt(e.target.value) as WorkflowPermissionType])}
                            className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                          >
                            {PERMISSION_LEVELS.map(level => (
                              <option key={level.type} value={level.type}>
                                {level.icon} {level.name}
                              </option>
                            ))}
                          </select>
                          
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleRemoveUser(userPerm.userId!)}
                            title="Remove user access"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </Button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No users with access</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Add users to grant them access to this workflow.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Add Users */}
            {activeTab === 'add' && (
              <div className="space-y-6">
                {/* Permission Level Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Permission Level
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {PERMISSION_LEVELS.map(level => (
                      <label key={level.type} className="relative">
                        <input
                          type="radio"
                          name="permissionLevel"
                          value={level.type}
                          checked={selectedPermissionLevel === level.type}
                          onChange={(e) => setSelectedPermissionLevel(parseInt(e.target.value) as WorkflowPermissionType)}
                          className="sr-only peer"
                        />
                        <div className="p-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-900/20 hover:border-gray-300 dark:hover:border-gray-600">
                          <div className="flex items-center space-x-3">
                            <span className="text-lg">{level.icon}</span>
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">{level.name}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">{level.description}</div>
                            </div>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* User Search */}
                <div>
                  <Input
                    label="Search Users"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    leftIcon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    }
                  />
                </div>

                {/* User List */}
                <div className="max-h-64 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg">
                  {availableUsers.length > 0 ? (
                    availableUsers.map(user => (
                      <label key={user.id} className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                        <input
                          type="checkbox"
                          checked={selectedUsers.has(user.id || '')}
                          onChange={(e) => {
                            const newSelected = new Set(selectedUsers);
                            if (e.target.checked) {
                              newSelected.add(user.id || '');
                            } else {
                              newSelected.delete(user.id || '');
                            }
                            setSelectedUsers(newSelected);
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <div className="ml-3 flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                {(user.fullName || user.username || user.email || '?').charAt(0).toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{user.fullName || user.username}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                          </div>
                        </div>
                      </label>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No users found</h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {searchTerm ? 'Try adjusting your search criteria.' : 'All users already have access to this workflow.'}
                      </p>
                    </div>
                  )}
                </div>

                {/* Add Users Button */}
                {selectedUsers.size > 0 && (
                  <div className="flex justify-end">
                    <Button
                      variant="primary"
                      onClick={handleAddUsers}
                      leftIcon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      }
                    >
                      Add {selectedUsers.size} User{selectedUsers.size !== 1 ? 's' : ''}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </Modal>
  );
};

export default WorkflowPermissionsModal;