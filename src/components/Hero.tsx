"use client";

import React from "react";
import Image from "next/image";
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
    setIsContemplativeMode,
    setIsLightCandleModalOpen,
    devoteeProfile,
  } = useNovena();

  return (
    <section className="relative overflow-hidden pt-6 pb-10 sm:pt-12 sm:pb-16 bg-gradient-to-b from-[#F4EFE6] via-[#FAF7F2] to-[#FAF7F2] border-b border-[#E8DCD1]">
      
      {/* Decorative subtle background ornaments */}
      <div className="absolute top-0 inset-x-0 h-44 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FCE7E9]/80 via-[#FAF7F2]/40 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Sacred Cameo & Liturgical Tag */}
        <div className="flex flex-col items-center justify-center mb-3 sm:mb-4">
          
          {/* Saint Therese Cameo with Golden Halo */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden ring-4 ring-[#EED074]/90 shadow-xl mb-3.5 transform hover:scale-105 transition-transform duration-300 glow-gold">
            <Image
              src="/images/santa-teresinha.jpg"
              alt="Santa Teresinha do Menino Jesus"
              fill
              sizes="(max-width: 640px) 80px, 112px"
              priority
              className="object-cover"
            />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5DAC9] text-[#731524] text-[11px] sm:text-xs font-bold shadow-2xs tracking-wider uppercase font-display">
            <span className="w-2 h-2 rounded-full bg-[#8E1C2E] animate-pulse" />
            {devoteeProfile ? (
              <span>Paz e Bem, {devoteeProfile.name.split(" ")[0]}! {devoteeProfile.favoriteSaint ? `• Devoção a ${devoteeProfile.favoriteSaint}` : ""}</span>
            ) : (
              <span>Doutora da Igreja & Padroeira das Missões</span>
            )}
          </div>
        </div>

        {/* Hero Title & Quote */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#2A080E] tracking-tight leading-[1.15]">
            Novena das Rosas de Santa Teresinha do Menino Jesus
          </h1>

          <div className="my-3 sm:my-5 flex items-center justify-center gap-3">
            <div className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-[#C89B27]" />
            <span className="text-[#C89B27] text-base sm:text-lg">✝</span>
            <div className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-[#C89B27]" />
          </div>

          <blockquote className="font-serif-sacred italic text-base sm:text-xl md:text-2xl lg:text-3xl text-[#570F1A] font-medium leading-relaxed max-w-3xl mx-auto px-2">
            “Passarei o meu Céu a fazer o bem sobre a Terra. Farei cair do Céu uma chuva de rosas.”
          </blockquote>
          
          <p className="mt-2.5 text-xs sm:text-sm text-[#78716C] font-medium">
            — Santa Teresa do Menino Jesus e da Sagrada Face (1873 – 1897)
          </p>
        </div>

        {/* Intention Status Banner (if set) */}
        {userIntention ? (
          <div className="mt-6 sm:mt-8 max-w-xl mx-auto p-3.5 sm:p-4 rounded-2xl bg-white/95 border border-[#F8C7CE] shadow-sm flex items-start gap-3">
            <div className="p-2 rounded-full bg-[#FDE8EB] text-[#8E1C2E] shrink-0 mt-0.5">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <div className="flex-1 text-left min-w-0">
              <span className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-[#8E1C2E] block">
                Sua Intenção Gravada Nesta Novena:
              </span>
              <p className="text-xs sm:text-sm font-serif italic text-[#1C1917] mt-0.5 truncate sm:line-clamp-2">
                “{userIntention}”
              </p>
            </div>
            <button
              onClick={() => setIsIntentionModalOpen(true)}
              className="text-xs font-semibold text-[#8E1C2E] underline hover:text-[#570F1A] pt-1 shrink-0 cursor-pointer"
            >
              Alterar
            </button>
          </div>
        ) : (
          <div className="mt-6 sm:mt-8 max-w-xl mx-auto p-3.5 sm:p-4 rounded-2xl bg-white/90 border border-[#E8DCD1] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="p-2 rounded-full bg-[#FAF0D4] text-[#8C6A17] shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <p className="text-xs sm:text-sm text-[#44403C]">
                Apresente seu pedido a Santa Teresinha para que ele seja incluído nas suas orações.
              </p>
            </div>
            <button
              onClick={() => setIsIntentionModalOpen(true)}
              className="w-full sm:w-auto shrink-0 px-4 py-2 rounded-xl bg-[#8E1C2E] text-white text-xs font-bold hover:bg-[#731524] transition-colors shadow-2xs cursor-pointer"
            >
              Escrever Pedido
            </button>
          </div>
        )}

        {/* CTA Buttons */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3">
          <a
            href="#oracao"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#8E1C2E] text-white text-sm sm:text-base font-bold hover:bg-[#731524] transition-all shadow-md active:scale-98"
          >
            <span>Rezar o {currentDay}º Dia Agora</span>
            <ChevronRight className="w-4 h-4 text-[#EED074]" />
          </a>

          <button
            onClick={() => setIsLightCandleModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FAF0D4] border border-[#C89B27] text-[#8C6A17] text-sm sm:text-base font-bold hover:bg-[#F9ECC4] transition-all shadow-2xs cursor-pointer"
          >
            <Flame className="w-4 h-4 text-[#C89B27] fill-current" />
            <span>Acender Vela no Altar</span>
          </button>

          <button
            onClick={() => setIsContemplativeMode(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white border border-[#DFCFBE] text-[#570F1A] text-xs sm:text-sm font-semibold hover:bg-[#FAF7F2] transition-all cursor-pointer"
          >
            <span>Modo Capela</span>
          </button>
        </div>

        {/* Traditional Dates Info Cards */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 max-w-3xl mx-auto text-left text-xs">
          
          <div className="p-3.5 rounded-xl bg-white/80 border border-[#E8DCD1]">
            <div className="flex items-center gap-1.5 text-[#8E1C2E] font-bold mb-1">
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Período Solene</span>
            </div>
            <p className="text-[#57534E]">
              De <strong>22 a 30 de Setembro</strong>, véspera da Festa Litúrgica (1º de Outubro).
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/80 border border-[#E8DCD1]">
            <div className="flex items-center gap-1.5 text-[#8C6A17] font-bold mb-1">
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Período Mensal</span>
            </div>
            <p className="text-[#57534E]">
              Tradicionalmente rezada de <strong>9 a 17 de cada mês</strong> por milhares de fiéis.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/80 border border-[#E8DCD1]">
            <div className="flex items-center gap-1.5 text-[#292524] font-bold mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8E1C2E]" />
              <span>Súplica Imediata</span>
            </div>
            <p className="text-[#57534E]">
              Pode ser iniciada em <strong>qualquer dia do ano</strong> em momentos de aflição ou súplica.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
