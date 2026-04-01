import { sanityClient } from './sanity.client'
import type { EquipmentItem, EquipmentListItem } from '@/types/equipment'

// ─── Projection helpers ──────────────────────────────────────────────────────
// A slim projection used in listing contexts (grid, search results)
const EQUIPMENT_LIST_PROJECTION = `
  _id,
  title,
  slug,
  category,
  brand,
  fuelType,
  capacity,
  status,
  featured,
  "images": images[0..3],
  specs[0..2]
`

// Full projection for detail pages
const EQUIPMENT_FULL_PROJECTION = `
  _id,
  title,
  slug,
  category,
  brand,
  fuelType,
  capacity,
  status,
  featured,
  description,
  specs,
  images,
  price,
  seoTitle,
  seoDescription
`

// ─── Queries ─────────────────────────────────────────────────────────────────

/**
 * Fetch all equipment slugs — used by generateStaticParams
 */
export async function getAllEquipmentSlugs(): Promise<string[]> {
  return sanityClient.fetch<string[]>(
    `*[_type == "equipment" && defined(slug.current)][].slug.current`
  )
}

/**
 * Fetch featured equipment for the homepage grid (max 8 items)
 */
export async function getFeaturedEquipment(): Promise<EquipmentListItem[]> {
  return sanityClient.fetch<EquipmentListItem[]>(
    `*[_type == "equipment" && featured == true] | order(_createdAt desc) [0..7] {
      ${EQUIPMENT_LIST_PROJECTION}
    }`
  )
}

/**
 * Fetch all equipment, optionally filtered by category
 */
export async function getAllEquipment(
  category?: string
): Promise<EquipmentListItem[]> {
  const filter = category
    ? `*[_type == "equipment" && category == $category]`
    : `*[_type == "equipment"]`

  return sanityClient.fetch<EquipmentListItem[]>(
    `${filter} | order(_createdAt desc) {
      ${EQUIPMENT_LIST_PROJECTION}
    }`,
    { category }
  )
}

/**
 * Fetch a single equipment item by slug — used on detail pages
 */
export async function getEquipmentBySlug(slug: string): Promise<EquipmentItem | null> {
  return sanityClient.fetch<EquipmentItem | null>(
    `*[_type == "equipment" && slug.current == $slug][0] {
      ${EQUIPMENT_FULL_PROJECTION}
    }`,
    { slug }
  )
}

/**
 * Search equipment by a free-text query across title and description
 */
export async function searchEquipment(query: string): Promise<EquipmentListItem[]> {
  return sanityClient.fetch<EquipmentListItem[]>(
    `*[_type == "equipment" && (
      title match $q ||
      description match $q
    )] | order(_createdAt desc) [0..11] {
      ${EQUIPMENT_LIST_PROJECTION}
    }`,
    { q: `${query}*` }
  )
}

export interface CatalogFilters {
  category?: string
  brand?: string
  /** Format: "min-max" e.g. "3000-5000", or "11000+" */
  capacity?: string
}

/**
 * Fetch paginated, filtered catalog — used by /equipment page.
 * All filters are optional; omitting them returns all equipment.
 */
export async function getFilteredEquipment(
  filters: CatalogFilters = {}
): Promise<EquipmentListItem[]> {
  const conditions: string[] = [`_type == "equipment"`]

  if (filters.category) conditions.push(`category == $category`)
  if (filters.brand)    conditions.push(`brand == $brand`)

  // Capacity range parsing
  let minCap: number | undefined
  let maxCap: number | undefined
  if (filters.capacity && filters.capacity !== '') {
    if (filters.capacity.endsWith('+')) {
      minCap = parseInt(filters.capacity)
    } else {
      const [lo, hi] = filters.capacity.split('-').map(Number)
      minCap = lo
      maxCap = hi
    }
  }
  if (minCap !== undefined) conditions.push(`capacity >= $minCap`)
  if (maxCap !== undefined) conditions.push(`capacity <= $maxCap`)

  const filter = conditions.join(' && ')

  return sanityClient.fetch<EquipmentListItem[]>(
    `*[${filter}] | order(featured desc, _createdAt desc) {
      ${EQUIPMENT_LIST_PROJECTION}
    }`,
    {
      category: filters.category ?? null,
      brand:    filters.brand    ?? null,
      minCap:   minCap ?? null,
      maxCap:   maxCap ?? null,
    }
  )
}

/**
 * Return the count of equipment per category — used for filter pill badges.
 */
export async function getEquipmentCountByCategory(): Promise<Record<string, number>> {
  const results = await sanityClient.fetch<Array<{ category: string; count: number }>>(
    `*[_type == "equipment"] | order(_createdAt desc) {
      "category": category
    }`
  )
  return results.reduce<Record<string, number>>((acc, r) => {
    acc[r.category] = (acc[r.category] ?? 0) + 1
    return acc
  }, {})
}