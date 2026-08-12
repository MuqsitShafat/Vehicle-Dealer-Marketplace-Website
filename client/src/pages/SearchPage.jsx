/**
 * Waseem — Search results page.
 * Reads ?type=&brand=&price=&location= from the URL, filters the stock,
 * and shows results as a clean card grid.
 */
import { useMemo } from "react";
import { useSearchParams } from "wouter";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SiteHeader from "@/components/SiteHeader";
import ListingCard from "@/components/ListingCard";
import { getCurrentListings, PRICE_RANGES, CITIES, BRANDS, CATEGORIES, DYNAMIC_PRICE_RANGES } from "@/lib/data";
import { useReveal } from "@/hooks/useReveal";

export default function SearchPage() {
  useReveal();
  const [params, setParams] = useSearchParams();
  const [listings] = useState(() => getCurrentListings());
  const type = params.get("type") ?? "any";
  const brand = params.get("brand") ?? "any";
  const price = params.get("price") ?? "any";
  const location = params.get("location") ?? "any";

  const results = useMemo(() => {
    return listings.filter((l) => {
      if (l.source !== "dealer" || l.status !== "Live") return false;
      if (type !== "any" && l.category !== type) return false;
      if (brand !== "any" && l.brand !== brand) return false;
      if (location !== "any" && l.city !== location) return false;
      if (price !== "any") {
        const matches = (bound) =>
          l.priceRaw >= bound[0] && l.priceRaw <= bound[1];

        // Car price ranges
        if (price === "Under Rs 15 Lac") return matches([0, 1500000]);
        if (price === "Rs 15 – 35 Lac") return matches([1500000, 3500000]);
        if (price === "Rs 35 – 70 Lac") return matches([3500000, 7000000]);
        if (price === "Rs 70 Lac – 1.5 Cr") return matches([7000000, 15000000]);
        if (price === "Rs 1.5 – 5 Cr") return matches([15000000, 50000000]);
        if (price === "Above Rs 5 Cr") return l.priceRaw > 50000000;

        // Bike price ranges
        if (price === "Under Rs 1.5 Lac") return matches([0, 150000]);
        if (price === "Rs 1.5 – 3 Lac") return matches([150000, 300000]);
        if (price === "Rs 3 – 5 Lac") return matches([300000, 500000]);
        if (price === "Rs 5 – 8 Lac") return matches([500000, 800000]);
        if (price === "Above Rs 8 Lac") return l.priceRaw > 800000;

        // Tractor price ranges
        if (price === "Under Rs 25 Lac") return matches([0, 2500000]);
        if (price === "Rs 25 – 45 Lac") return matches([2500000, 4500000]);
        if (price === "Rs 45 – 80 Lac") return matches([4500000, 8000000]);
        if (price === "Rs 80 Lac – 1.5 Cr") return matches([8000000, 15000000]);
        if (price === "Above Rs 1.5 Cr") return l.priceRaw > 15000000;

        // Default fallback ranges (when type is "any")
        if (price === "Under Rs 10 Lac") return matches([0, 1000000]);
        if (price === "Rs 10 – 30 Lac") return matches([1000000, 3000000]);
        if (price === "Rs 30 – 70 Lac") return matches([3000000, 7000000]);
      }
      return true;
    });
  }, [type, brand, price, location, listings]);

  const set = (key, value) => {
    const next = new URLSearchParams(params);
    next.set(key, value);
    if (key === "type") {
      const currentBrand = params.get("brand") ?? "any";
      if (value !== "any" && currentBrand !== "any" && !BRANDS[value].includes(currentBrand)) {
        next.set("brand", "any");
      }
    }
    setParams(next.toString(), { replace: true });
  };

  const select = (
    label,
    value,
    options,
    key,
  ) => (
    <div className="rounded-md border border-input bg-background p-3">
      <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </label>
      <Select value={value} onValueChange={(v) => set(key, v)}>
        <SelectTrigger className="mt-1 h-auto w-full border-0 bg-transparent p-0 text-sm font-semibold shadow-none focus:ring-0">
          <SelectValue placeholder={`Any ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any">{`Any ${label.toLowerCase()}`}</SelectItem>
          {options.map((o) => (
            <SelectItem key={o} value={o}>
              {o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  const allBrands = type !== "any" ? BRANDS[type] : CATEGORIES.flatMap((c) => BRANDS[c.name]);

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <div className="relative overflow-hidden bg-primary text-primary-foreground">
        <img
          src="/manus-storage/carvista-city_c71e1762.png"
          alt="Dealership stock"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#e63946]/95 to-[#e63946]/50" />
        <div className="container relative py-8 md:py-10">
          <h1 className="text-3xl font-display font-bold uppercase tracking-tight md:text-4xl">
            Search results
          </h1>
        </div>
      </div>

      <div className="container py-8">
        {(() => {
          const availablePriceRanges =
            type && type !== "any"
              ? DYNAMIC_PRICE_RANGES[type]
              : DYNAMIC_PRICE_RANGES.any;
          return (
            <div className="grid gap-3 rounded-lg border border-border bg-card p-3 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
              {select("Type", type, ["Car", "Bike", "Tractor"], "type")}
              {select("Brand", brand, Array.from(new Set(allBrands)), "brand")}
              {select("Price range", price, availablePriceRanges, "price")}
              {select("Location", location, CITIES, "location")}
            </div>
          );
        })()}

        <p className="mt-6 text-sm font-semibold text-muted-foreground">
          {results.length} {results.length === 1 ? "vehicle" : "vehicles"} match
          your filters
        </p>

        {results.length === 0 ? (
          <div className="mt-6 rounded-lg border border-dashed border-border bg-card p-12 text-center">
            <p className="font-display text-2xl font-bold">No matches</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try loosening a filter — or{" "}
              <a href="/sell" className="font-semibold text-primary underline">
                sell yours
              </a>{" "}
              to be the first of its kind here.
            </p>
          </div>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((item) => (
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
