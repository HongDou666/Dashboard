
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sphere, MeshDistortMaterial, Stars, PerspectiveCamera, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const NebulaParticles = ({ count = 4000 }) => {
  const points = useRef<THREE.Points>(null!);
  
  const [positions, scales, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sc = new Float32Array(count);
    const sp = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // 创建一个圆盘状的星云分布
      const angle = Math.random() * Math.PI * 2;
      const radius = 10 + Math.random() * 20;
      const height = (Math.random() - 0.5) * 10;
      
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = height;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
      
      sc[i] = Math.random();
      sp[i] = 0.5 + Math.random();
    }
    return [pos, sc, sp];
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const posAttr = points.current.geometry.attributes.position;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // 实现缓慢旋转和上下起伏的复合运动
      const x = initialPos[i3];
      const z = initialPos[i3 + 2];
      const angle = Math.atan2(z, x) + 0.001 * speeds[i];
      const r = Math.sqrt(x * x + z * z);
      
      posAttr.array[i3] = Math.cos(angle) * r;
      posAttr.array[i3 + 1] += Math.sin(time * 0.2 + speeds[i]) * 0.005;
      posAttr.array[i3 + 2] = Math.sin(angle) * r;
    }
    posAttr.needsUpdate = true;
  });

  const initialPos = useMemo(() => new Float32Array(positions), [positions]);

  return (
    <Points ref={points} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#38bdf8"
        size={0.1}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.3}
      />
    </Points>
  );
};

const QuantumCore = () => {
  const coreRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    coreRef.current.rotation.z = t * 0.1;
  });

  return (
    <group ref={coreRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* 内核 */}
        <Sphere args={[1, 64, 64]}>
          <MeshDistortMaterial
            color="#0ea5e9"
            distort={0.6}
            speed={3}
            roughness={0}
            metalness={1}
            emissive="#38bdf8"
            emissiveIntensity={2}
          />
        </Sphere>
        
        {/* 护盾层 */}
        <Sphere args={[1.5, 32, 32]}>
          <meshPhongMaterial 
            color="#38bdf8" 
            transparent 
            opacity={0.05} 
            wireframe 
            side={THREE.DoubleSide}
          />
        </Sphere>

        {/* 能量环 */}
        {[4, 4.2].map((r, i) => (
          <mesh key={i} rotation={[Math.PI / 2, i * 1, 0]}>
            <torusGeometry args={[r, 0.003, 16, 100]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.2} />
          </mesh>
        ))}
      </Float>
    </group>
  );
};

const Scene = () => {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 5, 25], fov: 40 }}>
      <color attach="background" args={['#01040a']} />
      
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#38bdf8" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0ea5e9" />
      
      <Stars radius={150} depth={50} count={1000} factor={7} saturation={0} fade speed={1} />
      
      <NebulaParticles count={3500} />
      <QuantumCore />
      
      <OrbitControls 
        enablePan={false} 
        enableZoom={false} 
        autoRotate 
        autoRotateSpeed={0.4}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
    </Canvas>
  );
};

export default Scene;
