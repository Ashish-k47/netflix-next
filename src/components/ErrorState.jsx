'use client'

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
      <span className="text-5xl" aria-hidden="true">
        ⚠️
      </span>
      <h3 className="text-lg font-semibold text-neutral-100">Something went wrong</h3>
      <p className="max-w-sm text-sm text-neutral-400">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 rounded-full border border-base-600 px-5 py-2 text-sm font-medium text-neutral-100 transition hover:border-accent-500 hover:text-accent-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400"
        >
          Try again
        </button>
      )}
    </div>
  )
}
