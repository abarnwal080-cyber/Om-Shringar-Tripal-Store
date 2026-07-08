import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Phone, MapPin, Award, Check, Sparkles, Languages, Bot } from "lucide-react";
import { BUSINESS_INFO, PRODUCTS, FAQS } from "../data";
import { TRANSLATIONS } from "../translations";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

interface AIChatbotProps {
  currentLanguage?: "en" | "hi";
  onLanguageChange?: (lang: "en" | "hi") => void;
}

export default function AIChatbot({ currentLanguage = "en", onLanguageChange }: AIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const t = TRANSLATIONS[currentLanguage];

  // Initialize with greeting
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          sender: "bot",
          text: t.chatbotGreeting,
          timestamp: new Date()
        }
      ]);
    }
  }, [currentLanguage]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Math.random().toString(),
      sender: "user",
      text,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    // Simulate smart bot response
    setTimeout(() => {
      const botResponseText = getBotResponse(text, currentLanguage);
      const botMsg: Message = {
        id: Math.random().toString(),
        sender: "bot",
        text: botResponseText,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const getBotResponse = (query: string, lang: "en" | "hi"): string => {
    const q = query.toLowerCase().trim();

    // Hindi terms matching
    const isHindiUser = lang === "hi" || /कहाँ|कहा|नंबर|फोन|मालिक|तिरपाल|दाम|प्राइस|रेट|लोकेशन|व्हाट्सएप|साइज़|साइज|ब्रांड|ब्राण्ड|माहाराजगंज|सीवान|बिहार/g.test(q);

    // Dynamic response builder
    if (q.includes("location") || q.includes("where") || q.includes("address") || q.includes("kahan") || q.includes("kaha") || q.includes("पता") || q.includes("जगह") || q.includes("रास्ता")) {
      return lang === "hi" || isHindiUser
        ? `📍 हमारा स्टोर बिहार के महाराजगंज (सीवान जिला) में मीठा हट्टी, काजी बाजार रोड पर स्थित है। लैंडमार्क: काजी बाजार के पास। आप वेबसाइट पर दिए गए "Open Google Maps Directions" बटन पर क्लिक करके जीपीएस रास्ता भी देख सकते हैं!`
        : `📍 We are located at Meetha Hatti, Kazi Bazar, Maharajganj, Siwan, Bihar - 841238. Landmark: Near Kazi Bazar Road. You can click the "Open Google Maps" button on our page for exact GPS directions!`;
    }

    if (q.includes("phone") || q.includes("contact") || q.includes("call") || q.includes("number") || q.includes("mobile") || q.includes("नंबर") || q.includes("सम्पर्क") || q.includes("फ़ोन") || q.includes("कॉल")) {
      return lang === "hi" || isHindiUser
        ? `📞 आप हमारे प्रोपराइटर श्री विनोद कुमार वर्णवाल से सीधे संपर्क कर सकते हैं:\n\n• मोबाइल नंबर: ${BUSINESS_INFO.phone}\n• व्हाट्सएप चैट लिंक वेबसाइट पर उपलब्ध है। थोक और रिटेल दरों के लिए बेझिझक कॉल करें!`
        : `📞 You can contact our Proprietor Mr. Vinod Kumar Varnawal directly:\n\n• Phone: ${BUSINESS_INFO.phone}\n• WhatsApp: Just click the WhatsApp icon on the page to chat instantly for bulk wholesale pricing!`;
    }

    if (q.includes("size") || q.includes("width") || q.includes("feet") || q.includes("dimensions") || q.includes("साइज") || q.includes("साइज़") || q.includes("मोटाई") || q.includes("फिट") || q.includes("फ़ीट")) {
      return lang === "hi" || isHindiUser
        ? `📐 हमारे पास 8 फीट से लेकर 36 फीट चौड़ाई के भारी सीमेंट रोल उपलब्ध हैं। तिरपाल में 6x6 फीट से लेकर विशाल 60x100 फीट तक के तैयार आकार हमेशा स्टॉक में उपलब्ध रहते हैं। इसके अलावा हम आपकी आवश्यकता के अनुसार विशेष साइज भी तैयार करते हैं!`
        : `📐 We stock heavy-duty curing rolls from 8 feet to 36 feet in width. Premium waterproof tarpaulins are available from 6x6 feet up to a massive 60x100 feet. Custom tailoring according to your dimensions is also available!`;
    }

    if (q.includes("brand") || q.includes("shalimar") || q.includes("silpaulin") || q.includes("quality") || q.includes("ब्रांड") || q.includes("ब्राण्ड") || q.includes("कंपनी") || q.includes("क्वालिटी") || q.includes("शालिमार") || q.includes("सिलपॉलिन")) {
      return lang === "hi" || isHindiUser
        ? `🛡️ हम भारत के सर्वोत्तम ब्रांड्स में डील करते हैं:\n\n• शालिमार (Shalimar)\n• सिलपॉलिन (Silpaulin)\n• ग्रेटपॉलिन (Greatpaulin)\n• केपस्टोन चीता (Capstone Cheetah)\n• विजन (Vision)\n• गोल्डपॉलिन (Goldpaulin)\nये सभी वाटरप्रूफ और यूवी प्रोटेक्टेड होते हैं।`
        : `🛡️ We are authorized dealers for India's finest heavy-duty plastic brands:\n\n• Shalimar\n• Silpaulin\n• Greatpaulin\n• Capstone Cheetah\n• Vision\n• Goldpaulin\nAll products are 100% waterproof and UV stabilized for multi-season durability!`;
    }

    if (q.includes("price") || q.includes("rate") || q.includes("cost") || q.includes("discount") || q.includes("wholesale") || q.includes("दाम") || q.includes("प्राइस") || q.includes("मूल्य") || q.includes("थोक") || q.includes("कितना")) {
      return lang === "hi" || isHindiUser
        ? `💰 हम महाराजगंज और सीवान में सबसे कम थोक दरों की गारंटी देते हैं! चूंकि रेट तिरपाल के साइज़, जीएसएम (GSM) और मोटाई पर निर्भर करते हैं, इसलिए कृपया व्हाट्सएप पर तुरंत सटीक भाव पाने के लिए 'WhatsApp Price List' बटन का उपयोग करें, या नीचे पूछताछ फॉर्म भरें!`
        : `💰 We guarantee the lowest wholesale and retail prices in the Siwan region! Since rates depend on size, GSM thickness, and quantity, please use the "WhatsApp Price List" or fill in our desk inquiry form for an instant customized price quotation!`;
    }

    if (q.includes("owner") || q.includes("vinod") || q.includes("who is") || q.includes("goyal") || q.includes("proprietor") || q.includes("मालिक") || q.includes("विनोद") || q.includes("दुकान")) {
      return lang === "hi" || isHindiUser
        ? `👤 ओम श्रृंगार तिरपाल स्टोर (जिसे पहले गोयल ट्रेडर्स के नाम से जाना जाता था) के प्रोपराइटर श्री विनोद कुमार वर्णवाल हैं। वे पिछले 24+ सालों से किसानों, बिल्डरों और ट्रांसपोर्टर्स को अपनी सेवा प्रदान कर रहे हैं।`
        : `👤 The proprietor is Mr. Vinod Kumar Varnawal. The store was established in 2000 (previously widely known as Goyal Traders). He has been serving the farming and construction sectors for 24+ successful years.`;
    }

    if (q.includes("time") || q.includes("hour") || q.includes("open") || q.includes("close") || q.includes("sunday") || q.includes("schedule") || q.includes("समय") || q.includes("खुलने") || q.includes("कब") || q.includes("छुट्टी") || q.includes("रविवार")) {
      return lang === "hi" || isHindiUser
        ? `🕒 स्टोर का समय:\n\n• सोमवार से शनिवार: सुबह 6:00 बजे से रात 9:00 बजे तक।\n• रविवार: बंद रहता है (लेकिन पहले से बुक किए गए भारी थोक आर्डर्स की डिलीवरी के लिए विशेष व्यवस्था की जा सकती है, कृपया श्री विनोद वर्णवाल जी से संपर्क करें)।`
        : `🕒 Store Timings:\n\n• Monday to Saturday: 6:00 AM to 9:00 PM\n• Sunday: Closed (However, urgent wholesale bulk dispatches can be arranged on special request by calling Mr. Vinod Varnawal directly).`;
    }

    // Default fallback based on language
    return lang === "hi" || isHindiUser
      ? `🙏 क्षमा करें, मैं पूरी तरह समझ नहीं पाया। कृपया नीचे दिए गए विकल्पों में से किसी एक पर क्लिक करें, या सीधे +91 9852076197 पर कॉल करें।\n\nविकल्प:\n1. स्टोर का पता (Location)\n2. उपलब्ध साइज़ (Sizes)\n3. थोक दाम (Prices)\n4. ब्रांड सूची (Brands)`
      : `🙏 I didn't quite get that, but I'm here to help! Please ask about 'Location', 'Contact', 'Sizes', 'Brands', or 'Prices'. You can also call Mr. Vinod Kumar directly at +91 9852076197.`;
  };

  const quickActions = [
    { label: currentLanguage === "hi" ? "📍 स्टोर स्थान" : "📍 Store Location", query: "location" },
    { label: currentLanguage === "hi" ? "📐 साइज़ लिस्ट" : "📐 Sizes Available", query: "sizes" },
    { label: currentLanguage === "hi" ? "📞 फ़ोन नंबर" : "📞 Phone/Contact", query: "phone number" },
    { label: currentLanguage === "hi" ? "🛡️ ब्रांड्स" : "🛡️ Brands We Sell", query: "brands" },
  ];

  return (
    <>
      {/* FLOATING ACTION BUTTON - ALIGNED TO LEFT */}
      <div className="fixed left-6 bottom-6 z-50 flex flex-col items-start gap-3">
        {/* Chat Toggle Button with Bot Icon & Pulse Rings */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-tr from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 border border-white/20 cursor-pointer relative group"
          aria-label="Toggle AI Assistant"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <>
              {/* Dynamic pulse background ring */}
              <span className="absolute inset-0 rounded-full bg-orange-500/30 animate-pulse scale-105 pointer-events-none group-hover:scale-110 transition-transform" />
              <Bot className="w-7 h-7 text-white animate-pulse" />
              <span className="absolute -top-1.5 -right-1.5 bg-green-500 text-[9px] font-black px-1.5 py-0.5 rounded-full border border-white uppercase tracking-widest text-white">
                ASSISTANT
              </span>
            </>
          )}
        </button>
      </div>

      {/* CHAT WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="fixed left-6 bottom-24 z-50 w-[350px] sm:w-[380px] h-[500px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#001f3f] text-white px-5 py-4 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white font-bold text-base relative">
                  OS
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#001f3f]" />
                </div>
                <div>
                  <h4 className="font-bold text-sm tracking-wide leading-tight flex items-center gap-1.5">
                    {t.chatbotTitle}
                    <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                  </h4>
                  <p className="text-[10px] text-blue-200 flex items-center gap-1 mt-0.5 font-medium">
                    {t.chatbotSubtitle}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed whitespace-pre-line shadow-sm ${
                      msg.sender === "user"
                        ? "bg-orange-600 text-white rounded-br-none"
                        : "bg-white text-slate-800 border border-slate-100 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                    <span
                      className={`block text-[9px] mt-1.5 text-right ${
                        msg.sender === "user" ? "text-white/70" : "text-slate-400"
                      }`}
                    >
                      {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-none p-3 shadow-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions Suggestions */}
            <div className="p-2.5 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto no-scrollbar scroll-smooth">
              {quickActions.map((act) => (
                <button
                  key={act.label}
                  onClick={() => handleSend(act.query)}
                  className="shrink-0 text-xs py-1.5 px-3 rounded-full bg-slate-100 hover:bg-orange-50 hover:text-orange-600 text-slate-600 border border-slate-200/60 font-medium transition-all cursor-pointer"
                >
                  {act.label}
                </button>
              ))}
            </div>

            {/* Footer Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputVal);
              }}
              className="p-3 bg-white border-t border-slate-100 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder={t.chatbotPlaceholder}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="flex-grow text-sm py-2 px-4 rounded-full border border-slate-200 outline-none focus:border-orange-500 transition-colors"
              />
              <button
                type="submit"
                className="w-9 h-9 shrink-0 bg-[#001f3f] hover:bg-orange-600 text-white rounded-full flex items-center justify-center shadow-md active:scale-90 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
