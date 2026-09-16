'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { AppProvider } from '@/lib/app-context';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { InaFloatingWidget } from './InaFloatingWidget';
import { PengurusHero } from './PengurusHero';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-[#F7F9FC] text-[#1D2939]">
        <Navbar />
        <div className="flex-1">
          {isHomepage && <PengurusHero />}
          {children}
        </div>
        <Footer />
        <InaFloatingWidget />
      </div>
    </AppProvider>
  );
}
