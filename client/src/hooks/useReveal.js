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
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    const ctx = gsap.context(() => {
      const els = document.querySelectorAll(".reveal");
      els.forEach((el) => {
        el.removeAttribute("data-reveal-init");
        gsap.set(el, { clearProps: "opacity,transform" });
      });
    });

    const runSetup = () => {
      ctx.add(() => {
        const newEls = document.querySelectorAll(".reveal:not([data-reveal-init])");
        if (newEls.length === 0) return;
        newEls.forEach((el) => {
          el.setAttribute("data-reveal-init", "true");
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
      ScrollTrigger.refresh();
    };

    runSetup();

    let debounceTimer;
    const observer = new MutationObserver(() => {
      const uninitialized = document.querySelector(".reveal:not([data-reveal-init])");
      if (uninitialized) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(runSetup, 50);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(debounceTimer);
      ctx.revert();
      observer.disconnect();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [location]);
}
