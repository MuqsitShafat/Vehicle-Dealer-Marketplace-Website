# Waseem Redesign — Progress State

## User's new prompt requirements (source of truth)
- Brand "Waseem" left, nav right: Home, Cars, Bikes, Tractors, Spare Parts, Sell Your Vehicle, Contact
- Hero: banner + search bar filtering by type, brand, price range, location
- Category card grids (Cars/Bikes/Tractors): image, title, price, View Details button
- Admin/listings management area: dashboard to add new listings, remove/mark as "Sold"
- Public "Sell Your Vehicle" form: photo upload, price, description, contact → pending admin approval
- Spare Parts section: grid with image, name, price, compatible vehicle models
- Contact/footer: email, phone, WhatsApp/contact form, social media links
- Style: clean modern trustworthy; deep blue, white, orange/yellow accents; mobile-responsive

## New asset URLs (use as-is)
- Logo: /manus-storage/waseem-logo_b5db856d.png
- Hero: /manus-storage/waseem-hero_3d2aa215.png
- Tractor1: /manus-storage/waseem-tractor1_82df20d0.png
- Tractor2: /manus-storage/waseem-tractor2_4cfe6a38.png
- Bike2: /manus-storage/waseem-bike2_ac2a1277.png
- Bike3: /manus-storage/waseem-bike3_229b2322.png
- Parts: /manus-storage/waseem-parts_f4fe5235.png
- Old assets still usable: carvista-sedan_44a8298d, carvista-suv_41bcbd5f, carvista-hatch_e4512e3b, carvista-city_c71e1762, carvista-bike_8b24343b, carvista-luxury_db447205

## Theme (index.css done)
- primary oklch(0.28 0.06 255) deep blue; signal oklch(0.72 0.17 55) orange
- Fonts: Barlow Condensed (display/h1-h3), Inter (body)
- .kicker, .price-chip, .signal-chip, .hairline, .link-draw, .reveal utilities exist in index.css

## Data (data.ts done — Listing now has: category, status: Live|Pending|Sold, priceRaw, SPARE_PARTS with compatible[], CATEGORIES, CONTACT{email,phone,whatsapp,address,hours})

## Done so far
- [x] Theme + index.html title/fonts/favicon
- [x] data.ts rewrite
- [x] SiteHeader.tsx (Waseem nav, Dealer Panel link, orange Sell CTA)
- [x] ListingCard.tsx (status chips, View Details button, /vehicle/:id links)
- [x] HeroSearch.tsx (type/brand/price/location → /search?params)

## Status (after screenshots)
All pages render correctly: home hero + search card, trust strip, category cards, /cars /bikes /tractors grids, /spare-parts with WhatsApp buttons, /sell form, /admin panel (stats, manage/pending/add tabs), /search filters. Typecheck passes. Old files CarDetail/SectionHead/useReveal deleted then useReveal recreated. One issue: spare-parts grid uses the same generated image for all parts (acceptable but could vary) — noted. App.tsx routes updated.

## Remaining work
- [ ] Home.tsx rewrite (3 category cards, featured listings, spare parts teaser, sell teaser, Waseem footer with contact/social)
- [ ] SiteFooter component or footer in Home
- [ ] /cars /bikes /tractors pages (CategoryPage.tsx shared, filter by category)
- [ ] /spare-parts page
- [ ] /search page (filter results by type/brand/price/location from query params)
- [ ] /sell page (public form → localStorage pending queue, toast confirmation)
- [ ] /admin page (dashboard: add listing form, manage status: live/sold/remove, pending approvals)
- [ ] /vehicle/:id detail page (CarDetail.tsx needs update for category/status/contact seller)
- [ ] Contact section on home (anchor #contact) or /contact page
- [ ] App.tsx routes update
- [ ] Typecheck, screenshots, checkpoint, deliver

## Style rules from user
- Deep blue header/footer; orange used for CTAs/accents only
- Clean white cards with border-border
