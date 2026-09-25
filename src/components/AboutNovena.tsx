"use client";

import React from "react";
import { Sparkles, Heart, Flower2, BookMarked } from "lucide-react";

export function AboutNovena() {
  return (
    <section id="historia" className="py-14 bg-[#FAF7F2] border-b border-[#E8DCD1]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase font-bold tracking-widest text-[#8E1C2E] font-display">
            Tradição & Espiritualidade
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#2A080E] mt-1">
            A História da Novena das Rosas
          </h2>
          <p className="text-xs sm:text-sm text-[#78716C] mt-2">
            Entenda a origem de uma das devoções mais queridas e comoventes de toda a Igreja Católica.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: A Promessa Celeste */}
          <div className="sacred-card rounded-2xl p-6 sm:p-7 border border-[#E5DAC9]">
            <div className="w-10 h-10 rounded-xl bg-[#FDE8EB] text-[#8E1C2E] flex items-center justify-center mb-4">
              <Flower2 className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-xl text-[#2A080E] mb-2">
              A Promessa: “Uma Chuva de Rosas”
            </h3>
            <p className="text-sm text-[#44403C] leading-relaxed text-justify">
              Poucas semanas antes de sua morte prematura no Carmelo aos 24 anos, debilitada pela tuberculose, Teresa declarou: <em>“Sinto que a minha missão vai começar: a missão de ensinar as almas a amar a Deus como eu O amo. Passarei o meu Céu a fazer o bem sobre a terra. Farei cair uma chuva de rosas.”</em> As rosas tornaram-se o símbolo palpável das graças e consolações que ela derrama sobre os corações aflitos.
            </p>
          </div>

          {/* Card 2: Por que 24 Glórias? */}
          <div className="sacred-card rounded-2xl p-6 sm:p-7 border border-[#E5DAC9]">
            <div className="w-10 h-10 rounded-xl bg-[#FAF0D4] text-[#8C6A17] flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-xl text-[#2A080E] mb-2">
              Por que 24 Glórias ao Pai?
            </h3>
            <p className="text-sm text-[#44403C] leading-relaxed text-justify">
              Diferente de outras novenas comuns, a Novena das Rosas tem como eixo central a oração do <strong>Glória ao Pai</strong> rezada 24 vezes a cada dia. Cada Glória é uma ação de graças à Santíssima Trindade por um ano da vida terrena de Teresa (1873 a 1897), louvando a Deus por cada virtude, silêncio e sacrifício oferecido por amor à Igreja.
            </p>
          </div>

          {/* Card 3: A Origem em 1925 */}
          <div className="sacred-card rounded-2xl p-6 sm:p-7 border border-[#E5DAC9]">
            <div className="w-10 h-10 rounded-xl bg-[#F4EFE6] text-[#570F1A] flex items-center justify-center mb-4">
              <BookMarked className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-xl text-[#2A080E] mb-2">
              O Padre Putigan e o Sinal da Rosa
            </h3>
            <p className="text-sm text-[#44403C] leading-relaxed text-justify">
              Em dezembro de 1925, no ano da canonização de Teresa pelo Papa Pio XI, o padre jesuíta Pe. Putigan rezou pela primeira vez os 24 Glórias pedindo uma graça e suplicando a Teresa uma rosa como sinal celestial. No terceiro dia após o término da novena, uma enfermeira entregou-lhe inesperadamente uma linda rosa branca. A novena espalhou-se rapidamente por todo o orbe católico.
            </p>
          </div>

          {/* Card 4: A Pequena Via */}
          <div className="sacred-card rounded-2xl p-6 sm:p-7 border border-[#E5DAC9]">
            <div className="w-10 h-10 rounded-xl bg-[#FDE8EB] text-[#8E1C2E] flex items-center justify-center mb-4">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-xl text-[#2A080E] mb-2">
              A Pequena Via & Doutora da Igreja
            </h3>
            <p className="text-sm text-[#44403C] leading-relaxed text-justify">
              Em 1997, São João Paulo II proclamou Santa Teresinha <strong>Doutora da Igreja</strong> universal, reconhecendo a genialidade teológica de sua <em>Pequena Via</em> (Infância Espiritual). Teresa mostrou que a santidade não requer feitos grandiosos ou penitências extraordinárias: reside em se abandonar com confiança cega nos braços do Pai e fazer as menores tarefas diárias com um amor imenso.
            </p>
          </div>

        </div>

        {/* Quote Banner */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-[#FDE8EB] via-white to-[#FDE8EB] border border-[#F8C7CE] text-center">
          <p className="font-serif italic text-base sm:text-lg text-[#570F1A]">
            “No coração da Igreja, minha Mãe, eu serei o Amor! Assim serei tudo, e meu sonho será realizado.”
          </p>
          <span className="text-xs text-[#8E1C2E] font-semibold mt-1 block">
            — Manuscritos Autobiográficos (História de uma Alma)
          </span>
        </div>

      </div>
    </section>
  );
}
