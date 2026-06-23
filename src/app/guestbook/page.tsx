"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";

export default function GuestbookPage() {
  const router = useRouter();

  const comments = [
    { name: "Sarah", text: "Happy birthday!!! Have the best day ever ❤️", time: "2h ago" },
    { name: "Mom", text: "We love you so much dear.", time: "5h ago" },
    { name: "Alex", text: "Broooo happy birthday! Let's party later", time: "6h ago" },
  ];

  return (
    <div className="min-h-[100dvh] bg-[#f8f8f8] py-12 flex flex-col relative pt-safe">
      <div className="px-6 mb-8 text-center">
        <h1 className="text-3xl font-bold text-warm-black mb-2">Global Guestbook</h1>
        <p className="text-warm-black/60">Leave your final mark on this journey.</p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 space-y-4 mb-32">
        {comments.map((c, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-4 rounded-2xl shadow-sm border border-warm-black/5"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-warm-black">{c.name}</span>
              <span className="text-xs text-warm-black/40">{c.time}</span>
            </div>
            <p className="text-warm-black/80 text-sm leading-relaxed">{c.text}</p>
          </motion.div>
        ))}
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-md border-t border-warm-black/5 p-4 pb-12 flex flex-col gap-4 z-50">
        <div className="flex gap-2 max-w-lg mx-auto w-full">
          <input 
            type="text" 
            placeholder="Write a message..." 
            className="flex-1 bg-[#f8f8f8] border border-warm-black/10 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-soft-pink"
          />
          <button className="bg-soft-pink text-warm-black w-12 h-12 rounded-full flex items-center justify-center shrink-0 active:scale-95 transition-transform">
            <Send className="w-5 h-5 -ml-1" />
          </button>
        </div>
        
        <button 
          onClick={() => router.push('/ending')}
          className="text-xs font-bold uppercase tracking-widest text-warm-black/40 hover:text-warm-black text-center mt-2"
        >
          Finish Journey →
        </button>
      </div>
    </div>
  );
}
