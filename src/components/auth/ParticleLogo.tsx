// src/components/auth/ParticleLogo.tsx
import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import ParticleText from './ParticleText';

const ParticleLogo: React.FC = () => {
  // Store mouse position in normalized device coordinates (-1 to 1)
  const mouseRef = useRef({ x: 0, y: 0 });
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Get the canvas container's bounding box
      const container = canvasContainerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();

      // Calculate mouse position relative to the canvas container
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Convert to normalized device coordinates relative to the canvas
      // x: left edge = -1, right edge = 1
      // y: bottom edge = -1, top edge = 1 (inverted from screen coordinates)
      mouseRef.current = {
        x: (x / rect.width) * 2 - 1,
        y: -(y / rect.height) * 2 + 1,
      };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={canvasContainerRef} className="absolute inset-0 w-full h-full">
      {/* Three.js Canvas */}
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        className="w-full h-full"
        dpr={[1, 2]} // Pixel ratio: 1x on mobile, 2x on retina
        gl={{ alpha: true }} // Enable transparent background
      >
        <ambientLight intensity={0.5} />
        <ParticleText text="CAESAR" mousePosition={mouseRef} />
      </Canvas>
    </div>
  );
};

export default ParticleLogo;
