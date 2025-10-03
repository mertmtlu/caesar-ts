import { useEffect, useRef, useState } from 'react';
import { X, Play, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface VideoModalProps {
  isOpen: boolean;
  videoPath: string | null;
  itemName?: string | null;
  creatorName?: string | null;
  onClose: () => void;
}

export function VideoModal({ isOpen, videoPath, itemName, creatorName, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    if (!isOpen && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    if (!isOpen) {
      setShowPreview(true);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen || !videoPath) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      <div
        className="relative w-full max-w-5xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
          aria-label="Close video"
        >
          <X size={32} />
        </button>

        {showPreview ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden shadow-2xl cursor-pointer group"
            onClick={() => setShowPreview(false)}
            style={{ aspectRatio: '16/9' }}
          >
            <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
              {/* Gradient overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Item info */}
              <div className="relative z-10 text-center space-y-8">
                <h2 className="text-7xl font-bold text-white mb-2">
                  {itemName || 'Video Preview'}
                </h2>

                {creatorName && (
                  <div className="flex items-center justify-center gap-3 text-gray-300">
                    <div className="p-2 rounded-lg bg-white/10">
                      <User className="w-5 h-5" />
                    </div>
                    <span className="text-lg font-medium">{creatorName}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-black rounded-lg overflow-hidden shadow-2xl"
          >
            <video
              ref={videoRef}
              src={videoPath || ''}
              controls
              autoPlay
              className="w-full h-auto"
              aria-labelledby="video-modal-title"
            >
              Your browser does not support the video tag.
            </video>
          </motion.div>
        )}
      </div>
    </div>
  );
}
