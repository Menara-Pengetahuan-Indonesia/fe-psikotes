'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import {
  GripVertical, Copy, Trash2, Check, X, Plus,
  CircleDot, Square, SlidersHorizontal, AlignLeft,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUpdateQuestion } from '../../hooks'
import { QUESTION_TYPE_LABELS, QUESTION_TYPE_COLORS } from '@features/admin/constants'
import type { Question, QuestionType, QuestionOption, CorrectAnswer } from '../../types'

const TYPE_ICONS: Record<string, React.ElementType> = {
  MULTIPLE_CHOICE: CircleDot,
  CHECKBOX: Square,
  SCALE_RATING: SlidersHorizontal,
  ESSAY: AlignLeft,
}

interface QuestionCardProps {
  question: Question
  index: number
  isEditing: boolean
  onStartEdit: () => void
  onStopEdit: () => void
  onDuplicate: () => void
  onDelete: () => void
}

export function QuestionCard({
  question, index, isEditing, onStartEdit, onStopEdit, onDuplicate, onDelete,
}: QuestionCardProps) {
  const updateQuestion = useUpdateQuestion()

  const [text, setText] = useState(question.questionText)
  const [points, setPoints] = useState(question.points)
  const [imageUrl, setImageUrl] = useState(question.imageUrl ?? '')
  const [options, setOptions] = useState<Omit<QuestionOption, 'id'>[]>(
    (question.options ?? []).map(o => ({ optionText: o.optionText, isCorrect: o.isCorrect, points: o.points, order: o.order, imageUrl: o.imageUrl }))
  )
  const [essayKeywords, setEssayKeywords] = useState<string[]>(question.correctAnswer?.correctEssayKeywords ?? [])
  const [keywordInput, setKeywordInput] = useState('')
  const [minScale, setMinScale] = useState(question.correctAnswer?.minScaleValue ?? 1)
  const [maxScale, setMaxScale] = useState(question.correctAnswer?.maxScaleValue ?? 5)
  const [scaleWeights, setScaleWeights] = useState<Record<string, number>>(question.correctAnswer?.scaleWeights ?? {})

  const questionRef = useRef(question)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!isEditing && questionRef.current !== question) {
      questionRef.current = question
      setText(question.questionText)
      setPoints(question.points)
      setImageUrl(question.imageUrl ?? '')
      setOptions((question.options ?? []).map(o => ({ optionText: o.optionText, isCorrect: o.isCorrect, points: o.points, order: o.order, imageUrl: o.imageUrl })))
      setEssayKeywords(question.correctAnswer?.correctEssayKeywords ?? [])
      setMinScale(question.correctAnswer?.minScaleValue ?? 1)
      setMaxScale(question.correctAnswer?.maxScaleValue ?? 5)
      setScaleWeights(question.correctAnswer?.scaleWeights ?? {})
    }
  }, [question, isEditing])

  const showOptions = question.questionType === 'MULTIPLE_CHOICE' || question.questionType === 'CHECKBOX'
  const showEssay = question.questionType === 'ESSAY'
  const showScale = question.questionType === 'SCALE_RATING'
  const TypeIcon = TYPE_ICONS[question.questionType] ?? CircleDot
  const colorClass = QUESTION_TYPE_COLORS[question.questionType] ?? ''

  const handleSave = async () => {
    let correctAnswer: CorrectAnswer | undefined
    if (showEssay) correctAnswer = { correctEssayKeywords: essayKeywords }
    else if (showScale) correctAnswer = { minScaleValue: minScale, maxScaleValue: maxScale, scaleWeights }

    await updateQuestion.mutateAsync({
      id: question.id,
      dto: {
        questionText: text,
        points: showOptions ? undefined : points,
        imageUrl: imageUrl || undefined,
        options: showOptions
          ? options.filter(o => o.optionText.trim()).map((o, i) => ({
              optionText: o.optionText,
              imageUrl: o.imageUrl || null,
              isCorrect: o.isCorrect,
              points: o.points,
              order: i + 1,
            }))
          : undefined,
        correctAnswer,
      },
    })
    onStopEdit()
  }

  const handleCancel = () => {
    setText(question.questionText)
    setPoints(question.points)
    setImageUrl(question.imageUrl ?? '')
    setOptions((question.options ?? []).map(o => ({ optionText: o.optionText, isCorrect: o.isCorrect, points: o.points, order: o.order, imageUrl: o.imageUrl })))
    setEssayKeywords(question.correctAnswer?.correctEssayKeywords ?? [])
    setMinScale(question.correctAnswer?.minScaleValue ?? 1)
    setMaxScale(question.correctAnswer?.maxScaleValue ?? 5)
    setScaleWeights(question.correctAnswer?.scaleWeights ?? {})
    onStopEdit()
  }

  const addOption = () => {
    setOptions([...options, { optionText: '', isCorrect: false, points: 0, order: options.length + 1 }])
  }

  const removeOption = (idx: number) => {
    if (options.length <= 1) return
    setOptions(options.filter((_, i) => i !== idx).map((o, i) => ({ ...o, order: i + 1 })))
  }

  const updateOption = (idx: number, patch: Partial<Omit<QuestionOption, 'id'>>) => {
    setOptions(options.map((o, i) => i === idx ? { ...o, ...patch } : o))
  }

  // VIEW MODE
  if (!isEditing) {
    return (
      <div
        onClick={onStartEdit}
        className="group bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer"
      >
        {/* Card header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <GripVertical className="size-4 text-slate-300" />
            <span className="text-xs font-black text-slate-400 tabular-nums">#{index + 1}</span>
            <span className={cn('text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-lg', colorClass)}>
              {QUESTION_TYPE_LABELS[question.questionType]}
            </span>
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button type="button" onClick={(e) => { e.stopPropagation(); onDuplicate() }}
              className="size-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
              title="Duplikat">
              <Copy className="size-3.5" />
            </button>
            <button type="button" onClick={(e) => { e.stopPropagation(); onDelete() }}
              className="size-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Hapus">
              <Trash2 className="size-3.5" />
            </button>
          </div>
        </div>

        {/* Card body */}
        <div className="px-5 py-4 space-y-3">
          <p className="text-sm font-medium text-slate-800 leading-relaxed">{question.questionText}</p>

          {question.imageUrl && (
            <Image src={question.imageUrl} alt="" width={400} height={160}
              className="max-h-40 rounded-xl border object-contain" unoptimized />
          )}

          {/* Options preview */}
          {showOptions && (question.options ?? []).length > 0 && (
            <div className="space-y-1.5 pt-1">
              {(question.options ?? []).map((opt, i) => (
                <div key={i} className="flex items-center gap-2.5 text-sm">
                  {question.questionType === 'MULTIPLE_CHOICE' ? (
                    <span className={cn(
                      'size-6 rounded-full text-[10px] font-black flex items-center justify-center shrink-0',
                      opt.isCorrect ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-500'
                    )}>
                      {String.fromCharCode(65 + i)}
                    </span>
                  ) : (
                    <div className={cn('size-4 rounded-sm border-2 shrink-0', opt.isCorrect ? 'border-indigo-500 bg-indigo-500' : 'border-slate-300')} />
                  )}
                  <span className={cn('text-slate-600', opt.isCorrect && 'text-indigo-700 font-semibold')}>{opt.optionText}</span>
                  {opt.points > 0 && <span className="text-[10px] text-slate-400 font-bold ml-auto">{opt.points} poin</span>}
                </div>
              ))}
            </div>
          )}

          {/* Essay keywords preview */}
          {showEssay && essayKeywords.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {essayKeywords.map((kw, i) => (
                <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">{kw}</span>
              ))}
            </div>
          )}

          {/* Scale preview */}
          {showScale && (
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs text-slate-400 font-bold">Skala {minScale} - {maxScale}</span>
              <div className="flex gap-1">
                {Array.from({ length: Math.min(maxScale - minScale + 1, 10) }, (_, i) => minScale + i).map(v => (
                  <div key={v} className="size-7 rounded-lg bg-violet-50 text-violet-600 text-[10px] font-bold flex items-center justify-center">{v}</div>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-50">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{question.points} poin</span>
          </div>
        </div>
      </div>
    )
  }

  // EDIT MODE
  return (
    <div className="bg-white rounded-2xl border-2 border-indigo-400 shadow-lg shadow-indigo-100/50">
      {/* Edit header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-indigo-100 bg-indigo-50/50 rounded-t-2xl">
        <div className="flex items-center gap-3">
          <span className="text-xs font-black text-indigo-400 tabular-nums">#{index + 1}</span>
          <span className={cn('text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-lg', colorClass)}>
            {QUESTION_TYPE_LABELS[question.questionType]}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button type="button" onClick={(e) => { e.stopPropagation(); onDuplicate() }}
            className="size-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-100 transition-colors"
            title="Duplikat">
            <Copy className="size-3.5" />
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); onDelete() }}
            className="size-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="Hapus">
            <Trash2 className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Edit body */}
      <div className="px-5 py-5 space-y-5">
        {/* Question text */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pertanyaan</label>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            placeholder="Tulis pertanyaan..."
          />
        </div>

        {/* Points */}
        <div className="flex items-center gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Poin</label>
            <input
              type="number"
              value={points}
              onChange={e => setPoints(Number(e.target.value))}
              className="w-24 h-9 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>

        {/* Image */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">URL Gambar (Opsional)</label>
          {imageUrl ? (
            <div className="space-y-2">
              <div className="relative inline-block">
                <Image src={imageUrl} alt="" width={400} height={160}
                  className="max-h-40 rounded-xl border object-contain" unoptimized />
                <button type="button" onClick={() => setImageUrl('')}
                  className="absolute top-2 right-2 size-7 rounded-lg bg-rose-500 text-white flex items-center justify-center hover:bg-rose-600 transition-colors">
                  <X className="size-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <input
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full h-9 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          )}
        </div>

        {/* MC / Checkbox options */}
        {showOptions && (
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Opsi Jawaban</label>
            <div className="space-y-3">
              {options.map((opt, idx) => (
                <div key={idx} className="rounded-xl border border-slate-200 bg-slate-50/50 p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    {question.questionType === 'MULTIPLE_CHOICE' && (
                      <span className={cn(
                        'size-6 rounded-full text-[10px] font-black flex items-center justify-center shrink-0',
                        opt.isCorrect ? 'bg-indigo-500 text-white' : 'bg-slate-200 text-slate-500'
                      )}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                    )}
                    <button type="button"
                      onClick={() => updateOption(idx, { isCorrect: !opt.isCorrect })}
                      className={cn(
                        'size-5 shrink-0 rounded-md border-2 flex items-center justify-center transition-colors',
                        question.questionType === 'MULTIPLE_CHOICE' ? 'rounded-full' : '',
                        opt.isCorrect ? 'border-indigo-500 bg-indigo-500 text-white' : 'border-slate-300 hover:border-indigo-400'
                      )}>
                      {opt.isCorrect && <Check className="size-3" />}
                    </button>
                    <input
                      value={opt.optionText}
                      onChange={e => updateOption(idx, { optionText: e.target.value })}
                      placeholder={`Opsi ${idx + 1}`}
                      className="flex-1 h-9 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                    <input
                      type="number"
                      value={opt.points}
                      onChange={e => updateOption(idx, { points: Number(e.target.value) })}
                      placeholder="Poin"
                      className="w-20 h-9 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-center text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                    <button type="button" onClick={() => removeOption(idx)}
                      disabled={options.length <= 1}
                      className="size-8 rounded-lg flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-colors disabled:opacity-30">
                      <X className="size-3.5" />
                    </button>
                  </div>
                  <input
                    value={opt.imageUrl ?? ''}
                    onChange={e => updateOption(idx, { imageUrl: e.target.value || null })}
                    placeholder="URL gambar opsi (opsional)"
                    className="w-full h-8 rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                </div>
              ))}
            </div>
            <button type="button" onClick={addOption}
              className="flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
              <Plus className="size-4" /> Tambah Opsi
            </button>
          </div>
        )}

        {/* Essay keywords */}
        {showEssay && (
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kata Kunci Jawaban</label>
            <div className="flex gap-2">
              <input
                value={keywordInput}
                onChange={e => setKeywordInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    if (keywordInput.trim()) {
                      setEssayKeywords([...essayKeywords, keywordInput.trim()])
                      setKeywordInput('')
                    }
                  }
                }}
                placeholder="Ketik kata kunci, tekan Enter..."
                className="flex-1 h-9 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
              <button type="button" onClick={() => {
                if (keywordInput.trim()) {
                  setEssayKeywords([...essayKeywords, keywordInput.trim()])
                  setKeywordInput('')
                }
              }} className="size-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-indigo-100 transition-colors">
                <Plus className="size-4" />
              </button>
            </div>
            {essayKeywords.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {essayKeywords.map((kw, i) => (
                  <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200">
                    {kw}
                    <button type="button" onClick={() => setEssayKeywords(essayKeywords.filter((_, idx) => idx !== i))}
                      className="hover:text-rose-500 transition-colors">
                      <X className="size-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Scale Rating */}
        {showScale && (
          <div className="space-y-4">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pengaturan Skala</label>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3 space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Nilai Minimum</label>
                <input type="number" value={minScale}
                  onChange={e => {
                    const v = Number(e.target.value)
                    setMinScale(v)
                    const w: Record<string, number> = {}
                    for (let i = v; i <= maxScale; i++) w[String(i)] = scaleWeights[String(i)] ?? i
                    setScaleWeights(w)
                  }}
                  className="w-full h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm font-bold text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3 space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Nilai Maksimum</label>
                <input type="number" value={maxScale}
                  onChange={e => {
                    const v = Number(e.target.value)
                    setMaxScale(v)
                    const w: Record<string, number> = {}
                    for (let i = minScale; i <= v; i++) w[String(i)] = scaleWeights[String(i)] ?? i
                    setScaleWeights(w)
                  }}
                  className="w-full h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm font-bold text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>
            {minScale <= maxScale && (
              <div className="space-y-2">
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Bobot per Skala</label>
                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3">
                  <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.min(maxScale - minScale + 1, 10)}, 1fr)` }}>
                    {Array.from({ length: Math.min(maxScale - minScale + 1, 10) }, (_, i) => minScale + i).map(val => (
                      <div key={val} className="flex flex-col items-center gap-1.5">
                        <span className="size-7 rounded-full bg-violet-100 text-violet-700 text-xs font-black flex items-center justify-center">{val}</span>
                        <input type="number" value={scaleWeights[String(val)] ?? val}
                          onChange={e => setScaleWeights({ ...scaleWeights, [String(val)]: Number(e.target.value) })}
                          className="w-full h-8 rounded-lg border border-slate-200 bg-white text-center text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Save / Cancel */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
          <button type="button" onClick={handleCancel}
            className="px-4 py-2 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-100 transition-colors">
            Batal
          </button>
          <button type="button" onClick={handleSave}
            disabled={updateQuestion.isPending || !text.trim()}
            className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50">
            {updateQuestion.isPending ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </div>
    </div>
  )
}
