// src/components/workflow/WorkflowNodeToolbox.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { 
  NodeTemplate,
  Position
} from '@/types/workflowDesigner';
import { ProgramListDto } from '@/api/types';
import { api } from '@/api/api';
import { SortDirection } from '@/api/enums';

interface WorkflowNodeToolboxProps {
  onNodeTemplateSelect?: (template: NodeTemplate) => void;
  onNodeAdd?: (template: NodeTemplate, position: Position) => void;
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
}

const WorkflowNodeToolbox: React.FC<WorkflowNodeToolboxProps> = ({
  onNodeTemplateSelect,
  onNodeAdd,
  selectedCategory,
  onCategoryChange,
}) => {
  const [programs, setPrograms] = useState<ProgramListDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [draggedTemplate, setDraggedTemplate] = useState<NodeTemplate | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['all']));
  
  // Load programs from API
  useEffect(() => {
    loadPrograms();
  }, []);
  
  const loadPrograms = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await api.programs.programs_GetUserAccessiblePrograms(
        undefined,
        undefined,
        'name',
        SortDirection._0
      );
      
      if (response.success && response.data?.items) {
        setPrograms(response.data.items.map(item => ProgramListDto.fromJS(item)));
      } else {
        setError(response.message || 'Failed to load programs');
      }
    } catch (err) {
      console.error('Failed to load programs:', err);
      setError('Failed to load programs. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Convert programs to node templates
  const nodeTemplates = useMemo((): NodeTemplate[] => {
    return programs.map(program => ({
      id: program.id || 'unknown',
      name: program.name || 'Unknown Program',
      description: program.description || 'No description available',
      category: program.type || 'general',
      icon: getIconForProgramType(program.type),
      programId: program.id || 'unknown',
      programInfo: program,
      defaultSize: { width: 200, height: 100 },
      inputPorts: [
        {
          id: 'input',
          name: 'Input',
          type: 'input',
          dataType: 'any',
          required: true,
          description: 'Program input data',
        },
      ],
      outputPorts: [
        {
          id: 'output',
          name: 'Output',
          type: 'output',
          dataType: 'any',
          required: false,
          description: 'Program output data',
        },
      ],
      configurationSchema: {
        type: 'object',
        properties: {
          name: { type: 'string', title: 'Name' },
          description: { type: 'string', title: 'Description' },
        },
      },
    }));
  }, [programs]);
  
  // Filter and search templates
  const filteredTemplates = useMemo(() => {
    return nodeTemplates.filter(template => {
      // Text search
      const matchesSearch = !searchTerm || 
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.programInfo.language?.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Language filter
      const matchesLanguage = !selectedLanguage || 
        template.programInfo.language === selectedLanguage;
      
      // Type filter
      const matchesType = !selectedType || 
        template.programInfo.type === selectedType;
      
      // Status filter
      const matchesStatus = !selectedStatus || 
        template.programInfo.status === selectedStatus;
      
      // Category filter
      const matchesCategory = !selectedCategory || 
        selectedCategory === 'all' || 
        template.category === selectedCategory;
      
      return matchesSearch && matchesLanguage && matchesType && matchesStatus && matchesCategory;
    });
  }, [nodeTemplates, searchTerm, selectedLanguage, selectedType, selectedStatus, selectedCategory]);
  
  // Group templates by category
  const groupedTemplates = useMemo(() => {
    const groups: Record<string, NodeTemplate[]> = {};
    
    filteredTemplates.forEach(template => {
      const category = template.category || 'general';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(template);
    });
    
    return groups;
  }, [filteredTemplates]);
  
  // Get unique values for filters
  const uniqueLanguages = useMemo(() => {
    const languages = new Set(programs.map(p => p.language).filter((lang): lang is string => Boolean(lang)));
    return Array.from(languages).sort();
  }, [programs]);
  
  const uniqueTypes = useMemo(() => {
    const types = new Set(programs.map(p => p.type).filter((type): type is string => Boolean(type)));
    return Array.from(types).sort();
  }, [programs]);
  
  const uniqueStatuses = useMemo(() => {
    const statuses = new Set(programs.map(p => p.status).filter((status): status is string => Boolean(status)));
    return Array.from(statuses).sort();
  }, [programs]);
  
  // const uniqueCategories = useMemo(() => {
  //   const categories = new Set(nodeTemplates.map(t => t.category));
  //   return Array.from(categories).sort();
  // }, [nodeTemplates]);
  
  // Handle template selection
  const handleTemplateClick = (template: NodeTemplate) => {
    if (onNodeTemplateSelect) {
      onNodeTemplateSelect(template);
    }
    // Also add node directly for testing
    if (onNodeAdd) {
      onNodeAdd(template, { x: 100 + Math.random() * 200, y: 100 + Math.random() * 200 });
    }
  };
  
  // Handle drag start
  const handleDragStart = (e: React.DragEvent, template: NodeTemplate) => {
    setDraggedTemplate(template);
    e.dataTransfer.setData('application/json', JSON.stringify({
      type: 'node_template',
      template,
    }));
    e.dataTransfer.effectAllowed = 'copy';
  };
  
  // Handle drag end
  const handleDragEnd = () => {
    setDraggedTemplate(null);
  };
  
  // Toggle category expansion
  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedLanguage('');
    setSelectedType('');
    setSelectedStatus('');
    if (onCategoryChange) {
      onCategoryChange('all');
    }
  };
  
  // Get icon for program type
  function getIconForProgramType(type?: string): string {
    switch (type?.toLowerCase()) {
      case 'web': return '🌐';
      case 'api': return '🔗';
      case 'console': return '💻';
      case 'service': return '⚙️';
      case 'library': return '📚';
      default: return '📦';
    }
  }
  
  // Get icon component for template
  const getTemplateIcon = (template: NodeTemplate) => {
    const iconClasses = "w-8 h-8 text-gray-600 dark:text-gray-400";
    
    switch (template.category) {
      case 'web':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        );
      case 'api':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'console':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        );
      default:
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        );
    }
  };
  
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-4">
        <div className="text-red-500 text-sm mb-2">{error}</div>
        <button
          onClick={loadPrograms}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }
  
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Program Library
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {filteredTemplates.length} programs
          </span>
        </div>
        
        {/* Quick test nodes */}
        <div className="mb-3 p-2 bg-gray-50 dark:bg-gray-800 rounded">
          <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Quick Test:</div>
          <div className="space-y-1">
            <button
              onClick={() => onNodeAdd && onNodeAdd({
                id: 'test-start-' + Date.now(),
                name: 'Start Node',
                description: 'Test start node',
                category: 'test',
                icon: '🟢',
                programId: 'test-start',
                programInfo: { id: 'test-start', name: 'Start', language: 'Test', type: 'start' } as any,
                defaultSize: { width: 200, height: 100 },
                inputPorts: [],
                outputPorts: [{ id: 'out', name: 'Output', type: 'output', dataType: 'any', required: false }],
                configurationSchema: { type: 'object', properties: {} },
              }, { x: 200, y: 200 })}
              className="w-full text-left px-2 py-1 text-xs bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded hover:bg-green-200 dark:hover:bg-green-900/40"
            >
              Add Start Node
            </button>
            <button
              onClick={() => onNodeAdd && onNodeAdd({
                id: 'test-process-' + Date.now(),
                name: 'Process Node',
                description: 'Test process node',
                category: 'test',
                icon: '⚙️',
                programId: 'test-process',
                programInfo: { id: 'test-process', name: 'Process', language: 'Test', type: 'process' } as any,
                defaultSize: { width: 200, height: 100 },
                inputPorts: [{ id: 'in', name: 'Input', type: 'input', dataType: 'any', required: true }],
                outputPorts: [{ id: 'out', name: 'Output', type: 'output', dataType: 'any', required: false }],
                configurationSchema: { type: 'object', properties: {} },
              }, { x: 500, y: 200 })}
              className="w-full text-left px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/40"
            >
              Add Process Node
            </button>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative mb-3">
          <input
            type="text"
            placeholder="Search programs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg 
            className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        {/* Filters */}
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="text-xs border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="">All Languages</option>
              {uniqueLanguages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="text-xs border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="">All Types</option>
              {uniqueTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="text-xs border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="">All Status</option>
              {uniqueStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          
          {(searchTerm || selectedLanguage || selectedType || selectedStatus) && (
            <button
              onClick={clearFilters}
              className="text-xs text-blue-500 hover:text-blue-700"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>
      
      {/* Programs List */}
      <div className="flex-1 overflow-y-auto">
        {Object.keys(groupedTemplates).length === 0 ? (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            <svg className="mx-auto h-12 w-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-sm">No programs found</p>
            <p className="text-xs mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {Object.entries(groupedTemplates).map(([category, templates]) => (
              <div key={category} className="space-y-2">
                {/* Category header */}
                <button
                  onClick={() => toggleCategory(category)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                    {category} ({templates.length})
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform ${
                      expandedCategories.has(category) ? 'rotate-90' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                {/* Category items */}
                {expandedCategories.has(category) && (
                  <div className="space-y-2">
                    {templates.map(template => (
                      <div
                        key={template.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, template)}
                        onDragEnd={handleDragEnd}
                        onClick={() => handleTemplateClick(template)}
                        className={`group relative p-3 rounded-lg border-2 border-dashed cursor-pointer transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 ${
                          draggedTemplate?.id === template.id
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            {getTemplateIcon(template)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                              {template.name}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                              {template.description}
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded">
                                {template.programInfo.language}
                              </span>
                              <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded">
                                {template.programInfo.type}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Drag indicator */}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Help text */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
          <p>💡 <strong>Tip:</strong> Drag programs to canvas to create nodes</p>
          <p>🔍 Use search and filters to find specific programs</p>
          <p>📂 Click category headers to expand/collapse</p>
        </div>
      </div>
    </div>
  );
};

export default WorkflowNodeToolbox;