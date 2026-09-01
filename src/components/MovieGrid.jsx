import MovieCard from './MovieCard'
import SkeletonCard from './SkeletonCard'

export default function MovieGrid({ movies, sentinelRef, loadingMore }) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
        {loadingMore &&
          Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={`skeleton-${i}`} />)}
      </div>
      {sentinelRef && <div ref={sentinelRef} className="h-1 w-full" aria-hidden="true" />}
    </>
  )
}
