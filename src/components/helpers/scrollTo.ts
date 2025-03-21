'use client';

export default function scrollTo(id: string) {
  if (typeof window === 'undefined') return;
  
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
