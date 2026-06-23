"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Music, VolumeX } from "lucide-react";
import { useMusic } from "@/context/MusicContext";

export default function MusicPlayer() {
  const { isPlaying, togglePlay, hasInteracted } = useMusic();

  if (!hasInteracted) return null; // Only show floating widget after they interact with the modal

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      onClick={togglePlay}
      className="fixed bottom-6 right-6 z-[100] w-12 h-12 bg-warm-black/80 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center text-cream-white shadow-xl shadow-warm-black/20"
    >
      <AnimatePresence mode="wait">
        {isPlaying ? (
          <motion.div
            key="playing"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="relative flex items-center justify-center w-full h-full"
          >
            <Music className="w-5 h-5 absolute" />
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 m-auto w-10 h-10 border border-dashed border-white/30 rounded-full"
            />
          </motion.div>
        ) : (
          <motion.div
            key="paused"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
          >
            <VolumeX className="w-5 h-5 opacity-60" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
