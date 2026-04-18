import { CheckCircle2, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ExamSubmitModalProps {
  answeredCount?: number
  totalQuestions?: number
  onCancel: () => void
  onConfirm: () => void
}

export function ExamSubmitModal({
  answeredCount = 0,
  totalQuestions = 0,
  onCancel,
  onConfirm,
}: ExamSubmitModalProps) {
  const allAnswered = answeredCount === totalQuestions

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full shadow-2xl space-y-6 text-center">
        <div className={cn(
          'size-16 rounded-2xl flex items-center justify-center mx-auto',
          allAnswered ? 'bg-teal-100' : 'bg-amber-100'
        )}>
          {allAnswered ? (
            <CheckCircle2 className="size-8 text-teal-600" />
          ) : (
            <AlertTriangle className="size-8 text-amber-600" />
          )}
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-black text-slate-900">
            {allAnswered ? 'Selesaikan Tes?' : 'Belum Semua Dijawab'}
          </h3>
          <p className="text-sm text-slate-400 font-medium">
            {allAnswered
              ? 'Pastikan semua jawaban sudah sesuai. Anda tidak dapat mengubah jawaban setelah ini.'
              : `Anda baru menjawab ${answeredCount} dari ${totalQuestions} soal. Yakin ingin mengirim?`
            }
          </p>
        </div>

        {/* Progress indicator */}
        <div className="px-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400">{answeredCount}/{totalQuestions} dijawab</span>
            <span className="text-xs font-black text-slate-900">{Math.round((answeredCount / totalQuestions) * 100)}%</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={cn('h-full rounded-full transition-colors', allAnswered ? 'bg-teal-500' : 'bg-amber-500')}
              style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={onCancel}
            className="flex-1 h-12 bg-white border border-slate-200 text-slate-900 rounded-xl font-black text-sm hover:bg-slate-50 transition-colors"
          >
            Kembali
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 h-12 bg-slate-900 text-white rounded-xl font-black text-sm hover:bg-slate-800 transition-colors shadow-lg active:scale-95"
          >
            Ya, Kirim
          </button>
        </div>
      </div>
    </div>
  )
}
