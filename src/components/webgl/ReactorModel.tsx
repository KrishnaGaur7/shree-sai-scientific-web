'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const ReactorModel: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const stirrerRef = useRef<THREE.Mesh>(null);

  // Reusable Geometries to reduce CPU-to-GPU layout allocation overhead
  const columnGeo = useMemo(() => new THREE.CylinderGeometry(0.08, 0.08, 4.5, 16), []);
  const outerGlassGeo = useMemo(() => new THREE.CylinderGeometry(0.85, 0.85, 2.5, 32, 1, true), []);
  const innerGlassGeo = useMemo(() => new THREE.CylinderGeometry(0.7, 0.7, 2.2, 32, 1, true), []);
  const stirrerShaftGeo = useMemo(() => new THREE.CylinderGeometry(0.04, 0.04, 2.8, 16), []);
  const stirrerBladeGeo = useMemo(() => new THREE.BoxGeometry(0.1, 0.6, 0.02), []);
  const capGeo = useMemo(() => new THREE.CylinderGeometry(0.9, 0.9, 0.1, 32), []);

  // Reusable PBR Materials
  const metalFrameMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#4b5563',
    metalness: 0.9,
    roughness: 0.1,
  }), []);

  const outerGlassMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#ffffff',
    transparent: true,
    opacity: 0.25,
    transmission: 0.95,
    roughness: 0.05,
    ior: 1.474,
    thickness: 1.2,
    side: THREE.DoubleSide,
    depthWrite: false, // Prevent z-sorting artifacts for overlapping transparent meshes
  }), []);

  const innerGlassMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#38bdf8',
    transparent: true,
    opacity: 0.12,
    transmission: 0.8,
    roughness: 0.1,
    side: THREE.DoubleSide,
    depthWrite: false, // Prevent z-sorting artifacts for overlapping transparent meshes
  }), []);

  const stirrerMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#f97316',
    metalness: 0.5,
    roughness: 0.2,
  }), []);

  const capMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#1f2937',
    metalness: 0.9,
    roughness: 0.2,
  }), []);

  // Explicit GPU memory disposal to prevent memory leaks during client-side navigation
  useEffect(() => {
    return () => {
      columnGeo.dispose();
      outerGlassGeo.dispose();
      innerGlassGeo.dispose();
      stirrerShaftGeo.dispose();
      stirrerBladeGeo.dispose();
      capGeo.dispose();

      metalFrameMat.dispose();
      outerGlassMat.dispose();
      innerGlassMat.dispose();
      stirrerMat.dispose();
      capMat.dispose();
    };
  }, [
    columnGeo,
    outerGlassGeo,
    innerGlassGeo,
    stirrerShaftGeo,
    stirrerBladeGeo,
    capGeo,
    metalFrameMat,
    outerGlassMat,
    innerGlassMat,
    stirrerMat,
    capMat,
  ]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15;
    }
    if (stirrerRef.current) {
      stirrerRef.current.rotation.y = t * 0.8;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Structural Support Frames */}
      <mesh geometry={columnGeo} material={metalFrameMat} position={[-1.2, 0, 0]} />
      <mesh geometry={columnGeo} material={metalFrameMat} position={[1.2, 0, 0]} />

      {/* Outer Borosilicate Glass Wall */}
      <mesh geometry={outerGlassGeo} material={outerGlassMat} position={[0, 0, 0]} />

      {/* Inner Process Vessel / Jacket */}
      <mesh geometry={innerGlassGeo} material={innerGlassMat} position={[0, 0, 0]} />

      {/* PTFE Stirrer Shaft and Blades */}
      <mesh ref={stirrerRef} position={[0, 0, 0]}>
        <group>
          <mesh geometry={stirrerShaftGeo} material={stirrerMat} position={[0, 0.3, 0]} />
          <mesh geometry={stirrerBladeGeo} material={stirrerMat} position={[0, -0.9, 0]} rotation={[0, 0, Math.PI / 2]} />
        </group>
      </mesh>

      {/* Top & Bottom Flange Caps */}
      <mesh geometry={capGeo} material={capMat} position={[0, 1.25, 0]} />
      <mesh geometry={capGeo} material={capMat} position={[0, -1.25, 0]} />
    </group>
  );
};

