// src/pages/projects/CreateProjectPage.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeftIcon,
  CodeBracketIcon,
  GlobeAltIcon,
  CommandLineIcon,
  CubeIcon,
  DevicePhoneMobileIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';
import { api } from '@/api/api';
import { useAuth } from '@/contexts/AuthContext';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { ProgramCreateDto } from '@/api/types';

interface ProjectFormData {
  name: string;
  description: string;
  type: string;
  language: string;
  uiType: string;
  mainFile: string;
}

const CreateProjectPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    description: '',
    type: 'web',
    language: 'javascript',
    uiType: 'react',
    mainFile: ''
  });

  const projectTypes = [
    {
      id: 'web',
      name: 'Web Application',
      description: 'Interactive web applications with modern frameworks',
      icon: GlobeAltIcon,
      languages: ['javascript', 'typescript', 'python', 'csharp', 'java'],
      uiTypes: ['react', 'vue', 'angular', 'html', 'blazor']
    },
    {
      id: 'api',
      name: 'API / Backend',
      description: 'RESTful APIs and backend services',
      icon: CubeIcon,
      languages: ['javascript', 'typescript', 'python', 'csharp', 'java', 'go'],
      uiTypes: ['none', 'swagger', 'docs']
    },
    {
      id: 'console',
      name: 'Console Application',
      description: 'Command-line tools and utilities',
      icon: CommandLineIcon,
      languages: ['python', 'javascript', 'typescript', 'csharp', 'java', 'go'],
      uiTypes: ['cli', 'none']
    },
    {
      id: 'library',
      name: 'Library / Package',
      description: 'Reusable code libraries and npm packages',
      icon: BookOpenIcon,
      languages: ['javascript', 'typescript', 'python', 'csharp', 'java'],
      uiTypes: ['none', 'docs']
    },
    {
      id: 'mobile',
      name: 'Mobile Application',
      description: 'Cross-platform mobile applications',
      icon: DevicePhoneMobileIcon,
      languages: ['javascript', 'typescript', 'dart'],
      uiTypes: ['react-native', 'flutter', 'ionic']
    }
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
    const type = projectTypes.find(t => t.id === projectType);
    if (!type || !type.languages.includes(language)) return [];

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

  const getMainFileExtension = (language: string): string => {
    return languages.find(l => l.id === language)?.extension || '.txt';
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

    // Auto-update main file based on name and language
    if (field === 'name' || field === 'language') {
      const projectName = field === 'name' ? value : formData.name;
      const projectLanguage = field === 'language' ? value : formData.language;
      
      if (projectName && projectLanguage) {
        const extension = getMainFileExtension(projectLanguage);
        const mainFileName = `${projectName.toLowerCase().replace(/[^a-z0-9]/g, '')}${extension}`;
        setFormData(prev => ({ ...prev, mainFile: mainFileName }));
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

    // UI Type validation
    if (!formData.uiType) {
      newErrors.uiType = 'UI type is required';
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
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const createDto = new ProgramCreateDto({
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        type: formData.type,
        language: formData.language,
        mainFile: formData.mainFile || undefined,
        uiType: formData.uiType,
        uiConfiguration: {},
        metadata: {
          createdBy: user?.id,
          createdAt: new Date().toISOString()
        }
      });

      const response = await api.programs.programs_Create(createDto);

      if (response.success && response.data) {
        // Navigate to the new project
        navigate(`/projects/${response.data.id}`);
      } else {
        setErrors({ general: response.message || 'Failed to create project. Please try again.' });
      }
    } catch (error: any) {
      console.error('Create project error:', error);
      setErrors({ general: error.message || 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const selectedProjectType = projectTypes.find(t => t.id === formData.type);
  const availableLanguages = selectedProjectType?.languages || [];
  const availableUiTypes = getUiTypesForProject(formData.type, formData.language);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          to="/projects"
          className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back to Projects
        </Link>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Create New Project
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Set up a new programming project with your preferred language and framework.
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

        {/* Project Type */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Project Type *
          </h2>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projectTypes.map((type) => (
              <div
                key={type.id}
                className={`relative rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  formData.type === type.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
                onClick={() => handleInputChange('type', type.id)}
              >
                <div className="p-4">
                  <div className="flex items-center">
                    <type.icon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        {type.name}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    {type.description}
                  </p>
                </div>
                {formData.type === type.id && (
                  <div className="absolute top-2 right-2">
                    <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
          {errors.type && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.type}</p>
          )}
        </div>

        {/* Language and UI Configuration */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Language & Framework
          </h2>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                Framework / UI Type *
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
                {errors.uiType && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.uiType}</p>
                )}
              </div>
            </div>
          </div>

          {/* Main File */}
          <div className="mt-6">
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
                placeholder={`main${getMainFileExtension(formData.language)}`}
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                The main entry point file for your project (optional)
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Link
            to="/projects"
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" text="" />
                <span className="ml-2">Creating...</span>
              </>
            ) : (
              <>
                <CodeBracketIcon className="h-4 w-4 mr-2" />
                Create Project
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProjectPage;