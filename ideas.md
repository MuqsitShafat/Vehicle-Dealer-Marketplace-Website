# CarVista — Design Brainstorm

Car marketplace inspired by PakWheels (Pakistan market: Karachi, Lahore, Islamabad, popular models Corolla, Civic, City, Cultus, Alto, Wagon R, CD 70 bikes, etc.) — but a clearly better, cleaner, more trustworthy version.

## Three Stylistic Approaches

### 1. "Racetrack Editorial"
A premium automotive-magazine aesthetic: warm paper-white backgrounds, oversized serif display headlines, photography-forward hero, thin rules and numbered sections like a print magazine spread. Feels curated and editorial, like Autocar meets a luxury brochure.
**Probability: 0.06**

### 2. "Midnight Garage Neon"
Dark charcoal background with electric green/cyan accents and glow effects, tech-dashboard vibes for search tools.
**Probability: 0.03**

### 3. "Dealer Lot Swiss"
Swiss-grid utilitarian look: stark white, heavy grotesque typography, hard-edged cards, primary-yellow highlights like road signage. Feels transactional and loud.
**Probability: 0.04**

---

## CHOSEN: Racetrack Editorial

**Design Movement**: Automotive editorial / premium print-magazine design (think Autocar, Road & Track, Porsche brand collateral) translated to the web. Warm, photographic, confident.

**Core Principles**:
1. Photography is the hero — large, cinematic car imagery drives every major section.
2. Editorial hierarchy — big serif display headlines, small uppercase kickers, thin hairline rules, like a magazine layout.
3. The search is the moment — the biggest, clearest thing on the page; everything else supports it.
4. Warm trust — cream/paper tones and deep racing green evoke reliability and heritage, not corporate coldness.

**Color Philosophy**: Deep Racing Green (oklch ~0.32 0.07 165) as the brand anchor — evokes British racing heritage, trust, and quality; contrasts with the sea of blue marketplaces. Warm Cream (oklch ~0.97 0.01 85) as the canvas — paper-like, editorial, warm. Burnt Orange/Signal accent (oklch ~0.66 0.19 40) strictly for CTAs and "price" highlights, like a track marshal flag. Ink near-black for text. Emotional intent: "this place knows cars and treats you with respect."

**Layout Paradigm**: Asymmetric editorial grid — full-bleed hero, offset two-column sections (text left / imagery right, then flipped), sticky side rail for filters on listing page, magazine-style numbered rows ("01 / Trending"). Avoid centered symmetrical stacks. Hairline dividers and section numbers as structural rhythm.

**Signature Elements**:
1. Section numbering + uppercase kickers (e.g., "01 — What's Trending") with a hairline rule.
2. Racing-green "price tag" chips — small rectangular tags with price, like a showroom placard.
3. Thin horizontal hairline rules (1px) separating sections, editorial style.

**Interaction Philosophy**: Calm and precise. Hover states lift cards subtly (translate-y + shadow), links get underline-draw animations, search fields get a green focus ring. Nothing flashy — like flipping glossy pages.

**Animation**: Entrance fades + 12px rise, staggered 60ms, 250ms ease-out. Card hover: translateY(-4px) + shadow, 200ms. Button press scale(0.97) 140ms. Hero headline reveals line-by-line. Respect prefers-reduced-motion.

**Typography System**: "Fraunces" (serif, 600/700) for display headlines — sharp, characterful, automotive-editorial. "Archivo" (400/500/600/700) for body/UI/labels — sturdy grotesque with car-industry feel. Kickers: Archivo 600 uppercase, 12px, letter-spacing 0.14em, muted green. Price/numbers: Archivo 700 tabular.

**Brand Essence**: CarVista — the curated car market for Pakistan; for buyers & sellers who want clarity instead of clutter. Personality: assured, knowledgeable, warm.

**Brand Voice**: Confident, specific, zero filler. Headlines state value directly; CTAs are verbs.
Examples: "Every car, one clear price." / "Post your car. Price it right. Sold."

**Wordmark & Logo**: "Car**Vista**" — "Car" in Archivo 600, "Vista" in Fraunces italic, deep green, with a subtle forward-speed swoosh glyph. Logo mark: abstract green road-line/checker emblem, no text.

**Signature Brand Color**: Deep Racing Green — oklch(0.32 0.07 165) ≈ #1B4332 territory.
## Style Decisions
- Listing and research pages must include at least one editorial interruption — a featured vehicle, market note, numbered rail, or photographic spread — so no page resolves into only a uniform marketplace grid.
- Product cutouts are allowed for inventory clarity, but every major page must include a cinematic contextual car/road/showroom image that carries the automotive-editorial mood.
- Deep racing green is the brand and price-placard color; burnt orange is reserved only for urgency, hot deals, or decisive commerce signals, never as general decoration.
---

# REDESIGN — Waseem Automotive (user-driven restyle, Aug 07 2026)

The user asked to rework the site as "Waseem", a dealership marketplace. This is the new ground-truth spec, replacing the previous Racetrack Editorial direction.

**Brand & navigation**: Logo/brand "Waseem" on the left. Nav on the right: Home, Cars, Bikes, Tractors, Spare Parts, Sell Your Vehicle, Contact.

**Pages required**: Home (hero search: type/brand/price range/location), category pages (Cars, Bikes, Tractors) as card grids (image, title, price, View Details), Spare Parts grid (image, name, price, compatible models), Sell Your Vehicle public form (photo, price, description, contact → pending admin approval), Admin dashboard (add listings, remove/mark sold, pending approvals), Contact/footer (email, phone, WhatsApp, contact form, socials).

**Style**: Clean, modern, trustworthy automotive marketplace. Palette: deep blue (#0B2545 / oklch(0.28 0.06 255)), white, orange/yellow accents. Mobile-responsive.

**Style Decisions (Waseem)**
- Deep blue carries trust and is used for header, footer, primary CTAs; orange/yellow is the action/highlight color (badges, hovers, price accents) — kept purposeful, not decoration.
- Card grids stay clean and uniform on category pages (dealer-marketplace clarity), but the home hero keeps an editorial banner + oversized search to retain the clarity-first intent from the original brief.
- Trust language stays prominent: "Pending review", "Sold", verified badges.
