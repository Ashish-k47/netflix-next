import { useCallback, useRef } from 'react'

export function useInfiniteScroll({ hasMore, loading, onLoadMore }) {
  const observerRef = useRef(null)

  const sentinelRef = useCallback(
    (node) => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }

      if (loading || !hasMore) return

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            onLoadMore()
          }
        },
        { rootMargin: '400px' }
      )

      if (node) observerRef.current.observe(node)
    },
    [loading, hasMore, onLoadMore]
  )

  return sentinelRef
}
