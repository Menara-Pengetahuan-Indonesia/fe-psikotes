'use client'

import { useState } from 'react'
import {
  ChevronDown,
  HelpCircle,
} from 'lucide-react'

import { cn } from '@/lib/utils'

import { SectionHeading } from './test-detail-section-heading'

const FAQ_ITEMS = [
  {
    q: 'Berapa lama waktu yang diperlukan'
      + ' untuk menyelesaikan tes ini?',
    a: 'Durasi tes bervariasi tergantung'
      + ' jenis tes, umumnya berkisar antara'
      + ' 10-45 menit. Anda dapat melihat'
      + ' estimasi waktu di bagian atas.',
  },
  {
    q: 'Apakah hasil tes bisa digunakan'
      + ' untuk keperluan akademik?',
    a: 'Ya, hasil tes kami telah tervalidasi'
      + ' secara ilmiah dan dapat digunakan'
      + ' sebagai referensi untuk keperluan'
      + ' akademik maupun profesional.',
  },
  {
    q: 'Dapatkah saya mengulang tes'
      + ' setelah selesai?',
    a: 'Anda dapat mengulang tes kapan saja'
      + ' dengan melakukan pembelian ulang.'
      + ' Hasil sebelumnya tetap tersimpan'
      + ' di akun Anda.',
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<
    number | null
  >(null)

  return (
    <div className="space-y-6">
      <SectionHeading
        color="sky"
        label="Pertanyaan Umum"
      />

      <div className="space-y-3">
        {FAQ_ITEMS.map((faq, i) => {
          const isOpen = openIndex === i

          return (
            <div
              key={i}
              className={cn(
                'bg-white rounded-3xl',
                'border transition-all',
                'duration-500 overflow-hidden',
                isOpen
                  ? 'border-primary-500'
                    + ' shadow-xl'
                    + ' shadow-primary-900/5'
                  : 'border-slate-100'
                    + ' shadow-lg'
                    + ' shadow-stone-200/50'
                    + ' hover:border-slate-200',
              )}
            >
              <button
                onClick={() =>
                  setOpenIndex(
                    isOpen ? null : i,
                  )
                }
                className={cn(
                  'w-full flex items-center',
                  'justify-between p-5',
                  'text-left cursor-pointer',
                )}
              >
                <div
                  className={cn(
                    'flex items-center gap-3',
                  )}
                >
                  <div
                    className={cn(
                      'w-8 h-8 rounded-lg',
                      'flex items-center',
                      'justify-center shrink-0',
                      'transition-colors',
                      isOpen
                        ? 'bg-primary-600'
                          + ' text-white'
                        : 'bg-slate-50'
                          + ' text-slate-400',
                    )}
                  >
                    <HelpCircle
                      className="h-4 w-4"
                    />
                  </div>
                  <span
                    className={cn(
                      'text-sm font-bold',
                      'transition-colors',
                      isOpen
                        ? 'text-slate-900'
                        : 'text-slate-700',
                    )}
                  >
                    {faq.q}
                  </span>
                </div>
                <ChevronDown
                  className={cn(
                    'w-4 h-4 shrink-0 ml-3',
                    'transition-transform',
                    'duration-500',
                    isOpen
                      ? 'rotate-180'
                        + ' text-primary-600'
                      : 'text-slate-300',
                  )}
                />
              </button>

              <div
                className={cn(
                  'grid transition-all',
                  'duration-500 ease-in-out',
                  isOpen
                    ? 'grid-rows-[1fr]'
                      + ' opacity-100'
                    : 'grid-rows-[0fr]'
                      + ' opacity-0',
                )}
              >
                <div className="overflow-hidden">
                  <div
                    className={cn(
                      'px-5 pb-5 pt-0 ml-11',
                    )}
                  >
                    <p
                      className={cn(
                        'text-sm text-slate-500',
                        'leading-relaxed',
                        'font-medium',
                      )}
                    >
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
  )
}
