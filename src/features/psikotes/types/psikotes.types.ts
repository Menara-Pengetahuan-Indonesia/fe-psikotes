import type { LucideIcon } from 'lucide-react'

export interface PsikotesTest {
  id: string
  slug: string
  title: string
  tag: string
  icon: LucideIcon
  description: string
  users: string
  duration: string
  price: string | null // null = gratis
  category: string // 'mahasiswa' | 'perusahaan' | 'kesehatan-mental' | 'gratis' | 'premium'
  subCategory?: string // e.g. 'Kepribadian' | 'Karir' | 'Hubungan'
}

export interface TestFeature {
  label: string
}

export interface CorporateTest extends PsikotesTest {
  features: TestFeature[]
}

export interface FaqItem {
  q: string
  a: string
}

export interface CtaBannerData {
  title: string
  titleAccent: string
  description: string
  buttonText: string
  href: string
}
