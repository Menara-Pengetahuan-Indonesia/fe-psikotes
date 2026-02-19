import { CheckCircle2, Sparkles, Star, Zap } from 'lucide-react'

const LITE_BENEFITS = [
  'Akses Komunitas Telegram',
  '1x Webinar Bulanan',
  'Diskon 10% Layanan Bermoela',
  'Update Event Terbaru',
]

const PRO_BENEFITS = [
  'Akses Komunitas Exclusive',
  'Weekly Premium Webinar',
  'Akses 50+ Psikotes Premium',
  'Diskon 30% Konseling Psikolog',
  'Rekaman Webinar Unlimited',
  'Priority Customer Support',
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 md:py-36 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-2">
            <Zap className="w-3.5 h-3.5 text-accent-500 fill-accent-500" />
            <span className="text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase">
              Choose Your Path
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Investasi Terbaik <span className="text-konseling-600">untuk Dirimu</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            Pilih paket membership yang sesuai dengan kebutuhan pertumbuhanmu dan dapatkan akses tak terbatas.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-start">
          {/* Lite Plan */}
          <div className="group relative p-10 rounded-[3rem] border border-slate-100 bg-white transition-all duration-500 hover:-translate-y-2 shadow-xl shadow-stone-200/50 hover:shadow-2xl">
            <div className="space-y-6 mb-10">
              <div className="flex justify-between items-start">
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Membership Lite</span>
                 <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                    <Star className="w-5 h-5" />
                 </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black text-slate-900 tracking-tight">Rp49k</span>
                <span className="text-sm text-slate-400 font-bold uppercase tracking-widest">/ bln</span>
              </div>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">Untuk kamu yang baru memulai perjalanan self-growth secara mandiri.</p>
            </div>
            
            <button className="w-full py-4 bg-slate-50 text-slate-900 font-black text-xs uppercase tracking-widest rounded-2xl mb-10 hover:bg-slate-950 hover:text-white transition-all border border-slate-100">
              Pilih Paket Lite
            </button>

            <ul className="space-y-5">
              {LITE_BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 text-sm font-bold text-slate-600">
                  <div className="w-5 h-5 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center shrink-0 border border-slate-100">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          {/* Pro Plan */}
          <div className="group relative p-10 rounded-[3rem] border border-slate-900 bg-slate-950 text-white transition-all duration-500 hover:-translate-y-2 shadow-2xl shadow-konseling-950/20 md:-translate-y-6">
            {/* Pop Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent-400 text-slate-950 text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-[0.2em] shadow-lg border-2 border-slate-950 flex items-center gap-2">
              <Sparkles className="w-3 h-3 fill-slate-950" />
              Most Popular
            </div>

            <div className="space-y-6 mb-10 mt-4">
              <div className="flex justify-between items-start">
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-konseling-300">Membership Pro</span>
                 <div className="w-10 h-10 rounded-xl bg-konseling-500/20 flex items-center justify-center text-accent-400 border border-konseling-500/30">
                    <Zap className="w-5 h-5 fill-accent-400" />
                 </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black text-white tracking-tight">Rp99k</span>
                <span className="text-sm text-konseling-300 font-bold uppercase tracking-widest">/ 3 bln</span>
              </div>
              <p className="text-sm text-slate-400 font-medium leading-relaxed">Paket lengkap untuk akselerasi pertumbuhan diri maksimal dengan dukungan penuh.</p>
            </div>

            <button className="w-full py-4 bg-accent-400 text-slate-950 font-black text-xs uppercase tracking-widest rounded-2xl mb-10 hover:bg-white transition-all shadow-xl shadow-accent-400/20">
              Pilih Paket Pro
            </button>

            <ul className="space-y-5">
              {PRO_BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 text-sm font-bold text-slate-200">
                  <div className="w-5 h-5 rounded-lg bg-konseling-500/20 text-accent-400 flex items-center justify-center shrink-0 border border-konseling-500/30 shadow-inner">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}