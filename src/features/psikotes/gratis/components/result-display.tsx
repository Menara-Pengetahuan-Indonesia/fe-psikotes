import Link from 'next/link'
import {
  Download,
  ArrowRight,
  Users,
  CheckCircle2,
  Brain,
  Sparkles,
  Share2,
  Lock,
  Star,
} from 'lucide-react'

import { GRATIS_TESTS } from '@features/psikotes/constants'

const PREMIUM_BENEFITS = [
  'Strategy Report Karir Spesifik',
  'Analisa Kekuatan & Kelemahan Valid',
  'Panduan Pengembangan Diri Actionable',
]

// Suggested tests shown at the bottom — take the first 4 from the shared constant.
const SUGGESTED_TESTS = GRATIS_TESTS.slice(0, 4)

export function ResultDisplay() {
  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <main className="max-w-3xl mx-auto px-6 pt-32 space-y-12">
        {/* Result Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3 h-3" /> Hasil Tes Kamu
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">
            Selamat! Profil kepribadianmu <br /> telah teridentifikasi.
          </h1>
          <p className="text-slate-500 font-medium text-lg">
            Berdasarkan analisa jawaban tes MBTI
          </p>
        </div>

        {/* Result Card */}
        <div className="bg-white rounded-[2.5rem] p-4 border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden">
          <div className="relative bg-slate-900 rounded-[2rem] aspect-[4/5] md:aspect-[3/4] overflow-hidden flex flex-col items-center justify-center text-center p-8 text-white">
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-slate-800 rounded-full blur-[120px] opacity-40 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-slate-700 rounded-full blur-[120px] opacity-20 translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 space-y-8">
              <div className="inline-block px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">
                Personality Type
              </div>

              <div className="space-y-4">
                <h2 className="text-7xl md:text-8xl font-black text-white tracking-tighter mb-2 scale-y-90">
                  ENFJ
                </h2>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-200 tracking-tight">The Protagonist</h3>
              </div>

              {/* Abstract visualization rings */}
              <div className="w-40 h-40 mx-auto relative">
                <div className="absolute inset-0 border-2 border-white/20 rounded-full" />
                <div className="absolute inset-4 border border-white/10 rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Brain className="w-16 h-16 text-white opacity-90" strokeWidth={1} />
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 text-center space-y-6">
            <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              Kamu adalah pemimpin yang karismatik dan menginspirasi, mampu memukau pendengarnya.
            </p>
            <div className="flex flex-col gap-3">
              <button className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-200">
                <Download className="w-4 h-4" /> Download Laporan Lengkap (PDF)
              </button>
              <button className="w-full py-4 bg-white border border-slate-200 text-slate-900 rounded-xl font-bold uppercase tracking-widest text-xs hover:border-black transition-all flex items-center justify-center gap-2">
                <Share2 className="w-4 h-4" /> Bagikan Hasil
              </button>
            </div>
          </div>
        </div>

        {/* Premium Upsell */}
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 border border-slate-800 shadow-2xl relative overflow-hidden text-white">
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-yellow-500 font-bold text-xs uppercase tracking-widest">
                <Lock className="w-3 h-3" /> Unlock: Premium
              </div>
              <h3 className="text-2xl md:text-3xl font-black tracking-tight leading-tight">
                Buka Analisa Mendalam Potensi Dirimu
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Hasil di atas hanya 10% dari potensi aslimu. Dapatkan laporan premium setebal 40+ halaman yang menganalisa karir, asmara, dan kekuatan tersembunyi.
              </p>
              <ul className="space-y-3">
                {PREMIUM_BENEFITS.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-slate-300 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-white" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing Box */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm space-y-4">
              <div className="text-center pb-4 border-b border-white/10">
                <span className="text-slate-400 line-through text-xs">Rp 350.000</span>
                <div className="text-3xl font-black text-white">Rp 199.000</div>
              </div>
              <button className="w-full py-4 bg-white text-black rounded-xl font-bold uppercase tracking-wider text-xs hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
                Upgrade ke Premium <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Community Section */}
        <section className="space-y-8 bg-white rounded-3xl p-8 border border-slate-100">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto text-slate-900 border border-slate-200">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-slate-900 leading-tight">
              Jangan Tumbuh Sendirian
            </h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              Bergabunglah dengan 50.000+ member lainnya di Community Hub. Networking, event eksklusif, dan support system positif.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 bg-slate-50 rounded-2xl p-6 border border-slate-100 flex items-start gap-4">
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <Star className="w-4 h-4 text-black" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">Networking</h4>
                <p className="text-xs text-slate-500 mt-1">Temukan partner akuntabilitas sefrekuensi.</p>
              </div>
            </div>
            <div className="flex-1 bg-slate-50 rounded-2xl p-6 border border-slate-100 flex items-start gap-4">
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <Sparkles className="w-4 h-4 text-black" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">Exclusive Events</h4>
                <p className="text-xs text-slate-500 mt-1">Webinar rutin dengan expert psikologi.</p>
              </div>
            </div>
          </div>

          <button className="w-full py-4 border border-slate-200 text-slate-900 rounded-xl font-bold uppercase tracking-wider text-xs hover:border-black hover:bg-black hover:text-white transition-all">
            Gabung Komunitas (Gratis)
          </button>
        </section>

        {/* More Tests */}
        <section className="pt-8 border-t border-slate-200">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-slate-900">Eksplorasi Tes Lainnya</h3>
            <Link
              href="/psikotes/gratis"
              className="text-xs font-bold text-slate-400 hover:text-black uppercase tracking-wider flex items-center gap-2"
            >
              Lihat Semua <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SUGGESTED_TESTS.map((test) => {
              const Icon = test.icon
              return (
                <Link
                  key={test.id}
                  href={`/psikotes/gratis/${test.slug}`}
                  className="bg-slate-50 p-6 rounded-2xl flex flex-col items-center text-center gap-4 hover:bg-slate-100 transition-colors cursor-pointer border border-transparent hover:border-slate-200 group"
                >
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-slate-200 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-slate-700" />
                  </div>
                  <span className="font-bold text-xs text-slate-900 uppercase tracking-wide">{test.title}</span>
                </Link>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}
