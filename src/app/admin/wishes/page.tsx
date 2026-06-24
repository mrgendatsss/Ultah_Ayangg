"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Wish = {
  id: number;
  name: string;
  message: string;
  video_url: string | null;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  has_been_loved?: boolean;
  comments?: any[];
  sort_order?: number;
};

export default function AdminWishesPage() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("wishes")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (!error && data) {
      setWishes(data as Wish[]);
    }
    setLoading(false);
  };

  const updateStatus = async (id: number, status: "pending" | "approved" | "rejected") => {
    const { error } = await supabase
      .from("wishes")
      .update({ status })
      .eq("id", id);

    if (!error) {
      setWishes((prev) =>
        prev.map((w) => (w.id === id ? { ...w, status } : w))
      );
    } else {
      alert("Error updating status");
    }
  };

  const copyReply = (wish: Wish, commentText: string) => {
    const text = `✨ 𝐀𝐝𝐳𝐫𝐚 𝐫𝐞𝐩𝐥𝐲 𝐲𝐨𝐮𝐫 𝐰𝐢𝐬𝐡𝐞𝐬 ✨\n\nHaiii ${wish.name} 🩷,\n"${commentText}"\n\nMakasihh banyakk yaaa! 🎀`;
    navigator.clipboard.writeText(text);
    alert("Format reply lucu berhasil di-copy! ✨");
  };

  const moveUp = async (index: number) => {
    if (index === 0) return;
    const current = wishes[index];
    const above = wishes[index - 1];
    
    const { error: err1 } = await supabase.from("wishes").update({ sort_order: above.sort_order || 0 }).eq("id", current.id);
    const { error: err2 } = await supabase.from("wishes").update({ sort_order: current.sort_order || 0 }).eq("id", above.id);
    
    if (!err1 && !err2) {
      fetchWishes(); // Refresh the list
    } else {
      alert("Error reordering");
    }
  };

  const moveDown = async (index: number) => {
    if (index === wishes.length - 1) return;
    const current = wishes[index];
    const below = wishes[index + 1];
    
    const { error: err1 } = await supabase.from("wishes").update({ sort_order: below.sort_order || 0 }).eq("id", current.id);
    const { error: err2 } = await supabase.from("wishes").update({ sort_order: current.sort_order || 0 }).eq("id", below.id);
    
    if (!err1 && !err2) {
      fetchWishes(); // Refresh the list
    } else {
      alert("Error reordering");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Wishes Moderation</h1>

      {loading ? (
        <p className="text-gray-500">Loading wishes...</p>
      ) : wishes.length === 0 ? (
        <p className="text-gray-500">No wishes found.</p>
      ) : (
        <div className="grid gap-6">
          {wishes.map((wish, index) => (
            <div key={wish.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex gap-6 relative">
              <div className="absolute right-6 bottom-6 flex flex-col gap-2">
                 <button onClick={() => moveUp(index)} disabled={index === 0} className="p-2 bg-gray-100 rounded-md disabled:opacity-30 hover:bg-gray-200">⬆️</button>
                 <button onClick={() => moveDown(index)} disabled={index === wishes.length - 1} className="p-2 bg-gray-100 rounded-md disabled:opacity-30 hover:bg-gray-200">⬇️</button>
              </div>
              {wish.video_url && (
                <div className="w-48 h-64 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <video 
                    src={wish.video_url} 
                    controls 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-900">{wish.name}</h3>
                    {wish.has_been_loved && <span className="text-red-500 text-xl" title="Loved by Adzra">❤️</span>}
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(wish.created_at).toLocaleDateString()}
                  </p>
                </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    wish.status === "approved" ? "bg-green-100 text-green-700" :
                    wish.status === "rejected" ? "bg-red-100 text-red-700" :
                    "bg-yellow-100 text-yellow-700"
                  }`}>
                    {wish.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-700 whitespace-pre-wrap mb-6">{wish.message}</p>
                
                {wish.status === "pending" && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => updateStatus(wish.id, "approved")}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus(wish.id, "rejected")}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                )}
                {wish.status !== "pending" && (
                  <button
                    onClick={() => updateStatus(wish.id, "pending")}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Reset to Pending
                  </button>
                )}

                {/* Comments Section */}
                {wish.comments && wish.comments.length > 0 && (
                  <div className="mt-6 border-t border-gray-100 pt-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      💬 Comments & Replies
                    </h4>
                    <div className="space-y-3">
                      {wish.comments.map((c, i) => (
                        <div key={i} className="bg-gray-50 rounded-lg p-3 flex justify-between items-start gap-4">
                          <div>
                            <p className="text-xs font-bold text-gray-600 mb-1">Adzra (Admin)</p>
                            <p className="text-sm text-gray-800">{c.text}</p>
                          </div>
                          <button
                            onClick={() => copyReply(wish, c.text)}
                            className="text-xs bg-pink-100 text-pink-700 px-3 py-1.5 rounded-md font-bold hover:bg-pink-200 transition-colors flex-shrink-0 border border-pink-200"
                          >
                            Copy Reply Lucu ✨
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
