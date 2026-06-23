"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { Gift } from "lucide-react";
import Image from "next/image";

export default function FinalGiftPage() {
  const router = useRouter();
  const { width, height } = useWindowSize();
  const [stage, setStage] = useState<"intro" | "reveal">("intro");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="h-[100dvh] w-full bg-warm-black flex flex-col items-center justify-center text-center relative overflow-hidden">
      
      {stage === "reveal" && (
        <div className="absolute inset-0 z-0">
          <Confetti width={width} height={height} recycle={true} colors={['#F8C8DC', '#E6E6FA', '#FDFBF7', '#FFD700']} />
        </div>
      )}

      {stage === "intro" ? (
        <motion.div
          key="intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative z-10 px-6 max-w-sm"
        >
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-4xl font-bold text-cream-white mb-16 leading-tight"
          >
            One More Thing...
          </motion.h1>

          <motion.button 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 2 }}
            onClick={() => setStage("reveal")}
            className="w-full flex items-center justify-center gap-2 bg-cream-white text-warm-black py-4 px-8 rounded-full font-bold text-lg active:scale-95 transition-transform shadow-[0_0_50px_rgba(253,251,247,0.4)]"
          >
            <Gift className="w-5 h-5" />
            Open My Gift
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          key="reveal"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 px-6 w-full max-w-md h-full py-16 flex flex-col items-center"
        >
          <h2 className="text-3xl font-bold text-soft-pink mb-2">Surprise!</h2>
          <h3 className="text-xl text-cream-white font-medium mb-8">Trip to Singapore ✈️</h3>

          <div className="flex-1 w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 mb-8 flex flex-col items-center justify-center shadow-2xl overflow-y-auto no-scrollbar">
            <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-6 relative">
              <img 
                src="https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1000&auto=format&fit=crop" 
                alt="Singapore" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-cream-white text-lg leading-relaxed mb-6 font-light">
              Pack your bags! We are going on a 4-day trip to Singapore next month. I've booked the flights, the hotel, and even tickets to Universal Studios. I can't wait to explore the city with you.
            </p>
            <p className="text-soft-pink font-semibold">Love, Papoyyy</p>
          </div>

          <button 
            onClick={() => router.push('/compilation')}
            className="w-full bg-soft-pink text-warm-black py-4 rounded-full font-bold text-lg active:scale-95 transition-transform"
          >
            See What's Next
          </button>
        </motion.div>
      )}
    </div>
  );
}
