import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { LitCandle, INITIAL_CANDLES } from "@/data/candleData";

export interface DatabaseCandle {
  id: string;
  devotee_name: string;
  location: string | null;
  intention: string;
  type: "7_days" | "24_hours";
  saint_id: string;
  saint_name: string;
  saint_image: string;
  lit_at: string;
  duration_hours: number;
  prayer_count: number;
  created_at?: string;
}

// Map from Database row to application LitCandle
export function mapDatabaseToCandle(row: DatabaseCandle, userOwnedIds: Set<string>): LitCandle {
  return {
    id: row.id,
    devoteeName: row.devotee_name,
    location: row.location || undefined,
    intention: row.intention,
    type: row.type,
    saintId: row.saint_id,
    saintName: row.saint_name,
    saintImage: row.saint_image,
    litAt: row.lit_at,
    durationHours: row.duration_hours,
    prayerCount: row.prayer_count || 1,
    isUserOwned: userOwnedIds.has(row.id),
  };
}

// Map from application LitCandle to Database row
export function mapCandleToDatabase(candle: LitCandle): DatabaseCandle {
  return {
    id: candle.id,
    devotee_name: candle.devoteeName,
    location: candle.location || null,
    intention: candle.intention,
    type: candle.type,
    saint_id: candle.saintId,
    saint_name: candle.saintName,
    saint_image: candle.saintImage,
    lit_at: candle.litAt,
    duration_hours: candle.durationHours,
    prayer_count: candle.prayerCount,
  };
}

const USER_CANDLES_KEY = "novena_teresa_user_candle_ids";

export function getUserOwnedCandleIds(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(USER_CANDLES_KEY);
    if (raw) {
      const arr: string[] = JSON.parse(raw);
      return new Set(arr);
    }
  } catch {
    // ignore
  }
  return new Set();
}

export function saveUserOwnedCandleId(id: string) {
  if (typeof window === "undefined") return;
  try {
    const ids = getUserOwnedCandleIds();
    ids.add(id);
    localStorage.setItem(USER_CANDLES_KEY, JSON.stringify(Array.from(ids)));
  } catch {
    // ignore
  }
}

/**
 * Fetch candles from Supabase with fallback to localStorage and initial seeds
 */
export async function fetchCandlesFromStore(): Promise<{
  candles: LitCandle[];
  isRemote: boolean;
}> {
  const userOwnedIds = getUserOwnedCandleIds();

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from("candles")
        .select("*")
        .order("lit_at", { ascending: false })
        .limit(100);

      if (!error && data && data.length > 0) {
        const mapped = data.map((row: DatabaseCandle) =>
          mapDatabaseToCandle(row, userOwnedIds)
        );
        return { candles: mapped, isRemote: true };
      }
    } catch (err) {
      console.warn("Could not fetch candles from Supabase, falling back to local storage:", err);
    }
  }

  // Fallback to local storage + INITIAL_CANDLES
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem("novena_teresa_candles");
      if (saved) {
        const parsed: LitCandle[] = JSON.parse(saved);
        const userCandles = parsed.filter((c) => c.isUserOwned);
        return { candles: [...userCandles, ...INITIAL_CANDLES], isRemote: false };
      }
    } catch {
      // ignore
    }
  }

  return { candles: INITIAL_CANDLES, isRemote: false };
}

/**
 * Persist new candle in Supabase or LocalStorage
 */
export async function persistNewCandle(candle: LitCandle): Promise<boolean> {
  saveUserOwnedCandleId(candle.id);

  if (isSupabaseConfigured() && supabase) {
    try {
      const dbRow = mapCandleToDatabase(candle);
      const { error } = await supabase.from("candles").insert([dbRow]);
      if (!error) return true;
      console.error("Error inserting candle into Supabase:", error);
    } catch (err) {
      console.error("Exception inserting candle into Supabase:", err);
    }
  }

  // Local storage persistence
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem("novena_teresa_candles");
      const currentList: LitCandle[] = saved ? JSON.parse(saved) : [];
      const updated = [candle, ...currentList.filter((c) => c.id !== candle.id)];
      localStorage.setItem("novena_teresa_candles", JSON.stringify(updated));
    } catch {
      // ignore
    }
  }

  return false;
}

/**
 * Increment prayer count for a candle
 */
export async function persistCandlePrayer(candleId: string): Promise<void> {
  if (isSupabaseConfigured() && supabase) {
    try {
      // 1. Try atomic stored procedure if user executed the SQL script
      const { error: rpcError } = await supabase.rpc("increment_candle_prayer", {
        target_candle_id: candleId,
      });

      if (rpcError) {
        // 2. Fallback: direct query increment if RPC is not installed
        const { data: row } = await supabase
          .from("candles")
          .select("prayer_count")
          .eq("id", candleId)
          .single();

        if (row) {
          await supabase
            .from("candles")
            .update({ prayer_count: (row.prayer_count || 0) + 1 })
            .eq("id", candleId);
        }
      }
    } catch (err) {
      console.warn("Could not sync prayer to Supabase:", err);
    }
  }
}

/**
 * Real-time subscription to candle updates
 */
export function subscribeToCandleChanges(
  onCandleInserted: (candle: LitCandle) => void,
  onCandleUpdated: (candleId: string, newPrayerCount: number) => void
): () => void {
  if (!isSupabaseConfigured() || !supabase) {
    return () => {};
  }

  const client = supabase;

  const channel = client
    .channel("public:candles")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "candles" },
      (payload) => {
        const newRow = payload.new as DatabaseCandle;
        const userOwnedIds = getUserOwnedCandleIds();
        const candle = mapDatabaseToCandle(newRow, userOwnedIds);
        onCandleInserted(candle);
      }
    )
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "candles" },
      (payload) => {
        const updatedRow = payload.new as DatabaseCandle;
        if (updatedRow && updatedRow.id) {
          onCandleUpdated(updatedRow.id, updatedRow.prayer_count || 1);
        }
      }
    )
    .subscribe();

  return () => {
    client.removeChannel(channel);
  };
}

export interface DevoteeProfile {
  id: string;
  name: string;
  favoriteSaint?: string;
  createdAt?: string;
}

const DEVOTEE_PROFILE_KEY = "novena_teresa_devotee_profile";

export function getLocalDevoteeProfile(): DevoteeProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(DEVOTEE_PROFILE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return null;
}

export function saveLocalDevoteeProfile(profile: DevoteeProfile) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(DEVOTEE_PROFILE_KEY, JSON.stringify(profile));
  } catch {
    // ignore
  }
}

/**
 * Register or update devotee in Supabase and LocalStorage
 */
export async function registerDevotee(
  name: string,
  favoriteSaint?: string
): Promise<DevoteeProfile> {
  const existing = getLocalDevoteeProfile();
  const id = existing?.id || `devotee-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const profile: DevoteeProfile = {
    id,
    name: name.trim(),
    favoriteSaint: favoriteSaint?.trim() || undefined,
    createdAt: new Date().toISOString(),
  };

  saveLocalDevoteeProfile(profile);

  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase.from("devotees").upsert([
        {
          id: profile.id,
          name: profile.name,
          favorite_saint: profile.favoriteSaint || null,
        },
      ]);
    } catch (err) {
      console.warn("Could not save devotee to Supabase:", err);
    }
  }

  return profile;
}

/**
 * Save intention to Supabase and LocalStorage
 */
export async function persistDevoteeIntention(
  devoteeName: string,
  intention: string
): Promise<void> {
  if (isSupabaseConfigured() && supabase && intention.trim()) {
    try {
      await supabase.from("intentions").insert([
        {
          id: `intention-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          devotee_name: devoteeName.trim() || "Devoto(a) em Oração",
          intention: intention.trim(),
        },
      ]);
    } catch (err) {
      console.warn("Could not save intention to Supabase:", err);
    }
  }
}

