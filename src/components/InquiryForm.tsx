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
  const [isLoading, setIsLoading] = useState(true);

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
      <div className="w-full relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800/40 min-h-[650px]">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white dark:bg-slate-900 z-10 space-y-3">
            <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
            <p className="text-xs font-semibold text-slate-500 animate-pulse">
              {currentLanguage === "en" ? "Loading Secure Form..." : "सुरक्षित फॉर्म लोड हो रहा है..."}
            </p>
          </div>
        )}
        
        <iframe
          src="https://form.jotform.com/261895002819058"
          title="Om Shringar Tirpal Store Enquiry Form"
          className="w-full h-[650px] border-0"
          onLoad={() => setIsLoading(false)}
          allow="geolocation; microphone; camera"
          sandbox="allow-top-navigation-by-user-activation allow-forms allow-scripts allow-same-origin allow-popups"
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
