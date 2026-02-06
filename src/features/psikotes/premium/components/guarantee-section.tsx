import { ShieldCheck, Sparkles } from 'lucide-react'

export function GuaranteeSection() {
  return (
    <section className="py-24 px-6 bg-[#F8F7FF]">
      <div className="max-w-5xl mx-auto">
        <div className="relative group p-10 md:p-16 bg-white rounded-[3rem] border border-slate-100 text-center space-y-8 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-900/5 hover:-translate-y-1 shadow-xl shadow-stone-200/50 overflow-hidden">
          {/* Decorative Corner Ornaments */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-50 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-50 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />

          <div className="relative z-10 space-y-8">
            <div className="w-20 h-20 mx-auto bg-amber-400 rounded-3xl flex items-center justify-center text-slate-950 shadow-lg group-hover:rotate-6 transition-transform duration-500 border-4 border-white">
              <ShieldCheck className="w-10 h-10" />
            </div>
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 text-purple-600 border border-purple-100 text-[10px] font-black uppercase tracking-widest">
                <Sparkles className="w-3 h-3" />
                Trusted Assurance
              </div>
              <h3 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">Jaminan Kepuasan 100%</h3>
              <p className="text-lg text-slate-500 max-w-xl mx-auto font-medium leading-relaxed">
                Kami berkomitmen memberikan kualitas terbaik. Jika Anda tidak puas dengan kedalaman laporan atau mengalami kendala teknis, tim kami siap membantu atau memberikan pengembalian dana sepenuhnya.
              </p>
            </div>

            <div className="pt-4">
               <button className="px-10 py-4 bg-purple-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-purple-700 transition-all shadow-lg hover:shadow-purple-200">
                  Pelajari Kebijakan Kami
               </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}