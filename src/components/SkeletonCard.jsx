export default function SkeletonCard() {
  return (
    <div className="animate-pulse" aria-hidden="true">
      <div className="aspect-[2/3] w-full rounded-xl bg-base-700" />
      <div className="mt-3 h-3.5 w-3/4 rounded bg-base-700" />
      <div className="mt-2 h-3 w-1/3 rounded bg-base-700" />
    </div>
  )
}
