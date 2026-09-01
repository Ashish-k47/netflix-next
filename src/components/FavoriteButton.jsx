'use client'

import { useAppStore } from '@/store/StoreProvider'

export default function FavoriteButton({ movie }) {
  const favorited = useAppStore((s) => s.isFavorite(movie.id))
  const toggleFavorite = useAppStore((s) => s.toggleFavorite)

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(movie)}
      aria-pressed={favorited}
      className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400"
    >
      <span aria-hidden="true">{favorited ? '❤️' : '🤍'}</span>
      {favorited ? 'Remove from Favorites' : 'Add to Favorites'}
    </button>
  )
}
