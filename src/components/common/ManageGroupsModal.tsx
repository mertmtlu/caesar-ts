import React, { useState, useEffect } from 'react';
import { api } from '@/api/api';
import { GroupListDto } from '@/api';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import GroupSelector from '@/components/common/GroupSelector';
import GroupsList from '@/components/common/GroupsList';

export interface EntityConfig {
  type: 'project' | 'workflow' | 'remoteapp';
  entityId: string;
  entityName: string;
  icon: React.ReactNode;
  gradientColors: string;
  badgeColor: string;
  badgeText: string;
  description: string;
  infoPanel: {
    title: string;
    items: Array<{ label: string; description: string }>;
  };
}

export interface GroupsHandler {
  loadGroups: (entityId: string) => Promise<GroupListDto[]>;
  addGroups: (entityId: string, groupIds: string[]) => Promise<void>;
  removeGroup: (entityId: string, groupId: string) => Promise<void>;
}

interface ManageGroupsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: EntityConfig;
  handler: GroupsHandler;
  onSave?: () => void;
}

const ManageGroupsModal: React.FC<ManageGroupsModalProps> = ({
  isOpen,
  onClose,
  config,
  handler,
  onSave,
}) => {
  const [currentGroups, setCurrentGroups] = useState<GroupListDto[]>([]);
  const [selectedGroupIds, setSelectedGroupIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && config.entityId) {
      loadEntityGroups();
    }
  }, [isOpen, config.entityId]);

  const loadEntityGroups = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const groups = await handler.loadGroups(config.entityId);
      setCurrentGroups(groups);
    } catch (error: any) {
      console.error(`Failed to load ${config.type} groups:`, error);
      setError(error?.message || `Failed to load ${config.type} groups`);
      setCurrentGroups([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddGroups = async () => {
    console.log('ManageGroupsModal handleAddGroups called');
    if (selectedGroupIds.length === 0) return;
    
    setIsSaving(true);
    setError(null);
    
    try {
      console.log('Calling handler.addGroups with:', { entityId: config.entityId, selectedGroupIds, type: config.type });
      await handler.addGroups(config.entityId, selectedGroupIds);
      console.log('handler.addGroups completed successfully');
      
      // Reset selection and reload
      setSelectedGroupIds([]);
      await loadEntityGroups();
      onSave?.();
      console.log('handleAddGroups completed successfully');
      
    } catch (error: any) {
      console.error('Error in handleAddGroups:', error);
      setError(error?.message || `Failed to add groups to ${config.type}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemoveGroup = async (groupId: string) => {
    try {
      await handler.removeGroup(config.entityId, groupId);
      await loadEntityGroups();
      onSave?.();
    } catch (error: any) {
      setError(error?.message || `Failed to remove group from ${config.type}`);
    }
  };

  // Filter out already assigned groups from selector
  const assignedGroupIds = currentGroups.map(g => g.id!);

  if (!isOpen) return null;

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Manage Group Access"
      size="lg"
    >
      <div className="space-y-6 overflow-visible">
        {/* Header Section with Entity Info */}
        <div className={`${config.gradientColors} -mx-6 -mt-4 px-6 pt-4 pb-6 mb-6`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                {config.icon}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{config.entityName}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">{config.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`${config.badgeColor} px-3 py-1 rounded-full text-xs font-medium`}>
                {config.badgeText}
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

        {/* Current Groups Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Groups with Access
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {currentGroups.length} {currentGroups.length === 1 ? 'group has' : 'groups have'} access to this {config.type}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                  {currentGroups.length} Active
                </span>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Loading group access...</p>
              </div>
            ) : currentGroups.length > 0 ? (
              <GroupsList
                groups={currentGroups}
                onRemoveGroup={handleRemoveGroup}
                showMemberCount={true}
                showDescription={true}
                emptyMessage=""
              />
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">No groups assigned</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  This {config.type} has no group permissions configured. Add groups below to grant access.
                </p>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${config.badgeColor}`}>
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {config.badgeText}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Add Groups Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-visible">
          <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Add Group Access
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Grant access to additional groups
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-4 relative">
            <div className="relative z-10">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Groups
              </label>
              <div className="relative">
                <GroupSelector
                  selectedGroupIds={selectedGroupIds.filter(id => !assignedGroupIds.includes(id))}
                  onSelectionChange={setSelectedGroupIds}
                  multiple={true}
                  placeholder="Search and select groups to add..."
                  className="w-full"
                />
              </div>
              {selectedGroupIds.length > 0 && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {selectedGroupIds.length} {selectedGroupIds.length === 1 ? 'group' : 'groups'} selected
                </p>
              )}
            </div>
            
            {selectedGroupIds.length > 0 && (
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Ready to add {selectedGroupIds.length} {selectedGroupIds.length === 1 ? 'group' : 'groups'}
                </p>
                <Button
                  variant="primary"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddGroups();
                  }}
                  disabled={isSaving}
                  size="sm"
                  leftIcon={isSaving ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  )}
                >
                  {isSaving ? 'Adding...' : 'Add Access'}
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Information Panel */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">{config.infoPanel.title}</h3>
              <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                <ul className="list-disc list-inside space-y-1">
                  {config.infoPanel.items.map((item, index) => (
                    <li key={index}>
                      <strong>{item.label}:</strong> {item.description}
                    </li>
                  ))}
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

export default ManageGroupsModal;