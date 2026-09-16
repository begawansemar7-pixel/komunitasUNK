import Link from 'next/link';
import { ArrowLeft, Users } from 'lucide-react';

export default function PengurusPage() {
  return (
    <main className="min-h-[70vh] bg-[#F7F9FC] py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#005BAC] hover:text-blue-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Beranda
        </Link>

        <div className="mt-10 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm sm:p-12">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#005BAC]">
            <Users className="h-7 w-7" />
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-[#005BAC]">
            Komunitas UMKM Naik Kelas
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Pengurus Komunitas
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
            Halaman profil pengurus disiapkan sebagai pusat informasi struktur organisasi,
            profil, dan peran pengurus Komunitas UMKM Naik Kelas.
          </p>

          <div className="mt-10 rounded-2xl border border-dashed border-blue-200 bg-blue-50/50 p-6 text-sm text-gray-600">
            Data profil pengurus dapat dimasukkan pada halaman ini tanpa mengubah komponen
            Hero Video di halaman utama.
          </div>
        </div>
      </div>
    </main>
  );
}
