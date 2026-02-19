import {
  Brain,
  Heart,
  GraduationCap,
  BookOpen,
  Building2,
  HeartPulse,
  Gift,
  Crown,
  Users,
  HeartHandshake,
  Presentation,
  Video,
  Monitor,
  Compass,
  type LucideIcon,
} from 'lucide-react'

export type NavChildItem = {
  label: string
  href: string
  icon?: string
  desc?: string
}

export type NavItem = {
  label: string
  href?: string
  children?: NavChildItem[]
}

export const ICON_MAP: Record<string, LucideIcon> = {
  Brain,
  Heart,
  GraduationCap,
  BookOpen,
  Building2,
  HeartPulse,
  Gift,
  Crown,
  Users,
  HeartHandshake,
  Presentation,
  Video,
  Monitor,
  Compass,
}

export const HIDDEN_ROUTES = [
  '/',
  '/masuk',
  '/daftar',
  '/forgot-password',
] as const

export const HIDDEN_ROUTE_PREFIXES = [
  '/pengguna',
  '/admin',
  '/perusahaan',
] as const
