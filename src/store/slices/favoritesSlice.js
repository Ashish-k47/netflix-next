/**
 * Favorites, migrated out of React Context into a Zustand slice.
 **/
export const createFavoritesSlice = (set, get) => ({
  favorites: [],

  
  hydrateFavorites: (favorites) => set({ favorites }),

  // A standard "dispatch"-style action: components call this directly,
  // it never mutates state in place - it always returns a new object
  // for `set` to apply, the same immutability contract Redux enforces.
  toggleFavorite: (movie) =>
    set((state) => {
      const exists = state.favorites.some((m) => m.id === movie.id)
      if (exists) {
        return { favorites: state.favorites.filter((m) => m.id !== movie.id) }
      }
      // Only persist the fields the UI actually needs, not the whole
      // TMDB payload.
      const { id, title, poster_path, release_date, vote_average } = movie
      return { favorites: [...state.favorites, { id, title, poster_path, release_date, vote_average }] }
    }),

  isFavorite: (id) => get().favorites.some((m) => m.id === id),
})
