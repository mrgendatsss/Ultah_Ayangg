"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Share2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Wish = {
  id: number;
  name: string;
  message: string;
  video_url: string | null;
  created_at: string;
};

export default function WishesFeedPage() {
  const router = useRouter();
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
    const { data, error } = await supabase
      .from("wishes")
      .select("*")
      .eq("status", "approved")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setWishes(data as Wish[]);
    }
    setLoading(false);
  };

  const handleNext = () => {
    if (currentIndex < wishes.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      router.push('/open-when');
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="h-[100dvh] w-full bg-warm-black flex items-center justify-center text-gold">
        Loading wishes...
      </div>
    );
  }

  if (wishes.length === 0) {
    return (
      <div className="h-[100dvh] w-full bg-warm-black flex flex-col items-center justify-center px-6 text-center">
        <h2 className="text-2xl font-serif text-gold mb-4">No Wishes Yet</h2>
        <p className="text-white/60 mb-8">It seems no wishes have been approved yet.</p>
        <button 
          onClick={() => router.push('/open-when')}
          className="px-6 py-3 bg-white/10 rounded-full text-white"
        >
          Continue Journey
        </button>
      </div>
    );
  }

  const currentWish = wishes[currentIndex];

  return (
    <div className="h-[100dvh] w-full bg-black overflow-hidden relative">
      <button onClick={() => router.back()} className="absolute top-12 left-4 z-50 text-white drop-shadow-md">
        <ArrowLeft className="w-8 h-8" />
      </button>

      <div className="absolute top-12 right-4 z-50 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-sm font-medium border border-white/20">
        {currentIndex + 1} / {wishes.length}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          onDragEnd={(e, { offset }) => {
            const swipe = offset.y;
            if (swipe < -50) handleNext();
            else if (swipe > 50) handlePrev();
          }}
          className="absolute inset-0 flex flex-col justify-end"
        >
          <div className="absolute inset-0">
            {currentWish.video_url ? (
              <video 
                src={currentWish.video_url} 
                autoPlay 
                loop 
                playsInline
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-warm-black to-zinc-900 flex items-center justify-center p-8">
                <p className="text-2xl font-serif text-gold text-center leading-relaxed">
                  "{currentWish.message}"
                </p>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 pointer-events-none" />
          </div>

          <div className="relative z-10 pb-12 px-4 flex justify-between items-end h-full pointer-events-none">
            <div className="flex-1 pb-6 pr-12 pointer-events-auto">
              <h2 className="text-white font-bold text-xl drop-shadow-md">@{currentWish.name}</h2>
              {currentWish.video_url && (
                <p className="text-white font-medium text-sm drop-shadow-md leading-relaxed mt-2 line-clamp-3">
                  {currentWish.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-6 items-center pb-6 pointer-events-auto">
              <button className="flex flex-col items-center text-white drop-shadow-md active:scale-90 transition-transform">
                <div className="bg-black/20 p-3 rounded-full backdrop-blur-sm mb-1">
                  <Heart className="w-7 h-7 fill-white/20" />
                </div>
              </button>
              <button className="flex flex-col items-center text-white drop-shadow-md active:scale-90 transition-transform">
                <div className="bg-black/20 p-3 rounded-full backdrop-blur-sm mb-1">
                  <MessageCircle className="w-7 h-7 fill-white/20" />
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-6 w-full text-center text-white/50 text-xs font-medium uppercase tracking-widest pointer-events-none z-50 animate-pulse">
        Swipe up for next
      </div>
    </div>
  );
}
