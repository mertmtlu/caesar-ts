// src/components/demo/IconHelpers.tsx
import React from 'react';
import IconDisplay from '@/components/icons/IconDisplay';

// Program icon generation
export const getProgramDesktopIcon = (
  language?: string,
  programType?: string,
  iconData?: string
): React.ReactNode => {
  // If we have custom icon data, use IconDisplay
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

  // Fallback to language/type-based generated icons
  const lang = language?.toLowerCase() || '';
  const type = programType?.toLowerCase() || '';

  // Python icon
  if (lang.includes('python')) {
    return (
      <div className="w-16 h-16 bg-gradient-to-br from-blue-400 via-blue-500 to-yellow-500 rounded-lg flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer border-2 border-gray-200 dark:border-gray-600">
        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10z"/>
        </svg>
        <div className="text-white font-bold text-xs mt-1">PY</div>
      </div>
    );
  }

  // JavaScript/Node.js icon
  if (lang.includes('javascript') || lang.includes('node')) {
    return (
      <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer border-2 border-gray-200 dark:border-gray-600">
        <svg className="w-8 h-8 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
          <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
        </svg>
        <div className="text-gray-900 font-bold text-xs mt-1">JS</div>
      </div>
    );
  }

  // C# icon
  if (lang.includes('c#') || lang.includes('csharp')) {
    return (
      <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer border-2 border-gray-200 dark:border-gray-600">
        <div className="text-white font-bold text-2xl">C#</div>
      </div>
    );
  }

  // R icon
  if (lang.includes('r')) {
    return (
      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer border-2 border-gray-200 dark:border-gray-600">
        <div className="text-white font-bold text-3xl">R</div>
      </div>
    );
  }

  // Generic fallback based on type
  const getBgColor = () => {
    if (type.includes('data')) return 'from-teal-500 to-teal-700';
    if (type.includes('ml') || type.includes('ai')) return 'from-indigo-500 to-indigo-700';
    if (type.includes('web')) return 'from-green-500 to-green-700';
    return 'from-gray-500 to-gray-700';
  };

  return (
    <div className={`w-16 h-16 bg-gradient-to-br ${getBgColor()} rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer border-2 border-gray-200 dark:border-gray-600`}>
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    </div>
  );
};

// Workflow icon generation
export const getWorkflowIcon = (
  status?: string | number,
  nodeCount?: number,
  hasUIComponents?: boolean,
  iconData?: string
): React.ReactNode => {
  // If we have custom icon data, use IconDisplay
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

  // Helper to create icon with consistent structure
  const createIcon = (
    bgColor: string,
    textColor: string,
    iconText: string,
    showNodeCount: boolean,
    svgPath?: string
  ) => (
    <div className={`w-16 h-16 ${bgColor} rounded-lg flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer border-2 border-gray-200 dark:border-gray-600 relative`}>
      {svgPath && (
        <svg className={`w-8 h-8 ${textColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={svgPath} />
        </svg>
      )}
      {showNodeCount && (
        <div className={`${textColor} font-bold text-sm text-center`}>
          <div>{iconText}</div>
          {nodeCount && nodeCount > 0 && (
            <div className="text-xs mt-1">{nodeCount} nodes</div>
          )}
        </div>
      )}
    </div>
  );

  // Map numeric status to string
  const getStatusName = (statusValue: string | number): string => {
    const statusStr = String(statusValue || '');
    switch (statusStr) {
      case '0': return 'draft';
      case '1': return 'active';
      case '2': return 'published';
      case '3': return 'archived';
      case '4': return 'deleted';
      default: return statusStr.toLowerCase();
    }
  };

  const mappedStatus = getStatusName(status || '');

  // Published/Active workflows
  if (mappedStatus === 'published' || mappedStatus === 'active') {
    return createIcon(
      'bg-green-500',
      'text-white',
      'WF',
      true,
      'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z M4 6h16v2H4zm4 5h8v6H8v-6z'
    );
  }

  // Draft workflows
  if (mappedStatus === 'draft') {
    return createIcon(
      'bg-yellow-500',
      'text-white',
      'WF',
      true,
      'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z M4 6h16v2H4zm4 5h8v6H8v-6z'
    );
  }

  // Workflows with UI components
  if (hasUIComponents) {
    return createIcon(
      'bg-blue-500',
      'text-white',
      'WF',
      true,
      'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
    );
  }

  // Default workflow
  return createIcon(
    'bg-purple-500',
    'text-white',
    'WF',
    true,
    'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
  );
};

// Remote app icon generation
export const getRemoteAppIcon = (
  status?: string,
  isPublic?: boolean,
  iconData?: string
): React.ReactNode => {
  // If we have custom icon data, use IconDisplay with overlay
  if (iconData) {
    return (
      <div className="w-16 h-16 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer border-2 border-gray-200 dark:border-gray-600 overflow-hidden relative">
        <IconDisplay
          iconData={iconData}
          entityType="remoteapp"
          className="w-full h-full object-cover"
        />
        {/* Public/Private indicator overlay */}
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
          {isPublic ? (
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

  // Get status-based color
  const getStatusColor = () => {
    switch (status?.toLowerCase()) {
      case 'active': return 'bg-green-500';
      case 'maintenance': return 'bg-yellow-500';
      case 'inactive': return 'bg-red-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className={`w-16 h-16 ${getStatusColor()} rounded-lg flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer border-2 border-gray-200 dark:border-gray-600 relative`}>
      {/* Globe icon for remote apps */}
      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
      </svg>

      {/* Public/Private indicator */}
      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
        {isPublic ? (
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
