import { User, Heart, Briefcase } from 'lucide-react'

export const NAV_CATEGORIES = [
  {
    id: 'personal',
    title: 'Diri Sendiri',
    subtitle: 'Personal Growth',
    icon: User,
    theme: 'bg-white text-indigo-600 border-indigo-100',
    accent: 'text-indigo-500',
    gradient: 'from-indigo-500/20 to-indigo-700/20',
    items: [
      {
        problem: 'Trauma masa lalu & luka batin',
        product: 'Past Trauma & Depression Healing',
        solution: 'Mengidentifikasi akar luka yang mendikte reaksimu hari ini',
        benefit: 'Berdamai dengan masa lalu, melangkah lebih ringan',
      },
      {
        problem: 'Anxiety, depresi & burnout berkepanjangan',
        product: 'Anxiety & Burnout Check',
        solution: 'Mendeteksi tingkat kecemasan & kelelahan mental secara akurat',
        benefit: 'Tahu persis kondisi mental & langkah pemulihan yang tepat',
      },
      {
        problem: 'Tidak pernah merasa cukup & butuh validasi',
        product: 'Body Image, Self-Confidence & Self-Worth',
        solution: 'Membedah self-image & akar rendahnya harga diri',
        benefit: 'Percaya diri dari dalam, bukan dari pengakuan orang lain',
      },
      {
        problem: 'Quarter-life crisis & merasa tertinggal',
        product: 'Identity, Purpose & Quarter-Life Crisis',
        solution: 'Memetakan kembali jalur hidupmu sendiri — bukan milik orang lain',
        benefit: 'Ketenangan di tengah bisingnya pencapaian teman sebaya',
      },
      {
        problem: 'Bingung arah karir & potensi diri',
        product: 'Tes IQ, Bakat Minat & Perencanaan Karier',
        solution: 'Peta kapasitas kognitif + bidang yang cocok dengan kepribadianmu',
        benefit: 'Karier yang selaras dengan siapa kamu, bukan sekadar gaji',
      },
    ],
  },
  {
    id: 'relationship',
    title: 'Relationship',
    subtitle: 'Pasangan & Keluarga',
    icon: Heart,
    theme: 'bg-white text-rose-500 border-rose-100',
    accent: 'text-rose-400',
    gradient: 'from-rose-400/20 to-rose-600/20',
    items: [
      {
        problem: 'Pacaran tapi belum yakin: lanjut atau jangan?',
        product: 'Red Flag Test Pasangan Baru',
        solution: 'Melihat secara objektif karakter, nilai hidup & pola komunikasi pasangan',
        benefit: 'Keputusan dengan kepala dingin, bukan hanya perasaan',
      },
      {
        problem: 'Konflik berulang, KDRT, NPD, perselingkuhan',
        product: 'Konflik & Trauma Rumah Tangga',
        solution: 'Memetakan potensi konflik, trauma lama & tanda bahaya relasi',
        benefit: 'Fondasi rumah tangga diperbaiki sebelum terlalu dalam retak',
      },
      {
        problem: 'Nikah tapi merasa sendiri dan hampa',
        product: 'Nikah Tapi Sepi: Hampa Emosional',
        solution: 'Menemukan penyebab hilangnya koneksi & cara membangun kembali',
        benefit: 'Rumah kembali jadi tempat bernaung, bukan tempat bersembunyi',
      },
      {
        problem: 'Single, HTS, takut ditolak & tidak yakin diri',
        product: 'Single & Tidak Happy Assessment',
        solution: 'Memahami pola relasi & mengatasi hambatan emosional',
        benefit: 'Siap membuka hati dengan berani & batasan yang sehat',
      },
    ],
  },
  {
    id: 'professional',
    title: 'Karir & Bisnis',
    subtitle: 'Professional Path',
    icon: Briefcase,
    theme: 'bg-white text-amber-600 border-amber-100',
    accent: 'text-amber-500',
    gradient: 'from-amber-500/20 to-amber-700/20',
    items: [
      {
        problem: 'Burnout kronis tapi takut resign',
        product: 'Career Psychological Assessment',
        solution: 'Keputusan karir lebih matang berdasarkan psikologi diri',
        benefit: 'Tidak lagi terjebak di jalur yang salah karena takut berubah',
      },
      {
        problem: 'Bingung langkah karir berikutnya',
        product: 'IQ, Bakat Minat & Perencanaan Karir (Full)',
        solution: 'Peta lengkap potensi kognitif + arah karir yang presisi',
        benefit: 'Langkah karir lebih terarah, bukan coba-coba',
      },
      {
        problem: 'Stres membangun atau mengelola bisnis',
        product: 'Entrepreneur Mental Clarity Session',
        solution: 'Mental clarity dalam keputusan-keputusan besar bisnis',
        benefit: 'Bisnis berkembang tanpa mengorbankan kesehatan mental',
      },
      {
        problem: 'Siap naik jabatan tapi butuh validasi objektif',
        product: 'Leadership Competency Assessment',
        solution: 'Peta kekuatan leadership + Individual Development Plan',
        benefit: 'Promosi yang tepat sasaran dengan data, bukan asumsi',
      },
    ],
  },
]
