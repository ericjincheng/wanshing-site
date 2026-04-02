'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/lib/navigation'

/**
 * QuickSearch — Floating filter bar beneath the hero.
 * On submit, navigates to /equipment with the selected filters as URL search params.
 */
export default function QuickSearch() {
  const t           = useTranslations()
  const router      = useRouter()
  const categoryRef = useRef<HTMLSelectElement>(null)
  const brandRef    = useRef<HTMLSelectElement>(null)
  const capacityRef = useRef<HTMLSelectElement>(null)

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (categoryRef.current?.value) params.set('category', categoryRef.current.value)
    if (brandRef.current?.value)    params.set('brand',    brandRef.current.value)
    if (capacityRef.current?.value) params.set('capacity', capacityRef.current.value)

    const qs = params.toString()
    router.push(`/equipment${qs ? `?${qs}` : ''}`)
  }

  return (
    <section className="relative z-20 -mt-8">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-xl shadow-steel-900/5 border border-steel-200 p-6 lg:p-8">
          <div className="flex items-center gap-2 mb-5">
            <svg className="w-5 h-5 text-ws-red" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <h2 className="font-display font-semibold text-steel-800 text-sm tracking-wide uppercase">
              {t('quickSearch.title')}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Category */}
            <div>
              <label className="block text-xs font-medium text-steel-500 mb-1.5">{t('quickSearch.categoryLabel')}</label>
              <select
                ref={categoryRef}
                className="filter-select w-full bg-steel-50 border border-steel-200 rounded-lg px-4 py-3 text-sm text-steel-700 font-medium focus:outline-none focus:ring-2 focus:ring-ws-red/30 focus:border-ws-red transition"
              >
                <option value="">{t('categories.all')}</option>
                <option value="forklift">{t('categories.forklift')}</option>
                <option value="reachTruck">{t('categories.reachTruck')}</option>
                <option value="palletJack">{t('categories.palletJack')}</option>
                <option value="scissorLift">{t('categories.scissorLift')}</option>
                <option value="boomLift">{t('categories.boomLift')}</option>
                <option value="electricStacker">{t('categories.electricStacker')}</option>
              </select>
            </div>

            {/* Brand */}
            <div>
              <label className="block text-xs font-medium text-steel-500 mb-1.5">{t('quickSearch.brandLabel')}</label>
              <select
                ref={brandRef}
                className="filter-select w-full bg-steel-50 border border-steel-200 rounded-lg px-4 py-3 text-sm text-steel-700 font-medium focus:outline-none focus:ring-2 focus:ring-ws-red/30 focus:border-ws-red transition"
              >
                <option value="">{t('brands.all')}</option>
                <option value="wsForklifts">{t('brands.wsForklifts')}</option>
                <option value="zoomlion">{t('brands.zoomlion')}</option>
                <option value="jac">{t('brands.jac')}</option>
                <option value="toyota">{t('brands.toyota')}</option>
                <option value="mitsubishi">{t('brands.mitsubishi')}</option>
                <option value="komatsu">{t('brands.komatsu')}</option>
              </select>
            </div>

            {/* Capacity */}
            <div>
              <label className="block text-xs font-medium text-steel-500 mb-1.5">{t('quickSearch.capacityLabel')}</label>
              <select
                ref={capacityRef}
                className="filter-select w-full bg-steel-50 border border-steel-200 rounded-lg px-4 py-3 text-sm text-steel-700 font-medium focus:outline-none focus:ring-2 focus:ring-ws-red/30 focus:border-ws-red transition"
              >
                <option value="">{t('capacity.any')}</option>
                <option value="0-3000">{t('capacity.upTo3000')}</option>
                <option value="3000-5000">{t('capacity.3000to5000')}</option>
                <option value="5000-7000">{t('capacity.5000to7000')}</option>
                <option value="7000-11000">{t('capacity.7000to11000')}</option>
                <option value="11000+">{t('capacity.11000plus')}</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="w-full btn-shine bg-ws-red hover:bg-ws-red-light text-white font-display font-semibold text-sm px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                {t('quickSearch.searchBtn')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
