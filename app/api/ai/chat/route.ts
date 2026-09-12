import { NextRequest, NextResponse } from 'next/server';
import { AiProviderService } from '@/lib/ai/provider';
import { z } from 'zod';

const RequestSchema = z.object({
  query: z.string().min(1, 'Query wajib diisi').max(1500),
  businessContext: z.record(z.string(), z.any()).optional(),
  provider: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = RequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Input tidak valid', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { query, businessContext, provider } = parsed.data;

    const result = await AiProviderService.generateConsultation({
      userQuery: query,
      businessContext: businessContext || {},
      provider,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('API /api/ai/chat error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan sistem saat memproses permintaan AI.' },
      { status: 500 }
    );
  }
}
