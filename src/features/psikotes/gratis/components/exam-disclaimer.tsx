import { AlertCircle } from 'lucide-react'

import { cn } from '@/lib/utils'

export function ExamDisclaimer() {
  return (
    <div
      className={cn(
        'bg-background py-12 px-6 mt-auto',
      )}
    >
      <div className="max-w-3xl mx-auto">
        <div
          className={cn(
            'bg-red-50 border border-red-100',
            'rounded-3xl p-6',
            'flex flex-col md:flex-row',
            'gap-6 items-start',
          )}
        >
          <div
            className={cn(
              'w-10 h-10 bg-white',
              'rounded-full flex items-center',
              'justify-center text-red-500',
              'shadow-sm flex-shrink-0',
            )}
          >
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h4
              className={cn(
                'font-bold text-red-900 mb-2',
              )}
            >
              Disclaimer
            </h4>
            <p
              className={cn(
                'text-red-700/80 text-xs',
                'leading-relaxed max-w-2xl',
              )}
            >
              Jika Anda sedang mengalami krisis
              psikologis yang mengancam hidup Anda
              (seperti keinginan menyakiti diri
              sendiri atau bunuh diri), layanan
              ini{' '}
              <strong>TIDAK</strong>{' '}
              direkomendasikan. Segera hubungi
              profesional kesehatan mental terdekat
              atau layanan darurat{' '}
              <strong>119</strong> /{' '}
              <strong>112</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
