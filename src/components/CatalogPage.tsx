import React, { useState, useMemo, useEffect } from "react";
import {
  ArrowLeft,
  Factory,
  ShoppingBag,
  PhoneCall,
  MessageSquare
} from "lucide-react";
import { PRODUCTS, Product } from "../data";
import ProductCard from "./ProductCard";

interface CatalogPageProps {
  initialDivision?: "all" | "polyware" | "general-store";
  currentLanguage?: "en" | "hi";
  onBack: () => void;
  onEnquire: (productName: string, customContext?: string) => void;
  onViewDetails: (product: Product) => void;
}

export default function CatalogPage({
  initialDivision = "all",
  currentLanguage = "en",
  onBack,
  onEnquire,
  onViewDetails,
}: CatalogPageProps) {
  const [activeDivision, setActiveDivision] = useState<"all" | "polyware" | "general-store">(initialDivision);

  // Sync initialDivision if changed externally
  useEffect(() => {
    setActiveDivision(initialDivision);
  }, [initialDivision]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeDivision]);

  const polywareProducts = useMemo(() => {
    return PRODUCTS.filter((p) => (p.division || "polyware") === "polyware");
  }, []);

  const generalStoreProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.division === "general-store");
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col relative pb-24">
      {/* Top Sticky Page Navigation Header */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          
          {/* Back to Home Button */}
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-extrabold transition-all cursor-pointer active:scale-95 border border-slate-200"
            aria-label="Back to Home"
          >
            <ArrowLeft className="w-4 h-4 text-orange-600" />
            <span className="hidden sm:inline">
              {currentLanguage === "hi" ? "मुख्य पृष्ठ पर वापस" : "Back to Home"}
            </span>
            <span className="sm:hidden">
              {currentLanguage === "hi" ? "वापस" : "Back"}
            </span>
          </button>

          {/* Page Center Title */}
          <div className="flex flex-col text-center">
            <h1 className="text-sm sm:text-lg font-black text-slate-900 tracking-tight font-display uppercase">
              {activeDivision === "polyware"
                ? "Section 1: Polyware Industrial"
                : activeDivision === "general-store"
                ? "Section 2: General Store & Retail"
                : "Complete Products Catalog"}
            </h1>
            <span className="text-[10px] sm:text-xs text-orange-600 font-bold">
              Om Shringar Tirpal Store • Maharajganj
            </span>
          </div>

          {/* Quick Direct Call Button */}
          <a
            href="tel:+918210625483"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#0B2D5C] to-blue-900 hover:from-blue-950 hover:to-[#0B2D5C] text-white text-xs sm:text-sm font-extrabold transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5 text-orange-400" />
            <span className="hidden sm:inline">Bulk Call</span>
          </a>
        </div>
      </div>

      {/* Main Page Content */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 flex flex-col space-y-10">

        {/* SECTION 1: POLYWARE INDUSTRIAL */}
        {(activeDivision === "all" || activeDivision === "polyware") && (
          <section id="polyware-section" className="w-full flex flex-col space-y-6">
            
            {/* Clean, Elegant Section Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3.5">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-900/10 text-[#0B2D5C] flex items-center justify-center">
                  <Factory className="w-5 h-5 text-orange-600" />
                </span>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display tracking-tight">
                    POLYWARE <span className="text-orange-600">INDUSTRIAL</span>
                  </h2>
                  <span className="text-xs text-slate-500 font-medium">
                    {polywareProducts.length} Industrial Lines • Direct Factory Rates
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onEnquire("Polyware Bulk Order", "Polyware Category")}
                  className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold transition-all cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>
                <a
                  href="tel:+918210625483"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition-all shadow-xs"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Bulk Call</span>
                </a>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
              {polywareProducts.map((product) => (
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
          </section>
        )}

        {/* Divider if showing All */}
        {activeDivision === "all" && (
          <div className="w-full py-4 flex items-center gap-4">
            <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent flex-grow" />
            <span className="text-xs font-black uppercase tracking-widest text-slate-400 bg-white px-4 py-1.5 rounded-full border border-slate-200 shadow-xs">
              Section 2: General Store & Retail Below
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent flex-grow" />
          </div>
        )}

        {/* SECTION 2: GENERAL STORE & RETAIL */}
        {(activeDivision === "all" || activeDivision === "general-store") && (
          <section id="general-store-section" className="w-full flex flex-col space-y-6">
            
            {/* Clean, Elegant Section Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3.5">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-pink-900/10 text-[#831843] flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-pink-600" />
                </span>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display tracking-tight">
                    GENERAL STORE <span className="text-pink-600">& RETAIL</span>
                  </h2>
                  <span className="text-xs text-slate-500 font-medium">
                    {generalStoreProducts.length} Retail Categories • Ready Stock at Maharajganj
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onEnquire("General Store Order", "Retail Category")}
                  className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-pink-50 text-pink-700 hover:bg-pink-100 border border-pink-200 text-xs font-bold transition-all cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Inquire</span>
                </button>
                <a
                  href="tel:+918210625483"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold transition-all shadow-xs"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Store Call</span>
                </a>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
              {generalStoreProducts.map((product) => (
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
          </section>
        )}

      </main>
    </div>
  );
}
