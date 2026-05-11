import type { NavItem } from '@/shared/components/layout'

export const psikotesNavItems: NavItem[] = [
  { label: 'Beranda', href: '/' },
  {
    label: 'Asesmen',
    href: '/kategori',
    children: [
      {
        label: 'Diri Pribadi',
        href: '/diri-pribadi',
        icon: 'User',
        desc: 'Trauma, anxiety, burnout, self-worth & karir',
      },
      {
        label: 'Relationship',
        href: '/relationship',
        icon: 'Heart',
        desc: 'Red flag, konflik, kesepian & single life',
      },
      {
        label: 'Bisnis & Perusahaan',
        href: '/bisnis',
        icon: 'Building2',
        desc: 'Assessment karyawan, rekrutmen & audit organisasi',
      },
    ],
  },
  {
    label: 'Layanan',
    href: '/layanan/tes-pemetaan',
    children: [
      {
        label: 'Tes Pemetaan, Asesmen, dan Blueprint',
        href: '/layanan/tes-pemetaan',
        icon: 'Brain',
        desc: 'Tes IQ, minat bakat, try out & pemetaan psikologis',
      },
      {
        label: 'Konsultasi, Konseling, Live Coaching',
        href: '/layanan/konsultasi-konseling',
        icon: 'HeartHandshake',
        desc: 'Pendampingan personal oleh psikolog berlisensi',
      },
      {
        label: 'Trauma Therapy & Support Group',
        href: '/layanan/trauma-therapy',
        icon: 'HeartPulse',
        desc: 'Pemrosesan trauma dan dukungan komunitas',
      },
      {
        label: 'Pelatihan',
        href: '/layanan/pelatihan',
        icon: 'GraduationCap',
        desc: 'Mental healing individu & calon counselor',
      },
      {
        label: 'Solusi bagi Perusahaan',
        href: '/layanan/solusi-perusahaan',
        icon: 'Building2',
        desc: 'Diagnosis organisasi & pengembangan leadership',
      },
    ],
  },
  {
    label: 'Tes Gratis',
    href: '/gratis',
  },
  {
    label: 'Tentang',
    href: '/about',
  },
  {
    label: 'Blog',
    href: '/blog',
  },
]
