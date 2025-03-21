'use client';

import { useEffect, useState } from 'react';

export default function useWindowSize() {
  const normalize = (value: number, min: number, max: number) =>
    ((value - min) / (max - min)) * 2 - 1;

  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowSize({
        width: normalize(window.innerWidth, 0, window.screen.width),
        height: normalize(window.innerHeight, 0, window.screen.height),
      });
    };

    // Set initial values
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
