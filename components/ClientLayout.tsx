'use client';

import React from 'react';
import { AppProvider } from '@/lib/app-context';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { InaFloatingWidget } from './InaFloatingWidget';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-[#F7F9FC] text-[#1D2939]">
        <Navbar />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
        <InaFloatingWidget />
      </div>
    </AppProvider>
  );
}
