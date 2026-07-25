// @ts-nocheck
"use client";
import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

function GlassObject({ position, rotation, scale, geometryType }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.1;
    meshRef.current.rotation.y += delta * 0.15;
  });

  const materialProps = {
    thickness: 2,
    roughness: 0.1,
    transmission: 1,
    ior: 1.5,
    chromaticAberration: 0.4,
    backside: true,
  };

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2} position={position}>
      <mesh ref={meshRef} rotation={rotation} scale={scale}>
        {geometryType === 'torusKnot' && <torusKnotGeometry args={[1, 0.3, 128, 64]} />}
        {geometryType === 'icosahedron' && <icosahedronGeometry args={[1.5, 0]} />}
        {geometryType === 'octahedron' && <octahedronGeometry args={[1.2, 0]} />}
        {geometryType === 'sphere' && <sphereGeometry args={[1.2, 64, 64]} />}
        <MeshTransmissionMaterial {...materialProps} color="#ffffff" />
      </mesh>
    </Float>
  );
}

function InteractiveGroup({ children }) {
  const groupRef = useRef();
  const { viewport } = useThree();

  useFrame(({ mouse }) => {
    const targetX = (mouse.x * viewport.width) / 20;
    const targetY = (mouse.y * viewport.height) / 20;
    
    groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05;
  });

  return <group ref={groupRef}>{children}</group>;
}

export default function Hero3DScene() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'auto' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
        
        <Environment preset="city" />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <spotLight position={[-10, 10, -10]} intensity={2} color="#4f46e5" />
        <spotLight position={[10, -10, 10]} intensity={2} color="#ec4899" />

        <InteractiveGroup>
          <GlassObject position={[-4, 2, -2]} rotation={[0, 0, 0]} scale={1.5} geometryType="torusKnot" />
          <GlassObject position={[4, -2, -1]} rotation={[Math.PI / 4, 0, 0]} scale={1.2} geometryType="icosahedron" />
          <GlassObject position={[0, 3, -4]} rotation={[0, Math.PI / 3, 0]} scale={1.8} geometryType="octahedron" />
          <GlassObject position={[-5, -3, -3]} rotation={[0, 0, 0]} scale={1} geometryType="sphere" />
          <GlassObject position={[5, 3, -2]} rotation={[0, 0, 0]} scale={1.3} geometryType="torusKnot" />
        </InteractiveGroup>

      </Canvas>
    </div>
  );
}
