"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function EndingPage() {
  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-warm-black flex flex-col items-center justify-center text-center px-6">
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero_background.png"
          alt="Romantic Background"
          fill
          className="object-cover opacity-30 mix-blend-screen scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-warm-black via-warm-black/60 to-warm-black/60" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="relative z-10 w-full max-w-sm flex flex-col items-center"
      >
        <h1 className="text-2xl font-light text-cream-white mb-6 tracking-wide leading-relaxed">
          Thank You For Taking This Journey.
        </h1>
        
        <motion.h2 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-4xl font-bold text-soft-pink drop-shadow-lg"
        >
          Happy Birthday ❤️
        </motion.h2>
        <motion.h3 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-xl text-cream-white mt-2"
        >
          Arjaaaa
        </motion.h3>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-10 w-full text-center z-10"
      >
        <p className="text-cream-white/40 text-xs font-mono uppercase tracking-widest">
          Made with love by<br/>
          <span className="text-soft-pink font-semibold mt-1 inline-block">Papoyyy</span>
        </p>
      </motion.div>
    </div>
  );
}
