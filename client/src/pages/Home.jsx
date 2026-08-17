/**
 * Waseem — Home (Clean Modern Dealership Marketplace).
 * Hero search → trust strip → Cars/Bikes/Tractors category cards →
 * featured listings → spare parts teaser → sell your vehicle → contact → footer.
 * Palette: deep blue + white canvas + orange accents.
 */
import { Link } from "wouter";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  BadgeCheck,
  ShieldCheck,
  Clock3,
  Handshake,
  ArrowRight,
  Mail,
  Phone,
  MessageCircle,
  Send,
  MapPin,
  Wrench,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import HeroSearch from "@/components/HeroSearch";
import ListingCard from "@/components/ListingCard";
import { useReveal } from "@/hooks/useReveal";
import {
  WhatsAppIcon,
  YouTubeIcon,
  TikTokIcon,
  InstagramIcon,
  FacebookIcon,
} from "@/components/SocialIcons";
import {
  getCurrentListings,
  CATEGORIES,
  SPARE_PARTS,
  CONTACT,
  IMAGES,
} from "@/lib/data";
import rev1 from "@/assets/images/Reviews/1.jpeg";
import rev2 from "@/assets/images/Reviews/2.jpeg";
import rev3 from "@/assets/images/Reviews/3.jpeg";
import rev4 from "@/assets/images/Reviews/4.jpeg";
import rev5 from "@/assets/images/Reviews/5.jpeg";
import rev6 from "@/assets/images/Reviews/6.jpeg";

const REVIEWS = [rev1, rev2, rev3, rev4, rev5, rev6];

const REVIEW_DATA = [
  {
    name: "Sheikh Muhammad Ali",
    text: "Extremely satisfied with my buying experience. The team was highly professional and the vehicle was clean as promised!",
    rating: 5,
  },
  {
    name: "Chaudhary Nabeel",
    text: "Honest dealings, clear paperwork, and outstanding post-purchase support. Waseem Motors is highly trusted.",
    rating: 5,
  },
  {
    name: "Sheikh Yasir Awan",
    text: "Got a Massey Ferguson tractor in pristine condition at a very fair price. Excellent client service!",
    rating: 5,
  },
  {
    name: "Chaudhary Abdul Rehman",
    text: "Superb customer service! The staff is very cooperative and guided me throughout the registration process.",
    rating: 5,
  },
  {
    name: "Sheikh Hammad",
    text: "Bought my Honda CG 125 from Waseem Honda. The service was top notch and transaction was seamless.",
    rating: 5,
  },
  {
    name: "Chaudhary Kamran",
    text: "Transparency and trust define Waseem Motors. Fully satisfied with their fair deals. Will buy again!",
    rating: 5,
  },
];

const CUSTOMER_REVIEWS = REVIEWS.map((img, i) => ({
  img,
  ...REVIEW_DATA[i % REVIEW_DATA.length],
}));

const FOOTER_LINKS = [
  { title: "Browse", links: ["Cars", "Bikes", "Tractors", "Spare Parts"] },
  {
    title: "Sell",
    links: ["Sell Your Vehicle", "Why list with us"],
  },
  { title: "Company", links: ["About", "Contact", "Terms", "Privacy"] },
];

export default function Home() {
  useReveal();
  const [listings, setListings] = useState([]);
  useEffect(() => {
    getCurrentListings().then(setListings);
  }, []);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendContact = e => {
    e.preventDefault();
    if (!email.trim() || !message.trim()) {
      toast.error("Please fill in your email and message.");
      return;
    }
    toast.success("Message received! We'll reply within one business day.");
    setEmail("");
    setMessage("");
  };

  const whatsappUrl = "https://wa.me/923332834567";

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <HeroSearch />

      {/* Trust strip */}
      <div className="border-b border-border bg-secondary">
        <div className="container grid gap-4 py-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: BadgeCheck,
              title: "Verified stock",
              desc: "Every vehicle inspected before it goes on sale",
            },
            {
              icon: ShieldCheck,
              title: "Genuine parts only",
              desc: "Spare parts with warranty and proof of origin",
            },
            {
              icon: Clock3,
              title: "Fast approvals",
              desc: "Public listings reviewed within 24 hours",
            },
            {
              icon: Handshake,
              title: "Honest dealing",
              desc: "Clear paperwork, no hidden fees, trusted since 2005",
            },
          ].map(t => (
            <div key={t.title} className="flex items-start gap-3">
              <t.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-bold">{t.title}</p>
                <p className="text-xs text-muted-foreground">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 01 — Category cards: Cars, Bikes, Tractors */}
      <section className="container py-14 md:py-20">
        <p className="kicker mb-2">01 — Browse by category</p>
        <h2 className="text-3xl font-display font-bold uppercase tracking-tight md:text-4xl">
          Whatever moves, we have it
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {CATEGORIES.map((c, i) => (
            <Link
              key={c.name}
              href={`/${c.name.toLowerCase()}s`}
              className="reveal group relative block overflow-hidden rounded-lg"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <img
                src={c.img}
                alt={c.name}
                className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#e63946]/90 via-[#e63946]/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="text-2xl font-display font-bold uppercase tracking-wide text-white">
                  {c.name === "Car" ? "Cars" : c.name + "s"}
                </h3>
                <p className="mt-0.5 text-xs text-white/80">{c.tagline}</p>
                <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[oklch(0.8_0.15_60)]">
                  {c.count} in stock{" "}
                  <ArrowRight className="mb-0.5 ml-1 inline h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 02 — Featured listings */}
      <section className="bg-secondary">
        <div className="container py-14 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="kicker mb-2">02 — Featured stock</p>
              <h2 className="text-3xl font-display font-bold uppercase tracking-tight md:text-4xl">
                Fresh arrivals this week
              </h2>
            </div>
            <Link
              href="/search"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
            >
              Browse all listings <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {listings
              .filter(l => l.status === "Live" && l.source === "dealer")
              .slice(0, 6)
              .map((item, i) => (
                <div
                  key={item.id}
                  className={`reveal ${i >= 4 ? "hidden sm:block" : ""}`}
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  <ListingCard item={item} />
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* 03 — Spare parts teaser */}
      <section className="container py-14 md:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div className="reveal">
            <img
              src={IMAGES.part1}
              alt="Genuine spare parts on a workshop shelf"
              className="w-full rounded-lg object-cover"
            />
          </div>
          <div className="reveal">
            <p className="kicker mb-2">03 — Genuine spare parts</p>
            <h2 className="text-3xl font-display font-bold uppercase tracking-tight md:text-4xl">
              Keep it running with the right parts
            </h2>
            <p className="mt-3 max-w-lg text-sm text-muted-foreground">
              Alternators, brake pads, lights, batteries and more — every part
              matched to the vehicle models it fits, so there's no guesswork.
            </p>
            <div className="mt-6 space-y-3">
              {SPARE_PARTS.slice(0, 3).map(p => (
                <div
                  key={p.id}
                  className="flex items-center justify-between gap-3 rounded-md border border-border bg-card p-3"
                >
                  <div className="flex items-center gap-3">
                    <Wrench className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-sm font-bold">{p.name}</p>
                      <p className="text-[11px] text-muted-foreground">
                        Fits: {p.compatible.slice(0, 2).join(", ")}
                      </p>
                    </div>
                  </div>
                  <span className="price-chip shrink-0">{p.price}</span>
                </div>
              ))}
            </div>
            <Link
              href="/spare-parts"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-shadow hover:shadow-md"
            >
              View all parts <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 04 — Sell your vehicle */}
      <section className="bg-primary text-primary-foreground">
        <div className="container grid items-center gap-10 py-14 lg:grid-cols-2 md:py-20">
          <div className="reveal">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-[oklch(0.8_0.15_60)]">
              04 — Sell your vehicle
            </p>
            <h2 className="text-3xl font-display font-bold uppercase tracking-tight md:text-4xl">
              Have a car, bike or tractor to sell?
            </h2>
            <p className="mt-3 max-w-lg text-sm text-white/80">
              Submit it through our simple form — photos, price and contact
              details. Our team reviews every submission, and your vehicle goes
              live the moment it's approved.
            </p>
            <div className="mt-6 space-y-3 text-sm">
              {[
                "Upload photos and set your asking price",
                "Pending review — approved within 24 hours",
                "Buyers reach you directly by phone or WhatsApp",
              ].map(s => (
                <p key={s} className="flex items-start gap-2">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[oklch(0.8_0.15_60)]" />
                  {s}
                </p>
              ))}
            </div>
            <Link
              href="/sell"
              className="mt-7 inline-flex items-center gap-2 rounded-md bg-[oklch(0.72_0.17_55)] px-6 py-3 text-sm font-bold text-[#1e1e1e] transition-shadow hover:shadow-lg"
            >
              Sell your vehicle
            </Link>
          </div>
          <div className="reveal relative overflow-hidden rounded-lg">
            <img
              src={IMAGES.givingImage}
              alt="Dealer forecourt"
              className="h-72 w-full object-cover lg:h-96"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#e63946]/40 to-transparent" />
            <p className="absolute bottom-4 left-4 text-sm font-bold text-white">
              {listings.length}+ vehicles sold through Waseem
            </p>
          </div>
        </div>
      </section>

      {/* Reviews Marquee Section */}
      <section className="bg-secondary/40 py-16 overflow-hidden">
        <div className="container relative mb-10 text-center">
          <h2 className="text-3xl font-display font-bold uppercase tracking-tight md:text-4xl text-primary">
            Reviews
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm font-bold tracking-[0.05em] text-muted-foreground uppercase">
            Waseem Motors & Waseem Honda
          </p>
        </div>

        <div className="relative overflow-x-hidden py-4 border-y border-border bg-card">
          <div className="animate-marquee flex whitespace-nowrap">
            {/* First loop of images */}
            {CUSTOMER_REVIEWS.map((item, index) => (
              <div
                key={`rev-first-${index}`}
                className="group relative mx-4 w-[280px] h-[350px] shrink-0 rounded-xl overflow-hidden border border-border/80 shadow-sm transition-all hover:shadow-lg bg-secondary/15"
              >
                <img
                  src={item.img}
                  alt={`Customer Review ${index + 1}`}
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-primary/95 text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-6 text-center">
                  <div className="flex gap-1 text-[oklch(0.72_0.17_55)] mb-3 text-lg">
                    {"★".repeat(item.rating)}
                  </div>
                  <h4 className="font-display text-xl font-bold uppercase tracking-wide mb-2 text-white">
                    {item.name}
                  </h4>
                  <p className="text-xs text-white/80 leading-relaxed italic whitespace-normal">
                    "{item.text}"
                  </p>
                  <span className="mt-4 text-[10px] uppercase tracking-widest text-[oklch(0.8_0.15_60)] font-bold">
                    Verified Buyer
                  </span>
                </div>
              </div>
            ))}
            {/* Second loop of images (for infinite seamless marquee) */}
            {CUSTOMER_REVIEWS.map((item, index) => (
              <div
                key={`rev-second-${index}`}
                className="group relative mx-4 w-[280px] h-[350px] shrink-0 rounded-xl overflow-hidden border border-border/80 shadow-sm transition-all hover:shadow-lg bg-secondary/15"
              >
                <img
                  src={item.img}
                  alt={`Customer Review ${index + 1} clone`}
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-primary/95 text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-6 text-center">
                  <div className="flex gap-1 text-[oklch(0.72_0.17_55)] mb-3 text-lg">
                    {"★".repeat(item.rating)}
                  </div>
                  <h4 className="font-display text-xl font-bold uppercase tracking-wide mb-2 text-white">
                    {item.name}
                  </h4>
                  <p className="text-xs text-white/80 leading-relaxed italic whitespace-normal">
                    "{item.text}"
                  </p>
                  <span className="mt-4 text-[10px] uppercase tracking-widest text-[oklch(0.8_0.15_60)] font-bold">
                    Verified Buyer
                  </span>
                </div>
              </div>
            ))}
            {/* Third loop of images (for infinite seamless marquee) */}
            {CUSTOMER_REVIEWS.map((item, index) => (
              <div
                key={`rev-third-${index}`}
                className="group relative mx-4 w-[280px] h-[350px] shrink-0 rounded-xl overflow-hidden border border-border/80 shadow-sm transition-all hover:shadow-lg bg-secondary/15"
              >
                <img
                  src={item.img}
                  alt={`Customer Review ${index + 1} clone 2`}
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-primary/95 text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-6 text-center">
                  <div className="flex gap-1 text-[oklch(0.72_0.17_55)] mb-3 text-lg">
                    {"★".repeat(item.rating)}
                  </div>
                  <h4 className="font-display text-xl font-bold uppercase tracking-wide mb-2 text-white">
                    {item.name}
                  </h4>
                  <p className="text-xs text-white/80 leading-relaxed italic whitespace-normal">
                    "{item.text}"
                  </p>
                  <span className="mt-4 text-[10px] uppercase tracking-widest text-[oklch(0.8_0.15_60)] font-bold">
                    Verified Buyer
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — Contact */}
      <section id="contact" className="container scroll-mt-20 py-14 md:py-20">
        <p className="kicker mb-2">05 — Contact us</p>
        <h2 className="text-3xl font-display font-bold uppercase tracking-tight md:text-4xl">
          Visit the showroom or write to us
        </h2>
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="reveal space-y-4">
            {/* Emails */}
            <div className="rounded-md border border-border bg-card p-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  Emails
                </p>
              </div>
              <div className="mt-2 space-y-1.5 pl-8">
                {CONTACT.emails.map(e => (
                  <a
                    key={e}
                    href={`mailto:${e}`}
                    className="block text-sm font-semibold hover:underline"
                  >
                    {e}
                  </a>
                ))}
              </div>
            </div>

            {/* Phones */}
            <div className="rounded-md border border-border bg-card p-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  Phones
                </p>
              </div>
              <div className="mt-2 space-y-1.5 pl-8">
                {CONTACT.phones.map(p => (
                  <a
                    key={p.number}
                    href={`tel:${p.number}`}
                    className="block text-sm font-semibold hover:underline"
                  >
                    {p.name}: {p.number}
                  </a>
                ))}
              </div>
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/923332834567"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-md border border-border bg-card p-4 transition-shadow hover:shadow-md"
            >
              <WhatsAppIcon className="h-5 w-5 shrink-0 text-[#25D366]" />
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  WhatsApp Support
                </p>
                <p className="text-sm font-semibold">0333-2834567</p>
              </div>
            </a>

            {/* Social Channels */}
            <div className="rounded-md border border-border bg-card p-4 flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  Official Socials
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Follow us for updates & stock
                </p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://wa.me/923332834567"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-foreground transition-all hover:bg-[#25D366] hover:text-white"
                >
                  <WhatsAppIcon className="h-4.5 w-4.5" />
                </a>
                <a
                  href="https://www.youtube.com/@waseemmotorsbhakkar.786"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-foreground transition-all hover:bg-[#FF0000] hover:text-white"
                >
                  <YouTubeIcon className="h-4.5 w-4.5" />
                </a>
                <a
                  href="https://www.tiktok.com/@waseem_motors_official?_r=1&_t=ZS-98lH3a1g6hI"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-foreground transition-all hover:bg-black hover:text-white"
                >
                  <TikTokIcon className="h-4 w-4" />
                </a>
                <a
                  href="https://www.instagram.com/waseem_motors_official?igsh=cWhqbGtlNTVzb2No"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-foreground transition-all hover:bg-[#E1306C] hover:text-white"
                >
                  <InstagramIcon className="h-4.5 w-4.5" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=100086322109876&rdid=vFsJHBZTN2A2Bm7i&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1DtkhjazGV%2F#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-foreground transition-all hover:bg-[#1877F2] hover:text-white"
                >
                  <FacebookIcon className="h-4.5 w-4.5" />
                </a>
              </div>
            </div>

            {/* Showrooms */}
            <div className="rounded-md border border-border bg-card p-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                    Showrooms (Bhakkar)
                  </p>
                  <div className="mt-2 space-y-2 text-xs font-semibold">
                    <div>
                      <span className="text-primary block text-[10px] uppercase font-bold">
                        Cars
                      </span>
                      <span>{CONTACT.showrooms.Car}</span>
                    </div>
                    <div>
                      <span className="text-primary block text-[10px] uppercase font-bold">
                        Tractors
                      </span>
                      <span>{CONTACT.showrooms.Tractor}</span>
                    </div>
                    <div>
                      <span className="text-primary block text-[10px] uppercase font-bold">
                        Bikes
                      </span>
                      <span>{CONTACT.showrooms.Bike}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={sendContact}
            className="reveal flex flex-col gap-4 rounded-lg border border-border bg-card p-6 shadow-sm"
          >
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                Your email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/40"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                Message
              </label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                rows={5}
                placeholder="Tell us what you're looking for..."
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/40"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-shadow hover:shadow-md"
            >
              <Send className="h-4 w-4" /> Send message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground">
        <div className="container grid gap-8 py-12 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <img
                src={IMAGES.logo}
                alt="Waseem"
                className="h-9 w-9 rounded-sm bg-white/95 p-0.5 object-contain"
              />
              <div>
                <span className="text-[22px] font-display font-bold uppercase leading-none tracking-wide">
                  Waseem
                </span>
                <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-[oklch(0.8_0.15_60)]">
                  Motors
                </span>
              </div>
            </div>
            <p className="mt-3 text-sm text-white/75">
              Your trusted dealership for cars, bikes, tractors and genuine
              spare parts since 2005.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://wa.me/923332834567"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#25D366] hover:text-white"
              >
                <WhatsAppIcon className="h-[18px] w-[18px]" />
              </a>
              <a
                href="https://www.youtube.com/@waseemmotorsbhakkar.786"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#FF0000] hover:text-white"
              >
                <YouTubeIcon className="h-[18px] w-[18px]" />
              </a>
              <a
                href="https://www.tiktok.com/@waseem_motors_official?_r=1&_t=ZS-98lH3a1g6hI"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-black hover:text-white"
              >
                <TikTokIcon className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/waseem_motors_official?igsh=cWhqbGtlNTVzb2No"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#E1306C] hover:text-white"
              >
                <InstagramIcon className="h-[18px] w-[18px]" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100086322109876&rdid=vFsJHBZTN2A2Bm7i&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1DtkhjazGV%2F#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#1877F2] hover:text-white"
              >
                <FacebookIcon className="h-[18px] w-[18px]" />
              </a>
            </div>
          </div>
          {FOOTER_LINKS.map(col => (
            <div key={col.title}>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[oklch(0.8_0.15_60)]">
                {col.title}
              </p>
              <ul className="mt-3 space-y-2 text-sm text-white/80">
                {col.links.map(l => {
                  const hrefMap = {
                    Cars: "/cars",
                    Bikes: "/bikes",
                    Tractors: "/tractors",
                    "Spare Parts": "/spare-parts",
                    "Sell Your Vehicle": "/sell",
                    "Why list with us": "/sell",
                    Contact: "/contact",
                  };
                  const href = hrefMap[l] ?? "#";
                  if (href === "#")
                    return (
                      <li key={l}>
                        <button
                          onClick={() => toast("Coming soon")}
                          className="link-draw text-left text-white/80 hover:text-white"
                        >
                          {l}
                        </button>
                      </li>
                    );
                  return (
                    <li key={l}>
                      <Link
                        href={href}
                        className="link-draw text-white/80 hover:text-white"
                      >
                        {l}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <div className="container border-t border-white/15 py-5 text-xs text-white/60">
          © 1996 Waseem Motors. Serving the community with trust and integrity.
          All rights are reserved.
        </div>
      </footer>
    </div>
  );
}
