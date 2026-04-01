import { getRequestConfig } from 'next-intl/server'
import { defaultLocale, locales } from './config'

export default getRequestConfig(async ({ locale }) => {
  // Validate locale; fall back to default if unrecognised
  const resolvedLocale = locales.includes(locale as any) ? locale : defaultLocale

  return {
    locale: resolvedLocale,
    messages: (await import(`../messages/${resolvedLocale}.json`)).default,
  }
})