"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Início", href: "#inicio" },
        { name: "Serviços", href: "#servicos" },
        { name: "Equipe", href: "#equipe" },
        { name: "Galeria", href: "#galeria" },
        { name: "Agendar", href: "#agendamento" }, // Ajustado para bater com a id="agendamento" do Booking
    ];

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
                ? "bg-white/80 backdrop-blur-md border-b border-black/5"
                : "bg-transparent"
                }`}
        >
            <div
                className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-500 ${isScrolled ? "h-16" : "h-24"
                    }`}
            >
                {/* 🎯 CONTAINER DA LOGO CORRIGIDO */}
                <div className="relative flex items-center h-full">
                    <Image
                        src="/logo-header.png"
                        alt="Carrier Barbearia Logo"
                        width={160} // Reduzido um pouco para manter a proporção sutil
                        height={40}
                        priority
                        className={`object-contain w-auto transition-all duration-500 ${
                            isScrolled ? "h-20" : "h-28"
                        }`} // ^ O segredo está aqui: controlamos a altura da imagem dinamicamente baseada no scroll!
                    />
                </div>

                {/* NAVEGAÇÃO DESKTOP */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-xs font-bold uppercase tracking-widest hover:text-zinc-500 transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="#agendamento"
                        className="bg-black text-white px-6 py-3 text-xs font-bold uppercase tracking-widest border border-black hover:bg-white hover:text-black transition-all duration-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    >
                        Reservar Agora
                    </Link>
                </nav>

                {/* MOBILE MENU BUTTON */}
                <button
                    className="md:hidden text-black focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* MOBILE MENU UI */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white border-b border-black/10 flex flex-col p-6 gap-4 md:hidden animate-in fade-in slide-in-from-top-5">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="text-sm font-bold uppercase tracking-widest text-black hover:text-zinc-500 transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            )}
        </header>
    );
};