'use client'

import { useRef, useState } from 'react'
import { Download, Share2, Brain, Award, Loader2 } from 'lucide-react'

import type { ResultData } from '@/features/psikotes/constants'

interface ResultCardSectionProps {
  result: ResultData
}

const COLOR_PROPS = [
  'color', 'background-color', 'border-color', 'border-top-color',
  'border-right-color', 'border-bottom-color', 'border-left-color',
  'outline-color', 'text-decoration-color', 'box-shadow', 'fill', 'stroke',
] as const

export function ResultCardSection({ result }: ResultCardSectionProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [downloading, setDownloading] = useState(false)

  const handleDownloadPdf = async () => {
    if (!cardRef.current) return
    setDownloading(true)
    try {
      const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
        import('jspdf'),
        import('html2canvas'),
      ])

      const root = cardRef.current
      const liveEls = [root, ...Array.from(root.querySelectorAll('*'))] as HTMLElement[]
      const snapshots = liveEls.map((el) => {
        const cs = window.getComputedStyle(el)
        return COLOR_PROPS.reduce<Record<string, string>>((acc, p) => {
          acc[p] = cs.getPropertyValue(p)
          return acc
        }, {})
      })

      const canvas = await html2canvas(root, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        onclone: (_doc, clonedEl) => {
          const clonedEls = [clonedEl, ...Array.from(clonedEl.querySelectorAll('*'))] as HTMLElement[]
          clonedEls.forEach((el, i) => {
            const snap = snapshots[i]
            if (!snap) return
            COLOR_PROPS.forEach((p) => {
              if (snap[p]) el.style.setProperty(p, snap[p])
            })
          })
        },
      })

      const imgData = canvas.toDataURL('image/png')
      const { default: JsPDF } = await import('jspdf')
      const pdf = new JsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
      const pageW = pdf.internal.pageSize.getWidth()
      const pageH = pdf.internal.pageSize.getHeight()
      const imgW = pageW
      const imgH = (canvas.height * imgW) / canvas.width
      let y = 0
      while (y < imgH) {
        if (y > 0) pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, -y, imgW, imgH)
        y += pageH
      }
      pdf.save(`Hasil_${result.code}_${result.title.replace(/\s+/g, '_')}.pdf`)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div ref={cardRef} className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
      {/* Result Card */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900 overflow-hidden flex flex-col items-center justify-center text-center py-12 px-8 text-white">
        <div className="relative z-10 space-y-5">
          <div className="inline-block px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-[10px] font-black uppercase tracking-[0.2em] text-primary-300">
            Personality Type
          </div>

          <div className="space-y-2">
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter">
              {result.code}
            </h2>
            <h3 className="text-xl md:text-2xl font-bold text-slate-400 tracking-tight">
              {result.title}
            </h3>
          </div>

          {/* Icon */}
          <div className="size-20 mx-auto relative">
            <div className="absolute inset-0 border-2 border-white/10 rounded-full" />
            <div className="absolute inset-3 border border-white/5 rounded-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Brain className="size-9 text-white opacity-80" strokeWidth={1} />
            </div>
          </div>
        </div>

        <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none">
          <Award className="size-64" />
        </div>
      </div>

      {/* Description + Actions */}
      <div className="p-8 space-y-5">
        <p className="text-sm text-slate-500 text-center max-w-md mx-auto leading-relaxed">
          {result.description}
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleDownloadPdf}
            disabled={downloading}
            className="w-full h-12 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-lg active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {downloading ? (
              <><Loader2 className="size-4 animate-spin" /> Membuat PDF...</>
            ) : (
              <><Download className="size-4" /> Download Laporan Lengkap (PDF)</>
            )}
          </button>
          <button className="w-full h-12 bg-white border border-slate-200 text-slate-900 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-slate-50 hover:border-slate-300 transition-colors flex items-center justify-center gap-2">
            <Share2 className="size-4" />
            Bagikan Hasil
          </button>
        </div>
      </div>
    </div>
  )
}
