import type { Metadata } from 'next';
import '@/styles/globals.scss';
import { poppins } from '../styles/fonts';
import { FirstRenderProvider } from '@/context/FirstRenderContext';
import { VisibleSectionProvider } from '@/context/VisibleSectionContext';

export const metadata: Metadata = {
  title: 'Fixit-Lab',
  description: 'Blazing fast repair service',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={poppins.className}>
      <FirstRenderProvider>
        <VisibleSectionProvider>
          <body 
            className="pointer-events-none overflow-hidden text-white" 
            suppressHydrationWarning
            style={{ margin: 0, padding: 0 }}
          >
            {children}
          </body>
        </VisibleSectionProvider>
      </FirstRenderProvider>
    </html>
  );
}
