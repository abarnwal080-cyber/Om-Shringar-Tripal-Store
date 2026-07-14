import React, { useState, useEffect } from "react";
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

const successMessages = {
  en: {
    title: "Request Submitted Successfully",
    subtitle: "Thank you for contacting us!",
    text: "Your enquiry has been received successfully. Our team will review your request and contact you within 48 hours via phone, WhatsApp, or email.",
    footer: "We appreciate your interest in our products.",
    ok: "✓ OK",
    submitAnother: "Submit Another Enquiry"
  },
  hi: {
    title: "अनुरोध सफलतापूर्वक सबमिट किया गया",
    subtitle: "हमसे संपर्क करने के लिए धन्यवाद!",
    text: "आपकी पूछताछ सफलतापूर्वक प्राप्त हो गई है। हमारी टीम आपके अनुरोध की समीक्षा करेगी और 48 घंटों के भीतर फोन, व्हाट्सएप या ईमेल के माध्यम से आपसे संपर्क करेगी।",
    footer: "हम हमारे उत्पादों में आपकी रुचि की सराहना करते हैं।",
    ok: "✓ ठीक है",
    submitAnother: "दूसरी पूछताछ सबमिट करें"
  }
};

export default function InquiryModal({
  isOpen,
  onClose,
  prefilledProduct,
  onClearPrefill,
  currentLanguage = "en",
}: InquiryModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync state with localStorage whenever the modal is opened
  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(localStorage.getItem("enquiry_submitted") === "true");
    }
  }, [isOpen]);

  const msg = successMessages[currentLanguage] || successMessages.en;

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

          {/* Full Height Form Container / Success Card */}
          <div className="flex-grow flex flex-col h-full z-10 overflow-y-auto items-center justify-center px-4 py-8">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", damping: 25, stiffness: 350 }}
                className="bg-white max-w-lg w-full p-8 md:p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 text-center relative overflow-hidden"
              >
                {/* Elegant green gradient top bar */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-500 to-green-400" />
                
                {/* Green animated checkmark */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                  className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[inset_0_2px_4px_rgba(16,185,129,0.1)] border border-emerald-100"
                >
                  <motion.svg
                    className="w-10 h-10 text-emerald-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 }}
                      d="M5 13l4 4L19 7"
                    />
                  </motion.svg>
                </motion.div>

                {/* Card Content */}
                <h2 className="text-2xl font-black text-slate-800 tracking-tight mb-3">
                  {msg.title}
                </h2>
                
                <h3 className="text-lg font-extrabold text-emerald-600 mb-4">
                  {msg.subtitle}
                </h3>

                <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4 font-semibold">
                  {msg.text}
                </p>

                <p className="text-slate-500 text-xs md:text-sm italic mb-8 font-medium">
                  {msg.footer}
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 justify-center w-full">
                  <button
                    onClick={onClose}
                    className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm rounded-xl transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>{msg.ok}</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      localStorage.removeItem("enquiry_submitted");
                      setIsSubmitted(false);
                    }}
                    className="w-full sm:w-auto px-6 py-3.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-extrabold text-sm rounded-xl transition-all border border-emerald-100 active:scale-95 cursor-pointer flex items-center justify-center"
                  >
                    {msg.submitAnother}
                  </button>
                </div>
              </motion.div>
            ) : (
              <InquiryForm
                prefilledProduct={prefilledProduct}
                onClearPrefill={onClearPrefill}
                currentLanguage={currentLanguage}
                onClose={onClose}
                onSuccess={() => setIsSubmitted(true)}
              />
            )}
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
