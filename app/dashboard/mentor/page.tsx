'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/app-context';
import { Mentor } from '@/lib/types';
import {
  UserCheck,
  Calendar,
  Clock,
  Star,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Briefcase,
  Target,
  Award,
} from 'lucide-react';

export default function MentoringPage() {
  const { mentors, requestMentorSession, business } = useApp();
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [sessionTopic, setSessionTopic] = useState('');
  const [sessionDate, setSessionDate] = useState('2026-09-20');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMentor) return;

    requestMentorSession(selectedMentor.id, `${sessionDate}: ${sessionTopic}`);
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedMentor(null);
      setSessionTopic('');
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-800 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-purple-200 border border-white/20 mb-2">
            <UserCheck className="w-3.5 h-3.5" />
            <span>1-ON-1 BUSINESS MENTORING ENGINE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Pendampingan Ahli & Kurasi Naik Kelas
          </h1>
          <p className="text-xs sm:text-sm text-purple-100 max-w-2xl mt-1">
            Dapatkan bimbingan privat terstruktur dari praktisi scale-up bisnis, konsultan KADIN, auditor Halal, dan fasilitator ekspor.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center">
          <span className="text-[10px] text-purple-200 uppercase font-bold tracking-wider block">
            Fasilitasi Sesi
          </span>
          <div className="text-2xl font-black text-amber-300 my-0.5">
            100% Gratis
          </div>
          <span className="text-[10px] text-purple-200">Didukung Program Kemitraan</span>
        </div>
      </div>

      {/* Action Plan & Milestone Card */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-600" />
            <h3 className="text-sm font-bold text-gray-900">Target & Milestone Pendampingan Usaha</h3>
          </div>
          <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full">
            Fase: Validasi Skalabilitas
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-1">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-800">
              <span>Audit HPP & Kemasan</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              Memastikan marjin kotor minimal 40% untuk mengakomodasi diskon distributor B2B.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-purple-200 bg-purple-50/40 space-y-1">
            <div className="flex items-center justify-between text-xs font-bold text-purple-900">
              <span>Kurasi Sertifikat Halal</span>
              <span className="text-[10px] font-extrabold bg-purple-200 text-purple-800 px-1.5 py-0.2 rounded">In Progress</span>
            </div>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              Pengisian dokumen Manual SJPH dan audit bahan baku bersama pendamping PPH.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-gray-200 bg-gray-50 space-y-1">
            <div className="flex items-center justify-between text-xs font-bold text-gray-700">
              <span>Pitching Buyer B2B</span>
              <span className="text-[10px] text-gray-400">Target Q4</span>
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              Temu bisnis bersama pengadaan perhotelan jaringan nasional.
            </p>
          </div>
        </div>
      </div>

      {/* Mentors Grid */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Daftar Mentor Terkurasi untuk Sektor Anda</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((mentor) => (
            <div
              key={mentor.id}
              id={`mentor-card-${mentor.id}`}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs hover:shadow-md hover:border-purple-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-3.5 mb-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center font-extrabold text-base shrink-0">
                    {mentor.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{mentor.name}</h3>
                    <p className="text-xs text-purple-700 font-semibold">{mentor.headline}</p>
                    <p className="text-[11px] text-gray-500">{mentor.company}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3 text-xs">
                  <div className="flex items-center text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                    <span>{mentor.rating}</span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-500">{mentor.sessionsCompleted} Sesi Selesai</span>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 mb-4">
                  {mentor.bio}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {mentor.expertise.map((exp, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-purple-50 text-purple-700 font-medium px-2 py-0.5 rounded"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {mentor.availability}
                </span>

                <button
                  onClick={() => setSelectedMentor(mentor)}
                  className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1"
                >
                  <span>Jadwalkan</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Dialog */}
      {selectedMentor && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl relative animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider">
                  PENJADWALAN SESI MENTOR
                </span>
                <h3 className="text-base font-bold text-gray-900">Konsultasi 1-on-1</h3>
              </div>
              <button
                onClick={() => setSelectedMentor(null)}
                className="text-gray-400 hover:text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>

            {bookingSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-gray-900">Sesi Berhasil Dijadwalkan!</h4>
                <p className="text-xs text-gray-600">
                  Undangan Google Meet dan ringkasan profil {business.businessName} telah dikirimkan ke <strong>{selectedMentor.name}</strong> (+30 XP didapatkan).
                </p>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="space-y-4">
                <div className="bg-purple-50 p-3 rounded-xl text-xs space-y-1">
                  <p className="font-bold text-purple-900">Mentor: {selectedMentor.name}</p>
                  <p className="text-purple-700">{selectedMentor.headline} • {selectedMentor.company}</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Topik Konsultasi Prioritas</label>
                  <input
                    type="text"
                    required
                    placeholder="Misal: Review HPP dan strategi penawaran ke hotel bintang 4"
                    value={sessionTopic}
                    onChange={(e) => setSessionTopic(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Pilih Tanggal Sesi</label>
                  <input
                    type="date"
                    value={sessionDate}
                    onChange={(e) => setSessionDate(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-purple-600"
                  />
                </div>

                <div className="pt-2 border-t border-gray-100 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedMentor(null)}
                    className="px-4 py-2 border border-gray-300 rounded-xl text-xs font-semibold text-gray-700"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    Konfirmasi Sesi
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
