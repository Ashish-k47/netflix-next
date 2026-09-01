import { createStore } from 'zustand/vanilla'
import { createFavoritesSlice } from './slices/favoritesSlice'
import { createFiltersSlice } from './slices/filtersSlice'
import { createThemeSlice } from './slices/themeSlice'

export function createAppStore() {
  return createStore((...a) => ({
    ...createFavoritesSlice(...a),
    ...createFiltersSlice(...a),
    ...createThemeSlice(...a),
  }))
}
