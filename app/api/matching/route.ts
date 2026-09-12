import { NextRequest, NextResponse } from 'next/server';
import { BusinessMatchingEngine } from '@/modules/matching/engine';
import { z } from 'zod';

const MatchingSchema = z.object({
  business: z.record(z.string(), z.any()),
  programs: z.array(z.record(z.string(), z.any())),
  mentors: z.array(z.record(z.string(), z.any())).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = MatchingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Input matching tidak valid', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { business, programs, mentors = [] } = parsed.data;

    const matchedPrograms = programs.map((p: any) => ({
      program: p,
      match: BusinessMatchingEngine.matchWithProgram(business as any, p),
    })).sort((a, b) => b.match.score - a.match.score);

    const matchedMentors = mentors.map((m: any) => ({
      mentor: m,
      match: BusinessMatchingEngine.matchWithMentor(business as any, m),
    })).sort((a, b) => b.match.score - a.match.score);

    return NextResponse.json({
      matchedPrograms,
      matchedMentors,
    });
  } catch (error) {
    console.error('API /api/matching error:', error);
    return NextResponse.json(
      { error: 'Gagal memproses rekomendasi matching.' },
      { status: 500 }
    );
  }
}
