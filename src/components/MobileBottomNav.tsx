"use client";

import React from "react";
import { useNovena } from "@/context/NovenaContext";
import { 
  BookOpen, 
  Flame, 
  HeartHandshake, 
  Menu, 
  Sparkles 
} from "lucide-react";

export function MobileBottomNav({
  onOpenMenu,
}: {
  onOpenMenu: () => void;
}) {
  const {
    currentDay,
    setIsIntentionModalOpen,
  } = useNovena();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-lg border-t border-[#E8DCD1] shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5 transition-transform">
      <div className="max-w-md mx-auto grid grid-cols-5 gap-1 text-center">
        
        {/* 1. 9 Dias */}
        <button
          onClick={() => scrollTo("jornada")}
          className="flex flex-col items-center justify-center py-1 rounded-xl hover:bg-[#EEE7DC]/60 active:scale-95 transition-all text-[#57534E]"
          aria-label="Ver 9 Dias"
        >
          <Sparkles className="w-4 h-4 text-[#8E1C2E]" />
          <span className="text-[10px] font-medium mt-0.5">9 Dias</span>
        </button>

        {/* 2. Rezar Hoje (Highlighted) */}
        <button
          onClick={() => scrollTo("oracao")}
          className="flex flex-col items-center justify-center py-1 rounded-xl bg-gradient-to-b from-[#8E1C2E] to-[#731524] text-white shadow-xs active:scale-95 transition-all relative -top-1"
          aria-label={`Rezar ${currentDay}º Dia`}
        >
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#EED074]">
            Dia {currentDay}
          </span>
          <BookOpen className="w-4 h-4 text-white" />
          <span className="text-[10px] font-bold">Rezar</span>
        </button>

        {/* 3. Velas */}
        <button
          onClick={() => scrollTo("capela-velas")}
          className="flex flex-col items-center justify-center py-1 rounded-xl hover:bg-[#EEE7DC]/60 active:scale-95 transition-all text-[#57534E]"
          aria-label="Capela das Velas"
        >
          <Flame className="w-4 h-4 text-[#C89B27] fill-current" />
          <span className="text-[10px] font-medium mt-0.5">Velas</span>
        </button>

        {/* 4. Meu Pedido */}
        <button
          onClick={() => setIsIntentionModalOpen(true)}
          className="flex flex-col items-center justify-center py-1 rounded-xl hover:bg-[#EEE7DC]/60 active:scale-95 transition-all text-[#57534E]"
          aria-label="Meu Pedido"
        >
          <HeartHandshake className="w-4 h-4 text-[#8E1C2E]" />
          <span className="text-[10px] font-medium mt-0.5">Pedido</span>
        </button>

        {/* 5. Menu Drawer Trigger */}
        <button
          onClick={onOpenMenu}
          className="flex flex-col items-center justify-center py-1 rounded-xl hover:bg-[#EEE7DC]/60 active:scale-95 transition-all text-[#57534E]"
          aria-label="Abrir Menu Completo"
        >
          <Menu className="w-4 h-4 text-[#2A080E]" />
          <span className="text-[10px] font-medium mt-0.5">Menu</span>
        </button>

      </div>
    </div>
  );
}
