'use client'

import { 
  Users, 
  Award, 
  HeartHandshake, 
  ArrowRight, 
  Sparkles,
  Flower2,
  CheckCircle2
} from 'lucide-react'

export function PsikotesJoinPractitioner() {
  return (
    <section id="komunitas" className="py-24 bg-linear-to-b from-white to-accent-50/30 relative overflow-hidden">

      {/* Background Ornaments */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-primary-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Persuasive Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-accent-200 shadow-sm">
                <Sparkles className="w-4 h-4 text-accent-500 fill-accent-500" />
                <span className="text-[11px] font-black text-slate-600 uppercase tracking-[0.2em]">Become a Solution Provider</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none">
                Berikan Solusi Bagi <span className="text-primary-600">Lainnya.</span>
              </h2>
              <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-xl">
                Banyak cara untuk sukses dan semua bisa bermula dari sini. Jadilah bagian dari perubahan besar dengan bergabung sebagai praktisi mental health tersertifikasi.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
               <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600">
                    <Award className="w-6 h-6" />
                  </div>
                  <h4 className="font-black text-slate-800 uppercase text-xs tracking-widest">Sertifikasi Resmi</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">Dapatkan lisensi sebagai Mental Health Practitioner yang diakui secara profesional.</p>
               </div>
               <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-accent-100 flex items-center justify-center text-accent-600">
                    <Users className="w-6 h-6" />
                  </div>
                  <h4 className="font-black text-slate-800 uppercase text-xs tracking-widest">Komunitas Eksklusif</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">Bergabunglah dalam ekosistem para ahli untuk terus tumbuh satu persen lebih baik setiap harinya.</p>
               </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
               <button className="h-16 px-10 rounded-2xl bg-slate-900 text-white font-black text-sm uppercase tracking-widest hover:bg-primary-600 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3">
                  Gabung Sekarang <ArrowRight className="w-5 h-5" />
               </button>
               <button className="h-16 px-10 rounded-2xl bg-white border-2 border-slate-100 text-slate-600 font-black text-sm uppercase tracking-widest hover:border-primary-600 transition-all flex items-center justify-center gap-3">
                  Pelajari Alurnya <HeartHandshake className="w-5 h-5" />
               </button>
            </div>
          </div>

          {/* Right: Visual Success Card (The New You Practitioner) */}
          <div className="relative">
             {/* Main Card */}
             <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-slate-100 relative z-20 overflow-hidden group">
                <div className="flex flex-col items-center text-center space-y-6">
                   <div className="relative">
                      <div className="w-32 h-32 rounded-full bg-slate-100 border-4 border-white shadow-lg overflow-hidden flex items-center justify-center text-5xl grayscale group-hover:grayscale-0 transition-all duration-700">
                         👩‍💼
                      </div>
                      <div className="absolute -right-2 -bottom-2 w-10 h-10 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center">
                         <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                   </div>

                   <div className="space-y-1">
                      <h4 className="text-2xl font-black text-slate-900 tracking-tight leading-none italic">&quot;The New You&quot;</h4>
                      <p className="text-[10px] font-black text-primary-600 uppercase tracking-widest">Certified Life Coach</p>
                   </div>

                   <p className="text-slate-500 font-medium italic text-sm leading-relaxed">
                     &quot;Dulu aku merasa stuck dan tidak berdaya. Di BERMOELA aku menemukan jati diriku yang baru, dan kini aku bangga bisa membantu ribuan wanita lain menemukan masa depan mereka yang indah.&quot;
                   </p>

                   <div className="w-full h-px bg-slate-100" />

                   <div className="flex items-center gap-6">
                      <div className="text-center">
                         <p className="text-xl font-black text-slate-900">500+</p>
                         <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Sesi Selesai</p>
                      </div>
                      <div className="w-px h-8 bg-slate-100" />
                      <div className="text-center">
                         <p className="text-xl font-black text-slate-900">4.9/5</p>
                         <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Rating Puas</p>
                      </div>
                      <div className="w-px h-8 bg-slate-100" />
                      <div className="text-center">
                         <p className="text-xl font-black text-slate-900">100%</p>
                         <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Impactful</p>
                      </div>
                   </div>
                </div>

                {/* Decorative Flowers inside card */}
                <Flower2 className="absolute -top-4 -right-4 w-12 h-12 text-primary-100 rotate-12 opacity-50" />
             </div>

             {/* Floating Badge */}
             <div className="absolute -top-8 -right-8 w-32 h-32 bg-accent-500 rounded-full z-30 flex items-center justify-center text-center p-4 shadow-2xl shadow-accent-200 rotate-12">
                <p className="text-white font-black text-[10px] uppercase tracking-widest leading-tight">
                  Mulai Sukses Dari Sini
                </p>
             </div>

             {/* Background Decoration */}
             <div className="absolute inset-10 bg-primary-600/10 rounded-[4rem] -rotate-6 -z-10" />
          </div>

        </div>
      </div>

    </section>
  )
}
