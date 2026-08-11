import React, { useState } from "react";
import { Link } from "wouter";
import SiteHeader from "@/components/SiteHeader";
import ListingCard from "@/components/ListingCard";
import { getCurrentListings } from "@/lib/data";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

export default function Marketplace() {
  useReveal();
  const [listings] = useState(() => getCurrentListings());

  const publicListings = listings.filter(
    (l) => l.source === "public" && l.status === "Live"
  );

  return (
    <div className="min-h-screen bg-secondary/30">
      <SiteHeader />

      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-primary py-12 text-primary-foreground">
        <div className="absolute inset-0 bg-gradient-to-r from-[#e63946]/95 to-[#e63946]/50" />
        <div className="container relative">
          <p className="kicker mb-2 text-white/90">Community Hub</p>
          <h1 className="text-4xl font-display font-bold uppercase tracking-tight md:text-5xl">
            Customer Marketplace
          </h1>
          <p className="mt-2 max-w-xl text-sm text-white/80">
            Verified vehicles listed directly by owners. Every submission is carefully reviewed by the Waseem Motors desk to ensure clear papers and fair conditions.
          </p>
        </div>
      </div>

      <div className="container py-10">
        {publicListings.length === 0 ? (
          <div className="reveal flex flex-col items-center justify-center text-center rounded-lg border border-dashed border-border bg-card p-12 shadow-sm max-w-xl mx-auto mt-8">
            <div className="rounded-full bg-primary/10 p-4 text-primary">
              <ShoppingBag className="h-8 w-8" />
            </div>
            <h3 className="mt-5 font-display text-2xl font-bold uppercase tracking-tight">
              Marketplace Empty
            </h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-sm leading-relaxed">
              No approved customer listings are currently live. If you want to sell your car, bike, or tractor directly to buyers, submit it through our quick form!
            </p>
            <Link
              href="/sell"
              className="mt-6 inline-flex items-center gap-1.5 rounded-md bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground transition-shadow hover:shadow"
            >
              Sell Your Vehicle <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h2 className="text-lg font-bold text-card-foreground">
                Approved Listings ({publicListings.length})
              </h2>
              <Link
                href="/sell"
                className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
              >
                List your vehicle <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {publicListings.map((item, i) => (
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
        )}
      </div>
    </div>
  );
}
