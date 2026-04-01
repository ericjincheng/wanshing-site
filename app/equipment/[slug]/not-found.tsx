/**
 * Equipment detail 404 stub (outside [locale] subtree).
 * The locale-aware version lives at app/[locale]/equipment/[slug]/not-found.tsx.
 */
import Link from 'next/link'

export default function EquipmentNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <svg className="w-16 h-16 text-steel-300 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <h2 className="font-display text-2xl font-bold text-steel-900 mb-3">Equipment Not Found</h2>
        <p className="text-steel-500 mb-8">
          This unit may have been sold or removed from our inventory. Browse our current catalog to find similar equipment.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/equipment"
            className="btn-shine inline-flex items-center justify-center gap-2 bg-ws-red hover:bg-ws-red-light text-white font-display font-semibold px-6 py-3 rounded-lg transition-all"
          >
            Browse Full Catalog
          </Link>
          <Link
            href="/#quote"
            className="inline-flex items-center justify-center gap-2 bg-white text-steel-700 border border-steel-200 hover:bg-steel-50 font-display font-semibold px-6 py-3 rounded-lg transition-all"
          >
            Contact Sales
          </Link>
        </div>
      </div>
    </div>
  )
}
