// src/pages/executions/ExecutionsPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '@/api/api';
import { SortDirection } from '@/api/enums';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { ExecutionResourceLimitsDto, ProgramExecutionRequestDto } from '@/api';
import ComponentForm from '@/components/common/ComponentForm';
import { UIElement, ComponentSchema } from '@/types/componentDesigner';

// Interfaces
interface ProgramItem {
  id: string;
  name: string;
  description?: string;
  language: string;
  type: string;
  status: string;
  hasVersions: boolean;
  currentVersion?: string;
  icon?: string;
  newestComponent?: ComponentItem | null;
  hasComponents?: boolean;
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

interface ExecutionItem {
  id: string;
  programId: string;
  programName: string;
  status: string;
  startedAt: Date;
  completedAt?: Date;
  userId: string;
  executionType: string;
}

interface ExecuteModalState {
  isOpen: boolean;
  program: ProgramItem | null;
  isExecuting: boolean;
  componentElements: UIElement[] | null;
}

interface ProgramMenuState {
  isOpen: boolean;
  programId: string | null;
  position: { x: number; y: number };
}

// Desktop icons configuration for different program types and languages
const getDesktopIcon = (program: ProgramItem): React.ReactNode => {
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

const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
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
  const [executions, setExecutions] = useState<ExecutionItem[]>([]);
  const [isLoadingPrograms, setIsLoadingPrograms] = useState(true);
  const [isLoadingExecutions, setIsLoadingExecutions] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Desktop view state
  const [view, setView] = useState<'desktop' | 'executions'>('desktop');
  
  // Search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  
  // Execution modal
  const [executeModal, setExecuteModal] = useState<ExecuteModalState>({
    isOpen: false,
    program: null,
    isExecuting: false,
    componentElements: null
  });

  // Program menu state
  const [programMenu, setProgramMenu] = useState<ProgramMenuState>({
    isOpen: false,
    programId: null,
    position: { x: 0, y: 0 }
  });

  // Load data on component mount
  useEffect(() => {
    loadPrograms();
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
      if (programMenu.isOpen) {
        const target = event.target as HTMLElement;
        // Don't close if clicking on the menu itself
        if (!target.closest('[data-menu="context"]')) {
          setProgramMenu({ isOpen: false, programId: null, position: { x: 0, y: 0 } });
        }
      }
    };

    if (programMenu.isOpen) {
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
  }, [programMenu.isOpen]);

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
          hasVersions: false, // Will be populated by version check
          currentVersion: program.currentVersion,
          newestComponent: null, // Will be populated by component check
          hasComponents: false // Will be populated by component check
        })) || [];

        // Check versions and components for each program
        const programsWithVersionsAndComponents = await Promise.all(
          programItems.map(async (program) => {
            try {
              // Load versions
              const versionsResponse = await api.versions.versions_GetByProgram(program.id, 1, 1, 'CreatedDate', SortDirection._1);
              const versionCount = versionsResponse.data?.totalCount || 0;
              
              // Load newest component
              const newestComponent = await loadNewestComponent(program.id);
              
              return {
                ...program,
                hasVersions: versionCount > 0,
                newestComponent,
                hasComponents: newestComponent !== null
              };
            } catch {
              return { 
                ...program, 
                hasVersions: false,
                newestComponent: null,
                hasComponents: false
              };
            }
          })
        );

        setPrograms(programsWithVersionsAndComponents);
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

  const loadRecentExecutions = async () => {
    try {
      setIsLoadingExecutions(true);
      
      const response = await api.executions.executions_GetRecentExecutions(20);
      
      if (response.success && response.data) {
        const executionItems: ExecutionItem[] = response.data.map(execution => ({
          id: execution.id || '',
          programId: execution.programId || '',
          programName: execution.programName || 'Unknown Program',
          status: execution.status || 'unknown',
          startedAt: execution.startedAt || new Date(),
          completedAt: execution.completedAt,
          userId: execution.userId || '',
          executionType: execution.executionType || 'standard'
        }));
        
        setExecutions(executionItems);
      }
    } catch (error) {
      console.error('Failed to load executions:', error);
    } finally {
      setIsLoadingExecutions(false);
    }
  };

  const loadNewestComponent = async (programId: string): Promise<ComponentItem | null> => {
    try {
      const response = await api.uiComponents.uiComponents_GetByProgram(
        programId,
        1, // pageNumber
        10, // pageSize - get more to find active components
        'CreatedDate', // sort by creation date
        SortDirection._1 // descending order to get newest first
      );

      if (response.success && response.data?.items && response.data.items.length > 0) {
        
        // Find the first active component, or fall back to the newest
        const activeComponent = response.data.items.find(c => c.status === 'active');
        const component = activeComponent || response.data.items[0];
        
        return {
          id: component.id || '',
          name: component.name || 'Untitled Component',
          type: component.type || 'unknown',
          status: component.status || 'draft',
          programId: component.programId || programId,
          versionId: component.versionId || '',
          createdDate: component.createdAt || new Date()
        };
      }
      return null;
    } catch (error) {
      console.error(`Failed to load components for program ${programId}:`, error);
      return null;
    }
  };

  const handleQuickExecute = async (programId: string) => {
    const program = programs.find(p => p.id === programId);
    if (program && program.hasVersions) {
      await handleExecuteProgram(program);
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
      isExecuting: false,
      componentElements
    });
  };

  const handleMenuClick = (event: React.MouseEvent, programId: string) => {
    event.preventDefault();
    event.stopPropagation();
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    
    setProgramMenu({
      isOpen: true,
      programId,
      position: {
        x: rect.right + 8,
        y: rect.top
      }
    });
  };

  const confirmExecution = async (parameters: Record<string, any> = {}) => {
    if (!executeModal.program) return;
    
    try {
      setExecuteModal(prev => ({ ...prev, isExecuting: true }));
      
      const executionRequest = new ProgramExecutionRequestDto({
        parameters: parameters,
        environment: {},
        resourceLimits: new ExecutionResourceLimitsDto({
          maxMemoryMb: 512,
          maxCpuPercentage: 50,
          maxExecutionTimeMinutes: 30
        })
      });

      console.log('Executing program with request:', executionRequest);

      const response = await api.executions.executions_ExecuteProgram(
        executeModal.program.id,
        executionRequest
      );

      if (response.success) {
        // Close modal and refresh executions
        setExecuteModal({ isOpen: false, program: null, isExecuting: false, componentElements: null });
        setView('executions');
        loadRecentExecutions();
        
        // Navigate to execution detail if needed
        if (response.data?.id) {
          navigate(`/executions/${response.data.id}`);
        }
      } else {
        setError(response.message || 'Failed to execute program');
      }
    } catch (error) {
      console.error('Failed to execute program:', error);
      setError('Failed to execute program. Please try again.');
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

  if (isLoadingPrograms && programs.length === 0) {
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Program Executions
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Run your programs with desktop interface
          </p>
        </div>
        
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <Button
            variant={view === 'desktop' ? 'primary' : 'outline'}
            onClick={() => setView('desktop')}
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
              </svg>
            }
          >
            Desktop View
          </Button>
          <Button
            variant={view === 'executions' ? 'primary' : 'outline'}
            onClick={() => setView('executions')}
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2m0-8V5a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2H9m0 0v2a2 2 0 002 2h2a2 2 0 002-2v-2M9 5v2a2 2 0 002 2h2a2 2 0 002-2V5" />
              </svg>
            }
          >
            Execution History
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
                onClick={() => setError(null)}
                className="text-sm text-red-800 dark:text-red-200 hover:text-red-600 dark:hover:text-red-300"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {view === 'desktop' && (
        <>
          {/* Desktop Filters */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow rounded-lg border border-gray-200/50 dark:border-gray-700/50 p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Search programs"
                placeholder="Search by name or description..."
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
                  Language Filter
                </label>
                <select
                  value={languageFilter}
                  onChange={(e) => setLanguageFilter(e.target.value)}
                  className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">All Languages</option>
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="csharp">C#</option>
                  <option value="go">Go</option>
                  <option value="rust">Rust</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Type Filter
                </label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">All Types</option>
                  <option value="web">Web Application</option>
                  <option value="api">API</option>
                  <option value="console">Console Application</option>
                  <option value="service">Service</option>
                </select>
              </div>
            </div>
          </div>

          {/* Desktop Icons Grid */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-200/50 dark:border-gray-700/50 p-6 min-h-96">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
              {filteredPrograms.map((program) => (
                <div
                  key={program.id}
                  className="flex flex-col items-center space-y-2 group relative"
                  onDoubleClick={() => handleExecuteProgram(program)}
                >
                  <div className="relative">
                    {getDesktopIcon(program)}
                    
                    {/* Three dots menu button */}
                    <button
                      onClick={(e) => handleMenuClick(e, program.id)}
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

      {view === 'executions' && (
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow rounded-lg border border-gray-200/50 dark:border-gray-700/50">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Executions</h2>
          </div>
          
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {executions.map((execution) => (
              <div key={execution.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {execution.programName}
                      </p>
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
                      onClick={() => navigate(`/executions/${execution.id}`)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {executions.length === 0 && !isLoadingExecutions && (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2m0-8V5a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2H9m0 0v2a2 2 0 002 2h2a2 2 0 002-2v-2M9 5v2a2 2 0 002 2h2a2 2 0 002-2V5" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No executions yet</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Start executing some programs to see the history here.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Global Context Menu */}
      {programMenu.isOpen && (
        <div
          data-menu="context"
          className="fixed bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50"
          style={{
            left: `${programMenu.position.x}px`,
            top: `${programMenu.position.y}px`
          }}
        >
          {(() => {
            const program = programs.find(p => p.id === programMenu.programId);
            if (!program) return null;
            
            return (
              <>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleExecuteProgram(program);
                    setProgramMenu({ isOpen: false, programId: null, position: { x: 0, y: 0 } });
                  }}
                  disabled={!program.hasVersions}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h6m2 5H7a2 2 0 01-2-2V8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2z" />
                  </svg>
                  <span>Execute</span>
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigate(`/projects/${program.id}`);
                    setProgramMenu({ isOpen: false, programId: null, position: { x: 0, y: 0 } });
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Details</span>
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigate(`/editor/${program.id}`);
                    setProgramMenu({ isOpen: false, programId: null, position: { x: 0, y: 0 } });
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
                        setProgramMenu({ isOpen: false, programId: null, position: { x: 0, y: 0 } });
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
                        setProgramMenu({ isOpen: false, programId: null, position: { x: 0, y: 0 } });
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
                        setProgramMenu({ isOpen: false, programId: null, position: { x: 0, y: 0 } });
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
          })()}
        </div>
      )}

      {/* Execute Program Modal */}
      {executeModal.isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white dark:bg-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Execute {executeModal.program?.name}
              </h3>
              <button
                onClick={() => setExecuteModal({ isOpen: false, program: null, isExecuting: false, componentElements: null })}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                disabled={executeModal.isExecuting}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {executeModal.componentElements && executeModal.componentElements.length > 0 ? (
                <ComponentForm
                  elements={executeModal.componentElements}
                  onSubmit={confirmExecution}
                  onCancel={() => setExecuteModal({ isOpen: false, program: null, isExecuting: false, componentElements: null })}
                  isSubmitting={executeModal.isExecuting}
                  title="Program Parameters"
                />
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {executeModal.program 
                      ? `Are you sure you want to execute "${executeModal.program.name}"? This will start a new execution with the current version.`
                      : 'Are you sure you want to execute this program?'
                    }
                  </p>
                  <div className="flex items-center justify-end space-x-3">
                    <Button
                      variant="outline"
                      onClick={() => setExecuteModal({ isOpen: false, program: null, isExecuting: false, componentElements: null })}
                      disabled={executeModal.isExecuting}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => confirmExecution()}
                      loading={executeModal.isExecuting}
                      disabled={executeModal.isExecuting}
                    >
                      Execute Program
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