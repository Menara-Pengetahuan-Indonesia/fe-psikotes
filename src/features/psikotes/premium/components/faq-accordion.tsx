'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

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
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">Informasi</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">FAQ</h2>
          <p className="text-slate-500">Pertanyaan yang sering diajukan mengenai layanan psikotes premium.</p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i

            return (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex cursor-pointer items-center justify-between p-6 text-left"
                >
                  <h3 className="font-bold text-slate-900 hover:text-black transition-colors">{faq.q}</h3>
                  <span
                    className={`ml-4 flex-shrink-0 rounded-full p-2 text-slate-400 transition-all ${
                      isOpen ? 'bg-black text-white' : 'bg-slate-50'
                    }`}
                  >
                    <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-slate-500 leading-relaxed text-sm">{faq.a}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
