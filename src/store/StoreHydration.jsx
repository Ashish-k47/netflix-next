'use client'

import { useEffect, useState } from 'react'
import { useAppStore } from './StoreProvider'
import { getFavorites, saveFavorites } from '@/utils/storage'

const THEME_KEY = 'nightreel-theme'

export default function StoreHydration() {
  const favorites = useAppStore((s) => s.favorites)
  const hydrateFavorites = useAppStore((s) => s.hydrateFavorites)
  const theme = useAppStore((s) => s.theme)
  const setTheme = useAppStore((s) => s.setTheme)
  const [hydrated, setHydrated] = useState(false)

  // Runs once. The <html> class itself was already set correctly before
  // paint by the inline script in layout.jsx's <head> - this just brings
  // the store's React state in line with what's already on screen, and
  // pulls in the real favorites list.
  useEffect(() => {
    hydrateFavorites(getFavorites())
    try {
      const storedTheme = localStorage.getItem(THEME_KEY)
      if (storedTheme === 'light' || storedTheme === 'dark') setTheme(storedTheme)
    } catch {
      // localStorage unavailable (private browsing, etc.) - fall back to defaults
    }
    setHydrated(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Persist favorites on every change, but only once hydration has run -
  // otherwise this fires on mount with the initial empty array and wipes
  // out whatever was actually in storage, before hydrateFavorites' own
  // update has landed.
  useEffect(() => {
    if (!hydrated) return
    saveFavorites(favorites)
  }, [favorites, hydrated])

  // Same guard, same reason: a user-driven theme change (not the initial
  // mount) is what should update <html> and localStorage from here on.
  useEffect(() => {
    if (!hydrated) return
    document.documentElement.classList.toggle('light', theme === 'light')
    try {
      localStorage.setItem(THEME_KEY, theme)
    } catch {
      // ignore
    }
  }, [theme, hydrated])

  return null
}
