'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/app-context';
import { RoleSwitcher } from './RoleSwitcher';
import { canAccessAdmin } from '@/modules/identity/rbac';
import {
  LayoutDashboard,
  Building2,
  GraduationCap,
  Users,
  ShoppingBag,
  UserCheck,
  Briefcase,
  Sparkles,
  ShieldAlert,
  Menu,
  X,
  Award,
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { currentRole, business, growthReport, xpPoints } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/dashboard', label: 'Cockpit', icon: LayoutDashboard },
    { href: '/dashboard/bisnis', label: 'Profil Bisnis', icon: Building2 },
    { href: '/dashboard/belajar', label: 'GoodSkill', icon: GraduationCap },
    { href: '/dashboard/komunitas', label: 'Komunitas', icon: Users },
    { href: '/dashboard/market', label: 'INAMarket', icon: ShoppingBag },
    { href: '/dashboard/mentor', label: 'Mentoring', icon: UserCheck },
    { href: '/dashboard/peluang', label: 'Peluang', icon: Briefcase },
    { href: '/dashboard/ina', label: 'INA AI', icon: Sparkles, highlight: true },
  ];

  const showAdmin = canAccessAdmin(currentRole);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200">
      {/* Top Banner / Status Bar */}
      <div className="bg-[#005BAC] text-white px-4 py-1 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium hidden sm:inline">Ekosistem UMKM Indonesia</span>
            <span className="opacity-75">• Terhubung dengan KADIN, Kementerian, & Mitra Pembiayaan</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1 bg-white/15 px-2 py-0.5 rounded font-semibold">
              <Award className="w-3.5 h-3.5 text-amber-300" />
              {xpPoints} XP ({growthReport.level})
            </span>
            <Link
              href="/dashboard"
              className="flex items-center gap-1 font-bold bg-amber-400 text-blue-950 px-2.5 py-0.5 rounded hover:bg-amber-300 transition-colors"
            >
              Skor: {growthReport.overallScore}/100
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#005BAC] to-[#00AEEF] flex items-center justify-center text-white font-extrabold text-lg shadow-sm">
                UNK
              </div>
              <div>
                <span className="block font-extrabold text-base tracking-tight text-[#005BAC] leading-none">
                  UMKM NAIK KELAS
                </span>
                <span className="block text-[10px] text-gray-500 font-medium tracking-wide">
                  Business Growth Platform
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    link.highlight
                      ? 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 font-bold'
                      : isActive
                      ? 'bg-blue-50 text-[#005BAC] font-bold'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 ${
                      link.highlight
                        ? 'text-amber-600'
                        : isActive
                        ? 'text-[#005BAC]'
                        : 'text-gray-400'
                    }`}
                  />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            {showAdmin && (
              <Link
                href="/admin"
                id="nav-link-admin"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  pathname === '/admin'
                    ? 'bg-purple-100 text-purple-900 font-bold'
                    : 'text-purple-700 bg-purple-50 hover:bg-purple-100'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5 text-purple-600" />
                <span>Admin</span>
              </Link>
            )}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <RoleSwitcher />

            <Link
              href="/dashboard/ina"
              id="btn-ask-ina-header"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#005BAC] to-[#00AEEF] text-white text-xs font-bold shadow-xs hover:opacity-95 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Tanya INA</span>
            </Link>

            {/* Mobile menu toggle button */}
            <button
              id="btn-toggle-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              aria-label="Buka Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
          <div className="p-2 mb-2 bg-blue-50/70 rounded-lg text-xs">
            <p className="font-bold text-[#005BAC]">{business.businessName}</p>
            <p className="text-[11px] text-gray-500">{business.category} • {business.city}</p>
          </div>
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive ? 'bg-blue-50 text-[#005BAC] font-bold' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#005BAC]' : 'text-gray-400'}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
          {showAdmin && (
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-purple-700 bg-purple-50"
            >
              <ShieldAlert className="w-4 h-4 text-purple-600" />
              <span>Admin & Regional Cockpit</span>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
