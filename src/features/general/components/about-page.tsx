'use client'

import Link from 'next/link'
import {
  Sparkles,
  Eye,
  Rocket,
  ShieldCheck,
  Trophy,
  Lightbulb,
  Heart,
  Handshake,
  Brain,
  Users,
  ArrowRight,
  Target,
  CheckCircle2,
  Building2,
  GraduationCap,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const STATS = [
  { value: '50K+', label: 'Pengguna Aktif' },
  { value: '200+', label: 'Tes Tersedia' },
  { value: '50+', label: 'Psikolog Berlisensi' },
  { value: '98%', label: 'Tingkat Kepuasan' },
]

const VALUES = [
  { icon: ShieldCheck, title: 'Profesional', desc: 'Setiap layanan dijalankan sesuai standar etika profesi psikologi tertinggi.' },
  { icon: Trophy, title: 'Terpercaya', desc: 'Didukung oleh psikolog berlisensi dan instrumen asesmen yang tervalidasi.' },
  { icon: Lightbulb, title: 'Inovatif', desc: 'Mengadopsi metode asesmen modern berbasis teknologi dan riset terkini.' },
  { icon: Heart, title: 'Inklusif', desc: 'Layanan yang dapat diakses oleh semua kalangan tanpa diskriminasi.' },
  { icon: Handshake, title: 'Kolaboratif', desc: 'Bermitra dengan institusi pendidikan, perusahaan, dan organisasi.' },
  { icon: Rocket, title: 'Berdampak', desc: 'Menghasilkan perubahan nyata dan terukur dalam kehidupan pengguna.' },
]

const SERVICES = [
  {
    icon: Brain,
    title: 'Asesmen Psikologi',
    desc: 'Psikotes terstandar dengan hasil real-time dan laporan komprehensif untuk individu maupun organisasi.',
    color: 'bg-primary-50 text-primary-600',
  },
  {
    icon: Users,
    title: 'Konseling & Coaching',
    desc: 'Pendampingan personal oleh psikolog berlisensi untuk membantu kamu menavigasi tantangan hidup.',
    color: 'bg-accent-50 text-accent-600',
  },
  {
    icon: Building2,
    title: 'Corporate Assessment',
    desc: 'Solusi assessment berbasis kompetensi untuk rekrutmen, promosi, dan pengembangan SDM perusahaan.',
    color: 'bg-sky-50 text-sky-600',
  },
]

const JOURNEY = [
  { step: '01', title: 'Pilih Asesmen', desc: 'Temukan tes yang sesuai dengan kebutuhanmu dari berbagai kategori.' },
  { step: '02', title: 'Kerjakan Online', desc: 'Tes bisa dikerjakan kapan saja, di mana saja, dari perangkat apapun.' },
  { step: '03', title: 'Dapatkan Hasil', desc: 'Laporan komprehensif langsung tersedia setelah tes selesai.' },
  { step: '04', title: 'Konsultasi', desc: 'Diskusikan hasil dengan psikolog untuk langkah selanjutnya.' },
]

export function AboutPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50/50 via-white to-white pt-32 pb-24">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary-100/40 rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-accent-100/30 rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 border border-primary-100">
            <Sparkles className="w-4 h-4 text-primary-600 fill-primary-600" />
            <span className="text-xs font-black text-primary-700 uppercase tracking-widest">Tentang Kami</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-[0.95]">
            Platform Psikologi <br className="hidden md:block" />
            <span className="text-primary-600 italic">untuk Indonesia</span>
          </h1>

          <p className="text-gray-500 font-medium max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            BERMOELA hadir sebagai platform pengembangan diri berbasis asesmen psikologi ilmiah — membantu individu dan organisasi memahami potensi terbaik mereka.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 -mt-8">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="bg-white rounded-2xl p-6 text-center shadow-lg border border-slate-100">
                <p className="text-3xl md:text-4xl font-black text-primary-600 mb-1">{s.value}</p>
                <p className="text-xs md:text-sm text-slate-500 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Misi & Visi */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100">
              <Target className="w-3 h-3 text-primary-600" />
              <span className="text-[10px] font-black text-primary-700 uppercase tracking-widest">Tujuan Kami</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
              Misi & <span className="text-primary-600 italic">Visi</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 md:p-10 rounded-[2rem] bg-primary-600 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-6 backdrop-blur-sm">
                <Rocket className="w-7 h-7 text-accent-300" />
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-4">Misi Kami</h3>
              <p className="text-primary-50/80 leading-relaxed text-lg">
                Menyediakan layanan psikologi berkualitas tinggi yang mudah diakses oleh seluruh masyarakat Indonesia melalui asesmen ilmiah yang akurat dan berdampak.
              </p>
            </div>

            <div className="p-8 md:p-10 rounded-[2rem] bg-accent-400 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-6 backdrop-blur-sm">
                <Eye className="w-7 h-7 text-accent-900" />
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-accent-950 mb-4">Visi Kami</h3>
              <p className="text-accent-900/80 leading-relaxed text-lg">
                Menjadi platform psikologi terdepan di Indonesia yang memberdayakan setiap individu mengenali potensi terbaiknya untuk kehidupan yang lebih bermakna.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Layanan */}
      <section className="relative overflow-hidden py-20 md:py-28 bg-slate-50/50">
        <div className="absolute top-[-5%] right-[-8%] w-[400px] h-[400px] bg-primary-100/30 rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm">
              <Sparkles className="w-3 h-3 text-primary-600 fill-primary-600" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Layanan Kami</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
              Tiga Pilar <span className="text-primary-600 italic">Utama</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto leading-relaxed font-medium text-sm md:text-base">
              Solusi pengembangan diri komprehensif untuk setiap kebutuhan.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center mb-6', s.color)}>
                  <s.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3">{s.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cara Kerja */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute bottom-[-8%] left-[-6%] w-[350px] h-[350px] bg-accent-100/30 rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100">
              <GraduationCap className="w-3 h-3 text-primary-600" />
              <span className="text-[10px] font-black text-primary-700 uppercase tracking-widest">Cara Kerja</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
              Mulai dalam <span className="text-primary-600 italic">4 Langkah</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto leading-relaxed font-medium text-sm md:text-base">
              Proses yang simpel dan terarah dari awal hingga akhir.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {JOURNEY.map((j, i) => (
              <div key={j.step} className="relative">
                <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-lg transition-shadow h-full">
                  <span className="text-5xl font-black text-primary-100 leading-none">{j.step}</span>
                  <h3 className="text-lg font-black text-gray-900 mt-3 mb-2">{j.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{j.desc}</p>
                </div>
                {i < JOURNEY.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 z-10 w-6 h-6 rounded-full bg-primary-100 items-center justify-center">
                    <ArrowRight className="w-3 h-3 text-primary-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nilai-Nilai */}
      <section className="relative overflow-hidden py-20 md:py-28 bg-slate-50/50">
        <div className="absolute top-[-5%] left-[-8%] w-[400px] h-[400px] bg-accent-100/30 rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm">
              <Sparkles className="w-3 h-3 text-primary-600 fill-primary-600" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Core Values</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
              Nilai-Nilai <span className="text-primary-600 italic">Kami</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto leading-relaxed font-medium text-sm md:text-base">
              Prinsip yang menjadi landasan setiap layanan dan keputusan di BERMOELA.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-5 group-hover:bg-primary-600 transition-colors duration-300">
                  <v.icon className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-black text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kenapa BERMOELA */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100">
                <CheckCircle2 className="w-3 h-3 text-primary-600" />
                <span className="text-[10px] font-black text-primary-700 uppercase tracking-widest">Kenapa Kami</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                Kenapa Memilih <span className="text-primary-600 italic">BERMOELA?</span>
              </h2>
              <p className="text-gray-500 leading-relaxed font-medium">
                Kami bukan sekadar platform tes online. BERMOELA adalah ekosistem pengembangan diri yang menggabungkan riset psikologi, teknologi, dan pendampingan profesional.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { title: 'Berbasis Riset', desc: 'Semua instrumen asesmen dikembangkan berdasarkan teori psikologi yang tervalidasi secara ilmiah.' },
                { title: 'Hasil Instan', desc: 'Laporan komprehensif langsung tersedia setelah tes selesai — tidak perlu menunggu berhari-hari.' },
                { title: 'Privasi Terjaga', desc: 'Data dan hasil tes kamu terenkripsi dan hanya bisa diakses oleh kamu dan psikolog terkait.' },
                { title: 'Harga Terjangkau', desc: 'Layanan psikologi berkualitas dengan harga yang dapat dijangkau oleh semua kalangan.' },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative p-8 md:p-12 rounded-[3rem] bg-primary-600 shadow-2xl shadow-primary-900/20 overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 text-center md:text-left max-w-xl">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
                  <Users className="w-8 h-8 text-accent-300" />
                </div>
                <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight">
                  Siap Mengenali <span className="text-accent-300 italic">Potensimu?</span>
                </h3>
                <p className="text-primary-50 font-medium text-sm md:text-base">
                  Mulai perjalanan pengembangan dirimu sekarang. Pilih asesmen yang sesuai atau konsultasikan kebutuhanmu dengan tim kami.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link
                  href="/"
                  className="px-8 h-14 rounded-2xl bg-white text-primary-600 text-sm font-black uppercase tracking-widest shadow-xl hover:bg-slate-50 transition-colors flex items-center gap-3"
                >
                  Mulai Asesmen <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
