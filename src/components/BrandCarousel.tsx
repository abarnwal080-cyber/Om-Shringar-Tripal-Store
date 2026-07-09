import { motion } from "motion/react";
import { BRAND_PARTNERS } from "../data";

export default function BrandCarousel() {
  return (
    <div className="w-full bg-slate-50 border-y border-slate-100 py-8 md:py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-6 md:mb-10">
          <p className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest">
            Authorized Distributor & Trading Partner
          </p>
          <h4 className="text-lg md:text-xl font-bold font-display text-brand-blue-dark">
            Supplying India's Leading Tarpaulin & Polymer Brands
          </h4>
        </div>

        {/* Brand Grid for pristine clarity, responsive spacing, and clickability */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 items-center justify-items-center">
          {BRAND_PARTNERS.map((brand, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -5, scale: 1.03 }}
              className="w-full h-28 bg-white rounded-2xl p-3 flex items-center justify-center border border-slate-100/80 shadow-sm hover:shadow-md transition-all duration-300 relative group overflow-hidden"
            >
              {/* Subtle orange accent bar on hover */}
              <div className="absolute top-0 inset-x-0 h-1 bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              
              <img
                src={brand.logo}
                alt={`${brand.name} official logo`}
                loading="lazy"
                referrerPolicy="no-referrer"
                className={`max-w-full object-contain filter contrast-125 hover:brightness-105 transition-all duration-300 ${
                  brand.name === "Capstone Cheetah"
                    ? "max-h-28 scale-[2.1] object-cover rounded-xl"
                    : "max-h-18"
                }`}
              />
              
              {/* Brand tooltip */}
              <div className="absolute bottom-1 text-[10px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {brand.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
