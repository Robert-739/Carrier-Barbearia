'use client'

import React, { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, Scissors, ChevronRight, Check, CreditCard } from 'lucide-react'
import Image from 'next/image'

// Resgatando a nossa lista padrão de barbeiros locais do seu arquivo de dados
import { BARBERS } from '@/data/barbers'

const SERVICES = [
  { name: 'Corte Clássico', price: 'R$ 45', numericPrice: 45, duration: '30 min' },
  { name: 'Degradê / Fade', price: 'R$ 55', numericPrice: 55, duration: '40 min' },
  { name: 'Barba Completa', price: 'R$ 40', numericPrice: 40, duration: '30 min' },
  { name: 'Combo Completo', price: 'R$ 85', numericPrice: 85, duration: '1h 15min' },
]

const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
]

export function Booking() {
  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true })
  
  const [step, setStep] = useState(1)
  const [selectedBarber, setSelectedBarber] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const getNextDays = () => {
    const days = []
    const today = new Date()
    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      days.push({
        date: date.toISOString().split('T')[0],
        dayName: date.toLocaleDateString('pt-BR', { weekday: 'short' }),
        dayNumber: date.getDate(),
        monthName: date.toLocaleDateString('pt-BR', { month: 'short' }),
      })
    }
    return days
  }

  // 🚀 NOVA FUNÇÃO: Integração com Backend e Redirecionamento de Pagamento
  const handlePaymentRedirect = async () => {
    setIsSubmitting(true)
    const serviceDetails = SERVICES.find(s => s.name === selectedService)

    const bookingData = {
      barber: selectedBarber,
      service: selectedService,
      price: serviceDetails?.numericPrice,
      date: selectedDate,
      time: selectedTime,
      clientName: name,
      clientPhone: phone,
    }

    try {
      // Aqui seu Next.js chama a rota do Node.js que criaremos na sequência
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      })

      const data = await response.json()

      if (data.init_point) {
        // Redireciona o cliente direto para a tela segura de pagamento (Pix/Cartão)
        window.location.href = data.init_point
      } else {
        alert('Erro ao gerar o link de pagamento. Tente novamente.')
      }
    } catch (error) {
      console.error('Erro no agendamento:', error)
      alert('Falha na conexão com o servidor.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const stepLabels = ['Barbeiro', 'Serviço', 'Data', 'Pagamento']

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="font-oswald text-2xl font-bold uppercase tracking-wide mb-6">Escolha seu barbeiro</h3>
            <div className="grid gap-3">
              {BARBERS.map((barber, index) => (
                <motion.button
                  key={barber.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => { setSelectedBarber(barber.name); setStep(2) }}
                  className={`flex items-center justify-between p-4 border-2 transition-all group ${
                    selectedBarber === barber.name 
                      ? 'border-black bg-zinc-50' 
                      : 'border-zinc-200 hover:border-black/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 relative overflow-hidden border border-black/10">
                      <Image
                        src={barber.image}
                        alt={barber.name}
                        fill
                        className="object-cover object-top grayscale"
                      />
                    </div>
                    <div className="text-left">
                      <span className="font-bold text-black block">{barber.name}</span>
                      <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">{barber.role}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-zinc-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
                </motion.button>
              ))}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="font-oswald text-2xl font-bold uppercase tracking-wide mb-6">Escolha o serviço</h3>
            <div className="grid gap-3">
              {SERVICES.map((service, index) => (
                <motion.button
                  key={service.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => { setSelectedService(service.name); setStep(3) }}
                  className={`flex items-center justify-between p-4 border-2 transition-all group ${
                    selectedService === service.name 
                      ? 'border-black bg-zinc-50' 
                      : 'border-zinc-200 hover:border-black/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-zinc-100 flex items-center justify-center border border-black/10 group-hover:border-black/30 transition-colors">
                      <Scissors className="w-5 h-5 text-black" />
                    </div>
                    <div className="text-left">
                      <span className="font-bold text-black block">{service.name}</span>
                      <span className="text-xs text-zinc-400 font-medium">{service.duration}</span>
                    </div>
                  </div>
                  <span className="font-oswald text-xl font-bold text-black">{service.price}</span>
                </motion.button>
              ))}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="font-oswald text-2xl font-bold uppercase tracking-wide mb-6">Escolha a data</h3>
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-7">
              {getNextDays().map((day, index) => (
                <motion.button
                  key={day.date}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedDate(day.date)}
                  className={`flex-shrink-0 flex flex-col items-center p-3 md:p-4 border-2 transition-all min-w-[75px] ${
                    selectedDate === day.date 
                      ? 'border-black bg-black text-white' 
                      : 'border-zinc-200 hover:border-black/50'
                  }`}
                >
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${selectedDate === day.date ? 'text-zinc-300' : 'text-zinc-400'}`}>
                    {day.dayName}
                  </span>
                  <span className="font-oswald text-2xl font-bold">{day.dayNumber}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${selectedDate === day.date ? 'text-zinc-300' : 'text-zinc-400'}`}>
                    {day.monthName}
                  </span>
                </motion.button>
              ))}
            </div>

            <AnimatePresence>
              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 overflow-hidden"
                >
                  <h4 className="font-bold text-sm uppercase tracking-wider flex items-center gap-2 pt-4 border-t border-zinc-100">
                    <Clock className="w-4 h-4 text-black" />
                    Horários disponíveis
                  </h4>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {TIME_SLOTS.map((time, index) => (
                      <motion.button
                        key={time}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.02 }}
                        onClick={() => { setSelectedTime(time); setStep(4) }}
                        className={`py-3 text-center border-2 font-mono text-sm font-bold transition-all ${
                          selectedTime === time 
                            ? 'border-black bg-black text-white' 
                            : 'border-zinc-200 hover:border-black hover:bg-zinc-50'
                        }`}
                      >
                        {time}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="font-oswald text-2xl font-bold uppercase tracking-wide mb-6">Seus dados</h3>
            <div className="space-y-4">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Nome completo</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-4 bg-zinc-50 border-2 border-zinc-200 focus:border-black outline-none transition-colors text-black font-medium"
                  placeholder="Seu nome"
                />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">WhatsApp</label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-4 bg-zinc-50 border-2 border-zinc-200 focus:border-black outline-none transition-colors text-black font-medium"
                  placeholder="(15) 99999-9999"
                />
              </motion.div>
            </div>

            {/* Resumo Brutalista */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-5 bg-zinc-50 border-2 border-black space-y-3"
            >
              <h4 className="font-bold text-xs uppercase tracking-widest flex items-center gap-2 border-b border-zinc-200 pb-2 mb-2">
                <Calendar className="w-4 h-4 text-black" />
                Resumo do agendamento
              </h4>
              <div className="flex justify-between text-xs font-medium uppercase tracking-wider">
                <span className="text-zinc-400">Barbeiro</span>
                <span className="text-black font-bold">{selectedBarber}</span>
              </div>
              <div className="flex justify-between text-xs font-medium uppercase tracking-wider">
                <span className="text-zinc-400">Serviço</span>
                <span className="text-black font-bold">{selectedService}</span>
              </div>
              <div className="flex justify-between text-xs font-medium uppercase tracking-wider">
                <span className="text-zinc-400">Data</span>
                <span className="text-black font-bold">{selectedDate ? new Date(selectedDate).toLocaleDateString('pt-BR') : ''}</span>
              </div>
              <div className="flex justify-between text-xs font-medium uppercase tracking-wider">
                <span className="text-zinc-400">Horário</span>
                <span className="text-black font-bold">{selectedTime}</span>
              </div>
              <div className="flex justify-between items-end pt-3 border-t-2 border-dashed border-zinc-200 font-bold">
                <span className="text-xs uppercase tracking-wider text-black">Total a pagar</span>
                <span className="text-black font-oswald text-2xl leading-none">
                  {SERVICES.find(s => s.name === selectedService)?.price}
                </span>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={handlePaymentRedirect}
              disabled={!name || !phone || isSubmitting}
              className="w-full py-4 bg-black text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-zinc-900 transition-colors disabled:opacity-30 disabled:cursor-not-allowed border-2 border-black"
            >
              <CreditCard className="w-4 h-4" />
              {isSubmitting ? 'Processando...' : 'Ir para o Pagamento (PIX / Cartão)'}
            </motion.button>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <section id="agendamento" className="py-24 bg-white px-6 relative border-t border-black/5">
      <div className="max-w-7xl mx-auto">
        
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-zinc-400 text-xs uppercase tracking-[0.3em] font-bold">
            Garantia de Horário
          </span>
          <h2 className="font-oswald text-4xl md:text-6xl font-black mt-4 uppercase tracking-tighter text-black">
            Agendamento Online
          </h2>
          <div className="w-20 h-[3px] bg-black mx-auto mt-6" />
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-16 px-4">
            {[1, 2, 3, 4].map((s, index) => (
              <div key={s} className="flex items-center">
                <button
                  onClick={() => s < step && setStep(s)}
                  disabled={s > step}
                  className="flex flex-col items-center gap-2 relative focus:outline-none"
                >
                  <div className={`w-10 h-10 flex items-center justify-center border-2 font-bold text-xs transition-all ${
                    s === step 
                      ? 'border-black bg-black text-white' 
                      : s < step 
                        ? 'border-black bg-zinc-100 text-black cursor-pointer' 
                        : 'border-zinc-200 text-zinc-300'
                  }`}>
                    {s < step ? <Check className="w-4 h-4 stroke-[3]" /> : s}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider absolute -bottom-6 whitespace-nowrap hidden sm:block ${s === step ? 'text-black' : 'text-zinc-400'}`}>
                    {stepLabels[s - 1]}
                  </span>
                </button>
                {s < 4 && (
                  <div className={`h-[2px] transition-colors ${
                    s < step ? 'bg-black w-12 md:w-24' : 'bg-zinc-200 w-12 md:w-24'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step Content Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="bg-white border-2 border-black p-6 md:p-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>

          {/* Botão Voltar */}
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="mt-6 text-zinc-400 hover:text-black transition-colors text-xs font-bold uppercase tracking-widest flex items-center gap-1 group"
            >
              <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-0.5 transition-transform" />
              Voltar Passo
            </button>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-12 bg-black text-white border-2 border-black p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[4px_4px_0px_0px_rgba(113,113,122,0.5)] cursor-pointer group hover:bg-white hover:text-black transition-all duration-300"
            onClick={() => alert('Em breve você poderá assinar o nosso plano mensal! Equipe Carrier.')}
          >
            <div className="text-center sm:text-left">
              <span className="inline-block bg-zinc-800 text-zinc-300 group-hover:bg-zinc-100 group-hover:text-black font-mono text-[10px] font-bold uppercase tracking-widest px-2 py-1 mb-2 transition-colors">
                Clube de Vantagens
              </span>
              <h3 className="font-oswald text-xl md:text-2xl font-black uppercase tracking-wide">
                Conheça nosso plano mensal
              </h3>
              <p className="text-zinc-400 group-hover:text-zinc-500 text-xs font-medium uppercase tracking-wider mt-1 transition-colors">
                Corte o cabelo e faça a barba sem limite de vezes por um preço fixo.
              </p>
            </div>
            
            <div className="flex-shrink-0 w-full sm:w-auto py-3 px-6 bg-white text-black font-bold uppercase tracking-widest text-xs text-center border-2 border-white group-hover:border-black group-hover:bg-black group-hover:text-white transition-all duration-300">
              Saber Mais
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}