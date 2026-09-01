import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold text-neutral-100">Page not found</h1>
      <p className="mt-2 text-neutral-400">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className="mt-6 inline-block text-sm text-accent-400 hover:text-accent-300">
        ← Back home
      </Link>
    </div>
  )
}
