'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

// Dados estáticos para manter o front-end rápido e limpo
const CUTS = [
  { 
    id: 1, 
    title: 'High Fade Texturizado', 
    src: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=800&auto=format&fit=crop',
    size: 'md:col-span-2 md:row-span-2' 
  },
  { 
    id: 2, 
    title: 'Corte Casual Street', 
    src: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop', 
    size: 'md:col-span-1 md:row-span-1' 
  },
  { 
    id: 3, 
    title: 'Beard Sculpting / Barba', 
    src: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800&auto=format&fit=crop', 
    size: 'md:col-span-1 md:row-span-2' 
  },
  { 
    id: 4, 
    // Alterado de md:col-span-1 para md:col-span-2 para esticar e alinhar com o de cima!
    title: 'Buzz Cut Geometric', 
    src: 'https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?q=80&w=800&auto=format&fit=crop', 
    size: 'md:col-span-2 md:row-span-1' 
  },
  { 
    id: 5, 
    title: 'Classic Pompadour', 
    src: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1200&auto=format&fit=crop', 
    size: 'md:col-span-2 md:row-span-1' 
  },
]

export function Gallery() {
  return (
    <section id="galeria" className="py-24 bg-[#f5f5f5] px-6 border-b border-black/10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header da Seção */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-zinc-400 font-bold block mb-2">
              Portfólio de Assinatura
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none border-l-8 border-black pl-6">
              Linha de Frente
            </h2>
          </div>
          <p className="text-zinc-500 font-medium max-w-sm text-sm uppercase tracking-wider leading-relaxed">
            Cortes reais, texturas brutas. A identidade urbana moldada na tesoura e na máquina.
          </p>
        </div>

        {/* Grid Assimétrico Brutalista */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 auto-rows-[280px]">
          {CUTS.map((cut, index) => (
            <motion.div
              key={cut.id}
              className={`relative overflow-hidden border-2 border-black group cursor-pointer ${cut.size}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Imagem do Corte com Efeito Editorial */}
              <Image
                src={cut.src}
                alt={cut.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover grayscale contrast-[1.05] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
              />

              {/* Overlay Sutil com o Nome do Estilo ao passar o mouse */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white font-oswald text-xl font-bold uppercase tracking-wide">
                  {cut.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}