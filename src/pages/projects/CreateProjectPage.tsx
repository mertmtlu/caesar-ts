// src/pages/projects/CreateProjectPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/api/api';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { ProgramCreateDto } from '@/api';

interface CreateProjectForm {
  name: string;
  description: string;
  language: string;
  type: string;
  uiType: string;
}

const CreateProjectPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Form state
  const [form, setForm] = useState<CreateProjectForm>({
    name: '',
    description: '',
    language: 'javascript',
    type: 'web',
    uiType: 'standard'
  });
  
  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Available options
  const languageOptions = [
    { value: 'javascript', label: 'JavaScript', icon: '🟨' },
    { value: 'typescript', label: 'TypeScript', icon: '🔵' },
    { value: 'python', label: 'Python', icon: '🐍' },
    { value: 'java', label: 'Java', icon: '☕' },
    { value: 'csharp', label: 'C#', icon: '🟣' },
    { value: 'cpp', label: 'C++', icon: '⚡' },
    { value: 'go', label: 'Go', icon: '🔵' },
    { value: 'rust', label: 'Rust', icon: '🦀' },
    { value: 'php', label: 'PHP', icon: '🐘' },
    { value: 'ruby', label: 'Ruby', icon: '💎' }
  ];

  const typeOptions = [
    { value: 'web', label: 'Web Application', description: 'Frontend or full-stack web application' },
    { value: 'api', label: 'API/Backend', description: 'REST API, GraphQL, or backend service' },
    { value: 'console', label: 'Console Application', description: 'Command-line tool or script' },
    { value: 'desktop', label: 'Desktop Application', description: 'Cross-platform desktop app' },
    { value: 'mobile', label: 'Mobile Application', description: 'Mobile app or hybrid solution' },
    { value: 'library', label: 'Library/Package', description: 'Reusable library or package' }
  ];

  const uiTypeOptions = [
    { value: 'standard', label: 'Standard', description: 'Traditional interface' },
    { value: 'react', label: 'React', description: 'React-based interface' },
    { value: 'vue', label: 'Vue.js', description: 'Vue.js interface' },
    { value: 'angular', label: 'Angular', description: 'Angular interface' }
  ];

  const handleInputChange = (field: keyof CreateProjectForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const validateForm = (): string | null => {
    if (!form.name.trim()) {
      return 'Project name is required.';
    }
    if (form.name.length < 2) {
      return 'Project name must be at least 2 characters long.';
    }
    if (form.name.length > 100) {
      return 'Project name must be less than 100 characters.';
    }
    if (form.description.length > 500) {
      return 'Description must be less than 500 characters.';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const createDto = new ProgramCreateDto({
        name: form.name.trim(),
        description: form.description.trim() || undefined,
        type: form.type,
        language: form.language,
        uiType: form.uiType,
        mainFile: getMainFile(form.language, form.type),
        uiConfiguration: {},
        metadata: {
          createdFromTemplate: false,
          initialLanguage: form.language,
          initialType: form.type
        }
      });

      const response = await api.programs.programs_Create(createDto);

      if (response.success && response.data) {
        // Navigate to the project detail page where user can create the first version
        navigate(`/projects/${response.data.id}`);
      } else {
        setError(response.message || 'Failed to create project. Please try again.');
      }
    } catch (error) {
      console.error('Failed to create project:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMainFile = (language: string, type: string): string => {
    const lang = language.toLowerCase();
    
    if (lang.includes('javascript')) {
      return type === 'web' ? 'index.html' : 'index.js';
    } else if (lang.includes('typescript')) {
      return type === 'web' ? 'index.html' : 'index.ts';
    } else if (lang.includes('python')) {
      return 'main.py';
    } else if (lang.includes('java')) {
      return 'Main.java';
    } else if (lang.includes('csharp')) {
      return 'Program.cs';
    } else if (lang.includes('cpp')) {
      return 'main.cpp';
    } else if (lang.includes('go')) {
      return 'main.go';
    } else if (lang.includes('rust')) {
      return 'main.rs';
    } else if (lang.includes('php')) {
      return 'index.php';
    } else if (lang.includes('ruby')) {
      return 'main.rb';
    }
    
    return 'index.js';
  };

  const getLanguageIcon = (language: string): string => {
    const option = languageOptions.find(opt => opt.value === language);
    return option?.icon || '📄';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create New Project
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Set up your new programming project and start coding
          </p>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
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
                </div>
              </div>
            )}

            {/* Project Name */}
            <Input
              label="Project Name"
              placeholder="My Awesome Project"
              value={form.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
              autoFocus
              helperText="Choose a descriptive name for your project"
            />

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description <span className="text-gray-500">(optional)</span>
              </label>
              <textarea
                value={form.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe what your project does..."
                rows={3}
                className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                maxLength={500}
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {form.description.length}/500 characters
              </p>
            </div>

            {/* Language Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Programming Language
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {languageOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleInputChange('language', option.value)}
                    className={`relative flex items-center space-x-3 p-3 border rounded-lg transition-colors ${
                      form.language === option.value
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100'
                        : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100'
                    }`}
                  >
                    <span className="text-lg">{option.icon}</span>
                    <span className="text-sm font-medium">{option.label}</span>
                    {form.language === option.value && (
                      <div className="absolute -top-1 -right-1">
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Project Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Project Type
              </label>
              <div className="space-y-2">
                {typeOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleInputChange('type', option.value)}
                    className={`w-full text-left p-3 border rounded-lg transition-colors ${
                      form.type === option.value
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {option.label}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {option.description}
                        </div>
                      </div>
                      {form.type === option.value && (
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* UI Type (only for web projects) */}
            {form.type === 'web' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  UI Framework
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {uiTypeOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleInputChange('uiType', option.value)}
                      className={`text-left p-3 border rounded-lg transition-colors ${
                        form.uiType === option.value
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className="font-medium text-gray-900 dark:text-white">
                        {option.label}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {option.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Preview */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Project Preview</h3>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div className="flex items-center space-x-2">
                  <span>{getLanguageIcon(form.language)}</span>
                  <span><strong>Language:</strong> {languageOptions.find(l => l.value === form.language)?.label}</span>
                </div>
                <div><strong>Type:</strong> {typeOptions.find(t => t.value === form.type)?.label}</div>
                {form.type === 'web' && (
                  <div><strong>UI Framework:</strong> {uiTypeOptions.find(u => u.value === form.uiType)?.label}</div>
                )}
                <div><strong>Main File:</strong> {getMainFile(form.language, form.type)}</div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/projects')}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              
              <Button
                type="submit"
                variant="primary"
                loading={isSubmitting}
                disabled={!form.name.trim()}
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                }
              >
                Create Project
              </Button>
            </div>
          </form>
        </div>

        {/* Next Steps Info */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                What happens next?
              </h3>
              <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                <p>After creating your project, you'll need to create your first version before you can start coding. We'll automatically set up sample files to help you get started!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectPage;