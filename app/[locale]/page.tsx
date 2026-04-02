/**
 * Home Page — WanShing Machinery
 * Sections are built as isolated components and composed here.
 * Equipment data is fetched server-side from Sanity.
 */
export const revalidate = 3600 // ISR: rebuild at most every hour

import { getFeaturedEquipment } from '@/lib/sanity.queries'
import TopBar          from '@/components/layout/TopBar'
import Header          from '@/components/layout/Header'
import HeroSection     from '@/components/sections/HeroSection'
import QuickSearch     from '@/components/sections/QuickSearch'
import EquipmentGrid   from '@/components/sections/EquipmentGrid'
import TrustSection    from '@/components/sections/TrustSection'
import ServicesSection from '@/components/sections/ServicesSection'
import QuoteSection    from '@/components/sections/QuoteSection'
import Footer          from '@/components/layout/Footer'

export default async function HomePage() {
  const equipment = await getFeaturedEquipment()

  return (
    <>
      <TopBar />
      <Header />
      <main>
        <HeroSection />
        <QuickSearch />
        <EquipmentGrid equipment={equipment} />
        <TrustSection />
        <ServicesSection />
        <QuoteSection />
      </main>
      <Footer />
    </>
  )
}
