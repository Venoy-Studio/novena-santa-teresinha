"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { useNovena } from "@/context/NovenaContext";
import { LitCandle } from "@/data/candleData";
import { 
  Flame, 
  Sparkles, 
  Search, 
  Clock, 
  Heart, 
  CheckCircle2
} from "lucide-react";

export function VirtualCandleChapel() {
  const { candles, prayForCandle, setIsLightCandleModalOpen } = useNovena();

  const [activeTab, setActiveTab] = useState<"all" | "7_days" | "24_hours" | "mine">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [prayedCandleIds, setPrayedCandleIds] = useState<string[]>([]);
  const [currentTime, setCurrentTime] = useState<number>(() => Date.now());

  // Periodically update current time every minute to keep countdown pure and alive
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const filteredCandles = useMemo(() => {
    return candles.filter((candle) => {
      // Tab filter
      if (activeTab === "7_days" && candle.type !== "7_days") return false;
      if (activeTab === "24_hours" && candle.type !== "24_hours") return false;
      if (activeTab === "mine" && !candle.isUserOwned) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = candle.devoteeName.toLowerCase().includes(query);
        const matchesIntention = candle.intention.toLowerCase().includes(query);
        const matchesLocation = candle.location?.toLowerCase().includes(query) || false;
        const matchesSaint = candle.saintName.toLowerCase().includes(query);
        return matchesName || matchesIntention || matchesLocation || matchesSaint;
      }

      return true;
    });
  }, [candles, activeTab, searchQuery]);

  const count7Days = candles.filter((c) => c.type === "7_days").length;
  const count24Hours = candles.filter((c) => c.type === "24_hours").length;
  const countMine = candles.filter((c) => c.isUserOwned).length;

  const handlePray = (id: string) => {
    prayForCandle(id);
    if (!prayedCandleIds.includes(id)) {
      setPrayedCandleIds([...prayedCandleIds, id]);
    }
  };

  const getRemainingTimeText = (candle: LitCandle, now: number) => {
    const litTime = new Date(candle.litAt).getTime();
    const expiryTime = litTime + candle.durationHours * 3600 * 1000;
    const diffMs = expiryTime - now;

    if (diffMs <= 0) return "Queima completada";

    const hours = Math.floor(diffMs / (3600 * 1000));
    const days = Math.floor(hours / 24);
    const remHours = hours % 24;

    if (days > 0) {
      return `Restam ${days}d e ${remHours}h`;
    }
    return `Restam ${hours}h`;
  };

  return (
    <section id="capela-velas" className="py-16 bg-gradient-to-b from-[#1C1412] via-[#241916] to-[#1C1412] text-[#F5EFEB] border-b border-[#382622] relative overflow-hidden">
      
      {/* Ambient Candlelight Warm Glow Background */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#C89B27]/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#382622] border border-[#C89B27]/50 text-[#EED074] text-xs font-semibold uppercase tracking-wider font-display mb-3">
            <Flame className="w-3.5 h-3.5 text-[#C89B27] animate-pulse" />
            Altar Votivo Perpétuo
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Capela Virtual das Velas
          </h2>
          <p className="text-xs sm:text-sm text-[#D6C5B8] mt-2.5 leading-relaxed">
            Acenda uma vela votiva de <strong>7 dias</strong> com o rosto de <strong>Santa Teresinha</strong> ou uma vela de <strong>24 horas</strong> com o seu Santo de devoção. Deixe gravada sua prece e receba as orações de toda a comunidade.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setIsLightCandleModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#C89B27] to-[#A88120] hover:from-[#DFB23E] hover:to-[#C89B27] text-[#2A080E] text-sm font-bold shadow-lg hover:shadow-xl hover:scale-102 transition-all cursor-pointer"
            >
              <Flame className="w-4 h-4 fill-current text-[#570F1A]" />
              <span>Acender uma Vela no Altar</span>
            </button>
          </div>
        </div>

        {/* Altar Controls & Filter Bar */}
        <div className="p-4 rounded-2xl bg-[#2A1E1B] border border-[#44302B] mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "all"
                    ? "bg-[#C89B27] text-[#2A080E] font-bold shadow-sm"
                    : "text-[#D6C5B8] hover:bg-[#382622]"
                }`}
              >
                Todas ({candles.length})
              </button>

              <button
                onClick={() => setActiveTab("7_days")}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "7_days"
                    ? "bg-[#C89B27] text-[#2A080E] font-bold shadow-sm"
                    : "text-[#D6C5B8] hover:bg-[#382622]"
                }`}
              >
                <span>🌹 7 Dias Santa Teresinha ({count7Days})</span>
              </button>

              <button
                onClick={() => setActiveTab("24_hours")}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "24_hours"
                    ? "bg-[#C89B27] text-[#2A080E] font-bold shadow-sm"
                    : "text-[#D6C5B8] hover:bg-[#382622]"
                }`}
              >
                <span>24 Horas ({count24Hours})</span>
              </button>

              {countMine > 0 && (
                <button
                  onClick={() => setActiveTab("mine")}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === "mine"
                      ? "bg-[#8E1C2E] text-white font-bold shadow-sm"
                      : "text-[#EED074] hover:bg-[#382622]"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Minhas Velas ({countMine})</span>
                </button>
              )}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-[#A89E9A] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nome ou intenção..."
                className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-[#1C1412] border border-[#44302B] text-xs text-white placeholder:text-[#8C7E7A] focus:outline-none focus:ring-2 focus:ring-[#C89B27]"
              />
            </div>

          </div>
        </div>

        {/* Candles Grid on Altar */}
        {filteredCandles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCandles.map((candle) => {
              const hasPrayed = prayedCandleIds.includes(candle.id);
              const is7Days = candle.type === "7_days";

              return (
                <div
                  key={candle.id}
                  className={`rounded-3xl p-5 border transition-all flex flex-col justify-between relative ${
                    is7Days
                      ? "bg-gradient-to-b from-[#2F201C] to-[#241916] border-[#EED074]/60 shadow-lg hover:border-[#EED074]"
                      : "bg-[#251A18] border-[#44302B] hover:border-[#8E1C2E]/60 shadow-md"
                  }`}
                >
                  {/* Top Bar of Card */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                      is7Days
                        ? "bg-[#FAF0D4] text-[#731524] border-[#EED074]"
                        : "bg-[#382622] text-[#EED074] border-[#44302B]"
                    }`}>
                      {is7Days ? "🌹 Vela de 7 Dias" : "🕯️ Vela de 24 Horas"}
                    </span>

                    <span className="text-[11px] text-[#A89E9A] flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-[#C89B27]" />
                      {getRemainingTimeText(candle, currentTime)}
                    </span>
                  </div>

                  {/* Candle Graphic and Saint Cameo */}
                  <div className="my-2 flex items-center gap-4">
                    {/* Realistic Animated Candle Cylinder */}
                    <div className="flex flex-col items-center shrink-0">
                      {/* Realistic Flame with Warm Ambient Glow */}
                      <div className="relative mb-1 flex flex-col items-center">
                        <div className="w-4 h-7 rounded-full bg-gradient-to-t from-[#C89B27] via-[#EED074] to-white animate-soft-pulse glow-gold" />
                        <div className="w-0.5 h-2 bg-[#33201B] -mt-0.5" />
                      </div>
                      
                      {/* Wax Body */}
                      <div className={`rounded-t-xl rounded-b-lg border relative overflow-hidden flex flex-col items-center justify-between p-1 shadow-md ${
                        is7Days 
                          ? "w-16 h-28 bg-gradient-to-b from-[#FFFDF8] via-[#F4EFE6] to-[#EBD9CF] border-[#EED074]"
                          : "w-16 h-22 bg-gradient-to-b from-[#FFFDF8] to-[#EBD9CF] border-[#DFCFBE]"
                      }`}>
                        {/* Saint Cameo on Candle Body */}
                        <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#C89B27] shadow-sm my-auto">
                          <Image
                            src={candle.saintImage}
                            alt={candle.saintName}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>

                        {/* Gold Base Fillet */}
                        <div className="w-full h-1.5 bg-gradient-to-r from-[#C89B27] via-[#EED074] to-[#C89B27] rounded-xs" />
                      </div>
                    </div>

                    {/* Devotee Info & Saint Patron */}
                    <div className="flex-1 text-left">
                      <span className="text-xs text-[#EED074] font-serif block">
                        Dedicada a {candle.saintName}
                      </span>
                      <h4 className="font-serif font-bold text-base sm:text-lg text-white leading-tight mt-0.5">
                        {candle.devoteeName}
                      </h4>
                      {candle.location && (
                        <span className="text-[11px] text-[#A89E9A] block mt-0.5">
                          📍 {candle.location}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Intention Text */}
                  <div className="p-3.5 rounded-xl bg-[#1C1412] border border-[#382622] my-3 text-left">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C89B27] block mb-1">
                      Intenção:
                    </span>
                    <p className="font-serif italic text-xs sm:text-sm text-[#FAF7F2] leading-relaxed line-clamp-3">
                      “{candle.intention}”
                    </p>
                  </div>

                  {/* Footer & Pray Together Button */}
                  <div className="pt-2 border-t border-[#382622] flex items-center justify-between gap-2">
                    <span className="text-xs text-[#D6C5B8] flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-[#8E1C2E] fill-current" />
                      <strong>{candle.prayerCount}</strong> {candle.prayerCount === 1 ? "prece" : "preces"}
                    </span>

                    <button
                      onClick={() => handlePray(candle.id)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        hasPrayed
                          ? "bg-[#FAF0D4] text-[#731524] font-bold"
                          : "bg-[#382622] hover:bg-[#8E1C2E] text-white hover:text-white"
                      }`}
                    >
                      {hasPrayed ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#8E1C2E]" />
                          <span>Amém (Rezado)</span>
                        </>
                      ) : (
                        <>
                          <span>🙏 Rezar Junto</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 rounded-3xl bg-[#251A18] border border-[#382622] text-center max-w-lg mx-auto">
            <span className="text-4xl mb-3 block">🕯️</span>
            <h4 className="font-serif font-bold text-lg text-white">
              Nenhuma vela encontrada
            </h4>
            <p className="text-xs text-[#A89E9A] mt-1">
              Seja o primeiro a acender uma vela nesta categoria ou altere sua busca.
            </p>
            <button
              onClick={() => setIsLightCandleModalOpen(true)}
              className="mt-4 px-5 py-2.5 rounded-xl bg-[#C89B27] text-[#2A080E] text-xs font-bold hover:bg-[#DFB23E] transition-colors cursor-pointer"
            >
              Acender Vela Agora
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
