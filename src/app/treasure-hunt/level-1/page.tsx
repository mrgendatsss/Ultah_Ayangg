"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function TreasureHuntLevel1Page() {
  return (
    <div className="min-h-[100dvh] bg-[#f8f8f8] py-20 px-6 flex flex-col items-center justify-center relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-xl text-center border border-warm-black/5 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-soft-pink" />
        
        <div className="w-16 h-16 bg-soft-pink/10 rounded-full flex items-center justify-center mx-auto mb-6 text-soft-pink">
          <Search className="w-8 h-8" />
        </div>
        
        <h2 className="text-sm font-bold tracking-widest text-warm-black/40 uppercase mb-2">Level 1</h2>
        <h1 className="text-2xl font-bold text-warm-black mb-6">The First Clue</h1>
        
        <div className="bg-warm-black/5 rounded-2xl p-6 mb-8 italic text-warm-black/80 font-medium">
          "Look where comfort always waits for you. Where we watch movies on lazy Sundays."
        </div>

        <p className="text-sm text-warm-black/60 mb-6">
          Find the physical gift and scan the QR code attached to it to unlock the next level.
        </p>

        {/* Loading animation to simulate waiting for scan */}
        <div className="flex items-center justify-center gap-2 text-warm-black/40 text-xs font-medium tracking-widest uppercase">
          <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }}>Waiting</motion.div>
          <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}>for</motion.div>
          <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}>scan...</motion.div>
        </div>
      </motion.div>
    </div>
  );
}
