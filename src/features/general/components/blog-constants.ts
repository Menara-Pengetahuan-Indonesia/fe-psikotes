export interface BlogPost {
  title: string
  category: string
  excerpt: string
  date: string
  author: string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    title: '5 Tanda Kamu Butuh Konseling Profesional',
    category: 'Kesehatan Mental',
    excerpt:
      'Mengenali tanda-tanda bahwa sudah'
      + ' waktunya mencari bantuan profesional...',
    date: '15 Jan 2026',
    author: 'Dr. Sarah Putri',
  },
  {
    title: 'Cara Mengelola Stres di Tempat Kerja',
    category: 'Karir',
    excerpt:
      'Tips praktis untuk menjaga kesehatan'
      + ' mental di lingkungan kerja kompetitif...',
    date: '12 Jan 2026',
    author: 'Andi Pratama, M.Psi',
  },
  {
    title: 'Memahami Hasil Psikotes: Panduan Lengkap',
    category: 'Psikologi',
    excerpt:
      'Pelajari cara membaca dan memahami'
      + ' hasil tes psikologi Anda...',
    date: '10 Jan 2026',
    author: 'Dr. Budi Santoso',
  },
  {
    title: 'Menemukan Passion: Langkah Awal Karir',
    category: 'Tips',
    excerpt:
      'Panduan langkah demi langkah untuk'
      + ' menemukan minat dan bakat sejatimu...',
    date: '8 Jan 2026',
    author: 'Rina Wijaya, M.Psi',
  },
  {
    title: 'Kesehatan Mental bagi Mahasiswa',
    category: 'Edukasi',
    excerpt:
      'Mengapa mahasiswa perlu memperhatikan'
      + ' kesehatan mental mereka...',
    date: '5 Jan 2026',
    author: 'Dr. Sarah Putri',
  },
  {
    title: 'Work-Life Balance: Mitos atau Kenyataan?',
    category: 'Lifestyle',
    excerpt:
      'Memahami konsep keseimbangan hidup dan'
      + ' bagaimana mencapainya...',
    date: '2 Jan 2026',
    author: 'Andi Pratama, M.Psi',
  },
]
