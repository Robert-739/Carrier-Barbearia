export interface Barber {
  id: number
  name: string
  role?: string
  image: string
  instagram: string
  videoSrc: string // Caminho do vídeo (ex: /videos/flavio.mp4)
  bio?: string
  specialties: string[]
}

export const BARBERS: Barber[] = [
  { 
    id: 1, 
    name: 'Rafael Carrier', 
    role: 'Fundador',
    image: '/fotos/Rafael.png',
    instagram: 'rafacarrier_',
    videoSrc: '/videos/teste-rafael.mp4', 
    bio: 'Mais de 6 anos de experiência cortando nas principais capitais urbanas. Domina a técnica do fade cirúrgico e texturizações modernas.',
    specialties: ['High Fade', 'Luzes']
  },
  { 
    id: 2, 
    name: 'Udison Henrique', 
    role: '',
    image: '/fotos/Udison.png',
    instagram: 'udison_style019',
    videoSrc: '/videos/udison-presentation.mp4',
    bio: '',
    specialties: ['Buzz Cut', 'Hair Design / Riscos',]
  },
  { 
    id: 3, 
    name: 'Flavio Lucca', 
    role: '',
    image: '/fotos/Flavio.png',
    instagram: 'flaviolucca1',
    videoSrc: '/videos/rafael-presentation.mp4',
    bio: '',
    specialties: ['Fade', 'Barba']
  },
  { 
    id: 4, 
    name: '??????', 
    role: '',
    image: '/fotos/pedra.png',
    instagram: 'carrierbarbearia_',
    videoSrc: '/videos/?????????.mp4',
    bio: '',
    specialties: ['Barba', 'Degradê']
  },
]