"use client";

import React from "react";
import { useNovena } from "@/context/NovenaContext";
import { NOVENA_DAYS } from "@/data/novenaData";
import { Check, Sparkles } from "lucide-react";

export function DaySelector() {
  const { currentDay, setCurrentDay, completedDays } = useNovena();

  const handleSelectDay = (day: number) => {
    setCurrentDay(day);
    const prayerSection = document.getElementById("oracao");
    if (prayerSection) {
      prayerSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="jornada" className="py-10 bg-[#FAF7F2] border-b border-[#E8DCD1]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs uppercase font-bold tracking-widest text-[#8E1C2E] font-display">
            A Caminhada Espiritual
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2A080E] mt-1">
            Jornada dos 9 Dias da Novena
          </h2>
          <p className="text-xs sm:text-sm text-[#78716C] mt-2">
            Cada dia ilumina um tema da espiritualidade carmelita de Santa Teresinha, acompanhado de sua oração e de um milagre real documentado.
          </p>
        </div>

        {/* 9 Days Grid / Carousel */}
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-9 gap-2 sm:gap-2.5">
          {NOVENA_DAYS.map((item) => {
            const isSelected = item.day === currentDay;
            const isCompleted = completedDays.includes(item.day);

            return (
              <button
                key={item.day}
                onClick={() => handleSelectDay(item.day)}
                className={`relative flex flex-col items-center justify-between p-3 rounded-xl border text-center transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-[#8E1C2E] border-[#731524] text-white shadow-md scale-102 ring-2 ring-[#EED074]/70"
                    : isCompleted
                    ? "bg-[#F7F3EC] border-[#C89B27]/40 text-[#44403C] hover:bg-[#F2EAE0]"
                    : "bg-white border-[#E5DAC9] text-[#57534E] hover:border-[#8E1C2E]/60 hover:bg-[#FDFBF7]"
                }`}
                aria-label={`Selecionar ${item.day}º Dia: ${item.title}`}
              >
                {/* Completed badge */}
                {isCompleted && (
                  <span className={`absolute top-1.5 right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                    isSelected ? "bg-[#EED074] text-[#731524]" : "bg-[#8E1C2E] text-white"
                  }`}>
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                )}

                {/* Day number */}
                <span className={`text-[11px] font-bold uppercase tracking-wider ${
                  isSelected ? "text-[#EED074]" : "text-[#8E1C2E]"
                }`}>
                  {item.day}º Dia
                </span>

                {/* Day small theme */}
                <span className={`text-xs font-serif font-semibold mt-1 line-clamp-2 leading-tight ${
                  isSelected ? "text-white" : "text-[#1C1917]"
                }`}>
                  {item.theme.split("&")[0].trim()}
                </span>

                {/* Status indicator */}
                <div className="mt-2 text-[10px] font-medium opacity-85">
                  {isSelected ? (
                    <span className="inline-flex items-center gap-0.5 text-[#EED074]">
                      <Sparkles className="w-2.5 h-2.5" /> Ativo
                    </span>
                  ) : isCompleted ? (
                    <span className="text-[#8C6A17]">Rezado</span>
                  ) : (
                    <span className="text-[#A8A29E]">Pendente</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
