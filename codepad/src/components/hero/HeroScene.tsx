"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { useThemeTransition } from "@/components/theme-provider";

function getThemeColors() {
  if (typeof window === "undefined") return { primary: "#9D4300", tertiary: "#7D5260", outline: "#ddc1b4" };
  const computed = getComputedStyle(document.documentElement);
  return {
    primary: computed.getPropertyValue("--primary").trim() || (document.documentElement.classList.contains("dark") ? "#FFB690" : "#9D4300"),
    tertiary: computed.getPropertyValue("--tertiary").trim() || (document.documentElement.classList.contains("dark") ? "#CDC5C3" : "#7D5260"),
    outline: computed.getPropertyValue("--outline-variant").trim() || (document.documentElement.classList.contains("dark") ? "#ddc1b4" : "#ddc1b4"),
  };
}

const PARTICLE_COUNT = 2000;

function generateBracketPositions() {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const randomPositions = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    randomPositions[i * 3] = (Math.random() - 0.5) * 40;
    randomPositions[i * 3 + 1] = (Math.random() - 0.5) * 40;
    randomPositions[i * 3 + 2] = (Math.random() - 0.5) * 40;

    let x = 0, y = 0, z = (Math.random() - 0.5) * 2;
    
    const part = Math.random();
    if (part < 0.3) {
      const t = Math.random() * 2 - 1;
      x = -4 + Math.abs(t) * 2 + (Math.random() - 0.5) * 0.5;
      y = t * 3 + (Math.random() - 0.5) * 0.5;
    } else if (part < 0.6) {
      const t = Math.random() * 2 - 1;
      x = t * 2 + (Math.random() - 0.5) * 0.5;
      y = t * 4 + (Math.random() - 0.5) * 0.5;
    } else {
      const t = Math.random() * 2 - 1;
      x = 4 - Math.abs(t) * 2 + (Math.random() - 0.5) * 0.5;
      y = t * 3 + (Math.random() - 0.5) * 0.5;
    }

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    const isPrimary = Math.random() < 0.85;
    colors[i * 3] = isPrimary ? 1 : 0;
    colors[i * 3 + 1] = 0;
    colors[i * 3 + 2] = 0;
  }
  return { positions, randomPositions, colors };
}

function ParticleField({ themeColors, isIntersecting }: { themeColors: any, isIntersecting: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { positions, randomPositions, colors } = useMemo(() => generateBracketPositions(), []);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const targetColorPrimary = useMemo(() => new THREE.Color(themeColors.primary), [themeColors.primary]);
  const targetColorTertiary = useMemo(() => new THREE.Color(themeColors.tertiary), [themeColors.tertiary]);
  const currentColorPrimary = useRef(new THREE.Color(themeColors.primary));
  const currentColorTertiary = useRef(new THREE.Color(themeColors.tertiary));

  const progress = useRef(0);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    currentColorPrimary.current.lerp(targetColorPrimary, 0.1);
    currentColorTertiary.current.lerp(targetColorTertiary, 0.1);

    if (isIntersecting) {
      progress.current = THREE.MathUtils.damp(progress.current, 1, 3, delta);
    }

    const mouseX = (state.pointer.x * 15) / 10;
    const mouseY = (state.pointer.y * 15) / 10;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const rx = randomPositions[i * 3];
      const ry = randomPositions[i * 3 + 1];
      const rz = randomPositions[i * 3 + 2];

      const tx = positions[i * 3];
      const ty = positions[i * 3 + 1];
      const tz = positions[i * 3 + 2];

      const x = THREE.MathUtils.lerp(rx, tx, progress.current);
      const y = THREE.MathUtils.lerp(ry, ty, progress.current);
      const z = THREE.MathUtils.lerp(rz, tz, progress.current);

      dummy.position.set(x, y, z);
      dummy.position.y += Math.sin(state.clock.elapsedTime + i) * 0.1;
      
      dummy.position.x += mouseX * (z + 2) * 0.05;
      dummy.position.y += mouseY * (z + 2) * 0.05;

      dummy.scale.setScalar(progress.current * (Math.random() * 0.5 + 0.5));
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      const isPrimary = colors[i * 3] === 1;
      meshRef.current.setColorAt(i, isPrimary ? currentColorPrimary.current : currentColorTertiary.current);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
      <sphereGeometry args={[0.06, 8, 8]} />
      <meshBasicMaterial 
        blending={THREE.AdditiveBlending}
        transparent
        opacity={0.8}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

function CodeRain({ themeColors }: { themeColors: any }) {
  const characters = "0101<>{}[]()=+-;/";
  const rainCount = 100;
  
  const drops = useMemo(() => {
    return Array.from({ length: rainCount }).map(() => ({
      x: (Math.random() - 0.5) * 30,
      y: (Math.random() - 0.5) * 30,
      z: -10 - Math.random() * 5,
      speed: 0.5 + Math.random() * 1.5,
      char: characters[Math.floor(Math.random() * characters.length)],
    }));
  }, []);

  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      child.position.y -= drops[i].speed * delta;
      if (child.position.y < -15) {
        child.position.y = 15;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {drops.map((drop, i) => (
        <Text
          key={i}
          position={[drop.x, drop.y, drop.z]}
          fontSize={0.5}
          color={themeColors.outline}
          fillOpacity={0.04}
        >
          {drop.char}
        </Text>
      ))}
    </group>
  );
}

export function HeroScene() {
  const { theme } = useThemeTransition();
  const [themeColors, setThemeColors] = useState({ primary: "#9D4300", tertiary: "#7D5260", outline: "#ddc1b4" });
  const [isIntersecting, setIsIntersecting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  
  const [typewriterText, setTypewriterText] = useState("");
  const fullText = "CodePad";
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches || (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4)) {
      setReduceMotion(true);
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isIntersecting) {
      let i = 0;
      let timer: NodeJS.Timeout;
      const typeWriter = () => {
        if (i < fullText.length) {
          setTypewriterText(fullText.slice(0, i + 1));
          i++;
          timer = setTimeout(typeWriter, 120);
        } else {
          setTimeout(() => setShowTagline(true), 300);
        }
      };
      const startTimer = setTimeout(typeWriter, 1000);
      return () => {
        clearTimeout(startTimer);
        clearTimeout(timer);
      };
    }
  }, [isIntersecting]);

  useEffect(() => {
    setThemeColors(getThemeColors());
  }, [theme]);

  return (
    <div ref={containerRef} className="relative w-full h-[500px] md:h-[600px] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-auto">
        {!reduceMotion ? (
          <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <ParticleField themeColors={themeColors} isIntersecting={isIntersecting} />
            <CodeRain themeColors={themeColors} />
          </Canvas>
        ) : (
          <div 
            className="w-full h-full"
            style={{
              background: `radial-gradient(circle at center, ${themeColors.primary}20 0%, transparent 70%)`
            }}
          />
        )}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center pointer-events-none mt-16">
        <h1 className="font-headline-lg text-[64px] md:text-[80px] font-bold tracking-tight text-on-background flex items-center h-[90px]">
          {typewriterText}
          <span className="inline-block w-4 h-[1em] bg-primary ml-2 animate-pulse opacity-80" />
        </h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showTagline ? 1 : 0, y: showTagline ? 0 : 20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-body-lg text-lg md:text-xl text-on-surface-variant max-w-2xl mt-4 bg-background/50 backdrop-blur-sm px-6 py-2 rounded-full border border-outline-variant/30"
        >
          A high-fidelity developer environment blending terminal aesthetics with modern warmth.
        </motion.p>
      </div>
    </div>
  );
}
