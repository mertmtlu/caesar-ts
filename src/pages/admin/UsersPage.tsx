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
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="space-y-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
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
        
        <div className="mt-4 sm:mt-0 flex space-x-3">
          {selectedUsers.size > 0 && (
            <Button
              variant="danger"
              onClick={handleBulkDelete}
              disabled={isDeleting}
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              }
            >
              Delete {selectedUsers.size} User{selectedUsers.size > 1 ? 's' : ''}
            </Button>
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

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
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
                      <div className="h-10 w-10 flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {user.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {user.fullName}
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
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.isActive)}`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {formatRelativeTime(user.lastLoginDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewUserDetails(user.id)}
                      >
                        View
                      </Button>
                      <Button
                        variant={user.isActive ? "ghost" : "outline"}
                        size="sm"
                        onClick={() => handleUserToggleActive(user.id, user.isActive)}
                      >
                        {user.isActive ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id, user.fullName)}
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

      {/* Empty State */}
      {users.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No users found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {searchTerm || roleFilter || statusFilter ? 'Try adjusting your search criteria.' : 'Get started by creating your first user.'}
          </p>
          {!searchTerm && !roleFilter && !statusFilter && (
            <div className="mt-6">
              <Button
                variant="primary"
                onClick={() => setShowCreateUserModal(true)}
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                }
              >
                Create Your First User
              </Button>
            </div>
          )}
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