import { calculateGrowthScore, CalculationInput } from './calculator';
import { GrowthScoreReport } from '@/lib/types';

export class GrowthScoreEngine {
  static evaluate(input: CalculationInput): GrowthScoreReport {
    return calculateGrowthScore(input);
  }

  static getExplanation(report: GrowthScoreReport): string {
    return `Skor Pertumbuhan Usaha Anda adalah ${report.overallScore}/100 dengan predikat "${report.level}". Skor ini dihitung transparan dari 8 dimensi strategis: Kelengkapan Profil (${report.dimensions.profile.score}), Adopsi Digital (${report.dimensions.digitalization.score}), GoodSkill (${report.dimensions.learning.score}), Legalitas & Sertifikasi (${report.dimensions.certification.score}), INAMarket (${report.dimensions.marketplace.score}), Keaktifan Komunitas (${report.dimensions.community.score}), Transaksi (${report.dimensions.transaction.score}), dan Kesiapan Usaha (${report.dimensions.readiness.score}).`;
  }
}
