// src/pages/projects/EditProjectPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeftIcon,
  CodeBracketIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { api } from '@/api/api';
import { useAuth } from '@/contexts/AuthContext';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { ProgramUpdateDto } from '@/api/types';
import type { IProgramDetailDto } from '@/api/typeInterfaces';

interface ProjectFormData {
  name: string;
  description: string;
  type: string;
  language: string;
  uiType: string;
  mainFile: string;
}

const EditProjectPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  
  const [project, setProject] = useState<IProgramDetailDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hasChanges, setHasChanges] = useState(false);

  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    description: '',
    type: '',
    language: '',
    uiType: '',
    mainFile: ''
  });

  const [originalData, setOriginalData] = useState<ProjectFormData>({
    name: '',
    description: '',
    type: '',
    language: '',
    uiType: '',
    mainFile: ''
  });

  const projectTypes = [
    { id: 'web', name: 'Web Application', languages: ['javascript', 'typescript', 'python', 'csharp', 'java'] },
    { id: 'api', name: 'API / Backend', languages: ['javascript', 'typescript', 'python', 'csharp', 'java', 'go'] },
    { id: 'console', name: 'Console Application', languages: ['python', 'javascript', 'typescript', 'csharp', 'java', 'go'] },
    { id: 'library', name: 'Library / Package', languages: ['javascript', 'typescript', 'python', 'csharp', 'java'] },
    { id: 'mobile', name: 'Mobile Application', languages: ['javascript', 'typescript', 'dart'] }
  ];

  const languages = [
    { id: 'javascript', name: 'JavaScript', extension: '.js' },
    { id: 'typescript', name: 'TypeScript', extension: '.ts' },
    { id: 'python', name: 'Python', extension: '.py' },
    { id: 'csharp', name: 'C#', extension: '.cs' },
    { id: 'java', name: 'Java', extension: '.java' },
    { id: 'go', name: 'Go', extension: '.go' },
    { id: 'dart', name: 'Dart', extension: '.dart' }
  ];

  const getUiTypesForProject = (projectType: string, language: string): string[] => {
    const uiTypeOptions: Record<string, Record<string, string[]>> = {
      web: {
        javascript: ['react', 'vue', 'angular', 'html', 'svelte'],
        typescript: ['react', 'vue', 'angular', 'svelte'],
        python: ['django', 'flask', 'fastapi'],
        csharp: ['blazor', 'mvc', 'razor'],
        java: ['spring', 'jsp', 'thymeleaf']
      },
      api: {
        javascript: ['express', 'fastify', 'koa'],
        typescript: ['express', 'fastify', 'nestjs'],
        python: ['fastapi', 'django-rest', 'flask'],
        csharp: ['webapi', 'minimal-api'],
        java: ['spring-boot', 'jersey'],
        go: ['gin', 'echo', 'fiber']
      },
      console: {
        javascript: ['node', 'cli'],
        typescript: ['node', 'cli'],
        python: ['script', 'cli'],
        csharp: ['console', 'cli'],
        java: ['console', 'cli'],
        go: ['cli', 'console']
      },
      library: {
        javascript: ['npm', 'commonjs', 'esm'],
        typescript: ['npm', 'library'],
        python: ['pip', 'wheel'],
        csharp: ['nuget', 'library'],
        java: ['maven', 'gradle']
      },
      mobile: {
        javascript: ['react-native', 'ionic'],
        typescript: ['react-native', 'ionic'],
        dart: ['flutter']
      }
    };

    return uiTypeOptions[projectType]?.[language] || ['none'];
  };

  useEffect(() => {
    if (projectId) {
      loadProject();
    }
  }, [projectId]);

  useEffect(() => {
    // Check if form data has changed from original
    const changed = Object.keys(formData).some(key => 
      formData[key as keyof ProjectFormData] !== originalData[key as keyof ProjectFormData]
    );
    setHasChanges(changed);
  }, [formData, originalData]);

  const loadProject = async () => {
    if (!projectId) return;
    
    try {
      setLoading(true);
      
      const response = await api.programs.programs_GetById(projectId);
      
      if (response.success && response.data) {
        const projectData = response.data;
        setProject(projectData);
        
        const initialFormData: ProjectFormData = {
          name: projectData.name || '',
          description: projectData.description || '',
          type: projectData.type || '',
          language: projectData.language || '',
          uiType: projectData.uiType || '',
          mainFile: projectData.mainFile || ''
        };
        
        setFormData(initialFormData);
        setOriginalData(initialFormData);
      } else {
        setErrors({ general: response.message || 'Failed to load project' });
      }
    } catch (error: any) {
      console.error('Error loading project:', error);
      setErrors({ general: error.message || 'An unexpected error occurred' });
    } finally {
      setLoading(false);
    }
  };

  const canModifyProject = (): boolean => {
    if (isAdmin) return true;
    if (!user || !project) return false;
    return project.creator === user.id;
  };

  const handleInputChange = (field: keyof ProjectFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Auto-update dependent fields
    if (field === 'type' || field === 'language') {
      const newType = field === 'type' ? value : formData.type;
      const newLanguage = field === 'language' ? value : formData.language;
      const availableUiTypes = getUiTypesForProject(newType, newLanguage);
      
      if (availableUiTypes.length > 0 && !availableUiTypes.includes(formData.uiType)) {
        setFormData(prev => ({ ...prev, uiType: availableUiTypes[0] }));
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Project name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Project name must be at least 3 characters';
    } else if (formData.name.length > 50) {
      newErrors.name = 'Project name must be less than 50 characters';
    }

    // Type validation
    if (!formData.type) {
      newErrors.type = 'Project type is required';
    }

    // Language validation
    if (!formData.language) {
      newErrors.language = 'Programming language is required';
    }

    // Check if language is supported for selected type
    const selectedType = projectTypes.find(t => t.id === formData.type);
    if (selectedType && !selectedType.languages.includes(formData.language)) {
      newErrors.language = `${formData.language} is not supported for ${selectedType.name}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!canModifyProject()) {
      setErrors({ general: 'You do not have permission to edit this project' });
      return;
    }
    
    if (!validateForm()) {
      return;
    }

    if (!hasChanges) {
      navigate(`/projects/${projectId}`);
      return;
    }

    setSaving(true);

    try {
      const updateDto = new ProgramUpdateDto({
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        type: formData.type,
        language: formData.language,
        mainFile: formData.mainFile || undefined,
        uiType: formData.uiType,
        uiConfiguration: project?.uiConfiguration || {},
        metadata: {
          ...project?.metadata,
          updatedBy: user?.id,
          updatedAt: new Date().toISOString()
        }
      });

      const response = await api.programs.programs_Update(projectId!, updateDto);

      if (response.success && response.data) {
        navigate(`/projects/${projectId}`);
      } else {
        setErrors({ general: response.message || 'Failed to update project. Please try again.' });
      }
    } catch (error: any) {
      console.error('Update project error:', error);
      setErrors({ general: error.message || 'An unexpected error occurred. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (hasChanges) {
      const confirmed = window.confirm('You have unsaved changes. Are you sure you want to leave?');
      if (!confirmed) return;
    }
    navigate(`/projects/${projectId}`);
  };

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading project..." />;
  }

  if (!project || !canModifyProject()) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 dark:text-red-400 mb-4">
          {!project ? 'Project not found' : 'You do not have permission to edit this project'}
        </div>
        <Link
          to={projectId ? `/projects/${projectId}` : '/projects'}
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-500"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          {projectId ? 'Back to Project' : 'Back to Projects'}
        </Link>
      </div>
    );
  }

  const selectedProjectType = projectTypes.find(t => t.id === formData.type);
  const availableLanguages = selectedProjectType?.languages || [];
  const availableUiTypes = getUiTypesForProject(formData.type, formData.language);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to={`/projects/${projectId}`}
            className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Back to Project
          </Link>
        </div>
        
        {hasChanges && (
          <div className="flex items-center text-sm text-yellow-600 dark:text-yellow-400">
            <div className="h-2 w-2 bg-yellow-500 rounded-full mr-2"></div>
            Unsaved changes
          </div>
        )}
      </div>

      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Edit Project
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Update your project settings and configuration.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* General Error */}
        {errors.general && (
          <div className="rounded-md bg-red-50 dark:bg-red-900/50 p-4">
            <div className="text-sm text-red-700 dark:text-red-300">
              {errors.general}
            </div>
          </div>
        )}

        {/* Basic Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Basic Information
          </h2>
          
          <div className="grid grid-cols-1 gap-6">
            {/* Project Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Project Name *
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="My Awesome Project"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe what your project does..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Project Configuration */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Project Configuration
          </h2>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Project Type */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Project Type *
              </label>
              <div className="mt-1">
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select project type</option>
                  {projectTypes.map(type => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
                {errors.type && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.type}</p>
                )}
              </div>
            </div>

            {/* Programming Language */}
            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Programming Language *
              </label>
              <div className="mt-1">
                <select
                  id="language"
                  value={formData.language}
                  onChange={(e) => handleInputChange('language', e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select language</option>
                  {availableLanguages.map((langId: string) => {
                    const lang = languages.find(l => l.id === langId);
                    return lang ? (
                      <option key={lang.id} value={lang.id}>
                        {lang.name}
                      </option>
                    ) : null;
                  })}
                </select>
                {errors.language && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.language}</p>
                )}
              </div>
            </div>

            {/* UI Type / Framework */}
            <div>
              <label htmlFor="uiType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Framework / UI Type
              </label>
              <div className="mt-1">
                <select
                  id="uiType"
                  value={formData.uiType}
                  onChange={(e) => handleInputChange('uiType', e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {availableUiTypes.map((uiType: string) => (
                    <option key={uiType} value={uiType}>
                      {uiType.charAt(0).toUpperCase() + uiType.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Main File */}
            <div>
              <label htmlFor="mainFile" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Main File (Entry Point)
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="mainFile"
                  value={formData.mainFile}
                  onChange={(e) => handleInputChange('mainFile', e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="main.js"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  The main entry point file for your project (optional)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            disabled={saving}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <XMarkIcon className="h-4 w-4 mr-2" />
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={saving || !hasChanges}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <LoadingSpinner size="sm" text="" />
                <span className="ml-2">Saving...</span>
              </>
            ) : (
              <>
                <CheckIcon className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProjectPage;