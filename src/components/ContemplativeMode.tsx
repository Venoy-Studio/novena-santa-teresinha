"use client";

import React, { useState } from "react";
import { useNovena } from "@/context/NovenaContext";
import { PRAYER_TEXTS } from "@/data/novenaData";
import { 
  X, 
  Flame, 
  Volume2, 
  VolumeX, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2
} from "lucide-react";

export function ContemplativeMode() {
  const {
    isContemplativeMode,
    setIsContemplativeMode,
    currentDay,
    selectedDayData,
    userIntention,
    gloriaCount,
    incrementGloria,
    resetGloria,
    soundEnabled,
    toggleSound,
    markDayCompleted,
    devoteeProfile,
  } = useNovena();

  const [step, setStep] = useState<number>(1);
  const [fontSize, setFontSize] = useState<"normal" | "large" | "xlarge">("normal");

  if (!isContemplativeMode) return null;

  const totalSteps = 5;

  const getFontSizeClass = () => {
    switch (fontSize) {
      case "large":
        return "text-lg sm:text-xl leading-relaxed";
      case "xlarge":
        return "text-xl sm:text-2xl leading-loose";
      default:
        return "text-base sm:text-lg leading-relaxed";
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#171210] text-[#F5EFEB] flex flex-col justify-between overflow-y-auto animate-fadeIn">
      
      {/* Top Bar */}
      <div className="sticky top-0 z-20 bg-[#171210]/95 backdrop-blur-md border-b border-[#382622] px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-[#EED074] font-serif">
          <Flame className="w-4 h-4 text-[#C89B27] animate-pulse" />
          <span>Modo Capela • {currentDay}º Dia da Novena</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Font Size Selector */}
          <div className="flex items-center border border-[#382622] rounded-lg overflow-hidden text-xs">
            <button
              onClick={() => setFontSize("normal")}
              className={`px-2 py-1 ${fontSize === "normal" ? "bg-[#382622] text-[#EED074]" : "text-[#A89E9A]"}`}
              title="Fonte Normal"
            >
              A
            </button>
            <button
              onClick={() => setFontSize("large")}
              className={`px-2 py-1 ${fontSize === "large" ? "bg-[#382622] text-[#EED074]" : "text-[#A89E9A]"}`}
              title="Fonte Grande"
            >
              A+
            </button>
            <button
              onClick={() => setFontSize("xlarge")}
              className={`px-2 py-1 ${fontSize === "xlarge" ? "bg-[#382622] text-[#EED074]" : "text-[#A89E9A]"}`}
              title="Fonte Muito Grande"
            >
              A++
            </button>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="p-1.5 rounded-lg border border-[#382622] text-[#EED074] hover:bg-[#382622] transition-colors"
            title="Alternar Som"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Close Button */}
          <button
            onClick={() => setIsContemplativeMode(false)}
            className="p-1.5 rounded-lg border border-[#382622] text-[#F5EFEB] hover:bg-[#382622] transition-colors"
            aria-label="Sair do Modo Capela"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Prayer Step Content */}
      <div className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 py-8 flex flex-col justify-center text-center">
        
        {/* Step 1: Sinal da Cruz & Intenção */}
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-3xl text-[#EED074]">✝</div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF7F2]">
              Em Nome do Pai, do Filho e do Espírito Santo. Amém.
            </h3>

            {devoteeProfile?.name && (
              <p className="text-xs font-serif text-[#EED074]">
                Paz e Bem, <strong>{devoteeProfile.name}</strong>. Recolha a sua alma e prepare o seu coração para este momento de graça.
              </p>
            )}

            <div className="p-5 rounded-2xl bg-[#251A18] border border-[#442D28] text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-[#EED074] block mb-2">
                {devoteeProfile?.name ? `Intenção de ${devoteeProfile.name}:` : "Apresente a sua Intenção:"}
              </span>
              <p className={`font-serif italic text-[#E5DAC9] ${getFontSizeClass()}`}>
                {userIntention 
                  ? `“${userIntention}”`
                  : "Silencie o coração e formule agora a graça que deseja pedir pela intercessão de Santa Teresinha."}
              </p>
            </div>

            <p className="text-xs text-[#A89E9A]">
              Respire calmamente na presença de Deus e prepare-se para a oração.
            </p>
          </div>
        )}

        {/* Step 2: Citação e Reflexão */}
        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <span className="text-xs font-bold uppercase tracking-widest text-[#EED074]">
              Meditação do {currentDay}º Dia
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FAF7F2]">
              {selectedDayData.title}
            </h3>

            <blockquote className="p-6 rounded-2xl bg-[#251A18] border border-[#442D28] font-serif-sacred italic text-xl sm:text-2xl text-[#FAF0D4] leading-relaxed">
              “{selectedDayData.quote}”
            </blockquote>

            <p className={`font-sans text-[#E5DAC9] text-justify ${getFontSizeClass()}`}>
              {selectedDayData.reflection}
            </p>
          </div>
        )}

        {/* Step 3: Oração Inicial à Trindade */}
        {step === 3 && (
          <div className="space-y-6 animate-fadeIn text-left">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-[#EED074]">
                Oração à Santíssima Trindade
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FAF7F2] mt-1">
                Pelos Méritos de Santa Teresinha
              </h3>
            </div>

            <div className={`p-6 rounded-2xl bg-[#251A18] border border-[#442D28] font-serif text-[#FAF7F2] space-y-4 text-justify ${getFontSizeClass()}`}>
              <p>
                “Santíssima Trindade, Pai, Filho e Espírito Santo, eu Vos agradeço todos os favores, todas as graças com que enriquecestes a alma de Vossa serva Teresa do Menino Jesus durante os 24 anos que passou na Terra.
              </p>
              <p>
                Pelos méritos de tão querida santinha, concedei{devoteeProfile?.name ? (
                  <> a mim, vosso(a) servo(a) <strong className="text-[#EED074]">{devoteeProfile.name}</strong>,</>
                ) : "-me"} a graça que ardentemente Vos peço:{" "}
                <strong className="text-[#EED074]">
                  {userIntention ? userIntention : "(faça seu pedido com fervor)"}
                </strong>
                , se for conforme a Vossa Santíssima vontade e para salvação de minha alma.
              </p>
              <p>
                Ajudai minha fé e minha esperança, ó Santa Teresinha, cumprindo, mais uma vez, sua promessa de que ninguém vos invocaria em vão, fazendo-me ganhar uma rosa, sinal de que alcançarei a graça pedida.”
              </p>
            </div>
          </div>
        )}

        {/* Step 4: Os 24 Glórias Interativo */}
        {step === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <span className="text-xs font-bold uppercase tracking-widest text-[#EED074]">
              Terço dos 24 Glórias (Ação de Graças)
            </span>
            <div className="text-4xl sm:text-5xl font-serif font-bold text-[#FAF7F2]">
              {gloriaCount} <span className="text-xl text-[#78716C]">/ 24</span>
            </div>

            <div className="p-6 rounded-2xl bg-[#251A18] border border-[#442D28]">
              <p className={`font-serif italic text-[#FAF0D4] ${getFontSizeClass()}`}>
                “{PRAYER_TEXTS.gloria}”
              </p>
              <div className="mt-3 pt-3 border-t border-[#382622] text-sm text-[#EED074] font-semibold">
                “{PRAYER_TEXTS.jaculatory}”
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              {gloriaCount < 24 ? (
                <button
                  onClick={incrementGloria}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#8E1C2E] hover:bg-[#A62438] text-white text-base font-bold transition-transform active:scale-95 shadow-lg"
                >
                  Tocar e Rezar Glória ({gloriaCount + 1}/24)
                </button>
              ) : (
                <div className="p-3 rounded-xl bg-[#2D2115] border border-[#C89B27] text-[#EED074] text-sm font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>24 Glórias Completados com Sucesso!</span>
                </div>
              )}

              {gloriaCount > 0 && (
                <button
                  onClick={resetGloria}
                  className="text-xs text-[#A89E9A] hover:text-white underline py-2"
                >
                  Reiniciar Contagem
                </button>
              )}
            </div>
          </div>
        )}

        {/* Step 5: Conclusão */}
        {step === 5 && (
          <div className="space-y-6 animate-fadeIn text-left">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-[#EED074]">
                Orações Finais
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#FAF7F2] mt-1">
                Pai Nosso, Ave Maria e Bênção
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#251A18] border border-[#382622]">
                <h4 className="text-xs font-bold uppercase text-[#EED074] mb-1">Pai Nosso</h4>
                <p className="font-serif text-sm text-[#E5DAC9] leading-relaxed">
                  {PRAYER_TEXTS.paiNosso}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#251A18] border border-[#382622]">
                <h4 className="text-xs font-bold uppercase text-[#EED074] mb-1">Ave Maria</h4>
                <p className="font-serif text-sm text-[#E5DAC9] leading-relaxed">
                  {PRAYER_TEXTS.aveMaria}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#2D161A] border border-[#731524] text-center">
              <p className="font-serif italic text-sm sm:text-base text-[#FAF0D4]">
                “{PRAYER_TEXTS.finalPrayer}”
              </p>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => {
                  markDayCompleted(currentDay);
                  setIsContemplativeMode(false);
                }}
                className="px-6 py-3.5 rounded-xl bg-[#8E1C2E] hover:bg-[#A62438] text-white text-sm font-bold shadow-md cursor-pointer transition-colors"
              >
                Concluir Dia de Oração {devoteeProfile?.name ? `(${devoteeProfile.name.split(" ")[0]})` : ""} e Voltar ao Altar
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Bottom Step Navigation */}
      <div className="sticky bottom-0 z-20 bg-[#171210]/95 backdrop-blur-md border-t border-[#382622] px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <button
          onClick={() => setStep(step > 1 ? step - 1 : 1)}
          disabled={step === 1}
          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold ${
            step === 1 ? "opacity-30 cursor-not-allowed" : "text-[#EED074] hover:bg-[#382622]"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Anterior</span>
        </button>

        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => (
            <span
              key={s}
              className={`w-2 h-2 rounded-full transition-all ${
                s === step ? "w-6 bg-[#EED074]" : s < step ? "bg-[#8E1C2E]" : "bg-[#382622]"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setStep(step < totalSteps ? step + 1 : totalSteps)}
          disabled={step === totalSteps}
          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold ${
            step === totalSteps ? "opacity-30 cursor-not-allowed" : "text-[#EED074] hover:bg-[#382622]"
          }`}
        >
          <span>Próximo</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
