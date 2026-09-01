import SkeletonCard from '@/components/SkeletonCard'

export default function Loading() {
  return (
    <div>
      <div className="h-[62vh] min-h-[420px] w-full animate-pulse bg-base-800 md:h-[72vh]" />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
