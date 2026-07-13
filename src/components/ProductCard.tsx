import { useState, useEffect, MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, CheckCircle2, ArrowRight, Share2 } from "lucide-react";
import { Product, BUSINESS_INFO, getProductSlug } from "../data";
import LazyImage from "./LazyImage";

interface ProductCardProps {
  product: Product;
  onEnquire: (productName: string) => void;
  onViewDetails: (product: Product) => void;
  currentLanguage?: "en" | "hi";
}

export default function ProductCard({ product, onEnquire, onViewDetails, currentLanguage = "en" }: ProductCardProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showShareFeedback, setShowShareFeedback] = useState(false);

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
      className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200/80 flex flex-col h-full group"
    >
      {/* Image Carousel Area */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
        {product.isBestSeller && (
          <div className="absolute top-4 left-4 z-20 bg-orange-500 text-white font-bold text-[10px] sm:text-xs px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1 uppercase tracking-wider">
            🔥 Best Seller
          </div>
        )}
        
        <div className="absolute top-4 right-4 z-20 bg-brand-blue-dark/85 backdrop-blur-md text-white font-bold text-[10px] sm:text-xs px-3.5 py-1.5 rounded-full border border-white/10 uppercase tracking-wider">
          {product.category}
        </div>

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
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10 pointer-events-none" />

        {/* Navigation Arrows */}
        {product.images.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-black/45 hover:bg-orange-500 text-white backdrop-blur-sm transition-all duration-200 active:scale-90"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-black/45 hover:bg-orange-500 text-white backdrop-blur-sm transition-all duration-200 active:scale-90"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Slider Dots Indicator */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm">
              {product.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSlide(idx);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    idx === currentSlide ? "bg-orange-500 w-3.5" : "bg-white/60 hover:bg-white"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Product Information Body */}
      <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-xl md:text-2xl font-bold font-display text-brand-blue-dark tracking-tight mb-3 hover:text-orange-600 transition-colors">
            {product.name}
          </h3>

          {/* 2-4 Feature Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {product.features.slice(0, 4).map((feat, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-slate-50 text-slate-700 px-3 py-1.5 rounded-xl border border-slate-200/50 shadow-sm"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                {feat}
              </span>
            ))}
          </div>
        </div>

        {/* Buttons Action Bar */}
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center gap-3">
          <a
            href={`/products/${getProductSlug(product.id)}`}
            onClick={(e) => {
              e.preventDefault();
              onViewDetails(product);
            }}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-extrabold text-sm transition-all duration-200 shadow-md hover:scale-[1.01] active:scale-[0.98] cursor-pointer text-center"
          >
            <span>{currentLanguage === "hi" ? "अधिक जानें" : "Know More"}</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <button
            onClick={async (e) => {
              e.stopPropagation();
              const shareText = `Check out *${product.name}* at *Om Shringar Tirpal Store*!\n\n${product.description}`;
              const shareUrl = window.location.href;
              const shareData = {
                title: product.name,
                text: `${product.name} at Om Shringar Tirpal Store.`,
                url: shareUrl,
              };

              if (navigator.share) {
                try {
                  await navigator.share(shareData);
                  return;
                } catch (err) {
                  console.log("Native share cancelled or failed:", err);
                }
              }

              // Fallback: copy link and open WhatsApp
              try {
                await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
                setShowShareFeedback(true);
                setTimeout(() => setShowShareFeedback(false), 2500);
              } catch (clipErr) {
                console.log("Clipboard failed:", clipErr);
              }

              const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`;
              window.open(whatsappUrl, "_blank", "noopener,noreferrer");
            }}
            title="Share Product"
            className="relative p-3.5 rounded-full border border-slate-200 hover:border-orange-500 hover:text-orange-600 text-slate-500 hover:bg-orange-50 transition-all duration-200 cursor-pointer shrink-0 animate-none"
          >
            <Share2 className="w-5 h-5" />
            <AnimatePresence>
              {showShareFeedback && (
                <motion.span
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: -45, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap z-30 border border-slate-800"
                >
                  Link copied! Opened WhatsApp
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
