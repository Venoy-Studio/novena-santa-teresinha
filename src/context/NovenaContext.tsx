"use client";

import React, { createContext, useContext, useState } from "react";
import { NOVENA_DAYS, DayNovena } from "@/data/novenaData";
import { triggerRosePetalsShower } from "@/utils/confettiRoses";
import { prayerAudio } from "@/utils/audioChime";

interface NovenaContextType {
  currentDay: number;
  setCurrentDay: (day: number) => void;
  selectedDayData: DayNovena;
  userIntention: string;
  setUserIntention: (intention: string) => void;
  completedDays: number[];
  markDayCompleted: (day: number) => void;
  toggleDayCompleted: (day: number) => void;
  gloriaCount: number;
  incrementGloria: () => void;
  resetGloria: () => void;
  setGloriaCount: (count: number) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  isContemplativeMode: boolean;
  setIsContemplativeMode: (open: boolean) => void;
  isIntentionModalOpen: boolean;
  setIsIntentionModalOpen: (open: boolean) => void;
}

const NovenaContext = createContext<NovenaContextType | undefined>(undefined);

export function NovenaProvider({ children }: { children: React.ReactNode }) {
  // Use lazy state initializers to read from localStorage safely without useEffect setState
  const [currentDay, setCurrentDayState] = useState<number>(() => {
    if (typeof window === "undefined") return 1;
    try {
      const saved = localStorage.getItem("novena_teresa_current_day");
      if (saved) {
        const val = parseInt(saved, 10);
        if (val >= 1 && val <= 9) return val;
      }
    } catch {
      // ignore
    }
    return 1;
  });

  const [userIntention, setUserIntentionState] = useState<string>(() => {
    if (typeof window === "undefined") return "";
    try {
      return localStorage.getItem("novena_teresa_intention") || "";
    } catch {
      return "";
    }
  });

  const [completedDays, setCompletedDays] = useState<number[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("novena_teresa_completed");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [gloriaCountsByDay, setGloriaCountsByDay] = useState<Record<number, number>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const saved = localStorage.getItem("novena_teresa_glorias");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isContemplativeMode, setIsContemplativeMode] = useState<boolean>(false);
  const [isIntentionModalOpen, setIsIntentionModalOpen] = useState<boolean>(false);

  const setCurrentDay = (day: number) => {
    if (day < 1 || day > 9) return;
    setCurrentDayState(day);
    try {
      localStorage.setItem("novena_teresa_current_day", day.toString());
    } catch {
      // ignore
    }
  };

  const setUserIntention = (intention: string) => {
    setUserIntentionState(intention);
    try {
      localStorage.setItem("novena_teresa_intention", intention);
    } catch {
      // ignore
    }
  };

  const markDayCompleted = (day: number) => {
    setCompletedDays((prev) => {
      if (prev.includes(day)) return prev;
      const updated = [...prev, day].sort((a, b) => a - b);
      try {
        localStorage.setItem("novena_teresa_completed", JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    triggerRosePetalsShower();
    prayerAudio.playRoseCelebration();
  };

  const toggleDayCompleted = (day: number) => {
    setCompletedDays((prev) => {
      let updated: number[];
      if (prev.includes(day)) {
        updated = prev.filter((d) => d !== day);
      } else {
        updated = [...prev, day].sort((a, b) => a - b);
        triggerRosePetalsShower();
        prayerAudio.playRoseCelebration();
      }
      try {
        localStorage.setItem("novena_teresa_completed", JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const gloriaCount = gloriaCountsByDay[currentDay] || 0;

  const incrementGloria = () => {
    const current = gloriaCountsByDay[currentDay] || 0;
    if (current >= 24) return;
    const next = current + 1;
    
    prayerAudio.playChime(587.33 + next * 8);

    setGloriaCountsByDay((prev) => {
      const updated = { ...prev, [currentDay]: next };
      try {
        localStorage.setItem("novena_teresa_glorias", JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });

    if (next === 24) {
      setTimeout(() => {
        triggerRosePetalsShower();
        prayerAudio.playRoseCelebration();
      }, 300);
    }
  };

  const resetGloria = () => {
    setGloriaCountsByDay((prev) => {
      const updated = { ...prev, [currentDay]: 0 };
      try {
        localStorage.setItem("novena_teresa_glorias", JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const setGloriaCount = (count: number) => {
    const clamped = Math.max(0, Math.min(24, count));
    setGloriaCountsByDay((prev) => {
      const updated = { ...prev, [currentDay]: clamped };
      try {
        localStorage.setItem("novena_teresa_glorias", JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const toggleSound = () => {
    const state = prayerAudio.toggleSound();
    setSoundEnabled(state);
  };

  const selectedDayData = NOVENA_DAYS[currentDay - 1] || NOVENA_DAYS[0];

  return (
    <NovenaContext.Provider
      value={{
        currentDay,
        setCurrentDay,
        selectedDayData,
        userIntention,
        setUserIntention,
        completedDays,
        markDayCompleted,
        toggleDayCompleted,
        gloriaCount,
        incrementGloria,
        resetGloria,
        setGloriaCount,
        soundEnabled,
        toggleSound,
        isContemplativeMode,
        setIsContemplativeMode,
        isIntentionModalOpen,
        setIsIntentionModalOpen,
      }}
    >
      {children}
    </NovenaContext.Provider>
  );
}

export function useNovena() {
  const context = useContext(NovenaContext);
  if (!context) {
    throw new Error("useNovena must be used within a NovenaProvider");
  }
  return context;
}
