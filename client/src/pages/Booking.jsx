import { useState } from "react";
import { toast } from "sonner";
import { Calendar, Phone, Mail, ArrowRight, MessageCircle } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import { CONTACT } from "@/lib/data";
import { useReveal } from "@/hooks/useReveal";

export default function Booking() {
  useReveal();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("Car");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast.error("Please fill in your name and phone number.");
      return;
    }
    setSubmitted(true);
    toast.success("Inquiry received! We will contact you soon.");
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      <SiteHeader />

      <div className="container py-16 text-center max-w-3xl">
        <div className="reveal inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
          <Calendar className="h-3.5 w-3.5" /> Coming Soon
        </div>
        
        <h1 className="reveal mt-6 text-4xl font-display font-bold uppercase tracking-tight md:text-5xl">
          Online Vehicle Booking
        </h1>
        
        <p className="reveal mx-auto mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
          We are building a seamless online booking portal. Soon, you will be able to reserve your selected cars, bikes, or tractors directly from our website with a small deposit.
        </p>

        {/* Info Cards */}
        <div className="reveal mt-12 grid gap-6 sm:grid-cols-2 text-left">
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h3 className="font-display text-xl font-bold uppercase tracking-tight">Need immediate booking?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              You can still book any vehicle in our stock today! Contact our dealership desk directly by phone or WhatsApp to place a hold.
            </p>
            <div className="mt-5 space-y-2">
              <a
                href={`tel:${CONTACT.phone}`}
                className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                <Phone className="h-4 w-4" /> {CONTACT.phone}
              </a>
              <a
                href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}?text=Hi%20Waseem%20Motors,%20I%20want%20to%20book%20a%20vehicle.`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm font-semibold text-[#25D366] hover:underline"
              >
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <p className="font-display text-lg font-bold uppercase text-primary">Request Saved!</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  We have noted your interest in booking a <strong>{interest}</strong>. Our team will contact you at <strong>{phone}</strong> soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="font-display text-xl font-bold uppercase tracking-tight">Get Notified</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Leave your details and we will notify you as soon as booking goes live!
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
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-primary py-2 text-xs font-bold text-primary-foreground hover:shadow"
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
