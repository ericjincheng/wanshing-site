# About Us — Live Page State
> This document reflects what is currently live on the About Us page.
> To make changes: edit the relevant section below and instruct Claude, or give direct instructions.
> Images live in `public/about/` and `public/carousel/`. Source copies in `Content/`.

---

## DESIGN RULES (active)
- Section headings: `text-ws-red` + `font-bold` — brand red, bold for impact
- Body text: `text-steel-600`, `font-body`, relaxed line height
- "Zoomlion" text: `#b8d23c` (Tailwind token: `text-zoomlion`)
- All spacing follows design system: `py-20 lg:py-28` sections, `max-w-7xl` container

---

## PAGE HERO

**Eyebrow:** About Wanshing Machinery
**H1:** Equipment Is Our Product, Service Is Our Specialty.
**Background:** `bg-steel-50` with bottom border

---

## MAIN INTRODUCTION

**Section Heading (ws-red, bold):**
Equipment Is Our Product, Service Is Our Specialty

**Layout:** Text left column / Image right column (2-col on desktop)

**Body Text:**
At Wanshing Machinery, we bring over 30 years of industry expertise to the forefront of forklift and material handling solutions. Founded by Henry, our mission is to deliver reliable, efficient, and cost-effective equipment tailored to meet the diverse needs of businesses across Canada and the United States of America.

As your one-stop destination for all material handling needs, we are committed to enhancing the industry through sustainable sourcing and practices. Our extensive range of commercial machinery is designed to elevate your company's productivity and streamline operations.

From hardworking forklifts to robust aerial lifts and versatile power pallet jacks, we offer the right tools for your lifting requirements. Whether you're interested in upgrading your equipment or leasing high-quality pre-owned options, our dedicated team is here to support you in optimizing your business operations.

Join us at Wanshing Machinery, where innovation meets reliability, and let's drive your success together.

**Image (right):** `public/about/forklift-intro.jpg`
Source: `Content/About Us/wanshing-forklift-gallery-real-photo-8-scaled.jpg`

---

## STATS BAR

**Background:** `bg-ws-red` (brand red)
**Layout:** 4-column grid

| Value | Label |
|-------|-------|
| 30+ | Years of Experience |
| 5★ | Google Rating |
| Global | Operations |
| Local | Owned & Operated |

---

## SUSTAINABILITY SECTION

**Eyebrow:** Sustainability
**Section Heading (ws-red, bold):** Driving Long-Term Success in a Changing World
**Background:** `bg-steel-50`

**Body Text:**
At Wanshing, we believe in powering a greener future. Our extensive selection of electric machinery offers zero-emission solutions that not only contribute to a cleaner environment but also help reduce noise pollution in workplaces. By prioritizing sustainable equipment options, we're taking active steps to minimize the environmental impact of forklifts and material handling equipment.

Together, let's make a positive impact on our planet and lead the way in the fight against global climate change.

---

## MEMBERSHIP — CANADIAN RENTAL ASSOCIATION

**Eyebrow:** Membership
**Section Heading (ws-red, bold):** Member of the Canadian Rental Association
**Layout:** Image left column / Text right column (2-col on desktop)
**Background:** white

**Image (left):** `public/about/cra-ws.png`
Source: `Content/About Us/CRA & WS.png`

**Body Text:**
As a proud member of the Canadian Rental Association (CRA), Wanshing is committed to delivering smarter, more adaptable solutions for businesses across Canada. By embracing sustainable rental practices, we help companies reduce upfront equipment costs while lowering environmental impact.

Our rental fleet offers flexible, short- or long-term options, enabling clients to scale their operations efficiently without the commitment of ownership. From forklifts to aerial work platforms, our approach supports greener operations and greater operational agility — ensuring your business is equipped for today's needs and tomorrow's challenges.

---

## PARTNERSHIP — ZOOMLION

**Eyebrow:** Partnership
**Section Heading (ws-red, bold):** Official Canadian Distributor for [Zoomlion in #b8d23c]
**Layout:** Image left column / Text right column (2-col on desktop)
**Background:** `bg-steel-50`

**Image (left):** `public/about/zl-ws.png`
Source: `Content/About Us/ZL & WS.png`

**Body Text:**
Wanshing is proud to be the official Canadian distributor for **Zoomlion** [#b8d23c], offering a full range of high-performance machinery designed for greater productivity and efficiency. We are also committed to exploring new-energy solutions, bringing our customers the latest innovations in electric and hybrid equipment.

This ensures businesses can stay ahead with powerful, future-ready tools that meet both operational demands and evolving industry standards.

**Disclaimer (small, muted):**
Wanshing is not an authorized Toyota or Mitsubishi dealership, repair or other authorized Toyota or Mitsubishi facility.

---

## SERVICE FOR EVERYONE

**Section Heading (ws-red, bold):** A Service for Everyone
**Eyebrow:** Accessibility
**Background:** white

**Body Text:**
At Wanshing Machinery, accessibility is our priority. We aim to provide equipment solutions to fit any budget.

Our rental and leasing services are ideal for businesses needing seasonal or occasional use, while our financing plans offer a great option for those looking to make a long-term investment in their operations.

Our forklifts are suited to a wide range of industries, including farming, logistics, transportation, and warehousing.

Contact us today to find the perfect plan for your needs!

### AUTO-ROTATING PARTNER LOGO CAROUSEL

**Label:** Trusted by Leading Organizations
**Behaviour:** CSS marquee, auto-scroll left, infinite loop, grayscale → colour on hover
**Images in** `public/carousel/`:

| File | Organization |
|------|-------------|
| `cbsa.png` | Canada Border Services Agency |
| `chrysler.png` | Chrysler |
| `kins-farm-market.png` | Kin's Farm Market |
| `acrocargo.png` | Acrocargo Express |
| `aerostream.png` | Aerostream |
| `dnd.png` | Department of National Defence |
| `fps.png` | FPS |
| `herbaland.png` | Herbaland |
| `no1-collision.png` | No.1 Collision |
| `juice-truck.png` | The Juice Truck |
| `ubc.png` | University of British Columbia |

> To add/remove logos: update `public/carousel/` and the `CAROUSEL_LOGOS` array in `app/[locale]/about/page.tsx`

---

## VISION, MISSION & VALUES

**Eyebrow:** Who We Are
**Heading (white on dark):** Vision, Mission & Values
**Background:** `bg-steel-900` (dark)
**Layout:** 3-column card grid

**Our Vision:**
Where there is material handling, where there is Wanshing Machinery.

**Our Mission:**
Dedicated to providing top-quality environmentally friendly logistics tools for SMBs to help improve efficiency and reduce cost.

**Core Values:**
- **Integrity** — We operate with full transparency — honest pricing, honest advice, honest service.
- **Growth** — We grow alongside our clients, constantly improving our fleet, team, and support.
- **Efficiency** — Every solution we deliver is designed to maximize your uptime and minimize your costs.

---

## CONTACT / QUOTE CTA

**Component:** `<QuoteSection />` — shared component from `components/sections/QuoteSection.tsx`
**Sync:** Any changes to QuoteSection automatically apply here and on all other pages using it.

---

## FILE REFERENCES

| Asset | Public Path | Source |
|-------|-------------|--------|
| Intro forklift photo | `/about/forklift-intro.jpg` | `Content/About Us/wanshing-forklift-gallery-real-photo-8-scaled.jpg` |
| CRA partnership image | `/about/cra-ws.png` | `Content/About Us/CRA & WS.png` |
| Zoomlion partnership image | `/about/zl-ws.png` | `Content/About Us/ZL & WS.png` |
| Zoomlion fleet photo | `/about/zlws-fleet.png` | `Content/About Us/ZLWS Fleet.png` *(available, not yet placed)* |
| 11 carousel logos | `/carousel/*.png` | `Content/Auto Rotating Carousel/` |
