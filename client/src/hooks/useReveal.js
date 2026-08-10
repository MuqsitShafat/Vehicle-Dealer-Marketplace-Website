/**
 * Waseem — reveal-on-scroll hook (drives the .reveal.in-view utility).
 */
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocation } from "wouter";

gsap.registerPlugin(ScrollTrigger);

export function useReveal() {
  const [location] = useLocation();

  useEffect(() => {
    // Clean up all existing triggers first to prevent duplication/stale references
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    const ctx = gsap.context(() => {
      const els = document.querySelectorAll(".reveal");
      
      // Clear any prior GSAP inline styles to prevent animation mismatches
      els.forEach((el) => {
        gsap.set(el, { clearProps: "opacity,transform" });
      });

      els.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });

    // Refresh scroll triggers to account for dynamic DOM adjustments
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 50);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [location]);
}
