"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

const FULL_TEXT = `Congratulations.

You found every gift.
You completed every clue.

But the greatest gift for me\u2026

was simply getting to celebrate another birthday with you.

Thank you for taking this little journey I made just for you.

Happy Birthday,
my favorite person.

I love you,

always.`;

function CssConfetti() {
  const colors = ["#d4af37", "#f5c6d0", "#ffffff", "#ffd700", "#ff69b4", "#faf0e6"];
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(30)].map((_, i) => {
        const size = 4 + Math.random() * 6;
        const left = Math.random() * 100;
        const delay = Math.random() * 4;
        const duration = 3 + Math.random() * 3;
        return (
          <div
            key={i}
            className="absolute rounded-full animate-[confettiFall_linear_infinite]"
            style={{
              width: size,
              height: size,
              backgroundColor: colors[i % colors.length],
              left: `${left}%`,
              top: "-3%",
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}

export default function CompletePage() {
  const router = useRouter();
  const [displayedText, setDisplayedText] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const [bgWhite, setBgWhite] = useState(false);

  useEffect(() => {
    // Fade bg to white after 0.5s
    const t = setTimeout(() => setBgWhite(true), 500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    // Typewriter effect
    const startDelay = setTimeout(() => {
      let idx = 0;
      const interval = setInterval(() => {
        idx++;
        setDisplayedText(FULL_TEXT.slice(0, idx));
        if (idx >= FULL_TEXT.length) {
          clearInterval(interval);
          setTypingDone(true);
        }
      }, 40);
      return () => clearInterval(interval);
    }, 1500);
    return () => clearTimeout(startDelay);
  }, []);

  return (
    <div
      className={`min-h-[100dvh] flex flex-col items-center justify-center px-6 py-16 relative transition-colors duration-1000 ${
        bgWhite ? "bg-[#faf5ef]" : "bg-charcoal"
      }`}
    >
      <CssConfetti />

      <div className="w-full max-w-sm z-10 text-center">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-4xl font-bold text-charcoal mb-10 tracking-tight"
        >
          THE END ❤️
        </motion.h1>

        {/* Typewriter text */}
        <div className="text-charcoal/80 leading-relaxed whitespace-pre-wrap text-left font-light min-h-[400px] mb-10">
          {displayedText}
          {!typingDone && (
            <span className="inline-block w-0.5 h-5 bg-charcoal/60 ml-0.5 animate-pulse align-text-bottom" />
          )}
        </div>

        {/* After typing done */}
        {typingDone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {/* Divider */}
            <div className="text-charcoal/20 text-center mb-8 tracking-widest text-xs">
              ────────────────────
            </div>

            {/* Completed clues */}
            <div className="space-y-3 mb-10">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="flex items-center gap-3 bg-green-500/5 border border-green-500/20 rounded-xl px-4 py-3"
                >
                  <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-charcoal/70 font-medium text-sm">
                    Clue #{n}
                  </span>
                  <span className="ml-auto text-green-600 text-sm font-semibold">
                    ✅ Completed
                  </span>
                </div>
              ))}
            </div>

            {/* Button */}
            <button
              onClick={() => router.push("/treasure-hunt")}
              className="w-full py-4 bg-charcoal text-white rounded-full font-bold active:scale-95 transition-transform"
            >
              BACK TO HOME
            </button>
          </motion.div>
        )}
      </div>

      <style jsx>{`
        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
