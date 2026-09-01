'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function MoodMatcher() {
  const [mood, setMood] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const trimmed = mood.trim()
    if (!trimmed || loading) return

    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/mood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood: trimmed }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Could not find a match.')

      // Reuses the exact same search flow as a manual search - no
      // separate movie-fetching path for AI-sourced results.
      router.push(`/search?q=${encodeURIComponent(data.title)}`)
    } catch (err) {
      setError(err.message || 'Could not find a match. Try rephrasing your mood.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto max-w-2xl rounded-2xl border border-base-700 bg-base-800/60 p-6 sm:p-8">
      <h2 className="flex items-center gap-2 text-lg font-semibold text-neutral-100">
        <span aria-hidden="true">🎭</span> Mood Matcher
      </h2>
      <p className="mt-1 text-sm text-neutral-400">What do you feel like watching?</p>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <label htmlFor="mood-input" className="sr-only">
          Describe your mood
        </label>
        <input
          id="mood-input"
          type="text"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="I want something funny and relaxing…"
          className="flex-1 rounded-full border border-base-600 bg-base-900 px-4 py-3 text-sm text-neutral-100 placeholder:text-neutral-500 focus:border-accent-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading || !mood.trim()}
          className="rounded-full bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'Thinking…' : 'Find My Movie'}
        </button>
      </form>

      {loading && (
        <p className="mt-3 text-xs text-neutral-500" role="status">
          Asking Gemini for a recommendation…
        </p>
      )}
      {error && (
        <p className="mt-3 text-xs text-accent-400" role="alert">
          {error}
        </p>
      )}
    </section>
  )
}
