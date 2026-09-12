'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/app-context';
import { ProgramOpportunity } from '@/lib/types';
import {
  Briefcase,
  Target,
  CheckCircle2,
  Calendar,
  Building,
  TrendingUp,
  Award,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Percent,
} from 'lucide-react';

export default function PeluangPage() {
  const { programs, registeredProgramIds, applyToProgram, business } = useApp();
  const [activeTab, setActiveTab] = useState<'programs' | 'matching'>('programs');
  const [selectedProgram, setSelectedProgram] = useState<ProgramOpportunity | null>(null);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const handleRegister = (progId: string) => {
    applyToProgram(progId);
    setRegisterSuccess(true);
    setTimeout(() => {
      setRegisterSuccess(false);
      setSelectedProgram(null);
    }, 2000);
  };

  const matchingOpportunities = [
    {
      id: 'match-1',
      buyer: 'Jaringan Hotel Santika & Amaris (Jawa-Bali)',
      needs: 'Pasokan Sambal Roa & Bumbu Siap Pakai (1,500 Pcs/Bulan)',
      requirements: ['Halal BPJPH', 'P-IRT/BPOM', 'Kapasitas Pasokan Stabil'],
      matchScore: 94,
      category: 'Kuliner',
      status: 'Open RFQ',
      deadline: '25 September 2026',
    },
    {
      id: 'match-2',
      buyer: 'Koperasi Karyawan BUMN Pertamina',
      needs: 'Paket Hampers Lebaran & Kerajinan Ramah Lingkungan',
      requirements: ['NIB OSS', 'Portofolio Produk Minimal 5 Jenis'],
      matchScore: 88,
      category: 'Kerajinan',
      status: 'Open Procurement',
      deadline: '10 Oktober 2026',
    },
    {
      id: 'match-3',
      buyer: 'Konsorsium Diaspora Trading Hub (Tokyo & Osaka)',
      needs: 'Kopi Specialty Arabika & Produk Olahan Kakao Fermentasi',
      requirements: ['Sertifikat Halal', 'Sertifikat Uji Lab Organik', 'Kesiapan Ekspor'],
      matchScore: 78,
      category: 'Agribisnis',
      status: 'Export Matching',
      deadline: '30 November 2026',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-700 via-blue-800 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-cyan-200 border border-white/20 mb-2">
            <Target className="w-3.5 h-3.5" />
            <span>BUSINESS MATCHING & FINANCING PROGRAMS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Peluang Bisnis & Fasilitasi Pemerintah
          </h1>
          <p className="text-xs sm:text-sm text-sky-100 max-w-2xl mt-1">
            Akses langsung pengadaan barang B2B, program sertifikasi halal gratis BPJPH, pendampingan ekspor KADIN, dan pembiayaan KUR.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('programs')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'programs'
                ? 'bg-white text-blue-900 shadow-md'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Program & Subsidi
          </button>
          <button
            onClick={() => setActiveTab('matching')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'matching'
                ? 'bg-white text-blue-900 shadow-md'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Business Matching (B2B)
          </button>
        </div>
      </div>

      {/* Tab: Programs */}
      {activeTab === 'programs' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((prog) => {
              const isRegistered = registeredProgramIds.includes(prog.id);
              return (
                <div
                  key={prog.id}
                  id={`program-card-${prog.id}`}
                  className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-extrabold text-[#005BAC] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                        {prog.organizer}
                      </span>
                      <span className="text-[11px] font-bold text-gray-500">
                        Batas: {prog.deadline}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-gray-900 leading-snug mb-2">
                      {prog.title}
                    </h3>

                    <p className="text-xs text-gray-600 leading-relaxed mb-4">
                      {prog.description}
                    </p>

                    <div className="bg-gray-50 p-3 rounded-xl mb-4 space-y-1">
                      <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wider block">
                        Kriteria Syarat:
                      </span>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {prog.eligibility.map((cr, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{cr}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100">
                    {isRegistered ? (
                      <div className="w-full py-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Usaha Anda Telah Terdaftar</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => setSelectedProgram(prog)}
                        className="w-full py-2.5 bg-[#005BAC] hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors shadow-xs"
                      >
                        Ajukan Keikutsertaan
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab: Matching B2B Opportunities */}
      {activeTab === 'matching' && (
        <div className="space-y-6">
          <div className="bg-blue-50/70 border border-blue-200 p-4 rounded-2xl flex items-center gap-3 text-xs text-blue-900">
            <Target className="w-5 h-5 text-[#005BAC] shrink-0" />
            <div>
              <strong>Algoritma Pencocokan Otomatis:</strong> Nilai kecocokan dihitung secara dinamis berdasarkan kelengkapan legalitas (NIB, Halal), kategori usaha, dan kapasitas produksi <strong>{business.businessName}</strong>.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchingOpportunities.map((match) => (
              <div
                key={match.id}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs hover:border-sky-400 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-extrabold text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded">
                      {match.status}
                    </span>
                    <div className="flex items-center gap-1 text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <Percent className="w-3 h-3" />
                      <span>{match.matchScore}% Match</span>
                    </div>
                  </div>

                  <h4 className="text-xs font-semibold text-gray-500">{match.buyer}</h4>
                  <h3 className="text-sm font-bold text-gray-900 leading-snug my-1.5">
                    {match.needs}
                  </h3>

                  <div className="mt-4 pt-3 border-t border-gray-100 space-y-1.5">
                    <span className="text-[10px] font-bold text-gray-600 uppercase">Syarat Wajib:</span>
                    <div className="flex flex-wrap gap-1">
                      {match.requirements.map((req, rIdx) => (
                        <span
                          key={rIdx}
                          className="text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded"
                        >
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-4">
                  <span className="text-[11px] text-gray-400">Tenggat: {match.deadline}</span>
                  <button
                    onClick={() => alert(`Pengajuan proposal pasokan ke ${match.buyer} telah dibuka. Tim kurasi KADIN akan memverifikasi katalog usaha Anda.`)}
                    className="px-3.5 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl transition-colors"
                  >
                    Kirim Penawaran
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl relative animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#005BAC] uppercase tracking-wider">
                  PENGAJUAN PROGRAM
                </span>
                <h3 className="text-base font-bold text-gray-900">{selectedProgram.title}</h3>
              </div>
              <button
                onClick={() => setSelectedProgram(null)}
                className="text-gray-400 hover:text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>

            {registerSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-gray-900">Pendaftaran Terkirim!</h4>
                <p className="text-xs text-gray-600">
                  Data usaha {business.businessName} telah diserahkan ke {selectedProgram.organizer}.
                </p>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="bg-blue-50 p-3 rounded-xl space-y-1">
                  <p className="font-bold text-blue-950">Penyelenggara: {selectedProgram.organizer}</p>
                  <p className="text-blue-800">{selectedProgram.description}</p>
                </div>

                <div>
                  <p className="font-semibold text-gray-700 mb-1">Data profil yang akan dibagikan:</p>
                  <ul className="text-gray-600 space-y-1 pl-3">
                    <li>• Profil usaha: {business.businessName} ({business.category})</li>
                    <li>• Status Legalitas NIB & Halal</li>
                    <li>• Kontak resmi PIC ({business.ownerName})</li>
                  </ul>
                </div>

                <div className="pt-2 border-t border-gray-100 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedProgram(null)}
                    className="px-4 py-2 border border-gray-300 rounded-xl font-semibold text-gray-700"
                  >
                    Batal
                  </button>
                  <button
                    onClick={() => handleRegister(selectedProgram.id)}
                    className="px-5 py-2 bg-[#005BAC] hover:bg-blue-700 text-white font-bold rounded-xl transition-colors"
                  >
                    Konfirmasi & Daftar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
