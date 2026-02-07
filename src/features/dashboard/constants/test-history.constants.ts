export type TestCategory =
  | 'gratis'
  | 'premium'
  | 'mahasiswa'
  | 'perusahaan'
  | 'kesehatan-mental'

export type TestStatus = 'selesai' | 'berlangsung'

export interface TestHistoryItem {
  id: string
  name: string
  category: TestCategory
  categoryLabel: string
  date: string
  status: TestStatus
  score: number | null
  resultCode: string | null
  resultTitle: string | null
}

export const DUMMY_TEST_HISTORY: TestHistoryItem[] = [
  {
    id: '1',
    name: 'Tes Kepribadian MBTI',
    category: 'kesehatan-mental',
    categoryLabel: 'Kesehatan Mental',
    date: '2025-01-15',
    status: 'selesai',
    score: 85,
    resultCode: 'INFJ',
    resultTitle: 'The Advocate',
  },
  {
    id: '2',
    name: 'Tes Minat Bakat Holland',
    category: 'mahasiswa',
    categoryLabel: 'Mahasiswa',
    date: '2025-01-10',
    status: 'selesai',
    score: 78,
    resultCode: 'RIA',
    resultTitle: 'Realistic-Investigative-Artistic',
  },
  {
    id: '3',
    name: 'Tes IQ Premium',
    category: 'premium',
    categoryLabel: 'Premium',
    date: '2025-01-08',
    status: 'selesai',
    score: 120,
    resultCode: 'SUPERIOR',
    resultTitle: 'Kecerdasan Superior',
  },
  {
    id: '4',
    name: 'Tes Kesehatan Mental (PHQ-9)',
    category: 'gratis',
    categoryLabel: 'Gratis',
    date: '2025-01-05',
    status: 'selesai',
    score: 4,
    resultCode: 'MINIMAL',
    resultTitle: 'Gejala Minimal',
  },
  {
    id: '5',
    name: 'Tes Rekrutmen Karyawan',
    category: 'perusahaan',
    categoryLabel: 'Perusahaan',
    date: '2024-12-20',
    status: 'selesai',
    score: 92,
    resultCode: 'RECOMMENDED',
    resultTitle: 'Direkomendasikan',
  },
  {
    id: '6',
    name: 'Tes Try Out CPNS',
    category: 'mahasiswa',
    categoryLabel: 'Mahasiswa',
    date: '2025-01-18',
    status: 'berlangsung',
    score: null,
    resultCode: null,
    resultTitle: null,
  },
  {
    id: '7',
    name: 'Tes Relationship Compatibility',
    category: 'kesehatan-mental',
    categoryLabel: 'Kesehatan Mental',
    date: '2024-12-15',
    status: 'selesai',
    score: 72,
    resultCode: 'GOOD',
    resultTitle: 'Kompatibilitas Baik',
  },
  {
    id: '8',
    name: 'Tes Kecerdasan Emosional',
    category: 'gratis',
    categoryLabel: 'Gratis',
    date: '2024-12-10',
    status: 'selesai',
    score: 68,
    resultCode: 'MODERATE',
    resultTitle: 'Kecerdasan Emosional Sedang',
  },
]
