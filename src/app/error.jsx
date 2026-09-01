'use client'

import ErrorState from '@/components/ErrorState'

export default function GlobalError({ error, reset }) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24">
      <ErrorState message={error?.message || 'Something went wrong loading this page.'} onRetry={reset} />
    </div>
  )
}
