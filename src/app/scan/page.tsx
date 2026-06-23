"use client";

import { useState } from "react";
import { useZxing } from "react-zxing";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ScanLine } from "lucide-react";

export default function ScanPage() {
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const { ref } = useZxing({
    onDecodeResult(result) {
      const text = result.getText();
      setResult(text);
      handleQRCode(text);
    },
    onError(error) {
      // Intentionally ignoring frequent decode errors from the camera
      if (!(error.name === 'NotFoundException')) {
        console.error(error);
      }
    },
  });

  const handleQRCode = (text: string) => {
    // Expected QR codes:
    // AURORA_GIFT_1 -> /gift/part-1
    // AURORA_GIFT_2 -> /gift/part-2
    // AURORA_GIFT_3 -> /gift/part-3
    
    if (text === "AURORA_GIFT_1") {
      router.push("/gift/part-1");
    } else if (text === "AURORA_GIFT_2") {
      router.push("/gift/part-2");
    } else if (text === "AURORA_GIFT_3") {
      router.push("/gift/part-3");
    } else {
      setError("Invalid QR Code for this journey.");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-warm-black text-ivory flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm flex flex-col items-center"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-serif text-gold mb-2">Unlock a Gift</h1>
          <p className="text-white/60 text-sm">Point your camera at the QR code you found.</p>
        </div>

        <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-black/50 border border-white/10 shadow-2xl backdrop-blur-sm">
          <video ref={ref} className="w-full h-full object-cover" />
          
          {/* Scanner Overlay UI */}
          <div className="absolute inset-0 border-[3px] border-gold/30 rounded-3xl m-8" />
          <div className="absolute inset-0 flex items-center justify-center">
            <ScanLine className="w-12 h-12 text-gold/50 animate-pulse" />
          </div>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 px-4 py-2 bg-red-500/20 text-red-300 rounded-lg text-sm"
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
          className="mt-12 text-white/50 text-sm hover:text-white transition-colors"
        >
          Cancel
        </button>
      </motion.div>
    </div>
  );
}
