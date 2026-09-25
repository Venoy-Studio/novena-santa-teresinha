import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans, Cinzel } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans-main",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://novena-santa-teresinha.vercel.app"),
  alternates: {
    canonical: "https://novena-santa-teresinha.vercel.app",
  },
  title: "Novena das Rosas de Santa Teresinha do Menino Jesus",
  description: "Reze a tradicional Novena das Rosas a Santa Teresinha do Menino Jesus. Acompanhe os 9 dias, contador dos 24 Glórias, intenções pessoais e milagres documentados.",
  keywords: [
    "Novena das Rosas",
    "Santa Teresinha do Menino Jesus",
    "Santa Teresinha",
    "24 Glórias",
    "Oração de Santa Teresinha",
    "Lisieux",
    "Chuva de Rosas",
    "Carmelo",
    "Igreja Católica"
  ],
  authors: [{ name: "Devoção a Santa Teresinha" }],
  openGraph: {
    title: "Novena das Rosas: Reze a Santa Teresinha do Menino Jesus",
    description: "Reze os 9 dias da Novena das Rosas com meditações autênticas, contador interativo dos 24 Glórias, caderno de intenções e milagres.",
    url: "https://novena-santa-teresinha.vercel.app",
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#8C1D2F",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${cormorant.variable} ${cinzel.variable} ${plusJakarta.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body 
        className="min-h-screen bg-[#FAF7F2] text-[#1C1917] font-sans antialiased selection:bg-[#F2D7DC] selection:text-[#721523]"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
