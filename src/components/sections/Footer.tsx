'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Phone, MapPin, Clock } from 'lucide-react'
import { FaInstagram } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-black text-white border-t-2 border-black py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
        
        {/* 1. CANTO ESQUERDO: Informações de Contato / Padrões */}
        <div className="space-y-4 text-center md:text-left order-2 md:order-1">
          <h4 className="font-oswald text-lg font-bold uppercase tracking-widest text-zinc-400">
            Contato & Horários
          </h4>
          
          <div className="space-y-2 text-xs font-medium uppercase tracking-wider text-zinc-300">
            <p className="flex items-center justify-center md:justify-start gap-2">
              <Phone className="w-4 h-4 text-white" />
              (19) 99999-9999
            </p>
            <p className="flex items-center justify-center md:justify-start gap-2">
              <FaInstagram className="w-4 h-4 text-white" />
              @carrierbarbearia
            </p>
            <p className="flex items-center justify-center md:justify-start gap-2">
              <Clock className="w-4 h-4 text-white" />
              Ter à Sáb: 09h às 20h
            </p>
            <p className="flex items-center justify-center md:justify-start gap-2 text-zinc-500">
              <MapPin className="w-4 h-4" />
              Limeira - SP
            </p>
          </div>
        </div>

        {/* 2. MEIO: Logo Branca Centralizada */}
        <div className="flex flex-col items-center justify-center order-1 md:order-2">
          <div className="relative w-full max-w-[150px] h-32 flex justify-center items-center">
            <Image
              src="/logo-carrier.png" // O arquivo que você comentou que tem aí!
              alt="Carrier Barbearia Logo"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-[10px] font-mono tracking-widest text-zinc-600 uppercase mt-4">
            © {new Date().getFullYear()} CARRIER. TODOS OS DIREITOS RESERVADOS.
          </p>
        </div>

        {/* 3. CANTO DIREITO: Iframe do GPS / Localização */}
        <div className="w-full h-48 border-2 border-zinc-800 order-3 group hover:border-white transition-colors duration-300 relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.847118678077!2d-47.4042851!3d-22.5661073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c87e076ddc5d89%3A0x67302f37803d3ec!2sLimeira%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1715830000000!5m2!1spt-BR!2sbr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização Carrier Barbearia"
            className="grayscale contrast-[1.2] invert group-hover:invert-0 group-hover:grayscale-0 transition-all duration-700" 
            // ^ Esse combo de classes deixa o mapa "dark/brutalista" combinando com o footer 
            // e ele volta a ficar colorido e normal quando o cliente passa o mouse por cima!
          />
        </div>

      </div>
    </footer>
  )
}