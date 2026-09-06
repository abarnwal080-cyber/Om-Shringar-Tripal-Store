import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import StoreHeroStatsSection from "./StoreHeroStatsSection";

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
  const [scrollIndex, setScrollIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll per second (advances 1 step every 1000ms)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setScrollIndex((prev) => (prev + 1) % BRANDS.length);
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused]);

  // Triple the array for seamless infinite looping
  const tripleBrands = [...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <div className="w-full bg-white">
      {/* 1. Store Trust & Highlights Stats Section */}
      <StoreHeroStatsSection />

      {/* 2. Brand Logos Auto-scroll Strip - Prominent Size */}
      <div 
        className="w-full py-4 sm:py-5 bg-slate-50 border-y border-slate-200/90 overflow-hidden relative select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Soft edge gradient masks for clean fade in/out */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4">
          {/* Active Auto-scroll per second container */}
          <div className="overflow-hidden w-full" ref={scrollContainerRef}>
            <motion.div
              className="flex items-center gap-6 sm:gap-8 md:gap-10 w-max"
              animate={{
                x: `-${scrollIndex * 175}px`,
              }}
              transition={{
                duration: 0.85,
                ease: "easeInOut",
              }}
            >
              {tripleBrands.map((brand, idx) => (
                <div
                  key={`${brand.name}-${idx}`}
                  className="shrink-0 flex items-center justify-center h-16 sm:h-18 md:h-20 px-4 sm:px-6 py-2 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-orange-500/60 hover:shadow-md transition-all duration-300 cursor-pointer group"
                  title={brand.name}
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="h-11 sm:h-13 md:h-14 w-auto max-w-[125px] sm:max-w-[155px] object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
