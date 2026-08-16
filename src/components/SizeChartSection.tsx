import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles } from "lucide-react";

interface SizeChartSectionProps {
  lang?: "en" | "hi";
  onSelectSize?: (size: string) => void;
}

interface PlasticWidthGroup {
  widthBadge: string;
  title: string;
  titleHi?: string;
  subtitle: string;
  subtitleHi?: string;
  sizes: string[];
}

const PLASTIC_WIDTH_GROUPS: PlasticWidthGroup[] = [
  {
    widthBadge: "12 FT",
    title: "12 ft Width Options",
    titleHi: "12 फीट चौड़ाई विकल्प",
    subtitle: "Utility & construction applications",
    subtitleHi: "उपयोगिता और निर्माण अनुप्रयोग",
    sizes: [
      "12 × 0.5",
      "12 × 0.75",
      "12 × 1",
      "12 × 2",
      "12 × 3",
      "12 × 5",
      "12 × 10",
    ],
  },
  {
    widthBadge: "15 FT",
    title: "15 ft Width Options",
    titleHi: "15 फीट चौड़ाई विकल्प",
    subtitle: "Large coverage applications",
    subtitleHi: "बड़े कवरेज अनुप्रयोग",
    sizes: [
      "15 × 0.5",
      "15 × 0.75",
      "15 × 1",
      "15 × 2",
      "15 × 3",
      "15 × 5",
      "15 × 10",
    ],
  },
  {
    widthBadge: "18 FT",
    title: "18 ft Width Options",
    titleHi: "18 फीट चौड़ाई विकल्प",
    subtitle: "Extra-wide commercial coverage",
    subtitleHi: "अतिरिक्त-चौड़ा वाणिज्यिक कवरेज",
    sizes: [
      "18 × 0.5",
      "18 × 0.75",
      "18 × 1",
      "18 × 2",
      "18 × 3",
      "18 × 5",
    ],
  },
  {
    widthBadge: "24 FT",
    title: "24 ft Width Options",
    titleHi: "24 फीट चौड़ाई विकल्प",
    subtitle: "Extra-large coverage solutions",
    subtitleHi: "विशाल कवरेज समाधान",
    sizes: [
      "24 × 0.5",
      "24 × 0.75",
      "24 × 1",
      "24 × 2",
      "24 × 5",
    ],
  },
  {
    widthBadge: "HD",
    title: "Heavy Duty Continuous",
    titleHi: "हैवी ड्यूटी कंटीन्यूअस रोल्स",
    subtitle: "Specialized industrial roll widths",
    subtitleHi: "विशेष औद्योगिक रोल चौड़ाई",
    sizes: ["30 FT Continuous", "36 FT Continuous"],
  },
];

interface TarpaulinCategory {
  icon: string;
  title: string;
  titleHi: string;
  subtitle: string;
  subtitleHi: string;
  sizes: string[];
}

const TARPAULIN_CATEGORIES: TarpaulinCategory[] = [
  {
    icon: "🏡",
    title: "Small & Utility Sizes",
    titleHi: "छोटे और घरेलू साइज़",
    subtitle: "Everyday household & utility coverage",
    subtitleHi: "दैनिक घरेलू और सामान्य उपयोग",
    sizes: ["6 × 6 ft", "9 × 12 ft", "12 × 12 ft", "12 × 15 ft"],
  },
  {
    icon: "🚚",
    title: "Medium & Standard Sizes",
    titleHi: "मध्यम और मानक साइज़",
    subtitle: "Commercial & transport coverage",
    subtitleHi: "वाणिज्यिक और ट्रांसपोर्ट कवरेज",
    sizes: ["12 × 18 ft", "15 × 18 ft", "18 × 24 ft", "24 × 24 ft"],
  },
  {
    icon: "🏗️",
    title: "Large & Heavy-Duty Sizes",
    titleHi: "बड़े और हैवी-ड्यूटी साइज़",
    subtitle: "Heavy-duty large-scale protection",
    subtitleHi: "मजबूत और बड़े पैमाने पर सुरक्षा",
    sizes: ["24 × 30 ft", "30 × 30 ft", "36 × 40 ft", "40 × 40 ft"],
  },
  {
    icon: "⛈️",
    title: "Industrial & Bulk Covering",
    titleHi: "औद्योगिक और थोक कवरेज",
    subtitle: "Warehouses, agriculture & industrial use",
    subtitleHi: "गोदाम, कृषि और औद्योगिक उपयोग",
    sizes: ["30 × 75 ft", "40 × 60 ft", "40 × 80 ft", "100 × 50 ft", "100 × 100 ft"],
  },
];

export const SizeChartSection: React.FC<SizeChartSectionProps> = ({
  lang = "en",
  onSelectSize,
}) => {
  const [activeTab, setActiveTab] = useState<"plastic" | "tarpaulin">("plastic");

  const handleCardClick = (sizeStr: string) => {
    if (onSelectSize) {
      onSelectSize(sizeStr);
    }
  };

  return (
    <section id="size-matrix" className="py-14 sm:py-20 bg-white border-b border-slate-100 relative scroll-mt-24 overflow-hidden text-slate-900">
      <div className="w-[min(1200px,calc(100%-28px))] mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-orange-500/25 rounded-full bg-gradient-to-br from-orange-50/80 to-white text-[#ff6a00] text-[11px] font-black tracking-widest uppercase shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>{lang === "en" ? "📐 Premium Size Collection" : "📐 प्रीमियम साइज़ कलेक्शन"}</span>
          </div>

          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight leading-none text-[#111111]">
            <span className="bg-gradient-to-r from-[#ff5a00] via-[#ff9500] to-[#ff5a00] bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradientMove_4s_linear_infinite]">
              {lang === "en" ? "Size" : "साइज़"}
            </span>{" "}
            {lang === "en" ? "Chart" : "चार्ट"}
          </h2>

          <p className="max-w-[700px] mx-auto mt-3 text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
            {lang === "en"
              ? "Select any standard size configuration below to quickly check availability and place an instant inquiry."
              : "उपलब्धता देखने और तुरंत पूछताछ के लिए नीचे दिए गए किसी भी मानक साइज़ पर क्लिक करें।"}
          </p>
        </div>

        {/* OUTER PREMIUM SHELL */}
        <div className="relative p-2.5 sm:p-4 md:p-5 rounded-[24px] sm:rounded-[30px] bg-white border-2 border-orange-500/35 shadow-[0_20px_60px_rgba(0,0,0,0.06),0_0_45px_rgba(255,106,0,0.05)] overflow-hidden">
          
          {/* Subtle Ambient Radial Glows */}
          <div className="absolute w-48 h-48 rounded-full bg-orange-500/10 -top-20 -left-16 blur-2xl pointer-events-none" />
          <div className="absolute w-52 h-52 rounded-full bg-amber-500/10 -bottom-24 -right-20 blur-2xl pointer-events-none" />

          {/* TABS */}
          <div className="flex justify-center relative z-10 mb-4 sm:mb-5">
            <div className="w-[min(560px,100%)] flex gap-1.5 p-1 bg-[#f4f4f4] border border-[#e8e8e8] rounded-[16px]">
              
              {/* Plastic Sheet Tab Button */}
              <button
                onClick={() => setActiveTab("plastic")}
                className={`relative flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-[12px] text-xs sm:text-[13px] font-black transition-all duration-300 cursor-pointer overflow-hidden ${
                  activeTab === "plastic"
                    ? "text-[#111111] bg-white shadow-[0_6px_18px_rgba(0,0,0,0.08)]"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <span className="text-base">🧻</span>
                <span>{lang === "en" ? "Plastic Sheet" : "प्लास्टिक शीट"}</span>
              </button>

              {/* Tarpaulin Tab Button */}
              <button
                onClick={() => setActiveTab("tarpaulin")}
                className={`relative flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-[12px] text-xs sm:text-[13px] font-black transition-all duration-300 cursor-pointer overflow-hidden ${
                  activeTab === "tarpaulin"
                    ? "text-[#111111] bg-white shadow-[0_6px_18px_rgba(0,0,0,0.08)]"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <span className="text-base">📐</span>
                <span>{lang === "en" ? "Tarpaulins" : "तिरपाल"}</span>
              </button>

            </div>
          </div>

          {/* TAB PANELS */}
          <AnimatePresence mode="wait">
            {activeTab === "plastic" ? (
              <motion.div
                key="plasticPanel"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="relative z-10"
              >
                <div className="relative border border-[#ededed] rounded-[20px] sm:rounded-[24px] p-3.5 sm:p-6 bg-gradient-to-br from-white to-[#fbfbfb] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_12px_32px_rgba(0,0,0,0.03)] overflow-hidden">
                  
                  {/* Decorative animated top bar */}
                  <div className="absolute top-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-transparent via-[#ff6a00] to-transparent animate-pulse" />

                  {/* Section Head */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-1.5 mb-4 sm:mb-5 border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-black font-display text-[#111111] tracking-tight">
                        {lang === "en" ? "Plastic Sheet Roll Sizes" : "प्लास्टिक शीट रोल साइज़"}
                      </h3>
                    </div>
                    <p className="text-slate-500 text-[11px] sm:text-xs font-medium">
                      {lang === "en" ? "Multiple standard width & gauge combinations" : "मानक चौड़ाई और गेज के विकल्प"}
                    </p>
                  </div>

                  {/* Width Groups */}
                  <div className="space-y-3.5 sm:space-y-4">
                    {PLASTIC_WIDTH_GROUPS.map((grp, gIdx) => (
                      <div
                        key={gIdx}
                        className="p-3 sm:p-4 border border-[#ececec] rounded-[16px] bg-white transition-all duration-300 hover:border-orange-500/30 hover:shadow-[0_10px_25px_rgba(255,106,0,0.06)]"
                      >
                        {/* Width Group Header */}
                        <div className="flex items-center gap-3 mb-3">
                          <div className="min-w-[56px] sm:min-w-[62px] h-8 sm:h-9 flex items-center justify-center rounded-[9px] bg-gradient-to-br from-[#111111] to-[#292929] text-white text-[11px] sm:text-xs font-black shadow-xs font-mono shrink-0">
                            {grp.widthBadge}
                          </div>
                          <div>
                            <h4 className="text-sm sm:text-[15px] font-black text-[#111111] font-display">
                              {lang === "en" ? grp.title : grp.titleHi || grp.title}
                            </h4>
                            <p className="text-slate-500 text-[10px] sm:text-[11px] font-medium">
                              {lang === "en" ? grp.subtitle : grp.subtitleHi || grp.subtitle}
                            </p>
                          </div>
                        </div>

                        {/* Sizes Grid: Compact Rectangular Boxes with pure sizes */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
                          {grp.sizes.map((sz, sIdx) => (
                            <div
                              key={sIdx}
                              onClick={() => handleCardClick(sz)}
                              className="relative py-2 sm:py-2.5 px-2 text-center rounded-[10px] border border-[#ececec] bg-[#fafafa] hover:bg-[#fff8f2] text-xs sm:text-[13px] font-black text-[#111111] font-mono transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-500/40 hover:shadow-[0_6px_16px_rgba(255,106,0,0.1)] cursor-pointer select-none flex items-center justify-center"
                            >
                              {sz}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </motion.div>
            ) : (
              <motion.div
                key="tarpaulinPanel"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="relative z-10"
              >
                <div className="relative border border-[#ededed] rounded-[20px] sm:rounded-[24px] p-3.5 sm:p-6 bg-gradient-to-br from-white to-[#fbfbfb] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_12px_32px_rgba(0,0,0,0.03)] overflow-hidden">
                  
                  {/* Decorative animated top bar */}
                  <div className="absolute top-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-transparent via-[#ff6a00] to-transparent animate-pulse" />

                  {/* Section Head */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-1.5 mb-4 sm:mb-5 border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-black font-display text-[#111111] tracking-tight">
                        {lang === "en" ? "Standard Tarpaulin Sizing Matrix" : "मानक तिरपाल साइज़ मैट्रिक्स"}
                      </h3>
                    </div>
                    <p className="text-slate-500 text-[11px] sm:text-xs font-medium">
                      {lang === "en" ? "Premium Double-Reinforced All-Weather Guards" : "प्रीमियम डबल-प्रबलित ऑल-वेदर गार्ड"}
                    </p>
                  </div>

                  {/* Tarpaulin Categories */}
                  <div className="space-y-3.5 sm:space-y-4">
                    {TARPAULIN_CATEGORIES.map((cat, cIdx) => (
                      <div
                        key={cIdx}
                        className="p-3 sm:p-4 border border-[#ececec] rounded-[16px] bg-white transition-all duration-300 hover:border-orange-500/30 hover:shadow-[0_10px_25px_rgba(0,0,0,0.05)]"
                      >
                        <div className="flex items-center gap-2.5 mb-3">
                          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[10px] bg-gradient-to-br from-[#fff4ea] to-[#fffaf6] border border-orange-500/15 flex items-center justify-center text-base shrink-0 shadow-xs">
                            {cat.icon}
                          </div>
                          <div>
                            <h4 className="text-sm sm:text-[15px] font-black text-[#111111] font-display">
                              {lang === "en" ? cat.title : cat.titleHi}
                            </h4>
                            <p className="text-slate-500 text-[10px] sm:text-[11px] font-medium">
                              {lang === "en" ? cat.subtitle : cat.subtitleHi}
                            </p>
                          </div>
                        </div>

                        {/* Tarpaulin Sizes Grid: Compact Rectangular Boxes */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                          {cat.sizes.map((sz, sIdx) => (
                            <div
                              key={sIdx}
                              onClick={() => handleCardClick(sz)}
                              className="relative py-2 sm:py-2.5 px-2 text-center rounded-[10px] border border-[#ececec] bg-[#fafafa] hover:bg-[#fff8f2] text-xs sm:text-[13px] font-black text-slate-800 font-mono transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-500/35 hover:shadow-[0_6px_16px_rgba(255,106,0,0.08)] cursor-pointer select-none flex items-center justify-center"
                            >
                              {sz}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Grommet System Note Box */}
                  <div className="mt-4 p-4 sm:p-5 rounded-[16px] bg-gradient-to-br from-[#111111] to-[#242424] text-white relative overflow-hidden shadow-md border border-white/5">
                    {/* Ring decoration */}
                    <div className="absolute w-36 h-36 rounded-full border border-orange-500/30 -right-12 -top-16 pointer-events-none" />

                    <div className="relative z-10">
                      <strong className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                        <span>🔩</span>
                        <span>{lang === "en" ? "Heavy-Duty Grommet System" : "हैवी-ड्यूटी ग्रोमेट सिस्टम"}</span>
                      </strong>

                      <p className="mt-1.5 text-[#cfcfcf] text-[11px] sm:text-xs leading-relaxed">
                        <span className="text-[#ff9b54] font-bold">
                          {lang === "en" ? "Aluminum rust-resistant grommets" : "एल्यूमीनियम जंग-रोधी ग्रोमेट्स"}
                        </span>{" "}
                        {lang === "en"
                          ? "are pre-installed at every 2–3 feet intervals for reliable heavy-duty anchoring and tying."
                          : "मजबूत बांधने और टिकने के लिए हर 2-3 फीट की दूरी पर पहले से लगे हुए हैं।"}
                        <br />
                        <span className="text-slate-400 mt-1 inline-block">
                          {lang === "en"
                            ? "Custom configurations can be ordered on request."
                            : "मांग पर विशेष साइज़ और मोटाई भी तैयार किए जाते हैं।"}
                        </span>
                      </p>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
};

export default SizeChartSection;
