import type { NavItem } from '@/shared/components/layout'

export const psikotesNavItems: NavItem[] = [
  { label: 'Beranda', href: '/' },
  {
    label: 'Kategori',
    href: '/kategori',
    children: [
      {
        label: 'Mahasiswa & Pelajar',
        href: '/mahasiswa',
        icon: 'BookOpen',
        desc: 'Tes minat bakat & jurusan',
      },
      {
        label: 'Perusahaan',
        href: '/bisnis',
        icon: 'Building2',
        desc: 'Rekrutmen & asesmen karyawan',
      },
      {
        label: 'Kesehatan Mental',
        href: '/kesehatan-mental',
        icon: 'HeartPulse',
        desc: 'Deteksi dini kesehatan jiwa',
      },
    ],
  },
  {
    label: 'Jenis Tes',
    href: '/jenis-tes',
    children: [
      {
        label: 'Tes Gratis',
        href: '/gratis',
        icon: 'Gift',
        desc: 'Coba tes tanpa biaya',
      },
      {
        label: 'Tes Premium',
        href: '/premium',
        icon: 'Crown',
        desc: 'Analisis mendalam & sertifikat',
      },
    ],
  },
  {
    label: 'Membership',
    href: '/membership/benefit',
  },
]
