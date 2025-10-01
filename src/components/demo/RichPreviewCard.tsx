// src/components/demo/RichPreviewCard.tsx
import React, { useState, useRef, useEffect } from 'react';
import { getProgramDesktopIcon, getWorkflowIcon, getRemoteAppIcon } from './IconHelpers';

interface PreviewContent {
  image?: string;
  gif?: string;
  video?: string;
  features?: string[];
}

interface RichPreviewCardProps {
  id: string;
  name: string;
  description?: string;
  type: 'program' | 'workflow' | 'remoteapp';

  // Program-specific
  language?: string;
  programType?: string;
  versionCount?: number;
  hasComponents?: boolean;

  // Workflow-specific
  nodeCount?: number;
  hasUIComponents?: boolean;
  status?: string | number;

  // Remote app-specific
  url?: string;
  isPublic?: boolean;

  // Common
  icon?: string;
  preview?: PreviewContent;
  onDoubleClick: () => void;
}

const RichPreviewCard: React.FC<RichPreviewCardProps> = ({
  name,
  description,
  type,
  icon,
  language,
  programType,
  versionCount,
  nodeCount,
  hasUIComponents,
  status,
  isPublic,
  preview,
  onDoubleClick
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Handle video playback on hover
  useEffect(() => {
    if (isHovered && videoRef.current && preview?.video) {
      hoverTimeoutRef.current = setTimeout(() => {
        videoRef.current?.play().catch((err: Error) => console.error('Video play failed:', err));
      }, 300);
    } else if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }

    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, [isHovered, preview]);

  // Get appropriate icon based on type
  const getAppIcon = () => {
    switch (type) {
      case 'program':
        return getProgramDesktopIcon(language, programType, icon);
      case 'workflow':
        return getWorkflowIcon(status, nodeCount, hasUIComponents, icon);
      case 'remoteapp':
        return getRemoteAppIcon(status?.toString(), isPublic, icon);
      default:
        return null;
    }
  };

  const hasPreview = preview && (preview.image || preview.gif || preview.video);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDoubleClick={onDoubleClick}
    >
      {/* Base State: Original ExecutionsPage Card Layout */}
      <div className="flex flex-col items-center space-y-2 group relative">
        {/* Icon with hover effect */}
        <div className="relative" title={description || name}>
          {getAppIcon()}
        </div>

        {/* App Name */}
        <div className="text-center">
          <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-4 max-w-[120px]">
            {name}
          </p>
        </div>
      </div>

      {/* Rich Preview Overlay (only when has preview and hovered) */}
      {hasPreview && isHovered && (
        <div className="absolute inset-0 z-50 transform -translate-y-4 scale-110 transition-all duration-300">
          <div className="relative w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-2xl overflow-hidden border-2 border-blue-500 dark:border-blue-400">
            {/* Media Content */}
            <div className="relative h-48 overflow-hidden">
              {/* Video Preview */}
              {preview.video && (
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  loop
                  muted
                  playsInline
                  onLoadedData={() => setVideoLoaded(true)}
                >
                  <source src={preview.video} type="video/mp4" />
                </video>
              )}

              {/* GIF Preview */}
              {!preview.video && preview.gif && (
                <img
                  src={preview.gif}
                  alt={`${name} preview`}
                  className="w-full h-full object-cover"
                />
              )}

              {/* Static Image Preview */}
              {!preview.video && !preview.gif && preview.image && (
                <img
                  src={preview.image}
                  alt={`${name} preview`}
                  className="w-full h-full object-cover"
                />
              )}

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
            </div>

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/70 to-transparent">
              {/* Title and Description */}
              <h3 className="text-white font-bold text-lg mb-1 line-clamp-1">
                {name}
              </h3>
              {description && (
                <p className="text-white/90 text-xs mb-2 line-clamp-2">
                  {description}
                </p>
              )}

              {/* Feature Highlights */}
              {preview.features && preview.features.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {preview.features.slice(0, 3).map((feature, i) => (
                    <span
                      key={i}
                      className="bg-white/20 backdrop-blur-sm text-white px-2 py-0.5 rounded-full text-xs font-medium border border-white/30"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Hint */}
              <div className="flex items-center text-white/80 text-xs">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                </svg>
                <span>Double-click to {type === 'remoteapp' ? 'launch' : 'execute'}</span>
              </div>
            </div>

            {/* Loading indicator for video */}
            {preview.video && !videoLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RichPreviewCard;
