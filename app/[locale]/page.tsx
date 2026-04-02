export const revalidate = 3600

import { setRequestLocale } from 'next-intl/server'
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

interface Props {
  params: { locale: string }
}

export default async function HomePage({ params: { locale } }: Props) {
  setRequestLocale(locale)

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
