import { Bounds, useGLTF } from '@react-three/drei';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import TBADirectionalLight from '../lights/DirectionalLight';

export default function HumanModel() {
  const { scene } = useGLTF('./human/scene.gltf');

  console.log(scene);

  const groupRef = useRef<THREE.Group>(null);

  const modelRef = useRef<THREE.Object3D | undefined>(undefined);

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.scale.set(2, 2, 2);
      groupRef.current.position.set(0, -1, 0);
    }
  }, []);

  useFrame(({ clock }) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005;
      modelRef.current.position.y = Math.sin(clock.elapsedTime) * 0.02;
    }
  });

  return (
    <Bounds fit clip>
      <group ref={groupRef}>
        <TBADirectionalLight position={[-1, 2, 3]} intensity={4} />
        <TBADirectionalLight position={[1, 1, -3]} intensity={4} color="red" />

        <group>
          <primitive object={scene} ref={modelRef} />
        </group>
      </group>
    </Bounds>
  );
}
