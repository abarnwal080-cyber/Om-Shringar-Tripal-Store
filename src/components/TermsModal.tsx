import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShieldAlert, CheckCircle2, FileText } from "lucide-react";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  // Lock background scroll when modal is open
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.35, bounce: 0.1 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 my-8"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0B2D5C] to-[#123C73] px-6 py-5 text-white flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-400/30 flex items-center justify-center text-orange-400 shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-orange-400 block">
                    TERMS & CONDITIONS
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight leading-tight">
                    Website Content & Image Disclaimer
                  </h3>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Close Disclaimer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed max-h-[75vh] overflow-y-auto">
              <div className="flex items-start gap-3 bg-amber-50 border border-amber-200/70 p-4 rounded-2xl text-amber-900 text-xs sm:text-sm font-medium">
                <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Notice:</strong> Please review our official content, image, and operational disclaimer for Om Shringar Tirpal Store below.
                </p>
              </div>

              <div className="space-y-4 pt-1 text-slate-700">
                <p className="font-semibold text-slate-900">
                  Om Shringar Tirpal Store is a small independent business based in India.
                </p>

                <p className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-slate-600">
                  Some images, warehouse visuals, banners, product displays, and illustrations on this website are AI-generated, stock images, or used for design and demonstration purposes only. They are intended to improve the visual presentation of the website and may not represent our actual shop, warehouse, office, inventory, business size, or infrastructure.
                </p>

                <p>
                  Actual products, packaging, stock availability, and business operations may differ from the images shown.
                </p>

                <p className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-slate-600">
                  If you believe that any image or content on this website infringes your copyright or intellectual property rights, please contact us with proof of ownership. We will promptly review and, where appropriate, remove or replace the content.
                </p>

                <p className="text-xs sm:text-sm text-slate-500 font-medium pt-2 border-t border-slate-100">
                  All original website content, logo, branding, and design are the intellectual property of <strong>Om Shringar Tirpal Store</strong>. Unauthorized copying or reproduction is prohibited.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-500 font-mono">
                Om Shringar Tirpal Store © {new Date().getFullYear()}
              </span>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#0B2D5C] hover:bg-[#0D3A75] text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>I Understand & Agree</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
