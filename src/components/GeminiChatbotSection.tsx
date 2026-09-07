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
  Volume2,
  VolumeX,
  AlertTriangle,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  time: string;
  isWarning?: boolean;
}

const BOT_AVATAR =
  "https://plain-apac-prod-public.komododecks.com/202609/07/u9gkonoHbUx72eTNh7GG/image.png";

const QUICK_QUESTIONS = [
  "📏 What size do I need?",
  "📋 Available sizes",
  "🏠 Home delivery?",
  "💧 Best for rain?",
  "💰 Wholesale rate list?",
  "📞 Call Vinod ji (+91 8210625483)",
];

// Helper to strip any * symbol completely
function cleanText(text: string): string {
  if (!text) return "";
  return text.replace(/\*/g, "").trim();
}

export default function GeminiChatbotSection({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        setSpeechSupported(true);
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "hi-IN";

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            setInputMessage((prev) => (prev ? `${prev} ${transcript}` : transcript));
          }
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  // Lock body scroll when full-screen chat is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        inputRef.current?.focus();
      }, 250);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Initial welcome message directly when opening
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: `welcome-${Date.now()}`,
          role: "assistant",
          content: cleanText(
            `Namaste! 🙏 Main "Om Setu AI" hoon, Om Shringar Tirpal Store (Maharajganj, Siwan) ka virtual assistant.\n\nAap humse tirpal (waterproof HDPE / Silpaulin), available sizes, rates, concrete dhalai plastic ya delivery ke baare me pooch sakte hain. Main aapki kya madad kar sakta hoon?`
          ),
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }
  }, [isOpen, messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const toggleVoiceInput = () => {
    if (!speechSupported || !recognitionRef.current) {
      alert("Aapke browser me Voice Recognition uplabdh nahi hai. Kripya type karein.");
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

  // Check for forbidden, illegal or inappropriate questions
  const checkForbiddenContent = (text: string): boolean => {
    const lower = text.toLowerCase();
    const forbidden = [
      "hack",
      "weapon",
      "bomb",
      "kill",
      "drugs",
      "sex",
      "porn",
      "scam",
      "steal",
      "chori",
      "maro",
      "gaali",
      "fraud",
      "illegal",
      "daaru",
      "nasha",
      "ganja",
      "charas",
    ];
    return forbidden.some((term) => lower.includes(term));
  };

  const handleSendMessage = async (customText?: string) => {
    const textToSend = cleanText(customText || inputMessage);
    if (!textToSend || isLoading) return;

    const userTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMsgId = `user-${Date.now()}`;

    const newMessages: Message[] = [
      ...messages,
      {
        id: newMsgId,
        role: "user",
        content: textToSend,
        time: userTime,
      },
    ];

    setMessages(newMessages);
    setInputMessage("");
    setIsLoading(true);

    // Immediate Warning if illegal/inappropriate
    if (checkForbiddenContent(textToSend)) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `warn-${Date.now()}`,
            role: "assistant",
            content:
              "Chetavni (Warning): Yeh AI assistant keval Om Shringar Tirpal Store ke vyavsayik utpado aur sevaon ke liye hai. Kisi bhi anuchit ya gair-kanuni vishay par charcha yahan sakht mana hai.",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            isWarning: true,
          },
        ]);
        setIsLoading(false);
      }, 400);
      return;
    }

    try {
      const historyPayload = newMessages.slice(-6).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload,
          userName: "Customer",
        }),
      });

      const data = await res.json();
      const botReply = cleanText(
        data?.reply ||
          `Namaste ji! Satik rate aur jankari ke liye direct Mr. Vinod Kumar Varnawal ji ko call karein: +91 8210625483.`
      );

      const botTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      if (soundEnabled && typeof window !== "undefined" && "speechSynthesis" in window) {
        try {
          const utterance = new SpeechSynthesisUtterance(botReply.slice(0, 160));
          utterance.lang = "hi-IN";
          window.speechSynthesis.speak(utterance);
        } catch {
          // ignore
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: botReply,
          time: botTime,
        },
      ]);
    } catch {
      const botTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-err-${Date.now()}`,
          role: "assistant",
          content: cleanText(
            `Namaste ji! Satik rate aur availability ke liye humare proprietor Mr. Vinod Kumar Varnawal ji se direct baat karein:\nPhone / WhatsApp: +91 8210625483\nStore: Meetha Hatti, Kazi Bazar, Maharajganj, Siwan.`
          ),
          time: botTime,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: "assistant",
        content: cleanText(
          `Namaste! 🙏 Main "Om Setu AI" hoon, Om Shringar Tirpal Store (Maharajganj, Siwan) ka virtual assistant.\n\nAap humse tirpal (waterproof HDPE / Silpaulin), available sizes, rates, concrete dhalai plastic ya delivery ke baare me pooch sakte hain. Main aapki kya madad kar sakta hoon?`
        ),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  if (!isOpen) return null;

  return (
    <div
      id="om-setu-fullscreen-modal"
      className="fixed inset-0 z-[10000] w-full h-full bg-[#f6f9fd] flex flex-col antialiased overflow-hidden select-text animate-in fade-in duration-200"
    >
      {/* =================================================================
          FULL SCREEN HEADER: matching user theme
          linear-gradient(135deg, #052d6e, #087eef, #16c9f2)
      ================================================================== */}
      <header
        className="w-full shrink-0 flex items-center justify-between px-4 sm:px-6 py-3 text-white shadow-md z-30"
        style={{
          background: "linear-gradient(135deg, #052d6e 0%, #087eef 60%, #16c9f2 100%)",
        }}
      >
        <div className="flex items-center gap-3">
          {/* Bot Avatar */}
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-[18px] bg-white p-0.5 shadow-md flex items-center justify-center shrink-0">
            <img
              src={BOT_AVATAR}
              alt="Om Setu"
              className="w-full h-full rounded-[16px] object-cover bg-white"
            />
          </div>

          <div>
            <h1 className="font-extrabold text-base sm:text-lg tracking-tight leading-tight text-white flex items-center gap-2">
              <span>Om Setu AI</span>
              <span className="text-[10px] uppercase font-bold tracking-wider bg-white/20 px-2 py-0.5 rounded-full text-white/90">
                Assistant
              </span>
            </h1>
            <div className="flex items-center gap-1.5 text-xs text-sky-100 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#64ffae] shadow-xs animate-pulse"></span>
              <span>Online • Ready to help</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Voice Readout Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? "Mute Readout" : "Enable Readout"}
            className={`p-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              soundEnabled
                ? "bg-white text-[#052d6e]"
                : "bg-white/15 hover:bg-white/25 text-white"
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Reset Conversation */}
          <button
            onClick={handleReset}
            title="Reset Chat"
            className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer text-xs font-bold flex items-center gap-1"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Close Full Screen Chat */}
          <button
            onClick={onClose}
            id="closeChatBtn"
            aria-label="Close Chat"
            className="w-10 h-10 rounded-xl bg-white/15 hover:bg-white/25 text-white text-2xl font-light flex items-center justify-center transition-transform active:scale-95 cursor-pointer ml-1"
          >
            ×
          </button>
        </div>
      </header>

      {/* =================================================================
          DIRECT FULL SCREEN CONVERSATION INTERFACE
      ================================================================== */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[#f7faff]">
        {/* MESSAGES SCROLL AREA */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => {
            const isAssistant = msg.role === "assistant";
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${
                  isAssistant ? "justify-start" : "justify-end"
                } animate-in fade-in duration-150`}
              >
                {isAssistant && (
                  <div className="w-9 h-9 rounded-2xl bg-white border border-[#e2edf8] p-0.5 flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                    <img
                      src={BOT_AVATAR}
                      alt="Om Setu"
                      className="w-full h-full object-cover rounded-[14px] bg-white"
                    />
                  </div>
                )}

                <div
                  className={`max-w-[88%] sm:max-w-[75%] rounded-[20px] p-3.5 sm:p-4 text-[14px] sm:text-[15px] leading-relaxed shadow-xs ${
                    isAssistant
                      ? msg.isWarning
                        ? "bg-rose-50 text-rose-900 border-2 border-rose-300 font-bold rounded-tl-xs"
                        : "bg-white text-[#1b2638] font-bold border border-[#e7edf5] rounded-tl-xs shadow-[0_4px_16px_rgba(5,72,135,0.04)]"
                      : "text-white font-bold rounded-tr-xs shadow-md"
                  }`}
                  style={
                    !isAssistant
                      ? {
                          background: "linear-gradient(135deg, #0672dc, #12bcef)",
                        }
                      : undefined
                  }
                >
                  {msg.isWarning && (
                    <div className="flex items-center gap-1.5 text-rose-700 text-xs font-black mb-1 uppercase tracking-wider">
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>Security Alert</span>
                    </div>
                  )}

                  {/* REPLY FONT IN BOLD & NO ASTERISKS */}
                  <div className="whitespace-pre-line break-words font-bold select-text">
                    {cleanText(msg.content)}
                  </div>

                  <div
                    className={`text-[10px] mt-1.5 flex items-center justify-end font-mono ${
                      isAssistant ? "text-slate-400 font-normal" : "text-white/80 font-normal"
                    }`}
                  >
                    {msg.time}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Thinking / Loading Indicator */}
          {isLoading && (
            <div className="flex gap-3 justify-start items-center">
              <div className="w-9 h-9 rounded-2xl bg-white border border-[#e2edf8] p-0.5 flex items-center justify-center shrink-0">
                <img
                  src={BOT_AVATAR}
                  alt="Om Setu"
                  className="w-full h-full object-cover rounded-[14px]"
                />
              </div>
              <div className="bg-white border border-[#e7edf5] rounded-[18px] rounded-tl-xs px-4 py-2.5 shadow-xs flex items-center gap-2">
                <span className="text-xs font-bold text-[#06265d]">
                  Om Setu soch raha hai...
                </span>
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-[#087cf0] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-2 h-2 bg-[#087cf0] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-2 h-2 bg-[#087cf0] rounded-full animate-bounce"></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* QUICK SUGGESTIONS PILLS */}
        <div className="bg-white border-t border-[#e6edf5] px-3 py-2 sm:px-4 sm:py-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
          <span className="text-[11px] font-extrabold text-[#087cf0] uppercase tracking-wider shrink-0 flex items-center gap-1 pl-1">
            <Sparkles className="w-3.5 h-3.5" /> Suggestions:
          </span>
          {QUICK_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              disabled={isLoading}
              className="shrink-0 text-[11.5px] font-extrabold text-[#155282] bg-[#f8fbff] hover:bg-sky-50 border border-[#d7e6f8] hover:border-[#087cf0] px-3.5 py-1.5 rounded-full transition-all cursor-pointer disabled:opacity-50 active:scale-95 whitespace-nowrap"
            >
              {q}
            </button>
          ))}
        </div>

        {/* COMPOSER / INPUT AREA */}
        <div className="p-3 sm:p-4 bg-white border-t border-[#e6edf5] flex flex-col gap-2 shrink-0">
          {/* Listening Indicator */}
          {isListening && (
            <div className="bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center justify-between animate-pulse">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping"></span>
                Sun raha hoon... Boliye (Listening...)
              </span>
              <button
                onClick={toggleVoiceInput}
                className="text-sky-900 underline text-[11px] font-bold cursor-pointer"
              >
                Rokein
              </button>
            </div>
          )}

          <div className="flex items-center gap-2">
            {/* Voice Button */}
            <button
              type="button"
              onClick={toggleVoiceInput}
              title={isListening ? "Stop Voice" : "Voice Input (Boliye)"}
              className={`w-11 h-11 rounded-[14px] flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                isListening
                  ? "bg-rose-500 text-white shadow-lg animate-bounce"
                  : "bg-[#eaf7ff] hover:bg-[#d6f0ff] text-[#0575d8] border border-[#d0e8fc]"
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
              placeholder="Ask Om Setu anything..."
              className="flex-1 min-w-0 h-[46px] px-4 rounded-[14px] border border-[#dce5f0] focus:border-[#0a8ef1] focus:bg-white bg-[#f8fafd] text-[13.5px] font-bold text-slate-900 placeholder-slate-400 outline-none transition-all"
              disabled={isLoading}
            />

            {/* Send Button */}
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim() || isLoading}
              aria-label="Send message"
              className="w-11 h-11 rounded-[14px] text-white flex items-center justify-center shadow-md transition-transform active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shrink-0 cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #ff7900, #ffad00)",
              }}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          {/* Store Helpline Footer */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span className="hidden sm:inline font-medium">
              Om Shringar Tirpal Store (Maharajganj, Siwan) • Mr. Vinod Kumar Varnawal
            </span>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <a
                href="tel:+918210625483"
                className="inline-flex items-center gap-1 text-[#06265d] hover:text-[#087cf0] font-extrabold bg-[#f0f6fc] hover:bg-[#e4effb] px-3 py-1 rounded-lg border border-[#d6e3f2] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-orange-500" />
                <span>Call Store</span>
              </a>
              <a
                href="https://wa.me/918210625483?text=Namaste%20Vinod%20ji,%20Om%20Shringar%20Tirpal%20Store%20se%20tirpal%20ki%20inquiry%20karni%20hai."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-emerald-800 hover:text-emerald-900 font-extrabold bg-emerald-50 hover:bg-emerald-100 px-3 py-1 rounded-lg border border-emerald-200 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
