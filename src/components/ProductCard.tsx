import { useState, useEffect, MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Product, getProductSlug } from "../data";
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

  useEffect(() => {
    if (product.images.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % product.images.length);
    }, 4000);

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onViewDetails(product)}
      className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200/80 flex flex-col h-full group cursor-pointer"
    >
      {/* Image Carousel Area */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
        {/* Carousel Images */}
        <div className="absolute inset-0 w-full h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full"
            >
              <LazyImage
                src={product.images[currentSlide]}
                alt={`${product.name} - View ${currentSlide + 1}`}
                referrerPolicy="no-referrer"
                className="group-hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10 pointer-events-none" />

        {/* Navigation Arrows */}
        {product.images.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/45 hover:bg-orange-500 text-white backdrop-blur-sm transition-all duration-200 active:scale-90 opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/45 hover:bg-orange-500 text-white backdrop-blur-sm transition-all duration-200 active:scale-90 opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Slider Dots Indicator */}
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm">
              {product.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSlide(idx);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                    idx === currentSlide ? "bg-orange-500 w-3" : "bg-white/60 hover:bg-white"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Product Information Body - Only Product Name */}
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div className="my-auto py-2">
          <h3 className="text-lg md:text-xl font-extrabold font-display text-brand-blue-dark tracking-tight text-center group-hover:text-orange-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </div>

        {/* Action Button */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center">
          <a
            href={`/products/${getProductSlug(product.id)}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onViewDetails(product);
            }}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-extrabold text-xs sm:text-sm transition-all duration-200 shadow-md hover:scale-[1.01] active:scale-[0.98] cursor-pointer text-center"
          >
            <span>{currentLanguage === "hi" ? "अधिक जानें" : "Know More"}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
