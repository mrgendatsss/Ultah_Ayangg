"use client";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

export type ClueStatus = "locked" | "available" | "outside_done" | "completed";

export type HuntProgress = {
  clue1: ClueStatus;
  clue2: ClueStatus;
  clue3: ClueStatus;
};

const DEFAULT: HuntProgress = {
  clue1: "available",
  clue2: "locked",
  clue3: "locked",
};

export function useHuntProgress() {
  const [progress, setProgress] = useState<HuntProgress>(DEFAULT);
  const [loaded, setLoaded] = useState(false);

  // Load from Supabase on mount, fallback to localStorage
  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await supabase
          .from("site_settings")
          .select("hunt_progress")
          .single();

        if (data?.hunt_progress) {
          setProgress(data.hunt_progress as HuntProgress);
          localStorage.setItem("hunt_progress", JSON.stringify(data.hunt_progress));
        } else {
          // Fallback to localStorage
          const stored = localStorage.getItem("hunt_progress");
          if (stored) setProgress(JSON.parse(stored));
        }
      } catch {
        // Fallback to localStorage if Supabase fails
        const stored = localStorage.getItem("hunt_progress");
        if (stored) setProgress(JSON.parse(stored));
      }
      setLoaded(true);
    };
    load();
  }, []);

  // Save to both Supabase and localStorage
  const save = useCallback(async (p: HuntProgress) => {
    setProgress(p);
    localStorage.setItem("hunt_progress", JSON.stringify(p));

    await supabase
      .from("site_settings")
      .update({ hunt_progress: p })
      .not("id", "is", null);
  }, []);

  const completeOutside = useCallback(
    (id: number) => {
      const key = `clue${id}` as keyof HuntProgress;
      save({ ...progress, [key]: "outside_done" });
    },
    [progress, save]
  );

  const completeClue = useCallback(
    (id: number) => {
      const key = `clue${id}` as keyof HuntProgress;
      const next = `clue${id + 1}` as keyof HuntProgress;
      const p: HuntProgress = { ...progress, [key]: "completed" };
      if (id < 3) p[next] = "available";
      save(p);
    },
    [progress, save]
  );

  const isAllComplete =
    progress.clue1 === "completed" &&
    progress.clue2 === "completed" &&
    progress.clue3 === "completed";

  return { progress, loaded, completeOutside, completeClue, isAllComplete };
}
