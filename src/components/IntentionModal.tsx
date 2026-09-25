"use client";

import React, { useState } from "react";
import { useNovena } from "@/context/NovenaContext";
import { X, HeartHandshake, Lock, Sparkles, Check } from "lucide-react";

export function IntentionModal() {
  const {
    userIntention,
    setUserIntention,
    isIntentionModalOpen,
    setIsIntentionModalOpen,
  } = useNovena();

  if (!isIntentionModalOpen) return null;

  return (
    <IntentionModalDialog
      initialIntention={userIntention}
      onSave={(val) => {
        setUserIntention(val);
      }}
      onClose={() => setIsIntentionModalOpen(false)}
    />
  );
}

function IntentionModalDialog({
  initialIntention,
  onSave,
  onClose,
}: {
  initialIntention: string;
  onSave: (val: string) => void;
  onClose: () => void;
}) {
  const [inputVal, setInputVal] = useState(initialIntention);
  const [savedSuccess, setSavedSuccess] = useState(false);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div 
        className="w-full max-w-lg bg-[#FAF7F2] rounded-2xl border border-[#E5DAC9] shadow-2xl overflow-hidden text-left"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#F4EFE6] to-[#FAF7F2] border-b border-[#E8DCD1] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-full bg-[#FDE8EB] text-[#8E1C2E]">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#2A080E]">
                Meu Livro de Intenções
              </h3>
              <p className="text-xs text-[#78716C]">
                Apresente seu pedido a Santa Teresinha do Menino Jesus
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#E8DCD1] text-[#78716C] transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSave} className="p-6 space-y-4">
          <div>
            <label 
              htmlFor="intention-text" 
              className="block text-xs font-bold uppercase tracking-wider text-[#570F1A] mb-2"
            >
              Graça que ardentemente peço nesta novena:
            </label>
            <textarea
              id="intention-text"
              rows={4}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ex: Peço a intercessão de Santa Teresinha pela saúde de minha família, por conversão e por paz no coração..."
              className="w-full p-3.5 rounded-xl border border-[#DFCFBE] bg-white text-[#1C1917] text-sm focus:outline-none focus:ring-2 focus:ring-[#8E1C2E] focus:border-transparent placeholder:text-[#A8A29E]"
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
                  className="text-xs px-2.5 py-1 rounded-md bg-white border border-[#E8DCD1] text-[#57534E] hover:border-[#8E1C2E] hover:text-[#8E1C2E] transition-colors text-left"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Privacy badge */}
          <div className="flex items-center gap-2 p-3 rounded-lg bg-[#FAF0D4]/70 border border-[#EED074]/60 text-xs text-[#8C6A17]">
            <Lock className="w-4 h-4 shrink-0 text-[#C89B27]" />
            <span>
              <strong>Privacidade total:</strong> Seu pedido fica salvo exclusivamente no navegador deste aparelho. Nenhum dado é enviado para a internet.
            </span>
          </div>

          {/* Modal Footer actions */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#57534E] hover:bg-[#EEE7DC] transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8E1C2E] text-white text-xs font-bold hover:bg-[#731524] transition-all shadow-sm"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Pedido Gravado!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#EED074]" />
                  <span>Gravar Pedido na Novena</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
