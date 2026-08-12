/**
 * Waseem — Category page (/cars, /bikes, /tractors).
 * Clean card grid with image, title, price, "View Details" button.
 * Brand filter dropdown keeps it simple and clear.
 */
import { useMemo, useState, useEffect } from "react";
import SiteHeader from "@/components/SiteHeader";
import ListingCard from "@/components/ListingCard";
import { getCurrentListings, BRANDS, CATEGORIES } from "@/lib/data";
import { useReveal } from "@/hooks/useReveal";

export default function CategoryPage({ category }) {
  useReveal();
  const [brand, setBrand] = useState("any");
  const [listings] = useState(() => getCurrentListings());

  // Reset selected brand when switching categories (e.g. from Bike to Car)
  useEffect(() => {
    setBrand("any");
  }, [category]);

  const items = useMemo(
    () =>
      listings.filter(
        (l) =>
          l.category === category &&
          l.source === "dealer" &&
          l.status === "Live" &&
          (brand === "any" || l.brand === brand),
      ),
    [listings, category, brand],
  );

  const meta = CATEGORIES.find((c) => c.name === category);

  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* Category banner */}
      <div className="relative overflow-hidden bg-primary text-primary-foreground">
        <img
          src={meta?.img}
          alt={category}
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#e63946]/95 to-[#e63946]/50" />
        <div className="container relative py-12 md:py-16">
          <p className="kicker mb-2 text-white/90">Waseem stock</p>
          <h1 className="text-4xl font-display font-bold uppercase tracking-tight md:text-5xl">
            {category === "Car" ? "Cars" : category + "s"}
          </h1>
          <p className="mt-2 max-w-xl text-sm text-white/80 font-medium">
            {meta?.tagline}. Browse what's in stock at Waseem Motors.
          </p>
        </div>
      </div>

      <div className="container py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm font-semibold text-muted-foreground">
            {items.length} {items.length === 1 ? "vehicle" : "vehicles"} in stock
          </p>
          <div className="flex items-center gap-2">
            <label className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
              Filter by brand
            </label>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-48 rounded-md border border-input bg-background px-3 py-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-ring/40 cursor-pointer text-foreground"
            >
              <option value="any">Any brand</option>
              {BRANDS[category].map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="mt-10 rounded-lg border border-dashed border-border bg-card p-12 text-center">
            <p className="font-display text-2xl font-bold">Nothing under this brand yet</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try another brand, or{" "}
              <a href="/sell" className="font-semibold text-primary underline">
                list your {category.toLowerCase()}
              </a>{" "}
              to be the first.
            </p>
          </div>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div key={item.id}>
                <ListingCard item={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
