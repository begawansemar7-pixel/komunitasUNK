'use client';

import Link from 'next/link';
import { ArrowRight, PlayCircle } from 'lucide-react';

export function PengurusHero() {
  return (
    <section
      id="pengurus-intro"
      aria-label="Intro Pengurus Komunitas UMKM Naik Kelas"
      className="relative isolate overflow-hidden bg-[#071A2B] text-white"
    >
      <div className="relative min-h-[430px] sm:min-h-[500px] lg:min-h-[560px]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/KomunitasUNK_Intro_Pengurus_Poster.jpg"
          aria-hidden="true"
        >
          <source src="/videos/KomunitasUNK_Intro_Pengurus_Web.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-r from-[#03111F]/90 via-[#071A2B]/55 to-[#071A2B]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B]/75 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[430px] max-w-7xl items-end px-5 pb-12 sm:min-h-[500px] sm:px-6 sm:pb-16 lg:min-h-[560px] lg:px-8 lg:pb-20">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-bold tracking-[0.16em] text-white backdrop-blur-md sm:text-xs">
              <PlayCircle className="h-4 w-4 text-amber-300" />
              <span>KOMUNITAS UMKM NAIK KELAS</span>
            </div>

            <h1 className="max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Kenali Pengurus
              <br />
              <span className="text-amber-300">Komunitas UMKM Naik Kelas</span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-blue-50 sm:text-lg">
              Bersama membangun ekosistem UMKM yang kuat, kolaboratif, dan berkelanjutan.
            </p>

            <Link
              href="/pengurus"
              id="btn-kenali-pengurus"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-sm font-extrabold text-[#071A2B] shadow-xl shadow-black/20 transition-all hover:bg-amber-300 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-[#071A2B] sm:px-6 sm:py-3.5"
            >
              <span>Kenali Pengurus</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
