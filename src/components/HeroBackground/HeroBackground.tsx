"use client";
import { useRef, useMemo, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Generate random points in a flat field with some depth variation
function generateParticles(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
  }
  return positions;
}

const ParticleField = () => {
  const ref = useRef<THREE.Points>(null);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const basePositions = useMemo(() => generateParticles(3500), []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.elapsedTime;

    // Slow base rotation
    ref.current.rotation.y = time * 0.018;
    ref.current.rotation.x = time * 0.008;

    // Subtle mouse parallax tilt
    ref.current.rotation.y += mouse.x * 0.04;
    ref.current.rotation.x += mouse.y * 0.025;
  });

  return (
    <Points ref={ref} positions={basePositions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#64ffda"
        size={0.018}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.55}
      />
    </Points>
  );
};

// Secondary dim star layer for depth
const BackgroundStars = () => {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => generateParticles(2000), []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * -0.006;
    ref.current.rotation.x = state.clock.elapsedTime * 0.003;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#8892b0"
        size={0.009}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.3}
      />
    </Points>
  );
};

const HeroBackground = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isMobile) return null;

  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 60 }}
        gl={{ antialias: false, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <BackgroundStars />
          <ParticleField />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroBackground;
