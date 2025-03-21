'use client';

import { useFirstRender } from '@/context/FirstRenderContext';
import { useVisibleSection } from '@/context/VisibleSectionContext';
import { bangers } from '@/styles/fonts';

export default function ScrollTop() {
  const { activeSection } = useVisibleSection();
  const { firstRender } = useFirstRender();

  if (firstRender || activeSection === 'header') return null;
  return (
    <aside className="fixed bottom-4 right-4">
      <a
        className={`flex cursor-pointer flex-col items-center justify-center gap-1 text-3xl ${bangers.className} font-outline-1 animate-bounce`}
        href={`#header`}
      >
        <span>Top lane</span>
      </a>
    </aside>
  );
}
