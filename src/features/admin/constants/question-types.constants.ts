export const QUESTION_TYPE_LABELS: Record<string, string> = {
  MULTIPLE_CHOICE: 'Pilihan Ganda',
  TRUE_FALSE: 'Benar/Salah',
  RATING_SCALE: 'Skala Rating',
  ESSAY: 'Essay',
}

export const QUESTION_TYPE_SHORT_LABELS: Record<string, string> = {
  MULTIPLE_CHOICE: 'PG',
  TRUE_FALSE: 'B/S',
  RATING_SCALE: 'Skala',
  ESSAY: 'Essay',
}

export const QUESTION_TYPE_COLORS: Record<string, string> = {
  MULTIPLE_CHOICE: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  TRUE_FALSE: 'bg-teal-100 text-teal-800 border-teal-200',
  RATING_SCALE: 'bg-violet-100 text-violet-800 border-violet-200',
  ESSAY: 'bg-slate-100 text-slate-800 border-slate-200',
}

export const DISPLAY_STYLE_OPTIONS = [
  { value: 'UPPERCASE', label: 'A B C' },
  { value: 'LOWERCASE', label: 'a b c' },
  { value: 'NUMBER', label: '1 2 3' },
  { value: 'RADIO', label: 'Radio' },
] as const

export const DISPLAY_STYLE_LABELS: Record<string, string> = {
  UPPERCASE: 'A B C',
  LOWERCASE: 'a b c',
  NUMBER: '1 2 3',
  RADIO: 'Radio',
}
