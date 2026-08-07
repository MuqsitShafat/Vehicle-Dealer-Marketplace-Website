/**
 * Waseem — Hero with the big search bar.
 * Four filters per the brief: type (Car/Bike/Tractor), brand, price range, location.
 * Deep-blue gradient over the showroom hero image, orange CTA.
 */
import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Search } from "lucide-react";
import gsap from "gsap";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IMAGES, CITIES, PRICE_RANGES } from "@/lib/data";

const TYPES = ["Car", "Bike", "Tractor"];
const ALL_BRANDS = [
  "Toyota",
  "Honda",
  "Suzuki",
  "Yamaha",
  "Kia",
  "Massey Ferguson",
  "Millat",
  "Zetaco",
];

export default function HeroSearch() {
  const [, navigate] = useLocation();
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-animate", {
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.9,
        ease: "power4.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const go = () => {
    navigate(
      `/search?${new URLSearchParams({
        type: type || "any",
        brand: brand || "any",
        price: price || "any",
        location: location || "any",
      }).toString()}`
    );
  };

  return (
    <section className="relative overflow-hidden">
      <img
        src={IMAGES.hero}
        alt="Waseem dealership showroom with a dark-blue SUV at golden hour"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.22_0.05_255)]/92 via-[oklch(0.25_0.055_255)]/80 to-[oklch(0.3_0.06_255)]/50" />

      <div
        ref={containerRef}
        className="container relative pt-28 pb-16 md:pt-36 md:pb-24"
      >
        <p className="hero-animate mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[oklch(0.8_0.15_60)]">
          Your trusted dealership
        </p>
        <h1 className="hero-animate max-w-2xl text-4xl font-display font-bold uppercase leading-[1.02] text-white md:text-6xl">
          Cars. Bikes. Tractors. <br className="hidden md:block" />
        </h1>
        <p className="hero-animate mt-4 max-w-xl text-base text-white/85 md:text-lg">
          Browse verified stock or sell your own vehicle — we handle the
          listing, you get the buyers.
        </p>

        {/* THE search card — type, brand, price range, location */}
        <div className="hero-animate mt-8 max-w-4xl rounded-lg border border-white/20 bg-white p-3 shadow-2xl md:p-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]">
            <div className="rounded-md border border-input bg-background py-1.5 px-3">
              <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                Type
              </label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="mt-1 h-auto w-full border-0 bg-transparent p-0 text-sm font-semibold shadow-none focus:ring-0">
                  <SelectValue placeholder="Any type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any type</SelectItem>
                  {TYPES.map(t => (
                    <SelectItem key={t} value={t}>
                      {t === "Car" ? "Cars" : t + "s"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="rounded-md border border-input bg-background py-1.5 px-3">
              <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                Brand
              </label>
              <Select value={brand} onValueChange={setBrand}>
                <SelectTrigger className="mt-1 h-auto w-full border-0 bg-transparent p-0 text-sm font-semibold shadow-none focus:ring-0">
                  <SelectValue placeholder="Any brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any brand</SelectItem>
                  {ALL_BRANDS.map(b => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="rounded-md border border-input bg-background py-1.5 px-3">
              <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                Price range
              </label>
              <Select value={price} onValueChange={setPrice}>
                <SelectTrigger className="mt-1 h-auto w-full border-0 bg-transparent p-0 text-sm font-semibold shadow-none focus:ring-0">
                  <SelectValue placeholder="Any price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any price</SelectItem>
                  {PRICE_RANGES.map(p => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="rounded-md border border-input bg-background py-1.5 px-3">
              <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                Location
              </label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="mt-1 h-auto w-full border-0 bg-transparent p-0 text-sm font-semibold shadow-none focus:ring-0">
                  <SelectValue placeholder="Any location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any location</SelectItem>
                  {CITIES.map(c => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <button
              onClick={go}
              className="flex items-center justify-center gap-2 rounded-md bg-[oklch(0.72_0.17_55)] px-6 py-2.5 text-sm font-bold text-[oklch(0.2_0.05_255)] transition-shadow hover:shadow-lg"
            >
              <Search className="h-4 w-4" />
              Search
            </button>
          </div>
        </div>

        <p className="hero-animate mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/80">
          <span>240+ verified vehicles in stock</span>
          <span className="hidden sm:inline">•</span>
          <span>Genuine spare parts</span>
          <span className="hidden sm:inline">•</span>
          <span>Trusted since 2005</span>
        </p>
      </div>
    </section>
  );
}
