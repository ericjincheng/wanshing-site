/**
 * Root layout — minimal shell.
 * The <html lang> attribute is set dynamically by reading the locale
 * resolved by next-intl middleware. Locale-specific layout, metadata,
 * and NextIntlClientProvider live in app/[locale]/layout.tsx.
 */
import type { Metadata } from 'next'
import { getLocale } from 'next-intl/server'
import { DM_Sans, Space_Grotesk, Instrument_Serif } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-accent',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'WanShing Machinery | Global Reach. Precision Machinery.',
    template: '%s | WanShing Machinery',
  },
  description:
    'WanShing Machinery — your trusted global partner for premium forklifts, material handling equipment, parts, and service. Authorized Zoomlion dealer. Request a quote today.',
  keywords: [
    'forklifts',
    'material handling equipment',
    'Zoomlion dealer',
    'forklift rental',
    'forklift parts',
    'WanShing Machinery',
    'Vancouver forklift',
    'Canada forklift',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: 'https://wanshing.com',
    siteName: 'WanShing Machinery',
    title: 'WanShing Machinery | Global Reach. Precision Machinery.',
    description:
      'Premium forklifts, material handling systems, and genuine parts with the service standards your operation demands.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WanShing Machinery | Global Reach. Precision Machinery.',
    description:
      'Premium forklifts, material handling systems, and genuine parts with the service standards your operation demands.',
  },
  metadataBase: new URL('https://wanshing.com'),
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()

  return (
    <html lang={locale} className={`${dmSans.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable}`}>
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  )
}