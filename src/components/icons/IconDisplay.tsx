import React from 'react';

interface IconDisplayProps {
  iconData?: string | null;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallbackIcon?: React.ReactNode;
  className?: string;
  entityType?: 'program' | 'workflow' | 'remoteapp';
}

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8', 
  lg: 'w-10 h-10',
  xl: 'w-12 h-12'
};

const fallbackIcons = {
  program: (
    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
      <svg className="w-3/5 h-3/5 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M10.03 2.8l-.9 3.14H4.61l2.52 1.83-.96 2.97 2.52-1.83 2.52 1.83-.96-2.97 2.52-1.83h-4.52L10.03 2.8zM19 7h-8v2h8V7zM19 11h-8v2h8v-2zM19 15h-8v2h8v-2z"/>
      </svg>
    </div>
  ),
  workflow: (
    <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
      <svg className="w-3/5 h-3/5 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M5 4h4c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1V5c0-.55.45-1 1-1zm0 10h4c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1zm10-10h4c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1h-4c-.55 0-1-.45-1-1V5c0-.55.45-1 1-1zm0 10h4c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1h-4c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1zM12 7h2v2h-2V7zm0 6h2v2h-2v-2z"/>
      </svg>
    </div>
  ),
  remoteapp: (
    <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
      <svg className="w-3/5 h-3/5 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    </div>
  )
};

const IconDisplay: React.FC<IconDisplayProps> = ({
  iconData,
  size = 'md',
  fallbackIcon,
  className = '',
  entityType = 'program'
}) => {
  const sizeClass = sizeClasses[size];
  const containerClasses = `${sizeClass} rounded-lg flex items-center justify-center overflow-hidden ${className}`;

  if (iconData) {
    // Ensure iconData is a string
    const iconDataString = typeof iconData === 'string' ? iconData : String(iconData);
    
    // For SVG data, we need to use the correct MIME type
    const isBase64 = iconDataString.startsWith('data:');
    let imageSrc: string;
    
    if (isBase64) {
      imageSrc = iconDataString;
    } else {
      // Detect if this is SVG data by looking at the base64 content
      try {
        const decoded = atob(iconDataString);
        if (decoded.includes('<svg') || decoded.includes('svg')) {
          imageSrc = `data:image/svg+xml;base64,${iconDataString}`;
        } else {
          imageSrc = `data:image/png;base64,${iconDataString}`;
        }
      } catch {
        imageSrc = `data:image/png;base64,${iconDataString}`;
      }
    }
    
    return (
      <div className={containerClasses}>
        <img 
          src={imageSrc} 
          alt="Icon"
          className="w-full h-full object-cover rounded-lg"
          onError={(e) => {
            // If image fails to load, hide it and show fallback
            (e.target as HTMLImageElement).style.display = 'none';
            const parent = (e.target as HTMLImageElement).parentElement;
            if (parent) {
              const fallback = fallbackIcon || fallbackIcons[entityType];
              parent.innerHTML = '';
              if (fallback && React.isValidElement(fallback)) {
                // For React elements, we need a different approach
                const fallbackDiv = document.createElement('div');
                fallbackDiv.className = 'w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700';
                fallbackDiv.innerHTML = fallbackIcons[entityType]?.props?.children || '';
                parent.appendChild(fallbackDiv);
              }
            }
          }}
        />
      </div>
    );
  }

  // Show fallback icon
  const defaultFallback = fallbackIcons[entityType];
  const iconToShow = fallbackIcon || defaultFallback;

  return (
    <div className={`${containerClasses} bg-gray-100 dark:bg-gray-700`}>
      {iconToShow}
    </div>
  );
};

export default IconDisplay;