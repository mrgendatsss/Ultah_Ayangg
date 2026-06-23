"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SemarangTicketPage() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-[100dvh] bg-charcoal flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-ivory/5 rounded-full blur-3xl" />
      </div>

      <div className="text-center mb-16 z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-serif text-gold mb-4 tracking-wide"
        >
          Special Delivery
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-ivory/60 font-light tracking-wider uppercase text-sm"
        >
          From Mba Fifin
        </motion.p>
      </div>

      {/* Envelope Container */}
      <div 
        className="relative w-80 h-56 cursor-pointer perspective-1000 z-10"
        onClick={() => setIsOpen(true)}
      >
        <motion.div 
          animate={isOpen ? { y: 100, opacity: 0 } : { y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="absolute inset-0"
        >
          {/* Back of envelope */}
          <div className="absolute inset-0 bg-[#D4AF37] rounded-md shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
          </div>

          {/* Ticket (Inside Envelope) */}
          <motion.div
            initial={{ y: 0, scale: 0.9 }}
            animate={isOpen ? { y: -200, scale: 1.1, zIndex: 50 } : { y: 0, scale: 0.9 }}
            transition={{ duration: 1.2, delay: 0.4, type: "spring", stiffness: 50 }}
            className="absolute inset-x-4 top-4 bottom-4 bg-ivory rounded-xl shadow-xl flex items-center justify-center overflow-hidden"
            style={{ transformOrigin: "bottom center" }}
          >
             {/* Ticket Image inside the envelope */}
             <div className="w-full h-full relative bg-white border-[8px] border-white">
                <Image 
                  src="/ticket.png" 
                  alt="Train Ticket to Semarang" 
                  fill 
                  className="object-contain"
                /> 
             </div>
          </motion.div>

          {/* Front Bottom Flap */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-2/3 bg-[#E5C158] rounded-b-md z-20"
            style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 50% 30%, 0 0)" }}
          />
          
          {/* Top Flap */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={isOpen ? { rotateX: 180 } : { rotateX: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            style={{ transformOrigin: "top center", backfaceVisibility: "hidden", clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
            className="absolute top-0 left-0 right-0 h-2/3 bg-[#F3D16C] rounded-t-md z-30 flex items-center justify-center"
          >
            <div className="absolute top-1/3 w-12 h-12 bg-[#8B0000] rounded-full shadow-inner flex items-center justify-center">
               <Mail className="w-5 h-5 text-white/50" />
            </div>
          </motion.div>
        </motion.div>

        {/* Full Screen Ticket Reveal (After Envelope Disappears) */}
        <AnimatePresence>
          {isOpen && (
             <motion.div
               initial={{ opacity: 0, scale: 0.8, y: 50 }}
               animate={{ opacity: 1, scale: 1, y: -50 }}
               transition={{ duration: 0.8, delay: 2.2 }}
               className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-charcoal/90 backdrop-blur-md p-6"
             >
               <motion.div className="relative w-full max-w-sm aspect-[1/2] bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-white">
                 <Image 
                   src="/ticket.png" 
                   alt="Train Ticket to Semarang" 
                   fill 
                   className="object-cover"
                 /> 
               </motion.div>
               
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 3 }}
                 className="mt-12"
               >
                 <button 
                   onClick={() => router.push('/treasure-hunt')}
                   className="flex items-center gap-3 px-8 py-4 bg-gold text-charcoal rounded-full font-bold shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-105 transition-transform"
                 >
                   Continue Journey <ArrowRight className="w-5 h-5" />
                 </button>
               </motion.div>
             </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!isOpen && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, repeat: Infinity, duration: 2, repeatType: "reverse" }}
          className="absolute bottom-16 text-gold/50 text-sm tracking-widest uppercase"
        >
          Tap to open
        </motion.p>
      )}
    </div>
  );
}
