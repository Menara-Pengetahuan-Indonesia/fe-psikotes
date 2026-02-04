import type { PhilosophyItem, CurriculumLevel } from '../types'

export const PHILOSOPHY_ITEMS: PhilosophyItem[] = [
  {
    title: 'Self-Awareness',
    description: 'Mengenali kekuatan dan kelemahan diri secara objektif.'
  },
  {
    title: 'Good Pragmatism',
    description: 'Fokus pada apa yang benar-benar berhasil dalam hidup.'
  },
  {
    title: 'Continuous Growth',
    description: 'Tumbuh satu persen lebih baik setiap harinya.'
  },
  {
    title: 'Mental Resilience',
    description: 'Membangun ketahanan mental menghadapi tantangan.'
  }
]

export const CURRICULUM_LEVELS: CurriculumLevel[] = [
  {
    level: 1,
    label: 'Self Mastery',
    width: 'w-[30%]',
    background: 'bg-black text-white shadow-xl'
  },
  {
    level: 2,
    label: 'Core Stability',
    width: 'w-[45%]',
    background: 'bg-slate-800 text-white'
  },
  {
    level: 3,
    label: 'Action & Habits',
    width: 'w-[60%]',
    background: 'bg-slate-600 text-white'
  },
  {
    level: 4,
    label: 'Social Intelligence',
    width: 'w-[75%]',
    background: 'bg-slate-400 text-white'
  },
  {
    level: 5,
    label: 'Legacy & Impact',
    width: 'w-[90%]',
    background: 'bg-slate-200 text-slate-700'
  }
]
