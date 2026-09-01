import { NextResponse } from 'next/server'
import { getPopularMovies } from '@/lib/tmdb'

export async function GET(request) {
  const page = Number(request.nextUrl.searchParams.get('page')) || 1

  try {
    const data = await getPopularMovies(page)
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Failed to load movies.' }, { status: 500 })
  }
}
