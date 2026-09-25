"use client";

import React, { useState } from "react";
import { useNovena } from "@/context/NovenaContext";
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  HeartHandshake, 
  Menu, 
  X, 
  Flame,
  BookOpen,
  Share2
} from "lucide-react";

export function Header() {
  const {
    completedDays,
    soundEnabled,
    toggleSound,
    setIsContemplativeMode,
    setIsIntentionModalOpen,
    setIsLightCandleModalOpen,
    setIsSharePrayerModalOpen,
  } = useNovena();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const completedCount = completedDays.length;

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DCD1] transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        
        {/* Brand / Title */}
        <a 
          href="#" 
          className="flex items-center gap-3 group text-left focus:outline-none focus:ring-2 focus:ring-[#8E1C2E] rounded-md p-1"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8E1C2E] to-[#570F1A] flex items-center justify-center text-white shadow-sm ring-2 ring-[#EED074]/60 group-hover:scale-105 transition-transform">
            {/* Elegant heraldic rose / cross symbol */}
            <svg 
              className="w-5 h-5 text-[#FAF7F2]" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M12 2C10.5 5 8 7 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 7 13.5 5 12 2Z" opacity="0.85"/>
              <path d="M6 11C4 13 4 16 6 18C7.5 19.5 9.5 19.5 11 18.5C10 16.5 10 14 12 13C9 11 7 10 6 11Z" opacity="0.75"/>
              <path d="M18 11C20 13 20 16 18 18C16.5 19.5 14.5 19.5 13 18.5C14 16.5 14 14 12 13C15 11 17 10 18 11Z" opacity="0.75"/>
              <path d="M12 15C10 18 10 20 12 22C14 20 14 18 12 15Z" opacity="0.9"/>
            </svg>
          </div>
          <div>
            <span className="block text-xs font-semibold tracking-widest uppercase text-[#8E1C2E] font-display">
              Carmelo de Lisieux
            </span>
            <span className="block text-base sm:text-lg font-serif font-bold text-[#1C1917] leading-tight">
              Novena das Rosas
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-[#44403C]">
          <a 
            href="#jornada" 
            className="hover:text-[#8E1C2E] transition-colors py-1 hover:border-b-2 border-[#8E1C2E]"
          >
            Os 9 Dias
          </a>
          <a 
            href="#oracao" 
            className="hover:text-[#8E1C2E] transition-colors py-1 hover:border-b-2 border-[#8E1C2E]"
          >
            Rezar Agora
          </a>
          <a 
            href="#capela-velas" 
            className="hover:text-[#8E1C2E] transition-colors py-1 hover:border-b-2 border-[#8E1C2E] flex items-center gap-1 text-[#8C6A17] font-semibold"
          >
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span>Capela das Velas</span>
          </a>
          <a 
            href="#milagres" 
            className="hover:text-[#8E1C2E] transition-colors py-1 hover:border-b-2 border-[#8E1C2E]"
          >
            Milagres
          </a>
          <a 
            href="#historia" 
            className="hover:text-[#8E1C2E] transition-colors py-1 hover:border-b-2 border-[#8E1C2E]"
          >
            História
          </a>
          <a 
            href="#faq" 
            className="hover:text-[#8E1C2E] transition-colors py-1 hover:border-b-2 border-[#8E1C2E]"
          >
            Dúvidas
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          
          {/* Light candle button */}
          <button
            onClick={() => setIsLightCandleModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#FAF0D4] text-[#8C6A17] border border-[#EED074] hover:bg-[#F9ECC4] transition-colors shadow-2xs cursor-pointer"
            title="Acender uma Vela Virtual"
          >
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span>Acender Vela</span>
          </button>

          {/* Share prayer button */}
          <button
            onClick={() => setIsSharePrayerModalOpen(true)}
            className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#FDE8EB] text-[#8E1C2E] border border-[#F8C7CE] hover:bg-[#FCE7E9] transition-colors shadow-2xs cursor-pointer"
            title="Compartilhar Oração da Novena"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Compartilhar</span>
          </button>

          {/* Intention button */}
          <button
            onClick={() => setIsIntentionModalOpen(true)}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white text-[#570F1A] border border-[#DFCFBE] hover:bg-[#FAF7F2] transition-colors shadow-2xs cursor-pointer"
            title="Abrir Meu Caderno de Intenções"
          >
            <HeartHandshake className="w-3.5 h-3.5 text-[#8E1C2E]" />
            <span>Meu Pedido</span>
          </button>

          {/* Progress pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FAF0D4] border border-[#EED074] text-[#8C6A17] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#C89B27]" />
            <span>{completedCount}/9 dias</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-full border transition-colors cursor-pointer ${
              soundEnabled 
                ? "bg-white border-[#E8DCD1] text-[#8E1C2E] hover:bg-[#FDF2F3]" 
                : "bg-[#EEE7DC] border-[#DFCFBE] text-[#78716C] hover:bg-[#E5DAC9]"
            }`}
            title={soundEnabled ? "Sons de sino ativados" : "Sons silenciados"}
            aria-label={soundEnabled ? "Silenciar sinos" : "Ativar sinos"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Contemplative Mode Button */}
          <button
            onClick={() => setIsContemplativeMode(true)}
            className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#8E1C2E] text-white hover:bg-[#731524] transition-all shadow-sm cursor-pointer"
            title="Abrir Modo Capela de Oração sem distrações"
          >
            <Flame className="w-3.5 h-3.5 text-[#EED074]" />
            <span className="hidden sm:inline">Modo Capela</span>
            <span className="sm:hidden">Rezar</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-[#570F1A] hover:bg-[#EEE7DC] transition-colors cursor-pointer"
            aria-label="Abrir Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-[#E8DCD1] px-4 pt-3 pb-5 space-y-3 animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 pb-2">
            <button
              onClick={() => {
                setIsLightCandleModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-[#FAF0D4] text-[#8C6A17] text-xs font-bold border border-[#EED074] cursor-pointer"
            >
              <Flame className="w-4 h-4 fill-current" />
              <span>Acender Vela</span>
            </button>
            <button
              onClick={() => {
                setIsSharePrayerModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-[#FDE8EB] text-[#8E1C2E] text-xs font-bold border border-[#F8C7CE] cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Compartilhar</span>
            </button>
          </div>
          <div className="flex flex-col space-y-2 text-sm font-medium text-[#44403C]">
            <a 
              href="#jornada" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#EEE7DC] flex items-center justify-between"
            >
              <span>Jornada dos 9 Dias</span>
              <span className="text-xs text-[#8E1C2E]">1 a 9</span>
            </a>
            <a 
              href="#oracao" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#EEE7DC] flex items-center justify-between"
            >
              <span>Rezar a Novena de Hoje</span>
              <BookOpen className="w-4 h-4 text-[#8E1C2E]" />
            </a>
            <a 
              href="#capela-velas" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#FAF0D4] flex items-center justify-between text-[#8C6A17] font-bold"
            >
              <span>Capela das Velas Virtuais</span>
              <Flame className="w-4 h-4 text-[#C89B27] fill-current" />
            </a>
            <a 
              href="#milagres" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#EEE7DC]"
            >
              Milagres Documentados
            </a>
            <a 
              href="#historia" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#EEE7DC]"
            >
              Origem e a Pequena Via
            </a>
            <a 
              href="#faq" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#EEE7DC]"
            >
              Dúvidas Frequentes
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
