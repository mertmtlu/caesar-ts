import React, { useState, useEffect } from 'react';
import { api } from '@/api/api';
import { SortDirection } from '@/api/enums';
import { UserSearchDto } from '@/api/types';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { ConfirmationModal } from '@/components/common/Modal';
import UserDetailsModal from '@/components/admin/UserDetailsModal';
import CreateUserModal from '@/components/admin/CreateUserModal';

interface UserListItem {
  id: string;
  email: string;
  username: string;
  fullName: string;
  roles: string[];
  isActive: boolean;
  lastLoginDate?: Date;
  createdDate?: Date;
}

interface UserToDelete {
  id: string;
  fullName: string;
}

interface SortOption {
  label: string;
  field: string;
  direction: SortDirection;
}

const SORT_OPTIONS: SortOption[] = [
  { label: 'Name A-Z', field: 'FullName', direction: SortDirection._0 },
  { label: 'Name Z-A', field: 'FullName', direction: SortDirection._1 },
  { label: 'Email A-Z', field: 'Email', direction: SortDirection._0 },
  { label: 'Email Z-A', field: 'Email', direction: SortDirection._1 },
  { label: 'Recently Created', field: 'CreatedDate', direction: SortDirection._1 },
  { label: 'Oldest First', field: 'CreatedDate', direction: SortDirection._0 },
  { label: 'Recently Active', field: 'LastLoginDate', direction: SortDirection._1 },
];

const UsersPage: React.FC = () => {
  // State management
  const [users, setUsers] = useState<UserListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  
  // Filtering and search
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortField, setSortField] = useState('Name');
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection._0);
  
  // Available roles
  const [availableRoles, setAvailableRoles] = useState<string[]>([]);
  
  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserToDelete | null>(null);
  
  // Selected users for bulk actions
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  
  // Modals
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  // Load users
  useEffect(() => {
    loadUsers();
  }, [currentPage, pageSize, sortField, sortDirection, roleFilter, statusFilter]);

  // Load users with search when search term changes
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchTerm) {
        searchUsers();
      } else {
        loadUsers();
      }
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm]);

  // Load available roles
  useEffect(() => {
    loadAvailableRoles();
  }, []);

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

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await api.users.users_GetAll(
        currentPage,
        pageSize,
        sortField,
        sortDirection
      );

      if (response.success && response.data) {
        const userItems: UserListItem[] = response.data.items?.map(user => ({
          id: user.id || '',
          email: user.email || '',
          username: user.username || '',
          fullName: user.fullName || 'Unknown User',
          roles: user.roles || [],
          isActive: user.isActive || false,
          lastLoginDate: user.lastLoginDate,
          createdDate: new Date()
        })) || [];

        setUsers(userItems);
        setTotalCount(response.data.totalCount || 0);
        setTotalPages(response.data.totalPages || 0);
      } else {
        setError(response.message || 'Failed to load users');
      }
    } catch (error) {
      console.error('Failed to load users:', error);
      setError('Failed to load users. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const searchUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const searchDto = new UserSearchDto({
        email: searchTerm.includes('@') ? searchTerm : undefined,
        username: !searchTerm.includes('@') ? searchTerm : undefined,
        firstName: searchTerm,
        lastName: searchTerm,
        roles: roleFilter ? [roleFilter] : undefined,
        isActive: statusFilter ? statusFilter === 'active' : undefined
      });

      const response = await api.users.users_Search(
        currentPage,
        pageSize,
        sortField,
        sortDirection,
        searchDto
      );

      if (response.success && response.data) {
        const userItems: UserListItem[] = response.data.items?.map(user => ({
          id: user.id || '',
          email: user.email || '',
          username: user.username || '',
          fullName: user.fullName || 'Unknown User',
          roles: user.roles || [],
          isActive: user.isActive || false,
          lastLoginDate: user.lastLoginDate,
          createdDate: new Date()
        })) || [];

        setUsers(userItems);
        setTotalCount(response.data.totalCount || 0);
        setTotalPages(response.data.totalPages || 0);
      }
    } catch (error) {
      console.error('Failed to search users:', error);
      setError('Failed to search users. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = (userId: string, userFullName: string) => {
    setUserToDelete({ id: userId, fullName: userFullName });
    setShowDeleteModal(true);
  };

  const confirmDeleteUser = async () => {
    if (!userToDelete) return;
    
    try {
      setIsDeleting(true);
      const response = await api.users.users_Delete(userToDelete.id);
      
      if (response.success) {
        setUsers(prev => prev.filter(u => u.id !== userToDelete.id));
        setTotalCount(prev => prev - 1);
        setShowDeleteModal(false);
        setUserToDelete(null);
        
        if (users.length === 1 && currentPage > 1) {
          setCurrentPage(prev => prev - 1);
        } else {
          loadUsers();
        }
      } else {
        setError(response.message || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Failed to delete user:', error);
      setError('Failed to delete user. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUserToggleActive = async (userId: string, isActive: boolean) => {
    try {
      const response = isActive 
        ? await api.users.users_Deactivate(userId)
        : await api.users.users_Activate(userId);
      
      if (response.success) {
        setUsers(prev => prev.map(user => 
          user.id === userId ? { ...user, isActive: !isActive } : user
        ));
      } else {
        setError(response.message || 'Failed to update user status');
      }
    } catch (error) {
      console.error('Failed to update user status:', error);
      setError('Failed to update user status. Please try again.');
    }
  };

  const handleViewUserDetails = (userId: string) => {
    setSelectedUserId(userId);
    setShowUserDetailsModal(true);
  };

  const handleBulkDelete = async () => {
    if (selectedUsers.size === 0) return;
    
    try {
      setIsDeleting(true);
      const promises = Array.from(selectedUsers).map(userId => 
        api.users.users_Delete(userId)
      );
      
      await Promise.all(promises);
      setUsers(prev => prev.filter(u => !selectedUsers.has(u.id)));
      setSelectedUsers(new Set());
      setTotalCount(prev => prev - selectedUsers.size);
      loadUsers();
    } catch (error) {
      console.error('Failed to delete users:', error);
      setError('Failed to delete users. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusColor = (isActive: boolean): string => {
    return isActive
      ? 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30'
      : 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
  };

  const formatRelativeTime = (date?: Date): string => {
    if (!date) return 'Never';
    
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    if (diffMinutes > 0) return `${diffMinutes}m ago`;
    return 'Just now';
  };

  const getSortOptionKey = (field: string, direction: SortDirection): string => {
    return `${field}-${direction}`;
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

  if (isLoading && users.length === 0) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          {/* Header skeleton */}
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64"></div>
            </div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
          </div>
          
          {/* Filters skeleton */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                  <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Results summary skeleton */}
          <div className="flex justify-between items-center">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
          </div>
          
          {/* Table skeleton */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                <div className="ml-auto h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
              </div>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
                    </div>
                    <div className="space-y-1">
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                    </div>
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
                    <div className="space-y-1">
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                    </div>
                    <div className="flex space-x-2">
                      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Users
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Manage user accounts, roles, and permissions
          </p>
        </div>
        
        <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
          {selectedUsers.size > 0 && (
            <>
              <div className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-lg">
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  {selectedUsers.size} selected
                </span>
              </div>
              
              {/* Bulk Actions Dropdown */}
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  }
                >
                  Bulk Actions
                </Button>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // Bulk activate selected users
                  Promise.all(
                    Array.from(selectedUsers).map(userId => {
                      const user = users.find(u => u.id === userId);
                      if (user && !user.isActive) {
                        return handleUserToggleActive(userId, false);
                      }
                      return Promise.resolve();
                    })
                  );
                }}
                disabled={isDeleting}
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              >
                Activate
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  // Bulk deactivate selected users
                  Promise.all(
                    Array.from(selectedUsers).map(userId => {
                      const user = users.find(u => u.id === userId);
                      if (user && user.isActive) {
                        return handleUserToggleActive(userId, true);
                      }
                      return Promise.resolve();
                    })
                  );
                }}
                disabled={isDeleting}
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636" />
                  </svg>
                }
              >
                Deactivate
              </Button>
              
              <Button
                variant="danger"
                size="sm"
                onClick={handleBulkDelete}
                disabled={isDeleting}
                loading={isDeleting}
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                }
              >
                Delete
              </Button>
            </>
          )}
          
          <Button
            variant="primary"
            onClick={() => setShowCreateUserModal(true)}
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            }
          >
            New User
          </Button>
        </div>
      </div>

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
            <div className="ml-auto pl-3">
              <button
                onClick={loadUsers}
                className="text-sm text-red-800 dark:text-red-200 hover:text-red-600 dark:hover:text-red-300"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Filters and Search */}
      {/* <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Search & Filters</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchTerm('');
              setRoleFilter('');
              setStatusFilter('');
              setSortField('Name');
              setSortDirection(SortDirection._0);
            }}
          >
            Clear All
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Input
              label="Search users"
              placeholder="Search by name, email, or username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Role Filter
            </label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Roles</option>
              {availableRoles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status Filter
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sort By
            </label>
            <select
              value={getSortOptionKey(sortField, sortDirection)}
              onChange={(e) => {
                const [field, direction] = e.target.value.split('-');
                setSortField(field);
                setSortDirection(parseInt(direction) as SortDirection);
              }}
              className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={getSortOptionKey(option.field, option.direction)} value={getSortOptionKey(option.field, option.direction)}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {(searchTerm || roleFilter || statusFilter) && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Active filters:</span>
              {searchTerm && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                  Search: {searchTerm}
                  <button
                    onClick={() => setSearchTerm('')}
                    className="ml-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    ×
                  </button>
                </span>
              )}
              {roleFilter && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                  Role: {roleFilter}
                  <button
                    onClick={() => setRoleFilter('')}
                    className="ml-1 text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
                  >
                    ×
                  </button>
                </span>
              )}
              {statusFilter && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  Status: {statusFilter}
                  <button
                    onClick={() => setStatusFilter('')}
                    className="ml-1 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div> */}

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Users ({totalCount})
          </h2>
          {selectedUsers.size > 0 && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {selectedUsers.size} selected
            </span>
          )}
        </div>
        
        {/* View Options */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">View:</span>
          <div className="border border-gray-300 dark:border-gray-600 rounded-md p-1 flex">
            <button className="p-1 rounded text-blue-600 bg-blue-50 dark:bg-blue-900/30">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
            <button className="p-1 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={selectedUsers.size === users.length && users.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers(new Set(users.map(u => u.id)));
                      } else {
                        setSelectedUsers(new Set());
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Roles
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {isLoading && users.length > 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-3 text-center">
                    <div className="flex items-center justify-center space-x-2 text-blue-600 dark:text-blue-400">
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="text-sm">Updating users...</span>
                    </div>
                  </td>
                </tr>
              )}
              {users.map((user) => (
                <tr key={user.id} className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${isDeleting ? 'opacity-50' : ''}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedUsers.has(user.id)}
                      onChange={(e) => {
                        const newSelected = new Set(selectedUsers);
                        if (e.target.checked) {
                          newSelected.add(user.id);
                        } else {
                          newSelected.delete(user.id);
                        }
                        setSelectedUsers(newSelected);
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-12 w-12 flex-shrink-0">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                          <span className="text-sm font-medium text-white">
                            {user.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center space-x-2">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.fullName}
                          </div>
                          {user.roles.includes('admin') && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                              </svg>
                              Admin
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {user.email}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          @{user.username}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {user.roles.map(role => (
                        <span
                          key={role}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(role)}`}
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        user.isActive ? 'bg-green-400' : 'bg-red-400'
                      }`}></div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.isActive)}`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {formatRelativeTime(user.lastLoginDate)}
                    </div>
                    {user.lastLoginDate && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(user.lastLoginDate).toLocaleDateString()}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewUserDetails(user.id)}
                        leftIcon={
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        }
                      >
                        View
                      </Button>
                      
                      <Button
                        variant={user.isActive ? "ghost" : "outline"}
                        size="sm"
                        onClick={() => handleUserToggleActive(user.id, user.isActive)}
                        leftIcon={
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={user.isActive ? "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636" : "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"} />
                          </svg>
                        }
                      >
                        {user.isActive ? 'Deactivate' : 'Activate'}
                      </Button>
                      
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id, user.fullName)}
                        leftIcon={
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        }
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enhanced Empty State with Help */}
      {users.length === 0 && !isLoading && (
        <div className="text-center py-16">
          <div className="max-w-lg mx-auto">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {searchTerm || roleFilter || statusFilter ? 'No users match your criteria' : 'Welcome to User Management'}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              {searchTerm || roleFilter || statusFilter 
                ? 'Try adjusting your search criteria or filters to find the users you\'re looking for.' 
                : 'Get started by creating your first user account. You can assign roles, manage permissions, and control access to programs.'
              }
            </p>
            
            {!searchTerm && !roleFilter && !statusFilter && (
              <div className="space-y-6">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setShowCreateUserModal(true)}
                  leftIcon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  }
                >
                  Create Your First User
                </Button>
                
                {/* Quick Tips */}
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg text-left">
                  <h4 className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Quick Tips
                  </h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-2">
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Use the search bar to quickly find users by name, email, or username
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Filter users by role or status to focus on specific groups
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Select multiple users to perform bulk actions like activation or deletion
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Click on any user to view detailed information and manage their program access
                    </li>
                  </ul>
                </div>
              </div>
            )}
            
            {(searchTerm || roleFilter || statusFilter) && (
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setRoleFilter('');
                    setStatusFilter('');
                  }}
                  leftIcon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  }
                >
                  Clear Filters
                </Button>
                <Button
                  variant="primary"
                  onClick={() => setShowCreateUserModal(true)}
                  leftIcon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  }
                >
                  Create New User
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <div className="flex-1 flex justify-between sm:hidden">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Showing <span className="font-medium">{((currentPage - 1) * pageSize) + 1}</span> to{' '}
                <span className="font-medium">{Math.min(currentPage * pageSize, totalCount)}</span> of{' '}
                <span className="font-medium">{totalCount}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  const page = i + Math.max(1, currentPage - 2);
                  if (page > totalPages) return null;
                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? "primary" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  );
                })}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setUserToDelete(null);
        }}
        onConfirm={confirmDeleteUser}
        title="Delete User"
        message={
          userToDelete 
            ? `Are you sure you want to delete "${userToDelete.fullName}"? This action cannot be undone and will permanently remove the user and their data.`
            : 'Are you sure you want to delete this user?'
        }
        confirmText="Delete User"
        cancelText="Cancel"
        variant="danger"
        loading={isDeleting}
      />

      {/* Create User Modal */}
      <CreateUserModal
        isOpen={showCreateUserModal}
        onClose={() => setShowCreateUserModal(false)}
        onUserCreated={() => {
          loadUsers();
          setShowCreateUserModal(false);
        }}
      />

      {/* User Details Modal */}
      <UserDetailsModal
        isOpen={showUserDetailsModal}
        onClose={() => {
          setShowUserDetailsModal(false);
          setSelectedUserId(null);
        }}
        userId={selectedUserId}
        onUserUpdated={loadUsers}
      />
    </div>
  );
};

export default UsersPage;