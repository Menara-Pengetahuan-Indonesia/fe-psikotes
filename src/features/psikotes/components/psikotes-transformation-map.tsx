'use client'

import {
  Sparkles,
  Search,
  Brain,
  TrendingUp,
  Target,
  MessageCircle,
  Video,
  Heart,
  Users,
  GraduationCap,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const JOURNEY_ITEMS = [
  { icon: Search, title: 'Pemetaan Diri', desc: 'Mulai dengan assessment & psikotes profesional untuk memahami pola pikir, emosi, dan potensi dirimu.', color: 'bg-primary-600 text-white' },
  { icon: Brain, title: 'Masa Depan', desc: 'Ikuti program pengembangan untuk memperkuat mental health dan meningkatkan kapasitas dirimu.', color: 'bg-accent-500 text-white' },
  { icon: TrendingUp, title: 'Konsultasi & Layanan', desc: 'Pahami langkah nyata yang harus diambil bersama para ahli.', color: 'bg-primary-600 text-white' },
  { icon: Target, title: 'Bergabung Komunitas', desc: 'Terhubung dengan komunitas dan praktisi yang saling mendukung dalam proses pemulihan.', color: 'bg-accent-500 text-white' },
]

const SOLUSI_ITEMS = [
  { icon: Brain, title: 'Psikotes & Asesmen', desc: 'Tes psikologi terstandar untuk mengenali potensi dan kondisi mentalmu.' },
  { icon: MessageCircle, title: 'Konseling Psikologis', desc: 'Sesi konseling personal dengan psikolog berlisensi.' },
  { icon: Video, title: 'Live Coaching', desc: 'Pendampingan langsung untuk pengembangan diri dan karir.' },
  { icon: Heart, title: 'Trauma & Support Group', desc: 'Kelompok dukungan untuk proses pemulihan bersama.' },
  { icon: Users, title: 'Komunitas', desc: 'Jaringan komunitas untuk saling mendukung dan bertumbuh.' },
  { icon: GraduationCap, title: 'Pelatihan', desc: 'Program pelatihan untuk meningkatkan kompetensi dan soft skill.' },
]

export function PsikotesTransformationMap() {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-primary-600 to-background relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-6">

          {/* Box 1: Transformation Journey */}
          <div className="bg-primary-950 rounded-[3rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  <Sparkles className="w-3 h-3 text-accent-400 fill-accent-400" />
                  <span className="text-xs font-black text-primary-100 uppercase tracking-widest">Transformation Journey</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">
                  Peta Perjalanan <span className="text-accent-400 italic">&quot;The New You&quot;</span>
                </h2>
                <p className="text-primary-100/60 text-sm font-medium leading-relaxed">
                  Empat langkah kunci untuk melepaskan kendala masa lalu dan meraih masa depan yang indah.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {JOURNEY_ITEMS.map((item, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/5 p-4 rounded-2xl hover:bg-white/10 transition-colors relative overflow-hidden">
                    <div className="flex gap-3 relative z-10">
                      <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg', item.color)}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div className="space-y-1 min-w-0">
                        <h4 className="font-black text-white text-sm tracking-tight">{item.title}</h4>
                        <p className="text-[11px] text-primary-100/50 font-medium leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                    <span className="absolute -right-1 -bottom-2 text-5xl font-black text-white/5 select-none">0{idx + 1}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-primary-900 bg-primary-800" />
                  ))}
                </div>
                <span className="text-xs font-black text-primary-300/60 uppercase tracking-widest">+10k Jiwa yang Tumbuh</span>
              </div>
            </div>
          </div>

          {/* Box 2: Solusi */}
          <div className="bg-white rounded-[3rem] p-8 md:p-10 shadow-2xl border border-slate-100 relative overflow-hidden">
            <div className="relative z-10 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100">
                  <Sparkles className="w-3 h-3 text-primary-600 fill-primary-600" />
                  <span className="text-xs font-black text-primary-700 uppercase tracking-widest">Solusi</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight leading-tight">
                  Layanan <span className="text-primary-600 italic">Lengkap</span>
                </h2>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">
                  Berbagai layanan profesional untuk mendukung setiap tahap perjalananmu.
                </p>
              </div>

              <div className="space-y-3">
                {SOLUSI_ITEMS.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors group">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center shrink-0 group-hover:bg-primary-600 transition-colors">
                      <item.icon className="w-5 h-5 text-primary-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-black text-gray-900 text-sm">{item.title}</h4>
                      <p className="text-xs text-gray-400 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
