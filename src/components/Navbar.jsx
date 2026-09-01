'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')

  const isActive = (href, exact = false) => (exact ? pathname === href : pathname.startsWith(href))
  const linkClass = (href, exact = false) =>
    `text-sm font-medium transition-colors ${isActive(href, exact) ? 'text-neutral-100' : 'text-neutral-400 hover:text-neutral-100'}`

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    if (!query.trim()) return
    router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-base-800/80 bg-base-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-baseline gap-1 font-display text-2xl tracking-wide text-neutral-100">
          <span className="text-accent-500">NIGHT</span>REEL
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className={linkClass('/', true)}>
            Home
          </Link>
          <Link href="/favorites" className={linkClass('/favorites')}>
            Favorites
          </Link>
        </nav>

        <form onSubmit={handleSearchSubmit} className="hidden max-w-xs flex-1 md:flex">
          <div className="relative w-full">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" aria-hidden="true">
              🔍
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies…"
              aria-label="Search movies"
              className="w-full rounded-full border border-base-700 bg-base-900 py-2 pl-9 pr-3 text-sm text-neutral-100 placeholder:text-neutral-500 focus:border-accent-500 focus:outline-none"
            />
          </div>
        </form>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-md text-neutral-200"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span aria-hidden="true" className="text-2xl">
              {menuOpen ? '✕' : '☰'}
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-base-800 bg-base-950 px-4 py-4 md:hidden">
          <form onSubmit={handleSearchSubmit} className="mb-4">
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" aria-hidden="true">
                🔍
              </span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search movies…"
                aria-label="Search movies"
                className="w-full rounded-full border border-base-700 bg-base-900 py-2 pl-9 pr-3 text-sm text-neutral-100 placeholder:text-neutral-500 focus:border-accent-500 focus:outline-none"
              />
            </div>
          </form>
          <nav className="flex flex-col gap-3">
            <Link href="/" className={linkClass('/', true)} onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link href="/favorites" className={linkClass('/favorites')} onClick={() => setMenuOpen(false)}>
              Favorites
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
