import { NextResponse } from 'next/server'
import { searchMovies } from '@/lib/tmdb'

export async function GET(request) {
  const query = request.nextUrl.searchParams.get('q') || ''
  const page = Number(request.nextUrl.searchParams.get('page')) || 1

  if (!query.trim()) {
    return NextResponse.json({ results: [], total_pages: 0, page: 1 })
  }

  try {
    const data = await searchMovies(query, page)
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Search failed.' }, { status: 500 })
  }
}
