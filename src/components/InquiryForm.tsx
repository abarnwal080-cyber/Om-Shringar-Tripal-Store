import React, { useState, useEffect, useRef } from "react";
import { Loader2, Sparkles, MessageSquare } from "lucide-react";
import { TRANSLATIONS } from "../translations";

interface InquiryFormProps {
  prefilledProduct?: string;
  onClearPrefill?: () => void;
  currentLanguage?: "en" | "hi";
}

export default function InquiryForm({ prefilledProduct = "", onClearPrefill = () => {}, currentLanguage = "en" }: InquiryFormProps) {
  const t = TRANSLATIONS[currentLanguage];
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clear any previous script elements to avoid duplicates on rerenders
    containerRef.current.innerHTML = "";
    setIsLoading(true);

    const script = document.createElement("script");
    script.src = "https://form.jotform.com/jsform/261895002819058";
    script.type = "text/javascript";
    script.async = true;
    
    script.onload = () => {
      setIsLoading(false);
    };

    // Fallback for loader
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    containerRef.current.appendChild(script);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div id="premium-enquiry-system" className="w-full space-y-5">
      {/* Form Header */}
      <div className="text-center pb-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 text-[10px] font-bold font-mono uppercase tracking-wider rounded-full border border-orange-100 dark:border-orange-900/30">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          {t.formBadge || "OFFICIAL QUOTE REQUEST"}
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-2 tracking-tight">
          {t.formTitle || "Request Wholesale / Retail Price Quote"}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1 max-w-lg mx-auto">
          {currentLanguage === "en" 
            ? "Submit your detailed specifications via our official form below. Our team will review and contact you." 
            : "नीचे दिए गए आधिकारिक फॉर्म के माध्यम से अपनी विस्तृत आवश्यकताएं दर्ज करें। हमारी टीम जल्द ही आपसे संपर्क करेगी।"}
        </p>
      </div>

      {/* Jotform Embed Container */}
      <div className="w-full relative">
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16 space-y-3">
            <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
            <p className="text-xs font-semibold text-slate-500 animate-pulse">
              {currentLanguage === "en" ? "Loading Secure Form..." : "सुरक्षित फॉर्म लोड हो रहा है..."}
            </p>
          </div>
        )}
        
        <div 
          ref={containerRef} 
          className="w-full bg-white dark:bg-slate-900 rounded-2xl p-1 overflow-x-hidden min-h-[550px] shadow-sm border border-slate-100 dark:border-slate-800/40" 
        />
      </div>

      {/* Helpful Info footer */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/30 rounded-2xl text-center">
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
          {currentLanguage === "en" 
            ? "🔒 Safe & Secure JotForm Submission with SSL encryption." 
            : "🔒 एसएसएल एन्क्रिप्शन के साथ सुरक्षित जॉटफॉर्म सबमिशन।"}
        </p>
      </div>
    </div>
  );
}
