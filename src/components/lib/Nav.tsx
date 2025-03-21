'use client';

import { useFirstRender } from '@/context/FirstRenderContext';
import { useVisibleSection } from '@/context/VisibleSectionContext';
import { bangers } from '@/styles/fonts';

export default function Nav() {
  const { activeSection, prevSection, nextSection } = useVisibleSection();
  const { firstRender } = useFirstRender();

  if (firstRender || activeSection === 'header') return null;
  return (
    <aside className="fixed bottom-4 left-4 top-4 flex flex-col items-center justify-between">
      <a
        className={`flex cursor-pointer items-center justify-center text-2xl text-black ${bangers.className} relative h-16 w-16 before:absolute before:inset-0 before:-z-10 before:h-16 before:w-16 before:rounded-full before:border before:border-black before:bg-white`}
        href={`#${prevSection}`}
      >
        Up
      </a>
      <a
        className={`flex cursor-pointer items-center justify-center text-xl text-black ${bangers.className} relative h-16 w-16 before:absolute before:inset-0 before:-z-10 before:h-16 before:w-16 before:rounded-full before:border before:border-black before:bg-white`}
        href={`${nextSection ? `#${nextSection}` : `#${activeSection}`}`}
      >
        Down
      </a>
    </aside>
  );
}
