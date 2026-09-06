import React, { useState } from "react";
import { motion } from "motion/react";
import {
  X,
  Sparkles,
  ShieldCheck,
  Layers,
  MessageCircle,
} from "lucide-react";
import { BUSINESS_INFO } from "../data";

export interface SizeChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: "en" | "hi";
  initialTab?: "plastic" | "tarpaulin";
  onSelectSize?: (size: string) => void;
}

// Clean Size Matrix Data - ONLY sizes and categories, no descriptive clutter
export const COMPACT_PLASTIC_MATRIX = [
  {
    width: "12 FT",
    badge: "Popular",
    sizes: ["12 × 0.5 ft", "12 × 1 ft", "12 × 2 ft", "12 × 3 ft", "12 × 5 ft", "12 × 10 ft"],
  },
  {
    width: "15 FT",
    badge: "Medium",
    sizes: ["15 × 0.5 ft", "15 × 1 ft", "15 × 2 ft", "15 × 3 ft", "15 × 5 ft", "15 × 10 ft"],
  },
  {
    width: "18 FT",
    badge: "Wide",
    sizes: ["18 × 0.5 ft", "18 × 1 ft", "18 × 2 ft", "18 × 3 ft", "18 × 5 ft"],
  },
  {
    width: "24 FT",
    badge: "Jumbo",
    sizes: ["24 × 0.5 ft", "24 × 1 ft", "24 × 2 ft", "24 × 3 ft", "24 × 5 ft"],
  },
  {
    width: "30 & 36 FT",
    badge: "Heavy",
    sizes: ["30 FT Roll", "36 FT Roll", "Custom Cut"],
  },
];

export const COMPACT_TARPAULIN_MATRIX = [
  {
    category: "Small & Domestic",
    gsm: "70–150 GSM",
    sizes: ["6 × 6 ft", "9 × 12 ft", "10 × 12 ft", "12 × 12 ft", "12 × 15 ft"],
  },
  {
    category: "Medium & Transport",
    gsm: "150–250 GSM",
    sizes: ["12 × 18 ft", "15 × 18 ft", "15 × 21 ft", "18 × 24 ft", "20 × 24 ft"],
  },
  {
    category: "Heavy Commercial",
    gsm: "250–450 GSM",
    sizes: ["20 × 30 ft", "24 × 30 ft", "24 × 36 ft", "30 × 30 ft", "30 × 36 ft"],
  },
  {
    category: "Industrial Jumbo",
    gsm: "350–750 GSM",
    sizes: ["36 × 40 ft", "40 × 40 ft", "40 × 60 ft", "40 × 80 ft", "100 × 50 ft", "100 × 100 ft"],
  },
];

export const PLASTIC_WIDTH_DATA = COMPACT_PLASTIC_MATRIX;
export const TARPAULIN_CATEGORIES_DATA = COMPACT_TARPAULIN_MATRIX;

export default function SizeChartModal({
  isOpen,
  onClose,
  initialTab = "plastic",
  onSelectSize,
}: SizeChartModalProps) {
  const [activeTab, setActiveTab] = useState<"plastic" | "tarpaulin">(initialTab);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Sync initial tab when opened externally
  React.useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setSelectedSize(null);
    }
  }, [isOpen, initialTab]);

  const handleSizeClick = (sz: string) => {
    setSelectedSize(sz);
    if (onSelectSize) {
      onSelectSize(sz);
    }
  };

  const getWhatsAppLink = (sz?: string) => {
    const targetSize = sz || selectedSize;
    if (targetSize) {
      const text = encodeURIComponent(
        `Hello Om Shringar Tirpal Store! I am inquiring about availability and wholesale rate for:\n📦 Size: *${targetSize}*\n🏷️ Category: ${activeTab === "plastic" ? "Plastic Sheets" : "Tarpaulins"}\n📍 Store: Maharajganj, Siwan, Bihar`
      );
      return `${BUSINESS_INFO.whatsappLink}?text=${text}`;
    }
    const text = encodeURIComponent(
      `Hello Om Shringar Tirpal Store! I want to check rates for ${activeTab === "plastic" ? "Plastic Sheets" : "Tarpaulins"} from your size matrix.`
    );
    return `${BUSINESS_INFO.whatsappLink}?text=${text}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/65 backdrop-blur-xs transition-opacity"
      />

      {/* CUTE COMPACT FRAME POPUP CONTAINER - Fits mobile viewport without scrolling */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 12 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 12 }}
        transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
        className="relative w-full max-w-3xl bg-white rounded-[20px] sm:rounded-[26px] shadow-[0_20px_50px_rgba(11,45,92,0.3)] border-2 sm:border-[3px] border-orange-300/80 overflow-hidden flex flex-col max-h-[94vh] z-10 my-auto"
      >
        {/* Cute Top Ribbon */}
        <div className="h-2 w-full bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600 shrink-0" />

        {/* Modal Header */}
        <div className="px-3.5 sm:px-6 pt-3 pb-2.5 bg-slate-50/80 border-b border-slate-100 flex items-start justify-between gap-3 shrink-0">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 text-[10px] font-extrabold uppercase tracking-wider mb-1 font-mono">
              <Sparkles className="w-3 h-3 text-orange-600" />
              <span>OFFICIAL SIZE SPECIFICATIONS</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg sm:text-2xl font-amaranth-bold text-[#0B2D5C] tracking-tight leading-tight">
                Complete Size Matrix
              </h2>
              <span className="text-[11px] font-sans font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-900">
                Direct Mill Cut
              </span>
            </div>
            
            <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-snug">
              Select your required size from Plastic Sheets or Tarpaulins to inquire rate on WhatsApp.
            </p>
          </div>

          {/* Cute Close Button */}
          <button
            onClick={onClose}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-all cursor-pointer shadow-xs shrink-0 active:scale-90"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* English-Only Tabs Switcher (No Search Bar) */}
        <div className="px-3.5 sm:px-6 py-2 bg-white border-b border-slate-100 shrink-0">
          <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200 w-full">
            <button
              onClick={() => {
                setActiveTab("plastic");
                setSelectedSize(null);
              }}
              className={`flex-1 py-1.5 sm:py-2 px-3 rounded-lg text-xs sm:text-sm font-amaranth-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === "plastic"
                  ? "bg-[#0B2D5C] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Plastic Sheets</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("tarpaulin");
                setSelectedSize(null);
              }}
              className={`flex-1 py-1.5 sm:py-2 px-3 rounded-lg text-xs sm:text-sm font-amaranth-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === "tarpaulin"
                  ? "bg-orange-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span>Tarpaulins</span>
            </button>
          </div>
        </div>

        {/* Modal Body - Pure Size Pills, NO extra descriptive text */}
        <div className="px-3 sm:px-6 py-2.5 sm:py-3.5 overflow-y-auto space-y-2 sm:space-y-2.5 flex-grow">
          {/* TAB 1: PLASTIC SHEETS */}
          {activeTab === "plastic" && (
            <div className="space-y-2 sm:space-y-2.5">
              {COMPACT_PLASTIC_MATRIX.map((row, idx) => (
                <div
                  key={idx}
                  className="p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-3 hover:border-orange-300 transition-colors"
                >
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] sm:text-xs font-black font-mono px-2 py-0.5 rounded bg-[#0B2D5C] text-white">
                      {row.width}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                      {row.badge}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {row.sizes.map((sz, sIdx) => {
                      const isSelected = selectedSize === sz;
                      return (
                        <button
                          key={sIdx}
                          onClick={() => handleSizeClick(sz)}
                          className={`px-2 sm:px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-mono font-bold transition-all cursor-pointer ${
                            isSelected
                              ? "bg-orange-600 text-white shadow-xs scale-105"
                              : "bg-white text-slate-700 border border-slate-200 hover:border-orange-500 hover:text-orange-600 active:scale-95"
                          }`}
                        >
                          {sz}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: TARPAULINS */}
          {activeTab === "tarpaulin" && (
            <div className="space-y-2 sm:space-y-2.5">
              {COMPACT_TARPAULIN_MATRIX.map((row, idx) => (
                <div
                  key={idx}
                  className="p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-3 hover:border-orange-300 transition-colors"
                >
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-amaranth-bold text-[#0B2D5C]">
                      {row.category}
                    </span>
                    <span className="text-[10px] font-bold text-orange-800 bg-orange-100 px-1.5 py-0.5 rounded-full font-mono">
                      {row.gsm}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {row.sizes.map((sz, sIdx) => {
                      const isSelected = selectedSize === sz;
                      return (
                        <button
                          key={sIdx}
                          onClick={() => handleSizeClick(sz)}
                          className={`px-2 sm:px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-mono font-bold transition-all cursor-pointer ${
                            isSelected
                              ? "bg-orange-600 text-white shadow-xs scale-105"
                              : "bg-white text-slate-700 border border-slate-200 hover:border-orange-500 hover:text-orange-600 active:scale-95"
                          }`}
                        >
                          {sz}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-3.5 sm:px-6 py-2.5 bg-slate-50/95 border-t border-slate-100 flex items-center justify-between gap-2 shrink-0">
          <div className="text-[11px] sm:text-xs text-slate-600 truncate">
            {selectedSize ? (
              <span>
                Selected: <strong className="text-orange-600 font-mono font-bold">{selectedSize}</strong>
              </span>
            ) : (
              <span className="hidden sm:inline">Tap any size above for instant rate quote</span>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0 ml-auto">
            <a
              href={getWhatsAppLink(selectedSize || undefined)}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-white text-xs font-black shadow-sm transition-all cursor-pointer active:scale-95 ${
                selectedSize
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-emerald-600/20"
                  : "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-orange-500/20"
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{selectedSize ? `Inquire ${selectedSize}` : "Inquire on WhatsApp"}</span>
            </a>

            <button
              onClick={onClose}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
