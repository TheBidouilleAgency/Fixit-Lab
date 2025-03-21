import { useEffect } from 'react';
import * as THREE from 'three';

export default function NormalizeSize({
  objectRef,
  targetSize = 1,
}: {
  objectRef: React.MutableRefObject<THREE.Object3D | undefined>;
  targetSize?: number;
}) {
  useEffect(() => {
    if (!objectRef.current) return;

    // Compute bounding box
    const bbox = new THREE.Box3().setFromObject(objectRef.current);
    const size = new THREE.Vector3();
    bbox.getSize(size);

    // Compute scale factor
    const scaleFactor = targetSize / Math.max(size.x, size.y, size.z);
    objectRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);
  }, [objectRef, targetSize]);

  return null;
}
