import { BusinessProfile, ProgramOpportunity, Mentor } from '@/lib/types';

export interface MatchingResult {
  score: number; // 0-100 match percentage
  matchReasons: string[];
  recommendation: string;
}

export class BusinessMatchingEngine {
  static matchWithProgram(business: BusinessProfile, program: ProgramOpportunity): MatchingResult {
    let score = 50;
    const reasons: string[] = [];

    // Category match
    if (program.targetCategory === 'Semua Sektor' || program.targetCategory === business.category) {
      score += 25;
      reasons.push(`Kategori usaha Anda (${business.category}) selaras dengan target program.`);
    }

    // Halal requirement match
    if (program.type === 'Sertifikasi Halal') {
      if (!business.certification.halal) {
        score += 25;
        reasons.push('Program ini krusial untuk melengkapi sertifikasi Halal Anda yang belum aktif.');
      } else {
        score -= 20;
        reasons.push('Anda sudah memiliki sertifikasi Halal.');
      }
    }

    // Export readiness match
    if (program.type === 'Go Export') {
      if (business.exportReadiness === 'Potensi Ekspor' || business.exportReadiness === 'Siap Ekspor') {
        score += 25;
        reasons.push('Tingkat kesiapan ekspor bisnis Anda memenuhi kriteria kurasi awal.');
      } else {
        score += 10;
        reasons.push('Cocok sebagai sarana inkubasi kesiapan ekspor bertahap.');
      }
    }

    // Financing match
    if (program.type === 'Financing') {
      if (business.certification.nib) {
        score += 20;
        reasons.push('Kepemilikan NIB aktif mempermudah kelayakan pembiayaan usaha.');
      }
    }

    score = Math.min(99, Math.max(20, score));

    return {
      score,
      matchReasons: reasons,
      recommendation: score >= 75 ? 'Sangat Direkomendasikan untuk Mendaftar' : 'Dapat Dipertimbangkan',
    };
  }

  static matchWithMentor(business: BusinessProfile, mentor: Mentor): MatchingResult {
    let score = 60;
    const reasons: string[] = [];

    if (mentor.industry.includes(business.category)) {
      score += 25;
      reasons.push(`Mentor berpengalaman mendalam di industri ${business.category}.`);
    }

    if (business.growthScore < 70 && mentor.expertise.includes('Strategi Pertumbuhan')) {
      score += 15;
      reasons.push('Keahlian mentor dalam Scale-up & Diagnosis cocok untuk fase akselerasi bisnis Anda.');
    }

    score = Math.min(98, Math.max(30, score));

    return {
      score,
      matchReasons: reasons,
      recommendation: score >= 80 ? 'Mentor Ideal untuk Pertumbuhan' : 'Mentor Alternatif',
    };
  }
}
