import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function InfiniteCarousel({ images, interval = 3500, className = "" }) {
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

  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);

  // Restart timer helper
  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
  };

  // Set up auto-scroll interval
  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentIndex, interval, images.length]);

  const handlePrev = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handleDotClick = (e, idx) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex(idx);
  };

  return (
    <div className="relative w-full h-full overflow-hidden group/carousel">
      {/* Slides wrapper */}
      <div
        className="flex h-full w-full transition-transform duration-500 ease-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((src, idx) => (
          <div key={idx} className="h-full w-full shrink-0">
            <img
              src={src}
              alt={`Slide ${idx + 1}`}
              className={`h-full w-full object-cover ${className}`}
            />
          </div>
        ))}
      </div>

      {/* Left Arrow Button */}
      <button
        type="button"
        onClick={handlePrev}
        className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white opacity-0 group-hover/carousel:opacity-100 hover:bg-black/75 transition-all duration-250 cursor-pointer shadow-md"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Right Arrow Button */}
      <button
        type="button"
        onClick={handleNext}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white opacity-0 group-hover/carousel:opacity-100 hover:bg-black/75 transition-all duration-250 cursor-pointer shadow-md"
        aria-label="Next image"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 z-10 bg-black/25 px-2.5 py-1.5 rounded-full backdrop-blur-[2px] opacity-80 group-hover/carousel:opacity-100 transition-opacity">
        {images.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={(e) => handleDotClick(e, idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              currentIndex === idx ? "bg-white w-3" : "bg-white/50 hover:bg-white"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
