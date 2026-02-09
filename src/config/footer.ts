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
  bg: 'bg-emerald-950',
  glowTop: 'bg-emerald-800/30',
  glowBottom: 'bg-amber-500/10',
  ornamentPlus: 'text-emerald-400/10',
  ornamentStar: 'text-amber-400/10',
  textMuted: 'text-emerald-200/60',
  ctaButton:
    'bg-amber-500 hover:bg-amber-400 text-emerald-950',
  logoBg: 'bg-emerald-500',
  brandAccent: 'text-emerald-400',
  socialIcon:
    'text-emerald-200/60 hover:bg-emerald-500'
    + ' hover:text-white hover:border-emerald-500',
  linkText: 'text-emerald-200/70',
  bullet:
    'bg-emerald-700 group-hover:bg-amber-400',
  copyright: 'text-emerald-200/40',
  madeWith: 'text-emerald-200/30',
}

const INDIGO_THEME: FooterTheme = {
  bg: 'bg-indigo-950',
  glowTop: 'bg-indigo-800/30',
  glowBottom: 'bg-violet-500/10',
  ornamentPlus: 'text-indigo-400/10',
  ornamentStar: 'text-violet-400/10',
  textMuted: 'text-indigo-200/60',
  ctaButton:
    'bg-violet-500 hover:bg-violet-400 text-indigo-950',
  logoBg: 'bg-indigo-500',
  brandAccent: 'text-indigo-400',
  socialIcon:
    'text-indigo-200/60 hover:bg-indigo-500'
    + ' hover:text-white hover:border-indigo-500',
  linkText: 'text-indigo-200/70',
  bullet:
    'bg-indigo-700 group-hover:bg-violet-400',
  copyright: 'text-indigo-200/40',
  madeWith: 'text-indigo-200/30',
}

const ORANGE_THEME: FooterTheme = {
  bg: 'bg-orange-950',
  glowTop: 'bg-orange-800/30',
  glowBottom: 'bg-amber-500/10',
  ornamentPlus: 'text-orange-400/10',
  ornamentStar: 'text-amber-400/10',
  textMuted: 'text-orange-200/60',
  ctaButton:
    'bg-amber-500 hover:bg-amber-400 text-orange-950',
  logoBg: 'bg-orange-500',
  brandAccent: 'text-orange-400',
  socialIcon:
    'text-orange-200/60 hover:bg-orange-500'
    + ' hover:text-white hover:border-orange-500',
  linkText: 'text-orange-200/70',
  bullet:
    'bg-orange-700 group-hover:bg-amber-400',
  copyright: 'text-orange-200/40',
  madeWith: 'text-orange-200/30',
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

export const TOPO_PATTERN_SVG =
  'url("data:image/svg+xml,'
  + '%3Csvg width=\'200\''
  + ' height=\'200\''
  + ' viewBox=\'0 0 200 200\''
  + ' xmlns=\'http://www.w3.org/'
  + '2000/svg\'%3E%3Cpath'
  + ' d=\'M0 100 C 20 80, 40 120,'
  + ' 60 100 S 100 80, 120 100'
  + ' S 160 120, 200 100\''
  + ' stroke=\'white\''
  + ' fill=\'transparent\''
  + ' stroke-width=\'1\'/%3E'
  + '%3C/svg%3E")'
