"use client";

import React, { useState } from "react";
import { FAQ_ITEMS } from "@/data/novenaData";
import { ChevronDown, HelpCircle } from "lucide-react";

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-14 bg-white border-b border-[#E8DCD1]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase font-bold tracking-widest text-[#8E1C2E] font-display flex items-center justify-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            Tire suas Dúvidas
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#2A080E] mt-1">
            Perguntas Frequentes sobre a Novena
          </h2>
          <p className="text-xs sm:text-sm text-[#78716C] mt-2">
            Respostas para as principais dúvidas sobre como rezar, as datas, a promessa da rosa e a devoção.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIdx === idx;

            return (
              <div
                key={idx}
                className="rounded-xl border border-[#E8DCD1] overflow-hidden transition-all bg-[#FAF7F2]/40"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left transition-colors hover:bg-[#FAF7F2] cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif font-bold text-base sm:text-lg text-[#2A080E]">
                    {item.question}
                  </span>
                  <div className={`p-1.5 rounded-full bg-white border border-[#DFCFBE] text-[#8E1C2E] shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 bg-[#FDE8EB]" : ""
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-sm sm:text-base text-[#44403C] leading-relaxed border-t border-[#E8DCD1]/60 pt-3 animate-fadeIn text-justify">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
