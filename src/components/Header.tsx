import React from 'react';

import { bangers, honk } from '@/styles/fonts';
import useIntersectionObserver from './hooks/useIntersectionObserver';

export default function Header() {
  const { ref } = useIntersectionObserver(0.5);

  return (
    <header className="relative h-screen" id="header" ref={ref}>
      <div className="absolute inset-0 flex items-center justify-center px-4 md:px-20">
        <h1 className={`text-7xl text-white md:text-9xl ${honk.className}`}>Fixit-Lab</h1>
      </div>
      <div className="absolute inset-0 flex items-end justify-center pb-10" id="button">
        <a className="w-fit animate-bounce cursor-pointer" href={`#prestations`}>
          <span className={`font-outline-2 text-4xl md:text-5xl ${bangers.className}`}>
            Get Started !
          </span>
        </a>
      </div>
    </header>
  );
}
