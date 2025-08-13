// src/components/editor/InfoButton.tsx
import React, { useState } from 'react';
import Button from '@/components/common/Button';

interface InfoButtonProps {
  onClick: () => void;
  className?: string;
}

const InfoButton: React.FC<InfoButtonProps> = ({ onClick, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400
          hover:bg-blue-50 dark:hover:bg-blue-900/20
          transition-all duration-200 ease-in-out
          border border-transparent hover:border-blue-200 dark:hover:border-blue-800
          ${className}
        `}
        title="Program Integration Guide"
      >
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${isHovered ? 'scale-110' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </Button>
      
      {/* Tooltip */}
      {isHovered && (
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 text-xs text-white bg-gray-900 dark:bg-gray-700 rounded-lg shadow-lg whitespace-nowrap z-50">
          Program Integration Guide
          <div className="absolute top-full right-3 -mt-1 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
        </div>
      )}
    </div>
  );
};

export default InfoButton;