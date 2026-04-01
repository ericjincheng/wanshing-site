/**
 * Locale layout — validates the [locale] param and provides
 * NextIntlClientProvider so all client components can call useTranslations().
 */
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales } from '@/i18n/config'

interface Props {
  children: React.ReactNode
  params: { locale: string }
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  // Reject unknown locales — next-intl middleware should prevent this,
  // but this is an extra safety guard.
  if (!locales.includes(locale as any)) notFound()

  // Load all messages for this locale; NextIntlClientProvider makes them
  // available to every client component in this subtree.
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}
