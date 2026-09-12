'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/app-context';
import {
  Building2,
  CheckCircle2,
  Save,
  FileCheck,
  Shield,
  Smartphone,
  Globe,
  MapPin,
  TrendingUp,
  Award,
} from 'lucide-react';

export default function BisnisProfilePage() {
  const { business, updateBusiness, growthReport } = useApp();
  const [formData, setFormData] = useState(business);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (parent: 'certification' | 'marketplacePresence', field: string, value: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBusiness(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-[#005BAC]">
              DIGITAL BUSINESS IDENTITY
            </span>
            <span className="text-xs text-gray-500 font-medium">Profil & Kredensial Usaha</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mt-1">Identitas Digital Usaha</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Data terverifikasi untuk pengajuan kurasi B2B, program SEHATI Halal, dan fasilitasi ekspor.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs text-gray-500 block">Growth Score Saat Ini:</span>
            <span className="text-2xl font-black text-[#005BAC]">{growthReport.overallScore}/100</span>
          </div>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Profil bisnis berhasil diperbarui! Growth Score otomatis dievaluasi ulang oleh sistem.</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* General info */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-600" />
              Informasi Umum & Domisili
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Usaha / Brand</label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => handleChange('businessName', e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#005BAC]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Pemilik (Owner)</label>
                <input
                  type="text"
                  value={formData.ownerName}
                  onChange={(e) => handleChange('ownerName', e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#005BAC]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Kategori Usaha</label>
                <select
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#005BAC] bg-white"
                >
                  <option value="Kuliner">Kuliner (Makanan & Minuman)</option>
                  <option value="Fashion">Fashion & Tekstil</option>
                  <option value="Kerajinan">Kerajinan Tangan (Craft)</option>
                  <option value="Jasa">Jasa & Keagenan</option>
                  <option value="Digital">Digital & Kreatif</option>
                  <option value="Pertanian">Pertanian & Agribisnis</option>
                  <option value="Beauty">Beauty & Kosmetik</option>
                  <option value="Retail">Retail & Grosir</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Subkategori Spesifik</label>
                <input
                  type="text"
                  value={formData.subcategory}
                  onChange={(e) => handleChange('subcategory', e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#005BAC]"
                  placeholder="Misal: Olahan Ikan, Kain Tenun, Kopi Sangrai"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Provinsi</label>
                <input
                  type="text"
                  value={formData.province}
                  onChange={(e) => handleChange('province', e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#005BAC]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Kabupaten / Kota</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#005BAC]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Alamat Lengkap Produksi / Workshop</label>
              <textarea
                rows={2}
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#005BAC]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Deskripsi Profil Usaha</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#005BAC]"
              />
            </div>
          </div>

          {/* Operational & Scale */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              Skala Operasional & Kesiapan Usaha
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Tahun Berdiri</label>
                <input
                  type="number"
                  value={formData.foundedYear}
                  onChange={(e) => handleChange('foundedYear', parseInt(e.target.value) || 2022)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#005BAC]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Jumlah Tenaga Kerja</label>
                <input
                  type="number"
                  value={formData.employeesCount}
                  onChange={(e) => handleChange('employeesCount', parseInt(e.target.value) || 1)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#005BAC]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Rentang Omzet Bulanan</label>
                <select
                  value={formData.revenueRange}
                  onChange={(e) => handleChange('revenueRange', e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#005BAC] bg-white"
                >
                  <option value="< 50 Juta">&lt; Rp 50 Juta</option>
                  <option value="50-300 Juta">Rp 50 Juta - Rp 300 Juta</option>
                  <option value="300 Juta - 2.5 Miliar">Rp 300 Juta - Rp 2.5 Miliar</option>
                  <option value="> 2.5 Miliar">&gt; Rp 2.5 Miliar</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Tingkat Adopsi Digital</label>
                <select
                  value={formData.digitalizationLevel}
                  onChange={(e) => handleChange('digitalizationLevel', e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#005BAC] bg-white"
                >
                  <option value="Tradisional">Tradisional (Pencatatan Manual)</option>
                  <option value="Go Digital Awal">Go Digital Awal (Sosmed & WhatsApp)</option>
                  <option value="Go Digital Aktif">Go Digital Aktif (POS Digital & Marketplace)</option>
                  <option value="Digital Native">Digital Native (Sistem ERP/Manajemen Terintegrasi)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Kesiapan Ekspor</label>
                <select
                  value={formData.exportReadiness}
                  onChange={(e) => handleChange('exportReadiness', e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#005BAC] bg-white"
                >
                  <option value="Belum Siap">Belum Siap</option>
                  <option value="Potensi Ekspor">Potensi Ekspor (Kemasan & Kapasitas Bagus)</option>
                  <option value="Siap Ekspor">Siap Ekspor (Standar Internasional Terpenuhi)</option>
                  <option value="Aktif Ekspor">Aktif Ekspor Rutin</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Legalitas, Marketplace, & Contacts */}
        <div className="space-y-6">
          {/* Legalitas & Sertifikasi */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-purple-600" />
              Legalitas & Sertifikasi
            </h2>

            <div className="space-y-2.5 text-xs">
              <label className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-100">
                <input
                  type="checkbox"
                  checked={formData.certification.nib}
                  onChange={(e) => handleNestedChange('certification', 'nib', e.target.checked)}
                  className="rounded text-[#005BAC] focus:ring-0 w-4 h-4"
                />
                <span className="font-semibold text-gray-800">Nomor Induk Berusaha (NIB OSS)</span>
              </label>

              <label className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-100">
                <input
                  type="checkbox"
                  checked={formData.certification.halal}
                  onChange={(e) => handleNestedChange('certification', 'halal', e.target.checked)}
                  className="rounded text-[#005BAC] focus:ring-0 w-4 h-4"
                />
                <span className="font-semibold text-gray-800">Sertifikat Halal (BPJPH/SEHATI)</span>
              </label>

              <label className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-100">
                <input
                  type="checkbox"
                  checked={formData.certification.pirtOrBpom}
                  onChange={(e) => handleNestedChange('certification', 'pirtOrBpom', e.target.checked)}
                  className="rounded text-[#005BAC] focus:ring-0 w-4 h-4"
                />
                <span className="font-semibold text-gray-800">Izin P-IRT / Izin Edar BPOM</span>
              </label>

              <label className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-100">
                <input
                  type="checkbox"
                  checked={formData.certification.haki}
                  onChange={(e) => handleNestedChange('certification', 'haki', e.target.checked)}
                  className="rounded text-[#005BAC] focus:ring-0 w-4 h-4"
                />
                <span className="font-semibold text-gray-800">Hak Merek / HAKI Kemenkumham</span>
              </label>

              <label className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-100">
                <input
                  type="checkbox"
                  checked={formData.certification.isoOrSni}
                  onChange={(e) => handleNestedChange('certification', 'isoOrSni', e.target.checked)}
                  className="rounded text-[#005BAC] focus:ring-0 w-4 h-4"
                />
                <span className="font-semibold text-gray-800">Standarisasi SNI / ISO / HACCP</span>
              </label>
            </div>
          </div>

          {/* Kontak & Channel */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-emerald-600" />
              Kontak Bisnis & Media Sosial
            </h2>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">WhatsApp Bisnis</label>
                <input
                  type="text"
                  value={formData.whatsapp}
                  onChange={(e) => handleChange('whatsapp', e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#005BAC]"
                  placeholder="628123456789"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Instagram Bisnis</label>
                <input
                  type="text"
                  value={formData.instagram || ''}
                  onChange={(e) => handleChange('instagram', e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#005BAC]"
                  placeholder="@namausaha.id"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Website Resmi</label>
                <input
                  type="text"
                  value={formData.website || ''}
                  onChange={(e) => handleChange('website', e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#005BAC]"
                  placeholder="https://usahaanda.com"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            id="btn-save-business-profile"
            className="w-full py-3.5 rounded-xl bg-[#005BAC] hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Perubahan & Update Skor</span>
          </button>
        </div>
      </form>
    </div>
  );
}
