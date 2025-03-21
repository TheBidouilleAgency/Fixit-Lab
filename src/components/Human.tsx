'use client';

import dynamic from 'next/dynamic';
import * as THREE from 'three';
import DynamicThree from './three-helpers/DynamicThree';
import ImageBox from './ImageBox';

const Canvas = dynamic(() => import('@react-three/fiber').then((mod) => mod.Canvas), {
  ssr: false,
  loading: () => null,
});

export default function Human() {
  return (
    <DynamicThree>
      <div className="h-full">
        <Canvas
          gl={{
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            alpha: true,
            autoClear: true,
            autoClearColor: true,
          }}
        >
          {/* Ambient light for overall scene illumination */}
          <ambientLight intensity={1} />

          {/* Main directional light */}
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow />

          {/* Additional point lights for better illumination */}
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <pointLight position={[-10, -10, -10]} intensity={0.3} />

          <ImageBox
            imagePath="/vic.jpg"
            size={[1, 1.5, 0.1]}
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
          />
        </Canvas>
      </div>
    </DynamicThree>
  );
}
