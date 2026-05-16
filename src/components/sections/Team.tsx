"use client";
import React, { useState } from "react";
import Image from "next/image";
import { BARBERS, Barber } from "@/data/barbers";
import { BarberCard } from "../ui/BarberCard";
import { Scissors, CalendarCheck } from "lucide-react"; // Adicionado CalendarCheck
import { FaInstagram } from "react-icons/fa";

// 💡 1. Declaramos a interface das Props para o TypeScript aceitar a função vinda do pai
interface TeamProps {
    onSelectBarber: (barberName: string) => void;
}

// 💡 2. Injetamos a Prop desestruturada na assinatura do componente
export const Team = ({ onSelectBarber }: TeamProps) => {
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

            {/* MODAL SIMPLES (CLEAN CODE + VÍDEO & AGENDAMENTO) */}
            {selectedBarber && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-white/90 backdrop-blur-sm"
                        onClick={() => setSelectedBarber(null)}
                    />

                    {/* Modal Content */}
                    <div className="relative bg-white border-2 border-black w-full max-w-3xl animate-in zoom-in-95 duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-h-[90vh] overflow-y-auto md:overflow-y-visible">
                        <button
                            onClick={() => setSelectedBarber(null)}
                            className="absolute top-4 right-4 text-black hover:rotate-360 transition-transform duration-700 z-10 bg-white border border-black p-1"
                        >
                            <Scissors size={24} className="rotate-270" />
                        </button>

                        <div className="flex flex-col md:flex-row">
                            {/* 🎥 CONTAINER DE MÍDIA ALTERADO: Sai a imagem estática, entra o vídeo */}
                            <div className="relative w-full md:w-1/2 h-[300px] md:h-[450px] bg-zinc-900 border-b-2 md:border-b-0 md:border-r-2 border-black">
                                <video
                                    src={selectedBarber.videoSrc}
                                    loop
                                    playsInline
                                    controls
                                    className="w-full h-full object-cover"
                                    poster={selectedBarber.image} // Mantém a foto antiga carregada enquanto o vídeo não dá play
                                />
                            </div>

                            {/* CONTEÚDO DO MODAL */}
                            <div className="p-8 md:w-1/2 flex flex-col justify-between bg-white">
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2 block">
                                        {selectedBarber.role}
                                    </span>
                                    <h3 className="font-oswald text-4xl font-bold uppercase mb-4 leading-none">
                                        {selectedBarber.name}
                                    </h3>
                                    <p className="text-zinc-600 leading-relaxed mb-6 text-sm">
                                        {selectedBarber.bio}
                                    </p>

                                    {/* 🏷️ EXIBIÇÃO DAS TAGS DE ESPECIALIDADE */}
                                    <div className="mb-6">
                                        <div className="flex flex-wrap gap-2">
                                            {selectedBarber.specialties?.map((spec) => (
                                                <span
                                                    key={spec}
                                                    className="text-[10px] font-bold uppercase tracking-wide bg-zinc-100 text-zinc-700 px-2.5 py-1 border border-zinc-200"
                                                >
                                                    {spec}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <a
                                        href={`https://www.instagram.com/${selectedBarber.instagram}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 font-bold uppercase text-xs tracking-widest hover:underline text-black"
                                    >
                                        <FaInstagram size={16} />
                                        @{selectedBarber.instagram}
                                    </a>
                                </div>

                                {/* ⚡ BOTÃO DE AGENDAMENTO DIRETO INTEGRADO */}
                                <button
                                    onClick={() => {
                                        onSelectBarber(selectedBarber.name); // Chama a função que passa o nome e rola a tela
                                        setSelectedBarber(null);             // Fecha o modal
                                    }}
                                    className="w-full mt-8 py-3.5 bg-black text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-zinc-900 transition-colors border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)]"
                                >
                                    <CalendarCheck size={16} />
                                    Agendar Horário
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};