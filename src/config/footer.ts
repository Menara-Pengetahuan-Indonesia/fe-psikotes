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
  bg: 'bg-primary-950',
  glowTop: 'bg-primary-800/30',
  glowBottom: 'bg-amber-500/10',
  ornamentPlus: 'text-primary-400/10',
  ornamentStar: 'text-amber-400/10',
  textMuted: 'text-primary-200/60',
  ctaButton:
    'bg-amber-500 hover:bg-amber-400 text-primary-950',
  logoBg: 'bg-primary-500',
  brandAccent: 'text-primary-400',
  socialIcon:
    'text-primary-200/60 hover:bg-primary-500'
    + ' hover:text-white hover:border-primary-500',
  linkText: 'text-primary-200/70',
  bullet:
    'bg-primary-700 group-hover:bg-amber-400',
  copyright: 'text-primary-200/40',
  madeWith: 'text-primary-200/30',
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
