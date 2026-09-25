"use client";

import React from "react";
import { ChevronUp, HeartHandshake, Sparkles } from "lucide-react";
import { useNovena } from "@/context/NovenaContext";

export function Footer() {
  const { setIsIntentionModalOpen, setIsContemplativeMode } = useNovena();

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#2A080E] text-[#F5EFEB] border-t border-[#4A101A] pt-14 pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-[#4A101A]">
          
          {/* Col 1: Identity & Mission */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl text-[#EED074]">🌹</span>
              <span className="font-serif font-bold text-lg text-white">
                Santa Teresinha do Menino Jesus
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#D6C5B8] leading-relaxed">
              Doutora da Igreja, Padroeira das Missões e Protetora dos Enfermos. Que a sua promessa de fazer chover rosas alcance o seu lar e a sua família.
            </p>
            <div className="text-xs text-[#EED074] font-serif italic">
              “Depois da minha morte, farei cair do Céu uma chuva de rosas.”
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <span className="block text-xs font-bold uppercase tracking-widest text-[#EED074] font-display">
              Navegação da Novena
            </span>
            <ul className="space-y-2 text-xs sm:text-sm text-[#D6C5B8]">
              <li>
                <a href="#jornada" className="hover:text-white transition-colors">
                  • Jornada dos 9 Dias
                </a>
              </li>
              <li>
                <a href="#oracao" className="hover:text-white transition-colors">
                  • Oração Inicial e Terço dos 24 Glórias
                </a>
              </li>
              <li>
                <a href="#milagres" className="hover:text-white transition-colors">
                  • Milagres Documentados de Lisieux
                </a>
              </li>
              <li>
                <a href="#historia" className="hover:text-white transition-colors">
                  • Origem da Devoção & A Pequena Via
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  • Perguntas Frequentes (FAQ)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Devotional Actions */}
          <div className="space-y-3">
            <span className="block text-xs font-bold uppercase tracking-widest text-[#EED074] font-display">
              Espaço de Oração
            </span>
            <p className="text-xs text-[#D6C5B8] leading-relaxed">
              Mantenha sua prece viva. Você pode registrar sua intenção a qualquer momento ou rezar em silêncio no Modo Capela.
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={() => setIsIntentionModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#570F1A] hover:bg-[#731524] text-white text-xs font-semibold transition-colors border border-[#731524]"
              >
                <HeartHandshake className="w-3.5 h-3.5 text-[#EED074]" />
                <span>Registrar Meu Pedido Pessoal</span>
              </button>
              <button
                onClick={() => setIsContemplativeMode(true)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#FAF0D4] text-[#731524] hover:bg-white text-xs font-semibold transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#8C6A17]" />
                <span>Rezar no Modo Capela</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A89E9A]">
          <div className="text-center sm:text-left">
            <span>Santa Teresinha do Menino Jesus e da Sagrada Face, rogai por nós.</span>
            <span className="block mt-0.5 text-[11px] text-[#8C7E7A]">
              Devoção católica com base nos ensinamentos do Carmelo e no Magistério da Igreja.
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#381016] text-[#EED074] hover:bg-[#4A101A] transition-colors border border-[#570F1A]"
            title="Voltar ao Topo"
          >
            <span>Voltar ao Início</span>
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
