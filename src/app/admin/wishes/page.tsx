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
      .order("created_at", { ascending: false });

    if (!error && data) {
      setWishes(data as Wish[]);
    }
    setLoading(false);
  };

  const updateStatus = async (id: number, status: "approved" | "rejected") => {
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

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Wishes Moderation</h1>

      {loading ? (
        <p className="text-gray-500">Loading wishes...</p>
      ) : wishes.length === 0 ? (
        <p className="text-gray-500">No wishes found.</p>
      ) : (
        <div className="grid gap-6">
          {wishes.map((wish) => (
            <div key={wish.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex gap-6">
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
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{wish.name}</h3>
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
