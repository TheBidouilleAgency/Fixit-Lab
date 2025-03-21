'use client';

import { useProgress } from '@react-three/drei';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

export function Loader() {
  const { progress } = useProgress();
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (progress >= 100 && loaderRef.current) {
      gsap.to(loaderRef.current, {
        opacity: 0,
        duration: 1,
        onComplete: () => {
          if (loaderRef.current) {
            loaderRef.current.style.display = 'none';
          }
        },
      });
    }
  }, [progress]);

  return (
    <div
      ref={loaderRef}
      className="z-100 absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black"
    >
      <h1 className="text-4xl text-white">{Math.round(progress)} %</h1>
      <div className="relative h-1 w-64 overflow-hidden rounded-full bg-white">
        <div
          className="h-full bg-purple-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
