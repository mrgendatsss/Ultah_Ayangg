"use client";

import { motion } from "framer-motion";
import { Map, Scan, Lock } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function TreasureHuntPage() {
  const [isUnlocked, setIsUnlocked] = useState<boolean | null>(null);

  useEffect(() => {
    const checkLockStatus = async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("treasure_hunt_unlocked")
        .single();
      
      if (data) {
        setIsUnlocked(data.treasure_hunt_unlocked);
      }
    };
    checkLockStatus();
  }, []);

  if (isUnlocked === null) {
    return (
      <div className="min-h-[100dvh] bg-charcoal text-ivory flex items-center justify-center">
        <p className="text-gold animate-pulse">Loading surprise...</p>
      </div>
    );
  }

  if (!isUnlocked) {
    return (
      <div className="min-h-[100dvh] bg-charcoal text-ivory flex flex-col items-center justify-center px-6 relative">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center z-10"
        >
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-gold/20 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
            <Lock className="w-8 h-8 text-gold/70" />
          </div>
          
          <h1 className="text-3xl font-serif text-gold mb-6 leading-tight">
            See You In Semarang
          </h1>
          
          <div className="bg-white/5 border border-gold/10 p-8 rounded-3xl backdrop-blur-sm">
            <p className="text-ivory/80 text-lg leading-relaxed font-light italic">
              "Masih ada hadiah spesial dari aku yang menunggu kamu sampai di Semarang ❤️"
            </p>
            <div className="mt-8 pt-6 border-t border-gold/10">
              <p className="text-sm text-ivory/50 uppercase tracking-widest">
                Surprise Locked
              </p>
              <p className="text-xs text-ivory/40 mt-2">
                Have a safe trip, sayang.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-charcoal text-ivory flex flex-col items-center justify-center px-6 relative">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-gold/20 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
            <Map className="w-10 h-10 text-gold" />
          </div>
          <h1 className="text-4xl font-serif text-gold mb-4">The Final Hunt</h1>
          <p className="text-ivory/80 leading-relaxed font-light">
            Welcome to Semarang! I've hidden 3 gifts around the room for you. Each one has a QR code attached to it. Find them and scan them to unlock the rest of your birthday journey.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 border border-gold/30 p-6 rounded-2xl relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 left-0 w-1 h-full bg-gold shadow-[0_0_10px_rgba(212,175,55,1)]" />
            <h3 className="font-serif font-bold text-xl mb-2 text-gold">Clue #1</h3>
            <p className="text-ivory/80 text-sm italic font-light">
              "Where you go to dream every night, but sometimes you just scroll TikTok instead."
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 left-0 w-1 h-full bg-white/20" />
            <h3 className="font-serif font-bold text-xl mb-2 text-white/50">Clue #2</h3>
            <p className="text-white/40 text-sm italic font-light">
              Locked until you find Gift 1
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 left-0 w-1 h-full bg-white/20" />
            <h3 className="font-serif font-bold text-xl mb-2 text-white/50">Clue #3</h3>
            <p className="text-white/40 text-sm italic font-light">
              Locked until you find Gift 2
            </p>
          </div>
        </div>

        <div className="mt-12 text-center pb-12">
          <Link 
            href="/scan"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-charcoal rounded-full font-bold shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all transform hover:scale-105"
          >
            <Scan className="w-5 h-5" /> Open Scanner
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
