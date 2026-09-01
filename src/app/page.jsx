import { getGenres, getPopularMovies } from '@/lib/tmdb'
import Hero from '@/components/Hero'
import MoodMatcher from '@/components/MoodMatcher'
import FilterSidebar from '@/components/FilterSidebar'
import MovieGridInfinite from '@/components/MovieGridInfinite'

export default async function HomePage() {
  
  const [moviesData, genresData] = await Promise.all([getPopularMovies(1), getGenres()])
  const movies = moviesData.results
  const featured = movies[0]

  return (
    <div>
      <Hero movie={featured} />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-10">
          <MoodMatcher />
        </div>

        <h2 className="mb-4 text-xl font-semibold text-neutral-100">Popular Right Now</h2>

        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          <div className="lg:w-64 lg:shrink-0">
            <FilterSidebar genres={genresData.genres} />
          </div>

          
          <div className="min-w-0 flex-1">
            <MovieGridInfinite
              initialMovies={movies}
              initialPage={1}
              initialTotalPages={moviesData.total_pages}
              apiBase="/api/movies/popular"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
