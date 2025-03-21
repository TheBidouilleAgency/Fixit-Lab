import { useRef, useEffect } from 'react';
import { useHelper } from '@react-three/drei';
import { DirectionalLight, DirectionalLightHelper } from 'three';

interface DirectionalLightProps {
  position?: [number, number, number];
  intensity?: number;
  castShadow?: boolean;
  showHelper?: boolean;
  color?: string;
  helperSize?: number;
}

export default function TBADirectionalLight({
  position = [5, 5, 5],
  intensity = 1,
  castShadow = true,
  showHelper = false,
  color = 'white',
  helperSize = 2,
}: DirectionalLightProps) {
  const lightRef = useRef<DirectionalLight>(null!); // 👈 Fix: non-null assertion

  // ✅ Only pass ref to useHelper if showHelper is true
  useHelper(showHelper ? (lightRef as never) : null, DirectionalLightHelper, helperSize, 'red');

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
    <directionalLight ref={lightRef} position={position} intensity={intensity} color={color} />
  );
}
