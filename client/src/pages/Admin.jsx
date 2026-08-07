/**
 * Waseem — Dealer Panel (listings management area).
 * Add new vehicle listings, approve public submissions, mark listings as Sold,
 * or remove them entirely. State persists in localStorage (demo).
 */
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  Tag,
  LayoutDashboard,
  Inbox,
  Package,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import { useReveal } from "@/hooks/useReveal";
import { LISTINGS, IMAGES } from "@/lib/data";

function loadDealerListings() {
  try {
    const raw = localStorage.getItem("waseem_dealer_listings");
    if (raw) return JSON.parse(raw);
  } catch {
    /* fallthrough */
  }
  // First visit: seed with the demo stock
  const seed = LISTINGS.map(({ status, ...rest }) => ({
    ...rest,
    status,
  }));
  localStorage.setItem("waseem_dealer_listings", JSON.stringify(seed));
  return seed;
}

function saveDealerListings(listings) {
  localStorage.setItem("waseem_dealer_listings", JSON.stringify(listings));
}

export default function Admin() {
  useReveal();
  const [dealer, setDealer] = useState(() => loadDealerListings());
  const [publicSubs, setPublicSubs] = useState([]);
  const [tab, setTab] = useState("manage");

  // New listing form
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Car");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    try {
      setPublicSubs(JSON.parse(localStorage.getItem("waseem_submissions") || "[]"));
    } catch {
      setPublicSubs([]);
    }
  }, [tab]);

  const live = dealer.filter((l) => l.status === "Live").length;
  const sold = dealer.filter((l) => l.status === "Sold").length;

  const addListing = (e) => {
    e.preventDefault();
    if (!title.trim() || !price.trim() || !year.trim() || !city.trim()) {
      toast.error("Please fill in every field before adding the listing.");
      return;
    }
    const next = {
      id: Date.now(),
      title,
      category,
      year: Number(year),
      priceRaw: Number(price) || 0,
      price: `Rs ${(Number(price) / 100000).toFixed(2)} Lac`,
      km: "New listing",
      city,
      fuel: category === "Tractor" ? "Diesel" : "Petrol",
      transmission: category === "Tractor" ? "Manual" : "Automatic",
      verified: true,
      status: "Live",
      img:
        category === "Bike"
          ? IMAGES.bike2
          : category === "Tractor"
            ? IMAGES.tractor1
            : IMAGES.sedan,
      days: "Just now",
    };
    const updated = [next, ...dealer];
    setDealer(updated);
    saveDealerListings(updated);
    setTitle("");
    setYear("");
    setPrice("");
    setCity("");
    setTab("manage");
    toast.success(`"${next.title}" is now live.`);
  };

  const setStatus = (id, status) => {
    const updated = dealer.map((l) => (l.id === id ? { ...l, status } : l));
    setDealer(updated);
    saveDealerListings(updated);
    toast.success(
      status === "Sold" ? "Marked as Sold." : status === "Live" ? "Listing restored to Live." : "Listing removed.",
    );
  };

  const approve = (id) => {
    const sub = publicSubs.find((s) => s.id === id);
    if (!sub) return;
    const img =
      sub.photos[0] ||
      (sub.type === "Bike"
        ? IMAGES.bike2
        : sub.type === "Tractor"
          ? IMAGES.tractor1
          : IMAGES.sedan);
    const listing = {
      id: sub.id,
      title: sub.title,
      category: sub.type,
      year: Number(sub.year) || new Date().getFullYear(),
      priceRaw: Number(sub.price) || 0,
      price: `Rs ${(Number(sub.price) / 100000).toFixed(2)} Lac`,
      km: "New listing",
      city: "Dealer stock",
      fuel: sub.type === "Tractor" ? "Diesel" : "Petrol",
      transmission: sub.type === "Tractor" ? "Manual" : "Automatic",
      verified: true,
      status: "Live",
      img,
      days: "Today",
    };
    const updated = [listing, ...dealer];
    setDealer(updated);
    saveDealerListings(updated);
    setPublicSubs(publicSubs.filter((s) => s.id !== id));
    localStorage.setItem(
      "waseem_submissions",
      JSON.stringify(publicSubs.filter((s) => s.id !== id)),
    );
    toast.success(`"${listing.title}" approved and now live.`);
  };

  const reject = (id) => {
    setPublicSubs(publicSubs.filter((s) => s.id !== id));
    localStorage.setItem(
      "waseem_submissions",
      JSON.stringify(publicSubs.filter((s) => s.id !== id)),
    );
    toast.info("Submission rejected.");
  };

  const sections = useMemo(
    () => [
      { id: "manage", label: "Manage Listings", icon: LayoutDashboard, count: dealer.length },
      { id: "pending", label: "Pending Approvals", icon: Inbox, count: publicSubs.length },
      { id: "add", label: "Add Listing", icon: Plus, count: null },
    ],
    [dealer.length, publicSubs.length],
  );

  return (
    <div className="min-h-screen bg-secondary">
      <SiteHeader />

      <div className="reveal container py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="kicker mb-2">Dealer panel</p>
            <h1 className="text-3xl font-display font-bold uppercase tracking-tight md:text-4xl">
              Listings Management
            </h1>
          </div>
          <div className="flex gap-3">
            <div className="rounded-lg border border-border bg-card px-5 py-3 text-center shadow-sm">
              <p className="text-2xl font-display font-bold text-primary">{dealer.length}</p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Total listings
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card px-5 py-3 text-center shadow-sm">
              <p className="text-2xl font-display font-bold">{live}</p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Live
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card px-5 py-3 text-center shadow-sm">
              <p className="text-2xl font-display font-bold text-muted-foreground">{sold}</p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Sold
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setTab(s.id)}
              className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                tab === s.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "border border-border bg-card text-foreground hover:border-primary/50"
              }`}
            >
              <s.icon className="h-4 w-4" />
              {s.label}
              {s.count !== null && (
                <span className="rounded-sm bg-white/15 px-1.5 py-0.5 text-xs">
                  {s.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* MANAGE */}
        {tab === "manage" && (
          <div className="mt-6 overflow-hidden rounded-lg border border-border bg-card shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary text-left">
                    <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Vehicle</th>
                    <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Category</th>
                    <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Price</th>
                    <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">City</th>
                    <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Status</th>
                    <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dealer.map((l) => (
                    <tr key={l.id} className="border-b border-border last:border-0">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img src={l.img} alt={l.title} className="h-10 w-14 rounded object-cover" />
                          <span className="font-semibold">{l.year} {l.title}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{l.category}</td>
                      <td className="px-4 py-3 font-semibold">{l.price}</td>
                      <td className="px-4 py-3 text-muted-foreground">{l.city}</td>
                      <td className="px-4 py-3">
                        {l.status === "Live" && (
                          <span className="inline-flex items-center gap-1 rounded-sm bg-primary px-2 py-1 text-[11px] font-bold text-primary-foreground">
                            <CheckCircle2 className="h-3 w-3" /> Live
                          </span>
                        )}
                        {l.status === "Pending" && (
                          <span className="signal-chip">Pending</span>
                        )}
                        {l.status === "Sold" && (
                          <span className="inline-flex items-center gap-1 rounded-sm bg-muted px-2 py-1 text-[11px] font-bold text-muted-foreground">
                            <Tag className="h-3 w-3" /> Sold
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1.5">
                          {l.status !== "Sold" && (
                            <button
                              onClick={() => setStatus(l.id, "Sold")}
                              title="Mark as Sold"
                              className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1.5 text-xs font-semibold hover:border-primary/50 hover:text-primary"
                            >
                              <Tag className="h-3.5 w-3.5" /> Mark Sold
                            </button>
                          )}
                          {l.status !== "Live" && (
                            <button
                              onClick={() => setStatus(l.id, "Live")}
                              title="Restore"
                              className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1.5 text-xs font-semibold hover:border-primary/50 hover:text-primary"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5" /> Live
                            </button>
                          )}
                          <button
                            onClick={() => {
                              if (window.confirm(`Remove "${l.title}"?`)) setStatus(l.id, "Sold");
                            }}
                            title="Remove"
                            className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1.5 text-xs font-semibold text-destructive hover:bg-destructive/5"
                          >
                            <Trash2 className="h-3.5 w-3.5" /> Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PENDING */}
        {tab === "pending" && (
          <div className="mt-6">
            {publicSubs.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border bg-card p-12 text-center">
                <Inbox className="mx-auto h-10 w-10 text-muted-foreground" />
                <p className="mt-3 font-display text-xl font-bold">No pending submissions</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Public "Sell Your Vehicle" submissions appear here until you approve or reject them.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {publicSubs.map((s) => (
                  <div key={s.id} className="rounded-lg border border-border bg-card p-5 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                          {s.type} • {s.year || "Year not given"}
                        </p>
                        <h3 className="mt-0.5 text-xl font-display font-bold">{s.title}</h3>
                        <p className="mt-1 price-chip">Rs {Number(s.price || 0).toLocaleString()}</p>
                      </div>
                      {s.photos[0] && (
                        <img src={s.photos[0]} alt={s.title} className="h-16 w-20 rounded object-cover" />
                      )}
                    </div>
                    {s.description && (
                      <p className="mt-3 text-xs text-muted-foreground">{s.description}</p>
                    )}
                    <p className="mt-3 text-xs text-muted-foreground">
                      From: {s.name} — {s.phone} • {new Date(s.createdAt).toLocaleString()}
                    </p>
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => approve(s.id)}
                        className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition-shadow hover:shadow-md"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" /> Approve & publish
                      </button>
                      <button
                        onClick={() => reject(s.id)}
                        className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2 text-xs font-bold text-destructive hover:bg-destructive/5"
                      >
                        <XCircle className="h-3.5 w-3.5" /> Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ADD */}
        {tab === "add" && (
          <form
            onSubmit={addListing}
            className="mt-6 max-w-2xl rounded-lg border border-border bg-card p-6 shadow-sm"
          >
            <h2 className="flex items-center gap-2 text-xl font-display font-bold">
              <Package className="h-5 w-5 text-primary" /> Add a new listing
            </h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  Make & model
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Toyota Corolla Altis"
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/40"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  Category
                </label>
                <div className="mt-1 grid grid-cols-3 gap-2">
                  {["Car", "Bike", "Tractor"].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCategory(c)}
                      className={`rounded-md border px-3 py-2 text-sm font-semibold transition-colors ${
                        category === c
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-input bg-background hover:border-primary/50"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  Year
                </label>
                <input
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="e.g. 2022"
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/40"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  Price (Rs)
                </label>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. 7250000"
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/40"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  City
                </label>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Lahore"
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/40"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-[oklch(0.72_0.17_55)] px-6 py-3 text-sm font-bold text-[oklch(0.2_0.05_255)] transition-shadow hover:shadow-lg"
            >
              <Plus className="h-4 w-4" /> Publish listing
            </button>
            <p className="mt-3 text-[11px] text-muted-foreground">
              The listing goes live immediately and appears on the site with a default stock photo — replace photos via the panel later.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
