'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/app-context';
import { CommunityPost } from '@/lib/types';
import {
  Users,
  MessageSquare,
  ThumbsUp,
  Share2,
  Bookmark,
  Send,
  PlusCircle,
  Tag,
  Filter,
  CheckCircle2,
  Calendar,
  Sparkles,
} from 'lucide-react';

const CATEGORIES: CommunityPost['category'][] = [
  'Tips Bisnis',
  'Informasi',
  'Digital Marketing',
  'Finansial',
  'Legal',
  'Halal',
  'Export',
  'Procurement',
  'Technology',
  'Success Story',
];

export default function KomunitasPage() {
  const { posts, addPost, toggleLikePost, business } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [isPosting, setIsPosting] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<CommunityPost['category']>('Tips Bisnis');
  const [newTags, setNewTags] = useState('');

  const filteredPosts = selectedCategory === 'Semua'
    ? posts
    : posts.filter((p) => p.category === selectedCategory);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const tagsArray = newTags
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    addPost(newTitle.trim(), newContent.trim(), newCategory, tagsArray.length ? tagsArray : ['UMKM']);
    setNewTitle('');
    setNewContent('');
    setNewTags('');
    setIsPosting(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-cyan-200 border border-white/20 mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>BUSINESS COMMUNITY & NETWORKING</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Forum Kolaborasi & Jejaring Bisnis
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 max-w-2xl mt-1">
            Bukan sekadar media sosial: berbagi studi kasus izin edar, tips efisiensi rantai pasok, dan peluang kemitraan B2B antar-UMKM.
          </p>
        </div>

        <button
          onClick={() => setIsPosting(!isPosting)}
          className="px-5 py-3 rounded-xl bg-amber-400 text-blue-950 font-bold text-xs hover:bg-amber-300 transition-all flex items-center gap-2 shrink-0 shadow-md"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Bagikan Wawasan Bisnis</span>
        </button>
      </div>

      {/* Posting Modal / Accordion */}
      {isPosting && (
        <form
          onSubmit={handleCreatePost}
          className="bg-white p-6 rounded-2xl border-2 border-blue-200 shadow-lg space-y-4 animate-in slide-in-from-top-4 duration-200"
        >
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="text-sm font-bold text-gray-900">Publikasikan Topik Diskusi Bisnis</h3>
            <span className="text-xs text-gray-500">Posting sebagai: <strong>{business.businessName}</strong></span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-700 mb-1">Judul Topik Diskusi</label>
              <input
                type="text"
                placeholder="Contoh: Cara Efektif Menghemat Biaya Kemasan Tanpa Menurunkan Kualitas"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#005BAC]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Kategori Bahasan</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#005BAC] bg-white"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Isi Pembahasan & Pembelajaran</label>
            <textarea
              rows={4}
              placeholder="Jelaskan kronologi, kendala yang dihadapi, solusi yang dilakukan, serta tips konkret bagi rekan UMKM lainnya..."
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#005BAC]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Tagar (Pisahkan koma)</label>
            <input
              type="text"
              placeholder="Packaging, Efisiensi, Kuliner, Ekspor"
              value={newTags}
              onChange={(e) => setNewTags(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#005BAC]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsPosting(false)}
              className="px-4 py-2 border border-gray-300 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#005BAC] hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Terbitkan ke Komunitas (+20 XP)
            </button>
          </div>
        </form>
      )}

      {/* Main Layout: Feeds on Left, Groups on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left 3 cols: Feeds */}
        <div className="lg:col-span-3 space-y-4">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
            <button
              onClick={() => setSelectedCategory('Semua')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                selectedCategory === 'Semua'
                  ? 'bg-[#005BAC] text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              Semua Topik
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#005BAC] text-white font-bold'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                id={`post-card-${post.id}`}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4 hover:border-blue-200 transition-all"
              >
                {/* Post Author info */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-[#005BAC] flex items-center justify-center font-bold text-sm">
                      {post.authorName.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-gray-900">{post.authorName}</h4>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 font-semibold">
                          {post.authorRole.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500">{post.authorBusiness}</p>
                    </div>
                  </div>

                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-[#005BAC]">
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-sm font-bold text-gray-900 leading-snug mb-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-line">
                    {post.content}
                  </p>
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {post.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleLikePost(post.id)}
                      className={`flex items-center gap-1.5 font-semibold transition-colors ${
                        post.isLiked ? 'text-blue-600' : 'hover:text-gray-900'
                      }`}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${post.isLiked ? 'fill-blue-600' : ''}`} />
                      <span>{post.likesCount} Bermanfaat</span>
                    </button>

                    <button className="flex items-center gap-1.5 hover:text-gray-900 font-medium">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{post.commentsCount} Tanggapan</span>
                    </button>
                  </div>

                  <div className="text-[11px] text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Right 1 col: Regional Groups & Agenda */}
        <div className="space-y-6">
          {/* Regional Groups */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-4 h-4 text-blue-600" />
              Grup Komunitas Sektor & Wilayah
            </h3>

            <div className="space-y-2.5 text-xs">
              {[
                { name: 'UMKM Kuliner Nusantara', members: '14.2K Anggota' },
                { name: 'KADIN Jawa Barat Ekosistem', members: '8.9K Anggota' },
                { name: 'Komunitas Fashion & Kriya Etnik', members: '6.4K Anggota' },
                { name: 'Inkubasi Export Readiness', members: '3.1K Anggota' },
                { name: 'UMKM Go Digital Bekasi', members: '4.8K Anggota' },
              ].map((grp, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl border border-gray-100 hover:bg-blue-50/50 hover:border-blue-200 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <h5 className="font-semibold text-gray-800 text-xs">{grp.name}</h5>
                    <p className="text-[10px] text-gray-500">{grp.members}</p>
                  </div>
                  <span className="text-[11px] text-[#005BAC] font-bold">Gabung</span>
                </div>
              ))}
            </div>
          </div>

          {/* Agenda & Webinar */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50/80 p-5 rounded-2xl border border-blue-200/80 space-y-3">
            <div className="flex items-center gap-2 text-[#005BAC] font-bold text-xs">
              <Calendar className="w-4 h-4" />
              <span>Agenda Webinar Mendatang</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-blue-100 space-y-1">
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Live Zoom • Gratis
              </span>
              <h4 className="text-xs font-bold text-gray-900 mt-1">
                Kupas Tuntas Standar Kemasan Ekspor Produk Pangan Olahan
              </h4>
              <p className="text-[11px] text-gray-500">Kamis, 18 September 2026 • 14:00 WIB</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
