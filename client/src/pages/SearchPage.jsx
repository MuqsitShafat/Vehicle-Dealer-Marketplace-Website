/**
 * Waseem — Search results page.
 * Reads ?type=&brand=&price=&location= from the URL, filters the stock,
 * and shows results as a clean card grid.
 */
import { useMemo } from "react";
import { useSearchParams } from "wouter";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SiteHeader from "@/components/SiteHeader";
import ListingCard from "@/components/ListingCard";
import { LISTINGS, PRICE_RANGES, CITIES, BRANDS, CATEGORIES } from "@/lib/data";
import { useReveal } from "@/hooks/useReveal";

export default function SearchPage() {
  useReveal();
  const [params, setParams] = useSearchParams();
  const type = params.get("type") ?? "any";
  const brand = params.get("brand") ?? "any";
  const price = params.get("price") ?? "any";
  const location = params.get("location") ?? "any";

  const results = useMemo(() => {
    return LISTINGS.filter((l) => {
      if (type !== "any" && l.category !== type) return false;
      if (brand !== "any" && !l.title.toLowerCase().startsWith(brand.toLowerCase()))
        return false;
      if (location !== "any" && l.city !== location) return false;
      if (price !== "any") {
        const matches = (bound) =>
          l.priceRaw >= bound[0] && l.priceRaw <= bound[1];
        if (price === "Under Rs 20 Lac" && !matches([0, 2000000])) return false;
        if (price === "Rs 20 – 40 Lac" && !matches([2000000, 4000000])) return false;
        if (price === "Rs 40 – 70 Lac" && !matches([4000000, 7000000])) return false;
        if (price === "Rs 70 Lac – 1.5 Cr" && !matches([7000000, 15000000]))
          return false;
        if (price === "Above Rs 1.5 Cr" && l.priceRaw <= 15000000) return false;
      }
      return true;
    });
  }, [type, brand, price, location]);

  const set = (key, value) => {
    const next = new URLSearchParams(params);
    next.set(key, value);
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

  const allBrands = CATEGORIES.flatMap((c) => BRANDS[c.name]);

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <div className="relative overflow-hidden bg-primary text-primary-foreground">
        <img
          src="/manus-storage/carvista-city_c71e1762.png"
          alt="Dealership stock"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.22_0.05_255)]/95 to-[oklch(0.22_0.05_255)]/50" />
        <div className="container relative py-8 md:py-10">
          <h1 className="text-3xl font-display font-bold uppercase tracking-tight md:text-4xl">
            Search results
          </h1>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid gap-3 rounded-lg border border-border bg-card p-3 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
          {select("Type", type, ["Car", "Bike", "Tractor"], "type")}
          {select("Brand", brand, Array.from(new Set(allBrands)), "brand")}
          {select("Price range", price, PRICE_RANGES, "price")}
          {select("Location", location, CITIES, "location")}
        </div>

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
            {results.map((item, i) => (
              <div key={item.id} className="reveal" style={{ transitionDelay: `${i * 50}ms` }}>
                <ListingCard item={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
