import { useAnimations, useGLTF } from '@react-three/drei';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import TBAPointLight from '../lights/PointLight';
import gsap from 'gsap';
import { useVisibleSection } from '@/context/VisibleSectionContext';
import useWindowSize from '../hooks/useWindowSize';
import { useThree } from '@react-three/fiber';
import NormalizeSize from '../normalizers/NormalizeSize';
import { useFirstRender } from '@/context/FirstRenderContext';

export default function PCModel() {
  const { camera } = useThree();
  const { scene, animations } = useGLTF('./pc/scene.gltf');
  const { actions } = useAnimations(animations, scene);

  const groupRef = useRef<THREE.Group>(null);

  const modelRef = useRef<THREE.Object3D | undefined>(undefined);

  const tl = useRef(gsap.timeline({ paused: true }));

  // Context
  const { activeSection } = useVisibleSection();
  const { firstRender, setFirstRender } = useFirstRender();

  // Hooks
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (actions) {
      setTimeout(() => {
        actions['Take 001']?.play();
      }, 1800);
    }
  }, [actions]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (groupRef.current) {
      camera.position.set(0, 0, 0);
      camera.lookAt(0, 0, 0);

      groupRef.current.position.set(0, 0.15, 0.05);
      groupRef.current.rotation.set(0, 0, 0);

      tl.current
        .to(groupRef.current.position, {
          z: -0.2,
          x: 0,
          y: 0.15,
          duration: 2,
        })
        .to(groupRef.current.rotation, {
          y: Math.PI / 4,
          duration: 1,
        })
        .to(groupRef.current.rotation, {
          y: -Math.PI / 4,
          duration: 1.5,
        })
        .add([
          gsap.to(groupRef.current.position, {
            z: 0,
            x: 0,
            y: 0.5,
            duration: 2,
          }),
          gsap.to(groupRef.current.rotation, {
            y: 0,
            duration: 2,
            onComplete: () => {
              setFirstRender(false);
              if (typeof document !== 'undefined') {
                document.body.style.overflow = 'auto';
                document.body.style.pointerEvents = 'all';
              }
            },
          }),
        ]);

      tl.current.play();
    }
  }, []);

  useEffect(() => {
    if (groupRef.current) {
      if (activeSection === 'header' && !firstRender) {
        tl.current.add([
          gsap.to(groupRef.current.position, {
            z: 0,
            x: 0,
            y: 0.5,
            duration: 0.5,
          }),
          gsap.to(groupRef.current.rotation, {
            y: 0,
            duration: 0.5,
          }),
        ]);
      }

      if (activeSection === 'prestations') {
        tl.current.add([
          gsap.to(groupRef.current.rotation, {
            y: Math.PI / 4,
            duration: 0.5,
          }),

          gsap.to(groupRef.current.position, {
            z: -0.1,
            x: 0,
            y: 0.1,
            duration: 0.5,
          }),
        ]);
      }

      if (activeSection === 'presentation') {
        tl.current.add([
          gsap.to(groupRef.current.rotation, {
            y: -Math.PI / 8,
            duration: 0.5,
          }),

          gsap.to(groupRef.current.position, {
            z: 0,
            x: -0.5,
            y: 0.1,
            duration: 0.5,
          }),
        ]);
      }

      if (activeSection === 'contact') {
        tl.current.add([
          gsap.to(groupRef.current.position, {
            z: 0,
            x: 0,
            y: 0.5,
            duration: 0.5,
          }),
          gsap.to(groupRef.current.rotation, {
            y: 0,
            duration: 0.5,
          }),
        ]);
      }
    }
  }, [activeSection, camera.position, camera.rotation, height, width, firstRender]);

  return (
    <>
      <group ref={groupRef}>
        <ambientLight intensity={0.5} />
        <TBAPointLight position={[0, -0.1, -0.3]} intensity={10} color="purple" />
        <TBAPointLight castShadow position={[0.5, 0, -0.35]} intensity={6} color="red" />
        <TBAPointLight position={[0.3, -0.5, -0.35]} intensity={4} color="blue" />
        <TBAPointLight position={[0, -0.45, -0.27]} intensity={1} color="green" />
        <TBAPointLight position={[0.2, -0.2, 0.5]} intensity={2} color="white" />

        <group>
          <primitive object={scene} ref={modelRef} />
          <NormalizeSize objectRef={modelRef} targetSize={1} />
        </group>
      </group>
    </>
  );
}
