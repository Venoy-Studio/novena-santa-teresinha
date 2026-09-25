"use client";

import React from "react";
import { useNovena } from "@/context/NovenaContext";
import { PRAYER_TEXTS } from "@/data/novenaData";
import { Sparkles, RotateCcw, CheckCircle2, ChevronRight } from "lucide-react";

export function GloriaCounter() {
  const {
    currentDay,
    gloriaCount,
    incrementGloria,
    resetGloria,
    setGloriaCount,
    markDayCompleted,
  } = useNovena();

  const isCompleted = gloriaCount >= 24;

  return (
    <div className="sacred-card rounded-2xl p-5 sm:p-7 border border-[#E5DAC9] bg-gradient-to-b from-white to-[#FDFBF7]">
      
      {/* Header of the Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#E8DCD1]">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8E1C2E] font-display flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#8E1C2E]" />
            Terço dos 24 Glórias (Ação de Graças)
          </span>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2A080E] mt-0.5">
            Os 24 Anos de Santa Teresinha
          </h3>
          <p className="text-xs sm:text-sm text-[#78716C] mt-1">
            Reza-se 24 vezes o <em>Glória ao Pai</em> em louvor à Santíssima Trindade pelos 24 anos da santa na Terra.
          </p>
        </div>

        {/* Counter Progress Badge */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <span className="text-2xl font-bold font-serif text-[#8E1C2E]">
              {gloriaCount}
            </span>
            <span className="text-sm font-semibold text-[#A8A29E]"> / 24</span>
            <span className="block text-[10px] text-[#78716C] uppercase tracking-wider">
              Glórias Rezados
            </span>
          </div>
        </div>
      </div>

      {/* Visual Bead Rosary (24 beads) */}
      <div className="my-6">
        <div className="grid grid-cols-6 sm:grid-cols-12 gap-2 max-w-2xl mx-auto">
          {Array.from({ length: 24 }, (_, i) => i + 1).map((bead) => {
            const isBeadDone = bead <= gloriaCount;
            const isCurrent = bead === gloriaCount + 1;

            return (
              <button
                key={bead}
                onClick={() => setGloriaCount(bead)}
                className={`relative flex flex-col items-center justify-center h-11 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isBeadDone
                    ? "bg-[#8E1C2E] text-white shadow-xs scale-98"
                    : isCurrent
                    ? "bg-[#FAF0D4] border-2 border-[#C89B27] text-[#8C6A17] glow-gold scale-105 animate-soft-pulse"
                    : "bg-white border border-[#DFCFBE] text-[#A8A29E] hover:border-[#8E1C2E]/60 hover:text-[#570F1A]"
                }`}
                title={`Glória ${bead} de 24`}
                aria-label={`Glória número ${bead}`}
              >
                <span>{bead}</span>
                {/* Small rose petal indicator */}
                <span className={`text-[9px] -mt-1 ${isBeadDone ? "text-[#EED074]" : "text-[#D6C5B8]"}`}>
                  🌹
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Prayer Card */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#F7F3EC] border border-[#E5DAC9] text-center max-w-2xl mx-auto">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6A17] block mb-1">
          Oração do {isCompleted ? "24º" : `${gloriaCount + 1}º`} Glória
        </span>
        <p className="font-serif text-base sm:text-lg text-[#1C1917] leading-relaxed italic">
          “{PRAYER_TEXTS.gloria}”
        </p>
        <div className="mt-2.5 pt-2.5 border-t border-[#DFCFBE] text-xs sm:text-sm font-semibold text-[#8E1C2E]">
          Jaculatória: “{PRAYER_TEXTS.jaculatory}”
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {!isCompleted ? (
          <button
            onClick={incrementGloria}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#8E1C2E] text-white text-sm sm:text-base font-bold hover:bg-[#731524] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <span>Rezar Glória ({gloriaCount + 1}/24)</span>
            <ChevronRight className="w-5 h-5 text-[#EED074]" />
          </button>
        ) : (
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FAF0D4] border border-[#C89B27] text-[#8C6A17] text-sm font-bold shadow-xs">
            <CheckCircle2 className="w-5 h-5 text-[#8E1C2E]" />
            <span>24 Glórias Completados com Devoção!</span>
          </div>
        )}

        {/* Quick Complete / Reset Buttons */}
        <div className="flex items-center gap-2">
          {gloriaCount > 0 && (
            <button
              onClick={resetGloria}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-[#DFCFBE] text-xs font-semibold text-[#78716C] hover:text-[#8E1C2E] hover:border-[#8E1C2E] transition-colors"
              title="Reiniciar contador dos 24 Glórias"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar</span>
            </button>
          )}

          {!isCompleted && (
            <button
              onClick={() => setGloriaCount(24)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-[#DFCFBE] text-xs font-semibold text-[#57534E] hover:border-[#8E1C2E] transition-colors"
              title="Marcar todos os 24 Glórias como rezados"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C89B27]" />
              <span>Marcar os 24</span>
            </button>
          )}
        </div>
      </div>

      {/* Completion Banner */}
      {isCompleted && (
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-[#FDE8EB] via-white to-[#FDE8EB] border border-[#F8C7CE] text-center max-w-xl mx-auto animate-fadeIn">
          <span className="text-lg">🌹✨</span>
          <h4 className="font-serif font-bold text-base text-[#8E1C2E] mt-1">
            Chuva de Bênçãos e Rosas
          </h4>
          <p className="text-xs sm:text-sm text-[#570F1A] mt-1">
            Você louvou a Deus pelos 24 anos terrenos de Santa Teresinha. Que suas preces subam como incenso perfumado até o Trono da Graça!
          </p>
          <div className="mt-3">
            <button
              onClick={() => markDayCompleted(currentDay)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#8E1C2E] text-white text-xs font-bold hover:bg-[#731524] transition-colors shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4 text-[#EED074]" />
              <span>Concluir o {currentDay}º Dia da Novena</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
