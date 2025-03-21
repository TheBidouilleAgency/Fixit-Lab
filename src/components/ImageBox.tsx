'use client';

import { useTexture } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface ImageBoxProps {
  imagePath: string;
  size?: [number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export default function ImageBox({
  imagePath,
  size = [1, 1, 1],
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: ImageBoxProps) {
  const texture = useTexture(imagePath);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Configure texture
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.format = THREE.RGBAFormat;
  texture.flipY = false;

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = position[1] + Math.sin(clock.elapsedTime) * 0.1;

      // Rotate based on hover state
      if (hovered) {
        meshRef.current.rotation.y += 0.02;
      } else {
        meshRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.5) * 0.1;
      }
    }
  });

  return (
    <group position={position} rotation={rotation}>
      {/* Front face with image */}
      <mesh
        ref={meshRef}
        position={[0, 0, size[2] / 2]} // Move slightly forward
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <planeGeometry args={[size[0], size[1]]} />
        <meshStandardMaterial
          map={texture}
          metalness={0}
          roughness={0.2}
          envMapIntensity={0.5}
          emissive="#ffffff"
          emissiveIntensity={0.2}
          color={hovered ? '#ffffff' : '#ffffff'}
        />
      </mesh>

      {/* Back face (solid color) */}
      <mesh position={[0, 0, -size[2] / 2]}>
        <planeGeometry args={[size[0], size[1]]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Side faces (solid color) */}
      <mesh position={[size[0] / 2, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[size[2], size[1]]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-size[0] / 2, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[size[2], size[1]]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, size[1] / 2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[size[0], size[2]]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, -size[1] / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[size[0], size[2]]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}
