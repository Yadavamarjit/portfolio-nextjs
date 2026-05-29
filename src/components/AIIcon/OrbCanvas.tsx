"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, Torus, Sphere } from "@react-three/drei";
import * as THREE from "three";

// Orbiting ring
const Ring = ({
  radius,
  tube,
  rotX,
  rotY,
  rotZ,
  color,
  speed,
  opacity = 0.6,
}: {
  radius: number; tube: number;
  rotX: number; rotY: number; rotZ: number;
  color: string; speed: number; opacity?: number;
}) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * speed * 0.8;
    ref.current.rotation.y += delta * speed;
    ref.current.rotation.z += delta * speed * 0.3;
  });
  return (
    <mesh ref={ref} rotation={[rotX, rotY, rotZ]}>
      <torusGeometry args={[radius, tube, 12, 100]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
};

// Wireframe shell sphere (slow rotation)
const WireShell = ({ isOpen }: { isOpen: boolean }) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.25;
    ref.current.rotation.x += delta * 0.07;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.88, 1]} />
      <meshBasicMaterial
        color={isOpen ? "#a78bfa" : "#64ffda"}
        wireframe
        transparent
        opacity={0.18}
      />
    </mesh>
  );
};

// Pulsing energy core
const Core = ({ isOpen }: { isOpen: boolean }) => {
  const ref = useRef<THREE.Mesh>(null);
  const time = useRef(0);
  useFrame((_, delta) => {
    if (!ref.current) return;
    time.current += delta;
    const pulse = 1 + Math.sin(time.current * 2.5) * 0.08;
    ref.current.scale.setScalar(pulse);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.38, 32, 32]} />
      <meshStandardMaterial
        color={isOpen ? "#c4b5fd" : "#64ffda"}
        emissive={isOpen ? "#8b5cf6" : "#00e5cc"}
        emissiveIntensity={2.5}
        transparent
        opacity={0.95}
      />
    </mesh>
  );
};

// Mid glow haze
const GlowHaze = ({ isOpen }: { isOpen: boolean }) => (
  <mesh>
    <sphereGeometry args={[0.62, 20, 20]} />
    <meshBasicMaterial
      color={isOpen ? "#8b5cf6" : "#0d9488"}
      transparent
      opacity={0.12}
      side={THREE.BackSide}
    />
  </mesh>
);

const OrbScene = ({ isOpen }: { isOpen: boolean }) => (
  <>
    {/* Lights */}
    <ambientLight intensity={0.15} />
    <pointLight position={[3, 3, 3]} intensity={3} color={isOpen ? "#a78bfa" : "#64ffda"} />
    <pointLight position={[-2, -2, 2]} intensity={1.5} color={isOpen ? "#06b6d4" : "#38bdf8"} />

    {/* Wireframe shell */}
    <WireShell isOpen={isOpen} />

    {/* Three orbiting rings at different angles */}
    <Ring radius={0.92} tube={0.008} rotX={0}    rotY={0} rotZ={0}        color={isOpen ? "#a78bfa" : "#64ffda"} speed={0.6} opacity={0.55} />
    <Ring radius={0.92} tube={0.008} rotX={1.1}  rotY={0} rotZ={0.5}     color={isOpen ? "#c4b5fd" : "#2dd4bf"} speed={-0.4} opacity={0.4} />
    <Ring radius={0.92} tube={0.008} rotX={0}    rotY={0} rotZ={Math.PI/2} color={isOpen ? "#818cf8" : "#38bdf8"} speed={0.35} opacity={0.35} />

    {/* Glow haze */}
    <GlowHaze isOpen={isOpen} />

    {/* Energy core */}
    <Core isOpen={isOpen} />

    {/* Sparkle halo — small tight cluster */}
    <Sparkles
      count={35}
      scale={2.2}
      size={0.8}
      speed={0.4}
      color={isOpen ? "#c4b5fd" : "#64ffda"}
      opacity={0.8}
    />
  </>
);

interface OrbCanvasProps {
  size: number;
  isActive: boolean;
  isOpen: boolean;
}

const OrbCanvas = ({ size, isOpen }: OrbCanvasProps) => (
  <div style={{ width: size, height: size }}>
    <Canvas
      camera={{ position: [0, 0, 2.6], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <OrbScene isOpen={isOpen} />
    </Canvas>
  </div>
);

export default OrbCanvas;
