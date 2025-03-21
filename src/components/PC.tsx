'use client';

import dynamic from 'next/dynamic';
import PCModel from '@/components/models/PC.model';
import * as THREE from 'three';
import { Environment } from '@react-three/drei';
import DynamicThree from './three-helpers/DynamicThree';

const Canvas = dynamic(() => import('@react-three/fiber').then((mod) => mod.Canvas), {
  ssr: false,
  loading: () => null,
});

export default function PC() {
  return (
    <DynamicThree>
      <div className="fixed inset-0 -z-10">
        <Canvas
          shadows
          gl={{
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            alpha: true,
            autoClear: true,
            autoClearColor: true,
          }}
        >
          <Environment files="./environment/night.exr" background />
          <PCModel />
        </Canvas>
      </div>
    </DynamicThree>
  );
}
