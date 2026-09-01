export default function LoadingSpinner({ label = 'Loading…' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10" role="status" aria-live="polite">
      <div className="h-9 w-9 animate-spin rounded-full border-2 border-base-600 border-t-accent-500" />
      <span className="text-sm text-neutral-400">{label}</span>
    </div>
  )
}
