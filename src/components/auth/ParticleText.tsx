// src/components/auth/ParticleText.tsx
import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { MeshSurfaceSampler } from 'three/addons/math/MeshSurfaceSampler.js';

interface Particle {
  initialPos: THREE.Vector3;
  targetPos: THREE.Vector3;
  currentPos: THREE.Vector3;
  repelOffset: THREE.Vector2;
  progress: number;
}

interface Props {
  text: string;
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
}

const ParticleText: React.FC<Props> = ({ text, mousePosition }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const particlesRef = useRef<Particle[]>([]);
  const noise3D = useMemo(() => createNoise3D(), []);
  const clockRef = useRef(new THREE.Clock());
  const { camera } = useThree();
  const mouse3D = useRef(new THREE.Vector3());
  const [particlesReady, setParticlesReady] = useState(false);

  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Configuration constants
  const PARTICLE_COUNT = 20000;
  const REPEL_RADIUS = 0.5;
  const REPEL_STRENGTH = 1;
  const RETURN_DAMPING = 1;
  const SWIRL_INTENSITY = 0.03;
  const CONVERGENCE_SPEED = 0.008;

  // Initialize particles and positions buffer synchronously
  const { particles, positions } = useMemo(() => {
    const particles: Particle[] = [];
    const positions = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Create initial random position
      const initialPos = new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 5
      );

      // Create particle with targetPos initially set to initialPos
      const particle: Particle = {
        initialPos: initialPos,
        targetPos: new THREE.Vector3(), // Will be set in useEffect after font loads
        currentPos: new THREE.Vector3(),
        repelOffset: new THREE.Vector2(0, 0),
        progress: 0,
      };

      // CRITICAL: Set current position to initial position
      particle.currentPos.copy(initialPos);

      // Populate positions buffer with initial positions
      positions[i * 3] = initialPos.x;
      positions[i * 3 + 1] = initialPos.y;
      positions[i * 3 + 2] = initialPos.z;

      particles.push(particle);
    }

    return { particles, positions };
  }, [PARTICLE_COUNT]);

  // Store particles in ref
  useEffect(() => {
    particlesRef.current = particles;
    setParticlesReady(true); // Particles are ready immediately
  }, [particles]);

  // Load font and set target positions using MeshSurfaceSampler
  useEffect(() => {
    const fontLoader = new FontLoader();

    fontLoader.load(
      '/fonts/helvetiker_bold.typeface.json',
      (font) => {
        // Create text geometry with depth for the sampler to work properly
        const textGeometry = new TextGeometry(text, {
          font: font,
          size: 1.8,
          depth: 0.1, // CRITICAL: Sampler needs surface area to work on
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 0.03,
          bevelSize: 0.0001,
          bevelSegments: 1,
        });

        textGeometry.center();

        // --- NEW SAMPLING LOGIC ---
        // Create a temporary mesh to be used by the sampler
        const tempMesh = new THREE.Mesh(textGeometry);
        const sampler = new MeshSurfaceSampler(tempMesh).build();

        const particles = particlesRef.current;
        if (particles.length === 0) return; // Guard against empty array

        const tempPosition = new THREE.Vector3(); // Reusable vector to avoid creating new objects

        // For each particle, sample a random point on the text surface
        // and set it as the particle's target position.
        for (let i = 0; i < particles.length; i++) {
          sampler.sample(tempPosition);
          particles[i].targetPos.copy(tempPosition);
        }
        // --- END OF NEW LOGIC ---

        // Clean up the geometry as it's no longer needed
        textGeometry.dispose();
      },
      undefined,
      (error) => {
        console.error('An error happened during font loading.', error);
      }
    );
  }, [text]);

  // Main animation loop
  useFrame(() => {
    if (!pointsRef.current || !particlesReady || particlesRef.current.length === 0) return;

    const positionAttribute = pointsRef.current.geometry.attributes.position;
    const time = clockRef.current.getElapsedTime();

    // Convert 2D mouse to 3D world space
    mouse3D.current.set(
      mousePosition.current.x,
      mousePosition.current.y,
      0.5
    ).unproject(camera);

    const radiusSq = REPEL_RADIUS * REPEL_RADIUS;
    const particles = particlesRef.current;

    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];
      const i3 = i * 3;

      // ===== CONVERGENCE PHASE =====
      if (particle.progress < 1) {
        particle.progress += CONVERGENCE_SPEED;
        const eased = 1 - Math.pow(1 - particle.progress, 3); // easeOutCubic

        particle.currentPos.lerpVectors(
          particle.initialPos,
          particle.targetPos,
          eased
        );
      }

      // ===== MOUSE REPULSION (OPTIMIZED) =====
      const dx = particle.currentPos.x - (mouse3D.current.x * 35);
      const dy = particle.currentPos.y - (mouse3D.current.y * 35);

      // Bounding box check first (cheap operation)
      if (Math.abs(dx) < REPEL_RADIUS && Math.abs(dy) < REPEL_RADIUS) {
        const distSq = dx * dx + dy * dy;

        if (distSq < radiusSq && distSq > 0.01) {
          // Calculate repel force (inverse square falloff)
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;

          // Apply force in direction away from mouse
          particle.repelOffset.x += (dx / dist) * force;
          particle.repelOffset.y += (dy / dist) * force;
        } else {
          // Spring back to target when outside radius
          particle.repelOffset.x *= (1 - RETURN_DAMPING);
          particle.repelOffset.y *= (1 - RETURN_DAMPING);
        }
      } else {
        // Far from mouse - gentle spring back
        particle.repelOffset.x *= (1 - RETURN_DAMPING * 0.5);
        particle.repelOffset.y *= (1 - RETURN_DAMPING * 0.5);
      }

      // ===== SWIRLING EFFECT (after formation) =====
      let swirlX = 0;
      let swirlY = 0;

      if (particle.progress >= 1 && SWIRL_INTENSITY > 0) {
        const noiseX = noise3D(
          particle.targetPos.x * 0.15,
          particle.targetPos.y * 0.15,
          time * 0.2 + i * 0.01
        );
        const noiseY = noise3D(
          particle.targetPos.x * 0.15 + 100,
          particle.targetPos.y * 0.15,
          time * 0.2 + i * 0.01
        );

        swirlX = noiseX * SWIRL_INTENSITY;
        swirlY = noiseY * SWIRL_INTENSITY;
      }

      // ===== FINAL POSITION (combine all forces) =====
      positionAttribute.array[i3] = particle.targetPos.x + particle.repelOffset.x + swirlX;
      positionAttribute.array[i3 + 1] = particle.targetPos.y + particle.repelOffset.y + swirlY;
      positionAttribute.array[i3 + 2] = particle.targetPos.z;
    }

    positionAttribute.needsUpdate = true;
  });

  return (
    <>
      {/* Particle points */}
      {particlesReady && (
        <points ref={pointsRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[positions, 3]}
              count={PARTICLE_COUNT}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.04}
            color="#ffffff"
            transparent
            opacity={0.9}
            sizeAttenuation
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
      )}
    </>
  );
};

export default ParticleText;
