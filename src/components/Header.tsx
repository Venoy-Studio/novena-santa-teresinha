"use client";

import React, { useState, useEffect } from "react";
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
    setIsWelcomeModalOpen,
    devoteeProfile,
  } = useNovena();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Prevent body scroll and handle ESC key when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMobileMenuOpen(false);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  const completedCount = completedDays.length;

  return (
    <>
      <header className="sticky top-0 z-30 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DCD1] transition-all shadow-[0_2px_15px_rgba(42,8,14,0.03)]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 lg:gap-8">
          
          {/* Brand Logo & Title */}
          <a 
            href="#" 
            className="flex items-center gap-3 sm:gap-3.5 group text-left focus:outline-none focus:ring-2 focus:ring-[#8E1C2E] rounded-xl p-1 shrink-0 whitespace-nowrap"
          >
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden ring-2 ring-[#C89B27] shadow-md group-hover:scale-105 transition-transform shrink-0">
              <Image
                src="/images/santa-teresinha.jpg"
                alt="Santa Teresinha"
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="block text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase text-[#8E1C2E] font-display leading-tight">
                Carmelo de Lisieux
              </span>
              <span className="block text-lg sm:text-xl md:text-2xl font-serif font-bold text-[#2A080E] tracking-tight leading-snug">
                Novena das Rosas
              </span>
            </div>
          </a>

          {/* Desktop Nav Links (Clean, Spacious, No Jump) */}
          <nav className="hidden xl:flex items-center gap-6 2xl:gap-8 text-sm font-semibold text-[#44403C]">
            <a 
              href="#jornada" 
              className="relative py-2 hover:text-[#8E1C2E] transition-colors whitespace-nowrap group shrink-0"
            >
              <span>Os 9 Dias</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8E1C2E] scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
            </a>
            <a 
              href="#oracao" 
              className="relative py-2 hover:text-[#8E1C2E] transition-colors whitespace-nowrap group shrink-0"
            >
              <span>Rezar Agora</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8E1C2E] scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
            </a>
            <a 
              href="#capela-velas" 
              className="relative py-2 hover:text-[#8E1C2E] transition-colors whitespace-nowrap group flex items-center gap-1.5 text-[#8C6A17] shrink-0"
            >
              <Flame className="w-4 h-4 fill-current text-[#C89B27] animate-pulse" />
              <span className="font-bold">Capela das Velas</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C89B27] scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
            </a>
            <a 
              href="#milagres" 
              className="relative py-2 hover:text-[#8E1C2E] transition-colors whitespace-nowrap group shrink-0"
            >
              <span>Milagres</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8E1C2E] scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
            </a>
            <a 
              href="#historia" 
              className="relative py-2 hover:text-[#8E1C2E] transition-colors whitespace-nowrap group shrink-0"
            >
              <span>História</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8E1C2E] scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
            </a>
            <a 
              href="#faq" 
              className="relative py-2 hover:text-[#8E1C2E] transition-colors whitespace-nowrap group shrink-0"
            >
              <span>Dúvidas</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8E1C2E] scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
            </a>
          </nav>

          {/* Action Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            
            {/* Progress pill on PC */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF0D4] border border-[#EED074] text-[#8C6A17] text-xs font-bold whitespace-nowrap shadow-2xs shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-[#C89B27]" />
              <span>{completedCount}/9 dias rezados</span>
            </div>

            {/* Desktop Light candle button */}
            <button
              onClick={() => setIsLightCandleModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-[#FAF0D4] text-[#8C6A17] border border-[#EED074] hover:bg-[#F9ECC4] hover:scale-102 transition-all shadow-xs cursor-pointer whitespace-nowrap shrink-0"
              title="Acender uma Vela Virtual"
            >
              <Flame className="w-3.5 h-3.5 fill-current text-[#C89B27]" />
              <span>Acender Vela</span>
            </button>

            {/* Contemplative Mode Button */}
            <button
              onClick={() => setIsContemplativeMode(true)}
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-[#8E1C2E] text-white hover:bg-[#731524] hover:scale-102 transition-all shadow-sm cursor-pointer whitespace-nowrap shrink-0"
              title="Abrir Modo Capela de Oração sem distrações"
            >
              <Flame className="w-3.5 h-3.5 text-[#EED074]" />
              <span>Modo Capela</span>
            </button>

            {/* Desktop Devotee Greeting Button */}
            {devoteeProfile && (
              <button
                onClick={() => setIsWelcomeModalOpen(true)}
                className="hidden 2xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#DFCFBE] text-[#570F1A] text-xs font-semibold hover:border-[#8E1C2E] hover:bg-[#FAF7F2] transition-colors shadow-2xs whitespace-nowrap cursor-pointer shrink-0"
                title="Editar seu nome ou santo de devoção"
              >
                <span>🕊️</span>
                <span>Olá, <strong>{devoteeProfile.name.split(" ")[0]}</strong></span>
              </button>
            )}

            {/* Desktop Intention button */}
            <button
              onClick={() => setIsIntentionModalOpen(true)}
              className="hidden 2xl:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold bg-white text-[#570F1A] border border-[#DFCFBE] hover:bg-[#FAF7F2] transition-colors shadow-2xs cursor-pointer whitespace-nowrap shrink-0"
              title="Abrir Meu Caderno de Intenções"
            >
              <HeartHandshake className="w-3.5 h-3.5 text-[#8E1C2E]" />
              <span>Meu Pedido</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                soundEnabled 
                  ? "bg-white border-[#E8DCD1] text-[#8E1C2E] hover:bg-[#FDF2F3]" 
                  : "bg-[#EEE7DC] border-[#DFCFBE] text-[#78716C] hover:bg-[#E5DAC9]"
              }`}
              title={soundEnabled ? "Sons de sino ativados" : "Sons silenciados"}
              aria-label={soundEnabled ? "Silenciar sinos" : "Ativar sinos"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Mobile / Laptop Hamburger button (opens full drawer) */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="xl:hidden p-2 sm:p-2.5 rounded-xl text-[#570F1A] bg-white border border-[#E8DCD1] hover:bg-[#EEE7DC] transition-colors cursor-pointer shrink-0"
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
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Top Bar */}
            <div className="p-4 sm:p-5 border-b border-[#E8DCD1] bg-gradient-to-r from-[#F4EFE6] to-[#FAF7F2] flex items-center justify-between shrink-0">
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
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-11 h-11 rounded-full hover:bg-[#E8DCD1] active:bg-[#DFCFBE] text-[#2A080E] transition-colors flex items-center justify-center cursor-pointer -mr-1"
                aria-label="Fechar menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="p-5 space-y-4 flex-1">
              
              {/* Devotee Profile Card */}
              {devoteeProfile ? (
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#FAF0D4]/80 to-[#FDFBF7] border border-[#EED074] flex items-center justify-between shadow-2xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6A17] block font-display">
                      Devoto(a) em Oração:
                    </span>
                    <span className="font-serif font-bold text-base text-[#2A080E] block leading-tight">
                      {devoteeProfile.name}
                    </span>
                    {devoteeProfile.favoriteSaint && (
                      <span className="text-[11px] text-[#78716C] block mt-0.5">
                        Devoção a {devoteeProfile.favoriteSaint}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsWelcomeModalOpen(true);
                    }}
                    className="text-xs font-bold text-[#8E1C2E] underline hover:text-[#731524] cursor-pointer shrink-0"
                  >
                    Alterar
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsWelcomeModalOpen(true);
                  }}
                  className="w-full p-3 rounded-2xl bg-[#FAF0D4] border border-[#EED074] text-[#8C6A17] text-xs font-bold text-center hover:bg-[#F9ECC4] transition-colors cursor-pointer"
                >
                  ✨ Registrar Meu Nome na Capela
                </button>
              )}

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
