/**
 * Equipment catalog stub.
 * Middleware redirects /equipment → /en/equipment before this runs.
 * Kept as a safety-net redirect.
 */
import { redirect } from 'next/navigation'

export default function EquipmentRedirect() {
  redirect('/en/equipment')