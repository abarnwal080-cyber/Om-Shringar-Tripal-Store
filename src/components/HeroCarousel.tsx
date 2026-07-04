import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  image: string;
  en: {
    title: string;
    subtitle: string;
  };
  hi: {
    title: string;
    subtitle: string;
  };
}

const HERO_SLIDES: Slide[] = [
  {
    image: "https://5.imimg.com/data5/SELLER/Default/2023/4/301281309/FL/MC/FC/123837/waterproof-tarpaulins.webp",
    en: {
      title: "Premium Waterproof Tarpaulins (Tirpal)",
      subtitle: "Multi-layered cross-laminated supreme protection"
    },
    hi: {
      title: "प्रीमियम वाटरप्रूफ तिरपाल (Tirpal)",
      subtitle: "मल्टी-लेयर क्रॉस लैमिनेटेड उत्कृष्ट सुरक्षा"
    }
  },
  {
    image: "https://plain-apac-prod-public.komododecks.com/202607/03/qab82eSfCIUQZ1Se0koa/image.png",
    en: {
      title: "Construction Blue Polythene Roll",
      subtitle: "Engineered for road curing, roofing, and covers"
    },
    hi: {
      title: "कंस्ट्रक्शन ब्लू पॉलिथीन रोल",
      subtitle: "सड़क क्युरिंग, छत ढलाई और कवर हेतु विशेष"
    }
  },
  {
    image: "https://cpimg.tistatic.com/10847398/b/4/LDPE-Sheet.jpeg",
    en: {
      title: "Construction Black Polythene Roll",
      subtitle: "Heavy-duty foundation damp proofing & barrier"
    },
    hi: {
      title: "कंस्ट्रक्शन ब्लैक पॉलिथीन रोल",
      subtitle: "हैवी-ड्यूटी डैम प्रूफिंग और डस्ट प्रोटेक्शन"
    }
  },
  {
    image: "https://cpimg.tistatic.com/09389722/b/4/Transparent-Plastic-Films.jpg",
    en: {
      title: "Transparent Stretch Film Roll",
      subtitle: "High-stretch cling wrapping for packaging & transit"
    },
    hi: {
      title: "ट्रांसपेरेंट स्ट्रेच फिल्म रोल",
      subtitle: "पैकेजिंग और सुरक्षित ट्रांसपोर्ट के लिए सर्वोत्तम रैप"
    }
  },
  {
    image: "https://5.imimg.com/data5/ANDROID/Default/2024/9/449619383/UL/CG/RW/25980061/product-jpeg-500x500.jpg",
    en: {
      title: "Transparent Shisha Roll (शीशा रोल)",
      subtitle: "Glass-clear table protection and dust partitioning"
    },
    hi: {
      title: "पारदर्शी शीशा रोल (Shisha Roll)",
      subtitle: "शीशे जैसा साफ टेबल कवर और पारदर्शी पार्टीशन"
    }
  }
];

interface HeroCarouselProps {
  currentLanguage: "en" | "hi";
  onImageChange?: (image: string) => void;
}

export default function HeroCarousel({ currentLanguage, onImageChange }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setDirection("right");
    setCurrentIndex((prevIndex) => (prevIndex + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection("left");
    setCurrentIndex((prevIndex) => (prevIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  const goToSlide = (slideIndex: number) => {
    setDirection(slideIndex > currentIndex ? "right" : "left");
    setCurrentIndex(slideIndex);
  };

  // Safe side-effect to notify parent component when image changes, preventing React render/setState warnings
  useEffect(() => {
    if (onImageChange) {
      onImageChange(HERO_SLIDES[currentIndex].image);
    }
  }, [currentIndex, onImageChange]);

  // Autoplay effect
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4500);

    return () => clearInterval(timer);
  }, [nextSlide, isHovered]);

  const activeSlide = HERO_SLIDES[currentIndex];
  const langData = currentLanguage === "hi" ? activeSlide.hi : activeSlide.en;

  // Variants for slide animation
  const slideVariants = {
    enter: (dir: "left" | "right") => ({
      x: dir === "right" ? "100%" : "-100%",
      opacity: 0,
      scale: 1.05
    }),
    center: {
      x: "0%",
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.35 },
        scale: { duration: 0.5 }
      }
    },
    exit: (dir: "left" | "right") => ({
      x: dir === "right" ? "-100%" : "100%",
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.35 }
      }
    })
  };

  return (
    <div
      className="my-5 relative rounded-2xl overflow-hidden border border-white/10 aspect-video shadow-xl bg-slate-950 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Image Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={activeSlide.image}
              alt={langData.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover select-none"
            />
            {/* Gradient Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Manual Controls - Chevron Arrows */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          prevSlide();
        }}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-slate-900/60 hover:bg-slate-900/90 border border-white/10 text-white/80 hover:text-white hover:scale-105 active:scale-95 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-slate-900/60 hover:bg-slate-900/90 border border-white/10 text-white/80 hover:text-white hover:scale-105 active:scale-95 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Text Information Overlay (Bilingual) */}
      <div className="absolute bottom-0 inset-x-0 p-4 md:p-5 z-10 pointer-events-none flex flex-col justify-end">
        <motion.span
          key={`badge-${currentIndex}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[9px] md:text-[10px] font-bold font-mono tracking-wider text-brand-orange bg-brand-orange/15 px-2 py-0.5 rounded-md w-fit mb-1.5 border border-brand-orange/20"
        >
          {currentLanguage === "en" ? "FEATURED PRODUCT" : "प्रमुख उत्पाद"}
        </motion.span>
        
        <motion.h4
          key={`title-${currentIndex}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-sm md:text-base font-extrabold text-white leading-snug drop-shadow"
        >
          {langData.title}
        </motion.h4>
        
        <motion.p
          key={`sub-${currentIndex}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[11px] md:text-xs text-slate-300 leading-normal mt-0.5 line-clamp-1"
        >
          {langData.subtitle}
        </motion.p>
      </div>

      {/* Progress Dots Indicators */}
      <div className="absolute bottom-3 right-4 z-20 flex gap-1.5 items-center bg-black/30 backdrop-blur-sm py-1 px-2.5 rounded-full border border-white/5">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              goToSlide(idx);
            }}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              idx === currentIndex
                ? "bg-brand-orange w-3.5"
                : "bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
