"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const slides = [
  { id: 1, title: "Subject", value: "Arjaaaa", subtitle: "Main Character Energy" },
  { id: 2, title: "Age Unlocked", value: "Level Up", subtitle: "Gaining more wisdom, and beauty." },
  { id: 3, title: "Special Skills", value: "Making Everyone Smile", subtitle: "(And being effortlessly gorgeous)" },
];

export default function WhoIsShePage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    if (index < slides.length - 1) {
      setIndex(index + 1);
    } else {
      router.push("/wrapped");
    }
  };

  return (
    <div className="min-h-[100dvh] bg-warm-black text-cream-white flex flex-col items-center justify-center relative overflow-hidden" onClick={nextSlide}>
      <div className="absolute inset-0 z-0 opacity-20">
        <Image src="/hero_background.png" alt="bg" fill className="object-cover blur-xl scale-110" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6 w-full max-w-md"
        >
          <h2 className="text-soft-pink uppercase tracking-[0.3em] text-xs font-bold mb-4">{slides[index].title}</h2>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight drop-shadow-lg">{slides[index].value}</h1>
          <p className="text-cream-white/70 italic text-lg">{slides[index].subtitle}</p>
        </motion.div>
      </AnimatePresence>

      {/* Progress */}
      <div className="absolute top-12 left-0 w-full px-6 flex gap-2 z-20">
        {slides.map((_, i) => (
          <div key={i} className={`h-1 flex-1 rounded-full ${i <= index ? 'bg-soft-pink' : 'bg-white/20'}`} />
        ))}
      </div>

      <div className="absolute bottom-12 w-full text-center z-20 pointer-events-none">
        <p className="text-cream-white/40 text-xs tracking-widest uppercase flex items-center justify-center gap-1">
          Tap anywhere <ChevronRight className="w-4 h-4" />
        </p>
      </div>
    </div>
  );
}
