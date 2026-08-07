/**
 * Waseem — Home (Clean Modern Dealership Marketplace).
 * Hero search → trust strip → Cars/Bikes/Tractors category cards →
 * featured listings → spare parts teaser → sell your vehicle → contact → footer.
 * Palette: deep blue + white canvas + orange accents.
 */
import { Link } from "wouter";
import { useState } from "react";
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
import { LISTINGS, CATEGORIES, SPARE_PARTS, CONTACT, IMAGES } from "@/lib/data";

const FOOTER_LINKS = [
  { title: "Browse", links: ["Cars", "Bikes", "Tractors", "Spare Parts"] },
  {
    title: "Sell",
    links: ["Sell Your Vehicle", "Why list with us", "Dealer panel"],
  },
  { title: "Company", links: ["About", "Contact", "Terms", "Privacy"] },
];

export default function Home() {
  useReveal();
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

  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`;

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
              <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.22_0.05_255)]/90 via-[oklch(0.22_0.05_255)]/30 to-transparent" />
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
            {LISTINGS.filter(l => l.status === "Live")
              .slice(0, 6)
              .map((item, i) => (
                <div
                  key={item.id}
                  className="reveal"
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
              className="mt-7 inline-flex items-center gap-2 rounded-md bg-[oklch(0.72_0.17_55)] px-6 py-3 text-sm font-bold text-[oklch(0.2_0.05_255)] transition-shadow hover:shadow-lg"
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
            <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.22_0.05_255)]/70 to-transparent" />
            <p className="absolute bottom-4 left-4 text-sm font-bold text-white">
              {LISTINGS.length}+ vehicles sold through Waseem
            </p>
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
            <a
              href={`mailto:${CONTACT.email}`}
              className="flex items-center gap-3 rounded-md border border-border bg-card p-4 transition-shadow hover:shadow-md"
            >
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  Email
                </p>
                <p className="text-sm font-semibold">{CONTACT.email}</p>
              </div>
            </a>
            <a
              href={`tel:${CONTACT.phone}`}
              className="flex items-center gap-3 rounded-md border border-border bg-card p-4 transition-shadow hover:shadow-md"
            >
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  Phone
                </p>
                <p className="text-sm font-semibold">{CONTACT.phone}</p>
              </div>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-md border border-border bg-card p-4 transition-shadow hover:shadow-md"
            >
              <MessageCircle className="h-5 w-5 text-[#25D366]" />
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  WhatsApp
                </p>
                <p className="text-sm font-semibold">{CONTACT.whatsapp}</p>
              </div>
            </a>
            <div className="flex items-center gap-3 rounded-md border border-border bg-card p-4">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  Showroom
                </p>
                <p className="text-sm font-semibold">{CONTACT.address}</p>
                <p className="text-xs text-muted-foreground">{CONTACT.hours}</p>
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
              {/* Social placeholders — demo links */}
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  toast("Facebook page coming soon");
                }}
                aria-label="Facebook"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs font-bold transition-colors hover:bg-[oklch(0.72_0.17_55)] hover:text-[oklch(0.2_0.05_255)]"
              >
                f
              </a>
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  toast("Instagram page coming soon");
                }}
                aria-label="Instagram"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs font-bold transition-colors hover:bg-[oklch(0.72_0.17_55)] hover:text-[oklch(0.2_0.05_255)]"
              >
                in
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs font-bold transition-colors hover:bg-[oklch(0.72_0.17_55)] hover:text-[oklch(0.2_0.05_255)]"
              >
                wa
              </a>
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  toast("YouTube channel coming soon");
                }}
                aria-label="YouTube"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs font-bold transition-colors hover:bg-[oklch(0.72_0.17_55)] hover:text-[oklch(0.2_0.05_255)]"
              >
                yt
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
          © 2026 Waseem Motors. Demo design concept — listings shown are
          examples, not real ads.
        </div>
      </footer>
    </div>
  );
}
