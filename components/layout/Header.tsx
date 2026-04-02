'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/lib/navigation'

export default function Header() {
  const t      = useTranslations('header')
  const locale = useLocale()
  const router   = useRouter()
  const pathname = usePathname()

  const NAV_LINKS = [
    { labelKey: 'nav.equipment',   href: '/equipment' },
    { labelKey: 'nav.rental',      href: '/rental' },
    { labelKey: 'nav.partsService',href: '/parts-service' },
    { labelKey: 'nav.about',       href: '/about' },
    { labelKey: 'nav.dealer',      href: '/dealer' },
  ]

  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeLang, setActiveLang] = useState<'en' | 'zh'>(locale as 'en' | 'zh')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const switchLocale = (lang: 'en' | 'zh') => {
    setActiveLang(lang)
    router.replace(pathname, { locale: lang })
  }

  return (
    <header
      id="mainHeader"
      className={`sticky top-0 z-50 bg-white border-b border-steel-200 transition-all duration-300 ${
        scrolled ? 'header-scrolled' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/ws-logo.jpg"
            alt="WanShing Machinery Logo"
            width={52}
            height={52}
            className="object-contain rounded-full"
            priority
          />
          <div className="leading-tight">
            <span className="font-display font-bold text-steel-900 text-lg tracking-tight">Wanshing</span>
            <span className="block text-[10px] text-steel-500 font-medium tracking-[0.2em] uppercase">Machinery</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link text-steel-900 hover:text-steel-600 px-4 py-2 text-sm font-medium transition-colors"
            >
              {t(link.labelKey as any)}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <div className="lang-toggle hidden md:flex items-center bg-steel-100 border border-steel-200 rounded-lg p-0.5 text-xs">
            {(['en', 'zh'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => switchLocale(lang)}
                className={`lang-option px-2.5 py-1.5 rounded-md transition-all ${
                  activeLang === lang ? 'active' : 'text-steel-500'
                }`}
              >
                {lang === 'en' ? 'EN' : '中文'}
              </button>
            ))}
          </div>

          {/* Request a Quote CTA */}
          <Link
            href="/#quote"
            className="btn-shine hidden sm:inline-flex items-center gap-2 bg-ws-red hover:bg-ws-red-light text-white font-display font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors shadow-lg shadow-ws-red/20"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            {t('requestQuote')}
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-steel-900 p-2"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={t('toggleMenu')}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {mobileOpen
                ? <path d="M6 18L18 6M6 6l12 12"/>
                : <path d="M4 6h16M4 12h16M4 18h16"/>
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`lg:hidden bg-white border-t border-steel-200 overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-[400px]' : 'max-h-0'
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-steel-900 hover:text-steel-600 py-2.5 text-sm font-medium border-b border-steel-200"
            >
              {t(link.labelKey as any)}
            </Link>
          ))}
          <div className="flex items-center gap-2 pt-3">
            <div className="lang-toggle flex items-center bg-steel-100 border border-steel-200 rounded-lg p-0.5 text-xs">
              {(['en', 'zh'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => switchLocale(lang)}
                  className={`lang-option px-2.5 py-1.5 rounded-md transition-all ${
                    activeLang === lang ? 'active' : 'text-steel-500'
                  }`}
                >
                  {lang === 'en' ? 'EN' : '中文'}
                </button>
              ))}
            </div>
            <Link
              href="/#quote"
              className="flex-1 text-center bg-ws-red text-white font-semibold text-sm px-4 py-2.5 rounded-lg"
            >
              {t('requestQuote')}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
