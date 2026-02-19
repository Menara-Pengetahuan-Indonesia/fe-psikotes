import { CheckCircle2 } from 'lucide-react'

import { cn } from '@/lib/utils'

interface ExamSubmitModalProps {
  onCancel: () => void
  onConfirm: () => void
}

export function ExamSubmitModal({
  onCancel,
  onConfirm,
}: ExamSubmitModalProps) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-50',
        'flex items-center justify-center p-6',
        'bg-black/50 backdrop-blur-sm',
      )}
    >
      <div
        className={cn(
          'bg-white rounded-3xl p-8',
          'max-w-sm w-full',
          'shadow-2xl shadow-slate-900/20',
          'space-y-6 text-center',
        )}
      >
        <div
          className={cn(
            'w-16 h-16 bg-primary-50',
            'rounded-full flex items-center',
            'justify-center mx-auto mb-2',
            'border border-primary-200',
          )}
        >
          <CheckCircle2
            className="w-8 h-8 text-primary-600"
          />
        </div>
        <div className="space-y-2">
          <h3
            className={cn(
              'text-xl font-black',
              'text-stone-800',
            )}
          >
            Selesaikan Tes?
          </h3>
          <p
            className={cn(
              'text-sm text-stone-500',
              'font-medium',
            )}
          >
            Pastikan semua jawaban sudah sesuai.
            Anda tidak dapat mengubah jawaban
            setelah ini.
          </p>
        </div>
        <div className="flex gap-3 pt-2">
          <button
            onClick={onCancel}
            className={cn(
              'flex-1 py-3 bg-white',
              'border border-slate-200',
              'text-stone-800 rounded-2xl',
              'font-bold text-sm',
              'hover:bg-slate-50',
              'transition-colors',
            )}
          >
            Kembali
          </button>
          <button
            onClick={onConfirm}
            className={cn(
              'flex-1 py-3',
              'bg-primary-600 text-white',
              'rounded-2xl font-bold text-sm',
              'hover:bg-primary-700',
              'transition-colors shadow-lg',
              'shadow-primary-600/20',
            )}
          >
            Ya, Selesai
          </button>
        </div>
      </div>
    </div>
  )
}
