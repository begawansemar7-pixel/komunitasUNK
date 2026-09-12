import { GoogleGenAI } from '@google/genai';
import { INA_SYSTEM_PROMPT, buildDiagnosisPrompt } from './prompts';
import { RagRetriever, KnowledgeItem } from './rag';
import { AiGuardrails } from './guardrails';

export interface AiRequestOptions {
  userQuery: string;
  businessContext?: any;
  provider?: string;
}

export interface AiResponse {
  answer: string;
  citedSources: KnowledgeItem[];
  providerUsed: string;
  disclaimer?: string;
}

export class AiProviderService {
  private static geminiClient: GoogleGenAI | null = null;

  private static getGeminiClient(): GoogleGenAI | null {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    if (!this.geminiClient) {
      this.geminiClient = new GoogleGenAI({ apiKey });
    }
    return this.geminiClient;
  }

  static async generateConsultation(options: AiRequestOptions): Promise<AiResponse> {
    const { userQuery, businessContext = {}, provider = process.env.AI_PROVIDER || 'gemini' } = options;

    // 1. Guardrail validation
    const validation = AiGuardrails.validateUserQuery(userQuery);
    if (!validation.isSafe) {
      return {
        answer: validation.reason || 'Pertanyaan tidak dapat diproses.',
        citedSources: [],
        providerUsed: 'guardrail',
      };
    }

    // 2. Knowledge retrieval (RAG)
    const retrievedDocs = RagRetriever.searchKnowledge(validation.sanitizedQuery);

    let ragContext = '';
    if (retrievedDocs.length > 0) {
      ragContext = `\n\nFAKTA REGULASI/SUMBER RUJUKAN RESMI:\n` +
        retrievedDocs.map((d, i) => `[${i + 1}] ${d.title}: ${d.summary} (Sumber: ${d.source})`).join('\n');
    }

    const fullPrompt = `${INA_SYSTEM_PROMPT}\n${buildDiagnosisPrompt(businessContext, validation.sanitizedQuery)}${ragContext}`;

    // 3. Try Gemini API first if configured
    const client = this.getGeminiClient();
    if (client) {
      try {
        const response = await client.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: fullPrompt,
        });

        if (response && response.text) {
          return {
            answer: AiGuardrails.filterPrivateData(response.text),
            citedSources: retrievedDocs,
            providerUsed: 'gemini-2.5-flash',
            disclaimer: 'Analisis disusun oleh INA AI Assistant berbasis data profil dan regulasi terkait.',
          };
        }
      } catch (err) {
        console.warn('Gemini API call failed, falling back to intelligent rule-based knowledge engine:', err);
      }
    }

    // 4. Intelligent grounded fallback (Rule-based expert system tailored for Indonesian UMKM)
    const fallbackAnswer = this.generateIntelligentFallback(validation.sanitizedQuery, businessContext, retrievedDocs);

    return {
      answer: fallbackAnswer,
      citedSources: retrievedDocs,
      providerUsed: 'ina-grounded-engine',
      disclaimer: 'Analisis berbasis Knowledge Base Resmi UMKM Naik Kelas & Diagnosis Profil Usaha.',
    };
  }

  private static generateIntelligentFallback(query: string, ctx: any, docs: KnowledgeItem[]): string {
    const q = query.toLowerCase();
    const name = ctx.businessName || 'Usaha Anda';
    const score = ctx.growthScore || 65;
    const cat = ctx.category || 'Bisnis Anda';

    let diagnosis = `Berdasarkan evaluasi profil **${name}** (Sektor: ${cat}, Skor Pertumbuhan saat ini: **${score}/100**):\n\n`;

    if (q.includes('halal') || q.includes('sertifikat')) {
      diagnosis += `### 1. Diagnosis Kebutuhan Sertifikasi
Usaha kuliner dan olahan pangan memiliki kewajiban sertifikasi halal sesuai regulasi BPJPH.
- **Status Saat Ini:** ${ctx.certification?.halal ? 'Sertifikat Halal telah tercatat aktif.' : 'Belum memiliki Sertifikat Halal aktif.'}
- **Peluang:** Fasilitas program **SEHATI (Sertifikasi Halal Gratis)** dari Kementerian Agama dibuka untuk pelaku usaha mikro & kecil skema self-declare.

### 2. Tiga Langkah Tindakan Konkret:
1. Pastikan Anda telah memiliki **Nomor Induk Berusaha (NIB)** melalui OSS.go.id.
2. Siapkan daftar bahan baku dan pastikan seluruh bahan memiliki rujukan halal/tidak berisiko kritis.
3. Ajukan permohonan SEHATI di menu **Peluang & Program** Komunitas UMKM Naik Kelas untuk didampingi oleh Pendamping PPH.

### 3. Rekomendasi di Ekosistem Platform:
- Ikuti modul GoodSkill: *"Panduan Praktis Sertifikasi Halal Mandiri"*
- Hubungi Pendamping Halal tersertifikasi di menu **Mentoring**.`;
    } else if (q.includes('modal') || q.includes('kur') || q.includes('dana') || q.includes('finansial')) {
      diagnosis += `### 1. Diagnosis Kesiapan Pembiayaan
Akses permodalan formal (seperti KUR Bank Himbara atau LPDB) mensyaratkan kelayakan usaha dan pemisahan keuangan pribadi dengan bisnis.
- **Indikator Kesiapan:** Skor Pertumbuhan Anda (${score}/100) ${score >= 70 ? 'sudah memenuhi profil kelayakan awal.' : 'perlu ditingkatkan pada kelengkapan pencatatan keuangan.'}

### 2. Tiga Langkah Tindakan Konkret:
1. Rekap buku kas atau catatan transaksi 3 bulan terakhir secara digital melalui INAMarket/POS.
2. Lengkapi legalitas dasar: KTP Pemilik, NIB OSS, dan NPWP Usaha.
3. Ajukan skema KUR Mikro (hingga Rp100 juta dengan subsidi bunga 6% per tahun).

### 3. Rekomendasi di Ekosistem Platform:
- Buka menu **Peluang Program** untuk melihat kurasi mitra pembiayaan resmi (KADIN & Bank Partner).
- Tuntaskan kelas GoodSkill: *"Manajemen Arus Kas & Keuangan UMKM"*.`;
    } else if (q.includes('ekspor') || q.includes('export') || q.includes('pasar global')) {
      diagnosis += `### 1. Diagnosis Kesiapan Ekspor
- **Kesiapan Usaha:** Kategori **${cat}** memiliki potensi ekspor tinggi jika memenuhi standardisasi mutu dan kapasitas pasokan rutin.
- **Kesiapan Saat Ini:** Status kesiapan Anda berada di level: **${ctx.exportReadiness || 'Potensi Ekspor'}**.

### 2. Tiga Langkah Tindakan Konkret:
1. Lakukan standarisasi kemasan: tambahkan informasi komposisi dan tanggal kedaluwarsa dwibahasa (Indonesia & Inggris).
2. Tentukan HS Code produk Anda untuk menghitung tarif bea cukai dan regulasi negara tujuan.
3. Daftarkan katalog produk Anda ke katalog ekspor B2B di INAMarket.

### 3. Rekomendasi di Ekosistem Platform:
- Ikuti seleksi **"Inkubasi UMKM Go Export KADIN Indonesia"** di menu Peluang.
- Diskusi bersama eksportir terkurasi di forum **Komunitas Export Readiness**.`;
    } else {
      diagnosis += `### 1. Diagnosis Pertumbuhan Bisnis
Profil usaha Anda telah memiliki fondasi yang baik dengan skor **${score}/100**. Untuk mempercepat fase **Naik Kelas**, fokus utama terletak pada akselerasi adopsi digital dan perluasan channel transaksi penjualan.

### 2. Tiga Langkah Tindakan Prioritas (Action Plan):
1. **Perkuat Etalase Produk:** Unggah minimal 3 produk unggulan di **INAMarket** dengan foto jernih dan harga grosir B2B.
2. **Legalitas:** Pastikan dokumen NIB Anda terunggah di profil agar terverifikasi otomatis oleh sistem.
3. **Peningkatan Skill:** Tingkatkan wawasan digital marketing melalui GoodSkill untuk mendorong konversi penjualan WhatsApp.

### 3. Rekomendasi Fitur di Platform:
- **GoodSkill:** Selesaikan kelas *"Marketing Digital Praktis & Optimasi Penjualan"*.
- **Mentoring:** Jadwalkan sesi 1-on-1 dengan Mentor Praktisi Bisnis di menu Mentoring.
- **Business Matching:** Buka menu Peluang untuk mencocokkan produk Anda dengan permintaan pembeli institusi.`;
    }

    if (docs.length > 0) {
      diagnosis += `\n\n*Rujukan Resmi Terverifikasi: ${docs.map((d) => d.title).join(', ')}*`;
    }

    return diagnosis;
  }
}
