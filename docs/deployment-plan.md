# WanShing Machinery — Deployment Plan (2026-04-01)

## Project Overview
Next.js 14.2.29 App Router site for WanShing Machinery (wanshing.com), a Vancouver-based forklift dealer. Deploying to Vercel (team: team_PHfdWx8wYmkCYAtEJ7HqnSkg, repo: ericjincheng/wanshing-site, branch: main). No live site risk — Vercel project has `"live": false`.

**Stack:** Next.js 14 App Router · next-intl (EN/ZH) · Tailwind CSS (CJS config) · Sanity CMS · Resend email · next/font/google

---

## Current State

### Build Fix (commit 0c8ad68f — NOT YET PUSHED)
Root cause of all prior build failures: `tailwindcss` does a `require("jiti")` at the top of `lib/lib/load-config.js`. jiti@2 (no `lib/index.js`) breaks it. Fix: pin `jiti@1.21.7` in `devDependencies` + `overrides`.

Prior builds also ran a second `npm install jiti@1.21.7` in `buildCommand`, which wiped 314 packages regardless of flags. Latest commit removes that second install — `buildCommand` is now just `"npm run build"`.

**vercel.json (current):**
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install --legacy-peer-deps",
  "regions": ["iad1"]
}
```

**package.json overrides:**
```json
"devDependencies": { "jiti": "1.21.7" },
"overrides": { "jiti": "1.21.7", "postcss-load-config": "4.0.2" }
```

### File Structure (verified)
- `app/layout.tsx` — root layout: `html lang={locale}` via `getLocale()`, 3 Google fonts via CSS variables, `globals.css`
- `app/[locale]/layout.tsx` — NextIntlClientProvider, locale guard
- `app/[locale]/page.tsx` — homepage, ISR `revalidate=3600`, Sanity data fetch
- `app/[locale]/equipment/page.tsx` — catalog page, dynamic (searchParams), Suspense-wrapped CatalogClient ✅ fixed
- `app/[locale]/equipment/[slug]/page.tsx` — detail page, ISR `revalidate=3600`, `generateStaticParams` with error handling ✅ fixed
- `app/[locale]/not-found.tsx` — 404 page, translation key fixed ✅ fixed
- `app/actions/quote.ts` — server action for Resend email
- `lib/sanity.queries.ts` — all query functions; `getEquipmentCountByCategory` is dead code (unused)
- `lib/navigation.ts` — locale-aware Link, router, usePathname via `createNavigation()`
- `components/layout/` — Header (locale-aware router), Footer, TopBar
- `components/sections/` — HeroSection, QuickSearch (locale-aware router), EquipmentGrid, TrustSection, ServicesSection, QuoteSection, CatalogClient
- `i18n/config.ts` — locales: ['en', 'zh'], defaultLocale: 'en'
- `middleware.ts` — next-intl middleware, `localePrefix: 'always'`
- `messages/en.json`, `messages/zh.json` — all translation keys present

---

## Issues Found & Fixed (Code Review)

### ✅ FIXED — `not-found.tsx` translation key mismatch
**File:** `app/[locale]/not-found.tsx` line 19

`t('goHome')` was called but both `en.json` and `zh.json` define the key as `backHome`. Fixed to `t('backHome')`.

### ✅ FIXED — `CatalogClient` uses `useSearchParams()` without `<Suspense>`
**File:** `app/[locale]/equipment/page.tsx`

`CatalogClient` is a `'use client'` component using `useSearchParams()`. Next.js 14 requires all client components calling `useSearchParams()` to be wrapped in a `<Suspense>` boundary. Without it: build warning + `useSearchParams()` returns null on SSR, crashing `searchParams.toString()`. Wrapped in `<Suspense fallback={...}>`.

### ✅ FIXED — Breadcrumb links not locale-aware
**File:** `app/[locale]/equipment/[slug]/page.tsx` lines 69–71

`href="/"` and `href="/#equipment"` caused extra redirects with `localePrefix: 'always'`. Fixed to `/${params.locale}` and `/${params.locale}/equipment`.

### ✅ FIXED — `generateStaticParams` had no Sanity error handling
**File:** `app/[locale]/equipment/[slug]/page.tsx`

If Sanity is unreachable at build time, `getAllEquipmentSlugs()` would throw and fail the build. Wrapped in try/catch returning `[]` — pages fall back to on-demand generation via ISR.

### INFORMATIONAL — `revalidate=3600` on catalog page is a no-op
**File:** `app/[locale]/equipment/page.tsx` line 1

`searchParams` forces dynamic rendering in Next.js 14, making the static revalidation ineffective. The directive still applies to underlying `fetch()` cache. Not a bug, just misleading.

### INFORMATIONAL — Vercel environment variables not yet confirmed
The following env vars must be set in Vercel:
- `NEXT_PUBLIC_SANITY_PROJECT_ID` (has fallback `'7rppd6fc'`)
- `NEXT_PUBLIC_SANITY_DATASET` (has fallback `'production'`)
- `RESEND_API_KEY` (guarded — email returns error if missing, not a build failure)
- `RESEND_FROM_ADDRESS` (has fallback `'noreply@wanshing.com'`)
- `SALES_EMAIL` (has fallback `'sales@wanshing.com'`)

Build will succeed without any of these. Email won't work until `RESEND_API_KEY` is set.

### INFORMATIONAL — `getEquipmentCountByCategory` is dead code
**File:** `lib/sanity.queries.ts` lines 158–168

Not imported anywhere. Also inefficient — fetches all docs to count by category in JS instead of GROQ aggregation. Can be removed or replaced when filter badges are built.

---

## Immediate Next Steps

### Step 1 — Push (commit 0c8ad68f + fixes above)
```bash
cd "WS Website"
git add app/[locale]/equipment/page.tsx app/[locale]/equipment/[slug]/page.tsx app/[locale]/not-found.tsx
git commit -m "fix: Suspense boundary for CatalogClient, breadcrumb locale links, 404 translation key, generateStaticParams error handling"
git push origin main
```
This triggers a new Vercel build.

### Step 2 — Fetch build logs
Via Vercel MCP:
1. `list_deployments` (teamId: `team_PHfdWx8wYmkCYAtEJ7HqnSkg`) → get new deployment ID
2. `get_deployment_build_logs` with that ID

---

## Post-Green-Build Tasks

### Phase A — Domain & Verification
1. Add `wanshing.com` as custom domain in Vercel dashboard
2. Set Vercel env vars: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `RESEND_API_KEY`, `RESEND_FROM_ADDRESS`, `SALES_EMAIL`
3. Verify `/en` and `/zh` routes and language toggle
4. Test quote form end-to-end

### Phase B — SEO Infrastructure
1. `app/sitemap.ts` — dynamic sitemap including all equipment slugs × locales
2. `app/robots.ts` — robots.txt pointing to sitemap

### Phase C — Session B Features
1. Bilingual Sanity fields (`title_zh`, `description_zh`) on equipment schema
2. Remove or fix `getEquipmentCountByCategory` when filter pill badges are built
3. Resend email domain verification for wanshing.com
