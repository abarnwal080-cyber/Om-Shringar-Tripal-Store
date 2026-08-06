import React, { useState, useMemo, useEffect } from "react";
import { X, Calculator, Sparkles, MessageSquare } from "lucide-react";
import { BUSINESS_INFO } from "../data";

interface SizeCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: string;
  onInquire?: (productName: string, customContext: string) => void;
}

const SIZE_CHART: [number, number][] = [
  [6, 6], [8, 6], [8, 8], [8, 10], [10, 10], [10, 15], [12, 10], [12, 12], [12, 15], [12, 18],
  [15, 15], [15, 18], [15, 21], [18, 24], [20, 30], [24, 30], [24, 36], [30, 36], [36, 40], [40, 40],
  [30, 75], [40, 60], [36, 70], [40, 80], [100, 50], [100, 100]
];

const CONVERSION: Record<string, { factor: number; name: string; label: string }> = {
  ft: { factor: 1, name: "Ft", label: "📏 Ft (Feet)" },
  m: { factor: 3.2, name: "M", label: "📐 Meter (1m ≈ 3.2ft)" },
  haath: { factor: 1.5, name: "Haath", label: "✋ Haath (1 Haath = 1.5ft)" },
  gaj: { factor: 3, name: "Gaj", label: "📏 Gaj (1 Gaj = 3ft)" },
};

function findBestSize(lengthFt: number, widthFt: number): [number, number] | null {
  const userMax = Math.max(lengthFt, widthFt);
  const userMin = Math.min(lengthFt, widthFt);
  let best: [number, number] | null = null;
  let bestArea = Infinity;

  for (let [d1, d2] of SIZE_CHART) {
    const tMax = Math.max(d1, d2);
    const tMin = Math.min(d1, d2);
    if (tMax >= userMax && tMin >= userMin) {
      const area = tMax * tMin;
      if (area < bestArea) {
        bestArea = area;
        best = [d1, d2];
      } else if (area === bestArea && best) {
        const currWaste = (Math.max(...best) - userMax) + (Math.min(...best) - userMin);
        const newWaste = (tMax - userMax) + (tMin - userMin);
        if (newWaste < currWaste) best = [d1, d2];
      }
    }
  }
  return best;
}

export default function SizeCalculatorModal({ isOpen, onClose, lang = "en", onInquire }: SizeCalculatorModalProps) {
  const [unit, setUnit] = useState<string>("ft");
  const [length, setLength] = useState<string>("");
  const [width, setWidth] = useState<string>("");

  // Result popup state inside calculator
  const [popupActive, setPopupActive] = useState<boolean>(false);
  const [result, setResult] = useState<{
    bestSize: [number, number] | null;
    userLenFt: number;
    userWidFt: number;
    errorMsg?: string;
  } | null>(null);

  const isExactMatch = useMemo(() => {
    if (!result || !result.bestSize) return false;
    const [d1, d2] = result.bestSize;
    return (
      Math.max(d1, d2) === Math.max(result.userLenFt, result.userWidFt) &&
      Math.min(d1, d2) === Math.min(result.userLenFt, result.userWidFt)
    );
  }, [result]);

  const lenVal = parseFloat(length);
  const widVal = parseFloat(width);
  const hasValidInput = !isNaN(lenVal) && lenVal > 0 && !isNaN(widVal) && widVal > 0;

  const factor = CONVERSION[unit]?.factor || 1;
  const lenFt = hasValidInput ? lenVal * factor : 0;
  const widFt = hasValidInput ? widVal * factor : 0;

  const handleFindBest = () => {
    if (!hasValidInput) {
      setResult({
        bestSize: null,
        userLenFt: 0,
        userWidFt: 0,
        errorMsg: "कृपया सही लंबाई और चौड़ाई (धनात्मक संख्या) दर्ज करें।",
      });
      setPopupActive(true);
      return;
    }

    const best = findBestSize(lenFt, widFt);
    setResult({
      bestSize: best,
      userLenFt: lenFt,
      userWidFt: widFt,
    });
    setPopupActive(true);
  };

  // Lock body scroll when modal is open
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

  if (!isOpen) return null;

  const getWhatsAppOrderLink = () => {
    if (!result) return BUSINESS_INFO.whatsappLink;
    let text = "";
    if (result.bestSize) {
      text = `Hi! I used your Tarpaulin Size Calculator on your website. My required area is ${result.userLenFt.toFixed(1)} x ${result.userWidFt.toFixed(1)} ft. Recommended standard size: ${result.bestSize[0]} x ${result.bestSize[1]} ft. Please share the pricing!`;
    } else {
      text = `Hi! I need a custom tarpaulin size of ${result.userLenFt.toFixed(1)} x ${result.userWidFt.toFixed(1)} ft. Please share custom manufacturing details.`;
    }
    return `${BUSINESS_INFO.whatsappLink}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto animate-fade-in cursor-pointer"
      onClick={onClose}
    >
      {/* Cute Floating Decoration Backgrounds */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
        <span className="absolute top-[8%] left-[6%] text-3xl animate-bounce">⭐</span>
        <span className="absolute top-[15%] right-[8%] text-4xl animate-pulse">🌸</span>
        <span className="absolute bottom-[18%] left-[7%] text-3xl animate-bounce delay-300">💫</span>
        <span className="absolute bottom-[12%] right-[10%] text-4xl animate-pulse delay-500">✨</span>
      </div>

      {/* Main Container Card */}
      <div 
        className="relative z-10 w-full max-w-[520px] my-auto cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-br from-amber-100 via-orange-100 to-rose-100 p-2 sm:p-3 rounded-[38px] shadow-[0_25px_60px_rgba(0,0,0,0.3)] ring-8 ring-orange-200/60">
          <div className="bg-white rounded-[30px] p-6 sm:p-8 border-2 border-dashed border-orange-200 relative overflow-hidden max-h-[88vh] overflow-y-auto modal-scrollable-content overscroll-contain">
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-100 hover:bg-rose-500 hover:text-white text-slate-500 flex items-center justify-center transition-all cursor-pointer z-20 shadow-sm"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-6 relative z-10">
              <span className="text-5xl inline-block mb-2 animate-bounce">⛺</span>
              <h2 
                className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-orange-600 via-rose-600 to-amber-600 bg-clip-text text-transparent tracking-tight"
                style={{ fontFamily: "'Amaranth', sans-serif" }}
              >
                Tarpaulin Size Finder
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-1">
                अपनी ज़रूरत का बेस्ट साइज़ पाएँ • Best Size Calculator
              </p>
            </div>

            {/* Form Box */}
            <div className="space-y-4 relative z-10">
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                  📐 यूनिट चुनें / Select Unit
                </label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full py-3 px-4 border-2 border-slate-200 rounded-2xl font-bold text-slate-800 bg-slate-50/80 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all cursor-pointer text-sm"
                >
                  {Object.entries(CONVERSION).map(([key, val]) => (
                    <option key={key} value={key}>
                      {val.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                    📏 लंबाई / Length
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      placeholder="जैसे 10"
                      min="0.1"
                      step="any"
                      className="w-full py-3 pl-4 pr-10 border-2 border-slate-200 rounded-2xl font-bold text-slate-900 bg-slate-50/80 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all text-sm"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">↕️</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                    📐 चौड़ाई / Width
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      placeholder="जैसे 8"
                      min="0.1"
                      step="any"
                      className="w-full py-3 pl-4 pr-10 border-2 border-slate-200 rounded-2xl font-bold text-slate-900 bg-slate-50/80 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all text-sm"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">↔️</span>
                  </div>
                </div>
              </div>

              {/* Live Hint */}
              {hasValidInput && (
                <div className="text-center py-2 px-3 bg-orange-50 border border-orange-200 rounded-xl text-xs text-orange-800 font-semibold">
                  🔄 फ़ीट में: <span className="font-extrabold text-orange-900">{lenFt.toFixed(2)} × {widFt.toFixed(2)} ft</span> (≈ {(lenFt * widFt).toFixed(1)} sq ft)
                </div>
              )}

              {/* Find Button */}
              <button
                onClick={handleFindBest}
                className="w-full py-4 px-6 bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500 hover:from-orange-600 hover:to-rose-600 text-white font-black text-base sm:text-lg rounded-2xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
                style={{ fontFamily: "'Amaranth', sans-serif" }}
              >
                <span>🔍</span>
                <span>Best Size Find करें</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* POPUP RESULT MODAL */}
      {popupActive && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-[32px] p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl ring-8 ring-orange-100 border-2 border-orange-200 relative animate-scale-up">
            <button
              onClick={() => setPopupActive(false)}
              className="absolute top-3 right-4 text-2xl text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              &times;
            </button>

            {result?.errorMsg ? (
              <>
                <div className="text-4xl mb-2">⚠️</div>
                <div className="inline-block px-3 py-1 bg-amber-100 text-amber-900 rounded-full font-bold text-xs mb-3">
                  अरेरे! Attention
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">वैल्यू डालें</h3>
                <p className="text-xs text-slate-600 mb-5">{result.errorMsg}</p>
                <button
                  onClick={() => setPopupActive(false)}
                  className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-full shadow cursor-pointer"
                >
                  ठीक है ✅
                </button>
              </>
            ) : result?.bestSize ? (
              <>
                <div className="text-4xl mb-2">{isExactMatch ? "🎯" : "✨"}</div>
                <div
                  className={`inline-block px-4 py-1.5 rounded-full font-bold text-xs mb-3 ${
                    isExactMatch ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-900"
                  }`}
                >
                  {isExactMatch ? "Perfect Match!" : "Best Recommended Size"}
                </div>
                <div 
                  className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2 tracking-tight"
                  style={{ fontFamily: "'Amaranth', sans-serif" }}
                >
                  {result.bestSize[0]} <span className="text-rose-500">×</span> {result.bestSize[1]} ft
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  📐 आपकी ज़रूरत: <strong>{result.userLenFt.toFixed(2)} × {result.userWidFt.toFixed(2)} ft</strong> ({CONVERSION[unit]?.name})<br />
                  📦 एरिया: ≈{(result.userLenFt * result.userWidFt).toFixed(1)} sq ft → मानक साइज: {result.bestSize[0] * result.bestSize[1]} sq ft
                </p>

                <div className="space-y-2.5">
                  <button
                    onClick={() => {
                      if (onInquire && result?.bestSize) {
                        onClose();
                        onInquire("", `Required Tarpaulin Size: ${result.bestSize[0]} x ${result.bestSize[1]} ft (Calculated Need: ${result.userLenFt.toFixed(1)} x ${result.userWidFt.toFixed(1)} ft)`);
                      } else {
                        window.open(getWhatsAppOrderLink(), "_blank", "noopener,noreferrer");
                      }
                    }}
                    className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold text-xs sm:text-sm rounded-full shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>व्हाट्सएप पर यह साइज़ ऑर्डर करें</span>
                  </button>
                  <button
                    onClick={() => setPopupActive(false)}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-full cursor-pointer"
                  >
                    ठीक है ✅
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="text-4xl mb-2">🔧</div>
                <div className="inline-block px-3 py-1 bg-rose-100 text-rose-800 rounded-full font-bold text-xs mb-3">
                  Customization Required
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">कोई स्टैंडर्ड साइज़ नहीं</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  आपकी ज़रूरत: <strong>{result?.userLenFt.toFixed(2)} × {result?.userWidFt.toFixed(2)} ft</strong><br />
                  मानक साइज़ 100×100 ft तक उपलब्ध हैं। कृपया कस्टम तिरपाल हेतु संपर्क करें!
                </p>
                <div className="space-y-2.5">
                  <button
                    onClick={() => {
                      if (onInquire && result) {
                        onClose();
                        onInquire("", `Custom Tarpaulin Size Needed: ${result.userLenFt.toFixed(1)} x ${result.userWidFt.toFixed(1)} ft`);
                      } else {
                        window.open(getWhatsAppOrderLink(), "_blank", "noopener,noreferrer");
                      }
                    }}
                    className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold text-xs sm:text-sm rounded-full shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>कस्टम साइज़ ऑर्डर करें (WhatsApp)</span>
                  </button>
                  <button
                    onClick={() => setPopupActive(false)}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-full cursor-pointer"
                  >
                    ठीक है ✅
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
