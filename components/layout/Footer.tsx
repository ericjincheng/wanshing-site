import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

export default async function Footer() {
  const t   = await getTranslations('footer')
  const year = new Date().getFullYear()

  const equipmentLinks = [
    { key: 'forklifts',   labelKey: 'equipmentItems.forklifts' },
    { key: 'reachTrucks', labelKey: 'equipmentItems.reachTrucks' },
    { key: 'palletJacks', labelKey: 'equipmentItems.palletJacks' },
    { key: 'scissorLifts',labelKey: 'equipmentItems.scissorLifts' },
    { key: 'boomLifts',   labelKey: 'equipmentItems.boomLifts' },
  ]

  const serviceLinks = [
    { key: 'maintenance', labelKey: 'serviceItems.maintenance' },
    { key: 'parts',       labelKey: 'serviceItems.parts' },
    { key: 'financing',   labelKey: 'serviceItems.financing' },
    { key: 'rental',      labelKey: 'serviceItems.rental' },
    { key: 'dealer',      labelKey: 'serviceItems.dealer' },
  ]

  return (
    <footer className="bg-steel-950 text-steel-400">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-ws-red flex items-center justify-center">
                <span className="font-display font-bold text-white text-lg">W</span>
              </div>
              <div className="leading-tight">
                <span className="font-display font-bold text-white text-lg tracking-tight">WanShing</span>
                <span className="block text-[10px] text-steel-500 font-medium tracking-[0.2em] uppercase">Machinery</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-steel-500">{t('tagline')}</p>
          </div>

          {/* Equipment */}
          <div>
            <h3 className="font-display font-semibold text-white text-sm mb-4">{t('equipmentCol')}</h3>
            <ul className="space-y-2.5 text-sm">
              {equipmentLinks.map((item) => (
                <li key={item.key}>
                  <Link href="/#equipment" className="hover:text-white transition-colors">
                    {t(item.labelKey as any)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-semibold text-white text-sm mb-4">{t('servicesCol')}</h3>
            <ul className="space-y-2.5 text-sm">
              {serviceLinks.map((item) => (
                <li key={item.key}>
                  <Link href="#" className="hover:text-white transition-colors">
                    {t(item.labelKey as any)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-white text-sm mb-4">{t('contactCol')}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="mailto:sales@wanshing.com" className="hover:text-white transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4 text-ws-red flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  sales@wanshing.com
                </a>
              </li>
              <li>
                <a href="tel:+16042292988" className="hover:text-white transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4 text-ws-red flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  +1 (604) 229-2988
                </a>
              </li>
              <li className="text-steel-500">{t('hours')}</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-steel-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-steel-600">
          <span>&copy; {year} WanShing Machinery. {t('rights')}</span>
          <div className="flex items-center gap-5">
            <Link href="#" className="hover:text-steel-400 transition-colors">{t('privacy')}</Link>
            <Link href="#" className="hover:text-steel-400 transition-colors">{t('terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}