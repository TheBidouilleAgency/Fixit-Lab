import { useRef, useEffect } from 'react';
import { useHelper } from '@react-three/drei';
import { PointLight, PointLightHelper } from 'three';

interface PointLightProps {
  position?: [number, number, number];
  intensity?: number;
  color?: string;
  showHelper?: boolean;
  helperSize?: number;
  castShadow?: boolean;
  distance?: number;
  decay?: number;
}

export default function TBAPointLight({
  position = [2, 5, 2],
  intensity = 1,
  color = 'white',
  showHelper = false,
  helperSize = 1,
  castShadow = true,
  distance = 10,
  decay = 2,
}: PointLightProps) {
  const lightRef = useRef<PointLight>(null!); // 👈 Fix TypeScript error

  // ✅ Only pass ref if `showHelper` is true to avoid TypeScript errors
  useHelper(showHelper ? (lightRef as never) : null, PointLightHelper, helperSize, 'red');

  useEffect(() => {
    if (lightRef.current && castShadow) {
      lightRef.current.castShadow = true;
      lightRef.current.shadow.mapSize.width = 1024;
      lightRef.current.shadow.mapSize.height = 1024;
      lightRef.current.shadow.camera.near = 0.5;
      lightRef.current.shadow.camera.far = 50;
    }
  }, [castShadow]);

  return (
    <pointLight
      ref={lightRef}
      position={position}
      intensity={intensity}
      color={color}
      castShadow={castShadow}
      distance={distance}
      decay={decay}
    />
  );
}
