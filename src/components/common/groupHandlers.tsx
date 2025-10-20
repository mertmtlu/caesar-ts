import React from 'react';
import { api } from '@/api/api';
import { GroupListDto, ProgramGroupPermissionDto, WorkflowPermissionUpdateDto } from '@/api';
import { GroupsHandler, EntityConfig } from './ManageGroupsModal';

// Project/Program Groups Handler
export const projectGroupsHandler: GroupsHandler = {
  loadGroups: async (projectId: string): Promise<GroupListDto[]> => {
    const response = await api.programs.programs_GetProgramPermissions(projectId);
    
    if (response.success && response.data) {
      // Filter permissions to only include groups
      const groupPermissions = response.data.filter((perm) => 
        perm.type === 'Group' || perm.type === 'group'
      );
      
      console.log('Found group permissions:', groupPermissions);
      
      // Map to GroupListDto format and resolve group names
      const groups = await Promise.all(
        groupPermissions.map(async (perm) => {
          let groupName = perm.name || `Group ${perm.id}`;
          let groupId = perm.id;
          
          // Always try to resolve the actual group name from the API
          // Try both perm.id and perm.name as potential group IDs
          const potentialIds = [perm.id, perm.name].filter(Boolean);
          
          for (const potentialId of potentialIds) {
            if (!potentialId) continue;
            try {
              console.log(`Trying to resolve group ID: ${potentialId}`);
              const groupResponse = await api.groupsClient.groups_GetById(potentialId);
              console.log(`Group response for ${potentialId}:`, groupResponse);
              if (groupResponse && groupResponse.name) {
                groupName = groupResponse.name;
                groupId = groupResponse.id || potentialId;
                console.log(`Successfully resolved ${potentialId} to name: ${groupName}`);
                break; // Found a valid group, stop trying
              }
            } catch (error) {
              console.warn(`Failed to resolve group ID ${potentialId}:`, error);
              // Continue to next potential ID
            }
          }
          
          // If we still have an ID-like name, warn about it
          if (groupName.match(/^[a-f0-9]{24}$/i)) {
            console.warn(`Could not resolve group name for ID ${groupName}, displaying ID`);
          }
          
          return new GroupListDto({
            id: groupId,
            name: groupName,
            description: `Access Level: ${perm.accessLevel}`,
            isActive: true
          });
        })
      );
      
      return groups;
    }
    
    return [];
  },

  addGroups: async (projectId: string, groupIds: string[], accessLevel: string = 'Read'): Promise<void> => {
    for (const groupId of groupIds) {
      const permissionDto = new ProgramGroupPermissionDto({
        groupId: groupId,
        accessLevel: accessLevel
      });
      
      await api.programs.programs_AddGroupPermission(projectId, permissionDto);
    }
    
    console.log(`Successfully added ${groupIds.length} group(s) to project permissions.`);
  },

  removeGroup: async (projectId: string, groupId: string): Promise<void> => {
    await api.programs.programs_RemoveGroupPermission(projectId, groupId);
  },

  updateAccessLevel: async (projectId: string, groupId: string, accessLevel: string): Promise<void> => {
    // Remove the existing permission
    await api.programs.programs_RemoveGroupPermission(projectId, groupId);
    
    // Add the new permission with updated access level
    const permissionDto = new ProgramGroupPermissionDto({
      groupId: groupId,
      accessLevel: accessLevel
    });
    
    await api.programs.programs_AddGroupPermission(projectId, permissionDto);
    console.log(`Successfully updated access level for group ${groupId} to ${accessLevel}`);
  }
};

// Workflow Groups Handler (Role-based)
export const workflowGroupsHandler: GroupsHandler = {
  loadGroups: async (workflowId: string): Promise<GroupListDto[]> => {
    const response = await api.workflows.workflows_GetPermissions(workflowId);
    
    if (response.success && response.data) {
      const roles = response.data.allowedRoles || [];
      
      // Create GroupListDto entries for roles
      const groupsFromRoles = roles.map((role: string, index: number) => 
        new GroupListDto({
          id: `role_${index}`,
          name: role,
          description: `Workflow role providing access permissions`,
          isActive: true
        })
      );
      
      return groupsFromRoles;
    }
    
    return [];
  },

  addGroups: async (workflowId: string, groupIds: string[], accessLevel: string = 'Read'): Promise<void> => {
    // Get current permissions first
    const currentPermResponse = await api.workflows.workflows_GetPermissions(workflowId);
    
    if (currentPermResponse.success && currentPermResponse.data) {
      // Load group details to get group names for role mapping
      const selectedGroups: string[] = [];
      
      for (const groupId of groupIds) {
        try {
          const groupResponse = await api.groupsClient.groups_GetById(groupId);
          if (groupResponse && groupResponse.name) {
            // Check if the group has members
            const members = await api.groupsClient.groups_GetMembers(groupId);
            if (members && members.length > 0) {
              selectedGroups.push(groupResponse.name);
            } else {
              // Warn about empty groups but still add them (they represent roles)
              selectedGroups.push(groupResponse.name);
              console.warn(`Group "${groupResponse.name}" has no members but will be added as a workflow role.`);
            }
          }
        } catch (err) {
          console.warn(`Failed to load group ${groupId}:`, err);
        }
      }
      
      // Update workflow permissions by adding group names as allowed roles
      const updatedRoles = [...(currentPermResponse.data.allowedRoles || []), ...selectedGroups];
      
      const updateDto = new WorkflowPermissionUpdateDto({
        isPublic: currentPermResponse.data.isPublic,
        allowedUsers: currentPermResponse.data.allowedUsers,
        allowedRoles: updatedRoles,
        permissions: currentPermResponse.data.permissions
      });
      
      const updateResponse = await api.workflows.workflows_UpdatePermissions(workflowId, updateDto);
      
      if (!updateResponse.success) {
        throw new Error('Failed to update workflow permissions');
      }
      
      // Show success message
      if (selectedGroups.length > 0) {
        console.log(`Successfully added ${selectedGroups.length} group(s) as workflow roles: ${selectedGroups.join(', ')}`);
      }
    }
  },

  removeGroup: async (workflowId: string, groupId: string): Promise<void> => {
    // Get current permissions first
    const currentPermResponse = await api.workflows.workflows_GetPermissions(workflowId);
    
    if (currentPermResponse.success && currentPermResponse.data) {
      // For role-based removal, we need to find the role name corresponding to the groupId
      const roleToRemove = groupId.startsWith('role_') ? 
        currentPermResponse.data.allowedRoles?.[parseInt(groupId.split('_')[1])] : 
        groupId;
      
      const updatedRoles = (currentPermResponse.data.allowedRoles || []).filter(
        (role: string) => role !== roleToRemove
      );
      
      const updateDto = new WorkflowPermissionUpdateDto({
        isPublic: currentPermResponse.data.isPublic,
        allowedUsers: currentPermResponse.data.allowedUsers,
        allowedRoles: updatedRoles,
        permissions: currentPermResponse.data.permissions
      });
      
      const updateResponse = await api.workflows.workflows_UpdatePermissions(workflowId, updateDto);
      
      if (!updateResponse.success) {
        throw new Error('Failed to update workflow permissions');
      }
    }
  }
};

// Entity Configuration Factory
export const createEntityConfig = (
  type: 'project' | 'workflow',
  entityId: string,
  entityName: string
): EntityConfig => {
  const configs = {
    project: {
      type: 'project' as const,
      entityId,
      entityName,
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      gradientColors: 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20',
      badgeColor: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
      badgeText: 'Project',
      description: 'Configure which groups can access this project',
      infoPanel: {
        title: 'Group Access Permissions',
        items: [
          { label: 'View', description: 'Group members can see and use the project' },
          { label: 'Execute', description: 'Group members can run project applications' },
          { label: 'Deploy', description: 'Group members can deploy applications to this project' }
        ]
      }
    },

    workflow: {
      type: 'workflow' as const,
      entityId,
      entityName,
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      gradientColors: 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20',
      badgeColor: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
      badgeText: 'Workflow',
      description: 'Configure which groups can access this workflow',
      infoPanel: {
        title: 'Workflow Access Permissions',
        items: [
          { label: 'Role-Based', description: 'Groups are mapped to workflow roles for access control' },
          { label: 'Execute', description: 'Authorized users can run workflow executions' },
          { label: 'Monitor', description: 'Users can view execution history and results' }
        ]
      }
    }
  };

  return configs[type];
};