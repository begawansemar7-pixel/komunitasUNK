import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#0B1F33] text-gray-300 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-extrabold text-sm">
                UNK
              </div>
              <span className="font-extrabold text-white text-base tracking-tight">
                UMKM NAIK KELAS
              </span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              Business Growth Operating Platform untuk memberdayakan dan mengakselerasi UMKM Indonesia menuju kemandirian, digitalisasi, dan ekspansi pasar global.
            </p>
            <div className="text-[11px] text-gray-500 pt-1">
              Bersama Tumbuh, Bersama Naik Kelas.
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-bold text-white uppercase text-xs tracking-wider mb-3">7 Engine Platform</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Growth Cockpit</Link></li>
              <li><Link href="/dashboard/belajar" className="hover:text-white transition-colors">GoodSkill (Pelatihan & Sertifikasi)</Link></li>
              <li><Link href="/dashboard/market" className="hover:text-white transition-colors">INAMarket (Katalog & Transaksi B2B/B2C)</Link></li>
              <li><Link href="/dashboard/komunitas" className="hover:text-white transition-colors">Community Network</Link></li>
              <li><Link href="/dashboard/mentor" className="hover:text-white transition-colors">Pendampingan Mentoring</Link></li>
              <li><Link href="/dashboard/peluang" className="hover:text-white transition-colors">Business Matching & Program</Link></li>
              <li><Link href="/dashboard/ina" className="hover:text-white transition-colors">INA AI Business Assistant</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-bold text-white uppercase text-xs tracking-wider mb-3">Ekosistem & Kemitraan</h4>
            <ul className="space-y-2 text-gray-400">
              <li>KADIN Indonesia & KADIN Daerah</li>
              <li>Kementerian Koperasi dan UKM RI</li>
              <li>Badan Penyelenggara Jaminan Produk Halal (BPJPH)</li>
              <li>Kementerian Investasi / BKPM (OSS-RBA)</li>
              <li>Himpunan Bank Milik Negara (Himbara) & BSI</li>
              <li>Mitra Diaspora & Akselerator Ekspor Global</li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="font-bold text-white uppercase text-xs tracking-wider mb-3">Keamanan & Kepatuhan</h4>
            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Platform ini menerapkan perlindungan data ketat dengan PostgreSQL Row-Level Security (RLS) dan verifikasi identitas resmi.
              </p>
              <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Sistem Terisolasi & Terenkripsi
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <p>© {new Date().getFullYear()} Komunitas UMKM Naik Kelas. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex gap-4">
            <Link href="/dashboard/ina" className="hover:text-gray-300">Konsultasi INA AI</Link>
            <Link href="/dashboard/bisnis" className="hover:text-gray-300">Identitas Usaha</Link>
            <Link href="/admin" className="hover:text-gray-300">Portal Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
