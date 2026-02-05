import { CheckCircle2 } from 'lucide-react'

export function GuaranteeSection() {
  return (
    <section className="py-20 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="p-8 md:p-12 bg-white rounded-3xl border border-slate-200 text-center space-y-6">
          <div className="w-12 h-12 mx-auto bg-black rounded-full flex items-center justify-center text-white">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-black tracking-tight">Jaminan Kepuasan 100%</h3>
          <p className="text-slate-500 max-w-lg mx-auto">
            Jika Anda tidak puas dengan kualitas laporan atau mengalami kendala teknis, kami akan mengembalikan uang Anda sepenuhnya.
          </p>
        </div>
      </div>
    </section>
  )
}
