'use client'

import { useCallback, useMemo, useState } from 'react'
import { useAppStore } from '@/store/StoreProvider'
import { RATING_BOUNDS, YEAR_BOUNDS } from '@/store/slices/filtersSlice'

export default function FilterSidebar({ genres }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const filters = useAppStore((s) => s.filters)
  const setGenres = useAppStore((s) => s.setGenres)
  const setRatingRange = useAppStore((s) => s.setRatingRange)
  const setYearRange = useAppStore((s) => s.setYearRange)
  const resetFilters = useAppStore((s) => s.resetFilters)

  const toggleGenre = useCallback(
    (id) => {
      const next = filters.genres.includes(id)
        ? filters.genres.filter((g) => g !== id)
        : [...filters.genres, id]
      setGenres(next)
    },
    [filters.genres, setGenres]
  )

  const activeCount = useMemo(() => {
    let count = filters.genres.length
    if (filters.minRating > RATING_BOUNDS.min || filters.maxRating < RATING_BOUNDS.max) count += 1
    if (filters.minYear > YEAR_BOUNDS.min || filters.maxYear < YEAR_BOUNDS.max) count += 1
    return count
  }, [filters])

  return (
    <aside className="h-max rounded-2xl border border-base-700 bg-base-800/60 p-5">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-neutral-300 lg:pointer-events-none lg:cursor-default"
        >
          Filters
          {activeCount > 0 && (
            <span className="rounded-full bg-accent-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
              {activeCount}
            </span>
          )}
          <span className="lg:hidden" aria-hidden="true">
            {mobileOpen ? '▲' : '▼'}
          </span>
        </button>
        {activeCount > 0 && (
          <button type="button" onClick={resetFilters} className="text-xs text-accent-400 hover:text-accent-300">
            Clear
          </button>
        )}
      </div>

      <div className={`${mobileOpen ? 'block' : 'hidden'} space-y-6 lg:block`}>
        {/* Genre - the "Category" facet */}
        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">Genre</h3>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => {
              const active = filters.genres.includes(genre.id)
              return (
                <button
                  key={genre.id}
                  type="button"
                  onClick={() => toggleGenre(genre.id)}
                  aria-pressed={active}
                  className={`rounded-full border px-3 py-1 text-xs transition ${
                    active
                      ? 'border-accent-500 bg-accent-500/20 text-accent-400'
                      : 'border-base-600 text-neutral-400 hover:border-neutral-500 hover:text-neutral-200'
                  }`}
                >
                  {genre.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Rating range - the "Price Range" equivalent for a movie catalog */}
        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Rating {filters.minRating.toFixed(1)}–{filters.maxRating.toFixed(1)}
          </h3>
          <label className="mb-1 block text-xs text-neutral-500" htmlFor="min-rating">
            Minimum
          </label>
          <input
            id="min-rating"
            type="range"
            min={RATING_BOUNDS.min}
            max={RATING_BOUNDS.max}
            step={0.5}
            value={filters.minRating}
            onChange={(e) => setRatingRange(Math.min(Number(e.target.value), filters.maxRating), filters.maxRating)}
            className="w-full accent-accent-500"
          />
          <label className="mb-1 mt-3 block text-xs text-neutral-500" htmlFor="max-rating">
            Maximum
          </label>
          <input
            id="max-rating"
            type="range"
            min={RATING_BOUNDS.min}
            max={RATING_BOUNDS.max}
            step={0.5}
            value={filters.maxRating}
            onChange={(e) => setRatingRange(filters.minRating, Math.max(Number(e.target.value), filters.minRating))}
            className="w-full accent-accent-500"
          />
        </div>

        {/* Release year range */}
        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Year {filters.minYear}–{filters.maxYear}
          </h3>
          <label className="mb-1 block text-xs text-neutral-500" htmlFor="min-year">
            From
          </label>
          <input
            id="min-year"
            type="range"
            min={YEAR_BOUNDS.min}
            max={YEAR_BOUNDS.max}
            step={1}
            value={filters.minYear}
            onChange={(e) => setYearRange(Math.min(Number(e.target.value), filters.maxYear), filters.maxYear)}
            className="w-full accent-accent-500"
          />
          <label className="mb-1 mt-3 block text-xs text-neutral-500" htmlFor="max-year">
            To
          </label>
          <input
            id="max-year"
            type="range"
            min={YEAR_BOUNDS.min}
            max={YEAR_BOUNDS.max}
            step={1}
            value={filters.maxYear}
            onChange={(e) => setYearRange(filters.minYear, Math.max(Number(e.target.value), filters.minYear))}
            className="w-full accent-accent-500"
          />
        </div>
      </div>
    </aside>
  )
}
