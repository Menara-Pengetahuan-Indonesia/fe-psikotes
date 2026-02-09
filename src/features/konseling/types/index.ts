import type { LucideIcon } from 'lucide-react'

export interface KonselingService {
  title: string
  price: string
  tag: string
  description: string
  icon: LucideIcon
}

export interface ProcessStep {
  number: string
  title: string
  description: string
  icon: LucideIcon
}

export interface FaqItem {
  q: string
  a: string
}
