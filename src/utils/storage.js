const FAVORITES_KEY = 'movie_favorites'

export function getFavorites() {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(FAVORITES_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (err) {
    console.error('Failed to read favorites from storage', err)
    return []
  }
}

export function saveFavorites(favorites) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
  } catch (err) {
    console.error('Failed to save favorites to storage', err)
  }
}
