'use client';

import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Image from 'next/image';
import { ShieldAlert } from 'lucide-react';
import { ReactorModel } from './ReactorModel';

export const WebGLCanvas: React.FC = () => {
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);

  useEffect(() => {
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        const supported = !!(
          window.WebGLRenderingContext && 
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        );
        setWebglSupported(supported);
      } catch {
        setWebglSupported(false);
      }
    };
    checkWebGL();
  }, []);

  if (webglSupported === false) {
    return (
      <div className="w-full h-full min-h-[450px] relative flex flex-col items-center justify-center p-6 border border-steel-gray rounded-radius-md bg-dark-obsidian/40 backdrop-blur-md group overflow-hidden">
        {/* Aesthetic Grid Glow Background for Fallback */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.07)_0%,transparent_60%)] pointer-events-none" />
        
        {/* Render High-End Fallback Image */}
        <div className="relative w-full max-w-[320px] h-[240px] flex items-center justify-center overflow-hidden rounded-radius-sm border border-steel-gray/60 bg-slate-950/45">
          <Image
            src="/assets/images/jacketed-reactor.png"
            alt="BGR-J Jacketed Glass Reactor Schematic Render"
            fill
            sizes="320px"
            className="object-contain opacity-85 group-hover:scale-105 transition-transform duration-500"
            priority
          />
        </div>

        {/* Fallback Badge & Information */}
        <div className="mt-6 text-center space-y-2 z-10">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-tech-orange/10 border border-tech-orange/20 text-tech-orange uppercase tracking-wider">
            <ShieldAlert className="h-3 w-3" /> Static Render Fallback
          </span>
          <h4 className="font-display font-bold text-pure-white text-sm">
            Interactive 3D Preview Offline
          </h4>
          <p className="text-text-muted font-sans text-xs max-w-xs leading-relaxed">
            WebGL is currently disabled or unsupported on this device. Displaying optimized vector schematic rendering instead.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[450px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.35} />
        
        <pointLight 
          position={[5, 3, 5]} 
          intensity={2.5} 
          color="#00f0ff" 
          decay={1.5}
        />
        
        <pointLight 
          position={[-5, -2, -5]} 
          intensity={3.0} 
          color="#f97316" 
          decay={1.5}
        />

        <ReactorModel />

        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate={false}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
    </div>
  );
};

export default WebGLCanvas;
