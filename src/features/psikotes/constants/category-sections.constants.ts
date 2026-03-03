import {
  Target,
  Users,
  Shield,
  TrendingUp,
  GraduationCap,
  Compass,
  Lightbulb,
  Award,
  Heart,
  Brain,
  Lock,
  CheckCircle2,
  BookOpen,
  Sparkles,
} from 'lucide-react'

import type {
  FaqItem,
  CtaBannerData,
} from '../types'

// ── Perusahaan ─────────────────────────────────────

export const PERUSAHAAN_STATS = [
  {
    value: '95%',
    label: 'Akurasi Rekrutmen',
    description:
      'Tingkat kecocokan kandidat yang'
      + ' siap tumbuh bersama tim.',
  },
  {
    value: '500+',
    label: 'Perusahaan Mitra',
    description:
      'Telah mempercayai asesmen kami'
      + ' untuk membangun tim sukses.',
  },
  {
    value: '10K+',
    label: 'Karyawan Berdaya',
    description:
      'Talenta profesional yang telah'
      + ' melalui proses pemetaan diri.',
  },
]

export const PERUSAHAAN_PROCESS = [
  {
    icon: Target,
    title: 'Konsultasi Kebutuhan',
    description:
      'Tim kami memahami kebutuhan SDM'
      + ' untuk merancang masa depan bisnis.',
  },
  {
    icon: Users,
    title: 'Distribusi Tes',
    description:
      'Karyawan mengerjakan tes secara'
      + ' online sebagai baseline kompetensi.',
  },
  {
    icon: Shield,
    title: 'Validasi Psikolog',
    description:
      'Hasil dianalisis untuk memastikan'
      + ' kesiapan tumbuh dalam tim.',
  },
  {
    icon: TrendingUp,
    title: 'Laporan Strategis',
    description:
      'Terima rekomendasi nyata untuk'
      + ' kesuksesan organisasi jangka panjang.',
  },
]

export const PERUSAHAAN_FAQ: FaqItem[] = [
  {
    q: 'Apakah bisa tes untuk banyak'
      + ' karyawan sekaligus?',
    a: 'Ya, kami menyediakan paket korporat'
      + ' untuk pemetaan massal. Hubungi tim'
      + ' kami untuk penawaran khusus.',
  },
  {
    q: 'Berapa lama hasil tes keluar?',
    a: 'Untuk tes standar, hasil keluar'
      + ' real-time sebagai baseline instan.'
      + ' Validasi psikolog maksimal H+1.',
  },
  {
    q: 'Apakah laporan bisa digunakan'
      + ' untuk audit SDM?',
    a: 'Tentu. Laporan kami valid untuk'
      + ' kebutuhan audit internal guna'
      + ' mengukur daya juang tim.',
  },
  {
    q: 'Apakah tersedia sesi konsultasi'
      + ' pasca-tes?',
    a: 'Ya, kami menawarkan sesi feedback'
      + ' untuk membahas strategi tumbuh'
      + ' dan sukses bagi perusahaan.',
  },
]

export const PERUSAHAAN_CTA: CtaBannerData = {
  title: 'Siap Bangun',
  titleAccent: 'Tim yang Sukses?',
  description:
    'Mulai asesmen korporat bersama'
    + ' BERMOELA dan temukan talenta'
    + ' yang siap tumbuh maksimal.',
  buttonText: 'Konsultasi Gratis',
  href: '/konseling',
}

// ── Mahasiswa ──────────────────────────────────────

export const MAHASISWA_BENEFITS = [
  {
    icon: Compass,
    title: 'Temukan Arah Hidup',
    description:
      'Ketahui titik mulamu untuk'
      + ' memilih jalur karir yang'
      + ' benar-benar membuatmu sukses.',
    theme: 'emerald' as const,
  },
  {
    icon: GraduationCap,
    title: 'The New You (Karir)',
    description:
      'Siapkan diri hadapi dunia kerja'
      + ' dengan pemahaman mendalam'
      + ' tentang jati dirimu.',
    theme: 'amber' as const,
  },
  {
    icon: Lightbulb,
    title: 'Insight Masa Depan',
    description:
      'Hasil tes membantu merancang'
      + ' langkah nyata untuk berkembang'
      + ' di era penuh tekanan.',
    theme: 'sky' as const,
  },
  {
    icon: Award,
    title: 'Sertifikat Resmi',
    description:
      'Laporan profesional sebagai bukti'
      + ' kesiapanmu untuk menjadi'
      + ' penentu masa depan sendiri.',
    theme: 'indigo' as const,
  },
  {
    icon: BookOpen,
    title: 'Rekomendasi Presisi',
    description:
      'Dapatkan saran jurusan atau'
      + ' karir yang paling indah sesuai'
      + ' profil psikologis Anda.',
    theme: 'rose' as const,
  },
  {
    icon: Sparkles,
    title: 'Investasi Tumbuh',
    description:
      'Paket terjangkau untuk mahasiswa'
      + ' yang ingin mulai berdaya'
      + ' sedini mungkin.',
    theme: 'emerald' as const,
  },
]

export const MAHASISWA_PROCESS = [
  {
    step: '01',
    title: 'Titik Mula',
    description:
      'Buat akun dan tentukan area'
      + ' mana yang ingin kamu petakan.',
  },
  {
    step: '02',
    title: 'Pilih Asesmen',
    description:
      'Tentukan tes yang sesuai dengan'
      + ' mimpi dan target suksesmu.',
  },
  {
    step: '03',
    title: 'Pemetaan Diri',
    description:
      'Selesaikan tes secara online'
      + ' sebagai baseline perubahanmu.',
  },
  {
    step: '04',
    title: 'Terima Hasil',
    description:
      'Dapatkan laporan lengkap dan'
      + ' rancang masa depanmu yang baru.',
  },
]

export const MAHASISWA_FAQ: FaqItem[] = [
  {
    q: 'Apakah ada diskon khusus'
      + ' mahasiswa?',
    a: 'Ya, kami memiliki harga khusus'
      + ' agar kamu bisa mulai tumbuh'
      + ' tanpa kendala biaya.',
  },
  {
    q: 'Tes apa yang cocok untuk'
      + ' mencari arah karir?',
    a: 'Tes Minat Bakat adalah baseline'
      + ' terbaik untuk merancang masa'
      + ' depan suksesmu sedini mungkin.',
  },
  {
    q: 'Apakah hasil tes bisa digunakan'
      + ' untuk melamar kerja?',
    a: 'Ya, laporan resmi BERMOELA valid'
      + ' untuk menunjukkan potensimu'
      + ' yang sebenarnya pada rekruter.',
  },
  {
    q: 'Berapa lama waktu pengerjaan?',
    a: 'Bervariasi, namun dirancang agar'
      + ' kamu tetap fokus dalam proses'
      + ' mengenali dirimu sendiri.',
  },
]

export const MAHASISWA_CTA: CtaBannerData = {
  title: 'Siap Rancang',
  titleAccent: 'Masa Depan Indah?',
  description:
    'Ambil langkah pertama menuju "The'
    + ' New You" yang sukses dengan'
    + ' asesmen profesional BERMOELA.',
  buttonText: 'Mulai Sekarang',
  href: '/psikotes/mahasiswa',
}

// ── Mental Health ───────────────────────────────

export const MENTAL_HEALTH_BENEFITS = [
  {
    icon: Heart,
    title: 'Melepaskan Kendala',
    description:
      'Identifikasi masalah masa lalu'
      + ' untuk hidup yang lebih bebas.',
  },
  {
    icon: Brain,
    title: 'Mental Health Insight',
    description:
      'Alat tes tervalidasi untuk'
      + ' memahami kondisi mentalmu.',
  },
  {
    icon: Lock,
    title: 'Kerahasiaan Utuh',
    description:
      'Data pribadimu adalah milikmu,'
      + ' aman dalam ekosistem kami.',
  },
  {
    icon: CheckCircle2,
    title: 'Dukungan Para Ahli',
    description:
      'Rancang langkah perubahan bersama'
      + ' psikolog profesional kami.',
  },
]

export const MENTAL_HEALTH_JOURNEY = [
  {
    step: '01',
    title: 'Baseline (Titik Awal)',
    description:
      'Lakukan screening awal untuk'
      + ' mengetahui area mana yang'
      + ' perlu disembuhkan.',
  },
  {
    step: '02',
    title: 'Pemetaan Mental',
    description:
      'Ikuti tes Mental Health yang'
      + ' komprehensif sesuai kondisimu.',
  },
  {
    step: '03',
    title: 'Analisis Transformasi',
    description:
      'Psikolog membantu merumuskan'
      + ' potensi "The New You".',
  },
  {
    step: '04',
    title: 'Tumbuh & Berdaya',
    description:
      'Jalankan langkah nyata untuk'
      + ' hidup indah dan masa depan cerah.',
  },
]

export const MENTAL_HEALTH_FAQ: FaqItem[] = [
  {
    q: 'Apa bedanya Mental Health'
      + ' dengan tes biasa?',
    a: 'Kami tidak mendiagnosis penyakit,'
      + ' tapi memetakan cara agar kamu'
      + ' bisa tumbuh dan sukses kembali.',
  },
  {
    q: 'Apakah hasil tes saya bersifat'
      + ' rahasia?',
    a: 'Tentu. Kami menjunjung tinggi'
      + ' privasi agar kamu bebas merdeka'
      + ' menceritakan kondisimu.',
  },
  {
    q: 'Siapa yang memvalidasi hasil?',
    a: 'Laporan divalidasi oleh psikolog'
      + ' klinis berlisensi untuk'
      + ' akurasi rencana masa depanmu.',
  },
  {
    q: 'Apakah ada layanan konseling'
      + ' lanjutan?',
    a: 'Ya, kami sediakan sesi bersama'
      + ' para ahli untuk memastikanmu'
      + ' benar-benar berkembang.',
  },
]

export const MENTAL_HEALTH_CTA: CtaBannerData = {
  title: 'Mulai Langkah',
  titleAccent: 'The New You',
  description:
    'Jangan hanya bertahan. Mari tumbuh'
    + ' dan sukses di era penuh tekanan'
    + ' bersama BERMOELA.',
  buttonText: 'Mulai Sekarang',
  href: '/psikotes/psikotes/kesehatan-mental',
}
