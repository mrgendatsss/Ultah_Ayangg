"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import { Unlock, ChevronRight } from "lucide-react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function UnlockStagePage() {
  const router = useRouter();
  const params = useParams();
  const stage = params.stage as string;
  const { width, height } = useWindowSize();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const getStageContent = () => {
    switch(stage) {
      case "2":
        return {
          title: "Level 2 Unlocked!",
          message: "You found the first gift! I hope you like it.",
          nextClue: "For the next one, think about where we had our first dinner together.",
          nextUrl: "/treasure-hunt/level-3" // Mocking flow
        };
      case "3":
        return {
          title: "Level 3 Unlocked!",
          message: "You're getting good at this.",
          nextClue: "The final surprise is waiting where you start your day.",
          nextUrl: "/final-gift"
        };
      default:
        return {
          title: "Secret Unlocked!",
          message: "You found a secret page.",
          nextClue: "Keep looking around.",
          nextUrl: "/final-gift"
        };
    }
  };

  const content = getStageContent();

  if (!mounted) return null;

  return (
    <div className="min-h-[100dvh] bg-warm-black flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      <Confetti width={width} height={height} recycle={false} numberOfPieces={200} colors={['#F8C8DC', '#E6E6FA', '#FDFBF7']} />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="relative z-10 w-full max-w-sm"
      >
        <div className="w-24 h-24 bg-cream-white text-warm-black rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(253,251,247,0.3)]">
          <Unlock className="w-10 h-10" />
        </div>

        <h1 className="text-3xl font-bold text-cream-white mb-2">{content.title}</h1>
        <p className="text-cream-white/80 mb-10 text-lg">{content.message}</p>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-10">
          <h3 className="text-soft-pink text-xs font-bold uppercase tracking-widest mb-3">Next Clue</h3>
          <p className="text-cream-white font-medium italic">"{content.nextClue}"</p>
        </div>

        <button 
          onClick={() => router.push(content.nextUrl)}
          className="w-full flex items-center justify-center gap-2 bg-soft-pink text-warm-black py-4 rounded-full font-bold text-lg active:scale-95 transition-transform"
        >
          Continue
          <ChevronRight className="w-5 h-5" />
        </button>
      </motion.div>
    </div>
  );
}
