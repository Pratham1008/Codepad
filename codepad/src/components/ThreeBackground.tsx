"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

function ParticleField() {
  const ref = useRef<THREE.Points>(null!);
  const { theme, resolvedTheme } = useTheme();
  
  const count = 3000;
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 10 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = r * Math.cos(phi);
    }
    return p;
  }, [count]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  const isDark = (theme === 'dark' || resolvedTheme === 'dark');

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial 
          transparent 
          color={isDark ? "#ea580c" : "#f97316"}
          size={0.03} 
          sizeAttenuation={true} 
          depthWrite={false} 
          opacity={isDark ? 0.6 : 0.8}
        />
      </Points>
    </group>
  );
}

function WireframeCube() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { theme, resolvedTheme } = useTheme();
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15;
      meshRef.current.rotation.y += delta * 0.2;
    }
  });
  
  const isDark = (theme === 'dark' || resolvedTheme === 'dark');

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[3, 1]} />
      <meshBasicMaterial color={isDark ? "#ea580c" : "#f97316"} wireframe transparent opacity={isDark ? 0.1 : 0.2} />
    </mesh>
  );
}

export function ThreeBackground() {
  return (
    <div className="w-full h-full pointer-events-none" style={{ background: 'transparent' }}>
      <Canvas 
        camera={{ position: [0, 0, 8] }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        performance={{ min: 0.5 }}
      >
        <ParticleField />
        <WireframeCube />
      </Canvas>
    </div>
  );
}
