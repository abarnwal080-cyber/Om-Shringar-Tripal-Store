import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, FileDown, Loader2, FileText, AlertCircle, Sparkles } from "lucide-react";

interface CatalogueViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
}

export default function CatalogueViewerModal({ isOpen, onClose, onDownload }: CatalogueViewerModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [loadError, setLoadError] = useState(false);

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Mobi|Android|iPhone/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Reset loading and error states when opened
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setLoadError(false);
      // Safety timeout: if PDF loading takes too long (e.g. 4 seconds), show manual download option
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Prevent scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const pdfUrl = "https://drive.google.com/file/d/1HNNYZzIWEdItUHHAouTUxhvNj-qy-vJ0/preview";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] flex items-center justify-center p-0 md:p-4 bg-slate-950/80 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full h-full md:max-w-5xl md:h-[90vh] bg-slate-900 border border-slate-800 md:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Top Bar / Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-600/10 border border-orange-500/20 text-orange-500 rounded-lg">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black font-display text-white tracking-tight leading-none">
                    Product Catalogue 2026
                  </h3>
                  <p className="text-[10px] sm:text-xs text-slate-400 font-medium font-mono mt-0.5">
                    Om Shringar Tirpal Store • PDF Edition
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                {/* Download PDF button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onDownload}
                  className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-orange-600 to-amber-500 text-white font-extrabold text-xs sm:text-sm rounded-full shadow-lg shadow-orange-500/20 hover:from-orange-700 hover:to-amber-600 transition-all cursor-pointer"
                >
                  <FileDown className="w-4 h-4" />
                  <span className="hidden sm:inline">Download PDF</span>
                </motion.button>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="p-1.5 sm:p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-full transition-all border border-slate-700 cursor-pointer flex items-center justify-center active:scale-95"
                  aria-label="Close viewer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Viewer Stage */}
            <div className="flex-grow w-full relative bg-slate-950 overflow-hidden flex items-center justify-center p-4">
              {/* If Mobile, directly show the professional download fallback (mobile browsers block PDF iframe display) */}
              {isMobile ? (
                <div className="max-w-md w-full text-center p-6 sm:p-8 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-orange-500 to-amber-500" />
                  <div className="w-16 h-16 bg-orange-600/10 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-orange-500/20">
                    <FileText className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-black font-display text-white mb-2">
                    Mobile View Optimized
                  </h4>
                  <p className="text-slate-400 text-sm font-semibold leading-relaxed mb-6">
                    Mobile web browsers require downloading PDF documents to view them. Tap below to save the complete product catalogue with pricing & specifications instantly.
                  </p>
                  <button
                    onClick={onDownload}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-5 bg-gradient-to-r from-orange-600 to-amber-500 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-orange-500/30 cursor-pointer hover:from-orange-700 hover:to-amber-600 transition-colors uppercase tracking-wider text-center"
                  >
                    <FileDown className="w-5 h-5 text-white animate-bounce" />
                    <span>Download Complete PDF</span>
                  </button>
                </div>
              ) : (
                <>
                  {/* Iframe for Desktop PDF viewing */}
                  <iframe
                    src={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
                    className="w-full h-full border-0 rounded-xl relative z-10"
                    title="Product Catalogue Viewer"
                    onLoad={() => setIsLoading(false)}
                    onError={() => {
                      setIsLoading(false);
                      setLoadError(true);
                    }}
                  />

                  {/* Loading Overlay */}
                  {isLoading && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/90 gap-4">
                      <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
                      <p className="text-sm font-bold text-slate-300">Loading Product Catalogue...</p>
                    </div>
                  )}

                  {/* Error Fallback */}
                  {loadError && (
                    <div className="absolute inset-0 z-30 flex items-center justify-center bg-slate-950 p-4">
                      <div className="max-w-md w-full text-center p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl">
                        <AlertCircle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                        <h4 className="text-lg font-black font-display text-white mb-2">
                          Display Issue
                        </h4>
                        <p className="text-slate-400 text-sm font-semibold leading-relaxed mb-6">
                          Your web browser is unable to display the PDF inline. Click below to download the catalogue directly.
                        </p>
                        <button
                          onClick={onDownload}
                          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-orange-600 to-amber-500 text-white font-extrabold text-sm rounded-xl shadow-md cursor-pointer hover:from-orange-700 hover:to-amber-600 transition-colors"
                        >
                          <FileDown className="w-5 h-5" />
                          <span>Download PDF</span>
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Bottom Bar */}
            <div className="px-6 py-3.5 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <span className="text-[10px] text-slate-500 font-mono font-medium tracking-wider text-center sm:text-left">
                OM SHRINGAR TIRPAL STORE © 2026 • ALL RIGHTS RESERVED
              </span>
              <div className="flex items-center gap-1 text-xs font-bold text-orange-500">
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span>Premium HDPE Quality Guaranteed</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
