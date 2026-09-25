"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useNovena } from "@/context/NovenaContext";
import { SAINTS_CATALOG } from "@/data/candleData";
import { Sparkles, Heart, Check, ArrowRight } from "lucide-react";

export function WelcomeDevoteeModal() {
  const { isWelcomeModalOpen, saveDevotee } = useNovena();

  const [name, setName] = useState("");
  const [selectedSaint, setSelectedSaint] = useState<string>("Santa Teresinha do Menino Jesus");
  const [customSaint, setCustomSaint] = useState<string>("");
  const [isCustomSaint, setIsCustomSaint] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  if (!isWelcomeModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      setErrorMessage("Por favor, digite seu nome para entrar na capela.");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    const finalSaint = isCustomSaint 
      ? customSaint.trim() || undefined 
      : selectedSaint || undefined;

    await saveDevotee(trimmedName, finalSaint);
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div 
        className="w-full max-w-lg bg-[#FAF7F2] rounded-3xl border-2 border-[#EED074] shadow-2xl overflow-hidden text-left my-8 transform animate-scaleUp"
        role="dialog"
        aria-modal="true"
      >
        {/* Sacred Header with Glow */}
        <div className="p-6 bg-gradient-to-r from-[#2A080E] via-[#4A101A] to-[#2A080E] text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#EED074]/10 rounded-full blur-2xl pointer-events-none" />
          
          {/* Saint Therese Cameo */}
          <div className="relative w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden ring-3 ring-[#EED074] shadow-lg glow-gold">
            <Image
              src="/images/santa-teresinha.jpg"
              alt="Santa Teresinha"
              fill
              sizes="80px"
              priority
              className="object-cover"
            />
          </div>

          <span className="inline-block px-3 py-1 rounded-full bg-[#FAF0D4] text-[#731524] text-[10px] font-bold uppercase tracking-wider font-display mb-1.5 shadow-2xs">
            🌹 Boas-Vindas à Capela Virtual
          </span>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight leading-snug">
            Novena das Rosas
          </h2>
          <p className="text-xs sm:text-sm text-[#F5EFEB] mt-1 max-w-sm mx-auto leading-relaxed">
            Deixe seu nome para apresentarmos suas preces e intenções a Santa Teresinha.
          </p>
        </div>

        {/* Dynamic Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-5">
          
          {/* 1. Nome do Devoto (OBRIGATÓRIO) */}
          <div>
            <label 
              htmlFor="devotee-name-input" 
              className="block text-xs font-bold uppercase tracking-wider text-[#570F1A] mb-1.5 font-display"
            >
              Como você se chama? <span className="text-[#8E1C2E]">* (Obrigatório)</span>
            </label>
            <input
              id="devotee-name-input"
              type="text"
              required
              autoFocus
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errorMessage) setErrorMessage("");
              }}
              placeholder="Ex: Maria Clara, João Pedro, Rita de Cássia..."
              className="w-full px-4 py-3 rounded-xl bg-white border border-[#DFCFBE] text-sm text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#8E1C2E] focus:border-transparent transition-all shadow-2xs"
            />
            {errorMessage ? (
              <p className="text-xs text-red-600 font-semibold mt-1.5">
                {errorMessage}
              </p>
            ) : (
              <p className="text-[11px] text-[#78716C] mt-1.5">
                Seu nome será registrado com carinho na capela para toda a comunidade interceder por você.
              </p>
            )}
          </div>

          {/* 2. Santo de Devoção (OPCIONAL) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#570F1A] mb-2 font-display">
              Santo(a) de sua Devoção: <span className="text-[#8C6A17] font-sans lowercase font-normal">(opcional)</span>
            </label>
            
            {/* Quick Select Chips */}
            <div className="grid grid-cols-2 gap-2 mb-2.5">
              {SAINTS_CATALOG.map((saint) => {
                const isChosen = !isCustomSaint && selectedSaint === saint.name;
                return (
                  <button
                    key={saint.id}
                    type="button"
                    onClick={() => {
                      setIsCustomSaint(false);
                      setSelectedSaint(saint.name);
                    }}
                    className={`flex items-center gap-2 p-2 rounded-xl border text-left transition-all cursor-pointer ${
                      isChosen
                        ? "bg-[#FAF0D4] border-[#C89B27] text-[#731524] font-bold shadow-2xs ring-1 ring-[#C89B27]"
                        : "bg-white border-[#DFCFBE] text-[#57534E] hover:bg-[#FAF7F2]"
                    }`}
                  >
                    <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0 ring-1 ring-[#DFCFBE]">
                      <Image
                        src={saint.image}
                        alt={saint.name}
                        fill
                        sizes="24px"
                        className="object-cover"
                      />
                    </div>
                    <span className="text-xs truncate">
                      {saint.name.replace("de Assis", "").replace("de Pietrelcina", "")}
                    </span>
                    {isChosen && <Check className="w-3.5 h-3.5 text-[#8E1C2E] shrink-0 ml-auto" />}
                  </button>
                );
              })}

              {/* Option to type custom saint */}
              <button
                type="button"
                onClick={() => setIsCustomSaint(true)}
                className={`flex items-center gap-2 p-2 rounded-xl border text-left transition-all cursor-pointer ${
                  isCustomSaint
                    ? "bg-[#FAF0D4] border-[#C89B27] text-[#731524] font-bold shadow-2xs ring-1 ring-[#C89B27]"
                    : "bg-white border-[#DFCFBE] text-[#57534E] hover:bg-[#FAF7F2]"
                }`}
              >
                <span className="text-sm">✨</span>
                <span className="text-xs">Outro Santo(a)</span>
                {isCustomSaint && <Check className="w-3.5 h-3.5 text-[#8E1C2E] shrink-0 ml-auto" />}
              </button>
            </div>

            {/* Custom Saint Input Field */}
            {isCustomSaint && (
              <input
                type="text"
                value={customSaint}
                onChange={(e) => setCustomSaint(e.target.value)}
                placeholder="Digite o nome do seu Santo(a) de devoção..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#C89B27] text-xs text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#8E1C2E] transition-all animate-fadeIn"
              />
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting || !name.trim()}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#8E1C2E] to-[#731524] hover:from-[#731524] hover:to-[#570F1A] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer group"
            >
              <span>{isSubmitting ? "Abençoando..." : "Entrar na Capela e Iniciar Oração"}</span>
              <ArrowRight className="w-4 h-4 text-[#EED074] group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-[#78716C] text-center">
              <Sparkles className="w-3 h-3 text-[#C89B27]" />
              <span>Seus dados ficam gravados com segurança para toda a novena.</span>
            </div>
          </div>

        </form>

        {/* Delicate Bottom Quote */}
        <div className="px-6 py-2.5 bg-[#F4EFE6] border-t border-[#E8DCD1] text-center">
          <p className="font-serif italic text-xs text-[#8E1C2E] flex items-center justify-center gap-1.5">
            <Heart className="w-3 h-3 text-[#8E1C2E] fill-current" />
            “O Bom Deus não me dá desejos que Ele não possa realizar.”
          </p>
        </div>

      </div>
    </div>
  );
}
