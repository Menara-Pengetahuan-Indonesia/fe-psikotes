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
    background: 'bg-primary-900 text-white shadow-xl shadow-primary-900/20'
  },
  {
    level: 2,
    label: 'Core Stability',
    width: 'w-[45%]',
    background: 'bg-primary-700 text-white shadow-lg shadow-primary-700/20'
  },
  {
    level: 3,
    label: 'Action & Habits',
    width: 'w-[60%]',
    background: 'bg-primary-500 text-white shadow-lg shadow-primary-500/20'
  },
  {
    level: 4,
    label: 'Social Intelligence',
    width: 'w-[75%]',
    background: 'bg-primary-300 text-primary-900'
  },
  {
    level: 5,
    label: 'Legacy & Impact',
    width: 'w-[90%]',
    background: 'bg-primary-100 text-primary-900'
  }
]
