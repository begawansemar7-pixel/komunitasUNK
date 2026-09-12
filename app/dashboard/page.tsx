'use client';

import React from 'react';
import { useApp } from '@/lib/app-context';
import { GrowthScoreRadar } from '@/components/GrowthScoreRadar';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  GraduationCap,
  ShoppingBag,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  Briefcase,
  TrendingUp,
  FileText,
  Clock,
  Award,
  Zap,
} from 'lucide-react';

export default function DashboardPage() {
  const { business, growthReport, courses, products, mentors, programs, registeredProgramIds } = useApp();

  const completedCourses = courses.filter((c) => c.progress === 100).length;
  const activeProducts = products.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Welcome & Score Header */}
      <div className="bg-gradient-to-r from-[#005BAC] via-[#004b8d] to-[#0B1F33] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-amber-300 border border-white/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>BUSINESS GROWTH COCKPIT</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Selamat Datang, {business.ownerName}
            </h1>
            <p className="text-sm text-blue-100 max-w-2xl">
              Usaha: <strong className="text-white">{business.businessName}</strong> ({business.category} • {business.city}, {business.province})
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/20">
            <div className="text-center sm:text-right">
              <span className="text-[11px] text-blue-200 uppercase font-bold tracking-wider block">
                Growth Score
              </span>
              <div className="text-4xl sm:text-5xl font-black text-amber-400 leading-none my-1">
                {growthReport.overallScore}
                <span className="text-base text-white/70 font-normal">/100</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-300 font-bold justify-center sm:justify-end">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+6 bulan ini • {growthReport.level}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Health Summary Strip */}
        <div className="mt-8 pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="bg-white/10 p-3 rounded-xl">
            <span className="text-blue-200 block text-[11px]">Status NIB & Legalitas</span>
            <span className="font-bold text-white flex items-center gap-1 mt-0.5">
              {business.certification.nib ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
              )}
              {business.certification.nib ? 'NIB Terverifikasi' : 'Perlu Diisi'}
            </span>
          </div>

          <div className="bg-white/10 p-3 rounded-xl">
            <span className="text-blue-200 block text-[11px]">Sertifikasi Halal</span>
            <span className="font-bold text-white flex items-center gap-1 mt-0.5">
              {business.certification.halal ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
              )}
              {business.certification.halal ? 'Halal Aktif (SEHATI)' : 'Belum Halal'}
            </span>
          </div>

          <div className="bg-white/10 p-3 rounded-xl">
            <span className="text-blue-200 block text-[11px]">Kelas GoodSkill Lulus</span>
            <span className="font-bold text-white flex items-center gap-1 mt-0.5">
              <GraduationCap className="w-3.5 h-3.5 text-cyan-300" />
              {completedCourses} Modul Tuntas
            </span>
          </div>

          <div className="bg-white/10 p-3 rounded-xl">
            <span className="text-blue-200 block text-[11px]">Katalog INAMarket</span>
            <span className="font-bold text-white flex items-center gap-1 mt-0.5">
              <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
              {activeProducts} Produk Aktif
            </span>
          </div>
        </div>
      </div>

      {/* Primary Section: WHAT SHOULD I DO NEXT? (INA AI Recommendations) */}
      <div className="bg-gradient-to-br from-amber-500/10 via-blue-50/50 to-indigo-500/10 rounded-2xl border-2 border-amber-300/60 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                WHAT SHOULD I DO NEXT?
                <span className="text-[11px] bg-amber-500 text-white font-extrabold px-2 py-0.5 rounded-full">
                  Rekomendasi INA AI
                </span>
              </h2>
              <p className="text-xs text-gray-500">
                Langkah konkret dengan dampak tertinggi untuk menaikkan skor bisnis menuju level berikutnya.
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/ina"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#005BAC] text-white text-xs font-bold hover:bg-blue-700 transition-colors shrink-0"
          >
            <span>Buka Diagnosis Penuh</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4 Actionable Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200/80 hover:border-blue-400 transition-all shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                +15 SKOR
              </span>
              <ShoppingBag className="w-4 h-4 text-emerald-600" />
            </div>
            <h4 className="text-xs font-bold text-gray-900 mb-1">Lengkapi Katalog Digital</h4>
            <p className="text-[11px] text-gray-600 leading-relaxed mb-3">
              Tambahkan minimal 3 produk unggulan lengkap dengan spesifikasi grosir B2B di INAMarket.
            </p>
            <Link
              href="/dashboard/market"
              className="text-xs font-bold text-[#005BAC] hover:underline flex items-center gap-1"
            >
              <span>Tambah Produk</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200/80 hover:border-blue-400 transition-all shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                +12 SKOR
              </span>
              <GraduationCap className="w-4 h-4 text-blue-600" />
            </div>
            <h4 className="text-xs font-bold text-gray-900 mb-1">Ikuti &quot;Marketing Digital Praktis&quot;</h4>
            <p className="text-[11px] text-gray-600 leading-relaxed mb-3">
              Pelajari teknik hook 3 detik video TikTok dan optimasi WhatsApp Business untuk closing cepat.
            </p>
            <Link
              href="/dashboard/belajar"
              className="text-xs font-bold text-[#005BAC] hover:underline flex items-center gap-1"
            >
              <span>Lanjut Belajar</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200/80 hover:border-blue-400 transition-all shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                +10 SKOR
              </span>
              <UserCheck className="w-4 h-4 text-purple-600" />
            </div>
            <h4 className="text-xs font-bold text-gray-900 mb-1">Dampingan Bersama Mentor</h4>
            <p className="text-[11px] text-gray-600 leading-relaxed mb-3">
              Ajukan sesi 1-on-1 dengan mentor scale-up kuliner untuk mengaudit HPP dan SOP operasional.
            </p>
            <Link
              href="/dashboard/mentor"
              className="text-xs font-bold text-[#005BAC] hover:underline flex items-center gap-1"
            >
              <span>Pilih Mentor</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200/80 hover:border-blue-400 transition-all shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                +10 SKOR
              </span>
              <Briefcase className="w-4 h-4 text-amber-600" />
            </div>
            <h4 className="text-xs font-bold text-gray-900 mb-1">Gabung Business Matching KADIN</h4>
            <p className="text-[11px] text-gray-600 leading-relaxed mb-3">
              Peluang memasok olahan sambal ke jaringan perhotelan nasional dan pengadaan korporasi.
            </p>
            <Link
              href="/dashboard/peluang"
              className="text-xs font-bold text-[#005BAC] hover:underline flex items-center gap-1"
            >
              <span>Daftar Peluang</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Growth Score Radar & Dimensions Breakdown */}
      <GrowthScoreRadar report={growthReport} />

      {/* Bottom Grid: GoodSkill in progress & Upcoming Opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* GoodSkill Progress */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-gray-900 text-sm">Akademi GoodSkill Terjadwal</h3>
            </div>
            <Link href="/dashboard/belajar" className="text-xs text-[#005BAC] font-bold hover:underline">
              Semua Kelas
            </Link>
          </div>

          <div className="space-y-3">
            {courses.slice(0, 2).map((crs) => (
              <div
                key={crs.id}
                className="p-3.5 rounded-xl border border-gray-100 bg-gray-50/70 flex items-center justify-between gap-4"
              >
                <div>
                  <h4 className="text-xs font-bold text-gray-900">{crs.title}</h4>
                  <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-1">
                    <span>Instruktur: {crs.instructor}</span>
                    <span>•</span>
                    <span className="font-semibold text-emerald-600">+{crs.xpReward} XP</span>
                  </div>
                  {/* Progress */}
                  <div className="w-48 bg-gray-200 rounded-full h-1.5 mt-2 overflow-hidden">
                    <div
                      className="bg-blue-600 h-1.5 rounded-full"
                      style={{ width: `${crs.progress || 0}%` }}
                    />
                  </div>
                </div>

                <Link
                  href="/dashboard/belajar"
                  className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors shrink-0"
                >
                  {crs.progress === 100 ? 'Sertifikat' : 'Lanjutkan'}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Program Opportunities */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-amber-600" />
              <h3 className="font-bold text-gray-900 text-sm">Program & Peluang Terbuka</h3>
            </div>
            <Link href="/dashboard/peluang" className="text-xs text-[#005BAC] font-bold hover:underline">
              Jelajahi Semua
            </Link>
          </div>

          <div className="space-y-3">
            {programs.slice(0, 2).map((prg) => {
              const isRegistered = registeredProgramIds.includes(prg.id);
              return (
                <div
                  key={prg.id}
                  className="p-3.5 rounded-xl border border-gray-100 bg-gray-50/70 flex items-center justify-between gap-4"
                >
                  <div>
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                      {prg.organizer}
                    </span>
                    <h4 className="text-xs font-bold text-gray-900 mt-1">{prg.title}</h4>
                    <p className="text-[11px] text-gray-500 mt-0.5">Batas: {prg.deadline}</p>
                  </div>

                  <Link
                    href="/dashboard/peluang"
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 ${
                      isRegistered
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-500 text-white hover:bg-amber-600'
                    }`}
                  >
                    {isRegistered ? 'Terdaftar' : 'Ajukan'}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
