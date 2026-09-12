'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/app-context';
import {
  Sparkles,
  TrendingUp,
  Award,
  ShoppingBag,
  Users,
  GraduationCap,
  Briefcase,
  UserCheck,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Building,
  Target,
  BarChart3,
  Globe2,
} from 'lucide-react';

export default function Home() {
  const { growthReport } = useApp();

  const engines = [
    {
      id: 'community',
      title: 'COMMUNITY',
      subtitle: 'Engagement & Networking',
      desc: 'Jejaring terkurasi antar-pelaku UMKM daerah, berbagi studi kasus, izin edar, dan kolaborasi bisnis lokal.',
      icon: Users,
      color: 'from-blue-600 to-indigo-600',
      tag: 'Jejaring Bisnis',
      href: '/dashboard/komunitas',
    },
    {
      id: 'goodskill',
      title: 'GOODSKILL',
      subtitle: 'Learning & Capability',
      desc: 'Akademi modular praktis: manajemen kas, pemasaran media sosial, izin edar BPOM, dan standarisasi halal.',
      icon: GraduationCap,
      color: 'from-emerald-600 to-teal-600',
      tag: 'XP & Sertifikat',
      href: '/dashboard/belajar',
    },
    {
      id: 'inamarket',
      title: 'INAMARKET',
      subtitle: 'Commerce & Transactions',
      desc: 'Katalog etalase digital B2B dan B2C. Terhubung dengan pengadaan korporasi, perhotelan, dan konsumen ritel.',
      icon: ShoppingBag,
      color: 'from-amber-600 to-orange-600',
      tag: 'Pasar & Transaksi',
      href: '/dashboard/market',
    },
    {
      id: 'mentoring',
      title: 'MENTORING',
      subtitle: '1-on-1 Guidance',
      desc: 'Konsultasi privat terstruktur bersama praktisi bisnis senior, kurator produk, dan konsultan scale-up KADIN.',
      icon: UserCheck,
      color: 'from-purple-600 to-indigo-600',
      tag: 'Action Plan',
      href: '/dashboard/mentor',
    },
    {
      id: 'matching',
      title: 'MATCHING',
      subtitle: 'Opportunity Discovery',
      desc: 'Mesin pencocokan cerdas mempertemukan supplier UMKM dengan buyer institusi, distributor, dan rantai pasok BUMN.',
      icon: Target,
      color: 'from-sky-600 to-blue-600',
      tag: 'B2B Procurement',
      href: '/dashboard/peluang',
    },
    {
      id: 'programs',
      title: 'PROGRAMS',
      subtitle: 'Ecosystem Access',
      desc: 'Akses langsung fasilitasi Sertifikasi Halal Gratis (SEHATI), inkubasi Go Export, dan KUR subsidi bunga rendah.',
      icon: Briefcase,
      color: 'from-rose-600 to-pink-600',
      tag: 'KADIN & Pemerintah',
      href: '/dashboard/peluang',
    },
    {
      id: 'ina-ai',
      title: 'INA AI',
      subtitle: 'Intelligence Layer',
      desc: 'Asisten bisnis berbasis data dan regulasi. Memberikan diagnosis usaha, rekomendasi prioritas, dan panduan taktis.',
      icon: Sparkles,
      color: 'from-blue-700 via-indigo-600 to-purple-600',
      tag: 'AI Advisor',
      href: '/dashboard/ina',
    },
  ];

  const loopSteps = [
    { title: '1. Register & Onboard', desc: 'Identitas bisnis digital & NIB' },
    { title: '2. Business Diagnosis', desc: 'Evaluasi 8 dimensi Growth Score' },
    { title: '3. Skill & Capacity', desc: 'Modul GoodSkill + sertifikasi' },
    { title: '4. Network & Mentor', desc: 'Komunitas & pendampingan ahli' },
    { title: '5. Market & Scale', desc: 'INAMarket B2B & Business Matching' },
    { title: '6. UMKM Naik Kelas', desc: 'Omzet tumbuh & siap ekspor' },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#005BAC] via-[#004b8d] to-[#0B1F33] text-white pt-16 pb-24">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-20">
          <div className="absolute top-10 left-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-400 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Headline */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span className="text-amber-300 font-bold">DIGITAL BUSINESS GROWTH PLATFORM</span>
                <span className="text-white/70">| Bukan Sekadar Forum</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                Bersama Tumbuh, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-cyan-300 to-white">
                  Bersama Naik Kelas.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-blue-100 max-w-2xl leading-relaxed">
                Ekosistem operasional digital terpadu untuk pelaku UMKM Indonesia: diagnosis kesiapan usaha, pembelajaran terapan GoodSkill, transaksi B2B INAMarket, kurasi pendampingan mentor, dan fasilitasi program KADIN.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/dashboard"
                  id="btn-hero-cockpit"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-blue-950 font-bold text-sm shadow-lg hover:bg-amber-300 hover:scale-[1.02] transition-all flex items-center gap-2"
                >
                  <span>Buka Business Growth Cockpit</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/dashboard/ina"
                  id="btn-hero-ina"
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 backdrop-blur-md transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Konsultasi INA AI</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-blue-200">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Verifikasi NIB OSS-RBA</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-300" />
                  <span>Sertifikasi Halal SEHATI</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe2 className="w-4 h-4 text-cyan-400" />
                  <span>Inkubasi Go Export KADIN</span>
                </div>
              </div>
            </div>

            {/* Right Card: Live Cockpit Snapshot */}
            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl text-white">
                <div className="flex items-center justify-between border-b border-white/15 pb-4">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-cyan-300 font-bold">
                      Interactive Snapshot
                    </span>
                    <h3 className="text-lg font-bold text-white">UMKM Growth Cockpit</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-amber-400 leading-none">
                      {growthReport.overallScore}<span className="text-xs text-white/70 font-normal">/100</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-300 uppercase">
                      Level: {growthReport.level}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 my-5">
                  <div className="bg-white/10 p-3 rounded-xl flex items-center justify-between text-xs">
                    <span className="text-blue-100">Adopsi Digital & POS</span>
                    <span className="font-bold text-white">{growthReport.dimensions.digitalization.score}%</span>
                  </div>
                  <div className="bg-white/10 p-3 rounded-xl flex items-center justify-between text-xs">
                    <span className="text-blue-100">GoodSkill & Sertifikasi</span>
                    <span className="font-bold text-white">{growthReport.dimensions.learning.score}%</span>
                  </div>
                  <div className="bg-white/10 p-3 rounded-xl flex items-center justify-between text-xs">
                    <span className="text-blue-100">Legalitas & Halal</span>
                    <span className="font-bold text-white">{growthReport.dimensions.certification.score}%</span>
                  </div>
                  <div className="bg-white/10 p-3 rounded-xl flex items-center justify-between text-xs">
                    <span className="text-blue-100">Etalase INAMarket</span>
                    <span className="font-bold text-white">{growthReport.dimensions.marketplace.score}%</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-900/60 to-indigo-900/60 border border-blue-400/30 p-4 rounded-2xl">
                  <div className="flex items-start gap-2.5 text-xs text-blue-100">
                    <Sparkles className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white">Rekomendasi INA AI Saat Ini:</p>
                      <p className="text-[11px] text-blue-200 mt-1">
                        &quot;Selesaikan kelas Marketing Digital Praktis dan unggah minimal 3 produk berfoto resolusi tinggi di INAMarket untuk menaikkan skor ke level UMKM Unggul.&quot;
                      </p>
                    </div>
                  </div>
                </div>

                <Link
                  href="/dashboard"
                  className="mt-4 w-full py-2.5 rounded-xl bg-white text-[#005BAC] font-bold text-xs hover:bg-blue-50 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Kelola Usaha di Cockpit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aggregate Impact Stats Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#005BAC]">124,850+</div>
            <div className="text-xs text-gray-500 font-medium mt-0.5">UMKM Terdaftar</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#005BAC]">38</div>
            <div className="text-xs text-gray-500 font-medium mt-0.5">Provinsi Se-Indonesia</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#005BAC]">86,400+</div>
            <div className="text-xs text-gray-500 font-medium mt-0.5">Lulus Modul GoodSkill</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#005BAC]">Rp 48.6 M</div>
            <div className="text-xs text-gray-500 font-medium mt-0.5">GMV Transaksi B2B/B2C</div>
          </div>
          <div className="col-span-2 md:col-span-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">41,200+</div>
            <div className="text-xs text-gray-500 font-medium mt-0.5">Tersertifikasi NIB/Halal</div>
          </div>
        </div>
      </section>

      {/* The 7 Strategic Engines */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#005BAC] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            ARSITEKTUR STRATEGIS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-3">
            Tujuh Engine Pertumbuhan UMKM
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Setiap engine terintegrasi erat untuk mengubah data profil usaha menjadi aksi nyata yang terukur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {engines.map((engine) => {
            const Icon = engine.icon;
            return (
              <div
                key={engine.id}
                id={`engine-card-${engine.id}`}
                className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${engine.color} flex items-center justify-center text-white shadow-sm`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
                      {engine.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#005BAC] transition-colors">
                    {engine.title}
                  </h3>
                  <p className="text-xs font-semibold text-blue-600 mb-2">{engine.subtitle}</p>
                  <p className="text-xs text-gray-600 leading-relaxed mb-6">
                    {engine.desc}
                  </p>
                </div>

                <Link
                  href={engine.href}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#005BAC] hover:text-blue-800 transition-colors pt-3 border-t border-gray-100"
                >
                  <span>Buka Layanan</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Product Loop / The Journey of Naik Kelas */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              ALUR PERJALANAN USAHA
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
              Bagaimana UMKM Naik Kelas Terwujud?
            </h2>
            <p className="text-sm text-gray-400 mt-2">
              Transformasi terstruktur berbasis data dan ekosistem terpadu dari skala rumahan menuju kapasitas industri.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {loopSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 text-center hover:border-blue-500 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center mx-auto mb-3">
                  0{idx + 1}
                </div>
                <h4 className="text-xs font-bold text-white mb-1">{step.title}</h4>
                <p className="text-[11px] text-gray-400 leading-tight">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Bar */}
      <section className="bg-gradient-to-r from-[#005BAC] via-blue-600 to-[#00AEEF] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Siap Mengukur & Memajukan Bisnis Anda?
            </h2>
            <p className="text-sm text-blue-100 mt-1 max-w-xl">
              Daftarkan usaha Anda sekarang, dapatkan diagnosis Growth Score gratis, dan terhubung dengan mentor serta program resmi KADIN.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="px-6 py-3.5 rounded-xl bg-white text-[#005BAC] font-bold text-sm shadow-md hover:bg-gray-100 transition-all"
            >
              Mulai Evaluasi Usaha
            </Link>
            <Link
              href="/auth/onboarding"
              className="px-6 py-3.5 rounded-xl bg-blue-900/50 hover:bg-blue-900 text-white font-bold text-sm border border-white/20 transition-all"
            >
              Onboarding Mandiri
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
