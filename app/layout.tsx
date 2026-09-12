import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Komunitas UMKM Naik Kelas',
  description: 'Bersama Tumbuh, Bersama Naik Kelas — ekosistem komunitas UMKM Indonesia.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body>{children}</body></html>;
}
