'use client';

import { useVisibleSection } from '@/context/VisibleSectionContext';
import { useEffect, useState, useRef } from 'react';

export default function useIntersectionObserver(threshold = 0.1) {
  const { handleSectionChange } = useVisibleSection();

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
      threshold,
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  useEffect(() => {
    if (isVisible && ref.current && ref.current.id) {
      handleSectionChange(ref.current.id);
    }
  }, [isVisible, handleSectionChange]);

  return { ref, isVisible };
}
