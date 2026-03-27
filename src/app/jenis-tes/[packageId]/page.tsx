'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Package,
  FileText,
  Clock,
  Users,
  BadgeDollarSign,
  CheckCircle2,
  Play,
  ChevronRight,
  Brain,
  Shield,
  Award,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const dummyPackages: Record<string, {
  id: string; name: string; description: string; price: number; estimatedDuration: number; participants: number
  tests: { id: string; name: string; description: string; duration: number; questionsCount: number; order: number; originalYear?: number; adaptationYear?: number; precisionLevel?: number; popularity?: string }[]
}> = {
  '1': {
    id: '1', name: 'Paket Tes Kepribadian', description: 'Kumpulan tes untuk mengukur tipe kepribadian, karakter, dan gaya interaksi individu. Paket ini mencakup MBTI, Big Five, DISC, dan Enneagram yang memberikan gambaran komprehensif tentang profil kepribadian Anda.',
    price: 0, estimatedDuration: 90, participants: 1240,
    tests: [
      { id: 'test-mbti', name: 'Tes Kepribadian MBTI', description: 'Mengidentifikasi 16 tipe kepribadian berdasarkan preferensi psikologis.', duration: 45, questionsCount: 60, order: 1, originalYear: 1962, adaptationYear: 2020, precisionLevel: 85, popularity: 'Umum' },
      { id: 'test-bigfive', name: 'Tes Big Five Personality', description: 'Mengukur 5 dimensi utama kepribadian: Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism.', duration: 30, questionsCount: 44, order: 2, originalYear: 1990, adaptationYear: 2018, precisionLevel: 88, popularity: 'Umum' },
      { id: 'test-disc', name: 'Tes DISC Assessment', description: 'Mengukur gaya perilaku: Dominance, Influence, Steadiness, Conscientiousness.', duration: 25, questionsCount: 28, order: 3, originalYear: 1928, adaptationYear: 2019, precisionLevel: 82, popularity: 'Umum' },
      { id: 'test-enneagram', name: 'Tes Enneagram', description: 'Mengidentifikasi 9 tipe kepribadian dan pola motivasi dasar.', duration: 35, questionsCount: 36, order: 4, originalYear: 1970, adaptationYear: 2021, precisionLevel: 80, popularity: 'Kurang Umum' },
    ],
  },
  '2': {
    id: '2', name: 'Paket Intelegensi & Kognitif', description: 'Tes komprehensif untuk mengukur kemampuan kognitif, verbal, numerik, dan logika. Cocok untuk asesmen kemampuan intelektual secara menyeluruh.',
    price: 150000, estimatedDuration: 120, participants: 856,
    tests: [
      { id: 'test-ist', name: 'Tes Intelegensi IST', description: 'Mengukur kecerdasan umum melalui 9 subtes kognitif.', duration: 60, questionsCount: 80, order: 1, originalYear: 1953, adaptationYear: 2017, precisionLevel: 92, popularity: 'Umum' },
      { id: 'test-iq', name: 'Tes IQ Standard', description: 'Tes kecerdasan umum dengan norma Indonesia.', duration: 45, questionsCount: 50, order: 2, originalYear: 1960, adaptationYear: 2020, precisionLevel: 90, popularity: 'Umum' },
      { id: 'test-logika', name: 'Tes Logika & Penalaran', description: 'Mengukur kemampuan berpikir logis dan penalaran abstrak.', duration: 30, questionsCount: 40, order: 3, originalYear: 1985, adaptationYear: 2022, precisionLevel: 87, popularity: 'Kurang Umum' },
    ],
  },
  '3': {
    id: '3', name: 'Paket Minat & Bakat Karir', description: 'Identifikasi minat karir dan bakat alami untuk perencanaan masa depan. Cocok untuk siswa, mahasiswa, dan profesional yang ingin eksplorasi karir.',
    price: 0, estimatedDuration: 60, participants: 2100,
    tests: [
      { id: 'test-riasec', name: 'Tes Minat Bakat RIASEC', description: 'Mengidentifikasi 6 tipe minat karir berdasarkan teori Holland.', duration: 35, questionsCount: 48, order: 1, originalYear: 1959, adaptationYear: 2019, precisionLevel: 86, popularity: 'Umum' },
      { id: 'test-aptitude', name: 'Tes Aptitude Battery', description: 'Mengukur bakat di berbagai bidang: verbal, numerik, spasial, mekanik.', duration: 50, questionsCount: 60, order: 2, originalYear: 1947, adaptationYear: 2021, precisionLevel: 84, popularity: 'Kurang Umum' },
    ],
  },
  '4': {
    id: '4', name: 'Paket Rekrutmen Karyawan', description: 'Paket lengkap untuk proses seleksi dan rekrutmen karyawan baru perusahaan. Mencakup tes kompetensi, kepemimpinan, dan teamwork.',
    price: 350000, estimatedDuration: 180, participants: 430,
    tests: [
      { id: 'test-kompetensi', name: 'Tes Kompetensi Dasar', description: 'Mengukur kompetensi dasar yang dibutuhkan di dunia kerja.', duration: 45, questionsCount: 60, order: 1, originalYear: 2000, adaptationYear: 2023, precisionLevel: 88, popularity: 'Umum' },
      { id: 'test-kepemimpinan', name: 'Tes Kepemimpinan', description: 'Mengukur potensi dan gaya kepemimpinan.', duration: 35, questionsCount: 40, order: 2, originalYear: 1995, adaptationYear: 2022, precisionLevel: 85, popularity: 'Umum' },
      { id: 'test-teamwork', name: 'Tes Teamwork Assessment', description: 'Mengukur kemampuan bekerja dalam tim.', duration: 25, questionsCount: 30, order: 3, originalYear: 2005, adaptationYear: 2023, precisionLevel: 83, popularity: 'Kurang Umum' },
      { id: 'test-mbti', name: 'Tes Kepribadian MBTI', description: 'Mengidentifikasi tipe kepribadian untuk kesesuaian posisi.', duration: 45, questionsCount: 60, order: 4, originalYear: 1962, adaptationYear: 2020, precisionLevel: 85, popularity: 'Umum' },
      { id: 'test-ist', name: 'Tes Intelegensi IST', description: 'Mengukur kecerdasan umum kandidat.', duration: 60, questionsCount: 80, order: 5, originalYear: 1953, adaptationYear: 2017, precisionLevel: 92, popularity: 'Umum' },
    ],
  },
  '5': {
    id: '5', name: 'Paket Kesehatan Mental', description: 'Skrining awal kesehatan mental: stres, kecemasan, dan kesejahteraan psikologis. Hasil bersifat indikatif, bukan diagnosis klinis.',
    price: 0, estimatedDuration: 45, participants: 3200,
    tests: [
      { id: '1', name: 'Tes Tingkat Stres', description: 'Mengukur tingkat stres yang dialami saat ini.', duration: 20, questionsCount: 30, order: 1, originalYear: 1983, adaptationYear: 2020, precisionLevel: 80, popularity: 'Umum' },
      { id: '2', name: 'Tes Kecemasan (GAD-7)', description: 'Skrining gangguan kecemasan umum.', duration: 10, questionsCount: 7, order: 2, originalYear: 2006, adaptationYear: 2018, precisionLevel: 89, popularity: 'Umum' },
      { id: '3', name: 'Tes Depresi (PHQ-9)', description: 'Skrining gejala depresi.', duration: 10, questionsCount: 9, order: 3, originalYear: 1999, adaptationYear: 2019, precisionLevel: 88, popularity: 'Umum' },
    ],
  },
  '6': {
    id: '6', name: 'Paket Kecerdasan Emosional', description: 'Mengukur kemampuan mengelola emosi, empati, dan keterampilan sosial secara komprehensif.',
    price: 99000, estimatedDuration: 60, participants: 670,
    tests: [
      { id: '1', name: 'Tes Kecerdasan Emosional', description: 'Mengukur 5 dimensi EQ: kesadaran diri, regulasi emosi, motivasi, empati, keterampilan sosial.', duration: 40, questionsCount: 50, order: 1, originalYear: 1995, adaptationYear: 2021, precisionLevel: 86, popularity: 'Umum' },
      { id: '2', name: 'Tes EQ Workplace', description: 'Mengukur kecerdasan emosional dalam konteks lingkungan kerja.', duration: 30, questionsCount: 35, order: 2, originalYear: 2010, adaptationYear: 2023, precisionLevel: 84, popularity: 'Kurang Umum' },
    ],
  },
}

function formatPrice(price: number) {
  if (price === 0) return 'Gratis'
  return `Rp ${price.toLocaleString('id-ID')}`
}

const testRowColors = [
  { icon: 'bg-indigo-100 text-indigo-600', num: 'bg-indigo-50 text-indigo-600' },
  { icon: 'bg-teal-100 text-teal-600', num: 'bg-teal-50 text-teal-600' },
  { icon: 'bg-violet-100 text-violet-600', num: 'bg-violet-50 text-violet-600' },
  { icon: 'bg-rose-100 text-rose-600', num: 'bg-rose-50 text-rose-600' },
  { icon: 'bg-amber-100 text-amber-600', num: 'bg-amber-50 text-amber-600' },
]

export default function PackageDetailPublicPage() {
  const params = useParams()
  const router = useRouter()
  const pkg = dummyPackages[params.packageId as string]

  if (!pkg) {
    return (
      <div className="min-h-screen bg-[#F2F2F7] flex items-center justify-center">
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-16 text-center flex flex-col items-center">
          <div className="size-16 rounded-2xl bg-rose-50 flex items-center justify-center mb-5">
            <Package className="size-8 text-rose-400" />
          </div>
          <p className="text-slate-900 font-black text-lg mb-1">Paket tidak ditemukan.</p>
          <p className="text-slate-400 font-medium text-sm mb-6">ID paket tidak valid.</p>
          <Button onClick={() => router.push('/jenis-tes')} className="rounded-2xl h-12 px-8 font-black bg-slate-900 hover:bg-slate-800">
            <ArrowLeft className="size-4 mr-2" /> Kembali
          </Button>
        </div>
      </div>
    )
  }

  const isFree = pkg.price === 0
  const totalQuestions = pkg.tests.reduce((sum, t) => sum + t.questionsCount, 0)

  return (
    <div className="min-h-screen bg-[#F2F2F7]">
      {/* HERO */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 pt-8 pb-10 md:pt-10 md:pb-12 text-white">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <Link
            href="/jenis-tes"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
          >
            <div className="size-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <ArrowLeft className="size-4" />
            </div>
            <span className="text-sm font-bold">Kembali ke Jenis Tes</span>
          </Link>

          <div className="flex items-start gap-6">
            <div className="size-16 rounded-2xl bg-gradient-to-br from-violet-400 to-violet-500 flex items-center justify-center shrink-0 shadow-lg">
              <Package className="size-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className={cn(
                  'text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full',
                  isFree ? 'bg-teal-500/20 text-teal-300' : 'bg-amber-500/20 text-amber-300'
                )}>
                  {formatPrice(pkg.price)}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">{pkg.name}</h1>
              <p className="text-slate-400 font-medium text-sm max-w-2xl leading-relaxed">{pkg.description}</p>
            </div>
          </div>

          {/* Stats + CTA */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mt-10">
            <div className="flex items-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 flex items-center gap-2.5">
                <FileText className="size-4 text-violet-300" />
                <span className="text-sm font-bold">{pkg.tests.length} Tes</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 flex items-center gap-2.5">
                <Clock className="size-4 text-indigo-300" />
                <span className="text-sm font-bold">{pkg.estimatedDuration} Menit</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 flex items-center gap-2.5">
                <Users className="size-4 text-teal-300" />
                <span className="text-sm font-bold">{pkg.participants.toLocaleString()} Peserta</span>
              </div>
            </div>
            <Button
              size="lg"
              className="bg-white text-slate-900 hover:bg-indigo-50 rounded-2xl h-14 px-8 font-black text-base shadow-xl transition-all active:scale-95"
            >
              <Play className="size-5 mr-2 fill-current" />
              Mulai Tes
            </Button>
          </div>
        </div>

        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
          <Brain className="size-[400px]" />
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
        {/* DAFTAR TES */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-50 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-violet-100 flex items-center justify-center">
              <FileText className="size-5 text-violet-600" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">Daftar Tes dalam Paket</h2>
              <p className="text-xs text-slate-400 font-medium">{pkg.tests.length} tes, {totalQuestions} soal total, dikerjakan berurutan</p>
            </div>
          </div>
          <div className="divide-y divide-slate-50">
            {pkg.tests.sort((a, b) => a.order - b.order).map((test, index) => {
              const color = testRowColors[index % testRowColors.length]
              return (
                <div key={test.id} className="px-8 py-6 group hover:bg-slate-50/50 transition-all">
                  <div className="flex items-start gap-5">
                    {/* Order */}
                    <span className={cn('size-9 rounded-xl flex items-center justify-center text-sm font-black shrink-0 mt-0.5', color.num)}>
                      {test.order}
                    </span>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-black text-slate-900 mb-1">{test.name}</h4>
                      <p className="text-sm text-slate-400 font-medium mb-3">{test.description}</p>

                      {/* Meta badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full">
                          <Clock className="size-3" />
                          <span>{test.duration}m</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full">
                          <FileText className="size-3" />
                          <span>{test.questionsCount} soal</span>
                        </div>
                        {test.originalYear && (
                          <div className="flex items-center gap-1 text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2.5 py-1 rounded-full">
                            <span>Original {test.originalYear}</span>
                          </div>
                        )}
                        {test.adaptationYear && (
                          <div className="flex items-center gap-1 text-[10px] font-bold text-teal-500 bg-teal-50 px-2.5 py-1 rounded-full">
                            <span>Adaptasi {test.adaptationYear}</span>
                          </div>
                        )}
                        {test.precisionLevel && (
                          <div className="flex items-center gap-1 text-[10px] font-bold text-violet-500 bg-violet-50 px-2.5 py-1 rounded-full">
                            <Shield className="size-3" />
                            <span>Presisi {test.precisionLevel}%</span>
                          </div>
                        )}
                        {test.popularity && (
                          <div className="flex items-center gap-1 text-[10px] font-bold text-amber-500 bg-amber-50 px-2.5 py-1 rounded-full">
                            <Award className="size-3" />
                            <span>{test.popularity}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* BOTTOM CTA */}
        <div className="flex justify-center pt-4">
          <Button
            size="lg"
            className="h-14 px-10 bg-slate-900 text-white hover:bg-slate-800 rounded-2xl font-black text-base shadow-xl transition-all active:scale-95"
          >
            <Play className="size-5 mr-2 fill-current" />
            Mulai Tes Sekarang
          </Button>
        </div>
      </div>
    </div>
  )
}
