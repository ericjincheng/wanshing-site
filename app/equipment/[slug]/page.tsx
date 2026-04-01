/**
 * Equipment detail stub.
 * Middleware redirects /equipment/[slug] → /en/equipment/[slug] before this runs.
 * Kept as a safety-net redirect.
 */
import { redirect } from 'next/navigation'

interface Props {
  params: { slug: string }
}

export default function EquipmentDetailRedirect({ params }: Props) {
  redirect(`/en/equipment/${params.slug}`)