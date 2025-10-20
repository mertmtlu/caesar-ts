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
  const PARTICLE_COUNT = 40000;
  const EFFECT_RADIUS = 1; // Radius of the gravity effect zone
  const REPULSION_STRENGTH = 20; // Maximum push strength (higher = stronger push away)
  const REPULSION_SMOOTHNESS = 0.01; // How quickly particles move to repelled position (0-1, lower = smoother)
  const RETURN_SPEED = 0.05; // How quickly particles return to target when not affected
  const SWIRL_INTENSITY = 0.15;
  const CONVERGENCE_SPEED = 0.1;

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
          size: 4,
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

    // ===== V2.0: IMPROVED MOUSE POSITION CONVERSION =====
    // Convert normalized device coordinates (-1 to 1) to world space
    // Create a raycaster plane at z=0 to get accurate 3D position
    const raycaster = new THREE.Raycaster();
    const mouseNDC = new THREE.Vector2(mousePosition.current.x, mousePosition.current.y);
    raycaster.setFromCamera(mouseNDC, camera);

    // Create a plane at z=0 (where the text is)
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const intersectPoint = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, intersectPoint);

    // Store the accurate mouse position in world space
    mouse3D.current.copy(intersectPoint);

    const radiusSq = EFFECT_RADIUS * EFFECT_RADIUS;
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

      // ===== GRAVITY-BASED REPULSION EFFECT =====
      // Calculate distance from particle's target position to mouse
      const dx = particle.targetPos.x - mouse3D.current.x;
      const dy = particle.targetPos.y - mouse3D.current.y;
      const distSq = dx * dx + dy * dy;

      if (distSq < radiusSq && distSq > 0.001) {
        // Particle is within effect radius
        const dist = Math.sqrt(distSq);

        // Calculate falloff: closer particles are affected more (inverse square for realistic gravity)
        // Using inverse distance falloff: strength decreases with distance
        const falloff = 1 - (dist / EFFECT_RADIUS); // 1.0 at center, 0.0 at edge

        // Direction away from mouse (repulsion)
        const dirX = dx / dist;
        const dirY = dy / dist;

        // Calculate push distance based on repulsion strength and falloff
        // Closer particles are pushed more strongly, further particles are pushed less
        const pushStrength = REPULSION_STRENGTH * falloff;
        const pushDistance = pushStrength;

        // Target position for repelled particle (pushed away from mouse)
        const repelTargetX = particle.targetPos.x + dirX * pushDistance;
        const repelTargetY = particle.targetPos.y + dirY * pushDistance;

        // Calculate target offset from original position
        const targetOffsetX = repelTargetX - particle.targetPos.x;
        const targetOffsetY = repelTargetY - particle.targetPos.y;

        // Smooth transition to repelled position
        particle.repelOffset.x += (targetOffsetX - particle.repelOffset.x) * REPULSION_SMOOTHNESS;
        particle.repelOffset.y += (targetOffsetY - particle.repelOffset.y) * REPULSION_SMOOTHNESS;
      } else {
        // Outside effect radius - smoothly return to original position
        particle.repelOffset.x *= (1 - RETURN_SPEED);
        particle.repelOffset.y *= (1 - RETURN_SPEED);

        // Snap to zero if very close to prevent floating point drift
        if (Math.abs(particle.repelOffset.x) < 0.001) particle.repelOffset.x = 0;
        if (Math.abs(particle.repelOffset.y) < 0.001) particle.repelOffset.y = 0;
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

      // ===== FINAL POSITION (combine all effects) =====
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
