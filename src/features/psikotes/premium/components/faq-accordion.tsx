'use client'

import { useState } from 'react'
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const FAQS = [
  {
    q: 'Apakah hasil tes bisa langsung didapatkan?',
    a: 'Ya, untuk sebagian besar tes (IQ, Kepribadian), hasil akan keluar otomatis (real-time) setelah Anda menyelesaikan pengerjaan. Untuk tes yang membutuhkan validasi psikolog (seperti MMPI-2 atau screening klinis), hasil maksimal H+1 kerja.',
  },
  {
    q: 'Apakah tes ini valid untuk keperluan lamaran kerja?',
    a: 'Tentu. Alat tes yang kami gunakan (IST, CFIT, MMPI, DISC) adalah standar industri yang digunakan oleh HRD perusahaan nasional maupun multinasional. Laporan kami dilengkapi kop resmi Bermoela.',
  },
  {
    q: 'Bagaimana jika koneksi internet terputus saat tes?',
    a: 'Sistem kami memiliki fitur auto-save. Anda bisa login kembali dan melanjutkan tes dari sesi terakhir yang tersimpan tanpa kehilangan progres.',
  },
  {
    q: 'Apakah ada sesi konsultasi setelah tes?',
    a: 'Paket Premium sudah memberikan laporan lengkap yang self-explanatory. Namun jika Anda butuh pendalaman, Anda bisa memesan sesi konseling terpisah dengan psikolog kami dengan harga khusus member.',
  },
]

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-24 md:py-36 bg-[#F8F7FF]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-2">
            <Sparkles className="w-3.5 h-3.5 text-purple-600 fill-purple-600" />
            <span className="text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase">
              Help Center
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Pertanyaan <span className="text-purple-600">Umum</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto font-medium">
            Temukan jawaban cepat atas kendala atau pertanyaan yang sering diajukan pengguna.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i

            return (
              <div 
                key={i} 
                className={cn(
                  "bg-white rounded-3xl border transition-all duration-500 overflow-hidden",
                  isOpen 
                    ? "border-purple-500 shadow-xl shadow-purple-900/5 ring-1 ring-purple-500/10" 
                    : "border-slate-100 shadow-lg shadow-stone-200/50 hover:border-slate-200"
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex cursor-pointer items-center justify-between p-6 md:p-8 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                      isOpen ? "bg-purple-600 text-white" : "bg-slate-50 text-slate-400"
                    )}>
                      <HelpCircle className="h-5 w-5" />
                    </div>
                    <h3 className={cn(
                      "font-black text-lg transition-colors",
                      isOpen ? "text-slate-900" : "text-slate-700"
                    )}>
                      {faq.q}
                    </h3>
                  </div>
                  <span
                    className={cn(
                      "ml-4 shrink-0 rounded-full p-2 transition-all",
                      isOpen ? "bg-purple-50 text-purple-600" : "bg-slate-50 text-slate-300"
                    )}
                  >
                    <ChevronDown className={cn("h-5 w-5 transition-transform duration-500", isOpen && "rotate-180")} />
                  </span>
                </button>

                <div className={cn(
                  "grid transition-all duration-500 ease-in-out",
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                )}>
                  <div className="overflow-hidden">
                    <div className="px-6 md:px-8 pb-8 pt-0 ml-14">
                      <p className="text-slate-500 leading-relaxed font-medium text-base">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}