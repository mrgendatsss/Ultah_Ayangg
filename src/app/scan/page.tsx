"use client";

import { useState, useRef, useCallback } from "react";
import { useZxing } from "react-zxing";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ScanLine, ArrowLeft } from "lucide-react";
import { QR_MAP } from "@/data/hunt-content";

export default function ScanPage() {
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const hasScanned = useRef(false);

  const handleQRCode = useCallback((text: string) => {
    if (hasScanned.current) return;

    const entry = QR_MAP[text];
    if (entry) {
      hasScanned.current = true;
      setResult(text);
      const path = `/treasure-hunt/gift/${entry.clueId}/${entry.type}`;
      setTimeout(() => router.push(path), 600);
    } else {
      setError("QR Code ini bukan bagian dari journey ini.");
      setTimeout(() => setError(""), 3000);
    }
  }, [router]);

  const { ref } = useZxing({
    onDecodeResult(result) {
      handleQRCode(result.getText());
    },
    onError(error: unknown) {
      if (error instanceof Error && error.name !== "NotFoundException") {
        console.error(error);
      }
    },
  });

  return (
    <div className="min-h-[100dvh] bg-charcoal text-ivory flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm flex flex-col items-center z-10"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-serif text-gold mb-2">Unlock a Gift</h1>
          <p className="text-white/60 text-sm">
            Point your camera at the QR code you found.
          </p>
        </div>

        <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-black/50 border border-white/10 shadow-2xl backdrop-blur-sm">
          <video ref={ref} className="w-full h-full object-cover" />

          {/* Scanner overlay */}
          <div className="absolute inset-0 border-[3px] border-gold/30 rounded-3xl m-8" />
          <div className="absolute inset-0 flex items-center justify-center">
            <ScanLine className="w-12 h-12 text-gold/50 animate-pulse" />
          </div>

          {/* Scanning line animation */}
          <motion.div
            className="absolute left-8 right-8 h-0.5 bg-gold/60 shadow-[0_0_8px_rgba(212,175,55,0.8)]"
            animate={{ top: ["15%", "85%", "15%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 px-4 py-2 bg-red-500/20 text-red-300 rounded-lg text-sm text-center"
          >
            {error}
          </motion.div>
        )}

        {result && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 px-4 py-2 bg-green-500/20 text-green-300 rounded-lg text-sm"
          >
            Code found! Opening...
          </motion.div>
        )}

        <button
          onClick={() => router.back()}
          className="mt-12 flex items-center gap-2 text-white/50 text-sm hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </motion.div>
    </div>
  );
}
