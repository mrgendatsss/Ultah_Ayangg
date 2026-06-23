"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, X, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const photos = [
  { id: 1, url: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1000&auto=format&fit=crop", caption: "Our first trip", likes: 24, comments: 5 },
  { id: 2, url: "https://images.unsplash.com/photo-1546272989-40c92939c6c2?q=80&w=1000&auto=format&fit=crop", caption: "New Year's Eve", likes: 45, comments: 12 },
  { id: 3, url: "https://images.unsplash.com/photo-1530103862676-de8892ebeea0?q=80&w=1000&auto=format&fit=crop", caption: "Just us", likes: 31, comments: 2 },
  { id: 4, url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1000&auto=format&fit=crop", caption: "Coffee date", likes: 18, comments: 1 },
];

export default function PhotoWallPage() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedPhoto = photos.find(p => p.id === selectedId);

  return (
    <div className="min-h-[100dvh] bg-[#f8f8f8] py-12 px-4 relative pt-safe">
      <h1 className="text-3xl font-bold text-center mb-2 text-warm-black">Memory Lane</h1>
      <p className="text-center text-warm-black/60 mb-10">A collection of our best moments</p>

      <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto px-2">
        {photos.map((photo, i) => (
          <motion.div
            key={photo.id}
            layoutId={`photo-${photo.id}`}
            onClick={() => setSelectedId(photo.id)}
            className={`bg-white p-2 pb-8 shadow-md cursor-pointer ${i % 2 === 0 ? '-rotate-2' : 'rotate-3'} hover:rotate-0 transition-transform`}
          >
            <div className="aspect-square overflow-hidden bg-gray-200">
              <img src={photo.url} alt="Memory" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 flex justify-center pb-12">
         <button 
            onClick={() => router.push('/wrapped')}
            className="group flex items-center justify-center gap-2 bg-warm-black text-cream-white py-4 px-8 rounded-full font-semibold shadow-xl active:scale-95 transition-transform"
          >
            Next Chapter
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
      </div>

      <AnimatePresence>
        {selectedId && selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              layoutId={`photo-${selectedPhoto.id}`}
              className="bg-white p-4 pb-20 w-full max-w-sm shadow-2xl relative"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
              
              <img src={selectedPhoto.url} className="w-full aspect-[4/5] object-cover" alt="Detail" />
              
              <div className="absolute bottom-6 left-0 w-full px-6 flex justify-between items-end">
                <div>
                  <p className="font-outfit font-medium text-lg text-warm-black">{selectedPhoto.caption}</p>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1 text-warm-black/60">
                    <Heart className="w-5 h-5" /> <span>{selectedPhoto.likes}</span>
                  </div>
                  <div className="flex items-center gap-1 text-warm-black/60">
                    <MessageCircle className="w-5 h-5" /> <span>{selectedPhoto.comments}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
