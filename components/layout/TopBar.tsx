'use client'

import { useTranslations } from 'next-intl'

/**
 * TopBar — Thin info bar above the header.
 * Shows contact info, business hours, and service region.
 * Hidden on mobile (md:block), visible on desktop.
 */
export default function TopBar() {
  const t = useTranslations('topBar')

  return (
    <div className="bg-steel-950 text-steel-400 text-xs font-body hidden md:block">
      <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
        <div className="flex items-center gap-6">
          {/* Email */}
          <a href="mailto:sales@wanshing.com" className="flex items-center gap-1.5 hover:text-steel-200 transition-colors">
            <svg className="w-3.5 h-3.5 text-ws-red" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            sales@wanshing.com
          </a>
          {/* Phone */}
          <a href="tel:+16042292988" className="flex items-center gap-1.5 hover:text-steel-200 transition-colors">
            <svg className="w-3.5 h-3.5 text-ws-red" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            +1 (604) 229-2988 · Toll Free: 888-855-6028
          </a>
        </div>
        <div className="flex items-center gap-4">
          <span>{t('hours')}</span>
          <span className="text-steel-600">|</span>
          <span className="text-ws-red-light font-medium">{t('serving')}</span>
        </div>
      </div>
    </div>
  )
}