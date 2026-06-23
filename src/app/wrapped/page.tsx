"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

const slides = [
  {
    id: "intro",
    title: "Ready for your Relationship Wrapped?",
    subtitle: "2024 Edition",
    color: "bg-warm-black text-cream-white",
  },
  {
    id: "days",
    title: "We've spent",
    stat: "1,045",
    subtitle: "beautiful days together.",
    color: "bg-soft-pink text-warm-black",
  },
  {
    id: "places",
    title: "Our favorite place was...",
    stat: "That tiny coffee shop",
    subtitle: "We visited it 47 times this year alone.",
    color: "bg-lavender text-warm-black",
  },
  {
    id: "photos",
    title: "We took a lot of photos.",
    stat: "2,403",
    subtitle: "to be exact. But this one is my favorite.",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1000&auto=format&fit=crop",
    color: "bg-warm-black text-cream-white",
  },
  {
    id: "outro",
    title: "Here's to many more memories.",
    subtitle: "I love you.",
    color: "bg-soft-pink text-warm-black",
  }
];

export default function WrappedPage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance logic
  useEffect(() => {
    const timer = setInterval(() => {
      if (currentSlide < slides.length - 1) {
        setCurrentSlide(prev => prev + 1);
      } else {
        clearInterval(timer);
      }
    }, 5000); // 5 seconds per slide

    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    const screenWidth = window.innerWidth;
    const tapX = e.clientX;
    
    if (tapX < screenWidth / 3) {
      // Tap left (go back)
      if (currentSlide > 0) setCurrentSlide(prev => prev - 1);
    } else {
      // Tap right (advance)
      if (currentSlide < slides.length - 1) {
        setCurrentSlide(prev => prev + 1);
      } else {
        router.push('/wishes'); // Navigate to next feature
      }
    }
  };

  return (
    <div 
      className={`h-[100dvh] w-full overflow-hidden transition-colors duration-500 relative ${slides[currentSlide].color}`}
      onClick={handleTap}
    >
      {/* Progress Bars */}
      <div className="absolute top-0 left-0 w-full p-4 flex gap-1.5 z-50 pt-safe">
        {slides.map((_, idx) => (
          <div key={idx} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
            {idx < currentSlide && (
              <div className="w-full h-full bg-white rounded-full" />
            )}
            {idx === currentSlide && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 5, ease: "linear" }}
                className="h-full bg-white rounded-full origin-left"
              />
            )}
          </div>
        ))}
      </div>

      {/* Close Button */}
      <button 
        onClick={(e) => { e.stopPropagation(); router.push('/timeline'); }}
        className="absolute top-10 right-4 z-50 p-2 text-white/80 hover:text-white mix-blend-difference"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Slide Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center pt-16"
        >
          {slides[currentSlide].image && (
            <div className="w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden mb-8 shadow-2xl relative">
              <img 
                src={slides[currentSlide].image} 
                alt="Memory" 
                className="object-cover w-full h-full"
              />
            </div>
          )}
          
          <h2 className="text-3xl font-bold mb-4 tracking-tight drop-shadow-sm">{slides[currentSlide].title}</h2>
          
          {slides[currentSlide].stat && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", delay: 0.2, bounce: 0.5 }}
              className="text-7xl font-extrabold mb-6 drop-shadow-xl"
            >
              {slides[currentSlide].stat}
            </motion.div>
          )}

          <p className="text-xl opacity-90 font-medium max-w-xs leading-snug">{slides[currentSlide].subtitle}</p>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Hint */}
      {currentSlide === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-12 w-full text-center text-xs opacity-60 uppercase tracking-widest pointer-events-none mix-blend-difference text-white"
        >
          Tap right to continue
        </motion.div>
      )}
    </div>
  );
}
