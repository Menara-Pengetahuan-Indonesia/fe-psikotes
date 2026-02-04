import type { LucideIcon } from 'lucide-react'

export interface Service {
  title: string
  price: string
  tag: string
  description: string
  icon?: LucideIcon
}

export interface PhilosophyItem {
  title: string
  description: string
}

export interface CurriculumLevel {
  level: number
  label: string
  width: string
  background: string
}
