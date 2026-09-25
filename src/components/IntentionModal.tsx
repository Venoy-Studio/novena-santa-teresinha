"use client";

import React, { useState, useEffect } from "react";
import { useNovena } from "@/context/NovenaContext";
import { X, HeartHandshake, Lock, Sparkles, Check } from "lucide-react";

export function IntentionModal() {
  const {
    userIntention,
    setUserIntention,
    isIntentionModalOpen,
    setIsIntentionModalOpen,
    devoteeProfile,
  } = useNovena();

  if (!isIntentionModalOpen) return null;

  return (
    <IntentionModalDialog
      initialIntention={userIntention}
      devoteeName={devoteeProfile?.name}
      onSave={(val) => {
        setUserIntention(val);
      }}
      onClose={() => setIsIntentionModalOpen(false)}
    />
  );
}

function IntentionModalDialog({
  initialIntention,
  devoteeName,
  onSave,
  onClose,
}: {
  initialIntention: string;
  devoteeName?: string;
  onSave: (val: string) => void;
  onClose: () => void;
}) {
  const [inputVal, setInputVal] = useState(initialIntention);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(inputVal.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 500);
  };

  const presets = [
    "Pela cura física e espiritual de um ente querido",
    "Pela reconciliação, paz e união de minha família",
    "Por uma graça especial e necessária em minha vida profissional",
    "Por luz e discernimento diante de uma decisão difícil",
    "Em ação de graças por uma bênção recebida",
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-fadeIn overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="w-full max-w-lg bg-[#FAF7F2] rounded-3xl border-2 border-[#EED074] shadow-2xl overflow-hidden text-left my-auto max-h-[92vh] flex flex-col transform animate-scaleUp"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header (Fixed at top) */}
        <div className="px-5 py-3.5 sm:px-6 sm:py-4 bg-gradient-to-r from-[#F4EFE6] to-[#FAF7F2] border-b border-[#E8DCD1] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-full bg-[#FDE8EB] text-[#8E1C2E]">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-[#2A080E]">
                {devoteeName ? `Caderno de Intenções • ${devoteeName.split(" ")[0]}` : "Meu Livro de Intenções"}
              </h3>
              <p className="text-xs text-[#78716C]">
                {devoteeName 
                  ? `Apresente a sua súplica particular a Santa Teresinha do Menino Jesus` 
                  : "Apresente seu pedido a Santa Teresinha do Menino Jesus"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-[#E8DCD1] text-[#2A080E] transition-colors flex items-center justify-center cursor-pointer -mr-1"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <form onSubmit={handleSave} className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1">
          <div>
            <label 
              htmlFor="intention-text" 
              className="block text-xs font-bold uppercase tracking-wider text-[#570F1A] mb-2 font-display"
            >
              {devoteeName ? `Graça que você, ${devoteeName}, pede nesta novena:` : "Graça que ardentemente peço nesta novena:"}
            </label>
            <textarea
              id="intention-text"
              rows={4}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={devoteeName ? `Ex: ${devoteeName.split(" ")[0]}, escreva aqui a intenção que traz no coração...` : "Ex: Peço a intercessão de Santa Teresinha pela saúde de minha família, por conversão e por paz no coração..."}
              className="w-full p-3.5 rounded-xl border border-[#DFCFBE] bg-white text-[#1C1917] text-sm focus:outline-none focus:ring-2 focus:ring-[#8E1C2E] focus:border-transparent placeholder:text-[#A8A29E] transition-all"
            />
          </div>

          {/* Quick presets */}
          <div>
            <span className="block text-xs font-semibold text-[#78716C] mb-2">
              Sugestões de prece (clique para preencher):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {presets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setInputVal(preset)}
                  className="text-xs px-2.5 py-1.5 rounded-lg bg-white border border-[#E8DCD1] text-[#57534E] hover:border-[#8E1C2E] hover:text-[#8E1C2E] transition-colors text-left cursor-pointer active:scale-98"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Privacy badge */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-[#FAF0D4]/70 border border-[#EED074]/60 text-xs text-[#8C6A17]">
            <Lock className="w-4 h-4 shrink-0 text-[#C89B27]" />
            <span>
              <strong>Privacidade total:</strong> Seu pedido fica salvo com respeito e devoção para toda a sua novena.
            </span>
          </div>

          {/* Modal Footer actions */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#E8DCD1]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#57534E] hover:bg-[#EEE7DC] transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#8E1C2E] hover:bg-[#731524] text-white text-xs font-bold transition-all shadow-md active:scale-98 cursor-pointer"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-[#EED074]" />
                  <span>Intenção Guardada!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#EED074]" />
                  <span>Gravar Minha Intenção</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
