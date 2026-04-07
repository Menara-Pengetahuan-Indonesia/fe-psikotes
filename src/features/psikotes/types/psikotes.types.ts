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

export type { FaqItem } from '@shared/types'

export interface AlatTes {
  name: string
  description?: string
  measures: string
}

export interface AspekPaket {
  id: string
  number: number
  aspek: string
  tools: AlatTes[]
}

export interface PaketDetail {
  id: string
  slug: string
  title: string
  description: string
  aspeks: AspekPaket[]
}

export interface CtaBannerData {
  title: string
  titleAccent: string
  description: string
  buttonText: string
  href: string
}

// ─── New Product Structure Types ───────────────────────────────────────────

export type ProductTier = 'dasar' | 'lengkap' | 'comprehensive'
export type CorporateTier = 'mandatory' | 'comprehensive'

export interface TierPricing {
  tier: ProductTier
  label: string
  price: number
  priceLabel: string
  coverage: string
}

export interface CorporateTierPricing {
  tier: CorporateTier
  label: string
  description: string
}

export interface SubIssue {
  id: string
  label: string
  shortDesc: string
}

export interface DiriPribadiProduct {
  id: string
  slug: string
  title: string
  subtitle: string
  painPoint: string
  description: string
  icon: LucideIcon
  category: 'diri-pribadi'
  pricing: TierPricing[]
  users?: string
  duration?: string
}

export interface RelationshipProduct {
  id: string
  slug: string
  title: string
  subtitle: string
  painPoint: string
  description: string
  icon: LucideIcon
  category: 'relationship'
  subIssues: SubIssue[]
  pricing: TierPricing[]
  users?: string
  duration?: string
  canDoWithPartner?: boolean
}

export interface CorporateProduct {
  id: string
  slug: string
  title: string
  description: string
  icon: LucideIcon
  category: 'bisnis'
  callForDetail?: boolean
  pricing: CorporateTierPricing[]
}
