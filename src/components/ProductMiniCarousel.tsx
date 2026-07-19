import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PRODUCTS, getProductSlug } from "../data";

interface ProductMiniCarouselProps {
  lang: "en" | "hi";
  onSelectProduct: (slug: string) => void;
}

const CLONE_COUNT = 4;

export default function ProductMiniCarousel({ lang, onSelectProduct }: ProductMiniCarouselProps) {
  // Responsive Visible Cards State
  const [visibleCount, setVisibleCount] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(CLONE_COUNT);
  const [isSeamlessReset, setIsSeamlessReset] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Drag and Touch States
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const dragStartXRef = useRef(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const hasDraggedRef = useRef(false);

  // Determine container width for responsive touch calculations
  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Update visible cards on window resize
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 768) {
        setVisibleCount(2);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(3);
      } else {
        setVisibleCount(4);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  // Clone items on left and right for seamless looping
  const displayProducts = [
    ...PRODUCTS.slice(-CLONE_COUNT),
    ...PRODUCTS,
    ...PRODUCTS.slice(0, CLONE_COUNT),
  ];

  // Sliding Navigations
  const handleNext = () => {
    if (isSeamlessReset) return;
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (isSeamlessReset) return;
    setCurrentIndex((prev) => prev - 1);
  };

  // Seamless Infinite reset handling
  const handleTransitionEnd = () => {
    if (currentIndex >= PRODUCTS.length + CLONE_COUNT) {
      setIsSeamlessReset(true);
      setCurrentIndex(CLONE_COUNT);
    } else if (currentIndex < CLONE_COUNT) {
      setIsSeamlessReset(true);
      setCurrentIndex(PRODUCTS.length + CLONE_COUNT - 1);
    }
  };

  // Turn transitions back on after the zero-duration seamless jump frame
  useEffect(() => {
    if (isSeamlessReset) {
      const raf = requestAnimationFrame(() => {
        setIsSeamlessReset(false);
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [isSeamlessReset]);

  // Autoplay timer sliding every 1 second (pauses on hover or active dragging)
  useEffect(() => {
    if (isHovered || isDragging || isSeamlessReset) return;

    const timer = setInterval(() => {
      handleNext();
    }, 1000); // 1 second as requested

    return () => clearInterval(timer);
  }, [isHovered, isDragging, isSeamlessReset, currentIndex]);

  // Drag and Touch Handlers
  const handleDragStart = (clientX: number) => {
    if (isSeamlessReset) return;
    dragStartXRef.current = clientX;
    setIsDragging(true);
    setDragOffset(0);
    hasDraggedRef.current = false;
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const deltaX = clientX - dragStartXRef.current;
    setDragOffset(deltaX);
    if (Math.abs(deltaX) > 5) {
      hasDraggedRef.current = true;
    }
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const swipeThreshold = 50; // swipe delta threshold in pixels
    if (dragOffset < -swipeThreshold) {
      handleNext();
    } else if (dragOffset > swipeThreshold) {
      handlePrev();
    }
    setDragOffset(0);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    // Only drag with left click
    if (e.button !== 0) return;
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  };

  const onMouseUp = () => {
    handleDragEnd();
  };

  const onMouseLeave = () => {
    handleDragEnd();
  };

  const onTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  };

  const onTouchEnd = () => {
    handleDragEnd();
  };

  const handleCardClick = (e: React.MouseEvent, slug: string) => {
    if (hasDraggedRef.current) {
      e.stopPropagation();
      return;
    }
    onSelectProduct(slug);
  };

  // Calculate sliding track translations
  const basePercentageOffset = -currentIndex * (100 / visibleCount);
  const dragPercentageContribution = containerWidth ? (dragOffset / containerWidth) * 100 : 0;
  const totalOffsetPercentage = basePercentageOffset + dragPercentageContribution;

  return (
    <div 
      className="w-full py-10 relative select-none group/carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Carousel Viewport Window */}
      <div 
        ref={containerRef}
        className="overflow-hidden rounded-3xl relative"
      >
        <div
          className="flex flex-row flex-nowrap cursor-grab active:cursor-grabbing"
          style={{
            transform: `translate3d(${totalOffsetPercentage}%, 0, 0)`,
            transition: isSeamlessReset ? "none" : "transform 500ms cubic-bezier(0.16, 1, 0.3, 1)"
          }}
          onTransitionEnd={handleTransitionEnd}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {displayProducts.map((product, idx) => {
            const slug = getProductSlug(product.id);
            return (
              <div
                key={`${product.id}-${idx}`}
                className="flex-shrink-0 px-3"
                style={{
                  width: `${100 / visibleCount}%`,
                  boxSizing: "border-box"
                }}
              >
                <div
                  onClick={(e) => handleCardClick(e, slug)}
                  className="bg-white rounded-2xl border border-slate-100 p-4 shadow-md hover:shadow-xl transition-all hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between h-[310px] relative group overflow-hidden"
                >
                  {/* Image Container */}
                  <div className="w-full h-[60%] rounded-xl bg-slate-50 overflow-hidden flex items-center justify-center relative mb-3 pointer-events-none">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="max-w-[85%] max-h-[85%] object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Category Tag */}
                    <span className="absolute bottom-2 left-2 text-[9px] font-bold font-mono px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-600 border border-orange-500/15">
                      {product.category}
                    </span>
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-col justify-between flex-grow text-left">
                    <h4 className="text-sm font-extrabold text-[#0B2D5C] font-display line-clamp-2 tracking-tight group-hover:text-orange-600 transition-colors duration-200">
                      {product.name}
                    </h4>
                    
                    <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100">
                      <span className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-widest">
                        {product.specs?.Brand || "GENUINE BRAND"}
                      </span>
                      <span className="text-xs font-extrabold text-orange-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>{lang === "en" ? "View Details" : "विवरण देखें"}</span>
                        <span>➔</span>
                      </span>
                    </div>
                  </div>
                  
                  {/* Decorative Glass Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Glassmorphic Left & Right Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-1 sm:left-[-25px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 backdrop-blur-md hover:bg-slate-50 text-slate-800 flex items-center justify-center border border-slate-200/80 shadow-xl transition-all hover:scale-110 active:scale-95 cursor-pointer z-20"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5 text-orange-600" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-1 sm:right-[-25px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 backdrop-blur-md hover:bg-slate-50 text-slate-800 flex items-center justify-center border border-slate-200/80 shadow-xl transition-all hover:scale-110 active:scale-95 cursor-pointer z-20"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5 text-orange-600" />
      </button>

      {/* Slider Pagination Indicator Dots */}
      <div className="flex justify-center gap-1.5 mt-8">
        {PRODUCTS.map((_, idx) => {
          const normalizedIndex = (currentIndex - CLONE_COUNT + PRODUCTS.length) % PRODUCTS.length;
          const isActive = normalizedIndex === idx;
          return (
            <button
              key={idx}
              onClick={() => {
                setIsSeamlessReset(true);
                setCurrentIndex(idx + CLONE_COUNT);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                isActive ? "w-6 bg-orange-500" : "w-1.5 bg-slate-200 hover:bg-slate-300"
              }`}
              aria-label={`Go to product slide ${idx + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
}
