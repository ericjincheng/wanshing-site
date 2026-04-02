import { MetadataRoute } from 'next'
import { getAllEquipmentSlugs } from '@/lib/sanity.queries'
import { locales } from '@/i18n/config'

const BASE_URL = 'https://wanshing.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllEquipmentSlugs().catch(() => [] as string[])

  const staticRoutes = ['', '/equipment', '/about', '/rental', '/parts-service', '/dealer', '/privacy', '/terms']

  const entries: MetadataRoute.Sitemap = []

  // Static pages — one entry per locale
  for (const route of staticRoutes) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.8,
      })
    }
  }

  // Dynamic equipment pages
  for (const slug of slugs) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}/equipment/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    }
  }

  return entries
}
