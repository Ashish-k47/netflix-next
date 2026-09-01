export const RATING_BOUNDS = { min: 0, max: 10 }
export const YEAR_BOUNDS = { min: 1950, max: new Date().getFullYear() }

const defaultFilters = {
  genres: [],
  minRating: RATING_BOUNDS.min,
  maxRating: RATING_BOUNDS.max,
  minYear: YEAR_BOUNDS.min,
  maxYear: YEAR_BOUNDS.max,
}

export const createFiltersSlice = (set) => ({
  filters: { ...defaultFilters },

  setGenres: (genres) => set((state) => ({ filters: { ...state.filters, genres } })),

  setRatingRange: (minRating, maxRating) =>
    set((state) => ({ filters: { ...state.filters, minRating, maxRating } })),

  setYearRange: (minYear, maxYear) =>
    set((state) => ({ filters: { ...state.filters, minYear, maxYear } })),

  resetFilters: () => set(() => ({ filters: { ...defaultFilters } })),
})
