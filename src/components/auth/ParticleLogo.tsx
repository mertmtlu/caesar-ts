// src/components/auth/ParticleLogo.tsx
import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import ParticleText from './ParticleText';

const ParticleLogo: React.FC = () => {
  // Store mouse position in normalized device coordinates (-1 to 1)
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Convert to normalized device coordinates
      // x: left edge = -1, right edge = 1
      // y: bottom edge = -1, top edge = 1 (inverted from screen coordinates)
      mouseRef.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full">
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
