"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Share2, ArrowLeft, Play, Pause, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Wish = {
  id: number;
  name: string;
  message: string;
  video_url: string | null;
  created_at: string;
  has_been_loved?: boolean;
  comments?: any[];
  sort_order?: number;
};

function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isBuffering, setIsBuffering] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => setIsPlaying(false));
    }
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(isNaN(p) ? 0 : p);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = (videoRef.current.duration / 100) * val;
      setProgress(val);
    }
  };

  return (
    <div className="w-full h-full relative" onClick={togglePlay}>
      <video
        ref={videoRef}
        src={src}
        loop
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onWaiting={() => setIsBuffering(true)}
        onPlaying={() => setIsBuffering(false)}
        onCanPlay={() => setIsBuffering(false)}
        className="w-full h-full object-cover"
      />
      
      {/* Play/Pause Overlay */}
      <AnimatePresence>
        {!isPlaying && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none"
          >
            <div className="w-16 h-16 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Play className="w-8 h-8 text-white fill-white ml-1" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Buffering Spinner */}
      {isBuffering && isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
           <Loader2 className="w-10 h-10 text-white animate-spin drop-shadow-lg" />
        </div>
      )}

      {/* Custom Scrubber / Controls */}
      <div 
        className="absolute bottom-6 left-0 w-full px-4 z-40 flex items-center gap-3"
        onClick={(e) => e.stopPropagation()} // Prevent toggling play when using scrubber
      >
        <button onClick={togglePlay} className="text-white drop-shadow-md p-1">
          {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white" />}
        </button>
        <div className="relative flex-1 flex items-center group">
          <input 
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="absolute w-full h-1.5 opacity-0 cursor-pointer z-10"
          />
          <div className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden pointer-events-none">
            <div 
              className="h-full bg-white rounded-full transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WishesFeedPage() {
  const router = useRouter();
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
    const { data, error } = await supabase
      .from("wishes")
      .select("*")
      .eq("status", "approved")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (!error && data) {
      setWishes(data as Wish[]);
    }
    setLoading(false);
  };

  const handleNext = () => {
    if (currentIndex < wishes.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      router.push('/open-when');
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const toggleLove = async () => {
    if (!wishes[currentIndex]) return;
    const wish = wishes[currentIndex];
    const newStatus = !wish.has_been_loved;
    
    setWishes(prev => prev.map((w, i) => i === currentIndex ? { ...w, has_been_loved: newStatus } : w));
    await supabase.from("wishes").update({ has_been_loved: newStatus }).eq("id", wish.id);
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !wishes[currentIndex]) return;
    
    const wish = wishes[currentIndex];
    const newComment = { text: commentText, created_at: new Date().toISOString() };
    const updatedComments = [...(wish.comments || []), newComment];
    
    setWishes(prev => prev.map((w, i) => i === currentIndex ? { ...w, comments: updatedComments } : w));
    setCommentText("");
    
    await supabase.from("wishes").update({ comments: updatedComments }).eq("id", wish.id);
  };

  if (loading) {
    return (
      <div className="h-[100dvh] w-full bg-warm-black flex items-center justify-center text-gold">
        Loading wishes...
      </div>
    );
  }

  if (wishes.length === 0) {
    return (
      <div className="h-[100dvh] w-full bg-warm-black flex flex-col items-center justify-center px-6 text-center">
        <h2 className="text-2xl font-serif text-gold mb-4">No Wishes Yet</h2>
        <p className="text-white/60 mb-8">It seems no wishes have been approved yet.</p>
        <button 
          onClick={() => router.push('/open-when')}
          className="px-6 py-3 bg-white/10 rounded-full text-white"
        >
          Continue Journey
        </button>
      </div>
    );
  }

  const currentWish = wishes[currentIndex];

  return (
    <div className="h-[100dvh] w-full bg-black overflow-hidden relative">
      <button onClick={() => router.back()} className="absolute top-12 left-4 z-50 text-white drop-shadow-md">
        <ArrowLeft className="w-8 h-8" />
      </button>

      <div className="absolute top-12 right-4 z-50 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-sm font-medium border border-white/20">
        {currentIndex + 1} / {wishes.length}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          onDragEnd={(e, { offset }) => {
            const swipe = offset.y;
            if (swipe < -50) handleNext();
            else if (swipe > 50) handlePrev();
          }}
          className="absolute inset-0 flex flex-col justify-end"
        >
          <div className="absolute inset-0">
            {currentWish.video_url ? (
              <VideoPlayer src={currentWish.video_url} />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-warm-black to-zinc-900 flex items-center justify-center p-8">
                <p className="text-2xl font-serif text-gold text-center leading-relaxed">
                  "{currentWish.message}"
                </p>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 pointer-events-none" />
          </div>

          <div className="relative z-20 pb-16 px-4 flex justify-between items-end h-full pointer-events-none">
            <div className="flex-1 pb-2 pr-12 pointer-events-auto">
              <h2 className="text-white font-bold text-xl drop-shadow-md">@{currentWish.name}</h2>
              {currentWish.video_url && (
                <p className="text-white font-medium text-sm drop-shadow-md leading-relaxed mt-2 line-clamp-3">
                  {currentWish.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-6 items-center pb-2 pointer-events-auto">
              <button onClick={toggleLove} className="flex flex-col items-center text-white drop-shadow-md active:scale-90 transition-transform">
                <div className={`p-3 rounded-full backdrop-blur-sm mb-1 transition-colors ${currentWish.has_been_loved ? 'bg-red-500/20' : 'bg-black/20'}`}>
                  <Heart className={`w-7 h-7 transition-colors ${currentWish.has_been_loved ? 'fill-red-500 text-red-500' : 'fill-white/20'}`} />
                </div>
              </button>
              <button onClick={() => setShowComments(true)} className="flex flex-col items-center text-white drop-shadow-md active:scale-90 transition-transform relative">
                <div className="bg-black/20 p-3 rounded-full backdrop-blur-sm mb-1">
                  <MessageCircle className="w-7 h-7 fill-white/20" />
                </div>
                {currentWish.comments && currentWish.comments.length > 0 && (
                   <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold">{currentWish.comments.length}</span>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Comments Bottom Sheet */}
      <AnimatePresence>
        {showComments && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowComments(false)}
              className="absolute inset-0 bg-black/50 z-[60] pointer-events-auto"
            />
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute bottom-0 left-0 w-full h-[60vh] bg-[#111] rounded-t-3xl z-[70] flex flex-col pointer-events-auto border-t border-white/10"
            >
              <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#111] rounded-t-3xl">
                <h3 className="text-white font-bold">{wishes[currentIndex]?.comments?.length || 0} Comments</h3>
                <button onClick={() => setShowComments(false)} className="text-white/60 p-2 rounded-full bg-white/5 active:scale-90">✕</button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                {wishes[currentIndex]?.comments?.map((c: any, i: number) => (
                   <div key={i} className="flex gap-3">
                     <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 text-gold font-bold">A</div>
                     <div>
                       <p className="text-white/60 text-xs font-semibold mb-1">Arjaaaa</p>
                       <p className="text-white text-sm">{c.text}</p>
                     </div>
                   </div>
                ))}
                {(!wishes[currentIndex]?.comments || wishes[currentIndex].comments.length === 0) && (
                  <div className="text-center text-white/40 mt-10 text-sm">No comments yet. Be the first to reply!</div>
                )}
              </div>
              <form onSubmit={handleAddComment} className="p-4 border-t border-white/10 flex gap-2 bg-[#111]">
                <input 
                  type="text" 
                  value={commentText} onChange={e => setCommentText(e.target.value)}
                  placeholder="Add comment..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-white focus:outline-none focus:border-gold/50"
                />
                <button type="submit" disabled={!commentText.trim()} className="text-gold font-bold px-4 disabled:opacity-50">Send</button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
