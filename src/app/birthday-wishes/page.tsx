"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { ChevronUp, ChevronDown, Heart } from "lucide-react";
import Link from "next/link";

type Wish = {
  id: number;
  name: string;
  message: string;
  video_url: string | null;
  created_at: string;
};

export default function BirthdayWishesPage() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
    const { data, error } = await supabase
      .from("wishes")
      .select("*")
      .eq("status", "approved")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setWishes(data as Wish[]);
    }
  };

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, clientHeight } = containerRef.current;
    const index = Math.round(scrollTop / clientHeight);
    setCurrentIndex(index);
  };

  const scrollTo = (index: number) => {
    if (!containerRef.current || index < 0 || index >= wishes.length) return;
    containerRef.current.scrollTo({
      top: index * containerRef.current.clientHeight,
      behavior: "smooth"
    });
  };

  if (wishes.length === 0) {
    return (
      <div className="min-h-[100dvh] bg-warm-black text-ivory flex items-center justify-center">
        <p className="text-white/60">Loading messages from your loved ones...</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-warm-black text-ivory">
      <div 
        ref={containerRef}
        className="h-full overflow-y-auto snap-y snap-mandatory scroll-smooth pb-20"
        onScroll={handleScroll}
      >
        {wishes.map((wish, index) => (
          <div 
            key={wish.id}
            className="h-[100dvh] w-full snap-start relative flex flex-col justify-end"
          >
            {wish.video_url ? (
              <video
                src={wish.video_url}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay={currentIndex === index}
                loop
                muted={false}
                playsInline
              />
            ) : (
              <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-warm-black to-zinc-900 flex items-center justify-center p-8">
                <div className="text-center max-w-sm">
                  <p className="text-2xl md:text-3xl font-serif text-gold leading-relaxed">
                    "{wish.message}"
                  </p>
                </div>
              </div>
            )}
            
            {/* Overlay for text if there is video */}
            <div className="absolute inset-x-0 bottom-0 p-6 pt-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              <h2 className="text-xl font-bold mb-2">@{wish.name}</h2>
              {wish.video_url && (
                <p className="text-white/90 text-sm line-clamp-3 mb-4">
                  {wish.message}
                </p>
              )}
              
              <div className="flex items-center gap-4">
                <button className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                    <Heart className="w-5 h-5 text-gold" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
        <button 
          onClick={() => scrollTo(currentIndex - 1)}
          className={`w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white transition-opacity ${currentIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          <ChevronUp className="w-6 h-6" />
        </button>
        <button 
          onClick={() => scrollTo(currentIndex + 1)}
          className={`w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white transition-opacity ${currentIndex === wishes.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 inset-x-0 p-6 bg-gradient-to-t from-warm-black to-transparent z-50 flex justify-center">
        <Link 
          href="/open-when"
          className="px-8 py-3 rounded-full bg-gold text-warm-black font-semibold text-sm shadow-lg shadow-gold/20"
        >
          Continue Journey
        </Link>
      </div>
    </div>
  );
}
