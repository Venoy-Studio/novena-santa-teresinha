"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useNovena } from "@/context/NovenaContext";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  HeartHandshake, 
  Menu, 
  X, 
  Flame, 
  BookOpen, 
  Share2,
  ChevronRight,
  HelpCircle,
  Award,
  BookMarked
} from "lucide-react";

export function Header() {
  const {
    currentDay,
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
    <>
      <header className="sticky top-0 z-30 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DCD1] transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between">
          
          {/* Brand Logo & Title */}
          <a 
            href="#" 
            className="flex items-center gap-2.5 sm:gap-3 group text-left focus:outline-none focus:ring-2 focus:ring-[#8E1C2E] rounded-md p-1"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#8E1C2E] to-[#570F1A] flex items-center justify-center text-white shadow-sm ring-2 ring-[#EED074]/60 group-hover:scale-105 transition-transform shrink-0">
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
              <span className="block text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-[#8E1C2E] font-display">
                Carmelo de Lisieux
              </span>
              <span className="block text-sm sm:text-base md:text-lg font-serif font-bold text-[#1C1917] leading-tight">
                Novena das Rosas
              </span>
            </div>
          </a>

          {/* Desktop Nav Links (Large Screens) */}
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
            
            {/* Desktop Light candle button */}
            <button
              onClick={() => setIsLightCandleModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#FAF0D4] text-[#8C6A17] border border-[#EED074] hover:bg-[#F9ECC4] transition-colors shadow-2xs cursor-pointer"
              title="Acender uma Vela Virtual"
            >
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>Acender Vela</span>
            </button>

            {/* Desktop Share prayer button */}
            <button
              onClick={() => setIsSharePrayerModalOpen(true)}
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#FDE8EB] text-[#8E1C2E] border border-[#F8C7CE] hover:bg-[#FCE7E9] transition-colors shadow-2xs cursor-pointer"
              title="Compartilhar Oração da Novena"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Compartilhar</span>
            </button>

            {/* Desktop Intention button */}
            <button
              onClick={() => setIsIntentionModalOpen(true)}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white text-[#570F1A] border border-[#DFCFBE] hover:bg-[#FAF7F2] transition-colors shadow-2xs cursor-pointer"
              title="Abrir Meu Caderno de Intenções"
            >
              <HeartHandshake className="w-3.5 h-3.5 text-[#8E1C2E]" />
              <span>Meu Pedido</span>
            </button>

            {/* Desktop Progress pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FAF0D4] border border-[#EED074] text-[#8C6A17] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#C89B27]" />
              <span>{completedCount}/9 dias</span>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className={`p-1.5 sm:p-2 rounded-full border transition-colors cursor-pointer ${
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
              className="hidden sm:inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#8E1C2E] text-white hover:bg-[#731524] transition-all shadow-sm cursor-pointer"
              title="Abrir Modo Capela de Oração sem distrações"
            >
              <Flame className="w-3.5 h-3.5 text-[#EED074]" />
              <span>Modo Capela</span>
            </button>

            {/* Mobile hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl text-[#570F1A] bg-white border border-[#E8DCD1] hover:bg-[#EEE7DC] transition-colors cursor-pointer"
              aria-label="Abrir Menu Completo"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Luxury Slide-Over Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end animate-fadeIn">
          
          {/* Backdrop Scrim */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Container */}
          <div 
            className="relative w-full max-w-sm bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-[#E5DAC9] animate-slideInRight text-left z-10"
            role="dialog"
            aria-modal="true"
          >
            {/* Drawer Top Bar */}
            <div className="p-5 border-b border-[#E8DCD1] bg-gradient-to-r from-[#F4EFE6] to-[#FAF7F2] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-[#EED074] shadow-xs shrink-0">
                  <Image
                    src="/images/santa-teresinha.jpg"
                    alt="Santa Teresinha"
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#8E1C2E] font-display block">
                    Novena das Rosas
                  </span>
                  <h3 className="font-serif font-bold text-base text-[#2A080E]">
                    Santa Teresinha
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full hover:bg-[#E8DCD1] text-[#78716C] transition-colors cursor-pointer"
                aria-label="Fechar menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="p-5 space-y-5 flex-1">
              
              {/* Progress Card */}
              <div className="p-4 rounded-2xl bg-white border border-[#E5DAC9] shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8E1C2E] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C89B27]" />
                    Seu Progresso
                  </span>
                  <span className="text-xs font-bold text-[#8C6A17]">
                    {completedCount} de 9 dias
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-[#EEE7DC] overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#C89B27] to-[#8E1C2E] rounded-full transition-all duration-300"
                    style={{ width: `${Math.max(10, (completedCount / 9) * 100)}%` }}
                  />
                </div>

                <div className="mt-3 pt-3 border-t border-[#F4EFE6] flex items-center justify-between">
                  <span className="text-xs text-[#57534E]">
                    Dia atual selecionado: <strong>{currentDay}º Dia</strong>
                  </span>
                  <a
                    href="#oracao"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs font-bold text-[#8E1C2E] hover:underline flex items-center gap-0.5"
                  >
                    <span>Rezar</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Quick Action Grid (2x2) */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#78716C] block mb-2 font-display">
                  Ações de Oração
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  
                  {/* Acender Vela */}
                  <button
                    onClick={() => {
                      setIsLightCandleModalOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="p-3.5 rounded-xl bg-[#FAF0D4] border border-[#EED074] text-left hover:bg-[#F9ECC4] transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <Flame className="w-5 h-5 text-[#C89B27] fill-current mb-2" />
                    <div>
                      <span className="block text-xs font-bold text-[#731524]">
                        Acender Vela
                      </span>
                      <span className="text-[10px] text-[#8C6A17]">
                        24h e 7 Dias
                      </span>
                    </div>
                  </button>

                  {/* Meu Pedido */}
                  <button
                    onClick={() => {
                      setIsIntentionModalOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="p-3.5 rounded-xl bg-white border border-[#DFCFBE] text-left hover:bg-[#FAF7F2] transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <HeartHandshake className="w-5 h-5 text-[#8E1C2E] mb-2" />
                    <div>
                      <span className="block text-xs font-bold text-[#2A080E]">
                        Meu Pedido
                      </span>
                      <span className="text-[10px] text-[#78716C]">
                        Gravar Intenção
                      </span>
                    </div>
                  </button>

                  {/* Compartilhar */}
                  <button
                    onClick={() => {
                      setIsSharePrayerModalOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="p-3.5 rounded-xl bg-[#FDE8EB] border border-[#F8C7CE] text-left hover:bg-[#FCE7E9] transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <Share2 className="w-5 h-5 text-[#8E1C2E] mb-2" />
                    <div>
                      <span className="block text-xs font-bold text-[#8E1C2E]">
                        Compartilhar
                      </span>
                      <span className="text-[10px] text-[#A62438]">
                        Rezei Hoje 🌹
                      </span>
                    </div>
                  </button>

                  {/* Modo Capela */}
                  <button
                    onClick={() => {
                      setIsContemplativeMode(true);
                      setMobileMenuOpen(false);
                    }}
                    className="p-3.5 rounded-xl bg-[#8E1C2E] text-white text-left hover:bg-[#731524] transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <Flame className="w-5 h-5 text-[#EED074] mb-2" />
                    <div>
                      <span className="block text-xs font-bold text-white">
                        Modo Capela
                      </span>
                      <span className="text-[10px] text-[#FAF0D4]/80">
                        Tela Cheia
                      </span>
                    </div>
                  </button>

                </div>
              </div>

              {/* Navigation Links List */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#78716C] block mb-2 font-display">
                  Navegação no Site
                </span>
                <nav className="space-y-1 bg-white rounded-2xl p-2 border border-[#E8DCD1]">
                  <a
                    href="#jornada"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[#FAF7F2] text-xs sm:text-sm font-semibold text-[#2A080E] transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Sparkles className="w-4 h-4 text-[#8E1C2E]" />
                      <span>Jornada dos 9 Dias</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#A89E9A]" />
                  </a>

                  <a
                    href="#oracao"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[#FAF7F2] text-xs sm:text-sm font-semibold text-[#2A080E] transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <BookOpen className="w-4 h-4 text-[#8E1C2E]" />
                      <span>Oração & 24 Glórias</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#A89E9A]" />
                  </a>

                  <a
                    href="#capela-velas"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#FAF0D4]/60 hover:bg-[#FAF0D4] text-xs sm:text-sm font-bold text-[#8C6A17] transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Flame className="w-4 h-4 text-[#C89B27] fill-current" />
                      <span>Capela das Velas Virtuais</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#8C6A17]" />
                  </a>

                  <a
                    href="#milagres"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[#FAF7F2] text-xs sm:text-sm font-semibold text-[#2A080E] transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Award className="w-4 h-4 text-[#8E1C2E]" />
                      <span>Milagres Documentados</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#A89E9A]" />
                  </a>

                  <a
                    href="#historia"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[#FAF7F2] text-xs sm:text-sm font-semibold text-[#2A080E] transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <BookMarked className="w-4 h-4 text-[#8E1C2E]" />
                      <span>Origem & A Pequena Via</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#A89E9A]" />
                  </a>

                  <a
                    href="#faq"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[#FAF7F2] text-xs sm:text-sm font-semibold text-[#2A080E] transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <HelpCircle className="w-4 h-4 text-[#8E1C2E]" />
                      <span>Perguntas Frequentes (FAQ)</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#A89E9A]" />
                  </a>
                </nav>
              </div>

            </div>

            {/* Drawer Bottom Bar */}
            <div className="p-5 border-t border-[#E8DCD1] bg-[#F4EFE6]/70 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#57534E]">Sinos & Chimes de Capela:</span>
                <button
                  onClick={toggleSound}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
                    soundEnabled
                      ? "bg-white border-[#E8DCD1] text-[#8E1C2E]"
                      : "bg-[#EEE7DC] border-[#DFCFBE] text-[#78716C]"
                  }`}
                >
                  {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                  <span>{soundEnabled ? "Ativados" : "Silenciados"}</span>
                </button>
              </div>

              <div className="text-center pt-1">
                <p className="font-serif italic text-xs text-[#8E1C2E]">
                  “Farei cair do Céu uma chuva de rosas sobre a terra.”
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Mobile Bottom Thumb Bar */}
      <MobileBottomNav onOpenMenu={() => setMobileMenuOpen(true)} />
    </>
  );
}
