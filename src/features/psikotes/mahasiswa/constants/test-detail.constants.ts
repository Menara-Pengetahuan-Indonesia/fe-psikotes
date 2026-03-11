export const HEADING_COLORS = {
  teal: 'bg-primary-500',
  amber: 'bg-accent-500',
  sky: 'bg-sky-500',
}

export type HeadingColor =
  keyof typeof HEADING_COLORS

export const FAQ_ITEMS = [
  {
    q: 'Apakah saya akan mendapatkan'
      + ' laporan hasil setelah'
      + ' menyelesaikan tes?',
    a: 'Ya. Setelah tes selesai, kamu'
      + ' akan mendapatkan laporan hasil'
      + ' yang berisi insight tentang'
      + ' potensi, kemampuan, dan'
      + ' rekomendasi pengembangan diri.',
  },
  {
    q: 'Berapa lama waktu yang'
      + ' dibutuhkan untuk menyelesaikan'
      + ' tes?',
    a: 'Durasi setiap tes berbeda, namun'
      + ' sebagian besar dapat diselesaikan'
      + ' dalam waktu sekitar 20–30 menit.',
  },
  {
    q: 'Seberapa akurat hasil tes ini?',
    a: 'Tes yang tersedia disusun'
      + ' berdasarkan pendekatan psikologi'
      + ' dan dirancang untuk memberikan'
      + ' gambaran yang membantu kamu'
      + ' memahami potensi, kemampuan,'
      + ' dan arah pengembangan diri.',
  },
]
