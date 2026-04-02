# PROJECT_BRAIN.md — WanShing Machinery
**The Autonomous Manual for Claude Code**

> **Read this first on every new session.** This document is the single source of ground truth for the WanShing Machinery website project. Every code change, deployment, and design decision must be checked against it — and it must be updated after every successful deployment.

---

## 0. Quick-Start Checklist (New Session)

1. Read this document top to bottom.
2. `cd "/c/Users/ericj/Documents/AI Projects/WanShing Machinery/WS Website"`
3. Check `git status` — never start work on a dirty tree.
4. Read the current state of any file you plan to edit before touching it.
5. After a successful `git push`, update the **Deployment Log** section at the bottom.

---

## 1. Tech Stack DNA

### Core Frameworks
| Layer | Technology | Version | Notes |
|-------|-----------|---------|-------|
| Frontend | Next.js (App Router) | 14.2.29 | Server Components + Client Components hybrid |
| Styling | Tailwind CSS | 3.4.17 | Custom tokens in `tailwind.config.js` |
| CMS | Sanity.io | @sanity/client 6.22.5 | Headless CMS, project `7rppd6fc` |
| i18n | next-intl | 3.26.3 | EN / 中文, always-on locale prefix |
| Email | Resend | 3.5.0 | Quote form → server action → 2 emails |
| Language | TypeScript | 5.x | Strict mode, path alias `@/` |
| Runtime | Node.js (Vercel) | Latest LTS | Serverless functions |

### Fonts (Google via `next/font`)
| CSS Variable | Font | Use |
|---|---|---|
| `--font-body` | DM Sans | Body copy, UI text |
| `--font-display` | Space Grotesk | Headings, nav, CTAs |
| `--font-accent` | Instrument Serif | Italic accent phrases in headlines |

Fonts are loaded in `app/layout.tsx` and applied via CSS variables in `tailwind.config.js`.

### Deployment Pipeline
```
Local edit → git push origin master
    → GitHub webhook triggers Vercel
    → Vercel runs: npm install --legacy-peer-deps
    → Vercel runs: npm run build (next build)
    → Auto-deploy to: https://wanshing-site.vercel.app
    → Custom domain target: wanshing.com (configure in Vercel Dashboard → Domains)
```

**Build config (`vercel.json`):**
- Framework: `nextjs`
- Install: `npm install --legacy-peer-deps` (required for jiti peer dep resolution)
- Build: `npm run build`
- Region: `iad1` (US East)
- `jiti` pinned to `1.21.7` via `package.json` overrides (prevents Vercel from pulling jiti@2)

---

## 2. Repository & Access

| Resource | Value |
|---|---|
| **GitHub** | https://github.com/ericjincheng/wanshing-site |
| **Branch** | `master` |
| **Local path** | `C:\Users\ericj\Documents\AI Projects\WanShing Machinery\WS Website` |
| **Live URL** | https://wanshing-site.vercel.app/en |
| **Sanity Studio (cloud)** | https://wanshing.sanity.dev/studio |
| **Sanity Studio (local)** | `npm run studio` → http://localhost:3333 |
| **Sanity Project ID** | `7rppd6fc` |
| **Sanity Dataset** | `production` |

---

## 3. Environment Variables

### Local (`.env.local`)
```env
# Safe to have in file (public values)
NEXT_PUBLIC_SANITY_PROJECT_ID=7rppd6fc
NEXT_PUBLIC_SANITY_DATASET=production

# Optional — only needed for draft previews
SANITY_API_TOKEN=   ← currently empty
```

### Vercel Dashboard (must be set there, NEVER committed)
| Variable | Value | Notes |
|---|---|---|
| `RESEND_API_KEY` | *(secret)* | From resend.com — required for quote form emails |
| `RESEND_FROM_ADDRESS` | `noreply@wanshing.com` | Must be verified domain in Resend |
| `SALES_EMAIL` | `sales@wanshing.com` | Receives inbound inquiry emails |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `7rppd6fc` | Mirror from .env.local |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Mirror from .env.local |

**Quote form email flow:** Customer submits → `app/actions/quote.ts` (server action) validates → Resend sends 2 emails: (1) internal alert to `SALES_EMAIL`, (2) auto-reply to customer.

---

## 4. Structural Map — Component by Component

### Route Architecture
```
app/
├── layout.tsx                   ← Root: fonts, metadata, <html lang>
├── globals.css                  ← Tailwind layers + custom classes
├── page.tsx                     ← Redirect stub (non-localized root)
├── not-found.tsx                ← 404 (non-localized)
├── actions/
│   └── quote.ts                 ← Server Action: form validation + Resend emails
├── equipment/                   ← Non-localized stubs (redirect to /en/equipment/*)
│   ├── page.tsx
│   └── [slug]/
│       ├── page.tsx
│       └── not-found.tsx
└── [locale]/                    ← Locale-prefixed routes (/en/*, /zh/*)
    ├── layout.tsx               ← NextIntlClientProvider wrapper
    ├── page.tsx                 ← Homepage (ISR revalidate=3600)
    ├── not-found.tsx            ← 404 localized
    └── equipment/
        ├── page.tsx             ← Catalog page (ISR, server-side filter via searchParams)
        └── [slug]/
            ├── page.tsx         ← Equipment detail (generateStaticParams + ISR)
            └── not-found.tsx
```

### Component Map

#### Layout Shell
| Component | Path | Type | Purpose |
|---|---|---|---|
| `TopBar` | `components/layout/TopBar.tsx` | Client | Thin bar: email, phone, hours, region. Hidden mobile. |
| `Header` | `components/layout/Header.tsx` | Client | Sticky nav: logo, nav links, EN/ZH toggle, CTA. Scroll-blur effect. |
| `Footer` | `components/layout/Footer.tsx` | Server | 4-col grid: brand, equipment links, service links, contact. |

#### Homepage Sections (rendered in order in `app/[locale]/page.tsx`)
| Section | Path | Type | Data Source | Purpose |
|---|---|---|---|---|
| `HeroSection` | `components/sections/HeroSection.tsx` | Server | i18n only | Full-bleed dark hero, SVG forklift placeholder, floating review widget |
| `QuickSearch` | `components/sections/QuickSearch.tsx` | Client | None | 3 selects (category, brand, capacity) + submit → `/equipment?filters` |
| `EquipmentGrid` | `components/sections/EquipmentGrid.tsx` | Server | Sanity (featured, max 8) | Homepage catalog grid. Falls back to `PlaceholderGrid` if Sanity empty |
| `TrustSection` | `components/sections/TrustSection.tsx` | Server | i18n only | Stats row (30+yrs, 2 warehouses, 15K+ units, 4.9★) + 4 value prop cards |
| `ServicesSection` | `components/sections/ServicesSection.tsx` | Server | i18n only | 3 service cards: Maintenance, Parts, Financing |
| `QuoteSection` | `components/sections/QuoteSection.tsx` | Client | Server Action | Quote form with validation, Resend integration, iMessage + WhatsApp buttons |

#### Catalog & Detail Pages
| Component | Path | Type | Purpose |
|---|---|---|---|
| `CatalogClient` | `components/sections/CatalogClient.tsx` | Client | Sidebar filters, filter chips, result grid. Receives SSR data, updates URL via `router.push` |

#### Library (`lib/`)
| File | Purpose |
|---|---|
| `sanity.client.ts` | Sanity client singleton (CDN in prod, live in dev) |
| `sanity.queries.ts` | All GROQ queries: `getFeaturedEquipment`, `getAllEquipment`, `getFilteredEquipment`, `getEquipmentBySlug`, `searchEquipment`, `getEquipmentCountByCategory` |
| `sanity.image.ts` | `urlForImage()` helper using `@sanity/image-url` |
| `email.ts` | Two Resend HTML templates: `internalInquiryEmail`, `customerConfirmEmail` |
| `navigation.ts` | Re-exports locale-aware `Link`, `useRouter`, `usePathname` from next-intl |

#### Sanity Studio (`studio/`)
| File | Purpose |
|---|---|
| `schemas/equipment.ts` | **Canonical schema.** 15 fields: title, slug, category, brand, fuelType, status, featured, capacity, specs[], description, price, images[], seoTitle, seoDescription |
| `schemas/index.ts` | Registers equipment schema |
| `sanity.config.ts` | Studio config (project ID + dataset) |
| `sanity.cli.ts` | CLI config |

---

## 5. State & Logic Ledger

### i18n Logic
- `middleware.ts` intercepts all requests, redirects `/` → `/en`, handles locale prefix
- Locales: `['en', 'zh']` — default: `en`
- Translation files: `messages/en.json`, `messages/zh.json`
- Server components use `getTranslations()` (next-intl/server)
- Client components use `useTranslations()` (next-intl)
- **Known gap:** Sanity content (product titles, descriptions, specs) is English-only. ZH locale serves English content in a Chinese UI shell.

### Data Flow — Homepage Equipment Grid
```
Sanity CMS (featured=true) 
  → GROQ query in lib/sanity.queries.ts (getFeaturedEquipment)
  → app/[locale]/page.tsx (server, ISR revalidate=3600)
  → EquipmentGrid component (server)
  → ProductCard (renders Sanity image via urlForImage → cdn.sanity.io)
```

### Data Flow — Catalog Page
```
URL searchParams (?category=forklift&brand=zoomlion)
  → app/[locale]/equipment/page.tsx (server, ISR revalidate=3600)
  → getFilteredEquipment(filters) GROQ query
  → CatalogClient (client) — receives initialEquipment as prop
  → User changes filter → router.push(new URL) → page re-renders server-side
```

### Data Flow — Quote Form
```
User fills QuoteSection form
  → React useFormState + useFormStatus (client)
  → submitQuoteForm server action (app/actions/quote.ts)
  → validateQuoteForm() — validates name, email, interest
  → Resend.emails.send() × 2:
      (1) internalInquiryEmail → SALES_EMAIL (sales@wanshing.com)
      (2) customerConfirmEmail → user's email
  → FormState: success / error with field-level messages
```

### Header Scroll Behavior
- `useState(scrolled)` toggles `.header-scrolled` class at `scrollY > 10px`
- `.header-scrolled` CSS: `background: rgba(15,23,42,0.97)`, `backdrop-filter: blur(16px)`

### Language Toggle
- `router.replace(pathname, { locale: lang })` — swaps locale without navigation
- `activeLang` state mirrors current locale for UI feedback

---

## 6. Visual Ground Truth — Design System

### Brand Colors
| Token | HEX | Usage |
|---|---|---|
| `ws-red` | `#C8102E` | Primary brand red — CTAs, badges, icons, accents |
| `ws-red-light` | `#E0253F` | Hover states, lighter red accents |
| `ws-red-dark` | `#A00D24` | Pressed states, deeper red |
| `ws-red-50` | `#FEF2F2` | Red tint backgrounds |
| `ws-red-100` | `#FEE2E2` | Lighter red backgrounds |
| `steel-950` | `#020617` | TopBar background, darkest dark |
| `steel-900` | `#0F172A` | Header, Hero, Trust section backgrounds |
| `steel-800` | `#1E293B` | Dark card backgrounds |
| `steel-700` | `#334155` | Borders in dark contexts |
| `steel-500` | `#64748B` | Muted text |
| `steel-400` | `#94A3B8` | Placeholder text, icons |
| `steel-200` | `#E2E8F0` | Light borders |
| `steel-100` | `#F1F5F9` | Light backgrounds |
| `steel-50` | `#F8FAFC` | Page background (body) |

> **Note:** `steel` = Tailwind `slate` palette. Renamed for brand identity.

### Typography Scale
| Class | Font | Weight | Usage |
|---|---|---|---|
| `font-display` | Space Grotesk | 600–700 | All headings, nav, CTAs, section labels |
| `font-body` | DM Sans | 400–500 | Body text, descriptions, form labels |
| `font-accent` | Instrument Serif | 400 italic | Decorative headline accents only |

### Spacing & Layout
- Max content width: `max-w-7xl` (80rem / 1280px)
- Horizontal padding: `px-6` (24px)
- Section vertical padding: `py-20 lg:py-28` (standard), `py-16 lg:py-20` (compact)
- Card border radius: `rounded-xl` (12px) — standard, `rounded-2xl` (16px) — hero/modals

### Animation System (defined in `tailwind.config.js`)
| Class | Keyframe | Duration | Delay | Use |
|---|---|---|---|---|
| `animate-fade-up` | `translateY(30px) → 0` | 0.8s | 0s | Primary entry animation |
| `animate-fade-up-d1` | same | 0.8s | 0.15s | Staggered entry |
| `animate-fade-up-d2` | same | 0.8s | 0.30s | Staggered entry |
| `animate-fade-up-d3` | same | 0.8s | 0.45s | Staggered entry |
| `animate-fade-up-d4` | same | 0.8s | 0.60s | Staggered entry |
| `animate-slide-right` | `translateX(-40px) → 0` | 0.7s | 0.2s | Hero floating card |
| `animate-scale-in` | `scale(0.92) → 1` | 0.6s | 0.1s | Hero image panel |
| `animate-marquee` | `translateX(0 → -50%)` | 30s | loop | Brand marquee |

### Custom CSS Classes (`app/globals.css`)
| Class | Effect |
|---|---|
| `.grain` | SVG noise texture via `::before` pseudo-element |
| `.btn-shine` | Diagonal shine sweep on hover |
| `.nav-link` | Red underline slide-in on hover |
| `.product-card` | `translateY(-6px)` lift + shadow on hover |
| `.card-img` | `scale(1.05)` zoom on parent hover |
| `.header-scrolled` | Dark glass blur effect on scroll |
| `.lang-option.active` | Red tint + red text for active language |
| `.filter-select` | Custom arrow icon via background-image |
| `.img-placeholder` | Steel gradient background for missing images |
| `.stat-block` | Right border divider between stats |

### Status Badge Colors
| Status | Color | HEX |
|---|---|---|
| `inStock` | `bg-green-500` | #22c55e |
| `newArrival` | `bg-blue-500` | #3b82f6 |
| `bestSeller` | `bg-ws-red` | #C8102E |
| `comingSoon` | `bg-steel-400` | #94A3B8 |

### Contact Information (use these exact values)
- **Email:** sales@wanshing.com
- **Phone:** +1 (604) 229-2988
- **Toll Free:** 888-855-6028
- **WhatsApp:** https://wa.me/16042292988
- **iMessage:** sms:+16042292988
- **Hours:** Mon–Sat: 8:00 AM – 6:00 PM PST
- **Locations:** Vancouver (BC) & Edmonton (AB)
- **Service area:** Canada & United States
- **Founded:** 1995 (30+ years)

---

## 7. Sanity CMS Schema Reference

### Equipment Document (`_type: "equipment"`)
| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | ✅ | max 120 chars. e.g. "WS-5000 LPG Forklift" |
| `slug` | slug | ✅ | Auto-generated from title. Used in URL: `/equipment/[slug]` |
| `category` | string enum | ✅ | `forklift` `reachTruck` `palletJack` `scissorLift` `boomLift` `electricStacker` |
| `brand` | string enum | ✅ | `wsForklifts` `zoomlion` `jac` `toyota` `mitsubishi` `komatsu` `other` |
| `fuelType` | string enum | ✅ | `lpg` `electric` `diesel` `gasoline` `hybrid` |
| `status` | string enum | No | `inStock` `newArrival` `bestSeller` `comingSoon` — controls card badge |
| `featured` | boolean | No | `true` = show on homepage grid (max 8) |
| `capacity` | number (lbs) | No | max 150,000 lbs |
| `specs` | string[] | No | max 10 bullet points, max 60 chars each |
| `description` | text | No | B2B prose, shown on detail page |
| `price` | string | No | Display string (e.g. "From $18,500 CAD") or leave blank for "Request a Quote" |
| `images` | image[] | No | max 8, hotspot enabled, alt text required |
| `seoTitle` | string | No | max 60 chars — overrides title in `<title>` |
| `seoDescription` | text | No | max 160 chars — `<meta description>` |

### GROQ Queries Available
| Function | Returns | Use |
|---|---|---|
| `getFeaturedEquipment()` | `EquipmentListItem[]` (max 8) | Homepage grid |
| `getAllEquipment(category?)` | `EquipmentListItem[]` | Full catalog, optional category filter |
| `getFilteredEquipment(filters)` | `EquipmentListItem[]` | Catalog page with category+brand+capacity filters |
| `getEquipmentBySlug(slug)` | `EquipmentItem \| null` | Detail page |
| `getAllEquipmentSlugs()` | `string[]` | `generateStaticParams` |
| `searchEquipment(query)` | `EquipmentListItem[]` (max 12) | Free-text search |
| `getEquipmentCountByCategory()` | `Record<string, number>` | Filter pill badges |

---

## 8. Access & Permissions — Agent Powers

As the autonomous engineer for this project, the agent has authorization to:

| Action | Scope | Notes |
|---|---|---|
| **Edit source files** | All files in WS Website/ | Read before editing. No blind rewrites. |
| **Push to GitHub** | `master` branch | Only after explicit user request or confirmed task completion |
| **Trigger Vercel builds** | Via `git push` | Builds auto-trigger on push to master |
| **Edit Sanity schema** | `studio/schemas/` | Validate with TypeScript before pushing |
| **Edit translation files** | `messages/en.json` `messages/zh.json` | Keep EN/ZH keys in sync |
| **Read `.env.local`** | Read-only | NEVER commit secrets. NEVER log API keys. |
| **Run local dev server** | `npm run dev` | Verify changes locally before deploying |
| **Run build check** | `npm run build` | Always run before pushing to catch TypeScript/ESLint errors |

The agent does NOT have permission to:
- Delete Sanity documents or datasets
- Change Vercel project settings unilaterally
- Modify GitHub branch protections
- Push directly to Vercel (all deploys go through GitHub → Vercel)

---

## 9. Design Agency PRD — Roadmap

### Phase 8 (Next: Immediate)
| Feature | Priority | Technical Notes |
|---|---|---|
| **WeChat Contact Button** | High | Add WeChat ID `wanshing_machinery` to QuoteSection contact methods. SVG icon + green color. |
| **Vercel Analytics** | High | One import in `app/layout.tsx`: `import { Analytics } from '@vercel/analytics/react'` then `<Analytics />`. Zero config. |
| **sitemap.xml** | High | Add `app/sitemap.ts` — dynamic from Sanity slugs + static routes. Next.js 14 native. |
| **robots.txt** | Medium | Add `app/robots.ts` — allow all, point to sitemap. |

### Phase 9 (SEO + Content)
| Feature | Priority | Technical Notes |
|---|---|---|
| **Server-side Catalog Filtering** | High | Convert `CatalogClient` filter invocation to Server Component — see `handoff.md` Architectural Improvement 1. GROQ `getFilteredEquipment` already supports it. |
| **ISR Revalidation Webhook** | High | Add `app/api/revalidate/route.ts` + Sanity webhook. See `handoff.md` Improvement 3. Add `SANITY_WEBHOOK_SECRET` to Vercel env. |
| **Image LQIP Blur Placeholders** | Medium | Use Sanity `lqip` metadata + Next.js `<Image blurDataURL placeholder="blur">`. Eliminates layout shift. |
| **Error Boundaries** | Medium | Add `error.tsx` at `app/[locale]/` and `app/[locale]/equipment/` — prevents crashes when Sanity unreachable. |
| **Bilingual Sanity Content** | Medium | Add `titleZh`, `descriptionZh`, `specsZh` fields to equipment schema. Update GROQ queries to be locale-aware. |

### Phase 10 (CRM & Reviews)
| Feature | Priority | Technical Notes |
|---|---|---|
| **Google Maps Embed** | Medium | Add to Footer or About section. Use Google Maps Embed API (no key needed for embed). Two locations: Vancouver + Edmonton. |
| **TrustIndex Reviews Widget** | Medium | TrustIndex.io embeds Google Reviews. Replace hardcoded "4.9★" in HeroSection floating card with live widget. |
| **CRM Integration** | Low | Quote form submissions → HubSpot or Pipedrive CRM via webhook in `app/actions/quote.ts`. |
| **Live Chat Widget** | Low | Intercom or Tawk.to. Add script to `app/layout.tsx`. |

### Phase 11 (Technical Debt — Priority Order)
See `handoff.md` Technical Debt section for full details. Summary:
1. Fix `jiti` workaround (currently stable with overrides — monitor)
2. Create `lib/taxonomy.ts` — single source of truth for categories/brands/fuels
3. Fix `getEquipmentCountByCategory` to use GROQ `count()` instead of fetching all docs
4. Fix minor schema issues: `capacity min(1)`, `Rule: any` typing on image alt
5. Remove legacy non-localized route stubs in `app/equipment/` once confirmed unused
6. Add `prefers-reduced-motion` CSS (already added in globals.css — DONE)

---

## 10. Operational Protocol

### Before Starting Any Task
```
1. Read PROJECT_BRAIN.md (this file)
2. git status — confirm clean working tree
3. Read the specific file(s) you'll be editing
4. Run npm run build locally (if doing significant changes)
```

### Code Quality Standards
- TypeScript strict — no `any` in new code
- All new Server Components: use `getTranslations()` from `next-intl/server`
- All new Client Components: `'use client'` directive, `useTranslations()` hook
- Tailwind only — no inline styles except SVG data URIs
- New color/animation tokens → add to `tailwind.config.js`, not `globals.css`
- Images → always `next/image` with `fill` + `sizes` for responsive optimization
- All new i18n strings → add to BOTH `messages/en.json` AND `messages/zh.json`

### Deployment Checklist
```bash
# 1. Local build check
npm run build

# 2. Lint
npm run lint

# 3. Stage and commit
git add <specific files>
git commit -m "type: description"

# 4. Push (triggers Vercel auto-deploy)
git push origin master

# 5. Monitor build at: https://vercel.com/dashboard
# 6. Verify live at: https://wanshing-site.vercel.app/en
# 7. Update Deployment Log below
```

### Common Commands
```bash
# Navigate to project
cd "/c/Users/ericj/Documents/AI Projects/WanShing Machinery/WS Website"

# Local dev
npm run dev              # http://localhost:3000
npm run studio           # Sanity Studio http://localhost:3333

# Checks
npm run build            # Full production build
npm run lint             # ESLint

# Git
git status               # Always check this first
git log --oneline -5     # Recent history
git diff HEAD            # What changed
```

---

## 11. Known Issues & Gotchas

| Issue | Severity | Status | Fix |
|---|---|---|---|
| Sanity content is English-only (ZH renders EN) | Medium | Open | Add `titleZh`/`descriptionZh` schema fields |
| `CatalogClient` is fully client-rendered (SEO gap) | High | Open | Migrate filter logic to Server Component |
| No sitemap.xml / robots.txt | High | Open | Add `app/sitemap.ts` + `app/robots.ts` |
| No error boundaries (Sanity outage = crash) | Medium | Open | Add `error.tsx` at route segments |
| No image LQIP blur placeholders | Medium | Open | Use Sanity LQIP + Next.js `placeholder="blur"` |
| `getEquipmentCountByCategory` is O(n) | Low | Open | Use GROQ `count()` |
| HeroSection uses SVG forklift placeholder (no real photo) | Medium | Open | Replace with real product image from Sanity |
| `capacity` field allows `min(0)` in schema | Low | Open | Change to `min(1)` |
| Equipment detail pages have no `revalidate` set | Medium | Open | Add `export const revalidate = 3600` |
| Legacy `app/equipment/` stub routes | Low | Open | Delete after confirming no inbound links |

---

## 12. Deployment Log

> Update this section after every successful `git push` + Vercel build.

| Date | Commit | Changes | Deployed By |
|---|---|---|---|
| 2026-04-01 | `311788ab` | Fix: exclude studio/ from Next.js tsconfig | Claude Code |
| 2026-04-01 | `ba03be02` | Fix: jiti pinning, next/font migration, remove legacy files, ISR revalidate | Claude Code |
| 2026-04-02 | — | `PROJECT_BRAIN.md` created (no code change) | Claude Code |
| 2026-04-02 | `5a5e0c5c` | feat: white header, WS logo, steel-900 nav text | Claude Code |
| 2026-04-02 | `2d8e1a17` | fix: header-scrolled reverts to dark navy — updated to white rgba | Claude Code |
| 2026-04-02 | `7894c2d4` | feat: About Us page built; WanShing → Wanshing sitewide; zoomlion color token | Claude Code |

---

*Last updated: 2026-04-02 by Claude Code — Header scroll fix; project-shzcf deleted from Vercel.*
*Next update required after: any successful deployment or schema change.*
