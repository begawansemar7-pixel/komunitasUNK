import type { Metadata } from 'next';
import './globals.css';
import { ClientLayout } from '@/components/ClientLayout';

export const metadata: Metadata = {
  title: 'Komunitas UMKM Naik Kelas — Business Growth Platform',
  description:
    'Business Growth Operating Platform untuk UMKM Indonesia: Belajar, Terhubung, Bertransaksi, Pendampingan Mentor, Peluang Usaha, dan Tumbuh Terukur bersama INA AI.',
  openGraph: {
    title: 'Komunitas UMKM Naik Kelas — Business Growth Platform',
    description: 'Platform operasional terpadu pertumbuhan bisnis UMKM Indonesia.',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var origFetch = window.fetch;
                  var currentFetch = origFetch;
                  try {
                    Object.defineProperty(window, 'fetch', {
                      get: function() { return currentFetch; },
                      set: function(v) { currentFetch = v; },
                      configurable: true,
                      enumerable: true
                    });
                  } catch (e1) {}
                  if (typeof Window !== 'undefined' && Window.prototype) {
                    try {
                      var protoDesc = Object.getOwnPropertyDescriptor(Window.prototype, 'fetch');
                      if (protoDesc && !protoDesc.set && protoDesc.configurable !== false) {
                        Object.defineProperty(Window.prototype, 'fetch', {
                          get: function() { return currentFetch; },
                          set: function(v) { currentFetch = v; },
                          configurable: true,
                          enumerable: true
                        });
                      }
                    } catch (e2) {}
                  }
                } catch (err) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
