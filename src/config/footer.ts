import {
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
} from 'lucide-react'

type FooterTheme = {
  bg: string
  glowTop: string
  glowBottom: string
  ornamentPlus: string
  ornamentStar: string
  textMuted: string
  ctaButton: string
  logoBg: string
  brandAccent: string
  socialIcon: string
  linkText: string
  bullet: string
  copyright: string
  madeWith: string
}

type FooterLink = { label: string; href: string }
type FooterSection = { title: string; links: FooterLink[] }
type FooterCta = {
  title: string
  desc: string
  href: string
  label: string
}

// ─── Theme per section ──────────────────────────────────

const EMERALD_THEME: FooterTheme = {
  bg: 'bg-gradient-to-b from-emerald-50 to-white border-t border-emerald-100',
  glowTop: 'bg-emerald-100/40',
  glowBottom: 'bg-amber-100/20',
  ornamentPlus: 'text-emerald-400/20',
  ornamentStar: 'text-amber-400/20',
  textMuted: 'text-gray-500',
  ctaButton: 'bg-emerald-500 hover:bg-emerald-600 text-white',
  logoBg: 'bg-emerald-500',
  brandAccent: 'text-emerald-600',
  socialIcon: 'text-gray-400 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 border-gray-200 bg-white',
  linkText: 'text-gray-500',
  bullet: 'bg-gray-300 group-hover:bg-emerald-500',
  copyright: 'text-gray-400',
  madeWith: 'text-gray-400',
}

export function getFooterTheme(_pathname: string) {
  return EMERALD_THEME
}

// ─── Links per section ──────────────────────────────────

const PSIKOTES_LINKS: FooterSection[] = [
  {
    title: 'Layanan',
    links: [
      { label: 'Psikotes Online', href: '/' },
      { label: 'Untuk Perusahaan', href: '/perusahaan' },
    ],
  },
  {
    title: 'Kategori Tes',
    links: [
      { label: 'Mahasiswa & Pelajar', href: '/mahasiswa' },
      { label: 'Perusahaan', href: '/bisnis' },
      { label: 'Kesehatan Mental', href: '/kesehatan-mental' },
      { label: 'Tes Gratis', href: '/gratis' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Syarat & Ketentuan', href: '/syarat-ketentuan' },
      { label: 'Kebijakan Privasi', href: '/kebijakan-privasi' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
]

export function getFooterLinks(_pathname: string) {
  return PSIKOTES_LINKS
}

// ─── CTA per section ────────────────────────────────────

const FOOTER_CTA: FooterCta = {
  title: 'Siap Mengenali Potensimu?',
  desc: 'Mulai perjalanan pengembangan dirimu sekarang',
  href: '/',
  label: 'Mulai Sekarang',
}

export function getFooterCta(_pathname: string) {
  return FOOTER_CTA
}

// ─── Shared constants ───────────────────────────────────

export const SOCIAL_LINKS = [
  { Icon: Instagram, href: 'https://instagram.com/bermoela' },
  { Icon: Linkedin, href: 'https://linkedin.com/company/bermoela' },
  { Icon: Twitter, href: 'https://x.com/bermoela' },
  { Icon: Facebook, href: 'https://facebook.com/bermoela' },
]

export { TOPO_WHITE as TOPO_PATTERN_SVG } from '@/shared/constants/bg-patterns.constants'
