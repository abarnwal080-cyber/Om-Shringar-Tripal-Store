import React, { useState } from "react";
import { AnimatePresence } from "motion/react";
import { Sparkles, Layers, ShieldCheck, Maximize2 } from "lucide-react";
import SizeChartModal, {
  PLASTIC_WIDTH_DATA,
  TARPAULIN_CATEGORIES_DATA
} from "./SizeChartModal";

interface SizeChartSectionProps {
  lang?: "en" | "hi";
  onSelectSize?: (size: string) => void;
  isModalOpen?: boolean;
  onOpenModal?: () => void;
  onCloseModal?: () => void;
}

export const SizeChartSection: React.FC<SizeChartSectionProps> = ({
  lang = "en",
  onSelectSize,
  isModalOpen: externalModalOpen,
  onOpenModal,
  onCloseModal
}) => {
  const [internalModalOpen, setInternalModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"plastic" | "tarpaulin">("plastic");

  const isModalOpen = externalModalOpen !== undefined ? externalModalOpen : internalModalOpen;

  const handleOpen = (tab?: "plastic" | "tarpaulin") => {
    if (tab) setActiveTab(tab);
    if (onOpenModal) {
      onOpenModal();
    } else {
      setInternalModalOpen(true);
    }
  };

  const handleClose = () => {
    if (onCloseModal) {
      onCloseModal();
    } else {
      setInternalModalOpen(false);
    }
  };

  return (
    <section id="size-matrix" className="py-12 sm:py-16 bg-gradient-to-b from-white via-[#fffaf5] to-white border-b border-slate-100 relative scroll-mt-24 overflow-hidden text-slate-900">
      {/* Decorative ambient background glows */}
      <div className="absolute w-72 h-72 rounded-full bg-orange-500/8 -top-24 -left-20 blur-3xl pointer-events-none" />
      <div className="absolute w-80 h-80 rounded-full bg-amber-500/8 -bottom-28 -right-24 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 text-orange-600 border border-orange-200/80 text-xs font-bold font-mono tracking-wider uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 text-orange-500" />
          <span>{lang === "en" ? "DIMENSION MATRIX & SPECIFICATIONS" : "साइज़ चार्ट एवं स्पेसिफिकेशन"}</span>
        </div>
        
        {/* Main Title Styled with Amarnath Bold Font */}
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-amaranth-bold text-[#0B2D5C] tracking-tight mb-6">
          {lang === "en" ? "Plastic Sheets & Tarpaulins Size Matrix" : "प्लास्टिक शीट्स एवं तिरपाल साइज़ चार्ट"}
        </h2>

        {/* Tab buttons right underneath the title that open the full chart popup */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-xl mx-auto">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100/90 border border-slate-200/90 shadow-inner w-full sm:w-auto">
            {/* Tab 1: Plastic Sheets */}
            <button
              onClick={() => handleOpen("plastic")}
              className="flex-1 sm:flex-initial py-3 px-5 sm:px-6 rounded-xl text-xs sm:text-sm font-amaranth-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer bg-white text-[#0B2D5C] hover:bg-[#0B2D5C] hover:text-white shadow-xs group active:scale-95"
              title="Open Plastic Sheets Size Chart"
            >
              <Layers className="w-4 h-4 text-amber-500 group-hover:text-amber-300 transition-colors" />
              <span>Plastic Sheets</span>
              <Maximize2 className="w-3.5 h-3.5 opacity-60 ml-0.5 text-slate-400 group-hover:text-white" />
            </button>

            {/* Tab 2: Tarpaulins */}
            <button
              onClick={() => handleOpen("tarpaulin")}
              className="flex-1 sm:flex-initial py-3 px-5 sm:px-6 rounded-xl text-xs sm:text-sm font-amaranth-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer bg-transparent text-slate-700 hover:bg-orange-600 hover:text-white transition-all group active:scale-95"
              title="Open Tarpaulins Size Chart"
            >
              <ShieldCheck className="w-4 h-4 text-orange-500 group-hover:text-amber-200 transition-colors" />
              <span>Tarpaulins</span>
              <Maximize2 className="w-3.5 h-3.5 opacity-60 ml-0.5 text-slate-400 group-hover:text-white" />
            </button>
          </div>

          <button
            onClick={() => handleOpen("plastic")}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-amaranth-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer shrink-0 active:scale-95"
          >
            <Maximize2 className="w-4 h-4" />
            <span>Open Full Size Chart</span>
          </button>
        </div>

      </div>

      {/* CUTE FRAME MODAL POP-UP (Single pop-up containing both Plastic Sheets and Tarpaulins) */}
      <AnimatePresence>
        {isModalOpen && (
          <SizeChartModal
            isOpen={isModalOpen}
            onClose={handleClose}
            lang={lang === "hi" ? "hi" : "en"}
            initialTab={activeTab}
            onSelectSize={onSelectSize}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export { PLASTIC_WIDTH_DATA, TARPAULIN_CATEGORIES_DATA };
export default SizeChartSection;
