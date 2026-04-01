import { getTranslations } from 'next-intl/server'

export default async function ServicesSection() {
  const t = await getTranslations('services')

  const SERVICES = [
    {
      key:  'maintenance',
      href: '/services/maintenance',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.18-5.18m0 0L2.12 6.37m4.12 3.62l4.12-4.12m0 0L14.48 2m-4.12 3.87l3.62 4.12m7.9 7.9l-3.62-3.62m0 0l-4.12 4.12m4.12-4.12l3.62 4.12M2.12 17.63l3.62-3.62"/>
      ),
    },
    {
      key:  'parts',
      href: '/parts',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
      ),
    },
    {
      key:  'financing',
      href: '/financing',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      ),
    },
  ]

  return (
    <section className="py-20 lg:py-24 bg-steel-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-ws-red font-display font-semibold text-sm tracking-wider uppercase">
            {t('eyebrow')}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-steel-900 mt-2">
            {t('heading')}{' '}
            <span className="font-accent italic font-normal text-ws-red">{t('headingAccent')}</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.key}
              className="bg-white rounded-xl p-8 border border-steel-200 hover:border-ws-red-200 hover:shadow-lg hover:shadow-ws-red/5 transition-all group"
            >
              <div className="w-14 h-14 rounded-xl bg-ws-red-50 flex items-center justify-center mb-5 group-hover:bg-ws-red transition-colors">
                <svg
                  className="w-7 h-7 text-ws-red group-hover:text-white transition-colors"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  {service.icon}
                </svg>
              </div>
              <h3 className="font-display font-bold text-steel-900 text-lg">{t(`${service.key}.title` as any)}</h3>
              <p className="text-steel-500 text-sm mt-3 leading-relaxed">{t(`${service.key}.body` as any)}</p>
              <a
                href={service.href}
                className="inline-flex items-center gap-1 text-ws-red font-semibold text-sm mt-5 hover:gap-2 transition-all"
              >
                {t(`${service.key}.cta` as any)}
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
