// src/pages/apps/ExecutionsPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '@/api/api';
import { SortDirection, IconEntityType } from '@/api/enums';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { ExecutionResourceLimitsDto, ProgramExecutionRequestDto, WorkflowExecutionRequest } from '@/api';
import { IVersionInfoDto } from '@/api/typeInterfaces';
import ComponentForm from '@/components/common/ComponentForm';
import { UIElement, ComponentSchema } from '@/types/componentDesigner';
import IconDisplay from '@/components/icons/IconDisplay';

// Interfaces
interface ProgramItem {
  id: string;
  name: string;
  description?: string;
  language: string;
  type: string;
  status: string;
  versionCount: number;
  hasVersions: boolean;
  currentVersion?: IVersionInfoDto;
  icon?: string;
  newestComponent?: ComponentItem | null;
  componentCount: number;
  hasComponents: boolean;
  newestComponentType?: string;
}

interface ComponentItem {
  id: string;
  name: string;
  type: string; // input_form, visualization, composite
  status: string;
  programId: string;
  versionId: string;
  createdDate: Date;
}

interface WorkflowItem {
  id: string;
  name: string;
  description?: string;
  status?: string | number;
  version?: number;
  nodeCount: number;
  hasUIComponents?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ExecutionItem {
  id: string;
  programId?: string;
  programName?: string;
  workflowId?: string;
  workflowName?: string;
  status: string;
  startedAt: Date;
  completedAt?: Date;
  userId: string;
  executionType: string;
  itemType: 'program' | 'workflow'; // To distinguish between program and workflow executions
}

interface ExecuteModalState {
  isOpen: boolean;
  program: ProgramItem | null;
  workflow: WorkflowItem | null;
  isExecuting: boolean;
  componentElements: UIElement[] | null;
  executionType: 'program' | 'workflow';
}

interface RemoteAppItem {
  id: string;
  name: string;
  description?: string;
  url: string;
  status: string;
  isPublic: boolean;
  creator: string;
  createdAt: Date;
}

interface MenuState {
  isOpen: boolean;
  itemId: string | null;
  itemType: 'program' | 'workflow' | 'remoteapp';
  position: { x: number; y: number };
}

const secureSsoRedirect = (redirectUrl: string) => {
  try {
    const url = new URL(redirectUrl);
    const username = url.searchParams.get('username');
    const password = url.searchParams.get('password');
    
    // Remove query parameters to get the base URL
    const formActionUrl = `${url.origin}${url.pathname}`;

    if (!username || !password) {
      // Fallback for URLs without credentials
      window.open(redirectUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    // 1. Create the form element
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = formActionUrl;
    form.target = '_blank'; // Open in a new tab

    // 2. Create hidden input fields for credentials
    const userInput = document.createElement('input');
    userInput.type = 'hidden';
    userInput.name = 'username';
    userInput.value = username;

    const passInput = document.createElement('input');
    passInput.type = 'hidden';
    passInput.name = 'password';
    passInput.value = password;

    // 3. Append inputs to the form
    form.appendChild(userInput);
    form.appendChild(passInput);

    // 4. Append the form to the body and submit
    document.body.appendChild(form);
    form.submit();

    // 5. Clean up by removing the form
    document.body.removeChild(form);

  } catch (error) {
    console.error('SSO redirect failed, falling back to direct URL:', error);
    // Fallback to the original behavior if parsing fails
    window.open(redirectUrl, '_blank', 'noopener,noreferrer');
  }
};

// Desktop icons configuration for different program types and languages
const getDesktopIcon = (program: ProgramItem, iconData?: string): React.ReactNode => {
  // If we have custom icon data, use IconDisplay with custom styling
  if (iconData) {
    return (
      <div className="w-16 h-16 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer border-2 border-gray-200 dark:border-gray-600 overflow-hidden">
        <IconDisplay
          iconData={iconData}
          entityType="program"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  // Fallback to generated icons for programs without custom icons
  const { language, type } = program;
  const lang = language.toLowerCase();
  const programType = type.toLowerCase();
  
  // Create icon based on language and type
  const createIcon = (bgColor: string, textColor: string, iconText: string, useBuiltInIcon?: boolean, builtInIconPath?: string) => (
    <div className={`w-16 h-16 ${bgColor} rounded-lg flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer border-2 border-gray-200 dark:border-gray-600`}>
      {useBuiltInIcon && builtInIconPath ? (
        <svg className={`w-8 h-8 ${textColor}`} fill="currentColor" viewBox="0 0 24 24">
          <path d={builtInIconPath} />
        </svg>
      ) : (
        <div className={`${textColor} font-bold text-sm`}>
          {iconText}
        </div>
      )}
    </div>
  );

  // Web applications
  if (programType.includes('web')) {
    return createIcon('bg-blue-500', 'text-white', 'WEB', true, 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5');
  }

  // API applications
  if (programType.includes('api')) {
    return createIcon('bg-green-500', 'text-white', 'API', true, 'M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z');
  }

  // Console/CLI applications
  if (programType.includes('console') || programType.includes('cli')) {
    return createIcon('bg-gray-800', 'text-green-400', 'CLI', true, 'M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h10v2H7V7zm0 4h10v2H7v-2z');
  }

  // Language-specific icons
  if (lang.includes('javascript') || lang.includes('js')) {
    return createIcon('bg-yellow-400', 'text-black', 'JS');
  }
  if (lang.includes('python')) {
    return createIcon('bg-blue-500', 'text-white', 'PY');
  }
  if (lang.includes('java')) {
    return createIcon('bg-red-500', 'text-white', 'JAVA');
  }
  if (lang.includes('c#') || lang.includes('csharp')) {
    return createIcon('bg-purple-500', 'text-white', 'C#');
  }
  if (lang.includes('go')) {
    return createIcon('bg-cyan-500', 'text-white', 'GO');
  }
  if (lang.includes('rust')) {
    return createIcon('bg-orange-600', 'text-white', 'RUST');
  }
  if (lang.includes('php')) {
    return createIcon('bg-indigo-500', 'text-white', 'PHP');
  }

  // Default icon
  return createIcon('bg-gray-500', 'text-white', 'APP', true, 'M13 2.05v2.02c4.39.54 7.5 4.53 6.96 8.92-.39 3.18-2.34 5.97-5.35 7.47l.7 1.87c4.3-1.92 7.07-6.23 6.58-10.94C21.24 6.25 17.57 2.05 13 2.05z');
};

// Workflow desktop icons
const getWorkflowIcon = (workflow: WorkflowItem, iconData?: string): React.ReactNode => {
  // If we have custom icon data, use IconDisplay with custom styling
  if (iconData) {
    return (
      <div className="w-16 h-16 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer border-2 border-gray-200 dark:border-gray-600 overflow-hidden">
        <IconDisplay
          iconData={iconData}
          entityType="workflow"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  // Fallback to generated icons for workflows without custom icons
  const { status, nodeCount, hasUIComponents } = workflow;
  
  // Create icon based on workflow properties
  const createIcon = (bgColor: string, textColor: string, iconText: string, useBuiltInIcon?: boolean, builtInIconPath?: string) => (
    <div className={`w-16 h-16 ${bgColor} rounded-lg flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer border-2 border-gray-200 dark:border-gray-600`}>
      {useBuiltInIcon && builtInIconPath ? (
        <svg className={`w-8 h-8 ${textColor}`} fill="currentColor" viewBox="0 0 24 24">
          <path d={builtInIconPath} />
        </svg>
      ) : (
        <div className={`${textColor} font-bold text-sm text-center`}>
          <div>{iconText}</div>
          {nodeCount > 0 && (
            <div className="text-xs mt-1">{nodeCount} nodes</div>
          )}
        </div>
      )}
    </div>
  );

  // Color based on status - handle both string and numeric status values
  const statusString = typeof status === 'string' ? status : String(status || '');
  const statusLower = statusString.toLowerCase();
  
  // Map numeric workflow status values to string equivalents
  const getStatusName = (statusValue: string): string => {
    switch (statusValue) {
      case '0': return 'draft';
      case '1': return 'active';
      case '2': return 'published'; 
      case '3': return 'archived';
      case '4': return 'deleted';
      default: return statusValue.toLowerCase();
    }
  };
  
  const mappedStatus = getStatusName(statusLower);
  
  if (mappedStatus === 'published' || mappedStatus === 'active') {
    return createIcon('bg-green-500', 'text-white', 'WF', true, 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z M4 6h16v2H4zm4 5h8v6H8v-6z');
  } else if (mappedStatus === 'draft') {
    return createIcon('bg-yellow-500', 'text-white', 'WF', true, 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z M4 6h16v2H4zm4 5h8v6H8v-6z');
  } else if (hasUIComponents) {
    return createIcon('bg-blue-500', 'text-white', 'WF', true, 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10');
  } else {
    return createIcon('bg-purple-500', 'text-white', 'WF', true, 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z');
  }
};

// Remote app icon generation
const getRemoteAppIcon = (app: RemoteAppItem, iconData?: string): React.ReactNode => {
  // If we have custom icon data, use IconDisplay with custom styling
  if (iconData) {
    return (
      <div className="w-16 h-16 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer border-2 border-gray-200 dark:border-gray-600 overflow-hidden relative">
        <IconDisplay
          iconData={iconData}
          entityType="remoteapp"
          className="w-full h-full object-cover"
        />
        {/* Public/Private indicator overlay for custom icons */}
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
          {app.isPublic ? (
            <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
            </svg>
          ) : (
            <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
            </svg>
          )}
        </div>
      </div>
    );
  }

  // Fallback to generated icons for remote apps without custom icons
  const getStatusColor = () => {
    switch (app.status.toLowerCase()) {
      case 'active':
        return 'bg-green-500';
      case 'maintenance':
        return 'bg-yellow-500';
      case 'inactive':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className={`w-16 h-16 ${getStatusColor()} rounded-lg flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer border-2 border-gray-200 dark:border-gray-600 relative`}>
      {/* Globe/External link icon for remote apps */}
      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
      </svg>
      
      {/* Public/Private indicator */}
      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
        {app.isPublic ? (
          <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
          </svg>
        ) : (
          <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
          </svg>
        )}
      </div>
    </div>
  );
};

// Helper function to check if workflow can be executed
const canExecuteWorkflow = (status?: string | number): boolean => {
  const statusString = typeof status === 'string' ? status : String(status || '');
  const statusLower = statusString.toLowerCase();
  
  // Map numeric workflow status values to string equivalents
  const getStatusName = (statusValue: string): string => {
    switch (statusValue) {
      case '0': return 'draft';
      case '1': return 'active';
      case '2': return 'published'; 
      case '3': return 'archived';
      case '4': return 'deleted';
      default: return statusValue.toLowerCase();
    }
  };
  
  const mappedStatus = getStatusName(statusLower);
  return mappedStatus === 'published' || mappedStatus === 'active';
};

const getStatusColor = (status?: string | number): string => {
  // Handle both string and numeric status values
  const statusString = typeof status === 'string' ? status : String(status || '');
  const statusLower = statusString.toLowerCase();
  
  // Map numeric workflow status values to string equivalents
  const getStatusName = (statusValue: string): string => {
    switch (statusValue) {
      case '0': return 'draft';
      case '1': return 'active';
      case '2': return 'published'; 
      case '3': return 'archived';
      case '4': return 'deleted';
      default: return statusValue.toLowerCase();
    }
  };
  
  const mappedStatus = getStatusName(statusLower);
  
  switch (mappedStatus) {
    case 'running':
      return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30';
    case 'completed':
      return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
    case 'failed':
      return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
    case 'pending':
      return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
    default:
      return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800';
  }
};

const formatRelativeTime = (date: Date): string => {
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

const ExecutionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // State management
  const [programs, setPrograms] = useState<ProgramItem[]>([]);
  const [workflows, setWorkflows] = useState<WorkflowItem[]>([]);
  const [remoteApps, setRemoteApps] = useState<RemoteAppItem[]>([]);
  const [executions, setExecutions] = useState<ExecutionItem[]>([]);
  const [isLoadingPrograms, setIsLoadingPrograms] = useState(true);
  const [isLoadingWorkflows, setIsLoadingWorkflows] = useState(true);
  const [isLoadingRemoteApps, setIsLoadingRemoteApps] = useState(true);
  const [isLoadingExecutions, setIsLoadingExecutions] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Icons state
  const [programIcons, setProgramIcons] = useState<Map<string, string>>(new Map());
  const [workflowIcons, setWorkflowIcons] = useState<Map<string, string>>(new Map());
  const [remoteAppIcons, setRemoteAppIcons] = useState<Map<string, string>>(new Map());
  
  // View state with separate tabs
  const [view, setView] = useState<'programs' | 'workflows' | 'remoteapps' | 'executions'>('programs');
  
  // Search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [executionTypeFilter, setExecutionTypeFilter] = useState<'all' | 'programs' | 'workflows'>('all');
  
  // Execution modal
  const [executeModal, setExecuteModal] = useState<ExecuteModalState>({
    isOpen: false,
    program: null,
    workflow: null,
    isExecuting: false,
    componentElements: null,
    executionType: 'program'
  });

  // Context menu state
  const [contextMenu, setContextMenu] = useState<MenuState>({
    isOpen: false,
    itemId: null,
    itemType: 'program',
    position: { x: 0, y: 0 }
  });

  // Load data on component mount
  useEffect(() => {
    loadPrograms();
    loadWorkflows();
    loadRemoteApps();
    loadRecentExecutions();
    
    // Check if there's a program to execute from URL params
    const executeParam = searchParams.get('execute');
    if (executeParam) {
      // Find and execute the program
      handleQuickExecute(executeParam);
    }
  }, [searchParams]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contextMenu.isOpen) {
        const target = event.target as HTMLElement;
        // Don't close if clicking on the menu itself
        if (!target.closest('[data-menu="context"]')) {
          setContextMenu({ isOpen: false, itemId: null, itemType: 'program', position: { x: 0, y: 0 } });
        }
      }
    };

    if (contextMenu.isOpen) {
      // Use a slight delay to prevent immediate closing
      const timer = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 100);
      
      return () => {
        clearTimeout(timer);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [contextMenu.isOpen]);

  const loadPrograms = async () => {
    try {
      setIsLoadingPrograms(true);
      setError(null);

      const response = await api.programs.programs_GetUserAccessiblePrograms(
        1,
        100, // Load more programs for desktop view
        'Name',
        SortDirection._0
      );

      if (response.success && response.data) {
        const programItems: ProgramItem[] = response.data.items?.map(program => ({
          id: program.id || '',
          name: program.name || 'Untitled Program',
          description: program.description,
          language: program.language || 'Unknown',
          type: program.type || 'Unknown',
          status: program.status || 'unknown',
          versionCount: program.versionCount || 0,
          hasVersions: program.hasVersions || false,
          currentVersion: program.currentVersion,
          newestComponent: program.newestComponentType ? {
            id: '',
            name: 'Latest Component',
            type: program.newestComponentType,
            status: 'active',
            programId: program.id || '',
            versionId: program.currentVersion?.id || '',
            createdDate: new Date()
          } : null,
          componentCount: program.componentCount || 0,
          hasComponents: program.hasComponents || false,
          newestComponentType: program.newestComponentType
        })) || [];

        setPrograms(programItems);
        
        // Load icons for all programs
        await loadProgramIcons(programItems);
      } else {
        setError(response.message || 'Failed to load programs');
      }
    } catch (error) {
      console.error('Failed to load programs:', error);
      setError('Failed to load programs. Please try again.');
    } finally {
      setIsLoadingPrograms(false);
    }
  };

  const loadWorkflows = async () => {
    try {
      setIsLoadingWorkflows(true);
      setError(null);

      const response = await api.workflows.workflows_GetAll(
        1,
        100, // Load more workflows for desktop view
        'Name',
        SortDirection._0
      );

      if (response.success && response.data) {
        const workflowItems: WorkflowItem[] = response.data.items?.map((workflow: any) => ({
          id: workflow.id || '',
          name: workflow.name || 'Untitled Workflow',
          description: workflow.description,
          status: workflow.status, // Keep original type (number or string)
          version: workflow.version,
          nodeCount: workflow.nodeCount || 0,
          hasUIComponents: false, // Will be populated by UI component check
          createdAt: workflow.createdAt,
          updatedAt: workflow.updatedAt
        })) || [];

        // Check for UI components in workflow nodes
        const workflowsWithUIComponents = await Promise.all(
          workflowItems.map(async (workflow) => {
            try {
              // Get workflow details to check nodes for UI components
              const detailResponse = await api.workflows.workflows_GetById(workflow.id);
              if (detailResponse.success && detailResponse.data && detailResponse.data.nodes) {
                // Check if any node has UI components
                const nodePromises = detailResponse.data.nodes.map(async (node) => {
                  if (!node.programId) return false;
                  try {
                    const uiResponse = await api.uiComponents.uiComponents_GetByProgram(
                      node.programId,
                      1,
                      1,
                      'id',
                      undefined
                    );
                    return !!(uiResponse.success && uiResponse.data?.items && uiResponse.data.items.length > 0);
                  } catch {
                    return false;
                  }
                });
                
                const hasUIResults = await Promise.all(nodePromises);
                const hasUIComponents = hasUIResults.some(result => result);
                
                return {
                  ...workflow,
                  hasUIComponents
                };
              }
              return workflow;
            } catch {
              return workflow;
            }
          })
        );

        setWorkflows(workflowsWithUIComponents);
        
        // Load icons for all workflows
        await loadWorkflowIcons(workflowsWithUIComponents);
      } else {
        setError(response.message || 'Failed to load workflows');
      }
    } catch (error) {
      console.error('Failed to load workflows:', error);
      setError('Failed to load workflows. Please try again.');
    } finally {
      setIsLoadingWorkflows(false);
    }
  };

  const loadRemoteApps = async () => {
    try {
      setIsLoadingRemoteApps(true);
      setError(null);

      const response = await api.remoteAppsClient.remoteApps_GetUserAccessibleApps(
        1,
        100, // Load more remote apps for desktop view
        'Name',
        SortDirection._0
      );

      if (response.success && response.data) {
        const remoteAppItems: RemoteAppItem[] = response.data.items?.map(app => ({
          id: app.id || '',
          name: app.name || 'Untitled App',
          description: app.description,
          url: app.url || '',
          status: app.status || 'active',
          isPublic: app.isPublic || false,
          creator: app.creator || '',
          createdAt: app.createdAt || new Date()
        })) || [];

        setRemoteApps(remoteAppItems);
        
        // Load icons for all remote apps
        await loadRemoteAppIcons(remoteAppItems);
      } else {
        setError(response.message || 'Failed to load remote apps');
      }
    } catch (error) {
      console.error('Failed to load remote apps:', error);
      setError('Failed to load remote apps. Please try again.');
    } finally {
      setIsLoadingRemoteApps(false);
    }
  };

  const loadProgramIcons = async (programItems: ProgramItem[]) => {
    if (programItems.length === 0) return;
    
    try {
      // Create batch request with entity IDs
      const entityIds = programItems.map(program => program.id);
      
      const iconBatchRequest = {
        entityType: IconEntityType.Program,
        entityIds: entityIds
      };

      const iconsResponse = await api.iconsClient.icons_GetIconsByEntityIds(iconBatchRequest);
      
      if (iconsResponse.success && iconsResponse.data) {
        const newIcons = new Map<string, string>();
        iconsResponse.data.forEach(icon => {
          if (icon.entityId && icon.iconData) {
            newIcons.set(icon.entityId, icon.iconData);
          }
        });
        setProgramIcons(newIcons);
      }
    } catch (error) {
      console.error('Failed to load program icons:', error);
      // Don't show error to user for icons, just log it
    }
  };

  const loadWorkflowIcons = async (workflowItems: WorkflowItem[]) => {
    if (workflowItems.length === 0) return;
    
    try {
      // Create batch request with entity IDs
      const entityIds = workflowItems.map(workflow => workflow.id);
      
      const iconBatchRequest = {
        entityType: IconEntityType.Workflow,
        entityIds: entityIds
      };

      const iconsResponse = await api.iconsClient.icons_GetIconsByEntityIds(iconBatchRequest);
      
      if (iconsResponse.success && iconsResponse.data) {
        const newIcons = new Map<string, string>();
        iconsResponse.data.forEach(icon => {
          if (icon.entityId && icon.iconData) {
            newIcons.set(icon.entityId, icon.iconData);
          }
        });
        setWorkflowIcons(newIcons);
      }
    } catch (error) {
      console.error('Failed to load workflow icons:', error);
      // Don't show error to user for icons, just log it
    }
  };

  const loadRemoteAppIcons = async (remoteAppItems: RemoteAppItem[]) => {
    if (remoteAppItems.length === 0) return;
    
    try {
      // Create batch request with entity IDs
      const entityIds = remoteAppItems.map(app => app.id);
      
      const iconBatchRequest = {
        entityType: IconEntityType.RemoteApp,
        entityIds: entityIds
      };

      const iconsResponse = await api.iconsClient.icons_GetIconsByEntityIds(iconBatchRequest);
      
      if (iconsResponse.success && iconsResponse.data) {
        const newIcons = new Map<string, string>();
        iconsResponse.data.forEach(icon => {
          if (icon.entityId && icon.iconData) {
            newIcons.set(icon.entityId, icon.iconData);
          }
        });
        setRemoteAppIcons(newIcons);
      }
    } catch (error) {
      console.error('Failed to load remote app icons:', error);
      // Don't show error to user for icons, just log it
    }
  };

  const loadRecentExecutions = async () => {
    try {
      setIsLoadingExecutions(true);
      
      // Load program executions
      const programExecutionsResponse = await api.executions.executions_GetRecentExecutions(20);
      
      // Load workflow executions from execution history
      const workflowExecutions: ExecutionItem[] = [];
      
      // Get execution history for each workflow
      for (const workflow of workflows) {
        try {
          const historyResponse = await api.workflows.workflows_GetExecutionHistory(workflow.id, 10);
          if (historyResponse.success && historyResponse.data) {
            const workflowExecs: ExecutionItem[] = historyResponse.data.map(execution => ({
              id: execution.id || '',
              programId: undefined,
              programName: undefined,
              workflowId: workflow.id,
              workflowName: workflow.name,
              status: String(execution.status || 'unknown'),
              startedAt: execution.startedAt || new Date(),
              completedAt: execution.completedAt,
              userId: execution.executedBy || '',
              executionType: 'workflow',
              itemType: 'workflow'
            }));
            workflowExecutions.push(...workflowExecs);
          }
        } catch (error) {
          console.error(`Failed to load execution history for workflow ${workflow.id}:`, error);
        }
      }
      
      const allExecutions: ExecutionItem[] = [];
      
      // Process program executions
      if (programExecutionsResponse.success && programExecutionsResponse.data) {
        const programExecutions: ExecutionItem[] = programExecutionsResponse.data.map(execution => ({
          id: execution.id || '',
          programId: execution.programId || '',
          programName: execution.programName || 'Unknown Program',
          workflowId: undefined,
          workflowName: undefined,
          status: execution.status || 'unknown',
          startedAt: execution.startedAt || new Date(),
          completedAt: execution.completedAt,
          userId: execution.userId || '',
          executionType: execution.executionType || 'standard',
          itemType: 'program'
        }));
        allExecutions.push(...programExecutions);
      }
      
      // Add workflow executions to all executions
      allExecutions.push(...workflowExecutions);
      
      // Sort all executions by start time (most recent first)
      allExecutions.sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());
      
      setExecutions(allExecutions);
    } catch (error) {
      console.error('Failed to load executions:', error);
    } finally {
      setIsLoadingExecutions(false);
    }
  };


  const handleQuickExecute = async (itemId: string, itemType?: 'program' | 'workflow') => {
    if (!itemType) {
      // Try to find in programs first, then workflows
      const program = programs.find(p => p.id === itemId);
      if (program) {
        if (program.hasVersions) {
          await handleExecuteProgram(program);
        }
        return;
      }
      
      const workflow = workflows.find(w => w.id === itemId);
      if (workflow) {
        await handleExecuteWorkflow(workflow);
      }
    } else if (itemType === 'program') {
      const program = programs.find(p => p.id === itemId);
      if (program && program.hasVersions) {
        await handleExecuteProgram(program);
      }
    } else if (itemType === 'workflow') {
      const workflow = workflows.find(w => w.id === itemId);
      if (workflow) {
        await handleExecuteWorkflow(workflow);
      }
    }
  };

  const loadComponentConfiguration = async (programId: string, versionId: string): Promise<UIElement[] | null> => {
    try {
      
      // First, get the component list to find the component ID
      const listResponse = await api.uiComponents.uiComponents_GetByProgram(
        programId,
        1,
        10,
        'CreatedDate',
        SortDirection._1 // Get newest first
      );

      if (listResponse.success && listResponse.data?.items && listResponse.data.items.length > 0) {
        // Find the first active component, or fall back to the newest
        const activeComponent = listResponse.data.items.find(c => c.status === 'active');
        const component = activeComponent || listResponse.data.items[0];
        
        // Try to get the component by ID to get full details
        try {
          if (!component.id) {
            console.error('Component ID is missing');
            return null;
          }
          
          const detailResponse = await api.uiComponents.uiComponents_GetById(component.id);
          
          if (detailResponse.success && detailResponse.data) {
            const fullComponent = detailResponse.data;
            if (fullComponent.configuration) {
              try {
                let schema: ComponentSchema;
                
                // Check if configuration is already an object or a JSON string
                if (typeof fullComponent.configuration === 'string') {
                  schema = JSON.parse(fullComponent.configuration);
                } else {
                  schema = fullComponent.configuration as ComponentSchema;
                }
                return schema.elements || [];
              } catch (error) {
                console.error('Failed to process component configuration:', error);
                console.error('Configuration data:', fullComponent.configuration);
                return null;
              }
            }
          }
        } catch (detailError) {
          console.error('Failed to fetch component details:', detailError);
        }
        
        return null;
      }
      return null;
    } catch (error) {
      console.error('Failed to load component configuration:', error);
      return null;
    }
  };

  const handleExecuteProgram = async (program: ProgramItem) => {
    if (!program.hasVersions) {
      setError('Cannot execute program: No versions available');
      return;
    }

    // Load component configuration if available
    let componentElements: UIElement[] | null = null;
    if (program.hasComponents && program.newestComponent) {
      componentElements = await loadComponentConfiguration(program.id, program.newestComponent.versionId);
    }

    setExecuteModal({
      isOpen: true,
      program,
      workflow: null,
      isExecuting: false,
      componentElements,
      executionType: 'program'
    });
  };

  const handleWorkflowDoubleClick = async (workflow: WorkflowItem) => {
    // Execute workflow immediately on double-click and navigate to execution page
    if (!canExecuteWorkflow(workflow.status)) {
      setError('Cannot execute workflow: Workflow must be published');
      return;
    }

    try {
      const workflowExecutionRequest = new WorkflowExecutionRequest({
        workflowId: workflow.id
      });

      const response = await api.workflows.workflows_Execute(
        workflow.id,
        workflowExecutionRequest
      );

      if (response.success && response.data?.id) {
        // Navigate directly to the new execution
        navigate(`/workflows/${workflow.id}/execution/${response.data.id}`);
      } else {
        setError(response.message || 'Failed to execute workflow');
      }
    } catch (error) {
      console.error('Failed to execute workflow:', error);
      setError('Failed to execute workflow. Please try again.');
    }
  };

  const handleRemoteAppDoubleClick = async (app: RemoteAppItem) => {
    try {
      // Use the SSO-aware launch method which returns the redirect URL
      const response = await api.remoteAppsClient.remoteApps_Launch(app.id);
      
      if (response.success && response.data?.redirectUrl) {
        // Open the redirect URL returned by the API
        secureSsoRedirect(response.data.redirectUrl);
      } else {
        throw new Error(response.message || 'No redirect URL provided');
      }
    } catch (error) {
      console.error('Failed to launch remote app:', error);
      // Fallback to direct URL opening if the API call fails
      if (app.url) {
        window.open(app.url, '_blank', 'noopener,noreferrer');
      }
    }
  };

  const handleExecuteWorkflow = async (workflow: WorkflowItem) => {
    if (!canExecuteWorkflow(workflow.status)) {
      setError('Cannot execute workflow: Workflow must be published');
      return;
    }

    setExecuteModal({
      isOpen: true,
      program: null,
      workflow,
      isExecuting: false,
      componentElements: null,
      executionType: 'workflow'
    });
  };

  const handleMenuClick = (event: React.MouseEvent, itemId: string, itemType: 'program' | 'workflow' | 'remoteapp') => {
    event.preventDefault();
    event.stopPropagation();
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    
    setContextMenu({
      isOpen: true,
      itemId,
      itemType,
      position: {
        x: rect.right + 8,
        y: rect.top
      }
    });
  };

  const confirmExecution = async (parameters: Record<string, any> = {}) => {
    if (!executeModal.program && !executeModal.workflow) return;
    
    try {
      setExecuteModal(prev => ({ ...prev, isExecuting: true }));
      
      if (executeModal.executionType === 'program' && executeModal.program) {
        // Execute program
        const executionRequest = new ProgramExecutionRequestDto({
          parameters: parameters,
          environment: {},
          resourceLimits: new ExecutionResourceLimitsDto({
            maxMemoryMb: 512,
            maxCpuPercentage: 50,
            maxExecutionTimeMinutes: 30
          })
        });

        const response = await api.executions.executions_ExecuteProgram(
          executeModal.program.id,
          executionRequest
        );

        if (response.success) {
          // Close modal and refresh executions
          setExecuteModal({ isOpen: false, program: null, workflow: null, isExecuting: false, componentElements: null, executionType: 'program' });
          setView('executions');
          loadRecentExecutions();
          
          // Navigate to execution detail
          if (response.data?.id) {
            navigate(`/apps/${response.data.id}`);
          }
        } else {
          setError(response.message || 'Failed to execute program');
        }
      } else if (executeModal.executionType === 'workflow' && executeModal.workflow) {
        // Execute workflow
        const workflowExecutionRequest = new WorkflowExecutionRequest({
          workflowId: executeModal.workflow.id
        });

        const response = await api.workflows.workflows_Execute(
          executeModal.workflow.id,
          workflowExecutionRequest
        );

        if (response.success) {
          // Close modal and refresh executions
          setExecuteModal({ isOpen: false, program: null, workflow: null, isExecuting: false, componentElements: null, executionType: 'workflow' });
          setView('executions');
          loadRecentExecutions();
          
          // Navigate to workflow execution detail
          if (response.data?.id) {
            navigate(`/workflows/${executeModal.workflow.id}/execution/${response.data.id}`);
          }
        } else {
          setError(response.message || 'Failed to execute workflow');
        }
      }
    } catch (error) {
      console.error('Failed to execute:', error);
      setError(`Failed to execute ${executeModal.executionType}. Please try again.`);
    } finally {
      setExecuteModal(prev => ({ ...prev, isExecuting: false }));
    }
  };

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = !searchTerm || 
      program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLanguage = !languageFilter || 
      program.language.toLowerCase().includes(languageFilter.toLowerCase());
    
    const matchesType = !typeFilter || 
      program.type.toLowerCase().includes(typeFilter.toLowerCase());
    
    return matchesSearch && matchesLanguage && matchesType;
  });

  const filteredWorkflows = workflows.filter(workflow => {
    const matchesSearch = !searchTerm || 
      workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workflow.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const filteredRemoteApps = remoteApps.filter(app => {
    const matchesSearch = !searchTerm || 
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const filteredExecutions = executions.filter(execution => {
    const matchesSearch = !searchTerm || 
      (execution.programName && execution.programName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (execution.workflowName && execution.workflowName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesExecutionType = executionTypeFilter === 'all' ||
      (executionTypeFilter === 'programs' && execution.itemType === 'program') ||
      (executionTypeFilter === 'workflows' && execution.itemType === 'workflow');
    
    return matchesSearch && matchesExecutionType;
  });

  if ((isLoadingPrograms || isLoadingWorkflows || isLoadingRemoteApps) && programs.length === 0 && workflows.length === 0 && remoteApps.length === 0) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Tab Navigation */}
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow rounded-lg border border-gray-200/50 dark:border-gray-700/50">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            <button
              onClick={() => setView('programs')}
              className={`${
                view === 'programs'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
              </svg>
              <span>Programs</span>
              <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 py-0.5 px-2 rounded-full text-xs">
                {filteredPrograms.length}
              </span>
            </button>
            <button
              onClick={() => setView('workflows')}
              className={`${
                view === 'workflows'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <span>Workflows</span>
              <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 py-0.5 px-2 rounded-full text-xs">
                {filteredWorkflows.length}
              </span>
            </button>
            <button
              onClick={() => setView('remoteapps')}
              className={`${
                view === 'remoteapps'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 0L9 21m0-18l3 3m-3-3l3 3" />
              </svg>
              <span>Remote Apps</span>
              <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 py-0.5 px-2 rounded-full text-xs">
                {filteredRemoteApps.length}
              </span>
            </button>
            <button
              onClick={() => setView('executions')}
              className={`${
                view === 'executions'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2m0-8V5a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2H9m0 0v2a2 2 0 002 2h2a2 2 0 002-2v-2M9 5v2a2 2 0 002 2h2a2 2 0 002-2V5" />
              </svg>
              <span>Executions</span>
              <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 py-0.5 px-2 rounded-full text-xs">
                {filteredExecutions.length}
              </span>
            </button>
          </nav>
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
                onClick={() => setError(null)}
                className="text-sm text-red-800 dark:text-red-200 hover:text-red-600 dark:hover:text-red-300"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {view === 'programs' && (
        <>
          {/* Desktop Icons Grid */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-200/50 dark:border-gray-700/50 p-6 min-h-96">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
              {filteredPrograms.map((program) => (
                <div
                  key={program.id}
                  className="flex flex-col items-center space-y-2 group relative"
                  onDoubleClick={() => handleExecuteProgram(program)}
                >
                  <div className="relative" title={program.description || program.name}>
                    {getDesktopIcon(program, programIcons.get(program.id))}
                    
                    {/* Three dots menu button */}
                    <button
                      onClick={(e) => handleMenuClick(e, program.id, 'program')}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50 dark:hover:bg-gray-700 z-10"
                    >
                      <svg className="w-3 h-3 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                    
                    {/* Status indicator */}
                    {program.status === 'active' && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                    )}
                    
                    {!program.hasVersions && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                        <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                    
                    {/* Component indicator */}
                    {program.hasComponents && program.newestComponent && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                        {program.newestComponent.type === 'input_form' && (
                          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                        {program.newestComponent.type === 'visualization' && (
                          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z M4 5a2 2 0 012-2v6a2 2 0 01-2 2 2 2 0 01-2-2V5z M16 7a2 2 0 11-4 0 2 2 0 014 0z M8 15a2 2 0 01-2-2V9a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2H8z" />
                          </svg>
                        )}
                        {program.newestComponent.type === 'composite' && (
                          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5z M5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5z M11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5z M11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                          </svg>
                        )}
                        {!['input_form', 'visualization', 'composite'].includes(program.newestComponent.type) && (
                          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7z M4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1z M2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                          </svg>
                        )}
                      </div>
                    )}
                    
                    {/* Component status indicator */}
                    {program.hasComponents && program.newestComponent && (
                      <div className={`absolute -top-1 -left-1 w-3 h-3 rounded-full border border-white dark:border-gray-800 ${
                        program.newestComponent.status === 'active' ? 'bg-green-500' : 
                        program.newestComponent.status === 'draft' ? 'bg-yellow-500' : 
                        'bg-gray-500'
                      }`}></div>
                    )}
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-20" title={program.name}>
                      {program.name}
                    </p>
                    {program.hasComponents && program.newestComponent ? (
                      <p className="text-xs text-blue-600 dark:text-blue-400 truncate max-w-20" title={program.newestComponent.name}>
                        {program.newestComponent.name}
                      </p>
                    ) : (
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-20" title={program.language}>
                        {program.language}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Empty State */}
            {filteredPrograms.length === 0 && !isLoadingPrograms && (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No programs found</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {searchTerm || languageFilter || typeFilter ? 'Try adjusting your search criteria.' : 'Create some programs to see them here.'}
                </p>
                {!searchTerm && !languageFilter && !typeFilter && (
                  <div className="mt-6">
                    <Button
                      variant="primary"
                      onClick={() => navigate('/projects/create')}
                      leftIcon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      }
                    >
                      Create Your First Program
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}

      {view === 'workflows' && (
        <>
          {/* Workflow Icons Grid */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-200/50 dark:border-gray-700/50 p-6 min-h-96">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
              {filteredWorkflows.map((workflow) => (
                <div
                  key={workflow.id}
                  className="flex flex-col items-center space-y-2 group relative"
                  onDoubleClick={() => handleWorkflowDoubleClick(workflow)}
                >
                  <div className="relative" title={workflow.description || workflow.name}>
                    {getWorkflowIcon(workflow, workflowIcons.get(workflow.id))}
                    
                    {/* Three dots menu button */}
                    <button
                      onClick={(e) => handleMenuClick(e, workflow.id, 'workflow')}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50 dark:hover:bg-gray-700 z-10"
                    >
                      <svg className="w-3 h-3 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                    
                    {/* Status indicator */}
                    {workflow.status === 'published' && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                    )}
                    
                    {workflow.status === 'draft' && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                    )}
                    
                    {/* UI Components indicator */}
                    {workflow.hasUIComponents && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-20" title={workflow.name}>
                      {workflow.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-20" title={`${workflow.nodeCount} nodes`}>
                      {workflow.nodeCount} nodes
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Empty State */}
            {filteredWorkflows.length === 0 && !isLoadingWorkflows && (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No workflows found</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {searchTerm ? 'Try adjusting your search criteria.' : 'Create some workflows to see them here.'}
                </p>
                {!searchTerm && (
                  <div className="mt-6">
                    <Button
                      variant="primary"
                      onClick={() => navigate('/workflows/create')}
                      leftIcon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      }
                    >
                      Create Your First Workflow
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}

      {view === 'remoteapps' && (
        <>
          {/* Remote Apps Icons Grid */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-200/50 dark:border-gray-700/50 p-6 min-h-96">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
              {filteredRemoteApps.map((app) => (
                <div
                  key={app.id}
                  className="flex flex-col items-center space-y-2 group relative"
                  onDoubleClick={() => handleRemoteAppDoubleClick(app)}
                >
                  <div className="relative" title={app.description || app.name}>
                    {getRemoteAppIcon(app, remoteAppIcons.get(app.id))}
                    
                    {/* Three dots menu button */}
                    <button
                      onClick={(e) => handleMenuClick(e, app.id, 'remoteapp')}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50 dark:hover:bg-gray-700 z-10"
                    >
                      <svg className="w-3 h-3 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                    
                    {/* Status indicator (already included in the icon) */}
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-20" title={app.name}>
                      {app.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-20" title={app.isPublic ? 'Public' : 'Private'}>
                      {app.isPublic ? 'Public' : 'Private'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Empty State */}
            {filteredRemoteApps.length === 0 && !isLoadingRemoteApps && (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 0L9 21m0-18l3 3m-3-3l3 3" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No remote apps found</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {searchTerm ? 'Try adjusting your search criteria.' : 'Create some remote apps to see them here.'}
                </p>
                {!searchTerm && (
                  <div className="mt-6">
                    <Button
                      variant="primary"
                      onClick={() => navigate('/remoteapps/create')}
                      leftIcon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      }
                    >
                      Create Your First Remote App
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}

      {view === 'executions' && (
        <>
          {/* Execution Filters */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow rounded-lg border border-gray-200/50 dark:border-gray-700/50 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Search executions"
                placeholder="Search by name..."
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
                  Execution Type
                </label>
                <select
                  value={executionTypeFilter}
                  onChange={(e) => setExecutionTypeFilter(e.target.value as 'all' | 'programs' | 'workflows')}
                  className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="all">All Executions</option>
                  <option value="programs">Program Executions</option>
                  <option value="workflows">Workflow Executions</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow rounded-lg border border-gray-200/50 dark:border-gray-700/50">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Executions</h2>
            </div>
            
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredExecutions.map((execution) => (
                <div key={execution.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {execution.itemType === 'program' ? (
                          <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                          </svg>
                        ) : (
                          <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {execution.programName || execution.workflowName}
                          </p>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${execution.itemType === 'program' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'}`}>
                            {execution.itemType === 'program' ? 'Program' : 'Workflow'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {formatRelativeTime(execution.startedAt)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(execution.status)}`}>
                        {execution.status}
                      </span>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (execution.itemType === 'program') {
                            navigate(`/apps/${execution.id}`);
                          } else {
                            navigate(`/workflows/${execution.workflowId}/executions/${execution.id}`);
                          }
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredExecutions.length === 0 && !isLoadingExecutions && (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2m0-8V5a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2H9m0 0v2a2 2 0 002 2h2a2 2 0 002-2v-2M9 5v2a2 2 0 002 2h2a2 2 0 002-2V5" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No executions found</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {searchTerm || executionTypeFilter !== 'all' ? 'Try adjusting your search criteria.' : 'Start executing programs and workflows to see the history here.'}
                </p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Global Context Menu */}
      {contextMenu.isOpen && (
        <div
          data-menu="context"
          className="fixed bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50"
          style={{
            left: `${contextMenu.position.x}px`,
            top: `${contextMenu.position.y}px`
          }}
        >
          {(() => {
            if (contextMenu.itemType === 'program') {
              const program = programs.find(p => p.id === contextMenu.itemId);
              if (!program) return null;
              
              return (
                <>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleExecuteProgram(program);
                      setContextMenu({ isOpen: false, itemId: null, itemType: 'program', position: { x: 0, y: 0 } });
                    }}
                    disabled={!program.hasVersions}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h6m2 5H7a2 2 0 01-2-2V8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2z" />
                    </svg>
                    <span>Execute Program</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      navigate(`/projects/${program.id}`);
                      setContextMenu({ isOpen: false, itemId: null, itemType: 'program', position: { x: 0, y: 0 } });
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Program Details</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      navigate(`/editor/${program.id}`, {
                        state: { mode: 'edit' }
                      });
                      setContextMenu({ isOpen: false, itemId: null, itemType: 'program', position: { x: 0, y: 0 } });
                    }}
                    disabled={!program.hasVersions}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    <span>Edit Code</span>
                </button>
                
                {/* Component Options */}
                {program.hasComponents && program.newestComponent && (
                  <>
                    <div className="border-t border-gray-200 dark:border-gray-600 my-1"></div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleExecuteProgram(program); // This will automatically use the component form
                        setContextMenu({ isOpen: false, itemId: null, itemType: 'program', position: { x: 0, y: 0 } });
                      }}
                      disabled={program.newestComponent.status !== 'active'}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h6m2 5H7a2 2 0 01-2-2V8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2z" />
                      </svg>
                      <span>Launch Component</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        navigate(`/projects/${program.id}/components`);
                        setContextMenu({ isOpen: false, itemId: null, itemType: 'program', position: { x: 0, y: 0 } });
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      <span>View All Components</span>
                    </button>
                  </>
                )}
                
                {!program.hasComponents && (
                  <>
                    <div className="border-t border-gray-200 dark:border-gray-600 my-1"></div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        navigate(`/projects/${program.id}/components/create`);
                        setContextMenu({ isOpen: false, itemId: null, itemType: 'program', position: { x: 0, y: 0 } });
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span>Create Component</span>
                    </button>
                  </>
                )}
              </>
              );
            } else if (contextMenu.itemType === 'workflow') {
              const workflow = workflows.find(w => w.id === contextMenu.itemId);
              if (!workflow) return null;
              
              return (
                <>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleExecuteWorkflow(workflow);
                      setContextMenu({ isOpen: false, itemId: null, itemType: 'workflow', position: { x: 0, y: 0 } });
                    }}
                    disabled={!canExecuteWorkflow(workflow.status)}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h6m2 5H7a2 2 0 01-2-2V8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2z" />
                    </svg>
                    <span>Execute Workflow</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      navigate(`/workflows/${workflow.id}`);
                      setContextMenu({ isOpen: false, itemId: null, itemType: 'workflow', position: { x: 0, y: 0 } });
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Workflow Details</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      navigate(`/workflows/${workflow.id}/designer`);
                      setContextMenu({ isOpen: false, itemId: null, itemType: 'workflow', position: { x: 0, y: 0 } });
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    <span>Edit Workflow</span>
                  </button>
                </>
              );
            }
            return null;
          })()}
        </div>
      )}

      {/* Execute Modal */}
      {executeModal.isOpen && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-70 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div className="relative p-8 border w-full max-w-6xl shadow-2xl rounded-2xl bg-white dark:bg-gray-900">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Execute {executeModal.program?.name || executeModal.workflow?.name}
              </h3>
              <button
          onClick={() => setExecuteModal({ isOpen: false, program: null, workflow: null, isExecuting: false, componentElements: null, executionType: 'program' })}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          disabled={executeModal.isExecuting}
              >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
              </button>
            </div>
            
            <div className="max-h-[44rem] overflow-y-auto">
              {executeModal.componentElements && executeModal.componentElements.length > 0 ? (
          <ComponentForm
            elements={executeModal.componentElements}
            onSubmit={confirmExecution}
            onCancel={() => setExecuteModal({ isOpen: false, program: null, workflow: null, isExecuting: false, componentElements: null, executionType: 'program' })}
            isSubmitting={executeModal.isExecuting}
            title={`${executeModal.executionType === 'program' ? 'Program' : 'Workflow'} Parameters`}
          />
              ) : (
          <div className="space-y-6">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {executeModal.executionType === 'program' && executeModal.program
                ? `Are you sure you want to execute "${executeModal.program.name}"? This will start a new execution with the current version.`
                : executeModal.executionType === 'workflow' && executeModal.workflow
                ? `Are you sure you want to execute "${executeModal.workflow.name}"? This will start a new workflow execution.`
                : `Are you sure you want to execute this ${executeModal.executionType}?`
              }
            </p>
            <div className="flex items-center justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => setExecuteModal({ isOpen: false, program: null, workflow: null, isExecuting: false, componentElements: null, executionType: 'program' })}
                disabled={executeModal.isExecuting}
                size="lg"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => confirmExecution()}
                loading={executeModal.isExecuting}
                disabled={executeModal.isExecuting}
                size="lg"
              >
                Execute {executeModal.executionType === 'program' ? 'Program' : 'Workflow'}
              </Button>
            </div>
          </div>
              )}
            </div>
          </div>
        </div>
                
      )}
    </div>
  );
};

export default ExecutionsPage;