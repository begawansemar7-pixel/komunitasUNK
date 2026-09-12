'use client';

import React from 'react';
import { GrowthScoreReport } from '@/lib/types';
import { CheckCircle2, AlertCircle, ArrowUpRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface Props {
  report: GrowthScoreReport;
  onExploreDimension?: (dimensionKey: string) => void;
}

export function GrowthScoreRadar({ report }: Props) {
  const dims = Object.values(report.dimensions);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs" id="growth-score-card">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-[#005BAC]">
              BUSINESS GROWTH SCORE
            </span>
            <span className="text-xs text-gray-500 font-medium">8 Dimensi Pertumbuhan</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-1">
            Indeks Kesiapan & Pertumbuhan Usaha
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Evaluasi berkala kapabilitas digital, legalitas, pasar, dan kompetensi manajerial UMKM.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-gradient-to-br from-blue-50 to-indigo-50/50 p-4 rounded-xl border border-blue-100">
          <div className="text-right">
            <div className="text-3xl font-extrabold text-[#005BAC] tracking-tight">
              {report.overallScore}
              <span className="text-base font-normal text-gray-500">/100</span>
            </div>
            <div className="text-xs font-bold text-emerald-600 flex items-center justify-end gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Level: {report.level}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of 8 Dimensions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {dims.map((dim) => {
          const isHigh = dim.score >= 75;
          const isMed = dim.score >= 60 && dim.score < 75;
          const barColor = isHigh ? 'bg-emerald-500' : isMed ? 'bg-blue-500' : 'bg-amber-500';
          const badgeBg = isHigh ? 'bg-emerald-50 text-emerald-700' : isMed ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700';

          return (
            <div
              key={dim.key}
              id={`dim-card-${dim.key}`}
              className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-blue-200 transition-all shadow-2xs group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-700 truncate pr-2">{dim.name}</span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0 ${badgeBg}`}>
                  {dim.score}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2.5 overflow-hidden">
                <div
                  className={`h-2 rounded-full transition-all duration-700 ${barColor}`}
                  style={{ width: `${Math.min(100, Math.max(5, dim.score))}%` }}
                />
              </div>

              <p className="text-[11px] text-gray-600 line-clamp-2 leading-relaxed min-h-[34px]">
                {dim.insight}
              </p>

              <div className="mt-2.5 pt-2 border-t border-gray-200/60 flex items-center justify-between text-[10px] text-gray-500">
                <span className="font-medium truncate max-w-[170px] text-blue-800">
                  {dim.actionableStep}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Actionable Next Steps / Explanation */}
      <div className="mt-6 pt-5 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-emerald-50/70 border border-emerald-100 p-4 rounded-xl">
          <h3 className="text-xs font-bold text-emerald-900 flex items-center gap-1.5 mb-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Kekuatan Utama Usaha Anda
          </h3>
          <ul className="space-y-1 text-xs text-emerald-800">
            {report.keyStrengths.map((str, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-emerald-500 font-bold">•</span>
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-amber-50/70 border border-amber-100 p-4 rounded-xl">
          <h3 className="text-xs font-bold text-amber-900 flex items-center gap-1.5 mb-2">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            Langkah Prioritas Menaikkan Skor
          </h3>
          <ul className="space-y-1 text-xs text-amber-800">
            {report.immediateActions.map((act, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-amber-500 font-bold">•</span>
                <span>{act}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 text-right">
            <Link
              href="/dashboard/ina"
              className="inline-flex items-center gap-1 text-xs font-bold text-amber-900 hover:text-amber-700 underline"
            >
              Konsultasikan Rencana Naik Kelas dengan INA AI
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
