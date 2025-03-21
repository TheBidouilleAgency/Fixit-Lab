'use client'; // For Next.js (only needed if using App Router)

import { createContext, useContext, useState } from 'react';

// Define the context
const VisibleSectionContext = createContext<{
  activeSection: string;
  prevSection: string;
  nextSection: string;
  handleSectionChange: (id: string) => void;
}>({
  activeSection: '',
  prevSection: '',
  nextSection: '',
  handleSectionChange: () => {},
});

// Create a provider
export function VisibleSectionProvider({ children }: { children: React.ReactNode }) {
  const sections = ['header', 'prestations', 'presentation', 'contact'];

  const [activeSection, setActiveSection] = useState('');
  const [prevSection, setPrevSection] = useState('');
  const [nextSection, setNextSection] = useState('');

  const handleSectionChange = (id: string) => {
    const index = sections.indexOf(id);
    setPrevSection(sections[index - 1] || '');
    setActiveSection(id);
    setNextSection(sections[index + 1] || '');
  };

  return (
    <VisibleSectionContext.Provider
      value={{
        activeSection,
        prevSection,
        nextSection,
        handleSectionChange,
      }}
    >
      {children}
    </VisibleSectionContext.Provider>
  );
}

// Custom hook to use context
export function useVisibleSection() {
  return useContext(VisibleSectionContext);
}
