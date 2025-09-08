import React, { useState, useEffect } from 'react';
import { api } from '@/api/api';
import { GroupMemberDto, UserListDto } from '@/api';
import { SortDirection } from '@/api/enums';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';

interface GroupMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: string;
  groupName: string;
}

const GroupMemberModal: React.FC<GroupMemberModalProps> = ({ 
  isOpen, 
  onClose, 
  groupId, 
  groupName 
}) => {
  const [members, setMembers] = useState<GroupMemberDto[]>([]);
  const [allUsers, setAllUsers] = useState<UserListDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddUsers, setShowAddUsers] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (isOpen && groupId) {
      loadMembers();
    }
  }, [isOpen, groupId]);

  useEffect(() => {
    if (showAddUsers) {
      loadAvailableUsers();
    }
  }, [showAddUsers]);

  const loadMembers = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await api.groupsClient.groups_GetMembers(groupId);
      setMembers((response || []).map(member => new GroupMemberDto(member)));
    } catch (error: any) {
      setError(error?.message || 'Failed to load group members');
    } finally {
      setIsLoading(false);
    }
  };

  const loadAvailableUsers = async () => {
    setIsLoadingUsers(true);
    
    try {
      // Get all users (you might want to add pagination here for large user bases)
      const response = await api.users.users_GetAll(1, 100, 'Name', SortDirection._0);
      
      if (response.success && response.data) {
        const currentMemberIds = new Set(members.map(m => m.userId));
        const availableUsers = (response.data.items || []).filter(
          (user: any) => !currentMemberIds.has(user.id)
        );
        setAllUsers(availableUsers.map((user: any) => new UserListDto(user)));
      } else {
        setAllUsers([]);
      }
    } catch (error: any) {
      console.error('Failed to load users:', error);
      setAllUsers([]);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const handleRemoveMember = async (userId: string, userName: string) => {
    try {
      await api.groupsClient.groups_RemoveMember(groupId, userId);
      loadMembers(); // Refresh the list
    } catch (error: any) {
      alert(error?.message || 'Failed to remove member');
    }
  };

  const handleAddMembers = async () => {
    if (selectedUserIds.length === 0) return;
    
    setIsAdding(true);
    try {
      if (selectedUserIds.length === 1) {
        await api.groupsClient.groups_AddMember(groupId, selectedUserIds[0]);
      } else {
        await api.groupsClient.groups_AddMembers(groupId, selectedUserIds);
      }
      
      setSelectedUserIds([]);
      setShowAddUsers(false);
      loadMembers(); // Refresh the list
    } catch (error: any) {
      alert(error?.message || 'Failed to add members');
    } finally {
      setIsAdding(false);
    }
  };

  const filteredUsers = allUsers.filter(user =>
    user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Manage Group Members"
      size="lg"
    >
      <div className="space-y-6 overflow-visible">
        {/* Header Section with Group Info */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 -mx-6 -mt-4 px-6 pt-4 pb-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{groupName}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {showAddUsers ? 'Add new members to this group' : 'Manage current group members'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                Group
              </div>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4">
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

        {!showAddUsers ? (
          // Current Members Section
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Current Members
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {members.length} {members.length === 1 ? 'member' : 'members'} in this group
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => setShowAddUsers(true)}
                    size="sm"
                    leftIcon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    }
                  >
                    Add Members
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Loading members...</p>
                </div>
              ) : members.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
                    <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">No members yet</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">This group doesn't have any members. Add some to get started.</p>
                  <Button onClick={() => setShowAddUsers(true)} size="sm">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add First Member
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {members.map((member) => (
                    <div
                      key={member.userId}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                          <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {member.fullName || member.username}
                          </div>
                          {member.email && (
                            <div className="text-sm text-gray-500 dark:text-gray-400">{member.email}</div>
                          )}
                        </div>
                      </div>
                      <Button
                        onClick={() => handleRemoveMember(member.userId!, member.fullName || member.username || 'User')}
                        variant="outline"
                        size="sm"
                        className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          // Add Members Section
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-visible">
            <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Add Members
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Select users to add to this group
                    </p>
                  </div>
                </div>
                <Button 
                  variant="secondary" 
                  onClick={() => {
                    setShowAddUsers(false);
                    setSelectedUserIds([]);
                    setSearchTerm('');
                  }}
                  size="sm"
                >
                  Back to Members
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-4 relative">
              <div className="relative z-10">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Search Users
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search users by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {isLoadingUsers ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Loading users...</p>
                  </div>
                ) : filteredUsers.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
                      <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      {searchTerm ? 'No users found' : 'No available users'}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {searchTerm ? 'Try adjusting your search criteria' : 'All users are already members of this group'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredUsers.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <input
                          type="checkbox"
                          id={user.id}
                          checked={selectedUserIds.includes(user.id!)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedUserIds([...selectedUserIds, user.id!]);
                            } else {
                              setSelectedUserIds(selectedUserIds.filter(id => id !== user.id));
                            }
                          }}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-3 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label htmlFor={user.id} className="flex-1 cursor-pointer flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {user.fullName || user.username}
                            </div>
                            {user.email && (
                              <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                            )}
                            {user.role && (
                              <div className="text-xs text-gray-400 dark:text-gray-500">Role: {user.role}</div>
                            )}
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {selectedUserIds.length > 0 && (
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedUserIds.length} {selectedUserIds.length === 1 ? 'user' : 'users'} selected
                    </span>
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedUserIds([])}
                      size="sm"
                    >
                      Clear Selection
                    </Button>
                  </div>
                  <Button 
                    onClick={handleAddMembers}
                    disabled={isAdding}
                    leftIcon={isAdding ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    )}
                  >
                    {isAdding ? 'Adding...' : `Add ${selectedUserIds.length} Member${selectedUserIds.length !== 1 ? 's' : ''}`}
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Information Panel */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Group Membership</h3>
              <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Access:</strong> Group members inherit permissions assigned to this group</li>
                  <li><strong>Resources:</strong> Members can access projects, workflows, and applications shared with this group</li>
                  <li><strong>Management:</strong> Only administrators can add or remove group members</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Changes are saved automatically
          </div>
          <div className="flex space-x-3">
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default GroupMemberModal;