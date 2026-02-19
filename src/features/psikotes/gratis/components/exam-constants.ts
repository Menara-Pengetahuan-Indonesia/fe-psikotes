import type { Question } from '@/features/psikotes/constants'

export const MOCK_QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'Mana yang lebih kamu pilih?',
    options: [
      {
        label: 'A',
        text: 'Sedikit teman, namun sering bertemu',
      },
      {
        label: 'B',
        text: 'Banyak teman walaupun jarang bertemu',
      },
    ],
  },
  {
    id: 2,
    question:
      'Saat ada masalah, apa yang biasanya kamu lakukan?',
    options: [
      {
        label: 'A',
        text: 'Menceritakannya kepada orang terdekat',
      },
      {
        label: 'B',
        text: 'Merenung dan menyelesaikannya sendiri',
      },
    ],
  },
  {
    id: 3,
    question: 'Bagaimana caramu mengisi waktu luang?',
    options: [
      {
        label: 'A',
        text: 'Pergi keluar mencari suasana baru',
      },
      {
        label: 'B',
        text: 'Menikmati waktu santai di rumah',
      },
    ],
  },
]
