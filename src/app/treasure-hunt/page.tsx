"use client";

import { motion } from "framer-motion";
import { Map, Lock, Scan, Check, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useHuntProgress, type ClueStatus } from "@/hooks/useHuntProgress";
import { CLUES } from "@/data/hunt-content";

function ClueCard({
  clue,
  status,
  index,
}: {
  clue: (typeof CLUES)[0];
  status: ClueStatus;
  index: number;
}) {
  const isAvailable = status === "available";
  const isOutsideDone = status === "outside_done";
  const isCompleted = status === "completed";
  const isLocked = status === "locked";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.15 }}
      className={`relative overflow-hidden rounded-2xl p-6 border backdrop-blur-sm ${
        isCompleted
          ? "bg-green-500/5 border-green-500/20"
          : isAvailable || isOutsideDone
          ? "bg-white/5 border-gold/30"
          : "bg-white/5 border-white/10"
      }`}
    >
      {/* Left accent bar */}
      <div
        className={`absolute top-0 left-0 w-1 h-full ${
          isCompleted
            ? "bg-green-500"
            : isAvailable || isOutsideDone
            ? "bg-gold shadow-[0_0_10px_rgba(212,175,55,1)]"
            : "bg-white/20"
        }`}
      />

      <div className="flex justify-between items-start">
        <div className="flex-1 pr-4">
          <h3
            className={`font-serif font-bold text-xl mb-2 ${
              isCompleted
                ? "text-green-400/70"
                : isAvailable || isOutsideDone
                ? "text-gold"
                : "text-white/40"
            }`}
          >
            Clue #{clue.id}
          </h3>

          {isLocked ? (
            <p className="text-white/40 text-sm italic font-light">
              🔒 Locked until you complete the previous clue.
            </p>
          ) : isCompleted ? (
            <p className="text-green-400/60 text-sm font-medium">
              ✅ Completed
            </p>
          ) : isOutsideDone ? (
            <p className="text-amber-400 text-sm italic font-light">
              📦 Scan the QR inside the gift to continue.
            </p>
          ) : (
            <>
              <p
                className={`text-ivory/80 text-sm italic font-light mb-2 ${
                  isAvailable ? "" : "text-white/40"
                }`}
              >
                {clue.hub.title}
              </p>
              <p className="text-ivory/50 text-xs font-light whitespace-pre-wrap">
                {clue.hub.subtitle}
              </p>
              <p className="text-green-400 text-xs mt-3 font-medium">
                🟢 Available
              </p>
            </>
          )}
        </div>

        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
            isCompleted
              ? "bg-green-500/10"
              : isAvailable || isOutsideDone
              ? "bg-gold/10"
              : "bg-white/5"
          }`}
        >
          {isCompleted ? (
            <Check className="w-6 h-6 text-green-400" />
          ) : isLocked ? (
            <Lock className="w-5 h-5 text-white/30" />
          ) : (
            <ChevronRight className="w-6 h-6 text-gold" />
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function TreasureHuntPage() {
  const router = useRouter();
  const [isUnlocked, setIsUnlocked] = useState<boolean | null>(null);
  const { progress, loaded, isAllComplete } = useHuntProgress();

  useEffect(() => {
    const checkLock = async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("treasure_hunt_unlocked")
        .single();
      setIsUnlocked(data?.treasure_hunt_unlocked ?? false);
    };
    checkLock();
  }, []);

  if (isUnlocked === null || !loaded) {
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
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-gold/20">
            <Lock className="w-8 h-8 text-gold/70" />
          </div>
          <h1 className="text-3xl font-serif text-gold mb-6">
            See You In Semarang
          </h1>
          <div className="bg-white/5 border border-gold/10 p-8 rounded-3xl backdrop-blur-sm">
            <p className="text-ivory/80 text-lg leading-relaxed font-light italic">
              &quot;Masih ada hadiah spesial dari aku yang menunggu kamu sampai
              di Semarang ❤️&quot;
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  const statuses: ClueStatus[] = [
    progress.clue1,
    progress.clue2,
    progress.clue3,
  ];

  return (
    <div className="min-h-[100dvh] bg-charcoal text-ivory flex flex-col items-center px-6 py-16 relative">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-gold/20 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
            <Map className="w-10 h-10 text-gold" />
          </div>
          <h1 className="text-4xl font-serif text-gold mb-6 tracking-tight">
            The Final Hunt
          </h1>
          <p className="text-ivory/80 leading-relaxed font-light">
            Welcome to Semarang! I&apos;ve hidden 3 gifts around the room for you.
            Each one has a QR code attached to it. Find them and scan them to
            unlock the rest of your birthday journey.
          </p>
        </div>

        {/* Clue Cards */}
        <div className="space-y-4 mb-12">
          {CLUES.map((clue, i) => (
            <ClueCard key={clue.id} clue={clue} status={statuses[i]} index={i} />
          ))}
        </div>

        {/* Action Button */}
        <div className="text-center pb-8">
          {isAllComplete ? (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => router.push("/treasure-hunt/complete")}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gold to-amber-400 text-charcoal rounded-full font-bold shadow-[0_0_30px_rgba(212,175,55,0.4)] active:scale-95 transition-transform"
            >
              ✨ View Final Message
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          ) : (
            <button
              onClick={() => router.push("/scan")}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-charcoal rounded-full font-bold shadow-[0_0_20px_rgba(212,175,55,0.4)] active:scale-95 transition-transform"
            >
              <Scan className="w-5 h-5" /> OPEN SCANNER
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
