import { NextRequest, NextResponse } from 'next/server';
import { GrowthScoreEngine } from '@/modules/growth-score/engine';
import { z } from 'zod';

const ScoreRequestSchema = z.object({
  business: z.record(z.string(), z.any()),
  completedLessonsCount: z.number().optional(),
  quizzesPassedCount: z.number().optional(),
  communityPostsCount: z.number().optional(),
  communityCommentsCount: z.number().optional(),
  activeProductsCount: z.number().optional(),
  transactionsCount: z.number().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = ScoreRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Input evaluasi skor tidak valid', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const report = GrowthScoreEngine.evaluate(parsed.data);
    const explanation = GrowthScoreEngine.getExplanation(report);

    return NextResponse.json({
      report,
      explanation,
    });
  } catch (error) {
    console.error('API /api/growth-score error:', error);
    return NextResponse.json(
      { error: 'Gagal mengevaluasi skor pertumbuhan.' },
      { status: 500 }
    );
  }
}
