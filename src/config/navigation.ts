import type { NavItem } from '@/shared/components/layout'

export const psikotesNavItems: NavItem[] = [
  {
    label: 'Kategori',
    children: [
      {
        label: 'Mahasiswa & Pelajar',
        href: '/psikotes/mahasiswa',
        icon: 'BookOpen',
        desc: 'Tes minat bakat & jurusan',
      },
      {
        label: 'Perusahaan',
        href: '/psikotes/perusahaan',
        icon: 'Building2',
        desc: 'Rekrutmen & asesmen karyawan',
      },
      {
        label: 'Kesehatan Mental',
        href: '/psikotes/kesehatan-mental',
        icon: 'HeartPulse',
        desc: 'Deteksi dini kesehatan jiwa',
      },
    ],
  },
  {
    label: 'Jenis Tes',
    children: [
      {
        label: 'Tes Gratis',
        href: '/psikotes/gratis',
        icon: 'Gift',
        desc: 'Coba tes tanpa biaya',
      },
      {
        label: 'Tes Premium',
        href: '/psikotes/premium',
        icon: 'Crown',
        desc: 'Analisis mendalam & sertifikat',
      },
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
      {
        label: 'Konseling Individu',
        href: '/konseling#individu',
        icon: 'Users',
        desc: 'Sesi privat satu-satu',
      },
      {
        label: 'Konseling Pasangan',
        href: '/konseling#pasangan',
        icon: 'HeartHandshake',
        desc: 'Harmoni hubungan Anda',
      },
      {
        label: 'Konseling Kelompok',
        href: '/konseling#kelompok',
        icon: 'Presentation',
        desc: 'Diskusi & dukungan bersama',
      },
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
      {
        label: 'Webinar',
        href: '/pelatihan#webinar',
        icon: 'Video',
        desc: 'Seminar online interaktif',
      },
      {
        label: 'Kelas Online',
        href: '/pelatihan#kelas',
        icon: 'Monitor',
        desc: 'Belajar fleksibel kapan saja',
      },
      {
        label: 'Mentoring',
        href: '/pelatihan#mentoring',
        icon: 'Compass',
        desc: 'Bimbingan personal ahli',
      },
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
