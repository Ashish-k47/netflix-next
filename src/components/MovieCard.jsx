'use client'

import { memo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { posterUrl } from '@/lib/images'
import { useAppStore } from '@/store/StoreProvider'

function MovieCard({ movie }) {
  // Selecting a single boolean - not the whole favorites array - means
  // this card only re-renders when ITS OWN favorite status flips, not
  // whenever a different card anywhere else in the grid is toggled.
  // That's the concrete re-render win Zustand's selector model gives
  // over the old Context version, where every consumer re-rendered on
  // any favorites change.
  const favorited = useAppStore((s) => s.isFavorite(movie.id))
  const toggleFavorite = useAppStore((s) => s.toggleFavorite)
  const [imgError, setImgError] = useState(false)
  const year = movie.release_date ? movie.release_date.slice(0, 4) : '—'
  const rating = typeof movie.vote_average === 'number' ? movie.vote_average.toFixed(1) : 'N/A'
  const poster = posterUrl(movie.poster_path)

  const handleFavoriteClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
    toggleFavorite(movie)
  }

  return (
    <Link
      href={`/movie/${movie.id}`}
      className="group relative block overflow-hidden rounded-xl bg-base-800 shadow-lg shadow-black/30 transition-transform duration-200 ease-out hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-base-700">
        {poster && !imgError ? (
          <Image
            src={poster}
            alt={`${movie.title} poster`}
            fill
            sizes="(min-width: 1280px) 16vw, (min-width: 768px) 20vw, (min-width: 640px) 33vw, 50vw"
            onError={() => setImgError(true)}
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-4 text-center text-neutral-500">
            <span className="text-3xl" aria-hidden="true">
              🎞️
            </span>
            <span className="text-xs">{movie.title}</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

        <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-xs font-semibold text-gold backdrop-blur-sm">
          ★ {rating}
        </span>

        <button
          type="button"
          onClick={handleFavoriteClick}
          aria-label={favorited ? `Remove ${movie.title} from favorites` : `Add ${movie.title} to favorites`}
          aria-pressed={favorited}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-lg transition hover:bg-black/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400"
        >
          <span aria-hidden="true">{favorited ? '❤️' : '🤍'}</span>
        </button>

        <div className="absolute bottom-0 left-0 right-0 translate-y-2 px-3 pb-3 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="line-clamp-2 text-sm font-medium text-white">{movie.title}</p>
        </div>
      </div>

      <div className="p-2.5">
        <h3 className="truncate text-sm font-medium text-neutral-100">{movie.title}</h3>
        <p className="text-xs text-neutral-400">{year}</p>
      </div>
    </Link>
  )
}

export default memo(MovieCard)
