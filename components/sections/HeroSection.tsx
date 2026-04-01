import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

export default async function HeroSection() {
  const t = await getTranslations('hero')

  return (
    <section className="relative bg-steel-900 grain overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 opacity-[0.03] z-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
      <div className="absolute inset-0 bg-gradient-to-br from-steel-950 via-steel-900 to-steel-800 z-0" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-ws-red/5 rounded-full blur-3xl z-0" />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-ws-red/[0.03] rounded-full blur-3xl z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-28 lg:pt-28 lg:pb-36">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — Copy */}
          <div>
            <div className="animate-fade-up inline-flex items-center gap-2 bg-ws-red/10 border border-ws-red/20 text-ws-red-light text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-ws-red rounded-full animate-pulse" />
              {t('badge')}
            </div>

            <h1 className="animate-fade-up-d1 font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-bold text-white leading-[1.1] tracking-tight">
              {t('h1Line1')}<br />
              <span className="text-ws-red-light">{t('h1Accent')}</span> {t('h1Line2')}<br />
              <span className="font-accent italic font-normal text-steel-300">{t('h1Line3')}</span>
            </h1>

            <p className="animate-fade-up-d2 mt-6 text-steel-300 text-lg leading-relaxed max-w-lg">
              {t('body')}
            </p>

            <div className="animate-fade-up-d3 mt-8 flex flex-wrap gap-4">
              <Link
                href="/#equipment"
                className="btn-shine inline-flex items-center gap-2 bg-ws-red hover:bg-ws-red-light text-white font-display font-semibold px-7 py-3.5 rounded-lg transition-all shadow-xl shadow-ws-red/20 hover:shadow-ws-red/30"
              >
                {t('browseCatalog')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </Link>
              <Link
                href="/#quote"
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 font-display font-semibold px-7 py-3.5 rounded-lg transition-all"
              >
                {t('contactSales')}
              </Link>
            </div>

            <div className="animate-fade-up-d4 mt-10 flex flex-wrap items-center gap-6 text-steel-400 text-sm">
              {([t('trust1'), t('trust2'), t('trust3')] as string[]).map((badge) => (
                <span key={badge} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Right — Hero image placeholder */}
          <div className="animate-scale-in relative hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] img-placeholder shadow-2xl">
              <svg className="w-full h-full" viewBox="0 0 500 380" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="500" height="380" fill="#1E293B"/>
                <rect x="0" y="300" width="500" height="80" fill="#0F172A" opacity="0.5"/>
                <line x1="0" y1="300" x2="500" y2="300" stroke="#334155" strokeWidth="1"/>
                <rect x="180" y="180" width="160" height="120" rx="8" fill="#334155"/>
                <rect x="185" y="185" width="70" height="55" rx="4" fill="#1E293B" stroke="#475569" strokeWidth="1"/>
                <rect x="260" y="140" width="80" height="100" rx="6" fill="#475569"/>
                <rect x="140" y="80" width="10" height="220" rx="2" fill="#64748B"/>
                <rect x="160" y="80" width="10" height="220" rx="2" fill="#64748B"/>
                <rect x="100" y="270" width="80" height="8" rx="2" fill="#C8102E"/>
                <rect x="170" y="170" width="8" height="110" rx="2" fill="#C8102E"/>
                <circle cx="220" cy="310" r="22" fill="#0F172A" stroke="#475569" strokeWidth="3"/>
                <circle cx="220" cy="310" r="8" fill="#334155"/>
                <circle cx="310" cy="310" r="22" fill="#0F172A" stroke="#475569" strokeWidth="3"/>
                <circle cx="310" cy="310" r="8" fill="#334155"/>
                <rect x="195" y="225" width="80" height="22" rx="3" fill="#C8102E" opacity="0.95"/>
                <text x="235" y="241" fontFamily="sans-serif" fontSize="11" fontWeight="700" fill="#fff" textAnchor="middle">WANSHING</text>
              </svg>
              <div className="absolute top-4 right-4 bg-ws-red text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">{t('established')}</div>
            </div>

            {/* Floating review widget */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 flex items-center gap-3 animate-slide-right">
              <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                </svg>
              </div>
              <div>
                <div className="text-steel-900 font-display font-bold text-lg">4.9 ★</div>
                <div className="text-steel-500 text-xs">{t('googleReviews')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
