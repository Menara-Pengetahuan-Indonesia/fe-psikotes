import { Brain } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface ExamStartScreenProps {
  onStart: () => void
}

export function ExamStartScreen({
  onStart,
}: ExamStartScreenProps) {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#F2F2F7] flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white rounded-[3rem] shadow-2xl p-12 text-center space-y-8 animate-in fade-in zoom-in duration-700">
        <div className="size-20 bg-primary-50 rounded-3xl flex items-center justify-center mx-auto text-primary-600 shadow-lg">
          <Brain className="size-10" />
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Try Out Mahasiswa
          </h1>
          <p className="text-slate-500 font-bold">
            Tekan tombol di bawah untuk memulai ujian.
          </p>
        </div>
        <Button
          size="lg"
          className="w-full bg-primary-600 h-16 rounded-2xl text-xl font-black shadow-xl"
          onClick={onStart}
        >
          MULAI SEKARANG
        </Button>
      </div>
    </div>
  )
}
