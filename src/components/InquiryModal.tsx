import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import InquiryForm from "./InquiryForm";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledProduct: string;
  onClearPrefill: () => void;
  currentLanguage?: "en" | "hi";
}

export default function InquiryModal({
  isOpen,
  onClose,
  prefilledProduct,
  onClearPrefill,
  currentLanguage = "en",
}: InquiryModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div id="full-screen-typeform-container" className="fixed inset-0 z-50 flex flex-col w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
          
          {/* Subtle Ambient Decorative Glows */}
          <div className="absolute top-1/4 left-1/4 w-[35rem] h-[35rem] rounded-full bg-orange-600/10 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />

          {/* Elegant Translucent Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white hover:scale-105 hover:rotate-90 transition-all duration-300 z-50 cursor-pointer flex items-center justify-center shadow-lg backdrop-blur-md"
            aria-label="Close Inquiry Overlay"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Full Height Form Container */}
          <div className="flex-grow flex flex-col h-full z-10">
            <InquiryForm
              prefilledProduct={prefilledProduct}
              onClearPrefill={onClearPrefill}
              currentLanguage={currentLanguage}
              onClose={onClose}
            />
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
