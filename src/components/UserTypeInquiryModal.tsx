import React from "react";
import { X, ShoppingCart, HardHat, Store, Landmark, MessageSquare, Sparkles } from "lucide-react";
import { BUSINESS_INFO } from "../data";

interface UserTypeInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  customContext?: string;
  lang?: string;
}

export default function UserTypeInquiryModal({
  isOpen,
  onClose,
  productName = "",
  customContext = "",
  lang = "en",
}: UserTypeInquiryModalProps) {
  if (!isOpen) return null;

  const roles = [
    {
      id: "customer",
      titleHi: "ग्राहक (Retail Customer)",
      titleEn: "Retail Customer",
      subHi: "घर, कृषि या व्यक्तिगत उपयोग के लिए",
      subEn: "For personal, home or farm use",
      icon: ShoppingCart,
      color: "from-blue-500 to-indigo-600",
      bgLight: "bg-blue-50 border-blue-200 text-blue-900",
      badgeHi: "व्यक्तिगत खरीद",
      badgeEn: "Personal Use",
      roleTitle: "Retail Customer (व्यक्तिगत उपयोग)",
      roleDesc: "I need product details, pricing, and home/local delivery options for my personal/farm use.",
    },
    {
      id: "contractor",
      titleHi: "कॉन्ट्रैक्टर (Contractor / Builder)",
      titleEn: "Contractor / Builder",
      subHi: "साइट प्रोटेक्शन, पॉन्ड लाइनिंग व प्रोजेक्ट्स",
      subEn: "Site protection, pond lining & projects",
      icon: HardHat,
      color: "from-amber-500 to-orange-600",
      bgLight: "bg-amber-50 border-amber-200 text-amber-900",
      badgeHi: "प्रोजेक्ट रेट्स",
      badgeEn: "Project Supply",
      roleTitle: "Contractor / Builder (प्रोजेक्ट एवं साइट उपयोग)",
      roleDesc: "I need bulk project rates, heavy-duty GSM specifications, and site delivery timelines.",
    },
    {
      id: "dealer",
      titleHi: "डीलर व थोक व्यापारी (Dealer / Wholesaler)",
      titleEn: "Dealer / Wholesaler",
      subHi: "दुकान रीसेल, डीलरशिप व बल्क स्टॉक",
      subEn: "Bulk resale, shop supply & dealership",
      icon: Store,
      color: "from-emerald-500 to-teal-600",
      bgLight: "bg-emerald-50 border-emerald-200 text-emerald-900",
      badgeHi: "थोक भाव",
      badgeEn: "Wholesale Rate",
      roleTitle: "Dealer / Wholesaler (डीलर व थोक व्यापारी)",
      roleDesc: "I need wholesale price catalog, dealership margin details, and bulk shop supply terms.",
    },
    {
      id: "govt",
      titleHi: "सरकारी व B2B (Govt / B2B Entity)",
      titleEn: "Government / B2B Entity",
      subHi: "सरकारी टेंडर, राहत सामग्री व कॉर्पोरेट बिलिंग",
      subEn: "Govt tenders, relief supplies & GST billing",
      icon: Landmark,
      color: "from-purple-600 to-pink-600",
      bgLight: "bg-purple-50 border-purple-200 text-purple-900",
      badgeHi: "GST बिलिंग",
      badgeEn: "GST Invoice & Quotation",
      roleTitle: "Government / B2B Entity (सरकारी व संस्थागत आपूर्ति)",
      roleDesc: "I require GST billing, official quotation, specifications sheet, and procurement process.",
    },
  ];

  const handleSelectRole = (role: typeof roles[0]) => {
    let text = `Hi Om Shringar Tirpal Store!\n\nI am contacting you as a *${role.roleTitle}*.\n`;

    if (productName) {
      text += `📦 *Inquiry Product:* ${productName}\n`;
    } else if (customContext) {
      text += `📦 *Requirement:* ${customContext}\n`;
    } else {
      text += `📦 *Inquiry:* Bulk Tarpaulin & Plastic Sheet Catalog\n`;
    }

    text += `💬 *Note:* ${role.roleDesc}\n\nPlease share details on WhatsApp. Thank you!`;

    const whatsappUrl = `${BUSINESS_INFO.whatsappLink}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative z-10 w-full max-w-xl my-auto">
        <div className="bg-gradient-to-br from-slate-900 via-[#0B2D5C] to-slate-900 p-1 sm:p-1.5 rounded-[32px] shadow-[0_25px_60px_rgba(0,0,0,0.5)] border border-amber-500/30">
          <div className="bg-slate-950/90 rounded-[28px] p-5 sm:p-7 relative overflow-hidden border border-white/10">
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer z-20"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-6 pr-6 pl-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-widest mb-2">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>{lang === "hi" ? "त्वरित पूछताछ सहायिका" : "Who Are You?"}</span>
              </div>
              <h2
                className="text-2xl sm:text-3xl font-black text-white tracking-tight"
                style={{ fontFamily: "'Amaranth', sans-serif" }}
              >
                {lang === "hi" ? "अपनी भूमिका चुनें (Who are you?)" : "Select Your Role for Custom Draft"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                {productName ? (
                  <>Inquiring for: <span className="text-amber-400 font-extrabold">{productName}</span></>
                ) : customContext ? (
                  <>{customContext}</>
                ) : (
                  <>{lang === "hi" ? "व्हाट्सएप पर आपकी आवश्यकतानुसार कस्टमाइज्ड मैसेज तैयार होगा:" : "Choose an option to create a customized WhatsApp message:"}</>
                )}
              </p>
            </div>

            {/* Role Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {roles.map((role) => {
                const IconComponent = role.icon;
                return (
                  <button
                    key={role.id}
                    onClick={() => handleSelectRole(role)}
                    className="flex flex-col text-left p-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-500/60 transition-all duration-200 group cursor-pointer relative overflow-hidden shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-slate-700">
                        {lang === "hi" ? role.badgeHi : role.badgeEn}
                      </span>
                    </div>

                    <h3 className="text-sm font-black text-white group-hover:text-amber-300 transition-colors leading-snug">
                      {lang === "hi" ? role.titleHi : role.titleEn}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-medium mt-1 leading-relaxed">
                      {lang === "hi" ? role.subHi : role.subEn}
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-bold text-emerald-400 group-hover:text-emerald-300">
                      <span className="flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 fill-current" />
                        <span>{lang === "hi" ? "व्हाट्सएप चैट शुरू करें" : "Open WhatsApp Draft"}</span>
                      </span>
                      <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Note */}
            <p className="text-[11px] text-center text-slate-400 mt-5 font-medium">
              💡 {lang === "hi" ? "चुनने के बाद आपका व्हाट्सएप अपने आप सही मैसेज ड्राफ्ट के साथ खुल जाएगा।" : "Selecting an option will automatically launch WhatsApp with your pre-filled inquiry message."}
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}
