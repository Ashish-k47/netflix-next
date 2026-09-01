import { Suspense } from 'react'
import SearchClient from '@/components/SearchClient'
import SkeletonCard from '@/components/SkeletonCard'

export const metadata = {
  title: 'Search — NETFLIX',
  description: 'Search thousands of movies on NETFLIX.',
}

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-semibold text-neutral-100">Search</h1>
      {/*
        useSearchParams() inside SearchClient opts this segment into
        client-side rendering for that part of the tree, so Next.js
        requires a Suspense boundary here with a fallback UI.
      */}
      <Suspense fallback={<SearchFallback />}>
        <SearchClient />
      </Suspense>
    </div>
  )
}

function SearchFallback() {
  return (
    <div>
      <div className="mx-auto mb-10 max-w-xl">
        <div className="h-[52px] animate-pulse rounded-full bg-base-800" />
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  )
}
