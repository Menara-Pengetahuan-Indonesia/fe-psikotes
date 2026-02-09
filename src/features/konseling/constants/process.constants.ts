import { ClipboardList, CalendarCheck, MessageCircle } from 'lucide-react'
import type { ProcessStep } from '../types'

export const KONSELING_PROCESS: ProcessStep[] = [
  {
    number: '01',
    title: 'Pilih Layanan',
    description: 'Tentukan jenis konseling yang sesuai dengan kebutuhanmu: individu, pasangan, atau kelompok.',
    icon: ClipboardList,
  },
  {
    number: '02',
    title: 'Jadwalkan Sesi',
    description: 'Pilih jadwal yang nyaman dan lakukan pembayaran secara online dengan mudah.',
    icon: CalendarCheck,
  },
  {
    number: '03',
    title: 'Mulai Konseling',
    description: 'Bertemu dengan psikolog profesional secara online atau tatap muka untuk sesi konselingmu.',
    icon: MessageCircle,
  },
]
