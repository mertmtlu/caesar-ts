// src/pages/projects/CreateProjectPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/api/api';
import { ProgramCreateDto } from '@/api';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

// Types
interface ProjectFormData {
  name: string;
  description: string;
  language: string;
  type: string;
  uiType: string;
  template: string;
  includeReadme: boolean;
  includeGitignore: boolean;
  includeLicense: boolean;
}

interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  language: string;
  type: string;
  uiType: string;
  mainFile: string;
  files: { path: string; content: string }[];
  tags: string[];
}

interface ProjectError {
  field?: string;
  message: string;
}

const CreateProjectPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Form state
  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    description: '',
    language: 'JavaScript',
    type: 'Web',
    uiType: 'React',
    template: 'blank',
    includeReadme: true,
    includeGitignore: true,
    includeLicense: false
  });

  const [errors, setErrors] = useState<ProjectError[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // Multi-step form: 1=Basic Info, 2=Configuration, 3=Templates
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [createdProjectId, setCreatedProjectId] = useState<string | null>(null);

  // Configuration options
  const languageOptions = [
    { value: 'JavaScript', label: 'JavaScript', icon: '🟨' },
    { value: 'TypeScript', label: 'TypeScript', icon: '🔷' },
    { value: 'Python', label: 'Python', icon: '🐍' },
    { value: 'Java', label: 'Java', icon: '☕' },
    { value: 'C#', label: 'C#', icon: '🔵' },
    { value: 'Go', label: 'Go', icon: '🐹' },
    { value: 'Rust', label: 'Rust', icon: '🦀' },
    { value: 'PHP', label: 'PHP', icon: '🐘' }
  ];

  const typeOptions = [
    { value: 'Web', label: 'Web Application', description: 'Frontend web applications and SPAs' },
    { value: 'API', label: 'API/Backend', description: 'REST APIs and backend services' },
    { value: 'Console', label: 'Console Application', description: 'Command-line tools and scripts' },
    { value: 'Mobile', label: 'Mobile App', description: 'Mobile applications and hybrid apps' },
    { value: 'Desktop', label: 'Desktop Application', description: 'Native desktop applications' },
    { value: 'Library', label: 'Library/Package', description: 'Reusable libraries and packages' }
  ];

  const uiTypeOptions = {
    Web: [
      { value: 'React', label: 'React', description: 'Modern React with hooks' },
      { value: 'Vue', label: 'Vue.js', description: 'Progressive Vue.js framework' },
      { value: 'Angular', label: 'Angular', description: 'Full-featured Angular framework' },
      { value: 'Svelte', label: 'Svelte', description: 'Compile-time optimized framework' },
      { value: 'Vanilla', label: 'Vanilla JS', description: 'Pure JavaScript/HTML/CSS' }
    ],
    API: [
      { value: 'Express', label: 'Express.js', description: 'Fast Node.js web framework' },
      { value: 'FastAPI', label: 'FastAPI', description: 'Modern Python web framework' },
      { value: 'Spring', label: 'Spring Boot', description: 'Java enterprise framework' },
      { value: 'ASP.NET', label: 'ASP.NET Core', description: '.NET web framework' },
      { value: 'Gin', label: 'Gin', description: 'Go HTTP web framework' }
    ],
    Console: [
      { value: 'CLI', label: 'Command Line', description: 'Standard CLI application' },
      { value: 'Script', label: 'Script', description: 'Automation scripts' }
    ],
    Mobile: [
      { value: 'React Native', label: 'React Native', description: 'Cross-platform mobile' },
      { value: 'Flutter', label: 'Flutter', description: 'Google\'s UI toolkit' },
      { value: 'Ionic', label: 'Ionic', description: 'Hybrid mobile framework' }
    ],
    Desktop: [
      { value: 'Electron', label: 'Electron', description: 'Cross-platform desktop with web tech' },
      { value: 'Tauri', label: 'Tauri', description: 'Lightweight Rust-based framework' },
      { value: 'Native', label: 'Native', description: 'Platform-specific native app' }
    ],
    Library: [
      { value: 'NPM', label: 'NPM Package', description: 'Node.js package' },
      { value: 'PyPI', label: 'Python Package', description: 'Python package for PyPI' },
      { value: 'Generic', label: 'Generic Library', description: 'General-purpose library' }
    ]
  };

  // Project templates
  const templates: ProjectTemplate[] = [
    {
      id: 'blank',
      name: 'Blank Project',
      description: 'Start with an empty project',
      language: 'any',
      type: 'any',
      uiType: 'any',
      mainFile: 'index.js',
      files: [],
      tags: ['minimal', 'starter']
    },
    {
      id: 'hello-world',
      name: 'Hello World',
      description: 'Simple hello world example',
      language: 'any',
      type: 'any',
      uiType: 'any',
      mainFile: 'index.js',
      files: [
        {
          path: 'index.js',
          content: 'console.log("Hello, World!");'
        }
      ],
      tags: ['beginner', 'example']
    },
    {
      id: 'react-starter',
      name: 'React Starter',
      description: 'Basic React application with components',
      language: 'JavaScript',
      type: 'Web',
      uiType: 'React',
      mainFile: 'src/App.jsx',
      files: [
        {
          path: 'src/App.jsx',
          content: `import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to React</h1>
        <p>Edit src/App.jsx and save to reload.</p>
      </header>
    </div>
  );
}

export default App;`
        },
        {
          path: 'src/App.css',
          content: `.App {
  text-align: center;
}

.App-header {
  background-color: #282c34;
  padding: 20px;
  color: white;
}

.App-header h1 {
  margin: 0 0 16px 0;
}
`
        },
        {
          path: 'package.json',
          content: JSON.stringify({
            name: 'react-project',
            version: '1.0.0',
            dependencies: {
              react: '^18.0.0',
              'react-dom': '^18.0.0'
            },
            scripts: {
              start: 'react-scripts start',
              build: 'react-scripts build'
            }
          }, null, 2)
        }
      ],
      tags: ['react', 'frontend', 'spa']
    },
    {
      id: 'express-api',
      name: 'Express API',
      description: 'RESTful API with Express.js',
      language: 'JavaScript',
      type: 'API',
      uiType: 'Express',
      mainFile: 'server.js',
      files: [
        {
          path: 'server.js',
          content: `const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express API!' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(\`Server running on port \${port}\`);
});`
        },
        {
          path: 'package.json',
          content: JSON.stringify({
            name: 'express-api',
            version: '1.0.0',
            main: 'server.js',
            dependencies: {
              express: '^4.18.0'
            },
            scripts: {
              start: 'node server.js',
              dev: 'nodemon server.js'
            }
          }, null, 2)
        }
      ],
      tags: ['api', 'backend', 'rest']
    },
    {
      id: 'python-script',
      name: 'Python Script',
      description: 'Simple Python automation script',
      language: 'Python',
      type: 'Console',
      uiType: 'Script',
      mainFile: 'main.py',
      files: [
        {
          path: 'main.py',
          content: `#!/usr/bin/env python3
"""
Simple Python script template
"""

def main():
    print("Hello from Python!")
    print("This is a basic script template.")
    
    # Add your code here
    
if __name__ == "__main__":
    main()`
        },
        {
          path: 'requirements.txt',
          content: '# Add your Python dependencies here\n# requests>=2.28.0\n# pandas>=1.5.0'
        }
      ],
      tags: ['python', 'script', 'automation']
    }
  ];

  // Validation
  const validateStep = (stepNumber: number): ProjectError[] => {
    const newErrors: ProjectError[] = [];

    if (stepNumber >= 1) {
      // Basic info validation
      if (!formData.name.trim()) {
        newErrors.push({ field: 'name', message: 'Project name is required' });
      } else if (formData.name.length < 3) {
        newErrors.push({ field: 'name', message: 'Project name must be at least 3 characters' });
      } else if (!/^[a-zA-Z0-9\s\-_]+$/.test(formData.name)) {
        newErrors.push({ field: 'name', message: 'Project name can only contain letters, numbers, spaces, hyphens, and underscores' });
      }

      if (!formData.language) {
        newErrors.push({ field: 'language', message: 'Please select a programming language' });
      }

      if (!formData.type) {
        newErrors.push({ field: 'type', message: 'Please select a project type' });
      }
    }

    if (stepNumber >= 2) {
      // Configuration validation
      if (!formData.uiType) {
        newErrors.push({ field: 'uiType', message: 'Please select a framework/UI type' });
      }
    }

    return newErrors;
  };

  // Event handlers
  const handleInputChange = (field: keyof ProjectFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear field-specific errors
    if (errors.some(error => error.field === field)) {
      setErrors(prev => prev.filter(error => error.field !== field));
    }

    // Reset UI type when type changes
    if (field === 'type') {
      const availableUiTypes = uiTypeOptions[value as keyof typeof uiTypeOptions];
      if (availableUiTypes && availableUiTypes.length > 0) {
        setFormData(prev => ({
          ...prev,
          uiType: availableUiTypes[0].value
        }));
      }
    }
  };

  const handleNext = () => {
    const stepErrors = validateStep(step);
    if (stepErrors.length > 0) {
      setErrors(stepErrors);
      return;
    }

    setErrors([]);
    setStep(prev => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    // Validate all steps
    const allErrors = validateStep(3);
    if (allErrors.length > 0) {
      setErrors(allErrors);
      return;
    }

    setIsLoading(true);
    setErrors([]);

    try {
      // Get selected template
      const selectedTemplate = templates.find(t => t.id === formData.template);
      const mainFile = selectedTemplate?.mainFile || 
        (formData.language === 'Python' ? 'main.py' : 'index.js');

      // Create project DTO
      const createDto = new ProgramCreateDto({
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        type: formData.type,
        language: formData.language,
        mainFile: mainFile,
        uiType: formData.uiType,
        uiConfiguration: {},
        metadata: {
          template: formData.template,
          includeReadme: formData.includeReadme,
          includeGitignore: formData.includeGitignore,
          includeLicense: formData.includeLicense,
          createdBy: user?.id || user?.username
        }
      });

      // Create project
      const response = await api.programs.programs_Create(createDto);

      if (response.success && response.data?.id) {
        setCreatedProjectId(response.data.id);
        setShowSuccessMessage(true);

        // If template has files, we could add them here via the files API
        // For now, we'll just create the project and let the user add files later

        // Auto-redirect after a delay
        setTimeout(() => {
          navigate(`/projects/${response.data!.id}`);
        }, 2000);
      } else {
        const errorMessages = response.errors && response.errors.length > 0 
          ? response.errors 
          : [response.message || 'Failed to create project'];
        
        setErrors(errorMessages.map(msg => ({ message: msg })));
      }
    } catch (error) {
      console.error('Failed to create project:', error);
      setErrors([{ message: 'An unexpected error occurred. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const getFieldError = (fieldName: string): string | undefined => {
    return errors.find(error => error.field === fieldName)?.message;
  };

  const getGeneralErrors = (): string[] => {
    return errors.filter(error => !error.field).map(error => error.message);
  };

  const filteredTemplates = templates.filter(template => 
    template.language === 'any' || 
    template.language === formData.language
  );

  const availableUiTypes = uiTypeOptions[formData.type as keyof typeof uiTypeOptions] || [];

  // Success message
  if (showSuccessMessage) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30">
            <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
            Project Created Successfully!
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Your project "{formData.name}" has been created. Redirecting you to the project page...
          </p>
          <div className="mt-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <Button
            variant="primary"
            fullWidth
            onClick={() => navigate(`/projects/${createdProjectId}`)}
          >
            Go to Project
          </Button>
          <Button
            variant="outline"
            fullWidth
            onClick={() => navigate('/projects')}
          >
            View All Projects
          </Button>
        </div>
      </div>
    );
  }

  const generalErrors = getGeneralErrors();

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/projects')}
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            }
          >
            Back to Projects
          </Button>
        </div>
        
        <div className="mt-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Create New Project
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Set up your new programming project with templates and configuration
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <nav aria-label="Progress">
          <ol className="flex items-center">
            {[
              { number: 1, name: 'Basic Information' },
              { number: 2, name: 'Configuration' },
              { number: 3, name: 'Templates & Review' }
            ].map((stepInfo, index) => (
              <li key={stepInfo.number} className={`${index !== 0 ? 'flex-1' : ''} relative`}>
                {index !== 0 && (
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className={`h-0.5 w-full ${step > stepInfo.number - 1 ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`} />
                  </div>
                )}
                <div className="relative flex items-center justify-center">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      step >= stepInfo.number
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {step > stepInfo.number ? (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="text-sm font-medium">{stepInfo.number}</span>
                    )}
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                    {stepInfo.name}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {/* Error Messages */}
      {generalErrors.length > 0 && (
        <div className="mb-6 rounded-md bg-red-50 dark:bg-red-900/20 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                Please fix the following errors:
              </h3>
              <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                <ul className="list-disc list-inside space-y-1">
                  {generalErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form Content */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        {/* Step 1: Basic Information */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Project Information
              </h3>
              
              <div className="grid grid-cols-1 gap-6">
                <Input
                  label="Project Name"
                  id="name"
                  required
                  fullWidth
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  errorMessage={getFieldError('name')}
                  placeholder="My Awesome Project"
                  helperText="Choose a descriptive name for your project"
                />

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleInputChange('description')}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm dark:bg-gray-800 dark:text-gray-100 dark:ring-gray-600 dark:focus:ring-blue-500"
                    placeholder="Describe what your project does..."
                  />
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Brief description of your project's purpose and functionality
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="language" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Programming Language <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="language"
                      value={formData.language}
                      onChange={handleInputChange('language')}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm dark:bg-gray-800 dark:text-gray-100 dark:ring-gray-600 dark:focus:ring-blue-500"
                    >
                      {languageOptions.map(lang => (
                        <option key={lang.value} value={lang.value}>
                          {lang.icon} {lang.label}
                        </option>
                      ))}
                    </select>
                    {getFieldError('language') && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400">{getFieldError('language')}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Project Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="type"
                      value={formData.type}
                      onChange={handleInputChange('type')}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm dark:bg-gray-800 dark:text-gray-100 dark:ring-gray-600 dark:focus:ring-blue-500"
                    >
                      {typeOptions.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    {getFieldError('type') && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400">{getFieldError('type')}</p>
                    )}
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      {typeOptions.find(t => t.value === formData.type)?.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Configuration */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Framework & Configuration
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">
                    Framework/UI Type <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {availableUiTypes.map(uiType => (
                      <div
                        key={uiType.value}
                        className={`relative rounded-lg border p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                          formData.uiType === uiType.value
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-300 dark:border-gray-600'
                        }`}
                        onClick={() => setFormData(prev => ({ ...prev, uiType: uiType.value }))}
                      >
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              type="radio"
                              name="uiType"
                              value={uiType.value}
                              checked={formData.uiType === uiType.value}
                              onChange={handleInputChange('uiType')}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-600 border-gray-300 dark:border-gray-600"
                            />
                          </div>
                          <div className="ml-3">
                            <label className="text-sm font-medium text-gray-900 dark:text-white">
                              {uiType.label}
                            </label>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {uiType.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {getFieldError('uiType') && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">{getFieldError('uiType')}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">
                    Additional Options
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="includeReadme"
                        checked={formData.includeReadme}
                        onChange={handleInputChange('includeReadme')}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-600 border-gray-300 rounded dark:border-gray-600"
                      />
                      <label htmlFor="includeReadme" className="ml-3 text-sm text-gray-900 dark:text-white">
                        Include README.md file
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="includeGitignore"
                        checked={formData.includeGitignore}
                        onChange={handleInputChange('includeGitignore')}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-600 border-gray-300 rounded dark:border-gray-600"
                      />
                      <label htmlFor="includeGitignore" className="ml-3 text-sm text-gray-900 dark:text-white">
                        Include .gitignore file
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="includeLicense"
                        checked={formData.includeLicense}
                        onChange={handleInputChange('includeLicense')}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-600 border-gray-300 rounded dark:border-gray-600"
                      />
                      <label htmlFor="includeLicense" className="ml-3 text-sm text-gray-900 dark:text-white">
                        Include LICENSE file (MIT License)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Templates */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Choose a Template
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredTemplates.map(template => (
                  <div
                    key={template.id}
                    className={`relative rounded-lg border p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                      formData.template === template.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, template: template.id }))}
                  >
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          type="radio"
                          name="template"
                          value={template.id}
                          checked={formData.template === template.id}
                          onChange={handleInputChange('template')}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-600 border-gray-300 dark:border-gray-600"
                        />
                      </div>
                      <div className="ml-3 flex-1">
                        <label className="text-sm font-medium text-gray-900 dark:text-white">
                          {template.name}
                        </label>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {template.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {template.tags.map(tag => (
                            <span
                              key={tag}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Summary */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Project Summary</h4>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="font-medium text-gray-500 dark:text-gray-400">Name</dt>
                  <dd className="mt-1 text-gray-900 dark:text-white">{formData.name || 'Untitled Project'}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-500 dark:text-gray-400">Language</dt>
                  <dd className="mt-1 text-gray-900 dark:text-white">{formData.language}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-500 dark:text-gray-400">Type</dt>
                  <dd className="mt-1 text-gray-900 dark:text-white">{formData.type}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-500 dark:text-gray-400">Framework</dt>
                  <dd className="mt-1 text-gray-900 dark:text-white">{formData.uiType}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-500 dark:text-gray-400">Template</dt>
                  <dd className="mt-1 text-gray-900 dark:text-white">
                    {templates.find(t => t.id === formData.template)?.name}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-500 dark:text-gray-400">Additional Files</dt>
                  <dd className="mt-1 text-gray-900 dark:text-white">
                    {[
                      formData.includeReadme && 'README.md',
                      formData.includeGitignore && '.gitignore',
                      formData.includeLicense && 'LICENSE'
                    ].filter(Boolean).join(', ') || 'None'}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <div>
            {step > 1 && (
              <Button
                variant="outline"
                onClick={handleBack}
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                }
              >
                Back
              </Button>
            )}
          </div>
          
          <div>
            {step < 3 ? (
              <Button
                variant="primary"
                onClick={handleNext}
                rightIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                }
              >
                Next
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleSubmit}
                loading={isLoading}
                disabled={isLoading}
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                }
              >
                {isLoading ? 'Creating Project...' : 'Create Project'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectPage;