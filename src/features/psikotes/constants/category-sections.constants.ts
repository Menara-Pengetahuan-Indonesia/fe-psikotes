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
      'Tingkat kecocokan kandidat dengan'
      + ' posisi yang dibutuhkan.',
  },
  {
    value: '500+',
    label: 'Perusahaan Mitra',
    description:
      'Perusahaan dari berbagai industri'
      + ' telah mempercayai asesmen kami.',
  },
  {
    value: '10K+',
    label: 'Karyawan Diasesmen',
    description:
      'Talenta profesional yang telah'
      + ' melalui proses asesmen kami.',
  },
]

export const PERUSAHAAN_PROCESS = [
  {
    icon: Target,
    title: 'Konsultasi Kebutuhan',
    description:
      'Tim kami memahami kebutuhan SDM'
      + ' dan menyusun paket asesmen'
      + ' yang tepat.',
  },
  {
    icon: Users,
    title: 'Distribusi Tes',
    description:
      'Karyawan mengerjakan tes secara'
      + ' online dengan link khusus'
      + ' perusahaan.',
  },
  {
    icon: Shield,
    title: 'Validasi Psikolog',
    description:
      'Hasil dianalisis dan divalidasi'
      + ' oleh psikolog berlisensi.',
  },
  {
    icon: TrendingUp,
    title: 'Laporan & Rekomendasi',
    description:
      'Terima laporan komprehensif'
      + ' beserta rekomendasi strategis.',
  },
]

export const PERUSAHAAN_FAQ: FaqItem[] = [
  {
    q: 'Apakah bisa tes untuk banyak'
      + ' karyawan sekaligus?',
    a: 'Ya, kami menyediakan paket korporat'
      + ' untuk asesmen massal. Hubungi tim'
      + ' kami untuk penawaran khusus.',
  },
  {
    q: 'Berapa lama hasil tes keluar?',
    a: 'Untuk tes standar, hasil keluar'
      + ' real-time. Tes yang memerlukan'
      + ' validasi psikolog maksimal H+1'
      + ' hari kerja.',
  },
  {
    q: 'Apakah laporan bisa digunakan'
      + ' untuk audit SDM?',
    a: 'Tentu. Laporan kami dilengkapi kop'
      + ' resmi dan tanda tangan psikolog'
      + ' berlisensi, valid untuk kebutuhan'
      + ' audit internal maupun eksternal.',
  },
  {
    q: 'Apakah tersedia sesi konsultasi'
      + ' pasca-tes?',
    a: 'Ya, kami menawarkan sesi feedback'
      + ' bersama psikolog untuk membahas'
      + ' hasil dan rekomendasi tindak'
      + ' lanjut bagi perusahaan.',
  },
]

export const PERUSAHAAN_CTA: CtaBannerData = {
  title: 'Siap Tingkatkan',
  titleAccent: 'Kualitas SDM?',
  description:
    'Mulai asesmen korporat bersama'
    + ' Bermoela dan temukan talenta'
    + ' terbaik untuk perusahaan Anda.',
  buttonText: 'Konsultasi Gratis',
  href: '/konseling',
}

// ── Mahasiswa ──────────────────────────────────────

export const MAHASISWA_BENEFITS = [
  {
    icon: Compass,
    title: 'Temukan Arah Karir',
    description:
      'Ketahui minat dan bakat untuk'
      + ' memilih jurusan atau jalur'
      + ' karir yang tepat.',
    theme: 'emerald' as const,
  },
  {
    icon: GraduationCap,
    title: 'Persiapan Dunia Kerja',
    description:
      'Siapkan diri menghadapi seleksi'
      + ' kerja dengan pemahaman mendalam'
      + ' tentang potensi Anda.',
    theme: 'amber' as const,
  },
  {
    icon: Lightbulb,
    title: 'Insight Berbasis Data',
    description:
      'Hasil tes didukung metodologi'
      + ' psikometri tervalidasi dan'
      + ' analisis profesional.',
    theme: 'sky' as const,
  },
  {
    icon: Award,
    title: 'Sertifikat Resmi',
    description:
      'Laporan dilengkapi kop resmi'
      + ' Bermoela yang bisa dilampirkan'
      + ' untuk keperluan akademik.',
    theme: 'indigo' as const,
  },
  {
    icon: BookOpen,
    title: 'Rekomendasi Jurusan',
    description:
      'Dapatkan rekomendasi jurusan'
      + ' kuliah yang paling sesuai'
      + ' dengan profil psikologis Anda.',
    theme: 'rose' as const,
  },
  {
    icon: Sparkles,
    title: 'Harga Terjangkau',
    description:
      'Paket khusus pelajar dan'
      + ' mahasiswa dengan harga yang'
      + ' ramah di kantong.',
    theme: 'emerald' as const,
  },
]

export const MAHASISWA_PROCESS = [
  {
    step: '01',
    title: 'Daftar Akun',
    description:
      'Buat akun gratis di platform'
      + ' Bermoela dalam hitungan detik.',
  },
  {
    step: '02',
    title: 'Pilih Tes',
    description:
      'Tentukan tes yang sesuai dengan'
      + ' kebutuhan akademik atau karir.',
  },
  {
    step: '03',
    title: 'Kerjakan Online',
    description:
      'Selesaikan tes kapan saja dan'
      + ' di mana saja secara daring.',
  },
  {
    step: '04',
    title: 'Terima Hasil',
    description:
      'Dapatkan laporan profesional'
      + ' dan rekomendasi personal.',
  },
]

export const MAHASISWA_FAQ: FaqItem[] = [
  {
    q: 'Apakah ada diskon khusus'
      + ' mahasiswa?',
    a: 'Ya, kami memiliki harga khusus'
      + ' untuk pelajar dan mahasiswa.'
      + ' Cek halaman harga masing-masing'
      + ' tes untuk detail lengkapnya.',
  },
  {
    q: 'Tes apa yang cocok untuk'
      + ' mencari jurusan kuliah?',
    a: 'Tes Minat Bakat adalah pilihan'
      + ' terbaik. Tes ini akan mengukur'
      + ' minat, bakat, dan kepribadian'
      + ' Anda untuk rekomendasi jurusan.',
  },
  {
    q: 'Apakah hasil tes bisa digunakan'
      + ' untuk melamar kerja?',
    a: 'Ya, laporan kami dilengkapi kop'
      + ' resmi Bermoela dan valid untuk'
      + ' dilampirkan dalam proses'
      + ' rekrutmen kerja.',
  },
  {
    q: 'Berapa lama waktu pengerjaan?',
    a: 'Durasi bervariasi tergantung'
      + ' jenis tes, mulai dari 15 menit'
      + ' hingga 90 menit. Detail waktu'
      + ' tercantum di setiap halaman tes.',
  },
]

export const MAHASISWA_CTA: CtaBannerData = {
  title: 'Siap Temukan',
  titleAccent: 'Potensi Terbaikmu?',
  description:
    'Ambil langkah pertama menuju masa'
    + ' depan yang lebih terarah dengan'
    + ' asesmen profesional Bermoela.',
  buttonText: 'Mulai Tes Sekarang',
  href: '/psikotes/mahasiswa',
}

// ── Kesehatan Mental ───────────────────────────────

export const MENTAL_HEALTH_BENEFITS = [
  {
    icon: Heart,
    title: 'Deteksi Dini',
    description:
      'Kenali tanda-tanda awal gangguan'
      + ' mental sebelum berkembang.',
  },
  {
    icon: Brain,
    title: 'Pendekatan Klinis',
    description:
      'Alat tes tervalidasi yang digunakan'
      + ' praktisi profesional.',
  },
  {
    icon: Lock,
    title: 'Privasi Terjamin',
    description:
      'Data dan hasil tes dijaga dengan'
      + ' standar keamanan tertinggi.',
  },
  {
    icon: CheckCircle2,
    title: 'Didampingi Psikolog',
    description:
      'Konsultasi lanjutan bersama'
      + ' psikolog berpengalaman.',
  },
]

export const MENTAL_HEALTH_JOURNEY = [
  {
    step: '01',
    title: 'Screening Awal',
    description:
      'Isi kuesioner singkat untuk'
      + ' mengetahui area yang perlu'
      + ' dieksplorasi.',
  },
  {
    step: '02',
    title: 'Asesmen Mendalam',
    description:
      'Ikuti tes psikologi klinis'
      + ' yang sesuai dengan kondisi Anda.',
  },
  {
    step: '03',
    title: 'Analisis Hasil',
    description:
      'Psikolog menganalisis dan'
      + ' menyusun laporan lengkap.',
  },
  {
    step: '04',
    title: 'Konseling Lanjutan',
    description:
      'Diskusikan hasil bersama'
      + ' psikolog untuk langkah'
      + ' pemulihan.',
  },
]

export const MENTAL_HEALTH_FAQ: FaqItem[] = [
  {
    q: 'Apakah tes ini bisa mendiagnosis'
      + ' gangguan mental?',
    a: 'Tes ini berfungsi sebagai'
      + ' screening awal. Untuk diagnosis'
      + ' resmi, diperlukan konsultasi'
      + ' lanjutan dengan psikolog.',
  },
  {
    q: 'Apakah hasil tes saya bersifat'
      + ' rahasia?',
    a: 'Tentu. Semua data dan hasil tes'
      + ' hanya dapat diakses oleh Anda.'
      + ' Kami menjunjung tinggi kode etik'
      + ' kerahasiaan psikologi.',
  },
  {
    q: 'Siapa yang membuat laporan'
      + ' hasil tes?',
    a: 'Laporan disusun oleh sistem kami'
      + ' yang divalidasi oleh psikolog'
      + ' klinis berlisensi untuk'
      + ' memastikan akurasi.',
  },
  {
    q: 'Apakah ada layanan konseling'
      + ' setelah tes?',
    a: 'Ya, kami menyediakan layanan'
      + ' konseling lanjutan bersama'
      + ' psikolog berpengalaman untuk'
      + ' membahas hasil tes Anda.',
  },
]

export const MENTAL_HEALTH_CTA: CtaBannerData = {
  title: 'Mulai Peduli',
  titleAccent: 'Kesehatan Mentalmu',
  description:
    'Langkah kecil hari ini bisa membawa'
    + ' perubahan besar. Kenali kondisi'
    + ' mental Anda bersama Bermoela.',
  buttonText: 'Mulai Asesmen',
  href: '/psikotes/kesehatan-mental',
}
