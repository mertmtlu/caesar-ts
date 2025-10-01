// src/pages/demo/DemoAppsPage.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/api/api';
import { SortDirection, IconEntityType } from '@/api/enums';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Modal from '@/components/common/Modal';
import { ProgramExecutionRequestDto, WorkflowExecutionRequest, ExecutionResourceLimitsDto } from '@/api';
import { IVersionInfoDto } from '@/api/typeInterfaces';
import ComponentForm from '@/components/common/ComponentForm';
import { UIElement, ComponentSchema } from '@/types/componentDesigner';
import RichPreviewCard from '@/components/demo/RichPreviewCard';

// Unified data model for all app types
interface UnifiedAppItem {
  id: string;
  name: string;
  description?: string;
  type: 'program' | 'workflow' | 'remoteapp';
  icon?: string;
  status?: string;

  // Program-specific fields
  language?: string;
  programType?: string;
  versionCount?: number;
  hasVersions?: boolean;
  hasComponents?: boolean;

  // Workflow-specific fields
  nodeCount?: number;
  hasUIComponents?: boolean;

  // Remote app-specific fields
  url?: string;
  isPublic?: boolean;
  creator?: string;

  // Execution data
  currentVersion?: IVersionInfoDto;
  newestComponent?: {
    id: string;
    name: string;
    type: string;
    status: string;
    programId: string;
    versionId: string;
    createdDate: Date;
  } | null;
  newestComponentType?: string;

  // Preview content
  preview?: {
    image?: string;
    gif?: string;
    video?: string;
    features?: string[];
  };
}

// Secure SSO redirect helper
const secureSsoRedirect = (redirectUrl: string) => {
  try {
    const url = new URL(redirectUrl);
    const username = url.searchParams.get('username');
    const password = url.searchParams.get('password');
    const formActionUrl = `${url.origin}${url.pathname}`;

    if (!username || !password) {
      window.open(redirectUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = formActionUrl;
    form.target = '_blank';

    const userInput = document.createElement('input');
    userInput.type = 'hidden';
    userInput.name = 'username';
    userInput.value = username;

    const passInput = document.createElement('input');
    passInput.type = 'hidden';
    passInput.name = 'password';
    passInput.value = password;

    form.appendChild(userInput);
    form.appendChild(passInput);
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  } catch (error) {
    console.error('SSO redirect failed:', error);
    window.open(redirectUrl, '_blank', 'noopener,noreferrer');
  }
};

interface ExecuteModalState {
  isOpen: boolean;
  app: UnifiedAppItem | null;
  isExecuting: boolean;
  componentElements: UIElement[] | null;
}

const DemoAppsPage: React.FC = () => {
  const navigate = useNavigate();
  const [apps, setApps] = useState<UnifiedAppItem[]>([]);
  const [filteredApps, setFilteredApps] = useState<UnifiedAppItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Execute modal state
  const [executeModal, setExecuteModal] = useState<ExecuteModalState>({
    isOpen: false,
    app: null,
    isExecuting: false,
    componentElements: null
  });

  const formDataRef = useRef<Record<string, any>>({});

  useEffect(() => {
    loadAllApps();
  }, []);

  useEffect(() => {
    // Filter apps based on search term
    if (searchTerm.trim() === '') {
      setFilteredApps(apps);
    } else {
      const searchLower = searchTerm.toLowerCase();
      setFilteredApps(
        apps.filter(
          app =>
            app.name.toLowerCase().includes(searchLower) ||
            app.description?.toLowerCase().includes(searchLower) ||
            app.type.toLowerCase().includes(searchLower)
        )
      );
    }
  }, [searchTerm, apps]);

  const loadAllApps = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch all three types in parallel
      const [programsRes, workflowsRes, remoteAppsRes] = await Promise.all([
        api.programs.programs_GetUserAccessiblePrograms(1, 100, 'Name', SortDirection._0),
        api.workflows.workflows_GetAll(1, 100, 'Name', SortDirection._0),
        api.remoteAppsClient.remoteApps_GetUserAccessibleApps(1, 100, 'Name', SortDirection._0)
      ]);

      const unifiedApps: UnifiedAppItem[] = [];

      // Process programs
      if (programsRes.success && programsRes.data?.items) {
        for (const program of programsRes.data.items) {
          // Load icon
          let iconData: string | undefined;
          try {
            const iconRes = await api.iconsClient.icons_GetIconByEntity(IconEntityType.Program, program.id!);
            if (iconRes.success && iconRes.data?.iconData) {
              iconData = typeof iconRes.data.iconData === 'string'
                ? iconRes.data.iconData
                : String(iconRes.data.iconData);
            }
          } catch (err) {
            console.error(`Failed to load icon for program ${program.id}:`, err);
          }

          // Load component info (metadata only, not the full schema)
          let newestComponent = null;
          let componentCount = 0;

          try {
            const componentsRes = await api.uiComponents.uiComponents_GetByProgram(
              program.id!,
              1,
              1,
              'Name',
              SortDirection._0
            );
            if (componentsRes.success && componentsRes.data?.items) {
              componentCount = componentsRes.data.totalCount || 0;
              if (componentsRes.data.items.length > 0) {
                newestComponent = componentsRes.data.items[0];
              }
            }
          } catch (err) {
            console.error(`Failed to load components for program ${program.id}:`, err);
          }

          unifiedApps.push({
            id: program.id!,
            name: program.name!,
            description: program.description,
            type: 'program',
            icon: iconData,
            status: program.status,

            // Direct fields (flattened from metadata)
            language: program.language,
            programType: program.type,
            versionCount: program.versionCount || 0,
            hasVersions: program.hasVersions || false,
            hasComponents: componentCount > 0,

            // Execution data
            currentVersion: program.currentVersion,
            newestComponent: newestComponent ? {
              id: newestComponent.id || '',
              name: newestComponent.name || 'Latest Component',
              type: newestComponent.type || 'input_form',
              status: newestComponent.status || 'active',
              programId: program.id!,
              versionId: program.currentVersion?.id || '',
              createdDate: newestComponent.createdAt || new Date()
            } : null,
            newestComponentType: newestComponent?.type,

            preview: undefined
          });
        }
      }

      // Process workflows
      if (workflowsRes.success && workflowsRes.data?.items) {
        for (const workflow of workflowsRes.data.items) {
          // Check for UI components
          let hasUIComponents = false;
          try {
            const detailRes = await api.workflows.workflows_GetById(workflow.id!);
            if (detailRes.success && detailRes.data?.nodes) {
              const nodeChecks = await Promise.all(
                detailRes.data.nodes.map(async (node) => {
                  if (!node.programId) return false;
                  try {
                    const componentsRes = await api.uiComponents.uiComponents_GetByProgram(
                      node.programId,
                      1,
                      1,
                      'Name',
                      SortDirection._0
                    );
                    return componentsRes.success && (componentsRes.data?.totalCount || 0) > 0;
                  } catch {
                    return false;
                  }
                })
              );
              hasUIComponents = nodeChecks.some((hasUI) => hasUI === true);
            }
          } catch (err) {
            console.error(`Failed to check UI components for workflow ${workflow.id}:`, err);
          }

          unifiedApps.push({
            id: workflow.id!,
            name: workflow.name!,
            description: workflow.description,
            type: 'workflow',
            status: typeof workflow.status === 'number' ? workflow.status.toString() : workflow.status,

            // Direct fields
            nodeCount: workflow.nodeCount || 0,
            hasUIComponents,

            preview: undefined
          });
        }
      }

      // Process remote apps
      if (remoteAppsRes.success && remoteAppsRes.data?.items) {
        for (const app of remoteAppsRes.data.items) {
          // Load icon for remote app
          let iconData: string | undefined;
          try {
            const iconRes = await api.iconsClient.icons_GetIconByEntity(IconEntityType.RemoteApp, app.id!);
            if (iconRes.success && iconRes.data?.iconData) {
              iconData = typeof iconRes.data.iconData === 'string'
                ? iconRes.data.iconData
                : String(iconRes.data.iconData);
            }
          } catch (err) {
            console.error(`Failed to load icon for remote app ${app.id}:`, err);
          }

          unifiedApps.push({
            id: app.id!,
            name: app.name!,
            description: app.description,
            type: 'remoteapp',
            icon: iconData,
            status: app.status || 'active',

            // Direct fields
            url: app.url,
            isPublic: app.isPublic || false,
            creator: app.creator,

            preview: undefined
          });
        }
      }

      setApps(unifiedApps);
      setFilteredApps(unifiedApps);
    } catch (error) {
      console.error('Failed to load apps:', error);
      setError('Failed to load applications. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadComponentConfiguration = async (
    programId: string,
    versionId: string
  ): Promise<UIElement[] | null> => {
    try {
      if (!programId || !versionId) {
        console.warn('Missing programId or versionId for component configuration');
        return null;
      }

      // Get UI components for the program and version
      const componentsResponse = await api.uiComponents.uiComponents_GetByProgram(
        programId,
        1,
        10,
        'Name',
        SortDirection._0
      );

      if (componentsResponse.success && componentsResponse.data?.items && componentsResponse.data.items.length > 0) {
        // Find input_form type component
        const inputFormComponent = componentsResponse.data.items.find(c => c.type === 'input_form');

        if (inputFormComponent && inputFormComponent.id) {
          try {
            // Get the full component details with configuration
            const detailResponse = await api.uiComponents.uiComponents_GetById(inputFormComponent.id);

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
        }
      }

      return null;
    } catch (error) {
      console.error('Failed to load component configuration:', error);
      return null;
    }
  };

  const handleProgramDoubleClick = async (app: UnifiedAppItem) => {
    // Validation check from original
    if (!app.hasVersions) {
      setError('Cannot execute program: No versions available');
      return;
    }

    // Load component configuration dynamically
    let componentElements: UIElement[] | null = null;
    if (app.hasComponents && app.newestComponent) {
      componentElements = await loadComponentConfiguration(
        app.id,
        app.newestComponent.versionId
      );
    }

    // If we have component elements, show the modal with form
    if (componentElements && componentElements.length > 0) {
      setExecuteModal({
        isOpen: true,
        app,
        isExecuting: false,
        componentElements
      });
    } else {
      // Direct execution without parameters
      await executeProgram(app, {});
    }
  };

  const handleAppDoubleClick = async (app: UnifiedAppItem) => {
    if (app.type === 'program') {
      await handleProgramDoubleClick(app);
    } else if (app.type === 'workflow') {
      await executeWorkflow(app);
    } else if (app.type === 'remoteapp') {
      await launchRemoteApp(app);
    }
  };

  const executeProgram = async (app: UnifiedAppItem, parameters: Record<string, any>) => {
    try {
      setExecuteModal(prev => ({ ...prev, isExecuting: true }));
      setError(null);

      const versionId = app.currentVersion?.id;
      if (!versionId) {
        throw new Error('No version available for execution');
      }

      const executionRequest = new ProgramExecutionRequestDto({
        parameters,
        resourceLimits: new ExecutionResourceLimitsDto({
          maxMemoryMb: 512,
          maxCpuPercentage: 50
        })
      });

      const response = await api.executions.executions_ExecuteVersion(versionId, executionRequest);

      if (response.success && response.data?.id) {
        // Navigate to demo execution detail page
        navigate(`/demo/execution/${response.data.id}`);
      } else {
        throw new Error(response.message || 'Execution failed');
      }
    } catch (error) {
      console.error('Failed to execute program:', error);
      setError(error instanceof Error ? error.message : 'Failed to execute program');
    } finally {
      setExecuteModal(prev => ({ ...prev, isExecuting: false }));
    }
  };

  const executeWorkflow = async (app: UnifiedAppItem) => {
    try {
      setError(null);

      const workflowExecutionRequest = new WorkflowExecutionRequest({
        workflowId: app.id
      });

      const response = await api.workflows.workflows_Execute(app.id, workflowExecutionRequest);

      if (response.success && response.data?.id) {
        // Navigate to demo execution detail page
        navigate(`/demo/execution/${response.data.id}`);
      } else {
        throw new Error(response.message || 'Workflow execution failed');
      }
    } catch (error) {
      console.error('Failed to execute workflow:', error);
      setError(error instanceof Error ? error.message : 'Failed to execute workflow');
    }
  };

  const launchRemoteApp = async (app: UnifiedAppItem) => {
    try {
      setError(null);

      const response = await api.remoteAppsClient.remoteApps_Launch(app.id);

      if (response.success && response.data?.redirectUrl) {
        secureSsoRedirect(response.data.redirectUrl);
      } else {
        throw new Error(response.message || 'Failed to launch remote app');
      }
    } catch (error) {
      console.error('Failed to launch remote app:', error);
      setError(error instanceof Error ? error.message : 'Failed to launch remote app');
    }
  };

  const handleFormSubmit = async () => {
    if (executeModal.app) {
      await executeProgram(executeModal.app, formDataRef.current);
      setExecuteModal({ isOpen: false, app: null, isExecuting: false, componentElements: null });
      formDataRef.current = {};
    }
  };


  return (
    <div className="min-h-screen p-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto mb-12">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search applications..."
              className="w-full pl-12 pr-4 py-3 text-lg"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 max-w-4xl mx-auto rounded-lg bg-red-50 dark:bg-red-900/20 p-4">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-red-400 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-red-800 dark:text-red-200 hover:text-red-600 dark:hover:text-red-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Apps Grid */}
      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                  <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredApps.length === 0 ? (
          <div className="text-center py-16">
            <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {searchTerm ? 'No applications found' : 'No applications available'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm ? 'Try adjusting your search term' : 'Contact your administrator to get access to applications'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
            {filteredApps.map((app) => (
              <RichPreviewCard
                key={`${app.type}-${app.id}`}
                id={app.id}
                name={app.name}
                description={app.description}
                type={app.type}
                icon={app.icon}
                status={app.status}
                // Program-specific
                language={app.language}
                programType={app.programType}
                versionCount={app.versionCount}
                hasComponents={app.hasComponents}
                // Workflow-specific
                nodeCount={app.nodeCount}
                hasUIComponents={app.hasUIComponents}
                // Remote app-specific
                url={app.url}
                isPublic={app.isPublic}
                preview={app.preview}
                onDoubleClick={() => handleAppDoubleClick(app)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Execute Modal for Programs with Input Forms */}
      <Modal
        isOpen={executeModal.isOpen}
        onClose={() => {
          setExecuteModal({ isOpen: false, app: null, isExecuting: false, componentElements: null });
          formDataRef.current = {};
        }}
        title={`Execute: ${executeModal.app?.name}`}
        size="lg"
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => {
                setExecuteModal({ isOpen: false, app: null, isExecuting: false, componentElements: null });
                formDataRef.current = {};
              }}
              disabled={executeModal.isExecuting}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleFormSubmit}
              loading={executeModal.isExecuting}
            >
              Execute
            </Button>
          </>
        }
      >
        {executeModal.componentElements && (
          <div className="py-4">
            <ComponentForm
              elements={executeModal.componentElements}
              onSubmit={(data: Record<string, any>) => {
                formDataRef.current = data;
              }}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DemoAppsPage;
