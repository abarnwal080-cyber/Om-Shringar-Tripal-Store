import React, { useState, useEffect, useRef } from "react";
import {
  ExternalLink,
  RefreshCw,
  Phone,
  MessageCircle,
  X,
  Sparkles,
} from "lucide-react";

interface GeminiChatbotSectionProps {
  isOpen: boolean;
  onClose: () => void;
}

const BOT_AVATAR =
  "https://plain-apac-prod-public.komododecks.com/202609/07/u9gkonoHbUx72eTNh7GG/image.png";

const JOTFORM_AGENT_URL =
  "https://cdn.botpress.cloud/webchat/v5.0/shareable.html?configUrl=https://files.bpcontent.cloud/2026/09/08/13/20260908135045-L8O814ZQ.json";

export default function GeminiChatbotSection({
  isOpen,
  onClose,
}: GeminiChatbotSectionProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeKey, setIframeKey] = useState(1);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // Lock body scroll when full-screen chat is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIframeLoaded(false);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleRefresh = () => {
    setIframeLoaded(false);
    setIframeKey((prev) => prev + 1);
  };

  if (!isOpen) return null;

  return (
    <div
      id="om-setu-jotform-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Om Setu AI Agent"
      className="fixed inset-0 z-[10000] w-full h-full bg-[#f6f9fd] flex flex-col antialiased overflow-hidden select-text animate-in fade-in duration-200"
    >
      {/* Floating Close Button */}
      <button
        onClick={onClose}
        id="closeChatBtn"
        aria-label="Close Chat"
        className="absolute top-4 right-4 z-[10010] w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-md text-slate-700 hover:bg-white hover:text-red-500 flex items-center justify-center transition-all cursor-pointer"
      >
        <X className="w-5 h-5" />
      </button>

      {/* =================================================================
          MAIN CONTENT: JOTFORM AGENT IFRAME WITH SEAMLESS LOADER
      ================================================================== */}
      <div className="flex-1 relative w-full h-full bg-[#f8fbfe] overflow-hidden flex flex-col">
        {/* Loading Spinner Screen while iframe loads */}
        {!iframeLoaded && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#f8fbfe] text-center p-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[22px] bg-white p-1 shadow-lg border border-sky-100 flex items-center justify-center mb-4 animate-pulse">
              <img
                src={BOT_AVATAR}
                alt="Om Setu"
                className="w-full h-full rounded-[18px] object-cover"
              />
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-[#052d6e] mb-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#087eef] animate-spin" />
              <span>Om Setu AI shuru ho raha hai...</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mb-4">
              Om Shringar Tirpal Store ke AI Agent interface ko load kiya ja raha hai. Kripya thoda intezar karein.
            </p>
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 bg-[#087eef] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-2.5 h-2.5 bg-[#087eef] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-2.5 h-2.5 bg-[#087eef] rounded-full animate-bounce"></span>
            </div>
          </div>
        )}

        {/* Embedded Jotform Agent */}
        <iframe
          key={iframeKey}
          ref={iframeRef}
          src={JOTFORM_AGENT_URL}
          title="Om Setu AI Agent - Om Shringar Tirpal Store"
          className="w-full flex-1 border-0 bg-white"
          allow="microphone; camera; clipboard-write; autoplay; fullscreen"
          onLoad={() => setIframeLoaded(true)}
        />
      </div>
    </div>
  );
}
