import { NextRequest, NextResponse } from 'next/server';
import { analyzeArticles } from '@/lib/gemini';
import { getMockArticles } from '@/lib/mock-data';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { articleTitle, articleSummary, sourceCountry } = body;

    if (!articleTitle) {
      return NextResponse.json({ error: 'Missing articleTitle' }, { status: 400 });
    }

    // Try AI analysis
    const perspective = await analyzeArticles([
      { title: articleTitle, description: articleSummary || '', content: '', source: { name: sourceCountry || 'Unknown' } }
    ]);

    if (perspective && perspective.length > 0) {
      return NextResponse.json({ ...perspective[0], aiPowered: true });
    }

    // Fallback to mock
    const mock = getMockArticles(sourceCountry || 'Unknown');
    return NextResponse.json({ ...mock[0], aiPowered: false });
  } catch (error) {
    console.error('Counter-perspective API error:', error);
    return NextResponse.json({ error: 'Counter-perspective analysis failed' }, { status: 500 });
  }
}
