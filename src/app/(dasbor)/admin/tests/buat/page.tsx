'use client'

import { TestForm } from '@/features/admin/components/TestManagement/TestForm'
import { ArrowLeft, BookPlus } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function CreateTestPage() {
  const router = useRouter()

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* HERO BANNER */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 p-8 md:p-10 text-white">
        <div className="relative z-10">
          <button
            onClick={() => router.push('/admin/tests')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 group"
          >
            <div className="size-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <ArrowLeft className="size-4" />
            </div>
            <span className="text-sm font-bold">Kembali ke Kelola Tes</span>
          </button>

          <div className="flex items-center gap-4">
            <div className="size-14 rounded-2xl bg-gradient-to-br from-indigo-400 to-indigo-500 flex items-center justify-center shadow-lg">
              <BookPlus className="size-7" />
            </div>
            <div>
              <p className="text-indigo-300 font-black text-[10px] uppercase tracking-[0.3em] mb-1">
                Buat Baru
              </p>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight">
                Instrumen Tes Baru.
              </h1>
              <p className="text-slate-400 font-medium text-sm mt-1">
                Buat wadah tes psikotes baru sebelum mengisi butir-butir soal.
              </p>
            </div>
          </div>
        </div>

        {/* Decorative */}
        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
          <BookPlus className="size-72" />
        </div>
      </div>

      {/* FORM */}
      <TestForm />
    </div>
  )
}
