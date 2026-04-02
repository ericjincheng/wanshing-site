import { getTranslations } from 'next-intl/server'

export default async function TrustSection() {
  const t = await getTranslations('trust')

  const STATS = [
    { value: '30+',  labelKey: 'stat1Label' },
    { value: '2',    labelKey: 'stat2Label' },
    { value: '15K+', labelKey: 'stat3Label' },
    { value: '4.9★', labelKey: 'stat4Label' },
  ]

  const VALUE_PROPS = [
    {
      key: 'certified',
      icon: <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>,
    },
    {
      key: 'delivery',
      icon: <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>,
    },
    {
      key: 'pricing',
      icon: <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>,
    },
    {
      key: 'support',
      icon: <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>,
    },
  ]

  return (
    <section className="relative bg-steel-900 grain overflow-hidden" id="about">
      <div className="absolute inset-0 bg-gradient-to-r from-steel-950 via-steel-900 to-steel-950 z-0" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-ws-red/5 rounded-full blur-3xl z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-28">

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {STATS.map((stat) => (
            <div key={stat.labelKey} className="stat-block text-center lg:text-left">
              <div className="font-display text-4xl lg:text-5xl font-bold text-white">
                {stat.value.replace(/[+★]/g, '')}
                {stat.value.includes('+') && <span className="text-ws-red-light">+</span>}
                {stat.value.includes('★') && <span className="text-ws-red-light">★</span>}
              </div>
              <div className="text-steel-400 text-sm mt-1 font-medium">{t(stat.labelKey as any)}</div>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="text-ws-red-light font-display font-semibold text-sm tracking-wider uppercase">
              {t('eyebrow')}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-3 leading-tight">
              {t('heading')}{' '}
              <span className="font-accent italic font-normal text-ws-red-light">{t('headingAccent')}</span>
            </h2>
            <p className="text-steel-300 text-lg mt-5 leading-relaxed">{t('body')}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="/about" className="btn-shine inline-flex items-center gap-2 bg-ws-red hover:bg-ws-red-light text-white font-display font-semibold text-sm px-6 py-3 rounded-lg transition">
                {t('learnStory')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </a>
              <a href="/dealer" className="inline-flex items-center gap-2 text-steel-300 hover:text-white font-display font-semibold text-sm px-6 py-3 rounded-lg border border-steel-600 hover:border-steel-400 transition">
                {t('becomeDealer')}
              </a>
            </div>
          </div>

          {/* Value Props 2×2 */}
          <div className="grid sm:grid-cols-2 gap-5">
            {VALUE_PROPS.map((prop) => (
              <div key={prop.key} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/[0.07] transition">
                <div className="w-11 h-11 rounded-lg bg-ws-red/10 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-ws-red-light" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    {prop.icon}
                  </svg>
                </div>
                <h3 className="font-display font-bold text-white text-sm">{t(`${prop.key}.title` as any)}</h3>
                <p className="text-steel-400 text-xs mt-2 leading-relaxed">{t(`${prop.key}.body` as any)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}