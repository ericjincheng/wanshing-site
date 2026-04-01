import Link from 'next/link'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import type { EquipmentListItem } from '@/types/equipment'
import { urlForImage } from '@/lib/sanity.image'

interface Props {
  equipment: EquipmentListItem[]
}

const STATUS_STYLES: Record<string, string> = {
  inStock:    'bg-green-500',
  newArrival: 'bg-blue-500',
  bestSeller: 'bg-ws-red',
  comingSoon: 'bg-steel-400',
}

// Category filter pills
const FILTER_PILL_VALUES = [
  { value: '' },
  { value: 'forklift' },
  { value: 'reachTruck' },
  { value: 'palletJack' },
  { value: 'scissorLift' },
  { value: 'boomLift' },
]

export default async function EquipmentGrid({ equipment }: Props) {
  const t = await getTranslations()

  // Map category values → translated label keys
  const categoryKeyMap: Record<string, string> = {
    '':             'equipmentGrid.allEquipment',
    forklift:       'categories.forklift',
    reachTruck:     'categories.reachTruck',
    palletJack:     'categories.palletJack',
    scissorLift:    'categories.scissorLift',
    boomLift:       'categories.boomLift',
  }

  return (
    <section className="py-20 lg:py-28" id="equipment">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-ws-red font-display font-semibold text-sm tracking-wider uppercase">
            {t('equipmentGrid.eyebrow')}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-steel-900 mt-2">
            {t('equipmentGrid.heading')}{' '}
            <span className="font-accent italic font-normal text-ws-red">{t('equipmentGrid.headingAccent')}</span>
          </h2>
          <p className="mt-4 text-steel-500 text-lg">{t('equipmentGrid.body')}</p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {FILTER_PILL_VALUES.map((pill, i) => (
            <Link
              key={pill.value || 'all'}
              href={pill.value ? `/equipment?category=${pill.value}` : '/equipment'}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                i === 0
                  ? 'bg-ws-red text-white font-semibold'
                  : 'bg-steel-100 text-steel-600 hover:bg-ws-red-50 hover:text-ws-red'
              }`}
            >
              {t(categoryKeyMap[pill.value] as any)}
            </Link>
          ))}
        </div>

        {/* Grid */}
        {equipment.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {equipment.map((item) => (
              <ProductCard key={item._id} item={item} t={t} />
            ))}
          </div>
        ) : (
          <PlaceholderGrid t={t} />
        )}

        <div className="text-center mt-10">
          <Link
            href="/equipment"
            className="inline-flex items-center gap-2 text-ws-red hover:text-ws-red-dark font-display font-semibold text-sm transition"
          >
            {t('equipmentGrid.viewInventory')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ item, t }: { item: EquipmentListItem; t: any }) {
  const imageUrl = item.images?.[0]
    ? urlForImage(item.images[0]).width(480).height(360).url()
    : null

  const brandKey = item.brand as string
  const fuelKey  = item.fuelType as string

  return (
    <div className="product-card bg-white rounded-xl border border-steel-200 overflow-hidden group">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={item.title}
            fill
            className="card-img object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="card-img w-full h-full img-placeholder">
            <svg className="w-20 h-20 text-steel-300" viewBox="0 0 100 100">
              <rect x="20" y="30" width="40" height="50" rx="4" fill="currentColor" opacity="0.4"/>
              <rect x="10" y="65" width="30" height="5"  rx="2" fill="currentColor" opacity="0.6"/>
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

      {/* Content */}
      <div className="p-5">
        <div className="text-[10px] font-semibold text-ws-red tracking-wider uppercase mb-1">
          {t(`brands.${brandKey}`, { fallback: brandKey })} · {t(`fuel.${fuelKey}`, { fallback: fuelKey })}
        </div>
        <h3 className="font-display font-bold text-steel-900 text-base">{item.title}</h3>

        {item.specs && item.specs.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {item.specs.slice(0, 3).map((spec, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-steel-500">
                <svg className="w-3.5 h-3.5 text-ws-red/60 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
          {t('equipmentGrid.inquireNow')}
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </Link>
      </div>
    </div>
  )
}

// ─── Placeholder Grid ─────────────────────────────────────────────────────────
function PlaceholderGrid({ t }: { t: any }) {
  const placeholders = [
    { brandKey: 'wsForklifts', fuelKey: 'lpg',      title: 'WS-5000 LPG Forklift',          specs: ['5,000 lb capacity', 'Wide-view mast, side-shift option', 'Kubota engine, low emissions'], statusKey: 'inStock' },
    { brandKey: 'wsForklifts', fuelKey: 'lpg',      title: 'WS-6000 LPG Forklift',          specs: ['6,000 lb capacity', 'Enhanced stability & engine power', 'Heavy-duty industrial use'],     statusKey: 'newArrival' },
    { brandKey: 'wsForklifts', fuelKey: 'electric', title: 'WS-5500E Electric Forklift',    specs: ['5,500 lb capacity', '80V Li-ion, rapid 2.3hr charge', 'Zero emissions, indoor-ready'],    statusKey: 'inStock' },
    { brandKey: 'zoomlion',    fuelKey: 'electric', title: '4,400 lb Electric Pallet Jack', specs: ['4,400 lb capacity', 'Ergonomic control handle', 'Compact warehouse-ready'],               statusKey: 'bestSeller' },
  ]

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {placeholders.map((item, i) => (
        <div key={i} className="product-card bg-white rounded-xl border border-steel-200 overflow-hidden group">
          <div className="relative aspect-[4/3] overflow-hidden">
            <div className="card-img w-full h-full img-placeholder">
              <svg className="w-20 h-20 text-steel-300" viewBox="0 0 100 100">
                <rect x="20" y="30" width="40" height="50" rx="4" fill="currentColor" opacity="0.4"/>
              </svg>
            </div>
            <div className={`absolute top-3 left-3 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md ${STATUS_STYLES[item.statusKey]}`}>
              {t(`status.${item.statusKey}`)}
            </div>
          </div>
          <div className="p-5">
            <div className="text-[10px] font-semibold text-ws-red tracking-wider uppercase mb-1">
              {t(`brands.${item.brandKey}`)} · {t(`fuel.${item.fuelKey}`)}
            </div>
            <h3 className="font-display font-bold text-steel-900 text-base">{item.title}</h3>
            <ul className="mt-3 space-y-1.5">
              {item.specs.map((spec, j) => (
                <li key={j} className="flex items-center gap-2 text-xs text-steel-500">
                  <svg className="w-3.5 h-3.5 text-ws-red/60 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4"/></svg>
                  {spec}
                </li>
              ))}
            </ul>
            <button className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-steel-50 hover:bg-ws-red text-steel-700 hover:text-white border border-steel-200 hover:border-ws-red font-semibold text-sm py-2.5 rounded-lg transition-all">
              {t('equipmentGrid.inquireNow')}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
