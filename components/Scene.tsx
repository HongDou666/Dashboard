
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sphere, MeshDistortMaterial, Stars, PerspectiveCamera, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const FluidParticles = ({ count = 5000 }) => {
  const points = useRef<THREE.Points>(null!);
  
  const [positions, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const ph = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = 18 + Math.random() * 22;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      ph[i] = Math.random() * Math.PI * 2;
    }
    return [pos, ph];
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const posAttr = points.current.geometry.attributes.position;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const p = phases[i];
      // 更加丝滑的流体漂浮感
      posAttr.array[i3] += Math.sin(time * 0.2 + p) * 0.01;
      posAttr.array[i3 + 1] += Math.cos(time * 0.3 + p) * 0.01;
      posAttr.array[i3 + 2] += Math.sin(time * 0.1 + p) * 0.01;
    }
    posAttr.needsUpdate = true;
    points.current.rotation.y += 0.0003;
  });

  return (
    <Points ref={points} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#0ea5e9"
        size={0.08}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.4}
      />
    </Points>
  );
};

const CyberCore = () => {
  return (
    <group>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* 中心实体 */}
        <Sphere args={[1, 64, 64]}>
          <MeshDistortMaterial
            color="#38bdf8"
            attach="material"
            distort={0.4}
            speed={5}
            roughness={0}
            metalness={1}
            emissive="#0284c7"
            emissiveIntensity={2}
          />
        </Sphere>
        
        {/* 精致光环 */}
        {[3, 3.2].map((r, i) => (
          <mesh key={i} rotation={[Math.PI / 2, (i * Math.PI) / 4, 0]}>
            <torusGeometry args={[r, 0.005, 16, 100]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.3} />
          </mesh>
        ))}

        {/* 动态节点环 */}
        <mesh rotation={[Math.PI / 2.5, 0, 0]}>
          <torusGeometry args={[4, 0.01, 8, 4]} />
          <meshStandardMaterial color="#0ea5e9" emissive="#38bdf8" emissiveIntensity={5} />
        </mesh>
      </Float>

      {/* 核心强光区 */}
      <pointLight intensity={4} distance={10} color="#38bdf8" />
      <pointLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
    </group>
  );
};

const Scene = () => {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 20], fov: 45 }}>
      <color attach="background" args={['#010409']} />
      <fog attach="fog" args={['#010409', 15, 35]} />
      
      <ambientLight intensity={0.2} />
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
      
      <FluidParticles count={3000} />
      <CyberCore />
      
      <OrbitControls 
        enablePan={false} 
        enableZoom={false} 
        autoRotate 
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
};

export default Scene;
