/**
 * Waseem — Spare Parts page.
 * Grid: image, name, price, compatible vehicle models, WhatsApp inquiry button.
 */
import React, { useState, useEffect } from "react";
import SiteHeader from "@/components/SiteHeader";
import { getCurrentSpareParts, IMAGES } from "@/lib/data";
import { Wrench, Car, Search } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

export default function SpareParts() {
  useReveal();
  const [parts, setParts] = useState([]);
  useEffect(() => {
    getCurrentSpareParts().then(setParts);
  }, []);
  const [searchQuery, setSearchQuery] = useState("");

  const wa = (name, price) =>
    `https://wa.me/923121537773?text=${encodeURIComponent(
      `Hi, I'm interested in: ${name} (${price})`
    )}`;

  const filteredParts = parts.filter((part) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return part.name.toLowerCase().includes(q) ||
           part.compatible.some(c => c.toLowerCase().includes(q));
  });

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <div className="relative overflow-hidden bg-primary text-primary-foreground">
        <img
          src={IMAGES.part1}
          alt="Spare parts shelf"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#e63946]/95 to-[#e63946]/50" />
        <div className="container relative py-12 md:py-16">
          <p className="kicker mb-2 text-white/90">Genuine parts</p>
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
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <p className="text-sm font-semibold text-muted-foreground">
            {filteredParts.length} {filteredParts.length === 1 ? "part" : "parts"} in the parts counter
          </p>
          <div className="w-full sm:w-80 relative">
            <input
              type="text"
              placeholder="Search parts (e.g. light, brake)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredParts.map((part) => (
            <div
              key={part.id}
              className="flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-lg"
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
