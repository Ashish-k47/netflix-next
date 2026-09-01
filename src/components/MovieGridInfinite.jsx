'use client'

import { useCallback, useMemo, useState } from 'react'
import { useAppStore } from '@/store/StoreProvider'
import MovieGrid from './MovieGrid'
import EmptyState from './EmptyState'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'

export default function MovieGridInfinite({ initialMovies, initialPage, initialTotalPages, apiBase }) {
  const [movies, setMovies] = useState(initialMovies)
  const [page, setPage] = useState(initialPage)
  const [totalPages, setTotalPages] = useState(initialTotalPages)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState(null)

  const filters = useAppStore((s) => s.filters)

  const hasMore = totalPages === null ? false : page < totalPages

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return
    const nextPage = page + 1
    setLoadingMore(true)
    setError(null)

    try {
      const res = await fetch(`${apiBase}?page=${nextPage}`)
      if (!res.ok) throw new Error('Failed to load more movies.')
      const data = await res.json()
      setMovies((prev) => {
        const existingIds = new Set(prev.map((m) => m.id))
        const fresh = data.results.filter((m) => !existingIds.has(m.id))
        return [...prev, ...fresh]
      })
      setPage(nextPage)
      setTotalPages(data.total_pages)
    } catch (err) {
      setError(err.message || 'Failed to load more movies.')
    } finally {
      setLoadingMore(false)
    }
  }, [loadingMore, hasMore, page, apiBase])

  const sentinelRef = useInfiniteScroll({ hasMore, loading: loadingMore, onLoadMore: loadMore })

  // Re-render mitigation: this array-filter pass only reruns when the
  // loaded movie list or the active filters actually change - not on
  // unrelated global-store updates elsewhere (a favorite toggling, the
  // theme switching), which matters once this list runs into the
  // hundreds of items via infinite scroll.
  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      if (filters.genres.length > 0) {
        const movieGenreIds = movie.genre_ids || []
        if (!filters.genres.some((id) => movieGenreIds.includes(id))) return false
      }
      if (typeof movie.vote_average === 'number') {
        if (movie.vote_average < filters.minRating || movie.vote_average > filters.maxRating) return false
      }
      if (movie.release_date) {
        const year = Number(movie.release_date.slice(0, 4))
        if (year < filters.minYear || year > filters.maxYear) return false
      }
      return true
    })
  }, [movies, filters])

  return (
    <>
      {filteredMovies.length === 0 ? (
        <EmptyState
          icon="🎬"
          title="No movies match these filters"
          message="Try widening your genre, rating, or year filters."
        />
      ) : (
        <MovieGrid movies={filteredMovies} sentinelRef={sentinelRef} loadingMore={loadingMore} />
      )}
      {!hasMore && movies.length > 0 && (
        <p className="mt-8 text-center text-sm text-neutral-500">You've reached the end of the list.</p>
      )}
      {error && <p className="mt-4 text-center text-sm text-accent-400">{error}</p>}
    </>
  )
}
