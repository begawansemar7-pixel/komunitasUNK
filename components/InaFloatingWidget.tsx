'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/app-context';
import { Sparkles, Send, X, Bot, AlertCircle, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export function InaFloatingWidget() {
  const { business, growthReport } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'user' | 'ina'; text: string; sources?: any[] }[]>([
    {
      sender: 'ina',
      text: `Halo ${business.ownerName}! Saya INA (AI Business Assistant). Berdasarkan profil **${business.businessName}**, skor pertumbuhan Anda saat ini **${growthReport.overallScore}/100** (${growthReport.level}). Ada yang ingin Anda tanyakan seputar perizinan NIB, sertifikasi Halal, digital marketing, atau akses pembiayaan KUR?`,
    },
  ]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = inputMessage.trim();
    if (!query || loading) return;

    const newMsgs = [...messages, { sender: 'user' as const, text: query }];
    setMessages(newMsgs);
    setInputMessage('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          businessContext: {
            ...business,
            growthScore: growthReport.overallScore,
            growthLevel: growthReport.level,
          },
        }),
      });

      const data = await res.json();
      setMessages([
        ...newMsgs,
        {
          sender: 'ina',
          text: data.answer || 'Maaf, terjadi kendala saat memproses jawaban. Silakan coba lagi.',
          sources: data.citedSources || [],
        },
      ]);
    } catch {
      setMessages([
        ...newMsgs,
        {
          sender: 'ina',
          text: 'Terjadi kendala jaringan. Pastikan koneksi internet aktif.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    'Bagaimana cara mengurus sertifikat halal gratis?',
    'Bagaimana cara menghitung HPP produk kuliner?',
    'Apa syarat mengajukan KUR Mikro tanpa agunan?',
    'Bagaimana strategi ekspor untuk produk UMKM?',
  ];

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            id="btn-open-floating-ina"
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#005BAC] via-blue-600 to-[#00AEEF] text-white font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 border-2 border-white/40"
          >
            <div className="relative">
              <Sparkles className="w-5 h-5 text-amber-300 animate-spin-slow" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-white" />
            </div>
            <span className="text-sm tracking-tight">Tanya INA AI</span>
          </button>
        )}
      </div>

      {/* Floating Dialog Drawer */}
      {isOpen && (
        <div
          id="dialog-ina-chat"
          className="fixed bottom-6 right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-[420px] h-[580px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#005BAC] to-[#00AEEF] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                  INA AI Assistant
                  <span className="text-[10px] bg-emerald-400 text-blue-950 font-extrabold px-1.5 py-0.2 rounded">
                    ONLINE
                  </span>
                </h3>
                <p className="text-[11px] text-blue-100">Advisor Bisnis & Regulasi UMKM</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Link
                href="/dashboard/ina"
                onClick={() => setIsOpen(false)}
                title="Buka Layar Penuh"
                className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
              <button
                id="btn-close-ina-floating"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50 text-xs">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ina' && (
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-xl p-3 leading-relaxed whitespace-pre-wrap ${
                    msg.sender === 'user'
                      ? 'bg-[#005BAC] text-white rounded-tr-none'
                      : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-2xs'
                  }`}
                >
                  {msg.text}

                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-gray-100 text-[10px] text-gray-500">
                      <span className="font-semibold text-blue-700">Rujukan: </span>
                      {msg.sources.map((s: any) => s.title).join(', ')}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2 items-center text-xs text-gray-500 italic p-2">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                <span>INA sedang menganalisis regulasi & peluang usaha...</span>
              </div>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="p-2 border-t border-gray-100 bg-white flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((qp, i) => (
              <button
                key={i}
                onClick={() => {
                  setInputMessage(qp);
                }}
                className="text-[10px] px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 hover:bg-blue-100 whitespace-nowrap shrink-0 border border-blue-100 transition-colors"
              >
                {qp}
              </button>
            ))}
          </div>

          {/* Input form */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-200 flex gap-2">
            <input
              type="text"
              id="input-floating-ina"
              placeholder="Tanyakan masalah bisnis, izin, ekspor..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 text-xs px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#005BAC]"
            />
            <button
              type="submit"
              id="btn-send-floating-ina"
              disabled={loading || !inputMessage.trim()}
              className="px-3 py-2 bg-[#005BAC] text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
