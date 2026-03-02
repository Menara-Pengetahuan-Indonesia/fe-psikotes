'use client'

import { useState, useRef, useCallback } from 'react'
import Papa from 'papaparse'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  Download,
  Upload,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Loader2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  useIndicators,
  useSections,
  useCreateQuestion,
  useCreateOption,
  useCreateIndicatorMapping,
  adminKeys,
} from '../../hooks'
import type { Indicator, Section } from '../../types'
import { QUESTION_TYPE_SHORT_LABELS } from '@features/admin/constants'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface BulkImportCSVProps {
  testId: string
}

interface ParsedRow {
  index: number
  text: string
  type: string
  section: string
  options: string[]
  scores: Record<string, number[]> // indicatorName -> score per option slot
  valid: boolean
  errors: string[]
}

const VALID_TYPES = [
  'MULTIPLE_CHOICE',
  'TRUE_FALSE',
  'RATING_SCALE',
  'ESSAY',
] as const

type QuestionType = (typeof VALID_TYPES)[number]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function BulkImportCSV({ testId }: BulkImportCSVProps) {
  const queryClient = useQueryClient()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Data hooks
  const { data: indicators = [] } = useIndicators(testId)
  const { data: sections = [] } = useSections(testId)

  // Mutation hooks
  const createQuestion = useCreateQuestion()
  const createOption = useCreateOption()
  const createIndicatorMapping = useCreateIndicatorMapping()

  // Local state
  const [parsedRows, setParsedRows] = useState<ParsedRow[]>([])
  const [fileName, setFileName] = useState<string | null>(null)
  const [importing, setImporting] = useState(false)
  const [progress, setProgress] = useState({ current: 0, total: 0 })
  const [expandedErrors, setExpandedErrors] = useState<Set<number>>(new Set())
  const [isDragOver, setIsDragOver] = useState(false)

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------

  const sectionMap = useCallback((): Map<string, Section> => {
    const map = new Map<string, Section>()
    for (const s of sections as Section[]) {
      map.set(s.name.toLowerCase(), s)
    }
    return map
  }, [sections])

  const indicatorList = indicators as Indicator[]

  const validRows = parsedRows.filter((r) => r.valid)
  const invalidRows = parsedRows.filter((r) => !r.valid)

  // ---------------------------------------------------------------------------
  // Template CSV generation
  // ---------------------------------------------------------------------------

  const handleDownloadTemplate = useCallback(() => {
    const scoreHeaders: string[] = []
    for (const ind of indicatorList) {
      for (let i = 1; i <= 4; i++) {
        scoreHeaders.push(`score_${ind.name}_${i}`)
      }
    }

    const headers = [
      'text',
      'type',
      'section',
      'option1',
      'option2',
      'option3',
      'option4',
      ...scoreHeaders,
    ]

    const sectionName =
      (sections as Section[]).length > 0
        ? (sections as Section[])[0].name
        : 'Seksi 1'

    // Example rows
    const exampleRows: string[][] = [
      [
        'Apa ibu kota Indonesia?',
        'MULTIPLE_CHOICE',
        sectionName,
        'Jakarta',
        'Bandung',
        'Surabaya',
        'Medan',
        ...indicatorList.flatMap(() => ['3', '1', '1', '1']),
      ],
      [
        'Matahari terbit dari timur',
        'TRUE_FALSE',
        sectionName,
        'Benar',
        'Salah',
        '',
        '',
        ...indicatorList.flatMap(() => ['2', '0', '', '']),
      ],
      [
        'Seberapa yakin Anda dengan kemampuan Anda?',
        'RATING_SCALE',
        '',
        'Sangat Tidak Setuju',
        'Tidak Setuju',
        'Setuju',
        'Sangat Setuju',
        ...indicatorList.flatMap(() => ['1', '2', '3', '4']),
      ],
    ]

    const csvContent = [
      headers.join(','),
      ...exampleRows.map((row) =>
        row.map((cell) => (cell.includes(',') ? `"${cell}"` : cell)).join(',')
      ),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `template_soal_${testId}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }, [indicatorList, sections, testId])

  // ---------------------------------------------------------------------------
  // Parse & validate
  // ---------------------------------------------------------------------------

  const validateRow = useCallback(
    (
      row: Record<string, string>,
      rowIndex: number,
      sMap: Map<string, Section>
    ): ParsedRow => {
      const errors: string[] = []
      const text = (row['text'] ?? '').trim()
      const type = (row['type'] ?? '').trim().toUpperCase()
      const section = (row['section'] ?? '').trim()

      // Collect options
      const options: string[] = []
      for (let i = 1; i <= 4; i++) {
        options.push((row[`option${i}`] ?? '').trim())
      }

      // Collect scores per indicator
      const scores: Record<string, number[]> = {}
      for (const ind of indicatorList) {
        const indScores: number[] = []
        for (let i = 1; i <= 4; i++) {
          const key = `score_${ind.name}_${i}`
          const raw = (row[key] ?? '').trim()
          if (raw === '') {
            indScores.push(NaN)
          } else {
            const num = Number(raw)
            if (isNaN(num)) {
              errors.push(
                `Skor "${key}" bukan angka valid: "${raw}"`
              )
              indScores.push(NaN)
            } else {
              indScores.push(num)
            }
          }
        }
        scores[ind.name] = indScores
      }

      // Validate text
      if (!text) {
        errors.push('Teks soal tidak boleh kosong')
      }

      // Validate type
      if (!VALID_TYPES.includes(type as QuestionType)) {
        errors.push(
          `Tipe "${type}" tidak valid. Gunakan: ${VALID_TYPES.join(', ')}`
        )
      }

      // Validate section
      if (section && !sMap.has(section.toLowerCase())) {
        errors.push(
          `Seksi "${section}" tidak ditemukan. Seksi yang tersedia: ${(sections as Section[]).map((s) => s.name).join(', ') || '(belum ada)'}`
        )
      }

      // Validate options for MC / TF
      const nonEmptyOptions = options.filter((o) => o !== '')
      if (
        type === 'MULTIPLE_CHOICE' ||
        type === 'TRUE_FALSE'
      ) {
        if (nonEmptyOptions.length < 2) {
          errors.push(
            `Tipe ${QUESTION_TYPE_SHORT_LABELS[type] ?? type} membutuhkan minimal 2 opsi`
          )
        }
      }

      return {
        index: rowIndex,
        text,
        type,
        section,
        options,
        scores,
        valid: errors.length === 0,
        errors,
      }
    },
    [indicatorList, sections]
  )

  const parseFile = useCallback(
    (file: File) => {
      setFileName(file.name)
      const sMap = sectionMap()

      Papa.parse<Record<string, string>>(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors.length > 0) {
            const parseErrors = results.errors
              .slice(0, 5)
              .map((e) => e.message)
              .join('; ')
            toast.error(`Gagal parse CSV: ${parseErrors}`)
          }

          const rows = results.data.map((row, i) =>
            validateRow(row, i, sMap)
          )
          setParsedRows(rows)

          const valid = rows.filter((r) => r.valid).length
          const invalid = rows.filter((r) => !r.valid).length

          if (rows.length === 0) {
            toast.error('File CSV kosong atau tidak memiliki data')
          } else {
            toast.info(
              `Ditemukan ${rows.length} baris: ${valid} valid, ${invalid} bermasalah`
            )
          }
        },
        error: (err) => {
          toast.error(`Gagal membaca file: ${err.message}`)
        },
      })
    },
    [sectionMap, validateRow]
  )

  // ---------------------------------------------------------------------------
  // File handling (click + drag & drop)
  // ---------------------------------------------------------------------------

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) parseFile(file)
      // Reset input so same file can be re-selected
      e.target.value = ''
    },
    [parseFile]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragOver(false)

      const file = e.dataTransfer.files[0]
      if (!file) return

      if (!file.name.endsWith('.csv')) {
        toast.error('Hanya file CSV yang diperbolehkan')
        return
      }

      parseFile(file)
    },
    [parseFile]
  )

  // ---------------------------------------------------------------------------
  // Import flow
  // ---------------------------------------------------------------------------

  const resetState = useCallback(() => {
    setParsedRows([])
    setFileName(null)
    setProgress({ current: 0, total: 0 })
    setExpandedErrors(new Set())
  }, [])

  const handleImport = useCallback(async () => {
    if (validRows.length === 0) return

    setImporting(true)
    setProgress({ current: 0, total: validRows.length })
    const sMap = sectionMap()
    let successCount = 0

    try {
      for (let i = 0; i < validRows.length; i++) {
        const row = validRows[i]

        // 1. Resolve sectionId
        let sectionId: string | undefined
        if (row.section) {
          const sec = sMap.get(row.section.toLowerCase())
          if (sec) sectionId = sec.id
        }

        // 2. Create question
        const question = await createQuestion.mutateAsync({
          testId,
          text: row.text,
          type: row.type as QuestionType,
          sectionId,
          order: i + 1,
          imageUrl: null,
        })

        // 3. Create options and their indicator mappings
        const nonEmptyOptions = row.options
          .map((text, idx) => ({ text, slotIndex: idx }))
          .filter((o) => o.text !== '')

        for (const opt of nonEmptyOptions) {
          const option = await createOption.mutateAsync({
            testId,
            questionId: question.id,
            dto: {
              questionId: question.id,
              text: opt.text,
              order: opt.slotIndex + 1,
            },
          })

          // 4. Create indicator mappings for this option
          for (const ind of indicatorList) {
            const scoreArr = row.scores[ind.name]
            if (!scoreArr) continue
            const scoreValue = scoreArr[opt.slotIndex]
            if (isNaN(scoreValue)) continue

            await createIndicatorMapping.mutateAsync({
              testId,
              optionId: option.id,
              dto: {
                indicatorId: ind.id,
                scoreValue,
              },
            })
          }
        }

        successCount++
        setProgress({ current: i + 1, total: validRows.length })
      }

      // Invalidate & reset
      await queryClient.invalidateQueries({
        queryKey: adminKeys.questions(testId),
      })

      toast.success(`Berhasil mengimpor ${successCount} soal`)
      resetState()
    } catch (err) {
      toast.error(
        `Gagal pada soal ke-${progress.current + 1}: ${err instanceof Error ? err.message : 'Unknown error'}`
      )
    } finally {
      setImporting(false)
    }
  }, [
    validRows,
    sectionMap,
    createQuestion,
    createOption,
    createIndicatorMapping,
    indicatorList,
    testId,
    queryClient,
    resetState,
    progress.current,
  ])

  const toggleErrorExpand = useCallback((index: number) => {
    setExpandedErrors((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }, [])

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  const progressPercent =
    progress.total > 0
      ? Math.round((progress.current / progress.total) * 100)
      : 0

  return (
    <Card className="gap-4">
      {/* Header */}
      <div className="px-6 pt-2">
        <h3 className="text-lg font-semibold">Import Soal dari CSV</h3>
      </div>

      <div className="px-6 space-y-4">
        {/* Download template button */}
        <Button
          variant="outline"
          onClick={handleDownloadTemplate}
          disabled={importing}
          className="gap-2"
        >
          <Download className="size-4" />
          Unduh Template CSV
        </Button>

        {/* Drop zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !importing && fileInputRef.current?.click()}
          className={`
            relative flex flex-col items-center justify-center gap-2
            rounded-lg border-2 border-dashed p-8 cursor-pointer
            transition-colors
            ${isDragOver
              ? 'border-primary bg-primary/5'
              : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50'
            }
            ${importing ? 'pointer-events-none opacity-50' : ''}
          `}
        >
          {fileName ? (
            <>
              <FileText className="size-8 text-muted-foreground" />
              <p className="text-sm font-medium">{fileName}</p>
              <p className="text-xs text-muted-foreground">
                Klik atau drop untuk mengganti file
              </p>
            </>
          ) : (
            <>
              <Upload className="size-8 text-muted-foreground" />
              <p className="text-sm font-medium">
                Drag & drop file CSV di sini
              </p>
              <p className="text-xs text-muted-foreground">
                atau klik untuk pilih file
              </p>
            </>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Parse summary */}
        {parsedRows.length > 0 && !importing && (
          <div className="flex items-center gap-3 rounded-lg border p-3 bg-muted/30">
            <div className="flex items-center gap-1.5 text-sm">
              <CheckCircle2 className="size-4 text-green-600" />
              <span className="font-medium">{validRows.length}</span>
              <span className="text-muted-foreground">soal valid</span>
            </div>
            {invalidRows.length > 0 && (
              <div className="flex items-center gap-1.5 text-sm">
                <AlertTriangle className="size-4 text-amber-500" />
                <span className="font-medium">{invalidRows.length}</span>
                <span className="text-muted-foreground">bermasalah</span>
              </div>
            )}
          </div>
        )}

        {/* Preview table */}
        {parsedRows.length > 0 && !importing && (
          <div className="rounded-lg border overflow-auto max-h-80">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 sticky top-0">
                <tr>
                  <th className="px-3 py-2 text-left font-medium w-10">#</th>
                  <th className="px-3 py-2 text-left font-medium min-w-[200px]">
                    Teks
                  </th>
                  <th className="px-3 py-2 text-left font-medium w-16">
                    Tipe
                  </th>
                  <th className="px-3 py-2 text-left font-medium w-28">
                    Seksi
                  </th>
                  <th className="px-3 py-2 text-left font-medium w-24">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {parsedRows.map((row) => (
                  <tr
                    key={row.index}
                    className={`border-t ${!row.valid ? 'bg-destructive/5' : ''}`}
                  >
                    <td className="px-3 py-2 text-muted-foreground">
                      {row.index + 1}
                    </td>
                    <td className="px-3 py-2 truncate max-w-[300px]">
                      {row.text || (
                        <span className="text-muted-foreground italic">
                          (kosong)
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <Badge
                        variant={row.valid ? 'secondary' : 'outline'}
                        className="text-xs"
                      >
                        {QUESTION_TYPE_SHORT_LABELS[row.type] ?? row.type}
                      </Badge>
                    </td>
                    <td className="px-3 py-2 text-muted-foreground truncate max-w-[120px]">
                      {row.section || '-'}
                    </td>
                    <td className="px-3 py-2">
                      {row.valid ? (
                        <CheckCircle2 className="size-4 text-green-600" />
                      ) : (
                        <button
                          type="button"
                          onClick={() => toggleErrorExpand(row.index)}
                          className="flex items-center gap-1 text-amber-600 hover:text-amber-700 transition-colors"
                        >
                          <AlertTriangle className="size-4" />
                          <span className="text-xs underline">
                            {row.errors.length} error
                          </span>
                        </button>
                      )}
                      {/* Expanded errors */}
                      {!row.valid && expandedErrors.has(row.index) && (
                        <ul className="mt-1 space-y-0.5">
                          {row.errors.map((err, ei) => (
                            <li
                              key={ei}
                              className="text-xs text-destructive"
                            >
                              - {err}
                            </li>
                          ))}
                        </ul>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Progress bar during import */}
        {importing && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" />
                <span>Mengimpor soal...</span>
              </div>
              <span className="text-muted-foreground">
                {progressPercent}% ({progress.current}/{progress.total})
              </span>
            </div>
            <Progress value={progressPercent} />
          </div>
        )}

        {/* Action buttons */}
        {parsedRows.length > 0 && (
          <div className="flex items-center gap-2 pb-2">
            <Button
              onClick={handleImport}
              disabled={importing || validRows.length === 0}
              className="gap-2"
            >
              {importing ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Upload className="size-4" />
              )}
              {importing
                ? 'Mengimpor...'
                : `Import ${validRows.length} Soal Valid`}
            </Button>
            <Button
              variant="outline"
              onClick={resetState}
              disabled={importing}
            >
              Batal
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}
