"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useNovena } from "@/context/NovenaContext";
import { SAINTS_CATALOG, CandleType, SaintOption } from "@/data/candleData";
import { X, Flame, ShieldAlert } from "lucide-react";

export function LightCandleModal() {
  const {
    isLightCandleModalOpen,
    setIsLightCandleModalOpen,
    addCandle,
    userIntention,
    devoteeProfile,
  } = useNovena();

  // Close on ESC key
  useEffect(() => {
    if (!isLightCandleModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsLightCandleModalOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightCandleModalOpen, setIsLightCandleModalOpen]);

  const [candleType, setCandleType] = useState<CandleType>("7_days");
  const [selectedSaintId, setSelectedSaintId] = useState<string>("santa-teresinha");
  const [devoteeName, setDevoteeName] = useState<string>(devoteeProfile?.name || "");
  const [location, setLocation] = useState<string>("");
  const [intention, setIntention] = useState<string>(userIntention || "");
  const [isLighting, setIsLighting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  if (!isLightCandleModalOpen) return null;

  // For 7-day candles, Santa Teresinha is fixed as per prompt:
  // "rosto de santa teresinha na de 7 dias"
  const currentSaint: SaintOption = candleType === "7_days"
    ? SAINTS_CATALOG.find((s) => s.id === "santa-teresinha")!
    : SAINTS_CATALOG.find((s) => s.id === selectedSaintId) || SAINTS_CATALOG[0];

  const handleLight = (e: React.FormEvent) => {
    e.preventDefault();
    if (!intention.trim()) {
      setErrorMsg("Por favor, escreva a intenção ou pedido da sua vela.");
      return;
    }
    setErrorMsg("");
    setIsLighting(true);

    setTimeout(() => {
      addCandle({
        devoteeName: devoteeName.trim() || "Devoto(a) em Oração",
        location: location.trim() || undefined,
        intention: intention.trim(),
        type: candleType,
        saintId: currentSaint.id,
        saintName: currentSaint.name,
        saintImage: currentSaint.image,
      });

      setIsLighting(false);
      setIsLightCandleModalOpen(false);

      // Scroll to altar
      const altarEl = document.getElementById("capela-velas");
      if (altarEl) {
        altarEl.scrollIntoView({ behavior: "smooth" });
      }
    }, 800);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-fadeIn overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsLightCandleModalOpen(false);
      }}
    >
      <div 
        className="w-full max-w-2xl bg-[#FAF7F2] rounded-3xl border-2 border-[#EED074] shadow-2xl overflow-hidden text-left my-auto max-h-[92vh] flex flex-col transform animate-scaleUp"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-3.5 sm:px-6 sm:py-4 bg-gradient-to-r from-[#2A080E] to-[#420A12] text-white flex items-center justify-between border-b border-[#EED074]/40 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#FAF0D4] text-[#8E1C2E] flex items-center justify-center">
              <Flame className="w-5 h-5 text-[#C89B27] animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#EED074] font-display block">
                Capela Virtual de Devoção
              </span>
              <h3 className="font-serif font-bold text-base sm:text-lg text-white">
                Acender uma Vela no Altar
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsLightCandleModalOpen(false)}
            className="w-10 h-10 rounded-full hover:bg-white/20 active:bg-white/30 text-white/90 transition-colors flex items-center justify-center cursor-pointer -mr-1"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body (Scrollable) */}
        <form onSubmit={handleLight} className="p-4 sm:p-6 space-y-5 overflow-y-auto flex-1">
          
          {/* Step 1: Candle Type Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#570F1A] mb-2.5 font-display">
              1. Escolha a Duração da Vela:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* 7 Days Candle */}
              <button
                type="button"
                onClick={() => {
                  setCandleType("7_days");
                  setSelectedSaintId("santa-teresinha");
                }}
                className={`p-4 rounded-2xl border text-left transition-all relative cursor-pointer ${
                  candleType === "7_days"
                    ? "bg-white border-[#8E1C2E] ring-2 ring-[#EED074] shadow-md"
                    : "bg-[#F4EFE6]/60 border-[#DFCFBE] hover:bg-white"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 text-sm font-serif font-bold text-[#2A080E]">
                    <span className="text-xl">🕯️</span>
                    <span>Vela Votiva de 7 Dias</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FAF0D4] text-[#8C6A17] border border-[#EED074]">
                    168 horas
                  </span>
                </div>
                <p className="text-xs text-[#57534E] mt-2 leading-relaxed">
                  Vela solene de 7 dias com o <strong>rosto de Santa Teresinha do Menino Jesus</strong> estampada na cera.
                </p>
                <div className="mt-2 text-[11px] font-semibold text-[#8E1C2E] flex items-center gap-1">
                  <span>🌹 Santa Teresinha exclusiva</span>
                </div>
              </button>

              {/* 24 Hours Candle */}
              <button
                type="button"
                onClick={() => setCandleType("24_hours")}
                className={`p-4 rounded-2xl border text-left transition-all relative cursor-pointer ${
                  candleType === "24_hours"
                    ? "bg-white border-[#8E1C2E] ring-2 ring-[#EED074] shadow-md"
                    : "bg-[#F4EFE6]/60 border-[#DFCFBE] hover:bg-white"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 text-sm font-serif font-bold text-[#2A080E]">
                    <span className="text-xl">🕯️</span>
                    <span>Vela de 24 Horas</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FDE8EB] text-[#8E1C2E] border border-[#F8C7CE]">
                    24 horas
                  </span>
                </div>
                <p className="text-xs text-[#57534E] mt-2 leading-relaxed">
                  Vela diária de oração com opção de escolher o <strong>rosto do seu Santo(a) de devoção</strong>.
                </p>
                <div className="mt-2 text-[11px] font-semibold text-[#8C6A17] flex items-center gap-1">
                  <span>✨ 5 Santos disponíveis</span>
                </div>
              </button>

            </div>
          </div>

          {/* Step 2: Saint Face Selection (Only visible for 24h, 7-day is fixed Santa Teresinha) */}
          {candleType === "24_hours" && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#570F1A] mb-2 font-display">
                2. Escolha o Santo da Estampa da Vela:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {SAINTS_CATALOG.map((saint) => {
                  const isSelected = selectedSaintId === saint.id;
                  return (
                    <button
                      key={saint.id}
                      type="button"
                      onClick={() => setSelectedSaintId(saint.id)}
                      className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-2 cursor-pointer ${
                        isSelected
                          ? "bg-white border-[#8E1C2E] ring-2 ring-[#8E1C2E] shadow-sm"
                          : "bg-[#FAF7F2] border-[#DFCFBE] hover:border-[#8E1C2E]/50"
                      }`}
                    >
                      <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-[#EED074] shadow-xs">
                        <Image
                          src={saint.image}
                          alt={saint.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                      <span className="text-[11px] font-serif font-bold text-[#1C1917] line-clamp-2 leading-tight">
                        {saint.name.replace("de Pietrelcina", "").replace("do Menino Jesus", "")}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Candle Preview & Details Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FAF0D4]/70 via-white to-[#FAF0D4]/70 border border-[#EED074] flex items-center gap-4">
            {/* Visual small candle */}
            <div className="relative w-16 h-28 flex flex-col items-center justify-end shrink-0">
              {/* Flame */}
              <div className="relative mb-1 flex flex-col items-center">
                <div className="w-3.5 h-6 rounded-full bg-gradient-to-t from-[#C89B27] via-[#DFB23E] to-white animate-soft-pulse glow-gold" />
                <div className="w-0.5 h-2 bg-[#442D28] -mt-0.5" />
              </div>
              {/* Wax cylinder */}
              <div className="w-14 h-20 rounded-t-lg rounded-b-md bg-[#FFF9F2] border border-[#E5DAC9] relative overflow-hidden flex flex-col items-center justify-center p-1 shadow-sm">
                <div className="relative w-10 h-10 rounded-full overflow-hidden ring-1 ring-[#C89B27] shadow-xs">
                  <Image
                    src={currentSaint.image}
                    alt={currentSaint.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <span className="text-[8px] font-serif font-bold text-[#8E1C2E] mt-1 truncate max-w-full">
                  {devoteeName || "Seu Nome"}
                </span>
              </div>
            </div>

            <div className="flex-1 text-left">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8E1C2E] block">
                {candleType === "7_days" ? "Vela de 7 Dias (Votiva Carmelita)" : "Vela de 24 Horas"}
              </span>
              <h4 className="font-serif font-bold text-base text-[#2A080E] mt-0.5">
                {currentSaint.name}
              </h4>
              <p className="text-xs text-[#78716C] mt-0.5">
                Ficará acesa no altar virtual pelo período de {candleType === "7_days" ? "7 dias (168h)" : "24 horas"} com a sua intenção registrada para toda a comunidade interceder.
              </p>
            </div>
          </div>

          {/* Devotee Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label 
                htmlFor="devotee-name" 
                className="block text-xs font-bold uppercase tracking-wider text-[#570F1A] mb-1.5"
              >
                Seu Nome ou da Família:
              </label>
              <input
                id="devotee-name"
                type="text"
                value={devoteeName}
                onChange={(e) => setDevoteeName(e.target.value)}
                placeholder="Ex: Maria de Lourdes / Família Santos"
                className="w-full p-3 rounded-xl border border-[#DFCFBE] bg-white text-sm text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#8E1C2E]"
              />
            </div>

            <div>
              <label 
                htmlFor="devotee-location" 
                className="block text-xs font-bold uppercase tracking-wider text-[#570F1A] mb-1.5"
              >
                Cidade / Estado (opcional):
              </label>
              <input
                id="devotee-location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ex: São Paulo - SP / Lisboa"
                className="w-full p-3 rounded-xl border border-[#DFCFBE] bg-white text-sm text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#8E1C2E]"
              />
            </div>
          </div>

          {/* Intention Input */}
          <div>
            <label 
              htmlFor="candle-intention" 
              className="block text-xs font-bold uppercase tracking-wider text-[#570F1A] mb-1.5"
            >
              Intenção da Vela / Pedido de Oração: *
            </label>
            <textarea
              id="candle-intention"
              rows={3}
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              placeholder="Ex: Peço a Santa Teresinha pela saúde de minha mãe, por uma bênção no trabalho e pela conversão de meus entes queridos..."
              className="w-full p-3 rounded-xl border border-[#DFCFBE] bg-white text-sm text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#8E1C2E]"
            />
          </div>

          {errorMsg && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-[#FDE8EB] text-[#8E1C2E] text-xs font-semibold border border-[#F8C7CE]">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#E8DCD1]">
            <button
              type="button"
              onClick={() => setIsLightCandleModalOpen(false)}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#78716C] hover:bg-[#EEE7DC] transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLighting}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#8E1C2E] hover:bg-[#731524] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              {isLighting ? (
                <>
                  <Flame className="w-4 h-4 text-[#EED074] animate-bounce" />
                  <span>Acendendo no Altar...</span>
                </>
              ) : (
                <>
                  <Flame className="w-4 h-4 text-[#EED074]" />
                  <span>Acender Vela no Altar</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
