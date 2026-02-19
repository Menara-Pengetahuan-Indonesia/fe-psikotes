import {
  ArrowRight,
  CheckCircle2,
  Lock,
} from 'lucide-react'

import { cn } from '@/lib/utils'

const PREMIUM_BENEFITS = [
  'Strategy Report Karir Spesifik',
  'Analisa Kekuatan & Kelemahan Valid',
  'Panduan Pengembangan Diri Actionable',
]

export function PremiumUpsellSection() {
  return (
    <div
      className={cn(
        'bg-primary-900 rounded-3xl',
        'p-8 md:p-12 border border-primary-800',
        'shadow-xl relative overflow-hidden',
        'text-white',
      )}
    >
      <div
        className={cn(
          'relative z-10',
          'grid md:grid-cols-2 gap-8',
          'items-center',
        )}
      >
        <div className="space-y-6">
          <div
            className={cn(
              'inline-flex items-center gap-2',
              'text-accent-400 font-bold',
              'text-xs uppercase tracking-widest',
            )}
          >
            <Lock className="w-3 h-3" />
            Unlock: Premium
          </div>
          <h3
            className={cn(
              'text-2xl md:text-3xl',
              'font-black tracking-tight',
              'leading-tight',
            )}
          >
            Buka Analisa Mendalam Potensi Dirimu
          </h3>
          <p
            className={cn(
              'text-primary-300 text-sm',
              'leading-relaxed',
            )}
          >
            Hasil di atas hanya 10% dari potensi
            aslimu. Dapatkan laporan premium
            setebal 40+ halaman yang menganalisa
            karir, asmara, dan kekuatan
            tersembunyi.
          </p>
          <ul className="space-y-3">
            {PREMIUM_BENEFITS.map((item) => (
              <li
                key={item}
                className={cn(
                  'flex items-center gap-3',
                  'text-sm text-primary-200',
                  'font-medium',
                )}
              >
                <CheckCircle2
                  className="w-4 h-4 text-white"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing Box */}
        <div
          className={cn(
            'bg-white/5 rounded-2xl p-6',
            'border border-white/10',
            'backdrop-blur-sm space-y-4',
          )}
        >
          <div
            className={cn(
              'text-center pb-4',
              'border-b border-white/10',
            )}
          >
            <span
              className={cn(
                'text-primary-300',
                'line-through text-xs',
              )}
            >
              Rp 350.000
            </span>
            <div
              className={cn(
                'text-3xl font-black',
                'text-white',
              )}
            >
              Rp 199.000
            </div>
          </div>
          <button
            className={cn(
              'w-full py-4 bg-white',
              'text-primary-900 rounded-xl',
              'font-bold uppercase',
              'tracking-wider text-xs',
              'hover:bg-primary-50',
              'transition-all flex',
              'items-center justify-center',
              'gap-2',
            )}
          >
            Upgrade ke Premium
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
