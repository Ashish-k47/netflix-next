'use client'

export default function EmptyState({ icon = '🎬', title, message, actionLabel, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
      <span className="text-5xl" aria-hidden="true">
        {icon}
      </span>
      <h3 className="text-lg font-semibold text-neutral-100">{title}</h3>
      {message && <p className="max-w-sm text-sm text-neutral-400">{message}</p>}
      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="mt-2 rounded-full bg-accent-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-accent-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
