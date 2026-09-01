const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = process.env.TMDB_API_KEY

async function tmdbFetch(endpoint, params = {}, fetchOptions = {}) {
  if (!API_KEY) {
    throw new Error('Missing TMDB API key. Add TMDB_API_KEY to your .env file.')
  }

  const url = new URL(`${BASE_URL}${endpoint}`)
  url.searchParams.set('api_key', API_KEY)
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value)
    }
  })

  const response = await fetch(url.toString(), fetchOptions)

  if (response.status === 429) {
    throw new Error('TMDB rate limit reached. Please wait a moment and try again.')
  }

  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    const error = new Error(body.status_message || `TMDB request failed (${response.status}).`)
    error.status = response.status
    throw error
  }

  return response.json()
}

/**
 * Popular movies change slowly.
 */
export function getPopularMovies(page = 1) {
  return tmdbFetch('/movie/popular', { page }, { next: { revalidate: 3600 } })
}

/**
 * Search results are per-query and shouldn't sit in the shared cache,
 * so every call goes to TMDB fresh.
 */
export function searchMovies(query, page = 1) {
  return tmdbFetch('/search/movie', { query, page, include_adult: false }, { cache: 'no-store' })
}

/**
 * A single movie's details are essentially static - cache for a day.
 */
export function getMovieDetails(id) {
  return tmdbFetch(`/movie/${id}`, {}, { next: { revalidate: 86400 } })
}

/**
 * The official genre list barely ever changes - cache it for a week.
 * Used to power the Genre facet in the sidebar filter.
 */
export function getGenres() {
  return tmdbFetch('/genre/movie/list', {}, { next: { revalidate: 604800 } })
}
