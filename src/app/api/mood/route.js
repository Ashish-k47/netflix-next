import { NextResponse } from 'next/server'
import { getMovieFromMood } from '@/lib/gemini'

export async function POST(request) {
  const body = await request.json().catch(() => ({}))
  const mood = typeof body.mood === 'string' ? body.mood.trim() : ''

  if (!mood) {
    return NextResponse.json({ error: 'Please describe a mood first.' }, { status: 400 })
  }

  try {
    const title = await getMovieFromMood(mood)
    return NextResponse.json({ title })
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Gemini request failed.' }, { status: 500 })
  }
}
