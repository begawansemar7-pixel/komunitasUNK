'use client';

import React from 'react';
import { useApp } from '@/lib/app-context';
import { UserRole } from '@/lib/types';
import { Shield, Check } from 'lucide-react';

const AVAILABLE_ROLES: { role: UserRole; label: string; desc: string }[] = [
  { role: 'UMKM_OWNER', label: 'UMKM Owner (Pelaku Usaha)', desc: 'Akses penuh profil bisnis, Cockpit, GoodSkill, dan INAMarket' },
  { role: 'KADIN_ADMIN', label: 'KADIN Pusat Admin', desc: 'Akses tata kelola program, ekosistem nasional, dan analitik' },
  { role: 'REGIONAL_ADMIN', label: 'Admin Daerah (Jawa Barat)', desc: 'Monitoring agregat UMKM provinsi/kabupaten dan kurasi lokal' },
  { role: 'COMMUNITY_ADMIN', label: 'Admin Komunitas Daerah', desc: 'Moderasi grup komunitas, postingan, dan event webinar' },
  { role: 'MENTOR', label: 'Mentor Terdaftar', desc: 'Menerima permintaan sesi pendampingan dan menyusun action plan' },
  { role: 'BUYER', label: 'Pembeli B2B / Korporasi', desc: 'Akses belanja katalog grosir INAMarket dan business matching' },
  { role: 'PLATFORM_SUPER_ADMIN', label: 'Super Administrator', desc: 'Akses penuh seluruh engine, log audit, dan konfigurasi platform' },
];

export function RoleSwitcher() {
  const { currentRole, setCurrentRole } = useApp();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative inline-block text-left" id="role-switcher-container">
      <button
        id="btn-role-selector"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-blue-200 bg-blue-50/80 text-blue-900 text-xs font-semibold hover:bg-blue-100 transition-colors shadow-xs"
        title="Ganti Mode Peran / Persona untuk Pengujian"
      >
        <Shield className="w-3.5 h-3.5 text-blue-600" />
        <span className="hidden sm:inline">Role:</span>
        <span className="font-bold text-blue-700">{currentRole.replace('_', ' ')}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-80 rounded-xl bg-white shadow-2xl border border-gray-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
            <div className="px-3.5 py-2 border-b border-gray-100">
              <p className="text-xs font-bold text-gray-900 uppercase tracking-wider">Simulasi Peran Pengguna (RBAC)</p>
              <p className="text-[11px] text-gray-500">Pilih role untuk menguji hak akses & tampilan setiap persona.</p>
            </div>
            <div className="max-h-80 overflow-y-auto py-1">
              {AVAILABLE_ROLES.map(({ role, label, desc }) => {
                const isActive = currentRole === role;
                return (
                  <button
                    key={role}
                    id={`btn-select-role-${role}`}
                    onClick={() => {
                      setCurrentRole(role);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 flex items-start justify-between hover:bg-gray-50 transition-colors ${
                      isActive ? 'bg-blue-50/70 text-blue-900 font-semibold' : 'text-gray-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-medium text-gray-900 flex items-center gap-1.5">
                        {label}
                        {isActive && <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.2 rounded font-bold">Aktif</span>}
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5 leading-tight">{desc}</p>
                    </div>
                    {isActive && <Check className="w-4 h-4 text-blue-600 shrink-0 ml-2 mt-0.5" />}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
