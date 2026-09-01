import { StoreProvider } from '@/store/StoreProvider'
import StoreHydration from '@/store/StoreHydration'
import Navbar from '@/components/Navbar'
import './globals.css'

export const metadata = {
  title: 'NETFLIX — Discover Movies',
  description: 'Browse popular movies, search thousands of titles, and get AI-powered picks based on your mood.',
  openGraph: {
    title: 'NETFLIX — Discover Movies',
    description: 'Browse popular movies, search thousands of titles, and get AI-powered picks based on your mood.',
    siteName: 'NETFLIX',
    type: 'website',
  },
}

const noFlashThemeScript = `
(function () {
  try {
    var stored = localStorage.getItem('netflix-theme');
    if (stored === 'light') document.documentElement.classList.add('light');
  } catch (e) {}
})();
`

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* eslint-disable-next-line react/no-danger */}
        <script dangerouslySetInnerHTML={{ __html: noFlashThemeScript }} />
      </head>
      <body className="bg-base-950 text-neutral-100">
        {/*
          StoreProvider is a Client Component, but {children} below it
          stays server-rendered - Next.js lets you pass Server Components
          as `children` into a Client Component without converting the
          whole subtree to client. That's how Home/Search/MovieDetails
          stay real Server Components despite the global store sitting
          above them in the tree.
        */}
        <StoreProvider>
          <StoreHydration />
          <Navbar />
          <main>{children}</main>
        </StoreProvider>
      </body>
    </html>
  )
}
