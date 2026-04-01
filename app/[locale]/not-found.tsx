import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function NotFound() {
  const t = useTranslations('notFound')

  return (
    <div className="min-h-screen bg-steel-50 flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <div className="w-20 h-20 rounded-2xl bg-ws-red flex items-center justify-center mx-auto mb-6 shadow-lg shadow-ws-red/20">
          <span className="font-display font-bold text-white text-3xl">W</span>
        </div>
        <h1 className="font-display text-6xl font-bold text-steel-900 mb-2">404</h1>
        <h2 className="font-display text-xl font-semibold text-steel-700 mb-4">{t('heading')}</h2>
        <p className="text-steel-500 mb-8">{t('body')}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="btn-shine inline-flex items-center justify-center gap-2 bg-ws-red hover:bg-ws-red-light text-white font-display font-semibold px-6 py-3 rounded-lg transition-all"
          >
            {t('goHome')}
          </Link>
          <Link
            href="/equipment"
            className="inline-flex items-center justify-center gap-2 bg-white text-steel-700 border border-steel-200 hover:bg-steel-50 font-display font-semibold px-6 py-3 rounded-lg transition-all"
          >
            {t('browseEquipment')}
          </Link>
        </div>
      </div>
    </div>
  )
}
