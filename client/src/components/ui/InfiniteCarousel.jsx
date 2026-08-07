import { useState, useEffect, useRef } from "react";

export default function InfiniteCarousel({ images, interval = 3000, className = "" }) {
  if (!images || images.length === 0) return null;
  if (images.length === 1) {
    return (
      <img
        src={images[0]}
        alt="Vehicle"
        className={`w-full h-full object-cover ${className}`}
      />
    );
  }

  // Clone the first image at the end for seamless looping
  const slides = [...images, images[0]];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timerRef = useRef(null);

  // Restart timer helper
  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, interval);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentIndex, interval]);

  const handleTransitionEnd = () => {
    // If we've transitioned to the cloned slide (last item in slides array),
    // snap back to index 0 instantly without transition.
    if (currentIndex === slides.length - 1) {
      setIsTransitioning(false);
      setCurrentIndex(0);
    }
  };

  const handleDotClick = (e, idx) => {
    e.preventDefault();
    e.stopPropagation();
    setIsTransitioning(true);
    setCurrentIndex(idx);
  };

  const activeIdx = currentIndex === images.length ? 0 : currentIndex;

  return (
    <div className="relative w-full h-full overflow-hidden group">
      <div
        className="flex h-full w-full"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitioning ? "transform 600ms cubic-bezier(0.25, 1, 0.5, 1)" : "none",
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {slides.map((src, idx) => (
          <div key={idx} className="h-full w-full shrink-0">
            <img
              src={src}
              alt={`Slide ${idx}`}
              className={`h-full w-full object-cover ${className}`}
            />
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 z-10 bg-black/25 px-2.5 py-1.5 rounded-full backdrop-blur-[2px] opacity-80 group-hover:opacity-100 transition-opacity">
        {images.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={(e) => handleDotClick(e, idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeIdx === idx ? "bg-white w-3" : "bg-white/50 hover:bg-white"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
