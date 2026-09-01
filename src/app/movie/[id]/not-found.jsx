import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <span className="text-5xl" aria-hidden="true">
        🎞️
      </span>
      <h1 className="mt-4 text-2xl font-semibold text-neutral-100">Movie not found</h1>
      <p className="mt-2 text-neutral-400">We couldn&apos;t find a movie with that ID.</p>
      <Link href="/" className="mt-6 inline-block text-sm text-accent-400 hover:text-accent-300">
        ← Back to browsing
      </Link>
    </div>
  )
}
