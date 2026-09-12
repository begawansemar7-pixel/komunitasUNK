import { BusinessProfile, GrowthScoreReport, GrowthScoreDimension, GrowthLevel } from '@/lib/types';

export interface CalculationInput {
  business: Partial<BusinessProfile>;
  completedLessonsCount?: number;
  quizzesPassedCount?: number;
  communityPostsCount?: number;
  communityCommentsCount?: number;
  activeProductsCount?: number;
  transactionsCount?: number;
  monthlyRevenue?: number;
  attendanceMentoringCount?: number;
}

export function calculateGrowthScore(input: CalculationInput): GrowthScoreReport {
  const b = input.business;

  // 1. PROFILE SCORE (Weight: 10%)
  let profileScore = 0;
  if (b.businessName) profileScore += 20;
  if (b.description && b.description.length > 20) profileScore += 20;
  if (b.category && b.subcategory) profileScore += 20;
  if (b.province && b.city && b.address) profileScore += 20;
  if (b.phone && b.whatsapp) profileScore += 10;
  if (b.website || b.instagram) profileScore += 10;
  profileScore = Math.min(100, profileScore);

  // 2. DIGITALIZATION SCORE (Weight: 15%)
  let digiScore = 20;
  if (b.digitalizationLevel === 'Go Digital Awal') digiScore = 50;
  if (b.digitalizationLevel === 'Go Digital Aktif') digiScore = 75;
  if (b.digitalizationLevel === 'Digital Native') digiScore = 95;
  if (b.marketplacePresence?.inaMarket) digiScore += 10;
  if (b.website) digiScore += 5;
  digiScore = Math.min(100, digiScore);

  // 3. LEARNING SCORE (GoodSkill) (Weight: 15%)
  const lessons = input.completedLessonsCount ?? 6;
  const quizzes = input.quizzesPassedCount ?? 3;
  let learningScore = Math.min(100, lessons * 10 + quizzes * 12);
  if (learningScore === 0) learningScore = 35; // Default baseline if active member

  // 4. CERTIFICATION SCORE (Weight: 15%)
  let certScore = 0;
  if (b.certification?.nib) certScore += 35;
  if (b.certification?.halal) certScore += 30;
  if (b.certification?.pirtOrBpom) certScore += 15;
  if (b.certification?.haki) certScore += 10;
  if (b.certification?.isoOrSni) certScore += 10;
  certScore = Math.min(100, certScore);

  // 5. MARKETPLACE SCORE (INAMarket) (Weight: 15%)
  let marketScore = 20;
  const products = input.activeProductsCount ?? 4;
  marketScore += Math.min(40, products * 10);
  if (b.marketplacePresence?.shopee || b.marketplacePresence?.tokopedia) marketScore += 20;
  if (b.marketplacePresence?.inaMarket) marketScore += 20;
  marketScore = Math.min(100, marketScore);

  // 6. COMMUNITY SCORE (Weight: 10%)
  const posts = input.communityPostsCount ?? 3;
  const comments = input.communityCommentsCount ?? 8;
  let commScore = Math.min(100, 30 + posts * 15 + comments * 5);

  // 7. TRANSACTION SCORE (Weight: 10%)
  const txs = input.transactionsCount ?? 14;
  let txScore = Math.min(100, 30 + txs * 4);

  // 8. BUSINESS READINESS SCORE (Weight: 10%)
  let readyScore = 40;
  if (b.employeesCount && b.employeesCount >= 3) readyScore += 20;
  if (b.foundedYear && (new Date().getFullYear() - b.foundedYear) >= 1) readyScore += 15;
  if (b.exportReadiness === 'Potensi Ekspor') readyScore += 15;
  if (b.exportReadiness === 'Siap Ekspor' || b.exportReadiness === 'Aktif Ekspor') readyScore += 25;
  readyScore = Math.min(100, readyScore);

  // Weighted total
  const overallScore = Math.round(
    profileScore * 0.10 +
    digiScore * 0.15 +
    learningScore * 0.15 +
    certScore * 0.15 +
    marketScore * 0.15 +
    commScore * 0.10 +
    txScore * 0.10 +
    readyScore * 0.10
  );

  let level: GrowthLevel = 'Pemula';
  if (overallScore >= 85) level = 'UMKM Unggul';
  else if (overallScore >= 75) level = 'Naik Kelas';
  else if (overallScore >= 60) level = 'Siap Naik Kelas';
  else if (overallScore >= 40) level = 'Berkembang';

  const makeDim = (
    key: string,
    name: string,
    score: number,
    weight: number,
    insight: string,
    action: string
  ): GrowthScoreDimension => {
    let status: GrowthScoreDimension['status'] = 'Cukup';
    if (score >= 80) status = 'Unggul';
    else if (score >= 65) status = 'Baik';
    else if (score < 50) status = 'Perlu Ditingkatkan';

    return { key, name, score, weight, status, insight, actionableStep: action };
  };

  const dimensions = {
    profile: makeDim(
      'profile',
      'Kelengkapan Profil',
      profileScore,
      10,
      profileScore >= 80 ? 'Profil bisnis Anda sangat detail dan terverifikasi.' : 'Lengkapi kontak WhatsApp, Instagram, dan foto katalog.',
      'Perbarui galeri produk dan tautan sosial media resmi.'
    ),
    digitalization: makeDim(
      'digitalization',
      'Adopsi Digital',
      digiScore,
      15,
      digiScore >= 70 ? 'Operasional telah mengadopsi pencatatan & channel digital.' : 'Tingkatkan adopsi POS digital dan marketplace.',
      'Gunakan sistem kasir digital dan buat etalase online di INAMarket.'
    ),
    learning: makeDim(
      'learning',
      'GoodSkill & Sertifikasi',
      learningScore,
      15,
      learningScore >= 75 ? 'Rutin menyelesaikan modul pelatihan bisnis.' : 'Tingkatkan kompetensi manajerial melalui kelas gratis GoodSkill.',
      'Selesaikan modul "Marketing Digital Praktis" untuk menambah +12 XP.'
    ),
    certification: makeDim(
      'certification',
      'Legalitas & Sertifikasi',
      certScore,
      15,
      certScore >= 60 ? 'Memiliki NIB dan dalam proses sertifikasi halal.' : 'Legalitas formal menjadi syarat utama akses pembiayaan & ekspor.',
      'Daftar Program Fasilitasi Sertifikasi Halal Gratis (SEHATI).'
    ),
    marketplace: makeDim(
      'marketplace',
      'Katalog & Pasar (INAMarket)',
      marketScore,
      15,
      marketScore >= 70 ? 'Etalase produk aktif dan siap transaksi B2B/B2C.' : 'Katalog online masih minim varian dan deskripsi spesifikasi.',
      'Tambahkan minimal 3 produk unggulan dengan foto beresolusi tinggi.'
    ),
    community: makeDim(
      'community',
      'Keaktifan Komunitas',
      commScore,
      10,
      commScore >= 70 ? 'Aktif berjejaring dan berbagi wawasan bisnis dengan sesama UMKM.' : 'Manfaatkan grup diskusi untuk menemukan calon mitra.',
      'Beri ulasan atau komentar solutif pada diskusi seputar izin edar.'
    ),
    transaction: makeDim(
      'transaction',
      'Aktivitas Transaksi',
      txScore,
      10,
      txScore >= 70 ? 'Riwayat transaksi konsisten setiap bulan.' : 'Volume pesanan digital masih dapat dioptimalkan.',
      'Aktifkan penawaran promo paket bundling di INAMarket.'
    ),
    readiness: makeDim(
      'readiness',
      'Kesiapan Usaha (Scale-Up)',
      readyScore,
      10,
      readyScore >= 75 ? 'Struktur tim dan kapasitas produksi siap menerima order skala menengah.' : 'Perlu SOP operasional dan manajemen keuangan terpisah.',
      'Ikuti Business Matching KADIN untuk perluasan rantai pasok.'
    ),
  };

  const keyStrengths: string[] = [];
  const immediateActions: string[] = [];

  Object.values(dimensions).forEach((dim) => {
    if (dim.score >= 75) {
      keyStrengths.push(dim.name + ': ' + dim.insight);
    } else if (dim.score <= 65) {
      immediateActions.push(dim.actionableStep);
    }
  });

  return {
    overallScore,
    level,
    dimensions,
    keyStrengths: keyStrengths.slice(0, 3),
    immediateActions: immediateActions.slice(0, 4),
    calculatedAt: new Date().toISOString(),
  };
}
