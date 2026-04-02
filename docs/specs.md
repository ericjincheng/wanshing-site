# WanShing Machinery — Technical Specs

> Authoritative reference for all developers on this project.
> **Always read this before starting a new task.**

---

## Stack

| Layer       | Technology                    | Version  |
|-------------|-------------------------------|----------|
| Framework   | Next.js (App Router)          | 14.2.29  |
| Styling     | Tailwind CSS                  | 3.4.x    |
| CMS         | Sanity.io                     | 3.36.x   |
| Language    | TypeScript                    | 5.x      |
| Email       | Resend                        | 3.5.x    |
| Deployment  | Vercel                        | —        |
| i18n        | next-intl (Phase 5)           | 3.26.x   |

---

## File Conventions

```
/app              Next.js pages and layouts (App Router)
/components
  /layout         TopBar · Header · Footer
  /sections       Page sections (HeroSection, EquipmentGrid, …)
  /ui             Reusable primitives (buttons, badges, etc.) — Phase 3+
/lib
  sanity.client.ts    Sanity client (projectId, dataset, apiVersion)
  sanity.image.ts     urlForImage() helper
  sanity.queries.ts   All GROQ queries — add new ones here, never inline
/studio           Sanity Studio (its own package.json + sanity.config.ts)
  /schemas        One file per document type
/types            Shared TypeScript interfaces
/public           Static assets (images, logos)
/docs             This file + architecture notes
```

---

## Sanity Configuration

- **Project ID:** `7rppd6fc`
- **Dataset:** `production`
- **Studio route:** run `npm run studio` from repo root (runs `cd studio && npx sanity dev`)
- **API version:** `2024-01-01`

### Schema: `equipment`

| Field           | Type      | Required | Notes                                        |
|-----------------|-----------|----------|----------------------------------------------|
| `title`         | string    | ✅       | Max 120 chars                                |
| `slug`          | slug      | ✅       | Auto-generated from title                    |
| `category`      | string    | ✅       | Enum — see `EquipmentCategory` type          |
| `brand`         | string    | ✅       | Enum — see `EquipmentBrand` type             |
| `fuelType`      | string    | ✅       | lpg / electric / diesel / gasoline / hybrid  |
| `status`        | string    | —        | inStock / newArrival / bestSeller / comingSoon |
| `featured`      | boolean   | —        | Shows on homepage grid                       |
| `capacity`      | number    | —        | In lbs                                       |
| `specs`         | string[]  | —        | Max 10, keep each under 60 chars             |
| `description`   | text      | —        | B2B prose for detail page                    |
| `price`         | string    | —        | Display only, e.g. "From $18,500 CAD"        |
| `images`        | image[]   | —        | Max 8; first image used as thumbnail         |
| `seoTitle`      | string    | —        | Max 60 chars; falls back to title            |
| `seoDescription`| text      | —        | Max 160 chars                                |

---

## Design Tokens (Tailwind)

| Token            | Value       | Usage                        |
|------------------|-------------|------------------------------|
| `ws-red`         | `#C8102E`   | Brand primary, CTAs          |
| `ws-red-light`   | `#E0253F`   | Hover state                  |
| `ws-red-dark`    | `#A00D24`   | Active / pressed state       |
| `steel-900`      | `#0F172A`   | Dark section background      |
| `steel-800`      | `#1E293B`   | Header background            |
| `steel-50`       | `#F8FAFC`   | Page background              |
| `font-display`   | Space Grotesk | Headlines, nav, CTAs       |
| `font-body`      | DM Sans     | Body copy                    |
| `font-accent`    | Instrument Serif | Italic accent text      |

---

## Routes

| Route                    | Type           | Data Source            |
|--------------------------|----------------|------------------------|
| `/`                      | Server (async) | `getFeaturedEquipment` |
| `/equipment`             | Server (async) | `getFilteredEquipment` |
| `/equipment/[slug]`      | Server (async) | `getEquipmentBySlug`   |

---

## Email System (Phase 4)

- **Provider:** Resend (`resend` npm package, server-side only)
- **Server action:** `app/actions/quote.ts` → `submitQuoteForm(prevState, formData)`
- **Templates:** `lib/email.ts` → `internalInquiryEmail()` + `customerConfirmEmail()`
- **Form component:** `components/sections/QuoteSection.tsx` — uses `useFormState` + `useFormStatus`
- **Required env vars:** `RESEND_API_KEY`, `RESEND_FROM_ADDRESS`, `SALES_EMAIL`
- **Domain setup:** Verify `wanshing.com` in Resend dashboard. Until verified, Resend restricts sending to the account owner's email only.
- **Flow:** validate → send internal inquiry email → send customer confirmation → show animated success state

## Completed Phases

- ✅ **Phase 1** — Env setup, CLI installs, folder restructure
- ✅ **Phase 2** — Next.js 14 scaffold, Tailwind tokens, Sanity schema, lib/queries, all section components
- ✅ **Phase 3** — Equipment catalog page, URL-based filtering, interactive sidebar, 404 pages
- ✅ **Phase 4** — Quote form server action, Resend email delivery, branded templates, field validation
- ✅ **Phase 5** — i18n with next-intl (EN / 中文)

## Phase 5 — i18n Architecture

| File | Role |
|------|------|
| `i18n/config.ts` | `locales = ['en', 'zh']`, `defaultLocale = 'en'` |
| `i18n/request.ts` | `getRequestConfig` — loads `messages/${locale}.json` |
| `middleware.ts` | `createMiddleware({ locales, defaultLocale, localePrefix: 'always' })` |
| `next.config.ts` | Wrapped with `createNextIntlPlugin('./i18n/request.ts')` |
| `messages/en.json` | English strings for all UI sections |
| `messages/zh.json` | Simplified Chinese strings for all UI sections |
| `lib/navigation.ts` | `createNavigation({ locales })` — locale-aware `Link`, `useRouter`, `usePathname` |

### Route Structure

All pages now live under `app/[locale]/`:

| Route | File |
|-------|------|
| `/en` · `/zh` | `app/[locale]/page.tsx` |
| `/en/equipment` · `/zh/equipment` | `app/[locale]/equipment/page.tsx` |
| `/en/equipment/[slug]` · `/zh/equipment/[slug]` | `app/[locale]/equipment/[slug]/page.tsx` |

- Root `app/layout.tsx` reads locale via `getLocale()` to set `<html lang>`.
- `app/[locale]/layout.tsx` validates locale + wraps with `NextIntlClientProvider`.
- Old `app/page.tsx` and `app/equipment/...` stubs redirect to `/en/...` as a safety net.
- Language toggle in `Header.tsx` calls `router.replace(pathname, { locale })` from `@/lib/navigation`.

### Translation Usage

- **Server components**: `import { getTranslations } from 'next-intl/server'` → `const t = await getTranslations('namespace')`
- **Client components**: `import { useTranslations } from 'next-intl'` → `const t = useTranslations('namespace')`
- Navigation in client components: use `useRouter` / `usePathname` from `@/lib/navigation` (locale-aware).
- Navigation in client components that only push URLs (QuickSearch, CatalogClient): use `useRouter` from `@/lib/navigation`.

- ✅ **Phase 6** — Vercel deployment setup (see guide below)
- ✅ **Phase 7** — iMessage + WhatsApp contact buttons in QuoteSection

## Phase 6 — Vercel Deployment Guide

### One-time setup (do this once from your terminal)

```bash
# 1. Push all code to GitHub
cd "WS Website"
git add -A
git commit -m "Phase 5+7: i18n EN/ZH + iMessage contact button"
git push origin main
```

### Import project on Vercel

1. Go to **vercel.com** → **Add New Project**
2. Import from GitHub → select `ericjincheng/wanshing-site`
3. **Root Directory**: leave blank (repo root IS the Next.js project)
4. Framework: auto-detected as **Next.js**
5. Click **Deploy** (first deploy will fail — env vars need to be set first)

### Required environment variables (Vercel Dashboard → Settings → Environment Variables)

| Variable | Value | Notes |
|----------|-------|-------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `7rppd6fc` | Safe to expose |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Safe to expose |
| `RESEND_API_KEY` | `re_...` | From resend.com → API Keys |
| `RESEND_FROM_ADDRESS` | `noreply@wanshing.com` | Must be on verified domain |
| `SALES_EMAIL` | `sales@wanshing.com` | Where inquiries are delivered |

After adding env vars, click **Redeploy**.

### Domain setup

1. Vercel Dashboard → Project → Settings → Domains → Add `wanshing.com`
2. Add the DNS records Vercel shows to your domain registrar
3. Vercel provisions SSL automatically

### Sanity CORS (required for production)

In [sanity.io/manage](https://sanity.io/manage) → Project `7rppd6fc` → API → CORS Origins:
- Add `https://wanshing.com` (allow credentials: off)
- Add `https://www.wanshing.com` (allow credentials: off)

## Phase 7 — Contact Buttons

- **iMessage** (`sms:+16042292988`) and **WhatsApp** (`https://wa.me/16042292988`) links added to the QuoteSection alternative-contact row
- WeChat deferred to a future phase (requires QR code asset)
