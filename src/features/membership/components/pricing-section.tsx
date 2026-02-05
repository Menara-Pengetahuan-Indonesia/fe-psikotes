import { CheckCircle2 } from 'lucide-react'

const LITE_BENEFITS = [
  'Akses Komunitas Telegram',
  '1x Webinar Bulanan',
  'Diskon 10% Layanan',
]

const PRO_BENEFITS = [
  'Akses Komunitas Exclusive',
  'Weekly Premium Webinar',
  'Akses 50+ Psikotes Premium',
  'Diskon 30% Konseling Psikolog',
  'Rekaman Webinar Unlimited',
]

export function PricingSection() {
  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4">Investasi Terbaik untuk Dirimu</h2>
          <p className="text-slate-500">Pilih paket membership yang sesuai dengan kebutuhan pertumbuhanmu.</p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Lite Plan */}
          <div className="p-8 rounded-[32px] border border-slate-200 bg-white hover:border-slate-300 transition-all relative overflow-hidden group">
            <div className="space-y-4 mb-8">
              <span className="text-slate-500 font-bold uppercase text-xs tracking-wider">Membership Lite</span>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900">Rp49.000</span>
                <span className="text-sm text-slate-400 font-medium">/ bulan</span>
              </div>
              <p className="text-sm text-slate-500">Untuk kamu yang baru memulai perjalanan self-growth.</p>
            </div>
            <button className="w-full py-4 bg-slate-50 text-slate-900 font-bold rounded-xl mb-8 group-hover:bg-slate-100 transition-colors">
              Pilih Paket Lite
            </button>
            <ul className="space-y-4 text-sm text-slate-600">
              {LITE_BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-slate-400" /> {benefit}
                </li>
              ))}
            </ul>
          </div>

          {/* Pro Plan */}
          <div className="p-8 rounded-[32px] bg-slate-900 text-white relative overflow-hidden transform md:-translate-y-4 shadow-2xl shadow-slate-200">
            <div className="absolute top-0 right-0 bg-white text-black text-[10px] font-bold px-4 py-2 rounded-bl-xl uppercase tracking-wider">
              Most Popular
            </div>
            <div className="space-y-4 mb-8">
              <span className="text-slate-400 font-bold uppercase text-xs tracking-wider">Membership Pro</span>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-white">Rp99.000</span>
                <span className="text-sm text-slate-400 font-medium">/ 3 bulan</span>
              </div>
              <p className="text-sm text-slate-400">Paket lengkap untuk akselerasi pertumbuhan diri maksimal.</p>
            </div>
            <button className="w-full py-4 bg-white text-black font-bold rounded-xl mb-8 hover:bg-slate-200 transition-colors">
              Pilih Paket Pro
            </button>
            <ul className="space-y-4 text-sm text-slate-300">
              {PRO_BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 font-medium">
                  <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center text-black">
                    <CheckCircle2 className="w-3 h-3" />
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
