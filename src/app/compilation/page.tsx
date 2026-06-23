"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { PlayCircle } from "lucide-react";

export default function CompilationPage() {
  const router = useRouter();

  return (
    <div className="h-[100dvh] w-full bg-warm-black flex flex-col items-center justify-center text-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-sm w-full"
      >
        <h1 className="text-3xl font-bold text-cream-white mb-6">A Little Something Extra</h1>
        
        <div className="relative w-full aspect-video bg-white/10 rounded-2xl mb-12 flex items-center justify-center border border-white/20 shadow-2xl overflow-hidden">
          {/* Mock Video Thumbnail */}
          <img 
            src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1000&auto=format&fit=crop" 
            alt="Video Thumbnail" 
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <PlayCircle className="w-16 h-16 text-white relative z-10" />
          <div className="absolute bottom-3 right-3 bg-black/60 px-2 py-1 rounded text-xs text-white">4:23</div>
        </div>

        <button 
          onClick={() => router.push('/time-capsule')}
          className="w-full bg-cream-white text-warm-black py-4 rounded-full font-bold text-lg active:scale-95 transition-transform"
        >
          Next
        </button>
      </motion.div>
    </div>
  );
}
