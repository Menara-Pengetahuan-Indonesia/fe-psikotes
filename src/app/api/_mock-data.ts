import { randomUUID } from 'crypto'

// ── Helpers ──────────────────────────────────────────
export function mockId() {
  return randomUUID()
}

export function mockTimestamps(base?: string) {
  const now = new Date().toISOString()
  return { createdAt: base ?? now, updatedAt: now }
}

// ── TESTS ────────────────────────────────────────────
export const MOCK_TESTS = [
  {
    id: 'test-001',
    name: 'Tes Kepribadian MBTI',
    description: 'Tes untuk mengetahui tipe kepribadian berdasarkan teori Myers-Briggs Type Indicator.',
    duration: 30,
    isPublished: true,
    timePerQuestion: null,
    shuffleQuestions: false,
    shuffleOptions: false,
    originalYear: 1962,
    adaptationYear: 2020,
    precisionLevel: 3,
    popularity: 'HIGH',
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-15T00:00:00.000Z',
  },
  {
    id: 'test-002',
    name: 'Tes Minat Bakat Holland (RIASEC)',
    description: 'Tes minat bakat berdasarkan teori Holland untuk menentukan kesesuaian karir.',
    duration: 25,
    isPublished: true,
    timePerQuestion: 30,
    shuffleQuestions: true,
    shuffleOptions: false,
    originalYear: 1959,
    adaptationYear: 2021,
    precisionLevel: 2,
    popularity: 'MEDIUM',
    createdAt: '2025-01-05T00:00:00.000Z',
    updatedAt: '2025-01-10T00:00:00.000Z',
  },
  {
    id: 'test-003',
    name: 'Tes Kecerdasan Emosional (EQ)',
    description: 'Mengukur kemampuan mengenali, memahami, dan mengelola emosi diri sendiri dan orang lain.',
    duration: 20,
    isPublished: false,
    timePerQuestion: null,
    shuffleQuestions: false,
    shuffleOptions: true,
    originalYear: 1995,
    adaptationYear: 2023,
    precisionLevel: 2,
    popularity: 'HIGH',
    createdAt: '2025-02-01T00:00:00.000Z',
    updatedAt: '2025-02-10T00:00:00.000Z',
  },
  {
    id: 'test-004',
    name: 'Tes PHQ-9 (Depresi)',
    description: 'Patient Health Questionnaire untuk skrining gejala depresi.',
    duration: 10,
    isPublished: true,
    timePerQuestion: null,
    shuffleQuestions: false,
    shuffleOptions: false,
    originalYear: 1999,
    adaptationYear: 2022,
    precisionLevel: 1,
    popularity: 'HIGH',
    createdAt: '2025-02-15T00:00:00.000Z',
    updatedAt: '2025-03-01T00:00:00.000Z',
  },
]

// ── INDICATORS ───────────────────────────────────────
export const MOCK_INDICATORS: Record<string, Array<{
  id: string; testId: string; name: string; description: string; order: number
  createdAt: string; updatedAt: string
}>> = {
  'test-001': [
    { id: 'ind-001', testId: 'test-001', name: 'Extraversion (E)', description: 'Tingkat orientasi ke dunia luar', order: 1, createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z' },
    { id: 'ind-002', testId: 'test-001', name: 'Introversion (I)', description: 'Tingkat orientasi ke dunia dalam', order: 2, createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z' },
    { id: 'ind-003', testId: 'test-001', name: 'Sensing (S)', description: 'Preferensi informasi konkret', order: 3, createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z' },
    { id: 'ind-004', testId: 'test-001', name: 'Intuition (N)', description: 'Preferensi informasi abstrak', order: 4, createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z' },
  ],
  'test-002': [
    { id: 'ind-005', testId: 'test-002', name: 'Realistic (R)', description: 'Minat pada aktivitas fisik dan praktis', order: 1, createdAt: '2025-01-05T00:00:00.000Z', updatedAt: '2025-01-05T00:00:00.000Z' },
    { id: 'ind-006', testId: 'test-002', name: 'Investigative (I)', description: 'Minat pada riset dan analisis', order: 2, createdAt: '2025-01-05T00:00:00.000Z', updatedAt: '2025-01-05T00:00:00.000Z' },
    { id: 'ind-007', testId: 'test-002', name: 'Artistic (A)', description: 'Minat pada kreativitas dan ekspresi', order: 3, createdAt: '2025-01-05T00:00:00.000Z', updatedAt: '2025-01-05T00:00:00.000Z' },
  ],
  'test-003': [
    { id: 'ind-008', testId: 'test-003', name: 'Self-Awareness', description: 'Kemampuan mengenali emosi diri', order: 1, createdAt: '2025-02-01T00:00:00.000Z', updatedAt: '2025-02-01T00:00:00.000Z' },
    { id: 'ind-009', testId: 'test-003', name: 'Empathy', description: 'Kemampuan memahami emosi orang lain', order: 2, createdAt: '2025-02-01T00:00:00.000Z', updatedAt: '2025-02-01T00:00:00.000Z' },
  ],
  'test-004': [
    { id: 'ind-010', testId: 'test-004', name: 'Skor Depresi', description: 'Total skor PHQ-9', order: 1, createdAt: '2025-02-15T00:00:00.000Z', updatedAt: '2025-02-15T00:00:00.000Z' },
  ],
}

// ── SECTIONS ─────────────────────────────────────────
export const MOCK_SECTIONS: Record<string, Array<{
  id: string; testId: string; name: string; description: string; order: number
  duration: number | null; createdAt: string; updatedAt: string
}>> = {
  'test-001': [
    { id: 'sec-001', testId: 'test-001', name: 'Bagian 1: Energi & Orientasi', description: 'Mengukur preferensi E vs I', order: 1, duration: 10, createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z' },
    { id: 'sec-002', testId: 'test-001', name: 'Bagian 2: Informasi & Persepsi', description: 'Mengukur preferensi S vs N', order: 2, duration: 10, createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z' },
  ],
  'test-002': [
    { id: 'sec-003', testId: 'test-002', name: 'Bagian Utama', description: 'Semua pertanyaan RIASEC', order: 1, duration: null, createdAt: '2025-01-05T00:00:00.000Z', updatedAt: '2025-01-05T00:00:00.000Z' },
  ],
  'test-003': [],
  'test-004': [
    { id: 'sec-004', testId: 'test-004', name: 'Kuesioner PHQ-9', description: '9 pertanyaan standar', order: 1, duration: null, createdAt: '2025-02-15T00:00:00.000Z', updatedAt: '2025-02-15T00:00:00.000Z' },
  ],
}

// ── QUESTIONS ────────────────────────────────────────
export const MOCK_QUESTIONS: Record<string, Array<{
  id: string; testId: string; sectionId?: string; text: string
  type: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'RATING_SCALE' | 'ESSAY'
  order: number; imageUrl?: string | null
  displayStyle?: string | null; optionImageEnabled?: boolean
  createdAt: string; updatedAt: string
  options: Array<{
    id: string; questionId: string; text: string; order: number
    imageUrl?: string | null; createdAt: string; updatedAt: string
    mappings: Array<{
      id: string; optionId: string; indicatorId: string; scoreValue: number
      createdAt: string; updatedAt: string
    }>
  }>
}>> = {
  'test-001': [
    {
      id: 'q-001', testId: 'test-001', sectionId: 'sec-001',
      text: 'Saya merasa lebih berenergi setelah menghabiskan waktu bersama banyak orang.',
      type: 'MULTIPLE_CHOICE', order: 1, imageUrl: null,
      displayStyle: 'UPPERCASE', optionImageEnabled: false,
      createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z',
      options: [
        {
          id: 'opt-001', questionId: 'q-001', text: 'Sangat Setuju', order: 1, imageUrl: null,
          createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z',
          mappings: [{ id: 'map-001', optionId: 'opt-001', indicatorId: 'ind-001', scoreValue: 5, createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z' }],
        },
        {
          id: 'opt-002', questionId: 'q-001', text: 'Setuju', order: 2, imageUrl: null,
          createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z',
          mappings: [{ id: 'map-002', optionId: 'opt-002', indicatorId: 'ind-001', scoreValue: 4, createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z' }],
        },
        {
          id: 'opt-003', questionId: 'q-001', text: 'Netral', order: 3, imageUrl: null,
          createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z',
          mappings: [],
        },
        {
          id: 'opt-004', questionId: 'q-001', text: 'Tidak Setuju', order: 4, imageUrl: null,
          createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z',
          mappings: [{ id: 'map-003', optionId: 'opt-004', indicatorId: 'ind-002', scoreValue: 4, createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z' }],
        },
      ],
    },
    {
      id: 'q-002', testId: 'test-001', sectionId: 'sec-001',
      text: 'Saya lebih suka bekerja sendiri daripada dalam kelompok.',
      type: 'MULTIPLE_CHOICE', order: 2, imageUrl: null,
      displayStyle: 'UPPERCASE', optionImageEnabled: false,
      createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z',
      options: [
        {
          id: 'opt-005', questionId: 'q-002', text: 'Sangat Setuju', order: 1, imageUrl: null,
          createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z',
          mappings: [{ id: 'map-004', optionId: 'opt-005', indicatorId: 'ind-002', scoreValue: 5, createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z' }],
        },
        {
          id: 'opt-006', questionId: 'q-002', text: 'Tidak Setuju', order: 2, imageUrl: null,
          createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z',
          mappings: [{ id: 'map-005', optionId: 'opt-006', indicatorId: 'ind-001', scoreValue: 4, createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z' }],
        },
      ],
    },
    {
      id: 'q-003', testId: 'test-001', sectionId: 'sec-002',
      text: 'Saya lebih memperhatikan detail dan fakta daripada gambaran besar.',
      type: 'TRUE_FALSE', order: 3, imageUrl: null,
      displayStyle: null, optionImageEnabled: false,
      createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z',
      options: [
        {
          id: 'opt-007', questionId: 'q-003', text: 'Benar', order: 1, imageUrl: null,
          createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z',
          mappings: [{ id: 'map-006', optionId: 'opt-007', indicatorId: 'ind-003', scoreValue: 5, createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z' }],
        },
        {
          id: 'opt-008', questionId: 'q-003', text: 'Salah', order: 2, imageUrl: null,
          createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z',
          mappings: [{ id: 'map-007', optionId: 'opt-008', indicatorId: 'ind-004', scoreValue: 5, createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z' }],
        },
      ],
    },
  ],
  'test-002': [
    {
      id: 'q-004', testId: 'test-002', sectionId: 'sec-003',
      text: 'Saya suka memperbaiki barang-barang elektronik.',
      type: 'RATING_SCALE', order: 1, imageUrl: null,
      displayStyle: 'NUMBER', optionImageEnabled: false,
      createdAt: '2025-01-05T00:00:00.000Z', updatedAt: '2025-01-05T00:00:00.000Z',
      options: [
        { id: 'opt-009', questionId: 'q-004', text: '1 - Sangat Tidak Suka', order: 1, imageUrl: null, createdAt: '2025-01-05T00:00:00.000Z', updatedAt: '2025-01-05T00:00:00.000Z', mappings: [{ id: 'map-008', optionId: 'opt-009', indicatorId: 'ind-005', scoreValue: 1, createdAt: '2025-01-05T00:00:00.000Z', updatedAt: '2025-01-05T00:00:00.000Z' }] },
        { id: 'opt-010', questionId: 'q-004', text: '5 - Sangat Suka', order: 5, imageUrl: null, createdAt: '2025-01-05T00:00:00.000Z', updatedAt: '2025-01-05T00:00:00.000Z', mappings: [{ id: 'map-009', optionId: 'opt-010', indicatorId: 'ind-005', scoreValue: 5, createdAt: '2025-01-05T00:00:00.000Z', updatedAt: '2025-01-05T00:00:00.000Z' }] },
      ],
    },
  ],
  'test-003': [
    {
      id: 'q-005', testId: 'test-003',
      text: 'Saya dapat dengan mudah mengenali ketika saya merasa marah atau sedih.',
      type: 'MULTIPLE_CHOICE', order: 1, imageUrl: null,
      displayStyle: 'LOWERCASE', optionImageEnabled: false,
      createdAt: '2025-02-01T00:00:00.000Z', updatedAt: '2025-02-01T00:00:00.000Z',
      options: [
        { id: 'opt-011', questionId: 'q-005', text: 'Selalu', order: 1, imageUrl: null, createdAt: '2025-02-01T00:00:00.000Z', updatedAt: '2025-02-01T00:00:00.000Z', mappings: [{ id: 'map-010', optionId: 'opt-011', indicatorId: 'ind-008', scoreValue: 5, createdAt: '2025-02-01T00:00:00.000Z', updatedAt: '2025-02-01T00:00:00.000Z' }] },
        { id: 'opt-012', questionId: 'q-005', text: 'Jarang', order: 2, imageUrl: null, createdAt: '2025-02-01T00:00:00.000Z', updatedAt: '2025-02-01T00:00:00.000Z', mappings: [{ id: 'map-011', optionId: 'opt-012', indicatorId: 'ind-008', scoreValue: 2, createdAt: '2025-02-01T00:00:00.000Z', updatedAt: '2025-02-01T00:00:00.000Z' }] },
      ],
    },
  ],
  'test-004': [
    {
      id: 'q-006', testId: 'test-004', sectionId: 'sec-004',
      text: 'Dalam 2 minggu terakhir, seberapa sering Anda merasa sedih, tertekan, atau putus asa?',
      type: 'MULTIPLE_CHOICE', order: 1, imageUrl: null,
      displayStyle: 'NUMBER', optionImageEnabled: false,
      createdAt: '2025-02-15T00:00:00.000Z', updatedAt: '2025-02-15T00:00:00.000Z',
      options: [
        { id: 'opt-013', questionId: 'q-006', text: 'Tidak pernah', order: 1, imageUrl: null, createdAt: '2025-02-15T00:00:00.000Z', updatedAt: '2025-02-15T00:00:00.000Z', mappings: [{ id: 'map-012', optionId: 'opt-013', indicatorId: 'ind-010', scoreValue: 0, createdAt: '2025-02-15T00:00:00.000Z', updatedAt: '2025-02-15T00:00:00.000Z' }] },
        { id: 'opt-014', questionId: 'q-006', text: 'Beberapa hari', order: 2, imageUrl: null, createdAt: '2025-02-15T00:00:00.000Z', updatedAt: '2025-02-15T00:00:00.000Z', mappings: [{ id: 'map-013', optionId: 'opt-014', indicatorId: 'ind-010', scoreValue: 1, createdAt: '2025-02-15T00:00:00.000Z', updatedAt: '2025-02-15T00:00:00.000Z' }] },
        { id: 'opt-015', questionId: 'q-006', text: 'Lebih dari separuh hari', order: 3, imageUrl: null, createdAt: '2025-02-15T00:00:00.000Z', updatedAt: '2025-02-15T00:00:00.000Z', mappings: [{ id: 'map-014', optionId: 'opt-015', indicatorId: 'ind-010', scoreValue: 2, createdAt: '2025-02-15T00:00:00.000Z', updatedAt: '2025-02-15T00:00:00.000Z' }] },
        { id: 'opt-016', questionId: 'q-006', text: 'Hampir setiap hari', order: 4, imageUrl: null, createdAt: '2025-02-15T00:00:00.000Z', updatedAt: '2025-02-15T00:00:00.000Z', mappings: [{ id: 'map-015', optionId: 'opt-016', indicatorId: 'ind-010', scoreValue: 3, createdAt: '2025-02-15T00:00:00.000Z', updatedAt: '2025-02-15T00:00:00.000Z' }] },
      ],
    },
  ],
}

// ── SCORING RULES ────────────────────────────────────
export const MOCK_SCORING_RULES: Record<string, Array<{
  id: string; testId: string; indicatorId: string; minScore: number; maxScore: number
  resultType: string; description: string; createdAt: string; updatedAt: string
}>> = {
  'test-001': [
    { id: 'sr-001', testId: 'test-001', indicatorId: 'ind-001', minScore: 0, maxScore: 10, resultType: 'Extravert Rendah', description: 'Skor E rendah', createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z' },
    { id: 'sr-002', testId: 'test-001', indicatorId: 'ind-001', minScore: 11, maxScore: 25, resultType: 'Extravert Tinggi', description: 'Skor E tinggi', createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z' },
  ],
  'test-002': [
    { id: 'sr-003', testId: 'test-002', indicatorId: 'ind-005', minScore: 0, maxScore: 15, resultType: 'Realistic Rendah', description: 'Minat R rendah', createdAt: '2025-01-05T00:00:00.000Z', updatedAt: '2025-01-05T00:00:00.000Z' },
  ],
  'test-003': [],
  'test-004': [
    { id: 'sr-004', testId: 'test-004', indicatorId: 'ind-010', minScore: 0, maxScore: 4, resultType: 'MINIMAL', description: 'Gejala depresi minimal', createdAt: '2025-02-15T00:00:00.000Z', updatedAt: '2025-02-15T00:00:00.000Z' },
    { id: 'sr-005', testId: 'test-004', indicatorId: 'ind-010', minScore: 5, maxScore: 9, resultType: 'MILD', description: 'Gejala depresi ringan', createdAt: '2025-02-15T00:00:00.000Z', updatedAt: '2025-02-15T00:00:00.000Z' },
    { id: 'sr-006', testId: 'test-004', indicatorId: 'ind-010', minScore: 10, maxScore: 27, resultType: 'MODERATE', description: 'Gejala depresi sedang-berat', createdAt: '2025-02-15T00:00:00.000Z', updatedAt: '2025-02-15T00:00:00.000Z' },
  ],
}

// ── PACKAGES ─────────────────────────────────────────
export const MOCK_PACKAGES = [
  {
    id: 'pkg-001',
    name: 'Paket Asesmen Karir Lengkap',
    description: 'Paket lengkap untuk mengetahui minat bakat dan kepribadian untuk perencanaan karir.',
    imageUrl: null,
    price: 150000,
    estimatedDuration: 55,
    isPublished: true,
    createdAt: '2025-01-10T00:00:00.000Z',
    updatedAt: '2025-01-15T00:00:00.000Z',
    tests: [
      { id: 'pt-001', packageId: 'pkg-001', testId: 'test-001', order: 1, createdAt: '2025-01-10T00:00:00.000Z', test: MOCK_TESTS[0] },
      { id: 'pt-002', packageId: 'pkg-001', testId: 'test-002', order: 2, createdAt: '2025-01-10T00:00:00.000Z', test: MOCK_TESTS[1] },
    ],
  },
  {
    id: 'pkg-002',
    name: 'Paket Kesehatan Mental Dasar',
    description: 'Skrining kesehatan mental dasar dengan tes PHQ-9 dan EQ.',
    imageUrl: null,
    price: 0,
    estimatedDuration: 30,
    isPublished: true,
    createdAt: '2025-02-01T00:00:00.000Z',
    updatedAt: '2025-02-10T00:00:00.000Z',
    tests: [
      { id: 'pt-003', packageId: 'pkg-002', testId: 'test-004', order: 1, createdAt: '2025-02-01T00:00:00.000Z', test: MOCK_TESTS[3] },
    ],
  },
  {
    id: 'pkg-003',
    name: 'Paket Premium Psikotes Komprehensif',
    description: 'Paket premium dengan semua tes psikologi yang tersedia.',
    imageUrl: null,
    price: 350000,
    estimatedDuration: 85,
    isPublished: false,
    createdAt: '2025-03-01T00:00:00.000Z',
    updatedAt: '2025-03-05T00:00:00.000Z',
    tests: [],
  },
]

// ── Helper: get full test with nested data ───────────
export function getFullTest(testId: string) {
  const test = MOCK_TESTS.find((t) => t.id === testId)
  if (!test) return null
  return {
    ...test,
    indicators: MOCK_INDICATORS[testId] ?? [],
    sections: MOCK_SECTIONS[testId] ?? [],
    questions: MOCK_QUESTIONS[testId] ?? [],
  }
}
