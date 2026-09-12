'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/app-context';
import {
  Sparkles,
  Send,
  Bot,
  ShieldCheck,
  BookOpen,
  TrendingUp,
  FileCheck,
  Award,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export default function InaConsultationPage() {
  const { business, growthReport } = useApp();
  const [messages, setMessages] = useState<
    { sender: 'user' | 'ina'; text: string; sources?: any[]; category?: string }[]
  >([
    {
      sender: 'ina',
      text: `Halo Pak/Ibu **${business.ownerName}**! Saya **INA (Indonesian UMKM Growth Advisor)**. 

Saya telah memindai profil **${business.businessName}**:
• **Growth Score:** ${growthReport.overallScore}/100 (${growthReport.level})
• **Kategori Usaha:** ${business.category} (${business.subcategory})
• **Legalitas:** NIB (${business.certification.nib ? 'Lengkap' : 'Belum'}), Halal (${business.certification.halal ? 'Aktif' : 'Belum Terdaftar'})

Bagaimana saya dapat membantu memajukan usaha Anda hari ini? Anda dapat menanyakan langkah legalitas, strategi harga HPP, mitigasi risiko arus kas, atau cara menembus pengadaan B2B.`,
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const topicPresets = [
    {
      category: 'Legalitas & Perizinan',
      prompt: 'Bagaimana alur dan syarat pengajuan Sertifikasi Halal Gratis (SEHATI) melalui BPJPH untuk usaha kuliner?',
    },
    {
      category: 'Finansial & Modal',
      prompt: 'Bagaimana cara mengajukan KUR Mikro tanpa agunan tambahan dan apa syarat laporan keuangannya?',
    },
    {
      category: 'Strategi Harga & HPP',
      prompt: 'Bagaimana cara menyusun formula HPP produk kuliner agar bisa memberi diskon 25% ke reseller tanpa rugi?',
    },
    {
      category: 'Kesiapan Ekspor',
      prompt: 'Apa saja ceklis standar kemasan dan dokumen uji lab untuk mengekspor makanan olahan ke pasar ASEAN?',
    },
  ];

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = (queryText || inputQuery).trim();
    if (!textToSend || loading) return;

    const newChat = [...messages, { sender: 'user' as const, text: textToSend }];
    setMessages(newChat);
    setInputQuery('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: textToSend,
          businessContext: {
            ...business,
            growthScore: growthReport.overallScore,
            growthLevel: growthReport.level,
            dimensions: growthReport.dimensions,
          },
        }),
      });

      const data = await res.json();

      setMessages([
        ...newChat,
        {
          sender: 'ina',
          text: data.answer || 'Mohon maaf, terjadi kendala saat merumuskan analisis.',
          sources: data.citedSources || [],
        },
      ]);
    } catch {
      setMessages([
        ...newChat,
        {
          sender: 'ina',
          text: 'Terjadi kendala jaringan saat menghubungkan ke sistem INA AI. Pastikan jaringan internet stabil.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#005BAC] via-indigo-900 to-[#0B1F33] text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-amber-300 border border-white/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI BUSINESS ASSISTANT & REGULATION ADVISOR</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            INA AI Advisor Usaha Anda
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 max-w-2xl mt-1">
            Didukung basis pengetahuan resmi: UU Cipta Kerja, PP No. 7/2021 UMKM, UU Jaminan Produk Halal, dan pedoman KUR Kemenko Perekonomian.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20">
          <div className="w-9 h-9 rounded-xl bg-amber-400 text-blue-950 flex items-center justify-center font-bold">
            <Bot className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <span className="font-bold text-white block">Status Model</span>
            <span className="text-emerald-300 font-semibold">Gemini Flash + RAG UMKM</span>
          </div>
        </div>
      </div>

      {/* Main 2-Column: Live Chat on Left, Real-Time Diagnostic Dashboard on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Chat Area (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-200 shadow-xs flex flex-col h-[700px] overflow-hidden">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/40 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ina' && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#005BAC] to-[#00AEEF] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Sparkles className="w-4 h-4 text-amber-300" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-4 leading-relaxed whitespace-pre-wrap ${
                    m.sender === 'user'
                      ? 'bg-[#005BAC] text-white rounded-tr-none'
                      : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-2xs'
                  }`}
                >
                  {m.text}

                  {/* Cited Sources */}
                  {m.sources && m.sources.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-100 text-[11px] text-gray-500 space-y-1">
                      <span className="font-bold text-blue-700 flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        Rujukan Hukum & Sumber Resmi:
                      </span>
                      {m.sources.map((s: any, sIdx: number) => (
                        <div key={sIdx} className="bg-blue-50/60 p-2 rounded-lg border border-blue-100">
                          <strong className="text-blue-950">{s.title}</strong>
                          <p className="text-[10px] text-gray-600 mt-0.5">{s.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-3 p-4 bg-blue-50/50 rounded-2xl border border-blue-100 text-xs text-blue-800 animate-pulse">
                <Sparkles className="w-4 h-4 text-blue-600 animate-spin" />
                <span>INA sedang memverifikasi regulasi dan memformulasikan rekomendasi...</span>
              </div>
            )}
          </div>

          {/* Quick Prompts Bar */}
          <div className="p-3 bg-white border-t border-gray-100 flex gap-2 overflow-x-auto no-scrollbar">
            {topicPresets.map((tp, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(tp.prompt)}
                className="text-[11px] px-3 py-1.5 rounded-full bg-blue-50 text-blue-900 border border-blue-100 hover:bg-blue-100 whitespace-nowrap shrink-0 transition-colors font-medium"
              >
                {tp.category}
              </button>
            ))}
          </div>

          {/* Form Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-4 bg-white border-t border-gray-200 flex gap-2"
          >
            <input
              type="text"
              id="input-ina-main"
              placeholder="Tanyakan masalah bisnis, audit legalitas, cara ekspor, permodalan..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="flex-1 text-xs px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#005BAC]"
            />
            <button
              type="submit"
              id="btn-send-ina-main"
              disabled={loading || !inputQuery.trim()}
              className="px-5 py-3 bg-[#005BAC] text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 font-bold text-xs flex items-center gap-1.5"
            >
              <span>Kirim</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Right Side: Diagnosis Panel & Legal Checklist (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Growth Diagnostic Card */}
          <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-bold text-gray-900">Diagnosis Kapabilitas Usaha</h3>
              <span className="text-xs font-bold text-[#005BAC] bg-blue-50 px-2 py-0.5 rounded-full">
                Skor: {growthReport.overallScore}/100
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-950">
                <span className="font-bold flex items-center gap-1 text-emerald-800">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Kelebihan Terverifikasi
                </span>
                <p className="text-[11px] text-emerald-900 mt-1">
                  NIB OSS aktif dan adopsi pencatatan transaksi digital sudah berjalan.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-950">
                <span className="font-bold flex items-center gap-1 text-amber-800">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  Celah Kritis (Bottleneck)
                </span>
                <p className="text-[11px] text-amber-900 mt-1">
                  Belum memiliki pendaftaran HAKI Merek Dagang dan sertifikat Halal resmi, menghambat ekspansi ke rantai pasok modern.
                </p>
              </div>
            </div>
          </div>

          {/* Regulatory Reference Box */}
          <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-3xl p-6 shadow-lg space-y-3 text-xs">
            <h4 className="font-bold text-amber-300 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Dasar Regulasi Terintegrasi
            </h4>
            <ul className="space-y-2 text-slate-300 text-[11px] leading-relaxed">
              <li>• <strong>PP No. 7 Tahun 2021:</strong> Kemudahan, Perlindungan, dan Pemberdayaan Koperasi dan UMKM.</li>
              <li>• <strong>UU No. 33 Tahun 2014 & Perppu Cipta Kerja:</strong> Wajib Sertifikasi Halal Bertahap.</li>
              <li>• <strong>Permenko Perekonomian No. 1 Tahun 2023:</strong> Skema Subsidi Bunga Kredit Usaha Rakyat (KUR).</li>
              <li>• <strong>BPOM No. 22 Tahun 2021:</strong> Tata Cara Penerbitan Izin Edar Pangan Olahan.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
