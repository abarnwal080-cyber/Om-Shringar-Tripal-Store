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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-100"
          >
            {/* Elegant Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors z-20 cursor-pointer"
              aria-label="Close Inquiry Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Inner padding for InquiryForm */}
            <div className="p-4 sm:p-6 bg-slate-50/30">
              <InquiryForm
                prefilledProduct={prefilledProduct}
                onClearPrefill={onClearPrefill}
                currentLanguage={currentLanguage}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
