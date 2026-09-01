import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getMovieDetails } from '@/lib/tmdb'
import { backdropUrl, posterUrl } from '@/lib/images'
import FavoriteButton from '@/components/FavoriteButton'


export async function generateMetadata({ params }) {
  const { id } = await params

  try {
    const movie = await getMovieDetails(id)
    const year = movie.release_date ? movie.release_date.slice(0, 4) : ''
    const description = movie.overview
      ? movie.overview.length > 155
        ? `${movie.overview.slice(0, 155)}…`
        : movie.overview
      : `Details, rating, and overview for ${movie.title} on NETFLIX.`
    const backdrop = backdropUrl(movie.backdrop_path)

    return {
      title: `${movie.title}${year ? ` (${year})` : ''} — NETFLIX`,
      description,
      openGraph: {
        title: movie.title,
        description,
        type: 'video.movie',
        images: backdrop ? [{ url: backdrop, width: 1280, height: 720, alt: movie.title }] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: movie.title,
        description,
        images: backdrop ? [backdrop] : [],
      },
    }
  } catch {
    // Metadata generation degrades gracefully - the page component below
    // is the single source of truth for 404 vs. real-error handling.
    return { title: 'Movie — NETFLIX' }
  }
}

export default async function MovieDetailsPage({ params }) {
  const { id } = await params

  let movie
  try {
    movie = await getMovieDetails(id)
  } catch (err) {
    
    if (err.status === 404) notFound()
    throw err
  }

  const year = movie.release_date ? movie.release_date.slice(0, 4) : '—'
  const rating = typeof movie.vote_average === 'number' ? movie.vote_average.toFixed(1) : 'N/A'
  const backdrop = backdropUrl(movie.backdrop_path)
  const poster = posterUrl(movie.poster_path, 'w500')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Movie',
    name: movie.title,
    description: movie.overview || undefined,
    datePublished: movie.release_date || undefined,
    image: backdrop || undefined,
    ...(movie.vote_average
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: movie.vote_average,
            bestRating: 10,
            ratingCount: movie.vote_count || undefined,
          },
        }
      : {}),
  }

  return (
    <div>
    
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="relative h-[40vh] min-h-[280px] w-full overflow-hidden">
        {backdrop && (
          <Image src={backdrop} alt="" fill priority sizes="100vw" className="object-cover object-top" />
        )}
        <div className="absolute inset-0 bg-hero-fade" />
      </div>

      <div className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="-mt-24 flex flex-col gap-6 sm:flex-row sm:items-end">
          <div className="relative aspect-[2/3] w-40 shrink-0 overflow-hidden rounded-xl border-4 border-base-950 shadow-xl sm:w-52">
            {poster ? (
              <Image
                src={poster}
                alt={`${movie.title} poster`}
                fill
                sizes="(min-width: 640px) 13rem, 10rem"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-base-800 text-4xl">🎞️</div>
            )}
          </div>

          <div className="flex-1 pb-2">
            <h1 className="font-display text-3xl tracking-wide text-neutral-100 sm:text-4xl">{movie.title}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-neutral-300">
              <span className="flex items-center gap-1 font-semibold text-gold">★ {rating}</span>
              <span>{year}</span>
              {movie.runtime ? <span>{movie.runtime} min</span> : null}
            </div>

            {movie.genres?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {movie.genres.map((g) => (
                  <span key={g.id} className="rounded-full border border-base-600 px-3 py-1 text-xs text-neutral-300">
                    {g.name}
                  </span>
                ))}
              </div>
            )}

            <FavoriteButton movie={movie} />
          </div>
        </div>

        {movie.overview && (
          <div className="mt-10">
            <h2 className="mb-2 text-lg font-semibold text-neutral-100">Overview</h2>
            <p className="max-w-3xl text-sm leading-relaxed text-neutral-300">{movie.overview}</p>
          </div>
        )}

        <Link href="/" className="mt-8 inline-block text-sm text-accent-400 hover:text-accent-300">
          ← Back to browsing
        </Link>
      </div>
    </div>
  )
}
