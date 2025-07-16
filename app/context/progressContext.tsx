// app/context/progressContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type PlayerProgress = Record<number, {
  stars: number;
  correctAnswers: number;
}>;

interface ProgressContextType {
  progress: PlayerProgress;
  refreshProgress: () => Promise<void>;
}

const ProgressContext = createContext<ProgressContextType>({
  progress: {},
  refreshProgress: async () => {},
});

export function ProgressProvider({ 
  children,
  initialProgress
}: { 
  children: React.ReactNode;
  initialProgress: PlayerProgress;
}) {
  const [progress, setProgress] = useState<PlayerProgress>(initialProgress);

  const refreshProgress = async () => {
    try {
      const res = await fetch('/api/progress');
      if (!res.ok) throw new Error("Failed to fetch progress");
      const newProgress = await res.json();
      setProgress(newProgress);
      return newProgress;
    } catch (error) {
      console.error("Failed to refresh progress:", error);
      return progress; // Return current progress on error
    }
  };

  return (
    <ProgressContext.Provider value={{ progress, refreshProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}
// Custom hook to access the context
export const useProgress = () => {
    const context = useContext(ProgressContext);
    if (!context) {
      throw new Error('useProgress must be used within a ProgressProvider');
    }
    return context;
  };