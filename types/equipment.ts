import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export type EquipmentCategory =
  | 'forklift'
  | 'reachTruck'
  | 'palletJack'
  | 'scissorLift'
  | 'boomLift'
  | 'electricStacker'

export type EquipmentBrand =
  | 'wsForklifts'
  | 'zoomlion'
  | 'jac'
  | 'toyota'
  | 'mitsubishi'
  | 'komatsu'
  | 'other'

export type FuelType = 'lpg' | 'electric' | 'diesel' | 'gasoline' | 'hybrid'

export type EquipmentStatus = 'inStock' | 'newArrival' | 'bestSeller' | 'comingSoon'

export interface EquipmentItem {
  _id: string
  title: string
  slug: { current: string }
  category: EquipmentCategory
  brand: EquipmentBrand
  fuelType: FuelType
  capacity?: number            // in lbs
  status?: EquipmentStatus
  featured: boolean
  description?: string
  specs?: string[]
  images?: SanityImageSource[]
  price?: string               // optional display string, e.g. "Call for pricing"
  seoTitle?: string
  seoDescription?: string
}

export type EquipmentListItem = Pick<
  EquipmentItem,
  '_id' | 'title' | 'slug' | 'category' | 'brand' | 'fuelType' | 'capacity' | 'status' | 'featured' | 'images' | 'specs'
>