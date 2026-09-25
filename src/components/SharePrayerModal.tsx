"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useNovena } from "@/context/NovenaContext";
import { 
  X, 
  Share2, 
  Copy, 
  Check, 
  Sparkles, 
  Send, 
  Heart,
  ExternalLink 
} from "lucide-react";

export function SharePrayerModal() {
  const {
    isSharePrayerModalOpen,
    setIsSharePrayerModalOpen,
    currentDay,
    selectedDayData,
    userIntention,
    devoteeProfile,
  } = useNovena();

  const [copied, setCopied] = useState(false);

  // Close on ESC key
  useEffect(() => {
    if (!isSharePrayerModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsSharePrayerModalOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSharePrayerModalOpen, setIsSharePrayerModalOpen]);

  if (!isSharePrayerModalOpen) return null;

  const siteUrl = "https://novena-santa-teresinha.vercel.app";
  const devoteeDisplayName = devoteeProfile?.name || "Devoto(a) de Santa Teresinha";

  const shareText = 
    `🌹 *Eu, ${devoteeDisplayName}, acabei de rezar o ${currentDay}º Dia da Novena das Rosas de Santa Teresinha do Menino Jesus!*\n\n` +
    `✨ _"${selectedDayData.quote}"_\n\n` +
    (userIntention ? `🙏 _Intenção particular: "${userIntention}"_\n\n` : "") +
    (devoteeProfile?.favoriteSaint ? `🕊️ _Devoção a: ${devoteeProfile.favoriteSaint}_\n\n` : "") +
    `Venha rezar você também e acender uma vela virtual com sua intenção:\n` +
    `${siteUrl}`;

  const handleWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank");
  };

  const handleTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(siteUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `Rezei o ${currentDay}º Dia da Novena das Rosas`,
          text: shareText,
          url: siteUrl,
        });
      } catch {
        // User cancelled or share unsupported
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-fadeIn overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsSharePrayerModalOpen(false);
      }}
    >
      <div 
        className="w-full max-w-lg bg-[#FAF7F2] rounded-3xl border-2 border-[#EED074] shadow-2xl overflow-hidden text-left my-auto max-h-[92vh] flex flex-col transform animate-scaleUp"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header (Fixed at top) */}
        <div className="px-5 py-3.5 sm:px-6 sm:py-4 bg-gradient-to-r from-[#F4EFE6] via-[#FAF7F2] to-[#FDE8EB] border-b border-[#E8DCD1] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🌹</span>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#8E1C2E] font-display block">
                Testemunho de Fé
              </span>
              <h3 className="font-serif font-bold text-base sm:text-lg text-[#2A080E]">
                Compartilhe sua Oração
              </h3>
            </div>
          </div>
          
          {/* Prominent Mobile-Friendly Close Button */}
          <button
            type="button"
            onClick={() => setIsSharePrayerModalOpen(false)}
            className="w-10 h-10 rounded-full hover:bg-[#E8DCD1] active:bg-[#DFCFBE] text-[#2A080E] transition-colors flex items-center justify-center cursor-pointer -mr-1"
            aria-label="Fechar janela"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Dynamic Devotional Card & Body (Scrollable on small screens) */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto flex-1">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#8E1C2E] via-[#570F1A] to-[#3B0810] text-white p-4 sm:p-6 shadow-md border-2 border-[#EED074]/80 text-center">
            
            {/* Soft decorative background circles */}
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#EED074]/10 blur-xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-[#EED074]/10 blur-xl pointer-events-none" />

            {/* Saint Therese Oval Cameo */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-2.5 rounded-full overflow-hidden ring-3 ring-[#EED074] shadow-lg">
              <Image 
                src="/images/santa-teresinha.jpg" 
                alt="Santa Teresinha do Menino Jesus" 
                fill 
                sizes="(max-width: 640px) 80px, 96px"
                className="object-cover"
              />
            </div>

            <span className="inline-block px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full bg-[#FAF0D4] text-[#731524] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider font-display shadow-xs mb-1.5">
              🌹 Rezei com Devoção • {devoteeDisplayName}
            </span>

            <h4 className="font-serif font-bold text-lg sm:text-2xl text-[#FAF7F2] leading-tight">
              {currentDay}º Dia da Novena das Rosas
            </h4>
            <p className="text-xs text-[#EED074] font-medium mt-0.5">
              {selectedDayData.theme}
            </p>

            <div className="my-2.5 flex items-center justify-center gap-2">
              <div className="h-px w-8 bg-[#EED074]/60" />
              <span className="text-[#EED074] text-xs">✝</span>
              <div className="h-px w-8 bg-[#EED074]/60" />
            </div>

            <blockquote className="font-serif italic text-xs sm:text-sm text-[#FAF0D4] leading-relaxed line-clamp-3">
              “{selectedDayData.quote}”
            </blockquote>

            {/* Correct Production URL Badge */}
            <div className="mt-3.5 pt-2.5 border-t border-white/15 flex items-center justify-between text-[10px] sm:text-[11px] text-[#D6C5B8]">
              <span>Santa Teresinha de Lisieux</span>
              <span className="flex items-center gap-1 text-[#EED074] font-semibold">
                <Sparkles className="w-3 h-3" /> novena-santa-teresinha.vercel.app
              </span>
            </div>
          </div>

          <p className="text-xs text-[#78716C] text-center leading-relaxed">
            Ao compartilhar, você convida mais irmãos a rezar e leva uma bênção de Santa Teresinha para quem mais precisa hoje.
          </p>

          {/* Social Share Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={handleWhatsApp}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer active:scale-98"
            >
              <Send className="w-4 h-4" />
              <span>Enviar no WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={handleTelegram}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#0088cc] hover:bg-[#0077b5] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer active:scale-98"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Enviar no Telegram</span>
            </button>
          </div>

          {/* Secondary Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#DFCFBE] text-[#570F1A] text-xs font-semibold hover:bg-[#FAF7F2] transition-colors cursor-pointer active:scale-98"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-green-700 font-bold">Link da Novena Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar Mensagem com Link</span>
                </>
              )}
            </button>

            {typeof navigator !== "undefined" && typeof navigator.share === "function" && (
              <button
                type="button"
                onClick={handleNativeShare}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#FAF0D4] border border-[#EED074] text-[#8C6A17] text-xs font-bold hover:bg-[#F9ECC4] transition-colors cursor-pointer active:scale-98"
                title="Mais Opções de Compartilhar"
              >
                <Share2 className="w-4 h-4" />
                <span>Mais</span>
              </button>
            )}
          </div>
        </div>

        {/* Modal Footer with Explicit Dismiss Button */}
        <div className="px-5 py-3 bg-[#F4EFE6] border-t border-[#E8DCD1] flex items-center justify-between gap-3 shrink-0">
          <span className="text-[11px] text-[#78716C] flex items-center gap-1 truncate">
            <Heart className="w-3 h-3 text-[#8E1C2E] fill-current shrink-0" />
            <span className="truncate">“Chuva de rosas sobre a Terra.”</span>
          </span>

          <button
            type="button"
            onClick={() => setIsSharePrayerModalOpen(false)}
            className="px-4 py-1.5 rounded-xl bg-white border border-[#DFCFBE] text-[#570F1A] hover:bg-[#FAF7F2] text-xs font-bold transition-all active:scale-95 cursor-pointer shrink-0"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
