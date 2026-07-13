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
        <div
          id="full-screen-typeform-container"
          className="fixed inset-0 z-50 flex flex-col w-full h-full overflow-hidden"
          style={{
            background: `
              radial-gradient(circle at top left, rgba(255, 123, 184, 0.18), transparent 25%),
              radial-gradient(circle at top right, rgba(139, 92, 246, 0.16), transparent 26%),
              radial-gradient(circle at bottom left, rgba(52, 211, 153, 0.14), transparent 28%),
              linear-gradient(180deg, #fff7fb, #f4fbff)
            `
          }}
        >
          
          {/* Elegant Translucent Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-3 rounded-full bg-slate-900/10 hover:bg-slate-900/20 border border-slate-200/50 text-slate-700 hover:text-slate-900 hover:scale-105 hover:rotate-90 transition-all duration-300 z-50 cursor-pointer flex items-center justify-center shadow-lg backdrop-blur-md"
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
