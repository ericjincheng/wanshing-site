export const revalidate = 3600

import { setRequestLocale } from 'next-intl/server'
import TopBar from '@/components/layout/TopBar'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

interface Props { params: { locale: string } }

export default async function PrivacyPage({ params: { locale } }: Props) {
  setRequestLocale(locale)
  return (
    <>
      <TopBar />
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-steel-900 mb-8">Privacy Policy</h1>
        <div className="space-y-4 text-steel-700">
          <p>
            WanShing Machinery (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) respects your privacy. This policy explains how we collect,
            use, and protect your personal information when you use our website.
          </p>
          <h2 className="text-2xl font-semibold text-steel-900 mt-8">Information We Collect</h2>
          <p>
            We collect information you provide directly, such as your name, email address, phone number,
            and company name when you submit a quote request or contact form.
          </p>
          <h2 className="text-2xl font-semibold text-steel-900 mt-8">How We Use Your Information</h2>
          <p>
            We use your information to respond to inquiries, process quote requests, and improve our services.
            We do not sell your personal information to third parties.
          </p>
          <h2 className="text-2xl font-semibold text-steel-900 mt-8">Contact</h2>
          <p>For privacy-related questions, contact us at sales@wanshing.com.</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
