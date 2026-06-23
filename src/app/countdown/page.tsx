"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

// Set this to the actual birthday
const BIRTHDAY_DATE = new Date().getTime() + 10000; // Mock: 10 seconds from load for demo purposes

export default function CountdownPage() {
  const router = useRouter();
  const { width, height } = useWindowSize();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isFinished, setIsFinished] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = BIRTHDAY_DATE - now;

      if (distance <= 0) {
        clearInterval(interval);
        setIsFinished(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-warm-black flex flex-col items-center justify-center px-6">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-warm-black via-[#3a2f30] to-warm-black z-0" />
      
      {isFinished && <Confetti width={width} height={height} recycle={true} colors={['#F8C8DC', '#E6E6FA', '#FDFBF7']} />}

      <div className="relative z-10 w-full max-w-sm flex flex-col items-center text-center">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-soft-pink font-semibold tracking-widest uppercase text-sm mb-4"
        >
          {isFinished ? "It's Finally Here" : "The Journey Begins In"}
        </motion.h2>

        {/* Countdown Grid */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-4 gap-3 w-full mb-16"
        >
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Mins", value: timeLeft.minutes },
            { label: "Secs", value: timeLeft.seconds }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className={`w-full aspect-square flex items-center justify-center rounded-2xl border ${isFinished ? 'bg-soft-pink border-soft-pink text-warm-black' : 'bg-white/5 border-white/10 text-cream-white'} shadow-lg mb-3 transition-colors duration-1000`}>
                <span className="text-2xl sm:text-3xl font-bold font-mono">{String(item.value).padStart(2, '0')}</span>
              </div>
              <span className="text-[10px] sm:text-xs text-cream-white/50 uppercase tracking-wider">{item.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Action Area */}
        <div className="h-20 w-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!isFinished ? (
              <motion.p
                key="waiting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-cream-white/60 italic text-sm"
              >
                Hold tight. The magic unlocks when the clock strikes zero.
              </motion.p>
            ) : (
              <motion.button
                key="unlocked"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                onClick={() => router.push('/letter')}
                className="group relative w-full flex items-center justify-center gap-2 bg-cream-white text-warm-black py-4 rounded-full font-bold text-lg overflow-hidden active:scale-95 transition-transform shadow-[0_0_40px_rgba(248,200,220,0.4)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Begin My Birthday Journey
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
