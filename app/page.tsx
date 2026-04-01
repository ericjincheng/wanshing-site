/**
 * Root page stub.
 * The next-intl middleware redirects all traffic from '/' to '/en' (or the
 * user's preferred locale), so this file is never reached in practice.
 * It exists only to satisfy Next.js's route file conventions.
 */
import { redirect } from 'next/navigation'

export default function RootPage() {
  redirect('/en')
}