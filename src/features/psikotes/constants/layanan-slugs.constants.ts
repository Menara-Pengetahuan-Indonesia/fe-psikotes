export const SERVICES_SLUGS = [
  'tes-pemetaan',
  'konsultasi-konseling',
  'trauma-therapy',
  'pelatihan',
  'solusi-perusahaan',
] as const

export type ServiceSlug = typeof SERVICES_SLUGS[number]
