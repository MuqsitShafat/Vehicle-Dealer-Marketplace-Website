/**
 * Waseem — Spare Parts page.
 * Grid: image, name, price, compatible vehicle models, WhatsApp inquiry button.
 */
import SiteHeader from "@/components/SiteHeader";
import { SPARE_PARTS, CONTACT, IMAGES } from "@/lib/data";
import { Wrench, Car } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

export default function SpareParts() {
  useReveal();
  const wa = (name, price) =>
    `https://wa.me/923332834567?text=${encodeURIComponent(`Hi Waseem, I'm interested in: ${name} (${price})`)}`;

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <div className="relative overflow-hidden bg-primary text-primary-foreground">
        <img
          src={IMAGES.part1}
          alt="Spare parts shelf"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.22_0.05_255)]/95 to-[oklch(0.22_0.05_255)]/50" />
        <div className="container relative py-12 md:py-16">
          <p className="kicker mb-2 text-[oklch(0.8_0.15_60)]">Genuine parts</p>
          <h1 className="text-4xl font-display font-bold uppercase tracking-tight md:text-5xl">
            Spare Parts
          </h1>
          <p className="mt-2 max-w-xl text-sm text-white/80">
            Every part is matched to the models it fits — no guesswork. Need
            something specific? WhatsApp us directly.
          </p>
        </div>
      </div>

      <div className="container py-10">
        <p className="text-sm font-semibold text-muted-foreground">
          {SPARE_PARTS.length} parts in the parts counter
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SPARE_PARTS.map((part, i) => (
            <div
              key={part.id}
              className="reveal flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-lg"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div className="aspect-[4/3] overflow-hidden bg-secondary">
                <img
                  src={part.img}
                  alt={part.name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-xl font-display font-bold text-card-foreground">
                    {part.name}
                  </h3>
                  <span className="price-chip shrink-0">{part.price}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {part.compatible.map((m) => (
                    <span
                      key={m}
                      className="inline-flex items-center gap-1 rounded-sm bg-secondary px-2 py-0.5 text-[11px] font-semibold text-secondary-foreground"
                    >
                      <Car className="h-3 w-3" /> {m}
                    </span>
                  ))}
                </div>
                <a
                  href={wa(part.name, part.price)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto inline-flex items-center justify-center gap-2 rounded-md bg-[#25D366] px-4 py-2 text-sm font-semibold text-white transition-shadow hover:shadow-md"
                >
                  <Wrench className="h-4 w-4" /> Inquire on WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
