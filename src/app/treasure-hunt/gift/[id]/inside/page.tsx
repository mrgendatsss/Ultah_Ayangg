"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import { CLUES } from "@/data/hunt-content";
import { useHuntProgress } from "@/hooks/useHuntProgress";

function FloatingHearts() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-lg"
          style={{ left: `${5 + Math.random() * 90}%`, bottom: "-10%" }}
          animate={{ y: [0, -window?.innerHeight ? -window.innerHeight * 1.2 : -900], opacity: [0, 0.7, 0], x: (Math.random() - 0.5) * 60 }}
          transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 5, ease: "easeOut" }}
        >
          {["❤️", "🩷", "🤍", "💕"][i % 4]}
        </motion.div>
      ))}
    </div>
  );
}

export default function InsideFlowPage() {
  const params = useParams();
  const id = Number(params.id);
  const router = useRouter();
  const { completeClue } = useHuntProgress();
  const [exiting, setExiting] = useState(false);

  const clue = CLUES.find((c) => c.id === id);

  if (!clue) {
    return (
      <div className="min-h-[100dvh] bg-charcoal flex items-center justify-center text-ivory">
        <p>Clue not found.</p>
      </div>
    );
  }

  const handleContinue = () => {
    setExiting(true);
    completeClue(id);
    setTimeout(() => {
      if (id >= 3) {
        router.push("/treasure-hunt/complete");
      } else {
        router.push("/treasure-hunt");
      }
    }, 600);
  };

  return (
    <div className="min-h-[100dvh] bg-charcoal text-ivory flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Gold glow behind card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />

      <FloatingHearts />

      <AnimatePresence>
        {!exiting && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-sm z-10"
          >
            {/* Card */}
            <div className="bg-white/5 border border-gold/20 rounded-3xl p-8 backdrop-blur-sm shadow-[0_0_40px_rgba(212,175,55,0.08)]">
              {/* Tag */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gold tracking-[0.2em] text-xs uppercase text-center mb-8 font-medium"
              >
                {clue.inside.tag}
              </motion.p>

              {/* Paragraphs - staggered fade in */}
              <div className="space-y-5 mb-10">
                {clue.inside.paragraphs.map((p, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.35 }}
                    className="text-ivory/90 text-center leading-relaxed font-light whitespace-pre-wrap"
                  >
                    {p}
                  </motion.p>
                ))}
              </div>

              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6 + clue.inside.paragraphs.length * 0.35 }}
                className="w-16 h-px bg-gold/30 mx-auto mb-6"
              />

              {/* Sign off */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + clue.inside.paragraphs.length * 0.35 }}
                className="text-gold text-center font-serif italic text-lg whitespace-pre-wrap"
              >
                {clue.inside.signOff}
              </motion.p>
            </div>

            {/* Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 + clue.inside.paragraphs.length * 0.35 }}
              className="mt-8 text-center"
            >
              <button
                onClick={handleContinue}
                className="px-8 py-4 bg-gold text-charcoal rounded-full font-bold active:scale-95 transition-transform shadow-[0_0_20px_rgba(212,175,55,0.3)]"
              >
                {clue.inside.button}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
