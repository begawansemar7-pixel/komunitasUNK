'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/app-context';
import { Course } from '@/lib/types';
import {
  GraduationCap,
  Award,
  PlayCircle,
  CheckCircle2,
  BookOpen,
  Clock,
  Sparkles,
  FileCheck,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';

export default function BelajarGoodSkillPage() {
  const { courses, enrollCourse, completeLesson, passQuiz, xpPoints, business } = useApp();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(courses[0] || null);
  const [activeTab, setActiveTab] = useState<'katalog' | 'modul' | 'quiz' | 'sertifikat'>('katalog');
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);

  const handleEnroll = (c: Course) => {
    enrollCourse(c.id);
    setSelectedCourse({ ...c, enrolled: true, progress: 10 });
    setActiveTab('modul');
  };

  const handleCompleteLesson = (courseId: string, idx: number) => {
    completeLesson(courseId, idx);
    if (selectedCourse && selectedCourse.id === courseId) {
      const updatedCurriculum = [...selectedCourse.curriculum];
      updatedCurriculum[idx] = { ...updatedCurriculum[idx], completed: true };
      const completedCount = updatedCurriculum.filter((l) => l.completed).length;
      const progress = Math.round((completedCount / updatedCurriculum.length) * 100);
      setSelectedCourse({
        ...selectedCourse,
        curriculum: updatedCurriculum,
        progress,
      });
    }
  };

  const handleAnswerQuiz = () => {
    if (quizSelectedOption === null || !selectedCourse) return;
    const q = selectedCourse.quiz[0];
    if (quizSelectedOption === q.correctIndex) {
      setQuizFeedback('BENAR! Selamat, pemahaman Anda telah teruji dengan baik.');
      passQuiz(selectedCourse.id);
      setSelectedCourse({
        ...selectedCourse,
        progress: 100,
        certificateEarned: true,
      });
    } else {
      setQuizFeedback('Kurang tepat. Coba telaah kembali materi pada pelajaran sebelumnya.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-700 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-emerald-200 border border-white/20 mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>GOODSKILL LEARNING & CAPABILITY ENGINE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Akademi Kompetensi Bisnis UMKM
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl mt-1">
            Bangun kapabilitas nyata dalam manajemen kas, izin edar, sertifikasi halal, dan ekspansi pasar digital.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center">
          <div>
            <span className="text-[10px] text-emerald-200 uppercase font-bold tracking-wider block">
              XP Terkumpul
            </span>
            <div className="text-3xl font-black text-amber-300 leading-none my-0.5">
              {xpPoints} XP
            </div>
            <span className="text-[10px] text-emerald-300 font-bold">
              Level: {xpPoints > 500 ? 'Siap Naik Kelas' : 'Berkembang'}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-1">
        <button
          onClick={() => setActiveTab('katalog')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
            activeTab === 'katalog'
              ? 'bg-[#005BAC] text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Katalog Pelatihan
        </button>
        {selectedCourse && (
          <>
            <button
              onClick={() => setActiveTab('modul')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
                activeTab === 'modul'
                  ? 'bg-[#005BAC] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Materi: {selectedCourse.title.slice(0, 24)}...
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
                activeTab === 'quiz'
                  ? 'bg-[#005BAC] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Uji Kompetensi (Quiz)
            </button>
            {selectedCourse.certificateEarned && (
              <button
                onClick={() => setActiveTab('sertifikat')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
                  activeTab === 'sertifikat'
                    ? 'bg-amber-500 text-white'
                    : 'text-amber-700 bg-amber-50 hover:bg-amber-100'
                }`}
              >
                Sertifikat Kelulusan
              </button>
            )}
          </>
        )}
      </div>

      {/* Tab Content: Katalog */}
      {activeTab === 'katalog' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="h-40 bg-slate-100 relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-blue-900/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    {course.category}
                  </span>
                  <span className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {course.duration}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between text-[11px] text-gray-500 mb-2">
                    <span className="font-semibold text-blue-700">{course.level}</span>
                    <span className="font-bold text-amber-600">+{course.xpReward} XP</span>
                  </div>

                  <h3 className="text-sm font-bold text-gray-900 leading-snug mb-2">
                    {course.title}
                  </h3>

                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-4">
                    {course.description}
                  </p>

                  <div className="text-[11px] text-gray-500 border-t border-gray-100 pt-3">
                    Instruktur: <strong className="text-gray-800">{course.instructor}</strong>
                    <div className="text-[10px] text-gray-400">{course.instructorRole}</div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                {course.enrolled ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-gray-500">Progres Belajar</span>
                      <span className="font-bold text-[#005BAC]">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-[#005BAC] h-1.5 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <button
                      onClick={() => {
                        setSelectedCourse(course);
                        setActiveTab('modul');
                      }}
                      className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors"
                    >
                      {course.progress === 100 ? 'Review & Sertifikat' : 'Lanjutkan Belajar'}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleEnroll(course)}
                    className="w-full py-2.5 rounded-xl bg-[#005BAC] hover:bg-blue-700 text-white font-bold text-xs transition-colors"
                  >
                    Daftar Kelas (Gratis)
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content: Modul & Lesson Player */}
      {activeTab === 'modul' && selectedCourse && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-6">
            <div className="aspect-video bg-slate-900 rounded-xl flex flex-col items-center justify-center text-white p-8 text-center relative overflow-hidden">
              <PlayCircle className="w-16 h-16 text-blue-400 opacity-90 animate-pulse mb-3" />
              <h3 className="text-lg font-bold max-w-md">{selectedCourse.title}</h3>
              <p className="text-xs text-gray-300 mt-1">
                Video Materi & Studi Kasus Terapan UMKM Naik Kelas
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-gray-900">{selectedCourse.title}</h2>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                {selectedCourse.description}
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Luluskan seluruh kurikulum untuk mengikuti Uji Kompetensi.
              </span>
              <button
                onClick={() => setActiveTab('quiz')}
                className="px-4 py-2 bg-[#005BAC] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors flex items-center gap-1.5"
              >
                <span>Buka Uji Kompetensi</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Curriculum Checklist */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-bold text-gray-900">Daftar Materi Modul</h3>
              <span className="text-xs font-bold text-[#005BAC]">{selectedCourse.progress}% Tuntas</span>
            </div>

            <div className="space-y-2">
              {selectedCourse.curriculum.map((lesson, idx) => (
                <div
                  key={idx}
                  onClick={() => handleCompleteLesson(selectedCourse.id, idx)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    lesson.completed
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                      : 'bg-gray-50/80 border-gray-200/80 hover:bg-white text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {lesson.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-gray-400 shrink-0" />
                    )}
                    <span className="text-xs font-medium leading-tight">{lesson.title}</span>
                  </div>
                  <span className="text-[10px] text-gray-500 shrink-0">{lesson.duration}</span>
                </div>
              ))}
            </div>

            <div className="p-3 bg-blue-50 rounded-xl text-[11px] text-blue-900 leading-relaxed">
              💡 <strong>Tips:</strong> Klik materi untuk menandai telah selesai dipelajari dan menambah XP usaha Anda.
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Quiz */}
      {activeTab === 'quiz' && selectedCourse && (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              UJI KOMPETENSI MANDIRI
            </span>
            <h2 className="text-xl font-bold text-gray-900 mt-1">{selectedCourse.title}</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Jawab pertanyaan berikut dengan benar untuk menerbitkan sertifikat digital resmi.
            </p>
          </div>

          {selectedCourse.quiz.map((q, qIdx) => (
            <div key={qIdx} className="space-y-4">
              <p className="text-sm font-bold text-gray-900 leading-relaxed flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-[#005BAC] shrink-0 mt-0.5" />
                <span>{q.question}</span>
              </p>

              <div className="space-y-2.5">
                {q.options.map((opt, optIdx) => (
                  <label
                    key={optIdx}
                    onClick={() => {
                      setQuizSelectedOption(optIdx);
                      setQuizFeedback(null);
                    }}
                    className={`block p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                      quizSelectedOption === optIdx
                        ? 'border-[#005BAC] bg-blue-50/70 font-semibold text-blue-950'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="quiz-option"
                        checked={quizSelectedOption === optIdx}
                        onChange={() => setQuizSelectedOption(optIdx)}
                        className="text-[#005BAC] focus:ring-0"
                      />
                      <span>{opt}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ))}

          {quizFeedback && (
            <div
              className={`p-4 rounded-xl text-xs font-semibold ${
                quizFeedback.startsWith('BENAR')
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                  : 'bg-rose-50 text-rose-900 border border-rose-200'
              }`}
            >
              {quizFeedback}
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <button
              onClick={() => setActiveTab('modul')}
              className="px-4 py-2 border border-gray-300 text-gray-700 text-xs font-semibold rounded-xl hover:bg-gray-50 transition-colors"
            >
              Kembali ke Materi
            </button>

            <button
              onClick={handleAnswerQuiz}
              disabled={quizSelectedOption === null}
              className="px-5 py-2.5 bg-gradient-to-r from-[#005BAC] to-[#00AEEF] text-white text-xs font-bold rounded-xl hover:opacity-95 transition-opacity disabled:opacity-50 shadow-xs"
            >
              Kirim Jawaban & Terbitkan Sertifikat
            </button>
          </div>
        </div>
      )}

      {/* Tab Content: Sertifikat Kelulusan */}
      {activeTab === 'sertifikat' && selectedCourse && (
        <div className="max-w-3xl mx-auto bg-white rounded-3xl border-4 border-amber-300 p-8 sm:p-12 shadow-2xl space-y-6 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-full blur-2xl opacity-50 pointer-events-none" />

          <div className="flex items-center justify-center gap-2 text-amber-700 font-extrabold text-sm tracking-widest uppercase">
            <Award className="w-5 h-5 text-amber-500" />
            <span>SERTIFIKAT KOMPETENSI BISNIS UMKM</span>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Diberikan secara resmi kepada:</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 font-serif">
              {business.ownerName}
            </h2>
            <p className="text-xs font-semibold text-[#005BAC]">
              {business.businessName} • {business.city}
            </p>
          </div>

          <div className="max-w-xl mx-auto py-3 border-y border-gray-200 text-xs text-gray-700 leading-relaxed">
            Telah menyelesaikan seluruh rangkaian modul pelatihan terapan dan lulus uji kompetensi mandiri pada kelas:
            <div className="text-base font-bold text-gray-900 mt-1 font-sans">
              &quot;{selectedCourse.title}&quot;
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-4 text-xs text-gray-600">
            <div>
              <p className="font-bold text-gray-900">{selectedCourse.instructor}</p>
              <p className="text-[11px] text-gray-500">{selectedCourse.instructorRole}</p>
            </div>
            <div>
              <p className="font-bold text-[#005BAC]">Komunitas UMKM Naik Kelas</p>
              <p className="text-[11px] text-gray-500">Terverifikasi Digital ID: UNK-CERT-{selectedCourse.id}</p>
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={() => alert('Sertifikat digital telah siap dicetak atau disimpan sebagai berkas resmi portofolio usaha.')}
              className="px-6 py-2.5 bg-[#005BAC] text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-xs"
            >
              Unduh Berkas Sertifikat (PDF)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
