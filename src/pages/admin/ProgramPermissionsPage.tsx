import React, { useState, useEffect } from 'react';
import { api } from '@/api/api';
import { ProgramDto, ProgramSearchDto } from '@/api/types';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import ProgramUserAssignmentModal from '@/components/admin/ProgramUserAssignmentModal';

interface ProgramPermission {
  type: string;
  id: string;
  name: string;
  accessLevel: string;
}

interface ProgramWithPermissions {
  id?: string;
  name?: string;
  description?: string;
  type?: string;
  language?: string;
  mainFile?: string;
  uiType?: string;
  uiConfiguration?: any;
  creator?: string;
  createdAt?: Date;
  status?: string;
  currentVersion?: string;
  metadata?: any;
  deploymentInfo?: any;
  permissions?: ProgramPermission[];
  userCount?: number;
  groupCount?: number;
}

const ProgramPermissionsPage: React.FC = () => {
  const [programs, setPrograms] = useState<ProgramWithPermissions[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
  const [expandedPrograms, setExpandedPrograms] = useState<Set<string>>(new Set());
  
  const pageSize = 10;

  useEffect(() => {
    loadPrograms();
  }, [currentPage, searchTerm]);

  const loadPrograms = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const searchDto = new ProgramSearchDto({
        name: searchTerm,
        description: searchTerm
      });
      const response = await api.programs.programs_Search(currentPage, pageSize, 'CreatedDate', undefined, searchDto);
      
      if (response.success && response.data) {
        const programsData = response.data.items || [];
        
        const programsWithPermissions = await Promise.all(
          programsData.map(async (programItem: any) => {
            const program = ProgramDto.fromJS(programItem);
            try {
              const permResponse = await api.programs.programs_GetProgramPermissions(program.id!);
              if (permResponse.success && permResponse.data) {
                const permissions = permResponse.data as ProgramPermission[];
                const userPermissions = permissions.filter(p => p.type === 'user');
                const groupPermissions = permissions.filter(p => p.type === 'group');
                
                return {
                  ...program,
                  permissions,
                  userCount: userPermissions.length,
                  groupCount: groupPermissions.length
                };
              }
              return {
                ...program,
                permissions: [],
                userCount: 0,
                groupCount: 0
              };
            } catch (error) {
              console.error(`Failed to load permissions for program ${program.id}:`, error);
              return {
                ...program,
                permissions: [],
                userCount: 0,
                groupCount: 0
              };
            }
          })
        );
        
        setPrograms(programsWithPermissions);
        setTotalPages(Math.ceil((response.data.totalCount || 0) / pageSize));
      } else {
        setError(response.message || 'Failed to load programs');
      }
    } catch (error) {
      console.error('Failed to load programs:', error);
      setError('Failed to load programs. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleManageUsers = (programId: string) => {
    setSelectedProgram(programId);
    setIsAssignmentModalOpen(true);
  };

  const handlePermissionsUpdated = () => {
    loadPrograms();
  };

  const toggleProgramExpansion = (programId: string) => {
    const newExpanded = new Set(expandedPrograms);
    if (newExpanded.has(programId)) {
      newExpanded.delete(programId);
    } else {
      newExpanded.add(programId);
    }
    setExpandedPrograms(newExpanded);
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'archived':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    }
  };

  const getAccessLevelColor = (accessLevel: string) => {
    switch (accessLevel?.toLowerCase()) {
      case 'admin':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'execute':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'write':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      case 'read':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          variant={i === currentPage ? "primary" : "outline"}
          size="sm"
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Button>
      );
    }

    return (
      <div className="flex items-center justify-center space-x-2 mt-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        {pages}
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Program Permissions Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage user and group access permissions for all programs
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-md bg-red-50 dark:bg-red-900/20 p-4">
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

      {/* Search and Controls */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search programs by name or description..."
            className="w-full"
          />
        </div>
        <Button
          variant="outline"
          onClick={loadPrograms}
          disabled={isLoading}
        >
          Refresh
        </Button>
      </div>

      {/* Programs Table */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 table-fixed lg:table-auto">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-2/5">
                  Program
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/8">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/8">
                  User Access
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/8">
                  Group Access
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center">
                    <div className="animate-pulse space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4 mx-auto"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2 mx-auto"></div>
                    </div>
                  </td>
                </tr>
              ) : programs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    No programs found
                  </td>
                </tr>
              ) : (
                programs.map((program) => (
                  <React.Fragment key={program.id}>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4">
                        <div className="flex items-start">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleProgramExpansion(program.id!)}
                            className="mr-3 p-1 mt-1 flex-shrink-0"
                          >
                            <svg
                              className={`w-4 h-4 transition-transform ${
                                expandedPrograms.has(program.id!) ? 'rotate-90' : ''
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Button>
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                              {program.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1 line-clamp-2">
                              {program.description || 'No description'}
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="text-xs text-gray-400 dark:text-gray-500">
                                Version: {program.currentVersion || 'No version'}
                              </div>
                              <div className="text-xs text-gray-400 dark:text-gray-500">
                                Type: {program.type || 'Unknown'}
                              </div>
                              <div className="text-xs text-gray-400 dark:text-gray-500">
                                Language: {program.language || 'Unknown'}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(program.status || '')}`}>
                          {program.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <span className="text-sm text-gray-900 dark:text-white font-medium">
                            {program.userCount || 0}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                            {program.userCount === 1 ? 'user' : 'users'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <span className="text-sm text-gray-900 dark:text-white font-medium">
                            {program.groupCount || 0}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                            {program.groupCount === 1 ? 'group' : 'groups'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleManageUsers(program.id!)}
                          className="whitespace-nowrap"
                        >
                          Manage Access
                        </Button>
                      </td>
                    </tr>
                    
                    {/* Expanded permissions details */}
                    {expandedPrograms.has(program.id!) && (
                      <tr>
                        <td colSpan={5} className="px-6 py-6 bg-gray-50 dark:bg-gray-700/50">
                          <div className="space-y-6">
                            {/* User Permissions */}
                            {program.permissions && program.permissions.filter(p => p.type === 'user').length > 0 && (
                              <div>
                                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                                  <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                  </svg>
                                  User Permissions ({program.permissions.filter(p => p.type === 'user').length})
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                                  {program.permissions
                                    .filter(p => p.type === 'user')
                                    .map((permission) => (
                                      <div key={`${permission.type}-${permission.id}`} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                                        <div className="min-w-0 flex-1">
                                          <span className="text-sm font-medium text-gray-900 dark:text-white truncate block">
                                            {permission.name}
                                          </span>
                                        </div>
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ml-2 ${getAccessLevelColor(permission.accessLevel)}`}>
                                          {permission.accessLevel}
                                        </span>
                                      </div>
                                    ))}
                                </div>
                              </div>
                            )}
                            
                            {/* Group Permissions */}
                            {program.permissions && program.permissions.filter(p => p.type === 'group').length > 0 && (
                              <div>
                                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                  </svg>
                                  Group Permissions ({program.permissions.filter(p => p.type === 'group').length})
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                                  {program.permissions
                                    .filter(p => p.type === 'group')
                                    .map((permission) => (
                                      <div key={`${permission.type}-${permission.id}`} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                                        <div className="min-w-0 flex-1">
                                          <span className="text-sm font-medium text-gray-900 dark:text-white truncate block">
                                            {permission.name}
                                          </span>
                                        </div>
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ml-2 ${getAccessLevelColor(permission.accessLevel)}`}>
                                          {permission.accessLevel}
                                        </span>
                                      </div>
                                    ))}
                                </div>
                              </div>
                            )}
                            
                            {/* No permissions message */}
                            {(!program.permissions || program.permissions.length === 0) && (
                              <div className="text-center py-8">
                                <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                  No permissions configured for this program
                                </p>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                  Click "Manage Access" to assign users and groups
                                </p>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {renderPagination()}

      {/* Program User Assignment Modal */}
      <ProgramUserAssignmentModal
        isOpen={isAssignmentModalOpen}
        onClose={() => {
          setIsAssignmentModalOpen(false);
          setSelectedProgram(null);
        }}
        programId={selectedProgram}
        onPermissionsUpdated={handlePermissionsUpdated}
      />
    </div>
  );
};

export default ProgramPermissionsPage;