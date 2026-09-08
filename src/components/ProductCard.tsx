import { useState, useEffect, MouseEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Factory, ShoppingBag, ArrowRight } from "lucide-react";
import { Product } from "../data";
import LazyImage from "./LazyImage";

interface ProductCardProps {
  product: Product;
  onEnquire: (productName: string) => void;
  onViewDetails: (product: Product) => void;
  currentLanguage?: "en" | "hi";
}

export default function ProductCard({ product, onViewDetails, currentLanguage = "en" }: ProductCardProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Increased slideshow interval to 6.5s for a relaxed, comfortable viewing pace
  useEffect(() => {
    if (product.images.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % product.images.length);
    }, 6500);

    return () => clearInterval(interval);
  }, [product.images.length, isHovered]);

  const nextSlide = (e: MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % product.images.length);
  };

  const prevSlide = (e: MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const isPolyware = product.division === "polyware";

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onViewDetails(product)}
      className={`bg-white rounded-2xl border ${
        isPolyware 
          ? "border-slate-200/90 hover:border-orange-500/60" 
          : "border-slate-200/90 hover:border-pink-500/60"
      } shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group cursor-pointer overflow-hidden`}
    >
      {/* 1:1 Square Image Area (Like Amazon) */}
      <div 
        onClick={(e) => {
          e.stopPropagation();
          onViewDetails(product);
        }}
        className="relative aspect-square w-full bg-slate-50 overflow-hidden flex items-center justify-center p-3 sm:p-4 border-b border-slate-100 cursor-pointer"
      >
        {/* Division Badge */}
        <div className="absolute top-2.5 right-2.5 z-20 flex flex-col items-end gap-1 pointer-events-none">
          {isPolyware ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#0B2D5C]/90 text-orange-400 backdrop-blur-md border border-orange-500/30 text-[9px] font-black uppercase tracking-wider shadow-xs">
              <Factory className="w-2.5 h-2.5 text-orange-400" />
              <span>POLYWARE</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900/90 text-pink-200 backdrop-blur-md border border-pink-400/30 text-[9px] font-black uppercase tracking-wider shadow-xs">
              <ShoppingBag className="w-2.5 h-2.5 text-pink-300" />
              <span>RETAIL</span>
            </span>
          )}

          {/* Retail/Bulk Badge */}
          {product.saleType && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-600/95 text-white backdrop-blur-md text-[8px] sm:text-[9px] font-bold tracking-tight shadow-xs border border-emerald-400/30">
              <span>{product.saleType}</span>
            </span>
          )}
        </div>

        {/* Video Demo Badge */}
        {product.video && (
          <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/65 backdrop-blur-md border border-white/20 text-white text-[9px] font-black uppercase tracking-wider shadow-xs pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span>Video</span>
          </div>
        )}

        {/* Carousel Image with Contain Fit (Amazon Style) */}
        <div className="w-full h-full flex items-center justify-center relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="w-full h-full flex items-center justify-center cursor-pointer"
            >
              <LazyImage
                src={product.images[currentSlide]}
                alt={`${product.name} - View ${currentSlide + 1}`}
                referrerPolicy="no-referrer"
                fit="contain"
                className="w-full h-full group-hover:scale-105 transition-transform duration-500 cursor-pointer"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        {product.images.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 flex items-center justify-center rounded-full bg-white/90 hover:bg-orange-500 text-slate-700 hover:text-white border border-slate-200 shadow-md transition-all duration-200 active:scale-90 opacity-0 group-hover:opacity-100 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 flex items-center justify-center rounded-full bg-white/90 hover:bg-orange-500 text-slate-700 hover:text-white border border-slate-200 shadow-md transition-all duration-200 active:scale-90 opacity-0 group-hover:opacity-100 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Slider Dots Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex gap-1 bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm pointer-events-auto">
              {product.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSlide(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    idx === currentSlide ? "bg-orange-500 w-3" : "bg-white/60 hover:bg-white w-1.5"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Product Details Section (Amazon Card Format) */}
      <div className="p-3 sm:p-4 flex-grow flex flex-col justify-between">
        <div 
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(product);
          }}
          className="cursor-pointer"
        >
          {/* Subtle Category Line */}
          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
            {product.category}
          </span>

          {/* Product Title */}
          <h3 className="text-xs sm:text-sm md:text-base font-bold text-slate-900 tracking-tight group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>
        </div>

        {/* Amazon-style View / Enquire Prompt */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-orange-600 group-hover:text-orange-700">
          <span className="text-[11px] sm:text-xs">
            {currentLanguage === "hi" ? "विवरण देखें" : "View Details"}
          </span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
        </div>
      </div>
    </div>
  );
}
