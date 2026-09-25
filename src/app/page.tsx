import { NovenaProvider } from "@/context/NovenaContext";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { DaySelector } from "@/components/DaySelector";
import { PrayerDayView } from "@/components/PrayerDayView";
import { AboutNovena } from "@/components/AboutNovena";
import { FaqSection } from "@/components/FaqSection";
import { Footer } from "@/components/Footer";
import { IntentionModal } from "@/components/IntentionModal";
import { ContemplativeMode } from "@/components/ContemplativeMode";

export default function Home() {
  return (
    <NovenaProvider>
      <main className="min-h-screen flex flex-col bg-[#FAF7F2]">
        <Header />
        <Hero />
        <DaySelector />
        <PrayerDayView />
        <AboutNovena />
        <FaqSection />
        <Footer />
        <IntentionModal />
        <ContemplativeMode />
      </main>
    </NovenaProvider>
  );
}
