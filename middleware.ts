import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './i18n/config'

export default createMiddleware({
  locales,
  defaultLocale,
  // Redirect '/' → '/en'; '/en/...' served as-is; '/zh/...' served as-is
  localePrefix: 'always',
})

export const config = {
  // Match all pathnames except internal Next.js routes, static files, and API routes
  matcher: ['/((?!api|_next|_vercel|studio|.*\\..*).*)', '/'],
}
