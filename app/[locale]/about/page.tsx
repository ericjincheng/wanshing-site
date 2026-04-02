export const revalidate = 3600

import Image from 'next/image'
import { setRequestLocale } from 'next-intl/server'
import TopBar from '@/components/layout/TopBar'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import QuoteSection from '@/components/sections/QuoteSection'

interface Props { params: { locale: string } }

const STATS = [
  { value: '30+',    label: 'Years of Experience' },
  { value: '5★',     label: 'Google Rating' },
  { value: 'Global', label: 'Operations' },
  { value: 'Local',  label: 'Owned & Operated' },
]

const VALUES = [
  { icon: '🤝', title: 'Integrity',  body: 'We operate with full transparency — honest pricing, honest advice, honest service.' },
  { icon: '📈', title: 'Growth',     body: 'We grow alongside our clients, constantly improving our fleet, team, and support.' },
  { icon: '⚡', title: 'Efficiency', body: 'Every solution we deliver is designed to maximize your uptime and minimize your costs.' },
]

export default async function AboutPage({ params: { locale } }: Props) {
  setRequestLocale(locale)

  return (
    <>
      <TopBar />
      <Header />
      <main>

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="bg-steel-50 border-b border-steel-200">
          <div className="max-w-7xl mx-auto px-6 py-14 lg:py-20">
            <p className="font-display font-semibold text-ws-red text-sm uppercase tracking-widest mb-3">
              About Wanshing Machinery
            </p>
            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-steel-900 leading-tight max-w-3xl">
              Equipment Is Our Product,<br className="hidden sm:block" /> Service Is Our Specialty.
            </h1>
          </div>
        </section>

        {/* ── Intro — text left, image right ────────────────────────────── */}
        <section className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="animate-fade-up">
              <h2 className="font-display font-bold text-ws-red text-xl sm:text-2xl lg:text-3xl mb-6 leading-snug">
                Equipment Is Our Product, Service Is Our Specialty
              </h2>
              <div className="space-y-5 text-steel-600 font-body text-base leading-relaxed">
                <p>
                  At Wanshing Machinery, we bring over 30 years of industry expertise to the forefront of
                  forklift and material handling solutions. Founded by Henry, our mission is to deliver
                  reliable, efficient, and cost-effective equipment tailored to meet the diverse needs of
                  businesses across Canada and the United States of America.
                </p>
                <p>
                  As your one-stop destination for all material handling needs, we are committed to enhancing
                  the industry through sustainable sourcing and practices. Our extensive range of commercial
                  machinery is designed to elevate your company&apos;s productivity and streamline operations.
                </p>
                <p>
                  From hardworking forklifts to robust aerial lifts and versatile power pallet jacks, we offer
                  the right tools for your lifting requirements. Whether you&apos;re interested in upgrading your
                  equipment or leasing high-quality pre-owned options, our dedicated team is here to support
                  you in optimizing your business operations.
                </p>
                <p className="font-medium text-steel-900">
                  Join us at Wanshing Machinery, where innovation meets reliability, and let&apos;s drive your
                  success together.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-steel-lg animate-scale-in">
              <Image
                src="/about/forklift-intro.jpg"
                alt="Wanshing Machinery forklift"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </section>

        {/* ── Stats Bar ─────────────────────────────────────────────────── */}
        <section className="bg-ws-red py-14">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {STATS.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="font-display font-bold text-3xl sm:text-4xl text-white">{stat.value}</div>
                  <div className="text-white/75 text-sm font-body mt-1.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Sustainability ────────────────────────────────────────────── */}
        <section className="bg-steel-50 py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl">🌱</span>
              <span className="font-display font-semibold text-ws-red text-sm uppercase tracking-widest">
                Sustainability
              </span>
            </div>
            <h2 className="font-display font-bold text-ws-red text-xl sm:text-2xl lg:text-3xl mb-6 leading-snug">
              Driving Long-Term Success in a Changing World
            </h2>
            <p className="text-steel-600 font-body text-base leading-relaxed max-w-2xl">
              At Wanshing, we believe in powering a greener future. Our extensive selection of electric
              machinery offers zero-emission solutions that not only contribute to a cleaner environment
              but also help reduce noise pollution in workplaces. By prioritizing sustainable equipment
              options, we&apos;re taking active steps to minimize the environmental impact of forklifts
              and material handling equipment.
            </p>
            <p className="text-steel-600 font-body text-base leading-relaxed max-w-2xl mt-4">
              Together, let&apos;s make a positive impact on our planet and lead the way in the fight
              against global climate change.
            </p>
          </div>
        </section>

        {/* ── CRA Membership — image left, text right ───────────────────── */}
        <section className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-steel-100 shadow-steel">
              <Image
                src="/about/cra-ws.png"
                alt="Wanshing — Member of the Canadian Rental Association"
                fill
                className="object-contain p-6"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="font-display font-semibold text-ws-red text-sm uppercase tracking-widest mb-3">
                Membership
              </p>
              <h2 className="font-display font-bold text-ws-red text-xl sm:text-2xl lg:text-3xl mb-6 leading-snug">
                Member of the Canadian Rental Association
              </h2>
              <div className="space-y-4 text-steel-600 font-body text-base leading-relaxed">
                <p>
                  As a proud member of the Canadian Rental Association (CRA), Wanshing is committed to
                  delivering smarter, more adaptable solutions for businesses across Canada. By embracing
                  sustainable rental practices, we help companies reduce upfront equipment costs while
                  lowering environmental impact.
                </p>
                <p>
                  Our rental fleet offers flexible, short- or long-term options, enabling clients to scale
                  their operations efficiently without the commitment of ownership. From forklifts to aerial
                  work platforms, our approach supports greener operations and greater operational agility —
                  ensuring your business is equipped for today&apos;s needs and tomorrow&apos;s challenges.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Zoomlion Partnership — image left, text right ─────────────── */}
        <section className="bg-steel-50 py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white shadow-steel">
              <Image
                src="/about/zl-ws.png"
                alt="Wanshing — Official Canadian Zoomlion Distributor"
                fill
                className="object-contain p-6"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="font-display font-semibold text-ws-red text-sm uppercase tracking-widest mb-3">
                Partnership
              </p>
              <h2 className="font-display font-bold text-ws-red text-xl sm:text-2xl lg:text-3xl mb-6 leading-snug">
                Official Canadian Distributor for{' '}
                <span className="text-zoomlion">Zoomlion</span>
              </h2>
              <div className="space-y-4 text-steel-600 font-body text-base leading-relaxed">
                <p>
                  Wanshing is proud to be the official Canadian distributor for{' '}
                  <span className="font-semibold text-zoomlion">Zoomlion</span>, offering a full range of
                  high-performance machinery designed for greater productivity and efficiency. We are also
                  committed to exploring new-energy solutions, bringing our customers the latest innovations
                  in electric and hybrid equipment.
                </p>
                <p>
                  This ensures businesses can stay ahead with powerful, future-ready tools that meet both
                  operational demands and evolving industry standards.
                </p>
              </div>
              <p className="mt-6 text-steel-400 font-body text-xs leading-relaxed border-t border-steel-200 pt-4">
                Disclaimer: Wanshing is not an authorized Toyota or Mitsubishi dealership, repair or other
                authorized Toyota or Mitsubishi facility.
              </p>
            </div>
          </div>
        </section>

        {/* ── Service for Everyone ──────────────────────────────────────── */}
        <section className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl mb-12">
              <p className="font-display font-semibold text-ws-red text-sm uppercase tracking-widest mb-3">
                Accessibility
              </p>
              <h2 className="font-display font-bold text-ws-red text-xl sm:text-2xl lg:text-3xl mb-5 leading-snug">
                A Service for Everyone
              </h2>
              <div className="space-y-4 text-steel-600 font-body text-base leading-relaxed">
                <p>
                  At Wanshing Machinery, accessibility is our priority. We aim to provide equipment
                  solutions to fit any budget.
                </p>
                <p>
                  Our rental and leasing services are ideal for businesses needing seasonal or occasional
                  use, while our financing plans offer a great option for those looking to make a long-term
                  investment in their operations.
                </p>
                <p>
                  Our forklifts are suited to a wide range of industries, including farming, logistics,
                  transportation, and warehousing.
                </p>
                <p className="font-medium text-steel-900">
                  Contact us today to find the perfect plan for your needs!
                </p>
              </div>
            </div>

            {/* ── Partner Logo Carousel ────────────────────────────────── */}
            {/* Add partner logo images to public/carousel/ and list them below */}
            {/* TODO: Populate CAROUSEL_LOGOS array when partner images are provided */}
          </div>
        </section>

        {/* ── Vision, Mission & Values ──────────────────────────────────── */}
        <section className="bg-steel-900 py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6">
            <p className="font-display font-semibold text-ws-red text-sm uppercase tracking-widest mb-3">
              Who We Are
            </p>
            <h2 className="font-display font-bold text-white text-xl sm:text-2xl lg:text-3xl mb-12 leading-snug">
              Vision, Mission & Values
            </h2>
            <div className="grid md:grid-cols-3 gap-8">

              {/* Vision */}
              <div className="bg-steel-800 rounded-2xl p-8 border border-steel-700">
                <div className="w-10 h-10 rounded-lg bg-ws-red/20 flex items-center justify-center mb-5">
                  <svg className="w-5 h-5 text-ws-red" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </div>
                <h3 className="font-display font-bold text-white text-lg mb-3">Our Vision</h3>
                <p className="text-steel-400 font-body text-sm leading-relaxed">
                  Where there is material handling, where there is Wanshing Machinery.
                </p>
              </div>

              {/* Mission */}
              <div className="bg-steel-800 rounded-2xl p-8 border border-steel-700">
                <div className="w-10 h-10 rounded-lg bg-ws-red/20 flex items-center justify-center mb-5">
                  <svg className="w-5 h-5 text-ws-red" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="font-display font-bold text-white text-lg mb-3">Our Mission</h3>
                <p className="text-steel-400 font-body text-sm leading-relaxed">
                  Dedicated to providing top-quality environmentally friendly logistics tools for SMBs
                  to help improve efficiency and reduce cost.
                </p>
              </div>

              {/* Core Values */}
              <div className="bg-steel-800 rounded-2xl p-8 border border-steel-700">
                <div className="w-10 h-10 rounded-lg bg-ws-red/20 flex items-center justify-center mb-5">
                  <svg className="w-5 h-5 text-ws-red" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                  </svg>
                </div>
                <h3 className="font-display font-bold text-white text-lg mb-3">Core Values</h3>
                <ul className="space-y-2">
                  {VALUES.map((v) => (
                    <li key={v.title} className="flex items-start gap-3">
                      <span className="text-ws-red mt-0.5 flex-shrink-0">▸</span>
                      <div>
                        <span className="font-display font-semibold text-white text-sm">{v.title}</span>
                        <p className="text-steel-400 font-body text-xs leading-relaxed mt-0.5">{v.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* ── Quote CTA — shared component, synced across all pages ─────── */}
        <QuoteSection />

      </main>
      <Footer />
    </>
  )
}
