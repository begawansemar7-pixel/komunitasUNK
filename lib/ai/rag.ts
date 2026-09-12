export interface KnowledgeItem {
  id: string;
  category: 'REGULATION' | 'HALAL' | 'FINANCING' | 'EXPORT' | 'DIGITAL_MARKETING' | 'PROGRAM';
  title: string;
  summary: string;
  source: string;
  keywords: string[];
}

export const INDONESIAN_UMKM_KNOWLEDGE_BASE: KnowledgeItem[] = [
  {
    id: 'kb-nib-oss',
    category: 'REGULATION',
    title: 'Nomor Induk Berusaha (NIB) Berbasis Risiko',
    summary: 'NIB wajib dimiliki oleh seluruh UMKM melalui portal OSS.go.id tanpa biaya (gratis). NIB berlaku sebagai identitas usaha, TDP, API, dan hak akses kepabeanan. UMKM berisiko rendah langsung terbit izin usahanya secara otomatis.',
    source: 'PP No. 5 Tahun 2021 tentang Penyelenggaraan Perizinan Berusaha Berbasis Risiko / Kementerian Investasi (BKPM)',
    keywords: ['nib', 'oss', 'izin usaha', 'legalitas', 'resiko rendah', 'daftar usaha'],
  },
  {
    id: 'kb-halal-sehati',
    category: 'HALAL',
    title: 'Sertifikasi Halal Gratis (SEHATI) Self-Declare BPJPH',
    summary: 'Kementerian Agama melalui BPJPH menyediakan kuota sertifikasi halal gratis skema self-declare bagi produk mikro kecil makanan-minuman yang menggunakan bahan berisiko rendah dan proses produksi telah dipastikan halal.',
    source: 'Badan Penyelenggara Jaminan Produk Halal (BPJPH) Kemenag RI',
    keywords: ['halal', 'sehati', 'bpjph', 'sertifikat halal', 'self declare', 'makanan', 'minuman'],
  },
  {
    id: 'kb-kur-pembiayaan',
    category: 'FINANCING',
    title: 'Kredit Usaha Rakyat (KUR) & Pembiayaan LPDB-KUMKM',
    summary: 'KUR Super Mikro (hingga Rp10 juta tanpa agunan tambahan) dan KUR Mikro (hingga Rp100 juta subsidi bunga 6% p.a.) disalurkan melalui bank Himbara (BRI, Mandiri, BNI) dan BSI bagi UMKM produktif yang telah berjalan minimal 6 bulan.',
    source: 'Kementerian Koordinator Bidang Perekonomian & Kementerian Koperasi dan UKM RI',
    keywords: ['kur', 'pinjaman', 'modal usaha', 'pembiayaan', 'lpdb', 'bank bri', 'bunga rendah', 'dana'],
  },
  {
    id: 'kb-ina-export',
    category: 'EXPORT',
    title: 'Inkubasi & Kurasi UMKM Siap Ekspor KADIN Indonesia',
    summary: 'Program pendampingan komprehensif bagi UMKM berorientasi ekspor: standarisasi sertifikasi internasional (HACCP/ISO), adaptasi kemasan berbahasa asing, penetapan HS Code, dan business matching dengan diaspora & buyer mancanegara.',
    source: 'KADIN Indonesia & Kemendag RI (Ditjen PEN)',
    keywords: ['ekspor', 'export', 'luar negeri', 'pasar global', 'buyer luar negeri', 'kadin', 'kemendag'],
  },
  {
    id: 'kb-goodskill-marketing',
    category: 'DIGITAL_MARKETING',
    title: 'Framework Digitalisasi Pemasaran UMKM Indonesia',
    summary: '3 Pilar Utama: 1) Visual Branding & Storytelling di Media Sosial, 2) Optimasi Katalog & Transaksi Digital di Marketplace (INAMarket/Shopee/Tokopedia), 3) Layanan Pelanggan responsif via WhatsApp Business terotomatisasi.',
    source: 'GoodSkill Playbook Komunitas UMKM Naik Kelas',
    keywords: ['marketing', 'pemasaran', 'digital', 'instagram', 'tiktok', 'whatsapp', 'jualan online', 'omzet'],
  },
];

export class RagRetriever {
  static searchKnowledge(query: string, maxResults: number = 3): KnowledgeItem[] {
    const qLower = query.toLowerCase();
    const queryWords = qLower.split(/\s+/).filter((w) => w.length > 2);

    const scored = INDONESIAN_UMKM_KNOWLEDGE_BASE.map((item) => {
      let score = 0;
      queryWords.forEach((word) => {
        if (item.keywords.some((k) => k.includes(word))) score += 3;
        if (item.title.toLowerCase().includes(word)) score += 4;
        if (item.summary.toLowerCase().includes(word)) score += 1;
      });
      return { item, score };
    });

    return scored
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, maxResults)
      .map((s) => s.item);
  }
}
