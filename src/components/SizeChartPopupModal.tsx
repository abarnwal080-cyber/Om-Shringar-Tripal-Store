import React, { useState, useEffect } from "react";
import { X, Sparkles, Grid, Layers, MessageSquare, CheckCircle } from "lucide-react";

interface SizeChartPopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: string;
  onSelectSize?: (sizeStr: string) => void;
}

export default function SizeChartPopupModal({
  isOpen,
  onClose,
  lang = "en",
  onSelectSize,
}: SizeChartPopupModalProps) {
  const [activeTab, setActiveTab] = useState<"tarpaulin" | "plastic">("tarpaulin");

  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const tarpaulinCategories = [
    {
      titleHi: "छोटे साइज़ (Small Sizes)",
      titleEn: "Small Sizes (Home & Bike Cover)",
      color: "bg-amber-50 border-amber-200 text-amber-900",
      badgeColor: "bg-amber-500 text-white",
      sizes: ["6 × 6 ft", "8 × 6 ft", "8 × 8 ft", "8 × 10 ft", "10 × 10 ft", "10 × 15 ft", "12 × 10 ft", "12 × 12 ft"],
    },
    {
      titleHi: "मध्यम साइज़ (Medium Sizes)",
      titleEn: "Medium Sizes (Roof & Agri Cover)",
      color: "bg-orange-50 border-orange-200 text-orange-900",
      badgeColor: "bg-orange-500 text-white",
      sizes: ["12 × 15 ft", "12 × 18 ft", "15 × 15 ft", "15 × 18 ft", "15 × 21 ft", "18 × 24 ft", "20 × 30 ft"],
    },
    {
      titleHi: "बड़े व हैवी साइज़ (Large & Heavy)",
      titleEn: "Large & Heavy Sizes (Trucks & Ponds)",
      color: "bg-rose-50 border-rose-200 text-rose-900",
      badgeColor: "bg-rose-500 text-white",
      sizes: ["24 × 30 ft", "24 × 36 ft", "30 × 36 ft", "36 × 40 ft", "40 × 40 ft", "30 × 75 ft", "40 × 60 ft", "36 × 70 ft"],
    },
    {
      titleHi: "एक्स्ट्रा लार्ज व मेगा साइज़ (Extra Large / Mega)",
      titleEn: "Extra Large / Mega (Site & Industrial)",
      color: "bg-purple-50 border-purple-200 text-purple-900",
      badgeColor: "bg-purple-600 text-white",
      sizes: ["40 × 80 ft", "100 × 50 ft", "100 × 100 ft", "Custom Jumbo Sizes"],
    },
  ];

  const plasticRolls = [
    { width: "3 Feet Roll", gauges: "100G, 150G, 200G, 250G, 400G, 500G" },
    { width: "4 Feet Roll", gauges: "100G, 150G, 200G, 300G, 500G" },
    { width: "5 Feet Roll", gauges: "150G, 200G, 300G, 400G, 600G" },
    { width: "6 Feet Roll", gauges: "150G, 200G, 300G, 500G, 700G" },
    { width: "8 Feet Roll", gauges: "200G, 300G, 400G, 500G, 800G" },
    { width: "10 Feet Roll", gauges: "250G, 350G, 500G, 750G, Heavy 1000G" },
    { width: "12 Feet Roll", gauges: "300G, 500G, 750G, Pond Liner Grade" },
  ];

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="relative z-10 w-full max-w-2xl my-auto">
        
        {/* Cute White Frame Container */}
        <div className="bg-gradient-to-br from-orange-200 via-amber-100 to-orange-200 p-1.5 sm:p-2 rounded-[28px] shadow-2xl border-2 border-orange-300/80">
          <div className="bg-white rounded-[22px] p-4 sm:p-5 relative border border-orange-100/80 shadow-sm max-h-[85vh] flex flex-col">
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-100 hover:bg-rose-500 text-slate-500 hover:text-white flex items-center justify-center transition-all cursor-pointer z-20 border border-slate-200/80"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="text-center mb-3 pr-6 pl-2 shrink-0">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-[11px] font-bold tracking-wide mb-1">
                <Sparkles className="w-3 h-3 text-orange-500 animate-pulse" />
                <span>{lang === "hi" ? "पूरा साइज़ चार्ट" : "Complete Size Chart"}</span>
              </div>
              <h2
                className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight"
                style={{ fontFamily: "'Amaranth', sans-serif" }}
              >
                {lang === "hi" ? "उपलब्ध तिरपाल व प्लास्टिक साइज़ चार्ट" : "Available Tarpaulin & Plastic Size Chart"}
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                {lang === "hi" ? "अपनी आवश्यकता अनुसार साइज़ देखें और तुरंत व्हाट्सएप पर पूछें:" : "Browse standard sizes below or tap any size to inquire directly:"}
              </p>
            </div>

            {/* Tab Switcher */}
            <div className="flex bg-slate-100 p-1 rounded-xl mb-3 border border-slate-200 shrink-0">
              <button
                onClick={() => setActiveTab("tarpaulin")}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === "tarpaulin"
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                style={{ fontFamily: "'Amaranth', sans-serif" }}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>{lang === "hi" ? "तिरपाल (Ready Sizes)" : "Tarpaulin Sizes (Feet)"}</span>
              </button>
              <button
                onClick={() => setActiveTab("plastic")}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === "plastic"
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                style={{ fontFamily: "'Amaranth', sans-serif" }}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{lang === "hi" ? "प्लास्टिक रोल (Rolls & Gauges)" : "Plastic Roll Sizes & Gauges"}</span>
              </button>
            </div>

            {/* Scrollable Chart Content */}
            <div className="overflow-y-auto pr-1 space-y-3 flex-1 text-left custom-scrollbar">
              {activeTab === "tarpaulin" ? (
                <div className="space-y-2.5">
                  {tarpaulinCategories.map((cat, idx) => (
                    <div key={idx} className={`p-2.5 sm:p-3 rounded-xl border ${cat.color}`}>
                      <div className="flex items-center justify-between mb-2">
                        <h3
                          className="text-xs sm:text-sm font-bold tracking-wide"
                          style={{ fontFamily: "'Amaranth', sans-serif" }}
                        >
                          {lang === "hi" ? cat.titleHi : cat.titleEn}
                        </h3>
                        <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${cat.badgeColor}`}>
                          {cat.sizes.length} Sizes
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.sizes.map((sz, sIdx) => (
                          <button
                            key={sIdx}
                            onClick={() => {
                              if (onSelectSize) {
                                onSelectSize(sz);
                                onClose();
                              }
                            }}
                            className="bg-white hover:bg-orange-500 hover:text-white border border-slate-200/80 hover:border-orange-500 text-slate-800 text-[11px] sm:text-xs font-mono font-bold px-2.5 py-1 rounded-lg transition-all shadow-2xs hover:shadow-sm cursor-pointer flex items-center gap-1 group"
                          >
                            <span>{sz}</span>
                            <MessageSquare className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {plasticRolls.map((roll, rIdx) => (
                    <div
                      key={rIdx}
                      className="p-2.5 rounded-xl bg-orange-50/50 border border-orange-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs"
                    >
                      <span
                        className="font-black text-slate-900 flex items-center gap-1.5"
                        style={{ fontFamily: "'Amaranth', sans-serif" }}
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-orange-500" />
                        {roll.width}
                      </span>
                      <span className="text-[11px] font-mono text-slate-600 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                        Gauge: <span className="font-bold text-orange-700">{roll.gauges}</span>
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cute Footer */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium shrink-0">
              <span>💡 {lang === "hi" ? "किसी भी साइज़ पर क्लिक कर ऑर्डर जानकारी प्राप्त करें" : "Click any size to inquire on WhatsApp"}</span>
              <button
                onClick={onClose}
                className="px-3 py-1 bg-slate-900 text-white rounded-lg font-bold text-xs hover:bg-orange-600 transition-colors cursor-pointer"
              >
                {lang === "hi" ? "बंद करें" : "Close"}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
