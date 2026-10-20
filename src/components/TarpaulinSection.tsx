import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck,
  Wind,
  CloudRain,
  Layers,
  ArrowRight,
  PhoneCall,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Maximize2,
  X
} from "lucide-react";
import { TARPAULIN_BRANDS_SHOWCASE, TARPAULIN_GSM_SPECS, getProductSlug } from "../data";

interface TarpaulinSectionProps {
  lang: "en" | "hi";
  onSelectProduct: (slug: string) => void;
  onEnquire: (productName: string, customContext?: string) => void;
}

export default function TarpaulinSection({
  lang,
  onSelectProduct,
  onEnquire,
}: TarpaulinSectionProps) {
  // Active selected image index per brand card
  const [activeImageIdx, setActiveImageIdx] = useState<Record<string, number>>({
    "shalimar-tarpaulin": 0,
    "kangaroo-tarpaulin": 0,
    "silpaulin-tarpaulin": 0,
    "great-paulin": 0,
    "gold-paulin": 0,
  });

  // Modal zoom image preview
  const [zoomedImage, setZoomedImage] = useState<{ url: string; title: string } | null>(null);

  const handleThumbnailClick = (brandId: string, idx: number) => {
    setActiveImageIdx((prev) => ({
      ...prev,
      [brandId]: idx,
    }));
  };

  return (
    <div className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-b from-[#06152b] via-[#0b2447] to-[#081a33] text-white p-6 sm:p-10 lg:p-12 shadow-2xl border border-white/10 my-8">
      {/* =================================================================
          1. AMBIENT BACKGROUND SVGs & GLOWS (Wind, Protection, Rain Logos)
      ================================================================== */}
      {/* Background Floating / Watermark Logos */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Wind Logo Watermark - Top Right */}
        <img
          src="https://www.shalimargroupindia.com/assets/img/wind-logo.png"
          alt="Wind Resistance"
          className="absolute -top-10 -right-10 w-64 h-64 sm:w-96 sm:h-96 opacity-10 object-contain filter invert mix-blend-screen pointer-events-none transform rotate-12 transition-transform duration-1000"
        />

        {/* Rain Logo Watermark - Bottom Left */}
        <img
          src="https://www.shalimargroupindia.com/assets/img/rain-logo.png"
          alt="100% Rain Protection"
          className="absolute -bottom-12 -left-12 w-64 h-64 sm:w-80 sm:h-80 opacity-10 object-contain filter invert mix-blend-screen pointer-events-none transform -rotate-12"
        />

        {/* Protection Shield Logo Watermark - Center Right */}
        <img
          src="https://www.shalimargroupindia.com/assets/img/protection-logo.png"
          alt="Heavy Shield Protection"
          className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 h-72 sm:w-[420px] sm:h-[420px] opacity-[0.06] object-contain filter invert mix-blend-screen pointer-events-none"
        />

        {/* Soft Radial Ambient Lights */}
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-blue-500/15 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-10 sm:gap-14">
        
        {/* =================================================================
            HEADER BADGE & TITLE
        ================================================================== */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-black uppercase tracking-widest shadow-inner mb-4">
            <ShieldCheck className="w-4 h-4 text-orange-400" />
            <span>Category 1 • Waterproof Heavy-Duty Tarpaulins (Tirpal)</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display max-w-3xl leading-tight">
            Original Certified Branded <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">Tarpaulins</span> Depot
          </h2>
          
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            {lang === "hi"
              ? "भारत के शीर्ष प्रमाणित ब्रांड्स—शालीमार, कंगारू, सिलपॉलिन, ग्रेट पॉलिन और गोल्ड पॉलिन। बारिश, आंधी और धूप से 100% सुरक्षा।"
              : "Direct wholesale distribution of India's most trusted HDPE & cross-laminated tarpaulins with official factory warranties and custom size fabrication."}
          </p>

          {/* 3 Core Protective Pillars (Using Official Icons) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-6 w-full max-w-3xl">
            <div className="flex items-center justify-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 p-2 flex items-center justify-center">
                <img
                  src="https://www.shalimargroupindia.com/assets/img/rain-logo.png"
                  alt="Rain Shield"
                  className="w-full h-full object-contain filter invert"
                />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white">100% Rainproof</div>
                <div className="text-[11px] text-slate-400">Zero Water Leakage</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 p-2 flex items-center justify-center">
                <img
                  src="https://www.shalimargroupindia.com/assets/img/wind-logo.png"
                  alt="Wind Resistant"
                  className="w-full h-full object-contain filter invert"
                />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white">High Storm Wind Shield</div>
                <div className="text-[11px] text-slate-400">Heavy Bound Hemming</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 p-2 flex items-center justify-center">
                <img
                  src="https://www.shalimargroupindia.com/assets/img/protection-logo.png"
                  alt="Total Protection"
                  className="w-full h-full object-contain filter invert"
                />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white">UV & Tear Resistance</div>
                <div className="text-[11px] text-slate-400">Cross-Laminated Toughness</div>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================================
            2. QUALITY & GSM SPECIFICATION TABLE
        ================================================================== */}
        <div className="rounded-3xl bg-slate-900/80 border border-white/15 p-5 sm:p-7 backdrop-blur-xl shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                  {lang === "hi" ? "क्वालिटी एवं GSM विशिष्टता तालिका" : "Quality & GSM Thickness Specifications Matrix"}
                </h3>
                <p className="text-xs text-slate-400">
                  {lang === "hi"
                    ? "उपलब्ध मोटाई और ग्रेड (95 GSM से 250 GSM तक)"
                    : "Standard certified GSM ratings for domestic, harvest, and heavy industrial tarpaulins"}
                </p>
              </div>
            </div>

            <button
              onClick={() => onEnquire("Tarpaulin GSM Selection", "Customer inquiring about Quality vs GSM availability")}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-extrabold transition-all cursor-pointer w-fit"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{lang === "hi" ? "रेट लिस्ट पूछें" : "Consult GSM Rates"}</span>
            </button>
          </div>

          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4 font-black">Quality Grade</th>
                  <th className="py-3 px-4 font-black">Certified GSM</th>
                  <th className="py-3 px-4 font-black">Ideal Recommended Application</th>
                  <th className="py-3 px-4 font-black text-right">Inquiry</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {TARPAULIN_GSM_SPECS.map((spec, index) => {
                  let recommended = "Light Agricultural & Grain Covering";
                  if (spec.quality === "Medium" || spec.quality === "Heavy") {
                    recommended = "Domestic Tent, Monsoon Shedding & Vehicle Cover";
                  } else if (spec.quality === "Super" || spec.quality === "Deluxe") {
                    recommended = "Commercial Freight Cargo Trucks & Concrete Sattering";
                  } else if (spec.quality === "Special" || spec.quality === "Ex. Strong") {
                    recommended = "Heavy Industrial Warehousing, Pond Liners & Extreme Weather";
                  }

                  return (
                    <tr
                      key={index}
                      className="hover:bg-white/[0.04] transition-colors group cursor-default"
                    >
                      <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${
                          spec.quality === "Ex. Strong" || spec.quality === "Special"
                            ? "bg-red-500"
                            : spec.quality === "Deluxe" || spec.quality === "Super"
                            ? "bg-orange-400"
                            : "bg-emerald-400"
                        }`} />
                        <span>{spec.quality}</span>
                      </td>
                      <td className="py-3 px-4 font-mono font-black text-amber-300">
                        {spec.gsm}
                      </td>
                      <td className="py-3 px-4 text-slate-300 text-xs">
                        {recommended}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => onEnquire(`Tarpaulin ${spec.quality} (${spec.gsm})`)}
                          className="text-xs font-bold text-orange-400 hover:text-orange-300 underline underline-offset-4 cursor-pointer"
                        >
                          Enquire
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Grid Cards */}
          <div className="grid grid-cols-2 gap-2.5 sm:hidden">
            {TARPAULIN_GSM_SPECS.map((spec, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-2xl p-3 flex flex-col justify-between"
              >
                <div>
                  <div className="text-[11px] text-slate-400 font-bold uppercase">{spec.quality}</div>
                  <div className="text-base font-black text-amber-300 font-mono mt-0.5">{spec.gsm}</div>
                </div>
                <button
                  onClick={() => onEnquire(`Tarpaulin ${spec.quality} (${spec.gsm})`)}
                  className="mt-2 text-[11px] font-black text-orange-400 hover:text-orange-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>Enquire</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* =================================================================
            3. TOP BRAND TARPAULIN SHOWCASE CARDS (Shalimar, Kangaroo, Silpaulin, Great Paulin, Gold Paulin)
        ================================================================== */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <div className="text-xs uppercase font-black tracking-widest text-orange-400 flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Authorized Branded Inventory</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white font-display">
                Featured Brand Portfolios & Product Galleries
              </h3>
            </div>
            <span className="text-xs text-slate-400">
              Direct from manufacturer factory supplies • 100% Original
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {TARPAULIN_BRANDS_SHOWCASE.map((brand) => {
              const currentIdx = activeImageIdx[brand.id] || 0;
              const currentImageUrl = brand.images[currentIdx] || brand.images[0];
              const slug = getProductSlug(brand.id);

              return (
                <div
                  key={brand.id}
                  className="rounded-3xl bg-slate-900/90 border border-white/15 overflow-hidden shadow-2xl flex flex-col justify-between hover:border-orange-500/40 transition-all duration-300 group"
                >
                  {/* Top Brand Header */}
                  <div className="p-5 sm:p-6 bg-gradient-to-r from-white/[0.07] to-transparent border-b border-white/10 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {brand.logo ? (
                        <div className="w-14 h-12 rounded-xl bg-white p-1.5 shadow-md flex items-center justify-center shrink-0">
                          <img
                            src={brand.logo}
                            alt={`${brand.name} Logo`}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 font-black text-lg">
                          {brand.name.substring(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <h4 className="text-lg sm:text-xl font-black text-white font-display tracking-tight flex items-center gap-2">
                          <span>{brand.name}</span>
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            Verified
                          </span>
                        </h4>
                        {brand.tagline && (
                          <p className="text-xs text-amber-300 font-semibold line-clamp-1 mt-0.5">
                            "{brand.tagline}"
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectProduct(slug)}
                      className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-orange-400 hover:text-orange-300 hover:underline cursor-pointer shrink-0"
                    >
                      <span>Product Page</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Body Content: Image Showcase + Description */}
                  <div className="p-5 sm:p-6 flex flex-col gap-4 flex-grow">
                    
                    {/* Main Active Image with Interactive Zoom */}
                    <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl bg-black/40 overflow-hidden border border-white/10 group/img flex items-center justify-center">
                      <img
                        src={currentImageUrl}
                        alt={`${brand.name} Photo`}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover/img:scale-105"
                      />

                      {/* Click to Zoom Overlay */}
                      <button
                        onClick={() => setZoomedImage({ url: currentImageUrl, title: `${brand.name} Full Preview` })}
                        className="absolute bottom-3 right-3 p-2 rounded-xl bg-black/60 backdrop-blur-md text-white hover:bg-black/90 transition-all cursor-pointer opacity-80 group-hover/img:opacity-100"
                        title="Zoom Image"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>

                      {/* Photo Counter Pill */}
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-white/90">
                        {currentIdx + 1} / {brand.images.length}
                      </div>
                    </div>

                    {/* Thumbnail Switcher */}
                    {brand.images.length > 1 && (
                      <div className="flex items-center gap-2 overflow-x-auto pb-1">
                        {brand.images.map((imgUrl, i) => (
                          <button
                            key={i}
                            onClick={() => handleThumbnailClick(brand.id, i)}
                            className={`relative w-14 h-12 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer bg-black/30 p-0.5 ${
                              currentIdx === i
                                ? "border-orange-500 scale-105 shadow-md"
                                : "border-white/10 opacity-60 hover:opacity-100"
                            }`}
                          >
                            <img
                              src={imgUrl}
                              alt={`Thumbnail ${i + 1}`}
                              className="w-full h-full object-contain rounded-lg"
                            />
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Official Slogan & Text Description */}
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-1">
                      {brand.description}
                    </p>
                  </div>

                  {/* Card Bottom CTA Actions */}
                  <div className="p-5 sm:p-6 pt-0 flex items-center justify-between gap-3">
                    <button
                      onClick={() => onEnquire(brand.name, `Wholesale rate enquiry for ${brand.name}`)}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>{lang === "hi" ? "थोक रेट पूछें" : "Wholesale Rates"}</span>
                    </button>

                    <button
                      onClick={() => onSelectProduct(slug)}
                      className="py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 border border-white/15"
                    >
                      <span>{lang === "hi" ? "विवरण देखें" : "View Details"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* =================================================================
          LIGHTBOX MODAL FOR IMAGE ZOOM
      ================================================================== */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomedImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[90vh] bg-slate-900 rounded-3xl overflow-hidden border border-white/20 p-2 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-3 border-b border-white/10">
                <span className="text-sm font-bold text-white">{zoomedImage.title}</span>
                <button
                  onClick={() => setZoomedImage(null)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-auto flex items-center justify-center p-4">
                <img
                  src={zoomedImage.url}
                  alt="Zoomed View"
                  className="max-w-full max-h-[75vh] object-contain rounded-xl"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
