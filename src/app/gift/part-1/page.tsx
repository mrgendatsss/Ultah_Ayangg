"use client";

import { motion } from "framer-motion";
import { Gift, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function GiftPart1Page() {
  const [opened, setOpened] = useState(false);
  const { width, height } = useWindowSize();

  return (
    <div className="min-h-[100dvh] bg-warm-black text-ivory flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {opened && <Confetti width={width} height={height} recycle={false} numberOfPieces={500} colors={['#FFD700', '#FFF8DC', '#F5F5DC', '#FFFFFF']} />}
      
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm flex flex-col items-center z-10"
      >
        {!opened ? (
          <>
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mb-8"
            >
              <div className="w-32 h-32 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20 shadow-[0_0_50px_rgba(212,175,55,0.2)]">
                <Gift className="w-16 h-16 text-gold" />
              </div>
            </motion.div>
            
            <h1 className="text-3xl font-serif text-gold mb-2 text-center">First Gift Unlocked</h1>
            <p className="text-white/60 text-center mb-12">You found the first QR code! Tap the box to open your first present.</p>
            
            <button 
              onClick={() => setOpened(true)}
              className="px-8 py-4 bg-gold text-warm-black rounded-full font-bold shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all transform hover:scale-105"
            >
              Open Gift 1
            </button>
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl w-full"
          >
            <div className="text-4xl mb-4">📸</div>
            <h2 className="text-2xl font-serif text-gold mb-4">A Vintage Polaroid Camera</h2>
            <p className="text-white/80 mb-8 leading-relaxed">
              Because I know how much you love capturing moments. Now you can freeze our memories in physical form forever. I can't wait to fill an album with you.
            </p>
            
            <p className="text-white/50 text-sm mb-8 italic">
              Look under your bed for the physical gift.
            </p>

            <Link 
              href="/treasure-hunt"
              className="inline-flex items-center gap-2 text-gold hover:text-white transition-colors"
            >
              Continue the Hunt <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
