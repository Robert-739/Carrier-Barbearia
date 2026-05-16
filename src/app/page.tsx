'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic' // 💡 Importamos o carregador dinâmico do Next.js
import { Hero } from "@/components/sections/Hero"
import { Gallery } from "@/components/sections/gallery"
import { Footer } from "@/components/sections/Footer"

// 💡 Carregamos os componentes que possuem estados complexos de forma dinâmica, desativando o SSR neles
const Team = dynamic(
  () => import('@/components/sections/Team').then((mod) => mod.Team),
  { ssr: false }
)

const Booking = dynamic(
  () => import('@/components/sections/Booking').then((mod) => mod.Booking),
  { ssr: false }
)

export default function Home() {
  const [bookingStep, setBookingStep] = useState<number>(1)
  const [bookingBarber, setBookingBarber] = useState<string>('')

  const handleSelectBarberFromModal = (barberName: string) => {
    setBookingBarber(barberName)
    setBookingStep(2)
    
    const bookingSection = document.getElementById('agendamento')
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* O Hero e a Gallery carregam imediatamente via SSR (bom para o SEO do Google) */}
      <Hero />
      <Gallery />
      
      {/* Team e Booking são injetados com segurança direto no cliente, eliminando o erro de hidratação */}
      <Team onSelectBarber={handleSelectBarberFromModal} />
      
      <Booking 
        step={bookingStep}
        setStep={setBookingStep}
        selectedBarber={bookingBarber}
        setSelectedBarber={setBookingBarber}
      />
      
      <Footer />
    </main>
  )
}