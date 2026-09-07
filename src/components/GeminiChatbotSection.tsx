import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Sparkles,
  RefreshCw,
  Phone,
  MessageCircle,
  X,
  Mic,
  MicOff,
  User,
  ArrowRight,
  HelpCircle,
  Volume2,
  VolumeX,
  Store,
  MapPin,
  Clock,
  ShieldCheck,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  time: string;
}

const QUICK_PROMPTS = [
  "Chhat tapak rahi hai, kaun sa tirpal best hai? 🏠",
  "Wholesale rate aur bulk discount ka price list? 💰",
  "Fish pond (Machhli palan) ke liye Silpaulin sheet? 🐟",
  "Construction plastic roll (Dhalai) ka size aur micron? 🏗️",
  "Green shade net (Agro net) price aur quality? 🌿",
  "Meetha Hatti, Maharajganj shop ka timing aur location? 📍",
  "Vinod ji se direct call ya WhatsApp par baat karni hai 📞",
];

const BOT_AVATAR = "https://plain-apac-prod-public.komododecks.com/202609/07/u9gkonoHbUx72eTNh7GG/image.png";

export default function GeminiChatbotSection({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [userName, setUserName] = useState<string>(() => {
    return sessionStorage.getItem("omsetu_user_name") || "";
  });
  const [tempNameInput, setTempNameInput] = useState("");
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(() => {
    return !!sessionStorage.getItem("omsetu_user_name");
  });

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize Web Speech API for voice input
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        setSpeechSupported(true);
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "hi-IN"; // Hindi / Hinglish friendly

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            setInputMessage((prev) => (prev ? `${prev} ${transcript}` : transcript));
          }
          setIsListening(false);
        };

        recognition.onerror = (event: any) => {
          console.warn("Speech recognition error:", event?.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  // Initialize messages once onboarding is completed
  useEffect(() => {
    if (isOpen && hasCompletedOnboarding && messages.length === 0) {
      const nameGreeting = userName ? `${userName} ji` : "ji";
      setMessages([
        {
          id: `welcome-${Date.now()}`,
          role: "assistant",
          content: `Namaste ${nameGreeting}! 👋 Om Shringar Tirpal Store me aapka swagat hai. Main hoon **Om Setu**, aapka 24x7 AI Shopping Assistant! 😊\n\nAapko chhat waterproofing, tractor/truck cover, kheti, fish pond ya wholesale factory rates ke baare me kuch bhi jaanna ho, bejhijhak poochhiye ya neeche diye gaye topics par click kijiye!`,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }
  }, [isOpen, hasCompletedOnboarding, userName, messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const toggleVoiceInput = () => {
    if (!speechSupported || !recognitionRef.current) {
      alert("Aapke browser me Voice Recognition support uplabdh nahi hai. Kripya type karein.");
      return;
    }

    if (isListening) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
      setIsListening(false);
    } else {
      try {
        setIsListening(true);
        recognitionRef.current.start();
      } catch (e) {
        console.warn("Speech start failed", e);
        setIsListening(false);
      }
    }
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = tempNameInput.trim();
    if (!cleanName) return;

    setUserName(cleanName);
    sessionStorage.setItem("omsetu_user_name", cleanName);
    setHasCompletedOnboarding(true);

    const nameGreeting = `${cleanName} ji`;
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: "assistant",
        content: `Namaste ${nameGreeting}! 👋 Om Shringar Tirpal Store me aapka swagat hai. Main hoon **Om Setu**, aapka AI Shopping Assistant! 😊\n\nAapko chhat waterproofing, fish pond sheet, dhalai plastic roll ya wholesale rates ke baare me kuch bhi poochna ho, main turant madad karunga!`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      time: userTime,
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          userName: userName || "",
          history: newHistory.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();
      const botReply =
        data.reply ||
        `Namaste ${userName ? userName + " ji" : "ji"}! Aapke sawal ke liye aap humare proprietor Mr. Vinod Kumar Varnawal ji se direct call par baat kar sakte hain: 📞 +91 8210625483 (Maharajganj, Siwan).`;

      const botTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: "assistant",
          content: botReply,
          time: botTime,
        },
      ]);

      // Optional text-to-speech
      if (soundEnabled && typeof window !== "undefined" && "speechSynthesis" in window) {
        try {
          window.speechSynthesis.cancel();
          const cleanSpeechText = botReply.replace(/[*_#•📍📞⏰]/g, "").slice(0, 200);
          const utterance = new SpeechSynthesisUtterance(cleanSpeechText);
          utterance.lang = "hi-IN";
          utterance.rate = 1.0;
          window.speechSynthesis.speak(utterance);
        } catch {
          // ignore
        }
      }
    } catch (err) {
      console.error("Chat error:", err);
      const botTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-fallback-${Date.now()}`,
          role: "assistant",
          content: `Namaste ${userName ? userName + " ji" : "ji"}! Chhat waterproofing, fish pond ya factory wholesale rate ke liye aap direct Mr. Vinod Kumar Varnawal ji se phone ya WhatsApp par baat kar sakte hain:\n\n📞 **+91 8210625483**\n📍 Meetha Hatti, Kazi Bazar, Maharajganj, Siwan.`,
          time: botTime,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    sessionStorage.removeItem("omsetu_user_name");
    setUserName("");
    setTempNameInput("");
    setHasCompletedOnboarding(false);
    setMessages([]);
  };

  if (!isOpen) return null;

  return (
    <div
      id="om-setu-modal"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-0 sm:p-4 md:p-6 transition-all animate-in fade-in duration-200"
    >
      {/* Main Container: Full screen on mobile, elegant card on desktop */}
      <div className="bg-white w-full h-full sm:h-[90vh] sm:max-h-[820px] sm:max-w-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200/80 relative">
        {/* TOP HEADER */}
        <div className="bg-gradient-to-r from-[#0B2D5C] via-[#103E7D] to-[#0B2D5C] text-white px-5 py-4 flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center gap-3">
            {/* Mascot Avatar with Active Ring */}
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-white/10 p-1 flex items-center justify-center backdrop-blur-xs border border-white/20 shadow-inner">
                <img
                  src={BOT_AVATAR}
                  alt="Om Setu AI"
                  className="w-10 h-10 rounded-xl object-cover"
                />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#0B2D5C] rounded-full shadow-xs animate-pulse"></span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
                  <span>Om Setu AI</span>
                  <span className="bg-orange-500/30 text-orange-200 border border-orange-400/40 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Hinglish
                  </span>
                </h3>
              </div>
              <p className="text-xs text-blue-200/90 font-medium flex items-center gap-1">
                <span>Om Shringar Tirpal Store</span>
                {userName && (
                  <>
                    <span>•</span>
                    <span className="text-amber-300 font-bold truncate max-w-[120px]">
                      {userName} ji
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Text-to-speech toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? "Mute Voice Readout" : "Enable Voice Readout"}
              className={`p-2 rounded-xl text-xs font-semibold transition-all ${
                soundEnabled
                  ? "bg-orange-500 text-white"
                  : "bg-white/10 hover:bg-white/20 text-blue-200 hover:text-white"
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Reset / New Chat */}
            {hasCompletedOnboarding && (
              <button
                onClick={handleReset}
                title="Restart / Change Name"
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-blue-200 hover:text-white transition-all text-xs font-semibold flex items-center gap-1"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}

            {/* Close Modal */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all ml-1 cursor-pointer"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* BODY: CONDITIONAL ONBOARDING VS CHAT */}
        {!hasCompletedOnboarding ? (
          /* TYPEFORM STYLE ONBOARDING SCREEN */
          <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-10 bg-gradient-to-b from-orange-50/40 via-white to-slate-50 overflow-y-auto">
            <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-orange-100/80 shadow-xl text-center relative">
              {/* Decorative Mascot */}
              <div className="relative inline-block mb-4">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-orange-400 via-amber-400 to-orange-500 p-1.5 shadow-lg mx-auto transform hover:scale-105 transition-transform">
                  <img
                    src={BOT_AVATAR}
                    alt="Om Setu"
                    className="w-full h-full object-cover rounded-2xl bg-white"
                  />
                </div>
                <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs border-2 border-white flex items-center gap-1">
                  <Sparkles className="w-3 h-3 animate-spin" /> 24x7 AI
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 bg-orange-100/80 text-orange-800 text-xs font-bold px-3 py-1 rounded-full mb-3">
                <span>Om Shringar Tirpal Store Assistant</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                Namaste! 🙏
              </h2>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                Main **Om Setu** hoon. Aapko sabse behtar sujhav aur sahi rate batane ke liye,{" "}
                <span className="font-bold text-orange-600">Aapka shubh naam kya hai?</span>
              </p>

              {/* Typeform Input Form */}
              <form onSubmit={handleNameSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    value={tempNameInput}
                    onChange={(e) => setTempNameInput(e.target.value)}
                    placeholder="Apna naam likhein (e.g. Rahul, Amit, Priya)..."
                    autoFocus
                    required
                    className="w-full bg-slate-50 border-2 border-orange-200 focus:border-orange-500 focus:bg-white rounded-2xl px-5 py-3.5 text-base sm:text-lg text-slate-900 placeholder-slate-400 outline-none transition-all shadow-inner font-medium"
                  />
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <User className="w-5 h-5" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!tempNameInput.trim()}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold py-3.5 px-6 rounded-2xl shadow-lg transition-all transform active:scale-98 flex items-center justify-center gap-2 text-base cursor-pointer"
                >
                  <span>Continue / Aage Badhein</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>

              {/* Trust Badges */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center gap-4 text-slate-500 text-xs font-semibold">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% Free Advice
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Store className="w-4 h-4 text-blue-600" /> Maharajganj, Siwan
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* CHAT CONVERSATION VIEW */
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-50">
            {/* MESSAGES CONTAINER */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {messages.map((msg) => {
                const isAssistant = msg.role === "assistant";
                return (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${
                      isAssistant ? "justify-start" : "justify-end"
                    } animate-in fade-in duration-200`}
                  >
                    {isAssistant && (
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 p-0.5 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                        <img
                          src={BOT_AVATAR}
                          alt="Om Setu"
                          className="w-full h-full object-cover rounded-lg bg-white"
                        />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-3.5 sm:p-4 text-sm leading-relaxed shadow-xs ${
                        isAssistant
                          ? "bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs"
                          : "bg-gradient-to-r from-orange-600 to-amber-600 text-white font-medium rounded-tr-xs shadow-orange-500/10"
                      }`}
                    >
                      <div className="whitespace-pre-line break-words">{msg.content}</div>

                      <div
                        className={`text-[10px] mt-1.5 flex items-center justify-end font-mono ${
                          isAssistant ? "text-slate-400" : "text-orange-100"
                        }`}
                      >
                        {msg.time}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex gap-3 justify-start items-center">
                  <div className="w-8 h-8 rounded-xl bg-orange-100 p-0.5 flex items-center justify-center shrink-0">
                    <img
                      src={BOT_AVATAR}
                      alt="Om Setu"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-xs px-4 py-2.5 shadow-xs flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-600">
                      Om Setu soch raha hai
                    </span>
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* QUICK QUESTION PILLS (CLICKABLE SUGGESTIONS) */}
            <div className="bg-white border-t border-slate-200/80 px-3 py-2 sm:px-4 sm:py-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
              <span className="text-[11px] font-extrabold text-orange-600 uppercase tracking-wider shrink-0 flex items-center gap-1 pl-1">
                <Sparkles className="w-3.5 h-3.5" /> Poochhein:
              </span>
              {QUICK_PROMPTS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  disabled={isLoading}
                  className="shrink-0 text-xs font-semibold bg-orange-50/80 hover:bg-orange-100 text-slate-800 hover:text-orange-700 border border-orange-200/60 hover:border-orange-300 px-3.5 py-1.5 rounded-full transition-all cursor-pointer disabled:opacity-50 active:scale-95 shadow-2xs whitespace-nowrap"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* INPUT FOOTER & VOICE BUTTON */}
            <div className="p-3 sm:p-4 bg-white border-t border-slate-200 flex flex-col gap-2 shrink-0">
              {/* Voice Listening Active Alert */}
              {isListening && (
                <div className="bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center justify-between animate-pulse">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>
                    Sun raha hoon... Kripya boliye (Listening...)
                  </span>
                  <button
                    onClick={toggleVoiceInput}
                    className="text-orange-900 underline text-[11px]"
                  >
                    Band karein
                  </button>
                </div>
              )}

              <div className="flex items-center gap-2">
                {/* Voice Input Mic Button */}
                <button
                  type="button"
                  onClick={toggleVoiceInput}
                  title={isListening ? "Stop Voice Input" : "Click to Speak (Voice Input)"}
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                    isListening
                      ? "bg-red-500 text-white shadow-lg animate-bounce"
                      : "bg-slate-100 hover:bg-orange-100 text-slate-600 hover:text-orange-600 border border-slate-200"
                  }`}
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>

                {/* Text Input */}
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder={
                    userName
                      ? `${userName} ji, yahan sawal likhein ya mic dabayein...`
                      : "Yahan sawal likhein (e.g. Chhat ke liye kaun sa tirpal lu?)..."
                  }
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
                  disabled={isLoading}
                />

                {/* Send Button */}
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage.trim() || isLoading}
                  aria-label="Send message"
                  className="w-11 h-11 rounded-2xl bg-orange-600 hover:bg-orange-700 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center shadow-md transition-all shrink-0 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

              {/* Direct Call / WhatsApp quick bar */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <span className="hidden sm:inline">
                  Proprietor: Mr. Vinod Kumar Varnawal (Maharajganj)
                </span>
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <a
                    href="tel:+918210625483"
                    className="inline-flex items-center gap-1 text-[#0B2D5C] hover:text-orange-600 font-bold bg-slate-100 hover:bg-orange-50 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-orange-500" />
                    <span>Call Store</span>
                  </a>
                  <a
                    href={`https://wa.me/918210625483?text=Namaste%20Vinod%20ji,%20mera%20naam%20${encodeURIComponent(
                      userName || "Customer"
                    )}%20hai.%20Om%20Shringar%20Tirpal%20Store%20se%20tirpal%20ki%20inquiry%20karni%20hai.`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-bold bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


