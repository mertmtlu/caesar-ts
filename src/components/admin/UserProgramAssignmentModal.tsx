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
      title={`Manage Program Access - ${userName || 'User'}`}
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
          {/* Current Program Assignments */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Current Program Access ({userPrograms.length})
            </h3>
            
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
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Add Program Access
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

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button
                variant="primary"
                onClick={handleAssignPrograms}
                disabled={selectedPrograms.size === 0 || isSaving}
              >
                Grant Access to {selectedPrograms.size} Program{selectedPrograms.size !== 1 ? 's' : ''}
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