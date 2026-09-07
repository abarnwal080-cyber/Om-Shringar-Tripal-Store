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
  "https://agent.jotform.com/01a07b6db33070008e585ce5bd33d1483b67";

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
      {/* =================================================================
          TOP HEADER BAR: Matching Om Shringar brand gradient
      ================================================================== */}
      <header
        className="w-full shrink-0 flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3 text-white shadow-md z-30"
        style={{
          background:
            "linear-gradient(135deg, #052d6e 0%, #087eef 60%, #16c9f2 100%)",
        }}
      >
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Bot Avatar */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-[16px] bg-white p-0.5 shadow-md flex items-center justify-center shrink-0">
            <img
              src={BOT_AVATAR}
              alt="Om Setu AI"
              className="w-full h-full rounded-[14px] object-cover bg-white"
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h1 className="font-extrabold text-sm sm:text-base tracking-tight leading-tight text-white flex items-center gap-1.5">
                <span>Om Setu AI</span>
                <span className="text-[9.5px] sm:text-[10px] uppercase font-bold tracking-wider bg-white/20 px-2 py-0.5 rounded-full text-white">
                  Assistant
                </span>
              </h1>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-sky-100 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#64ffae] shadow-xs animate-pulse"></span>
              <span>Online • Om Shringar Tirpal Store</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Open in New Window Link */}
          <a
            href={JOTFORM_AGENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Open in new window / tab"
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer text-xs font-bold flex items-center gap-1.5"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="hidden sm:inline">New Tab</span>
          </a>

          {/* Reload iframe */}
          <button
            onClick={handleRefresh}
            title="Reload Agent"
            className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer text-xs font-bold flex items-center gap-1"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden md:inline">Reload</span>
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            id="closeChatBtn"
            aria-label="Close Chat"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/15 hover:bg-white/25 text-white text-2xl font-light flex items-center justify-center transition-transform active:scale-95 cursor-pointer ml-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

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

      {/* =================================================================
          STORE HELPLINE FOOTER: DIRECT STORE CONTACT
      ================================================================== */}
      <footer className="w-full shrink-0 bg-white border-t border-[#e2edf8] px-3 sm:px-6 py-2 flex items-center justify-between text-xs z-30 shadow-xs">
        <div className="hidden sm:flex items-center gap-2 text-slate-600 font-medium">
          <span className="font-bold text-[#052d6e]">Om Shringar Tirpal Store</span>
          <span>•</span>
          <span>Meetha Hatti, Kazi Bazar, Maharajganj, Siwan</span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <span className="text-[11px] font-bold text-slate-500 sm:hidden">
            Proprietor: Vinod ji
          </span>
          <div className="flex items-center gap-2">
            <a
              href="tel:+918210625483"
              className="inline-flex items-center gap-1.5 text-[#06265d] hover:text-[#087cf0] font-extrabold bg-[#f0f6fc] hover:bg-[#e4effb] px-3 py-1.5 rounded-lg border border-[#d6e3f2] transition-colors text-xs"
            >
              <Phone className="w-3.5 h-3.5 text-orange-500" />
              <span>Call Store</span>
            </a>
            <a
              href="https://wa.me/918210625483?text=Namaste%20Vinod%20ji,%20Om%20Shringar%20Tirpal%20Store%20se%20tirpal%20ki%20inquiry%20karni%20hai."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-800 hover:text-emerald-900 font-extrabold bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200 transition-colors text-xs"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
