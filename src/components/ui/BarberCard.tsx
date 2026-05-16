"use client";
import Image from "next/image";
import { Barber } from "@/data/barbers";

interface BarberCardProps {
  barber: Barber;
  onClick: (barber: Barber) => void;
}

export const BarberCard = ({ barber, onClick }: BarberCardProps) => {
  return (
    <div 
      onClick={() => onClick(barber)}
      className="group cursor-pointer barber-card flex flex-col gap-4"
    >
      <div className="relative h-[450px] w-full overflow-hidden border-2 border-black">
        <Image
          src={barber.image}
          alt={barber.name}
          fill
          className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
        />
      </div>
      <div>
        <h3 className="font-oswald text-2xl font-bold uppercase tracking-tight leading-none">
          {barber.name}
        </h3>
        <span className="text-xs uppercase tracking-widest text-zinc-400 font-bold mt-1 block">
          {barber.role}
        </span>
      </div>
    </div>
  );
};