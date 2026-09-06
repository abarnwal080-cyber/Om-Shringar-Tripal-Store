import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles, RefreshCw, Phone, MessageCircle, ArrowUpRight } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  time: string;
}

const QUICK_PROMPTS = [
  "Chhat ke liye kaun sa tirpal best hai?",
  "Standard sizes aur GSM kitne milenge?",
  "Wholesale rate aur bulk discount kaise milega?",
  "Fish pond ya kheti ke liye silpaulin sheet?",
  "Dukaan ka address aur open timing kya hai?",
  "Owner Mr. Vinod Kumar se direct baat karni hai",
];

export default function GeminiChatbotSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      role: "assistant",
      content:
        "Namaste ji! 🙏 Main Om Shringar Tirpal Store ka **Tirpal Saathi (AI Assistant)** hoon.\n\nAapko chhat ke liye waterproof tirpal, truck cover, kheti, fish pond ya construction plastic rolls ke baare me kuch bhi jaanna ho, bejhijhak poochhiye! Main Hinglish me turant batata hoon.",
      time: "Just now",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          history: newHistory.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      const botReply =
        data.reply ||
        "Namaste! Kuch technical samasya aa gayi hai. Kripya humare proprietor Mr. Vinod Kumar Varnawal ji se direct call par baat karein: +91 8210625483.";

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
          content:
            "Aapka sawal mil gaya hai! Chhat, godown ya farming tirpal ke direct factory rate ke liye aap humare proprietor Mr. Vinod Kumar Varnawal ji se direct phone ya WhatsApp par baat kar sakte hain:\n\n📞 **+91 8210625483**\n📍 Meetha Hatti, Kazi Bazar, Maharajganj, Siwan (Subah 7 AM se Shaam 7 PM).",
          time: botTime,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: "assistant",
        content:
          "Chat reset ho gaya hai! Namaste ji 🙏 Batayiye, aaj kis tarah ke tirpal ya plastic roll ki jaankaari chahiye?",
        time: "Just now",
      },
    ]);
  };

  return (
    <section
      id="chatbot"
      className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 via-orange-50/20 to-white border-t border-slate-200/80 relative scroll-mt-24 overflow-hidden"
    >
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200/25 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Badge & Title */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 text-xs font-black font-mono px-4 py-1.5 rounded-full mb-3 shadow-xs">
            <Sparkles className="w-4 h-4 text-orange-600 animate-pulse" />
            <span>POWERED BY GEMINI AI • HINGLISH EXPERT</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight flex items-center justify-center gap-3">
            <span>Tirpal Saathi AI</span>
            <span className="text-orange-600 font-hindi">चैटबॉट</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
            Tirpal size, GSM, chhat waterproofing, fish pond ya wholesale rate ke
            baare me Hinglish me poochhiye — turant sahi sujhav payiye!
          </p>
        </div>

        {/* Main Chat Box */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col h-[620px] sm:h-[660px]">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-[#0B2D5C] via-[#103E7D] to-[#0B2D5C] text-white px-5 py-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              {/* Cute Mascot Avatar */}
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 flex items-center justify-center shadow-lg border-2 border-white/30 transform hover:scale-105 transition-transform">
                  {/* Cute SVG Robot Face with Tarpaulin Cap */}
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Tarpaulin Cap */}
                    <path
                      d="M8 15 C8 9, 32 9, 32 15 Z"
                      fill="#FFD200"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M6 15 L34 15 L31 18 L9 18 Z"
                      fill="#FF8A00"
                      stroke="#FFFFFF"
                      strokeWidth="1.2"
                    />
                    {/* Cute Bot Head */}
                    <rect
                      x="10"
                      y="17"
                      width="20"
                      height="16"
                      rx="7"
                      fill="#FFFFFF"
                    />
                    {/* Rosy Cheeks */}
                    <circle cx="13" cy="27" r="2" fill="#FF8A8A" />
                    <circle cx="27" cy="27" r="2" fill="#FF8A8A" />
                    {/* Big Cute Eyes */}
                    <ellipse cx="15" cy="23" rx="2.5" ry="3" fill="#0B2D5C" />
                    <ellipse cx="25" cy="23" rx="2.5" ry="3" fill="#0B2D5C" />
                    {/* Sparkle In Eyes */}
                    <circle cx="16" cy="22" r="1" fill="#FFFFFF" />
                    <circle cx="26" cy="22" r="1" fill="#FFFFFF" />
                    {/* Sweet Smile */}
                    <path
                      d="M17 27 Q20 30 23 27"
                      stroke="#0B2D5C"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    {/* Antenna */}
                    <circle cx="20" cy="7" r="2.5" fill="#FFD200" />
                    <line
                      x1="20"
                      y1="9.5"
                      x2="20"
                      y2="12"
                      stroke="#FFFFFF"
                      strokeWidth="1.8"
                    />
                  </svg>
                </div>
                {/* Live Online Dot */}
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#0B2D5C] rounded-full shadow-xs"></span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
                    Tirpal Saathi AI
                  </h3>
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                    24x7 Live
                  </span>
                </div>
                <p className="text-xs text-blue-200/90 font-medium">
                  Om Shringar Tirpal Store Assistant • Hinglish
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="tel:+918210625483"
                title="Call Vinod Ji (+91 8210625483)"
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all text-xs font-bold flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-orange-400" />
                <span className="hidden sm:inline">Call Store</span>
              </a>

              <button
                onClick={handleResetChat}
                title="Clear & Restart Chat"
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-blue-200 hover:text-white transition-all"
                aria-label="Restart chat"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/70">
            {messages.map((msg) => {
              const isAssistant = msg.role === "assistant";
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${
                    isAssistant ? "justify-start" : "justify-end"
                  }`}
                >
                  {isAssistant && (
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white shrink-0 shadow-sm mt-0.5">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 sm:p-4.5 text-sm leading-relaxed shadow-xs ${
                      isAssistant
                        ? "bg-white text-slate-800 border border-slate-200/90 rounded-tl-sm"
                        : "bg-orange-600 text-white font-medium rounded-tr-sm"
                    }`}
                  >
                    <div className="whitespace-pre-line break-words">
                      {msg.content}
                    </div>

                    <div
                      className={`text-[10px] mt-2 flex items-center justify-end ${
                        isAssistant ? "text-slate-400" : "text-orange-200"
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
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white shrink-0 shadow-sm animate-pulse">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-xs flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500">
                    Tirpal Saathi type kar raha hai
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

          {/* Quick Questions Prompt Chips */}
          <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1 pl-1">
              <Sparkles className="w-3 h-3 text-orange-500" /> Poochhein:
            </span>
            {QUICK_PROMPTS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                disabled={isLoading}
                className="shrink-0 text-xs font-semibold bg-slate-100 hover:bg-orange-50 text-slate-700 hover:text-orange-600 border border-slate-200/70 hover:border-orange-200 px-3 py-1.5 rounded-full transition-all cursor-pointer disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box Footer */}
          <div className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2.5">
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
              placeholder="Yahan Hinglish me sawal likhein (e.g. Chhat ke liye kaun sa tirpal lu?)..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
              disabled={isLoading}
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim() || isLoading}
              aria-label="Send message"
              className="w-11 h-11 rounded-2xl bg-orange-600 hover:bg-orange-700 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center shadow-md transition-all shrink-0 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Proprietor Callout Box Below Chat */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-xs sm:text-sm text-slate-600">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-800">
                Direct Wholesale Quotation Chahiye?
              </span>
              <p className="text-slate-500 text-[11px] sm:text-xs mt-0.5">
                Proprietor: Mr. Vinod Kumar Varnawal • Maharajganj, Siwan
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href="tel:+918210625483"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 bg-[#0B2D5C] hover:bg-[#103E7D] text-white px-4 py-2.5 rounded-xl font-bold transition-all shadow-xs"
            >
              <span>Call: +91 8210625483</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://wa.me/918210625483?text=Namaste%20Vinod%20ji,%20Om%20Shringar%20Tirpal%20Store%20se%20tirpal%20ki%20inquiry%20karni%20hai"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-bold transition-all shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
