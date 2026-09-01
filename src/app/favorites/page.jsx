'use client'

import { useRouter } from 'next/navigation'
import { useAppStore } from '@/store/StoreProvider'
import MovieCard from '@/components/MovieCard'
import EmptyState from '@/components/EmptyState'

export default function FavoritesPage() {
  const favorites = useAppStore((s) => s.favorites)
  const router = useRouter()

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-semibold text-neutral-100">My Favorites</h1>

      {favorites.length === 0 ? (
        <EmptyState
          icon="❤️"
          title="No favorites yet"
          message="Start exploring movies and save the ones you want to watch later."
          actionLabel="Explore Movies"
          onAction={() => router.push('/')}
        />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  )
}
