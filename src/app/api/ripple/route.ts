import { NextRequest, NextResponse } from 'next/server';
import { getRippleEffects } from '@/lib/gemini';
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
    const aiEffects = await getRippleEffects(
      { title: articleTitle, description: articleSummary || '' },
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

    // Fallback to mock ripple effects
    const mockRippleEffects = [
      {
        code: 'CN',
        countryName: 'China',
        impact_score: 85,
        impact_type: 'Supply Chain',
        summary: `Supply chains in China may experience disruption due to related decisions in ${countryName}.`,
        lat: COUNTRIES['CN']?.lat || 0,
        lng: COUNTRIES['CN']?.lng || 0
      },
      {
        code: 'DE',
        countryName: 'Germany',
        impact_score: 60,
        impact_type: 'Economic',
        summary: `Markets in Germany could react to the changing economic climate from this incident.`,
        lat: COUNTRIES['DE']?.lat || 0,
        lng: COUNTRIES['DE']?.lng || 0
      },
      {
        code: 'IN',
        countryName: 'India',
        impact_score: 45,
        impact_type: 'Diplomatic',
        summary: `Diplomatic channels in India are observing the development closely.`,
        lat: COUNTRIES['IN']?.lat || 0,
        lng: COUNTRIES['IN']?.lng || 0
      }
    ];

    return NextResponse.json({
      sourceCountry: country,
      affectedCountries: mockRippleEffects,
      aiPowered: false,
    });
  } catch (error) {
    console.error('Ripple API error:', error);
    return NextResponse.json({ error: 'Ripple analysis failed' }, { status: 500 });
  }
}
