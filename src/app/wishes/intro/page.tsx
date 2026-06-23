"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Play } from "lucide-react";

export default function WishesIntroPage() {
  const router = useRouter();

  return (
    <div className="h-[100dvh] w-full bg-warm-black flex flex-col items-center justify-center text-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-sm"
      >
        <div className="w-20 h-20 bg-soft-pink/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="text-4xl">🎥</span>
        </div>
        <h1 className="text-3xl font-bold text-cream-white mb-4 leading-tight">
          Special Messages From People Who Love You
        </h1>
        <p className="text-soft-pink/80 mb-12">
          We asked your favorite people to say a few words.
        </p>

        <button 
          onClick={() => router.push('/wishes')}
          className="w-full flex items-center justify-center gap-2 bg-soft-pink text-warm-black py-4 px-8 rounded-full font-bold text-lg active:scale-95 transition-transform"
        >
          <Play className="w-5 h-5 fill-current" />
          Watch Messages
        </button>
      </motion.div>
    </div>
  );
}
