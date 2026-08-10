/**
 * Waseem — Hero with the big search bar.
 * Four filters per the brief: type (Car/Bike/Tractor), brand, price range, location.
 * Deep-blue gradient over the showroom hero image, orange CTA.
 */
import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Search, MapPin } from "lucide-react";
import gsap from "gsap";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IMAGES, CITIES, PRICE_RANGES, BRANDS } from "@/lib/data";

const TYPES = ["Car", "Bike", "Tractor"];

export default function HeroSearch() {
  const [, navigate] = useLocation();
  const [type, setType] = useState("any");
  const [brand, setBrand] = useState("any");
  const [price, setPrice] = useState("any");
  const [location, setLocation] = useState("any");
  const containerRef = useRef(null);

  // Dynamic brand list based on selected category type
  const availableBrands =
    type && type !== "any"
      ? BRANDS[type]
      : [...BRANDS.Car, ...BRANDS.Bike, ...BRANDS.Tractor];

  // Auto-reset brand if selected brand is not valid for new type selection
  useEffect(() => {
    if (
      type &&
      type !== "any" &&
      brand !== "any" &&
      !BRANDS[type].includes(brand)
    ) {
      setBrand("any");
    }
  }, [type]);

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
    if (
      !type ||
      type === "any" ||
      !brand ||
      brand === "any" ||
      !price ||
      price === "any" ||
      !location ||
      location === "any"
    ) {
      toast.error("Kindly choose all options first! Fields cannot be empty.");
      return;
    }
    navigate(
      `/search?${new URLSearchParams({
        type: type,
        brand: brand,
        price: price,
        location: location,
      }).toString()}`
    );
  };

  return (
    <section className="relative overflow-hidden min-h-[500px] md:min-h-[580px] lg:min-h-[640px] flex items-center pt-8 md:pt-12">
      <img
        src={IMAGES.hero}
        alt="Waseem dealership showroom with a dark-blue SUV at golden hour"
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.22_0.05_255)]/92 via-[oklch(0.25_0.055_255)]/80 to-[oklch(0.3_0.06_255)]/50" />

      <div ref={containerRef} className="container relative w-full">
        <p className="hero-animate mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[oklch(0.8_0.15_60)]">
          Your trusted dealership
        </p>
        <h1 className="hero-animate max-w-2xl text-4xl font-display font-bold uppercase leading-[1.02] text-white md:text-6xl">
          Cars. Bikes. Tractors. <br className="hidden md:block" />
        </h1>
        <p className="hero-animate mt-4 max-w-2xl text-sm md:text-base text-white/90 flex items-start sm:items-center gap-2 font-medium drop-shadow-sm">
          <MapPin className="h-5 w-5 text-[oklch(0.72_0.17_55)] shrink-0 mt-0.5 sm:mt-0" />
          <span>
            Waseem Motors Darya Khan Road Bhakkar Near Noor Mehal — we handle the listing, you get the buyers.
          </span>
        </p>

        {/* THE search card — type, brand, price range, location */}
        <div className="hero-animate mt-8 max-w-4xl rounded-lg border border-white/20 bg-white p-1.5 shadow-2xl">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto] items-center">
            <div className="h-9 rounded-md border border-input bg-background py-0.5 px-2.5 flex flex-col justify-center">
              <label className="block text-[8px] font-bold uppercase tracking-[0.08em] text-muted-foreground leading-none mb-0.5">
                Type
              </label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="mt-0 h-4 w-full border-0 bg-transparent p-0 text-xs font-semibold shadow-none focus:ring-0">
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
            <div className="h-9 rounded-md border border-input bg-background py-0.5 px-2.5 flex flex-col justify-center">
              <label className="block text-[8px] font-bold uppercase tracking-[0.08em] text-muted-foreground leading-none mb-0.5">
                Brand
              </label>
              <Select value={brand} onValueChange={setBrand}>
                <SelectTrigger className="mt-0 h-4 w-full border-0 bg-transparent p-0 text-xs font-semibold shadow-none focus:ring-0">
                  <SelectValue placeholder="Any brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any brand</SelectItem>
                  {availableBrands.map(b => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="h-9 rounded-md border border-input bg-background py-0.5 px-2.5 flex flex-col justify-center">
              <label className="block text-[8px] font-bold uppercase tracking-[0.08em] text-muted-foreground leading-none mb-0.5">
                Price range
              </label>
              <Select value={price} onValueChange={setPrice}>
                <SelectTrigger className="mt-0 h-4 w-full border-0 bg-transparent p-0 text-xs font-semibold shadow-none focus:ring-0">
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
            <div className="h-9 rounded-md border border-input bg-background py-0.5 px-2.5 flex flex-col justify-center">
              <label className="block text-[8px] font-bold uppercase tracking-[0.08em] text-muted-foreground leading-none mb-0.5">
                Location
              </label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="mt-0 h-4 w-full border-0 bg-transparent p-0 text-xs font-semibold shadow-none focus:ring-0">
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
              className="flex h-9 items-center justify-center gap-1.5 rounded-md bg-[oklch(0.72_0.17_55)] px-5 text-xs font-bold text-[oklch(0.2_0.05_255)] transition-shadow hover:shadow-lg w-full lg:w-auto"
            >
              <Search className="h-3.5 w-3.5" />
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
