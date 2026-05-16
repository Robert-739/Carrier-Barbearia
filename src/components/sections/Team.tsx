"use client";
import React, { useState } from "react";
import Image from "next/image"; // Importação que estava faltando
import { BARBERS, Barber } from "@/data/barbers";
import { BarberCard } from "../ui/BarberCard";
import { Scissors } from "lucide-react";
import { FaInstagram } from "react-icons/fa"; // Verifique se o lucide-react está atualizado

export const Team = () => {
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);

  return (
    <section id="equipe" className="py-24 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-4 border-l-8 border-black pl-6">
            Os Artistas
          </h2>
          <p className="text-zinc-500 font-medium uppercase tracking-widest text-sm">
            Curadoria de talentos que definem o estilo Carrier.
          </p>
        </div>

        {/* GRID DE 4 SLOTS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {BARBERS.map((barber) => (
            <BarberCard 
              key={barber.id} 
              barber={barber} 
              onClick={(b) => setSelectedBarber(b)} 
            />
          ))}
        </div>
      </div>

      {/* MODAL SIMPLES (CLEAN CODE) */}
      {selectedBarber && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-white/90 backdrop-blur-sm"
            onClick={() => setSelectedBarber(null)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white border-2 border-black w-full max-w-2xl animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setSelectedBarber(null)}
              className="absolute top-4 right-4 text-black hover:rotate-360 transition-transform duration-700"
            >
              <Scissors size={32} className="rotate-270"/>
            </button>

            <div className="flex flex-col md:flex-row">
              <div className="relative w-full md:w-1/2 h-[400px]">
                <Image 
                  src={selectedBarber.image} 
                  alt={selectedBarber.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 md:w-1/2 flex flex-col justify-center">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">
                  {selectedBarber.role}
                </span>
                <h3 className="font-oswald text-4xl font-bold uppercase mb-4 leading-none">
                  {selectedBarber.name}
                </h3>
                <p className="text-zinc-600 leading-relaxed mb-6">
                  {selectedBarber.bio}
                </p>
                <a 
                  href={`https://instagram.com/${selectedBarber.instagram}`}
                  target="_blank"
                  className="flex items-center gap-2 font-bold uppercase text-xs tracking-widest hover:underline"
                >
                  <FaInstagram size={16} />
                  {selectedBarber.instagram}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};