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

const INDIGO_THEME: FooterTheme = {
  bg: 'bg-konseling-950',
  glowTop: 'bg-konseling-800/30',
  glowBottom: 'bg-violet-500/10',
  ornamentPlus: 'text-konseling-400/10',
  ornamentStar: 'text-violet-400/10',
  textMuted: 'text-konseling-200/60',
  ctaButton:
    'bg-violet-500 hover:bg-violet-400 text-konseling-950',
  logoBg: 'bg-konseling-500',
  brandAccent: 'text-konseling-400',
  socialIcon:
    'text-konseling-200/60 hover:bg-konseling-500'
    + ' hover:text-white hover:border-konseling-500',
  linkText: 'text-konseling-200/70',
  bullet:
    'bg-konseling-700 group-hover:bg-violet-400',
  copyright: 'text-konseling-200/40',
  madeWith: 'text-konseling-200/30',
}

const ORANGE_THEME: FooterTheme = {
  bg: 'bg-pelatihan-950',
  glowTop: 'bg-pelatihan-800/30',
  glowBottom: 'bg-amber-500/10',
  ornamentPlus: 'text-pelatihan-400/10',
  ornamentStar: 'text-amber-400/10',
  textMuted: 'text-pelatihan-200/60',
  ctaButton:
    'bg-amber-500 hover:bg-amber-400 text-pelatihan-950',
  logoBg: 'bg-pelatihan-500',
  brandAccent: 'text-pelatihan-400',
  socialIcon:
    'text-pelatihan-200/60 hover:bg-pelatihan-500'
    + ' hover:text-white hover:border-pelatihan-500',
  linkText: 'text-pelatihan-200/70',
  bullet:
    'bg-pelatihan-700 group-hover:bg-amber-400',
  copyright: 'text-pelatihan-200/40',
  madeWith: 'text-pelatihan-200/30',
}

export function getFooterTheme(pathname: string) {
  if (pathname.startsWith('/konseling'))
    return INDIGO_THEME
  if (pathname.startsWith('/pelatihan'))
    return ORANGE_THEME
  return EMERALD_THEME
}

// ─── Links per section ──────────────────────────────────

const PSIKOTES_LINKS: FooterSection[] = [
  {
    title: 'Layanan',
    links: [
      { label: 'Psikotes Online', href: '/psikotes' },
      { label: 'Konseling', href: '/konseling' },
      { label: 'Pelatihan', href: '/pelatihan' },
      { label: 'Untuk Perusahaan', href: '/perusahaan' },
    ],
  },
  {
    title: 'Kategori Tes',
    links: [
      { label: 'Mahasiswa & Pelajar', href: '/psikotes/mahasiswa' },
      { label: 'Perusahaan', href: '/psikotes/perusahaan' },
      { label: 'Kesehatan Mental', href: '/psikotes/kesehatan-mental' },
      { label: 'Tes Gratis', href: '/psikotes/gratis' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Syarat & Ketentuan', href: '/psikotes/syarat-ketentuan' },
      { label: 'Kebijakan Privasi', href: '/psikotes/kebijakan-privasi' },
      { label: 'FAQ', href: '/psikotes/faq' },
    ],
  },
]

const KONSELING_LINKS: FooterSection[] = [
  {
    title: 'Layanan Konseling',
    links: [
      { label: 'Konseling Individu', href: '/konseling#services' },
      { label: 'Konseling Pasangan', href: '/konseling#services' },
      { label: 'Konseling Kelompok', href: '/konseling#services' },
    ],
  },
  {
    title: 'Layanan Lainnya',
    links: [
      { label: 'Psikotes Online', href: '/psikotes' },
      { label: 'Pelatihan', href: '/pelatihan' },
      { label: 'Tentang Kami', href: '/about' },
      { label: 'Hubungi Kami', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Syarat & Ketentuan', href: '/konseling/syarat-ketentuan' },
      { label: 'Kebijakan Privasi', href: '/konseling/kebijakan-privasi' },
      { label: 'FAQ', href: '/konseling/faq' },
    ],
  },
]

const PELATIHAN_LINKS: FooterSection[] = [
  {
    title: 'Program Pelatihan',
    links: [
      { label: 'Webinar', href: '/pelatihan#programs' },
      { label: 'Kelas Online', href: '/pelatihan#programs' },
      { label: 'Mentoring Eksklusif', href: '/pelatihan#programs' },
    ],
  },
  {
    title: 'Layanan Lainnya',
    links: [
      { label: 'Psikotes Online', href: '/psikotes' },
      { label: 'Konseling', href: '/konseling' },
      { label: 'Tentang Kami', href: '/about' },
      { label: 'Hubungi Kami', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Syarat & Ketentuan', href: '/pelatihan/syarat-ketentuan' },
      { label: 'Kebijakan Privasi', href: '/pelatihan/kebijakan-privasi' },
      { label: 'FAQ', href: '/pelatihan/faq' },
    ],
  },
]

export function getFooterLinks(pathname: string) {
  if (pathname.startsWith('/konseling'))
    return KONSELING_LINKS
  if (pathname.startsWith('/pelatihan'))
    return PELATIHAN_LINKS
  return PSIKOTES_LINKS
}

// ─── CTA per section ────────────────────────────────────

const FOOTER_CTA: Record<string, FooterCta> = {
  konseling: {
    title: 'Butuh Bantuan Profesional?',
    desc: 'Konsultasi bersama psikolog berpengalaman',
    href: '/konseling#services',
    label: 'Mulai Konseling',
  },
  pelatihan: {
    title: 'Siap Tingkatkan Skillmu?',
    desc: 'Ikuti program pelatihan terbaik sekarang',
    href: '/pelatihan#programs',
    label: 'Lihat Program',
  },
  default: {
    title: 'Siap Mengenali Potensimu?',
    desc: 'Mulai perjalanan pengembangan dirimu sekarang',
    href: '/psikotes',
    label: 'Mulai Sekarang',
  },
}

export function getFooterCta(pathname: string) {
  if (pathname.startsWith('/konseling'))
    return FOOTER_CTA.konseling
  if (pathname.startsWith('/pelatihan'))
    return FOOTER_CTA.pelatihan
  return FOOTER_CTA.default
}

// ─── Shared constants ───────────────────────────────────

export const SOCIAL_LINKS = [
  { Icon: Instagram, href: 'https://instagram.com/bermoela' },
  { Icon: Linkedin, href: 'https://linkedin.com/company/bermoela' },
  { Icon: Twitter, href: 'https://x.com/bermoela' },
  { Icon: Facebook, href: 'https://facebook.com/bermoela' },
]

export { TOPO_WHITE as TOPO_PATTERN_SVG } from '@/shared/constants/bg-patterns.constants'
