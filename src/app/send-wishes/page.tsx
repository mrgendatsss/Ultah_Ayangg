"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function SendWishesPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      let videoUrl = null;

      if (file) {
        if (file.size > 15 * 1024 * 1024) {
          throw new Error("Video file size must be less than 3MB. Please compress your video.");
        }

        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `wishes/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("uploads")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("uploads")
          .getPublicUrl(filePath);

        videoUrl = publicUrlData.publicUrl;
      }

      const { error: insertError } = await supabase
        .from("wishes")
        .insert([{ 
          name, 
          message, 
          video_url: videoUrl,
          status: "pending" // Admin needs to approve
        }]);

      if (insertError) throw insertError;

      setStatus("success");
    } catch (error: any) {
      console.error(error);
      setStatus("error");
      // Optionally alert the error to immediately see what went wrong
      alert("Error: " + (error.message || JSON.stringify(error)));
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-[100dvh] bg-warm-black text-ivory flex flex-col items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-4xl mb-4">✨</div>
          <h1 className="text-2xl font-serif mb-2">Thank You!</h1>
          <p className="text-white/60">Your wish has been submitted and is waiting for approval.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-warm-black text-ivory px-6 py-12">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-serif text-gold mb-2">Send a Wish</h1>
        <p className="text-white/60 mb-8">Leave a birthday message for Arjaaaa.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Your Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
              placeholder="How does she know you?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Your Message</label>
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
              placeholder="Write your heartfelt message here..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Video Message (Optional)</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full text-sm text-white/60
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-gold/10 file:text-gold
                hover:file:bg-gold/20"
            />
            <p className="text-xs text-white/40 mt-2">Maximum file size: 3MB. If your video is larger, please compress it first.</p>
          </div>

          {status === "error" && (
            <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20">
              An error occurred while submitting. Please try again or check your video size.
            </div>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full bg-gold text-warm-black font-semibold py-4 rounded-full disabled:opacity-50 transition-opacity"
          >
            {status === "submitting" ? "Sending..." : "Send Wish"}
          </button>
        </form>
      </div>
    </div>
  );
}
