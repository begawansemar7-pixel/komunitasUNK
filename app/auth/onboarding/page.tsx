'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/app-context';
import {
  Building2,
  Shield,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Award,
} from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const { updateBusiness } = useApp();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    category: 'Kuliner',
    subcategory: '',
    city: '',
    province: 'Jawa Barat',
    whatsapp: '',
    revenueRange: '50-300 Juta',
    employeesCount: 3,
    digitalizationLevel: 'Go Digital Aktif' as const,
    certification: {
      nib: true,
      halal: false,
      pirtOrBpom: true,
      haki: false,
      isoOrSni: false,
    },
  });

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    updateBusiness(formData as any);
    setStep(4);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl border border-gray-200 shadow-xl p-6 sm:p-10 space-y-6">
        {/* Step Indicator */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <span className="text-[10px] font-bold text-[#005BAC] uppercase tracking-wider">
              ONBOARDING & DIAGNOSIS AWAL
            </span>
            <h1 className="text-xl font-bold text-gray-900 mt-0.5">
              Registrasi Identitas Bisnis Mandiri
            </h1>
          </div>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step === s
                    ? 'bg-[#005BAC] text-white'
                    : step > s
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Identitas Bisnis */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#005BAC]" />
              Langkah 1: Profil Usaha & Narahubung
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Brand / Usaha</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Rendang Mandeh Asli Minang"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#005BAC]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Pemilik</label>
                  <input
                    type="text"
                    required
                    placeholder="Nama Lengkap"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#005BAC]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Nomor WhatsApp Aktif</label>
                  <input
                    type="text"
                    required
                    placeholder="08123456789"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#005BAC]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Sektor Usaha</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#005BAC] bg-white"
                  >
                    <option value="Kuliner">Kuliner</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Kerajinan">Kerajinan</option>
                    <option value="Agribisnis">Agribisnis</option>
                    <option value="Jasa">Jasa</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Kota / Kabupaten</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Bandung, Padang, Solo"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#005BAC]"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!formData.businessName || !formData.ownerName}
                className="px-6 py-2.5 bg-[#005BAC] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-1.5"
              >
                <span>Lanjut ke Legalitas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Legalitas */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Shield className="w-4 h-4 text-purple-600" />
              Langkah 2: Legalitas & Kepatuhan Regulasi
            </h3>
            <p className="text-xs text-gray-500">
              Centang dokumen yang saat ini sudah dimiliki usaha Anda.
            </p>

            <div className="space-y-2.5 text-xs">
              <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.certification.nib}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      certification: { ...formData.certification, nib: e.target.checked },
                    })
                  }
                  className="rounded text-[#005BAC] w-4 h-4"
                />
                <div>
                  <span className="font-bold text-gray-900 block">Nomor Induk Berusaha (NIB OSS)</span>
                  <span className="text-[11px] text-gray-500">Identitas resmi perizinan berusaha Kemeninves/BKPM.</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.certification.halal}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      certification: { ...formData.certification, halal: e.target.checked },
                    })
                  }
                  className="rounded text-[#005BAC] w-4 h-4"
                />
                <div>
                  <span className="font-bold text-gray-900 block">Sertifikat Halal (BPJPH / MUI)</span>
                  <span className="text-[11px] text-gray-500">Wajib untuk produk pangan olahan sesuai UU JPH.</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.certification.pirtOrBpom}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      certification: { ...formData.certification, pirtOrBpom: e.target.checked },
                    })
                  }
                  className="rounded text-[#005BAC] w-4 h-4"
                />
                <div>
                  <span className="font-bold text-gray-900 block">Izin P-IRT Dinkes / Izin Edar BPOM</span>
                  <span className="text-[11px] text-gray-500">Standarisasi keamanan pangan.</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.certification.haki}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      certification: { ...formData.certification, haki: e.target.checked },
                    })
                  }
                  className="rounded text-[#005BAC] w-4 h-4"
                />
                <div>
                  <span className="font-bold text-gray-900 block">Hak Kekayaan Intelektual (HAKI Merek)</span>
                  <span className="text-[11px] text-gray-500">Proteksi nama brand resmi dari penjiplakan.</span>
                </div>
              </label>
            </div>

            <div className="flex justify-between pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 border border-gray-300 rounded-xl text-xs font-semibold text-gray-700 flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Kembali</span>
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-2.5 bg-[#005BAC] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors flex items-center gap-1.5"
              >
                <span>Lanjut ke Operasional</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Operasional & Kapasitas */}
        {step === 3 && (
          <form onSubmit={handleFinish} className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              Langkah 3: Kapasitas & Tingkat Digitalisasi
            </h3>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Perkiraan Omzet Bulanan</label>
                <select
                  value={formData.revenueRange}
                  onChange={(e) => setFormData({ ...formData, revenueRange: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 bg-white"
                >
                  <option value="< 50 Juta">&lt; Rp 50 Juta / Bulan</option>
                  <option value="50-300 Juta">Rp 50 - 300 Juta / Bulan</option>
                  <option value="300 Juta - 2.5 Miliar">Rp 300 Juta - 2.5 Miliar</option>
                  <option value="> 2.5 Miliar">&gt; Rp 2.5 Miliar / Bulan</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Jumlah Karyawan / Tim</label>
                <input
                  type="number"
                  min={1}
                  value={formData.employeesCount}
                  onChange={(e) =>
                    setFormData({ ...formData, employeesCount: parseInt(e.target.value) || 1 })
                  }
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300"
                />
              </div>
            </div>

            <div className="text-xs">
              <label className="block font-semibold text-gray-700 mb-1">Adopsi Sistem Digital Usaha Saat Ini</label>
              <select
                value={formData.digitalizationLevel}
                onChange={(e) => setFormData({ ...formData, digitalizationLevel: e.target.value as any })}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-300 bg-white"
              >
                <option value="Tradisional">Tradisional (Pembukuan Buku Tulis / Belum Ada POS)</option>
                <option value="Go Digital Awal">Go Digital Awal (Jualan via WhatsApp & Media Sosial)</option>
                <option value="Go Digital Aktif">Go Digital Aktif (Aplikasi Kasir POS & Toko Online)</option>
                <option value="Digital Native">Digital Native (Manajemen Stok & ERP Terotomasi)</option>
              </select>
            </div>

            <div className="flex justify-between pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2 border border-gray-300 rounded-xl text-xs font-semibold text-gray-700 flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Kembali</span>
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs font-bold hover:opacity-95 transition-opacity shadow-md flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Hitung Growth Score & Selesai</span>
              </button>
            </div>
          </form>
        )}

        {/* Step 4: Celebration & Result */}
        {step === 4 && (
          <div className="py-6 text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-gradient-to-tr from-amber-400 to-amber-500 text-blue-950 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-extrabold text-gray-900">
                Diagnosis Awal Selesai!
              </h2>
              <p className="text-xs text-gray-600 max-w-md mx-auto">
                Profil <strong>{formData.businessName}</strong> telah berhasil didaftarkan ke Ekosistem UMKM Naik Kelas.
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200 max-w-sm mx-auto">
              <span className="text-[11px] text-blue-800 font-semibold block">Skor Pertumbuhan Awal:</span>
              <div className="text-4xl font-black text-[#005BAC] my-1">
                72<span className="text-base text-gray-500 font-normal">/100</span>
              </div>
              <span className="text-xs font-bold text-emerald-700">Status: Potensi Naik Kelas</span>
            </div>

            <div className="pt-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="px-8 py-3.5 bg-[#005BAC] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-lg transition-all inline-flex items-center gap-2"
              >
                <span>Masuk ke Business Growth Cockpit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
