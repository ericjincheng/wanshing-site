'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback, useTransition } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/lib/navigation'
import type { EquipmentListItem } from '@/types/equipment'
import { urlForImage } from '@/lib/sanity.image'

// ─── Display helpers ──────────────────────────────────────────────────────────
const STATUS_STYLES: Record<string, string> = {
  inStock:    'bg-green-500',
  newArrival: 'bg-blue-500',
  bestSeller: 'bg-ws-red',
  comingSoon: 'bg-steel-400',
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface ActiveFilters {
  category: string
  brand:    string
  capacity: string
}
interface Props {
  initialEquipment: EquipmentListItem[]
  activeFilters:    ActiveFilters
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function CatalogClient({ initialEquipment, activeFilters }: Props) {
  const t          = useTranslations()
  const router     = useRouter()
  const pathname   = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  // Build filter option lists from translations
  const CATEGORY_OPTIONS = [
    { value: '',               label: t('categories.all') },
    { value: 'forklift',       label: t('categories.forklift') },
    { value: 'reachTruck',     label: t('categories.reachTruck') },
    { value: 'palletJack',     label: t('categories.palletJack') },
    { value: 'scissorLift',    label: t('categories.scissorLift') },
    { value: 'boomLift',       label: t('categories.boomLift') },
    { value: 'electricStacker',label: t('categories.electricStacker') },
  ]

  const BRAND_OPTIONS = [
    { value: '',            label: t('brands.all') },
    { value: 'wsForklifts', label: t('brands.wsForklifts') },
    { value: 'zoomlion',    label: t('brands.zoomlion') },
    { value: 'jac',         label: t('brands.jac') },
    { value: 'toyota',      label: t('brands.toyota') },
    { value: 'mitsubishi',  label: t('brands.mitsubishi') },
    { value: 'komatsu',     label: t('brands.komatsu') },
  ]

  const CAPACITY_OPTIONS = [
    { value: '',          label: t('capacity.any') },
    { value: '0-3000',    label: t('capacity.upTo3000') },
    { value: '3000-5000', label: t('capacity.3000to5000') },
    { value: '5000-7000', label: t('capacity.5000to7000') },
    { value: '7000-11000',label: t('capacity.7000to11000') },
    { value: '11000+',    label: t('capacity.11000plus') },
  ]

  /** Push a new URL with the updated filter key/value; empty string removes the param */
  const applyFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`)
      })
    },
    [router, pathname, searchParams]
  )

  const clearAll = () => {
    startTransition(() => router.push(pathname))
  }

  const hasActiveFilters =
    activeFilters.category || activeFilters.brand || activeFilters.capacity

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
      <div className="flex flex-col lg:flex-row gap-10">

        {/* ── Sidebar Filters ─────────────────────────────────────────────── */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl border border-steel-200 p-6 sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-steel-900 text-sm uppercase tracking-wide">
                {t('catalog.filterBy')}
              </h2>
              {hasActiveFilters && (
                <button
                  onClick={clearAll}
                  className="text-xs text-ws-red hover:text-ws-red-dark font-semibold transition-colors"
                >
                  {t('catalog.clearAll')}
                </button>
              )}
            </div>

            <FilterGroup
              label={t('catalog.categoryFilter')}
              options={CATEGORY_OPTIONS}
              value={activeFilters.category}
              onChange={(v) => applyFilter('category', v)}
            />
            <FilterGroup
              label={t('catalog.brandFilter')}
              options={BRAND_OPTIONS}
              value={activeFilters.brand}
              onChange={(v) => applyFilter('brand', v)}
            />
            <FilterGroup
              label={t('catalog.capacityFilter')}
              options={CAPACITY_OPTIONS}
              value={activeFilters.capacity}
              onChange={(v) => applyFilter('capacity', v)}
              last
            />
          </div>
        </aside>

        {/* ── Results ─────────────────────────────────────────────────────── */}
        <div className="flex-1">
          {/* Result count + loading indicator */}
          <div className="flex items-center justify-between mb-6">
            <p className={`text-sm text-steel-500 transition-opacity ${isPending ? 'opacity-40' : 'opacity-100'}`}>
              {isPending
                ? t('catalog.filtering')
                : t('catalog.itemsFound', { count: initialEquipment.length })}
            </p>

            {/* Active filter chips */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2">
                {activeFilters.category && (
                  <FilterChip label={CATEGORY_OPTIONS.find(o => o.value === activeFilters.category)?.label ?? activeFilters.category} onRemove={() => applyFilter('category', '')} />
                )}
                {activeFilters.brand && (
                  <FilterChip label={BRAND_OPTIONS.find(o => o.value === activeFilters.brand)?.label ?? activeFilters.brand} onRemove={() => applyFilter('brand', '')} />
                )}
                {activeFilters.capacity && (
                  <FilterChip label={CAPACITY_OPTIONS.find(o => o.value === activeFilters.capacity)?.label ?? activeFilters.capacity} onRemove={() => applyFilter('capacity', '')} />
                )}
              </div>
            )}
          </div>

          {initialEquipment.length === 0 ? (
            <EmptyState onClear={clearAll} t={t} />
          ) : (
            <div className={`grid sm:grid-cols-2 xl:grid-cols-3 gap-6 transition-opacity duration-200 ${isPending ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
              {initialEquipment.map((item) => (
                <CatalogCard key={item._id} item={item} t={t} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Filter Group ─────────────────────────────────────────────────────────────
function FilterGroup({
  label,
  options,
  value,
  onChange,
  last = false,
}: {
  label:    string
  options:  { value: string; label: string }[]
  value:    string
  onChange: (v: string) => void
  last?:    boolean
}) {
  return (
    <div className={`${last ? '' : 'border-b border-steel-100 mb-5 pb-5'}`}>
      <p className="text-xs font-semibold text-steel-500 uppercase tracking-wide mb-3">{label}</p>
      <div className="space-y-1.5">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
              value === opt.value
                ? 'bg-ws-red-50 text-ws-red font-semibold border border-ws-red/20'
                : 'text-steel-600 hover:bg-steel-50 hover:text-steel-900'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Filter Chip ──────────────────────────────────────────────────────────────
function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-ws-red-50 text-ws-red text-xs font-semibold px-3 py-1.5 rounded-full border border-ws-red/20">
      {label}
      <button onClick={onRemove} className="hover:text-ws-red-dark transition-colors" aria-label={`Remove ${label} filter`}>
        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </span>
  )
}

// ─── Catalog Card ─────────────────────────────────────────────────────────────
function CatalogCard({ item, t }: { item: EquipmentListItem; t: any }) {
  const imageUrl = item.images?.[0]
    ? urlForImage(item.images[0]).width(600).height(450).url()
    : null

  return (
    <div className="product-card bg-white rounded-xl border border-steel-200 overflow-hidden group">
      <div className="relative aspect-[4/3] overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={item.title}
            fill
            className="card-img object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        ) : (
          <div className="card-img w-full h-full img-placeholder">
            <svg className="w-20 h-20 text-steel-300" viewBox="0 0 100 100">
              <rect x="20" y="30" width="40" height="50" rx="4" fill="currentColor" opacity="0.4"/>
              <rect x="10" y="65" width="30" height="5" rx="2" fill="currentColor" opacity="0.6"/>
              <circle cx="30" cy="85" r="8" fill="currentColor" opacity="0.3"/>
              <circle cx="55" cy="85" r="8" fill="currentColor" opacity="0.3"/>
            </svg>
          </div>
        )}
        {item.status && (
          <div className={`absolute top-3 left-3 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md ${STATUS_STYLES[item.status] ?? 'bg-steel-400'}`}>
            {t(`status.${item.status}`) ?? item.status}
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="text-[10px] font-semibold text-ws-red tracking-wider uppercase mb-1">
          {t(`brands.${item.brand}`, { fallback: item.brand })}
          {item.fuelType ? ` · ${t(`fuel.${item.fuelType}`, { fallback: item.fuelType })}` : ''}
        </div>
        <h3 className="font-display font-bold text-steel-900 text-base leading-snug">{item.title}</h3>

        {item.capacity && (
          <p className="mt-2 text-xs text-steel-500 font-medium">
            {t('catalog.capacityLabel', { value: item.capacity.toLocaleString() })}
          </p>
        )}

        {item.specs && item.specs.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {item.specs.slice(0, 3).map((spec, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-steel-500">
                <svg className="w-3.5 h-3.5 text-ws-red/60 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4"/>
                </svg>
                {spec}
              </li>
            ))}
          </ul>
        )}

        <Link
          href={`/equipment/${item.slug.current}`}
          className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-steel-50 hover:bg-ws-red text-steel-700 hover:text-white border border-steel-200 hover:border-ws-red font-semibold text-sm py-2.5 rounded-lg transition-all"
        >
          {t('catalog.viewDetails')}
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </Link>
      </div>
    </div>
  )
}

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyState({ onClear, t }: { onClear: () => void; t: any }) {
  return (
    <div className="text-center py-20 px-6">
      <svg className="w-16 h-16 text-steel-300 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>
      <h3 className="font-display font-bold text-steel-900 text-lg mb-2">{t('catalog.noEquipmentHeading')}</h3>
      <p className="text-steel-500 text-sm mb-6">{t('catalog.noEquipmentBody')}</p>
      <button
        onClick={onClear}
        className="inline-flex items-center gap-2 bg-ws-red hover:bg-ws-red-dark text-white font-display font-semibold text-sm px-5 py-2.5 rounded-lg transition"
      >
        {t('catalog.clearAllFilters')}
      </button>
    </div>
  )
}
