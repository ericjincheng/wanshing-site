/**
 * Locale-aware navigation helpers from next-intl.
 * Use these instead of next/link and next/navigation in components
 * that need locale-prefixed routing (e.g. the language toggle in Header).
 */
import { createNavigation } from 'next-intl/navigation'
import { locales, defaultLocale } from '@/i18n/config'

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation({ locales, defaultLocale })