import type { NavItem } from '@/shared/components/layout'

export const psikotesNavItems: NavItem[] = [
  {
    label: 'Kategori',
    children: [
      { label: 'Mahasiswa & Pelajar', href: '/psikotes/mahasiswa' },
      { label: 'Perusahaan', href: '/psikotes/perusahaan' },
      { label: 'Kesehatan Mental', href: '/psikotes/kesehatan-mental' },
    ],
  },
  {
    label: 'Jenis Tes',
    children: [
      { label: 'Tes Gratis', href: '/psikotes/gratis' },
      { label: 'Tes Premium', href: '/psikotes/premium' },
    ],
  },
  {
    label: 'Membership',
    href: '/psikotes/membership/benefit',
  },
  {
    label: 'Konseling',
    href: '/konseling',
  },
  {
    label: 'Pelatihan',
    href: '/pelatihan',
  },
]

export const konselingNavItems: NavItem[] = [
  {
    label: 'Psikotes',
    href: '/psikotes',
  },
  {
    label: 'Layanan',
    children: [
      { label: 'Konseling Individu', href: '/konseling#individu' },
      { label: 'Konseling Pasangan', href: '/konseling#pasangan' },
      { label: 'Konseling Kelompok', href: '/konseling#kelompok' },
    ],
  },
  {
    label: 'Pelatihan',
    href: '/pelatihan',
  },
  {
    label: 'Tentang Kami',
    href: '/',
  },
]

export const pelatihanNavItems: NavItem[] = [
  {
    label: 'Psikotes',
    href: '/psikotes',
  },
  {
    label: 'Program',
    children: [
      { label: 'Webinar', href: '/pelatihan#webinar' },
      { label: 'Kelas Online', href: '/pelatihan#kelas' },
      { label: 'Mentoring', href: '/pelatihan#mentoring' },
    ],
  },
  {
    label: 'Konseling',
    href: '/konseling',
  },
  {
    label: 'Tentang Kami',
    href: '/',
  },
]
