// -----------------------------------------------------------
// Dummy questions per test slug — 5 questions each.
// Will be replaced by real questions from the backend later.
// -----------------------------------------------------------

export interface Question {
  id: number
  question: string
  options: { label: string; text: string }[]
}

export const QUESTIONS_MAP: Record<string, Question[]> = {
  // =================================================================
  // GRATIS (8 tests)
  // =================================================================

  'tes-kepribadian-mbti': [
    {
      id: 1,
      question:
        'Setelah acara sosial yang ramai, apa yang biasanya kamu rasakan?',
      options: [
        { label: 'A', text: 'Merasa berenergi dan ingin lanjut bersosialisasi' },
        { label: 'B', text: 'Merasa perlu waktu sendiri untuk mengisi ulang energi' },
      ],
    },
    {
      id: 2,
      question:
        'Saat mengambil keputusan penting, apa yang lebih kamu andalkan?',
      options: [
        { label: 'A', text: 'Fakta dan data yang konkret' },
        { label: 'B', text: 'Intuisi dan firasat pribadi' },
      ],
    },
    {
      id: 3,
      question:
        'Bagaimana caramu merencanakan liburan?',
      options: [
        { label: 'A', text: 'Membuat itinerary detail jauh-jauh hari' },
        { label: 'B', text: 'Biarkan mengalir, lihat situasi di sana' },
      ],
    },
    {
      id: 4,
      question:
        'Saat ada konflik, kamu cenderung...',
      options: [
        { label: 'A', text: 'Menganalisis masalah secara logis dan objektif' },
        { label: 'B', text: 'Mempertimbangkan perasaan semua pihak terlebih dahulu' },
      ],
    },
    {
      id: 5,
      question:
        'Mana yang lebih menggambarkan dirimu?',
      options: [
        { label: 'A', text: 'Senang berbicara dan berdiskusi dengan orang baru' },
        { label: 'B', text: 'Lebih suka mengamati dan mendengarkan terlebih dahulu' },
      ],
    },
  ],

  'tes-gaya-belajar': [
    {
      id: 1,
      question:
        'Saat belajar materi baru, cara apa yang paling efektif untukmu?',
      options: [
        { label: 'A', text: 'Membaca buku atau melihat diagram' },
        { label: 'B', text: 'Mendengarkan penjelasan atau diskusi' },
      ],
    },
    {
      id: 2,
      question:
        'Saat mengingat sebuah pengalaman, apa yang paling kamu ingat?',
      options: [
        { label: 'A', text: 'Gambar, warna, dan pemandangan yang dilihat' },
        { label: 'B', text: 'Suara, musik, atau percakapan yang terjadi' },
      ],
    },
    {
      id: 3,
      question:
        'Saat menjelaskan sesuatu kepada orang lain, kamu cenderung...',
      options: [
        { label: 'A', text: 'Menggambar atau membuat sketsa' },
        { label: 'B', text: 'Langsung mempraktikkan atau mendemonstrasikan' },
      ],
    },
    {
      id: 4,
      question:
        'Di waktu senggang, aktivitas apa yang lebih kamu nikmati?',
      options: [
        { label: 'A', text: 'Menonton video atau membaca artikel' },
        { label: 'B', text: 'Mendengarkan podcast atau musik' },
      ],
    },
    {
      id: 5,
      question:
        'Saat menghadapi instruksi baru, kamu lebih suka...',
      options: [
        { label: 'A', text: 'Melihat panduan tertulis atau visual step-by-step' },
        { label: 'B', text: 'Langsung mencoba dan belajar dari pengalaman' },
      ],
    },
  ],

  'tes-kecerdasan-emosional': [
    {
      id: 1,
      question:
        'Saat kamu merasa sangat marah, apa yang biasanya kamu lakukan?',
      options: [
        { label: 'A', text: 'Menenangkan diri sebelum merespons' },
        { label: 'B', text: 'Langsung mengekspresikan kemarahan' },
      ],
    },
    {
      id: 2,
      question:
        'Seberapa mudah kamu mengenali emosi orang lain dari ekspresi wajahnya?',
      options: [
        { label: 'A', text: 'Sangat mudah, aku peka terhadap perubahan ekspresi' },
        { label: 'B', text: 'Agak sulit, aku perlu petunjuk verbal' },
      ],
    },
    {
      id: 3,
      question:
        'Saat teman curhat tentang masalahnya, respons pertamamu adalah...',
      options: [
        { label: 'A', text: 'Mendengarkan dengan empati tanpa menghakimi' },
        { label: 'B', text: 'Langsung memberikan solusi dan saran' },
      ],
    },
    {
      id: 4,
      question:
        'Bagaimana kamu menghadapi kritik dari orang lain?',
      options: [
        { label: 'A', text: 'Menerima dan mengevaluasi isi kritiknya' },
        { label: 'B', text: 'Merasa sakit hati dan defensif' },
      ],
    },
    {
      id: 5,
      question:
        'Saat bekerja dalam tim, kamu cenderung...',
      options: [
        { label: 'A', text: 'Memperhatikan dinamika emosional kelompok' },
        { label: 'B', text: 'Fokus pada tugas dan target yang harus dicapai' },
      ],
    },
  ],

  'tes-minat-karir': [
    {
      id: 1,
      question:
        'Lingkungan kerja seperti apa yang paling kamu sukai?',
      options: [
        { label: 'A', text: 'Kantor terstruktur dengan jadwal jelas' },
        { label: 'B', text: 'Lingkungan fleksibel dan kreatif' },
      ],
    },
    {
      id: 2,
      question:
        'Aktivitas mana yang lebih menarik minatmu?',
      options: [
        { label: 'A', text: 'Menganalisis data dan membuat laporan' },
        { label: 'B', text: 'Berinteraksi dan membantu orang lain' },
      ],
    },
    {
      id: 3,
      question:
        'Apa yang lebih penting dalam pekerjaanmu?',
      options: [
        { label: 'A', text: 'Gaji tinggi dan stabilitas finansial' },
        { label: 'B', text: 'Passion dan kepuasan pribadi' },
      ],
    },
    {
      id: 4,
      question:
        'Saat mengerjakan proyek, kamu lebih suka...',
      options: [
        { label: 'A', text: 'Bekerja mandiri dengan tanggung jawab penuh' },
        { label: 'B', text: 'Berkolaborasi dalam tim yang solid' },
      ],
    },
    {
      id: 5,
      question:
        'Bidang mana yang lebih menarik perhatianmu?',
      options: [
        { label: 'A', text: 'Teknologi, sains, atau engineering' },
        { label: 'B', text: 'Seni, komunikasi, atau sosial' },
      ],
    },
  ],

  'tes-love-language': [
    {
      id: 1,
      question:
        'Apa yang membuatmu merasa paling dicintai?',
      options: [
        { label: 'A', text: 'Mendengar kata-kata sayang dan pujian tulus' },
        { label: 'B', text: 'Menerima hadiah yang penuh perhatian' },
      ],
    },
    {
      id: 2,
      question:
        'Cara mana yang paling sering kamu gunakan untuk menunjukkan kasih sayang?',
      options: [
        { label: 'A', text: 'Memeluk, menggandeng, atau sentuhan fisik' },
        { label: 'B', text: 'Meluangkan waktu berkualitas berdua' },
      ],
    },
    {
      id: 3,
      question:
        'Saat pasanganmu sedang sibuk, kamu merasa paling dihargai ketika...',
      options: [
        { label: 'A', text: 'Dia tetap mengirim pesan manis di sela kesibukannya' },
        { label: 'B', text: 'Dia membantu menyelesaikan tugasmu tanpa diminta' },
      ],
    },
    {
      id: 4,
      question:
        'Hadiah ulang tahun ideal menurutmu adalah...',
      options: [
        { label: 'A', text: 'Surat cinta yang ditulis tangan' },
        { label: 'B', text: 'Liburan berdua ke tempat spesial' },
      ],
    },
    {
      id: 5,
      question:
        'Apa yang paling membuatmu kecewa dalam hubungan?',
      options: [
        { label: 'A', text: 'Pasangan tidak pernah memuji atau mengapresiasi' },
        { label: 'B', text: 'Pasangan tidak meluangkan waktu bersama' },
      ],
    },
  ],

  'tes-stress-level': [
    {
      id: 1,
      question:
        'Seberapa sering kamu merasa kewalahan dalam sebulan terakhir?',
      options: [
        { label: 'A', text: 'Jarang atau tidak pernah' },
        { label: 'B', text: 'Cukup sering hingga hampir setiap hari' },
      ],
    },
    {
      id: 2,
      question:
        'Bagaimana kualitas tidurmu akhir-akhir ini?',
      options: [
        { label: 'A', text: 'Tidur nyenyak dan cukup setiap malam' },
        { label: 'B', text: 'Sering terbangun atau sulit tidur' },
      ],
    },
    {
      id: 3,
      question:
        'Saat menghadapi tekanan, respons fisikmu biasanya...',
      options: [
        { label: 'A', text: 'Tetap tenang dan terkendali' },
        { label: 'B', text: 'Sakit kepala, tegang otot, atau gangguan pencernaan' },
      ],
    },
    {
      id: 4,
      question:
        'Apakah kamu masih bisa menikmati hobi atau aktivitas favorit?',
      options: [
        { label: 'A', text: 'Ya, masih menikmati seperti biasa' },
        { label: 'B', text: 'Sudah kehilangan minat pada banyak hal' },
      ],
    },
    {
      id: 5,
      question:
        'Bagaimana caramu mengatasi stres?',
      options: [
        { label: 'A', text: 'Olahraga, meditasi, atau kegiatan positif lainnya' },
        { label: 'B', text: 'Menarik diri, makan berlebih, atau menghindari masalah' },
      ],
    },
  ],

  'tes-burnout-kerja': [
    {
      id: 1,
      question:
        'Bagaimana perasaanmu saat bangun pagi untuk bekerja?',
      options: [
        { label: 'A', text: 'Cukup bersemangat atau netral' },
        { label: 'B', text: 'Sangat enggan dan merasa lelah meskipun sudah tidur' },
      ],
    },
    {
      id: 2,
      question:
        'Apakah kamu merasa pekerjaanmu saat ini bermakna?',
      options: [
        { label: 'A', text: 'Ya, aku merasa berkontribusi dan dihargai' },
        { label: 'B', text: 'Tidak, rasanya seperti melakukan hal yang sia-sia' },
      ],
    },
    {
      id: 3,
      question:
        'Seberapa sering kamu merasa frustrasi terhadap rekan kerja atau atasan?',
      options: [
        { label: 'A', text: 'Sesekali, tapi masih bisa ditoleransi' },
        { label: 'B', text: 'Hampir setiap hari, membuatku sangat terganggu' },
      ],
    },
    {
      id: 4,
      question:
        'Apakah kamu masih produktif di tempat kerja?',
      options: [
        { label: 'A', text: 'Ya, performaku masih stabil atau meningkat' },
        { label: 'B', text: 'Menurun drastis, sulit fokus dan konsentrasi' },
      ],
    },
    {
      id: 5,
      question:
        'Bagaimana hubungan pekerjaan dengan kehidupan pribadimu?',
      options: [
        { label: 'A', text: 'Masih seimbang, bisa memisahkan keduanya' },
        { label: 'B', text: 'Pekerjaan sudah mengganggu waktu pribadi dan keluarga' },
      ],
    },
  ],

  'tes-kecocokan-pasangan': [
    {
      id: 1,
      question:
        'Bagaimana kamu dan pasangan menyelesaikan perbedaan pendapat?',
      options: [
        { label: 'A', text: 'Diskusi terbuka dan mencari solusi bersama' },
        { label: 'B', text: 'Salah satu atau keduanya cenderung menghindar' },
      ],
    },
    {
      id: 2,
      question:
        'Seberapa sering kamu dan pasangan membicarakan masa depan?',
      options: [
        { label: 'A', text: 'Sering, kami punya visi yang sejalan' },
        { label: 'B', text: 'Jarang, kami hidup di saat ini saja' },
      ],
    },
    {
      id: 3,
      question:
        'Saat pasanganmu berhasil meraih sesuatu, reaksimu...',
      options: [
        { label: 'A', text: 'Sangat bahagia dan bangga padanya' },
        { label: 'B', text: 'Biasa saja atau terkadang merasa iri' },
      ],
    },
    {
      id: 4,
      question:
        'Bagaimana kalian mengelola keuangan bersama?',
      options: [
        { label: 'A', text: 'Terbuka dan ada kesepakatan yang jelas' },
        { label: 'B', text: 'Masing-masing dan jarang membahasnya' },
      ],
    },
    {
      id: 5,
      question:
        'Apa yang paling penting dalam hubunganmu?',
      options: [
        { label: 'A', text: 'Kepercayaan dan komunikasi yang jujur' },
        { label: 'B', text: 'Ketertarikan fisik dan chemistry' },
      ],
    },
  ],

  // =================================================================
  // PREMIUM (8 tests)
  // =================================================================

  'tes-iq-profesional': [
    {
      id: 1,
      question:
        'Jika 3 kucing menangkap 3 tikus dalam 3 menit, berapa kucing yang dibutuhkan untuk menangkap 100 tikus dalam 100 menit?',
      options: [
        { label: 'A', text: '3 kucing' },
        { label: 'B', text: '100 kucing' },
      ],
    },
    {
      id: 2,
      question:
        'Lanjutkan deret angka berikut: 2, 6, 12, 20, 30, ...',
      options: [
        { label: 'A', text: '42' },
        { label: 'B', text: '40' },
      ],
    },
    {
      id: 3,
      question:
        'Kata mana yang TIDAK sekelompok dengan yang lain?',
      options: [
        { label: 'A', text: 'Apel, Mangga, Wortel, Jeruk' },
        { label: 'B', text: 'Wortel — karena bukan buah' },
      ],
    },
    {
      id: 4,
      question:
        'BESAR terhadap KECIL sama seperti TINGGI terhadap ...',
      options: [
        { label: 'A', text: 'Rendah' },
        { label: 'B', text: 'Panjang' },
      ],
    },
    {
      id: 5,
      question:
        'Jika semua Blip adalah Blop, dan sebagian Blop adalah Blup, manakah yang pasti benar?',
      options: [
        { label: 'A', text: 'Sebagian Blip mungkin adalah Blup' },
        { label: 'B', text: 'Semua Blip pasti adalah Blup' },
      ],
    },
  ],

  'minat-bakat-komprehensif': [
    {
      id: 1,
      question:
        'Aktivitas mana yang paling membuatmu bersemangat?',
      options: [
        { label: 'A', text: 'Memecahkan masalah teknis atau teka-teki' },
        { label: 'B', text: 'Membuat karya seni, menulis, atau bermusik' },
      ],
    },
    {
      id: 2,
      question:
        'Di sekolah/kampus, mata pelajaran mana yang paling kamu nikmati?',
      options: [
        { label: 'A', text: 'Matematika, fisika, atau ilmu komputer' },
        { label: 'B', text: 'Bahasa, sejarah, atau ilmu sosial' },
      ],
    },
    {
      id: 3,
      question:
        'Bagaimana kamu menghabiskan waktu luang produktif?',
      options: [
        { label: 'A', text: 'Belajar skill baru atau membaca buku non-fiksi' },
        { label: 'B', text: 'Berorganisasi atau kegiatan sosial' },
      ],
    },
    {
      id: 4,
      question:
        'Peran apa yang biasanya kamu ambil dalam proyek kelompok?',
      options: [
        { label: 'A', text: 'Perencana dan analis yang menyusun strategi' },
        { label: 'B', text: 'Komunikator yang mengoordinasi dan memotivasi tim' },
      ],
    },
    {
      id: 5,
      question:
        'Mana yang lebih menggambarkan kekuatanmu?',
      options: [
        { label: 'A', text: 'Berpikir logis, detail, dan sistematis' },
        { label: 'B', text: 'Kreatif, empatik, dan komunikatif' },
      ],
    },
  ],

  'tes-kesehatan-mental-lengkap': [
    {
      id: 1,
      question:
        'Dalam 2 minggu terakhir, seberapa sering kamu merasa sedih atau putus asa?',
      options: [
        { label: 'A', text: 'Tidak pernah atau jarang' },
        { label: 'B', text: 'Lebih dari setengah hari atau hampir setiap hari' },
      ],
    },
    {
      id: 2,
      question:
        'Apakah kamu merasa cemas atau khawatir berlebihan tanpa alasan jelas?',
      options: [
        { label: 'A', text: 'Tidak, kecemasanku masih wajar' },
        { label: 'B', text: 'Ya, sering merasa cemas tanpa sebab yang jelas' },
      ],
    },
    {
      id: 3,
      question:
        'Bagaimana nafsu makanmu akhir-akhir ini?',
      options: [
        { label: 'A', text: 'Normal dan stabil' },
        { label: 'B', text: 'Berubah drastis (sangat berkurang atau berlebihan)' },
      ],
    },
    {
      id: 4,
      question:
        'Apakah kamu mengalami kesulitan berkonsentrasi?',
      options: [
        { label: 'A', text: 'Tidak, konsentrasiku baik-baik saja' },
        { label: 'B', text: 'Ya, sangat sulit fokus pada tugas sehari-hari' },
      ],
    },
    {
      id: 5,
      question:
        'Apakah kamu masih merasa tertarik pada aktivitas yang dulu kamu nikmati?',
      options: [
        { label: 'A', text: 'Ya, masih menikmatinya' },
        { label: 'B', text: 'Tidak, sudah kehilangan minat pada banyak hal' },
      ],
    },
  ],

  'mmpi-2-screening': [
    {
      id: 1,
      question:
        'Apakah kamu merasa orang lain sering tidak memahami dirimu?',
      options: [
        { label: 'A', text: 'Tidak, aku merasa cukup dipahami' },
        { label: 'B', text: 'Ya, sering merasa tidak dipahami' },
      ],
    },
    {
      id: 2,
      question:
        'Apakah kamu mudah bergaul dengan orang baru?',
      options: [
        { label: 'A', text: 'Ya, aku cukup terbuka dan ramah' },
        { label: 'B', text: 'Tidak, aku cenderung pemalu dan waspada' },
      ],
    },
    {
      id: 3,
      question:
        'Seberapa sering kamu merasa cemas tanpa alasan yang jelas?',
      options: [
        { label: 'A', text: 'Sangat jarang atau tidak pernah' },
        { label: 'B', text: 'Cukup sering' },
      ],
    },
    {
      id: 4,
      question:
        'Apakah kamu merasa nyaman dengan dirimu sendiri secara umum?',
      options: [
        { label: 'A', text: 'Ya, aku menerima diri apa adanya' },
        { label: 'B', text: 'Sering merasa tidak puas dengan diri sendiri' },
      ],
    },
    {
      id: 5,
      question:
        'Bagaimana kamu merespons situasi yang menekan?',
      options: [
        { label: 'A', text: 'Tetap tenang dan mencari solusi' },
        { label: 'B', text: 'Mudah panik atau emosional' },
      ],
    },
  ],

  'leadership-style-analysis': [
    {
      id: 1,
      question:
        'Saat tim menghadapi masalah, pendekatan kepemimpinanmu adalah...',
      options: [
        { label: 'A', text: 'Mengambil keputusan cepat dan memberi arahan tegas' },
        { label: 'B', text: 'Mengajak diskusi tim untuk mencari solusi bersama' },
      ],
    },
    {
      id: 2,
      question:
        'Bagaimana caramu memotivasi anggota tim?',
      options: [
        { label: 'A', text: 'Menetapkan target jelas dan memberi reward' },
        { label: 'B', text: 'Memberi inspirasi melalui visi dan nilai bersama' },
      ],
    },
    {
      id: 3,
      question:
        'Saat mendelegasikan tugas, kamu cenderung...',
      options: [
        { label: 'A', text: 'Memberi instruksi detail dan memantau progres' },
        { label: 'B', text: 'Memberi kepercayaan penuh dan hanya cek hasil akhir' },
      ],
    },
    {
      id: 4,
      question:
        'Apa yang kamu prioritaskan sebagai pemimpin?',
      options: [
        { label: 'A', text: 'Pencapaian target dan efisiensi' },
        { label: 'B', text: 'Kesejahteraan dan pengembangan anggota tim' },
      ],
    },
    {
      id: 5,
      question:
        'Saat ada anggota tim yang underperform, responmu...',
      options: [
        { label: 'A', text: 'Memberi feedback langsung dan rencana perbaikan' },
        { label: 'B', text: 'Mencari tahu akar masalah dan memberi dukungan' },
      ],
    },
  ],

  'tes-kesiapan-nikah': [
    {
      id: 1,
      question:
        'Apakah kamu dan pasangan sudah membicarakan rencana keuangan setelah menikah?',
      options: [
        { label: 'A', text: 'Ya, kami sudah punya rencana yang jelas' },
        { label: 'B', text: 'Belum, kami belum membahas secara serius' },
      ],
    },
    {
      id: 2,
      question:
        'Bagaimana pandanganmu tentang pembagian peran dalam rumah tangga?',
      options: [
        { label: 'A', text: 'Fleksibel dan bisa dinegosiasi bersama' },
        { label: 'B', text: 'Ada peran tetap yang sudah pasti' },
      ],
    },
    {
      id: 3,
      question:
        'Apakah kamu sudah membicarakan tentang memiliki anak?',
      options: [
        { label: 'A', text: 'Ya, kami sepakat tentang rencana keluarga' },
        { label: 'B', text: 'Belum, atau kami punya pandangan berbeda' },
      ],
    },
    {
      id: 4,
      question:
        'Bagaimana kamu menilai kesiapan emosionalmu untuk berkomitmen?',
      options: [
        { label: 'A', text: 'Siap — aku sudah matang dan stabil secara emosional' },
        { label: 'B', text: 'Masih ragu — ada hal yang perlu aku perbaiki dulu' },
      ],
    },
    {
      id: 5,
      question:
        'Saat ada perbedaan kebiasaan sehari-hari, kamu akan...',
      options: [
        { label: 'A', text: 'Saling menyesuaikan dan berkompromi' },
        { label: 'B', text: 'Berharap pasangan yang menyesuaikan' },
      ],
    },
  ],

  'tes-potensi-akademik-tpa': [
    {
      id: 1,
      question:
        'Jika BUKU : MEMBACA = PIANO : ...',
      options: [
        { label: 'A', text: 'Memainkan' },
        { label: 'B', text: 'Mendengar' },
      ],
    },
    {
      id: 2,
      question:
        'Lanjutkan deret: A, C, F, J, O, ...',
      options: [
        { label: 'A', text: 'U' },
        { label: 'B', text: 'T' },
      ],
    },
    {
      id: 3,
      question:
        'Jika harga barang naik 20% lalu didiskon 20%, berapa perubahan harga sebenarnya?',
      options: [
        { label: 'A', text: 'Kembali ke harga semula' },
        { label: 'B', text: 'Turun 4% dari harga awal' },
      ],
    },
    {
      id: 4,
      question:
        'Sinonim dari kata "PARADOKS" adalah...',
      options: [
        { label: 'A', text: 'Kontradiksi' },
        { label: 'B', text: 'Paradigma' },
      ],
    },
    {
      id: 5,
      question:
        'Semua mahasiswa rajin. Budi adalah mahasiswa. Kesimpulannya...',
      options: [
        { label: 'A', text: 'Budi rajin' },
        { label: 'B', text: 'Budi mungkin rajin' },
      ],
    },
  ],

  'full-personality-profile': [
    {
      id: 1,
      question:
        'Seberapa terbuka kamu terhadap pengalaman dan ide baru?',
      options: [
        { label: 'A', text: 'Sangat terbuka — aku senang mencoba hal baru' },
        { label: 'B', text: 'Lebih suka zona nyaman dan rutinitas' },
      ],
    },
    {
      id: 2,
      question:
        'Bagaimana kamu mengatur pekerjaan sehari-hari?',
      options: [
        { label: 'A', text: 'Sangat terorganisir dengan to-do list dan jadwal' },
        { label: 'B', text: 'Mengalir saja sesuai mood dan situasi' },
      ],
    },
    {
      id: 3,
      question:
        'Saat bertemu orang baru di pesta, kamu biasanya...',
      options: [
        { label: 'A', text: 'Mudah memulai percakapan dan berkenalan' },
        { label: 'B', text: 'Menunggu disapa atau tetap dengan orang yang dikenal' },
      ],
    },
    {
      id: 4,
      question:
        'Seberapa mudah kamu terpengaruh oleh emosi orang di sekitarmu?',
      options: [
        { label: 'A', text: 'Sangat mudah — aku ikut merasakan emosi mereka' },
        { label: 'B', text: 'Tidak terlalu — aku bisa menjaga batas emosional' },
      ],
    },
    {
      id: 5,
      question:
        'Dalam menghadapi tekanan, kamu cenderung...',
      options: [
        { label: 'A', text: 'Tetap tenang dan optimis' },
        { label: 'B', text: 'Mudah merasa gelisah dan khawatir' },
      ],
    },
  ],

  // =================================================================
  // MAHASISWA (4 tests)
  // =================================================================

  'minat-bakat': [
    {
      id: 1,
      question:
        'Jurusan kuliah seperti apa yang paling menarik bagimu?',
      options: [
        { label: 'A', text: 'Sains, teknik, atau teknologi informasi' },
        { label: 'B', text: 'Sastra, seni, atau ilmu komunikasi' },
      ],
    },
    {
      id: 2,
      question:
        'Saat mengerjakan tugas, kamu lebih menikmati...',
      options: [
        { label: 'A', text: 'Riset mendalam dan analisis data' },
        { label: 'B', text: 'Presentasi kreatif dan storytelling' },
      ],
    },
    {
      id: 3,
      question:
        'Aktivitas ekstrakurikuler yang menarik minatmu...',
      options: [
        { label: 'A', text: 'Olimpiade sains atau lomba debat' },
        { label: 'B', text: 'Teater, musik, atau organisasi sosial' },
      ],
    },
    {
      id: 4,
      question:
        'Karir impianmu lebih condong ke...',
      options: [
        { label: 'A', text: 'Profesional (dokter, insinyur, programmer)' },
        { label: 'B', text: 'Kreatif (desainer, penulis, filmmaker)' },
      ],
    },
    {
      id: 5,
      question:
        'Apa yang kamu utamakan saat memilih jurusan?',
      options: [
        { label: 'A', text: 'Prospek kerja dan gaji di masa depan' },
        { label: 'B', text: 'Kecocokan dengan passion dan minat pribadi' },
      ],
    },
  ],

  'intelegensi': [
    {
      id: 1,
      question:
        'Lanjutkan pola berikut: 1, 1, 2, 3, 5, 8, ...',
      options: [
        { label: 'A', text: '13' },
        { label: 'B', text: '11' },
      ],
    },
    {
      id: 2,
      question:
        'DOKTER : PASIEN = GURU : ...',
      options: [
        { label: 'A', text: 'Murid' },
        { label: 'B', text: 'Sekolah' },
      ],
    },
    {
      id: 3,
      question:
        'Jika A > B, B > C, dan C > D, maka manakah yang pasti benar?',
      options: [
        { label: 'A', text: 'A > D' },
        { label: 'B', text: 'D > A' },
      ],
    },
    {
      id: 4,
      question:
        'Manakah kata yang TIDAK termasuk dalam kelompok yang sama?',
      options: [
        { label: 'A', text: 'Meja — karena bukan alat tulis' },
        { label: 'B', text: 'Pensil — karena bukan furnitur' },
      ],
    },
    {
      id: 5,
      question:
        'Berapa hasil dari 15% × 200?',
      options: [
        { label: 'A', text: '30' },
        { label: 'B', text: '25' },
      ],
    },
  ],

  'try-out': [
    {
      id: 1,
      question:
        'Siapakah proklamator kemerdekaan Indonesia?',
      options: [
        { label: 'A', text: 'Soekarno dan Mohammad Hatta' },
        { label: 'B', text: 'Soekarno dan Soeharto' },
      ],
    },
    {
      id: 2,
      question:
        'Unsur kimia dengan simbol "Fe" adalah...',
      options: [
        { label: 'A', text: 'Besi (Ferrum)' },
        { label: 'B', text: 'Fluor' },
      ],
    },
    {
      id: 3,
      question:
        'Nilai dari sin(90°) adalah...',
      options: [
        { label: 'A', text: '1' },
        { label: 'B', text: '0' },
      ],
    },
    {
      id: 4,
      question:
        'Bahasa Inggris dari "Kesepakatan bersama" yang tepat adalah...',
      options: [
        { label: 'A', text: 'Mutual agreement' },
        { label: 'B', text: 'Common decision' },
      ],
    },
    {
      id: 5,
      question:
        'Planet terbesar di tata surya kita adalah...',
      options: [
        { label: 'A', text: 'Jupiter' },
        { label: 'B', text: 'Saturnus' },
      ],
    },
  ],

  'cpns': [
    {
      id: 1,
      question:
        'Pancasila ditetapkan sebagai dasar negara pada tanggal...',
      options: [
        { label: 'A', text: '18 Agustus 1945' },
        { label: 'B', text: '1 Juni 1945' },
      ],
    },
    {
      id: 2,
      question:
        'Seorang ASN mendapati rekan kerjanya melakukan korupsi kecil. Sikap yang tepat adalah...',
      options: [
        { label: 'A', text: 'Melaporkan melalui jalur resmi yang tersedia' },
        { label: 'B', text: 'Diam saja karena tidak ingin mencari masalah' },
      ],
    },
    {
      id: 3,
      question:
        'Jika semua PNS wajib ikut upacara, dan Andi adalah PNS, maka...',
      options: [
        { label: 'A', text: 'Andi wajib ikut upacara' },
        { label: 'B', text: 'Andi boleh tidak ikut upacara' },
      ],
    },
    {
      id: 4,
      question:
        'UUD 1945 telah diamandemen sebanyak...',
      options: [
        { label: 'A', text: '4 kali' },
        { label: 'B', text: '3 kali' },
      ],
    },
    {
      id: 5,
      question:
        'Saat menghadapi warga yang komplain soal pelayanan, sikap yang tepat sebagai ASN adalah...',
      options: [
        { label: 'A', text: 'Mendengarkan keluhan dengan sabar dan mencari solusi' },
        { label: 'B', text: 'Mengarahkan ke bagian lain karena bukan tanggung jawabmu' },
      ],
    },
  ],

  // =================================================================
  // KESEHATAN MENTAL (3 tests)
  // =================================================================

  'kepribadian': [
    {
      id: 1,
      question:
        'Bagaimana caramu merespons perubahan mendadak dalam rencana?',
      options: [
        { label: 'A', text: 'Mudah beradaptasi dan fleksibel' },
        { label: 'B', text: 'Merasa stres dan butuh waktu untuk menyesuaikan' },
      ],
    },
    {
      id: 2,
      question:
        'Saat membuat keputusan, kamu lebih mengandalkan...',
      options: [
        { label: 'A', text: 'Logika dan pertimbangan rasional' },
        { label: 'B', text: 'Perasaan dan nilai-nilai pribadi' },
      ],
    },
    {
      id: 3,
      question:
        'Di lingkungan sosial, kamu biasanya...',
      options: [
        { label: 'A', text: 'Menjadi pusat perhatian dan penggerak suasana' },
        { label: 'B', text: 'Pengamat yang tenang dan pendengar yang baik' },
      ],
    },
    {
      id: 4,
      question:
        'Bagaimana kamu menangani tekanan emosional?',
      options: [
        { label: 'A', text: 'Mencari dukungan dari orang terdekat' },
        { label: 'B', text: 'Memproses sendiri secara internal' },
      ],
    },
    {
      id: 5,
      question:
        'Apa yang lebih membuatmu puas?',
      options: [
        { label: 'A', text: 'Menyelesaikan tugas dengan sempurna dan tepat waktu' },
        { label: 'B', text: 'Mengeksplorasi ide-ide baru tanpa batasan waktu' },
      ],
    },
  ],

  'mental-health': [
    {
      id: 1,
      question:
        'Dalam 2 minggu terakhir, seberapa sering kamu merasa tidak bersemangat?',
      options: [
        { label: 'A', text: 'Hampir tidak pernah' },
        { label: 'B', text: 'Lebih dari setengah hari atau setiap hari' },
      ],
    },
    {
      id: 2,
      question:
        'Apakah kamu merasa kesulitan untuk rileks atau tenang?',
      options: [
        { label: 'A', text: 'Tidak, aku bisa rileks dengan baik' },
        { label: 'B', text: 'Ya, sering merasa tegang dan gelisah' },
      ],
    },
    {
      id: 3,
      question:
        'Bagaimana pola tidurmu akhir-akhir ini?',
      options: [
        { label: 'A', text: 'Teratur dan merasa cukup istirahat' },
        { label: 'B', text: 'Tidak teratur — insomnia atau tidur berlebihan' },
      ],
    },
    {
      id: 4,
      question:
        'Apakah kamu sering merasa bersalah atau tidak berguna?',
      options: [
        { label: 'A', text: 'Tidak, aku merasa cukup berharga' },
        { label: 'B', text: 'Ya, sering muncul pikiran seperti itu' },
      ],
    },
    {
      id: 5,
      question:
        'Seberapa mudah kamu berkonsentrasi pada aktivitas sehari-hari?',
      options: [
        { label: 'A', text: 'Masih bisa fokus dengan baik' },
        { label: 'B', text: 'Sangat sulit, pikiran sering melayang' },
      ],
    },
  ],

  'relationship': [
    {
      id: 1,
      question:
        'Bagaimana komunikasi sehari-hari antara kamu dan pasangan?',
      options: [
        { label: 'A', text: 'Terbuka dan saling mendengarkan' },
        { label: 'B', text: 'Sering terjadi miskomunikasi atau salah paham' },
      ],
    },
    {
      id: 2,
      question:
        'Saat pasanganmu memiliki pendapat berbeda, kamu...',
      options: [
        { label: 'A', text: 'Menghargai perbedaan dan mencari kompromi' },
        { label: 'B', text: 'Merasa harus meyakinkan dia agar setuju' },
      ],
    },
    {
      id: 3,
      question:
        'Seberapa aman dan nyaman kamu merasa dalam hubungan ini?',
      options: [
        { label: 'A', text: 'Sangat aman — aku bisa menjadi diriku sendiri' },
        { label: 'B', text: 'Kadang merasa tidak aman atau cemas' },
      ],
    },
    {
      id: 4,
      question:
        'Bagaimana kalian mengelola waktu bersama dan waktu pribadi?',
      options: [
        { label: 'A', text: 'Seimbang — ada waktu berdua dan waktu sendiri' },
        { label: 'B', text: 'Tidak seimbang — terlalu banyak atau terlalu sedikit' },
      ],
    },
    {
      id: 5,
      question:
        'Apa yang kamu harapkan dari hubungan ini ke depannya?',
      options: [
        { label: 'A', text: 'Komitmen jangka panjang yang bertumbuh bersama' },
        { label: 'B', text: 'Belum yakin, masih menikmati prosesnya' },
      ],
    },
  ],

  // =================================================================
  // PERUSAHAAN (3 tests)
  // =================================================================

  'rekrutmen': [
    {
      id: 1,
      question:
        'Saat menghadapi deadline ketat, strategi kerjamu adalah...',
      options: [
        { label: 'A', text: 'Membuat prioritas dan mengerjakan yang terpenting dulu' },
        { label: 'B', text: 'Multitasking agar semua berjalan bersamaan' },
      ],
    },
    {
      id: 2,
      question:
        'Bagaimana kamu menangani instruksi yang kurang jelas dari atasan?',
      options: [
        { label: 'A', text: 'Bertanya untuk klarifikasi sebelum mulai' },
        { label: 'B', text: 'Mengerjakan sesuai pemahamanku dan konfirmasi nanti' },
      ],
    },
    {
      id: 3,
      question:
        'Saat terjadi konflik dengan rekan kerja, kamu akan...',
      options: [
        { label: 'A', text: 'Bicara langsung secara profesional untuk menyelesaikan' },
        { label: 'B', text: 'Menghindar dan berharap masalah selesai sendiri' },
      ],
    },
    {
      id: 4,
      question:
        'Apa yang kamu lakukan saat menemukan kesalahan dalam pekerjaanmu?',
      options: [
        { label: 'A', text: 'Segera melapor dan memperbaiki' },
        { label: 'B', text: 'Memperbaiki diam-diam agar tidak ketahuan' },
      ],
    },
    {
      id: 5,
      question:
        'Lingkungan kerja ideal menurutmu adalah...',
      options: [
        { label: 'A', text: 'Terstruktur dengan SOP dan alur yang jelas' },
        { label: 'B', text: 'Dinamis dan penuh tantangan baru setiap hari' },
      ],
    },
  ],

  'kenaikan-jabatan': [
    {
      id: 1,
      question:
        'Saat diminta memimpin proyek baru, responmu...',
      options: [
        { label: 'A', text: 'Antusias dan langsung menyusun rencana' },
        { label: 'B', text: 'Khawatir tapi berusaha menjalankan sebaik mungkin' },
      ],
    },
    {
      id: 2,
      question:
        'Bagaimana caramu mengembangkan kemampuan bawahan?',
      options: [
        { label: 'A', text: 'Mentoring aktif dan memberi kesempatan belajar' },
        { label: 'B', text: 'Membiarkan mereka belajar sendiri dari pengalaman' },
      ],
    },
    {
      id: 3,
      question:
        'Saat harus membuat keputusan sulit yang berdampak pada tim, kamu...',
      options: [
        { label: 'A', text: 'Menganalisis data lalu mengambil keputusan tegas' },
        { label: 'B', text: 'Menunda sampai ada lebih banyak informasi' },
      ],
    },
    {
      id: 4,
      question:
        'Bagaimana kamu menangani bawahan yang berkinerja buruk?',
      options: [
        { label: 'A', text: 'Coaching personal dan buat improvement plan' },
        { label: 'B', text: 'Memberi teguran dan peringatan langsung' },
      ],
    },
    {
      id: 5,
      question:
        'Apa visimu sebagai pemimpin?',
      options: [
        { label: 'A', text: 'Membangun tim yang mandiri dan berkembang' },
        { label: 'B', text: 'Mencapai target bisnis setinggi-tingginya' },
      ],
    },
  ],

  'perencanaan-karir': [
    {
      id: 1,
      question:
        'Apakah kamu sudah memiliki tujuan karir jangka panjang yang jelas?',
      options: [
        { label: 'A', text: 'Ya, aku tahu ingin ke mana dalam 5-10 tahun' },
        { label: 'B', text: 'Belum yakin, masih menjelajahi pilihan' },
      ],
    },
    {
      id: 2,
      question:
        'Faktor apa yang paling memengaruhi keputusan karirmu?',
      options: [
        { label: 'A', text: 'Peluang pengembangan diri dan learning' },
        { label: 'B', text: 'Kompensasi finansial dan benefit' },
      ],
    },
    {
      id: 3,
      question:
        'Seberapa sering kamu mengevaluasi progres karirmu?',
      options: [
        { label: 'A', text: 'Rutin, minimal setiap 6 bulan' },
        { label: 'B', text: 'Jarang, hanya saat ada perubahan besar' },
      ],
    },
    {
      id: 4,
      question:
        'Apakah kamu bersedia berpindah perusahaan atau industri demi karir yang lebih baik?',
      options: [
        { label: 'A', text: 'Ya, selama sesuai dengan tujuan karirku' },
        { label: 'B', text: 'Tidak, aku lebih suka stabilitas di satu tempat' },
      ],
    },
    {
      id: 5,
      question:
        'Skill apa yang ingin kamu kembangkan selanjutnya?',
      options: [
        { label: 'A', text: 'Technical skill yang spesifik di bidangku' },
        { label: 'B', text: 'Soft skill seperti leadership dan komunikasi' },
      ],
    },
  ],
}
