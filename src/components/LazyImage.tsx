import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  onClick?: (e: React.MouseEvent<HTMLImageElement>) => void;
}

export default function LazyImage({
  src,
  alt,
  className = "",
  referrerPolicy,
  onClick
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden w-full h-full bg-slate-100 ${className}`}>
      {/* Shimmer Placeholder */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-slate-200 flex items-center justify-center"
          >
            {/* Elegant shimmer animation */}
            <div className="w-full h-full relative overflow-hidden bg-slate-200">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              {/* Subtle loading icon or text could be here, but clean shimmer is best */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actual Image */}
      <img
        src={src}
        alt={alt}
        referrerPolicy={referrerPolicy}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onClick={onClick}
        className={`w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
          isLoaded ? "opacity-100" : "opacity-0"
        } ${onClick ? "cursor-pointer" : ""}`}
      />
    </div>
  );
}
