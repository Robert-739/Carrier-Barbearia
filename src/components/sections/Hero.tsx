'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function Hero() {
  return (
    <section 
      id="inicio" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white text-black"
    >
      {/* 📸 IMAGEM DE PEDRA COMO FUNDO DA SEÇÃO */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.65]">
        {/* ^ Controle a opacidade aqui (0.12 = 12%). 
              Se quiser a pedra mais escura ou mais visível, mude esse valor (ex: opacity-20 ou opacity-5) */}
        <Image
          src="/pedra.png" // Certifique-se de que está na pasta public/pedra.png
          alt="Textura de fundo Carrier"
          fill
          priority
          className="object-cover grayscale" // Mantém a foto cobrindo tudo e em preto e branco para o estilo editorial
        />
      </div>

      {/* Linhas diagonais decorativas (firam por cima do fundo, mas sob o texto) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-[20%] -left-10 w-[120%] h-px bg-gradient-to-r from-transparent via-black/20 to-transparent rotate-[-15deg]"
        />
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="absolute bottom-[30%] -right-10 w-[120%] h-px bg-gradient-to-r from-transparent via-black/20 to-transparent rotate-[-15deg]"
        />
      </div>

      {/* 📦 CONTEÚDO PRINCIPAL (Fica por cima de tudo graças ao z-10) */}
      <div className="container mx-auto px-4 relative z-10 flex justify-center">
        <div className="flex flex-col items-center text-center max-w-4xl">
          
          {/* Slot para a LOGO PNG da barbearia */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl px-4"
          >
            <div className="relative scale-250 w-full h-32 sm:h-40 md:h-48 flex justify-center">
              <Image
                src="/logo-preta.png"
                alt="Carrier Barbearia Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
            
            {/* Linha brutalista preta abaixo da logo */}
            
          </motion.div>

          {/* Subtitle */}
          

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-zinc-600 text-base md:text-lg max-w-md mt-6 text-pretty font-medium"
          >
            Transformamos cortes em expressões de personalidade. 
            Bem-vindo à nova era da barbearia.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto px-6"
          >
            <Link
              href="#agendamento"
              className="group relative px-10 py-4 bg-black text-white font-bold uppercase tracking-widest text-xs overflow-hidden border border-black transition-colors"
            >
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                Agendar Horário
              </span>
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                style={{ originX: 0 }}
              />
            </Link>

            <Link
              href="#equipe"
              className="group px-10 py-4 border-2 border-black text-black font-bold uppercase tracking-widest text-xs hover:bg-black hover:text-white transition-colors duration-300 relative"
            >
              <span className="relative z-10">Nossa Equipe</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ 
          opacity: { delay: 1.5, duration: 0.5 },
          y: { duration: 2, repeat: Infinity, delay: 1.5 }
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">Scroll</span>
          <ChevronDown className="w-5 h-5 text-black" />
        </div>
      </motion.div>
    </section>
  )
}