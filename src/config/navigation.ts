import type { NavItem } from '@/shared/components/layout'

export const psikotesNavItems: NavItem[] = [
  { label: 'Beranda', href: '/psikotes' },
  {
    label: 'Layanan',
    children: [
      {
        label: 'Psikotes Online',
        href: '/psikotes',
        icon: 'Brain',
        desc: 'Tes psikologi terstandar',
      },
      {
        label: 'Konseling',
        href: '/konseling',
        icon: 'Heart',
        desc: 'Konsultasi dengan psikolog',
      },
      {
        label: 'Pelatihan',
        href: '/pelatihan',
        icon: 'GraduationCap',
        desc: 'Kembangkan potensi diri',
      },
    ],
  },
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
]

export const konselingNavItems: NavItem[] = [
  { label: 'Beranda', href: '/konseling' },
  {
    label: 'Layanan',
    children: [
      {
        label: 'Psikotes Online',
        href: '/psikotes',
        icon: 'Brain',
        desc: 'Tes psikologi terstandar',
      },
      {
        label: 'Konseling',
        href: '/konseling',
        icon: 'Heart',
        desc: 'Konsultasi dengan psikolog',
      },
      {
        label: 'Pelatihan',
        href: '/pelatihan',
        icon: 'GraduationCap',
        desc: 'Kembangkan potensi diri',
      },
    ],
  },
  {
    label: 'Jenis Konseling',
    children: [
      {
        label: 'Konseling Individu',
        href: '/konseling#services',
        icon: 'Users',
        desc: 'Sesi privat satu-satu',
      },
      {
        label: 'Konseling Pasangan',
        href: '/konseling#services',
        icon: 'HeartHandshake',
        desc: 'Harmoni hubungan Anda',
      },
      {
        label: 'Konseling Kelompok',
        href: '/konseling#services',
        icon: 'Presentation',
        desc: 'Diskusi & dukungan bersama',
      },
    ],
  },
  {
    label: 'Tentang Kami',
    href: '/about',
  },
]

export const pelatihanNavItems: NavItem[] = [
  { label: 'Beranda', href: '/pelatihan' },
  {
    label: 'Layanan',
    children: [
      {
        label: 'Psikotes Online',
        href: '/psikotes',
        icon: 'Brain',
        desc: 'Tes psikologi terstandar',
      },
      {
        label: 'Konseling',
        href: '/konseling',
        icon: 'Heart',
        desc: 'Konsultasi dengan psikolog',
      },
      {
        label: 'Pelatihan',
        href: '/pelatihan',
        icon: 'GraduationCap',
        desc: 'Kembangkan potensi diri',
      },
    ],
  },
  {
    label: 'Program',
    children: [
      {
        label: 'Webinar',
        href: '/pelatihan#programs',
        icon: 'Video',
        desc: 'Seminar online interaktif',
      },
      {
        label: 'Kelas Online',
        href: '/pelatihan#programs',
        icon: 'Monitor',
        desc: 'Belajar fleksibel kapan saja',
      },
      {
        label: 'Mentoring Eksklusif',
        href: '/pelatihan#programs',
        icon: 'Compass',
        desc: 'Bimbingan personal ahli',
      },
    ],
  },
  {
    label: 'Tentang Kami',
    href: '/about',
  },
]
