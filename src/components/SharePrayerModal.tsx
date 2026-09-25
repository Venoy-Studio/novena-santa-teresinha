"use client";

import React, { useState } from "react";
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

  if (!isSharePrayerModalOpen) return null;

  const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://novenadasrosas.com.br";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="w-full max-w-lg bg-[#FAF7F2] rounded-3xl border-2 border-[#EED074] shadow-2xl overflow-hidden text-left"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#F4EFE6] via-[#FAF7F2] to-[#FDE8EB] border-b border-[#E8DCD1] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌹</span>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#8E1C2E] font-display block">
                Testemunho de Fé
              </span>
              <h3 className="font-serif font-bold text-lg text-[#2A080E]">
                Compartilhe sua Oração
              </h3>
            </div>
          </div>
          <button
            onClick={() => setIsSharePrayerModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-[#E8DCD1] text-[#78716C] transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Devotional Card Preview */}
        <div className="p-6 space-y-5">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#8E1C2E] via-[#570F1A] to-[#3B0810] text-white p-6 shadow-md border-2 border-[#EED074]/80 text-center">
            
            {/* Soft decorative background circles */}
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#EED074]/10 blur-xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-[#EED074]/10 blur-xl pointer-events-none" />

            {/* Saint Therese Oval Cameo */}
            <div className="relative w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden ring-3 ring-[#EED074] shadow-lg">
              <Image 
                src="/images/santa-teresinha.jpg" 
                alt="Santa Teresinha do Menino Jesus" 
                fill 
                sizes="96px"
                className="object-cover"
              />
            </div>

            <span className="inline-block px-3.5 py-1 rounded-full bg-[#FAF0D4] text-[#731524] text-[11px] font-bold uppercase tracking-wider font-display shadow-xs mb-2">
              🌹 Rezei com Devoção • {devoteeDisplayName}
            </span>

            <h4 className="font-serif font-bold text-xl sm:text-2xl text-[#FAF7F2] leading-tight">
              {currentDay}º Dia da Novena das Rosas
            </h4>
            <p className="text-xs text-[#EED074] font-medium mt-0.5">
              {selectedDayData.theme}
            </p>

            <div className="my-3 flex items-center justify-center gap-2">
              <div className="h-px w-8 bg-[#EED074]/60" />
              <span className="text-[#EED074] text-xs">✝</span>
              <div className="h-px w-8 bg-[#EED074]/60" />
            </div>

            <blockquote className="font-serif italic text-sm sm:text-base text-[#FAF0D4] leading-relaxed line-clamp-3">
              “{selectedDayData.quote}”
            </blockquote>

            <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-[11px] text-[#D6C5B8]">
              <span>Santa Teresinha de Lisieux</span>
              <span className="flex items-center gap-1 text-[#EED074]">
                <Sparkles className="w-3 h-3" /> novenadasrosas.com
              </span>
            </div>
          </div>

          <p className="text-xs text-[#78716C] text-center">
            Ao compartilhar, você convida mais pessoas a rezar e leva a mensagem de esperança e rosas de Santa Teresinha para quem mais precisa hoje.
          </p>

          {/* Social Share Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              onClick={handleWhatsApp}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Enviar no WhatsApp</span>
            </button>

            <button
              onClick={handleTelegram}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#0088cc] hover:bg-[#0077b5] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Enviar no Telegram</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#DFCFBE] text-[#570F1A] text-xs font-semibold hover:bg-[#FAF7F2] transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-green-700">Mensagem com Link Copiada!</span>
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
                onClick={handleNativeShare}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#FAF0D4] border border-[#EED074] text-[#8C6A17] text-xs font-bold hover:bg-[#F9ECC4] transition-colors"
                title="Mais Opções de Compartilhar"
              >
                <Share2 className="w-4 h-4" />
                <span>Mais</span>
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#F4EFE6] border-t border-[#E8DCD1] text-center">
          <span className="text-[11px] text-[#78716C] flex items-center justify-center gap-1">
            <Heart className="w-3 h-3 text-[#8E1C2E] fill-current" />
            “Farei cair do Céu uma chuva de rosas sobre a Terra.”
          </span>
        </div>
      </div>
    </div>
  );
}
