import React from 'react';

/**
 * A compact icon representing a cloud terminal, 
 * ideal for use in headers, buttons, or navigation bars.
 */
const CompactTerminalCloudIcon: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <svg 
        width="60" 
        height="60" 
        viewBox="0 0 60 60" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Compact Terminal Cloud Icon"
      >
        {/* Terminal Window */}
        <rect 
          x="8" 
          y="12" 
          width="44" 
          height="36" 
          rx="4" 
          fill="#0f172a"
          stroke="#1e293b"
          strokeWidth="1.5"
        />
        
        {/* Terminal Header */}
        <rect 
          x="8" 
          y="12" 
          width="44" 
          height="10" 
          rx="4" 
          fill="#1e293b"
        />
        <rect 
          x="8" 
          y="18" 
          width="44" 
          height="4" 
          fill="#1e293b"
        />
        
        {/* Window Buttons */}
        <circle cx="14" cy="17" r="1.5" fill="#ef4444" />
        <circle cx="20" cy="17" r="1.5" fill="#fbbf24" />
        <circle cx="26" cy="17" r="1.5" fill="#10b981" />
        
        {/* First line of text: prompt and command */}
        <text 
          x="12" 
          y="37" 
          fill="#10b981" 
          fontSize="8" 
          fontFamily="monospace"
          fontWeight="bold"
        >
          $
        </text>
        <text 
          x="18" 
          y="37" 
          fill="#22d3ee" 
          fontSize="8" 
          fontFamily="monospace"
        >
          Caesar
        </text>
        
        {/* <rect 
          x="40" 
          y="32" 
          width="4" 
          height="6" 
          fill="#22d3ee"
          opacity="0.8"
        /> */}
    
      </svg>
    </div>
  );
};

export default CompactTerminalCloudIcon;