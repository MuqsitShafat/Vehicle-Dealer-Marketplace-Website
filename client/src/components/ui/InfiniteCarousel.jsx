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

  // Prepend last image and append first image for seamless infinite looping
  const slides = [images[images.length - 1], ...images, images[0]];
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timerRef = useRef(null);

  // Handle seamless snap-back at edges
  useEffect(() => {
    if (currentIndex === images.length + 1) {
      // Snapping to the first actual slide
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(1);
      }, 500); // match transition duration
      return () => clearTimeout(timer);
    }
    if (currentIndex === 0) {
      // Snapping to the last actual slide
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(images.length);
      }, 500); // match transition duration
      return () => clearTimeout(timer);
    }
  }, [currentIndex, images.length]);

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
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleDotClick = (e, idx) => {
    e.preventDefault();
    e.stopPropagation();
    setIsTransitioning(true);
    setCurrentIndex(idx + 1);
  };

  // Map active slide index to actual images indices
  const activeIdx = currentIndex === images.length + 1
    ? 0
    : currentIndex === 0
      ? images.length - 1
      : currentIndex - 1;

  return (
    <div className="relative w-full h-full overflow-hidden group/carousel">
      {/* Slides wrapper */}
      <div
        className="flex h-full w-full"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitioning ? "transform 500ms cubic-bezier(0.25, 1, 0.5, 1)" : "none",
        }}
      >
        {slides.map((src, idx) => (
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
              activeIdx === idx ? "bg-white w-3" : "bg-white/50 hover:bg-white"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
