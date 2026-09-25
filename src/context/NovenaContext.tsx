"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { NOVENA_DAYS, DayNovena } from "@/data/novenaData";
import { LitCandle, INITIAL_CANDLES, CandleType } from "@/data/candleData";
import { triggerRosePetalsShower } from "@/utils/confettiRoses";
import { prayerAudio } from "@/utils/audioChime";
import { 
  fetchCandlesFromStore, 
  persistNewCandle, 
  persistCandlePrayer, 
  subscribeToCandleChanges 
} from "@/services/candleService";

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
  isSharePrayerModalOpen: boolean;
  setIsSharePrayerModalOpen: (open: boolean) => void;
  isLightCandleModalOpen: boolean;
  setIsLightCandleModalOpen: (open: boolean) => void;
  candles: LitCandle[];
  isRealtimeActive: boolean;
  addCandle: (candleData: {
    devoteeName: string;
    location?: string;
    intention: string;
    type: CandleType;
    saintId: string;
    saintName: string;
    saintImage: string;
  }) => LitCandle;
  prayForCandle: (id: string) => void;
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

  const [candles, setCandles] = useState<LitCandle[]>(() => {
    if (typeof window === "undefined") return INITIAL_CANDLES;
    try {
      const saved = localStorage.getItem("novena_teresa_candles");
      if (saved) {
        const parsed: LitCandle[] = JSON.parse(saved);
        // Merge with initial candles to keep community alive while retaining user ones
        const userCandles = parsed.filter((c) => c.isUserOwned);
        return [...userCandles, ...INITIAL_CANDLES];
      }
    } catch {
      // ignore
    }
    return INITIAL_CANDLES;
  });

  const [isRealtimeActive, setIsRealtimeActive] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isContemplativeMode, setIsContemplativeMode] = useState<boolean>(false);
  const [isIntentionModalOpen, setIsIntentionModalOpen] = useState<boolean>(false);
  const [isSharePrayerModalOpen, setIsSharePrayerModalOpen] = useState<boolean>(false);
  const [isLightCandleModalOpen, setIsLightCandleModalOpen] = useState<boolean>(false);

  // Load candles from Supabase / Store and listen to real-time additions/prayers
  useEffect(() => {
    let isMounted = true;

    fetchCandlesFromStore().then(({ candles: loadedCandles, isRemote }) => {
      if (isMounted) {
        setCandles(loadedCandles);
        setIsRealtimeActive(isRemote);
      }
    });

    const unsubscribe = subscribeToCandleChanges(
      (newCandle) => {
        if (!isMounted) return;
        setCandles((prev) => {
          if (prev.some((c) => c.id === newCandle.id)) return prev;
          return [newCandle, ...prev];
        });
      },
      (candleId, newPrayerCount) => {
        if (!isMounted) return;
        setCandles((prev) =>
          prev.map((c) => (c.id === candleId ? { ...c, prayerCount: newPrayerCount } : c))
        );
      }
    );

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

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
    // Prompt to share that the devotee completed their prayer
    setIsSharePrayerModalOpen(true);
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
        setIsSharePrayerModalOpen(true);
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
        setIsSharePrayerModalOpen(true);
      }, 400);
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

  const addCandle = (candleData: {
    devoteeName: string;
    location?: string;
    intention: string;
    type: CandleType;
    saintId: string;
    saintName: string;
    saintImage: string;
  }): LitCandle => {
    const durationHours = candleData.type === "7_days" ? 168 : 24;
    const newCandle: LitCandle = {
      id: `candle-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      devoteeName: candleData.devoteeName.trim() || "Devoto de Santa Teresinha",
      location: candleData.location?.trim() || undefined,
      intention: candleData.intention.trim(),
      type: candleData.type,
      saintId: candleData.saintId,
      saintName: candleData.saintName,
      saintImage: candleData.saintImage,
      litAt: new Date().toISOString(),
      durationHours,
      prayerCount: 1,
      isUserOwned: true,
    };

    setCandles((prev) => {
      const updated = [newCandle, ...prev];
      try {
        const userOnly = updated.filter((c) => c.isUserOwned);
        localStorage.setItem("novena_teresa_candles", JSON.stringify(userOnly));
      } catch {
        // ignore
      }
      return updated;
    });

    // Persist to Supabase asynchronously (with automatic local fallback)
    persistNewCandle(newCandle);

    triggerRosePetalsShower();
    prayerAudio.playRoseCelebration();
    return newCandle;
  };

  const prayForCandle = (id: string) => {
    prayerAudio.playChime(659.25); // E5 soft blessing note
    setCandles((prev) =>
      prev.map((c) => (c.id === id ? { ...c, prayerCount: c.prayerCount + 1 } : c))
    );
    // Persist prayer to Supabase asynchronously
    persistCandlePrayer(id);
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
        isSharePrayerModalOpen,
        setIsSharePrayerModalOpen,
        isLightCandleModalOpen,
        setIsLightCandleModalOpen,
        candles,
        isRealtimeActive,
        addCandle,
        prayForCandle,
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
