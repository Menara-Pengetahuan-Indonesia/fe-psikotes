import Link from 'next/link'
import { Clock, Users, Play, Share2, Info, AlertCircle } from 'lucide-react'

import { GRATIS_TESTS } from '@features/psikotes/constants'

interface TestDetailPageProps {
  slug: string
}

const INSTRUCTIONS = [
  'Luangkan waktumu sejenak. Agar hasil tes akurat dan bermanfaat, perhatikan panduan singkat ini.',
  'Tidak ada jawaban yang benar atau salah. Pilih dengan jujur yang paling mewakili dirimu.',
  'Tes ini tidak dibatasi waktu. Kerjakan dengan santai dan nikmati prosesnya.',
  'Cari tempat yang nyaman agar kamu bisa fokus menjawab tanpa gangguan.',
  'Jika kamu keluar di tengah-tengah, progres akan hilang. Pastikan kamu menyelesaikannya dalam satu sesi.',
  'Dapatkan laporan hasil tes lengkap setelah kamu menjawab semua pertanyaan.',
]

export function TestDetailPage({ slug }: TestDetailPageProps) {
  const test = GRATIS_TESTS.find((t) => t.slug === slug)

  // Fallback banner icon when no test is found
  const Icon = test?.icon

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        {/* Banner Image Area */}
        <div className="relative w-full aspect-[21/9] bg-slate-100 rounded-3xl overflow-hidden mb-12 flex items-center justify-center border border-slate-200">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-200 via-slate-100 to-white opacity-50" />
          <div className="text-center z-10 space-y-4">
            <div className="w-20 h-20 bg-black text-white rounded-2xl mx-auto flex items-center justify-center shadow-2xl">
              {Icon ? (
                <Icon className="w-10 h-10" />
              ) : (
                <span className="text-2xl font-black">?</span>
              )}
            </div>
            <h3 className="text-slate-400 font-bold tracking-widest uppercase text-xs">Psychology Test</h3>
          </div>
        </div>

        {/* Header Content */}
        <div className="text-center max-w-2xl mx-auto space-y-8 mb-16">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              {test?.title ?? 'Tes Tidak Ditemukan'}
            </h1>
            <div className="flex items-center justify-center gap-3">
              <span className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-lg text-xs font-bold text-slate-500 uppercase tracking-wider">
                Edisi 1.0
              </span>
              <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                <Clock className="w-3.5 h-3.5" /> {test?.duration ?? '—'}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                <Users className="w-3.5 h-3.5" /> {test?.users ?? '—'} Users
              </span>
            </div>
          </div>

          <p className="text-slate-500 leading-relaxed text-sm md:text-base">
            {test?.description ?? 'Tes yang diminta tidak ditemukan. Silakan kembali ke halaman daftar tes.'}
          </p>

          <div className="flex justify-center gap-4">
            <Link
              href={`/platform/psikotes/gratis/${slug}/exam`}
              className="px-10 py-4 bg-black text-white rounded-full font-bold text-sm uppercase tracking-widest hover:bg-slate-800 hover:scale-105 transition-all shadow-xl shadow-slate-200 flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" /> Mulai Tes
            </Link>
            <button className="px-4 py-4 bg-white border border-slate-200 text-slate-900 rounded-full hover:border-black transition-all">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-100 mb-16">
          <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
            <Info className="w-6 h-6" /> Panduan Pengisian
          </h3>
          <div className="space-y-6">
            {INSTRUCTIONS.map((item, i) => (
              <div key={i} className="flex gap-4 items-start group">
                <div className="w-8 h-8 flex-shrink-0 bg-white border border-slate-200 rounded-full flex items-center justify-center font-bold text-sm text-slate-400 group-hover:border-black group-hover:text-black transition-colors">
                  {i + 1}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed pt-1.5">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-slate-200">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest italic">Selamat mengerjakan!</p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-red-50 border border-red-100 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-start">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-red-500 shadow-sm flex-shrink-0">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-red-900 mb-2">Disclaimer</h4>
            <p className="text-red-700/80 text-xs leading-relaxed max-w-2xl">
              Jika Anda sedang mengalami krisis psikologis yang mengancam hidup Anda (seperti keinginan menyakiti diri sendiri atau bunuh diri), layanan ini <strong>TIDAK</strong> direkomendasikan. Segera hubungi profesional kesehatan mental terdekat atau layanan darurat{' '}
              <strong>119</strong> / <strong>112</strong>.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
