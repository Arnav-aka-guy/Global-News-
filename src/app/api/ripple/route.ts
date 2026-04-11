import { NextRequest, NextResponse } from 'next/server';
import { getTrendingInsights } from '@/lib/gemini';
import { getMockArticles } from '@/lib/mock-data';
import { COUNTRIES } from '@/data/countries';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { country, articleTitle, articleSummary } = body;

    if (!country || !articleTitle) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const countryName = COUNTRIES[country as keyof typeof COUNTRIES]?.name || country;

    // Try AI analysis
    const aiEffects = await getTrendingInsights(
      [{ title: articleTitle, description: articleSummary || '', source: { name: countryName } }],
      countryName
    );

    if (aiEffects.length > 0) {
      // Enrich with coordinates
      const enriched = aiEffects.map((e: any) => ({
        ...e,
        lat: COUNTRIES[e.code as keyof typeof COUNTRIES]?.lat || COUNTRIES[country as keyof typeof COUNTRIES]?.lat || 0,
        lng: COUNTRIES[e.code as keyof typeof COUNTRIES]?.lng || COUNTRIES[country as keyof typeof COUNTRIES]?.lng || 0,
      }));

      return NextResponse.json({
        sourceCountry: country,
        affectedCountries: enriched,
        aiPowered: true,
      });
    }

    // Fallback to mock
    const mock = getMockArticles(country);
    return NextResponse.json({
      sourceCountry: country,
      affectedCountries: mock,
      aiPowered: false,
    });
  } catch (error) {
    console.error('Ripple API error:', error);
    return NextResponse.json({ error: 'Ripple analysis failed' }, { status: 500 });
  }
}
