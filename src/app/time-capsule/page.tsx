"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TimeCapsulePage() {
  const router = useRouter();
  const [locked, setLocked] = useState(false);

  const handleLock = (e: React.FormEvent) => {
    e.preventDefault();
    setLocked(true);
    setTimeout(() => {
      router.push('/guestbook');
    }, 3000);
  };

  return (
    <div className="min-h-[100dvh] bg-[#f8f8f8] py-16 px-6 flex flex-col items-center justify-center relative pt-safe">
      <div className="absolute top-0 left-0 w-full h-1 bg-warm-black/10" />
      
      {!locked ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl border border-warm-black/5"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-warm-black mb-2">Time Capsule</h1>
            <p className="text-warm-black/60 text-sm leading-relaxed">Leave a message for future you. It will be locked until your next birthday.</p>
          </div>

          <form onSubmit={handleLock} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-warm-black mb-1">Message to Future You</label>
              <textarea required rows={5} className="w-full p-3 rounded-xl border border-warm-black/10 bg-[#f8f8f8] focus:outline-none focus:ring-2 focus:ring-soft-pink" placeholder="Dear future me..."></textarea>
            </div>

            <div className="bg-soft-pink/10 rounded-xl p-4 flex items-center gap-3">
              <Lock className="w-5 h-5 text-soft-pink" />
              <div className="text-sm">
                <span className="block font-semibold text-warm-black">Unlock Date</span>
                <span className="text-warm-black/60">June 25, 2027</span>
              </div>
            </div>

            <button type="submit" className="w-full bg-warm-black text-cream-white py-4 rounded-xl font-bold text-lg active:scale-95 transition-transform mt-4 shadow-lg shadow-warm-black/20">
              Lock Capsule
            </button>
          </form>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-sm"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
          >
            <CheckCircle2 className="w-24 h-24 text-soft-pink mx-auto mb-6" />
          </motion.div>
          <h2 className="text-3xl font-bold text-warm-black mb-4">Capsule Locked!</h2>
          <p className="text-warm-black/60 leading-relaxed font-medium">See you next year. Redirecting...</p>
        </motion.div>
      )}
    </div>
  );
}
