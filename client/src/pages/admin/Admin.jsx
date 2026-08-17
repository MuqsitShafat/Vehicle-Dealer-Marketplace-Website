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
  Camera,
  X,
  Wrench,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import { useReveal } from "@/hooks/useReveal";
import { getCurrentListings, getCurrentSpareParts, getBrandFromTitle, IMAGES, formatPrice } from "@/lib/data";
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



export default function Admin() {
  useReveal();
  const [dealer, setDealer] = useState([]);
  const [publicSubs, setPublicSubs] = useState([]);
  const [tab, setTab] = useState("manage");

  // New listing form
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Car");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [photoFiles, setPhotoFiles] = useState([]);
  const [bookingEnabled, setBookingEnabled] = useState(false);

  const [parts, setParts] = useState([]);

  // New spare part form states
  const [partName, setPartName] = useState("");
  const [partPrice, setPartPrice] = useState("");
  const [partCompatible, setPartCompatible] = useState("");
  const [partPhoto, setPartPhoto] = useState("");
  const [partPhotoFile, setPartPhotoFile] = useState(null);

  // Editing states for Listings
  const [editingListing, setEditingListing] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("Car");
  const [editYear, setEditYear] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editCity, setEditCity] = useState("");
  const [editPhotos, setEditPhotos] = useState([]);
  const [editPhotoFiles, setEditPhotoFiles] = useState([]);
  const [editBookingEnabled, setEditBookingEnabled] = useState(false);

  // Editing states for Parts
  const [editingPart, setEditingPart] = useState(null);
  const [editPartName, setEditPartName] = useState("");
  const [editPartPrice, setEditPartPrice] = useState("");
  const [editPartCompatible, setEditPartCompatible] = useState("");
  const [editPartPhoto, setEditPartPhoto] = useState("");
  const [editPartPhotoFile, setEditPartPhotoFile] = useState(null);

  const [bookingInquiries, setBookingInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const { data: dbListings, error: listingsErr } = await supabase
        .from("listings")
        .select("*")
        .order("id", { ascending: false });

      if (listingsErr) throw listingsErr;

      const mappedListings = (dbListings || []).map(item => ({
        id: item.id,
        title: item.title,
        category: item.category,
        brand: item.brand,
        year: item.year,
        price: item.price,
        priceRaw: Number(item.price_raw),
        km: item.km,
        city: item.city,
        fuel: item.fuel,
        transmission: item.transmission,
        verified: item.verified,
        status: item.status,
        source: item.source,
        bookingEnabled: item.booking_enabled,
        img: item.img,
        images: item.images || [],
      }));

      setDealer(mappedListings.filter(l => l.source === "dealer" || (l.source === "public" && l.status !== "Pending")));
      setPublicSubs(mappedListings.filter(l => l.source === "public" && l.status === "Pending"));

      const { data: dbParts, error: partsErr } = await supabase
        .from("spare_parts")
        .select("*")
        .order("id", { ascending: false });

      if (partsErr) throw partsErr;

      setParts((dbParts || []).map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        priceRaw: Number(item.price_raw),
        compatible: item.compatible || [],
        img: item.img,
      })));

      const { data: dbInquiries, error: inquiriesErr } = await supabase
        .from("booking_inquiries")
        .select("*")
        .order("id", { ascending: false });

      if (inquiriesErr) throw inquiriesErr;

      setBookingInquiries((dbInquiries || []).map(item => ({
        id: item.id,
        name: item.name,
        phone: item.phone,
        city: item.city,
        interest: item.interest,
        date: new Date(item.created_at).toLocaleString(),
      })));

    } catch (err) {
      console.error("Error loading admin data:", err);
      toast.error("Failed to load live database data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [tab]);

  const startEditingListing = (item) => {
    setEditingListing(item);
    setEditTitle(item.title);
    setEditCategory(item.category);
    setEditYear(item.year.toString());
    setEditPrice(item.priceRaw ? item.priceRaw.toString() : item.price.replace(/[^\d]/g, ""));
    setEditCity(item.city);
    setEditPhotos(item.images || [item.img]);
    setEditBookingEnabled(!!item.bookingEnabled);
    setEditPhotoFiles([]);
  };

  const saveEditedListing = async (e) => {
    e.preventDefault();
    if (!editTitle.trim() || !editPrice.trim() || !editYear.trim() || !editCity.trim()) {
      toast.error("Please fill in all listing fields.");
      return;
    }

    toast.loading("Saving changes...");

    try {
      let finalImages = editPhotos;
      if (editPhotoFiles.length > 0) {
        const uploadedUrls = [];
        for (const file of editPhotoFiles) {
          const url = await uploadImageToSupabase(file, "listings");
          if (url) uploadedUrls.push(url);
        }
        if (uploadedUrls.length > 0) {
          finalImages = uploadedUrls;
        }
      }

      const mainImg = finalImages[0] || editingListing.img;

      const { error } = await supabase
        .from("listings")
        .update({
          title: editTitle.trim(),
          category: editCategory,
          brand: getBrandFromTitle(editTitle, editCategory),
          year: Number(editYear),
          price_raw: Number(editPrice) || 0,
          price: formatPrice(editPrice),
          city: editCity.trim(),
          img: mainImg,
          images: finalImages,
          booking_enabled: editBookingEnabled
        })
        .eq("id", editingListing.id);

      if (error) throw error;

      toast.dismiss();
      toast.success(`Listing "${editTitle}" updated successfully.`);
      setEditingListing(null);
      setEditPhotoFiles([]);
      loadData();
    } catch (err) {
      toast.dismiss();
      console.error("Error updating listing:", err);
      toast.error("Failed to save changes.");
    }
  };

  const handleEditPhotosChange = (e) => {
    const files = e.target.files;
    if (!files) return;
    const filesArray = Array.from(files);
    setEditPhotoFiles(filesArray);

    const promises = filesArray.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(file);
      });
    });
    Promise.all(promises).then((results) => {
      setEditPhotos(results.slice(0, 4));
    });
  };

  const startEditingPart = (part) => {
    setEditingPart(part);
    setEditPartName(part.name);
    setEditPartPrice(part.price.replace(/[^\d]/g, ""));
    setEditPartCompatible(part.compatible.join(", "));
    setEditPartPhoto(part.img);
    setEditPartPhotoFile(null);
  };

  const saveEditedPart = async (e) => {
    e.preventDefault();
    if (!editPartName.trim() || !editPartPrice.trim() || !editPartCompatible.trim()) {
      toast.error("Please fill in all spare part fields.");
      return;
    }

    toast.loading("Saving spare part changes...");

    try {
      let finalImg = editPartPhoto || editingPart.img;
      if (editPartPhotoFile) {
        const url = await uploadImageToSupabase(editPartPhotoFile, "parts");
        if (url) finalImg = url;
      }

      const { error } = await supabase
        .from("spare_parts")
        .update({
          name: editPartName.trim(),
          price: editPartPrice.startsWith("Rs") ? editPartPrice : `Rs ${Number(editPartPrice).toLocaleString()}`,
          price_raw: Number(editPartPrice) || 0,
          compatible: editPartCompatible.split(",").map(s => s.trim()).filter(Boolean),
          img: finalImg
        })
        .eq("id", editingPart.id);

      if (error) throw error;

      toast.dismiss();
      toast.success(`Spare part "${editPartName}" updated successfully.`);
      setEditingPart(null);
      setEditPartPhotoFile(null);
      loadData();
    } catch (err) {
      toast.dismiss();
      console.error("Error saving spare part:", err);
      toast.error("Failed to save spare part.");
    }
  };

  const handleEditPartPhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setEditPartPhotoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditPartPhoto(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeInquiry = async (id) => {
    try {
      const { error } = await supabase
        .from("booking_inquiries")
        .delete()
        .eq("id", id);
      if (error) throw error;
      toast.success("Inquiry resolved and removed.");
      loadData();
    } catch (err) {
      console.error("Error removing inquiry:", err);
      toast.error("Failed to remove inquiry.");
    }
  };

  const live = dealer.filter(l => l.status === "Live").length;
  const sold = dealer.filter(l => l.status === "Sold").length;

  const handlePhotosChange = e => {
    const files = e.target.files;
    if (!files) return;
    const filesArray = Array.from(files);
    setPhotoFiles(p => [...p, ...filesArray].slice(0, 4));

    const promises = filesArray.map(file => {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(file);
      });
    });
    Promise.all(promises).then(results => {
      setUploadedPhotos(prev => [...prev, ...results].slice(0, 4));
    });
  };

  const removePhoto = idx => {
    setUploadedPhotos(prev => prev.filter((_, i) => i !== idx));
    setPhotoFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const handlePartPhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPartPhotoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPartPhoto(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const addListing = async (e) => {
    e.preventDefault();
    if (!title.trim() || !price.trim() || !year.trim() || !city.trim()) {
      toast.error("Please fill in every field before adding the listing.");
      return;
    }

    toast.loading("Uploading photos and adding listing...");

    try {
      const uploadedUrls = [];
      for (const file of photoFiles) {
        const url = await uploadImageToSupabase(file, "listings");
        if (url) {
          uploadedUrls.push(url);
        }
      }

      const mainImg = uploadedUrls[0] || (
        category === "Bike"
          ? "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80"
          : category === "Tractor"
            ? "https://images.unsplash.com/photo-1599930995924-f7b2c019ff56?auto=format&fit=crop&w=800&q=80"
            : "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80"
      );

      const { error } = await supabase
        .from("listings")
        .insert([{
          title: title.trim(),
          category,
          brand: getBrandFromTitle(title, category),
          year: Number(year),
          price: formatPrice(price),
          price_raw: Number(price) || 0,
          km: "New listing",
          city: city.trim(),
          fuel: category === "Tractor" ? "Diesel" : "Petrol",
          transmission: category === "Tractor" ? "Manual" : "Automatic",
          verified: true,
          status: "Live",
          source: "dealer",
          booking_enabled: bookingEnabled,
          img: mainImg,
          images: uploadedUrls.length > 0 ? uploadedUrls : [mainImg]
        }]);

      if (error) throw error;

      toast.dismiss();
      toast.success(`"${title}" is now live.`);
      setTitle("");
      setYear("");
      setPrice("");
      setCity("");
      setUploadedPhotos([]);
      setPhotoFiles([]);
      setBookingEnabled(false);
      setTab("manage");
      loadData();
    } catch (err) {
      toast.dismiss();
      console.error("Error adding listing:", err);
      toast.error("Failed to add listing.");
    }
  };

  const setStatus = async (id, status) => {
    try {
      if (status === "Removed") {
        const { error } = await supabase
          .from("listings")
          .delete()
          .eq("id", id);
        if (error) throw error;
        toast.success("Listing removed.");
      } else {
        const { error } = await supabase
          .from("listings")
          .update({ status })
          .eq("id", id);
        if (error) throw error;
        toast.success(
          status === "Sold" ? "Marked as Sold." : "Listing restored to Live."
        );
      }
      loadData();
    } catch (err) {
      console.error("Error setting status:", err);
      toast.error("Failed to update listing status.");
    }
  };

  const approve = async (id) => {
    try {
      const { error } = await supabase
        .from("listings")
        .update({ status: "Live", verified: true })
        .eq("id", id);
      if (error) throw error;
      toast.success("Listing approved and now live in Marketplace.");
      loadData();
    } catch (err) {
      console.error("Error approving listing:", err);
      toast.error("Failed to approve listing.");
    }
  };

  const reject = async (id) => {
    try {
      const { error } = await supabase
        .from("listings")
        .delete()
        .eq("id", id);
      if (error) throw error;
      toast.info("Submission rejected.");
      loadData();
    } catch (err) {
      console.error("Error rejecting listing:", err);
      toast.error("Failed to reject listing.");
    }
  };

  const removeListing = async (id) => {
    try {
      const { error } = await supabase
        .from("listings")
        .delete()
        .eq("id", id);
      if (error) throw error;
      toast.info("Listing removed from database.");
      loadData();
    } catch (err) {
      console.error("Error removing listing:", err);
      toast.error("Failed to remove listing.");
    }
  };

  const toggleBooking = async (id) => {
    const listing = dealer.find(l => l.id === id);
    if (!listing) return;
    try {
      const { error } = await supabase
        .from("listings")
        .update({ booking_enabled: !listing.bookingEnabled })
        .eq("id", id);
      if (error) throw error;
      if (!listing.bookingEnabled) {
        toast.success(`"${listing.title}" enabled for booking.`);
      } else {
        toast.info(`"${listing.title}" disabled for booking.`);
      }
      loadData();
    } catch (err) {
      console.error("Error toggling booking:", err);
      toast.error("Failed to toggle booking status.");
    }
  };

  const addSparePart = async (e) => {
    e.preventDefault();
    if (!partName.trim() || !partPrice.trim() || !partCompatible.trim()) {
      toast.error("Please fill in the part details first.");
      return;
    }

    toast.loading("Adding spare part...");

    try {
      let partImgUrl = IMAGES.part1;
      if (partPhotoFile) {
        const url = await uploadImageToSupabase(partPhotoFile, "parts");
        if (url) partImgUrl = url;
      }

      const { error } = await supabase
        .from("spare_parts")
        .insert([{
          name: partName.trim(),
          price: partPrice.startsWith("Rs") ? partPrice : `Rs ${Number(partPrice).toLocaleString()}`,
          price_raw: Number(partPrice) || 0,
          compatible: partCompatible.split(",").map(s => s.trim()).filter(Boolean),
          img: partImgUrl
        }]);

      if (error) throw error;

      toast.dismiss();
      toast.success(`"${partName}" added to Spare Parts.`);
      setPartName("");
      setPartPrice("");
      setPartCompatible("");
      setPartPhoto("");
      setPartPhotoFile(null);
      loadData();
    } catch (err) {
      toast.dismiss();
      console.error("Error adding part:", err);
      toast.error("Failed to add spare part.");
    }
  };

  const removeSparePart = async (id) => {
    try {
      const { error } = await supabase
        .from("spare_parts")
        .delete()
        .eq("id", id);
      if (error) throw error;
      toast.info("Spare part removed.");
      loadData();
    } catch (err) {
      console.error("Error removing spare part:", err);
      toast.error("Failed to remove spare part.");
    }
  };

  const sections = useMemo(
    () => [
      {
        id: "manage",
        label: "Manage Listings",
        icon: LayoutDashboard,
        count: dealer.length,
      },
      {
        id: "pending",
        label: "Pending Approvals",
        icon: Inbox,
        count: publicSubs.length,
      },
      {
        id: "booking",
        label: "Booking Panel",
        icon: Tag,
        count: dealer.filter((d) => d.bookingEnabled).length,
      },
      {
        id: "parts",
        label: "Manage Parts",
        icon: Wrench,
        count: parts.length,
      },
      { id: "add", label: "Add Listing", icon: Plus, count: null },
    ],
    [dealer, publicSubs.length, parts.length]
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
              <p className="text-2xl font-display font-bold text-primary">
                {dealer.length}
              </p>
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
              <p className="text-2xl font-display font-bold text-muted-foreground">
                {sold}
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Sold
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {sections.map(s => (
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
                    <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                      Vehicle
                    </th>
                    <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                      Category
                    </th>
                    <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                      Price
                    </th>
                    <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                      City
                    </th>
                    <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                      Status
                    </th>
                    <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dealer.map(l => (
                    <tr
                      key={l.id}
                      className="border-b border-border last:border-0"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={l.img}
                            alt={l.title}
                            className="h-10 w-14 rounded object-cover"
                          />
                          <div>
                            <span className="font-semibold block">
                              {l.year} {l.title}
                            </span>
                            {l.source === "public" && (
                              <span className="text-[10px] text-muted-foreground block mt-0.5 font-semibold">
                                Marketplace (Seller: {l.km})
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {l.category}
                      </td>
                      <td className="px-4 py-3 font-semibold">{l.price}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {l.city}
                      </td>
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
                          <button
                            onClick={() => startEditingListing(l)}
                            title="Update Listing"
                            className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1.5 text-xs font-semibold text-primary hover:bg-primary/5"
                          >
                            Update
                          </button>
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
                              if (window.confirm(`Are you sure you want to permanently delete "${l.title}" from the database?`))
                                removeListing(l.id);
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
                <p className="mt-3 font-display text-xl font-bold">
                  No pending submissions
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Public "Sell Your Vehicle" submissions appear here until you
                  approve or reject them.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {publicSubs.map(s => (
                  <div
                    key={s.id}
                    className="rounded-lg border border-border bg-card p-5 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                          {s.category} • {s.year || "Year not given"}
                        </p>
                        <h3 className="mt-0.5 text-xl font-display font-bold">
                          {s.title}
                        </h3>
                        <p className="mt-1 price-chip">
                          {s.price}
                        </p>
                      </div>
                      {s.img && (
                        <img
                          src={s.img}
                          alt={s.title}
                          className="h-16 w-20 rounded object-cover"
                        />
                      )}
                    </div>
                    {s.city && (
                      <p className="mt-3 text-xs text-muted-foreground">
                        {s.city}
                      </p>
                    )}
                    <p className="mt-3 text-xs text-muted-foreground">
                      From: {(s.km || "").split(" | ")[0] || "Anonymous"} — {(s.km || "").split(" | ")[1] || "No phone"}
                    </p>
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => approve(s.id)}
                        className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition-shadow hover:shadow-md"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" /> Approve &
                        publish
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

        {/* BOOKING PANEL */}
        {tab === "booking" && (
          <div className="mt-6 space-y-4">
            <div className="flex justify-between items-center bg-card border border-border p-4 rounded-lg shadow-sm">
              <div>
                <h2 className="text-lg font-display font-bold uppercase tracking-wide">Manage Booking Status</h2>
                <p className="text-xs text-muted-foreground font-semibold">Select which vehicles show up on the public Booking page.</p>
              </div>
              <button
                onClick={() => {
                  setBookingEnabled(true);
                  setTab("add");
                }}
                className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground transition-shadow hover:shadow-md"
              >
                <Plus className="h-4 w-4" /> Add Vehicle for Booking
              </button>
            </div>
            <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-sm">
                  <thead>
                    <tr className="border-b border-border bg-secondary text-left">
                      <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Vehicle</th>
                      <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Category</th>
                      <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Price</th>
                      <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Source</th>
                      <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Booking Status</th>
                      <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dealer.map((l) => (
                      <tr key={l.id} className="border-b border-border last:border-0">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img src={l.img} alt={l.title} className="h-10 w-14 rounded object-cover bg-muted animate-reveal" />
                            <span className="font-semibold">{l.year} {l.title}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{l.category}</td>
                        <td className="px-4 py-3 font-semibold">{l.price}</td>
                        <td className="px-4 py-3 text-muted-foreground capitalize">{l.source || "dealer"}</td>
                        <td className="px-4 py-3">
                          {l.bookingEnabled ? (
                            <span className="inline-flex items-center gap-1 rounded-sm bg-[#25D366] px-2 py-1 text-[11px] font-bold text-white uppercase tracking-wide">
                              Booking available
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-sm bg-muted px-2 py-1 text-[11px] font-bold text-muted-foreground uppercase tracking-wide">
                              Disabled
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => toggleBooking(l.id)}
                            className={`inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors ${
                              l.bookingEnabled
                                ? "border-destructive text-destructive hover:bg-destructive/5"
                                : "border-primary text-primary hover:bg-primary/5"
                            }`}
                          >
                            {l.bookingEnabled ? "Disable Booking" : "Enable Booking"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Booking Inquiries Section */}
            <div className="mt-10">
              <h2 className="text-xl font-display font-bold uppercase tracking-tight mb-4 text-foreground">
                Booking Inquiries (Keep Me Updated requests)
              </h2>
              {bookingInquiries.length === 0 ? (
                <div className="rounded-lg border border-dashed border-border bg-card p-8 text-center text-muted-foreground text-sm">
                  No booking inquiries received yet.
                </div>
              ) : (
                <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[760px] text-sm">
                      <thead>
                        <tr className="border-b border-border bg-secondary text-left">
                          <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Date</th>
                          <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Name</th>
                          <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Phone</th>
                          <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">City</th>
                          <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Interested In</th>
                          <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookingInquiries.map((inq) => (
                          <tr key={inq.id} className="border-b border-border last:border-0">
                            <td className="px-4 py-3 text-muted-foreground text-xs">{inq.date}</td>
                            <td className="px-4 py-3 font-semibold">{inq.name}</td>
                            <td className="px-4 py-3 font-semibold text-primary">{inq.phone}</td>
                            <td className="px-4 py-3 text-muted-foreground">{inq.city}</td>
                            <td className="px-4 py-3 font-semibold capitalize">{inq.interest}s</td>
                            <td className="px-4 py-3 text-right">
                              <button
                                onClick={() => removeInquiry(inq.id)}
                                className="rounded px-2.5 py-1.5 text-xs font-semibold text-destructive hover:bg-destructive/5 cursor-pointer"
                              >
                                Resolve / Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* MANAGE PARTS */}
        {tab === "parts" && (
          <div className="mt-6 space-y-6">
            {/* Add Part Form */}
            <form
              onSubmit={addSparePart}
              className="rounded-lg border border-border bg-card p-6 shadow-sm max-w-2xl"
            >
              <h2 className="flex items-center gap-2 text-xl font-display font-bold uppercase">
                <Wrench className="h-5 w-5 text-primary" /> Add Spare Part
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                    Part Name
                  </label>
                  <input
                    value={partName}
                    onChange={(e) => setPartName(e.target.value)}
                    placeholder="e.g. CD 70 Backlight Cover"
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                    Price (Rs)
                  </label>
                  <input
                    value={partPrice}
                    onChange={(e) => setPartPrice(e.target.value)}
                    placeholder="e.g. 1200"
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                    Compatible Vehicles (comma-separated)
                  </label>
                  <input
                    value={partCompatible}
                    onChange={(e) => setPartCompatible(e.target.value)}
                    placeholder="e.g. Honda CD 70, Honda CG 125"
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground mb-1.5">
                    Part Photo
                  </label>
                  <div className="flex items-center gap-3">
                    {partPhoto ? (
                      <div className="relative h-20 w-24 rounded border border-border overflow-hidden bg-muted group">
                        <img src={partPhoto} alt="Upload preview" className="h-full w-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setPartPhoto("")}
                          className="absolute top-1 right-1 h-5 w-5 bg-black/75 hover:bg-black text-white rounded-full flex items-center justify-center transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex h-20 w-24 cursor-pointer flex-col items-center justify-center rounded border border-dashed border-input hover:border-primary/50 hover:bg-secondary/15 transition-all text-muted-foreground">
                        <Camera className="h-5 w-5" />
                        <span className="text-[10px] mt-1 font-semibold">Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePartPhotoChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="mt-5 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground transition-shadow hover:shadow"
              >
                <Plus className="h-4 w-4" /> Add Spare Part
              </button>
            </form>

            {/* Spare Parts List */}
            <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-sm">
                  <thead>
                    <tr className="border-b border-border bg-secondary text-left">
                      <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Part Details</th>
                      <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Price</th>
                      <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Compatible Vehicles</th>
                      <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parts.map((p) => (
                      <tr key={p.id} className="border-b border-border last:border-0">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img src={p.img} alt={p.name} className="h-10 w-14 rounded object-cover bg-muted" />
                            <span className="font-semibold">{p.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-semibold">{p.price}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {p.compatible.map((comp) => (
                              <span key={comp} className="inline-flex rounded-sm bg-secondary px-2 py-0.5 text-[10px] font-semibold text-secondary-foreground">
                                {comp}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end gap-1.5">
                            <button
                              onClick={() => startEditingPart(p)}
                              className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1.5 text-xs font-semibold text-primary hover:bg-primary/5 cursor-pointer"
                              title="Update spare part"
                            >
                              Update
                            </button>
                            <button
                              onClick={() => removeSparePart(p.id)}
                              className="rounded p-1.5 text-destructive hover:bg-destructive/5 cursor-pointer"
                              title="Remove spare part"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
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
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Toyota Corolla Altis"
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/40"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  Category
                </label>
                <div className="mt-1 grid grid-cols-3 gap-2">
                  {["Car", "Bike", "Tractor"].map(c => (
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
                  onChange={e => setYear(e.target.value)}
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
                  onChange={e => setPrice(e.target.value)}
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
                  onChange={e => setCity(e.target.value)}
                  placeholder="e.g. Lahore"
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/40"
                />
              </div>
            </div>

            {/* Photos upload input and thumbnails */}
            <div className="mt-5">
              <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground mb-1.5">
                Photos (Up to 4)
              </label>
              <div className="flex flex-wrap gap-3">
                {uploadedPhotos.map((p, idx) => (
                  <div
                    key={idx}
                    className="relative h-20 w-24 rounded border border-border overflow-hidden bg-muted group"
                  >
                    <img
                      src={p}
                      alt="Upload preview"
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(idx)}
                      className="absolute top-1 right-1 h-5 w-5 bg-black/75 hover:bg-black text-white rounded-full flex items-center justify-center transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {uploadedPhotos.length < 4 && (
                  <label className="flex h-20 w-24 cursor-pointer flex-col items-center justify-center rounded border border-dashed border-input hover:border-primary/50 hover:bg-secondary/15 transition-all text-muted-foreground">
                    <Camera className="h-5 w-5" />
                    <span className="text-[10px] mt-1 font-semibold">
                      Upload
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePhotosChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Booking Toggle Option */}
            <div className="mt-5 flex items-center gap-2">
              <input
                type="checkbox"
                id="bookingEnabled"
                checked={bookingEnabled}
                onChange={(e) => setBookingEnabled(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
              />
              <label htmlFor="bookingEnabled" className="text-xs font-semibold text-foreground cursor-pointer select-none">
                Enable booking for this vehicle (shows on Booking page & displays "Booking available" label)
              </label>
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-[oklch(0.72_0.17_55)] px-6 py-3 text-sm font-bold text-[#1e1e1e] transition-shadow hover:shadow-lg"
            >
              <Plus className="h-4 w-4" /> Publish listing
            </button>
            <p className="mt-3 text-[11px] text-muted-foreground">
              The listing goes live immediately and appears on the site. If no
              photos are uploaded, a default category photo is used.
            </p>
          </form>
        )}
        {/* EDIT LISTING MODAL */}
        {editingListing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-reveal">
            <div className="relative w-full max-w-lg rounded-lg border border-border bg-card p-6 shadow-xl max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setEditingListing(null)}
                className="absolute top-4 right-4 h-7 w-7 rounded-full bg-secondary flex items-center justify-center hover:bg-muted text-muted-foreground transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
              <h2 className="flex items-center gap-2 text-xl font-display font-bold uppercase tracking-wide">
                Update Listing
              </h2>
              <form onSubmit={saveEditedListing} className="mt-5 space-y-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                    Make & Model
                  </label>
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    required
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                      Category
                    </label>
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40"
                    >
                      <option value="Car">Car</option>
                      <option value="Bike">Bike</option>
                      <option value="Tractor">Tractor</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                      Year
                    </label>
                    <input
                      value={editYear}
                      onChange={(e) => setEditYear(e.target.value)}
                      required
                      className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                      Price (Rs)
                    </label>
                    <input
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                      required
                      className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                      City
                    </label>
                    <input
                      value={editCity}
                      onChange={(e) => setEditCity(e.target.value)}
                      required
                      className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground mb-1.5">
                    Photos (Up to 4)
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {editPhotos.map((photo, idx) => (
                      <div key={idx} className="relative h-16 w-20 rounded border border-border overflow-hidden bg-muted">
                        <img src={photo} alt="Listing preview" className="h-full w-full object-cover" />
                        <button
                          type="button"
                          onClick={() => {
                            setEditPhotos(prev => prev.filter((_, i) => i !== idx));
                            setEditPhotoFiles(prev => prev.filter((_, i) => i !== idx));
                          }}
                          className="absolute top-0.5 right-0.5 h-4 w-4 bg-black/75 text-white rounded-full flex items-center justify-center hover:bg-black cursor-pointer"
                        >
                          <X className="h-2.5 w-2.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <label className="inline-flex items-center gap-1.5 cursor-pointer rounded border border-input bg-background px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-secondary/10 transition-colors">
                    <Camera className="h-4 w-4" /> Replace Photos
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleEditPhotosChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="editBookingEnabled"
                    checked={editBookingEnabled}
                    onChange={(e) => setEditBookingEnabled(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                  />
                  <label htmlFor="editBookingEnabled" className="text-xs font-semibold text-foreground cursor-pointer select-none">
                    Enable booking for this vehicle
                  </label>
                </div>
                <div className="flex justify-end gap-2 pt-2 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setEditingListing(null)}
                    className="rounded-md border border-border px-4 py-2 text-xs font-bold hover:bg-muted cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:shadow cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* EDIT SPARE PART MODAL */}
        {editingPart && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-reveal">
            <div className="relative w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setEditingPart(null)}
                className="absolute top-4 right-4 h-7 w-7 rounded-full bg-secondary flex items-center justify-center hover:bg-muted text-muted-foreground transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
              <h2 className="flex items-center gap-2 text-xl font-display font-bold uppercase tracking-wide">
                Update Spare Part
              </h2>
              <form onSubmit={saveEditedPart} className="mt-5 space-y-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                    Part Name
                  </label>
                  <input
                    value={editPartName}
                    onChange={(e) => setEditPartName(e.target.value)}
                    required
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                    Price (Rs)
                  </label>
                  <input
                    value={editPartPrice}
                    onChange={(e) => setEditPartPrice(e.target.value)}
                    required
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                    Compatible Vehicles (comma-separated)
                  </label>
                  <input
                    value={editPartCompatible}
                    onChange={(e) => setEditPartCompatible(e.target.value)}
                    required
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground mb-1.5">
                    Part Photo
                  </label>
                  <div className="flex items-center gap-3">
                    {editPartPhoto && (
                      <div className="relative h-16 w-20 rounded border border-border overflow-hidden bg-muted">
                        <img src={editPartPhoto} alt="Part preview" className="h-full w-full object-cover" />
                      </div>
                    )}
                    <label className="inline-flex items-center gap-1.5 cursor-pointer rounded border border-input bg-background px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-secondary/10 transition-colors">
                      <Camera className="h-4 w-4" /> Replace Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleEditPartPhotoChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setEditingPart(null)}
                    className="rounded-md border border-border px-4 py-2 text-xs font-bold hover:bg-muted cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:shadow cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
