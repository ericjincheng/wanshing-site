export const revalidate = 3600 // ISR: rebuild at most every hour

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { getEquipmentBySlug, getAllEquipmentSlugs } from '@/lib/sanity.queries'
import { urlForImage } from '@/lib/sanity.image'
import { locales } from '@/i18n/config'
import QuoteSection from '@/components/sections/QuoteSection'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import TopBar from '@/components/layout/TopBar'

interface Props {
  params: { locale: string; slug: string }
}

// Pre-generate static pages for all equipment × all locales at build time
export async function generateStaticParams() {
  try {
    const slugs = await getAllEquipmentSlugs()
    return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })))
  } catch {
    // Sanity unreachable at build time — pages will be generated on first request
    return []
  }
}

// Dynamic SEO metadata per product
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = await getEquipmentBySlug(params.slug)
  if (!item) return {}

  return {
    title: item.title,
    description:
      item.description ??
      `${item.title} — available at WanShing Machinery. Request a quote today.`,
    openGraph: {
      title: item.title,
      images: item.images?.[0]
        ? [{ url: urlForImage(item.images[0]).width(1200).height(630).url() }]
        : [],
    },
  }
}

// Status badge colour map
const STATUS_STYLES: Record<string, string> = {
  inStock:    'bg-green-500 text-white',
  newArrival: 'bg-blue-500 text-white',
  bestSeller: 'bg-ws-red text-white',
  comingSoon: 'bg-steel-400 text-white',
}

export default async function EquipmentDetailPage({ params }: Props) {
  const [item, t, tStatus] = await Promise.all([
    getEquipmentBySlug(params.slug),
    getTranslations('detail'),
    getTranslations('status'),
  ])

  if (!item) notFound()

  return (
    <>
      <TopBar />
      <Header />
      <main className="bg-steel-50 min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-steel-200">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-2 text-sm text-steel-500">
            <a href={`/${params.locale}`} className="hover:text-ws-red transition-colors">{t('home')}</a>
            <span>/</span>
            <a href={`/${params.locale}/equipment`} className="hover:text-ws-red transition-colors">{t('equipment')}</a>
            <span>/</span>
            <span className="text-steel-800 font-medium">{item.title}</span>
          </div>
        </div>

        {/* Product Detail */}
        <section className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-steel-200">
                {item.images?.[0] ? (
                  <Image
                    src={urlForImage(item.images[0]).width(800).height(600).url()}
                    alt={item.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="img-placeholder w-full h-full">
                    <svg className="w-24 h-24 text-steel-300" viewBox="0 0 100 100">
                      <rect x="20" y="30" width="40" height="50" rx="4" fill="currentColor" opacity="0.4"/>
                    </svg>
                  </div>
                )}
                {item.status && (
                  <div className={`absolute top-4 left-4 text-[11px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-lg ${STATUS_STYLES[item.status] ?? 'bg-steel-400 text-white'}`}>
                    {tStatus(item.status as any) ?? item.status}
                  </div>
                )}
              </div>

              {/* Thumbnail Strip */}
              {item.images && item.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {item.images.slice(1, 5).map((img: any, i: number) => (
                    <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-steel-200 cursor-pointer hover:ring-2 hover:ring-ws-red transition">
                      <Image
                        src={urlForImage(img).width(200).height(200).url()}
                        alt={`${item.title} image ${i + 2}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <div className="text-[11px] font-semibold text-ws-red tracking-wider uppercase mb-2">
                {item.brand} · {item.fuelType}
              </div>
              <h1 className="font-display text-3xl lg:text-4xl font-bold text-steel-900 leading-tight">
                {item.title}
              </h1>

              {item.capacity && (
                <div className="mt-4 inline-flex items-center gap-2 bg-steel-100 rounded-lg px-4 py-2 text-sm font-semibold text-steel-700">
                  <svg className="w-4 h-4 text-ws-red" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
                  {t('capacityBadge', { value: item.capacity.toLocaleString() })}
                </div>
              )}

              {item.description && (
                <p className="mt-6 text-steel-600 text-base leading-relaxed">
                  {item.description}
                </p>
              )}

              {/* Spec List */}
              {item.specs && item.specs.length > 0 && (
                <div className="mt-8">
                  <h2 className="font-display font-semibold text-steel-900 text-sm uppercase tracking-wide mb-4">
                    {t('specifications')}
                  </h2>
                  <ul className="space-y-2.5">
                    {item.specs.map((spec: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-steel-600">
                        <svg className="w-4 h-4 text-ws-red flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M9 12l2 2 4-4"/>
                        </svg>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA Block */}
              <div className="mt-10 space-y-3">
                <a
                  href="#quote"
                  className="btn-shine w-full inline-flex items-center justify-center gap-2 bg-ws-red hover:bg-ws-red-light text-white font-display font-semibold px-7 py-4 rounded-lg transition-all shadow-lg shadow-ws-red/20 text-base"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                  {t('requestQuote')}
                </a>
                <a
                  href="tel:+16042292988"
                  className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-steel-50 text-steel-800 border border-steel-200 font-display font-semibold px-7 py-4 rounded-lg transition-all text-base"
                >
                  <svg className="w-5 h-5 text-ws-red" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  {t('callPhone')}
                </a>
              </div>
            </div>
          </div>
        </section>

        <QuoteSection equipmentTitle={item.title} />
      </main>
      <Footer />
    </>
  )
}