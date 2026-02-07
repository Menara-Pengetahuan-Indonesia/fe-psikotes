// -----------------------------------------------------------
// Dummy result data per test slug.
// Will be replaced by real results from the backend later.
// -----------------------------------------------------------

export interface ResultData {
  code: string
  title: string
  subtitle: string
  description: string
}

export const RESULTS_MAP: Record<string, ResultData> = {
  // =============== GRATIS ===============
  'tes-kepribadian-mbti': {
    code: 'ENFJ',
    title: 'The Protagonist',
    subtitle: 'Berdasarkan analisa jawaban tes MBTI',
    description:
      'Kamu adalah pemimpin yang karismatik dan'
      + ' menginspirasi, mampu memukau pendengarnya.',
  },
  'tes-gaya-belajar': {
    code: 'Visual',
    title: 'Visual Learner',
    subtitle: 'Berdasarkan analisa gaya belajar',
    description:
      'Kamu belajar paling efektif melalui gambar,'
      + ' diagram, dan materi visual lainnya.',
  },
  'tes-kecerdasan-emosional': {
    code: '85/100',
    title: 'Kecerdasan Emosional Tinggi',
    subtitle: 'Berdasarkan analisa EQ',
    description:
      'Kamu memiliki kemampuan luar biasa dalam'
      + ' mengenali dan mengelola emosi.',
  },
  'tes-minat-karir': {
    code: 'Social',
    title: 'The Helper',
    subtitle: 'Berdasarkan analisa Holland Code',
    description:
      'Kamu cocok di bidang yang melibatkan'
      + ' interaksi dan membantu orang lain.',
  },
  'tes-love-language': {
    code: 'QT',
    title: 'Quality Time',
    subtitle: 'Berdasarkan analisa Love Language',
    description:
      'Bahasa cintamu adalah waktu berkualitas'
      + ' — kamu merasa dicintai saat diberi'
      + ' perhatian penuh.',
  },
  'tes-stress-level': {
    code: 'Sedang',
    title: 'Stres Level Moderat',
    subtitle: 'Berdasarkan analisa tingkat stres',
    description:
      'Tingkat stresmu berada di level sedang.'
      + ' Perlu perhatian agar tidak meningkat.',
  },
  'tes-burnout-kerja': {
    code: 'Rendah',
    title: 'Risiko Burnout Rendah',
    subtitle: 'Berdasarkan analisa burnout',
    description:
      'Kamu masih memiliki semangat kerja yang'
      + ' baik dan keseimbangan hidup positif.',
  },
  'tes-kecocokan-pasangan': {
    code: '88%',
    title: 'Sangat Cocok',
    subtitle: 'Berdasarkan analisa kecocokan',
    description:
      'Hubunganmu menunjukkan kecocokan tinggi'
      + ' di aspek komunikasi dan nilai-nilai.',
  },

  // =============== PREMIUM ===============
  'tes-iq-profesional': {
    code: '125',
    title: 'Superior Intelligence',
    subtitle: 'Berdasarkan standar CFIT/IST',
    description:
      'Skor IQ-mu berada di atas rata-rata,'
      + ' menunjukkan kapasitas kognitif tinggi.',
  },
  'minat-bakat-komprehensif': {
    code: 'Investigative',
    title: 'The Analyst',
    subtitle: 'Berdasarkan analisa minat bakat',
    description:
      'Kamu memiliki bakat kuat di bidang'
      + ' analisis, riset, dan pemecahan masalah.',
  },
  'tes-kesehatan-mental-lengkap': {
    code: 'Baik',
    title: 'Kesehatan Mental Baik',
    subtitle: 'Berdasarkan screening klinis',
    description:
      'Kondisi kesehatan mentalmu secara umum'
      + ' baik. Tetap jaga pola hidup sehat.',
  },
  'mmpi-2-screening': {
    code: 'Normal',
    title: 'Profil Normal',
    subtitle: 'Berdasarkan standar MMPI-2',
    description:
      'Profil kepribadianmu berada dalam'
      + ' rentang normal tanpa indikasi klinis.',
  },
  'leadership-style-analysis': {
    code: 'Democratic',
    title: 'Democratic Leader',
    subtitle: 'Berdasarkan analisa gaya kepemimpinan',
    description:
      'Gaya kepemimpinanmu demokratis — kamu'
      + ' mengutamakan kolaborasi dan partisipasi.',
  },
  'tes-kesiapan-nikah': {
    code: 'Siap',
    title: 'Siap Menikah',
    subtitle: 'Berdasarkan analisa kesiapan',
    description:
      'Kamu menunjukkan kematangan emosional'
      + ' dan kesiapan untuk komitmen jangka panjang.',
  },
  'tes-potensi-akademik-tpa': {
    code: '580',
    title: 'Skor TPA Tinggi',
    subtitle: 'Berdasarkan simulasi TPA',
    description:
      'Skor TPA-mu di atas rata-rata, menunjukkan'
      + ' potensi akademik yang kuat.',
  },
  'full-personality-profile': {
    code: 'OCEAN',
    title: 'The Balanced One',
    subtitle: 'Berdasarkan analisa Big Five',
    description:
      'Profil kepribadianmu seimbang di semua'
      + ' dimensi Big Five personality traits.',
  },

  // =============== MAHASISWA ===============
  'minat-bakat': {
    code: 'Artistic',
    title: 'The Creative',
    subtitle: 'Berdasarkan analisa minat bakat',
    description:
      'Minat dan bakatmu mengarah ke bidang'
      + ' kreatif, seni, dan ekspresi diri.',
  },
  intelegensi: {
    code: '118',
    title: 'Above Average',
    subtitle: 'Berdasarkan tes intelegensi',
    description:
      'Skor intelegensimu di atas rata-rata,'
      + ' menunjukkan kemampuan kognitif baik.',
  },
  'try-out': {
    code: '720',
    title: 'Skor UTBK Sangat Baik',
    subtitle: 'Berdasarkan simulasi UTBK',
    description:
      'Skormu menunjukkan persiapan yang matang'
      + ' untuk ujian masuk perguruan tinggi.',
  },
  cpns: {
    code: '385',
    title: 'Lolos Passing Grade',
    subtitle: 'Berdasarkan simulasi SKD CPNS',
    description:
      'Skormu melewati passing grade minimal.'
      + ' Tetap tingkatkan di area yang lemah.',
  },

  // =============== KESEHATAN MENTAL ===============
  kepribadian: {
    code: 'INFP',
    title: 'The Mediator',
    subtitle: 'Berdasarkan analisa kepribadian',
    description:
      'Kamu adalah pribadi yang idealis, empatik,'
      + ' dan memiliki imajinasi yang kaya.',
  },
  'mental-health': {
    code: 'Baik',
    title: 'Kondisi Mental Stabil',
    subtitle: 'Berdasarkan screening kesehatan mental',
    description:
      'Kondisi mentalmu saat ini dalam keadaan'
      + ' baik. Terus jaga keseimbangan hidupmu.',
  },
  relationship: {
    code: 'Sehat',
    title: 'Hubungan Sehat',
    subtitle: 'Berdasarkan analisa hubungan',
    description:
      'Hubunganmu menunjukkan pola komunikasi'
      + ' yang sehat dan attachment yang aman.',
  },

  // =============== PERUSAHAAN ===============
  rekrutmen: {
    code: 'A',
    title: 'Kandidat Sangat Potensial',
    subtitle: 'Berdasarkan asesmen rekrutmen',
    description:
      'Profil kompetensimu menunjukkan kesesuaian'
      + ' tinggi dengan standar perusahaan.',
  },
  'kenaikan-jabatan': {
    code: 'Ready',
    title: 'Siap Promosi',
    subtitle: 'Berdasarkan asesmen leadership',
    description:
      'Kamu menunjukkan kesiapan memimpin dan'
      + ' mengambil tanggung jawab lebih besar.',
  },
  'perencanaan-karir': {
    code: 'Growth',
    title: 'Growth-Oriented',
    subtitle: 'Berdasarkan analisa perencanaan karir',
    description:
      'Kamu memiliki orientasi pertumbuhan yang'
      + ' kuat dan visi karir jangka panjang.',
  },
}
