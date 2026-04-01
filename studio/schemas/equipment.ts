import { defineField, defineType } from 'sanity'

/**
 * Equipment schema — WanShing Machinery
 *
 * Represents a single piece of equipment in the catalog.
 * Each document maps to a dynamic route at /equipment/[slug].
 */
export default defineType({
  name: 'equipment',
  title: 'Equipment',
  type: 'document',
  icon: () => '🏗️',

  // ─── Preview in Sanity Studio ─────────────────────────────────────────────
  preview: {
    select: {
      title:    'title',
      subtitle: 'brand',
      media:    'images.0',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: BRAND_LABELS[subtitle as keyof typeof BRAND_LABELS] ?? subtitle,
        media,
      }
    },
  },

  fields: [
    // ── Core Identity ────────────────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g. "WS-5000 LPG Forklift" or "4,400 lb Electric Pallet Jack"',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Auto-generated URL path. Click "Generate" after setting the title.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    // ── Classification ───────────────────────────────────────────────────────
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { value: 'forklift',        title: 'Forklift' },
          { value: 'reachTruck',      title: 'Reach Truck' },
          { value: 'palletJack',      title: 'Pallet Jack' },
          { value: 'scissorLift',     title: 'Scissor Lift' },
          { value: 'boomLift',        title: 'Boom Lift' },
          { value: 'electricStacker', title: 'Electric Stacker' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'brand',
      title: 'Brand / Make',
      type: 'string',
      options: {
        list: [
          { value: 'wsForklifts', title: 'WS Forklifts (House Brand)' },
          { value: 'zoomlion',    title: 'Zoomlion' },
          { value: 'jac',         title: 'JAC' },
          { value: 'toyota',      title: 'Toyota' },
          { value: 'mitsubishi',  title: 'Mitsubishi' },
          { value: 'komatsu',     title: 'Komatsu' },
          { value: 'other',       title: 'Other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fuelType',
      title: 'Fuel / Power Type',
      type: 'string',
      options: {
        list: [
          { value: 'lpg',      title: 'LPG (Propane)' },
          { value: 'electric', title: 'Electric' },
          { value: 'diesel',   title: 'Diesel' },
          { value: 'gasoline', title: 'Gasoline' },
          { value: 'hybrid',   title: 'Hybrid' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    // ── Catalog Status ───────────────────────────────────────────────────────
    defineField({
      name: 'status',
      title: 'Availability Status',
      type: 'string',
      description: 'Controls the badge shown on product cards.',
      options: {
        list: [
          { value: 'inStock',    title: '✅ In Stock' },
          { value: 'newArrival', title: '🔵 New Arrival' },
          { value: 'bestSeller', title: '🔴 Best Seller' },
          { value: 'comingSoon', title: '⏳ Coming Soon' },
        ],
        layout: 'radio',
      },
      initialValue: 'inStock',
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      description: 'Toggle ON to show this unit in the homepage equipment grid.',
      initialValue: false,
    }),

    // ── Specs ────────────────────────────────────────────────────────────────
    defineField({
      name: 'capacity',
      title: 'Load Capacity (lbs)',
      type: 'number',
      description: 'Maximum rated lift capacity in pounds.',
      validation: (Rule) => Rule.min(0).max(150000),
    }),
    defineField({
      name: 'specs',
      title: 'Spec Bullet Points',
      type: 'array',
      description: 'Short bullet points shown on cards and detail pages. Keep each under 60 chars.',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.max(10),
    }),

    // ── Content ──────────────────────────────────────────────────────────────
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'B2B-focused prose description. Shown on the detail page.',
    }),
    defineField({
      name: 'price',
      title: 'Price (Display)',
      type: 'string',
      description: 'Optional display string — leave blank to show "Request a Quote". e.g. "From $18,500 CAD"',
    }),

    // ── Media ────────────────────────────────────────────────────────────────
    defineField({
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              description: 'Describe the image for SEO and accessibility.',
              validation: (Rule: any) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.max(8),
    }),

    // ── SEO Overrides ────────────────────────────────────────────────────────
    defineField({
      name: 'seoTitle',
      title: 'SEO Title Override',
      type: 'string',
      description: 'Leave blank to use the equipment title. Max 60 chars.',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Meta Description',
      type: 'text',
      rows: 2,
      description: 'Target 140–160 characters.',
      validation: (Rule) => Rule.max(160),
    }),
  ],
})

// Label lookup (used in preview)
const BRAND_LABELS = {
  wsForklifts: 'WS Forklifts',
  zoomlion:    'Zoomlion',
  jac:         'JAC',
  toyota:      'Toyota',
  mitsubishi:  'Mitsubishi',
  komatsu:     'Komatsu',
  other:       'Other',
} as const
