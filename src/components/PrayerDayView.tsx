"use client";

import React, { useState } from "react";
import { useNovena } from "@/context/NovenaContext";
import { PRAYER_TEXTS } from "@/data/novenaData";
import { GloriaCounter } from "@/components/GloriaCounter";
import { 
  HeartHandshake, 
  Share2, 
  Copy, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Flame, 
  Sparkles,
  CheckCircle2
} from "lucide-react";

export function PrayerDayView() {
  const {
    currentDay,
    setCurrentDay,
    selectedDayData,
    userIntention,
    setIsIntentionModalOpen,
    completedDays,
    toggleDayCompleted,
    setIsContemplativeMode,
    setIsSharePrayerModalOpen,
    setIsLightCandleModalOpen,
    devoteeProfile,
  } = useNovena();

  const [copiedPrayer, setCopiedPrayer] = useState(false);
  const [showFullMiracle, setShowFullMiracle] = useState(true);

  const isCompleted = completedDays.includes(currentDay);

  const formattedInitialPrayer = PRAYER_TEXTS.initialPrayerTemplate.replace(
    "{INTENCAO}",
    userIntention 
      ? `"${userIntention}"` 
      : "fazer agora em silêncio o seu pedido particular"
  );

  const handleCopyPrayer = () => {
    const text = 
      `Novena das Rosas de Santa Teresinha - ${currentDay}º Dia: ${selectedDayData.title}\n` +
      (devoteeProfile ? `Devoto(a) em oração: ${devoteeProfile.name}\n\n` : "\n") +
      `"${selectedDayData.quote}"\n\n` +
      `Oração a Santa Teresinha:\n${formattedInitialPrayer}\n\n` +
      `Rezam-se 24 Glórias ao Pai com a jaculatória: "Santa Teresinha do Menino Jesus, rogai por nós!"\n\n` +
      `Pai Nosso e Ave Maria.`;

    navigator.clipboard.writeText(text);
    setCopiedPrayer(true);
    setTimeout(() => setCopiedPrayer(false), 2000);
  };

  return (
    <section id="oracao" className="py-12 bg-white border-b border-[#E8DCD1]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            onClick={() => setCurrentDay(currentDay > 1 ? currentDay - 1 : 9)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DFCFBE] text-xs font-semibold text-[#570F1A] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Dia Anterior</span>
          </button>

          <div className="text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-[#FDE8EB] text-[#8E1C2E] text-xs font-bold uppercase tracking-wider font-display border border-[#F8C7CE]">
              {selectedDayData.day}º Dia {devoteeProfile ? `• Oração de ${devoteeProfile.name.split(" ")[0]}` : "da Novena"}
            </span>
            <span className="block text-xs font-semibold text-[#78716C] mt-1">
              {selectedDayData.theme}
            </span>
          </div>

          <button
            onClick={() => setCurrentDay(currentDay < 9 ? currentDay + 1 : 1)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DFCFBE] text-xs font-semibold text-[#570F1A] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
          >
            <span className="hidden sm:inline">Próximo Dia</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Day Headline */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#2A080E] leading-tight">
            {selectedDayData.title}
          </h2>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-[#8C6A17] font-semibold">
            <span>🌹 Santa Teresinha do Menino Jesus</span>
            <span>•</span>
            <button
              onClick={() => toggleDayCompleted(currentDay)}
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border transition-colors cursor-pointer ${
                isCompleted 
                  ? "bg-[#FAF0D4] border-[#C89B27] text-[#8C6A17]" 
                  : "bg-white border-[#DFCFBE] text-[#78716C] hover:border-[#8E1C2E]"
              }`}
            >
              <Check className="w-3 h-3" />
              <span>{isCompleted ? "Dia Concluído" : "Marcar como Rezado"}</span>
            </button>

            <span>•</span>

            {/* Share prayer badge button */}
            <button
              onClick={() => setIsSharePrayerModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#8E1C2E] text-white hover:bg-[#731524] transition-all cursor-pointer shadow-2xs"
            >
              <Share2 className="w-3 h-3" />
              <span>Compartilhar que Rezei 🌹</span>
            </button>
          </div>
        </div>

        {/* Meditation Quote Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF7F2] border-2 border-[#EED074]/60 shadow-xs relative mb-10 text-center">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#8E1C2E] text-white text-[11px] font-bold uppercase tracking-wider font-display">
            Palavra de Santa Teresinha
          </span>
          <blockquote className="font-serif-sacred italic text-lg sm:text-xl md:text-2xl text-[#570F1A] leading-relaxed pt-2">
            “{selectedDayData.quote}”
          </blockquote>
          
          <div className="mt-4 pt-4 border-t border-[#E8DCD1] text-xs sm:text-sm text-[#57534E] leading-relaxed text-left">
            <strong className="text-[#8E1C2E] block mb-1">Reflexão do {currentDay}º Dia:</strong>
            {selectedDayData.reflection}
          </div>
        </div>

        {/* Intention Reminder Card */}
        <div className="mb-10 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[#FAF0D4]/60 via-[#FDFBF7] to-[#FAF0D4]/60 border border-[#EED074] shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start sm:items-center gap-3">
              <div className="p-2 rounded-full bg-[#8E1C2E] text-white shrink-0 mt-0.5 sm:mt-0">
                <HeartHandshake className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#8E1C2E] block">
                  Intenção Particular para esta Oração:
                </span>
                <p className="text-sm font-serif italic text-[#1C1917] mt-0.5">
                  {userIntention ? `“${userIntention}”` : "Nenhum pedido escrito ainda. Clique ao lado para personalizar."}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsIntentionModalOpen(true)}
              className="shrink-0 px-3.5 py-1.5 rounded-lg bg-white border border-[#DFCFBE] text-xs font-semibold text-[#8E1C2E] hover:border-[#8E1C2E] transition-colors cursor-pointer"
            >
              {userIntention ? "Editar Pedido" : "Escrever Pedido"}
            </button>
          </div>
        </div>

        {/* 1. Oração Inicial à Santíssima Trindade */}
        <div className="sacred-card rounded-2xl p-6 sm:p-8 border border-[#E5DAC9] mb-10">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E8DCD1]">
            <span className="text-sm font-bold font-display uppercase tracking-wider text-[#8E1C2E]">
              1. Oração a Santa Teresinha
            </span>
            <span className="text-xs text-[#78716C]">
              (Para todos os dias da novena)
            </span>
          </div>

          <div className="space-y-4 font-serif text-base sm:text-lg text-[#1C1917] leading-relaxed text-justify">
            <p>
              “Santíssima Trindade, Pai, Filho e Espírito Santo, eu Vos agradeço todos os favores, todas as graças com que enriquecestes a alma de Vossa serva Teresa do Menino Jesus durante os 24 anos que passou na Terra.
            </p>
            <p>
              Pelos méritos de tão querida santinha, concedei{devoteeProfile?.name ? <> a mim, vosso(a) servo(a) <strong className="text-[#8E1C2E] font-semibold">{devoteeProfile.name}</strong>,</> : "-me"} a graça que ardentemente Vos peço:{" "}
              <span className="inline px-2 py-0.5 rounded-md bg-[#FAF0D4] text-[#8E1C2E] font-semibold border border-[#EED074]">
                {userIntention ? userIntention : "(faça aqui, com fé, o seu pedido particular)"}
              </span>
              , se for conforme a Vossa Santíssima vontade e para salvação de minha alma.
            </p>
            <p>
              Ajudai minha fé e minha esperança, ó Santa Teresinha, cumprindo, mais uma vez, sua promessa de que ninguém vos invocaria em vão, fazendo-me ganhar uma rosa, sinal de que alcançarei a graça pedida.”
            </p>
          </div>
        </div>

        {/* 2. O Terço dos 24 Glórias (Interactive Counter) */}
        <div className="mb-10">
          <GloriaCounter />
        </div>

        {/* 3. Orações de Conclusão */}
        <div className="sacred-card rounded-2xl p-6 sm:p-8 border border-[#E5DAC9] mb-10 space-y-6">
          <div className="pb-3 border-b border-[#E8DCD1]">
            <span className="text-sm font-bold font-display uppercase tracking-wider text-[#8E1C2E]">
              3. Orações Finais
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DCD1]">
              <h4 className="font-serif font-bold text-sm text-[#8E1C2E] uppercase tracking-wider mb-2">
                Pai Nosso
              </h4>
              <p className="font-serif text-sm sm:text-base text-[#1C1917] leading-relaxed">
                {PRAYER_TEXTS.paiNosso}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DCD1]">
              <h4 className="font-serif font-bold text-sm text-[#8E1C2E] uppercase tracking-wider mb-2">
                Ave Maria
              </h4>
              <p className="font-serif text-sm sm:text-base text-[#1C1917] leading-relaxed">
                {PRAYER_TEXTS.aveMaria}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#FDE8EB]/50 border border-[#F8C7CE] text-center">
            <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-[#8E1C2E] mb-1">
              Oração Final
            </h4>
            <p className="font-serif italic text-sm sm:text-base text-[#570F1A] leading-relaxed">
              “{PRAYER_TEXTS.finalPrayer}”
            </p>
          </div>
        </div>

        {/* 4. Milagre Documentado do Dia */}
        <div id="milagres" className="sacred-card rounded-2xl p-6 sm:p-8 border border-[#E5DAC9] bg-gradient-to-b from-[#FDFBF7] to-white mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E8DCD1]">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6A17] font-display flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C89B27]" />
                Relato Histórico Documentado
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2A080E] mt-0.5">
                Milagre do {currentDay}º Dia: {selectedDayData.miracle.title}
              </h3>
            </div>
            <button
              onClick={() => setShowFullMiracle(!showFullMiracle)}
              className="text-xs font-semibold text-[#8E1C2E] hover:text-[#570F1A] underline self-start sm:self-auto cursor-pointer"
            >
              {showFullMiracle ? "Ocultar relato" : "Ler relato completo"}
            </button>
          </div>

          {showFullMiracle && (
            <div className="mt-5 space-y-3.5 text-sm sm:text-base text-[#44403C] leading-relaxed text-justify font-sans">
              {selectedDayData.miracle.paragraphs.map((p, idx) => (
                <p key={idx} className="indent-4 sm:indent-6">
                  {p}
                </p>
              ))}
              <div className="pt-3 text-xs text-[#78716C] italic text-right border-t border-[#E8DCD1]">
                Fonte: Arquivos Históricos do Carmelo de Lisieux & Minha Biblioteca Católica.
              </div>
            </div>
          )}
        </div>

        {/* Action Bar (Share, Copy, Complete, Capela Mode, Light Candle) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-[#F4EFE6] border border-[#E5DAC9]">
          
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsSharePrayerModalOpen(true)}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#8E1C2E] to-[#AB2539] hover:from-[#731524] hover:to-[#8E1C2E] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-[#EED074]" />
              <span>Compartilhar que Rezei</span>
            </button>

            <button
              onClick={handleCopyPrayer}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white border border-[#DFCFBE] text-[#570F1A] text-xs font-semibold hover:bg-[#FAF7F2] transition-colors cursor-pointer"
            >
              {copiedPrayer ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-600" />
                  <span className="text-green-700">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Oração</span>
                </>
              )}
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsLightCandleModalOpen(true)}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#FAF0D4] border border-[#C89B27] text-[#8C6A17] text-xs font-bold hover:bg-[#F9ECC4] transition-colors cursor-pointer"
              title="Acender Vela para este Dia"
            >
              <Flame className="w-4 h-4 text-[#C89B27]" />
              <span>Acender Vela</span>
            </button>

            <button
              onClick={() => toggleDayCompleted(currentDay)}
              className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                isCompleted
                  ? "bg-[#FAF0D4] border border-[#C89B27] text-[#8C6A17]"
                  : "bg-[#8E1C2E] text-white hover:bg-[#731524]"
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isCompleted ? "Dia Rezado" : "Concluir Dia"}</span>
            </button>

            <button
              onClick={() => setIsContemplativeMode(true)}
              className="p-2.5 rounded-xl bg-white border border-[#DFCFBE] text-[#C89B27] hover:border-[#8E1C2E] transition-colors cursor-pointer shrink-0"
              title="Abrir Modo Capela em Tela Cheia"
              aria-label="Modo Capela"
            >
              <Flame className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
