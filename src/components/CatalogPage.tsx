import React, { useState, useMemo, useEffect } from "react";
import {
  ArrowLeft,
  ShieldCheck,
  Layers,
  Grid,
  PhoneCall,
  MessageSquare,
  Sparkles,
  ShoppingBag
} from "lucide-react";
import { PRODUCTS, Product } from "../data";
import ProductCard from "./ProductCard";

export type CategoryKey = "all" | "tarpaulins" | "polythene-sheets" | "others";

export interface CatalogPageProps {
  initialCategory?: string | null;
  initialDivision?: string | null;
  currentLanguage?: "en" | "hi";
  onBack: () => void;
  onEnquire: (productName?: string, customContext?: string) => void;
  onViewDetails: (product: Product) => void;
}

export default function CatalogPage({
  initialCategory,
  initialDivision,
  currentLanguage = "en",
  onBack,
  onEnquire,
  onViewDetails,
}: CatalogPageProps) {
  const resolveInitial = (): CategoryKey => {
    const raw = (initialCategory || initialDivision || "all").toLowerCase();
    if (raw === "tarpaulin" || raw === "tarpaulins") return "tarpaulins";
    if (raw === "polythene" || raw === "polythene-sheets" || raw === "plastic-sheets" || raw === "polyware") return "polythene-sheets";
    if (raw === "others" || raw === "other" || raw === "general-store") return "others";
    return "all";
  };

  const [activeCategory, setActiveCategory] = useState<CategoryKey>(resolveInitial);

  useEffect(() => {
    setActiveCategory(resolveInitial());
  }, [initialCategory, initialDivision]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeCategory]);

  const tarpaulinProducts = useMemo(() => {
    const order = ["shalimar-premium", "kangaroo-tarpaulin", "silpaulin-original", "great-paulin", "gold-paulin"];
    return order
      .map((id) => PRODUCTS.find((p) => p.id === id))
      .filter((p): p is Product => Boolean(p));
  }, []);

  const polytheneSheetProducts = useMemo(() => {
    const order = ["black-polythene", "transparent-shisha", "capstone-cheetah", "blue-polythene", "stretch-film"];
    return order
      .map((id) => PRODUCTS.find((p) => p.id === id))
      .filter((p): p is Product => Boolean(p));
  }, []);

  const otherProducts = useMemo(() => {
    const ids = ["fencing-net", "fencing-net-jali", "plastic-mat-chatai", "waterproof-table-cover", "ropes-all-kinds"];
    return ids
      .map((id) => PRODUCTS.find((p) => p.id === id))
      .filter((p): p is Product => Boolean(p));
  }, []);

  const displayedProducts = useMemo(() => {
    if (activeCategory === "tarpaulins") return tarpaulinProducts;
    if (activeCategory === "polythene-sheets") return polytheneSheetProducts;
    if (activeCategory === "others") return otherProducts;
    return [...tarpaulinProducts, ...polytheneSheetProducts, ...otherProducts];
  }, [activeCategory, tarpaulinProducts, polytheneSheetProducts, otherProducts]);

  const categoryTitles: Record<CategoryKey, { en: string; hi: string; subtitle: string; icon: React.ReactNode }> = {
    tarpaulins: {
      en: "Tarpaulins",
      hi: "तिरपाल (Tarpaulins)",
      subtitle: "Heavy-duty waterproof HDPE & multi-layer branded tarpaulins",
      icon: <ShieldCheck className="w-5 h-5 text-orange-600" />,
    },
    "polythene-sheets": {
      en: "Polythene Sheets",
      hi: "प्लास्टिक शीट्स (Polythene Sheets)",
      subtitle: "Construction curing, transparent shisha, cheetah & stretch rolls",
      icon: <Layers className="w-5 h-5 text-blue-600" />,
    },
    others: {
      en: "Others",
      hi: "अन्य उत्पाद (Others)",
      subtitle: "Agricultural nets, boundary jali, plastic mats & high-tensile ropes",
      icon: <Grid className="w-5 h-5 text-emerald-600" />,
    },
    all: {
      en: "All Products",
      hi: "सभी उत्पाद (All Products)",
      subtitle: "Complete wholesale & retail inventory of Om Shringar Tirpal Store",
      icon: <ShoppingBag className="w-5 h-5 text-orange-600" />,
    },
  };

  const currentMeta = categoryTitles[activeCategory];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col relative pb-24">
      {/* Top Sticky Page Navigation Header */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Back to Home Button */}
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-extrabold transition-all cursor-pointer active:scale-95 border border-slate-200"
            aria-label="Back to Home"
          >
            <ArrowLeft className="w-4 h-4 text-orange-600 shrink-0" />
            <span className="hidden sm:inline">
              {currentLanguage === "hi" ? "होम पेज" : "Back to Home"}
            </span>
            <span className="sm:hidden">
              {currentLanguage === "hi" ? "वापस" : "Back"}
            </span>
          </button>

          {/* Current Category Title in Bar */}
          <div className="flex flex-col text-center truncate">
            <h1 className="text-xs sm:text-base font-black text-slate-900 tracking-tight font-display truncate">
              {currentLanguage === "hi" ? currentMeta.hi : currentMeta.en}
            </h1>
            <span className="text-[10px] sm:text-xs text-orange-600 font-bold hidden xs:inline">
              Om Shringar Tirpal Store
            </span>
          </div>

          {/* Quick Direct Call & WhatsApp Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <a
              href="https://wa.me/918210625483?text=Namaste%20Om%20Shringar%20Tirpal%20Store%2C%20I%20want%20to%20inquire%20about%20your%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-extrabold transition-all shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden md:inline">WhatsApp</span>
            </a>
            <a
              href="tel:+918210625483"
              className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-[#0B2D5C] hover:bg-blue-900 text-white text-xs font-extrabold transition-all shadow-xs"
            >
              <PhoneCall className="w-3.5 h-3.5 text-orange-400" />
              <span className="hidden sm:inline">Call Now</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Page Content */}
      <main className="max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6 flex flex-col space-y-6">

        {/* Category Switcher Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {(["tarpaulins", "polythene-sheets", "others", "all"] as CategoryKey[]).map((catKey) => {
            const isSelected = activeCategory === catKey;
            const item = categoryTitles[catKey];
            return (
              <button
                key={catKey}
                onClick={() => {
                  setActiveCategory(catKey);
                  const path = catKey === "all" ? "/catalog" : `/${catKey}`;
                  window.history.pushState({}, "", path);
                }}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-[#0B2D5C] text-white border-[#0B2D5C] shadow-sm"
                    : "bg-white text-slate-700 hover:bg-slate-100 border-slate-200"
                }`}
              >
                <span className={isSelected ? "text-orange-400" : "text-slate-400"}>
                  {item.icon}
                </span>
                <span>{currentLanguage === "hi" ? item.hi : item.en}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Header Banner */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-4 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-200/70 text-orange-700 text-[11px] font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>{displayedProducts.length} Products in Stock</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display tracking-tight">
              {currentLanguage === "hi" ? currentMeta.hi : currentMeta.en}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {currentMeta.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onEnquire(currentMeta.en, "Category Page")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Inquire Price</span>
            </button>
          </div>
        </div>

        {/* Products Grid: Exactly 2 horizontally in mobile in each line */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
          {displayedProducts.map((product) => (
            <div key={product.id} className="h-full">
              <ProductCard
                product={product}
                onEnquire={(pName) => onEnquire(pName, currentMeta.en)}
                onViewDetails={onViewDetails}
                currentLanguage={currentLanguage}
              />
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}
