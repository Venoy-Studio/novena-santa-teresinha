import { NovenaProvider } from "@/context/NovenaContext";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { DaySelector } from "@/components/DaySelector";
import { PrayerDayView } from "@/components/PrayerDayView";
import { VirtualCandleChapel } from "@/components/VirtualCandleChapel";
import { AboutNovena } from "@/components/AboutNovena";
import { FaqSection } from "@/components/FaqSection";
import { Footer } from "@/components/Footer";
import { IntentionModal } from "@/components/IntentionModal";
import { ContemplativeMode } from "@/components/ContemplativeMode";
import { SharePrayerModal } from "@/components/SharePrayerModal";
import { LightCandleModal } from "@/components/LightCandleModal";
import { VenoyFloatingBadge } from "@/components/VenoyFloatingBadge";

export default function Home() {
  return (
    <NovenaProvider>
      <main className="min-h-screen flex flex-col bg-[#FAF7F2] pb-20 lg:pb-0">
        <Header />
        <Hero />
        <DaySelector />
        <PrayerDayView />
        <VirtualCandleChapel />
        <AboutNovena />
        <FaqSection />
        <Footer />
        <IntentionModal />
        <ContemplativeMode />
        <SharePrayerModal />
        <LightCandleModal />
        <VenoyFloatingBadge />
      </main>
    </NovenaProvider>
  );
}
