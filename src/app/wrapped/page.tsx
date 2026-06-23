"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WrappedPage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const phrases = [
    "Sebentar ya", "Aku capek", "Nanti aku kabarin", 
    "Coba kita lihat dulu", "Gapapa", "Kangen poll", 
    "Najongg", "Hadehhh", "Aku pusing", "Aku sakit gigi", 
    "Ntar ku call balik", "Aku mau meeting dulu", "Sedihhh", "Mengantokk"
  ];

  const slides = [
    // HERO
    <div key="hero" className="flex flex-col items-center justify-center text-center h-full px-6">
      <p className="text-gold tracking-[0.3em] text-xs uppercase mb-4">About Her</p>
      <h1 className="text-4xl font-serif text-ivory mb-2">Birthday Wrapped</h1>
      <h2 className="text-2xl font-light text-ivory/70 mb-8">2026</h2>
      <p className="text-gold/80 tracking-widest text-sm mb-12">24 June 2026</p>
      <p className="text-ivory/60 leading-relaxed max-w-xs">A collection of memories, milestones, and all the little things that make her, her.</p>
    </div>,

    // SECTION 01
    <div key="sec1" className="flex flex-col items-start justify-center h-full px-8">
      <p className="text-gold tracking-[0.2em] text-xs uppercase mb-6">Section 01</p>
      <h2 className="text-4xl font-bold text-ivory mb-2">25 Years Old<br/><span className="text-gold">Unlocked ✨</span></h2>
      <p className="text-ivory/60 text-lg mb-8 leading-relaxed">New level.<br/>New adventures.<br/>New memories.</p>
      <div className="w-full">
        <p className="text-sm text-gold/80 uppercase tracking-wider mb-4">Achievements unlocked:</p>
        <ul className="space-y-3 text-ivory/90">
          <li className="flex items-center gap-3"><span className="text-gold">✓</span> Beautiful Smile</li>
          <li className="flex items-center gap-3"><span className="text-gold">✓</span> Strong Mindset</li>
          <li className="flex items-center gap-3"><span className="text-gold">✓</span> Endless Kindness</li>
          <li className="flex items-center gap-3"><span className="text-gold">✓</span> Main Character Energy</li>
          <li className="flex items-center gap-3"><span className="text-gold">✓</span> Professional Problem Solver</li>
        </ul>
      </div>
    </div>,

    // SECTION 02
    <div key="sec2" className="flex flex-col items-start justify-center h-full px-8 w-full">
      <p className="text-gold tracking-[0.2em] text-xs uppercase mb-6">Section 02</p>
      <h2 className="text-3xl font-bold text-ivory mb-8">Character Stats</h2>
      <div className="w-full space-y-4 mb-10 font-mono text-sm">
        <div className="flex justify-between border-b border-white/10 pb-2"><span className="text-ivory/80">Kindness</span><span className="text-gold">100</span></div>
        <div className="flex justify-between border-b border-white/10 pb-2"><span className="text-ivory/80">Creativity</span><span className="text-gold">97</span></div>
        <div className="flex justify-between border-b border-white/10 pb-2"><span className="text-ivory/80">Ambition</span><span className="text-gold">98</span></div>
        <div className="flex justify-between border-b border-white/10 pb-2"><span className="text-ivory/80">Patience</span><span className="text-gold">95</span></div>
        <div className="flex justify-between border-b border-white/10 pb-2"><span className="text-ivory/80">Humor</span><span className="text-gold">93</span></div>
        <div className="flex justify-between border-b border-white/10 pb-2"><span className="text-ivory/80">Overthinking</span><span className="text-gold">87</span></div>
        <div className="flex justify-between border-b border-white/10 pb-2"><span className="text-ivory/80">Sleep Schedule</span><span className="text-red-400">22</span></div>
      </div>
      <div className="text-center w-full p-4 bg-white/5 rounded-2xl border border-white/10">
        <p className="text-xs text-ivory/50 uppercase tracking-widest mb-1">Legendary Character Rating</p>
        <p className="text-3xl font-bold text-gold">99.9 <span className="text-lg text-ivory/40">/ 100</span></p>
      </div>
    </div>,

    // SECTION 03
    <div key="sec3" className="flex flex-col items-center justify-center text-center h-full px-6 w-full">
      <p className="text-gold tracking-[0.2em] text-xs uppercase mb-6">Section 03</p>
      <h2 className="text-3xl font-serif text-ivory mb-6">Most Beautiful Smile</h2>
      <p className="text-ivory/70 text-lg mb-2">Some smiles make people happy.</p>
      <p className="text-gold font-medium text-xl mb-10">Yours makes people stay.</p>
      <div className="w-full aspect-[3/4] bg-white/10 rounded-2xl overflow-hidden relative border-4 border-white/10 flex flex-col items-center justify-center">
         <span className="text-ivory/30">[Insert Photo Here]</span>
         <span className="text-ivory/20 text-xs mt-2">(Use admin or replace in code)</span>
      </div>
    </div>,

    // SECTION 04
    <div key="sec4" className="flex flex-col items-start justify-center h-full px-8 w-full">
      <p className="text-gold tracking-[0.2em] text-xs uppercase mb-6">Section 04</p>
      <h2 className="text-3xl font-bold text-ivory mb-2">Multiclass Character</h2>
      <p className="text-ivory/50 text-sm uppercase tracking-widest mb-10">Character Build</p>
      <div className="space-y-4 w-full">
        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5"><span className="text-2xl">👩🏻‍💻</span><span className="text-ivory font-medium">Business Analyst</span></div>
        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5"><span className="text-2xl">🎨</span><span className="text-ivory font-medium">UI/UX Thinker</span></div>
        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5"><span className="text-2xl">🚀</span><span className="text-ivory font-medium">Startup Builder</span></div>
        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5"><span className="text-2xl">📊</span><span className="text-ivory font-medium">Problem Solver</span></div>
        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5"><span className="text-2xl">🧠</span><span className="text-ivory font-medium">Professional Overthinker</span></div>
      </div>
    </div>,

    // SECTION 05
    <div key="sec5" className="flex flex-col items-start justify-center h-full px-8 w-full">
      <p className="text-gold tracking-[0.2em] text-xs uppercase mb-6">Section 05</p>
      <h2 className="text-3xl font-bold text-ivory mb-2">Professional Lore</h2>
      <p className="text-gold text-sm uppercase tracking-widest mb-8">Current Arc: Business Analyst</p>
      <div className="space-y-2 mb-10 border-l-2 border-gold/30 pl-4">
        <p className="text-ivory/80">Turning confusion into requirements.</p>
        <p className="text-ivory/80">Turning ideas into solutions.</p>
        <p className="text-ivory/80">Turning meetings into action.</p>
      </div>
      <div className="w-full bg-white/5 p-5 rounded-2xl border border-white/10 mb-4">
        <p className="text-xs text-ivory/50 uppercase tracking-widest mb-2">Special Skill</p>
        <p className="text-gold italic font-serif text-lg">&quot;Bentar yaa aku meeting dulu sama pak iki&quot;</p>
      </div>
      <div className="w-full bg-white/5 p-5 rounded-2xl border border-white/10">
        <p className="text-xs text-ivory/50 uppercase tracking-widest mb-2">Ultimate Ability</p>
        <p className="text-ivory font-medium">Ngerjain kerjaan dadakan roro jonggrang, tp kelar walau sambil ngeluh &quot;aku pusing sayang&quot;</p>
      </div>
    </div>,

    // SECTION 06 (Formerly 07)
    <div key="sec6" className="flex flex-col items-start justify-center h-full px-8 w-full">
      <p className="text-gold tracking-[0.2em] text-xs uppercase mb-6">Section 06</p>
      <h2 className="text-4xl font-bold text-ivory mb-2">Operating System</h2>
      <p className="text-ivory/50 text-sm uppercase tracking-widest mb-10">Powered By</p>
      
      <div className="flex flex-wrap gap-3 mb-12">
        <span className="px-4 py-2 bg-white/10 rounded-full text-ivory border border-white/10">☕ Coffee</span>
        <span className="px-4 py-2 bg-white/10 rounded-full text-ivory border border-white/10">🎧 Music</span>
        <span className="px-4 py-2 bg-white/10 rounded-full text-ivory border border-white/10">📱 TikTok</span>
        <span className="px-4 py-2 bg-white/10 rounded-full text-ivory border border-white/10">💬 Random Chats</span>
        <span className="px-4 py-2 bg-white/10 rounded-full text-ivory border border-white/10">🫂 Quality Time</span>
        <span className="px-4 py-2 bg-white/5 rounded-full text-ivory/50 border border-white/5">😴 Not Enough Sleep</span>
      </div>

      <div className="w-full p-6 bg-green-500/10 border border-green-500/30 rounded-2xl flex flex-col items-center justify-center text-center">
        <p className="text-xs text-green-400/70 uppercase tracking-widest mb-2">System Status</p>
        <p className="text-xl font-bold text-green-400">Running Successfully</p>
      </div>
    </div>,

    // SECTION 07 (Formerly 08)
    <div key="sec7" className="flex flex-col items-center justify-center text-center h-full px-4 w-full relative">
      <p className="text-gold tracking-[0.2em] text-xs uppercase mb-8">Section 07</p>
      <h2 className="text-3xl font-bold text-ivory mb-12">Things She Says Most</h2>
      
      <div className="flex flex-wrap justify-center gap-3 w-full">
        {phrases.map((phrase, idx) => (
          <motion.span 
            key={idx}
            animate={{ y: [0, idx % 2 === 0 ? -4 : 4, 0] }}
            transition={{ duration: 3 + (idx % 3), repeat: Infinity, ease: "easeInOut" }}
            className={`font-serif italic px-4 py-3 bg-white/5 rounded-xl border border-white/10 flex-grow text-center ${
              idx % 3 === 0 ? 'text-gold text-xl font-bold' : 'text-ivory/90 text-lg'
            }`}
          >
            &quot;{phrase}&quot;
          </motion.span>
        ))}
      </div>
    </div>,

    // SECTION 08 (Formerly 09)
    <div key="sec8" className="flex flex-col items-start justify-center h-full px-8 w-full">
      <p className="text-gold tracking-[0.2em] text-xs uppercase mb-6">Section 08</p>
      <h2 className="text-4xl font-bold text-ivory mb-2">Certified Listener</h2>
      <div className="flex items-center gap-4 mb-10">
        <p className="text-ivory/50 text-sm uppercase tracking-widest">Listening Skill</p>
        <span className="px-3 py-1 bg-gold/20 text-gold rounded-full font-bold text-sm">100 / 100</span>
      </div>
      <p className="text-gold mb-4 text-lg">Can listen to:</p>
      <ul className="space-y-4 text-ivory/90 text-lg w-full">
        <li className="flex items-center gap-4 bg-white/5 p-4 rounded-xl"><span className="text-gold">✓</span> Work Problems</li>
        <li className="flex items-center gap-4 bg-white/5 p-4 rounded-xl"><span className="text-gold">✓</span> Family Stories</li>
        <li className="flex items-center gap-4 bg-white/5 p-4 rounded-xl"><span className="text-gold">✓</span> Random Stories</li>
        <li className="flex items-center gap-4 bg-white/5 p-4 rounded-xl"><span className="text-gold">✓</span> My Stories</li>
        <li className="flex items-center gap-4 bg-white/10 border border-gold/30 p-4 rounded-xl text-gold font-medium"><span className="text-gold">✓</span> The Same Story Again</li>
      </ul>
    </div>,

    // SECTION 09 (Formerly 10)
    <div key="sec9" className="flex flex-col items-center justify-center text-center h-full px-6 w-full">
      <p className="text-gold tracking-[0.2em] text-xs uppercase mb-6">Section 09</p>
      <h2 className="text-2xl font-light text-ivory mb-2">We&apos;ve spent</h2>
      <p className="text-5xl font-bold text-gold mb-2">600 Days</p>
      <p className="text-3xl font-serif text-ivory italic mb-4">Together</p>
      <p className="text-ivory/50 text-sm uppercase tracking-widest mb-10">Since November 2024</p>
      
      <div className="space-y-2 mb-10 text-lg text-ivory/80">
        <p>Countless Conversations</p>
        <p>Hundreds of Calls</p>
        <p>Thousands of Messages</p>
        <p className="text-gold font-bold text-xl mt-4">Millions of Memories</p>
      </div>

      <div className="w-full aspect-video bg-white/10 rounded-2xl overflow-hidden relative border-4 border-white/10 flex flex-col items-center justify-center">
         <span className="text-ivory/30">[Photo Together]</span>
      </div>
    </div>,

    // SECTION 10 (Formerly 11)
    <div key="sec10" className="flex flex-col items-start justify-center h-full px-8 w-full">
      <p className="text-gold tracking-[0.2em] text-xs uppercase mb-6">Section 10</p>
      <h2 className="text-3xl font-bold text-ivory mb-2">Relationship DLC</h2>
      <p className="text-ivory/50 text-sm uppercase tracking-widest mb-8">Additional Content Unlocked</p>
      
      <div className="grid grid-cols-2 gap-3 w-full">
        <div className="bg-white/5 p-3 rounded-lg border border-white/5 text-sm flex items-center gap-2"><span className="text-gold text-xs">✓</span> Random Dates</div>
        <div className="bg-white/5 p-3 rounded-lg border border-white/5 text-sm flex items-center gap-2"><span className="text-gold text-xs">✓</span> Deep Talks</div>
        <div className="bg-white/5 p-3 rounded-lg border border-white/5 text-sm flex items-center gap-2"><span className="text-gold text-xs">✓</span> Midnight Calls</div>
        <div className="bg-white/5 p-3 rounded-lg border border-white/5 text-sm flex items-center gap-2"><span className="text-gold text-xs">✓</span> Silly Arguments</div>
        <div className="bg-white/5 p-3 rounded-lg border border-white/5 text-sm flex items-center gap-2"><span className="text-gold text-xs">✓</span> Bad Photos</div>
        <div className="bg-white/5 p-3 rounded-lg border border-white/5 text-sm flex items-center gap-2"><span className="text-gold text-xs">✓</span> Good Memories</div>
        <div className="bg-white/5 p-3 rounded-lg border border-white/5 text-sm flex items-center gap-2"><span className="text-gold text-xs">✓</span> Inside Jokes</div>
        <div className="bg-white/5 p-3 rounded-lg border border-gold/30 text-sm flex items-center gap-2 text-gold"><span className="text-gold text-xs">✓</span> Unexpected Adventures</div>
      </div>
    </div>,

    // SECTION 11 (Formerly 12)
    <div key="sec11" className="flex flex-col items-start justify-center h-full px-8 w-full">
      <p className="text-gold tracking-[0.2em] text-xs uppercase mb-6">Section 11</p>
      <h2 className="text-3xl font-bold text-ivory mb-8 leading-tight">Things People<br/>Love About You</h2>
      
      <ul className="space-y-5 text-xl font-serif italic text-ivory/90">
        <li className="flex items-center gap-4"><span className="text-gold text-sm not-italic">♡</span> Your Smile</li>
        <li className="flex items-center gap-4"><span className="text-gold text-sm not-italic">♡</span> Your Kindness</li>
        <li className="flex items-center gap-4"><span className="text-gold text-sm not-italic">♡</span> Your Patience</li>
        <li className="flex items-center gap-4"><span className="text-gold text-sm not-italic">♡</span> Your Presence</li>
        <li className="flex items-center gap-4"><span className="text-gold text-sm not-italic">♡</span> Your Honesty</li>
        <li className="flex items-center gap-4"><span className="text-gold text-sm not-italic">♡</span> The Comfort You Bring</li>
        <li className="flex items-center gap-4 text-gold"><span className="text-ivory text-sm not-italic">♡</span> The Way You Care</li>
      </ul>
    </div>,

    // SECTION 12 (Formerly 13)
    <div key="sec12" className="flex flex-col items-center justify-center text-center h-full px-8 w-full">
      <p className="text-gold tracking-[0.2em] text-xs uppercase mb-6">Section 12</p>
      <h2 className="text-3xl font-bold text-ivory mb-12">Things You Should<br/>Be Proud Of</h2>
      
      <div className="space-y-6 text-lg text-ivory/80 font-light">
        <p>Every challenge you survived.</p>
        <p>Every problem you solved.</p>
        <p>Every person you&apos;ve helped.</p>
        <p>Every dream you&apos;re still chasing.</p>
        <p className="text-gold font-medium text-xl mt-8">The person you&apos;ve become.</p>
      </div>

      <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10 w-full">
        <p className="text-ivory font-serif italic text-xl mb-2">Growth happened.</p>
        <p className="text-ivory/60 text-sm">Even when you couldn&apos;t see it.</p>
      </div>
    </div>,

    // SECTION 13 (Formerly 14)
    <div key="sec13" className="flex flex-col items-center justify-center text-center h-full px-6 w-full">
      <p className="text-gold tracking-[0.2em] text-xs uppercase mb-6">Section 13</p>
      <h2 className="text-4xl font-serif text-gold italic mb-12">Plot Twist</h2>
      
      <div className="w-full bg-white/5 p-6 rounded-2xl border border-white/10 mb-6">
        <p className="text-xs text-ivory/50 uppercase tracking-widest mb-4">What Most People See</p>
        <div className="space-y-2 text-ivory/80">
          <p>Business Analyst</p>
          <p>Problem Solver</p>
          <p>Independent Woman</p>
          <p>Hard Worker</p>
          <p>Strong Person</p>
        </div>
      </div>

      <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center mb-6">
        <div className="w-1 h-4 bg-gold rounded-full" />
      </div>

      <div className="w-full bg-gold/10 p-6 rounded-2xl border border-gold/30">
        <p className="text-xs text-gold uppercase tracking-widest mb-4">What I See</p>
        <div className="space-y-2 text-ivory font-medium">
          <p>Someone who tries her best.</p>
          <p>Someone worth celebrating.</p>
          <p>Someone worth admiring.</p>
          <p className="text-gold text-lg mt-4">Someone I&apos;m grateful to know.</p>
        </div>
      </div>
    </div>,

    // SECTION 14 (Formerly 15)
    <div key="sec14" className="flex flex-col items-center justify-center text-center h-full px-6 w-full">
      <p className="text-gold tracking-[0.2em] text-xs uppercase mb-6">Section 14</p>
      <h2 className="text-3xl font-bold text-ivory mb-10">People Who<br/>Love You</h2>
      
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <span className="px-6 py-3 bg-white/10 rounded-full text-ivory border border-white/10 text-lg">Family</span>
        <span className="px-6 py-3 bg-white/10 rounded-full text-ivory border border-white/10 text-lg">Friends</span>
        <span className="px-6 py-3 bg-white/10 rounded-full text-ivory border border-white/10 text-lg">Best Friends</span>
        <span className="px-6 py-3 bg-white/10 rounded-full text-ivory border border-white/10 text-lg">Coworkers</span>
      </div>

      <p className="text-gold font-serif italic text-2xl mb-12 px-4">And one lucky guy standing beside you.</p>

      <div className="w-full aspect-[4/3] bg-white/10 rounded-2xl overflow-hidden relative border-4 border-white/10 flex items-center justify-center">
         <span className="text-ivory/30">[Collage Photos]</span>
      </div>
    </div>,

    // SECTION 15 (Formerly 16)
    <div key="sec15" className="flex flex-col items-center justify-center text-center h-full px-8 w-full">
      <p className="text-gold tracking-[0.2em] text-xs uppercase mb-6">Section 15</p>
      <h2 className="text-3xl font-bold text-ivory mb-12">A Small Part<br/>About Us</h2>
      
      <div className="space-y-6 text-xl font-serif italic text-ivory/90 mb-12">
        <p>Out of all the timelines,</p>
        <p className="text-gold">I&apos;m glad ours crossed.</p>
      </div>

      <div className="space-y-4 text-lg text-ivory/70 font-light mb-12">
        <p>Thank you for every conversation.</p>
        <p>Every laugh.</p>
        <p>Every memory.</p>
        <p>Every moment.</p>
      </div>

      <h2 className="text-4xl font-bold text-gold">Happy Birthday.</h2>
    </div>,

    // FINAL
    <div key="final" className="flex flex-col items-center justify-center text-center h-full px-6 w-full">
      <p className="text-gold tracking-[0.3em] text-xs uppercase mb-4">Final Wrapped</p>
      <h2 className="text-4xl font-black text-ivory mb-8 tracking-tight">2026 SUMMARY</h2>
      
      <div className="w-full bg-white/5 p-6 rounded-3xl border border-white/10 mb-8 space-y-6 text-left">
        <div className="flex justify-between items-end border-b border-white/10 pb-3">
          <span className="text-ivory/60 text-sm uppercase tracking-widest">Age</span>
          <span className="text-xl font-bold text-gold">25</span>
        </div>
        <div className="flex justify-between items-end border-b border-white/10 pb-3">
          <span className="text-ivory/60 text-sm uppercase tracking-widest">Smile</span>
          <span className="text-xl font-bold text-gold">Still Beautiful</span>
        </div>
        <div className="flex justify-between items-end border-b border-white/10 pb-3">
          <span className="text-ivory/60 text-sm uppercase tracking-widest">Dreams</span>
          <span className="text-xl font-bold text-gold">Still Growing</span>
        </div>
        <div className="flex justify-between items-end border-b border-white/10 pb-3">
          <span className="text-ivory/60 text-sm uppercase tracking-widest">Achievements</span>
          <span className="text-xl font-bold text-gold">Countless</span>
        </div>
        <div className="flex justify-between items-end border-b border-white/10 pb-3">
          <span className="text-ivory/60 text-sm uppercase tracking-widest">People Who Love You</span>
          <span className="text-xl font-bold text-gold text-right max-w-[150px]">More Than You Know</span>
        </div>
      </div>

      <div className="w-full p-4 bg-gold/10 rounded-2xl border border-gold/30 mb-8">
        <p className="text-xs text-gold/60 uppercase tracking-widest mb-2">Status</p>
        <p className="text-xl font-bold text-ivory mb-1">✨ Rare Character</p>
        <p className="text-gold text-sm">Unlocked Forever</p>
      </div>

      <p className="text-sm text-ivory/50 tracking-widest uppercase mb-2">Happy Birthday sm yg heres to many memories</p>
      <p className="text-2xl font-serif italic text-gold">I love you</p>
    </div>
  ];

  // Auto-advance logic with pause support
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      if (currentSlide < slides.length - 1) {
        setCurrentSlide(prev => prev + 1);
      } else {
        clearInterval(timer);
      }
    }, 7000);

    return () => clearInterval(timer);
  }, [currentSlide, isPaused]);

  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    const screenWidth = window.innerWidth;
    const tapX = e.clientX;
    
    if (tapX < screenWidth / 3) {
      if (currentSlide > 0) setCurrentSlide(prev => prev - 1);
    } else {
      if (currentSlide < slides.length - 1) {
        setCurrentSlide(prev => prev + 1);
      } else {
        router.push('/wishes');
      }
    }
  };

  return (
    <div 
      className="h-[100dvh] w-full overflow-hidden transition-colors duration-500 relative bg-charcoal select-none touch-none"
      onClick={handleTap}
      onPointerDown={() => setIsPaused(true)}
      onPointerUp={() => setIsPaused(false)}
      onPointerLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Progress Bars */}
      <div className="absolute top-0 left-0 w-full p-4 flex gap-1 z-50 pt-safe">
        {slides.map((_, idx) => (
          <div key={idx} className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
            {idx < currentSlide && (
              <div className="w-full h-full bg-gold rounded-full" />
            )}
            {idx === currentSlide && !isPaused && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 7, ease: "linear" }}
                className="h-full bg-gold rounded-full origin-left"
              />
            )}
            {idx === currentSlide && isPaused && (
              <div className="h-full bg-gold rounded-full w-1/2 opacity-50" />
            )}
          </div>
        ))}
      </div>

      {/* Close Button */}
      <button 
        onClick={(e) => { e.stopPropagation(); router.push('/wishes'); }}
        className="absolute top-10 right-4 z-50 p-2 text-white/50 hover:text-white"
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
          className="absolute inset-0 pt-16"
        >
          {slides[currentSlide]}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Hint */}
      {currentSlide === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 w-full text-center text-xs opacity-50 uppercase tracking-widest pointer-events-none text-gold"
        >
          Tap right to continue / Hold to pause
        </motion.div>
      )}
    </div>
  );
}
