"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, PlayCircle, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const cards = [
  { id: 1, title: "You're Sad", content: "Hey love,\n\nI know today might be a little hard.\n\nJust remember, you're not alone in this.\n\nTake a breath, get some rest, and tell me about it later.\n\nI'll be here. 🤍", hasVoice: true },
  { id: 2, title: "You Miss Me", content: "I miss you too! Close your eyes and imagine I'm giving you the biggest hug right now.", hasVoice: false },
  { id: 3, title: "You're Stressed", content: "Take a deep breath. You're the smartest, most capable person I know. You've got this, and I've got you.", hasVoice: true },
  { id: 4, title: "You're Happy", content: "I love it when you're happy! Your smile is literally my favorite thing in the world. Keep shining.", hasVoice: false },
  { id: 5, title: "Need Motivation", content: "Look how far you've come. I believe in you more than anyone else. Go get 'em!", hasVoice: false },
  { id: 6, title: "It's Your Bday", content: "Happy Birthday Arjaaaa. This whole website is for you. I hope you're smiling right now.", hasVoice: true },
];

export default function OpenWhenPage() {
  const router = useRouter();
  const [openedId, setOpenedId] = useState<number | null>(null);

  const openedCard = cards.find(c => c.id === openedId);

  return (
    <div className="min-h-[100dvh] bg-charcoal py-16 px-6 relative text-ivory">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-serif text-gold mb-3">Open When...</h1>
        <p className="text-ivory/60">Digital envelopes for every moment.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            layoutId={`card-${card.id}`}
            onClick={() => setOpenedId(card.id)}
            className="bg-white/5 aspect-[3/4] rounded-2xl shadow-sm border border-gold/20 flex flex-col items-center justify-center p-4 text-center cursor-pointer active:scale-95 transition-transform hover:bg-white/10 hover:border-gold/40"
          >
            <Mail className="w-8 h-8 text-gold mb-3 opacity-80" />
            <h3 className="font-semibold text-ivory text-sm uppercase tracking-wide leading-relaxed">Open When<br/><span className="text-gold/90">{card.title}</span></h3>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 flex justify-center pb-8">
         <button 
            onClick={() => router.push('/mailbox/semarang-ticket')}
            className="group flex items-center justify-center gap-2 bg-gold text-charcoal py-4 px-8 rounded-full font-bold shadow-[0_0_20px_rgba(212,175,55,0.2)] active:scale-95 transition-all hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
          >
            Next Surprise
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
      </div>

      <AnimatePresence>
        {openedId && openedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
            onClick={() => setOpenedId(null)}
          >
            <motion.div
              layoutId={`card-${openedCard.id}`}
              className="bg-charcoal border border-gold/30 w-full max-w-sm rounded-3xl p-8 shadow-2xl relative"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setOpenedId(null)}
                className="absolute top-4 right-4 text-ivory/40 hover:text-ivory transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="text-center mb-8 border-b border-gold/20 pb-6">
                <h2 className="text-lg font-bold text-gold/60 uppercase tracking-widest mb-1">Open When</h2>
                <h3 className="text-2xl font-serif text-gold">{openedCard.title}</h3>
              </div>
              
              <p className="text-ivory/90 leading-relaxed font-medium text-lg mb-8 italic text-center whitespace-pre-wrap">
                "{openedCard.content}"
              </p>

              {openedCard.hasVoice && (
                <div className="bg-white/5 rounded-full p-4 flex items-center gap-4 shadow-sm border border-gold/10">
                  <button className="text-gold hover:text-gold/80 transition-colors">
                    <PlayCircle className="w-10 h-10" />
                  </button>
                  <div className="flex-1 h-2 bg-black/40 rounded-full overflow-hidden">
                    <div className="w-1/3 h-full bg-gold rounded-full" />
                  </div>
                  <span className="text-xs text-ivory/40 font-mono">0:45</span>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
