'use client'

import { createContext, useContext, useRef } from 'react'
import { useStore } from 'zustand'
import { createAppStore } from './createAppStore'

/**
 * Why this isn't a plain `create()` singleton: Next.js's server process
 * is shared across requests. A module-level Zustand store created with
 * `create()` would be reused across different users' page loads on the
 * server, leaking one user's favorites/filters/theme into another's
 * response. `zustand/vanilla`'s `createStore` plus a per-mount instance
 * (via useRef, created once per component tree) avoids that entirely -
 * this is the pattern from Zustand's own Next.js guide.
 */
const AppStoreContext = createContext(null)

export function StoreProvider({ children }) {
  const storeRef = useRef(null)
  if (!storeRef.current) {
    storeRef.current = createAppStore()
  }

  return <AppStoreContext.Provider value={storeRef.current}>{children}</AppStoreContext.Provider>
}

export function useAppStore(selector) {
  const store = useContext(AppStoreContext)
  if (!store) {
    throw new Error('useAppStore must be used within StoreProvider')
  }
  return useStore(store, selector)
}
