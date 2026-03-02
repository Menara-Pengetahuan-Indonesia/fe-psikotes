'use client'

import { useState } from 'react'
import { 
  Search, 
  MessageSquare, 
  GraduationCap, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Target,
  Sparkles,
  Flower2,
  Sunrise,
  Plus,
  Circle
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { BermoelaText } from './bermoela-text'
import { TOPO_PRIMARY, TOPO_PRIMARY_LIGHT, TOPO_WHITE, TOPO_BG_SIZE } from '@/shared/constants/bg-patterns.constants'

const PILLARS = [
  {
    id: 'pemetaan',
    title: 'Kenali Dirimu (Pemetaan Diri)',
    subtitle: 'Baseline & Titik Awal',
    description: 'Tanpa kesadaran tidak mungkin ada perubahan. Pahami area yang kurang dan area yang sudah bagus.',
    icon: Search,
    color: 'bg-primary-100 text-primary-600',
    accentColor: 'text-primary-500',
    detail: {
      problem: 'Merasa stuck, tidak tahu arah, atau bingung dengan potensi diri sendiri.',
      product: 'Asesmen & Psikotes Profesional (Bermula Assessment).',
      solution: 'Melakukan pemetaan diri secara akurat berdasarkan riset psikologi.',
      benefit: 'Memiliki baseline yang jelas untuk merancang masa depan.'
    }
  },
  {
    id: 'konsultasi',
    title: 'Kenali Hidupmu (Konsultasi)',
    subtitle: 'Pahami Harus Bagaimana',
    description: 'Konsultasikan hasil tes dengan ahlinya sehingga kamu paham langkah nyata yang harus diambil.',
    icon: MessageSquare,
    color: 'bg-accent-100 text-accent-600',
    accentColor: 'text-accent-500',
    detail: {
      problem: 'Sudah tahu masalahnya, tapi tidak tahu cara mengurainya secara tuntas.',
      product: 'Layanan Konseling & Konsultasi Ahli.',
      solution: 'Sesi privat dengan psikolog profesional untuk mendapatkan panduan personal.',
      benefit: 'Ketenangan pikiran dan strategi hidup yang lebih terarah.'
    }
  },
  {
    id: 'pelatihan',
    title: 'Rancang Masa Depan (Pelatihan)',
    subtitle: 'Tumbuh & Sukses',
    description: 'Tingkatkan kemampuanmu dalam bidang mental health. Bukan sekadar bertahan, tapi benar-benar berkembang.',
    icon: GraduationCap,
    color: 'bg-primary-100 text-primary-600',
    accentColor: 'text-primary-500',
    detail: {
      problem: 'Kurangnya skill untuk menghadapi tekanan atau ingin mendalami bidang psikologi.',
      product: 'Pelatihan Mental Health & Sertifikasi Praktisi.',
      solution: 'Belajar metode praktis untuk tumbuh kuat dan sukses di era penuh tekanan.',
      benefit: 'Menjadi pribadi yang berdaya dan memiliki sertifikasi kompetensi.'
    }
  },
  {
    id: 'komunitas',
    title: 'Kenali Masa Depanmu (Komunitas)',
    subtitle: 'Berikan Solusi Bagi Lainnya',
    description: 'Bergabunglah menjadi bagian dari solusi. Jadilah mental health practitioner dan bantu sesama.',
    icon: Users,
    color: 'bg-accent-100 text-accent-600',
    accentColor: 'text-accent-500',
    detail: {
      problem: 'Ingin berkontribusi lebih luas namun tidak memiliki wadah atau komunitas.',
      product: 'Join BERMOELA sebagai Life Coach & Psikolog Tersertifikasi.',
      solution: 'Bergabung dalam ekosistem profesional untuk memberikan dampak positif.',
      benefit: 'Masa depan yang indah dengan karir yang bermakna bagi orang lain.'
    }
  }
]

export function PsikotesPillars() {
  const [activePillar, setActivePillar] = useState(PILLARS[0].id)
  const activeData = PILLARS.find(p => p.id === activePillar) || PILLARS[0]

  return (
    <section id="konsultasi" className="bg-background py-16 md:py-24 relative overflow-hidden">
      
      {/* Background Pattern for the whole section to avoid "too clean" look */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
           style={{
             backgroundImage: TOPO_PRIMARY,
             backgroundSize: TOPO_BG_SIZE,
           }}
      />

      <div className={cn(
        "bg-primary-950 text-white relative overflow-hidden shadow-2xl",
        "py-24 md:py-32",
        "rounded-t-[40px] md:rounded-t-[80px]",
        "rounded-b-[40px] md:rounded-b-[80px]"
      )}>
        
        {/* Background Ornaments inside the rounded box */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
           <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
           <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-300/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />
        </div>

        {/* Floating Ornaments */}
        <Plus
          className={cn(
            'absolute top-[15%] left-[5%]',
            'text-primary-400/20 w-8 h-8',
            'animate-pulse',
          )}
        />
        <Circle
          className={cn(
            'absolute bottom-[20%]',
            'right-[8%]',
            'text-accent-400/20 w-16 h-16',
            'animate-float-slow',
          )}
        />

        {/* Inner Topo Pattern for texture */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
             style={{
               backgroundImage: TOPO_WHITE,
               backgroundSize: TOPO_BG_SIZE,
             }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Header */}
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              Semua Bisa <BermoelaText className="text-accent-300" /> Dari Sini
            </h2>
            <p className="text-primary-100/60 font-medium max-w-2xl mx-auto text-sm md:text-base">
              Empat pilar transformasi untuk membantumu melepaskan diri dari kendala masa lalu menuju "The New You".
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 w-full">
            
            {/* LEFT: PILLARS LIST */}
            <div className="w-full lg:w-5/12 flex flex-col gap-4 shrink-0">
              {PILLARS.map((pillar) => (
                <button
                  key={pillar.id}
                  onClick={() => setActivePillar(pillar.id)}
                  className={cn(
                    "block w-full text-left p-6 rounded-[2rem] transition-all duration-500 border-2 group relative overflow-hidden",
                    activePillar === pillar.id 
                      ? "bg-white border-primary-400 shadow-2xl shadow-primary-900/40 scale-[1.02] z-10" 
                      : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20"
                  )}
                >
                  <div className="flex items-center gap-5 relative z-10 w-full">
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-500 shadow-inner",
                      activePillar === pillar.id 
                        ? pillar.color 
                        : "bg-white/10 text-white"
                    )}>
                      <pillar.icon className="w-7 h-7" />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <h3 className={cn(
                        "font-black text-lg truncate transition-colors",
                        activePillar === pillar.id ? "text-slate-900" : "text-white"
                      )}>
                        {pillar.title}
                      </h3>
                      <p className={cn(
                        "text-[10px] font-bold uppercase tracking-widest truncate",
                        activePillar === pillar.id ? pillar.accentColor : "text-primary-300/60"
                      )}>
                        {pillar.subtitle}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* RIGHT: DETAIL DISPLAY */}
            <div className="w-full lg:flex-1 shrink-0">
              <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-soft-xl border border-white/10 relative overflow-hidden min-h-[500px] flex flex-col animate-in fade-in duration-700 w-full">
                
                <div className="flex items-center gap-3 mb-10 w-full">
                  <div className="px-4 py-1.5 rounded-full bg-primary-900 text-white text-[10px] font-black uppercase tracking-widest shrink-0">
                    Detail Transformasi
                  </div>
                  <div className="h-px flex-1 bg-slate-100" />
                  <Sparkles className="w-5 h-5 text-accent-500 shrink-0" />
                </div>

                <div className="flex flex-col gap-10 flex-1 w-full">
                  {/* 1. MASALAH */}
                  <div className="space-y-4 w-full">
                    <div className="flex items-center gap-2 text-rose-600 shrink-0">
                      <Target className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Kendala / Masalah</span>
                    </div>
                    <p className="text-slate-900 text-2xl md:text-3xl font-black leading-tight italic break-words">
                      &quot;{activeData.detail.problem}&quot;
                    </p>
                  </div>

                  {/* 2. PRODUK & SOLUSI */}
                  <div className="flex flex-col sm:flex-row gap-6 w-full">
                    <div className="flex-1 space-y-3 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 w-full shadow-sm">
                      <div className="flex items-center gap-2 text-primary-600">
                        <div className="w-2 h-2 rounded-full bg-primary-600" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Produk</span>
                      </div>
                      <p className="text-slate-900 font-black text-sm md:text-base leading-tight">
                        {activeData.detail.product}
                      </p>
                    </div>
                    <div className="flex-1 space-y-3 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 w-full shadow-sm">
                      <div className="flex items-center gap-2 text-emerald-600">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Solusi</span>
                      </div>
                      <p className="text-slate-800 font-bold text-xs md:text-sm leading-relaxed">
                        {activeData.detail.solution}
                      </p>
                    </div>
                  </div>

                  {/* 3. BENEFIT */}
                  <div className="space-y-4 mt-auto pt-6 w-full">
                    <div className="flex items-center gap-2 text-accent-600 shrink-0">
                      <div className="w-5 h-5 rounded-full bg-accent-100 flex items-center justify-center">
                         <Sunrise className="w-3 h-3 text-accent-600" />
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-widest">The New You Result</span>
                    </div>
                    
                    {/* REDESIGNED CARD: Solid Brand Green */}
                    <div className="bg-primary-600 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl shadow-primary-900/20 relative overflow-hidden group w-full">
                       {/* Subtle Textures */}
                       <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
                            style={{
                              backgroundImage: TOPO_WHITE,
                              backgroundSize: '200px 200px',
                            }}
                       />
                       
                       <div className="relative z-10 space-y-4">
                          <div className="space-y-1">
                             <p className="text-[10px] font-black text-primary-100/60 uppercase tracking-[0.2em]">Transformasi Akhir</p>
                             <p className="text-2xl md:text-3xl font-black tracking-tight leading-tight">
                               {activeData.detail.benefit}
                             </p>
                          </div>
                          
                          <div className="flex items-center gap-3 pt-2">
                             <div className="h-1 w-12 bg-accent-400 rounded-full" />
                             <p className="text-[10px] font-black uppercase tracking-widest text-primary-100/80 italic">Ready to Bloom</p>
                             <Sparkles className="w-3 h-3 text-accent-300 animate-pulse" />
                          </div>
                       </div>

                       <ArrowRight className="absolute right-8 bottom-8 w-12 h-12 text-white/5 group-hover:translate-x-2 group-hover:text-white/10 transition-all duration-500" />
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
