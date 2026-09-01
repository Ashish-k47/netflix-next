import LoadingSpinner from '@/components/LoadingSpinner'

export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <LoadingSpinner label="Loading movie…" />
    </div>
  )
}
