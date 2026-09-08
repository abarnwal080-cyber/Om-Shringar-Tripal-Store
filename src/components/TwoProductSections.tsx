import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Factory,
  ShoppingBag,
  Layers,
  ShieldCheck,
  Package,
  Truck,
  HardHat,
  Sparkles,
  Store,
  Gift,
  Tag,
  Search,
  CheckCircle2,
  PhoneCall,
  MessageSquare,
  ArrowUpRight
} from "lucide-react";
import { PRODUCTS, Product, BUSINESS_INFO } from "../data";
import ProductCard from "./ProductCard";

interface TwoProductSectionsProps {
  currentLanguage?: "en" | "hi";
  onEnquire: (productName: string, customContext?: string) => void;
  onViewDetails: (product: Product) => void;
  initialSection?: "all" | "polyware" | "general-store";
  isModalView?: boolean;
}

export default function TwoProductSections({
  currentLanguage = "en",
  onEnquire,
  onViewDetails,
  initialSection = "all",
  isModalView = false,
}: TwoProductSectionsProps) {
  const [activeDivision, setActiveDivision] = useState<"all" | "polyware" | "general-store">(initialSection);
  const [searchQuery, setSearchQuery] = useState("");

  const polywareProducts = useMemo(() => {
    return PRODUCTS.filter((p) => (p.division || "polyware") === "polyware");
  }, []);

  const generalStoreProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.division === "general-store");
  }, []);

  const filteredPolyware = useMemo(() => {
    if (!searchQuery.trim()) return polywareProducts;
    const q = searchQuery.toLowerCase();
    return polywareProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [polywareProducts, searchQuery]);

  const filteredGeneralStore = useMemo(() => {
    if (!searchQuery.trim()) return generalStoreProducts;
    const q = searchQuery.toLowerCase();
    return generalStoreProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [generalStoreProducts, searchQuery]);

  const polywarePills = [
    "Tarpaulin Sheets",
    "Plastic Sheets",
    "Polythene Rolls",
    "Stretch Films",
    "Fencing Nets",
    "Thermocol Sheets",
    "Plastic Mats",
    "Table Covers",
    "Plastic Ropes",
    "Packaging Materials",
  ];

  const generalStorePills = [
    "Cosmetics & Shringar",
    "Safari Backpacks",
    "Aristocrat Backpacks",
    "Kids School Bags",
    "Tour Backpacks",
    "Designer Handbags",
    "Leather Belts",
    "Genuine Belts",
    "Crystal Scenary",
    "Ropes (All Kinds)",
    "Pataka / Jhanda",
    "Toys",
    "Pure Cotton Gamcha",
  ];

  return (
    <div className="w-full flex flex-col space-y-12">
      {/* SECTION NAVIGATOR & SEARCH BAR */}
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4">
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-xl border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Division Switcher Buttons */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveDivision("all")}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-black transition-all duration-200 shrink-0 cursor-pointer flex items-center gap-2 ${
                activeDivision === "all"
                  ? "bg-[#0B2D5C] text-white shadow-lg shadow-blue-950/20 scale-[1.02]"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <span>All Products</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20">
                {PRODUCTS.length}
              </span>
            </button>

            <button
              onClick={() => setActiveDivision("polyware")}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-black transition-all duration-200 shrink-0 cursor-pointer flex items-center gap-2 border ${
                activeDivision === "polyware"
                  ? "bg-gradient-to-r from-[#0B2D5C] to-[#0E3D7D] text-white border-orange-500/50 shadow-lg shadow-blue-900/30 scale-[1.02]"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 border-transparent"
              }`}
            >
              <Factory className={`w-4 h-4 ${activeDivision === "polyware" ? "text-orange-400" : "text-blue-900"}`} />
              <span>Section 1: POLYWARE</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                activeDivision === "polyware" ? "bg-orange-500 text-white" : "bg-slate-200 text-slate-700"
              }`}>
                {polywareProducts.length}
              </span>
            </button>

            <button
              onClick={() => setActiveDivision("general-store")}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-black transition-all duration-200 shrink-0 cursor-pointer flex items-center gap-2 border ${
                activeDivision === "general-store"
                  ? "bg-gradient-to-r from-slate-900 to-indigo-950 text-white border-pink-400/50 shadow-lg shadow-slate-900/30 scale-[1.02]"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 border-transparent"
              }`}
            >
              <ShoppingBag className={`w-4 h-4 ${activeDivision === "general-store" ? "text-pink-400" : "text-indigo-900"}`} />
              <span>Section 2: GENERAL STORE</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                activeDivision === "general-store" ? "bg-pink-500 text-white" : "bg-slate-200 text-slate-700"
              }`}>
                {generalStoreProducts.length}
              </span>
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-80 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={currentLanguage === "hi" ? "उत्पाद या सामग्री खोजें..." : "Search products, sheets, bags..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs sm:text-sm rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: POLYWARE (INDUSTRIAL & AGRICULTURAL POLYMERS) */}
      {/* ========================================================================= */}
      {(activeDivision === "all" || activeDivision === "polyware") && (
        <section id="polyware-section" className="w-full max-w-7xl mx-auto px-2 sm:px-4">
          
          {/* Modern Industrial Header Banner: Blue, White, and Orange Theme */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#07172C] via-[#0B2D5C] to-[#0D3873] border border-orange-500/30 shadow-2xl p-6 sm:p-8 md:p-10 mb-8 text-white">
            {/* Subtle Blueprint & Mesh Background Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-50" />
            
            {/* Orange glowing flare */}
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-orange-600/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="max-w-3xl">
                
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500 text-white text-[10px] sm:text-xs font-black tracking-wider uppercase shadow-md">
                    <Factory className="w-3.5 h-3.5" />
                    <span>SECTION 1: INDUSTRIAL CATEGORY</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-orange-300 border border-white/15 text-[10px] sm:text-xs font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
                    <span>Heavy-Duty & Waterproof Grade</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-900/60 text-blue-200 border border-blue-400/20 text-[10px] sm:text-xs font-bold">
                    <Truck className="w-3.5 h-3.5 text-blue-300" />
                    <span>Wholesale & Ready Stock</span>
                  </span>
                </div>

                {/* Section Title */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white mb-3">
                  POLYWARE <span className="text-orange-400">POLYMER SOLUTIONS</span>
                </h2>

                {/* Subtitle Description */}
                <p className="text-slate-200 text-xs sm:text-base leading-relaxed font-medium mb-6">
                  {currentLanguage === "hi"
                    ? "वाटरप्रूफ तिरपाल, पीवीसी प्लास्टिक शीट्स, पॉलीथिन रोल्स, स्ट्रेच फिल्म, फेंसिंग नेट, थर्मोकोल शीट्स, प्लास्टिक चटाई, टेबल कवर, प्लास्टिक रस्सियां और पैकेजिंग सामग्री। सीधे गोदाम थोक भाव पर उपलब्ध।"
                    : "High-tensile industrial and agricultural polymer products engineered for severe weather, construction curing, bulk logistics, farm shielding, and packaging."}
                </p>

                {/* Polyware Featured Categories Pills */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  {polywarePills.map((pill) => (
                    <span
                      key={pill}
                      className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-white text-[11px] sm:text-xs font-semibold tracking-wide backdrop-blur-xs transition-colors flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-orange-400 shrink-0" />
                      <span>{pill}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Industrial Quick Stats & Actions */}
              <div className="w-full lg:w-auto shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3 bg-white/5 p-4 sm:p-5 rounded-2xl border border-white/10 backdrop-blur-md">
                <div className="text-left">
                  <div className="text-[11px] font-bold text-orange-300 uppercase tracking-wider">Direct Wholesale Hub</div>
                  <div className="text-xl sm:text-2xl font-black text-white font-mono">{polywareProducts.length} Industrial Lines</div>
                  <div className="text-xs text-slate-300">Custom GSM & Roll Widths</div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                  <a
                    href="tel:+918210625483"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs transition-all shadow-md active:scale-95"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Bulk Quote</span>
                  </a>
                  <button
                    onClick={() => onEnquire("Polyware Bulk Order", "Industrial Polymer Category")}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs transition-all border border-white/20 active:scale-95 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-orange-400" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Polyware Products Grid */}
          {filteredPolyware.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 text-slate-500">
              No Polyware products matching "{searchQuery}". Try searching for tarpaulin, sheet, roll, or net.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
              {filteredPolyware.map((product) => (
                <div key={product.id} className="h-full">
                  <ProductCard
                    product={product}
                    onEnquire={(pName) => onEnquire(pName, "Polyware Industrial")}
                    onViewDetails={onViewDetails}
                    currentLanguage={currentLanguage}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* DIVIDER BETWEEN SECTIONS (When viewing all) */}
      {activeDivision === "all" && (
        <div className="w-full max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent flex-grow" />
          <span className="text-xs font-black uppercase tracking-widest text-slate-400 bg-white px-4 py-1.5 rounded-full border border-slate-200 shadow-sm flex items-center gap-2">
            <span>Explored Polyware</span>
            <span className="text-slate-300">•</span>
            <span>Next: General Store</span>
          </span>
          <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent flex-grow" />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: GENERAL STORE (RETAIL & EVERYDAY ESSENTIALS) */}
      {/* ========================================================================= */}
      {(activeDivision === "all" || activeDivision === "general-store") && (
        <section id="general-store-section" className="w-full max-w-7xl mx-auto px-2 sm:px-4">
          
          {/* Retail Header Banner: Vibrant Retail Theme */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#111827] via-[#1E1B4B] to-[#311042] border border-indigo-500/30 shadow-2xl p-6 sm:p-8 md:p-10 mb-8 text-white">
            {/* Soft Ambient Radiance */}
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-pink-600/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="max-w-3xl">
                
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 text-white text-[10px] sm:text-xs font-black tracking-wider uppercase shadow-md">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>SECTION 2: RETAIL CATEGORY</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-pink-300 border border-white/15 text-[10px] sm:text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                    <span>Everyday Lifestyle & Gifting</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-900/60 text-indigo-200 border border-indigo-400/20 text-[10px] sm:text-xs font-bold">
                    <Store className="w-3.5 h-3.5 text-indigo-300" />
                    <span>Store Retail Counter</span>
                  </span>
                </div>

                {/* Section Title */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white mb-3">
                  GENERAL STORE <span className="text-pink-400">& LIFESTYLE</span>
                </h2>

                {/* Subtitle Description */}
                <p className="text-slate-200 text-xs sm:text-base leading-relaxed font-medium mb-6">
                  {currentLanguage === "hi"
                    ? "सफारी और अरिस्टोक्रेट बैग्स, स्कूल व टूर बैकपैक्स, महिलाओं के हैंडबैग, लेदर बेल्ट्स, क्रिस्टल सीनरी, कॉस्मेटिक्स श्रृंगार, बहुउद्देशीय रस्सियां, पताका/झंडा, खिलौने और देसी सूती गमछा।"
                    : "A vibrant retail showcase of branded college and laptop backpacks, handcrafted leather belts, premium daily cosmetics, spiritual 3D crystal art, festive flags, and traditional pure cotton handloom essentials."}
                </p>

                {/* General Store Featured Categories Pills */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  {generalStorePills.map((pill) => (
                    <span
                      key={pill}
                      className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-white text-[11px] sm:text-xs font-semibold tracking-wide backdrop-blur-xs transition-colors flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3 text-pink-400 shrink-0" />
                      <span>{pill}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Retail Counter Quick Stats & Actions */}
              <div className="w-full lg:w-auto shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3 bg-white/5 p-4 sm:p-5 rounded-2xl border border-white/10 backdrop-blur-md">
                <div className="text-left">
                  <div className="text-[11px] font-bold text-pink-300 uppercase tracking-wider">Retail & Household Hub</div>
                  <div className="text-xl sm:text-2xl font-black text-white font-mono">{generalStoreProducts.length} Retail Categories</div>
                  <div className="text-xs text-slate-300">Ready in Maharajganj Store</div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                  <a
                    href="tel:+918210625483"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-extrabold text-xs transition-all shadow-md active:scale-95"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Store Call</span>
                  </a>
                  <button
                    onClick={() => onEnquire("General Store Retail Order", "Retail & Lifestyle Category")}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs transition-all border border-white/20 active:scale-95 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-pink-400" />
                    <span>Inquire</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* General Store Products Grid */}
          {filteredGeneralStore.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 text-slate-500">
              No General Store products matching "{searchQuery}". Try searching for backpack, belt, cosmetic, or toy.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
              {filteredGeneralStore.map((product) => (
                <div key={product.id} className="h-full">
                  <ProductCard
                    product={product}
                    onEnquire={(pName) => onEnquire(pName, "General Store Retail")}
                    onViewDetails={onViewDetails}
                    currentLanguage={currentLanguage}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      )}

    </div>
  );
}
