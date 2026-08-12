import { useState } from "react";
import { toast } from "sonner";
import { Calendar, Phone, Mail, ArrowRight, MessageCircle } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import ListingCard from "@/components/ListingCard";
import { CONTACT, getCurrentListings } from "@/lib/data";
import { useReveal } from "@/hooks/useReveal";
import { WhatsAppIcon } from "@/components/SocialIcons";

export default function Booking() {
  useReveal();
  const [listings] = useState(() => getCurrentListings());
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [interest, setInterest] = useState("Car");
  const [submitted, setSubmitted] = useState(false);

  const bookingListings = listings.filter((l) => l.bookingEnabled && l.status === "Live");

  const handleSubmit = e => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !city.trim()) {
      toast.error("Please fill in your name, phone, and city.");
      return;
    }
    const normalized = city.toLowerCase().trim();
    if (normalized !== "bhakkar" && normalized !== "bhakar") {
      toast.error("Online vehicle booking is restricted to Bhakkar city users only.");
      return;
    }

    try {
      const existing = JSON.parse(localStorage.getItem("waseem_booking_inquiries") || "[]");
      const newInquiry = {
        id: Date.now(),
        name: name.trim(),
        phone: phone.trim(),
        city: city.trim(),
        interest: interest,
        date: new Date().toLocaleString(),
      };
      localStorage.setItem("waseem_booking_inquiries", JSON.stringify([newInquiry, ...existing]));
    } catch (err) {
      console.error("Error saving booking inquiry:", err);
    }

    setSubmitted(true);
    toast.success("Inquiry received! We will contact you soon.");
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      <SiteHeader />

      <div className="container py-16">
        <div className="text-center max-w-3xl mx-auto">
          <div className="reveal inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <Calendar className="h-3.5 w-3.5" /> Book Your Vehicle
          </div>

          <h1 className="reveal mt-6 text-4xl font-display font-bold uppercase tracking-tight md:text-5xl">
            Online Vehicle Booking
          </h1>

          <p className="reveal mx-auto mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
            Reserve your selected cars, bikes, or tractors directly from our website. Place a hold by selecting a vehicle below and contacting our support desk.
          </p>
        </div>

        {/* Vehicles Available for Booking Grid */}
        {bookingListings.length > 0 ? (
          <div className="mt-12">
            <h2 className="text-2xl font-display font-bold uppercase tracking-tight text-center mb-8">
              Vehicles Available for Booking
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {bookingListings.map((item, i) => (
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
        ) : (
          <div className="reveal mt-12 rounded-lg border border-dashed border-border bg-card p-12 text-center max-w-xl mx-auto">
            <Calendar className="mx-auto h-10 w-10 text-muted-foreground animate-pulse" />
            <p className="mt-3 font-display text-xl font-bold uppercase">No vehicles currently listed for booking</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Our online reservation portal is rolling out. In the meantime, you can place a hold on any vehicle by contacting our desk below.
            </p>
          </div>
        )}

        {/* Info Cards */}
        <div className="reveal mt-16 grid gap-6 md:grid-cols-2 text-left max-w-4xl mx-auto">
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h3 className="font-display text-xl font-bold uppercase tracking-tight">
              Need immediate booking?
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              You can still book any vehicle in our stock today! Contact our
              dealership desk directly by phone or WhatsApp to place a hold.
            </p>
            <div className="mt-5 space-y-3.5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Call Booking Desk
                </p>
                <div className="space-y-1.5">
                  {CONTACT.phones.map((p) => (
                    <a
                      key={p.number}
                      href={`tel:${p.number}`}
                      className="flex items-center gap-2 text-xs font-semibold text-primary hover:underline"
                    >
                      <Phone className="h-3.5 w-3.5" /> {p.name}: {p.number}
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  WhatsApp Support
                </p>
                <a
                  href="https://wa.me/923332834567?text=Hi%20Waseem%20Motors,%20I%20want%20to%20book%20a%20vehicle."
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-md border border-border bg-card p-4 transition-shadow hover:shadow-md max-w-sm"
                >
                  <WhatsAppIcon className="h-5 w-5 shrink-0 text-[#25D366]" />
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                      Muhammad Waseem Awan
                    </p>
                    <p className="text-sm font-semibold text-foreground">0333-2834567</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <p className="font-display text-lg font-bold uppercase text-primary">
                  Request Saved!
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  We have noted your interest in booking a{" "}
                  <strong>{interest}</strong>. Our team will contact you at{" "}
                  <strong>{phone}</strong> soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="font-display text-xl font-bold uppercase tracking-tight">
                  Get Notified
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Leave your details and we will notify you as soon as booking
                  goes live!
                </p>
                <div className="mt-4 space-y-3">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-ring/40"
                  />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-ring/40"
                  />
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Your City (Bhakkar Only)"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-ring/40"
                  />
                  <select
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-ring/40"
                  >
                    <option value="Car">Interested in Cars</option>
                    <option value="Bike">Interested in Bikes</option>
                    <option value="Tractor">Interested in Tractors</option>
                  </select>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-primary py-2 text-xs font-bold text-primary-foreground hover:shadow cursor-pointer"
                  >
                    Keep Me Updated <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
