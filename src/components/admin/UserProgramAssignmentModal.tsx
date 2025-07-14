import React, { useState, useEffect } from 'react';
import { api } from '@/api/api';
import { ProgramUserPermissionDto, ProgramDto, ProgramSearchDto } from '@/api/types';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Modal from '@/components/common/Modal';

interface UserProgramAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string | null;
  userName?: string;
  onPermissionsUpdated: () => void;
}

const UserProgramAssignmentModal: React.FC<UserProgramAssignmentModalProps> = ({
  isOpen,
  onClose,
  userId,
  userName,
  onPermissionsUpdated
}) => {
  const [programs, setPrograms] = useState<ProgramDto[]>([]);
  const [userPrograms, setUserPrograms] = useState<ProgramDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPrograms, setSelectedPrograms] = useState<Set<string>>(new Set());
  const [selectedAccessLevel, setSelectedAccessLevel] = useState<string>('Read');

  const accessLevels = ['Read', 'Write', 'Execute', 'Admin'];

  useEffect(() => {
    if (isOpen && userId) {
      loadPrograms();
      loadUserPrograms();
    }
  }, [isOpen, userId]);

  const loadPrograms = async () => {
    try {
      setIsLoading(true);
      const searchDto = new ProgramSearchDto({
        name: searchTerm,
        description: searchTerm
      });
      const response = await api.programs.programs_Search(1, 100, 'CreatedDate', undefined, searchDto);
      if (response.success && response.data) {
        setPrograms((response.data.items || []).map(item => ProgramDto.fromJS(item)));
      }
    } catch (error) {
      console.error('Failed to load programs:', error);
      setError('Failed to load programs. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserPrograms = async () => {
    if (!userId) return;
    
    try {
      const response = await api.programs.programs_GetUserAccessiblePrograms(1, 100, 'CreatedDate', undefined);
      if (response.success && response.data) {
        setUserPrograms((response.data.items || []).map(item => ProgramDto.fromJS(item)));
      }
    } catch (error) {
      console.error('Failed to load user programs:', error);
    }
  };

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue);
  };

  const handleProgramSelection = (programId: string, checked: boolean) => {
    const newSelection = new Set(selectedPrograms);
    if (checked) {
      newSelection.add(programId);
    } else {
      newSelection.delete(programId);
    }
    setSelectedPrograms(newSelection);
  };

  const handleSelectAll = () => {
    const filteredPrograms = getFilteredPrograms();
    const allSelected = filteredPrograms.every(program => selectedPrograms.has(program.id!));
    
    if (allSelected) {
      setSelectedPrograms(new Set());
    } else {
      const newSelection = new Set(selectedPrograms);
      filteredPrograms.forEach(program => newSelection.add(program.id!));
      setSelectedPrograms(newSelection);
    }
  };

  const getFilteredPrograms = () => {
    return programs.filter(program => 
      program.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getUserProgramPermission = (programId: string) => {
    return userPrograms.find(p => p.id === programId);
  };

  const handleAssignPrograms = async () => {
    if (!userId || selectedPrograms.size === 0) return;

    try {
      setSaving(true);
      setError(null);

      const promises = Array.from(selectedPrograms).map(programId => {
        const permissionDto = new ProgramUserPermissionDto({
          userId,
          accessLevel: selectedAccessLevel
        });
        return api.programs.programs_AddUserPermission(programId, permissionDto);
      });

      const results = await Promise.all(promises);
      const failed = results.filter(r => !r.success);

      if (failed.length > 0) {
        setError(`Failed to assign ${failed.length} programs. Please try again.`);
      } else {
        setSelectedPrograms(new Set());
        await loadUserPrograms();
        onPermissionsUpdated();
      }
    } catch (error) {
      console.error('Failed to assign programs:', error);
      setError('Failed to assign programs. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveProgram = async (programId: string) => {
    if (!userId) return;

    try {
      setSaving(true);
      setError(null);

      const response = await api.programs.programs_RemoveUserPermission(programId, userId);
      
      if (response.success) {
        await loadUserPrograms();
        onPermissionsUpdated();
      } else {
        setError(response.message || 'Failed to remove program access');
      }
    } catch (error) {
      console.error('Failed to remove program:', error);
      setError('Failed to remove program access. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdatePermission = async (programId: string, newAccessLevel: string) => {
    if (!userId) return;

    try {
      setSaving(true);
      setError(null);

      const permissionDto = new ProgramUserPermissionDto({
        userId,
        accessLevel: newAccessLevel
      });

      const response = await api.programs.programs_UpdateUserPermission(programId, userId, permissionDto);
      
      if (response.success) {
        await loadUserPrograms();
        onPermissionsUpdated();
      } else {
        setError(response.message || 'Failed to update program permission');
      }
    } catch (error) {
      console.error('Failed to update permission:', error);
      setError('Failed to update program permission. Please try again.');
    } finally {
      setSaving(false);
    }
  };


  if (!isOpen) return null;

  const filteredPrograms = getFilteredPrograms();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="User Program Access Management"
      size="xl"
    >
      <div className="space-y-6">
        {/* User Header */}
        {userName && (
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  {userName.split(' ').map(n => n[0]).join('').toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{userName}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Managing program access permissions</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Program Assignments */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Current Program Access
                </h3>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                {userPrograms.length} programs
              </span>
            </div>
            
            <div className="max-h-96 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg">
              {userPrograms.length === 0 ? (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No programs assigned to this user
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {userPrograms.map((program) => (
                    <ProgramPermissionItem
                      key={program.id}
                      program={program}
                      userId={userId!}
                      onUpdatePermission={handleUpdatePermission}
                      onRemoveProgram={handleRemoveProgram}
                      isSaving={isSaving}
                      accessLevels={accessLevels}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Add Programs */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Grant New Program Access
              </h3>
            </div>

            {/* Enhanced Access Level Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Default Permission Level for New Programs
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {accessLevels.map(level => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setSelectedAccessLevel(level)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedAccessLevel === level
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-sm font-medium">{level}</div>
                      <div className="text-xs mt-1 opacity-75">
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

            {/* Program Search */}
            <Input
              label="Search Programs"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search by name or description..."
            />

            {/* Bulk Selection Controls */}
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSelectAll}
                disabled={filteredPrograms.length === 0}
              >
                {filteredPrograms.length > 0 && filteredPrograms.every(program => selectedPrograms.has(program.id!)) 
                  ? 'Deselect All' 
                  : 'Select All'
                }
              </Button>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {selectedPrograms.size} selected
              </span>
            </div>

            {/* Program List */}
            <div className="max-h-64 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg">
              {isLoading ? (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  Loading programs...
                </div>
              ) : filteredPrograms.length === 0 ? (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No programs found
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredPrograms.map((program) => {
                    const hasAccess = getUserProgramPermission(program.id!);
                    return (
                      <div key={program.id} className="p-3">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedPrograms.has(program.id!)}
                            onChange={(e) => handleProgramSelection(program.id!, e.target.checked)}
                            disabled={!!hasAccess}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <div className="ml-3 flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {program.name}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {program.description || 'No description'}
                                </p>
                                <p className="text-xs text-gray-400 dark:text-gray-500">
                                  Status: {program.status} • Version: {program.currentVersion || 'No version'}
                                </p>
                              </div>
                              {hasAccess && (
                                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded">
                                  Already has access
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

            {/* Enhanced Action Buttons */}
            <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="primary"
                  onClick={handleAssignPrograms}
                  disabled={selectedPrograms.size === 0 || isSaving}
                  loading={isSaving}
                  leftIcon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  }
                  className="flex-1 sm:flex-initial"
                >
                  {isSaving 
                    ? 'Granting Access...' 
                    : `Grant ${selectedAccessLevel} Access to ${selectedPrograms.size} Program${selectedPrograms.size !== 1 ? 's' : ''}`
                  }
                </Button>
                <Button
                  variant="outline"
                  onClick={onClose}
                  disabled={isSaving}
                  className="flex-1 sm:flex-initial"
                >
                  Cancel
                </Button>
              </div>
              {selectedPrograms.size > 0 && (
                <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded border border-purple-200 dark:border-purple-800">
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    💡 User will be granted <strong>{selectedAccessLevel}</strong> access to {selectedPrograms.size} program{selectedPrograms.size !== 1 ? 's' : ''}. Access levels can be modified individually after assignment.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

interface ProgramPermissionItemProps {
  program: ProgramDto;
  userId: string;
  onUpdatePermission: (programId: string, newAccessLevel: string) => void;
  onRemoveProgram: (programId: string) => void;
  isSaving: boolean;
  accessLevels: string[];
}

const ProgramPermissionItem: React.FC<ProgramPermissionItemProps> = ({
  program,
  userId,
  onUpdatePermission,
  onRemoveProgram,
  isSaving,
  accessLevels
}) => {
  const [currentAccessLevel, setCurrentAccessLevel] = useState<string>('Read');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPermissionDetails();
  }, [program.id, userId]);

  const loadPermissionDetails = async () => {
    try {
      setIsLoading(true);
      const response = await api.programs.programs_GetProgramPermissions(program.id!);
      if (response.success && response.data) {
        const userPermission = response.data.find((p: any) => p.type === 'User' && p.id === userId);
        if (userPermission) {
          setCurrentAccessLevel(userPermission.accessLevel || 'Read');
        }
      }
    } catch (error) {
      console.error('Failed to load permission details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 flex items-center justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {program.name}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {program.description || 'No description'}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Status: {program.status} • Version: {program.currentVersion || 'No version'}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        {isLoading ? (
          <div className="animate-pulse bg-gray-200 dark:bg-gray-600 h-8 w-20 rounded"></div>
        ) : (
          <select
            value={currentAccessLevel}
            onChange={(e) => {
              setCurrentAccessLevel(e.target.value);
              onUpdatePermission(program.id!, e.target.value);
            }}
            disabled={isSaving}
            className="text-xs border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {accessLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        )}
        <Button
          variant="danger"
          size="sm"
          onClick={() => onRemoveProgram(program.id!)}
          disabled={isSaving}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default UserProgramAssignmentModal;