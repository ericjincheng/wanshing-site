export const revalidate = 3600 // ISR: rebuild at most every hour

import { Suspense } from 'react'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import TopBar from '@/components/layout/TopBar'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CatalogClient from '@/components/sections/CatalogClient'
import { getFilteredEquipment } from '@/lib/sanity.queries'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Equipment Catalog',
    description:
      "Browse WanShing Machinery's full inventory of new, used, and certified pre-owned forklifts, reach trucks, pallet jacks, scissor lifts, and more.",
  }
}

interface PageProps {
  searchParams: {
    category?: string
    brand?: string
    capacity?: string
  }
}

export default async function EquipmentCatalogPage({ searchParams }: PageProps) {
  const t = await getTranslations('catalog')

  const equipment = await getFilteredEquipment({
    category: searchParams.category,
    brand:    searchParams.brand,
    capacity: searchParams.capacity,
  })

  return (
    <>
      <TopBar />
      <Header />
      <main>
        {/* Page Header Banner */}
        <div className="bg-steel-900 grain relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-steel-950 via-steel-900 to-steel-800 z-0" />
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-ws-red/5 rounded-full blur-3xl z-0" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-20">
            <div className="max-w-2xl">
              <span className="text-ws-red font-display font-semibold text-sm tracking-wider uppercase">
                {t('eyebrow')}
              </span>
              <h1 className="font-display text-4xl lg:text-5xl font-bold text-white mt-2 leading-tight">
                {t('heading')}
              </h1>
              <p className="mt-4 text-steel-300 text-lg leading-relaxed">
                {t('body')}
              </p>
            </div>
          </div>
        </div>

        <Suspense fallback={<div className="p-12 text-center text-steel-400">Loading catalog…</div>}>
          <CatalogClient
            initialEquipment={equipment}
            activeFilters={{
              category: searchParams.category ?? '',
              brand:    se