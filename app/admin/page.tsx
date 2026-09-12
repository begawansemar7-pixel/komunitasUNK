'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/app-context';
import { canAccessAdmin } from '@/modules/identity/rbac';
import {
  ShieldAlert,
  Users,
  CheckCircle2,
  XCircle,
  Building2,
  TrendingUp,
  MapPin,
  Search,
  Filter,
  BarChart3,
  Award,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const { currentRole, business } = useApp();
  const [activeTab, setActiveTab] = useState<'verifikasi' | 'analitik' | 'wilayah'>('verifikasi');

  // Simulated verification queue
  const [verificationQueue, setVerificationQueue] = useState([
    {
      id: 'VER-101',
      businessName: 'Keripik Tempe Srikandi',
      owner: 'Siti Rahmawati',
      city: 'Malang, Jawa Timur',
      category: 'Kuliner',
      requestedType: 'Verifikasi NIB & Halal SEHATI',
      nibDoc: 'OSS-912000341',
      status: 'pending',
    },
    {
      id: 'VER-102',
      businessName: 'Batik Tulis Pesona Solo',
      owner: 'Bambang Sudibyo',
      city: 'Surakarta, Jawa Tengah',
      category: 'Fashion',
      requestedType: 'Kurasi Kurasi Ekspor KADIN',
      nibDoc: 'OSS-883100292',
      status: 'pending',
    },
    {
      id: 'VER-103',
      businessName: 'Madu Hutan Sumbawa Organik',
      owner: 'Zulkifli Mansyur',
      city: 'Sumbawa, NTB',
      category: 'Agribisnis',
      requestedType: 'Izin Edar BPOM & Uji Lab Organik',
      nibDoc: 'OSS-771920014',
      status: 'pending',
    },
  ]);

  const handleApprove = (id: string) => {
    setVerificationQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'approved' } : item))
    );
  };

  const handleReject = (id: string) => {
    setVerificationQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'rejected' } : item))
    );
  };

  const isAuthorized = canAccessAdmin(currentRole);

  if (!isAuthorized) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h1 className="text-xl font-bold text-gray-900">Akses Terbatas: Portal Administrator</h1>
        <p className="text-xs text-gray-600 max-w-md mx-auto">
          Halaman ini khusus untuk peran <strong>Super Admin, Regional Admin, KADIN Partner,</strong> atau <strong>Verifikator</strong>. Peran Anda saat ini adalah <strong>{currentRole}</strong>.
        </p>
        <div className="pt-4">
          <p className="text-xs text-blue-700 font-medium mb-3">
            💡 Gunakan tombol &quot;Ganti Peran&quot; di header atas untuk berpindah ke peran Super Admin.
          </p>
          <Link
            href="/dashboard"
            className="px-5 py-2.5 bg-[#005BAC] text-white text-xs font-bold rounded-xl inline-block"
          >
            Kembali ke Cockpit UMKM
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-xs font-semibold text-purple-200 border border-purple-400/30 mb-2">
            <ShieldAlert className="w-3.5 h-3.5 text-purple-400" />
            <span>PORTAL ADMINISTRATOR & REGIONAL MONITORING</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Dashboard Pengelola & Kurasi Ekosistem
          </h1>
          <p className="text-xs sm:text-sm text-purple-200 max-w-2xl mt-1">
            Monitoring penetrasi UMKM di 38 provinsi, antrean verifikasi NIB/Halal, dan kinerja transaksi B2B nasional.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('verifikasi')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'verifikasi'
                ? 'bg-white text-purple-950 shadow-md'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Antrean Verifikasi ({verificationQueue.filter((q) => q.status === 'pending').length})
          </button>
          <button
            onClick={() => setActiveTab('analitik')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'analitik'
                ? 'bg-white text-purple-950 shadow-md'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Metrik Nasional
          </button>
          <button
            onClick={() => setActiveTab('wilayah')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'wilayah'
                ? 'bg-white text-purple-950 shadow-md'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Sebaran Wilayah
          </button>
        </div>
      </div>

      {/* Tab: Verifikasi */}
      {activeTab === 'verifikasi' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-gray-900">Antrean Verifikasi Kredensial Usaha</h3>
              <p className="text-xs text-gray-500">Periksa kesesuaian dokumen resmi NIB dan sertifikat Halal sebelum diterbitkan badge terverifikasi.</p>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {verificationQueue.map((item) => (
              <div key={item.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-900">{item.businessName}</span>
                    <span className="text-[10px] bg-blue-100 text-[#005BAC] font-extrabold px-2 py-0.2 rounded">
                      {item.category}
                    </span>
                    <span className="text-[11px] text-gray-500">• Pemilik: {item.owner}</span>
                  </div>
                  <p className="text-xs text-gray-600">
                    {item.requestedType} (No. Dokumen: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-[11px] font-mono">{item.nibDoc}</code>)
                  </p>
                  <p className="text-[11px] text-gray-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {item.city}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {item.status === 'pending' ? (
                    <>
                      <button
                        onClick={() => handleReject(item.id)}
                        className="px-3.5 py-2 border border-rose-200 text-rose-700 hover:bg-rose-50 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Tolak</span>
                      </button>
                      <button
                        onClick={() => handleApprove(item.id)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition-colors shadow-xs"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Verifikasi Dokumen</span>
                      </button>
                    </>
                  ) : item.status === 'approved' ? (
                    <span className="px-3 py-1.5 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Terverifikasi Resmi
                    </span>
                  ) : (
                    <span className="px-3 py-1.5 bg-rose-50 text-rose-800 text-xs font-bold rounded-xl border border-rose-200">
                      Ditolak (Perlu Perbaikan)
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Analitik Nasional */}
      {activeTab === 'analitik' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
            <span className="text-xs text-gray-500 block">Rasio Kenaikan Kelas Tahunan</span>
            <div className="text-3xl font-extrabold text-[#005BAC] mt-1">28.4%</div>
            <p className="text-[11px] text-emerald-600 mt-1 font-semibold">↑ +4.2% dibanding target renstra</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
            <span className="text-xs text-gray-500 block">Tingkat Penyerapan KUR</span>
            <div className="text-3xl font-extrabold text-[#005BAC] mt-1">Rp 12.8 M</div>
            <p className="text-[11px] text-gray-500 mt-1">Rata-rata plafon Rp 35 Juta / UMKM</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
            <span className="text-xs text-gray-500 block">Tingkat Kelulusan GoodSkill</span>
            <div className="text-3xl font-extrabold text-[#005BAC] mt-1">74.1%</div>
            <p className="text-[11px] text-gray-500 mt-1">Modul manajemen kas & Halal terfavorit</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
            <span className="text-xs text-gray-500 block">Kemitraan B2B Terfasilitasi</span>
            <div className="text-3xl font-extrabold text-emerald-600 mt-1">842 Kontrak</div>
            <p className="text-[11px] text-emerald-700 mt-1 font-semibold">Perhotelan, katering & retail</p>
          </div>
        </div>
      )}

      {/* Tab: Wilayah */}
      {activeTab === 'wilayah' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-gray-900">Sebaran UMKM per Wilayah KADIN Daerah</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            {[
              { prov: 'Jawa Barat', count: '28,400 UMKM', score: 'Rata-rata Skor: 76/100' },
              { prov: 'Jawa Timur', count: '24,100 UMKM', score: 'Rata-rata Skor: 74/100' },
              { prov: 'Jawa Tengah', count: '19,800 UMKM', score: 'Rata-rata Skor: 73/100' },
              { prov: 'DKI Jakarta', count: '15,600 UMKM', score: 'Rata-rata Skor: 81/100' },
              { prov: 'Sumatera Utara', count: '11,200 UMKM', score: 'Rata-rata Skor: 70/100' },
              { prov: 'Sulawesi Selatan', count: '9,400 UMKM', score: 'Rata-rata Skor: 71/100' },
            ].map((reg, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-gray-100 bg-gray-50/70">
                <h4 className="font-bold text-gray-900 text-sm">{reg.prov}</h4>
                <p className="text-xs text-blue-700 font-semibold mt-0.5">{reg.count}</p>
                <p className="text-[11px] text-gray-500 mt-1">{reg.score}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
