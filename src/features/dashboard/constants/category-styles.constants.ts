import type { TestCategory } from './test-history.constants'

export type FilterTab = 'semua' | TestCategory

export const FILTER_TABS: {
  value: FilterTab
  label: string
}[] = [
  { value: 'semua', label: 'Semua Kategori' },
  { value: 'gratis', label: 'Gratis' },
  { value: 'premium', label: 'Premium' },
  { value: 'mahasiswa', label: 'Mahasiswa' },
  { value: 'perusahaan', label: 'Perusahaan' },
  {
    value: 'kesehatan-mental',
    label: 'Kesehatan Mental',
  },
]

export const CATEGORY_CONFIG: Record<
  TestCategory, { bg: string, text: string, border: string, iconColor: string }
> = {
  gratis: { bg: 'bg-primary-50', text: 'text-primary-700', border: 'border-primary-100', iconColor: 'text-primary-500' },
  premium: { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-100', iconColor: 'text-violet-500' },
  mahasiswa: { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-100', iconColor: 'text-sky-500' },
  perusahaan: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-100', iconColor: 'text-orange-500' },
  'kesehatan-mental': { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-100', iconColor: 'text-rose-500' },
}

export const CATEGORY_STYLE: Record<
  TestCategory, { bg: string, text: string, border: string }
> = {
  gratis: { bg: 'bg-primary-50', text: 'text-primary-700', border: 'border-primary-100' },
  premium: { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-100' },
  mahasiswa: { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-100' },
  perusahaan: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-100' },
  'kesehatan-mental': { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-100' },
}
