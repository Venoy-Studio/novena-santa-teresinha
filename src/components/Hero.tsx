"use client";

import React from "react";
import { useNovena } from "@/context/NovenaContext";
import { 
  Sparkles, 
  HeartHandshake, 
  Flame, 
  CalendarDays, 
  ChevronRight,
  ShieldCheck
} from "lucide-react";

export function Hero() {
  const { 
    currentDay, 
    userIntention, 
    setIsIntentionModalOpen, 
    setIsContemplativeMode 
  } = useNovena();

  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 bg-gradient-to-b from-[#F4EFE6] via-[#FAF7F2] to-[#FAF7F2] border-b border-[#E8DCD1]">
      
      {/* Decorative subtle background ornaments */}
      <div className="absolute top-0 inset-x-0 h-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FCE7E9]/70 via-[#FAF7F2]/40 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Liturgical Tag */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5DAC9] text-[#731524] text-xs font-semibold shadow-2xs tracking-wider uppercase font-display">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8E1C2E] animate-pulse" />
            Doutora da Igreja & Padroeira das Missões
          </div>
        </div>

        {/* Hero Title & Quote */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#2A080E] tracking-tight leading-[1.15]">
            Novena das Rosas de Santa Teresinha do Menino Jesus
          </h1>

          <div className="my-5 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C89B27]" />
            <span className="text-[#C89B27] text-lg">✝</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C89B27]" />
          </div>

          <blockquote className="font-serif-sacred italic text-lg sm:text-xl md:text-2xl text-[#570F1A] font-medium leading-relaxed max-w-2xl mx-auto">
            “Passarei o meu Céu a fazer o bem sobre a Terra. Farei cair do Céu uma chuva de rosas.”
          </blockquote>
          
          <p className="mt-3 text-xs sm:text-sm text-[#78716C] font-medium">
            — Santa Teresa do Menino Jesus e da Sagrada Face (1873 – 1897)
          </p>
        </div>

        {/* Intention Status Banner (if set) */}
        {userIntention ? (
          <div className="mt-8 max-w-xl mx-auto p-4 rounded-xl bg-white/90 border border-[#F8C7CE] shadow-sm flex items-start gap-3">
            <div className="p-2 rounded-full bg-[#FDE8EB] text-[#8E1C2E] shrink-0 mt-0.5">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <div className="flex-1 text-left">
              <span className="text-xs uppercase font-bold tracking-wider text-[#8E1C2E] block">
                Sua Intenção Gravada Nesta Novena:
              </span>
              <p className="text-sm font-serif italic text-[#1C1917] mt-0.5 line-clamp-2">
                “{userIntention}”
              </p>
            </div>
            <button
              onClick={() => setIsIntentionModalOpen(true)}
              className="text-xs font-semibold text-[#8E1C2E] underline hover:text-[#570F1A] pt-1"
            >
              Alterar
            </button>
          </div>
        ) : (
          <div className="mt-8 max-w-xl mx-auto p-4 rounded-xl bg-white/80 border border-[#E8DCD1] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-[#FAF0D4] text-[#8C6A17] shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <p className="text-xs sm:text-sm text-[#44403C]">
                Apresente seu pedido particular a Santa Teresinha para que ele seja incluído nas preces.
              </p>
            </div>
            <button
              onClick={() => setIsIntentionModalOpen(true)}
              className="shrink-0 px-3.5 py-1.5 rounded-lg bg-[#8E1C2E] text-white text-xs font-semibold hover:bg-[#731524] transition-colors shadow-2xs"
            >
              Escrever Pedido
            </button>
          </div>
        )}

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <a
            href="#oracao"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#8E1C2E] text-white text-sm sm:text-base font-semibold hover:bg-[#731524] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <span>Rezar o {currentDay}º Dia Agora</span>
            <ChevronRight className="w-4 h-4" />
          </a>

          <button
            onClick={() => setIsContemplativeMode(true)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-[#DFCFBE] text-[#570F1A] text-sm sm:text-base font-semibold hover:bg-[#FAF7F2] hover:border-[#8E1C2E] transition-all shadow-2xs"
          >
            <Flame className="w-4 h-4 text-[#C89B27]" />
            <span>Modo Capela (Sem Distrações)</span>
          </button>
        </div>

        {/* Traditional Dates Info Cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto text-left text-xs">
          
          <div className="p-3.5 rounded-lg bg-white/70 border border-[#E8DCD1]">
            <div className="flex items-center gap-2 text-[#8E1C2E] font-bold mb-1">
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Período Solene</span>
            </div>
            <p className="text-[#57534E]">
              De <strong>22 a 30 de Setembro</strong>, em preparação para a Festa Litúrgica de Santa Teresinha (1º de Outubro).
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-white/70 border border-[#E8DCD1]">
            <div className="flex items-center gap-2 text-[#8C6A17] font-bold mb-1">
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Período Mensal</span>
            </div>
            <p className="text-[#57534E]">
              Tradicionalmente rezada de <strong>9 a 17 de cada mês</strong> por milhares de fiéis carmelitas no mundo.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-white/70 border border-[#E8DCD1]">
            <div className="flex items-center gap-2 text-[#292524] font-bold mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8E1C2E]" />
              <span>Súplica Imediata</span>
            </div>
            <p className="text-[#57534E]">
              Pode ser iniciada em <strong>qualquer dia do ano</strong> em momentos de aflição, conversão ou ação de graças.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
