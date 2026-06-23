"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LetterPage() {
  const router = useRouter();
  const [showButton, setShowButton] = useState(false);

  const letterText = "Kalau kamu lagi baca ini, berarti hari yang aku tunggu akhirnya datang. Aku cuma mau bilang kalau aku bersyukur banget bisa ada di hidup kamu. Enjoy this little journey I made just for you.";

  // Calculate delay based on letter length
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, letterText.length * 50 + 1000); // 50ms per char + 1s buffer
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-warm-black flex flex-col items-center justify-center px-8">
      {/* Background Blur */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero_background.png"
          alt="Background"
          fill
          className="object-cover opacity-20 blur-xl scale-110"
        />
      </div>

      <div className="relative z-10 w-full max-w-sm flex flex-col h-full py-20 justify-between">
        <div className="flex-1 flex items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 1 },
              visible: {
                transition: { staggerChildren: 0.05 },
              },
            }}
            className="text-2xl md:text-3xl font-light text-cream-white leading-relaxed"
          >
            {Array.from(letterText).map((char, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showButton ? 1 : 0 }}
          className="pb-10"
        >
          <button
            onClick={() => router.push('/timeline')}
            disabled={!showButton}
            className="w-full bg-soft-pink text-warm-black font-semibold py-4 rounded-full active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(248,200,220,0.3)]"
          >
            Continue
          </button>
        </motion.div>
      </div>
    </div>
  );
}
