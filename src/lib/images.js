const IMAGE_BASE = 'https://image.tmdb.org/t/p'

export function posterUrl(path, size = 'w342') {
  return path ? `${IMAGE_BASE}/${size}${path}` : null
}

export function backdropUrl(path, size = 'original') {
  return path ? `${IMAGE_BASE}/${size}${path}` : null
}
