export interface GuardrailValidation {
  isSafe: boolean;
  reason?: string;
  sanitizedQuery: string;
}

export class AiGuardrails {
  static validateUserQuery(query: string): GuardrailValidation {
    const trimmed = query.trim();
    if (!trimmed) {
      return { isSafe: false, reason: 'Pertanyaan tidak boleh kosong.', sanitizedQuery: '' };
    }

    // Check for prompt injection attempts
    const forbiddenPatterns = [
      /ignore all previous instructions/i,
      /reveal system prompt/i,
      /dump database/i,
      /bocorkan data pengguna/i,
      /drop table/i,
    ];

    for (const pattern of forbiddenPatterns) {
      if (pattern.test(trimmed)) {
        return {
          isSafe: false,
          reason: 'Permintaan mengandung instruksi yang tidak diperkenankan demi keamanan sistem.',
          sanitizedQuery: '',
        };
      }
    }

    return {
      isSafe: true,
      sanitizedQuery: trimmed.slice(0, 1000), // Protect against excessive input lengths
    };
  }

  static filterPrivateData(text: string): string {
    // Redact accidental bank account or NIK numbers if detected
    return text.replace(/\b\d{16}\b/g, '[NOMOR TERSENSOR]');
  }
}
