import React, { useEffect, useRef, useState } from "react";
import { Loader2, Sparkles } from "lucide-react";

interface InquiryFormProps {
  prefilledProduct?: string;
  onClearPrefill?: () => void;
  currentLanguage?: "en" | "hi";
  onClose?: () => void;
}

export default function InquiryForm({
  currentLanguage = "en",
}: InquiryFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reset state
    setIsLoading(true);

    // Ensure container is empty
    if (containerRef.current) {
      containerRef.current.innerHTML = "";
    }

    // Create Spiceform container div
    const sfDiv = document.createElement("div");
    sfDiv.setAttribute("data-sf-live", "ae995f83-2ef6-4948-9b30-2d9be689e8f7");
    sfDiv.setAttribute("data-sf-mode", "embed");

    // Create Spiceform script element
    const script = document.createElement("script");
    script.src = "https://www.spiceform.com/embed.js";
    script.type = "text/javascript";
    script.async = true;

    // Set onload handler to turn off spinner
    script.onload = () => {
      setIsLoading(false);
    };

    // Fallback: If script takes too long, hide loading indicator anyway after 3 seconds
    const fallbackTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Append elements to container
    if (containerRef.current) {
      containerRef.current.appendChild(sfDiv);
      containerRef.current.appendChild(script);
    }

    return () => {
      clearTimeout(fallbackTimer);
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-start overflow-y-auto py-10 px-4 md:px-8 bg-transparent">
      <div className="w-full max-w-4xl mx-auto space-y-6 flex flex-col items-center relative">
        
        {/* Elegant Minimal Header */}
        <div className="text-center space-y-2 mb-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-bold font-mono uppercase tracking-widest rounded-full">
            <Sparkles className="w-3 h-3 animate-pulse" />
            <span>
              {currentLanguage === "hi" ? "त्वरित कोट सहायक" : "Instant Quote Assistant"}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white">
            {currentLanguage === "hi" 
              ? "थोक पूछताछ प्रपत्र" 
              : "Wholesale Inquiry Form"}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto">
            {currentLanguage === "hi"
              ? "कृपया नीचे दिए गए प्रपत्र को भरें, हम जल्द ही आपसे संपर्क करेंगे।"
              : "Please complete the secure form below. Our wholesale desk will contact you shortly."}
          </p>
        </div>

        {/* Form Outer Container */}
        <div className="w-full min-h-[600px] bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md p-2 sm:p-6 shadow-2xl relative overflow-hidden flex flex-col justify-center">
          
          {/* Spinner Loader when initializing script */}
          {isLoading && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950/40 backdrop-blur-sm text-center p-6">
              <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
              <p className="text-slate-300 text-xs font-mono font-bold mt-4 tracking-wider uppercase">
                Loading Secure Quotation Form...
              </p>
            </div>
          )}

          {/* Target container for script injection */}
          <div 
            ref={containerRef} 
            className="w-full h-full transition-opacity duration-300 [&_iframe]:!max-w-full [&_iframe]:!w-full [&_iframe]:!mx-auto" 
            style={{ opacity: isLoading ? 0.3 : 1 }}
          />
        </div>

        {/* Secure Encryption Footer */}
        <div className="text-[10px] sm:text-xs text-slate-500 font-mono flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>SSL 256-bit Encrypted Connection</span>
        </div>
      </div>
    </div>
  );
}
