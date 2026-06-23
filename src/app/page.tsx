"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMusic } from "@/context/MusicContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

const quotes = [
  "Preparing something special...",
  "Collecting memories...",
  "Loading happiness..."
];

export default function Page01And02() {
  const router = useRouter();
  const { play, hasInteracted, setHasInteracted } = useMusic();
  const [stage, setStage] = useState<"modal" | "loading" | "landing">("modal");
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleModalChoice = (withMusic: boolean) => {
    if (withMusic) {
      play();
    } else {
      setHasInteracted(true); // they interacted but didn't play
    }
    setStage("loading");
  };

  useEffect(() => {
    let quoteInterval: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;

    if (stage === "loading") {
      quoteInterval = setInterval(() => {
        setQuoteIndex((prev) => (prev + 1) % quotes.length);
      }, 1000);

      progressInterval = setInterval(() => {
        setProgress((prev) => prev + 5);
      }, 150);
    }

    return () => {
      if (quoteInterval) clearInterval(quoteInterval);
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [stage]);

  useEffect(() => {
    if (progress >= 100 && stage === "loading") {
      setStage("landing");
    }
  }, [progress, stage]);

  const TypewriterText = ({ text }: { text: string }) => {
    const characters = Array.from(text);
    return (
      <motion.h1
        className="text-4xl font-bold tracking-tight text-cream-white mb-2 text-center"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 1 },
          visible: {
            transition: { staggerChildren: 0.08 },
          },
        }}
      >
        {characters.map((char, index) => (
          <motion.span
            key={index}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.h1>
    );
  };

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-warm-black flex items-center justify-center">
      
      {/* Background Image for all states */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero_background.png"
          alt="Romantic Background"
          fill
          className={`object-cover mix-blend-screen transition-all duration-1000 ${stage === 'loading' || stage === 'modal' ? 'opacity-30 blur-md scale-105' : 'opacity-60 blur-none scale-100'}`}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-warm-black via-warm-black/50 to-transparent" />
      </div>

      <AnimatePresence mode="wait">
        
        {/* MODAL STAGE */}
        {stage === "modal" && (
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="relative z-50 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl max-w-xs text-center shadow-2xl"
          >
            <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🎵</span>
            </div>
            <p className="text-cream-white font-medium mb-8 leading-relaxed">
              Untuk pengalaman terbaik, nyalakan suara dan gunakan earphone.
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => handleModalChoice(true)}
                className="bg-gold text-charcoal font-semibold py-3 px-6 rounded-xl w-full active:scale-95 transition-transform"
              >
                Play Music
              </button>
              <button 
                onClick={() => handleModalChoice(false)}
                className="bg-white/10 text-cream-white font-medium py-3 px-6 rounded-xl w-full active:scale-95 transition-transform"
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {/* LOADING STAGE */}
        {stage === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-50 flex flex-col items-center justify-center max-w-xs w-full px-4 text-center"
          >
            <h2 className="text-2xl font-bold text-cream-white mb-8">Loading Memories...</h2>
            
            <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden mb-8 relative">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-gold"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2, ease: "linear" }}
              />
            </div>

            <div className="relative w-full h-8 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={quoteIndex}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="text-cream-white/70 text-sm italic absolute text-center w-full"
                >
                  &quot;{quotes[quoteIndex]}&quot;
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* LANDING PAGE STAGE */}
        {stage === "landing" && (
          <motion.div
            key="landing"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-16 px-6"
          >
            {/* Floating Hearts/Particles */}
            <motion.div
              animate={{ y: [0, -40, 0], opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 left-1/4 w-32 h-32 bg-gold rounded-full blur-[70px] z-0 pointer-events-none"
            />

            <TypewriterText text="Happy Birthday" />
            
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="text-3xl font-bold text-ivory mb-2 text-center"
            >
              Arjaaaa sayang ❤️
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 1 }}
              className="text-gold/90 mb-10 text-center text-lg font-light"
            >
              Today is all about you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.8 }}
              className="w-full max-w-sm"
            >
              <button 
                onClick={() => router.push('/countdown')}
                className="group relative w-full flex items-center justify-center gap-2 bg-ivory text-charcoal py-4 rounded-full font-semibold text-lg overflow-hidden active:scale-95 transition-transform shadow-xl shadow-gold/20"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Journey
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
