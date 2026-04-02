export const revalidate = 3600

import TopBar from '@/components/layout/TopBar'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useTranslations } from 'next-intl'

export default function AboutPage() {
  const t = useTranslations('header')
  return (
    <>
      <TopBar />
      <Header />
      <main className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center px-6 py-20">
          <h1 className="text-4xl font-bold text-steel-900 mb-4">{t('nav.about')}</h1>
          <p className="text-steel-600 text-lg max-w-xl mx-auto">
            Page coming soon. WanShing Machinery has been a trusted equipment dealer since 1995.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
