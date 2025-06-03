// src/components/common/LoadingSpinner.tsx
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  centered?: boolean;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  text = 'Loading...', 
  centered = true,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8', 
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg', 
    xl: 'text-xl'
  };

  const containerClasses = centered 
    ? 'flex flex-col items-center justify-center min-h-[200px]'
    : 'flex items-center space-x-3';

  return (
    <div className={`${containerClasses} ${className}`}>
      {/* Spinner */}
      <div className="relative">
        <div
          className={`
            ${sizeClasses[size]} 
            animate-spin rounded-full border-4 border-gray-200 dark:border-gray-700
          `}
        />
        <div
          className={`
            ${sizeClasses[size]} 
            animate-spin rounded-full border-4 border-transparent border-t-blue-600 dark:border-t-blue-400
            absolute top-0 left-0
          `}
        />
      </div>

      {/* Loading text */}
      {text && (
        <div className={`
          ${textSizeClasses[size]} 
          text-gray-600 dark:text-gray-300 font-medium
          ${centered ? 'mt-4' : ''}
        `}>
          {text}
        </div>
      )}
    </div>
  );
};

export default LoadingSpinner;