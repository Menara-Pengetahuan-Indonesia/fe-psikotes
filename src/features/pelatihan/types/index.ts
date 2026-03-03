import type { LucideIcon } from 'lucide-react'

export interface PelatihanProgram {
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

export type { FaqItem } from '@shared/types'
