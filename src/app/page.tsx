// src/app/page.tsx
import { Hero } from "@/components/sections/Hero";
import { Gallery } from "@/components/sections/gallery"; // Novo import
import { Team } from "@/components/sections/Team";
import { Booking } from "@/components/sections/Booking";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* 1. Proposta de Valor e Impacto Inicial */}
      <Hero />
      
      {/* 2. Prova Social Visual (A sua ideia matadora de negócio) */}
      <Gallery />
      
      {/* 3. Conexão Humana e Escolha Profissional */}
      <Team />

      <Booking />

      <Footer />
    </main>
  );
}