import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Award, ShieldCheck, Users, Clock, Layers } from "lucide-react";

const BRANDS = [
  {
    name: "Shalimar",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhYupOFug5Yj8fRM0Q74ENy_gKWvv5Dy6M9SlsFfbaJTHeWNACb06XwCwy&s=10",
  },
  {
    name: "Greatpaulin",
    logo: "https://plain-apac-prod-public.komododecks.com/202607/03/oDtfecDE2xAWZLABiKFx/image.jpg",
  },
  {
    name: "Silpaulin",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeMUnP6Z2TnQ59-T8IoNdUnuS71PtlmQcf7bQIttKIS6MUbQv_4_OmhU4&s=10",
  },
  {
    name: "Cheetah",
    logo: "https://plain-apac-prod-public.komododecks.com/202607/03/nH1liaiAJsZ72n7WVMa5/image.jpg",
  },
  {
    name: "Vision",
    logo: "https://media.licdn.com/dms/image/v2/C560BAQFljvsCvp1y2w/company-logo_200_200/company-logo_200_200/0/1630584191714/vision_plastics_inc_logo?e=2147483647&v=beta&t=D5xt-vVoXRwqmnW2EX33_rczHrjV-GGGW1AxWZXcZmE",
  },
  {
    name: "KNS",
    logo: "https://plain-apac-prod-public.komododecks.com/202607/03/m7zkbhNPvoPwDA32B9BY/image.jpg",
  },
  {
    name: "Black Bull",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPjWOzy_wJ_BmDWWcyXAj3vAIhq-4Dbdj129c1auNaHA&s=10",
  },
  {
    name: "Double Bull",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVowJ2c1FfQeCQR_Jc32h9YCj6YL5jljWfWOppnMKRmw&s=10",
  },
  {
    name: "Tuffpaulin",
    logo: "https://www.tuffpaulin.com/wp-content/uploads/2021/09/Tuff-logo-with-IS-Mark-e1629102662998.png",
  },
  {
    name: "Mipatex",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx12lnc13eV1UzLcfMfjctY3t6ZzPaNfySie4uS1eGAA&s=10",
  },
  {
    name: "Jumbo",
    logo: "https://plain-apac-prod-public.komododecks.com/202607/16/fqOq0hB8ZA982pAThU7G/image.jpg",
  },
  {
    name: "Himalaya",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiEr-VxegD2eLYFiBrrsbcYjH4ZxR1FbEbgxfpNP4JUg&s=10",
  },
  {
    name: "Fortune",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG-uVnYN4I820w2J4ZgUanUXZK81heB3UXJE87SN2MsPDdIN1IMPrJGA&s",
  },
  {
    name: "Vinex",
    logo: "https://plain-apac-prod-public.komododecks.com/202607/16/hDQT1Xo8iGIRV1LacJtu/image.jpg",
  },
];

interface BrandCarouselProps {
  lang?: "en" | "hi";
}

export default function BrandCarousel({ lang = "en" }: BrandCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? BRANDS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === BRANDS.length - 1 ? 0 : prev + 1));
  };

  // Auto-slide effect
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 1000); // 1 second
    return () => clearInterval(interval);
  }, [isHovered, activeIndex]);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    const threshold = 50; // swipe threshold in pixels

    if (diff > threshold) {
      handleNext();
    } else if (diff < -threshold) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  const getRelativeIndex = (index: number) => {
    const count = BRANDS.length;
    let diff = index - activeIndex;
    while (diff < -count / 2) diff += count;
    while (diff > count / 2) diff -= count;
    return diff;
  };

  return (
    <div
      className="w-full bg-white border-y border-slate-200/50 py-16 md:py-24 overflow-hidden relative"
      style={{
        backgroundImage: "radial-gradient(#e2e8f0 1.2px, transparent 1.2px)",
        backgroundSize: "24px 24px",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Premium Shop Name Headings */}
        <div className="text-center mb-12 md:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-[#FF6B00] font-mono text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
            <span>Shop Name</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-[#0B2D5C] tracking-tight max-w-4xl mx-auto leading-tight">
            Om Shringar Tirpal Store
          </h2>
          <p className="text-base sm:text-lg font-extrabold text-slate-500 font-mono tracking-wide">
            Maharajganj, Siwan, Bihar
          </p>
          <p className="text-xs md:text-sm font-bold font-mono text-[#FF6B00] uppercase tracking-[0.2em] pt-2">
            AUTHORIZED DISTRIBUTOR & TRADING PARTNER
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-[#FF6B00] to-orange-500 mx-auto rounded-full mt-4" />
        </div>

        {/* 4 Store Highlights Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16 relative z-10">
          {/* Stat 1: 26+ Years of Trust (Est. 2000) */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-orange-50 to-white border border-orange-100 hover:border-orange-300 hover:shadow-md transition-all duration-300 text-left shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 shrink-0 shadow-inner">
              <Award className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-xl font-black font-display text-[#0B2D5C] leading-none mb-1">
                26+
              </h3>
              <p className="text-slate-600 text-xs font-semibold">
                {lang === "en" ? "Years of Trust (Est. 2000)" : "वर्षों का अटूट विश्वास (स्थापना 2000)"}
              </p>
            </div>
          </div>

          {/* Stat 2: 50+ Size Configurations */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-white border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all duration-300 text-left shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0 shadow-inner">
              <Layers className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-xl font-black font-display text-[#0B2D5C] leading-none mb-1">
                50+
              </h3>
              <p className="text-slate-600 text-xs font-semibold">
                {lang === "en" ? "Size Configurations" : "विभिन्न साइज़ कॉम्बिनेशन्स उपलब्ध"}
              </p>
            </div>
          </div>

          {/* Stat 3: 100% Waterproof & UV Tested */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-white border border-emerald-100 hover:border-emerald-300 hover:shadow-md transition-all duration-300 text-left shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 shadow-inner">
              <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-xl font-black font-display text-[#0B2D5C] leading-none mb-1">
                100%
              </h3>
              <p className="text-slate-600 text-xs font-semibold">
                {lang === "en" ? "Waterproof & UV Tested" : "100% वॉटरप्रूफ और यूवी प्रोटेक्टेड"}
              </p>
            </div>
          </div>

          {/* Stat 4: 10k+ Happy Customers */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-white border border-purple-100 hover:border-purple-300 hover:shadow-md transition-all duration-300 text-left shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 shrink-0 shadow-inner">
              <Users className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-xl font-black font-display text-[#0B2D5C] leading-none mb-1">
                10k+
              </h3>
              <p className="text-slate-600 text-xs font-semibold">
                {lang === "en" ? "Happy Customers" : "10,000+ संतुष्ट ग्राहक"}
              </p>
            </div>
          </div>
        </div>

        {/* 3D Carousel Stage */}
        <div 
          className="relative flex items-center justify-center w-full h-[240px] md:h-[400px] mb-8 md:mb-12 overflow-visible select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
        >
          {BRANDS.map((brand, index) => {
            const diff = getRelativeIndex(index);
            const isActive = diff === 0;

            // 3D placement configurations
            let xTranslation = "0%";
            let scale = 0.82;
            let opacity = 0.6;
            let rotateY = 0;
            let filterValue = "blur(4px)";
            let zIndex = 10;
            let pointerEvents: "auto" | "none" = "none";

            if (isActive) {
              xTranslation = "0%";
              scale = 1.0;
              opacity = 1;
              rotateY = 0;
              filterValue = "blur(0px)";
              zIndex = 30;
              pointerEvents = "auto";
            } else if (diff === -1) {
              xTranslation = "-38%";
              scale = 0.82;
              opacity = 0.6;
              rotateY = 24;
              filterValue = "blur(3px)";
              zIndex = 20;
            } else if (diff === 1) {
              xTranslation = "38%";
              scale = 0.82;
              opacity = 0.6;
              rotateY = -24;
              filterValue = "blur(3px)";
              zIndex = 20;
            } else {
              // Hide other slides
              xTranslation = diff < 0 ? "-80%" : "80%";
              scale = 0.7;
              opacity = 0;
              rotateY = diff < 0 ? 45 : -45;
              filterValue = "blur(8px)";
              zIndex = 0;
            }

            return (
              <motion.div
                key={brand.name}
                style={{
                  pointerEvents,
                  transformOrigin: "center center",
                }}
                animate={{
                  x: xTranslation,
                  scale,
                  opacity,
                  rotateY,
                  filter: filterValue,
                  zIndex,
                }}
                transition={{
                  type: "tween",
                  ease: "easeInOut",
                  duration: 0.9,
                }}
                className={`absolute w-[82%] sm:w-[460px] md:w-[520px] h-[180px] sm:h-[260px] md:h-[320px] rounded-[24px] bg-white/75 backdrop-blur-md border border-slate-200/60 p-6 sm:p-8 flex flex-col items-center justify-center cursor-pointer transition-shadow duration-300 ${
                  isActive 
                    ? "shadow-[0_25px_60px_-15px_rgba(11,45,92,0.15)] hover:shadow-[0_35px_70px_-10px_rgba(11,45,92,0.22)] hover:-translate-y-2" 
                    : "shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
                }`}
                onClick={() => {
                  if (!isActive) {
                    setActiveIndex(index);
                  }
                }}
              >
                {/* Clean glass reflection shine */}
                <div className="absolute inset-0 rounded-[24px] bg-gradient-to-tr from-white/0 via-white/10 to-white/30 pointer-events-none" />

                {/* Brand Logo Container */}
                <div className="w-full h-[70%] flex items-center justify-center relative overflow-hidden p-2">
                  <img
                    src={brand.logo}
                    alt={`${brand.name} Logo`}
                    referrerPolicy="no-referrer"
                    className={`max-w-[75%] max-h-[85%] object-contain select-none transition-transform duration-500 ${
                      isActive ? "scale-105" : "scale-95"
                    }`}
                  />
                </div>

                {/* Brand Name Text */}
                <div className="h-[20%] mt-2 flex flex-col items-center justify-end">
                  <span className="text-[11px] md:text-xs font-bold font-mono tracking-[0.25em] text-slate-400 uppercase select-none group-hover:text-[#FF6B00] transition-colors duration-300">
                    {brand.name}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation & Controls Wrapper */}
        <div className="flex flex-col items-center justify-center space-y-6">
          
          {/* Bottom Pagination Dots */}
          <div className="flex items-center justify-center gap-3">
            {BRANDS.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-8 bg-[#FF6B00] shadow-[0_2px_8px_rgba(255,107,0,0.4)]"
                    : "w-2.5 bg-slate-200 hover:bg-slate-300"
                }`}
                aria-label={`Go to brand ${index + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
