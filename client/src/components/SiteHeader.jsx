/**
 * Waseem — Clean modern automotive dealership header.
 * Deep blue header bar, "Waseem" brand on the left,
 * nav: Home, Cars, Bikes, Tractors, Spare Parts, Sell Your Vehicle, Contact.
 * Orange CTA: Sell Your Vehicle button.
 */
import { Link, useLocation } from "wouter";
import { IMAGES } from "@/lib/data";
import { Menu, X, Settings } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Cars", href: "/cars" },
  { label: "Bikes", href: "/bikes" },
  { label: "Tractors", href: "/tractors" },
  { label: "Spare Parts", href: "/spare-parts" },
  { label: "Booking", href: "/booking" },
  { label: "Contact", href: "/contact" },
];

export default function SiteHeader() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Logo entrance
      gsap.from(".logo-animate", {
        x: -20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });

      // Nav items staggered slide down
      gsap.from(".nav-animate", {
        y: -15,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power2.out",
      });

      // Buttons entrance
      gsap.from(".btn-animate", {
        scale: 0.95,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out",
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <header ref={headerRef} className="sticky top-0 z-50 bg-primary shadow-md">
      <div className="container flex h-20 items-center justify-between gap-4">
        <Link href="/" className="logo-animate flex items-center gap-2.5">
          <img
            src={IMAGES.logo}
            alt="Waseem logo"
            className="h-11 w-11 rounded-sm object-contain bg-white/95 p-0.5"
          />
          <span className="text-[28px] font-display font-bold uppercase leading-none tracking-wide text-primary-foreground">
            Waseem
          </span>
          <span className="mt-2.5 hidden text-[12px] font-bold uppercase tracking-[0.18em] text-[oklch(0.72_0.17_55)] sm:block">
            Motors
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV.map(item => {
            const active = location === item.href;
            const isSpecial = ["Cars", "Bikes", "Tractors"].includes(
              item.label
            );
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`nav-animate text-[16px] font-bold transition-colors ${
                  active
                    ? "text-[oklch(0.8_0.15_60)]"
                    : isSpecial
                      ? "text-sky-300 hover:text-sky-100"
                      : "text-primary-foreground/85 hover:text-primary-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin"
            className="btn-animate hidden items-center gap-1.5 rounded-md border border-primary-foreground/25 px-3 py-1.5 text-xs font-semibold text-primary-foreground/90 transition-colors hover:bg-primary-foreground/10 md:inline-flex"
            title="Dealer dashboard"
          >
            <Settings className="h-3.5 w-3.5" /> Dealer Panel
          </Link>
          <Link
            href="/sell"
            className="btn-animate rounded-md bg-[oklch(0.72_0.17_55)] px-4 py-2 text-sm font-bold text-[oklch(0.2_0.05_255)] transition-shadow hover:shadow-lg"
          >
            Sell Your Vehicle
          </Link>
          <button
            className="lg:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen(v => !v)}
          >
            {open ? (
              <X className="h-6 w-6 text-primary-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-primary-foreground" />
            )}
          </button>
        </div>
      </div>

      {open && (
        <nav className="container border-t border-primary-foreground/15 py-3 lg:hidden">
          {NAV.map(item => (
            <Link
              key={item.label}
              href={item.href}
              className="block py-2.5 text-sm font-semibold text-primary-foreground/85"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/admin"
            className="mt-2 block border-t border-primary-foreground/15 pt-2.5 text-sm font-semibold text-primary-foreground/85"
            onClick={() => setOpen(false)}
          >
            Dealer Panel
          </Link>
        </nav>
      )}
    </header>
  );
}
