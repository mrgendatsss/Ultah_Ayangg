"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";

export default function LockedPage() {
  return (
    <div className="min-h-[100dvh] bg-warm-black flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-sm"
      >
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
          <Lock className="w-8 h-8 text-cream-white/50" />
        </div>
        <h1 className="text-2xl font-bold text-cream-white mb-2 tracking-wide">Not Yet Time</h1>
        <p className="text-cream-white/60 font-light leading-relaxed">
          The journey is currently locked. Check back on the special day.
        </p>
      </motion.div>
    </div>
  );
}
