"use client";

import { motion } from "framer-motion";
import { Heart, MessageCircle, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

// Mock Data
const timelineData = [
  {
    id: 1,
    date: "August 14, 2021",
    title: "First Meeting",
    description: "The day everything changed. We met at that tiny coffee shop and talked for 4 hours straight.",
    photos: ["https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1000&auto=format&fit=crop"],
  },
  {
    id: 2,
    date: "December 31, 2021",
    title: "First New Year Together",
    description: "Watching the fireworks and realizing there's no one else I'd rather start the year with.",
    photos: ["https://images.unsplash.com/photo-1546272989-40c92939c6c2?q=80&w=1000&auto=format&fit=crop"],
  },
  {
    id: 3,
    date: "June 25, 2024",
    title: "Your Special Day",
    description: "Celebrating another year of you. The best is yet to come.",
    photos: ["https://images.unsplash.com/photo-1530103862676-de8892ebeea0?q=80&w=1000&auto=format&fit=crop"],
  }
];

export default function TimelinePage() {
  const router = useRouter();

  return (
    <div className="min-h-[100dvh] bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-warm-black/5 px-4 py-4 flex items-center">
        <button 
          onClick={() => router.back()}
          className="p-2 -ml-2 text-warm-black/70 hover:text-warm-black"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="flex-1 text-center text-lg font-bold mr-6 text-warm-black">Our Story</h1>
      </header>

      {/* Timeline Content */}
      <div className="relative px-6 py-12 max-w-lg mx-auto">
        {/* Vertical Line */}
        <div className="absolute left-6 top-16 bottom-12 w-0.5 bg-soft-pink/30 ml-3 md:left-1/2 md:-ml-0.5" />

        <div className="space-y-12">
          {timelineData.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`relative flex flex-col md:flex-row gap-6 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-0 mt-1 ml-[9px] w-3 h-3 rounded-full bg-soft-pink ring-4 ring-background md:left-1/2 md:-ml-1.5 z-10" />

              {/* Content Card */}
              <div className="ml-10 md:ml-0 md:w-1/2 md:px-8">
                <div className="bg-white rounded-3xl p-5 shadow-xl shadow-warm-black/5 border border-warm-black/5">
                  <span className="text-xs font-semibold tracking-wider text-soft-pink uppercase mb-2 block">
                    {item.date}
                  </span>
                  <h3 className="text-xl font-bold text-warm-black mb-3">{item.title}</h3>
                  
                  {/* Photos */}
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4 bg-warm-black/5">
                    <img
                      src={item.photos[0]}
                      alt={item.title}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <p className="text-warm-black/70 text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-4 pt-4 border-t border-warm-black/5">
                    <button className="flex items-center gap-1.5 text-warm-black/50 hover:text-soft-pink transition-colors">
                      <Heart className="w-5 h-5" />
                      <span className="text-xs font-medium">12</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-warm-black/50 hover:text-lavender transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-xs font-medium">4</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Next Step Action */}
      <div className="pb-12 px-6 flex justify-center">
        <button 
          onClick={() => router.push('/wrapped')}
          className="bg-warm-black text-cream-white px-8 py-4 rounded-full font-semibold shadow-lg shadow-warm-black/20 active:scale-95 transition-transform"
        >
          See Our Wrapped
        </button>
      </div>
    </div>
  );
}
