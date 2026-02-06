'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const MEMBERSHIP_FAQS = [
  {
    q: 'Apakah membership bisa dibatalkan kapan saja?',
    a: 'Ya, membership bersifat fleksibel. Anda dapat membatalkan perpanjangan otomatis kapan saja melalui dashboard member area.',
  },
  {
    q: 'Bagaimana cara mengakses webinar mingguan?',
    a: 'Link webinar akan dikirimkan melalui email dan grup komunitas H-1 sebelum acara dimulai. Pastikan email Anda aktif.',
  },
  {
    q: 'Apakah ada grup diskusi khusus?',
    a: 'Tentu! Member Pro akan mendapatkan akses ke Circle Group eksklusif berdasarkan minat (Karir, Relationship, Self-Development) yang dipandu mentor.',
  },
  {
    q: 'Apa bedanya Lite dan Pro?',
    a: 'Lite cocok untuk pemula dengan akses dasar webinar bulanan. Pro memberikan akses penuh ke seluruh ekosistem, termasuk tes premium gratis dan webinar mingguan.',
  },
]

export function MembershipFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl font-black tracking-tight text-slate-900">FAQ Membership</h2>
          <p className="text-slate-500">Pertanyaan umum seputar keanggotaan komunitas Bermoela.</p>
        </div>

        <div className="space-y-4">
          {MEMBERSHIP_FAQS.map((faq, i) => {
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
