import Image from 'next/image'
import Link from 'next/link'
import { backdropUrl } from '@/lib/images'

export default function Hero({ movie }) {
  if (!movie) return null

  const backdrop = backdropUrl(movie.backdrop_path)
  const year = movie.release_date ? movie.release_date.slice(0, 4) : ''
  const rating = typeof movie.vote_average === 'number' ? movie.vote_average.toFixed(1) : 'N/A'

  return (
    <section className="relative flex h-[62vh] min-h-[420px] w-full items-end overflow-hidden md:h-[72vh]">
      {backdrop && (
        <Image src={backdrop} alt="" fill priority sizes="100vw" className="object-cover object-top" />
      )}
      <div className="absolute inset-0 bg-hero-fade" />
      <div className="absolute inset-0 hidden bg-hero-side md:block" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 md:pb-16 lg:px-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-400">Featured Movie</p>
        <h1 className="max-w-xl font-display text-4xl leading-none tracking-wide text-neutral-100 sm:text-5xl md:text-6xl">
          {movie.title}
        </h1>
        <div className="mt-3 flex items-center gap-3 text-sm text-neutral-200">
          <span className="flex items-center gap-1 font-semibold text-gold">★ {rating}</span>
          {year && <span>{year}</span>}
        </div>
        {movie.overview && (
          <p className="mt-4 max-w-lg text-sm text-neutral-300 line-clamp-3 md:text-base">{movie.overview}</p>
        )}
        <Link
          href={`/movie/${movie.id}`}
          className="ticket-cta mt-6 rounded-full bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400"
        >
          <span aria-hidden="true">▶</span>
          <span className="ticket-cta__divider" aria-hidden="true" />
          Explore Movie
        </Link>
      </div>
    </section>
  )
}
