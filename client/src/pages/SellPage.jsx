/**
 * Waseem — Sell Your Vehicle (public form).
 * Type, title, year, price, description, photos (upload preview), contact info.
 * Submissions are stored locally as "Pending review" and appear on the Dealer Panel.
 */
import { useState } from "react";
import { toast } from "sonner";
import { Camera, Plus, X, CheckCircle2 } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import { CATEGORIES, IMAGES, getBrandFromTitle, formatPrice } from "@/lib/data";
import { useReveal } from "@/hooks/useReveal";
import { WhatsAppIcon } from "@/components/SocialIcons";
import { supabase } from "@/lib/supabase";

async function uploadImageToSupabase(file, bucketName) {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName);

    return publicUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
}

export default function SellPage() {
  useReveal();
  const [type, setType] = useState("Car");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [photos, setPhotos] = useState([]);
  const [photoFiles, setPhotoFiles] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onPhotos = files => {
    if (!files) return;
    const filesArray = Array.from(files);
    setPhotoFiles(p => [...p, ...filesArray].slice(0, 4));

    const next = [];
    filesArray.forEach(file => {
      if (next.length + photos.length >= 4) return;
      const reader = new FileReader();
      reader.onload = () => next.push(reader.result);
      reader.readAsDataURL(file);
    });
    setTimeout(() => setPhotos(p => [...p, ...next].slice(0, 4)), 100);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !price.trim() || !name.trim() || !phone.trim()) {
      toast.error("Please fill in the title, price and your contact details.");
      return;
    }
    
    setIsSubmitting(true);
    toast.loading("Uploading photos and saving your submission...");

    try {
      const uploadedUrls = [];
      for (const file of photoFiles) {
        const url = await uploadImageToSupabase(file, "listings");
        if (url) {
          uploadedUrls.push(url);
        }
      }

      const mainImg = uploadedUrls[0] || (
        type === "Bike"
          ? "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80"
          : type === "Tractor"
            ? "https://images.unsplash.com/photo-1599930995924-f7b2c019ff56?auto=format&fit=crop&w=800&q=80"
            : "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80"
      );

      const { error } = await supabase
        .from("listings")
        .insert([{
          title: title.trim(),
          category: type,
          brand: getBrandFromTitle(title, type),
          year: Number(year) || new Date().getFullYear(),
          price: formatPrice(price),
          price_raw: Number(price) || 0,
          km: `${name.trim()} | ${phone.trim()}`,
          city: description.trim() || "No description provided",
          fuel: type === "Tractor" ? "Diesel" : "Petrol",
          transmission: type === "Tractor" ? "Manual" : "Automatic",
          verified: false,
          status: "Pending",
          source: "public",
          booking_enabled: false,
          img: mainImg,
          images: uploadedUrls.length > 0 ? uploadedUrls : [mainImg]
        }]);

      if (error) throw error;

      toast.dismiss();
      setSubmitted(true);
      toast.success("Submission received — awaiting dealer approval.");
    } catch (err) {
      toast.dismiss();
      console.error("Error submitting listing:", err);
      toast.error("Failed to submit. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen">
        <SiteHeader />
        <div className="container flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
          <CheckCircle2 className="h-14 w-14 text-primary" />
          <h1 className="mt-5 text-3xl font-display font-bold uppercase tracking-tight">
            Submission received!
          </h1>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            Your {type.toLowerCase()} listing is now{" "}
            <strong>Pending review</strong>. Our dealer team approves every
            submission within 24 hours — you'll be contacted on the number you
            provided.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setTitle("");
              setYear("");
              setPrice("");
              setDescription("");
              setName("");
              setPhone("");
              setPhotos([]);
            }}
            className="mt-6 rounded-md bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground transition-shadow hover:shadow-md"
          >
            Submit another vehicle
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <div className="relative overflow-hidden bg-primary text-primary-foreground">
        <img
          src={IMAGES.city}
          alt="Selling your vehicle"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#e63946]/95 to-[#e63946]/50" />
        <div className="container relative py-12 md:py-16">
          <p className="kicker mb-2 text-white/90">Free listing</p>
          <h1 className="text-4xl font-display font-bold uppercase tracking-tight md:text-5xl">
            Sell Your Vehicle
          </h1>
          <p className="mt-2 max-w-xl text-sm text-white/80">
            Tell us about your car, bike or tractor. Once our team approves it,
            your listing goes live with full dealer support.
          </p>
        </div>
      </div>

      <div className="container py-10 lg:grid lg:grid-cols-[1.3fr_1fr] lg:gap-10">
        <form
          onSubmit={submit}
          className="reveal flex flex-col gap-5 rounded-lg border border-border bg-card p-6 shadow-sm"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                Vehicle type
              </label>
              <div className="mt-1 grid grid-cols-3 gap-2">
                {CATEGORIES.map(c => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setType(c.name)}
                    className={`rounded-md border px-3 py-2 text-sm font-semibold transition-colors ${
                      type === c.name
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-input bg-background hover:border-primary/50"
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                Title (make & model)
              </label>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Toyota Corolla Altis"
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/40"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                Year
              </label>
              <input
                value={year}
                onChange={e => setYear(e.target.value)}
                placeholder="e.g. 2021"
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/40"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                Asking price (Rs)
              </label>
              <input
                value={price}
                onChange={e => setPrice(e.target.value)}
                placeholder="e.g. 7250000"
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/40"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
              Description
            </label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={4}
              placeholder="Condition, mileage, registration city, any repairs..."
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/40"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
              Photos (up to 4)
            </label>
            <div className="mt-1 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {photos.map((p, i) => (
                <div
                  key={i}
                  className="relative aspect-square overflow-hidden rounded-md border border-border"
                >
                  <img
                    src={p}
                    alt={`Upload ${i + 1}`}
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPhotos(ps => ps.filter((_, j) => j !== i));
                      setPhotoFiles(ps => ps.filter((_, j) => j !== i));
                    }}
                    className="absolute right-1 top-1 rounded-full bg-primary p-1 text-white"
                    aria-label="Remove photo"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
              {photos.length < 4 && (
                <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1.5 rounded-md border border-dashed border-input bg-background text-muted-foreground hover:border-primary">
                  <Camera className="h-5 w-5" />
                  <Plus className="h-4 w-4" />
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={e => onPhotos(e.target.files)}
                  />
                </label>
              )}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                Your name
              </label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Full name"
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/40"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                Phone / WhatsApp
              </label>
              <input
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+92 300 1234567"
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/40"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-[oklch(0.72_0.17_55)] px-6 py-3 text-sm font-bold text-[oklch(0.2_0.05_255)] transition-shadow hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit for approval"}
            </button>
            <a
              href={`https://wa.me/923121537773?text=${encodeURIComponent(`Hi Waseem Motors, I would like to submit my ${type} (${title || "Vehicle"}) for approval and listing.`)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-[#25D366] text-[#25D366] hover:bg-[#25D366]/5 px-6 py-3 text-sm font-bold transition-all cursor-pointer"
            >
              <WhatsAppIcon className="h-4 w-4" /> Send message on WhatsApp
            </a>
          </div>
          <p className="text-[11px] text-muted-foreground">
            Your listing stays pending until a dealer approves it. We never
            share your contact details publicly.
          </p>
        </form>

        <aside className="reveal mt-8 lg:mt-0">
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-display font-bold">
              What happens next?
            </h2>
            <ol className="mt-4 space-y-4 text-sm">
              {[
                ["1", "You submit the form — it takes under two minutes."],
                ["2", "Our dealer team reviews it within 24 hours."],
                ["3", "Once approved, your vehicle appears live on the site."],
                ["4", "Buyers contact you directly by phone or WhatsApp."],
              ].map(([n, t]) => (
                <li key={n} className="flex gap-3">
                  <span className="font-display text-lg font-bold text-primary">
                    {n}
                  </span>
                  <span className="text-muted-foreground">{t}</span>
                </li>
              ))}
            </ol>
            <p className="mt-5 rounded-md bg-secondary p-3 text-xs text-secondary-foreground">
              Prefer to hand it over completely? Visit the showroom or WhatsApp
              us — we handle inspection, photos and paperwork.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
