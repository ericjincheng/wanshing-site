# WanShing Machinery — Project Handoff

**Generated:** 2026-04-01  
**Repository:** https://github.com/ericjincheng/wanshing-site  
**Stack:** Next.js 14.2.29 · Tailwind CSS 3.4 · Sanity.io · next-intl · Resend · Vercel

---

## Current State

All planned phases (1–7) are complete. The site is production-ready and deployed to Vercel.

| Phase | Description | Status |
|-------|-------------|--------|
| 1 | Environment setup, folder structure | ✅ Complete |
| 2 | Next.js scaffold, Tailwind tokens, Sanity schema, lib/queries, sections | ✅ Complete |
| 3 | Equipment catalog, URL filters, sidebar, 404 pages | ✅ Complete |
| 4 | Quote form server action, Resend email, branded templates, validation | ✅ Complete |
| 5 | i18n with next-intl (EN / 中文) | ✅ Complete |
| 6 | Vercel deployment configuration | ✅ Complete |
| 7 | iMessage + WhatsApp contact buttons | ✅ Complete |
| 8+ | WeChat, analytics, ISR webhooks, bilingual content | ⏳ Not started |

---

## Active URLs

- **Production:** Deploy via Vercel → add `wanshing.com` in Vercel Dashboard → Domains
- **Sanity Studio:** https://wanshing.sanity.dev/studio (or `npm run studio` locally)
- **GitHub:** https://github.com/ericjincheng/wanshing-site (branch: `master`)

---

## Environment Variables

All secrets live in `.env.local` (not committed). Required before running locally or deploying:

| Variable | Required | Notes |
|----------|----------|-------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ✅ | `7rppd6fc` (public, safe to commit) |
| `NEXT_PUBLIC_SANITY_DATASET` | ✅ | `production` (public, safe to commit) |
| `SANITY_API_TOKEN` | Optional | Read-only viewer token for draft previews |
| `RESEND_API_KEY` | ✅ | Get from resend.com |
| `RESEND_FROM_ADDRESS` | ✅ | `noreply@wanshing.com` — must be verified in Resend |
| `SALES_EMAIL` | ✅ | `sales@wanshing.com` — receives inquiry emails |

Copy `.env.local.example` → `.env.local` and fill in values.

---

## Running Locally

```bash
cd "C:\Users\ericj\Documents\AI Projects\WanShing Machinery\WS Website"
npm install
npm run dev          # http://localhost:3000
npm run studio       # Sanity CMS editor (port 3333)
npm run build        # Production build check
npm run lint         # ESLint
```

---

## Technical Debt (Priority Order)

### High Priority

**1. jiti build workaround is fragile**
- **Where:** `vercel.json` `buildCommand` and `package.json` devDependencies
- **Issue:** `npm install jiti@1.21.7 --no-save` runs at build time instead of declaring a proper dependency override. This is fragile across Vercel environment updates.
- **Fix:** Add `"overrides": { "jiti": "1.21.7" }` to `package.json`, remove the `--no-save` prefix from `buildCommand`, delete jiti from devDependencies.

**2. `npm install --force` in Vercel installCommand**
- **Where:** `vercel.json` `installCommand`
- **Issue:** Bypasses npm's dependency conflict detection. Masks underlying incompatibilities.
- **Fix:** Once the jiti override is in package.json, test if `npm install` (without `--force`) succeeds. Remove `--force` if it does.

**3. Equipment data is English-only (breaks ZH locale)**
- **Where:** `studio/schemas/equipment.ts`, `lib/sanity.queries.ts`
- **Issue:** The `/zh/` locale serves the same English product titles, descriptions, and specs. The Chinese UI shell wraps English content, undermining the bilingual value proposition.
- **Fix:** Add `titleZh`, `descriptionZh`, `specsZh` fields to the Sanity equipment schema. Update GROQ queries to select the appropriate locale field based on context. See Architectural Improvements below.

**4. Catalog page (`CatalogClient`) is fully client-rendered**
- **Where:** `app/[locale]/equipment/page.tsx` → `components/sections/CatalogClient.tsx`
- **Issue:** The entire catalog page is a client component. Filtered catalog URLs (e.g., `?category=forklift`) are not indexed by search engines — a major B2B SEO gap.
- **Fix:** Migrate filtering logic to use Next.js `searchParams` in a Server Component. See Architectural Improvements below.

### Medium Priority

**5. No ISR revalidation configured**
- **Where:** `app/[locale]/equipment/[slug]/page.tsx`
- **Issue:** `generateStaticParams()` is used but no `export const revalidate = X` is set. Content updates in Sanity don't propagate without a manual redeploy.
- **Fix:** Add `export const revalidate = 3600` to detail pages. For instant updates, configure a Sanity webhook to call `/api/revalidate`.

**6. No error boundaries**
- **Where:** All pages
- **Issue:** If Sanity is unreachable, pages crash without user-facing fallback.
- **Fix:** Add React error boundaries or `error.tsx` files at route segment level.

**7. No sitemap.xml / robots.txt**
- **Issue:** Missing for a site designed with SEO as a first-class concern.
- **Fix:** Add `app/sitemap.ts` (Next.js 14 native) to generate sitemap dynamically from Sanity. Add `app/robots.ts` for crawl directives.

**8. No image loading placeholders**
- **Where:** `lib/sanity.image.ts`, equipment image components
- **Issue:** Sanity images load without blur-up LQIP placeholders, causing layout shift and poor perceived performance.
- **Fix:** Use Sanity's `lqip` metadata field + Next.js `<Image blurDataURL={lqip} placeholder="blur">`.

### Low Priority

**9. Legacy static prototype files at root**
- **Files to delete:** `index.html`, `claudecodehtml/`, `css/`, `js/`, `dist/`, `schemas/product.js`, `sanity.config.js`, `sanity.cli.js`
- **Issue:** Leftover from the original static site prototype. Confusing for future developers, and `schemas/product.js` shadows the actual schema in `studio/schemas/`.
- **Fix:** Delete all listed files/directories. They are not referenced by the Next.js build.

**10. Legacy non-localized route stubs**
- **Files:** `app/equipment/page.tsx`, `app/equipment/[slug]/page.tsx`, `app/equipment/not-found.tsx`
- **Issue:** Redirect stubs kept "just in case." Once production traffic confirms `/en/` routes work, these can be removed.
- **Fix:** Confirm no inbound links to `/equipment/...` in production analytics, then delete.

**11. No analytics / error tracking**
- **Issue:** No visibility into user behavior, conversion rates, or production errors.
- **Fix:** Add Vercel Analytics (zero-config), Google Tag Manager, and Sentry (or Vercel error tracking).

---

## Architectural Improvements

### Improvement 1: Server-Side Catalog Filtering (SEO + Performance)

**Problem:** `CatalogClient` is a full client component; filtered URLs aren't indexed.

**Approach:**
```tsx
// app/[locale]/equipment/page.tsx — convert to Server Component
export default async function EquipmentPage({
  searchParams,
}: {
  searchParams: { category?: string; brand?: string; capacity?: string }
}) {
  const equipment = await getFilteredEquipment(searchParams);
  return <EquipmentCatalog equipment={equipment} />;
}
```

Sanity's GROQ `getFilteredEquipment()` already accepts filter params — just move the invocation to the server. Keep client interactivity for filter UI via shallow navigation (`router.push` with updated query string). This gives SSR'd filtered pages that Google can index.

---

### Improvement 2: Bilingual Sanity Content Fields

**Problem:** GROQ queries return English-only content regardless of locale.

**Approach — add locale fields to schema:**
```typescript
// studio/schemas/equipment.ts — add to fields array
{ name: 'titleZh', title: '标题 (Chinese)', type: 'string' },
{ name: 'descriptionZh', title: '描述 (Chinese)', type: 'text' },
{ name: 'specsZh', title: '规格 (Chinese)', type: 'array', of: [{ type: 'string' }] },
```

**Update GROQ queries to pass locale:**
```typescript
// lib/sanity.queries.ts
export function getEquipmentBySlug(slug: string, locale: string) {
  return groq`*[_type == "equipment" && slug.current == $slug][0]{
    ...,
    "displayTitle": select($locale == "zh" && defined(titleZh) => titleZh, title),
    "displayDescription": select($locale == "zh" && defined(descriptionZh) => descriptionZh, description),
  }`;
}
```

This approach is non-breaking: English fields remain the authoritative source; Chinese fields are optional enhancements.

---

### Improvement 3: ISR + Sanity Webhook for Live Content Updates

**Problem:** Content editors must trigger a Vercel redeploy to see published changes.

**Approach:**
```typescript
// app/[locale]/equipment/[slug]/page.tsx
export const revalidate = 3600; // fallback: rebuild every hour

// app/api/revalidate/route.ts — new file
import { revalidatePath } from 'next/cache';
export async function POST(req: Request) {
  const secret = req.headers.get('x-webhook-secret');
  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { slug } = await req.json();
  revalidatePath(`/en/equipment/${slug}`);
  revalidatePath(`/zh/equipment/${slug}`);
  revalidatePath('/en');
  revalidatePath('/zh');
  return Response.json({ revalidated: true });
}
```

In Sanity Dashboard → API → Webhooks:
- URL: `https://wanshing.com/api/revalidate`
- Trigger: `document.published` on `equipment` type
- Header: `x-webhook-secret: <SANITY_WEBHOOK_SECRET>`

Add `SANITY_WEBHOOK_SECRET` to Vercel environment variables.

---

## Resuming Development (Claude CoWork Instructions)

When reconnecting to this project, here is the recommended next session agenda:

### Session A — Stabilize Build & Clean Up (1–2 hours)
1. Fix jiti override: move from `vercel.json` buildCommand to `package.json` `overrides`
2. Test `npm install` without `--force`; remove force flag if successful
3. Delete legacy static prototype files: `index.html`, `claudecodehtml/`, `css/`, `js/`, `dist/`, `schemas/product.js`, `sanity.config.js`, `sanity.cli.js`
4. Add `export const revalidate = 3600` to home and equipment pages

### Session B — SEO & Content (2–3 hours)
1. Convert `CatalogClient` to server-side filtering via `searchParams`
2. Add `app/sitemap.ts` (dynamic from Sanity) and `app/robots.ts`
3. Add `titleZh` / `descriptionZh` / `specsZh` to Sanity schema
4. Update GROQ queries to be locale-aware
5. Add a handful of test equipment entries with Chinese translations in Sanity Studio

### Session C — Production Hardening (1–2 hours)
1. Add `error.tsx` files at route segment level
2. Add blur placeholder support to equipment images via Sanity LQIP
3. Configure Sanity webhook → `/api/revalidate` for on-demand ISR
4. Add Vercel Analytics (one import, zero config)
5. WeChat button integration (Phase 8)

---

---

## Staff Engineer Audit — Sanity Schemas & Tailwind (2026-04-01)

*This section was produced by a dual-review: independent analysis + Codex staff-engineer review. Both reviews were compared and reconciled before writing.*

---

### Audit Framework (Three-Pass Approach)

Rather than file-by-file critique, address these in order:

1. **Canonical content model** — Resolve schema governance, remove stale types, centralize taxonomy
2. **Localization strategy** — Decide schema-level: English-only vs. localized fields; align queries and routes
3. **Styling system** — Treat `tailwind.config.js` + `globals.css` as one system; fix duplication, migrate fonts

---

### Finding 1: Duplicate Animation Definitions (Behavioral Bug)

**Severity: High**

`tailwind.config.js` and `app/globals.css` define the same animation names with *different values*:

| Animation | tailwind.config.js | globals.css |
|-----------|-------------------|------------|
| `fade-up` / `fadeUp` | `translateY(30px)`, 0.8s | `translateY(24px)`, 0.6s |
| `scale-in` / `scaleIn` | `scale(0.92)` | `scale(0.95)` |
| `slide-right` | `translateX(-40px)` | `translateX(-20px)` |

Components using `animate-fade-up` get different behavior depending on which CSS wins at runtime. This is a silent inconsistency bug.

**Fix:** Delete the `@keyframes` blocks and `.animate-*` utility classes from `globals.css` entirely. The Tailwind config definitions via `keyframes` + `animation` are the canonical source. The globals.css versions are dead code from an earlier prototype.

---

### Finding 2: Google Fonts `@import` Should Be `next/font`

**Severity: High (Core Web Vitals)**

`app/globals.css` line 6:
```css
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:...');
```

This is a render-blocking external request on every page load. In Next.js 14, `next/font/google` is the correct approach:
- Self-hosts font files at build time (no external request at runtime)
- Eliminates layout shift with built-in `size-adjust` and `font-display: swap`
- Improves LCP, CLS, and Lighthouse scores

**Fix:** Remove the `@import` from `globals.css`. In `app/layout.tsx`, load fonts via `next/font/google` and pass the generated CSS variable to the `<html>` tag. Example:
```typescript
import { DM_Sans, Space_Grotesk, Instrument_Serif } from 'next/font/google'

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-body' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' })
const instrumentSerif = Instrument_Serif({ weight: ['400'], style: ['normal', 'italic'], subsets: ['latin'], variable: '--font-accent' })
```
Then in `tailwind.config.js`, reference the CSS variables: `fontFamily: { body: ['var(--font-body)', 'sans-serif'] }`.

---

### Finding 3: Stale `schemas/product.js` Schema

**Severity: Medium (Governance)**

`schemas/product.js` at the project root is a 4-field prototype schema (title, description, price as `number`, images without hotspot). It is NOT registered in `studio/schemas/index.ts` — it has zero effect on the live Sanity Studio. But it creates long-term confusion about the canonical content model.

**Fix:** Delete `schemas/product.js`. The canonical schema is `studio/schemas/equipment.ts`.

---

### Finding 4: Taxonomy Enums Duplicated Across Four Files

**Severity: Medium (Maintainability)**

Categories, brands, fuel types, and capacity buckets are independently defined in:
- `studio/schemas/equipment.ts` (Sanity schema options)
- `types/equipment.ts` (TypeScript union types)
- `components/sections/CatalogClient.tsx` (filter UI labels)
- `lib/sanity.queries.ts` (capacity range parsing)

When a new brand or category is added, all four files must be updated in sync. One missed update creates a silent mismatch between what editors can enter and what filters can query.

**Fix:** Create `lib/taxonomy.ts` as a single source of truth:
```typescript
export const CATEGORIES = [
  { value: 'forklift', label: 'Forklift' },
  { value: 'reach-truck', label: 'Reach Truck' },
  // ...
] as const

export type CategoryValue = typeof CATEGORIES[number]['value']
```
Import `CATEGORIES` into the Sanity schema options, TypeScript types, and filter UI. Add to `CatalogFilters` type validation.

> **Note on slug values:** Current category/brand values are camelCase (`reachTruck`, `wsForklifts`), which appear ugly in filter URLs. When creating `taxonomy.ts`, switch stored values to kebab-case (`reach-truck`, `ws-forklifts`). This requires a one-time Sanity dataset migration.

---

### Finding 5: `getEquipmentCountByCategory` Fetches All Documents

**Severity: Low-Medium**

`lib/sanity.queries.ts` fetches every equipment document (just the `category` field) and counts in JavaScript. At current catalog scale this is fine, but it's an O(n) memory fetch that grows with catalog size.

**Better approach:** Use GROQ's `count()` per category:
```groq
{
  "forklift": count(*[_type == "equipment" && category == "forklift"]),
  "reachTruck": count(*[_type == "equipment" && category == "reachTruck"]),
  // ...
}
```
Or, once taxonomy is centralized, generate this query dynamically from `CATEGORIES`. One GROQ round-trip returns all counts.

---

### Finding 6: Localization Strategy Must Be a Schema Decision

**Severity: Medium (Architecture)**

The current architecture routes traffic to `/en/` and `/zh/` via next-intl, but Sanity content is English-only. The ZH locale wraps English product data in a Chinese UI shell — a half-translated experience.

**This is not fixable at the query layer alone.** The decision is binary:

| Option | Tradeoff |
|--------|----------|
| **A: English-only content, localized UI only** | Simplest. Accept that product titles/specs are English everywhere. Good if Western buyers are primary audience. |
| **B: Localized Sanity fields** | Add `titleZh`, `descriptionZh`, `specsZh` to equipment schema. Update GROQ queries to pass locale and select appropriate field. Requires content editors to maintain two versions. |

**Recommendation:** Start with Option A explicitly. Document the decision in `docs/specs.md` so no future developer adds a ZH locale route assuming content is translated. Revisit Option B when a Chinese-speaking content editor is available.

---

### Finding 7: Minor Schema Issues

| Issue | Location | Fix |
|-------|----------|-----|
| `capacity` allows `min(0)` — zero-capacity equipment is invalid | `studio/schemas/equipment.ts:135` | Change to `Rule.min(1)` |
| `(Rule: any)` bypasses TypeScript on image alt validation | `studio/schemas/equipment.ts:177` | Use `import type { StringRule } from 'sanity'` and type the parameter properly |
| `brand` field has no `layout` option (renders as dropdown) | `studio/schemas/equipment.ts:74` | Add `layout: 'radio'` for consistency with category/fuelType, or keep dropdown intentionally |
| `BRAND_LABELS` constant declared after use in `preview.prepare()` | `studio/schemas/equipment.ts:204` | Move to top of file for readability (not a runtime bug — `prepare()` is called lazily) |

---

### Finding 8: Tailwind `steel` = Slate (Cosmetic Redundancy)

**Severity: Low**

The `steel` color scale in `tailwind.config.js` is byte-for-byte identical to Tailwind's built-in `slate` palette. It works but creates false brand differentiation and adds 11 extra color token definitions.

**Options:** (a) Remove `steel` and migrate class names to `slate-*` — clean but requires a find-and-replace across all components. (b) Keep as-is — it's harmless and `steel` reads more industrially appropriate for a machinery brand. Recommended: keep as-is unless a refactor is already underway.

---

### Finding 9: No `prefers-reduced-motion` Handling

**Severity: Low (Accessibility)**

All 8 entrance animations (`fade-up`, `slide-right`, `scale-in`, `marquee`) run unconditionally. Users with vestibular disorders who set `prefers-reduced-motion: reduce` still get full animations.

**Fix:** Add to `globals.css`:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

### Recommended Action Order

| Priority | Action | Effort |
|----------|--------|--------|
| 1 | Delete duplicate `@keyframes` from `globals.css` | 15 min |
| 2 | Migrate Google Fonts `@import` → `next/font/google` in `layout.tsx` | 30 min |
| 3 | Delete `schemas/product.js` legacy file | 2 min |
| 4 | Create `lib/taxonomy.ts` and import into schema + types + UI | 2 hr |
| 5 | Document localization strategy decision in `docs/specs.md` | 15 min |
| 6 | Fix `getEquipmentCountByCategory` to use GROQ count() | 30 min |
| 7 | Fix minor schema issues (capacity min, Rule type) | 15 min |
| 8 | Add `prefers-reduced-motion` CSS rule | 10 min |

---

## File Reference

| What you need | Where it is |
|---------------|-------------|
| All GROQ queries | `lib/sanity.queries.ts` |
| Sanity schema | `studio/schemas/equipment.ts` |
| Email templates | `lib/email.ts` |
| Quote server action | `app/actions/quote.ts` |
| i18n config | `i18n/config.ts` |
| Translation strings | `messages/en.json`, `messages/zh.json` |
| Locale routing | `middleware.ts`, `lib/navigation.ts` |
| Brand tokens | `tailwind.config.js` |
| Tech spec (authoritative) | `docs/specs.md` |
| Build workaround | `vercel.json` (see Technical Debt #1) |
