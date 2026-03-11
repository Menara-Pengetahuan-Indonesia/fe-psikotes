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
    value: '50%',
    label: 'Proses Asesmen Lebih Efisien',
    description:
      'Lakukan asesmen kandidat dan karyawan'
      + ' secara online dengan proses yang'
      + ' lebih cepat dan praktis.',
  },
  {
    value: '3',
    label: 'Area Asesmen Utama',
    description:
      'Ukur kepribadian, kemampuan kognitif,'
      + ' dan potensi kerja untuk memahami'
      + ' kandidat secara lebih menyeluruh.',
  },
  {
    value: '100%',
    label: 'Insight Berbasis Data',
    description:
      'Dapatkan laporan asesmen yang terstruktur'
      + ' untuk membantu HR mengambil keputusan'
      + ' yang lebih objektif.',
  },
]

export const PERUSAHAAN_PROCESS = [
  {
    icon: Target,
    title: 'Konsultasi Kebutuhan',
    description:
      'Kami berdiskusi dengan perusahaan'
      + ' untuk memahami kebutuhan rekrutmen,'
      + ' pengembangan karyawan, atau'
      + ' perencanaan karier.',
  },
  {
    icon: Users,
    title: 'Pelaksanaan Tes',
    description:
      'Kandidat atau karyawan mengerjakan'
      + ' asesmen secara online melalui sistem'
      + ' yang mudah digunakan.',
  },
  {
    icon: Shield,
    title: 'Analisis Psikolog',
    description:
      'Tim psikolog menganalisis hasil tes'
      + ' untuk melihat potensi, kemampuan'
      + ' berpikir, dan karakter kerja peserta.',
  },
  {
    icon: TrendingUp,
    title: 'Laporan & Rekomendasi',
    description:
      'Perusahaan menerima laporan hasil'
      + ' asesmen beserta insight dan rekomendasi'
      + ' yang dapat digunakan sebagai dasar'
      + ' pengambilan keputusan.',
  },
]

export const PERUSAHAAN_FAQ: FaqItem[] = [
  {
    q: 'Apa manfaat asesmen psikologi'
      + ' bagi perusahaan?',
    a: 'Asesmen psikologi membantu perusahaan'
      + ' memahami potensi, kemampuan berpikir,'
      + ' serta karakter kerja kandidat atau'
      + ' karyawan. Hasilnya dapat digunakan'
      + ' sebagai bahan pertimbangan dalam proses'
      + ' rekrutmen, promosi jabatan, maupun'
      + ' pengembangan karyawan.',
  },
  {
    q: 'Apakah perusahaan akan mendapatkan'
      + ' laporan hasil asesmen?',
    a: 'Ya. Setelah peserta menyelesaikan tes,'
      + ' perusahaan akan mendapatkan laporan'
      + ' hasil yang berisi insight mengenai'
      + ' potensi, kemampuan, serta rekomendasi'
      + ' yang dapat membantu pengambilan'
      + ' keputusan dalam proses HR.',
  },
  {
    q: 'Apakah asesmen ini dapat digunakan'
      + ' untuk kebutuhan rekrutmen dan'
      + ' pengembangan karyawan?',
    a: 'Ya. Asesmen dapat digunakan untuk'
      + ' berbagai kebutuhan perusahaan, seperti'
      + ' proses seleksi kandidat, evaluasi'
      + ' potensi karyawan, hingga perencanaan'
      + ' pengembangan karier di dalam organisasi.',
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
      'Dapatkan laporan lengkap tentang'
      + ' potensi dan arah pengembangan'
      + ' dirimu.',
  },
]

export const MAHASISWA_FAQ: FaqItem[] = [
  {
    q: 'Apakah ada diskon untuk'
      + ' mahasiswa?',
    a: 'Ya, kami memiliki harga khusus'
      + ' agar kamu bisa mulai tumbuh'
      + ' tanpa kendala biaya.',
  },
  {
    q: 'Tes apa yang bisa membantu saya'
      + ' untuk menemukan arah karir?',
    a: 'Tes Minat Bakat adalah pilihan'
      + ' terbaik untuk memahami potensi'
      + ' dan arah karir yang sesuai'
      + ' dengan dirimu.',
  },
  {
    q: 'Apakah hasil tes ini bisa'
      + ' digunakan untuk melamar kerja?',
    a: 'Ya, laporan resmi BERMOELA valid'
      + ' untuk menunjukkan potensimu'
      + ' yang sebenarnya pada rekruter.',
  },
  {
    q: 'Berapa lama waktu yang'
      + ' dibutuhkan untuk menyelesaikan'
      + ' tes?',
    a: 'Bervariasi tergantung jenis tes,'
      + ' umumnya berkisar antara 15-60'
      + ' menit. Estimasi waktu tersedia'
      + ' di halaman masing-masing tes.',
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
    title: 'Memahami Diri Lebih Dalam',
    description:
      'Asesmen membantu kamu mengenali'
      + ' perasaan, pengalaman, dan hal-hal'
      + ' yang mungkin memengaruhi kondisi'
      + ' mentalmu saat ini.',
  },
  {
    icon: Brain,
    title: 'Insight Kesehatan Mental',
    description:
      'Dapatkan gambaran yang lebih jelas'
      + ' tentang kondisi mentalmu melalui'
      + ' alat asesmen yang terstruktur.',
  },
  {
    icon: Lock,
    title: 'Privasi Terjaga',
    description:
      'Data dan hasil asesmenmu bersifat'
      + ' pribadi dan dijaga kerahasiaannya.',
  },
  {
    icon: CheckCircle2,
    title: 'Dukungan Profesional',
    description:
      'Hasil asesmen dapat menjadi langkah'
      + ' awal untuk memahami diri dan'
      + ' menentukan dukungan yang kamu'
      + ' butuhkan.',
  },
]

export const MENTAL_HEALTH_JOURNEY = [
  {
    step: '01',
    title: 'Baseline (Titik Awal)',
    description:
      'Mulai dengan screening awal untuk'
      + ' memahami kondisi mental Anda dan'
      + ' menemukan area yang membutuhkan'
      + ' perhatian.',
  },
  {
    step: '02',
    title: 'Pemetaan Mental',
    description:
      'Ikuti tes kesehatan mental yang'
      + ' komprehensif untuk mendapatkan'
      + ' gambaran lebih dalam tentang'
      + ' kondisi psikologis Anda.',
  },
  {
    step: '03',
    title: 'Analisis Transformasi',
    description:
      'Diskusikan hasil asesmen bersama'
      + ' psikolog untuk memahami potensi'
      + ' perubahan dan arah pengembangan'
      + ' diri Anda.',
  },
  {
    step: '04',
    title: 'Tumbuh & Berdaya',
    description:
      'Ambil langkah nyata untuk membangun'
      + ' kesejahteraan mental dan menjalani'
      + ' hidup yang lebih seimbang.',
  },
]

export const MENTAL_HEALTH_FAQ: FaqItem[] = [
  {
    q: 'Apa itu tes kesehatan mental?',
    a: 'Tes kesehatan mental membantu Anda'
      + ' memahami kondisi psikologis saat'
      + ' ini, termasuk tingkat stres,'
      + ' kecemasan, dan kesejahteraan'
      + ' mental secara keseluruhan.',
  },
  {
    q: 'Apakah hasil tes kesehatan mental'
      + ' ini dapat dipercaya?',
    a: 'Tes dirancang berdasarkan pendekatan'
      + ' psikologis yang digunakan untuk'
      + ' membantu Anda mendapatkan gambaran'
      + ' awal tentang kondisi mental Anda.',
  },
  {
    q: 'Siapa saja yang bisa mengikuti tes'
      + ' kesehatan mental ini?',
    a: 'Tes ini dapat diikuti oleh siapa'
      + ' saja yang ingin lebih memahami'
      + ' kondisi mentalnya dan mulai'
      + ' mengambil langkah untuk menjaga'
      + ' kesejahteraan psikologis.',
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
