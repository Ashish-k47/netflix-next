'use client'

import { useCallback, useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import SearchBar from './SearchBar'
import MovieGrid from './MovieGrid'
import EmptyState from './EmptyState'
import ErrorState from './ErrorState'
import SkeletonCard from './SkeletonCard'
import { useDebounce } from '@/hooks/useDebounce'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'

export default function SearchClient() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''

  const [inputValue, setInputValue] = useState(initialQuery)
  const debouncedQuery = useDebounce(inputValue, 500)

  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState(null)
  const [searched, setSearched] = useState(false)

  // Keep the URL shareable / back-button friendly without a full
  // navigation - router.replace() here doesn't re-run Server Components.
  useEffect(() => {
    const params = new URLSearchParams()
    if (debouncedQuery) params.set('q', debouncedQuery)
    const queryString = params.toString()
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery])

  const runSearch = useCallback(async (query, pageToLoad, { isInitial = false } = {}) => {
    isInitial ? setLoading(true) : setLoadingMore(true)
    setError(null)

    try {
      const res = await fetch(`/api/movies/search?q=${encodeURIComponent(query)}&page=${pageToLoad}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Search failed.')

      setMovies((prev) => {
        if (isInitial) return data.results
        const existingIds = new Set(prev.map((m) => m.id))
        const fresh = data.results.filter((m) => !existingIds.has(m.id))
        return [...prev, ...fresh]
      })
      setTotalPages(data.total_pages)
    } catch (err) {
      setError(err.message || 'Search failed.')
    } finally {
      isInitial ? setLoading(false) : setLoadingMore(false)
      setSearched(true)
    }
  }, [])

  // A new debounced query replaces the results and resets pagination.
  useEffect(() => {
    if (!debouncedQuery) {
      setMovies([])
      setPage(1)
      setTotalPages(null)
      setSearched(false)
      return
    }
    setPage(1)
    setTotalPages(null)
    runSearch(debouncedQuery, 1, { isInitial: true })
  }, [debouncedQuery, runSearch])

  const hasMore = totalPages === null ? false : page < totalPages

  const handleLoadMore = useCallback(() => {
    if (loading || loadingMore || !hasMore) return
    const nextPage = page + 1
    setPage(nextPage)
    runSearch(debouncedQuery, nextPage)
  }, [loading, loadingMore, hasMore, page, debouncedQuery, runSearch])

  const sentinelRef = useInfiniteScroll({
    hasMore,
    loading: loading || loadingMore,
    onLoadMore: handleLoadMore,
  })

  return (
    <div>
      <div className="mx-auto mb-10 max-w-xl">
        <SearchBar value={inputValue} onChange={setInputValue} autoFocus />
      </div>

      {loading && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {!loading && error && movies.length === 0 && (
        <ErrorState message={error} onRetry={() => runSearch(debouncedQuery, 1, { isInitial: true })} />
      )}

      {!loading && !error && searched && movies.length === 0 && (
        <EmptyState icon="🔍" title="No movies found" message="Try searching for another title." />
      )}

      {!loading && !searched && !debouncedQuery && (
        <EmptyState icon="🎬" title="Search for a movie" message="Start typing a title above to see results." />
      )}

      {!loading && movies.length > 0 && (
        <>
          <MovieGrid movies={movies} sentinelRef={sentinelRef} loadingMore={loadingMore} />
          {!hasMore && (
            <p className="mt-8 text-center text-sm text-neutral-500">You've reached the end of the results.</p>
          )}
        </>
      )}
    </div>
  )
}
