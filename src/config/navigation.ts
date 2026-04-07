import type { NavItem } from '@/shared/components/layout'

export const psikotesNavItems: NavItem[] = [
  { label: 'Beranda', href: '/' },
  {
    label: 'Produk',
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
    label: 'Tes Gratis',
    href: '/gratis',
  },
  {
    label: 'Lainnya',
    href: '/jenis-tes',
    children: [
      {
        label: 'Mahasiswa & Pelajar',
        href: '/mahasiswa',
        icon: 'BookOpen',
        desc: 'Try out, CPNS & minat bakat',
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
    label: 'Membership',
    href: '/membership/benefit',
  },
]
