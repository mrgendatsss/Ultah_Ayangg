"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import { Scan, Check, Gift, Sparkles } from "lucide-react";
import { CLUES } from "@/data/hunt-content";
import { useHuntProgress } from "@/hooks/useHuntProgress";

function SparklesBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-gold/40 rounded-full"
          style={{ left: `${10 + Math.random() * 80}%`, top: `${10 + Math.random() * 80}%` }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
          transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 3 }}
        />
      ))}
    </div>
  );
}

function ConfettiParticles() {
  const colors = ["#d4af37", "#f5c6d0", "#ffffff", "#ffd700", "#ff69b4"];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: colors[i % colors.length],
            left: `${Math.random() * 100}%`,
            top: "-5%",
          }}
          animate={{ y: ["0vh", "110vh"], x: [0, (Math.random() - 0.5) * 100], rotate: [0, 720] }}
          transition={{ duration: 2.5 + Math.random() * 2, delay: Math.random() * 1.5, ease: "easeIn" }}
        />
      ))}
    </div>
  );
}

export default function OutsideFlowPage() {
  const params = useParams();
  const id = Number(params.id);
  const router = useRouter();
  const { completeOutside } = useHuntProgress();

  const clue = CLUES.find((c) => c.id === id);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showError, setShowError] = useState(false);
  const [shake, setShake] = useState(false);

  if (!clue) {
    return (
      <div className="min-h-[100dvh] bg-charcoal flex items-center justify-center text-ivory">
        <p>Clue not found.</p>
      </div>
    );
  }

  const handleSubmit = () => {
    if (selected === null) return;
    if (selected === clue.outside.question.correctIndex) {
      setStep(2);
    } else {
      setShowError(true);
      setShake(true);
      setTimeout(() => { setShake(false); setShowError(false); setSelected(null); }, 1500);
    }
  };

  const handleOpenGift = () => {
    setStep(3);
    completeOutside(id);
    setTimeout(() => setStep(4), 3000);
  };

  return (
    <div className="min-h-[100dvh] bg-charcoal text-ivory flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl" />

      <AnimatePresence mode="wait">
        {/* STEP 0: INTRO */}
        {step === 0 && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-sm text-center z-10 relative"
          >
            <SparklesBg />
            <Sparkles className="w-8 h-8 text-gold/50 mx-auto mb-6" />
            <h1 className="text-3xl font-serif text-gold mb-8 leading-relaxed">
              {clue.outside.intro.title}
            </h1>
            <div className="space-y-4 mb-12">
              {clue.outside.intro.lines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.4 }}
                  className="text-ivory/80 text-lg font-light leading-relaxed whitespace-pre-wrap"
                >
                  {line}
                </motion.p>
              ))}
            </div>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              onClick={() => setStep(1)}
              className="px-8 py-4 bg-gold text-charcoal rounded-full font-bold active:scale-95 transition-transform"
            >
              Continue
            </motion.button>
          </motion.div>
        )}

        {/* STEP 1: QUESTION */}
        {step === 1 && (
          <motion.div
            key="question"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`w-full max-w-sm z-10 ${shake ? "animate-[shake_0.3s_ease-in-out]" : ""}`}
          >
            <h2 className="text-2xl font-serif text-gold mb-4 text-center">
              {clue.outside.question.title}
            </h2>
            <p className="text-ivory/80 text-center mb-8 font-light leading-relaxed">
              {clue.outside.question.text}
            </p>

            <div className="space-y-3 mb-8">
              {clue.outside.question.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => { setSelected(i); setShowError(false); }}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selected === i
                      ? "border-gold bg-gold/10 text-gold"
                      : "border-white/10 bg-white/5 text-ivory/80 hover:bg-white/10"
                  }`}
                >
                  <span className={`inline-block w-5 h-5 rounded-full border-2 mr-3 align-middle ${
                    selected === i ? "border-gold bg-gold" : "border-white/30"
                  }`} />
                  {opt}
                </button>
              ))}
            </div>

            {showError && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm text-center mb-4"
              >
                Not quite right, try again.
              </motion.p>
            )}

            <button
              onClick={handleSubmit}
              disabled={selected === null}
              className="w-full py-4 bg-gold text-charcoal rounded-full font-bold disabled:opacity-30 active:scale-95 transition-all"
            >
              Submit
            </button>
          </motion.div>
        )}

        {/* STEP 2: CORRECT */}
        {step === 2 && (
          <motion.div
            key="correct"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-sm text-center z-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.2 }}
              className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border-2 border-green-500/30"
            >
              <Check className="w-12 h-12 text-green-400" />
            </motion.div>

            <h2 className="text-3xl font-serif text-gold mb-8">
              {clue.outside.correct.title}
            </h2>
            <div className="space-y-3 mb-12">
              {clue.outside.correct.lines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.3 }}
                  className="text-ivory/80 text-xl font-light italic"
                >
                  {line}
                </motion.p>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              onClick={handleOpenGift}
              className="px-8 py-4 bg-gold text-charcoal rounded-full font-bold active:scale-95 transition-transform shadow-[0_0_20px_rgba(212,175,55,0.4)]"
            >
              🎁 {clue.outside.giftButton}
            </motion.button>
          </motion.div>
        )}

        {/* STEP 3: GIFT OPENING ANIMATION */}
        {step === 3 && (
          <motion.div
            key="opening"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-sm text-center z-10 relative"
          >
            <ConfettiParticles />
            <motion.div
              animate={{ scale: [1, 1.3, 1.1], rotate: [0, -10, 10, 0] }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="text-8xl mb-8"
            >
              🎁
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-gold text-2xl font-serif"
            >
              Opening your gift...
            </motion.p>
          </motion.div>
        )}

        {/* STEP 4: SCAN INSIDE PROMPT */}
        {step === 4 && (
          <motion.div
            key="scaninside"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-sm text-center z-10"
          >
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-gold/20">
              <Scan className="w-8 h-8 text-gold" />
            </div>
            <h2 className="text-2xl font-serif text-gold mb-4">
              Scan the QR code inside your gift.
            </h2>
            <p className="text-ivory/60 font-light mb-12">
              {clue.outside.scanInsideText}
            </p>
            <button
              onClick={() => router.push("/scan")}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-charcoal rounded-full font-bold active:scale-95 transition-transform"
            >
              <Scan className="w-5 h-5" /> OPEN SCANNER
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
      `}</style>
    </div>
  );
}
