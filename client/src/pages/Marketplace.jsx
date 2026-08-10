import React from "react";
import SiteHeader from "@/components/SiteHeader";

export default function Marketplace() {
  return (
    <div className="min-h-screen flex flex-col bg-secondary/30">
      <SiteHeader />
      <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-4xl font-display font-bold uppercase tracking-tight md:text-5xl text-primary">
          Marketplace
        </h1>
        <p className="mt-3 max-w-sm text-sm text-muted-foreground font-semibold tracking-wide uppercase">
          Coming Soon
        </p>
      </div>
    </div>
  );
}
