import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';

export default function AxisHelper({ size = 5 }: { size?: number }) {
  const { scene } = useThree();

  useEffect(() => {
    const axesHelper = new THREE.AxesHelper(size);
    scene.add(axesHelper);

    return () => {
      scene.remove(axesHelper); // Clean up when component unmounts
    };
  }, [scene, size]);

  return null;
}
