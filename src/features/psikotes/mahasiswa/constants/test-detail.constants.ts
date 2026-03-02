export const HEADING_COLORS = {
  teal: 'bg-primary-500',
  amber: 'bg-accent-500',
  sky: 'bg-sky-500',
}

export type HeadingColor =
  keyof typeof HEADING_COLORS

export const FAQ_ITEMS = [
  {
    q: 'Berapa lama waktu yang diperlukan'
      + ' untuk menyelesaikan tes ini?',
    a: 'Durasi tes bervariasi tergantung'
      + ' jenis tes, umumnya berkisar antara'
      + ' 10-45 menit. Anda dapat melihat'
      + ' estimasi waktu di bagian atas.',
  },
  {
    q: 'Apakah hasil tes bisa digunakan'
      + ' untuk keperluan akademik?',
    a: 'Ya, hasil tes kami telah tervalidasi'
      + ' secara ilmiah dan dapat digunakan'
      + ' sebagai referensi untuk keperluan'
      + ' akademik maupun profesional.',
  },
  {
    q: 'Dapatkah saya mengulang tes'
      + ' setelah selesai?',
    a: 'Anda dapat mengulang tes kapan saja'
      + ' dengan melakukan pembelian ulang.'
      + ' Hasil sebelumnya tetap tersimpan'
      + ' di akun Anda.',
  },
]
