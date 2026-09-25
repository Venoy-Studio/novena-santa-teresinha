"use client";

import React from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

export function VenoyFloatingBadge() {
  return (
    <aside aria-label="Créditos e Site do Desenvolvedor">
      <a
        href="https://venoystudio.online"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-3.5 sm:bottom-6 sm:right-6 z-40 group flex items-center gap-2 pl-1.5 pr-3 sm:pr-3.5 py-1.5 rounded-full bg-[#18181B]/95 text-white backdrop-blur-md border border-[#27272A] shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(163,230,53,0.35)] hover:border-[#a3e635]/60 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer select-none"
        title="Desenvolvido por Venoy Studio — Visitar Site Oficial"
        aria-label="Venoy Studio (Site Oficial: venoystudio.online)"
      >
        {/* Venoy Studio Lightning Bolt Cameo */}
        <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden shrink-0 bg-black/60 p-0.5 ring-1 ring-white/20 group-hover:ring-[#a3e635] transition-all">
          <Image
            src="/images/venoy-logo.png"
            alt="Venoy Studio Logo"
            fill
            sizes="32px"
            className="object-contain"
          />
        </div>

        {/* Text Details */}
        <div className="flex flex-col text-left">
          <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-white group-hover:text-[#a3e635] transition-colors font-sans leading-tight">
            Venoy Studio
          </span>
          <span className="text-[9px] text-[#A1A1AA] font-mono leading-none hidden sm:block">
            venoystudio.online
          </span>
        </div>

        {/* Subtle Arrow Icon */}
        <ExternalLink className="w-3 h-3 text-[#A1A1AA] group-hover:text-[#a3e635] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-0.5" />
      </a>
    </aside>
  );
}
