import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PRODUCTS, getProductSlug } from "../data";

interface ProductMiniCarouselProps {
  lang: "en" | "hi";
  onSelectProduct: (slug: string) => void;
}

export default function ProductMiniCarousel({ lang, onSelectProduct }: ProductMiniCarouselProps) {
  const [startIndex, setStartIndex] = useState(0);

  // Auto-slide every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % PRODUCTS.length);
    }, 1000); // 1 second
    return () => clearInterval(interval);
  }, []);

  // Determine the list of visible products to show in a row
  // We can show up to 4 items on desktop, 3 on small desktop, 2 on tablet, and 1 on mobile
  // For a clean sliding animation, we can slice with wrap-around
  const getVisibleProducts = () => {
    const items = [];
    for (let i = 0; i < 4; i++) {
      items.push(PRODUCTS[(startIndex + i) % PRODUCTS.length]);
    }
    return items;
  };

  const visibleProducts = getVisibleProducts();

  return (
    <div className="w-full py-10 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Carousel Window */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {visibleProducts.map((product, idx) => {
              const slug = getProductSlug(product.id);
              return (
                <motion.div
                  key={`${product.id}-${startIndex}-${idx}`}
                  layout
                  initial={{ opacity: 0, x: 50, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  onClick={() => onSelectProduct(slug)}
                  className="bg-white rounded-2xl border border-slate-100 p-4 shadow-md hover:shadow-xl transition-all hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between h-[300px] relative group overflow-hidden"
                >
                  {/* Image Container */}
                  <div className="w-full h-[60%] rounded-xl bg-slate-50 overflow-hidden flex items-center justify-center relative mb-3">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="max-w-[90%] max-h-[90%] object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Category Tag */}
                    <span className="absolute bottom-2 left-2 text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-600 border border-orange-500/15">
                      {product.category}
                    </span>
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-col justify-between flex-grow">
                    <h4 className="text-sm font-extrabold text-[#0B2D5C] font-display line-clamp-2 tracking-tight group-hover:text-orange-600 transition-colors duration-200">
                      {lang === "en" ? product.name : (product.nameEn || product.name)}
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
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Dynamic Pagination Indicator Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-8">
          {PRODUCTS.map((_, index) => (
            <button
              key={index}
              onClick={() => setStartIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === startIndex
                  ? "w-5 bg-orange-500"
                  : "w-1.5 bg-slate-200 hover:bg-slate-300"
              }`}
              aria-label={`Go to product slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
