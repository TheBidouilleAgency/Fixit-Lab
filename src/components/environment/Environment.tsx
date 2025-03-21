import { useLoader, useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';
import { EXRLoader } from 'three/examples/jsm/Addons.js';

export default function Environment() {
  const { scene } = useThree();
  const exrTexture = useLoader(EXRLoader, './environment/night.exr'); // Load EXR file

  useEffect(() => {
    exrTexture.mapping = THREE.EquirectangularReflectionMapping; // Correct HDR mapping
    scene.environment = exrTexture; // Set as environment map
  }, [exrTexture, scene]);

  return null;
}
