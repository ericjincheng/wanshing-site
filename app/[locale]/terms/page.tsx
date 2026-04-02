export const revalidate = 3600

import TopBar from '@/components/layout/TopBar'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function TermsPage() {
  return (
    <>
      <TopBar />
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-steel-900 mb-8">Terms of Service</h1>
        <div className="prose prose-steel max-w-none space-y-4 text-steel-700">
          <p>
            By using the WanShing Machinery website, you agree to these terms. Equipment availability,
            pricing, and specifications are subject to change without notice.
          </p>
          <h2 className="text-2xl font-semibold text-steel-900 mt-8">Equipment Listings</h2>
          <p>
            All equipment listings are for informational purposes. Final pricing, availability, and
            condition are confirmed upon direct inquiry with our sales team.
          </p>
          <h2 className="text-2xl font-semibold text-steel-900 mt-8">Limitation of Liability</h2>
          <p>
            WanShing Machinery provides this website &quot;as is&quot; and makes no warranties regarding
            the accuracy of equipment information displayed online.
          </p>
          <h2 className="text-2xl font-semibold text-steel-900 mt-8">Contact</h2>
          <p>
            For questions about these terms, contact us at sales@wanshing.com.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
