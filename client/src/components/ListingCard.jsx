/**
 * Waseem — Clean modern listing card.
 * White card, image, title, price, key specs, "View Details" button.
 * Status chips: Verified (blue), Sold (muted overlay), Pending review (orange).
 */
import { Link } from "wouter";
import { BadgeCheck, MapPin, Gauge, Fuel, Cog, Timer } from "lucide-react";
import InfiniteCarousel from "@/components/ui/InfiniteCarousel";

export default function ListingCard({ item }) {
  const isSold = item.status === "Sold";
  const isPending = item.status === "Pending";

  return (
    <div
      className={`group flex flex-col overflow-hidden rounded-lg border bg-card transition-all duration-200 hover:shadow-lg ${
        isSold ? "border-muted opacity-75" : "border-border"
      }`}
    >
      <Link href={`/vehicle/${item.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
          {item.images && item.images.length > 1 ? (
            <InfiniteCarousel
              images={item.images}
              className="transition-transform duration-300 group-hover:scale-[1.04]"
            />
          ) : (
            <img
              src={item.img}
              alt={item.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
            />
          )}
          <div className="absolute bottom-3 left-3">
            <span className="price-chip">{item.price}</span>
          </div>
          <div className="absolute right-3 top-3 flex flex-col items-end gap-1.5">
            {isPending && <span className="signal-chip">Pending review</span>}
            {!isSold && !isPending && item.verified && (
              <span className="inline-flex items-center gap-1 rounded-sm bg-card/95 px-2 py-1 text-xs font-semibold backdrop-blur">
                <BadgeCheck className="h-3.5 w-3.5 text-primary" /> Verified
              </span>
            )}
            {item.bookingEnabled && (
              <span className="inline-flex items-center gap-1 rounded-sm bg-[#25D366] px-2 py-1 text-[10px] font-bold text-white shadow-sm uppercase tracking-wide">
                Booking available
              </span>
            )}
          </div>
          {isSold && (
            <div className="absolute inset-0 flex items-center justify-center bg-primary/60">
              <span className="rounded-sm bg-white px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-primary">
                Sold
              </span>
            </div>
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {item.category} • {item.year}
            </p>
            <Link href={`/vehicle/${item.id}`}>
              <h3 className="mt-0.5 text-xl font-bold leading-tight text-card-foreground">
                {item.year} {item.title}
              </h3>
            </Link>
          </div>
          <span className="shrink-0 text-[11px] font-medium text-muted-foreground">
            <Timer className="mr-1 inline h-3 w-3" />
            {item.days}
          </span>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" /> {item.city}
          </span>
          <span className="inline-flex items-center gap-1">
            <Gauge className="h-3.5 w-3.5" /> {item.source === "public" ? "Muhammad Akash Awan | 0312-1537773" : item.km}
          </span>
          <span className="inline-flex items-center gap-1">
            <Fuel className="h-3.5 w-3.5" /> {item.fuel}
          </span>
          <span className="inline-flex items-center gap-1">
            <Cog className="h-3.5 w-3.5" /> {item.transmission}
          </span>
        </div>
        <Link
          href={`/vehicle/${item.id}`}
          className="mt-1 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-shadow hover:shadow-md"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
