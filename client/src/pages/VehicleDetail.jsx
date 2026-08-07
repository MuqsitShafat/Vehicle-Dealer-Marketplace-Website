/**
 * Waseem — Vehicle detail page (/vehicle/:id).
 * Photo, title, price, spec rows, contact buttons (call / WhatsApp),
 * status chips (Live / Sold / Pending review), related listings.
 */
import { Link, useRoute, useLocation } from "wouter";
import { toast } from "sonner";
import {
  ArrowLeft,
  BadgeCheck,
  MapPin,
  Fuel,
  Settings2,
  Timer,
  ShieldCheck,
  Phone,
  MessageCircle,
  Tag,
  Gauge,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import ListingCard from "@/components/ListingCard";
import { LISTINGS, CONTACT, IMAGES } from "@/lib/data";
import { useReveal } from "@/hooks/useReveal";
import InfiniteCarousel from "@/components/ui/InfiniteCarousel";

export default function VehicleDetail() {
  useReveal();
  const [, params] = useRoute("/vehicle/:id");
  const [, navigate] = useLocation();
  const id = Number(params?.id);
  const item = LISTINGS.find((l) => l.id === id);
  const car = item ?? LISTINGS[0];

  const isSold = car.status === "Sold";
  const isPending = car.status === "Pending";

  const related = LISTINGS.filter(
    (l) => l.id !== car.id && l.category === car.category && l.status === "Live",
  ).slice(0, 3);

  const categoryPath =
    car.category === "Car" ? "/cars" : `/${car.category.toLowerCase()}s`;

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <div className="container py-6">
        <button
          onClick={() => window.history.back()}
          className="link-draw inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
      </div>

      <div className="container pb-14 lg:grid lg:grid-cols-[1.5fr_1fr] lg:gap-10">
        <div className="reveal">
          <div className="overflow-hidden rounded-lg border border-border bg-card aspect-video w-full relative">
            {car.images && car.images.length > 1 ? (
              <InfiniteCarousel
                images={car.images}
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={car.img}
                alt={`${car.year} ${car.title}`}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="mt-8">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={categoryPath}
                className="rounded-sm bg-primary px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-primary-foreground"
              >
                {car.category}
              </Link>
              <span className="kicker">{car.verified ? "Verified listing" : "Standard listing"}</span>
            </div>
            <h1 className="mt-2 text-3xl font-display font-bold uppercase tracking-tight md:text-4xl">
              {car.year} {car.title}
            </h1>
            <p className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-primary" /> {car.city}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Gauge className="h-4 w-4" /> {car.km}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Fuel className="h-4 w-4" /> {car.fuel}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Settings2 className="h-4 w-4" /> {car.transmission}
              </span>
            </p>
          </div>

          <div className="mt-8">
            {[
              ["Listed", car.days],
              ["Year", String(car.year)],
              ["Transmission", car.transmission],
              ["Fuel", car.fuel],
              ["Condition", car.condition ?? "Good — inspected at showroom"],
              ["Documents", "Complete file, token tax paid"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex items-baseline justify-between border-b border-border py-3.5"
              >
                <span className="text-sm text-muted-foreground">{k}</span>
                <span className="text-sm font-semibold">{v}</span>
              </div>
            ))}
          </div>

          {related.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-display font-bold uppercase tracking-tight">
                Similar in {car.category.toLowerCase()}s
              </h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <ListingCard key={r.id} item={r} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right rail: price + action */}
        <aside className="reveal mt-8 lg:mt-0">
          <div className="sticky top-20 rounded-lg border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <span className="price-chip text-xl">{car.price}</span>
              {isPending && <span className="signal-chip">Pending review</span>}
            </div>
            {isSold && (
              <div className="mt-3 rounded-md bg-muted p-3 text-sm font-bold text-muted-foreground">
                <Tag className="mr-1.5 inline h-4 w-4" />
                This vehicle has been sold.
              </div>
            )}
            {isPending && (
              <div className="mt-3 rounded-md bg-accent p-3 text-sm font-semibold text-accent-foreground">
                This submission is awaiting dealer approval before going live.
              </div>
            )}
            {isSold || isPending ? (
              <button
                onClick={() =>
                  toast("Contact flow is a demo — try the contact section below")
                }
                className="mt-4 w-full rounded-md bg-primary py-3 text-sm font-bold text-primary-foreground transition-shadow hover:shadow-lg"
              >
                <Phone className="mr-2 inline h-4 w-4" /> Ask about availability
              </button>
            ) : (
              <>
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="mt-4 block w-full rounded-md bg-primary py-3 text-center text-sm font-bold text-primary-foreground transition-shadow hover:shadow-lg"
                >
                  <Phone className="mr-2 inline h-4 w-4" /> Call dealer
                </a>
                <a
                  href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi Waseem, I'm interested in the ${car.year} ${car.title} (${car.price})`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 block w-full rounded-md bg-[#25D366] py-3 text-center text-sm font-bold text-white transition-shadow hover:shadow-lg"
                >
                  <MessageCircle className="mr-2 inline h-4 w-4" /> WhatsApp dealer
                </a>
              </>
            )}
            <div className="mt-5 space-y-3 border-t border-border pt-5">
              <div className="flex items-center gap-2.5 text-sm">
                <BadgeCheck className="h-4.5 w-4.5 shrink-0 text-primary" />
                <span>Seller verified by Waseem Motors</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <ShieldCheck className="h-4.5 w-4.5 shrink-0 text-primary" />
                <span>Test drive available at the showroom</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Timer className="h-4.5 w-4.5 shrink-0" />
                {car.days === "Today" ? "Just listed" : `Listed ${car.days}`}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
