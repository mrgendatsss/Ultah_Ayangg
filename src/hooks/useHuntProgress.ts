"use client";
import { useState, useEffect, useCallback } from "react";

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

  useEffect(() => {
    try {
      const s = localStorage.getItem("hunt_progress");
      if (s) setProgress(JSON.parse(s));
    } catch {}
    setLoaded(true);
  }, []);

  const save = (p: HuntProgress) => {
    setProgress(p);
    localStorage.setItem("hunt_progress", JSON.stringify(p));
  };

  const completeOutside = useCallback(
    (id: number) => {
      const key = `clue${id}` as keyof HuntProgress;
      save({ ...progress, [key]: "outside_done" });
    },
    [progress]
  );

  const completeClue = useCallback(
    (id: number) => {
      const key = `clue${id}` as keyof HuntProgress;
      const next = `clue${id + 1}` as keyof HuntProgress;
      const p: HuntProgress = { ...progress, [key]: "completed" };
      if (id < 3) p[next] = "available";
      save(p);
    },
    [progress]
  );

  const isAllComplete =
    progress.clue1 === "completed" &&
    progress.clue2 === "completed" &&
    progress.clue3 === "completed";

  return { progress, loaded, completeOutside, completeClue, isAllComplete };
}
