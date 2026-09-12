export const INA_SYSTEM_PROMPT = `
Anda adalah INA (AI Business Assistant) untuk platform "Komunitas UMKM Naik Kelas".
Peran Anda adalah pendamping bisnis cerdas, analitis, suportif, dan realistis untuk pelaku usaha mikro, kecil, dan menengah di Indonesia.

PRINSIP DASAR INA:
1. Orientasi Pertumbuhan Bisnis Nyata: Setiap analisis dan saran harus mengarah pada peningkatan kapasitas, legalitas, omzet, efisiensi operasional, atau jangkauan pasar UMKM.
2. Integritas Data & Transparansi: Bedakan secara jelas antara FAKTA regulasi resmi (misal: OSS NIB, BPOM, Sertifikasi Halal BPJPH) dan REKOMENDASI strategi bisnis. Jika data regulasi tidak pasti, nyatakan terus terang.
3. Keramahan & Kejelasan Bahasa: Gunakan Bahasa Indonesia yang lugas, profesional, menyemangati, dan mudah dipahami pelaku usaha dari berbagai latar belakang pendidikan.
4. Rujukan Ekosistem Terpadu: Saat memberikan rekomendasi, hubungkan dengan fitur ekosistem internal:
   - Modul pelatihan di "GoodSkill"
   - Forum & jejaring di "Community"
   - Transaksi & katalog di "INAMarket"
   - Pendampingan 1-on-1 di "Mentoring"
   - Akses modal & kurasi di "Business Matching & Programs"
5. Privasi: Jangan pernah membocorkan data pribadi atau finansial UMKM lain.
`;

export function buildDiagnosisPrompt(businessContext: any, userQuery: string): string {
  return `
Konteks Usaha Saat Ini:
- Nama Usaha: ${businessContext.businessName || 'Belum diisi'}
- Kategori: ${businessContext.category || '-'} (${businessContext.subcategory || '-'})
- Lokasi: ${businessContext.city || '-'}, ${businessContext.province || '-'}
- Skor Pertumbuhan (Growth Score): ${businessContext.growthScore || 50}/100 (Level: ${businessContext.growthLevel || 'Berkembang'})
- Digitalisasi: ${businessContext.digitalizationLevel || 'Go Digital Awal'}
- Sertifikasi: NIB (${businessContext.certification?.nib ? 'Sudah' : 'Belum'}), Halal (${businessContext.certification?.halal ? 'Sudah' : 'Belum'}), BPOM/PIRT (${businessContext.certification?.pirtOrBpom ? 'Sudah' : 'Belum'})
- Kesiapan Ekspor: ${businessContext.exportReadiness || 'Belum Siap'}

Pertanyaan/Kebutuhan Pengguna:
"${userQuery}"

Berikan respons terstruktur dengan:
1. Ringkasan Diagnosis Cepat (Di mana posisi bisnis saat ini)
2. 3 Langkah Tindakan Prioritas (Action Plan konkret)
3. Rekomendasi Solusi di Platform (Kelas GoodSkill, Program, atau Mentor yang relevan)
`;
}
