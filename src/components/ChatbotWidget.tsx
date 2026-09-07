import React from 'react';
import { MessageCircle } from 'lucide-react';

interface ChatbotWidgetProps {
  onClick: () => void;
}

export default function ChatbotWidget({ onClick }: ChatbotWidgetProps) {
  return (
    <div className="flex justify-center my-10 px-4">
      <button
        onClick={onClick}
        className="flex items-center gap-4 bg-white text-brand-blue-dark font-bold text-base px-6 py-4 rounded-full shadow-lg border border-orange-100 hover:scale-105 transition-transform group w-full max-w-xs justify-center"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-orange-400 rounded-full animate-ping opacity-50"></div>
          <img
            src="https://plain-apac-prod-public.komododecks.com/202609/07/u9gkonoHbUx72eTNh7GG/image.png"
            alt="Chatbot"
            className="w-16 h-16 rounded-full object-cover animate-bounce relative z-10"
          />
        </div>
        <span className="text-lg group-hover:text-orange-600 transition-colors">Ask anything to Om Setu</span>
      </button>
    </div>
  );
}
