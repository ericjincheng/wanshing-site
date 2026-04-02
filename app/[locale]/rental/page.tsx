export const revalidate = 3600

import { setRequestLocale } from 'next-intl/server'
import TopBar from '@/components/layout/TopBar'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

interface Props { params: { locale: string } }

export default async function RentalPage({ params: { locale } }: Props) {
  setRequestLocale(locale)
  return (
    <>
      <TopBar />
      <Header />
      <main className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center px-6 py-20">
          <h1 className="text-4xl font-bold text-steel-900 mb-4">Rental</h1>
          <p className="text-steel-600 text-lg max-w-xl mx-auto">
            Rental program details coming soon. Contact us for short-term and long-term equipment rental options.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
