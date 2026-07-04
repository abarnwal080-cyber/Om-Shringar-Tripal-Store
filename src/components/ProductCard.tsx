import { useState, useEffect, MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Phone, MessageSquare, CheckCircle2, ArrowRight } from "lucide-react";
import { Product, BUSINESS_INFO } from "../data";

interface ProductCardProps {
  product: Product;
  onEnquire: (productName: string) => void;
}

export default function ProductCard({ product, onEnquire }: ProductCardProps) {
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

  const getWhatsAppLink = (pName: string) => {
    const text = `Hi, I am interested in purchasing ${pName} from Om Shringar Tirpal Store. Please share details and pricing.`;
    return `${BUSINESS_INFO.whatsappLink}?text=${encodeURIComponent(text)}`;
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
            <motion.img
              key={currentSlide}
              src={product.images[currentSlide]}
              alt={`${product.name} - View ${currentSlide + 1}`}
              loading="lazy"
              referrerPolicy="no-referrer"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
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
          <h3 className="text-xl md:text-2xl font-bold font-display text-brand-blue-dark tracking-tight mb-2.5 hover:text-orange-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Sizing Details if they exist */}
          {(product.availableSizes || product.commonSizes) && (
            <div className="mb-6 p-4 bg-brand-blue-dark/[0.03] rounded-2xl border border-slate-200/50">
              {product.availableSizes && (
                <div className="text-xs text-slate-500 font-mono mb-1">
                  AVAILABLE WIDTH RANGE
                </div>
              )}
              {product.availableSizes && (
                <div className="text-base font-bold text-blue-600 font-display">
                  {product.availableSizes}
                </div>
              )}
              {product.commonSizes && (
                <div className="mt-3">
                  <div className="text-xs text-slate-500 font-mono mb-1.5 uppercase">
                    Common Demand Sizes
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {product.commonSizes.map((size, index) => (
                      <span
                        key={index}
                        className="text-xs font-bold bg-blue-50 text-blue-600 px-2.5 py-1 rounded-lg border border-blue-100"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Feature Bullets */}
          <div className="space-y-2.5 mb-8">
            <div className="text-xs font-bold text-slate-500 font-mono uppercase tracking-wider mb-2">
              Product Advantages & Specs
            </div>
            {product.features.map((feat, index) => (
              <div key={index} className="flex items-start gap-2.5 text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons Action Bar */}
        <div className="space-y-3 mt-auto pt-4 border-t border-slate-100">
          <div className="grid grid-cols-2 gap-2">
            <a
              href={BUSINESS_INFO.phoneFormatted}
              className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-full bg-brand-blue-dark hover:bg-brand-blue-royal text-white text-xs md:text-sm font-semibold transition-all duration-200 shadow-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              Call Now
            </a>
            <a
              href={getWhatsAppLink(product.name)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs md:text-sm font-semibold transition-all duration-200 shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              WhatsApp
            </a>
          </div>
          
          <button
            onClick={() => onEnquire(product.name)}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm transition-all duration-200 shadow-md active:scale-[0.98]"
          >
            <span>Enquire / Get Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
