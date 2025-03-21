'use client'; // For Next.js (only needed if using App Router)

import { createContext, useContext, useState } from 'react';

// Define the context
const FirstRenderContext = createContext<{
  firstRender: boolean;
  setFirstRender: (value: boolean) => void;
}>({
  firstRender: true,
  setFirstRender: () => {},
});

// Create a provider
export function FirstRenderProvider({ children }: { children: React.ReactNode }) {
  const [firstRender, setFirstRender] = useState(true);

  return (
    <FirstRenderContext.Provider value={{ firstRender, setFirstRender }}>
      {children}
    </FirstRenderContext.Provider>
  );
}

// Custom hook to use context
export function useFirstRender() {
  return useContext(FirstRenderContext);
}
