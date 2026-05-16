export interface Barber {
  id: string;
  name: string;
  role?: string;
  bio: string;
  image: string;
  instagram: string;
}

export const BARBERS: Barber[] = [
  {
    id: "1",
    name: "Rafael Carrier",
    role: "Fundador",
    bio: "Com mais de 10 anos de estrada, Alex fundou a Carrier com a missão de elevar o padrão da barbearia em Limeira através da precisão técnica.",
    image: "/Rafael.png",
    instagram: "@alexcarrier",
  },
  {
    id: "2",
    name: "Udison",
    bio: "Referência em cortes degradê e freestyle. Jonas traz a cultura urbana e o streetwear para cada acabamento.",
    image: "/Udison.png",
    instagram: "@jonasfade",
  },
  {
    id: "3",
    name: "Flavio Lucca.",
    bio: "Marcus é o mestre do visagismo. Ele não apenas corta, ele molda o rosto do cliente através de um design de barba impecável.",
    image: "/Flavio.png",
    instagram: "@marcusbarba",
  },
  {
    id: "4",
    name: "?????",
    bio: "??????????????????",
    image: "/pedra.png",
    instagram: "?",
  },
];