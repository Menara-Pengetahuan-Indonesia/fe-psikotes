'use client'

import { useState, useRef, useCallback } from 'react'
import Papa from 'papaparse'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  Download,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  FileSpreadsheet,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useCreateQuestion, adminKeys } from '../../hooks'
import type { QuestionType } from '../../types'
import { QUESTION_TYPE_SHORT_LABELS, VALID_QUESTION_TYPES } from '@features/admin/constants'
import { cn } from '@/lib/utils'

interface BulkImportCSVProps {
  subTestId: string
}

interface ParsedRow {
  index: number
  text: string
  type: string
  options: string[]
  valid: boolean
  errors: string[]
}

export function BulkImportCSV({ subTestId }: BulkImportCSVProps) {
  const queryClient = useQueryClient()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const createQuestion = useCreateQuestion()

  const [parsedRows, setParsedRows] = useState<ParsedRow[]>([])
  const [fileName, setFileName] = useState<string | null>(null)
  const [importing, setImporting] = useState(false)
  const [progress, setProgress] = useState({ current: 0, total: 0 })
  const [isDragOver, setIsDragOver] = useState(false)

  const validRows = parsedRows.filter((r) => r.valid)
  const invalidRows = parsedRows.filter((r) => !r.valid)

  const handleDownloadTemplate = useCallback(() => {
    const headers = ['text', 'type', 'option1', 'option2', 'option3', 'option4']
    const exampleRows = [
      ['Apa ibu kota Indonesia?', 'MULTIPLE_CHOICE', 'Jakarta', 'Bandung', 'Surabaya', 'Medan'],
    ]
    const csvContent = [
      headers.join(','),
      ...exampleRows.map((row) => row.map((cell) => (cell.includes(',') ? `"${cell}"` : cell)).join(',')),
    ].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `template_soal_${subTestId}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }, [subTestId])

  const validateRow = useCallback((row: Record<string, string>, rowIndex: number): ParsedRow => {
    const errors: string[] = []
    const text = (row['text'] ?? '').trim()
    const type = (row['type'] ?? '').trim().toUpperCase()
    const options: string[] = []
    for (let i = 1; i <= 4; i++) options.push((row[`option${i}`] ?? '').trim())

    if (!text) errors.push('Teks soal tidak boleh kosong')
    if (!VALID_QUESTION_TYPES.includes(type as QuestionType))
      errors.push(`Tipe "${type}" tidak valid.`)
    const nonEmptyOptions = options.filter((o) => o !== '')
    if ((type === 'MULTIPLE_CHOICE' || type === 'CHECKBOX') && nonEmptyOptions.length < 2)
      errors.push('Butuh minimal 2 opsi')

    return { index: rowIndex, text, type, options, valid: errors.length === 0, errors }
  }, [])

  const parseFile = useCallback((file: File) => {
    setFileName(file.name)
    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data.map((row, i) => validateRow(row, i))
        setParsedRows(rows)
        if (rows.length === 0) toast.error('File CSV kosong')
        else toast.info(`Ditemukan ${rows.length} baris.`)
      },
    })
  }, [validateRow])

  const handleImport = useCallback(async () => {
    if (validRows.length === 0) return
    setImporting(true)
    setProgress({ current: 0, total: validRows.length })
    try {
      for (let i = 0; i < validRows.length; i++) {
        const row = validRows[i]
        const nonEmptyOptions = row.options
          .map((optionText, idx) => ({ optionText, order: idx + 1 }))
          .filter((o) => o.optionText !== '')
        await createQuestion.mutateAsync({
          subTestId,
          questionType: row.type as QuestionType,
          questionText: row.text,
          order: i + 1,
          points: 1,
          options: nonEmptyOptions.length > 0
            ? nonEmptyOptions.map((o) => ({ optionText: o.optionText, isCorrect: false, points: 0, order: o.order }))
            : undefined,
        })
        setProgress({ current: i + 1, total: validRows.length })
      }
      await queryClient.invalidateQueries({ queryKey: adminKeys.questions.all })
      toast.success(`Berhasil mengimpor ${validRows.length} soal`)
      setParsedRows([])
      setFileName(null)
    } catch {
      toast.error(`Gagal pada soal ke-${progress.current + 1}`)
    } finally {
      setImporting(false)
    }
  }, [validRows, createQuestion, subTestId, queryClient, progress])

  return (
    <div className="space-y-8">
      {/* TOOLBAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-xl font-black text-slate-900 tracking-tight">Bulk Import.</h3>
          <p className="text-slate-400 font-bold text-sm">Unggah ribuan soal sekaligus melalui file CSV.</p>
        </div>
        <Button variant="outline" onClick={handleDownloadTemplate} disabled={importing}
          className="rounded-2xl h-12 px-6 font-black border-2 hover:bg-slate-50 transition-all gap-2">
          <Download className="size-4" /> Unduh Template
        </Button>
      </div>

      {/* DROP ZONE */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragOver(false); const file = e.dataTransfer.files[0]; if (file) parseFile(file) }}
        onClick={() => !importing && fileInputRef.current?.click()}
        className={cn(
          'relative flex flex-col items-center justify-center gap-4 rounded-[3rem] border-4 border-dashed p-16 transition-all cursor-pointer overflow-hidden group',
          isDragOver ? 'border-primary-500 bg-primary-500/5' : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50',
          importing && 'pointer-events-none opacity-50'
        )}
      >
        <div className="size-20 rounded-[2rem] bg-slate-50 text-slate-300 flex items-center justify-center group-hover:scale-110 group-hover:bg-white group-hover:text-primary-500 transition-all shadow-inner">
          {fileName ? <FileSpreadsheet className="size-10" /> : <Upload className="size-10" />}
        </div>
        <div className="text-center">
          <p className="text-xl font-black text-slate-900">{fileName || 'Klik atau seret file CSV ke sini.'}</p>
          <p className="text-slate-400 font-bold mt-1 uppercase tracking-widest text-[10px]">Pastikan format file sesuai dengan template.</p>
        </div>
        <input ref={fileInputRef} type="file" accept=".csv"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) parseFile(f); e.target.value = '' }}
          className="hidden" />
      </div>

      {/* PREVIEW & PROGRESS */}
      {parsedRows.length > 0 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-teal-50 text-teal-600 px-4 py-2 rounded-full border border-teal-100">
                <CheckCircle2 className="size-4" />
                <span className="text-xs font-black uppercase tracking-widest">{validRows.length} Valid</span>
              </div>
              {invalidRows.length > 0 && (
                <div className="flex items-center gap-2 bg-rose-50 text-rose-500 px-4 py-2 rounded-full border border-rose-100">
                  <AlertTriangle className="size-4" />
                  <span className="text-xs font-black uppercase tracking-widest">{invalidRows.length} Error</span>
                </div>
              )}
            </div>
            {!importing && (
              <div className="flex items-center gap-2">
                <Button onClick={handleImport} disabled={validRows.length === 0}
                  className="rounded-2xl h-12 px-8 font-black bg-slate-900 text-white shadow-xl hover:bg-slate-800">
                  Import {validRows.length} Soal
                </Button>
                <Button variant="ghost" onClick={() => { setParsedRows([]); setFileName(null) }}
                  className="rounded-2xl h-12 px-6 font-black text-slate-400">
                  Batal
                </Button>
              </div>
            )}
          </div>

          {importing && (
            <div className="bg-white rounded-[2rem] border border-slate-100 p-8 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Loader2 className="size-5 animate-spin text-primary-500" />
                  <span className="text-sm font-black text-slate-900 uppercase tracking-widest">Memproses Import...</span>
                </div>
                <span className="text-xs font-black text-slate-400">{progress.current} / {progress.total} SOAL</span>
              </div>
              <Progress value={(progress.current / progress.total) * 100} className="h-3 rounded-full bg-slate-100" />
            </div>
          )}

          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-50">
                    <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">#</th>
                    <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Teks Soal</th>
                    <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Tipe</th>
                    <th className="px-8 py-5 text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {parsedRows.slice(0, 10).map((row) => (
                    <tr key={row.index} className={cn('hover:bg-slate-50/50 transition-colors', !row.valid && 'bg-rose-50/30')}>
                      <td className="px-8 py-4 text-xs font-black text-slate-300">#{row.index + 1}</td>
                      <td className="px-8 py-4">
                        <p className="text-sm font-bold text-slate-700 line-clamp-1 italic">&quot;{row.text}&quot;</p>
                      </td>
                      <td className="px-8 py-4">
                        <Badge className="bg-slate-100 text-slate-500 border-0 rounded-full font-black text-[9px] uppercase tracking-widest px-3">
                          {QUESTION_TYPE_SHORT_LABELS[row.type] ?? row.type}
                        </Badge>
                      </td>
                      <td className="px-8 py-4 text-center">
                        {row.valid ? (
                          <div className="size-6 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto shadow-inner">
                            <CheckCircle2 className="size-3" />
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-1 text-rose-500">
                            <AlertTriangle className="size-5" />
                            <span className="text-[9px] font-black uppercase">{row.errors.length} Error</span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {parsedRows.length > 10 && (
              <div className="bg-slate-50 p-4 text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dan {parsedRows.length - 10} soal lainnya...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
