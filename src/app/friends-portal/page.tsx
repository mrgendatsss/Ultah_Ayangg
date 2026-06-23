"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, CheckCircle2 } from "lucide-react";

export default function FriendsPortalPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-[100dvh] bg-[#f8f8f8] py-12 px-6 flex flex-col items-center justify-center">
      {!submitted ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl border border-warm-black/5"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-warm-black mb-2">Send a Wish</h1>
            <p className="text-warm-black/60 text-sm">Record a special message for her birthday.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-warm-black mb-1">Your Name</label>
              <input required type="text" className="w-full p-3 rounded-xl border border-warm-black/10 bg-[#f8f8f8] focus:outline-none focus:ring-2 focus:ring-soft-pink" placeholder="e.g. Sarah" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-warm-black mb-1">Relationship</label>
              <select required className="w-full p-3 rounded-xl border border-warm-black/10 bg-[#f8f8f8] focus:outline-none focus:ring-2 focus:ring-soft-pink">
                <option value="">Select...</option>
                <option value="Best Friend">Best Friend</option>
                <option value="Family">Family</option>
                <option value="College Buddy">College Buddy</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-warm-black mb-1">Caption</label>
              <textarea required rows={3} className="w-full p-3 rounded-xl border border-warm-black/10 bg-[#f8f8f8] focus:outline-none focus:ring-2 focus:ring-soft-pink" placeholder="Write a short message..."></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-warm-black mb-1">Upload Video</label>
              <div className="w-full h-32 border-2 border-dashed border-warm-black/20 rounded-xl flex flex-col items-center justify-center text-warm-black/50 hover:bg-soft-pink/5 hover:border-soft-pink transition-colors cursor-pointer">
                <Upload className="w-8 h-8 mb-2" />
                <span className="text-sm">Tap to select video</span>
              </div>
            </div>

            <button type="submit" className="w-full bg-warm-black text-cream-white py-4 rounded-xl font-bold text-lg active:scale-95 transition-transform mt-4">
              Submit Wish
            </button>
          </form>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-sm"
        >
          <CheckCircle2 className="w-20 h-20 text-soft-pink mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-warm-black mb-4">Your birthday message has been delivered ❤️</h2>
          <p className="text-warm-black/60 leading-relaxed">It is currently pending approval and will be shown on the feed soon.</p>
        </motion.div>
      )}
    </div>
  );
}
