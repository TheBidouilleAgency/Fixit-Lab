import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
import * as THREE from 'three';

export default function Room({ mouse }: Readonly<{ mouse: { x: number; y: number } }>) {
  const { scene } = useGLTF('./room/scene.gltf');
  const modelRef = useRef<THREE.Object3D>(null);

  useFrame(() => {
    if (modelRef.current) {
      const targetX = -mouse.x;
      const targetY = -mouse.y;

      // Smooth transition
      modelRef.current.position.lerp(new THREE.Vector3(0, targetY, targetX), 0.1);

      // Rotate the model towards the movement direction
      const YAngle = Math.atan2(targetX - modelRef.current.position.x, 3); // Rotate on Y-axis
      modelRef.current.rotation.y = YAngle;

      const ZAngle = Math.atan2(targetY - modelRef.current.position.z, 10); // Rotate on Z-axis
      modelRef.current.rotation.z = ZAngle;
    }
  });

  return <primitive object={scene} ref={modelRef} />;
}
