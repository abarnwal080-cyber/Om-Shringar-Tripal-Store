import React from "react";
import { motion } from "motion/react";
import { FileDown, CheckCircle, ArrowRight, ShieldCheck, Tag, Layers, Settings, Image } from "lucide-react";

export default function ProductCatalogueCTA() {
  const catalogueUrl = "https://product-catalogue.edgeone.dev/";

  const features = [
    { text: "Product Images", desc: "High-definition catalog photos", icon: Image },
    { text: "Latest Prices", desc: "Wholesale & retail price list", icon: Tag },
    { text: "Sizes", desc: "All standard size configurations", icon: Layers },
    { text: "GSM Options", desc: "From light to heavy-duty GSM", icon: Settings },
    { text: "Available Brands", desc: "Certified brand partners", icon: ShieldCheck },
    { text: "Specifications", desc: "Tear strength, UV stabilization", icon: CheckCircle },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 mb-16 relative z-10">
      {/* Visual background glow */}
      <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-r from-orange-500 to-blue-600 opacity-10 blur-xl pointer-events-none" />

      <div className="relative bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-[28px] shadow-[0_24px_50px_-12px_rgba(11,45,92,0.08)] overflow-hidden">
        {/* Top/Right decorative color accents */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-orange-500/10 to-[#0B2D5C]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-gradient-to-tr from-blue-500/5 to-orange-500/5 rounded-full blur-2xl pointer-events-none" />

        <div className="p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Info details */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-[#0B2D5C]/5 border border-[#0B2D5C]/10 px-4 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#0B2D5C] animate-pulse" />
              <span className="text-xs font-black font-mono text-[#0B2D5C] uppercase tracking-wider">
                Digital Edition
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-[#0B2D5C] leading-tight tracking-tight">
              Looking for Complete <br />
              <span className="bg-gradient-to-r from-orange-600 to-[#0B2D5C] bg-clip-text text-transparent font-black">
                Product Details & Prices?
              </span>
            </h3>

            <p className="text-slate-600 text-sm sm:text-base font-semibold leading-relaxed">
              Download our latest catalogue to access the complete inventory details, wholesale prices, and customized ordering sheets. Includes:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {features.map((feat, i) => {
                const IconComp = feat.icon;
                return (
                  <div key={i} className="flex gap-3 items-start group">
                    <div className="p-2 rounded-lg bg-orange-50 border border-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-200">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-slate-800 font-bold text-sm leading-tight">{feat.text}</h4>
                      <p className="text-slate-400 text-xs mt-0.5 font-medium">{feat.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Graphic Card and Download Button */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            {/* Visual Catalogue Mockup card */}
            <motion.div
              whileHover={{ y: -5, rotate: 1 }}
              className="relative w-full max-w-[280px] aspect-[3/4] bg-gradient-to-br from-[#0B2D5C] via-[#0D3A75] to-[#061E40] rounded-[24px] p-6 text-white shadow-2xl flex flex-col justify-between border border-white/10 group cursor-pointer"
              onClick={() => window.open(catalogueUrl, "_blank")}
            >
              {/* Pattern overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-[size:16px_16px] rounded-[24px] pointer-events-none" />
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-orange-500/20 rounded-full blur-2xl group-hover:bg-orange-500/35 transition-all duration-300 pointer-events-none" />

              {/* Card top */}
              <div className="flex justify-between items-start relative z-10">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-black text-brand-orange border border-white/10">
                  OS
                </div>
                <div className="text-[10px] font-mono tracking-wider bg-orange-600/90 text-white font-extrabold px-2.5 py-1 rounded-full border border-orange-400/20">
                  NEW 2026-27
                </div>
              </div>

              {/* Card middle */}
              <div className="space-y-2 relative z-10 my-auto text-left">
                <p className="text-orange-400 font-mono text-[10px] uppercase font-bold tracking-widest">
                  Official Price Catalogue
                </p>
                <h4 className="text-xl font-black font-display tracking-tight leading-tight">
                  Om Shringar <br />
                  <span className="text-slate-300">Tirpal Store</span>
                </h4>
                <div className="h-[2px] w-12 bg-orange-500 rounded" />
                <p className="text-slate-300 text-xs font-semibold">
                  Waterproof Tarpaulins, Pond Liners & Heavy Curing Sheets
                </p>
              </div>

              {/* Card bottom */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5 relative z-10">
                <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">
                  PDF format
                </span>
                <span className="text-[11px] text-orange-400 font-bold flex items-center gap-1">
                  Download <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>

            {/* Premium Download CTA Button */}
            <motion.a
              href={catalogueUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 w-full max-w-[280px] flex items-center justify-center gap-2 px-6 py-4 bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-base rounded-full shadow-lg shadow-orange-500/35 transition-all duration-300 border border-orange-500/20 active:scale-95 group"
            >
              <FileDown className="w-5 h-5 text-white animate-bounce group-hover:scale-110 transition-transform" />
              <span>Download Catalogue</span>
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
}
