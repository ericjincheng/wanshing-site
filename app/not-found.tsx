/**
 * Global 404 fallback (outside the [locale] subtree).
 * Middleware redirects all known routes to /[locale]/..., so this
 * rarely fires. Kept as a safety net without translation hooks.
 */
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-steel-50 flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <div className="w-20 h-20 rounded-2xl bg-ws-red flex items-center justify-center mx-auto mb-6 shadow-lg shadow-ws-red/20">
          <span className="font-display font-bold text-white text-3xl">W</span>
        </div>
        <h1 className="font-display text-6xl font-bold text-steel-900 mb-2">404</h1>
        <h2 className="font-display text-xl font-semibold text-steel-700 mb-4">Page Not Found</h2>
        <p className="text-steel-500 mb-8">
          The page you&apos;re looking for has moved or doesn&apos;t exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="btn-shine inline-flex items-center justify-center gap-2 bg-ws-red hover:bg-ws-red-light text-white font-display font-semibold px-6 py-3 rounded-lg transition-all"
          >
            Go Home
          </Link>
          <Link
            href="/equipment"
            className="inline-flex items-center justify-center gap-2 bg-white text-steel-700 border border-steel-200 hover:bg-steel-50 font-display font-semibold px-6 py-3 rounded-lg transition-all"
          >
            Browse Equipment
          </Link>
        </div>
      </div>
    </div>
  )
}
